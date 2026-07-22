# Plan de Mejoras — Ejercicios Alemán

> Fecha: 2026-05-01  
> Base: auditoría completa del codebase. El plan.md anterior documenta lo ya construido; este archivo cubre la siguiente fase.

---

## Qué se ejecutó (2026-05-04)

**Panel de progreso por usuario ✅**
- `auth.js` → `openStatsPanel()` reescrito para incluir:
  - Sección **HOY** dividida en dos tarjetas horizontales: palabras respondidas + % de acierto (azul) y audios enviados (verde).
  - **Gráfica de barras 30 días** — una barra por día, altura proporcional al máximo diario; azul oscuro = hoy, azul claro = días con práctica, gris = sin práctica. Hover muestra: `MM/DD · N palabras · N audios`.
  - **Racha** — contador de días consecutivos con al menos una palabra respondida, mostrándose si ≥ 2 días.
  - Sección **Todo el tiempo** con los totales históricos (palabras, diccionario, audios, sesiones).
- La query a `usage_events` ahora incluye `created_at`; la agrupación por día se hace en el cliente con `toLocaleDateString('sv-SE')` para respetar la zona horaria local.
- Los audios por día se calculan en paralelo a las palabras con su propio `audiosByDay` map.

---

## Qué se ejecutó (2026-05-01)

**Limpieza inicial:**
- Eliminado bloque HTML comentado `<!-- Botones modo ... -->` en `palabrasB2.html` y `B1.html`.
- Eliminado comentario muerto `/* DATA se carga desde DATA.json */` en `palabrasB2.html`.

**Mejora 1 — `shared-game.js` ✅**
- Creado `shared-game.js` (697 líneas) con toda la lógica de juego compartida.
- `palabrasB2.html` y `B1.html` reducidos de ~1 100 líneas a 150 líneas cada uno.
- `B1.html` recibió el input `filter-lista` que le faltaba (paridad con B2).
- Cada página define `window.APP_CONFIG` con sus valores específicos antes de cargar el script.

**Mejora 2 — `config.js` ✅**
- Creado `config.js` con `window.SUPA_URL` y `window.SUPA_KEY`.
- Eliminadas las credenciales duplicadas de `auth.js` y `diccionario.js`.
- Eliminadas de `admin/index.html`; usa las globales de `config.js`.
- `config.js` añadido al `<head>` de las 5 páginas + admin.
- `diccionario.js` ahora usa `window.sb` de `auth.js` en lugar de crear su propio cliente.

**Mejora 3 — Auth duplicado en `lectura veloz.html` ✅**
- Eliminadas 109 líneas de auth duplicado (OTP, logout, updateAuthUI, etc.).
- LV ahora usa `window.openAuthModal`, `window.sb`, `window.currentUser` de `auth.js`.
- La lógica específica de LV (`onSignedIn`, `syncToCloud`) se preserva y conecta vía `window.onAuthSignedIn`.

---

## Problemas técnicos — por prioridad

### 🔴 Alta

#### ~~1. Duplicación masiva B2 / B1~~ ✅ COMPLETADO

~~`palabrasB2.html` y `B1.html` son ~95% idénticos (~1 100 líneas cada uno).~~

**Resultado:** `shared-game.js` creado (697 líneas). `palabrasB2.html` y `B1.html` reducidos de ~1 100 líneas a 150 líneas cada uno. `B1.html` recibió el input `filter-lista` que le faltaba.

---

#### ~~2. Credenciales Supabase duplicadas en 5 archivos~~ ✅ COMPLETADO

~~`auth.js`, `diccionario.js`, `lectura veloz.html`, `admin/index.html` y `api/admin-invite.js` definen la misma URL y clave pública.~~

**Resultado:** `config.js` creado con `window.SUPA_URL` y `window.SUPA_KEY`. Duplicados eliminados de `auth.js`, `diccionario.js` y `admin/index.html`. Añadido al `<head>` de las 5 páginas + admin.

---

#### ~~3. Auth duplicado en `lectura veloz.html`~~ ✅ COMPLETADO

~~Las líneas 658–766 reimplementan `openAuthModal`, `sendOtp`, `verifyOtp` y `logout` de forma completamente separada de `auth.js`.~~

