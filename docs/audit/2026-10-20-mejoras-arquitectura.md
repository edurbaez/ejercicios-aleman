# Informe de mejoras de arquitectura — 2026-10-20

Complementa a `2026-10-20-deuda-tecnica.md`, y las referencias entre corchetes (S1, B1…) remiten a ese informe. Restricciones que se mantienen:

- Sin build system.
- `<script>` plano.
- Hobby limitado a 12 funciones serverless (hoy 11).
- Supabase con RLS como capa de datos.

---

## Diagnóstico

El proyecto creció **app a app por copia**: cada HTML nuevo heredó del anterior el recorder, el fetch, el escape, el TTS, el IndexedDB y los prompts. `auth.js` y `shared-game.js` son los únicos módulos compartidos de verdad, y `auth.js` absorbió todo lo transversal hasta volverse un god-object. Esto tiene tres consecuencias:

1. **Los bugs de seguridad se replican**. Hay 12 variantes de escape y 3 son inseguras.
2. **Las reglas transversales se implementan N veces**: el tope de voz está en 4 apps y la paridad entre chat-voz y chatvoz2 depende de la memoria.
3. **La lógica de negocio vive en el cliente**: los prompts y las puntuaciones son manipulables y `/api/chat` funciona como proxy abierto.

La dirección propuesta es **una capa delgada de módulos compartidos en el cliente y acciones con nombre en el servidor**, sin introducir un bundler.

---

## A. Frontend: capa de módulos compartidos

Son archivos `.js` planos con namespace `window.X`, cargados después de `auth.js`, que se adoptan app a app.

| Módulo | Contenido | Sustituye a | Esfuerzo |
|---|---|---|---|
| `utils.js` | `escapeHtml` (único y completo), `shuffle`, `countWords`, `stripFences`, `toast()`, `confirmDialog()` | 12 escapes, toasts en 3 sitios, `alert()` | 0,5 d |
| `api-client.js` | `apiPost(path, body, {timeout, retries})`: `res.text()` → `JSON.parse`, 401 → `openAuthModal`, `AbortController`, error tipado | Unas 20 copias del patrón y los `res.json()` sueltos [B7] | 0,5 d |
| `voice-recorder.js` | `createRecorder({maxSeconds, onBlob, onTick})`, `abort()`, cierre de tracks en `pagehide`, `VoiceCap.load()/add()` (registro solo tras éxito), `transcribe(blob, lang)` | mündliche ×2, chat-reformulaciones, chat-voz, chatvoz2 [B3, B4] | 1 d + prueba en navegador |
| `tts.js` | `speak(text, {lang, rate, premium})` con selección de voz y fallback a `/api/tts` | 7 implementaciones | 0,5 d |
| `idb.js` | `openStore(name)` + `createHistoryStore(name, max)` | 8 helpers | 0,5 d |
| `voice-chat-core.js` | `VoiceChatCore.create({appId, storagePrefix, endpoint, whisperLang, maxSystemChars, features})` con burbujas, Modo Repetir, misión y rol | Unas 900 líneas duplicadas entre chat-voz y chatvoz2 | 1,5 d |
| `admin-common.js` | Cliente Supabase (o `auth-core`), `requireAdmin()`, `deepseek()`, `esc` | 8 gates, 9 `createClient`, 2 `deepseek()` | 0,5 d |

**División de `auth.js`** (1271 líneas):

- `auth-core.js`: `sb`, sesión, `getAuthToken`, `logEvent` y gate de acceso.
- `auth-ui.js`: modal de login, inyección completa del `<nav>` y del handler del dropdown, panel de stats y `ThemePref.toggle()`.
- `auth-extras.js`: push, feedback, trial y time tracking.

Las páginas admin/teacher/marketing cargarían solo `auth-core.js`. Agrupar los globales bajo `window.Auth` y pasar de `onclick` inline a delegación de eventos. **Esfuerzo:** 1-2 d, con riesgo de orden de carga, así que conviene hacerlo al final.

**Partir los monolitos** solo cuando se toquen, no como proyecto aparte:

- `lectura veloz.html` → `lv-rsvp.js`, `lv-sprint.js`, `lv-comprension.js`. Los prefijos ya marcan los límites.
- `gramatica.js` → `gramatica-quiz.js`, `gramatica-exam.js`, `gramatica-flashcards.js`.
- Los datos inline (`LEVEL_SPECS`, `NIVEL_EXIGENCIA`, `TEMAS`) → `mundliche-data.js` y `escritura-data.js`, siguiendo el precedente de `redemittel-data.js`.

**Orden sugerido:**

