# Alemán B2 — Herramientas de Aprendizaje

Two browser-based tools for learning German vocabulary and improving reading speed. No installation needed — open the HTML files directly.

---

## Apps

### Palabras B2 ([palabrasB2.html](palabrasB2.html))

Multiple-choice vocabulary quiz targeting B2-level German words.

**Features:**
- Select one or more word lists from the scrollable bar at the top
- A Spanish word is shown; pick the correct German translation from 4 options
- Stats panel tracks words seen, errors, and time elapsed
- **Repetir mode** — review only the words you got wrong
- **Auto mode** — TTS reads words aloud continuously (Web Speech API)
- **Dual mode** — TTS alternates between German and Spanish
- Dark mode toggle, persisted across sessions
- Installable as a PWA (works offline)
- Deployed on Vercel at the repo root

### Lectura Veloz ([lectura veloz.html](lectura%20veloz.html))

Speed-reading tool (RSVP — Rapid Serial Visual Presentation).

**Features:**
- Paste text or upload a file (`.txt`, `.pdf`, `.doc`, `.docx`)
- Words flash one at a time at a configurable WPM (default 400)
- ORP highlighting — focal letter shown in red for faster recognition
- Option to show 2 words at a time
- Jump to any word position before playing
- Progress bar and word counter
- **Save texts** — stored in `localStorage`, resumes from last position
- **Blog view** — read the full text as a paragraph with TTS narration; chunks highlight as they're read
- Dark mode toggle

---

## Navigation

Both pages share a navbar: **Inicio** (palabrasB2) ↔ **Lectura Veloz**.

---

## Deployment

`palabrasB2.html` is the root page, deployed on Vercel. `vercel.json` rewrites `/` → `/palabrasB2.html`. The Service Worker (`sw.js`) caches all assets for offline use.

Push to `main` → Vercel redeploys automatically.