**Resultado:** Eliminadas 109 líneas de auth duplicado. LV usa `window.openAuthModal`, `window.sb`, `window.currentUser` de `auth.js`. La lógica específica de LV (`onSignedIn`, `syncToCloud`) se preserva vía `window.onAuthSignedIn`.

---

#### ~~4. Variables CSS en `styles.css`~~ ✅ COMPLETADO

~~`#1976D2` (azul B2) y `#388E3C` (verde B1) aparecen hardcodeados en múltiples selectores de `styles.css`.~~

**Resultado:** Bloque `:root` añadido al inicio de `styles.css` con seis variables: `--color-b2`, `--color-b2-dark`, `--color-b1`, `--color-b1-dark`, `--color-danger`, `--color-danger-dark`, `--radius`, `--gap`. Todos los usos hardcoded de esos colores en las secciones B2, B1 y Diccionario reemplazados por `var(--…)`.

---

#### 5. Sin rate limit en `api/admin.js`
Confirmado vigente (2026-07-18): `admin-invite.js` ya no existe — se fusionó en `api/admin.js` (dispatch por `action`: `invite` / `set-status`, ver `CLAUDE.md`). El archivo usa `verifyJWT` de `_lib.js` pero **no** llama a `createRateLimiter()` en ningún punto (verificado por grep). Un admin puede invitar sin límite de frecuencia.

**Pasos de ejecución:**
1. Revisar compatibilidad: `_lib.js` exporta `createRateLimiter()` con el mismo patrón usado en `chat.js`/`whisper.js`/`vision.js`/`tts.js`/`finanzas.js` — reutilizar sin modificar `_lib.js`.
2. En `api/admin.js`, instanciar un limiter con clave por usuario (payload.sub del JWT, no IP — como es admin-only y ya hay JWT verificado, es más preciso que IP) y aplicarlo antes del `if (action === 'invite')`.
3. Límite propuesto: 5 invitaciones/min (bajo porque es una acción administrativa poco frecuente); `set-status` puede compartir el mismo limiter o ir sin límite (es una acción interna de moderación, menor riesgo de abuso).
4. Probar con `vercel dev`: 6 invitaciones seguidas al mismo email de prueba → la 6ª debe devolver 429.

---

#### 6. Sin límite de tamaño en `api/whisper.js`
Confirmado vigente (2026-07-18): sin comprobación de `content-length` en el archivo. El endpoint acepta audio sin verificar el tamaño. Un archivo muy grande puede agotar la memoria del servidor Vercel.

**Pasos de ejecución:**
1. Revisar compatibilidad: `whisper.js` ya hace `Promise.all` entre `verifyJWT` y la lectura del body (optimización de latencia) — el chequeo de tamaño debe ir **antes** de leer el body completo, no después, para que el ahorro de memoria sea real.
2. Añadir el guard sobre `req.headers['content-length']` al inicio del handler, devolviendo 413 si supera el límite (10 MB es holgado para ~60s de audio comprimido; ajustar si el cap de grabación cambia).
3. Nota: `content-length` puede faltar o ser falso en streaming — si Vercel no lo garantiza para esta función, considerar además un límite acumulado al leer el stream (defensa en profundidad), pero el chequeo de header es la mejora de bajo esfuerzo a aplicar primero.
4. Probar con `vercel dev` enviando un archivo de prueba >10MB y confirmar 413 sin que la función procese el audio.

---

### 🟡 Media

#### 7. Admin dashboard — todo inline
`admin/index.html` tiene 416 líneas de JS mezclado con el HTML. Difícil de leer y de mantener.

**Solución:** Extraer a `admin/admin.js` y `admin/admin.css`. El HTML queda solo con la estructura y los imports.

---

#### 8. Sin timeout en llamadas a OpenAI
Confirmado vigente (2026-07-18): ningún `AbortController`/timeout explícito en `api/chat.js` (grep sin resultados). `vercel.json` fija `maxDuration: 60` para todas las funciones, así que el margen real es 60s, no 30s — igual conviene abortar antes para dar un error claro en vez de que Vercel mate la función en seco.