1. `utils.js` y `api-client.js`, que cierran S1, S2, S6 y S7 de paso.
2. `voice-recorder.js`.
3. `voice-chat-core.js`.
4. División de `auth.js`.

---

## B. Backend: acciones con nombre en lugar de proxy abierto

**Principio:** el cliente envía parámetros (`{level, teilId, transcript}`), no prompts. El servidor construye el prompt, valida la salida y, si persiste algo en tablas compartidas, lo hace con service role tras validar. `generate-kasus` + `_kasus.js` ya implementan este patrón y sirven de modelo.

| Acción nueva (en `api/chat.js`) | Reemplaza el prompt cliente de |
|---|---|
| `generate-practice` (rehecha, `ruleId` en lista blanca) | `gramatica.js` [S3] |
| `dictionary` (escribe `diccionario_cache` en el servidor) | `diccionario.js`, `lectura veloz.html` [S1] |
| `evaluate-writing`, `generate-writing-task` (guarda `writing_submissions` en el servidor) | `escritura.html` |
| `mundliche-task`, `mundliche-eval` | `mundliche.html` |
| `evaluate-umformung`, `generate-umformung` | `chat-reformulaciones.html` (cierra el pendiente de memoria sobre el validador) |
| `voice-chat` (`{level, scenario, mode, lang}`) | chat-voz, chatvoz2 (el proveedor se elige por parámetro) |
| `corrector-text`, `translate-word`, `generate-questions`, `grammar-exam` | corrector, lectura veloz, gramatica |

Después, `/api/chat` en modo libre puede restringirse o eliminarse [S9, S11].

**Estructura interna de `api/`**, sin aumentar el número de funciones:

- `_lib.js` gana:
  - `withApi({methods, limiter, access, admin}, handler)`: auth, `checkAccess`, rate limit, CORS y errores genéricos en un solo sitio.
  - `openaiChat()` y `supaRest()`, con la URL de Supabase única.
  - Constantes `MODELS` y `LIMITS`.
- `chat.js` queda como dispatcher de unas 100 líneas. La lógica pasa a `_reading.js`, `_practice.js`, `_mitexto.js`, `_writing.js`, `_mundliche.js`, `_umformung.js`, `_voicechat.js` (el prefijo `_` hace que no cuenten como función).
- **Cuota de coste por usuario en el servidor**: un contador diario en KV o en una tabla, escrito por el servidor, para el STT y las generaciones caras [S5, S12]. `usage_events` del cliente queda solo para analítica.
- **Margen de funciones**: fusionar `push-notify` + `vocab-refresh` en un `cron.js` con `action`. `finanzas.js` es ajeno al dominio y es el mejor candidato a salir a otro proyecto de Vercel.
- **Tests**:
  - Ampliar la base vitest existente (`tests/api/`) con:
    - `forceModel`;
    - los validadores de `_kasus.js`;
    - `TEIL_VALIDATORS`;
    - `checkAccess` (fail-open y blocked);
    - el 403 de admin.
  - Las acciones nuevas son puras y testeables.
  - Añadir `vitest.config` y un job de CI.

---

## C. Datos y Supabase

1. **Baseline del esquema** (`000_baseline.sql` desde `pg_dump --schema-only`). El repo no describe hoy la BD real (`profiles`, `usage_events`, `exam_results`, `diccionario_cache`, `grammar_state`, finanzas). Es el prerrequisito para auditar S4 y D1.
2. **`public.is_admin()`** + trigger de protección de `profiles` (`role`/`status`/`access_expires_at` solo con service role). Simplifica unas 15 policies.
3. **Agregados en el servidor** para admin y panel de stats: vistas o RPC con `security_invoker`, siguiendo el precedente de `marketing_*`, en lugar de SELECT masivos con `.limit(10000)` [D3]. Añadir índices en `usage_events` y `exam_results` [D4].
4. **Fuente única de vocabulario**:
   - Declarar `Data*.json` como fuente y `word_lists` como réplica.
   - Script de diff JSON ↔ BD.
   - Guard en `generate-vocab.js` y `fix-duplicate-words.js` para que no sobrescriban los archivos curados (flag `--overwrite-curated`).
5. **Partir los bancos por nivel**: `reformulaciones/{a1..c2}.json` y lo mismo para combos, generados por el script y descargados por nivel. 497 KB pasan a 50-150 KB.
6. **Carga por nivel**:
   - `grammar-data.js` deja de usar `document.write`: cada página carga su nivel, o un loader dinámico con Promise.
   - Lo mismo para `teacher/clases-*.js` y `plan.js`.
   - `admin/index.html` carga `plan.js` en diferido.
7. **Config compartida cliente/servidor**: `KAS_LEVELS`/`KASUS_LEVELS` en un único módulo, servido como `<script>` y también importado desde `api/` (archivo UMD pequeño).

