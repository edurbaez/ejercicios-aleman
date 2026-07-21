# Alemán B2 — Herramientas de Aprendizaje

Five browser-based tools for learning German vocabulary, improving reading speed, and practicing conversation, plus a serverless API. No installation needed — open the HTML files directly.

> **Maintenance rule:** Whenever a new active file is added or an existing one is removed, update this file and `CLAUDE.md` before finishing the task.

---

## Apps

### Palabras B2 ([B2.html](B2.html))

Multiple-choice vocabulary quiz targeting B2-level German words.

**Features:**
- Select one or more word lists from the scrollable bar at the top
- A Spanish word is shown; pick the correct German translation from 4 options
- **Modo inverso** — flip the quiz: show German, choose Spanish
- Keyboard shortcuts: `1`–`4` to pick an option
- Stats panel tracks words seen, errors, and time elapsed
- **Repetir mode** — review only the words you got wrong
- **Auto mode** — TTS reads words aloud continuously (Web Speech API)
- **Dual mode** — TTS alternates between German and Spanish
- Export session errors to clipboard
- Dark mode toggle, persisted across sessions
- Installable as a PWA (works offline)
- Deployed on Vercel at the repo root

---

### Entrenamiento de lectura ([lectura veloz.html](lectura%20veloz.html))

Speed-reading tool (RSVP — Rapid Serial Visual Presentation). Three mutually exclusive activities selected via tabs — ⚡ Sprint (default on load), 📚 Lectura veloz and 📖 Comprensión — only one visible at a time.

**Features:**
- Paste text or upload a file (`.txt`, `.pdf`, `.doc`, `.docx`)
- Words flash one at a time at a configurable WPM (persisted across sessions)
- ORP highlighting — focal letter shown in red for faster recognition
- Option to show 2 words at a time
- Jump to any word position; rewind 5 words with `«5` / `ArrowLeft`
- Natural pause on punctuation (`.`, `!`, `?`, `,`)
- Progress bar and word counter
- **Save texts** — stored in IndexedDB, resumes from last position
- **Blog view** — read the full text as a paragraph with TTS narration; chunks highlight as they're read
- **Sprint de vocabulario** — RSVP flash of known words with adaptive WPM: source selector (SRS-mastered words by default, system level lists A1–C2, or personal lists), surprise MCQ every 10 words, pace goes up on correct answers and down on mistakes. A "Preguntas sorpresa" toggle (persisted as `lv_sprint_quiz`) lets the student flash words with no quiz interruptions
- Dark mode toggle

---

### Palabras B1 ([B1.html](B1.html))

Multiple-choice vocabulary quiz targeting B1-level German words. Same mechanics as Palabras B2 but with B1 content loaded from `DataB1.json`.

**Features:**
- Word sets: verbos1, verbos2, adjetivos, adverbios, partículas modales
- Select one or more lists; quiz and word table update dynamically
- **Modo inverso** — show German, choose Spanish
- Keyboard shortcuts: `1`–`4`
- Auto/Dual TTS modes for listening practice
- Cloud sync of active sets and dark mode via Supabase auth (OTP)
- Installable as a PWA (works offline via `sw-b1.js`)

---

### Diccionario ([diccionario.html](diccionario.html))

German dictionary powered by GPT-4o-mini with two-layer caching. Logic in [`diccionario.js`](diccionario.js).

**Features:**
- Search any German word → returns translation (ES), CEFR level badge, definition (DE), synonyms, and antonym
- Results cached locally in IndexedDB; shared cache stored in Supabase
- Autocomplete suggestions from previously looked-up words
- Dark mode toggle

---

### Chat de Voz ([chat-voz.html](chat-voz.html))

AI voice conversation app for practicing German at any CEFR level.

**Features:**
- Hold-to-record sends audio to Whisper (STT via `/api/whisper`)
- AI replies via GPT-4o-mini (`/api/chat`) adapted to selected CEFR level (A1–C2)
- Response read aloud via browser TTS (Web Speech API)
- Selectable masculine/feminine voice
- Customizable AI role and user context via modal
- Dark mode toggle

---

### Chat de Voz 2 ([chatvoz2/index.html](chatvoz2/index.html))

