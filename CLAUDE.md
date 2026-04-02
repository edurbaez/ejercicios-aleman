# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Maintenance rule

**Whenever a new file is added to the project and actively used by an app or the deploy pipeline, update the Active Files table below AND the Apps / Deployment sections in `README.md` before finishing the task.** Likewise, remove entries for files that are deleted or deprecated.

## Project Overview

Three standalone HTML apps for language learning (Spanish ↔ German) plus a serverless API. No build system — open any `.html` file directly in a browser. All visible pages share a common navbar.

## Active Files

### Apps

| File | Purpose |
|------|---------|
| `palabrasB2.html` | Vocabulary quiz app targeting B2-level German words. Deployed as PWA on Vercel. |
| `lectura veloz.html` | Speed-reading (RSVP) app: flashes words one at a time at a configurable WPM. |
| `diccionario.html` | German dictionary: searches a word via the serverless API (GPT-4o-mini) and caches results in Supabase + IndexedDB. |

### API

| File | Purpose |
|------|---------|
| `api/chat.js` | Vercel serverless function — proxies requests to OpenAI (`gpt-4o-mini`). Reads `OPENAI_API_KEY` from Vercel env vars. |

### Data

| File | Purpose |
|------|---------|
| `DATA.json` | Vocabulary data referenced by the Service Worker cache. |

### PWA & Deploy

| File | Purpose |
|------|---------|
| `manifest.json` | PWA manifest for `palabrasB2.html`. |
| `sw.js` | Service Worker — caches `palabrasB2.html`, `DATA.json`, `manifest.json`, `icon.svg` for offline use. |
| `icon.svg` | PWA icon: blue rounded square with "B2" in white. |
| `vercel.json` | Vercel rewrite: maps `/` → `/palabrasB2.html`. |
| `index.html` | Redirect stub: forwards `/` to `palabrasB2.html`. |
| `package.json` | Minimal Node.js package declaration — forces Vercel to treat the project as Node (required for `api/chat.js`). |
| `.env.local` | Local env vars (not committed). Must define `OPENAI_API_KEY` for local dev. |

### Shared styles

| File | Purpose |
|------|---------|
| `styles.css` | Shared stylesheet used by `palabrasB2.html`, `lectura veloz.html`, and `diccionario.html`. |

---

## diccionario.html — Implementation Notes

### Core concept
Looks up a German word and returns its definition, gender, plural, examples, and level badge. Results are cached to avoid redundant API calls.

### Data flow
1. User types a word → `buscar()` fires.
2. Check **IndexedDB** cache first (`cacheGet()`).
3. If miss, check **Supabase** table (`supaGet()`).
4. If still miss, call `POST /api/chat` → GPT-4o-mini returns structured JSON.
5. Result is stored in both Supabase (`supaSet()`) and IndexedDB (`cacheSet()`).

### External dependencies (CDN)
- `@supabase/supabase-js@2` — cloud persistence of dictionary results.

### Key functions
- `buscar()` — orchestrates the lookup chain (IndexedDB → Supabase → API).
- `supaGet(palabra)` / `supaSet(palabra, info)` — Supabase read/write.
- `cacheGet(palabra)` / `cacheSet(palabra, info)` — IndexedDB read/write.
- `abrirDB()` — opens/upgrades the local IndexedDB store.
- `mostrarResultado(palabra, info)` — renders the result card.
- `actualizarActivo(items)` / `seleccionarSugerencia(palabra)` — autocomplete from cached words.

### Known issue
`OPENAI_API_KEY` is not reaching `api/chat.js` on Vercel (see E1 in `mejorar.md`). Suspected cause: `vercel.json` rewrite may cause Vercel to treat the project as static-only.

---

## palabrasB2.html — Implementation Notes

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

### PWA
Installable app. Service Worker caches all assets. `manifest.json` sets `start_url: /palabrasB2.html`. Deployed on Vercel with GitHub auto-deploy on push.

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
A secondary reading mode: the saved text is displayed as a full paragraph with 150-character chunks. Chunks are highlighted as TTS reads through them. Double-clicking a chunk sets the start position. A language selector (`#blog-lang`) lets the user pick the TTS language for that text.

### Navbar
Both pages share a fixed navbar linking `palabrasB2.html` (Inicio) ↔ `lectura veloz.html` (Lectura Veloz).

### Dark mode
Toggled by a fixed button; persisted in `localStorage` as `darkMode`.

### External libraries (CDN)
- `pdf.js 3.11.174` — PDF parsing.
- `mammoth 1.6.0` — `.docx` parsing.
