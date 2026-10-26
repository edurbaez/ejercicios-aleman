# Informe de mejoras de arquitectura — 2026-10-20

> **Estado revisado el 2026-10-26** contra los commits `78bbf47` … `7987718`.

Complementa a `2026-10-20-deuda-tecnica.md`, y las referencias entre corchetes (S1, B1…) remiten a ese informe. Restricciones que se mantienen:

- Sin build system.
- `<script>` plano.
- Hobby limitado a 12 funciones serverless (hoy 11).
- Supabase con RLS como capa de datos.

**Leyenda de estado:** ✅ hecho · 🟡 parcial · ⬜ pendiente · ⛔ bloqueado · 🔁 replanteado (el problema se resolvió por otra vía y cambia el motivo de la propuesta).

---

## Antes de empezar la próxima sesión

1. **Migraciones 025–030 sin ejecutar en Supabase.** Hasta que se ejecuten, las correcciones de S1, S4, D1, S5, D3 y la escritura en el servidor de `writing_submissions` no protegen nada en producción (el código tiene fallbacks). Además, `pg_policies` de `profiles` no se ha podido revisar (MCP caído).
2. **Validación en navegador pendiente:** `cancelRecording()` y el cobro tras transcripción OK en mündliche, chat-reformulaciones, chat-voz y chatvoz2 [B3/B4]. Receta en `docs/dev/browser-validation.md`.
3. **Siguiente bloque recomendado** (en orden):
   1. Fase 0 restante (higiene, < 1 h).
   2. `utils.js` + `api-client.js`. El XSS ya está corregido, así que ahora es deduplicación y no urgencia.
   3. `withApi` en `_lib.js` y extraer `_reading.js` / `_mitexto.js` / `_lookup.js` de `chat.js`.
   4. Prompts al servidor de las apps sin bloqueo: corrector, lectura veloz, gramática (resto) y reformulaciones.

---

## Diagnóstico

El proyecto creció **app a app por copia**: cada HTML nuevo heredó del anterior el recorder, el fetch, el escape, el TTS, el IndexedDB y los prompts. `auth.js` y `shared-game.js` son los únicos módulos compartidos de verdad, y `auth.js` absorbió todo lo transversal hasta volverse un god-object. Esto tiene tres consecuencias:

1. **Los bugs de seguridad se replican**. Había 12 variantes de escape y 3 eran inseguras. *(2026-10-26: las 3 inseguras se corrigieron en el sitio y siguen existiendo 16 funciones de escape.)*
2. **Las reglas transversales se implementan N veces**: el tope de voz está en 4 apps y la paridad entre chat-voz y chatvoz2 depende de la memoria. *(2026-10-26: el arreglo de B3/B4 se copió en las 4 apps, así que la duplicación ha aumentado.)*
3. **La lógica de negocio vive en el cliente**: los prompts y las puntuaciones son manipulables y `/api/chat` funciona como proxy abierto. *(2026-10-26: el proxy ya valida roles y tamaño; quedan 6 apps enviando su propio `system`.)*

La dirección propuesta es **una capa delgada de módulos compartidos en el cliente y acciones con nombre en el servidor**, sin introducir un bundler.

**Regla para no seguir duplicando:** cuando un arreglo afecte a 2 o más apps, se implementa en el módulo compartido correspondiente (aunque se cree en ese momento) y no copiado en cada app. B3/B4 y los escapes no siguieron esta regla.

---

## A. Frontend: capa de módulos compartidos

Son archivos `.js` planos con namespace `window.X`, cargados después de `auth.js`, que se adoptan app a app.