---

## D. PWA, deploy y estáticos

| Mejora | Detalle | Esfuerzo |
|---|---|---|
| SW único parametrizado | `register('/sw.js?app=a1')`. CACHE, ASSETS, icono y tag se derivan de `self.location.search`, más `importScripts('/sw-common.js')`. Corrige B1 y B2, y 7 archivos pasan a 2. Hay que dar de baja los SW antiguos con una versión de caché nueva. | ~2 h + prueba |
| Manifests generados | `scripts/build-manifests.js` desde una tabla de niveles | bajo |
| Páginas generadas | `scripts/build-quiz.js` (A1–C2.html) y `scripts/build-gramatica-static.js` (gramaticaA1–C2 desde `GRAMMAR_DATA`, CSS compartido `gramatica-static.css`). Drift a cero [B15] y se conservan estáticos para SEO. | bajo-medio |
| Política de caché | `Cache-Control: no-cache` (revalidación por ETag) para `*.js`, `*.css` y `*.json` en `vercel.json`, sin tocar el patrón único de `functions`. Evita mezclar HTML nuevo con JS viejo. | bajo |
| `.vercelignore` | `*.md`, `supabase/`, `scripts/`, `tests/`, `migrations/`, `.impeccable/`, `.claude/`, `otrascosas/`, `finance/schema.sql` [S10] | muy bajo |
| Dependencias CDN | Fijar `@supabase/supabase-js@2.x.y` (hoy `@2` flotante en 28 páginas). Quitarlo de `privacidad.html`. | muy bajo |
| Fuentes | Pasar el `@import` de Google Fonts de `styles.css` a `<link rel="preconnect">` + `<link>` en el `<head>`. | bajo |
| CSS | Medir la cobertura (DevTools Coverage) antes de podar las 6938 líneas de `styles.css`. Hay que considerar partirlo en `base.css` + `<app>.css`. | medio |

---

## E. Documentación

1. **El README como índice corto** (qué es, cómo correrlo, env vars, enlace a `CLAUDE.md` y `docs/`). Hoy duplica `docs/` y ya diverge en 5 puntos.
2. **Una sola fuente por dato**:
   - Env vars: solo en el `CLAUDE.md` raíz, con la columna "Used by" completa.
   - Esquema: solo en `supabase/CLAUDE.md`, generado desde la baseline.
3. **Separar referencia e historial**: las notas tipo "medido 2026-09-27" o "migrada en agosto" pasan a un `docs/decisions.md` (ADR breves). Las filas de tabla vuelven a ser de una línea.
4. **Planes versionados o fuera de los docs**: varios docs oficiales enlazan a `plan.md`/`lecturaplan.md`, que están en `.gitignore`. O se versionan en `docs/plans/` o se quitan las referencias.
5. **Automatizar la Maintenance rule**: un script `scripts/check-docs.js` que compare el árbol con el índice de `CLAUDE.md`, los `.from('x')` con `supabase/CLAUDE.md` y `process.env.X` con la tabla de env vars. Puede correr como hook pre-commit o en CI.
6. **Documentar lo que falta**: `finance/`, `tests/`, scripts nuevos, el panel de auditoría y `generate-mitexto`.

---

## Hoja de ruta propuesta

| Fase | Contenido | Duración aprox. |
|---|---|---|
| 0. Higiene | `.vercelignore`, borrar devtest/`DATA.json`/`validate-report.json`/`mejorar.md`, corregir los docs falsos, fijar la versión de Supabase | 0,5 d |
| 1. Seguridad | `utils.js` (escape único) aplicado a diccionario, gramática, reformulaciones y lectura; `generate-practice` y `dictionary` en el servidor; verificar `profiles` y crear la baseline del esquema; migración de CHECK `app_id` | 2 d |
| 2. Coste | `withApi` + cuota en el servidor (STT y generaciones), validación de `messages`, SSRF de push | 1,5 d |
| 3. Infra cliente | `api-client.js`, `voice-recorder.js`, `tts.js`, SW único | 3 d |
| 4. Prompts al servidor | Acciones de la sección B, app por app, empezando por mündliche y escritura | 4-5 d |
| 5. Consolidación | `voice-chat-core.js`, división de `auth.js`, páginas generadas, carga por nivel, agregados admin | 4 d |
| Continuo | `check-docs.js` en pre-commit, tests por acción nueva | — |

**Recomendación:** hacer las fases 0 y 1 cuanto antes, porque hay XSS almacenado entre usuarios explotable hoy. Para el resto, aplicar la regla "*boy scout*": cada vez que se toque una app, migrarla a los módulos compartidos en lugar de planificar un refactor global.
