# kasus.html

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files row

| File | Purpose |
|------|---------|
| `kasus.html` | Grammar case trainer. All JS inline, styles in `styles.css` (`.kas-*`), teal theme. Details below. |

## Selectors

- **Nivel** (A1 / A2 / B1 / B2+): gates what is available via `KAS_LEVELS` (inline) — **kept in sync by hand with `KASUS_LEVELS` in `api/_kasus.js`**, which also holds per-level vocabulary and sentence structures used in the prompt. A1: Nom/Akk/Dat, no Wechsel, article/possessive/pronoun. A2: + Wechsel, + adjective. B1/B2: + Genitiv, + n-Deklination. Out-of-level buttons are `disabled`; `normalizarSeleccion()` resets incompatible combos (pronombre×Genitiv, ndekl×Nominativ, Wechsel only with articulo/adjetivo).
- **Caso**: Todos / Nominativ / Akkusativ / Dativ / Genitiv / Wechselpräp. "Todos" and "Wechsel" pick a concrete target per exercise with `elegirObjetivo()`, weighted by the smoothed error rate of that target in `KasState.stats` (adaptive interleaving).
- **Rellenar**: articulo, posesivo, pronombre, adjetivo, ndekl.
- **Responder**: `opciones` (4 buttons, keys 1-4) or `escribir` (free input; `normalizarRespuesta()` accepts contractions ↔ expanded forms like ins = in das, ß = ss, and ignores case only when the blank starts the sentence). Every item shows a `pista` (base form; for articles only the type `der/die/das` so gender isn't revealed). Mode persisted in `localStorage.kas_modo`.

## Deep link

`kasus.html?nivel=a1|a2|b1|b2|c1|c2&caso=…&relleno=…&modo=opciones|escribir`. c1/c2 map to B2. `nivel` is saved to `localStorage.kas_nivel` (fallback when no param; default A2). The page auto-starts when `caso` or `nivel` is present. Callers: `plan.js` (adds the plan's level) and `gramatica.js` `KASUS_LINKS` (level from the rule id prefix).

## Exercise bank

Exercises come in sets from `grammar_practice_exercises` with `rule_id` `kasus:{LEVEL}:{W-?}{caso}:{relleno}`. `cargarSet()` picks a set the user hasn't seen (`user_grammar_practice_seen`), otherwise calls `/api/chat` `action: 'generate-kasus'` (server builds the prompt, generates 6 items, verifies them with an independent solve and stores the survivors — see `api/CLAUDE.md`). Sets are queued per key in `KasState.colas`; `prepararSiguiente()` chooses the next target ahead of time and preloads its set.

## Reporting a wrong exercise

After answering, the feedback box shows "⚑ ¿Este ejercicio tiene un error? Repórtalo" (`reportarEjercicio()`), which cancels the auto-advance and opens `auth.js`'s feedback modal with `{tipo: 'bug', resumen, contexto}` — `contexto` carries `app: 'kasus'`, `set_id` (`_setId`, the bank row) and `rule_id` (`_ruleId`) plus the item. `window.onFeedbackReported` drops the item from the retry queue and replaces the button with a thank-you note. The admin "Reportes" section shows the item and an "Ocultar set" button (sets `oculto = true`, so it's no longer served).

## Error tracking

- Wrong answers are re-queued (`KasState.repasos`) and shown again `RETRY_GAP` (3) answers later with reshuffled options, tagged "🔁 Repaso".
- `kasus_answered` events log `{caso, correct, modo, relleno, genero, nivel, respuesta, repaso}`. On sign-in, `cargarEstadisticas()` reads the user's last 400 such events from `usage_events`; `renderPuntosDebiles()` shows up to 4 weakest caso / caso×género groups (≥3 answers, <80 %) as chips that switch to that case. The same stats feed the adaptive weighting.
