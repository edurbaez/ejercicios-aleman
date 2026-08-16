# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Maintenance rule

**Whenever a new file is added to the project and actively used by an app or the deploy pipeline, update the Active Files table below AND the Apps / Deployment sections in `README.md` before finishing the task.** Likewise, remove entries for files that are deleted or deprecated.

## Subagent usage rule

**Use subagents (Agent tool) to keep the main context clean whenever a task requires reading/editing the large single-file HTML apps in this repo or broad exploration across the codebase** — e.g. auditing a `plan.js` level end-to-end, cross-referencing a whole app against `GRAMMAR_DATA`, or implementing a feature that spans one of the big apps (`lectura veloz.html`, `mundliche.html`, `escritura.html`, `marketing/contenido.html`, etc.). Reserve direct inline work (no subagent) for small, targeted edits where you already know the exact lines to touch.

## Project Overview

Five standalone HTML apps for language learning (Spanish ↔ German) plus a serverless API. No build system — open any `.html` file directly in a browser. All visible pages share a common navbar with a dropdown menu: **Inicio** is always visible as an independent link; the rest of the pages are grouped under a **Menú ▾** button.

## Active Files

### Apps

| File | Purpose |
|------|---------|
| `B2.html` | Vocabulary quiz app targeting B2-level German words. Deployed as PWA on Vercel. Logic delegated to `shared-game.js` via `window.APP_CONFIG`. |
| `A1.html` | Vocabulary quiz app targeting A1-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `A2.html` | Vocabulary quiz app targeting A2-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `B1.html` | Vocabulary quiz app targeting B1-level German words. Same engine as B2 via `shared-game.js`. PWA with offline support. |
| `C1.html` | Vocabulary quiz app targeting C1-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `C2.html` | Vocabulary quiz app targeting C2-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `lectura veloz.html` | "Entrenamiento de lectura" (visible name; filename kept for URL stability). Speed-reading (RSVP) app: flashes words one at a time at a configurable WPM. Three mutually exclusive activities via `#activity-tabs` + `switchActivity()` — ⚡ Sprint (default on load), 📚 Lectura veloz, 📖 Comprensión; switching stops any running sprint/RSVP/blog-view TTS. Includes a "Comprensión" panel with two modes: Modo A (user pastes a German text → GPT-4o-mini generates 4 MCQs, unchanged, no Teile format) and Modo B (select CEFR level → fetches an unseen text from `reading_texts` Supabase table or generates one via IA if none available). Modo B branches on `reading_texts.format_version`: `1` (legacy, all levels except B1) renders the flat single-text + 4-MCQ flow (`modoB_renderPreguntas`); `2` (B1 only so far — fase 1 de `lecturaplan.md`) first shows a Teil picker (`modoB_mostrarSelectorTeile()`, checkboxes over the 5 Teile, all checked by default — lets the student practice only a subset instead of the full 5-Teil simulation) and then renders the selected Teile as a Leseverstehen simulation (`modoB_iniciarTeilSession`/`modoB_renderTeilActual`) matching the real Goethe/telc B1 exam structure — Teil 1 texto+MCQ (3 opciones), Teil 2 personas↔anuncios (emparejar), Teil 3 foro↔personas (emparejar), Teil 4 richtig/falsch, Teil 5 situaciones↔reglas (emparejar); each Teil is answered then checked via "Comprobar Teil" (`modoB_comprobarTeilActual`, per-type scoring: mcq/richtig_falsch compare selected `.comp-opcion`, emparejar compares `<select>` values against `teil.solucion`), then "Siguiente Teil →" advances; final screen aggregates total correct/total plus a per-Teil breakdown (`modoB_mostrarResultadoTeilFinal`). Also a "⚡ Sprint de vocabulario" panel: flashes known words in its own RSVP display (source selector — SRS-mastered words with `reps >= 2` from `srs_progress` by default, system level lists A1–C2 from `word_lists`/`Data{LEVEL}.json` fallback, or the user's personal lists); every 10 words a surprise MCQ (German word → 4 Spanish options); adaptive WPM (+20 correct / −20 wrong, 80–600, persisted as `lv_sprint_wpm`); "Preguntas sorpresa" checkbox (persisted as `lv_sprint_quiz`) disables the MCQs so words just flash uninterrupted. Zero API cost except Modo A/B AI calls. |
| `diccionario.html` | German dictionary: searches a word via the serverless API (GPT-4o-mini) and caches results in Supabase + IndexedDB. |
| `chat-voz.html` | Voice conversation app: hold-to-record sends audio to Whisper (STT), AI replies via GPT-4o-mini, response read aloud via browser TTS. Selectable CEFR level (A1–C2) and masculine/feminine voice. Subject to the 60-min/day voice-STT cap shared across all voice apps (see "Voice-STT daily usage cap" below). |
| `chatvoz2/index.html` | Second voice conversation app, same architecture/pattern as `chat-voz.html` (hold-to-record, `/api/whisper` STT, GPT-4o-mini reply, browser TTS, repetir mode). Subject to the same shared 60-min/day voice-STT cap. |
| `corrector.html` | Grammar correction app (tarea, carta, frases sueltas): photo mode (upload/camera → client-side compression to JPEG ≤1600px → `/api/vision`) or text mode (paste text → `/api/chat`, GPT-4o-mini). Renders score, error cards, full corrected text and observations. Local history of last 20 reviews in IndexedDB `corrector-db`. |
| `escritura.html` | Writing practice app. Level selector (A1–C2) + task-type selector; generates Goethe/telc-style writing tasks (situation and Leitpunkte fully in German, vocabulary adapted to the selected level) via `/api/chat` using per-level specs (`LEVEL_SPECS`) and per-level topic banks (`TEMAS`). Next task is prefetched in background; task + draft persisted in `localStorage` (`esc_tarea`, `esc_draft`) across reloads. User writes in a textarea with live word count showing progress against the task's range ("62 / 70–100 palabras"); a second `/api/chat` call evaluates the text (always at the task's level `t.level`, not the currently selected pill — a hint warns when both diverge) and returns JSON: score 0–100, Leitpunkte checklist, register check, error cards (original → correction + explanation + category), improved version (corrected fragments highlighted via `highlightImproved()`), and overall comment. Inline warnings replace `alert`/`confirm`. Optional "⏱️ Modo examen" countdown per level (A1 15 min → C2 80 min, persisted as `esc_exam`). Local history of last 20 evaluations in IndexedDB `escritura-db` (panel "📚 Mis textos", same pattern as `corrector.js`; entries reload task + text + evaluation). Alternatively the student can handwrite the text and submit a photo (upload/camera/drag-and-drop, client-side compression to JPEG ≤1600px) which is evaluated via `/api/vision` with `type: 'escritura'` — same evaluation schema plus a transcription of the handwriting. Level persisted as `esc_level` (falls back to `onboarding_level`). All JS inline. Indigo theme (`#303F9F`). |
| `kasus.html` | Grammar case trainer: generates fill-in-the-blank exercises (Nominativ/Akkusativ/Dativ/Genitiv + Wechselpräpositionen mode) via `/api/chat`, with article or adjective-declension blanks (selector "Rellenar"). Each exercise is verified by a second independent-solve API call; next exercise is prefetched in background. Auto-advances on correct answer. Includes collapsible theory section on case identification. Tracks score and streak. All JS inline. Teal theme (`#00796B`). |
| `admin/index.html` | Admin-only dashboard at `/admin/`. Verifies admin role on load (redirects to `/` if not admin). Shows: summary stats (total users, active last 7 days, total events, exams, plus a 6th "Retención 8sem" card from the `marketing_summary` view — `retained_2w`/`active_8w` as a %), 7-day sparkline, activity by app and exam-average-by-level bar charts (each with an independent 7d/30d/Todo range pill selector, `appBarsRange`/`examStatsRange` — the last-20-exams table now respects `examStatsRange` too, previously a bug always showed the global last 20), "Actividad por app" `APP_NAMES` covers every app id emitted via `logEvent` including `mundliche`/`escritura`/`chatvoz2`/`auth`, "⚠️ Acceso por expirar" banner (profiles with `access_expires_at` within 7 days, hidden if none, click opens that user's detail), "Actividad últimos 5 días" per-student panel (only students with an event in the real last 5 calendar days, sorted by most recent activity first), users table with search — sortable by name/email/registro/**última actividad**/eventos, "última actividad" dot now has a 3rd red "stale" state for >30 days inactive (in addition to green "hoy"/orange "semana") — per-user detail panel (access control, plan-30-días progress, SRS mastery pills for vocabulary/`srs_progress` and grammar/`grammar_rule_progress` — `reps >= 2` counts as "dominada" — plus reading/grammar-practice completion counts from `user_reading_seen`/`user_grammar_practice_seen`, both requiring the admin-read policies from migration 015; a "📈 Actividad (últimos 30 días)" block ports the streak/%-correct/audio-minutes algorithm from `auth.js`'s `openStatsPanel()` but runs it over the already-loaded `eventsByUser` instead of a new fetch; a "⏱️ Tiempo activo (últimos 30 días)" block (`renderDetTiempo()`, amber/brown `#8D6E63`) reads `daily_usage_time` (bulk-loaded in `loadData()` into `dailyTimeByUser`, requiring the admin-read policy from migration 016) and shows total active screen time plus the top 5 apps by time, via `fmtDuration()`; `APP_NAMES` also covers `a1`/`a2`/`c1`/`c2` (added for this block); full event log; exam table), and invite form (calls `/api/admin` with `action: 'invite'`). No navbar from main apps. |
| `teacher/index.html` | Admin/teacher-only class planner at `/teacher/`. Verifies admin role on load (redirects to `/` if not admin). Level selector (pill buttons, `LEVELS` config array) switches between `teacher/clases-a1.js`/`clases-a2.js`/`clases-b1.js`/`clases-b2.js` (all four preloaded via `<script>`, no dynamic import) — `window.TEACHER_CLASES[level]` and `GRAMMAR_DATA[grammarKey]` are re-resolved per selection, persisted as `teacher_level` in localStorage. C1/C2 show as disabled pills (`LEVELS[].available: false`) until their `clases-{nivel}.js`/`plan.js` exist — enabling a level is a one-line change once the data file lands. Per selected level, cross-references rule ids against `GRAMMAR_DATA.{NIVEL}` to show, per week of that level's 30-day `plan.js`, the grammar content for the Tuesday and Thursday class (fixed mapping: martes = day 2 of the week, jueves = day 4 — a student starting the app on Monday reaches Tuesday's class already having studied day 2). Read-only in this phase: no editing UI yet for teacher-added tips/examples beyond what's in `gramatica.html`. No navbar from main apps; teal theme (`#00695C`), same as `kasus.html`. |
| `marketing/contenido.html` | Admin-only Instagram carousel generator at `/marketing/contenido.html` (linked from `/marketing/`). Niche selector driven by a `NICHES` config object (🇩🇪 Alemán / 🔥 Motivación / 🧠 Datos curiosos — extensible): per-niche prompts for generation, ideas, chat and review; non-German niches hide source/CEFR selectors (free topic only). Ideas & chat assistant panel: "Sugerir 6 ideas" (DeepSeek, JSON) rendered as clickable cards, plus a chat to refine a concept ("Usar esta idea" summarizes the conversation into a brief); both load the result into the free-topic field. German niche source selector (grammar rule from `grammar-data.js` / 5 random vocab words from `Data{LEVEL}.json` / free topic) + CEFR level. Slide copy, caption and hashtags generated via `/api/deepseek-chat` with retention techniques baked into the prompt (`MARKETING_RULES`: curiosity-gap hook, pattern interrupt, "save this post" slide, final CTA); an AI review loop (`reviewCopy()`: language correctness + marketing quality, max 1 correction pass) grades the result and shows a badge with scores. Slides rendered as 1080×1350 DOM nodes and exported to PNG with html2canvas (CDN). Background modes: **Plantilla** (CSS gradient, 6 color themes, free), **Imagen IA** (one `gpt-image-1-mini` background per carousel via `/api/image`), or **Subir imagen** (user-uploaded photo applied to all slides with dark overlay for readability; per-slide `imagen_sugerida` suggestion shown under each preview). "Descargar todas" exports sequentially with zero-padded names (`carrusel-slide-01.png`…) to preserve posting order. Auto-saves every generated carousel (estado `generado`, contenido `{ slides, hashtags, niche, modo, review }`) and every chosen idea (estado `idea`) to the `marketing_posts` Supabase table via `savePost()` (fire-and-forget, direct Supabase client, admin RLS). In-page "📚 Historial" tab (`switchView()`): lists saved pieces with estado/kind/nivel filters and per-piece actions — reload into the generator (forces Plantilla mode; AI/uploaded backgrounds aren't persisted), re-export PNGs, duplicate, delete, change estado (setting `publicado` auto-fills `publish_date`). Before generating, warns via `confirm()` if a similar tema (≥60% normalized word overlap) was already generated (checked against the active format's `kind`). Format selector "🎠 Carrusel / 🎬 Reel": Reel mode reuses niche/source/level but generates a 30-60 s video script via `/api/deepseek-chat` — JSON `{ hook, escenas: [{ visual, texto_hablado, texto_pantalla, segundos }], cta, caption, hashtags }` with a target-duration selector (30/45/60 s) and one compression retry if the total exceeds 60 s (red duration badge if still over; no AI review for reels). Script view: scene table with cumulative time ranges, fullscreen teleprompter (spoken text only, rAF auto-scroll with speed/font-size sliders, tap to pause) and copy-full-script button. Reels are saved as `kind: 'reel'` (contenido `{ hook, escenas, cta, hashtags, niche }`) and reload fully from the Historial tab. In-page "💬 Testimonios" tab (sin API): form (cita, nombre/inicial, nivel CEFR, logro opcional) with 3 designs (cita grande / antes→después with two extra textareas / logro numérico with a big-number field), 6-color theme selector and Feed 1080×1350 / Story 1080×1920 format → live preview (auto-sized font by quote length) exported as `testimonio-<slug>[-story].png` via the shared html2canvas export stage. Downloading auto-saves to `marketing_posts` as `kind: 'testimonio'` (`saveTesti()`: first download inserts, later downloads update the same row via `currentTestiId`; «🆕 Nuevo testimonio» resets form + id); from the Historial tab a testimonio can be fully reloaded into the form (`histLoadTesti()`) or re-exported to PNG directly. In-page "🎓 Publicidad de curso" tab: generates only the flyer *background* image for a German course promo (course name + free-text mood + up to 2 uploaded reference images). "🔍 Analizar referencia" sends each reference image to `/api/vision` (`type: 'style-analysis'`, new GPT-4o Vision prompt) which returns an editable English style description (palette, mood, decorative motifs, layout); that description is appended to a template prompt and sent to `/api/image` (`gpt-image-1-mini`, same call shape as `generateBackground()`) to generate the background. No text/data overlay yet (course dates/price/schedule are added outside this tool for now) — download the PNG directly or save to `marketing_posts` as `kind: 'curso_ad'` (`contenido: { nombreCurso, estiloDeseado, styleDescription }`; the generated image itself is not persisted, same as AI/uploaded carousel backgrounds — reloading from Historial restores only the text fields). Verifies admin role on load. All JS inline. |
| `marketing/emails.html` | Admin-only email generator at `/marketing/emails.html` (shared nav-tabs). Three email types via pills: **👋 Bienvenida** (new student; optional name and goal fields), **📚 Resumen semanal** (CEFR level + rule of the week from `GRAMMAR_DATA` + 5 random vocab words from `Data{LEVEL}.json` shown as chips with a 🎲 re-roll button), **🎓 Promoción capacitación** (segment selector from a `SEGMENTOS` config — módulos/duración/precio mirrored from the capacitación table in `/marketing/` — plus optional recipient field). Builds a per-type brief and calls `/api/deepseek-chat` with a teacher identity prompt; response schema `{ asuntos: [v1, v2], cuerpo }` — two subject variants rendered as selectable radio-cards. Body view toggle: plain text or branded HTML preview in an iframe (`buildEmailHtml()`: Gmail-compatible table layout with inline styles, blue brand header, CTA button to the platform, signature footer). Copy buttons: subject / body / full email / HTML (`ClipboardItem` with `text/html` so pasting into Gmail keeps formatting; falls back to copying the raw HTML source). Each generated email is auto-saved to `marketing_posts` as `kind: 'email'` (`saveEmail()`, fire-and-forget: contenido `{ tipo, asuntos, cuerpo }`, estado `generado`, nivel only for resumen semanal); before generating, `fetchUsedAsuntos()` pulls up to 12 subjects of the same email type from the pipeline and instructs the AI not to repeat them. Verifies admin role on load. All JS inline. |
| `marketing/calendario.html` | Admin-only editorial calendar at `/marketing/calendario.html` (nav-tabs shared with the other marketing pages). Month grid (Mon-first) with pieces from `marketing_posts` as chips colored by estado; "Esta semana" panel listing this week's pieces plus overdue ones (past `publish_date`, not published — highlighted red); "Sin programar" panel with two-step date assignment (📌 Programar → click a day). Chip click opens a detail box: mark as publicado (keeps original date), move to another date, or unschedule. Direct Supabase client (admin RLS), no serverless function. Verifies admin role on load. All JS inline. |
| `marketing/resultados.html` | Admin-only KPI page at `/marketing/resultados.html` (shared nav-tabs). Reads the 4 `marketing_*` views from migration 005: summary cards (total users, active 7/30d, retention % over last 8 weeks), weekly signups and weekly active-users bar charts (8/12/26/52-week range selector, missing weeks zero-filled), and per-app usage with a 30-days/all-time toggle. Correlation with the content pipeline: weekly chart rows show a 📣×n marker on weeks with published `marketing_posts`, and a "Publicaciones → registros" table counts signups (from `profiles.created_at`, client-side) within 3 days after each published piece. Pure-CSS horizontal bars (same pattern as `/admin/`), no chart library. Verifies admin role on load. All JS inline. |
| `marketing/index.html` | Admin-only marketing strategy page at `/marketing/`. Verifies admin role on load (redirects to `/` if not admin). Contains: executive summary, SWOT analysis, target segments, sales pitch scripts per segment, training/capacitación opportunities with pricing table, marketing channels, KPI framework, and commercial roadmap. No navbar from main apps. |
| `gramatica.html` | Grammar rules reference SPA. Displays the key grammar rules per CEFR level (A1–C2, 21/21/31/17/17/10 respectively — see `gramatica.js` row) as an accordion. Level selection via pill buttons; hash-based routing (#a1…#c2). All content embedded in `gramatica.js`. Per-rule "🎯 Practicar" button generates a 5-question quiz from AI-generated practice sentences, cached/shared across users in `grammar_practice_exercises` (see `gramatica.js` row). Orange theme (`#E65100`). |
| `chat-reformulaciones.html` | Voice/text sentence-transformation (Umformung) practice app. User selects grammar rules from `GRAMMAR_DATA` (in `grammar-data.js`) or random. Tasks come from the pregenerated bank `reformulaciones-data.json` (source sentence without the target structure + instruction in Spanish); zero API cost to generate. Hybrid evaluation: local normalized match against `solutions[]`, with a short `/api/chat` call only when no match (✅/⚠️/❌ by whether the target structure was applied). Falls back to full AI generation (`---NUEVA---` protocol) for rules missing from the bank. Uses `/api/whisper` for voice input, subject to the same shared 60-min/day voice-STT cap. Purple theme (`#6A1B9A`). Rule-level SRS (SM-2 on `rule.id`, IndexedDB `srs-db-reformulaciones` synced to `grammar_rule_progress`) updates on each evaluated turn and powers a "🔁 Repaso SRS" button that starts a session from up to 5 due rules; local session history (IndexedDB `reformulaciones-db`, last 20) is browsable in a collapsible "📚 Historial" panel, no Supabase sync. |
| `plan.html` | 30-day study plan SPA. Level selector (A1–C2), calendar grid of 30 days, progress bar, and day detail panel with task links. Progress persisted per level in `localStorage` (`plan_progress_{level}`, local-first) and synced cross-device to `user_data.plan_progress` when logged in (`loadRemoteProgress()`/`persistRemoteProgress()`; remote wins on load, pushed on every save — independent per level, so several levels in progress at once don't collide). "🗑️ Reiniciar progreso" button clears the current level's completed days (with a confirm) and its opened-task/last-day local state. Uses `plan.js` for data. Blue accent (`#1565C0`). Installable PWA (`manifest-plan.json` + `sw-plan.js` + `icon-plan.svg`, "30" logo) — offline caching + optional daily reminder via periodic background sync, registered inline at the bottom of the page's script. |
| `mundliche.html` | Oral exam (Mündliche Prüfung) trainer, practicing individual Teile of the Goethe/telc speaking exam by CEFR level. `LEVEL_SPECS[level].teile[]` defines the Teile per level (e.g. A1: Sich vorstellen / Fragen und Antworten / Bitte formulieren; B1 follows the real Goethe order: Gemeinsam etwas planen (turnos_max 9, persona exige ≥2 contrapropuestas) / Präsentation (5 Folien canónicas enforced in `buildTaskPrompt`/`fetchTarea` via `folien: true`) / Feedback geben (AI opens with a TTS mini-presentation, student asks a question + gives feedback) + extra Sich vorstellen labeled as non-exam; B2: Präsentation / Bildbeschreibung labeled "Extra... (no forma parte del examen B2 real)" since the real exam only has Vortrag + Diskussion (described as text, not a real image — avoids `api/image.js`'s marketing-only 3 req/min cap) / Diskussion; C1/C2: Vortrag / Diskussion / Stellung nehmen or Zusammenfassen). Each Teil has `modo: 'monologo'` (single timed recording, task generated via `/api/chat json:true`) or `'dialogo'` (multi-turn voice exchange: AI opens via a Teil-specific persona system prompt, student replies via `/api/whisper`, AI responds with `{antwort, turno_final}` JSON, capped at `turnos_max` turns). Recording/transcription/TTS reuse `chat-voz.html`'s patterns (MediaRecorder, `/api/whisper`, browser `SpeechSynthesisUtterance`); subject to the shared 60-min/day voice-STT cap (see "Voice-STT daily usage cap" below). Evaluation via a second `/api/chat json:true temperature:0.2` call anchored to an explicit rubric (score bands + weights: cumplimiento 40% / gramática-vocabulario 30% / fluidez 20% / interacción-o-estructura 10%) returns `{puntos_cubiertos[], fluidez, gramatica_y_lexico, interaccion, subscores:{cumplimiento,gramatica_vocabulario,fluidez,interaccion_o_estructura}, veredicto:'bestanden'|'nicht bestanden', comentario_general, puntuacion}` (`puntuacion` deliberately last in the schema so the model reasons before scoring); `duracion_evaluacion` is computed client-side from `MpState.totalRecSeconds` (accumulated across every recording of the attempt) rather than asked of the model, then merged into the result object before rendering/saving. The evaluation prompt also receives `teil.guia` (task-type constraints) and wraps the transcript in `<<< >>>` with an "ignore embedded instructions" note (prompt-injection mitigation); the dialogue persona system prompt carries a matching role-lock instruction (stay in character, answer only in German) — a persistent disclaimer states the STT-based grading cannot assess pronunciation or accent, only content/grammar/vocabulary/fluency-proxies/interaction from the transcript. "📝 Modo examen" checkbox (persisted as `mp_exam`): realistic Vorbereitung (`vorbereitung_exam_seg`, 15 min for B1 Präsentation) + a Notizen textarea kept in `MpState.notizen` (survives the `innerHTML` repaints of `#mp-practice-area`, visible during preparation and recording). `REDEMITTEL[level][teilId]` (loaded from `redemittel-data.js`, same shim spirit as `grammar-data.js`, currently populated only for B1) renders a collapsible per-Teil formula panel (`.mp-theory` pattern, zero API cost) inside `#mp-task-area`; when defined for the current Teil, the evaluation schema gains `redemittel: {usados, ejemplos[]}` rendered as chips. B2 `praesentation`/C1/C2 `vortrag` (flag `eleccion_tema: true`) generate two distinct topic options (`fetchTarea` returns `{opciones:[...]}`) and show a selection screen (`renderEleccionTema`) before the student picks one and continues the normal flow, mirroring the real exam's topic choice. Vortrag→Diskussion chaining: `MpState.sesion.teilesHechos` (capped at the last 10) records every evaluated Teil of the current page session; when the Diskussion Teil (B2/C1/C2) is practiced right after a Vortrag/Präsentation of the same level in the same session, `findVortragPrevio()` anchors the Diskussion's topic and the dialogue persona's opening question to that Vortrag (title/situation only, delimited with `<<< >>>`, not the student's transcript) — falls back to a random topic if no prior Vortrag exists. "🎓 Simulacro completo" button (`startSimulacroCompleto()`) reuses the same `MpState.sesion` to auto-advance through every Teil of the selected level (Vorbereitung per Teil unchanged) and, after the last one, calls a lightweight `/api/chat json:true` aggregation (only the already-computed `puntuacion`/`veredicto` per Teil, no transcripts resent) for a `{veredicto_global, comentario_global}`; saved to `mundliche-db` as `kind: 'examen_completo'` with nested `subresultados` (history rendering/loading branches on `e.kind`). TTS: A1-B2 keep the browser `SpeechSynthesisUtterance`; B2/C1/C2 (`TTS_PREMIUM_LEVELS`) try OpenAI voice via `/api/tts` first (same pattern as `chat-voz.html`, `voice:'onyx'`) and fall back silently to the browser voice on failure or missing session. The student's own recording is played back (`<audio controls>`, `MpState.lastRecordingUrl`, revoked on each new attempt) in parallel with — not blocking — the Whisper transcription; an optional zero-API phonological self-checklist (`PHONO_CHECKLIST[level]`) renders alongside it. Evaluation prompt includes a fixed one-shot example (`EVAL_FEWSHOT_EXAMPLE`, stable text for OpenAI prompt caching) and asks for `justificacion_puntuacion` (1-2 sentences) immediately before the final `puntuacion`; `max_tokens` for the evaluation call is 1500 (previously 3000). `#mp-historial` also shows `computeProgressStats()`: global average, per-Teil average (shown only with ≥2 attempts) and the weakest Teil, computed from the same 20-entry local cache. Local history (last 20 attempts, plain and `examen_completo` mixed) in IndexedDB `mundliche-db`, transcript + evaluation only (recording audio is played back client-side but never persisted). No new Supabase table; no new serverless endpoint (reuses `/api/chat`, `/api/whisper`, `/api/tts`). Amber/brown theme (`#8D6E63`). |

### API

| File | Purpose |
|------|---------|
| `api/chat.js` | Vercel serverless function — proxies requests to OpenAI (`gpt-4o-mini`). Requires `Authorization: Bearer <supabase_jwt>` (verified with `SUPABASE_JWT_SECRET`). Rate limited to 20 req/min per user. Optional origin check via `ALLOWED_ORIGIN` env var and system prompt size cap (4 000 chars). Accepts an optional `temperature` (number, 0-2) forwarded to OpenAI; omitted/invalid values fall back to the OpenAI default. Pre-warms the JWKS cache at module load to reduce cold-start latency. Extra action `generate-reading` (`{ action, level }`): si `READING_TEILE_SPECS[level]` existe (B1 y B2), delega en `generateReadingTeile()` — genera una sesión de 5 Teile con GPT-4o-mini (`response_format: json_object`, `max_tokens: 3500`, un solo prompt que describe cada Teil según su tipo: mcq 3 opciones, richtig_falsch, o emparejar con distractores), valida la forma con `validTeileSession()`/`TEIL_VALIDATORS` (uno por tipo: `validMcqTeil`, `validRichtigFalschTeil`, `validEmparejarTeil`) y guarda en `reading_texts` con `format_version: 2` y `questions: { teile: [...] }`. Para los demás niveles mantiene el flujo legado (texto único + 4 preguntas MCQ, `format_version` por defecto `1`). Ambos flujos insertan con el service role (la tabla no tiene policy de INSERT para clientes) y evitan repetir título/situación consultando los últimos 8 títulos ya generados para ese nivel (y `format_version`) en `reading_texts`. Usado por el Modo B de `lectura veloz.html`. Extra action `generate-practice` (`{ action, ruleId, level, system, prompt }`): el prompt lo construye el cliente (`gramatica.js`, el contenido de la regla ya vive en `grammar-data-{level}.js` en el navegador); el endpoint solo llama a OpenAI, valida que la respuesta sea un array JSON de `{de, es}` y lo guarda en `grammar_practice_exercises` con el service role. Usado por el botón "🎯 Practicar" de `gramatica.html` para no regenerar oraciones que otro alumno ya generó para la misma regla. |
| `api/_reading-topics.js` | Datos compartidos por `generate-reading` en `api/chat.js` (no cuenta como función serverless propia — empieza con `_`). Exporta `TEMAS` (Themenkatalog por nivel CEFR, duplicado manualmente desde el `TEMAS` de `escritura.html`; no se comparte código porque este es un módulo ESM serverless y el otro un script de navegador), las dimensiones de aleatorización `PERSONAS`, `LUGARES`, `TONOS`, `MOMENTOS`, `CONFLICTOS`, el helper `pick()`, `READING_SPECS` (longitud/tipo de texto por nivel, flujo legado `format_version` 1) y `READING_TEILE_SPECS` (lista ordenada de Teile por nivel con su `tipo` de tarea — `B1` y `B2` poblados, ver `lecturaplan.md` §11-12; C1/C2/A1/A2 pendientes). |
| `api/whisper.js` | Vercel serverless function — receives multipart audio, forwards to OpenAI Whisper (`whisper-1`) for transcription. Requires JWT auth. Rate limited to 10 req/min per user. Pre-warms JWKS cache at module load; JWT verification and request body reading run in parallel (`Promise.all`) to reduce latency. |
| `api/vision.js` | Vercel serverless function — receives `{ image_base64, mime_type, type }`, calls GPT-4o with vision (`response_format: json_object`). Returns structured JSON: `{ puntuacion, resumen, errores[], texto_corregido, observaciones_generales }`. Requires JWT auth. Rate limited to 5 req/min per user. Supports types: `tarea`, `carta`, `frases`, plus `escritura` (requires a `task` object; grades handwritten text against a writing task and returns the escritura evaluation schema: `texto_transcrito`, `puntuacion` 0–100, `puntos_cubiertos[]`, `registro_adecuado`, `errores[]`, `version_mejorada`, `comentario`), plus `style-analysis` (describes the visual/graphic style of a reference image — palette, mood, decorative motifs, layout, typography — as `{ style_description }`; used by `marketing/contenido.html`'s "Publicidad de curso" tab to turn an uploaded reference image into a text fragment for an `/api/image` prompt). |
| `api/tts.js` | Vercel serverless function — receives `{ text, voice }`, calls OpenAI `tts-1`, returns audio/mpeg binary. Requires JWT auth. Rate limited to 30 req/min per user. Default voice: `onyx`. Used by `shared-game.js` to replace browser TTS for German words. |
| `api/image.js` | Vercel serverless function — receives `{ prompt, size, quality }`, calls OpenAI Images (`gpt-image-1-mini`; siempre devuelve b64, sin `response_format` — DALL·E fue retirado de la API en mayo 2026), returns `{ image_base64 }`. Requires JWT auth. Rate limited to 3 req/min per user. Used by `marketing/contenido.html`. |
| `api/admin.js` | Vercel serverless function — admin actions dispatched by `action` in the body: `invite` (invites a user by email via Supabase auth admin API) or `set-status` (sets `status` = approved/blocked/pending in `profiles`, plus an optional `access_expires_at` — omit to leave untouched, `null` for unlimited access, or an ISO date string to set/extend the access window; see "Access control" below). Requires JWT from an admin user (verified via `_lib.js`, ES256 + HS256). Merged from the former `admin-invite.js`/`approve-user.js` (12-function Hobby limit). Reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Vercel env vars. |
| `api/push-subscribe.js` | Vercel serverless function — manages Web Push subscriptions. GET returns current settings; POST upserts subscription + preferences (interval_hours, window_start, window_end, utc_offset_minutes); DELETE removes subscription. Requires JWT auth. Writes to `push_subscriptions` table via `SUPABASE_SERVICE_ROLE_KEY`. |
| `api/push-notify.js` | Vercel serverless function — sends push notifications to eligible subscribers. Called hourly by Vercel Cron (Pro) or cron-job.org (free). Requires `Authorization: Bearer <CRON_SECRET>`. Reads all `push_subscriptions`, converts UTC time to each user's local timezone, checks window and interval, sends via `web-push`. Removes stale subscriptions (HTTP 410/404). |
| `api/vocab-refresh.js` | Vercel serverless function — cron endpoint (`Authorization: Bearer <CRON_SECRET>`) that generates ~15 current German expressions per CEFR level via GPT-4o-mini and appends them to a system `word_lists` row named `nuevas` (app_id = level, newest first, capped at 150). Level via body/query `level`, or daily rotation a1→c2 (full cycle every 6 days). Quiz apps pick the list up automatically because `loadSystemLists()` reads Supabase before the static JSON. |
| `api/deepseek-chat.js` | Vercel serverless function — proxies requests to DeepSeek (`deepseek-chat`). Same structure as `chat.js`. Requires `DEEPSEEK_API_KEY`. Rate limited to 20 req/min per user. |
| `api/finanzas.js` | Vercel serverless function — dispatches by `action` in the body: `price` (real-time crypto via CoinGecko + indices via Yahoo Finance, 5 min cache) or `history` (historical prices, 30 min cache). Merged from the former `finanzas-price.js`/`finanzas-history.js` to stay within the 12-function Hobby limit. Rate limited to 10 req/min per user. No external API key required. |
| `api/_lib.js` | Shared utilities for all serverless functions: `verifyJWT()` (ES256 via JWKS + HS256 via `SUPABASE_JWT_SECRET`), `createRateLimiter()` (Vercel KV when available, in-memory Map fallback), and `checkAccess()` (reads `profiles.status`/`access_expires_at` with the service role key and mirrors `is_access_valid()`; see "Access control" below). Pre-warms JWKS cache at module load. |

### Data

| File | Purpose |
|------|---------|
| `DATA.json` | Legacy B2 vocabulary (old format). Kept for backward compatibility with `sw.js` cache. |
| `DataA1.json` | Vocabulary data for A1: esenciales (50), verbos (112), sustantivos (150), adjetivos (100), expresiones (100). Generated by `scripts/generate-vocab.js`. |
| `DataA2.json` | Vocabulary data for A2: esenciales (50), verbos (~112), sustantivos (~148), adjetivos (~96), expresiones (~100). Generated by `scripts/generate-vocab.js`. |
| `DataB1.json` | Vocabulary data for B1: esenciales (50), verbos (~107), sustantivos (~142), adjetivos (~92), expresiones (~99). Generated by `scripts/generate-vocab.js`. |
| `DataB2.json` | Vocabulary data for B2 (new format): esenciales (50), verbos (120), sustantivos (~140), adjetivos (~101), expresiones (~95). Used by `B2.html`. |
| `DataC1.json` | Vocabulary data for C1: esenciales (50), verbos (~113), sustantivos (~172), adjetivos (~91), expresiones (~95). Generated by `scripts/generate-vocab.js`. |
| `DataC2.json` | Vocabulary data for C2: esenciales (50), verbos (~117), sustantivos (165), adjetivos (~98), expresiones (~101). Generated by `scripts/generate-vocab.js`. |
| `reformulaciones-data.json` | Bank of reformulation exercises keyed by grammar rule id (~20 per rule): `{ source, instruction, solutions[], explanation }`. Used by `chat-reformulaciones.html`. Generated by `scripts/generate-reformulaciones.js`. |
| `grammar-data.js` | Loader shim (no rules of its own). Resolves its own script URL via `document.currentScript.src` and `document.write`s the 6 `grammar-data-{level}.js` `<script>` tags in order, so callers keep including a single `grammar-data.js` from any relative/absolute path. Also declares the global `LEVELS` array and initializes `window.GRAMMAR_DATA = {}` before the per-level files populate it. Must stay a plain blocking `<script>` (no `async`/`defer`/`type="module"`) wherever it's included. |
| `grammar-data-a1.js` / `-a2` / `-b1` / `-b2` / `-c1` / `-c2` | Grammar rules for one CEFR level each, populating `window.GRAMMAR_DATA.{LEVEL}` (10 rules/level as of the original split — designed to grow independently per level without bloating a single file). Loaded exclusively via the `grammar-data.js` shim above; never referenced directly by HTML. |
| `teacher/clases-b1.js` | Class-content mapping for B1: `window.TEACHER_CLASES.b1` — 30 flat day objects (`{ day, semana, focus, ruleIds[], esClaseEnVivo, contenido.reglas[] }`), same shape as `clases-a1.js`/`clases-a2.js`, cross-referencing `PLANS.b1` (`plan.js`) against the 31 rules of `GRAMMAR_DATA.B1`. Same martes/jueves live-class calendar as A1/A2 (days 2, 4, 9, 11, 16, 18, 23, 25). Used by `teacher/index.html`. |
| `teacher/clases-a1.js` | Class-content mapping for A1: `window.TEACHER_CLASES.a1` — 30 flat day objects (`{ day, semana, focus, ruleIds[], esClaseEnVivo, contenido.reglas[] }`), cross-referencing `PLANS.a1` (`plan.js`) against the 21 rules of `GRAMMAR_DATA.A1` (`grammar-data-a1.js`). Same martes/jueves live-class calendar as B1 (days 2, 4, 9, 11, 16, 18, 23, 25). Internally built from a `RULES` map + `base(id)`/`repaso(id, nota)` helpers (IIFE) instead of literal per-day duplication like `clases-b1.js`, to avoid the same rule's pedagogical content drifting out of sync across the several days that repeat it — `window.TEACHER_CLASES.a1` still resolves to the same flat 30-object array shape `teacher/index.html` expects. Not yet wired into `teacher/index.html` (still hardcoded to `.b1`; a level selector is pending, see `teacher/plan.md` tarea 5). |
| `teacher/clases-a2.js` | Class-content mapping for A2: `window.TEACHER_CLASES.a2` — same shape/pattern as `clases-a1.js` (`RULES` map + `base(id)`/`repaso(id, nota)` helpers, 30 flat day objects), cross-referencing `PLANS.a2` (`plan.js`) against the 21 rules of `GRAMMAR_DATA.A2` (`grammar-data-a2.js`, ids `a2-01`…`a2-23` minus the two renumbered to A1). Same live-class calendar as A1/B1 (days 2, 4, 9, 11, 16, 18, 23, 25). Not yet wired into `teacher/index.html` (pending level selector, `teacher/plan.md` tarea 5). |
| `teacher/clases-b2.js` | Class-content mapping for B2: `window.TEACHER_CLASES.b2` — same shape/pattern as `clases-a1.js`/`clases-a2.js` (`RULES` map + `base(id)`/`repaso(id, nota)` helpers, 30 flat day objects), cross-referencing `PLANS.b2` (`plan.js`) against the 17 rules of `GRAMMAR_DATA.B2` (`grammar-data-b2.js`, ids `b2-01`…`b2-17`). Same live-class calendar as A1/A2/B1 (days 2, 4, 9, 11, 16, 18, 23, 25). Wired into `teacher/index.html` (B2 pill enabled). |
| `redemittel-data.js` | Shared bank of Redemittel (fixed phrases) by CEFR level and Teil, `window.REDEMITTEL[level][teilId] = [{label, frases[]}]`. Currently only B1 (`gemeinsam-planen`/`praesentation`/`feedback-geben`) is populated — extracted from `mundliche.html` following the same reusable-global spirit as `grammar-data.js` (not fragmented per level yet since only one level has content; if expanded to all levels, replicate that shim pattern). Loaded via a plain `<script>` tag before `mundliche.html`'s inline script. Expanding content to other levels and wiring it into `teacher/index.html`/`marketing/contenido.html` is future content work, out of scope here. |

### Scripts (offline tools)

| File | Purpose |
|------|---------|
| `scripts/seed-word-lists.js` | One-time Node.js script to insert all 6 Data{LEVEL}.json files (A1→C2) into the `word_lists` Supabase table as system rows. Run after applying `supabase/migrations/001_word_lists_srs.sql`. Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in `.env.local`. |
| `scripts/generate-vocab.js` | Generates `Data{LEVEL}.json` files via GPT-4o. Usage: `node scripts/generate-vocab.js [a1\|a2\|b1\|b2\|c1\|c2]`. No arg = all levels. Each category is a separate API call to avoid JSON truncation. Requires OPENAI_API_KEY in `.env.local`. |
| `scripts/generate-reformulaciones.js` | Generates `reformulaciones-data.json` via GPT-4o (one call per grammar rule in `grammar-data.js`, ~20 exercises each). Usage: `node scripts/generate-reformulaciones.js [a1\|…\|c2] [rule-id]`. No arg = all levels; existing rules in the file are skipped (incremental); passing a rule-id forces regeneration. Requires OPENAI_API_KEY in `.env.local`. |
| `scripts/fix-duplicate-words.js` | One-off repair tool for a `generate-vocab.js` generation bug where GPT padded a category to hit its exact requested word count by looping/repeating already-used entries (worst case: 69 of 95 `expresiones` in `DataB2.json` were the same repeated phrase). For each `Data{LEVEL}.json`, detects verbatim duplicates within a category (case-sensitive, article-stripped), removes them, then tries to backfill with genuinely new words via GPT-4o — hard-excluding every word already used at that level or any lower CEFR level (best-effort: if the model keeps re-suggesting already-used words after 3 stalled rounds, it stops and accepts a smaller-than-original category rather than forcing low-quality/misleveled filler). Usage: `node scripts/fix-duplicate-words.js [a1\|…\|c2]`; no arg = all levels. Requires OPENAI_API_KEY in `.env.local`. Not part of the regular build — run manually if a future regeneration reintroduces this bug (now also guarded against directly in `generate-vocab.js`'s `generateCategory`). |

### Database Migrations

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

### PWA & Deploy

| File | Purpose |
|------|---------|
| `manifest.json` | PWA manifest for `B2.html`. |
| `sw.js` | Service Worker — caches `B2.html`, `DATA.json`, `manifest.json`, `icon.svg` for offline use. Also handles `push` events (Web Push API): shows notification with title/body/url from the push payload. |
| `icon.svg` | PWA icon: blue rounded square with "B2" in white. |
| `manifest-b1.json` | PWA manifest for `B1.html`. Green theme (#388E3C). |
| `sw-b1.js` | Service Worker for B1 app — caches `B1.html`, `DataB1.json`, `manifest-b1.json`, `icon-b1.svg`. Also handles `push` events (same pattern as `sw.js`). |
| `icon-b1.svg` | PWA icon for B1: green rounded square with "B1" in white. |
| `manifest-a1.json` | PWA manifest for `A1.html`. Red theme. |
| `sw-a1.js` | Service Worker for A1 app — caches `A1.html`, `DataA1.json`, `manifest-a1.json`, `icon-a1.svg`. |
| `icon-a1.svg` | PWA icon for A1. |
| `manifest-a2.json` | PWA manifest for `A2.html`. Orange theme. |
| `sw-a2.js` | Service Worker for A2 app — caches `A2.html`, `DataA2.json`, `manifest-a2.json`, `icon-a2.svg`. |
| `icon-a2.svg` | PWA icon for A2. |
| `manifest-c1.json` | PWA manifest for `C1.html`. Purple theme. |
| `sw-c1.js` | Service Worker for C1 app — caches `C1.html`, `DataC1.json`, `manifest-c1.json`, `icon-c1.svg`. |
| `icon-c1.svg` | PWA icon for C1. |
| `manifest-c2.json` | PWA manifest for `C2.html`. Dark/black theme. |
| `sw-c2.js` | Service Worker for C2 app — caches `C2.html`, `DataC2.json`, `manifest-c2.json`, `icon-c2.svg`. |
| `icon-c2.svg` | PWA icon for C2. |
| `manifest-plan.json` | PWA manifest for `plan.html`. Blue theme (`#1565C0`), matches its accent. |
| `sw-plan.js` | Service Worker for `plan.html` — caches `plan.html`, `styles.css`, `manifest-plan.json`, `icon-plan.svg`, `plan.js`, `config.js`, `auth.js`. Same install/activate/periodicsync/push/notificationclick/fetch pattern as `sw.js`/`sw-b1.js` etc.; registered inline in `plan.html` (no `shared-game.js`, so registration + periodic sync opt-in live directly in the page's script). |
| `icon-plan.svg` | PWA icon for `plan.html`: blue rounded square with "30" in white. |
| `vercel.json` | Configuración de Vercel: funciones serverless con `maxDuration: 60` (un solo patrón `api/*.js` — patrones superpuestos rompen el build). Sin rewrites (`/` sirve `index.html` directamente). |
| `index.html` | Landing page principal: muestra todas las apps como tarjetas. Navbar con dropdown. Auth via `auth.js`. SEO: meta description, canonical, Open Graph y Twitter card apuntando a `https://ejercicios-aleman.vercel.app/`. |
| `robots.txt` | Permite indexación completa (`Allow: /`) y referencia `sitemap.xml`. |
| `sitemap.xml` | Sitemap con la landing (`/`) como única URL pública — las apps internas no se listan (requieren login/uso). |
| `package.json` | Node.js package declaration — forces Vercel to treat the project as Node. Dependencies: `@vercel/kv`, `web-push` (used by `api/push-notify.js`). |
| `.env.local` | Local env vars (not committed). Must define `OPENAI_API_KEY` for local dev. |

### App Scripts

| File | Purpose |
|------|---------|
| `config.js` | Single source of truth para credenciales Supabase (`window.SUPA_URL`, `window.SUPA_KEY`) y VAPID public key (`window.VAPID_PUBLIC_KEY`). Cargado antes de `auth.js` en todas las páginas. Generar VAPID keys con `npx web-push generate-vapid-keys`. |
| `auth.js` | Shared authentication module loaded by all pages. Reads `SUPA_URL`/`SUPA_KEY` globals from `config.js`. Creates `window.sb` (Supabase client), injects the login modal (OTP + Google OAuth), and exposes `window.openAuthModal`, `window.logout`, `window.updateAuthUI`, `window.logEvent`, `window.openStatsPanel`, `window.closeStatsPanel`, `window.getAuthToken`, `window.toggleNotifications`, `window.saveNotifSettings`, `window._setNotifInterval`. `openStatsPanel()` renders a right-side drawer with: (1) HOY cards; (2) 30-day bar chart; (3) streak; (4) all-time totals; (5) sección "🔔 Recordatorios" — toggle activar/desactivar push notifications, selector de intervalo (1h/2h/3h/4h/6h) y ventana horaria (desde/hasta). La sección se renderiza via `_renderNotifSection()` que consulta `/api/push-subscribe` para cargar preferencias guardadas. Solo se muestra si `window.VAPID_PUBLIC_KEY` está configurado y el navegador soporta PushManager. **Also owns the shared "Menú ▾" dropdown**: `NAV_ITEMS` is the single source of truth for the 11 nav links + Vocabulario submenu (each entry carries `bodyId` to match `<body id="page-x">` for active-link highlighting); `_renderNavMenu()` builds the `.nav-dropdown-menu` DOM from it on `DOMContentLoaded`, before `updateAuthUI()` appends the admin-only `ADMIN_LINKS` via `_addDashboardLink()`. The 17 pages that use this nav only ship an empty `<div class="nav-dropdown-menu"></div>` — add/reorder/rename menu items only in `NAV_ITEMS`, never per-file. The 6 PWA service workers (`sw.js`, `sw-a1.js`, `sw-a2.js`, `sw-b1.js`, `sw-c1.js`, `sw-c2.js`) precache `auth.js`, `config.js`, and the Supabase CDN script so the JS-rendered menu still works offline. **Daily active-time tracking** (local-first, per app): a heartbeat (`_dtTick()`, every 15s while `document.visibilityState === 'visible'` and a user is signed in) accumulates ms per app into a `localStorage` key scoped to that calendar day (`ejaleman_daily_time_<YYYY-MM-DD>`, `{appId: ms}`) — zero DB calls during the day, and a day rolling over mid-session just starts writing to a new key without touching the previous day's. The app id per page comes from `document.body.id` via the `_DT_BODY_APP` map (falls back to a path-based slug for admin/teacher/marketing/chatvoz2, which have no body id); `chatvoz2/index.html`'s body id was renamed `page-cv2` (was colliding with `chat-voz.html`'s `page-cv`, which would have merged their tracked time — `styles.css`'s `#page-cv` theme rules were extended to also match `#page-cv2` so the visual theme is unaffected). On sign-in/page-load/tab-refocus, `_dtSyncStaleDays()` scans for any `ejaleman_daily_time_*` key that isn't today's, sends **one** `supabase.rpc('upsert_daily_usage_time', {p_date, p_apps})` call per stale day found, and removes the key on success — so syncing only happens on day transitions, not per session. The RPC (migration `016_daily_usage_time.sql`) is `security definer`, additively merges `apps` per key (so multiple devices syncing the same day sum instead of overwrite) and prunes rows older than 60 days for that user on every call. If the user never reopens the app, that last day's local record is lost — an accepted tradeoff (no `sendBeacon` fallback). |
| `shared-game.js` | Motor de juego compartido entre `B2.html` y `B1.html`. Contiene todo el estado (`State`), lógica de selección, TTS (OpenAI `tts-1` vía `/api/tts` con fallback al TTS del navegador, caché en memoria), SRS SM-2 (IndexedDB `srs-db-{APP}`, botón "SRS Repaso"), Frases en contexto (modal que llama `/api/chat`), temporizador, listas personales (IndexedDB), PWA, y chequeo de duplicados: al guardar una lista personal, `checkDuplicatesAgainstSystem()` compara las palabras en alemán (case-insensitive) contra un índice construido con `loadSystemLists()` de los 6 niveles A1–C2 (`buildSystemWordIndex()`, cacheado en memoria por sesión), y si hay coincidencias muestra un panel inline (`mostrarRevisionDuplicados()`, sin `alert`/`confirm`) para excluirlas antes de guardar; falla en abierto (nunca bloquea el guardado) ante errores de red. **Modo Escritura** (producción activa, toggle "✍️ Escritura" junto a `btn-inverso` en la sección Juego, persistido como `escritura_mode_{appId}`): sustituye `.options-grid` por un `<input>` + botón "Comprobar" — el usuario escribe la traducción en vez de elegir entre 4 opciones; corrección exacta (`normalizeAnswer()`: trim + lowercase) o tolerando 1 error de tipeo (distancia de Levenshtein ≤ 1). Ambos modos (selección y escritura) convergen en `processAnswer(correct)`, la única función que actualiza aciertos/errores, el SRS SM-2 y el batch de `quiz_session_end` — así el modo escritura queda cubierto por la repetición espaciada sin duplicar esa lógica. Independiente del modo Auto/Dual (que pertenece a la sección Repetición, no a la de Juego), por lo que ambos pueden coexistir sin conflicto. Cada página define `window.APP_CONFIG` con sus valores específicos (`appId`, `dataFile`, `limitKey`, `darkKey`, `swFile`, `syncId`, `accent`) antes de cargar este script. |
| `diccionario.js` | All JS logic for `diccionario.html`: uses `window.sb` from `auth.js` (no Supabase client propio), IndexedDB cache, autocomplete suggestions, API fetch (robust `text()` → `JSON.parse` pattern), and result rendering. |
| `corrector.js` | All JS logic for `corrector.html`: file/camera input handling, base64 conversion, drag-and-drop upload, `/api/vision` call, and result rendering (score, error cards with category badges, observaciones). |
| `gramatica.js` | All SPA logic for `gramatica.html`: level tab rendering, accordion toggle, and hash-based routing over the global `GRAMMAR_DATA` object (117 rules total: A1 21, A2 21, B1 31, B2 17, C1 17, C2 10 — B2/C1 follow the chapter granularity of "Grammatik aktiv B2/C1", Cornelsen) loaded from `grammar-data.js` + `grammar-data-{level}.js`. "🎯 Practicar" quiz (`getPracticeSentences()`): before calling AI, checks `grammar_practice_exercises` (Supabase, keyed by `rule_id`) for a set the current user hasn't seen yet (`user_grammar_practice_seen`, same reuse pattern as `reading_texts`/`user_reading_seen` in `lectura veloz.html`); only when every existing set for that rule was already seen does it call `/api/chat` `action: 'generate-practice'` to generate and persist `PRACTICE_EXERCISE_COUNT` (5) new sentences. Falls back to the rule's built-in `ejemplos` on any auth/network/DB error. `buildQuizQuestions()` turns the 5 sentences into 5 questions (opción múltiple / identificar / ordenar / artículo, randomized per sentence). Also calls `/api/chat` directly (no caching) for Modo Examen's per-rule exercise generation. |
| `plan.js` | Data file for `plan.html`. Exports `window.PLANS` — an object with 6 keys (a1–c2), each containing 30 day objects `{ day, week, focus, tasks[] }`. Tasks have `{ app, label, minutes }`. |
| `onboarding.js` | Guided tour for first-time visitors, loaded by `index.html`. Spotlight overlay with 6 steps: welcome + CEFR level picker (persisted as `onboarding_level`), vocab card of the chosen level, plan 30 días, Menú dropdown, auth button, final CTA ("Ir a mi nivel"). Runs once (`onboarding_done_v1` in localStorage); relaunchable via fixed "?" button (bottom-left) or `window.startOnboarding()`. |

### Shared styles

| File | Purpose |
|------|---------|
| `styles.css` | Shared stylesheet for all apps. Starts with a `:root` block defining global CSS variables: `--color-b2` (#1976D2), `--color-b2-dark`, `--color-b1` (#388E3C), `--color-b1-dark`, `--color-danger`, `--color-danger-dark`, `--radius`, `--gap`. Sections: shared navbar (incl. dropdown), B2, B1, Lectura Veloz, Chat de Voz, Diccionario, Kasus-Trainer (#00796B teal), Corrector. |

---

## B1.html — Implementation Notes

### Overview
Vocabulary quiz app for B1-level German. Mirrors the architecture of `B2.html` but loads data from external `DataB1.json`.

### Data structure
Data loaded from `DataB1.json` with keys: `verbos1`, `verbos2`, `adjetivos`, `adverbios`, `particulas_modales`. Each contains parallel arrays `de` (German) and `es` (Spanish).

### PWA
- Theme color: `#388E3C` (green)
- Icon: `icon-b1.svg` (green rounded square with "B1")
- Service Worker: `sw-b1.js` (separate cache from B2 app)
- Manifest: `manifest-b1.json`

### Differences from B2 (solo configuración — la lógica la comparte `shared-game.js`)
- `APP_CONFIG.dataFile`: `DataB1.json` vs `DATA.json`
- `APP_CONFIG.accent`: `#388E3C` verde vs `#1976D2` azul
- `APP_CONFIG.swFile`: `/sw-b1.js` vs `/sw.js`
- Body ID: `page-b1` vs `page-b2`

---

## diccionario.html — Implementation Notes

### Core concept
Looks up a German word and returns: translation (ES), CEFR level badge, definition (DE), synonyms, and antonym. Results are cached to avoid redundant API calls. All logic lives in `diccionario.js`.

### Data flow
1. User types a word → `buscar()` fires.
2. Check **IndexedDB** cache first (`cacheGet()`).
3. If miss, check **Supabase** table (`supaGet()`).
4. If still miss, call `POST /api/chat` → GPT-4o-mini returns structured JSON.
5. Result is stored in both Supabase (`supaSet()`) and IndexedDB (`cacheSet()`).

### API fetch pattern
Uses `res.text()` → manual `JSON.parse()` (same pattern as `chat-voz.html`) to avoid silent failures when the server returns an empty or non-JSON body. Error message includes the raw response for easier debugging.

### External dependencies (CDN)
- `@supabase/supabase-js@2` — cloud persistence of dictionary results.

### Key functions (in `diccionario.js`)
- `buscar()` — orchestrates the lookup chain (IndexedDB → Supabase → API).
- `supaGet(palabra)` / `supaSet(palabra, info)` — Supabase read/write.
- `cacheGet(palabra)` / `cacheSet(palabra, info)` — IndexedDB read/write.
- `abrirDB()` — opens/upgrades the local IndexedDB store.
- `mostrarResultado(palabra, info)` — renders the result card.
- `actualizarActivo(items)` / `seleccionarSugerencia(palabra)` — autocomplete from cached words.

### Security
`api/chat.js` applies three layers of protection to prevent API key abuse:
1. **Rate limit** — 20 req/min per IP via in-memory `Map` (sliding window). Resets on cold start; no external dependency.
2. **Origin check** — if `ALLOWED_ORIGIN` is set in Vercel env vars, requests from other origins are rejected with `403`.
3. **Payload cap** — `system` prompt limited to 4 000 characters.

---

## B2.html — Implementation Notes

### Data & State
- Vocabulary defined inline as sets in the `DATA` object (does not depend on `DATA.json` at runtime).
- `State` object centralizes all runtime state: active lists, modes, timer, current index, errors set, etc.
- Lists are grouped in sets (lista1, lista2, c1lista1…); multiple sets can be active simultaneously — their data is merged into `State.es` / `State.de`.

### Core UI flow
1. User selects one or more list buttons in the `#sets-bar` (horizontal scroll bar).
2. A Spanish word appears in `.word-display`; four German options are shown in `.options-grid`.
3. Correct answer advances to the next word; wrong answer increments the error counter and marks the index in `State.erroresSet`.
4. **Repetir mode**: button cycles through only the words that were answered incorrectly.

### Stats panel
Three cards show: words seen (`vistos`), errors (`errores`), and elapsed time (timer starts on first answer).

### Modes
- **Modo Auto** (`State.modoAuto`): TTS loop via `speakLoop()` — async/await with `SpeechSynthesisUtterance`. Loops while `State.modoAuto === true`.
- **Modo Dual** (`State.modoDual`): alternates TTS between German and Spanish on each utterance.
- **Wake Lock**: `requestWakeLock()` (Screen Wake Lock API) is called when Auto or Leer is active to prevent the screen from sleeping and cutting off TTS. Released with `releaseWakeLock()`; reactivated on `visibilitychange`.

### Key functions
- `nextUnseenIndex()` — picks a random unseen index; resets `State.vistos` when `length >= State.de.length - 3`.
- `shuffleUniqueIndexes(length, count, forcedIndex)` — generates the 4 option indexes for the quiz, always including the correct one.
- `toggleSet(key)` / `reloadActiveData()` — manage which lists are active and rebuild the combined word arrays.
- `renderLista(esArr, deArr)` — populates the word table below the quiz.
- `#filter-lista` input — real-time filter bound in `initUnifiedApp()`; hides/shows `<tr>` elements in `#lista tbody` by matching the query against row text.

### PWA
Installable app. Service Worker caches all assets. `manifest.json` sets `start_url: /B2.html`. Deployed on Vercel with GitHub auto-deploy on push.

### Responsive
`@media (max-width: 600px)` — options collapse to 1 column, repetir panel stacks vertically, footer buttons wrap.

### Dark mode
Toggled by `#darkModeBtn`; persisted in `localStorage` as `darkMode_b2`.

---

## lectura veloz.html — Implementation Notes

### Core concept
RSVP (Rapid Serial Visual Presentation): splits a text into words (or pairs) and flashes them one at a time in a large centered display at a configurable WPM.

### WPM control
`+`/`−` buttons adjust WPM in steps of 10. Interval between words = `60000 / wpm` ms.

### Word display
- ORP (Optimal Recognition Point) — the focal letter is highlighted in red inside `#display`.
- `twowords` mode: shows 2 words simultaneously (toggled by a button).
- Progress bar and `Palabra N de Total` counter update on each word.
- Start position input lets the user jump to a specific word index before playing.

### Text input
- Paste text directly into the `<textarea>`.
- File upload: supports `.txt`, `.pdf` (via pdf.js), `.doc`/`.docx` (via mammoth.js).
- Parsed text is loaded into the word array without saving unless the user explicitly saves.

### Saved texts (`localStorage`)
- Key `textosguardados` stores an array of `{ id, name, text }` objects.
- Each saved item shows a name, preview, and Load / Delete buttons.
- Last reading position is stored per item as `lv_pos_<id>` in localStorage so reading resumes where left off.

### Blog view
A secondary reading mode: the saved text is displayed as a full paragraph with 150-character chunks. Chunks are highlighted as TTS reads through them. Double-clicking a chunk sets the start position. A language selector (`#blog-lang`) lets the user pick the TTS language for that text. A thin progress bar (`#blog-progress-bar`) below the controls shows `currentChunk / totalChunks` as a percentage; updated in `highlightChunk(i)` and reset to 0 in `salirBlogView()`.

### Navbar
All pages share a fixed navbar. **Inicio** (`B2.html`) is always visible as a standalone link. The remaining pages (Lectura Veloz, Diccionario, B1, Chat de Voz) are grouped under a **Menú ▾** dropdown button. Dropdown toggled via `classList.toggle('open')` on click; closes on outside click via a `document` listener in each HTML file. Styles in `styles.css` under the shared navbar section.

### Dark mode
Toggled by a fixed button; persisted in `localStorage` as `darkMode`.

### External libraries (CDN)
- `pdf.js 3.11.174` — PDF parsing.
- `mammoth 1.6.0` — `.docx` parsing.

---

## Access control

Time-limited access per user, admin-controlled (migration `supabase/migrations/009_access_control.sql`). Single rule, re-implemented identically in three places:

```
is_access_valid := profiles.status <> 'blocked'
  AND (profiles.access_expires_at IS NULL OR profiles.access_expires_at > now())
```

- **New signups**: `handle_new_user()` sets `status = 'pending'` and `access_expires_at = now() + 15 days` — a 15-day trial with no admin action needed.
- **Admin control** (`admin/index.html` user detail panel → `api/admin.js` `set-status`): "Autorizar sin límite" (`status='approved'`, `access_expires_at=NULL`), "+15/+30 días" or a custom date (`status='approved'`, `access_expires_at=<date>`), "Denegar" (`status='blocked'`, does not touch the expiry). The same action restores access after either an expiry or a block.
- **Enforcement, defense in depth**:
  1. Postgres function `public.is_access_valid(user_id)` — used by the RLS `WITH CHECK`/`USING` on INSERT/UPDATE (not SELECT/DELETE) of `word_lists`, `srs_progress`, `grammar_rule_progress`, `user_reading_seen`, `user_data`.
  2. `api/_lib.js` `checkAccess(userId)` — called right after `verifyJWT()` in every endpoint that costs money (`chat.js`, `whisper.js`, `vision.js`, `tts.js`, `image.js`, `deepseek-chat.js`, `finanzas.js`); returns `403` if invalid. Fails open (allows the request) if `SUPABASE_SERVICE_ROLE_KEY` is unset or the Supabase REST call errors — same convention as `whisper.js`'s daily-usage check.
  3. `auth.js` `_isAccessValid()` — the universal gate: on every auth state change, `updateAuthUI()` shows a non-dismissable modal (`#access-blocked-modal`) blocking the whole page if the current user's profile fails the check. This is the only layer that covers apps with no serverless calls (B1–C2, `gramatica.html`, `plan.html`, …). Admins are always exempt, even from a stale row.
- **Gotcha**: `profiles` was created directly in Supabase, not tracked in this repo's migrations (same as its `status` column, added by `migrations/add_user_status.sql`). Before adding new RLS policies on tables owned by a user, check `pg_policies` for pre-existing untracked policies — migration 009 found and removed one on `user_data` (`"own data" FOR ALL`, permissive with no access check) that would have silently bypassed the new gate.

## Voice-STT daily usage cap

All apps that send audio to `/api/whisper` (`mundliche.html`, `chat-voz.html`, `chatvoz2/index.html`, `chat-reformulaciones.html`) share a single 60-minute-per-day cap per user, not one cap per app. Mechanism:
- `auth.js` defines `window.VOICE_STT_APPS = ['mundliche', 'chat-voz', 'chatvoz2', 'chat-reformulaciones']`.
- Each app logs `duration_ms` (client-reported recording length) via `window.logEvent(appId, 'audio_sent', { duration_ms })` into `usage_events`, keeping its own `app` value for per-app analytics (`admin/index.html`).
- Each app's `loadDailyUsage()` sums today's `duration_ms` across `.in('app', window.VOICE_STT_APPS)` (not just its own `app`) to compute the shared total and gate new recordings client-side.
- `api/whisper.js` also enforces the same 60-min cap server-side (queries `usage_events` with `SUPABASE_SERVICE_ROLE_KEY` before calling OpenAI) so the client-side gate can't be bypassed by calling the endpoint directly. Known limitation: `duration_ms` is still self-reported by the client (browser recording timer), not derived from the actual audio bytes sent — a modified client could under-report it.

---

## Push Notifications — Architecture

### Flow
```
Usuario activa toggle en panel "Mi progreso"
  → Notification.requestPermission()
  → pushManager.subscribe({ applicationServerKey: VAPID_PUBLIC_KEY })
  → POST /api/push-subscribe  { subscription, interval_hours, window_start, window_end, utc_offset_minutes }
  → guardado en Supabase tabla push_subscriptions

cron-job.org (cada hora)
  → POST /api/push-notify  Authorization: Bearer <CRON_SECRET>
  → lee todos los registros de push_subscriptions
  → por cada usuario: convierte UTC → hora local (utc_offset_minutes)
  → verifica ventana horaria y tiempo desde last_notified_at
  → webpush.sendNotification() → SW recibe evento "push" → showNotification()
  → actualiza last_notified_at; elimina suscripciones expiradas (410/404)
```

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
| `plan_progress` | jsonb | `plan.html`'s 30-day progress, `{ [level]: bool[30] }` — one entry per CEFR level so studying several levels concurrently doesn't collide. Added in migration 013. |
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
| `questions` | jsonb | Formato 1 (default, todos los niveles salvo B1/B2): array de `{ pregunta, opciones[4], correcta }`. Formato 2 (B1 y B2, ver `lecturaplan.md` §11-12): `{ teile: [{ id, tipo: 'mcq'\|'richtig_falsch'\|'emparejar', instrucciones, textos?, items?, columnaIzquierda?, columnaDerecha?, solucion? }] }` |
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

### Supabase table: `grammar_practice_exercises`
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | PK, auto-generado |
| `rule_id` | text | Id de la regla en `GRAMMAR_DATA` (ya único entre niveles, ej. `b1-01`) |
| `level` | text | CEFR level: A1–C2 |
| `oraciones` | jsonb | Array `[{de, es}, ...]` — 5 oraciones de práctica generadas por IA |
| `created_at` | timestamptz | Auto |

RLS: SELECT público. INSERT solo vía service role — lo inserta `/api/chat` (action `generate-practice`). Usado por el botón "🎯 Practicar" de `gramatica.html`.

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

### Vercel env vars requeridas
| Variable | Descripción |
|----------|-------------|
| `VAPID_PUBLIC_KEY` | Igual que `window.VAPID_PUBLIC_KEY` en `config.js` |
| `VAPID_PRIVATE_KEY` | Clave privada (nunca en cliente) |
| `VAPID_SUBJECT` | `mailto:ed.urbaez@gmail.com` |
| `CRON_SECRET` | Token que cron-job.org envía como `Authorization: Bearer` |
| `SUPABASE_SERVICE_ROLE_KEY` | Permite leer/escribir `push_subscriptions` sin RLS |

### Cron
Plan Hobby de Vercel no soporta crons horarios. Usar **cron-job.org** (gratuito): `POST https://ejercicios-aleman.vercel.app/api/push-notify` cada hora con header `Authorization: Bearer <CRON_SECRET>`.

---

## Environment Variables — Complete Reference

| Variable | Used by | Required | Notes |
|----------|---------|----------|-------|
| `OPENAI_API_KEY` | `chat.js`, `whisper.js`, `vision.js`, `tts.js`, `vocab-refresh.js` | Yes | OpenAI secret key |
| `DEEPSEEK_API_KEY` | `deepseek-chat.js` | Yes | DeepSeek secret key |
| `SUPABASE_JWT_SECRET` | `_lib.js` (HS256) | Conditional | Required only for HS256 tokens; ES256 tokens (default Supabase) use JWKS and don't need this |
| `SUPABASE_URL` | `admin.js` | Yes | `https://<project>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `admin.js`, `push-subscribe.js`, `push-notify.js`, `vocab-refresh.js`, `whisper.js` | Yes | Bypasses RLS — never expose to client. In `whisper.js` it's used to enforce the shared 60-min/day voice-STT cap server-side; if unset, that server-side check silently no-ops (client-side gate still applies) |
| `ALLOWED_ORIGIN` | `chat.js` | No | If set, rejects requests from other origins with 403 |
| `KV_REST_API_URL` | `_lib.js` | No | Enables Vercel KV for persistent rate limiting across cold starts; falls back to in-memory Map if absent |
| `KV_REST_API_TOKEN` | `_lib.js` | No | Required when `KV_REST_API_URL` is set |
| `VAPID_PUBLIC_KEY` | `push-notify.js` | Yes | Must match `window.VAPID_PUBLIC_KEY` in `config.js` |
| `VAPID_PRIVATE_KEY` | `push-notify.js` | Yes | Never sent to client |
| `VAPID_SUBJECT` | `push-notify.js` | Yes | `mailto:ed.urbaez@gmail.com` |
| `CRON_SECRET` | `push-notify.js`, `vocab-refresh.js` | Yes | Bearer token that cron-job.org sends |

For local dev, define these in `.env.local` (not committed). `vercel dev` loads them automatically.

---

## Local Development

```bash
# Requires Vercel CLI: npm i -g vercel
vercel dev
```

`vercel dev` runs all `api/*.js` serverless functions locally and serves static files. HTML apps that only use browser APIs (no serverless calls) can be opened directly in the browser without `vercel dev`.

Auth note: Supabase JWT verification hits the real Supabase JWKS endpoint even in local dev — internet connection required.

### Manual browser validation (logged-in flows, e.g. reading a Supabase table, calling `/api/chat`)

Several apps require a real logged-in session (`window.currentUser`) before their core flow runs (Modo B of `lectura veloz.html`, `escritura.html`, etc.), and login only supports email OTP or Google OAuth — no password auth, so it can't be scripted end-to-end without the user's help. Recipe used and verified working (session 2026-07-31, see `lecturaplan.md` §11):

1. **Get a session token from the user.** Ask them to log in at the real app in their own browser, open DevTools console, and run `localStorage.getItem('sb-mzitpnacjcjpokmiqwtd-auth-token')` (project ref from `config.js` `SUPA_URL`), then paste the JSON value. Save it to a file **outside the repo** (scratchpad dir) — never commit it, delete it once the test is done. It's a live session; tell the user they can log out afterward to invalidate it.
2. **Start `vercel dev`** in the background (`nohup vercel dev --yes --listen <port> > log.txt 2>&1 &`), poll `curl localhost:<port>/` until it's up (don't blind-sleep).
3. **Known `vercel dev` bug: any filename containing a space 404s** (confirmed generically, not just `lectura veloz.html` — reproduced with a throwaway test file too). Work around it by making a temporary same-content copy with no spaces in the project root (e.g. `cp "lectura veloz.html" lectura-veloz-devtest.html`), test against the copy, **delete it before finishing** (`git status` should come back clean). Whether this also affects real production is unconfirmed — the documented prod domain issue below blocked checking it.
4. **Drive a real headless browser with Playwright**, not `chromium-cli` (not installed on this Windows machine): in a scratchpad dir, `npm init -y && npm install playwright@<pinned-version>` then `npx playwright install chromium` (downloads ~300MB, needed once — check `ls ~/AppData/Local/ms-playwright` first, a stale rev mismatch throws `Executable doesn't exist`). Inject the session via `context.addInitScript(([k,v]) => localStorage.setItem(k,v), [authKey, sessionJson])` before `page.goto()` — this runs before any page script, so `auth.js`/`window.sb` picks it up as an already-logged-in session on load. Confirm with `page.waitForFunction(() => !!window.currentUser, undefined, {timeout: ...})` (note the explicit `undefined` arg — omitting it makes Playwright treat your options object as the function's argument instead).
5. Drive the actual flow (`click`/`fill`/`selectOption`), screenshot at each step (`page.screenshot({path, fullPage:true})`), and check `page.on('console', ...)`/`page.on('pageerror', ...)` for JS errors during the run.
6. **Cleanup after the test**: kill the `vercel dev` process (find the PID listening on the port and kill it — `npm`/`vercel dev` don't forward signals cleanly), delete the temp no-space file copy, delete the saved token file.

This same recipe found a real bug on its first use (see `lecturaplan.md` §11) — worth reusing rather than skipping "can't test the UI" for logged-in flows.

---

## Gotchas

- **Rate limiter resets on cold start** — `createRateLimiter()` in `_lib.js` defaults to an in-memory Map. A new Vercel function instance starts with a clean counter. This is intentional (no external dependency), but means limits are per-instance. Add `KV_REST_API_URL` + `KV_REST_API_TOKEN` to get persistent rate limiting via Vercel KV.

- **`res.text()` → `JSON.parse()` instead of `res.json()`** — used in all frontend API calls (e.g. `diccionario.js`, `chat-voz.html`). If the server returns an empty body or an HTML error page, `res.json()` throws a silent parse error with no useful message. The manual pattern preserves the raw response for debugging.

- **`DATA.json` is for the Service Worker, not the app** — `B2.html` embeds its vocabulary inline in a `DATA` object. `DATA.json` exists only so the SW cache manifest has a file to reference. Do not rely on `DATA.json` for runtime logic.

- **JWT verification supports ES256 and HS256** — `_lib.js` tries ES256 first (JWKS from Supabase, no secret needed). Falls back to HS256 only if the token header specifies it, requiring `SUPABASE_JWT_SECRET`. Default Supabase tokens are ES256; HS256 is legacy.

- **Hobby plan caps deployments at 12 serverless functions** — `_lib.js` doesn't count (files starting with `_` are ignored by Vercel). When adding a new endpoint, merge existing ones first (pattern: dispatch by `action` in the body, as in `admin.js` and `finanzas.js`).
