# supabase/ (migrations & table schemas)

Loaded automatically by Claude Code when files in this directory are read. Split out of the root `CLAUDE.md` (which keeps a one-line index entry per file); keep in sync per the root Maintenance rule. Note: the root `migrations/` folder (e.g. `add_user_status.sql`) is separate.

## Database Migrations

| File | Purpose |
|------|---------|
| `supabase/migrations/001_word_lists_srs.sql` | Creates `word_lists` (all vocabulary lists, system + user-created, with RLS) and `srs_progress` (SM-2 state per user/app/word, with RLS). Run manually in the Supabase SQL editor. |
| `supabase/migrations/002_user_data.sql` | Creates `user_data` (persistent user preferences: `cv_user_profile`, `cv_level`, with RLS). Idempotent — safe to run on existing tables. |
| `supabase/migrations/003_reading_texts.sql` | Crea `reading_texts` (textos en alemán por nivel CEFR con preguntas de comprensión) y `user_reading_seen` (textos vistos por usuario). RLS habilitado. |
| `supabase/migrations/004_marketing_posts.sql` | Crea `marketing_posts` (pipeline de contenido de marketing: carruseles/reels/testimonios/emails; estados idea/generado/publicado; `publish_date` para calendario editorial). RLS: solo `profiles.role = 'admin'`. Trigger auto-`updated_at`. |
| `supabase/migrations/005_marketing_views.sql` | 4 vistas de KPIs para `/marketing/resultados.html`: `marketing_weekly_signups`, `marketing_weekly_active`, `marketing_app_usage`, `marketing_summary` (activos 7/30d + retención simple 8 semanas). Todas `security_invoker = true` — aplican las policies RLS `is_admin()` de las tablas base. |
| `supabase/migrations/006_reading_texts_insert.sql` | `DROP POLICY IF EXISTS` de la antigua policy de INSERT cliente en `reading_texts` — los textos generados por IA ahora se insertan server-side vía `/api/chat` (action `generate-reading`). Solo necesaria si se aplicó la versión anterior de esta migración. |
| `supabase/migrations/007_marketing_posts_kind_curso_ad.sql` | Amplía el `CHECK` de `kind` en `marketing_posts` para incluir `infografia` (faltaba desde 004) y `curso_ad` (pestaña "Publicidad de curso" de `marketing/contenido.html`). |
| `supabase/migrations/008_grammar_rule_progress.sql` | Crea `grammar_rule_progress` (estado SM-2 por usuario/regla gramatical, PK `(user_id, rule_id)`, con RLS). Usada por el SRS de reglas de `chat-reformulaciones.html`. |
| `supabase/migrations/009_access_control.sql` | Añade `profiles.access_expires_at` (timestamptz, NULL = sin límite) y la función `public.is_access_valid(user_id)` (`status <> 'blocked' AND (access_expires_at IS NULL OR access_expires_at > now())`), única fuente de verdad reusada por `api/_lib.js` (`checkAccess`) y `auth.js` (`_isAccessValid`). `handle_new_user()` ahora fija `access_expires_at = now() + 15 días` en cada signup (trial automático). Refuerza como defensa en profundidad las policies de INSERT/UPDATE de `word_lists`, `srs_progress`, `grammar_rule_progress`, `user_reading_seen` y `user_data` con `is_access_valid(auth.uid())` (deja SELECT/DELETE sin tocar). También elimina una policy `"own data" FOR ALL` en `user_data` no rastreada en el repo (creada directamente en Supabase) que habría hecho bypass del gate por ser permissive. |
| `supabase/migrations/010_grammar_rule_id_b2c1_remap.sql` | Remapea `grammar_rule_progress.rule_id` tras dividir las reglas de B2/C1 en `grammar-data-b2.js`/`-c1.js` (10→17 cada uno, siguiendo la granularidad por capítulo de *Grammatik aktiv B2/C1*, Cornelsen) para que el progreso SRS existente siga apuntando a la regla correcta con su nuevo id. |
| `supabase/migrations/011_reading_texts_format_version.sql` | Añade `reading_texts.format_version integer NOT NULL DEFAULT 1`. Permite convivir el formato plano de Leseverstehen (`1`, MCQ único) con el nuevo formato por Teile (`2`, ver `lecturaplan.md`) sin invalidar textos existentes ni romper `user_reading_seen`. El frontend de `lectura veloz.html` elige el renderer según este campo. |
| `supabase/migrations/012_grammar_practice_exercises.sql` | Crea `grammar_practice_exercises` (oraciones de práctica generadas por IA por regla gramatical) y `user_grammar_practice_seen` (qué sets ya practicó cada usuario). Mismo patrón que `reading_texts`/`user_reading_seen` (003): permite reutilizar entre alumnos las oraciones ya generadas para una regla en vez de llamar a OpenAI en cada "Practicar". RLS habilitado. |
| `supabase/migrations/013_user_data_plan_progress.sql` | Añade `user_data.plan_progress` (jsonb, default `{}`) para sincronizar entre dispositivos el progreso del plan de 30 días de `plan.html`. |
| `supabase/migrations/014_admin_read_srs_grammar_progress.sql` | Añade policies de SELECT adicionales (permissive, `profiles.role = 'admin'`) en `srs_progress` y `grammar_rule_progress` para que `admin/index.html` pueda leer el progreso SRS de todos los alumnos (antes solo cada usuario podía leer sus propias filas). No toca INSERT/UPDATE/DELETE. |
| `supabase/migrations/015_admin_read_reading_grammar_practice.sql` | Mismo patrón que la migración 014, aplicado a `user_reading_seen` y `user_grammar_practice_seen` — permite a `admin/index.html` leer cuántos textos de lectura y sets de práctica gramatical completó cada alumno (antes solo cada usuario podía leer sus propias filas). No toca INSERT/UPDATE/DELETE. |
| `supabase/migrations/016_daily_usage_time.sql` | Crea `daily_usage_time` (tiempo activo en pantalla por usuario/día/app, PK `(user_id, date)`, RLS: SELECT propio + SELECT admin) y la función `upsert_daily_usage_time(p_date, p_apps)` (`security definer`, sin policies de INSERT/UPDATE en la tabla — solo esta función escribe). Suma `apps` por clave contra el valor existente (multi-dispositivo no se pisa) y borra filas de más de 60 días para ese usuario en cada llamada. Usada por el tracking de tiempo activo de `auth.js`. |
| `supabase/migrations/017_feedback_reports.sql` | Crea `feedback_reports` (reportes de bug/sugerencia de los usuarios, PK `id`). RLS: INSERT/SELECT propio (`auth.uid() = user_id`) más SELECT/UPDATE admin (`profiles.role = 'admin'`, mismo patrón que 004/014/015/016) para que `admin/index.html` pueda listarlos y cambiar `estado`. Usada por el botón de feedback global de `auth.js` y la acción `notify-admins` de `api/push-subscribe.js`. |
| `supabase/migrations/018_active_sessions.sql` | Crea `active_sessions` (detección de uso concurrente: `session_id` uuid PK = id de dispositivo generado en el navegador, `user_id`, `device` texto corto tipo "Chrome · Windows", `last_seen`). RLS: SELECT propio + SELECT admin (mismo patrón 014-017). Escritura solo vía función `upsert_active_session(p_session_id, p_device)` (`security definer`, sin policies de INSERT/UPDATE en la tabla) — hace upsert por `session_id` y borra las filas del propio usuario con `last_seen` de más de 7 días. Usada por el heartbeat de `auth.js` (cada 60s) y leída por `admin/index.html` para mostrar sesiones activas y marcar "conectado en N dispositivos a la vez". |
| `supabase/migrations/020_device_trials.sql` | Crea `device_trials` (`device_id` uuid PK = el mismo `ejaleman_device_id` de `active_sessions`, `user_id`, `created_at`) y la función `claim_device_trial(p_device_id)` (`security definer`, sin policies de INSERT/UPDATE — mismo patrón que 016/018). Un dispositivo queda ligado a la primera cuenta **en trial** que lo usa; si una segunda cuenta en trial entra desde ese mismo navegador, la función le pone `access_expires_at = now()` y devuelve `false`, de modo que queda a la espera de autorización del admin. Los admins y las cuentas ya `approved` ni marcan ni chocan con el dispositivo (así un aula o una computadora compartida no se bloquea sola). Llamada desde `_claimDeviceTrial()` en `auth.js`. Limitación conocida: borrar el localStorage renueva el trial — frena el registro desechable casual, no al determinado. |
| `supabase/migrations/019_feedback_reports_respuesta.sql` | Añade `tipo = 'mensaje'` al CHECK de `feedback_reports.tipo` (junto a `bug`/`sugerencia`, ahora el default en el modal de `auth.js`) y las columnas `respuesta`/`respuesta_at`/`respuesta_leida` para que el admin pueda responderle a un reporte y el usuario vea esa respuesta. Crea `mark_feedback_seen(p_report_id)` (`security definer`, mismo patrón que `upsert_active_session`) para que el propio usuario pueda marcar una respuesta como leída sin necesitar una policy de UPDATE genérica. |
| `supabase/migrations/022_reading_sessions.sql` | Crea `reading_sessions` (historial de sesiones de Leseverstehen de `lectura veloz.html`: nivel, texto, aciertos/total, duración, modo examen y desglose por Teil en jsonb). RLS: INSERT/SELECT propio (INSERT con `is_access_valid()`, patrón de la migración 009) más SELECT admin (patrón 014-018). Antes la puntuación solo vivía en pantalla. |
| `supabase/migrations/023_feedback_reports_contexto.sql` | Añade `feedback_reports.contexto` (jsonb, nullable): contexto estructurado de un reporte enviado desde un ejercicio concreto (hoy `kasus.html`). Sin políticas nuevas: lo cubre el INSERT propio de 017. |
| `supabase/migrations/021_user_data_cv_scenarios.sql` | Añade `user_data.cv_scenarios` (jsonb, default `{}`) para sincronizar entre dispositivos los escenarios de rol personalizados de `chat-voz.html`, más cuál está seleccionado. Forma: `{ selected, custom: [...], deleted: [...] }`. A diferencia de `plan_progress` (013), el remoto **no** gana sin más: `custom` se fusiona por `key` porque son escenarios que escribió el alumno y un overwrite plano borraría el creado en otro dispositivo; `deleted` son tombstones para que un borrado se propague en vez de resucitar en ese mismo merge. Las personas generadas por IA (`cv_rol_cache_<key>` en localStorage) se quedan locales a propósito — si faltan, la app ya las regenera vía `/api/chat`. |

