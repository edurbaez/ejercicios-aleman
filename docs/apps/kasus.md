# kasus.html

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files row

| File | Purpose |
|------|---------|
| `kasus.html` | Grammar case trainer: generates fill-in-the-blank exercises (Nominativ/Akkusativ/Dativ/Genitiv + Wechselpräpositionen mode) via `/api/chat`, with article or adjective-declension blanks (selector "Rellenar"). Each exercise is verified by a second independent-solve API call; next exercise is prefetched in background. Auto-advances on correct answer. Includes collapsible theory section on case identification. Tracks score and streak. All JS inline. Teal theme (`#00796B`). |
