# Informe de deuda técnica — 2026-10-20

Auditoría de solo lectura con 6 subagentes: `api/`, infraestructura frontend compartida, apps grandes (2 grupos), admin/teacher/marketing/supabase/datos y sincronía de documentación. Los hallazgos ✔ se verificaron a mano tras la auditoría. Los marcados **(verificar BD)** dependen del estado real de Supabase, que no se pudo consultar porque el MCP dio timeout.

Severidad: 🔴 alta · 🟠 media · 🟢 baja

---

## 1. Seguridad

| # | Sev | Ubicación | Problema | Fix |
|---|---|---|---|---|
| S1 | 🔴 | `diccionario.js:273-274`, `:107-111` ✔ | `sinonimos` y `_palabra` se insertan con `innerHTML` sin escapar. Vienen de `diccionario_cache`, una tabla **compartida y escrita desde el cliente** (`supaSet` upsert, también desde `lectura veloz.html:1543`). Es un **XSS almacenado entre usuarios**. | Escapar en el render. Escribir la caché solo desde el servidor (acción en `api/chat.js`) y dejar al cliente solo SELECT. |
| S2 | 🔴 | `gramatica.js:332` ✔, `:640-680`, `:724`, `:794`, `:1262` | `esc()` solo escapa comillas, no `<>&`. Las opciones y frases de `grammar_practice_exercises` (tabla compartida) van crudas a `innerHTML`. `onclick="selectExamOption(this,'${esc(op)}')"` es inyectable: el navegador decodifica `&#39;` antes de evaluar el JS. | Escapado completo, y `data-val` + `dataset` en lugar de `onclick` con strings. |
| S3 | 🔴 | `api/chat.js:215-300` `generatePractice` ✔ | Acepta `system` y `prompt` del cliente. `ruleId` solo se comprueba como no vacío y no hay límite de longitud de `prompt`. El resultado se guarda con service role en el banco compartido. Junto con S2, cualquier alumno puede **envenenar ejercicios con HTML/JS** que verán todos. | Construir el prompt en el servidor con una lista blanca de `ruleId`, como en `_kasus.js`. |
| S4 | 🔴 | Tabla `profiles` (sin migración) **(verificar BD)** | Si existe la policy por defecto "users can update own profile", un alumno puede ponerse `role='admin'` o `access_expires_at=NULL`. Toda la RLS de admin (004, 014–024) depende de `profiles.role`. | Revisar `pg_policies`, añadir un trigger que bloquee cambios de `role`/`status`/`access_expires_at` salvo con service role, y versionarlo. |
| S5 | 🔴 | `api/whisper.js:80-95, 144-151` | El tope diario de STT suma los `usage_events` que **inserta el propio cliente** (`auth.js:1023`). Un cliente que no registre `audio_sent` solo paga la llamada en curso, así que el tope de coste es eludible. | Que `whisper.js` registre el uso con service role (o con un contador en KV) y no se fíe del cliente. |
| S6 | 🟠 | `chat-reformulaciones.html:810-826` ✔ | `renderHistory` interpola `userAnswer`, `explanation` (salida de la IA), `source` e `instruction` sin escapar. La app no tiene función de escape. Es XSS almacenado local (IndexedDB). | Añadir y usar `escHtml`. |
| S7 | 🟠 | `lectura veloz.html:394` | `escHtml` no escapa `"` pero se usa en atributos (`:1010`, `:1484`, `:2935`). `lv_texts` se sincroniza a `user_data`. | Usar la versión que sí escapa `"`. |
| S8 | 🟠 | `api/push-subscribe.js` + `push-notify.js` | `subscription.endpoint` no se valida y el cron hace POST a esa URL (**SSRF ciego**). Además: CORS `*`, `report_id` interpolado sin codificar en el filtro PostgREST, sin rate limit en GET/POST/DELETE. | Lista blanca de dominios push y https, validar UUID y rangos, quitar CORS `*`. |
| S9 | 🟠 | `api/chat.js:~58-70`, `api/deepseek-chat.js:~30` | `messages` solo valida `length<=40`. El `role` es libre (el usuario puede inyectar mensajes `system`) y el tamaño no tiene tope, así que funcionan como **proxy LLM genérico** con coste de entrada no acotado. | `role ∈ {user, assistant}` y tope total de unos 30 KB. |
| S10 | 🟠 | Raíz: no hay `.vercelignore` ✔ | Se publican `supabase/CLAUDE.md` (esquema completo y RLS), migraciones, `scripts/`, `tests/`, `*.md` internos, `.impeccable/` y `lectura-veloz-devtest.html`. | Crear `.vercelignore`. |
| S11 | 🟠 | Prompts en el cliente: mundliche, escritura, chat-reformulaciones, lectura veloz, chat-voz, chatvoz2, corrector, diccionario, gramatica (examen) | Todo usuario autenticado tiene acceso libre al LLM vía `/api/chat` y `/api/deepseek-chat`. Además, `puntuacion` (mündliche, escritura) la calcula el cliente: es manipulable, y en `writing_submissions` la ve el profesor. | Acciones con nombre en el servidor (patrón `generate-kasus`). |
| S12 | 🟠 | `api/chat.js` rate limit compartido | `generate-reading` (4-5 llamadas paralelas con reintentos), `generate-kasus` (gpt-4.1) y el chat comparten un límite de 20/min. | Limitador propio por acción y tope diario de generaciones. |
| S13 | 🟢 | `_lib.js:55-76` `checkAccess`, `whisper.js` | Fail-open silencioso: si falta la env var o falla Supabase, se desactivan el bloqueo y el tope de voz **sin ningún log**. | Añadir `console.warn` en cada rama fail-open. |
| S14 | 🟢 | `_lib.js:7-53` JWT | No comprueba `resp.ok` del JWKS (cachea errores 1 h), no re-descarga ante un `kid` desconocido, no valida `iss`/`aud`, y HS256 se compara sin `timingSafeEqual`. Idem `CRON_SECRET`. | Endurecer. |
| S15 | 🟢 | `api/finanzas.js` | `symbol` va sin validar en la ruta de CoinGecko y la caché en memoria no tiene límite. | Regex y tope de entradas. |
| S16 | 🟢 | Errores filtrados al cliente | `debug: e.message` (deepseek, image), `raw` (vision), textos de Supabase (admin, push-subscribe). | Mensaje genérico y log en el servidor. |
| S17 | 🟢 | `017_feedback_reports.sql` | INSERT sin `is_access_valid()` y sin límite de longitud: una cuenta bloqueada puede seguir enviando reportes y push a los admins. | CHECK de longitud + `is_access_valid`. |
| S18 | 🟢 | `003`/`012` `USING (true)` | El contenido marcado como `oculto` sigue siendo público por la API (el filtro es solo del cliente). | `USING (oculto = false OR is_admin())`. |
| S19 | 🟢 | `marketing/contenido.html:1412` | Salida del LLM en `innerHTML` en la sesión del admin. | `textContent`. |