## Supabase table schemas

### Supabase table: `word_lists`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK (client-generated via `crypto.randomUUID()` for user lists) |
| `user_id` | uuid | FK → auth.users; NULL for system (built-in) lists |
| `app_id` | text | `'b1'`, `'b2'`, or `'shared'` (user lists are always `'shared'`) |
| `name` | text | List key, e.g. `'lista1'`, `'mis: Deportes'` |
| `is_system` | boolean | `true` for built-in vocab (seeded from JSON); `false` for user-created |
| `words` | jsonb | `{ de: string[], es: string[] }` — parallel arrays, same length |
| `created_at` / `updated_at` | timestamptz | Auto-managed |

RLS: system lists are publicly readable (no auth). User lists are readable/writable only by their owner.

### Supabase table: `srs_progress`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | PK component, FK → auth.users |
| `app_id` | text | PK component — `'b1'` or `'b2'` |
| `word` | text | PK component — German word |
| `ease` | numeric | SM-2 easiness factor (starts 2.5, min 1.3) |
| `interval` | int | Days between reviews |
| `reps` | int | Consecutive correct answers |
| `due` | bigint | Next review timestamp (Unix ms) |

RLS: users can only read/write their own rows, plus a SELECT-only policy (migration 014) letting admins read every user's rows for the SRS mastery view in `admin/index.html`.

