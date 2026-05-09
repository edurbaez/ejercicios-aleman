# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Maintenance rule

**Whenever a new file is added to the project and actively used by an app or the deploy pipeline, update the Active Files table below AND the Apps / Deployment sections in `README.md` before finishing the task.** Likewise, remove entries for files that are deleted or deprecated.

## Project Overview

Five standalone HTML apps for language learning (Spanish ↔ German) plus a serverless API. No build system — open any `.html` file directly in a browser. All visible pages share a common navbar with a dropdown menu: **Inicio** is always visible as an independent link; the rest of the pages are grouped under a **Menú ▾** button.

## Active Files

### Apps

| File | Purpose |
|------|---------|
| `palabrasB2.html` | Vocabulary quiz app targeting B2-level German words. Deployed as PWA on Vercel. Logic delegated to `shared-game.js` via `window.APP_CONFIG`. |
| `lectura veloz.html` | Speed-reading (RSVP) app: flashes words one at a time at a configurable WPM. |
| `diccionario.html` | German dictionary: searches a word via the serverless API (GPT-4o-mini) and caches results in Supabase + IndexedDB. |
| `B1.html` | Vocabulary quiz app targeting B1-level German words. Same engine as B2 via `shared-game.js`. PWA with offline support. |
| `chat-voz.html` | Voice conversation app: hold-to-record sends audio to Whisper (STT), AI replies via GPT-4o-mini, response read aloud via browser TTS. Selectable CEFR level (A1–C2) and masculine/feminine voice. |
| `admin/index.html` | Admin-only dashboard at `/admin/`. Verifies admin role on load (redirects to `/` if not admin). Shows: summary stats (total users, active last 7 days, total events), activity by app (bar chart), users table with search, per-user event detail, and invite form (calls `/api/admin-invite`). No navbar from main apps. |

### API

| File | Purpose |
|------|---------|
| `api/chat.js` | Vercel serverless function — proxies requests to OpenAI (`gpt-4o-mini`). Requires `Authorization: Bearer <supabase_jwt>` (verified with `SUPABASE_JWT_SECRET`). Rate limited to 20 req/min per user. Optional origin check via `ALLOWED_ORIGIN` env var and system prompt size cap (2 000 chars). Pre-warms the JWKS cache at module load to reduce cold-start latency. |
| `api/whisper.js` | Vercel serverless function — receives multipart audio, forwards to OpenAI Whisper (`whisper-1`) for transcription. Requires JWT auth. Rate limited to 10 req/min per user. Pre-warms JWKS cache at module load; JWT verification and request body reading run in parallel (`Promise.all`) to reduce latency. |
| `api/admin-invite.js` | Vercel serverless function — invites a user by email via Supabase auth admin API. Requires JWT from an admin user. Reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Vercel env vars. |

### Data

| File | Purpose |
|------|---------|
| `DATA.json` | Vocabulary data referenced by the Service Worker cache. |
| `DataB1.json` | Vocabulary data for B1 app: verbos1, verbos2, adjetivos, adverbios, particulas_modales. |

### PWA & Deploy

