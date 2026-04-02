# Alemán B2 — Herramientas de Aprendizaje

Three browser-based tools for learning German vocabulary and improving reading speed, plus a serverless dictionary API. No installation needed — open the HTML files directly.

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

### Diccionario ([diccionario.html](diccionario.html))

German dictionary powered by GPT-4o-mini with two-layer caching.

**Features:**
- Search any German word for its definition, gender, plural, examples, and level badge
- Results cached locally in IndexedDB; shared cache stored in Supabase
- Autocomplete from previously looked-up words
- Dark mode toggle

---

## API

### `/api/chat` ([api/chat.js](api/chat.js))

Vercel serverless function that proxies POST requests to OpenAI (`gpt-4o-mini`). Used by `diccionario.html`. Requires `OPENAI_API_KEY` set as a Vercel environment variable.

---

## Navigation

All pages share a navbar: **Inicio** (palabrasB2) ↔ **Lectura Veloz** ↔ **Diccionario**.

---

## Deployment

`palabrasB2.html` is the root page, deployed on Vercel. `vercel.json` rewrites `/` → `/palabrasB2.html`. The Service Worker (`sw.js`) caches all assets for offline use.

Push to `main` → Vercel redeploys automatically.

**Environment variables required in Vercel:**
- `OPENAI_API_KEY` — used by `api/chat.js`