Sync strategy in `shared-game.js`: IndexedDB is the local cache (instant reads); Supabase is the source of truth. On load, Supabase data is merged into IndexedDB (Supabase wins on `due` conflicts for SRS, or by `supabase_id` for lists). Writes go to IndexedDB first (optimistic), then async to Supabase.

### Supabase table: `grammar_rule_progress`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | PK component, FK → auth.users |
| `rule_id` | text | PK component — grammar rule id from `GRAMMAR_DATA` |
| `ease` | numeric | SM-2 easiness factor (starts 2.5, min 1.3) |
| `interval` | int | Days between reviews |
| `reps` | int | Consecutive correct answers |
| `due` | bigint | Next review timestamp (Unix ms) |

RLS: users can only read/write their own rows, plus a SELECT-only policy (migration 014) letting admins read every user's rows for `admin/index.html`. Same SM-2 algorithm and sync pattern as `srs_progress`, but keyed by `rule_id` instead of `word`/`app_id`; local cache is IndexedDB `srs-db-reformulaciones` (store `rules`). Used by `chat-reformulaciones.html`.

### Supabase table: `user_data`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | PK, FK → auth.users |
| `cv_user_profile` | text | Persistent user self-description used in all `chat-voz` scenarios |
| `cv_level` | text | Last selected CEFR level in `chat-voz` (A1–C2) |
| `plan_progress` | jsonb | `plan.html`'s 30-day progress, `{ [level]: bool[30] }` — one entry per CEFR level so studying several levels concurrently doesn't collide. Reserved key `_opened: { [level]: { [dayIndex]: bool[] } }` holds the opened-task markers (union-merged across devices). Added in migration 013. |
| `cv_scenarios` | jsonb | `chat-voz.html`'s roleplay scenarios: `{ selected, custom: [{key, icon, name, rol, contexto, mision, isCustom}], deleted: [key] }`. Merged by `key` on load (not overwritten) with `deleted` acting as tombstones — see migration 021. Added in migration 021. |
| `updated_at` | timestamptz | Auto-managed |