## 2. Base de datos y esquema

| # | Sev | Problema | Fix |
|---|---|---|---|
| D1 | 🔴 | `001_word_lists_srs.sql:5,60` ✔: `CHECK app_id IN ('b1','b2'[,'shared'])`, pero el código escribe `a1/a2/c1/c2`. O se cambió a mano en producción sin migración, o **el sync SRS de 4 niveles falla en silencio** (try/catch). **(verificar BD)** | Migración `025` que alinee los CHECK con los 6 niveles. |
| D2 | 🟠 | Tablas sin migración: `profiles`, `usage_events`, `exam_results`, `diccionario_cache`, `grammar_state`, `push_subscriptions` y las de finanzas (`finance/schema.sql` está fuera de `supabase/`). No se puede reconstruir el esquema ni auditar su RLS. | Migración `000_baseline` con `pg_dump --schema-only`. |
| D3 | 🟠 | `admin/index.html:798-830`, `auth.js:841-848`: `.limit(10000/20000)`, pero PostgREST corta a 1000 filas, así que **las estadísticas se truncan sin aviso**. Además se descargan todos los `usage_events` globales en cada carga. | Vistas o RPC de agregación (`security_invoker`). |
| D4 | 🟠 | Sin índices en `usage_events(user_id, event_type, created_at)` (la consultan el tope de voz, las 4 apps de voz y auth) ni en `exam_results(user_id, created_at)`. | Crear índices. |
| D5 | 🟢 | Dos migraciones `020_*`. `migrations/add_user_status.sql` está fuera de `supabase/migrations/`. | Renumerar o mover. |
| D6 | 🟢 | `is_access_valid()`, `update_updated_at()` y `marketing_posts_touch_updated_at()` no tienen `SET search_path`. | Añadirlo. |
| D7 | 🟢 | `is_admin()` se menciona en los docs pero no existe; la subconsulta de admin se repite unas 15 veces. | Crear `public.is_admin()`. |
| D8 | 🟢 | `kasus.html:408` marca un set como visto al cargarlo, no al responderlo, así que el prefetch "quema" sets. | Marcarlo al responder. |

## 3. Bugs funcionales y robustez

