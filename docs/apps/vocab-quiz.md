# Vocabulary quiz apps (A1–C2)

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Apps

| File | Purpose |
|------|---------|
| `B2.html` | Vocabulary quiz app targeting B2-level German words. Deployed as PWA on Vercel. Logic delegated to `shared-game.js` via `window.APP_CONFIG`. |
| `A1.html` | Vocabulary quiz app targeting A1-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `A2.html` | Vocabulary quiz app targeting A2-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `B1.html` | Vocabulary quiz app targeting B1-level German words. Same engine as B2 via `shared-game.js`. PWA with offline support. |
| `C1.html` | Vocabulary quiz app targeting C1-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |
| `C2.html` | Vocabulary quiz app targeting C2-level German words. Same engine as B1/B2 via `shared-game.js`. PWA with offline support. |

## Shared engine

| File | Purpose |
|------|---------|
| `shared-game.js` | Motor de juego compartido entre `B2.html` y `B1.html`. Contiene todo el estado (`State`), lógica de selección, TTS (OpenAI `tts-1` vía `/api/tts` con fallback al TTS del navegador, caché en memoria), SRS SM-2 (IndexedDB `srs-db-{APP}`, botón "SRS Repaso"), Frases en contexto (modal que llama `/api/chat`), temporizador, listas personales (IndexedDB), PWA, y chequeo de duplicados: al guardar una lista personal, `checkDuplicatesAgainstSystem()` compara las palabras en alemán (case-insensitive) contra un índice construido con `loadSystemLists()` de los 6 niveles A1–C2 (`buildSystemWordIndex()`, cacheado en memoria por sesión), y si hay coincidencias muestra un panel inline (`mostrarRevisionDuplicados()`, sin `alert`/`confirm`) para excluirlas antes de guardar; falla en abierto (nunca bloquea el guardado) ante errores de red. **Modo Escritura** (producción activa, toggle "✍️ Escritura" junto a `btn-inverso` en la sección Juego, persistido como `escritura_mode_{appId}`): sustituye `.options-grid` por un `<input>` + botón "Comprobar" — el usuario escribe la traducción en vez de elegir entre 4 opciones; corrección exacta (`normalizeAnswer()`: trim + lowercase) o tolerando 1 error de tipeo (distancia de Levenshtein ≤ 1). Ambos modos (selección y escritura) convergen en `processAnswer(correct)`, la única función que actualiza aciertos/errores, el SRS SM-2 y el batch de `quiz_session_end` — así el modo escritura queda cubierto por la repetición espaciada sin duplicar esa lógica. Independiente del modo Auto/Dual (que pertenece a la sección Repetición, no a la de Juego), por lo que ambos pueden coexistir sin conflicto. Cada página define `window.APP_CONFIG` con sus valores específicos (`appId`, `dataFile`, `limitKey`, `darkKey`, `swFile`, `syncId`, `accent`) antes de cargar este script. |

## PWA files

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

## B1.html — Implementation Notes

### Overview
Vocabulary quiz app for B1-level German. Mirrors the architecture of `B2.html` but loads data from external `DataB1.json`.

### Data structure
Data loaded from `DataB1.json` (22 lists: the 5 core ones `esenciales`/`verbos`/`sustantivos`/`adjetivos`/`expresiones` plus extra and `tema: …` lists — see the Data table). Each contains parallel arrays `de` (German) and `es` (Spanish).

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
Toggled by `#darkModeBtn`; persisted via `window.ThemePref` (`auth.js`, single key `ejaleman_theme` shared by every app, falls back to `prefers-color-scheme`).