RLS: each user reads/writes only their own row. Used by `chat-voz.html` via `loadPreferences()` / `persistPreferences()`. Used by `plan.html` via `loadRemoteProgress()` / `persistRemoteProgress()` (same local-first pattern: localStorage renders instantly, remote is merged in — remote wins — on `window.onAuthSignedIn`, and pushed on every `saveProgress()`).

### Supabase table: `push_subscriptions`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | FK → auth.users, UNIQUE |
| `subscription` | jsonb | PushSubscription serializada |
| `interval_hours` | int | Cada cuántas horas notificar (1/2/3/4/6) |
| `window_start` | int | Hora local de inicio (0–23) |
| `window_end` | int | Hora local de fin (1–24) |
| `utc_offset_minutes` | int | `-new Date().getTimezoneOffset()` del browser |
| `last_notified_at` | timestamptz | Última notificación enviada |

RLS activo: usuarios solo acceden a su propia fila. El endpoint usa `SUPABASE_SERVICE_ROLE_KEY` para bypass de RLS.

### Supabase table: `reading_texts`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK, auto-generated |
| `level` | text | CEFR level: A1–C2 |
| `title` | text | Título del texto (o de la sesión, formato 2) en alemán/español |
| `content` | text | Texto completo en alemán (formato 1); descripción genérica tipo "Simulacro de Leseverstehen B1 — 5 Teile" (formato 2, el contenido real vive dentro de `questions.teile[].textos`) |
| `questions` | jsonb | Formato 1 (default, todos los niveles salvo B1/B2/C1/C2): array de `{ pregunta, opciones[4], correcta }`. Formato 2 (B1, B2, C1 y C2, ver `lecturaplan.md` §11-13): `{ teile: [{ id, tipo: 'mcq'\|'richtig_falsch'\|'emparejar', instrucciones, textos?, items?, columnaIzquierda?, columnaDerecha?, solucion? }] }` |
| `format_version` | integer | `1` = formato plano (default); `2` = formato por Teile. Ver migración `011_reading_texts_format_version.sql` |
| `created_at` | timestamptz | Auto |

RLS: SELECT público (anon). INSERT/UPDATE/DELETE solo via service role — los textos generados por IA los inserta `/api/chat` (action `generate-reading`).

### Supabase table: `user_reading_seen`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | FK → auth.users |
| `text_id` | uuid | FK → reading_texts |
| `seen_at` | timestamptz | Cuándo lo vio el usuario |