| # | Sev | Ubicación | Problema |
|---|---|---|---|
| B1 | 🔴 | `sw*.js` ✔ | Ningún SW incluye `shared-game.js` en `ASSETS`, así que **el offline de los quiz A1–C2 probablemente no funciona** (el HTML carga sin motor). |
| B2 | 🟠 | `sw-a1/a2/c1/c2.js` | No tienen el handler `periodicsync` que `shared-game.js:1416` registra para todos los niveles. El recordatorio local solo funciona en B1/B2. |
| B3 | 🟠 | mündliche, chat-reformulaciones, chat-voz | La grabación no se cancela al cambiar de tarea/regla/nivel ni en `pagehide`. El stream del micrófono y el intervalo quedan vivos. |
| B4 | 🟠 | mündliche, chat-reformulaciones | El tiempo se suma al tope y se registra `audio_sent` **antes** de saber si Whisper respondió bien. |
| B5 | 🟠 | `escritura.html:682-694` | `highlightImproved` busca dentro de HTML ya escapado con `<mark>`, lo que puede corromper el markup. |
| B6 | 🟠 | `api/whisper.js:83` | El "día" se cuenta en UTC en el servidor y en hora local en el cliente, lo que puede dar 429 inesperados. |
| B7 | 🟠 | Todas las apps | `fetch` sin `AbortController` ni timeout: los spinners pueden quedar colgados (kasus tarda más de 30 s). |
| B8 | 🟠 | `corrector.js:~291` | La respuesta de la IA no se valida antes de renderizar: un `errores[i]` null provoca un `TypeError`. |
| B9 | 🟢 | `_lib.js:123-146` | Rate limiter KV: `incr` seguido de `expire` no es atómico, y si `expire` falla el usuario queda bloqueado para siempre. Además, `setInterval` sin `unref`. |
| B10 | 🟢 | `plan.html:~380` | `Notification.requestPermission()` sin gesto del usuario, en cada visita. |
| B11 | 🟢 | `chatvoz2/index.html:~564` | Descarga `Data{LEVEL}.json` completo en cada conversación para usar 8 palabras. |
| B12 | 🟢 | `corrector.js:~395` | Abre una conexión IndexedDB por operación y nunca la cierra. El historial no se borra al hacer logout (privacidad en equipos compartidos). |
| B13 | 🟢 | `api/chat.js`, `deepseek-chat.js` | Falta `req.body \|\| {}`, así que un body vacío da 500. |
| B14 | 🟢 | `plan.js` C2 | Las 10 reglas C2 no están enlazadas desde ningún día del plan (las tareas apuntan a `gramatica.html` sin hash). |
| B15 | 🟢 | `gramaticaB1.html` `b1-04`, `gramaticaC1.html` `c1-13` | Hay drift con `GRAMMAR_DATA`: "Genitiv" vs "Genitivo", y "Dadurch dass" vs "Dadurch, dass". |

## 4. Duplicación de código

| Qué | Copias | Riesgo |
|---|---|---|
| Recorder + Whisper + tope diario (`getUserMedia`, `audioFileName`, `loadDailyUsage`, `DAILY_LIMIT_MS`, `logEvent`) | 4 apps (mündliche lo tiene 2 veces dentro) | Alto: la regla del tope compartido se implementa a mano en 4 sitios |
| `chat-voz.html` ↔ `chatvoz2/index.html` | ~900 líneas casi literales: 22 funciones idénticas y 38 divergentes | Alto: ya hay drift (`slice(-10)` vs `slice(-8)`) |
| Escapado HTML (`esc`, `escHtml`, `escapeHtml`) | 12+ variantes; 3 inseguras (gramatica, lectura veloz, admin con `'`) y chat-reformulaciones sin ninguna | Alto (origen de S1, S2, S6, S7) |
| `fetch → res.text() → JSON.parse → 401` | Unas 20 copias. Además quedan `res.json()` sueltos en `auth.js:122,851` y `shared-game.js:1034,1085`, contra la convención | Medio |
| TTS (`speechSynthesis` + fallback `/api/tts`) | 7 sitios | Medio |
| IndexedDB (open/get/put/getAll + historial con límite) | 8 sitios | Bajo |
| Script del dropdown del navbar y `<nav>` HTML | 18 HTML | Medio |
| `toggleDarkMode` (existiendo `ThemePref`) | 10 sitios | Bajo |
| `createClient` + comprobación de admin | 8 páginas admin/teacher/marketing; `deepseek()` idéntico en 2 | Medio |
| SW y manifests | 7 + 7 archivos, 2 plantillas divergentes de SW | Medio (origen de B1, B2) |
| `A1–C2.html` | 6 × 111-144 líneas que solo difieren en configuración | Bajo |
| `gramaticaA1–C2.html` | Transcritos a mano (~330 KB) + CSS de ~150 líneas × 6 | Medio |
| `api/`: bloque auth (unas 15 líneas × 8), `supaFetch` × 3, fetch de OpenAI × 8, `setVapidDetails` × 2 | — | Medio |
| `scripts/`: loader de `.env.local` y wrapper OpenAI × 6 | — | Bajo |
| `KAS_LEVELS` (cliente) ↔ `KASUS_LEVELS` (`_kasus.js`) | 2, sincronizados a mano | Medio |