Second AI voice conversation app, same architecture/features as Chat de Voz above (hold-to-record, `/api/whisper` STT, GPT-4o-mini reply, browser TTS, repetir mode). Shares the same 60-minute/day voice-STT cap.

---

### Corrector ([corrector.html](corrector.html))

Grammar correction app that analyses a photo (GPT-4o Vision) or pasted text (GPT-4o-mini via `/api/chat`) of German writing. Logic in [`corrector.js`](corrector.js).

**Features:**
- Two input modes: **📷 Foto** and **✏️ Texto** (paste/type up to 4 000 chars — cheaper and OCR-free)
- Upload an image (file picker, camera, or drag-and-drop) — any image up to 15 MB; client-side compressed to JPEG max 1600px before sending
- Select the text type: **Tarea**, **Carta**, or **Frases sueltas** — each uses a specialised review prompt
- Preview the image before sending
- Displays a structured result: score out of 10, summary, per-error cards (original → correction + explanation + colour-coded category badge), full corrected text with its own copy button, and general observations
- **Copy corrections** button copies the full result to the clipboard
- Local history (IndexedDB `corrector-db`, last 20 reviews) — reopen past results without a new API call
- Requires login (Supabase JWT); rate limited to 5 req/min via `/api/vision`
- Dark mode toggle

---

### Escritura ([escritura.html](escritura.html))

Writing practice app with Goethe/telc-style tasks generated by AI. All JS inline.