PK compuesta: `(user_id, text_id)`. RLS: cada usuario solo lee y escribe sus propias filas. Usado por Modo B de `lectura veloz.html` para evitar repetir textos ya vistos.

### Supabase table: `reading_sessions`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK, auto-generado |
| `user_id` | uuid | FK → auth.users |
| `level` | text | Nivel CEFR de la sesión |
| `text_id` | uuid | FK → reading_texts (nullable: `on delete set null`) |
| `format_version` | integer | `1` (flujo plano) o `2` (por Teile) |
| `aciertos` / `total` | integer | Puntuación de la sesión |
| `duracion_seg` | integer | Duración real; null en el flujo plano (no se cronometra) |
| `modo_examen` | boolean | Si la sesión corrió con el cronómetro activo |
| `teile` | jsonb | `[{ id, nombre, correct, total }]` por Teil; null en `format_version` 1 |
| `created_at` | timestamptz | Auto |

RLS: cada usuario inserta (con `is_access_valid()`) y lee solo sus propias filas; los admins leen todas (mismo patrón que 014-018). Ver migración `022_reading_sessions.sql`. Escrita por `compGuardarSesion()` en `lectura veloz.html` al terminar una sesión de Comprensión y leída por `compRenderHistorial()` para el panel "📈 Mi progreso en comprensión".

### Supabase table: `grammar_practice_exercises`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK, auto-generado |
| `rule_id` | text | Id de la regla en `GRAMMAR_DATA` (ya único entre niveles, ej. `b1-01`) |
| `level` | text | CEFR level: A1–C2 |
| `oraciones` | jsonb | Array `[{de, es, distractores?, por_que_mal?, ordenes_validos?}, ...]` — 5 oraciones de práctica generadas por IA. Los tres campos opcionales (añadidos en 2026-09-20) alimentan los distractores de par mínimo del quiz; las filas anteriores no los tienen y el cliente las sigue soportando |
| `created_at` | timestamptz | Auto |

RLS: SELECT público. INSERT solo vía service role — lo inserta `/api/chat` (action `generate-practice`). Usado por el botón "🎯 Practicar" de `gramatica.html`.

También guarda los sets de `kasus.html` (action `generate-kasus`): `rule_id` con prefijo `kasus:` (`kasus:{LEVEL}:{W-?}{caso}:{relleno}`, sin colisión con los ids de `GRAMMAR_DATA`) y `oraciones` = `[{frase, opciones, respuesta, pista, caso, genero, explicacion}]`. `user_grammar_practice_seen` registra igualmente qué sets vio cada alumno; el panel de admin excluye las filas `kasus:` al contar la práctica de `gramatica.html`.

### Supabase table: `user_grammar_practice_seen`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | FK → auth.users |
| `exercise_id` | uuid | FK → grammar_practice_exercises |
| `seen_at` | timestamptz | Cuándo lo practicó el usuario |

PK compuesta: `(user_id, exercise_id)`. RLS: cada usuario solo lee y escribe sus propias filas. Usado por `gramatica.js` para evitar repetir un set de oraciones ya practicado y decidir cuándo generar uno nuevo.

### Supabase table: `daily_usage_time`
| Column | Type | Description |
|--------|------|-------------|
| `user_id` | uuid | FK → auth.users |
| `date` | date | Día (hora local del navegador) al que corresponde el registro |
| `apps` | jsonb | `{ appId: ms, ... }` — ms de tiempo activo en pantalla por app ese día |
| `updated_at` | timestamptz | Auto-managed |

PK compuesta: `(user_id, date)`. RLS: cada usuario solo lee sus propias filas (más SELECT admin); no hay policies de INSERT/UPDATE — solo se escribe vía la función `upsert_daily_usage_time(p_date, p_apps)` (`security definer`), que suma `apps` contra el valor ya guardado (multi-dispositivo no se pisa) y borra filas de ese usuario con `date` de más de 60 días. Ver migración `016_daily_usage_time.sql` y el tracking local-first en `auth.js`.