| File | Purpose |
|------|---------|
| `manifest.json` | PWA manifest for `palabrasB2.html`. |
| `sw.js` | Service Worker — caches `palabrasB2.html`, `DATA.json`, `manifest.json`, `icon.svg` for offline use. |
| `icon.svg` | PWA icon: blue rounded square with "B2" in white. |
| `manifest-b1.json` | PWA manifest for `B1.html`. Green theme (#388E3C). |
| `sw-b1.js` | Service Worker for B1 app — caches `B1.html`, `DataB1.json`, `manifest-b1.json`, `icon-b1.svg`. |
| `icon-b1.svg` | PWA icon for B1: green rounded square with "B1" in white. |
| `vercel.json` | Vercel rewrite: maps `/` → `/palabrasB2.html`. |
| `index.html` | Redirect stub: forwards `/` to `palabrasB2.html`. |
| `package.json` | Minimal Node.js package declaration — forces Vercel to treat the project as Node (required for `api/chat.js`). |
| `.env.local` | Local env vars (not committed). Must define `OPENAI_API_KEY` for local dev. |

### App Scripts

| File | Purpose |
|------|---------|
| `config.js` | Single source of truth para credenciales Supabase (`window.SUPA_URL`, `window.SUPA_KEY`). Cargado antes de `auth.js` en todas las páginas. |
| `auth.js` | Shared authentication module loaded by all pages. Reads `SUPA_URL`/`SUPA_KEY` globals from `config.js`. Creates `window.sb` (Supabase client), injects the login modal (OTP + Google OAuth), and exposes `window.openAuthModal`, `window.logout`, `window.updateAuthUI`, `window.logEvent`, `window.openStatsPanel`, `window.closeStatsPanel`, `window.getAuthToken`. Pages can define `window.onAuthSignedIn` to hook into the sign-in event. `getAuthToken()` returns the cached Supabase JWT access token (used to authorize `/api/chat` and `/api/whisper`). Token is stored in a private `_cachedToken` variable populated at page load and kept up to date via `onAuthStateChange` (which fires on every automatic refresh). Never calls `getSession()` at request time — avoids SDK lock contention that previously caused indefinite hangs. `openStatsPanel()` renders a right-side drawer with: (1) two "HOY" cards — words answered + accuracy %, and audios sent; (2) a 30-day bar chart of words per day (hover tooltip shows date + words + audios); (3) a streak counter; (4) all-time totals. Queries `usage_events` with `created_at` included, groups by local date client-side. |
| `shared-game.js` | Motor de juego compartido entre `palabrasB2.html` y `B1.html`. Contiene todo el estado (`State`), lógica de selección, TTS, temporizador, listas personales (IndexedDB) y PWA. Cada página define `window.APP_CONFIG` con sus valores específicos (`appId`, `dataFile`, `limitKey`, `darkKey`, `swFile`, `syncId`, `accent`) antes de cargar este script. |
| `diccionario.js` | All JS logic for `diccionario.html`: uses `window.sb` from `auth.js` (no Supabase client propio), IndexedDB cache, autocomplete suggestions, API fetch (robust `text()` → `JSON.parse` pattern), and result rendering. |

### Shared styles

| File | Purpose |
|------|---------|
| `styles.css` | Shared stylesheet for all apps. Starts with a `:root` block defining global CSS variables: `--color-b2` (#1976D2), `--color-b2-dark`, `--color-b1` (#388E3C), `--color-b1-dark`, `--color-danger`, `--color-danger-dark`, `--radius`, `--gap`. Sections: shared navbar (incl. dropdown), B2, B1, Lectura Veloz, Chat de Voz, Diccionario. |

---

## B1.html — Implementation Notes

### Overview
Vocabulary quiz app for B1-level German. Mirrors the architecture of `palabrasB2.html` but loads data from external `DataB1.json`.

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
3. **Payload cap** — `system` prompt limited to 2 000 characters.

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
- `#filter-lista` input — real-time filter bound in `initUnifiedApp()`; hides/shows `<tr>` elements in `#lista tbody` by matching the query against row text.

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
A secondary reading mode: the saved text is displayed as a full paragraph with 150-character chunks. Chunks are highlighted as TTS reads through them. Double-clicking a chunk sets the start position. A language selector (`#blog-lang`) lets the user pick the TTS language for that text. A thin progress bar (`#blog-progress-bar`) below the controls shows `currentChunk / totalChunks` as a percentage; updated in `highlightChunk(i)` and reset to 0 in `salirBlogView()`.

### Navbar
All pages share a fixed navbar. **Inicio** (`palabrasB2.html`) is always visible as a standalone link. The remaining pages (Lectura Veloz, Diccionario, B1, Chat de Voz) are grouped under a **Menú ▾** dropdown button. Dropdown toggled via `classList.toggle('open')` on click; closes on outside click via a `document` listener in each HTML file. Styles in `styles.css` under the shared navbar section.

### Dark mode
Toggled by a fixed button; persisted in `localStorage` as `darkMode`.

### External libraries (CDN)
- `pdf.js 3.11.174` — PDF parsing.
- `mammoth 1.6.0` — `.docx` parsing.
