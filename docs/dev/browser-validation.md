# Manual browser validation (logged-in flows)

Split out of the root `CLAUDE.md` "Local Development" section.

## Manual browser validation (logged-in flows, e.g. reading a Supabase table, calling `/api/chat`)

Several apps require a real logged-in session (`window.currentUser`) before their core flow runs (Modo B of `lectura veloz.html`, `escritura.html`, etc.), and login only supports email OTP or Google OAuth — no password auth, so it can't be scripted end-to-end without the user's help. Recipe used and verified working (session 2026-07-31, see `lecturaplan.md` §11):

1. **Get a session token from the user.** Ask them to log in at the real app in their own browser, open DevTools console, and run `localStorage.getItem('sb-mzitpnacjcjpokmiqwtd-auth-token')` (project ref from `config.js` `SUPA_URL`), then paste the JSON value. Save it to a file **outside the repo** (scratchpad dir) — never commit it, delete it once the test is done. It's a live session; tell the user they can log out afterward to invalidate it.
2. **Start `vercel dev`** in the background (`nohup vercel dev --yes --listen <port> > log.txt 2>&1 &`), poll `curl localhost:<port>/` until it's up (don't blind-sleep).
3. **Known `vercel dev` bug: any filename containing a space 404s** (confirmed generically, not just `lectura veloz.html` — reproduced with a throwaway test file too). Work around it by making a temporary same-content copy with no spaces in the project root (e.g. `cp "lectura veloz.html" lectura-veloz-devtest.html`), test against the copy, **delete it before finishing** (`git status` should come back clean). Whether this also affects real production is unconfirmed — the documented prod domain issue below blocked checking it.
4. **Drive a real headless browser with Playwright**, not `chromium-cli` (not installed on this Windows machine): in a scratchpad dir, `npm init -y && npm install playwright@<pinned-version>` then `npx playwright install chromium` (downloads ~300MB, needed once — check `ls ~/AppData/Local/ms-playwright` first, a stale rev mismatch throws `Executable doesn't exist`). Inject the session via `context.addInitScript(([k,v]) => localStorage.setItem(k,v), [authKey, sessionJson])` before `page.goto()` — this runs before any page script, so `auth.js`/`window.sb` picks it up as an already-logged-in session on load. Confirm with `page.waitForFunction(() => !!window.currentUser, undefined, {timeout: ...})` (note the explicit `undefined` arg — omitting it makes Playwright treat your options object as the function's argument instead).
5. Drive the actual flow (`click`/`fill`/`selectOption`), screenshot at each step (`page.screenshot({path, fullPage:true})`), and check `page.on('console', ...)`/`page.on('pageerror', ...)` for JS errors during the run.
6. **Cleanup after the test**: kill the `vercel dev` process (find the PID listening on the port and kill it — `npm`/`vercel dev` don't forward signals cleanly), delete the temp no-space file copy, delete the saved token file.

This same recipe found a real bug on its first use (see `lecturaplan.md` §11) — worth reusing rather than skipping "can't test the UI" for logged-in flows.
