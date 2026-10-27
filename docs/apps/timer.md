# timer.html (Temporizador)

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files rows

| File | Purpose |
|------|---------|
| `timer.html` | Interval timer PWA, replaces an ad-filled phone timer app. Body `#page-timer` (in the EDITORIAL THEME LAYER list), orange accent `#E65100`. Three views toggled by `showView()`: list of presets, editor, run screen (SVG progress ring, phase, round x/N, next phase, total remaining, Pausa/Saltar/Parar). Navbar and feedback FAB are hidden while running. Listed in `auth.js` `NAV_ITEMS` ("Temporizador"). |
| `timer.js` | All the logic for `timer.html` (IIFE, no globals, no Supabase calls). See sections below. |
| `sounds/*.mp3` | Built-in sounds, synthesized with numpy + ffmpeg (64 kbps mono), so there are no license issues. 9 alarm sounds (`campana`, `gong`, `ding-dong`, `fanfarria`, `marimba`, `digital`, `despertador`, `pitido`, `doble-pitido`) and 4 count-in ticks (`tick`, `tick-grave`, `tick-agudo`, `tick-madera`). |
| `manifest-timer.json` / `sw-timer.js` / `icon-timer.svg` | PWA trio. The SW is registered with `scope: '/timer.html'` so it does not replace the other apps' root-scoped workers. Network-first for app files, cache-first for `sounds/`. Bump `CACHE` (`timer-vN`) whenever the asset or sound list changes. |

## Access

Open to everyone, with no login and no role check. `<body data-access-free>` makes `auth.js` `updateAuthUI()` skip the expired/blocked-account modal on this page; that is the only page using the flag. `auth.js` is still loaded for the navbar, menu and login button.

## Presets (IndexedDB `timer-db`, store `presets`)

`{ id, name, type, config, sounds: { work, rest, end, tick }, countIn, loopEnd, createdAt, updatedAt }`, local to the device and never synced. `type` + `config`:
- `intervals`: `{ prep, work, rest, rounds }` in seconds. No rest after the last round.
- `pomodoro`: `{ focus, short, long, longEvery, cycles }` in minutes. Every `longEvery`-th break is long. No break after the last pomodoro.
- `countdown`: `{ duration (s), repeats }`. Uses only the `end` sound, played at the end of every repeat.

`sounds.tick` is the 3-2-1 sound. The selector only lists `TICK_SOUNDS` and is shown only while "Pitidos 3-2-1" is checked. Presets saved before this field existed fall back to `t:tick` via `tickOf()`. On first run (empty store and no `timer_seeded` flag) three examples are seeded.

## Engine

`buildPhases(preset)` returns a flat `[{ kind: prep|work|rest, label, secs, round, of }]` list. Time comes from absolute timestamps (`run.endAt`), with a `setInterval(tick, 200)` that only renders. After the tab has been throttled or frozen, the `while (now >= endAt)` loop catches up and plays just the last transition sound. `visibilitychange` re-requests the Wake Lock, resumes the AudioContext and ticks immediately. When the run finishes, the end sound loops if `loopEnd` is set, stopping itself after 60 s. On Android, phase changes also vibrate.

## Audio

Web Audio API: one `AudioContext` plus a `GainNode` for volume (`localStorage.timer_volume`). The context is created inside the first user gesture (Start, ▶ preview). `navigator.audioSession.type = 'playback'` stops iOS from muting it when the ringer switch is off. Decoded buffers are memoized in `buffers` by sound id. A missing or deleted sound falls back to `b:campana`.

Sound ids: `b:<file>` (built-in alarm), `t:<file>` (built-in tick), `l:<uuid>` (user-added).

## User-added sounds (IndexedDB store `sounds`)

The "Añadir sonido" form takes an audio file (≤ 1 MB; it must decode with `decodeAudioData`) and stores it as a Blob in this device's IndexedDB only. Nothing is uploaded, and sounds are not shared across devices; this was a deliberate decision.

A web app cannot read the phone's system ringtones. On Android, the file picker can still browse `/Ringtones`, `/Alarms` and `/Notifications`, and that is the hint shown in the form.

## Known limits

With the screen locked or the app in the background, the JS is frozen and nothing sounds until the app comes back. Wake Lock keeps the screen on while a timer runs; if it is unsupported, a warning is shown. Push-based background alarms were considered and deferred: they would need a server scheduler, only the system notification sound plays, and timing is only accurate to a few seconds.
