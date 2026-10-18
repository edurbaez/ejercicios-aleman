# chat-voz.html

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files row

| File | Purpose |
|------|---------|
| `chat-voz.html` | Voice conversation app: hold-to-record sends audio to Whisper (STT), AI replies via GPT-4o-mini, response read aloud via browser TTS. Selectable CEFR level (A1–C2) and masculine/feminine voice. Roleplay scenarios (7 built-in + user-created ones via the "Personalizar" modal) are persisted: the selected scenario in `localStorage` (`cv_selected_scenario`, rehydrated by `restoreSelectedScenario()` at init without any API call — the persona comes from its `cv_rol_cache_<key>` cache), and the custom scenarios themselves synced cross-device to `user_data.cv_scenarios` (`mergeRemoteScenarios()`, merge by `key` + `deleted` tombstones, migration 021). Botón 📖 "Vocabulario de la conversación" (`openVocabModal()`/`fetchVocabResumen()`): manda el transcript acumulado (`State.messages`, roles etiquetados ESTUDIANTE/LEHRER, delimitado con `<<< >>>` + nota de ignorar instrucciones embebidas) a `/api/chat` con `temperature: 0.2` y pide un array JSON `[{de, es, tipo, ejemplo}]` con las 8-12 palabras/expresiones más relevantes para el nivel activo, priorizando lo que dijo la IA (input nuevo) sobre lo que dijo el alumno; se renderiza en un modal (`#vocabModal`, clases `.cv-vocab-*` en `styles.css`) donde tocar una entrada la pronuncia vía `speak()`. Resultado cacheado en memoria por cantidad de turnos (`vocabCache`, reseteado en `startConversation()`/`newConversation()`) para no repetir la llamada al reabrir el modal; botón "Actualizar" fuerza la regeneración. Solo visualización: no escribe en `word_lists` ni en el SRS. Bajo el tiempo usado, "Palabras dichas hoy" (`#cvDailyWords`, `addDailyWords()` en `sendToAI`) cuenta las palabras de los mensajes del alumno; solo en `localStorage` (`cv_daily_words` = `{date, count}`, se reinicia al cambiar la fecha local), acumulado entre sesiones del mismo día. Subject to the 60-min/day voice-STT cap shared across all voice apps (see "Voice-STT daily usage cap" below). |

## Sibling app: `chatvoz2/index.html` (parity check)

`chatvoz2/index.html` is the **admin-only** variant (linked only from `ADMIN_LINKS` in `auth.js`), same architecture but DeepSeek instead of OpenAI. The two apps are kept **separate on purpose** (no shared JS module), so most of their code is copy-pasted. **Before finishing any change to `chat-voz.html`, check whether the same change applies to `chatvoz2/index.html`** (and mention it to the user if it does but wasn't asked for). Full map lives in `chatvoz2/CLAUDE.md` → "Parity with chat-voz.html".

Quick checklist — near-identical in both files, a fix here almost always applies there too:
- Recording: `startRecording`/`stopRecording`, `audioFileName`, `transcribeAndSend` (real-ms duration; < 800 ms or < 1 KB is rejected before Whisper, unbilled; `State.sessionId` discards late results after `newConversation()`), daily cap (`DAILY_LIMIT_MS()`, `loadDailyUsage`), "Palabras dichas hoy" (`addDailyWords`, different `localStorage` key).
- TTS: `speak`/`cancelCurrentSpeech`/`selectVoice` (browser `speechSynthesis`; `utter.rate` from `ttsRate()` by level A1 0.85 / A2 0.9 / B1 0.95 / B2+ 1.0; Premium voice uses `onyx` (male) / `nova` (female) and revokes its object URL).
- Scenarios: `generateRol()` prompt and the persona truncation in `getSystemPrompt()`, mission banner / `mision_cumplida`.
- Chat UI: `addBubble`/`updateBubble`/`addCorrectionCard`, `korrekturen` per-turn corrections, guided mode.
- Modo Repetir (whole block, `matchScore`, result rendering).
- `newConversation()` / `startConversation()` reset logic.

Only in `chat-voz.html` (port to chatvoz2 only if asked): Premium voice via `/api/tts`, custom scenarios + `user_data.cv_scenarios` sync, IndexedDB history (last 5), 📖 vocab modal.
