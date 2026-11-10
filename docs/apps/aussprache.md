# aussprache.html (Pronunciación)

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files rows

| File | Purpose |
|------|---------|
| `aussprache.html` | Pronunciation reference for Spanish speakers. Body `#page-aus` (in the EDITORIAL THEME LAYER list), magenta accent `#AD1457`. Header + collapsible legend explaining the approximation conventions, sticky category chips (Todas / Vocales y diptongos / Umlaute / Consonantes / Final de palabra), then one card per rule. Gated by the normal access modal (no `data-access-free`). Listed in `auth.js` `NAV_ITEMS` ("Pronunciación") and in the Sprechen group of `index.html`. Daily time is tracked as app `aussprache` (`_DT_BODY_APP`). |
| `aussprache-data.js` | `window.AUSSPRACHE_CATEGORIAS` (`{ id, label }`) and `window.AUSSPRACHE`: `{ id, categoria, grafia, suenaComo, explicacion, ejemplos: [{ palabra, aproximacion, traduccion }] }`. In `palabra`, `[brackets]` mark the letters the rule is about: they are highlighted with `<mark>` and stripped before TTS. `aproximacion` uses Spanish spelling: doubled vowel = long, accent mark = stress, `j` = Spanish j (softer for Ich-Laut / initial h), `sch` = "sh"; ö/ü are kept as is. |
| `aussprache.js` | All JS (IIFE, no Supabase calls). Renders chips and cards with DOM nodes (no `innerHTML`). 🔊 uses the browser's `speechSynthesis` (`de-DE`, rate 0.85), picking a German voice on `voiceschanged`; shows a warning if the browser has voices but none German, or has no `speechSynthesis` (then the 🔊 buttons are not rendered). Defines `window.toggleDarkMode` for the navbar button. |

## Adding a rule

Append an object to `window.AUSSPRACHE` with an existing `categoria`; cards are grouped by category in `AUSSPRACHE_CATEGORIAS` order and keep array order within a category. No other file needs changes.