| Módulo | Contenido | Sustituye a | Esfuerzo | Estado |
|---|---|---|---|---|
| `utils.js` | `escapeHtml` (único y completo), `shuffle`, `countWords`, `stripFences`, `toast()`, `confirmDialog()` | 16 funciones de escape, toasts en 3 sitios, `alert()` | 0,5 d | ⬜ Los escapes inseguros se corrigieron en cada app (S2, S6, S7), sin módulo. |
| `api-client.js` | `apiPost(path, body, {timeout, retries})`: `res.text()` → `JSON.parse`, 401 → `openAuthModal`, `AbortController`, error tipado | Unas 20 copias del patrón y los `res.json()` sueltos que quedan (`chat-reformulaciones.html` ×2, `shared-game.js` ×2, `auth.js` ×1) [B7] | 0,5 d | ⬜ |
| `voice-recorder.js` | `createRecorder({maxSeconds, onBlob, onTick})`, `abort()`, cierre de tracks en `pagehide`, `VoiceCap.load()/add()` (registro solo tras éxito), `transcribe(blob, lang)` (con `duration_ms` en el form) | mündliche ×2, chat-reformulaciones, chat-voz, chatvoz2 | 1 d + prueba en navegador | 🔁 B3/B4 resueltos copiando `cancelRecording()` y el cobro tras OK en las 4 apps. El módulo ahora sirve para unificar esas 4 copias. |
| `tts.js` | `speak(text, {lang, rate, premium})` con selección de voz y fallback a `/api/tts` | 7 implementaciones | 0,5 d | ⬜ Ojo: el nombre choca con `api/tts.js`; usar `tts-client.js`. |
| `idb.js` | `openStore(name)` + `createHistoryStore(name, max)` | 8 helpers | 0,5 d | ⬜ |
| `voice-chat-core.js` | `VoiceChatCore.create({appId, storagePrefix, endpoint, whisperLang, maxSystemChars, features})` con burbujas, Modo Repetir, misión y rol | Unas 900 líneas duplicadas entre chat-voz y chatvoz2 | 1,5 d | ⬜ Cada cambio sigue entrando en paralelo (p. ej. el fix de iPhone en `28af230`). |
| `admin-common.js` | Cliente Supabase (o `auth-core`), `requireAdmin()`, `deepseek()`, `esc` | 8 gates, `createClient` en 8 archivos de admin/teacher/marketing, 2 `deepseek()` | 0,5 d | ⬜ |
| `pdf-worksheet.js` | `window.PdfWorksheet` (jsPDF A4) | Código PDF de `teacher/tareas.html` y `lectura veloz.html` | — | ✅ Creado en `cf778d2`, fuera de este plan; sirve de precedente del patrón. |

**División de `auth.js`** (1314 líneas, eran 1271):

- `auth-core.js`: `sb`, sesión, `getAuthToken`, `logEvent` y gate de acceso.
- `auth-ui.js`: modal de login, inyección completa del `<nav>` y del handler del dropdown, panel de stats y `ThemePref.toggle()`.
- `auth-extras.js`: push (incluidas las preferencias de recordatorio e intervalo añadidas en `3d3d1e4`…`7987718`), feedback, trial y time tracking.

Las páginas admin/teacher/marketing cargarían solo `auth-core.js`. Agrupar los globales bajo `window.Auth` y pasar de `onclick` inline a delegación de eventos. **Esfuerzo:** 1-2 d, con riesgo de orden de carga, así que conviene hacerlo al final. **Estado:** ⬜. Entretanto, lo nuevo de push conviene añadirlo ya como bloque autocontenido para que luego pase tal cual a `auth-extras.js`.

**Partir los monolitos** solo cuando se toquen, no como proyecto aparte:

| Propuesta | Estado |
|---|---|
| `lectura veloz.html` (3348 líneas) → `lv-rsvp.js`, `lv-sprint.js`, `lv-comprension.js`. Los prefijos ya marcan los límites. | ⬜ |
| `gramatica.js` (1737 líneas) → `gramatica-quiz.js`, `gramatica-exam.js`, `gramatica-flashcards.js`. | ⬜ |
| Datos inline (`LEVEL_SPECS`, `NIVEL_EXIGENCIA`, `TEMAS`) → `mundliche-data.js` y `escritura-data.js`, siguiendo el precedente de `redemittel-data.js`. | ⬜ (parte de la lógica de escritura ya está en `api/_writing.js`) |

**Orden sugerido:**

1. `utils.js` y `api-client.js`.
2. `voice-recorder.js`.
3. `voice-chat-core.js`.
4. División de `auth.js`.

---

## B. Backend: acciones con nombre en lugar de proxy abierto

**Principio:** el cliente envía parámetros (`{level, teilId, transcript}`), no prompts. El servidor construye el prompt, valida la salida y, si persiste algo en tablas compartidas, lo hace con service role tras validar. `generate-kasus` + `_kasus.js` ya implementan este patrón y sirven de modelo.

Acciones actuales en el mapa `ACTIONS` de `api/chat.js` (cada una con limitador por minuto y tope diario [S12 ✅]): `generate-reading`, `generate-practice`, `generate-kasus`, `generate-mitexto`, `evaluate-writing`, `lookup-word`.

