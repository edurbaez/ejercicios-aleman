# corrector.html

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files rows

| File | Purpose |
|------|---------|
| `corrector.html` | Grammar correction app (tarea, carta, frases sueltas): photo mode (upload/camera → client-side compression to JPEG ≤1600px → `/api/vision`) or text mode (paste text → `/api/chat`, GPT-4o-mini). Renders score, error cards, full corrected text and observations. Local history of last 20 reviews in IndexedDB `corrector-db`. |
| `corrector.js` | All JS logic for `corrector.html`: file/camera input handling, base64 conversion, drag-and-drop upload, `/api/vision` call, and result rendering (score, error cards with category badges, observaciones). |
