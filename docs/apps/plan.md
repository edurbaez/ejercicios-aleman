# plan.html (30-day study plan)

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files rows

| File | Purpose |
|------|---------|
| `plan.html` | 30-day study plan SPA. Level selector (A1–C2), calendar grid of 30 days, progress bar, and day detail panel with task links. Progress persisted per level in `localStorage` (`plan_progress_{level}`, local-first) and synced cross-device to `user_data.plan_progress` when logged in (`loadRemoteProgress()`/`persistRemoteProgress()`; remote wins on load, pushed on every save — independent per level, so several levels in progress at once don't collide). Opened-task markers (`plan_opened_{level}`, set when a task link is clicked) sync too, under the reserved `_opened` key of the same jsonb: on load they are merged as a union with the local ones (never overwritten) and any local mark missing remotely is re-pushed, which also recovers pushes aborted by the task link navigating away. "🗑️ Reiniciar progreso" button clears the current level's completed days (with a confirm) and its opened-task/last-day local state. Uses `plan.js` for data. Blue accent (`#1565C0`). Installable PWA (`manifest-plan.json` + `sw-plan.js` + `icon-plan.svg`, "30" logo) — offline caching + optional daily reminder via periodic background sync, registered inline at the bottom of the page's script. |
| `plan.js` | Data file for `plan.html`. Exports `window.PLANS` — an object with 6 keys (a1–c2), each containing 30 day objects `{ day, week, focus, tasks[] }`. Tasks have `{ app, label, minutes }`. |

## PWA files

| File | Purpose |
|------|---------|
| `manifest-plan.json` | PWA manifest for `plan.html`. Blue theme (`#1565C0`), matches its accent. |
| `sw-plan.js` | Service Worker for `plan.html` — caches `plan.html`, `styles.css`, `manifest-plan.json`, `icon-plan.svg`, `plan.js`, `config.js`, `auth.js`. Same install/activate/periodicsync/push/notificationclick/fetch pattern as `sw.js`/`sw-b1.js` etc.; registered inline in `plan.html` (no `shared-game.js`, so registration + periodic sync opt-in live directly in the page's script). |
| `icon-plan.svg` | PWA icon for `plan.html`: blue rounded square with "30" in white. |