| Acción (en `api/chat.js`) | Reemplaza el prompt cliente de | Estado |
|---|---|---|
| `generate-practice` (rehecha, `ruleId` en lista blanca) | `gramatica.js` [S3] | ✅ `api/_practice.js` |
| `lookup-word` (propuesta como `dictionary`; escribe `diccionario_cache` en el servidor) | `diccionario.js`, `lectura veloz.html` [S1] | ✅ Pendiente ejecutar la migración 025. |
| `evaluate-writing` (guarda `writing_submissions` en el servidor) | `escritura.html` | ✅ `api/_writing.js`; `vision.js` hace lo mismo para fotos. Pendiente ejecutar la 030. |
| `generate-writing-task` | `escritura.html` | ⬜ |
| `mundliche-task`, `mundliche-eval` | `mundliche.html` | ⛔ Decidido no migrar todavía: la nota solo va a `usage_events`, que el cliente inserta libremente, así que mover el prompt no impide falsearla. **Prerrequisito:** tabla de resultados escrita por el servidor (patrón de `writing_submissions`). |
| `evaluate-umformung`, `generate-umformung` | `chat-reformulaciones.html` (cierra el pendiente de memoria sobre el validador) | ⬜ |
| `voice-chat` (`{level, scenario, mode, lang}`) | chat-voz, chatvoz2 (el proveedor se elige por parámetro) | ⬜ Conviene hacerlo junto con `voice-chat-core.js`. |
| `corrector-text`, `translate-word`, `generate-questions`, `grammar-exam` | corrector, lectura veloz, gramática | ⬜ `translate-word` puede reutilizar `lookup-word`. |

Apps que siguen enviando su propio `system` a `/api/chat` o `/api/deepseek-chat` (2026-10-26): `chat-voz.html`, `chatvoz2/index.html`, `corrector.js`, `lectura veloz.html`, `chat-reformulaciones.html`, `gramatica.js`.

Después, `/api/chat` en modo libre puede restringirse o eliminarse [S9, S11]. **Estado:** 🟡 Fase 1 hecha: `validateProxyMessages()` en `chat.js` y `deepseek-chat.js` (solo `user`/`assistant`, ≤ 30 000 caracteres). El `system` libre sigue aceptándose hasta migrar las apps de la lista.

**Estructura interna de `api/`**, sin aumentar el número de funciones:

| Propuesta | Estado |
|---|---|
| `_lib.js` gana `withApi({methods, limiter, access, admin}, handler)`: auth, `checkAccess`, rate limit, CORS y errores genéricos en un solo sitio. | ⬜ `_lib.js` sí ganó `fetchWithRetry`, `isValidPushSubscription`, `validateProxyMessages` y `MAX_PROXY_INPUT_CHARS`. |
| `openaiChat()` y `supaRest()`, con la URL de Supabase única. | ⬜ `SUPABASE_URL` sigue hardcodeada en `_lib.js` y repetida en otros endpoints (p. ej. `SUPA_URL` en `whisper.js`). |
| Constantes `MODELS` y `LIMITS`. | ⬜ |
| `chat.js` queda como dispatcher de unas 100 líneas. La lógica pasa a `_reading.js`, `_practice.js`, `_mitexto.js`, `_writing.js`, `_lookup.js`, `_mundliche.js`, `_umformung.js`, `_voicechat.js` (el prefijo `_` hace que no cuenten como función). | 🟡 Extraídos `_practice.js` y `_writing.js`, pero `chat.js` creció a 916 líneas. Próximos: `_reading.js`, `_mitexto.js`, `_lookup.js`. |
| **Cuota de coste por usuario en el servidor** para el STT y las generaciones caras [S5, S12]. `usage_events` del cliente queda solo para analítica. | 🟡 STT: ✅ tabla `stt_usage` (028, pendiente de ejecutar), con duración derivada del tamaño del audio. Generaciones: ✅ tope diario por acción, pero con `createRateLimiter` (por instancia salvo que haya KV). Falta: las apps siguen sumando `usage_events` para el gate cliente. |
| **Margen de funciones**: fusionar `push-notify` + `vocab-refresh` en un `cron.js` con `action`. `finanzas.js` es ajeno al dominio y es el mejor candidato a salir a otro proyecto de Vercel. | ⬜ Contexto nuevo: `push-notify` ya lo dispara pg_cron (031/032, cada 30 min, `CRON_SECRET` desde Vault). Si se fusiona, hay que actualizar la URL del job pg_cron. No hay registro de quién dispara `vocab-refresh`: verificar y moverlo también a pg_cron. |

**Tests:**

