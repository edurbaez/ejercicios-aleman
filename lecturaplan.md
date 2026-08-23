# Plan: adaptar "Comprensión" al formato real del examen (Leseverstehen)

> **Estado: las 6 fases están implementadas (A1, A2, B1, B2, C1, C2)** — ver §11-§15 para
> el detalle de lo hecho. El resto de este documento describe el diseño original;
> §11-§15 documentan las decisiones tomadas durante la implementación donde divergieron
> de lo planificado aquí.

> Documento de planificación, no implementado originalmente. Complementa la "opción ligera" ya
> implementada (`api/_reading-topics.js` `READING_SPECS`, `api/chat.js` `generateReading()`),
> que solo varía longitud/tipo de texto por nivel manteniendo siempre MCQ de 4 opciones.
> Aquí se documenta la opción fiel: reproducir la estructura real del Leseverstehen
> de Goethe/telc por nivel (varios Teile, tipos de tarea distintos a MCQ).

## 1. Objetivo

Que la sección "📖 Comprensión" (Modo B, textos generados por IA) deje de ser un único
texto + 4 preguntas de opción múltiple y pase a simular un examen real: varios Teile
por nivel, cada uno con el tipo de tarea que usa el examen oficial (richtig/falsch,
emparejar, huecos, MCQ de 3 opciones en B1+). El objetivo es que el estudiante entrene
el formato exacto que se va a encontrar el día del examen, no solo comprensión lectora
general.

Esto es más ambicioso que la opción ligera: implica cambiar el modelo de datos, el
prompt de generación y la UI de renderizado de preguntas.

## 2. Estado actual

- `lectura veloz.html` — pestaña "📖 Comprensión" tiene dos modos:
  - **Modo A** (`compGenerarPreguntas()` ~línea 840, `compRenderPreguntas()` ~línea 918):
    el usuario pega un texto propio; se generan 4 preguntas MCQ vía `/api/chat` genérico
    (prompt inline en el JS, sin pasar por `generateReading`).
  - **Modo B** (`modoB_obtenerTexto()` ~línea 1360, `modoB_renderPreguntas()` ~línea 1422):
    elige nivel CEFR → busca un texto no visto en `reading_texts` o genera uno nuevo vía
    `/api/chat` `action: 'generate-reading'` (`generateReading()` en `api/chat.js`).
- Schema actual de `reading_texts.questions` (jsonb): array plano —
  `[{ pregunta, opciones: [4], correcta: 0-3 }, ...]`. Siempre 4 preguntas, siempre MCQ.
- `generateReading()` (`api/chat.js:94-188`) ya varía longitud/tipo de texto por nivel
  (`READING_SPECS`), pero el *tipo de pregunta* generado y validado (líneas 149-160)
  sigue siendo únicamente MCQ de 4 opciones.
- Ambos renderers de frontend (`compRenderPreguntas`, `modoB_renderPreguntas`) están
  hardcodeados para pintar botones de 4 opciones — no hay ninguna abstracción por tipo
  de tarea todavía.

## 3. Formato objetivo por nivel

Síntesis del patrón conocido de los exámenes Goethe-Zertifikat/telc (estructura general
de sus Modellsätze — no se debe copiar texto literal de un examen real con derechos de
autor, solo replicar el *formato* de tarea).

| Nivel | Teile | Tipo de tarea por Teil |
|-------|-------|-------------------------|
| **A1** | 3 | T1: emparejar mensajes/notas cortas (1-2 frases) con su tema · T2: emparejar anuncios con la persona que los necesita · T3: richtig/falsch sobre carteles/señales públicas |
| **A2** | 3 | T1: richtig/falsch sobre textos breves (emails, notas) · T2: emparejar personas con anuncios · T3: emparejar situaciones con secciones de una web/revista |
| **B1** | 5 | T1: texto largo + MCQ (3 opciones) · T2: emparejar personas (con una necesidad) a anuncios/webs · T3: foro de opiniones, emparejar afirmaciones a personas · T4: richtig/falsch sobre afirmaciones de un texto · T5: reglas/Hausordnung, emparejar situación → regla |
| **B2** | 5 | T1: blog/opinión + MCQ · T2: artículo + emparejar titulares/resúmenes a párrafos · T3: 5 textos cortos, emparejar situación → texto · T4: artículo con huecos (conectores) · T5: reglas + richtig/falsch |
| **C1** | ~5 (como B2) | Igual estructura que B2 pero textos más largos/abstractos, más huecos, matices de opinión más finos |
| **C2** | ~5 (como B2/C1) | Máxima complejidad: combina emparejar + richtig/falsch + huecos, textos largos con registro formal/retórico |

Tipos de tarea a soportar en el modelo de datos: `mcq` (3 o 4 opciones), `richtig_falsch`,
`emparejar` (N items → M textos/personas/reglas), `huecos` (frase con blanco + opciones o
lista de conectores a distribuir).

## 4. Modelo de datos propuesto

Sustituir el array plano de `questions` por una estructura por Teile:

```jsonc
{
  "teile": [
    {
      "id": "teil1",
      "tipo": "mcq",              // mcq | richtig_falsch | emparejar | huecos
      "instrucciones": "...",
      "textos": [{ "titulo": "...", "contenido": "..." }],
      "items": [
        { "pregunta": "...", "opciones": ["A","B","C"], "correcta": 0 }
      ]
    },
    {
      "id": "teil2",
      "tipo": "emparejar",
      "instrucciones": "...",
      "columnaIzquierda": [{ "id": "p1", "texto": "Persona 1: busca ..." }],
      "columnaDerecha":  [{ "id": "a1", "texto": "Anuncio A: ..." }],
      "solucion": { "p1": "a1", "p2": "a3", "...": "..." }
    }
  ]
}
```

Decisiones a fijar antes de implementar:

- **Versionado**: añadir `reading_texts.format_version` (`1` = formato actual plano,
  `2` = formato por Teile). Se recomienda **versionar en vez de migrar/regenerar**, porque
  ya hay textos en producción y `user_reading_seen` referencia sus `id`s — invalidarlos
  rompería el historial de "ya visto" de usuarios reales. El frontend elegiría el
  renderer según `format_version`.
- **Reutilizar el patrón `LEVEL_SPECS[level].teile[]`** ya usado en `mundliche.html:126`
  (config declarativa por nivel/Teil, con `id`, `nombre`, y demás metadatos) en vez de
  inventar una convención nueva — mantiene consistencia entre apps.

## 5. Generación de contenido (backend)

- Extender (o reemplazar) `generateReading()` en `api/chat.js` para, por nivel, iterar
  sobre la lista de Teile definida en `READING_SPECS[level].teile` y pedir a la IA un
  prompt distinto por tipo de tarea, con su propio schema JSON esperado.
  - Alternativa a evaluar: una llamada IA por Teil (más control, más tokens/latencia) vs.
    una sola llamada que devuelva todos los Teile de golpe (más barato, más riesgo de
    JSON mal formado en tareas complejas como `emparejar`).