**Pasos de ejecución:**
1. Añadir el patrón `AbortController` (ejemplo abajo) a las llamadas `fetch` a OpenAI en `api/chat.js`, `api/whisper.js`, `api/vision.js`, `api/tts.js` y `api/image.js` — todas comparten el mismo riesgo.
2. Timeout propuesto: 25s para `chat.js`/`vision.js`/`tts.js` (respuestas cortas), 45s para `whisper.js`/`image.js` (audio largo / generación de imagen, más lentos), dejando margen bajo los 60s de `maxDuration`.
3. Al abortar, devolver un error JSON claro (`504` o `503` con mensaje "El servicio de IA tardó demasiado, intenta de nuevo") en vez de dejar que el timeout de Vercel devuelva una respuesta vacía/genérica al cliente.
4. Patrón a replicar en cada archivo:
```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 25000);
try {
  const r = await fetch(url, { signal: controller.signal, ...opts });
} finally {
  clearTimeout(timer);
}
```

---

#### 9. `escapeHtml` reimplementado en 10 archivos distintos
Confirmado y ampliado (2026-07-18) — grep sobre el repo actual encuentra la misma función reimplementada de forma independiente en: `admin/index.html` (`esc`), `corrector.js` (`escHtml`), `escritura.html` (`escHtml`), `gramatica.js` (`esc`), `kasus.html` (`escHtml`), `lectura veloz.html` (`escHtml`), `mundliche.html` (`escHtml`), `shared-game.js` (`escapeHtml`), `marketing/emails.html` (`escapeHtml`), `teacher/index.html` (`esc`). Ha crecido de 3 a 10 sitios desde la última auditoría — cada archivo nuevo que necesita escapar HTML copia la función en vez de importarla.

**Pasos de ejecución:**
1. Crear `utils.js` (o añadir a `config.js`, que ya se carga en casi todas las páginas antes que el resto de scripts) con una única `window.escapeHtml(s)` — usar la implementación de `shared-game.js` como base (ya es la más probada, usada en el motor de quizzes).
2. Sustituir las 9 reimplementaciones restantes por llamadas a `window.escapeHtml`, eliminando las funciones locales.
3. Verificar orden de carga: `utils.js` debe cargarse antes que cualquier script que la use — mismo `<head>` donde hoy se incluye `config.js` en las 17+ páginas que comparten navbar.
4. Riesgo bajo pero probar manualmente 2-3 páginas representativas (una con datos de usuario renderizados sin sanitizar previamente, ej. `admin/index.html` o `corrector.html`) para confirmar que no hay regresión de XSS tras el cambio.
5. Actualizar `CLAUDE.md` (App Scripts) con la nueva entrada `utils.js` si se crea como archivo separado.

---

#### 10. Accesibilidad básica faltante
Confirmado vigente (2026-07-18): sin `aria-label` ni `:focus-visible` en `shared-game.js` (grep sin resultados).
- Botones de opciones del quiz sin `aria-label` (lector de pantalla no sabe qué opción es correcta).
- No hay `:focus-visible` en modo oscuro — navegación por teclado invisible.
- El filtro de búsqueda no anuncia resultados filtrados a lectores de pantalla.

**Pasos de ejecución:**
1. En `shared-game.js`, función que renderiza `.options-grid`: añadir `aria-label="Opción: <palabra>"` a cada botón de opción al crearlo (no afecta la lógica del quiz, solo el DOM).
2. En `styles.css`, dentro de `body.dark`, añadir una regla `:focus-visible { outline: 2px solid var(--color-b2); outline-offset: 2px; }` (o el color de acento de cada app) — hoy el outline por defecto del navegador puede ser invisible sobre fondo oscuro.
3. Para `#filter-lista` (input de filtro en B1/B2/etc.): añadir un `<div aria-live="polite" class="sr-only">` que se actualice con el conteo de resultados visibles tras cada filtrado (ej. "12 palabras encontradas"), clase `sr-only` visualmente oculta pero leída por lectores de pantalla.
4. Alcance de esta tarea: solo `shared-game.js` (afecta A1-C2 de una vez). Extender el mismo patrón a otras apps (`kasus.html`, `escritura.html`, etc.) queda fuera de esta tarea puntual — evaluar por separado si se prioriza.

---

### 🟢 Baja

#### ~~11. `api/admin-invite.js` solo soporta HS256~~ ✅ RESUELTO (por consolidación de endpoints)

~~`api/chat.js` soporta ES256 + HS256 para JWT. `admin-invite.js` solo HS256. Si Supabase rota algoritmo, admin-invite se rompe.~~