| Propuesta | Estado |
|---|---|
| Ampliar la base vitest (`tests/api/`) con `forceModel`, los validadores de `_kasus.js`, `TEIL_VALIDATORS`, `checkAccess` (fail-open y blocked) y el 403 de admin. | 🟡 Existe `tests/api/chat.test.js` (nuevo) y `_lib.test.js`. Revisar qué cubren antes de ampliar. |
| Tests de las acciones nuevas (son puras y testeables): `_practice.js`, `_writing.js`, `validateProxyMessages`, `isValidPushSubscription`. | ⬜ |
| Añadir `vitest.config` y un job de CI. | ⬜ |

---

## C. Datos y Supabase

| # | Propuesta | Estado |
|---|---|---|
| 1 | **Baseline del esquema** (`000_baseline.sql` desde `pg_dump --schema-only`). El repo no describe hoy la BD real (`profiles`, `usage_events`, `exam_results`, `diccionario_cache`, `grammar_state`, finanzas). Es el prerrequisito para auditar S4 y D1. | ⛔ Requiere acceso a la BD (MCP de Supabase caído o `pg_dump` con la connection string). |
| 2 | **`public.is_admin()`** + trigger de protección de `profiles` (`role`/`status`/`access_expires_at` solo con service role). Simplifica unas 15 policies. | 🟡 Trigger de guarda hecho (026, pendiente de ejecutar). `is_admin()` no existe: las policies siguen con la subconsulta a `profiles`. |
| 3 | **Agregados en el servidor** para admin y panel de stats: vistas con `security_invoker` en lugar de SELECT masivos con `.limit(10000)` [D3]. Índices en `usage_events` y `exam_results` [D4]. | ✅ `029_admin_aggregates.sql` + paginación con `.range()` (pendiente de ejecutar). |
| 4 | **Fuente única de vocabulario**: declarar `Data*.json` como fuente y `word_lists` como réplica; script de diff JSON ↔ BD; guard en `generate-vocab.js` y `fix-duplicate-words.js` (flag `--overwrite-curated`). | ⬜ |
| 5 | **Partir los bancos por nivel**: `reformulaciones/{a1..c2}.json` y lo mismo para combos, generados por el script y descargados por nivel. 497 KB pasan a 50-150 KB. | ⬜ |
| 6 | **Carga por nivel**: `grammar-data.js` deja de usar `document.write` (cada página carga su nivel, o un loader dinámico con Promise). Lo mismo para `teacher/clases-*.js` y `plan.js`. `admin/index.html` carga `plan.js` en diferido. | ⬜ Ojo: `api/_practice.js` lee `grammar-data-*.js` en el servidor (`includeFiles` en `vercel.json`); no cambiar su formato. |
| 7 | **Config compartida cliente/servidor**: `KAS_LEVELS`/`KASUS_LEVELS` en un único módulo, servido como `<script>` y también importado desde `api/` (archivo UMD pequeño). | ⬜ |
| — | CHECK de `app_id` para a1–c2 [D1]. | ✅ 027 (pendiente de ejecutar). |

---

## D. PWA, deploy y estáticos

| Mejora | Detalle | Esfuerzo | Estado |
|---|---|---|---|
| SW único parametrizado | `register('/sw.js?app=a1')`. CACHE, ASSETS, icono y tag se derivan de `self.location.search`, más `importScripts('/sw-common.js')`. Hay que dar de baja los SW antiguos con una versión de caché nueva. | ~2 h + prueba | 🔁 B1/B2 ya se corrigieron copiando la plantilla de `sw-b1.js` a los 6 SW de quiz (139 líneas cada uno, idénticos salvo el nivel). La propuesta sigue siendo válida, pero ahora solo para eliminar duplicación: 7 archivos pasan a 2. |
| Manifests generados | `scripts/build-manifests.js` desde una tabla de niveles | bajo | ⬜ |
| Páginas generadas | `scripts/build-quiz.js` (A1–C2.html) y `scripts/build-gramatica-static.js` (gramaticaA1–C2 desde `GRAMMAR_DATA`, CSS compartido `gramatica-static.css`). Drift a cero [B15] y se conservan estáticos para SEO. | bajo-medio | ⬜ |
| Política de caché | `"headers"` con `Cache-Control: no-cache` (revalidación por ETag) para `*.js`, `*.css` y `*.json` en `vercel.json`, sin tocar el patrón único de `functions`. Evita mezclar HTML nuevo con JS viejo. | bajo | ⬜ |
| `.vercelignore` | `*.md`, `supabase/`, `scripts/`, `tests/`, `docs/`, `migrations/`, `.impeccable/`, `.claude/`, `otrascosas/`, `.mcp.json` [S10] | muy bajo | ✅ |
| Dependencias CDN | Fijar `@supabase/supabase-js@2.x.y` (hoy `@2` flotante en 27 páginas). Quitarlo de `privacidad.html`. Actualizar la URL cacheada en los SW. | muy bajo | ⬜ |
| Fuentes | Pasar el `@import` de Google Fonts de `styles.css` a `<link rel="preconnect">` + `<link>` en el `<head>`. | bajo | ⬜ |
| CSS | Medir la cobertura (DevTools Coverage) antes de podar las 6938 líneas de `styles.css`. Hay que considerar partirlo en `base.css` + `<app>.css`. | medio | ⬜ |