## 5. Complejidad y tamaño

| Archivo | Líneas | Nota |
|---|---|---|
| `styles.css` | 6938 | Selectores muertos sin medir; `@import` de Google Fonts bloquea el render |
| `lectura veloz.html` | 3337 | 4 productos en un solo `<script>`, estado global suelto |
| `plan.js` | 2099 | 6 niveles cargados siempre (130 KB) |
| `admin/index.html` | 2154 | Además carga `plan.js` entero |
| `chat-voz.html` | 1838 | |
| `gramatica.js` | 1764 | 4 módulos y 17 `let` globales |
| `mundliche.html` | 1542 | `MpState` mezcla grabación, TTS, diálogo y sesión |
| `shared-game.js` | 1422 | |
| `chat-reformulaciones.html` | 1391 | Unos 88 `const`/`let` top-level y 2 IndexedDB |
| `auth.js` | 1271 | God-object con ~35 globales `window.*` (incluidos privados `_xxx`) |
| `api/chat.js` | 784 | Proxy + 4 generadores + validadores Teil |

Otros pesos:

- `grammar-data.js` carga los 6 niveles con `document.write` (deprecado), unas 1850 líneas.
- `teacher/index.html` carga unos 590 KB en eager.
- `reformulaciones-data.json` (497 KB) se descarga entero.

## 6. Archivos muertos o sobrantes

| Archivo | Estado |
|---|---|
| `lectura-veloz-devtest.html` (136 KB) | Versionado y desplegado. El doc decía "borrar al terminar". Escribe en tablas reales. |
| `DATA.json` | Huérfano: ningún SW ni HTML lo usa, solo es el fallback de `shared-game.js:8`. |
| `scripts/validate-report.json` (155 KB) | Artefacto generado y versionado. |
| `mejorar.md` | Sin referencias; menciona `palabrasB2.html`, que ya no existe. |
| `privacidad.html` | Carga el CDN de Supabase sin usarlo. |
| `otrascosas/` | No está versionado, pero sin `.vercelignore` se publicaría con `vercel` desde disco. |

## 7. Documentación

**Afirmaciones falsas:**

- `README.md:250` dice que `vercel.json` hace rewrite de `/` → `B2.html`. No hay rewrites.
- `README.md:103`: chatvoz2 no usa GPT-4o-mini sino DeepSeek.
- `README.md:224`: el rate limit no es por IP sino por usuario.
- `README.md:181,217` y `marketing/CLAUDE.md:10` citan `gpt-image-1-mini`; el modelo real es `gpt-image-2`.
- `README.md:254`: la lista de env vars está incompleta.
- `api/CLAUDE.md:14` y `docs/apps/vocab-quiz.md:20` dicen que `shared-game.js` usa `/api/tts`. No lo usa.
- Gotcha de `DATA.json` en `CLAUDE.md:81,240`: ni el SW lo usa ni B2 tiene `DATA` inline.
- `teacher/CLAUDE.md:23-24` dice que A1/A2 "not yet wired". Ya están conectados.
- `docs/dev/browser-validation.md:7` dice "no password auth". Ya existe login con contraseña.
- `supabase/CLAUDE.md`:
  - `app_id` aparece solo como b1/b2.
  - `marketing_posts.kind` no incluye `infografia` ni `curso_ad`.
- `docs/apps/gramatica.md` dice "10 rules/level". Hoy son 21/21/31/17/17/10.
- `docs/apps/lectura-veloz.md` describe una sección Navbar obsoleta.
- Docs map del `CLAUDE.md` raíz: el puntero "Push/Cron → `CLAUDE.md`" debería apuntar a `api/CLAUDE.md`.

**Sin documentar:**

- `finance/` completo (frontend y 3 tablas).
- `tests/api/` + vitest + `npm test`.
- `scripts/find-duplicate-words.js` y `validate-reformulaciones.js`.
- El panel "Auditoría de contenido" de admin.
- El tipo `mensaje` en `feedback_reports`.
- `generate-mitexto` (en el `CLAUDE.md` raíz y el README).
- `UPSTASH_REDIS_REST_*`.
- La columna "Used by" de la tabla de env vars está incompleta.
- El README no cubre unas 10 apps ni 6 endpoints.