**Resultado:** `admin-invite.js` ya no existe — se fusionó en `api/admin.js` (dispatch por `action: 'invite'|'set-status'`, ver `CLAUDE.md`), que usa `verifyJWT()` de `_lib.js` (ES256 vía JWKS + fallback HS256), el mismo verificador dual que `chat.js`. Confirmado por código: `api/admin.js` importa y llama `verifyJWT` de `_lib.js`. Sin acción pendiente.

---

#### 12. Sin paginación en el admin
Confirmado vigente (2026-07-18): `admin/index.html` sigue con `.limit(10000)` sobre `usage_events`. Con crecimiento de usuarios esto será lento.

**Pasos de ejecución:**
1. Revisar compatibilidad: identificar todos los puntos de `admin/index.html` que consumen ese resultado de 10 000 filas (stats por app, tabla de usuarios, detalle por usuario) — la paginación puede afectar solo a la vista "detalle de eventos" y mantener las agregaciones (stats/gráfica) con una query separada que no necesita traer filas individuales.
2. Server-side: usar `.range(offset, offset + pageSize - 1)` de Supabase sobre `usage_events`, `pageSize` propuesto 50-100.
3. UI: controles "Anterior/Siguiente" (o números de página) en la tabla de eventos; mantener el filtro de búsqueda existente compatible con la paginación (reiniciar a página 1 al cambiar el filtro).
4. Si las agregaciones (stats por app, gráfico de actividad) ya usan `count`/`group by` en vez de traer todas las filas al cliente, no requieren cambios — verificar antes de tocarlas.
5. Probar con el volumen actual (~3 750 filas en `usage_events` según la auditoría de escalabilidad en `plan.md`) para confirmar que no rompe nada aunque el impacto real se note más adelante.

---

## Mejoras pedagógicas y de UX

### 💡 Alto impacto

#### ~~A. Repetición espaciada (SRS básico)~~ ✅ COMPLETADO (ya implementado, doc desactualizada)

Confirmado por código (2026-07-18): `shared-game.js` ya implementa SRS completo con algoritmo SM-2 (no la fórmula mínima que proponía este punto), IndexedDB `srs-db-{APP}` y botón "SRS Repaso" — ver `CLAUDE.md`. Superior a lo que aquí se proponía. Sin acción pendiente.

---

#### B. Historial de progreso por usuario ✅ COMPLETADO (2026-05-04)

~~El usuario no puede ver su rendimiento histórico. El panel de stats muestra solo la sesión actual.~~

**Resultado:** Panel de progreso reescrito en `auth.js`. Muestra: palabras y audios de hoy, gráfica de barras de los últimos 30 días (hover con fecha + palabras + audios), racha de días consecutivos, y totales históricos. No requirió cambios en la BD — datos derivados de `usage_events.created_at` existente.

**Pendiente (fase 2):**
- Botón de descarga CSV del historial propio.
- Gráfica separada por app (B1 vs B2 vs Chat).

---

#### C. Modo Escritura (producción activa) ✅ COMPLETADO (2026-07-22)

Implementado en `shared-game.js`: toggle "✍️ Escritura" junto a `btn-inverso`, persistido por app (`escritura_mode_{appId}`). Sustituye `.options-grid` por un `<input>` + "Comprobar"; corrección exacta o con distancia de Levenshtein ≤ 1 (tolera un tipeo). Se refactorizó la lógica de acierto/error de `handleSelectionPick` a una función común `processAnswer()`, reutilizada por ambos modos, para que el modo escritura alimente el mismo SRS SM-2 y las mismas estadísticas sin duplicar código. No se combina con Auto/Dual porque esos toggles viven en la sección Repetición (`#repeticion-palabras`), una sección distinta a la del quiz — no hacía falta deshabilitarlos entre sí. Afecta A1–C2 de una vez (motor compartido).

~~Confirmado pendiente (2026-07-18): sin toggle ni input de texto en `shared-game.js`. Los quizzes son de reconocimiento (elegir entre 4 opciones). La producción activa — escribir la traducción sin ver opciones — es más exigente y más efectiva. Sigue siendo la mejora pedagógica de mayor impacto de este archivo.~~

