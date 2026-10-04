# styles.css

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Shared styles

| File | Purpose |
|------|---------|
| `styles.css` | Shared stylesheet for all apps. Imports Literata (display) + Source Sans 3 (UI) from Google Fonts. `:root` defines level colors (`--color-a1`…`--color-c2`), type scale (`--text-xs`…`--text-2xl`, `--font-sans`/`--font-display`), radii (`--radius-sm`/`--radius`/`--radius-lg`/`--radius-pill`), shadows (`--shadow-1/2/3`) and warm-paper surfaces (`--paper`, `--paper-raised`, `--paper-sunk`, `--ink`, `--ink-muted`, `--line`, `--on-accent`). The **EDITORIAL THEME LAYER** at the end of the file overrides every app's surface vars (`--bg`/`--card-bg`/`--text`/`--border`/`--navbar-bg`, light and `.dark`) via an `:is(#page-…)` list — add new app body ids there; apps only define their own `--accent`. Also holds the global `:focus-visible` ring and `prefers-reduced-motion` block. admin/teacher load this file but have no body id, so the layer doesn't touch them. Sections: shared navbar (incl. dropdown), B2, B1, Lectura Veloz, Chat de Voz, Diccionario, Kasus-Trainer (#00796B teal), Corrector. |
