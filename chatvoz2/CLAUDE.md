# chatvoz2/

Loaded automatically by Claude Code when files in this directory are read. Split out of the root `CLAUDE.md` (which keeps a one-line index entry per file); keep in sync per the root Maintenance rule.

## Active Files row

| File | Purpose |
|------|---------|
| `chatvoz2/index.html` | Second voice conversation app, same architecture/pattern as `chat-voz.html` (hold-to-record, `/api/whisper` STT, browser TTS, repetir mode) but calls `/api/deepseek-chat` instead of `/api/chat`. Adds roleplay scenarios (`SCENARIOS`: Libre + 6 situational ones — supermercado, médico, tren, cafetería, entrevista, piso) each with an AI-generated persona (`generateRol()`, cached per scenario in `localStorage`, "⟳" regenerates a variant) and a `mision` (goal) tracked via the model's own `mision_cumplida` flag in its structured JSON reply, shown as a banner that flips to "¡Misión cumplida!" on success. Also supports non-German target languages (`LANGUAGES`: de/en/fr/it/pt/ja/ru) via a language selector, each with matched TTS lang code. When the target language is German (`State.lang === 'de'`), each new conversation picks one grammar rule from `GRAMMAR_DATA[level]` (loaded via `../grammar-data.js`, avoiding the last 5 rules used for that level, persisted in `localStorage`) and 8 random words from `Data{LEVEL}.json` (`esenciales`/`verbos`/`sustantivos`/`adjetivos`), injects both into the system prompt (`getSystemPrompt()`) instructing the AI to elicit that grammar structure and prefer that vocabulary register, and shows the picked rule in a "📐 Foco gramatical" banner — skipped entirely for non-German target languages. Subject to the same shared 60-min/day voice-STT cap. "Palabras dichas hoy" counter (`#cvDailyWords`) same as `chat-voz.html` but with its own `localStorage` key `cv2_daily_words` (not shared between the two apps). |

## Parity with chat-voz.html

**Admin-only app** (linked only from `ADMIN_LINKS` in `auth.js`); used to test DeepSeek and new features before (or instead of) shipping them to students in `chat-voz.html`. The two apps are kept **separate on purpose** — no shared module — so most code is duplicated. **Before finishing any change here, check whether it should also go to `chat-voz.html`** (and vice versa; `docs/apps/chat-voz.md` points back here). If the change applies but wasn't requested for the other app, tell the user instead of silently porting it.

| Area | Status | Notes when changing |
|------|--------|---------------------|
| Recording (`startRecording`/`stopRecording`, `audioFileName`, `transcribeAndSend`) | Duplicated | Real-ms duration (`recStartedAt/recStoppedAt`), min 800 ms / 1 KB else no Whisper + no billing; `sessionId` aborts `onstop`/`transcribeAndSend`/`sendToAI` after `newConversation()`; `micErrorMessage()` |
| Daily voice cap (`DAILY_LIMIT_MS()`, `loadDailyUsage`, `logEvent('audio_sent')`) | Duplicated | Must stay identical (shared cap across `VOICE_STT_APPS`) |
| "Palabras dichas hoy" (`addDailyWords`) | Duplicated | Different keys: `cv_daily_words` vs `cv2_daily_words` — keep them separate |
| TTS (`speak`, `cancelCurrentSpeech`, `selectVoice`, `ttsRate`) | Duplicated | Rate by level (A1 0.85, A2 0.9, B1 0.95, B2+ 1.0); `speakId` ignores stale callbacks; safety timeout if `onend` never fires; parentheticals stripped for A1/A2/guided (`stripParentheticals`); chat-voz also has Premium `/api/tts` branch (voice by gender: onyx/nova, `playbackRate`, `revokeObjectURL`) |
| `generateRol()` + persona in `getSystemPrompt()` | Duplicated | Same prompt; both read `State.scenarioRol` (here `State.rol` only stores the user's custom persona for 'libre' and is mirrored into `scenarioRol`); persona clipped with `clipText(…, 600)` at sentence boundary |
| Mission banner / `mision_cumplida` | Duplicated | — |
| Bubbles + `korrekturen` corrections + guided mode | Duplicated | — |
| Modo Repetir (+ `matchScore`, result rendering) | Duplicated | ~250 lines, keep in sync |
| `getSystemPrompt()` core | Mostly shared | Here: `/api/deepseek-chat` caps system prompt at 2000 chars — `getSystemPrompt()` builds from `parts` and trims vocab → focus description → contexto → persona until ≤ `MAX_SYSTEM_PROMPT_CHARS` (1950) |
| Multi-language (`LANGUAGES`), grammar focus (`GRAMMAR_DATA`), level vocab (`Data{LEVEL}.json`) | **Only chatvoz2** | Candidates to port to chat-voz if they prove useful |
| Premium voice, custom scenarios + `cv_scenarios` sync, IndexedDB history, 📖 vocab modal | **Only chat-voz** | Port here only if asked |