- Añadir validación por tipo de tarea — hoy `generateReading` solo valida el shape MCQ
  (`api/chat.js:149-160`); cada tipo nuevo necesita su propio validador antes de insertar
  en Supabase (evitar guardar tareas rotas, ej. `emparejar` con más soluciones que items).
- Actualizar `READING_SPECS` (`api/_reading-topics.js`) para incluir, por nivel, la lista
  de Teile a generar en una sesión (no solo `minWords`/`maxWords`/`textType` como ahora).

## 6. Frontend — nuevos renderers

- `compRenderPreguntas()` (Modo A) y `modoB_renderPreguntas()` (Modo B) están
  hardcodeados para botones de 4 opciones. Hace falta una función de render por tipo:
  - `renderMCQ()` — ya existe, reutilizable tal cual (ajustar a 3 opciones si aplica).
  - `renderRichtigFalsch()` — dos botones (Richtig/Falsch) por afirmación.
  - `renderEmparejar()` — UI de asociación; evaluar drag-and-drop vs. selects
    (`<select>` por item de la columna izquierda eligiendo un id de la derecha) — los
    selects son mucho más baratos de implementar y accesibles, recomendado como primera
    versión.
  - `renderHuecos()` — inputs de texto o `<select>` con las opciones de conector por
    hueco.
- Composición de la pantalla cuando una sesión tiene varios Teile encadenados: navegación
  Teil 1→2→...→N, resultado parcial por Teil y resultado global al final — mismo patrón
  que "🎓 Simulacro completo" (`MpState.sesion`, agregación final) en `mundliche.html`.

## 7. Modo A (texto pegado por el usuario)

Recomendado: **mantenerlo como práctica genérica de MCQ**, sin adaptarlo a Teile. No se
puede saber a priori qué tipo de texto pegó el usuario (podría ser cualquier cosa), así
que forzar un tipo de tarea específico requeriría pedirle explícitamente que declare el
tipo de texto — añade fricción para un modo pensado como práctica libre y rápida. Si se
quisiera en el futuro, sería una fase aparte, no parte de este plan.

## 8. Migraciones Supabase

Si se adopta el campo `format_version` (recomendado, ver §4): nueva migración
`supabase/migrations/011_reading_texts_format_version.sql` — añade la columna
`format_version integer NOT NULL DEFAULT 1` a `reading_texts`. Los textos nuevos en
formato Teile se insertan con `format_version = 2`; los antiguos quedan en `1` sin
tocarlos. No se requiere cambiar el tipo de columna `questions` (sigue siendo `jsonb`,
solo cambia la forma del JSON que contiene).

## 9. Fases de implementación sugeridas

1. **B1** primero — es el nivel con la estructura de 5 Teile mejor documentada y más
   demandado por ser el nivel bisagra más común en preparación de exámenes.
2. Replicar a **B2**, luego **C1/C2** (misma familia de tipos de tarea: mcq, emparejar,
   huecos, richtig/falsch — solo cambia longitud/complejidad del texto).
3. **A1/A2** al final — su UI (emparejar notas muy cortas, señales) es la más distinta de
   lo que ya existe y con menor ganancia relativa (los estudiantes de A1/A2 suelen
   priorizar vocabulario/gramática básica antes que simulacro de examen).
4. En cada fase: implementar el tipo de tarea nuevo que introduce ese nivel (Teil por
   Teil) antes de pasar al siguiente nivel, para no acumular deuda de renderers a medio
   construir.

## 10. Riesgos / decisiones abiertas

- **Versionado vs. regenerar todo**: confirmar que se acepta convivir con dos formatos
  en `reading_texts` (recomendado) en vez de invalidar/regenerar los textos existentes.
- **Modo A**: confirmar que se mantiene como MCQ genérico y no se adapta a Teile (§7).
- **Costo del "emparejar"**: decidir si la primera versión usa `<select>` (barato) o
  drag-and-drop (más fiel a la experiencia de examen en papel, más esfuerzo de UI).
- **Costo de generación IA**: una sesión con 5 Teile por nivel implica más tokens/latencia
  por sesión que el texto único actual — evaluar si conviene cachear/pre-generar en lote
  (similar a como ya se reusan textos no vistos de `reading_texts` antes de generar uno
  nuevo) para no disparar el costo de `/api/chat` por usuario.
- **Fuente del formato**: este documento sintetiza el patrón general conocido de los
  exámenes Goethe/telc a partir de su estructura pública (número de Teile, tipo de tarea
  por Teil), no reproduce contenido de ningún Modellsatz con derechos de autor. Antes de
  implementar, conviene revisar Modellsätze oficiales actualizados por si la estructura
  cambió de versión.

## 11. Fase 1 (B1) — implementado

Implementado siguiendo el diseño de §3-8, con algunas decisiones concretas tomadas
durante la construcción:

- **Migración**: `supabase/migrations/011_reading_texts_format_version.sql` — añade
  `reading_texts.format_version integer NOT NULL DEFAULT 1`, aplicada a producción.
  Formato 1 = plano (sin cambios, todos los niveles salvo B1). Formato 2 = Teile.
- **`api/_reading-topics.js`**: nuevo export `READING_TEILE_SPECS` — por nivel, lista
  ordenada de Teile `{ id, tipo, nombre }`. Solo `B1` poblado: `teil1` mcq, `teil2`
  emparejar, `teil3` emparejar, `teil4` richtig_falsch, `teil5` emparejar (según §3).
- **`api/chat.js`**: `generateReading()` ahora delega en `generateReadingTeile()` cuando
  `READING_TEILE_SPECS[level]` existe. Decisión tomada sobre la disyuntiva de §5: **una
  sola llamada a la IA** genera los 5 Teile de golpe (`max_tokens: 3500`,
  `response_format: json_object`), no una llamada por Teil — más barato y más simple;
  el riesgo de JSON mal formado se mitiga con `validTeileSession()` (rechaza la sesión
  completa con 502 si algo no cuadra, igual que el flujo v1, el usuario puede reintentar).
  Validadores por tipo: `validMcqTeil` (opciones exactamente 3, no 4 — real del examen
  B1 a partir de Teil 1), `validRichtigFalschTeil`, `validEmparejarTeil` (columna derecha
  ≥ columna izquierda para permitir distractores, cada id de solución debe existir en
  ambas columnas). El texto/anuncio/reglas de cada Teil van embebidos en el propio JSON
  de la sesión — no hay generación de imagen ni de audio.
- **Modelo de datos real usado** (igual al propuesto en §4, con los tipos que introduce
  B1): `questions = { teile: [ { id, tipo, instrucciones, textos?, items?,
  columnaIzquierda?, columnaDerecha?, solucion? } ] }`. `title` = título general de la
  sesión; `content` (columna NOT NULL heredada del formato 1, sin uso real en formato 2)
  se rellena con una descripción genérica ("Simulacro de Leseverstehen B1 — 5 Teile").
