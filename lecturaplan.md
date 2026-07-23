# Plan: adaptar "Comprensión" al formato real del examen (Leseverstehen)

> **Estado: Fase 1 (B1) implementada** — ver §11 para el detalle de lo hecho y lo que
> queda pendiente (B2/C1/C2, A1/A2). El resto de este documento describe el diseño
> original; §11 documenta las decisiones tomadas durante la implementación donde
> divergieron de lo planificado aquí.

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