**Estructura:**

- El README duplica `docs/` y ya diverge en 5 puntos. Conviene reducirlo a un índice.
- Hay filas de tabla de cientos de caracteres con historial de decisiones mezclado (`api/CLAUDE.md:9`, `docs/apps/auth.md:10`, etc.).
- La tabla de migraciones de `supabase/CLAUDE.md` está desordenada.
- Varios docs dependen de `plan.md`, que está en `.gitignore`.

---

## Prioridad recomendada

1. **Inmediato (seguridad):**
   - ✅ S1 (diccionario). Render escapado + acción `lookup-word` en `api/chat.js` como único escritor de la caché. **Pendiente: ejecutar `025_diccionario_cache_server_write.sql` en Supabase.**
   - ✅ S2 + S3 (gramática y `generatePractice`). `esc()` completo, `data-val` en el examen; prompt en el servidor (`api/_practice.js`, lista blanca de `ruleId`, saneado de oraciones).
   - ✅ S4 (verificar `profiles`). Migración `026_profiles_lock_client_writes.sql` (sin escrituras de cliente + trigger de guarda). **Pendiente: no se pudo consultar `pg_policies` (MCP caído); ejecutar la 026 en Supabase.**
   - ✅ S10 (`.vercelignore`).
   - ✅ Borrar `lectura-veloz-devtest.html`.
2. **Corto plazo:**
   - ✅ D1 (CHECK `app_id`). Migración `027_app_id_all_levels.sql`. **Pendiente: ejecutarla en Supabase.**
   - ✅ S5 (tope STT en el servidor). `whisper.js` factura en `stt_usage` tras cada transcripción correcta; las apps envían `duration_ms` en el form. **Pendiente: ejecutar `028_stt_usage.sql`.**
   - ✅ B1/B2 (offline de los quiz). Los 6 SW de quiz usan la plantilla de `sw-b1.js` (con `periodicsync`), cachean `shared-game.js`, sirven también el CDN de Supabase offline y suben versión de caché.
   - ✅ S6/S7 (escapado). `escHtml` en el historial de chat-reformulaciones; el de lectura veloz ahora escapa comillas.
   - ✅ S8 (SSRF push). Lista blanca de servicios push (`isValidPushSubscription` en `_lib.js`, también en el cron), UUID en `report_id`, rangos validados, sin CORS `*`, rate limit general y errores genéricos.
   - ✅ D3 (truncado de estadísticas). Vistas agregadas por usuario (`029_admin_aggregates.sql`, incluye los índices de D4) y paginación con `.range()` en admin y en el panel de stats de `auth.js`. **Pendiente: ejecutar la 029.**
3. **Medio plazo:**
   - S11/S12 (prompts al servidor y límites por acción).
     - ✅ S12: mapa `ACTIONS` en `api/chat.js` con limitador por minuto y tope diario por acción.
     - S11 por fases (decidido 2026-10-20):
       - ✅ Fase 1 (S9): `validateProxyMessages()` en `chat.js` y `deepseek-chat.js`, solo roles `user`/`assistant` y como mucho 30 000 caracteres.
       - ✅ Fase 2 (escritura): acción `evaluate-writing` y `vision.js` corrigen y guardan `writing_submissions` en el servidor, recalculando la nota desde los subscores. **Pendiente: ejecutar `030_writing_submissions_server_insert.sql`.**
       - Mündliche: no se migró. Su nota solo va a `usage_events`, que el cliente inserta libremente, así que mover el prompt no impide falsearla. Requiere antes una tabla de resultados escrita por el servidor.
       - Fase 3 (resto de apps a acciones con nombre): pendiente.
   - ✅ B3/B4 (grabación). `cancelRecording()` en mündliche, chat-reformulaciones, chat-voz y chatvoz2 (al cambiar de tarea, regla, nivel o escenario y en `pagehide`). El cupo diario y `audio_sent` se cobran solo si la transcripción responde OK. Falta probarlo en el navegador.
   - D2 (baseline del esquema). **Bloqueado:** requiere `pg_dump --schema-only` contra la BD real (MCP de Supabase caído en esta sesión).
   - ✅ Corrección de los docs falsos (sección 7, "Afirmaciones falsas"). Siguen pendientes los puntos "Sin documentar" y "Estructura".
4. **Mantenimiento:** duplicación (sección 4) y tamaño (sección 5). Ver el informe de arquitectura.