- **Frontend (`lectura veloz.html`, Modo B)**: `modoB_obtenerTexto()` ahora pide también
  `format_version` a Supabase y bifurca — `1` sigue el flujo existente sin tocar,
  `2` entra en `modoB_iniciarTeilSession()`. Nuevo contenedor `#comp-teil-session` con
  cabecera (nombre + progreso "N / 5"), instrucciones, texto(s) del Teil, cuerpo
  específico por tipo y navegación. A diferencia del feedback inmediato del formato 1
  (click → corrige al instante), el formato 2 usa un patrón **"responder todo el Teil →
  Comprobar Teil → Siguiente Teil"** (más fiel al examen real, y necesario para que
  `emparejar` con `<select>` tenga sentido). Al terminar el Teil 5,
  `modoB_mostrarResultadoTeilFinal()` agrega el total de aciertos y muestra un desglose
  por Teil, reutilizando `#comp-resultado` (con una lista `.comp-teil-breakdown` nueva).
  `emparejar` se implementó con `<select>` (no drag-and-drop), como recomendaba §6/§10.
  Además, antes de empezar la sesión se muestra un **selector de Teile**
  (`modoB_mostrarSelectorTeile()`, checkboxes sobre los 5 Teile, todos marcados por
  defecto) para que el estudiante pueda practicar solo un subconjunto en vez del
  simulacro completo — la sesión ya generada no se descarta, solo se filtra en el
  cliente antes de iniciar `modoB_iniciarTeilSession()`.
- **Modo A**: sin cambios, sigue siendo MCQ genérico (§7 confirmado).
- **Verificación realizada**: sintaxis de `api/chat.js`/`api/_reading-topics.js`
  (`node --check`) y de los bloques `<script>` de `lectura veloz.html` (parseo con
  `new Function`); lógica de `validTeileSession`/`TEIL_VALIDATORS` probada con sesiones
  sintéticas válidas e inválidas (orden de Teile incorrecto, MCQ con 4 opciones,
  `solucion` apuntando a un id inexistente, columna derecha más corta que la izquierda —
  todas correctamente rechazadas). **No se hizo una prueba manual en navegador con login
  real** (el entorno de ejecución no tiene sesión de usuario/browser interactivo) — antes
  de dar la fase por cerrada conviene entrar a `/lectura veloz.html` → Comprensión → Por
  nivel → B1 → Obtener texto, y completar una sesión completa una vez desplegado.
- **Pendiente / no incluido en esta fase**: B2/C1/C2 (mismos tipos de tarea, reutilizan
  los renderers ya construidos — falta solo poblar `READING_TEILE_SPECS` y el prompt por
  nivel), A1/A2 (necesitan tipos de tarea nuevos: emparejar notas muy cortas, carteles),
  y las "decisiones abiertas" de §10 sobre costo/latencia si el volumen de uso crece
  (por ahora se reusan sesiones no vistas de `reading_texts` antes de generar una nueva,
  igual que el flujo v1).

**Validación manual en navegador — completada (sesión 2026-07-31).** Se corrió un
navegador real (Playwright/Chromium, headless) contra `vercel dev` local, con una sesión
de usuario real inyectada en `localStorage` (token de sesión provisto por el usuario para
esta prueba puntual, no persistido). Flujo completo probado: login → Comprensión → Por
nivel → B1 → Obtener texto → selector de Teile → los 5 Teile (mcq/emparejar/richtig_falsch)
respondidos y comprobados uno a uno → pantalla de resultado final con desglose por Teil.

**Bug real encontrado y corregido:** `modoB_obtenerTexto()` elegía aleatoriamente entre
*todos* los textos no vistos de un nivel sin distinguir `format_version` — como ya existían
filas B1 en `reading_texts` con `format_version=1` (de antes de esta Fase 1), la primera
corrida de la prueba recibió el formato plano legado en vez del formato por Teile. Corregido
en `lectura veloz.html` (`modoB_obtenerTexto`): ahora, si entre los textos no vistos hay
alguno con `format_version=2`, el sorteo se limita a esos — solo cae a formato 1 cuando no
queda ningún texto Teile sin ver. Esto también protege a **B2** (Fase 2, mismo código
compartido) del mismo problema con sus textos legado. Tras el fix, la prueba repetida generó
correctamente una sesión Teile nueva y completó el flujo entero sin errores de consola.

**Fuera de alcance de esta prueba (bloqueado por config local, no por el código):** en
`escritura.html` (ver P6 más abajo) la generación real de tarea vía IA falló por
`OPENAI_API_KEY` no configurada en `.env.local` — se verificó en su lugar, sin llamar a la
API, que `EscState.temaFijo` y `buildTaskPrompt()` toman correctamente el tema del deep-link.

## 12. Fase 2 (B2) — implementado

Antes de implementar se investigó la estructura real del Modellsatz oficial
Goethe-Zertifikat B2 (Lesen, bfu.goethe.de), en vez de asumir la tabla del §3 al pie de
la letra. Hallazgo principal: **la tabla de §3 estaba equivocada en los tipos de tarea
de B2** — el examen real no usa `richtig_falsch` en ningún Teil de B2, y el "Teil 4 con
huecos/conectores" que suponía §3 en realidad es un Lückentext (Teil 2 real) que encaja
sin cambios en el tipo `emparejar` ya construido para B1 (huecos numerados en la columna
izquierda ↔ frases candidatas en la columna derecha, con distractores). El Teil 1 real
(4 personas opinan, 9 afirmaciones se asignan a la persona que las dijo, con opciones
repetibles) encaja en `mcq` sin cambios de esquema — cada `item` simplemente repite el
mismo array de opciones. **Conclusión: no hizo falta construir ningún tipo de tarea
nuevo** (`huecos` nunca se implementó); B2 reutiliza `mcq` y `emparejar` tal cual.