**Pasos de ejecución:**
1. Revisar compatibilidad: `shared-game.js` centraliza el render de `.options-grid` y la comprobación de acierto en una única función de flujo (`State` + el handler de click de opción) — el modo escritura debe ramificar ese mismo flujo, no duplicarlo, para no romper el SRS (que ya registra correcto/incorrecto por palabra) ni el modo Auto/Dual (TTS).
2. Añadir toggle "✍️ Modo Escritura" en la barra de controles (mismo patrón visual que los toggles Auto/Dual existentes), persistido en `localStorage` por app (`escritura_mode_{appId}`).
3. Cuando está activo: renderizar `<input type="text">` + botón "Comprobar" en vez de `.options-grid`; en modo Auto/TTS-loop, deshabilitar el modo escritura (no tiene sentido combinarlos) o pausarlo.
4. Corrección: exacta primero (`trim().toLowerCase()`), y si falla, calcular distancia de Levenshtein contra la respuesta correcta — aceptar como correcto si distancia ≤ 1 (tolera un solo error de tipeo), mostrando la palabra correcta igualmente para que el alumno vea el matiz.
5. Reusar el mismo camino de registro de acierto/error que ya alimenta el SRS SM-2, así el modo escritura se beneficia de la repetición espaciada existente sin tocar esa lógica.
6. Alcance: implementar en `shared-game.js` una sola vez (afecta A1-C2 simultáneamente, igual que el resto del motor compartido).

---

#### D. Integración Diccionario → Quiz
Confirmado pendiente (2026-07-18): sin botón "practicar" en `diccionario.js`. El usuario busca una palabra en `diccionario.html` pero no puede practicarla.

**Pasos de ejecución:**
1. Revisar compatibilidad: las listas personales del quiz (B1-C2, vía `shared-game.js`) se guardan en IndexedDB y sincronizan con `word_lists` en Supabase (`is_system=false`, `app_id='shared'`) — reusar exactamente ese esquema (`{ de: string[], es: string[] }`), no crear uno nuevo.
2. En `diccionario.js` → `mostrarResultado()`: añadir botón "➕ Practicar esta palabra" en la tarjeta de resultado, con selector de nivel/app destino (A1-C2) ya que el diccionario no está atado a un nivel.
3. Al hacer clic: upsert en una lista personal fija con nombre reservado (ej. `'mis: Diccionario'`) para el `app_id`/nivel elegido — crear la lista si no existe, o añadir la palabra si ya existe, evitando duplicados.
4. Feedback inmediato: toast/confirmación "Añadida a tu lista de práctica en B1" con enlace directo a `B1.html` (o el nivel elegido).
5. El quiz destino no requiere cambios — ya sabe leer listas personales de `word_lists`/IndexedDB vía `shared-game.js`; solo hay que escribir en el mismo sitio desde el diccionario.

---

#### E. Guardar transcripciones en `chat-voz.html`
Confirmado pendiente (2026-07-18): sin IndexedDB de historial en `chat-voz.html`. Las conversaciones con el AI se pierden al recargar. El usuario no puede revisar vocabulario ni errores.

**Pasos de ejecución:**
1. Revisar compatibilidad: `mundliche.html` y `escritura.html` ya implementan el mismo patrón de historial local (IndexedDB `mundliche-db`/`escritura-db`, panel "📚 Historial", últimos 20 registros) — replicar esa estructura tal cual en vez de diseñar una nueva.
2. Crear IndexedDB `chatvoz-db` (store `conversaciones`): guardar por sesión `{ id, timestamp, nivel, perfil, turnos: [{rol, texto}], duracion_total }` al finalizar o cada N turnos (auto-guardado incremental para no perder la conversación si se cierra la pestaña).
3. Panel lateral/colapsable "📚 Conversaciones" (mismo patrón visual que el historial de `escritura.html`): lista de sesiones anteriores con fecha, nivel y primeras palabras; clic para ver la transcripción completa.
4. Botón "Exportar a .txt" por conversación (`Blob` + `URL.createObjectURL`, sin dependencias nuevas).
5. Opcional (fase 2): resaltar en la transcripción palabras que coincidan con `Data{NIVEL}.json` del nivel activo, para conectar visualmente con el vocabulario ya estudiado — requiere cargar el JSON del nivel en cliente, coste marginal bajo.
6. Aplicar el mismo patrón después a `chatvoz2/index.html`, que comparte arquitectura con `chat-voz.html` (ver `CLAUDE.md`) — evaluar si conviene extraer el historial a una función compartida o duplicarlo, dado que ambas apps ya duplican bastante lógica intencionalmente.

