# Alemán B2 — Herramientas de Aprendizaje

Five browser-based tools for learning German vocabulary, improving reading speed, and practicing conversation, plus a serverless API. No installation needed — open the HTML files directly.

> **Maintenance rule:** Whenever a new active file is added or an existing one is removed, update this file and `CLAUDE.md` before finishing the task.

---

## Apps

### Palabras B2 ([palabrasB2.html](palabrasB2.html))

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

### Lectura Veloz ([lectura veloz.html](lectura%20veloz.html))

Speed-reading tool (RSVP — Rapid Serial Visual Presentation).

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

### Corrector ([corrector.html](corrector.html))

Grammar correction app that analyses a photo of a German text using GPT-4o Vision. Logic in [`corrector.js`](corrector.js).

**Features:**
- Upload an image (file picker, camera, or drag-and-drop) — JPG, PNG, WebP up to 5 MB
- Select the text type: **Tarea**, **Carta**, or **Frases sueltas** — each uses a specialised review prompt
- Preview the image before sending
- Displays a structured result: score out of 10, summary, per-error cards (original → correction + explanation + colour-coded category badge), and general observations
- **Copy corrections** button copies the full result to the clipboard
- Requires login (Supabase JWT); rate limited to 5 req/min via `/api/vision`
- Dark mode toggle

---

## API

### `/api/chat` ([api/chat.js](api/chat.js))

Vercel serverless function that proxies POST requests to OpenAI (`gpt-4o-mini`). Used by `diccionario.html` and `chat-voz.html`. Requires `OPENAI_API_KEY` set as a Vercel environment variable.

### `/api/whisper` ([api/whisper.js](api/whisper.js))

Vercel serverless function that receives multipart audio and forwards it to OpenAI Whisper (`whisper-1`) for transcription. Used by `chat-voz.html`. Rate limited to 10 req/min per user.

### `/api/vision` ([api/vision.js](api/vision.js))

Vercel serverless function that receives `{ image_base64, mime_type, type }`, forwards the image to GPT-4o with a type-specific review prompt, and returns structured JSON: `{ puntuacion, resumen, errores[], observaciones_generales }`. Used by `corrector.html`. Rate limited to 5 req/min per user. Supports types: `tarea`, `carta`, `frases`.

**Security measures (`/api/chat`):**
- Rate limiting: 20 req/min per IP (in-memory sliding window) → `429` if exceeded
- Origin check: if `ALLOWED_ORIGIN` env var is set, blocks other origins → `403`
- System prompt capped at 2 000 characters to prevent inflated requests

---

## Navigation

All pages share a fixed navbar. **Inicio** is always visible as a standalone link. The remaining pages — Lectura Veloz, Diccionario, B1, Chat de Voz, Corrector — are grouped under a **Menú ▾** dropdown button. The current page's link is marked `.active` inside the dropdown.

---

## Deployment

`palabrasB2.html` is the root page, deployed on Vercel. `vercel.json` rewrites `/` → `/palabrasB2.html`. Each PWA has its own Service Worker: `sw.js` (B2) and `sw-b1.js` (B1), each scoped to its own cache namespace so they don't interfere with each other.

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
Game engine shared between `palabrasB2.html` and `B1.html`. Contains state management, multiple-choice quiz logic, TTS loop, timer, personal lists (IndexedDB), wake lock, and PWA registration. Each page declares `window.APP_CONFIG` with page-specific values (`appId`, `dataFile`, `limitKey`, `darkKey`, `swFile`, `syncId`, `accent`) before loading this script. Exposes `window.toggleDarkMode`, `window.toggleModoInverso`, `window.copiarErrores`, `window.guardarNuevaLista`.

### `styles.css`
Shared stylesheet for all pages. Starts with a `:root` block that centralises the brand colours as CSS variables: `--color-b2` (#1976D2), `--color-b2-dark` (#1565C0), `--color-b1` (#388E3C), `--color-b1-dark` (#2E7D32), `--color-danger` (#D32F2F), `--color-danger-dark` (#B71C1C), `--radius` (8px), `--gap` (12px). Changing a colour in one place propagates across all components automatically.
