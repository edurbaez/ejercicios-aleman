# chatvoz2/

Loaded automatically by Claude Code when files in this directory are read. Split out of the root `CLAUDE.md` (which keeps a one-line index entry per file); keep in sync per the root Maintenance rule.

## Active Files row

| File | Purpose |
|------|---------|
| `chatvoz2/index.html` | Second voice conversation app, same architecture/pattern as `chat-voz.html` (hold-to-record, `/api/whisper` STT, browser TTS, repetir mode) but calls `/api/deepseek-chat` instead of `/api/chat`. Adds roleplay scenarios (`SCENARIOS`: Libre + 6 situational ones — supermercado, médico, tren, cafetería, entrevista, piso) each with an AI-generated persona (`generateRol()`, cached per scenario in `localStorage`, "⟳" regenerates a variant) and a `mision` (goal) tracked via the model's own `mision_cumplida` flag in its structured JSON reply, shown as a banner that flips to "¡Misión cumplida!" on success. Also supports non-German target languages (`LANGUAGES`: de/en/fr/it/pt/ja/ru) via a language selector, each with matched TTS lang code. When the target language is German (`State.lang === 'de'`), each new conversation picks one grammar rule from `GRAMMAR_DATA[level]` (loaded via `../grammar-data.js`, avoiding the last 5 rules used for that level, persisted in `localStorage`) and 8 random words from `Data{LEVEL}.json` (`esenciales`/`verbos`/`sustantivos`/`adjetivos`), injects both into the system prompt (`getSystemPrompt()`) instructing the AI to elicit that grammar structure and prefer that vocabulary register, and shows the picked rule in a "📐 Foco gramatical" banner — skipped entirely for non-German target languages. Subject to the same shared 60-min/day voice-STT cap. |