**Features:**
- CEFR level selector (A1–C2, persisted as `esc_level`) and task-type selector per level (e.g. SMS/postal at A1, Forumsbeitrag/formal complaint at B2, Stellungnahme at C1, essay at C2)
- Generates a task via `/api/chat`: title, situation and guide points (Leitpunkte) — all in German with level-appropriate vocabulary — plus register and word range per level
- Next task is prefetched in background while the student writes ("Nueva tarea" loads instantly); current task and draft are persisted in `localStorage` and survive a page reload
- Two submission modes: **⌨️ Escribir aquí** (textarea with live word counter showing progress against the task's word range, e.g. "62 / 70–100 palabras"; inline warning if the text is too short) and **📷 Foto de tu texto a mano** — handwrite the task on paper, photograph it (upload/camera/drag-and-drop, client-side compression to JPEG ≤1600px) and send it to `/api/vision` with `type: 'escritura'`
- Evaluation (both modes) returns: score 0–100, Leitpunkte checklist, register check, per-error cards (original → correction + explanation + category), an improved version with corrected fragments highlighted, an overall comment — and, for photos, a transcription of the handwriting. Texts are always graded with the level of the task on screen (not the currently selected pill); a hint warns when both diverge
- **⏱️ Modo examen**: optional countdown timer per level (A1 15 min → C2 80 min, persisted as `esc_exam`) simulating real exam conditions
- **📚 Mis textos**: local history of the last 20 evaluations in IndexedDB `escritura-db` (task + text + evaluation); clicking an entry reloads everything for review
- Collapsible guide explaining what each CEFR level requires in writing exams
- Requires login (Supabase JWT); dark mode toggle; indigo theme (`#303F9F`)

---

### Reformulaciones ([chat-reformulaciones.html](chat-reformulaciones.html))

Sentence-transformation (Umformung) practice app tied to the grammar rules in `grammar-data.js`.

**Features:**
- Rule selector with CEFR level filter; without selection 5 random rules are used
- Exercises come from a pregenerated bank ([reformulaciones-data.json](reformulaciones-data.json), ~20 per rule, created offline with `scripts/generate-reformulaciones.js`) — no API cost to generate tasks
- Each task shows a source sentence (without the target structure) plus an instruction in Spanish stating the exact transformation to apply
- **Hybrid evaluation:** the answer is first matched locally against the stored valid solutions (normalized); only if it doesn't match, a single short `/api/chat` call evaluates whether the target structure was applied (✅/⚠️/❌ + explanation in Spanish)
- Answer by voice (MediaRecorder → `/api/whisper`) or text (Ctrl+Enter); tasks are read aloud with browser TTS
- Falls back to full AI generation (`/api/chat`) for rules missing from the bank
- Session results: global score, % correct, per-rule breakdown with links to `gramatica.html`
- **Repaso SRS de reglas** — SM-2 spaced repetition per grammar rule (IndexedDB `srs-db-reformulaciones`, synced to Supabase `grammar_rule_progress`), updated on every evaluated turn; "🔁 Repaso SRS" button starts a session from up to 5 due rules
- **Historial** — collapsible panel listing the last 20 local sessions (date, score, per-rule detail), stored only in IndexedDB (`reformulaciones-db`), no Supabase sync
- Purple theme (`#6A1B9A`); dark mode persisted as `darkMode_cr`

---

### Mündliche Prüfung ([mundliche.html](mundliche.html))

Oral exam trainer practicing individual parts (Teile) of the Goethe/telc speaking exam by CEFR level, entirely by voice.

**Features:**
- CEFR level selector (A1–C2, persisted as `mp_level`) and a Teil selector per level — parts matching real exam formats (e.g. A1: Sich vorstellen / Fragen und Antworten / Bitte formulieren; B1: Gemeinsam planen / Präsentation / Feedback geben + an extra Sich vorstellen warm-up; B2: Präsentation / Diskussion + an extra Bildbeschreibung labeled as non-exam; C1/C2: Vortrag / Diskussion / Stellung nehmen or Zusammenfassen)
- Each Teil is generated via `/api/chat` as title + situation + guide points in German, level-appropriate; the next task is prefetched in background. B1 Präsentation follows the canonical 5-"Folien" Goethe structure (Titel → Erfahrungen → Heimatland → Vor-/Nachteile + Meinung → Schluss). B2 Präsentation and C1/C2 Vortrag generate **two distinct topic options** and let the student pick one, as in the real exam
- Optional short "Vorbereitung" countdown before recording, then either a **monólogo** (one continuous timed recording, e.g. self-presentation or a Vortrag) or a **diálogo** (multi-turn voice exchange where the AI plays exam partner/negotiator/debate opponent, replying with a JSON `{antwort, turno_final}` until a turn cap or natural close). B1 Teil 3 "Feedback geben": the AI opens with a TTS mini-presentation and the student must ask a question + give feedback
- **Vortrag→Diskussion chaining**: if the Diskussion Teil (B2/C1/C2) is practiced right after that level's Vortrag/Präsentation in the same session, the Diskussion's topic and the AI's opening question are anchored to what the student just presented instead of a random topic
- **🎓 Simulacro completo**: auto-advances through every Teil of the selected level in one session (same per-Teil preparation as usual) and closes with an aggregated bestanden/nicht-bestanden verdict computed from the already-scored Teile (no transcripts resent); saved to the local history as a distinct entry showing all sub-results
- **📝 Modo examen** (checkbox, persisted as `mp_exam`): realistic preparation time (15 min for the B1 Präsentation) with a Notizen textarea that stays visible during recording
- Per-Teil **Redemittel** panel (collapsible, zero API cost, shared bank in `redemittel-data.js`) shown with the task; the evaluation also reports whether the student used typical exam formulas, with examples
- Voice via `MediaRecorder` → `/api/whisper` (German) and AI prompts read aloud — OpenAI voice (`/api/tts`) for B2/C1/C2 with a silent fallback to the browser voice, browser TTS for A1-B1 — reusing `chat-voz.html`'s recording/transcription patterns; daily 60-minute usage cap shared across all voice apps (`mundliche.html`, `chat-voz.html`, `chatvoz2/index.html`, `chat-reformulaciones.html`), enforced both client- and server-side
- The student's own recording is played back right after stopping (not blocking the transcription), with an optional zero-API phonological self-assessment checklist next to it
- Evaluation via a second `/api/chat` call (`temperature: 0.2`, a fixed one-shot example for consistency, anchored to an explicit rubric with score bands and criterion weights — cumplimiento 40% / gramática-vocabulario 30% / fluidez 20% / interacción-o-estructura 10%): score 0–100 with a 4-way subscore breakdown, a short justification of the score band, and an estimated bestanden/nicht-bestanden verdict, guide-points checklist, fluency assessment (proxy from the transcript: hesitations, incomplete sentences), grammar/vocabulary error cards, interaction quality (dialogue Teile), and a general comment — with a persistent disclaimer that transcript-based grading **cannot assess pronunciation or accent**. Actual recording duration is tracked client-side and compared to the task's target instead of being asked of the model. The transcript is fenced and marked as literal data (not instructions) to mitigate prompt injection, and the dialogue partner prompt is instructed to stay in character and answer only in German
- **Bildbeschreibung** (B2, labeled as an extra exercise — the real Goethe/telc B2 exam only has Vortrag + Diskussion) uses an AI-described scene in German instead of a real photo, avoiding `/api/image`'s marketing-only 3 req/min budget
- Local history of the last 20 attempts in IndexedDB `mundliche-db` (transcript + evaluation, no audio) with a progress summary (global average, per-Teil average, weakest Teil)
- Requires login (Supabase JWT); dark mode toggle; amber/brown theme (`#8D6E63`)

### Generador de contenido ([marketing/contenido.html](marketing/contenido.html))

Admin-only Instagram carousel generator (linked from `/marketing/`). Niche selector (`NICHES` config: 🇩🇪 Alemán, 🔥 Motivación, 🧠 Datos curiosos — extensible) with per-niche prompts for generation, ideas, chat and review; non-German niches use free topic only (no CEFR level/source). Includes an ideas & chat assistant (DeepSeek): suggest 6 carousel ideas as clickable cards, or chat to refine a concept and load it as the free topic. For the German niche, picks a content source (grammar rule from `grammar-data.js`, 5 random vocab words from `Data{LEVEL}.json`, or free topic). Generates slide copy + caption + hashtags via `/api/deepseek-chat` with baked-in retention techniques (curiosity-gap hook, mid-carousel pattern interrupt, "save this post" slide, final CTA), then runs an AI review loop (language correctness + marketing quality, one correction pass max) shown as a badge with scores. Renders 1080×1350 slides exported as PNG with html2canvas. Three background modes: **Plantilla** (CSS gradient, free, 6 color themes), **Imagen IA** (one `gpt-image-1-mini` background per carousel via `/api/image`), or **Subir imagen** (user uploads a background photo applied to all slides with a dark overlay for readability; per-slide AI image suggestions shown as guidance). "Descargar todas" exports slides sequentially with zero-padded names (`carrusel-slide-01.png`, `-02`, …) so they sort in posting order. Every generated carousel (estado `generado`) and every chosen idea (estado `idea`) is auto-saved to the `marketing_posts` Supabase table (admin-only RLS, migration [supabase/migrations/004_marketing_posts.sql](supabase/migrations/004_marketing_posts.sql)) — base of the marketing content pipeline. An in-page **📚 Historial** tab lists saved pieces with estado/kind/nivel filters and per-piece actions (reload into the generator, re-export PNGs, duplicate, delete, change estado — marking `publicado` auto-fills `publish_date`), and the generator warns before creating a piece whose tema closely matches one already generated. A format selector switches between **🎠 Carrusel** and **🎬 Reel**: Reel mode keeps the same niche/source/level but produces a 30-60 s video script (hook, scene table with visual / on-screen text / spoken text / seconds and cumulative time ranges, CTA, caption + hashtags) with a target-duration selector and an automatic compression pass if the script exceeds 60 s; the script view includes a fullscreen **teleprompter** (spoken text only, auto-scroll with adjustable speed and font size, tap to pause — made for recording with the phone) and a copy-full-script button, and reels are saved to `marketing_posts` as `kind: 'reel'` so they show up in the historial and editorial calendar and can be fully reloaded. A **💬 Testimonios** tab builds social-proof slides with zero API cost: a form (student quote, name/initial, CEFR level reached, optional concrete achievement) renders a live-updating slide exported as `testimonio-<name>[-story].png` via the same html2canvas stage, with three designs (big quote / before→after / numeric achievement), a 6-color theme selector and two formats (Feed 1080×1350, Story 1080×1920); downloading auto-saves the testimonio to `marketing_posts` as `kind: 'testimonio'` (re-downloads update the same row; a "Nuevo testimonio" button starts a fresh one), and from the Historial tab it can be reloaded into the form to regenerate it in another design/format or re-exported to PNG directly.

### Generador de emails ([marketing/emails.html](marketing/emails.html))

Admin-only email draft generator for the direct teacher-student channel. Three email types: **Bienvenida** (welcome a new student, with optional name and personal goal), **Resumen semanal** (weekly recap for students of a CEFR level: rule of the week picked from `grammar-data.js`, 5 random vocabulary words from `Data{LEVEL}.json` with a 🎲 re-roll, and a weekly mini-challenge), and **Promoción capacitación** (cold-but-personalized pitch per segment — academia, empresa DACH, prep certificación, migrante laboral, colegio bilingüe — with módulos, duración and reference pricing taken from the strategy page's capacitación table). Each type builds a brief sent to `/api/deepseek-chat`; the model returns two subject-line variants (selectable) plus a body signed by the teacher, viewable as plain text or as a branded HTML email (Gmail-compatible template with brand header, CTA button and signature footer, previewed in an iframe). Copy buttons for subject, body, full email or formatted HTML (paste straight into Gmail keeping the design). Every generated email is auto-saved to the `marketing_posts` pipeline as `kind: 'email'` (so it appears in the historial and editorial calendar), and previously used subject lines of the same type are fed back to the AI to avoid repeating them.

### Calendario editorial ([marketing/calendario.html](marketing/calendario.html))

Admin-only editorial calendar for the `marketing_posts` pipeline. Month view (Monday-first) with each scheduled piece as a chip colored by estado (idea / generado / publicado); a **"Esta semana"** panel lists this week's pieces plus overdue ones (past `publish_date` and not yet published, highlighted in red) with a one-click "✅ Publicado" button; a **"Sin programar"** panel assigns dates in two steps (📌 Programar → click a calendar day). Clicking a chip opens a detail box to mark as published, move to another date, or remove from the calendar. Talks to Supabase directly (admin RLS) — no serverless function.

### Resultados / KPIs ([marketing/resultados.html](marketing/resultados.html))

Admin-only KPI dashboard fed by four SQL views ([supabase/migrations/005_marketing_views.sql](supabase/migrations/005_marketing_views.sql), all `security_invoker` so admin RLS applies): summary cards (total users, active last 7/30 days, simple retention — users active in ≥2 distinct weeks of the last 8), weekly signups and weekly active-users bar charts with a 8/12/26/52-week range selector (missing weeks shown as zero), and per-app usage (events + distinct users) with a 30-days/all-time toggle. It also correlates marketing with growth: weeks with published `marketing_posts` pieces get a 📣 marker on the weekly charts, and a "Publicaciones → registros" table shows how many users signed up within 3 days after each published piece. Pure-CSS bar charts, no external library.

---

## API

### `/api/chat` ([api/chat.js](api/chat.js))

Vercel serverless function that proxies POST requests to OpenAI (`gpt-4o-mini`). Used by `diccionario.html` and `chat-voz.html`. Requires `OPENAI_API_KEY` set as a Vercel environment variable. Also handles `action: 'generate-reading'` (`{ action, level }`): generates a reading-comprehension text server-side and stores it in `reading_texts` with the service role key (used by `lectura veloz.html` Modo B).

### `/api/whisper` ([api/whisper.js](api/whisper.js))

Vercel serverless function that receives multipart audio and forwards it to OpenAI Whisper (`whisper-1`) for transcription. Used by `chat-voz.html`, `chatvoz2/index.html`, `chat-reformulaciones.html`, and `mundliche.html`. Rate limited to 10 req/min per user. Also enforces the shared 60-minute/day voice-STT cap server-side (queries `usage_events` with `SUPABASE_SERVICE_ROLE_KEY` before transcribing) — see "Voice-STT daily usage cap" in `CLAUDE.md`.

### `/api/vision` ([api/vision.js](api/vision.js))

Vercel serverless function that receives `{ image_base64, mime_type, type }`, forwards the image to GPT-4o with a type-specific review prompt, and returns structured JSON: `{ puntuacion, resumen, errores[], texto_corregido, observaciones_generales }`. Used by `corrector.html` and `escritura.html`. Rate limited to 5 req/min per user. Supports types: `tarea`, `carta`, `frases`, plus `escritura` (requires a `task` object with the writing task; grades a handwritten text against it and returns `texto_transcrito`, `puntuacion` 0–100, `puntos_cubiertos[]`, `registro_adecuado`, `errores[]`, `version_mejorada`, `comentario`).

### `/api/image` ([api/image.js](api/image.js))

Vercel serverless function that receives `{ prompt, size, quality }` and generates an image via OpenAI `gpt-image-1-mini` (always returns base64; DALL·E was retired from the API in May 2026). Used by `marketing/contenido.html` for AI slide backgrounds. Requires JWT auth. Rate limited to 3 req/min per user.

### `/api/vocab-refresh` ([api/vocab-refresh.js](api/vocab-refresh.js))

Cron endpoint (requires `Authorization: Bearer <CRON_SECRET>`) that keeps vocabulary content fresh: generates ~15 current German expressions (colloquial, media, tech, modern idioms) via GPT-4o-mini for one CEFR level per call and appends them to a system `word_lists` row named **nuevas** in Supabase (newest first, capped at 150 entries). Level via `level` in body/query, or daily rotation a1→c2. The quiz apps show the "nuevas" list automatically — no redeploy needed. Schedule it daily on cron-job.org, same pattern as `/api/push-notify`.

**Security measures (`/api/chat`):**
- Rate limiting: 20 req/min per IP (in-memory sliding window) → `429` if exceeded
- Origin check: if `ALLOWED_ORIGIN` env var is set, blocks other origins → `403`
- System prompt capped at 4 000 characters to prevent inflated requests

---

## Onboarding

First-time visitors on `index.html` get a guided tour ([onboarding.js](onboarding.js)): a welcome step asks for their CEFR level, then a spotlight overlay walks them through the vocabulary app of their level, the 30-day plan, the Menú dropdown, and account creation. Shown once (`onboarding_done_v1` in localStorage); relaunchable anytime with the fixed **?** button (bottom-left) or `window.startOnboarding()`.

---

## Navigation

All pages share a fixed navbar. **Inicio** is always visible as a standalone link. The remaining pages — Entrenamiento de lectura, Diccionario, B1, Chat de Voz, Corrector — are grouped under a **Menú ▾** dropdown button. The current page's link is marked `.active` inside the dropdown.

---

## Deployment

`B2.html` is the root page, deployed on Vercel. `vercel.json` rewrites `/` → `/B2.html`. Each PWA has its own Service Worker: `sw.js` (B2) and `sw-b1.js` (B1), each scoped to its own cache namespace so they don't interfere with each other.

Push to `main` → Vercel redeploys automatically.

**Environment variables required in Vercel:**
- `OPENAI_API_KEY` — used by `api/chat.js`
- `ALLOWED_ORIGIN` *(optional)* — if set, `api/chat.js` rejects requests from other origins (e.g. `https://tu-app.vercel.app`)

---

## Shared modules

### `auth.js`
Shared authentication module. Injects the login modal (OTP + Google OAuth) and exposes auth helpers (`openAuthModal`, `logout`, `logEvent`, `getAuthToken`). `getAuthToken()` returns a cached token updated automatically on every Supabase token refresh — it never calls `getSession()` at request time, so it can't hang. Also renders the **progress panel** — a right-side drawer users open by clicking their name in the navbar. It shows:
- **HOY** — two cards side by side: words answered + accuracy %, and audios sent today.
- **Últimos 30 días** — bar chart with one bar per day. Hover over any bar to see the date, word count, and audio count.
- **Racha** — streak of consecutive days with at least one word answered.
- **Todo el tiempo** — all-time totals (words, dictionary lookups, audios, sessions).

### `config.js`
Single source of truth for Supabase credentials. Exposes `window.SUPA_URL` and `window.SUPA_KEY`. Must be loaded before `auth.js` on every page that uses Supabase.

### `shared-game.js`
Game engine shared between `B2.html` and `B1.html`. Contains state management, multiple-choice quiz logic, TTS loop, timer, personal lists (IndexedDB), wake lock, and PWA registration. Each page declares `window.APP_CONFIG` with page-specific values (`appId`, `dataFile`, `limitKey`, `darkKey`, `swFile`, `syncId`, `accent`) before loading this script. Exposes `window.toggleDarkMode`, `window.toggleModoInverso`, `window.copiarErrores`, `window.guardarNuevaLista`.

### `styles.css`
Shared stylesheet for all pages. Starts with a `:root` block that centralises the brand colours as CSS variables: `--color-b2` (#1976D2), `--color-b2-dark` (#1565C0), `--color-b1` (#388E3C), `--color-b1-dark` (#2E7D32), `--color-danger` (#D32F2F), `--color-danger-dark` (#B71C1C), `--radius` (8px), `--gap` (12px). Changing a colour in one place propagates across all components automatically.