### Supabase table: `feedback_reports`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK, auto-generated |
| `user_id` | uuid | FK → auth.users — quien reportó |
| `tipo` | text | `mensaje` (default en el modal) \| `bug` \| `sugerencia` |
| `mensaje` | text | Texto libre del reporte |
| `pagina` | text | `location.pathname` de origen (nullable) |
| `estado` | text | `nuevo` (default) \| `leido` \| `resuelto` |
| `respuesta` | text | Respuesta del admin (nullable) — añadida en migración `019` |
| `respuesta_at` | timestamptz | Cuándo respondió el admin (nullable) |
| `contexto` | jsonb | Nullable — añadida en `023`. Reporte enviado desde un ejercicio: `{app, set_id, rule_id, frase, respuesta, pista, caso, genero, nivel, relleno}` (`kasus.html`). `set_id` apunta a `grammar_practice_exercises.id`; el admin puede ocultar ese set desde Reportes |
| `respuesta_leida` | boolean | Si el usuario ya vio la respuesta (default `false`); se marca `true` vía la función `mark_feedback_seen()` cuando el usuario abre la pestaña "Mis mensajes" |
| `created_at` | timestamptz | Auto |

RLS: cada usuario inserta/lee solo sus propias filas (por lo tanto solo el autor del reporte ve su propia `respuesta`); admins (`profiles.role = 'admin'`) leen y actualizan todas. Ver migraciones `017_feedback_reports.sql` y `019_feedback_reports_respuesta.sql`. Escrito por el botón de feedback global de `auth.js` (modal con pestañas "✍️ Nuevo" / "📨 Mis mensajes"); leído/respondido por la sección "📬 Reportes" de `admin/index.html` (botón "Responder" por fila); dispara push a admins vía `api/push-subscribe.js` (acción `notify-admins`). El ícono flotante 💬 (`#feedback-fab`) se pone verde cuando el usuario tiene una respuesta sin leer (`_checkUnreadFeedbackReplies()` en `auth.js`, revisado en cada cambio de sesión).

### Supabase table: `active_sessions`
| Column | Type | Description |
|--------|------|-------------|
| `session_id` | uuid | PK — id de dispositivo, generado una vez en el navegador (`localStorage`, `ejaleman_device_id`) y reusado en cada login desde ese mismo navegador |
| `user_id` | uuid | FK → auth.users |
| `device` | text | Etiqueta corta tipo "Chrome · Windows", derivada de `navigator.userAgent` (máx. 120 caracteres) |
| `last_seen` | timestamptz | Actualizado en cada heartbeat |
| `created_at` | timestamptz | Auto |

RLS: cada usuario lee solo sus propias filas (más SELECT admin, mismo patrón 014-017); no hay policies de INSERT/UPDATE — solo se escribe vía la función `upsert_active_session(p_session_id, p_device)` (`security definer`), que también borra las filas de ese usuario con `last_seen` de más de 7 días. Ver migración `018_active_sessions.sql`. El heartbeat en `auth.js` (`_asTick`, cada 60s mientras la pestaña está visible y hay sesión) actualiza `last_seen`; `admin/index.html` (`renderDetSessions`) lista las sesiones del usuario en el panel de detalle y marca "conectado en N dispositivos a la vez" cuando 2+ filas tienen `last_seen` en los últimos 2 minutos.

### Supabase table: `marketing_posts`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK, auto-generated |
| `kind` | text | `carrusel` \| `reel` \| `testimonio` \| `email` |
| `tema` | text | Brief / tema de la pieza |
| `nivel` | text | A1–C2 o NULL (nichos no-alemán) |
| `contenido` | jsonb | Según `kind`; carrusel: `{ slides, hashtags, niche, modo, review }` |
| `caption` | text | Caption + hashtags |
| `estado` | text | `idea` \| `generado` \| `publicado` |
| `publish_date` | date | Fecha planificada/real de publicación (nullable) |
| `created_at` / `updated_at` | timestamptz | Auto (trigger para `updated_at`) |

RLS: solo usuarios con `profiles.role = 'admin'` leen/escriben. `marketing/contenido.html` escribe directo con el cliente Supabase (sin función serverless). Base del pipeline de contenido de marketing (historial + calendario editorial).