---

#### F. Aviso de límite de grabación en `chat-voz.html`
Confirmado pendiente (2026-07-18): sin contador regresivo visual en el código. La grabación se corta automáticamente a los 60 segundos sin aviso previo.

**Pasos de ejecución:**
1. Localizar el `setInterval`/`setTimeout` que controla el corte a 60s de grabación en `chat-voz.html` (patrón MediaRecorder también usado en `mundliche.html` y `chatvoz2/index.html`).
2. En el tick del intervalo existente, cuando `remaining <= 10`: actualizar el texto/color del botón de grabar (clase CSS `.warn`/`.danger`, amarillo a partir de 10s, rojo a partir de 5s — mismo patrón de clases que `startExamTimer()` en `escritura.html`).
3. Aplicar el mismo fix en `chatvoz2/index.html` y `mundliche.html` si comparten el mismo límite de grabación (verificar `duracion_seg` por Teil en `mundliche.html` — algunos Teile ya usan duraciones distintas de 60s, ajustar el trigger a `teil.duracion_seg - 10`).

---

#### G. Estadísticas de lectura en `lectura veloz.html`
Confirmado pendiente (2026-07-18): sin popup de métricas ni comparación histórica en el código. El lector no muestra métricas de la sesión ni progreso histórico.

**Pasos de ejecución:**
1. Revisar compatibilidad: la posición de lectura ya se guarda por texto (`lv_pos_<id>` en localStorage) — la nueva métrica de sesión puede apoyarse en ese mismo id sin tocar el guardado existente.
2. Al llegar al final del texto (RSVP o blog view): mostrar un modal/popup con palabras leídas, WPM efectivo (usar el WPM configurado más los ajustes manuales durante la sesión, o calcular tiempo total / nº palabras), y tiempo total transcurrido.
3. Guardar un pequeño historial por texto en `localStorage` (`lv_stats_<id>`: array de `{ timestamp, wpm, duracion }`, cap a últimas 10 sesiones) — no requiere IndexedDB ni Supabase, es un dato de bajo volumen.
4. En el popup, si existen sesiones previas del mismo texto, mostrar comparación simple ("Antes: 220 wpm → Ahora: 250 wpm ⬆️").
5. Aplica igual al modo "⚡ Sprint de vocabulario" (ya tiene su propio WPM adaptativo persistido como `lv_sprint_wpm`) — evaluar si conviene un resumen de sesión análogo o si el ajuste adaptativo ya cumple ese rol.

---

#### ~~H. Onboarding para usuarios nuevos~~ ✅ COMPLETADO (ya implementado, doc desactualizada)

Confirmado por código (2026-07-18): `onboarding.js` ya existe y cubre esto con un tour guiado de 6 pasos (más completo que la propuesta original de 3 tooltips) — spotlight overlay, selector de nivel CEFR, tarjeta de vocabulario, plan 30 días, menú, CTA final; persistido como `onboarding_done_v1`, relanzable con botón "?" o `window.startOnboarding()`. Ver `CLAUDE.md`. Sin acción pendiente.

---

### 💡 Impacto medio

#### I. Barra de progreso de vocabulario total
Mostrar "Has visto 87 de 320 palabras en B2" para dar sensación de avance y motivar completar el vocabulario.

**Pasos de ejecución:** en `shared-game.js`, `State.vistos` ya cuenta palabras vistas en la sesión actual pero se resetea (`nextUnseenIndex()` lo reinicia cerca del final del ciclo) — para un contador persistente de "vistas alguna vez" hace falta un set separado guardado en IndexedDB/`srs-db-{APP}` (ya existe una fila por palabra con SRS; basta con contar cuántas tienen `reps >= 1`). Renderizar como barra fija junto a los contadores de stats existentes (`.vistos`/`.errores`/tiempo).

#### J. Compartir resultado
Botón para copiar al portapapeles: `"Hoy respondí 47 palabras correctas en alemán B2 🇩🇪"`. Fácil de implementar, útil para motivación.

**Pasos de ejecución:** los datos de "hoy" ya se calculan en `openStatsPanel()` (`auth.js`) para las tarjetas HOY — añadir un botón "📋 Compartir" ahí mismo que arme el string con esos mismos totales y use `navigator.clipboard.writeText()` (fallback `document.execCommand('copy')` si no hay soporte). No requiere nueva query a Supabase.