- **Estructura adoptada** (`READING_TEILE_SPECS.B2` en `api/_reading-topics.js`): teil1
  `mcq` (4 personas/opiniones, `opcionesCount: 4`, opciones compartidas y repetibles
  entre items) · teil2 `emparejar` (Lückentext: huecos `[1]`.."[5]"` en un artículo ↔ 8
  frases candidatas, 3 distractoras) · teil3 `mcq` (`opcionesCount: 3`, MCQ estándar,
  mismo patrón que el teil1 de B1) · teil4 `emparejar` (titulares ↔ opiniones/comentarios
  completos, 3 distractoras) · teil5 `emparejar` (párrafos de un reglamento ↔
  encabezados, con distractores). Se mantienen 5 ítems por Teil (no los 9/6/6/6/3 reales)
  por consistencia con B1 y para no complicar el generador — la app es una herramienta de
  práctica de formato, no una réplica exacta del examen.
- **Generalización necesaria (no solo "copiar y pegar" el patrón de B1)**: la
  implementación de B1 tenía tres puntos hardcodeados a ese nivel que había que
  corregir para que B2 no heredara datos incorrectos:
  1. `buildTeilePrompt` (`api/chat.js`) tenía el rango de palabras ("100-150") y las
     descripciones de contenido de los Teile `emparejar` escritas literalmente,
     condicionadas por `t.id === 'teil2'/'teil3'/'teil5'`. Se refactorizó a una función
     100% genérica dirigida por el `spec` recibido: cada entrada de
     `READING_TEILE_SPECS[level]` ahora lleva un campo `promptFragment` (el texto de
     instrucción para la IA, con placeholders `{minWords}`/`{maxWords}` interpolados
     desde `READING_SPECS[level]`). Se aplicó el mismo cambio de forma a las 5 entradas
     de B1 (sin cambiar su contenido) para que ambos niveles compartan un único código
     de generación de prompt.
  2. `validMcqTeil` exigía exactamente 3 opciones — se generalizó a
     `validMcqTeil(t, opcionesCount = 3)`, con `opcionesCount` leído de
     `expected.opcionesCount` en `validTeileSession` (nuevo campo opcional en la spec,
     usado por B2 teil1 con valor `4`).
  3. `TEIL_NOMBRES` en `lectura veloz.html` era un mapa fijo por `id` con nombres de la
     semántica de B1 (p. ej. "Teil 2 — Personas y anuncios"), que se habría mostrado
     también para el Teil 2 de B2 (Lückentext) sin ser correcto. Se convirtió en un mapa
     anidado por nivel (`TEIL_NOMBRES.B1`/`TEIL_NOMBRES.B2`, helper `teilNombre(level,
     teilId)`), y se enhebró `level` a través de `modoB_mostrarSelectorTeile` →
     `_pendingTeilSesion.level` → `modoB_iniciarTeilSession` → `TeilState.level` para que
     el nombre correcto se resuelva en cada punto de la UI (selector de Teile, cabecera
     de sesión, desglose final).
  4. `max_tokens` de la llamada a OpenAI se subió de 3500 a 4200 (textos de B2 son más
     largos — 150-200 palabras vs. 100-150 de B1 — con el mismo número de Teile).
  5. Las longitudes de texto por Teil se calibraron por separado en vez de compartir un
     único rango de palabras (`READING_SPECS.B2`, 150-200, pensado para el formato plano
     v1 de un solo artículo): teil1 60-90 palabras por persona (antes 40-60), teil2
     220-300 palabras (hardcodeado en su `promptFragment`, en vez de heredar
     `{minWords}-{maxWords}` — el Lückentext real necesita más contexto alrededor de los
     5 huecos), teil3 mantiene 150-200 vía `{minWords}-{maxWords}` (ya era razonable para
     un texto de comprensión simple), teil4 30-50 palabras por opinión, teil5 30-60
     palabras por párrafo. Se descartó usar un único rango ancho (p. ej. 150-300 para
     todos) porque no diferenciaba Teil2 (necesita tender largo) de Teil3 (debe quedarse
     corto) y no cubría Teil1/4/5, que no usan el placeholder `{minWords}/{maxWords}` en
     absoluto.
- **Nada más requirió cambios**: el dispatcher `format_version`/`READING_TEILE_SPECS[level]`
  en `generateReading`, los 3 renderers de UI por tipo (`renderMcqTeilHtml`,
  `renderRichtigFalschTeilHtml`, `renderEmparejarTeilHtml`), el flujo de estado/navegación
  de sesión (`TeilState`, `modoB_iniciarTeilSession`, `modoB_renderTeilActual`,
  `modoB_comprobarTeilActual`, `modoB_avanzarTeil`, `modoB_mostrarResultadoTeilFinal`), el
  CSS, el botón de nivel B2 en `#comp-level-pills`, y el Modo A — todos ya eran genéricos
  por tipo de tarea y no dependían de B1. Ninguna migración de Supabase nueva
  (`format_version`/`CHECK` de `level` ya cubrían B2).
- **Verificación realizada**: `node --check` de `api/chat.js`/`api/_reading-topics.js`;
  parseo de los bloques `<script>` de `lectura veloz.html` con `new Function`; script
  standalone que reconstruye los validadores y prueba una sesión B2 sintética válida más
  4 variantes inválidas (mcq con conteo de opciones equivocado en ambos sentidos,
  columna derecha más corta que la izquierda, `solucion` apuntando a un id inexistente —
  todas correctamente rechazadas) y confirma que una sesión B1 sintética sigue
  aceptándose tras el refactor de `promptFragment`; también se verificó que
  `buildTeilePrompt` interpola correctamente 100-150 para B1 y 150-200 para B2. **No se
  hizo prueba manual en navegador** (mismo motivo que en la Fase 1: el entorno de
  ejecución no tiene sesión de usuario/browser interactivo) — antes de dar la fase por
  cerrada conviene entrar a `/lectura veloz.html` → Comprensión → Por nivel → B2 →
  Obtener texto, y completar una sesión completa de los 5 Teile una vez desplegado.
- **Pendiente / no incluido en esta fase**: C1/C2 (mismos tipos de tarea que B1/B2,
  reutilizan `mcq`/`emparejar` — solo falta poblar `READING_TEILE_SPECS.C1`/`.C2` con sus
  propios `promptFragment` y nombres, siguiendo el mismo patrón que esta fase), A1/A2
  (sin cambios, siguen necesitando tipos de tarea nuevos).

**Validación manual en navegador — completada (sesión 2026-08-19).** Mismo recipe que en
la Fase 1 (Playwright/Chromium headless contra `vercel dev` local, sesión real inyectada en
`localStorage`). Encontró y corrigió **tres bugs reales**, ninguno visible en la revisión
estática original:

1. **`modoB_obtenerTexto()` nunca generaba contenido v2 si ya existía algún texto v1 legado
   sin ver para ese nivel.** En producción B2 solo tenía 1 fila, `format_version: 1` (previa
   a esta fase) — el primer intento de "Obtener texto" en B2 sirvió ese texto plano legado en
   vez de generar una sesión por Teile, porque `pool = teileUnseen.length > 0 ? teileUnseen :
   unseen` caía a `unseen` (que incluía el v1) en vez de generar. El fix de la Fase 1 (§11)
   solo mitigaba el caso "hay v1 Y v2 sin ver, preferir v2" — no el caso "solo hay v1 sin ver,
   nunca se ha generado ningún v2". Corregido en `lectura veloz.html`: el pool ahora es
   `TEIL_NOMBRES[level] ? teileUnseen : unseen` — para un nivel con soporte Teile, nunca cae a
   texto legado, siempre genera. `TEIL_NOMBRES` (ya existente, claves `B1`/`B2`) se reusa como
   fuente de verdad en vez de duplicar la lista de niveles.
2. **Los validadores exigían `explicacion`/`explicaciones` como obligatorios** en los 3 tipos
   de Teil, pero el frontend (`explicacionHtml()`) ya toleraba su ausencia (renderiza `''`).
   `gpt-4o-mini` omite este campo con bastante frecuencia en los Teile más pesados de B2,
   causando rechazos (502 "formato inesperado") de sesiones por lo demás perfectamente
   utilizables. Se relajó a opcional en `validMcqTeil`/`validRichtigFalschTeil`/
   `validEmparejarTeil` (`api/chat.js`) — solo se valida el tipo si el campo está presente.
3. **Bug más serio: `validEmparejarTeil` nunca comprobaba que `textos` estuviera presente**,
   ni siquiera para los Teile `emparejar` cuyo `promptFragment` sí lo exige (el Lückentext de
   B2 `teil2`, el foro de B1 `teil3`). Una sesión sin el artículo pasaba la validación igual
   — confirmado en vivo: una corrida real mostró en pantalla los 5 `<select>` de "Lücke 1..5"
   sin ningún artículo arriba, un ejercicio literalmente irresoluble. Corregido añadiendo
   `requiereTextos: true` a esas dos entradas en `READING_TEILE_SPECS` (`api/_reading-topics.js`)
   y haciendo que `validTeileSession` pase el `expected` spec completo a cada validador (mismo
   patrón que ya existía para `opcionesCount`) en vez de solo el conteo de opciones, para que
   `validEmparejarTeil` pueda exigir `textos` cuando corresponda.

**Hallazgo de fiabilidad — encontrado y resuelto en la misma sesión (rediseño de
arquitectura de generación).** Con los tres fixes de validación aplicados, se hicieron 12
llamadas reales a OpenAI (mismo prompt/validador que producción) para medir la tasa de éxito
de B2 con el diseño original de §11/§5 (una sola llamada genera los 5 Teile de golpe). **0 de
12 pasaron la validación completa** — la mayoría falló específicamente en `teil2`
(Lückentext): el modelo omitía el artículo, cortaba la sesión después de 1 Teil, o generaba
un array `teile` corrupto. Reforzar el prompt en el sitio (`teil2` con "OBLIGATORIO", más una
línea final "no te detengas antes de terminar el último Teil") no dio mejora medible. Antes
de los fixes de validación, una tasa de aparente "éxito" más alta (3/4 en una muestra
temprana) era engañosa — esas sesiones habrían pasado el validador viejo con `teil2` roto
(bug 3 de arriba).

**Cambio de arquitectura (decisión del usuario, no solo mío):** en vez de aceptar esta tasa
de fallo o seguir parchando el prompt de la llamada combinada, se reemplazó el diseño de "una
llamada para los 5 Teile" (§5/§11) por **una llamada independiente por Teil, las 5 en
paralelo (`Promise.allSettled`), con hasta 2 intentos por Teil antes de fallar esa sesión**.
Revierte deliberadamente la decisión de costo/latencia de §11 (justificada entonces por ser
"más barato y más simple") a la luz de la evidencia de que la llamada combinada no era
confiable para B2. Cambios en `api/chat.js`:
- `buildTeilePrompt`/`validTeileSession` (multi-Teil) eliminados, reemplazados por
  `buildSingleTeilPrompt`/`schemaEjemploTeil` (prompt + ejemplo de JSON para un solo Teil,
  derivados de `expected.tipo`/`opcionesCount`/`requiereTextos`) y `generateOneTeil` (llama a
  `generateOneTeilAttempt` hasta 2 veces, reusando `TEIL_VALIDATORS` sin cambios).
- `generateReadingTeile` ahora dispara `Promise.allSettled(spec.map(...))`, junta los 5
  resultados en `{titulo, teile}` y solo entonces hace el INSERT a Supabase — igual que antes
  desde la perspectiva del frontend (mismo contrato de respuesta, cero cambios en
  `lectura veloz.html` para esto).
- `title`/`titulo` de la sesión ya no lo genera la IA (no hay una llamada "dueña" de la
  sesión completa) — se usa directamente el `tema` elegido por `pick(TEMAS[level])` como
  título. Es un cambio cosmético sin impacto funcional: se confirmó que `titulo` nunca se
  muestra como encabezado en la UI, solo se usa internamente (`TeilState.titulo`) para el
  deep-link "Escribir sobre este tema" hacia `escritura.html?tema=...`, y `TEMAS[level]` ya
  son frases en español aptas como tema de escritura.
- `console.error` agregado en el punto de rechazo final (qué Teil falló y por qué) — antes
  era una caja negra total; diagnosticar el bug de `teil2` requirió replicar el prompt/
  validador en un script standalone aparte porque no había ninguna visibilidad del lado del
  servidor.

**Resultado medido:** 13/13 sesiones completas exitosas tras el cambio (10 B2 + 3 B1,
25+15 Teile individuales, cero reintentos necesarios en la inmensa mayoría), ~7-16s por
sesión (Promise.allSettled en paralelo, comparable o más rápido que la llamada combinada
anterior). Confirmado además con una sesión real generada por este camino: se inyectó su
JSON directamente en el DOM de la app (vía `modoB_iniciarTeilSession`/`modoB_avanzarTeil`,
sin necesitar login — son funciones puras de render/estado) y se verificó visualmente que el
artículo de `teil2` ahora sí se renderiza sobre los `<select>` de "Lücke 1..5" (antes, bug 3,
aparecían vacíos). El flujo completo end-to-end con login real (Comprensión → Por nivel → B2
→ selector de Teile → 5 Teile respondidos/comprobados → resultado final) ya se había
confirmado sin errores de consola en una corrida anterior de esta misma sesión (esa corrida
fue la que expuso visualmente el bug 3, con la arquitectura vieja).

## 13. Fase 3 (C1) — implementado

Antes de diseñar se investigó la estructura real del Leseverstehen del Goethe-Zertifikat C1
(modelo oficial interactivo `bfu.goethe.de/c1mod/`, confirmado con una segunda fuente
independiente, prepliq.com), en vez de asumir la tabla de §3 tal cual — mismo método que reveló
que esa tabla estaba equivocada para B2. Hallazgo: **C1 tiene 4 Teile, no 5 como B1/B2**:

1. **Teil 1** — Lückentext léxico-gramatical: 1 texto con 8 huecos, cada uno con sus propias 4
   opciones múltiple choice independientes (no comparten opciones entre huecos).
2. **Teil 2** — MCQ de comprensión estándar: artículo + 7 preguntas de 3 opciones.
3. **Teil 3** — Emparejar frases candidatas a huecos: 8 huecos, 10 frases candidatas (2
   distractoras).
4. **Teil 4** — Atribución de afirmaciones a autor: 3 opiniones de expertos, 7-8 afirmaciones a
   atribuir (algunas sin match — "x").

Igual que en B2 (§12), **los 4 Teile reales encajan sin cambios en `mcq`/`emparejar` ya
construidos** — no hizo falta ningún tipo de tarea nuevo. Se mantienen 5 items por Teil (no los
7/8 reales) por el mismo motivo que en B1/B2: consistencia entre niveles y simplicidad del
generador, sin pretender ser una réplica exacta del examen.

- **`READING_TEILE_SPECS.C1`** (`api/_reading-topics.js`): `teil1` mcq `opcionesCount: 4`
  (huecos léxicos con opciones independientes por item — variante nueva de *uso* de `mcq`, sin
  cambio de schema, ya que cada item ya trae su propio array `opciones`), `teil2` mcq
  `opcionesCount: 3` (reutiliza `{minWords}`/`{maxWords}` de `READING_SPECS.C1`, 200-260
  palabras, mismo patrón que B1 teil1/B2 teil3), `teil3` emparejar `requiereTextos: true`
  (Lückentext de frases, mismo patrón que B2 teil2, texto más largo — 250-320 palabras), `teil4`
  mcq `opcionesCount: 4` (3 expertos + una 4ª opción "Keiner von ihnen" explícita, opciones
  compartidas entre items, mismo patrón que B2 teil1). `TEMAS.C1` y `READING_SPECS.C1` ya
  existían y no se tocaron. La longitud de `teil1` se ajustó de un primer borrador de 120-160
  palabras a **150-200** durante la revisión de diseño (5 huecos léxicos con distractores
  plausibles necesitan más contexto alrededor). Se decidió, siguiendo el precedente de B2 de
  relajar validaciones de contenido/distribución poco fiables, **no forzar en el validador** que
  al menos un item de `teil4` resuelva a "Keiner von ihnen" — solo se pide como sugerencia no
  vinculante en el prompt.
- **`TEIL_NOMBRES.C1`** (`lectura veloz.html`): añadido con el mismo patrón que B1/B2. Ningún
  otro cambio en este archivo — `modoB_obtenerTexto()`, los renderers (`renderMcqTeilHtml`,
  `renderEmparejarTeilHtml`), `TeilState` y la agregación de resultado final ya eran genéricos
  por `tipo`/forma y no requirieron ninguna rama nueva.
- **`api/chat.js`**: confirmado que el dispatcher, `generateOneTeil`/`generateOneTeilAttempt`,
  `TEIL_VALIDATORS` y `schemaEjemploTeil` ya eran 100% genéricos por `spec =
  READING_TEILE_SPECS[level]` — no requirieron cambios de lógica para soportar C1.
- **Migración Supabase**: ninguna — `reading_texts.level` ya permitía `'C1'` en su `CHECK`.

**Hallazgo real durante la verificación (no específico de C1, arquitectura compartida):** al
correr ~26 llamadas reales a OpenAI contra los 4 Teile de C1, `teil2` (el patrón más simple y ya
probado, idéntico a B1 teil1/B2 teil3) falló la validación ~23% de las veces — no por un problema
de C1, sino porque `gpt-4o-mini` ocasionalmente devuelve las claves del JSON en alemán (`frage`,
`optionen`, `erklaerung`) en vez de español (`pregunta`, `opciones`, `explicacion`), aparentemente
arrastrado por el idioma del contenido del texto. Este riesgo ya existía en B1/B2 (mismo prompt
compartido) mitigado únicamente por los 2 reintentos de `generateOneTeil`, pero nunca se había
diagnosticado explícitamente. **Fix aplicado en `buildSingleTeilPrompt`** (`api/chat.js`, una
sola línea, genérico para todos los niveles/Teile, no solo C1): se añadió al final del prompt
"IMPORTANTE: usa EXACTAMENTE los nombres de campo del JSON de ejemplo de arriba (están en
español) — nunca los traduzcas ni los sustituyas por nombres en alemán, aunque el contenido del
texto sea en alemán." Verificado con una segunda tanda de 16 llamadas a `teil2`: la tasa de éxito
subió de ~77% a ~94% (15/16). Este fix beneficia también a B1/B2 y a la futura C2, no solo a C1.