---

## E. Documentación

| # | Propuesta | Estado |
|---|---|---|
| 1 | **El README como índice corto** (qué es, cómo correrlo, env vars, enlace a `CLAUDE.md` y `docs/`). Hoy duplica `docs/` y diverge. | ⬜ |
| 2 | **Una sola fuente por dato**: env vars solo en el `CLAUDE.md` raíz, con la columna "Used by" completa; esquema solo en `supabase/CLAUDE.md`, generado desde la baseline. | ⬜ |
| 3 | **Separar referencia e historial**: las notas tipo "medido 2026-09-27" o "migrada en agosto" pasan a un `docs/decisions.md` (ADR breves). Las filas de tabla vuelven a ser de una línea. | ⬜ |
| 4 | **Planes versionados o fuera de los docs**: `docs/apps/lectura-veloz.md` y `docs/dev/browser-validation.md` enlazan a `lecturaplan.md`, que está en `.gitignore`. O se versionan en `docs/plans/` o se quitan las referencias. | ✅ (2026-10-27: decisiones pasadas a `docs/apps/lectura-veloz.md`, enlaces quitados) |
| 5 | **Automatizar la Maintenance rule**: `scripts/check-docs.js` que compare el árbol con el índice de `CLAUDE.md`, los `.from('x')` con `supabase/CLAUDE.md` y `process.env.X` con la tabla de env vars. Puede correr como hook pre-commit o en CI. | ⬜ |
| 6 | **Documentar lo que falta**: `finance/` (dashboard, `plan.md`, `schema.sql`), `tests/`, scripts nuevos, el panel de auditoría y `generate-mitexto`. | ⬜ |
| — | Corrección de los docs falsos (informe de deuda, sección 7). | ✅ |

---

## Hoja de ruta propuesta

| Fase | Contenido | Duración aprox. | Estado |
|---|---|---|---|
| 0. Higiene | `.vercelignore` ✅, borrar devtest ✅, corregir los docs falsos ✅. borrar `DATA.json` ✅, archivar `mejorar.md` en `docs/notas/` ✅. **Falta:** fijar la versión de Supabase. | 0,5 d | 🟡 |
| 1. Seguridad | Escapes corregidos en diccionario, gramática, reformulaciones y lectura ✅ (sin `utils.js`); `generate-practice` y `lookup-word` en el servidor ✅; guarda de `profiles` ✅ (026); CHECK `app_id` ✅ (027). **Falta:** ejecutar 025–030, revisar `pg_policies`, baseline del esquema ⛔. | 2 d | 🟡 |
| 2. Coste | Cuota STT en el servidor ✅, tope diario por acción ✅, validación de `messages` ✅, SSRF de push ✅. **Falta:** `withApi`. | 1,5 d | 🟡 |
| 3. Infra cliente | `utils.js`, `api-client.js`, `voice-recorder.js` (unificar las 4 copias de B3/B4), `tts-client.js`, SW único (ahora solo deduplicación) | 3 d | ⬜ |
| 4. Prompts al servidor | Acciones de la sección B, app por app, **empezando por escritura (`generate-writing-task`), corrector y reformulaciones**. Mündliche queda bloqueada hasta tener una tabla de resultados escrita por el servidor. | 4-5 d | 🟡 (`evaluate-writing` hecho) |
| 5. Consolidación | `voice-chat-core.js` + acción `voice-chat`, división de `auth.js`, páginas generadas, carga por nivel, `is_admin()` | 4 d | 🟡 (agregados admin hechos) |
| Continuo | `check-docs.js` en pre-commit, tests por acción nueva | — | ⬜ |

**Recomendación (actualizada 2026-10-26):** el XSS almacenado entre usuarios ya está corregido en el código. Lo urgente ahora es **ejecutar las migraciones 025–030**, porque sin ellas varias correcciones de seguridad y coste no tienen efecto en producción. Para el resto, aplicar la regla "*boy scout*": cada vez que se toque una app, migrarla a los módulos compartidos en lugar de planificar un refactor global, y no volver a copiar un mismo arreglo en varias apps.