#### K. Indicador de nivel CEFR activo en navbar
Mostrar el nivel activo (B1/B2) en el navbar al navegar entre apps para orientar al usuario.

**Pasos de ejecución:** `onboarding_level` ya se persiste en localStorage (usado por `escritura.html` como fallback de `esc_level`) — leerlo en `auth.js` al renderizar el navbar (`_renderNavMenu()`) y mostrar un badge junto al logo/título. Actualizarlo cuando el usuario cambia explícitamente de nivel en cualquier app (haría falta que cada app con selector de nivel escriba a esa misma clave, no solo `escritura.html` — revisar cuáles ya lo hacen antes de asumir consistencia).

---

## Orden sugerido de implementación

**Revisión 2026-07-18:** ítems 8 y 10 estaban marcados ⬜ pero ya están implementados (onboarding y SRS) — corregidos a ✅. Ítem 11 (admin-invite HS256) resuelto por la fusión en `api/admin.js`. El siguiente pendiente de mayor impacto pedagógico real es el **9 — Modo Escritura**.

| # | Tarea | Esfuerzo | Impacto | Estado |
|---|-------|----------|---------|--------|
| 1 | Extraer `shared-game.js` | Alto | Técnico crítico | ✅ |
| 2 | Crear `config.js` con credenciales | Bajo | Mantenimiento | ✅ |
| 3 | Fix auth duplicado en `lectura veloz.html` | Medio | Calidad | ✅ |
| 4 | Variables CSS en `styles.css` | Bajo | Mantenimiento | ✅ |
| 5 | Rate limit en `api/admin.js` (antes `admin-invite.js`) | Bajo | Seguridad | ⬜ |
| 6 | Timeout en llamadas OpenAI (chat/whisper/vision/tts/image) | Bajo | Confiabilidad | ⬜ |
| 7 | Aviso 10 s antes del corte en grabación | Bajo | UX inmediato | ⬜ |
| 8 | Onboarding primera visita | Bajo | Retención | ✅ |
| 9 | Modo Escritura en quiz A1-C2 | Medio | Pedagógico alto | ✅ |
| 10 | Repetición espaciada (SRS) | Medio | Pedagógico alto | ✅ |
| 11 | `api/admin-invite.js` solo HS256 | — | Seguridad | ✅ (resuelto por fusión en `admin.js`) |
| 12 | Historial de sesiones + gráfica | Alto | Motivación | ✅ |
| 13 | Guardar transcripciones chat-voz | Medio | Utilidad | ⬜ |
| 14 | Integración diccionario → quiz | Medio | Pedagógico medio | ⬜ |
| 15 | Paginación admin | Medio | Escalabilidad | ⬜ |
| 16 | Accesibilidad (aria-label, focus-visible) | Medio | Inclusión | ⬜ |
| 17 | Consolidar `escapeHtml` (10 sitios) | Bajo | Mantenimiento | ⬜ |
| 18 | Barra de progreso vocabulario total | Bajo | Motivación | ⬜ |
| 19 | Compartir resultado | Bajo | Motivación | ⬜ |
| 20 | Indicador de nivel CEFR en navbar | Bajo | UX | ⬜ |
| 21 | Sin límite de tamaño en `api/whisper.js` | Bajo | Seguridad | ⬜ |
| 22 | Estadísticas de lectura en `lectura veloz.html` | Medio | Motivación | ⬜ |

---

## Notas de arquitectura

- **Sin build step** — fortaleza por simplicidad. Para `shared-game.js` usar módulos ES nativos (`<script type="module">`) que todos los browsers modernos soportan sin bundler.
- **Rate limiting in-memory** en las APIs serverless funciona en producción con cold starts frecuentes pero puede ser inconsistente bajo alta carga. Si el tráfico crece, migrar a Vercel KV.
- **Supabase como única BD** — mantener el stack simple. No añadir otra capa de persistencia sin necesidad clara.
- **Dark mode por app** — las diferentes claves de localStorage (`darkMode_b2`, `darkMode_b1`, etc.) son intencionales si se quiere estado independiente por app. Si se quiere un modo oscuro global, unificar en `auth.js`.