**Verificación realizada:**
- `node --check` de `api/chat.js`/`api/_reading-topics.js`; parseo de los bloques `<script>` de
  `lectura veloz.html` con `new Function`.
- Validadores standalone: 12/12 casos (4 specs de C1 con sesión válida + variantes rotas —
  `opcionesCount` incorrecto, `teil3` sin `textos`, `solucion` a id inexistente, `columnaDerecha`
  más corta — todas correctamente aceptadas/rechazadas; regresión de sesiones sintéticas B1/B2
  sin romper).
- Llamadas reales a OpenAI por Teil (con el fix de prompt aplicado): **24/24** (6 intentos por
  cada uno de los 4 Teile) pasaron la validación estructural — iguala el 13/13 post-fix de B2.
- Sesión completa end-to-end (`generateReadingTeile('C1')` reconstruido, incluyendo el INSERT
  real a Supabase con el service role, mismo mecanismo que producción): **3/3** sesiones
  completas insertadas correctamente en `reading_texts` con `format_version: 2` y 4 Teile cada
  una — esas filas quedan como contenido real utilizable por estudiantes, no se revirtieron.
- Revisión manual de contenido (2-3 muestras de `teil1`/`teil3`, los Teile más nuevos): `teil2`,
  `teil3` y `teil4` de las muestras revisadas fueron semánticamente coherentes (huecos-frase
  bien enlazados, atribuciones a expertos correctas incluyendo un caso correcto de "Keiner von
  ihnen" sin haberlo forzado). **`teil1` mostró un caso de hueco con respuesta marcada incorrecta**
  en una muestra (un hueco léxico donde la opción "correcta" no encajaba semánticamente en la
  frase) — ningún validador de este proyecto comprueba corrección semántica de ningún Teil, en
  ningún nivel (riesgo ya aceptado y documentado desde B1: la app es una herramienta de práctica
  de formato, no una réplica exacta ni garantiza contenido semánticamente perfecto en el 100% de
  los casos). No se consideró bloqueante para cerrar la fase.
- **No se hizo prueba manual en navegador con login real** (mismo motivo que en fases
  anteriores) — antes de dar la fase por completamente cerrada conviene entrar a
  `/lectura veloz.html` → Comprensión → Por nivel → C1 → Obtener texto, y completar una sesión
  completa de los 4 Teile una vez desplegado. Al ya existir 3 sesiones C1 `format_version: 2`
  reales en producción (insertadas durante esta verificación), la primera vez que un usuario
  entre a C1 debería obtener directamente una de ellas sin necesitar generar una nueva.

**Pendiente / no incluido en esta fase**: C2 (mismos tipos de tarea, reutiliza los renderers y
el fix de prompt ya aplicado — falta solo investigar la estructura real del Modellsatz C2,
poblar `READING_TEILE_SPECS.C2` y `TEIL_NOMBRES.C2` siguiendo este mismo patrón), A1/A2 (sin
cambios, siguen necesitando tipos de tarea nuevos).

## 14. Fase 4 (C2) — implementado

Investigada la estructura real del Leseverstehen del Goethe-Zertifikat C2
(`bfu.goethe.de/c2_mod/lesen.php`, confirmado). C2 tiene 4 Teile, igual que C1:

1. **Teil 1** — Kommentar (comentario de opinión) + MCQ 4 opciones, 10 preguntas reales.
2. **Teil 2** — Artículo dividido en secciones numeradas ↔ 8 afirmaciones que resumen cada
   sección (2 distractoras en el examen real) — emparejar.
3. **Teil 3** — Reportage con Lückentext: 6 huecos ↔ 7 fragmentos candidatos (1 distractor) —
   emparejar.
4. **Teil 4** — 4 anuncios de empleo ↔ 8 afirmaciones sobre el perfil buscado, relación
   muchos-a-pocos (cada afirmación se asigna a UNO de los 4 anuncios, con anuncios repetibles
   entre afirmaciones).

Igual que en B2/C1 (§12/§13), **los 4 Teile encajan sin cambios en `mcq`/`emparejar` ya
construidos**. El Teil 4 real usa una relación muchos-a-pocos (8 afirmaciones → solo 4
anuncios) que **no encaja en `emparejar`** porque `validEmparejarTeil` exige
`columnaDerecha.length >= columnaIzquierda.length` (para permitir distractores, no para
permitir opciones repetidas) — se modela como `mcq` con opciones compartidas/repetibles entre
items, mismo patrón que B2 teil1 (4 personas/opiniones) y C1 teil4 (3 expertos + "Keiner von
ihnen"). Se mantienen 5 items por Teil (no los 10/8/6/8 reales), mismo motivo que B1/B2/C1:
consistencia entre niveles y simplicidad del generador.

- **`READING_TEILE_SPECS.C2`** (`api/_reading-topics.js`): `teil1` mcq `opcionesCount: 4`
  (comentario de opinión, reutiliza `{minWords}`/`{maxWords}` de `READING_SPECS.C2`, 250-300
  palabras, mismo patrón que B1 teil1/B2 teil3/C1 teil2), `teil2` emparejar
  `requiereTextos: true` (artículo de 220-300 palabras dividido en 5 secciones `[1]`.."[5]"` ↔
  8 afirmaciones-resumen, 3 distractoras — mismo patrón estructural que el Lückentext de B2
  teil2/C1 teil3, pero secciones completas en vez de huecos puntuales), `teil3` emparejar
  `requiereTextos: true` (reportaje de 280-350 palabras con 5 huecos ↔ 8 fragmentos
  candidatos, 3 distractores — mismo patrón que B2 teil2/C1 teil3), `teil4` mcq
  `opcionesCount: 4` (4 anuncios de empleo, opciones compartidas y repetibles entre items,
  mismo patrón que B2 teil1/C1 teil4). `TEMAS.C2` y `READING_SPECS.C2` ya existían y no se
  tocaron.
- **`TEIL_NOMBRES.C2`** (`lectura veloz.html`): ya estaba presente en el árbol de trabajo antes
  de iniciar esta fase (añadido en un cambio previo no confirmado en este documento, mismo
  patrón exacto que B1/B2/C1) — se verificó que los nombres coinciden con los de
  `READING_TEILE_SPECS.C2` sin necesitar ningún ajuste. Ningún otro cambio en este archivo —
  `modoB_obtenerTexto()`, los renderers y `TeilState` ya eran genéricos por `tipo`/forma.
- **`api/chat.js`**: confirmado que el dispatcher, `generateOneTeil`/`generateOneTeilAttempt`,
  `TEIL_VALIDATORS`, `schemaEjemploTeil` y `buildSingleTeilPrompt` ya eran 100% genéricos por
  `spec = READING_TEILE_SPECS[level]` — no requirieron ningún cambio de lógica para soportar
  C2. El fix de nombres de campo en español de la Fase 3 (§13) ya cubre C2 automáticamente por
  ser genérico. **Ningún cambio en `api/chat.js` en esta fase.**
- **Migración Supabase**: ninguna — `reading_texts.level` ya permitía `'C2'` en su `CHECK`
  desde la migración `003_reading_texts.sql`.

**Verificación realizada:**
- `node --check` de `api/chat.js`/`api/_reading-topics.js`: OK en ambos.
- Validadores standalone (script temporal en scratchpad, no en el repo, copiado verbatim de
  `api/chat.js`): 13/13 casos — sesión válida por Teil (4) + variantes rotas por Teil
  (`opcionesCount` incorrecto, `textos` faltante con `requiereTextos: true`, `solucion`
  apuntando a un id inexistente, `columnaDerecha` más corta que `columnaIzquierda`) — todas
  correctamente aceptadas/rechazadas.
- Llamadas reales a OpenAI (`OPENAI_API_KEY` presente en `.env.local`, replicando
  `buildSingleTeilPrompt`/`generateOneTeilAttempt` en un script standalone): **24/24** (6
  intentos por cada uno de los 4 Teile) pasaron la validación estructural — iguala el 24/24 de
  C1 (§13) tras el fix de nombres de campo en español, confirmando que ese fix beneficia
  también a C2 sin necesitar ningún ajuste adicional.
- Revisión manual de contenido (1 muestra completa de los 4 Teile): semánticamente coherente —
  `teil2` mapea correctamente cada sección `[1]`.."[5]"` a su afirmación-resumen, `teil3`
  enlaza los fragmentos candidatos en los huecos `[1]`.."[5]"` con sentido narrativo, `teil4`
  atribuye afirmaciones a los anuncios correctos (incluyendo dos afirmaciones compartiendo el
  mismo anuncio correcto, como permite el diseño). Sin hallazgos de contenido incorrecto en
  esta muestra (a diferencia de C1 §13, que sí encontró un hueco léxico mal marcado en una
  muestra — riesgo general ya aceptado, ningún validador de este proyecto comprueba corrección
  semántica).
- **No se hizo prueba manual en navegador con login real** (mismo motivo que en fases
  anteriores) — antes de dar la fase por completamente cerrada conviene entrar a
  `/lectura veloz.html` → Comprensión → Por nivel → C2 → Obtener texto, y completar una sesión
  completa de los 4 Teile una vez desplegado. No se insertó ninguna sesión C2 real en
  `reading_texts` durante esta verificación (solo generación en memoria, sin llamar al INSERT
  de Supabase) — a diferencia de C1 (§13), la primera vez que un usuario entre a C2 disparará
  una generación real.

**Pendiente / no incluido en esta fase**: A1/A2 (necesitan tipos de tarea nuevos —
emparejar de notas muy cortas, carteles — no modelados aún).

## 15. Fase 5 (A1/A2) — implementado

Investigada la estructura real del Leseverstehen de Goethe-Zertifikat A1 (Start Deutsch 1,
`bfu.goethe.de/a1_sd1/lesen.php`) y A2 (`bfu.goethe.de/a2_mod_2MX5/lesen.php`), en vez de
asumir la tabla de §3 tal cual — mismo método que reveló que esa tabla estaba equivocada
para B2. Hallazgo, igual que en fases anteriores: **el §3 original era aproximadamente
correcto en el tipo de tarea pero no en el detalle**, y ni A1 ni A2 requieren ningún tipo
de tarea nuevo — la predicción de §14 ("necesitan tipos de tarea nuevos") no se confirmó.

- **A1 — 3 Teile reales, 5 ítems cada uno:**
  1. Richtig/falsch sobre 2 textos cortos (SMS, cartas breves, anuncios).
  2. "Wo finden Sie Informationen?" — emparejar una situación/necesidad con la página web
     o categoría de información correcta.
  3. Richtig/falsch sobre avisos/carteles públicos (consulta médica, escuela, estación...).
- **A2 — 4 Teile reales, 5 ítems cada uno:**
  1. Artículo de revista/periódico + MCQ 3 opciones.
  2. Directorio/guía (p. ej. plantas de unos grandes almacenes) + MCQ 3 opciones.
  3. Correo electrónico personal + MCQ 3 opciones.
  4. Emparejar anuncios con personas — 6 anuncios, 5 personas, 1 anuncio sin match
     (distractor), igual que en el examen real.

Igual que en B2/C1/C2 (§12/§13/§14), **los 7 Teile combinados encajan sin cambios en
`mcq`/`richtig_falsch`/`emparejar` ya construidos** — A1 es, de hecho, el segundo y tercer
consumidor real de `richtig_falsch` (antes solo lo usaba B1 teil4). Se mantienen 5 ítems
por Teil (no los reales del examen) por el mismo motivo que en niveles anteriores.

- **`READING_TEILE_SPECS.A1`/`.A2`** (`api/_reading-topics.js`): añadidas siguiendo el
  mismo estilo exacto (`id`, `tipo`, `nombre`, `promptFragment`) que las entradas
  existentes. A1 reutiliza `{minWords}`/`{maxWords}` de `READING_SPECS.A1` (30-50, ya
  pensado para textos muy cortos tipo SMS/aviso, apto tal cual para el formato Teile).
  A2 **no** reutiliza `READING_SPECS.A2` (50-80) para sus tres Teile `mcq` — ese rango
  está calibrado para el flujo plano v1 (un único mensaje muy breve) y se queda corto
  para sostener 5 preguntas de comprensión reales; se hardcodearon rangos por Teil en el
  propio `promptFragment` (90-120 / 60-90 / 100-140 palabras), mismo patrón de
  calibración manual que se usó para B2 en su momento (§12, punto 5). Ninguna entrada
  `emparejar` de A1/A2 necesitó `requiereTextos: true` — a diferencia de los Lückentext de
  B2/C1/C2, ninguno de los dos Teile de emparejar (A1 teil2, A2 teil4) depende de un
  texto compartido: cada ítem de la columna derecha ya trae su propio contenido breve
  (igual que B1 teil2, personas↔anuncios).
- **`TEIL_NOMBRES.A1`/`.A2`** (`lectura veloz.html`): añadidas en paralelo a las specs del
  backend, mismo patrón que B1-C2 — paso obligatorio para que
  `modoB_obtenerTexto()` (línea ~1599, `TEIL_NOMBRES[level] ? teileUnseen : unseen`)
  active el filtro `format_version === 2` para A1/A2; sin esto, ambos niveles habrían
  seguido sirviendo el formato plano legado indefinidamente sin ningún error visible
  (mismo bug real ya documentado en §12, bug 1).
- **Nada más requirió cambios**: dispatcher, validadores (`validMcqTeil`,
  `validRichtigFalschTeil`, `validEmparejarTeil`), `schemaEjemploTeil`,
  `buildSingleTeilPrompt`, `generateOneTeil`/`generateReadingTeile`, los 3 renderers de
  frontend, `TeilState`, navegación de sesión y agregación de resultado final ya eran
  100% genéricos por `tipo` y ya incluían A1/A2 en `#comp-level-pills`. Ninguna migración
  de Supabase nueva — el `CHECK` de `level` en `reading_texts` (migración 003) ya
  permitía A1/A2, y `format_version` (migración 011) no tiene restricción por nivel.
- **`TEMAS.A1`/`.A2` y `READING_SPECS.A1`/`.A2`**: ya existían (usados por el flujo v1
  legado) y no se tocaron — la Fase 5 solo añadió las specs Teile, reutilizando `TEMAS`
  tal cual para el tema de fondo de cada sesión.

**Verificación realizada:**
- `node --check` de `api/_reading-topics.js`: OK. Ningún cambio de lógica en `api/chat.js`
  en esta fase (confirmado que el dispatcher/validadores/generador ya eran genéricos), por
  lo que no hizo falta re-verificar su sintaxis más allá de la comprobación de referencia.
- Parseo de los bloques `<script>` de `lectura veloz.html` con `new Function`: OK.
- Validadores standalone (script temporal en scratchpad, no en el repo, copiado verbatim
  de `api/chat.js`): **7/7** sesiones sintéticas válidas (una por Teil nuevo) aceptadas,
  más variantes rotas por tipo (`opcionesCount` incorrecto en los 3 `mcq` de A2,
  `columnaDerecha` más corta que `columnaIzquierda` y `solucion` a id inexistente en los 2
  `emparejar`) correctamente rechazadas.
- Llamadas reales a OpenAI (`OPENAI_API_KEY` presente en `.env.local`, replicando
  `buildSingleTeilPrompt`/`generateOneTeilAttempt` en un script standalone): **42/42** (6
  intentos por cada uno de los 7 Teile nuevos) pasaron la validación estructural — mejor
  incluso que el ~90-94% típico de B2/C1 (§12/§13), consistente con que los textos A1/A2
  son mucho más cortos y el modelo tiene menos superficie donde fallar.
- Revisión manual de contenido (1 muestra completa de los 7 Teile): semánticamente
  coherente en todos los casos — el nivel de alemán usado es apropiado para A1/A2, las
  afirmaciones richtig/falsch de A1 se corresponden con el contenido de los textos, los
  emparejamientos de A1 teil2/A2 teil4 son lógicos (incluyendo el distractor sin match en
  A2 teil4). Sin hallazgos de contenido incorrecto en esta muestra (a diferencia de C1
  §13, que sí encontró un hueco léxico mal marcado) — de todos modos, ningún validador del
  proyecto comprueba corrección semántica en ningún nivel, riesgo ya aceptado.
- **No se hizo prueba manual en navegador con login real** (mismo motivo que en fases
  anteriores) — antes de dar la fase por completamente cerrada conviene entrar a
  `/lectura veloz.html` → Comprensión → Por nivel → A1 y A2 → Obtener texto, y completar
  una sesión completa una vez desplegado. No se insertó ninguna sesión A1/A2 real en
  `reading_texts` durante esta verificación (solo generación en memoria vía script
  standalone, sin llamar al INSERT de Supabase) — la primera vez que un usuario entre a
  A1 o A2 disparará la primera generación real con `format_version: 2`.

**Pendiente / no incluido en esta fase**: ninguno — las 6 fases planeadas (§9) están
completas. Riesgos generales que siguen abiertos para todos los niveles: ningún validador
comprueba corrección semántica del contenido generado (§10, aceptado desde B1); el costo
de generación (una llamada IA por Teil, 3-5 Teile por sesión) no se ha revisado bajo
volumen real de uso (§10, última viñeta).
