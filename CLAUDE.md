# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Maintenance rule

**Whenever a new file is added to the project and actively used by an app or the deploy pipeline, before finishing the task: (1) add a one-line row to the matching group of the Active Files index below (≤ ~160 chars, with a `Detail:` pointer), (2) put its full detailed description in the matching detail doc (subdir `CLAUDE.md` or `docs/` file — see the Docs map), and (3) update the Apps / Deployment sections in `README.md`.** Likewise, remove entries (root row + detail) for files that are deleted or deprecated. Root rows stay one line; all per-file detail lives in the detail docs, never in this file.

## Subagent usage rule

**Use subagents (Agent tool) to keep the main context clean whenever a task requires reading/editing the large single-file HTML apps in this repo or broad exploration across the codebase** — e.g. auditing a `plan.js` level end-to-end, cross-referencing a whole app against `GRAMMAR_DATA`, or implementing a feature that spans one of the big apps (`lectura veloz.html`, `mundliche.html`, `escritura.html`, `marketing/contenido.html`, etc.). Reserve direct inline work (no subagent) for small, targeted edits where you already know the exact lines to touch.

## Project Overview

Five standalone HTML apps for language learning (Spanish ↔ German) plus a serverless API. No build system — open any `.html` file directly in a browser. All visible pages share a common navbar with a dropdown menu: **Inicio** is always visible as an independent link; the rest of the pages are grouped under a **Menú ▾** button.

## Docs map

Per-file detail is split out of this file. Subdir `CLAUDE.md` files load automatically when files in that subdir are read; `docs/` files load only when opened — **read the relevant one before working on that app/area**.

| Area | Detail lives in |
|------|-----------------|
| Quiz apps A1–C2, `shared-game.js`, their PWA files, B1/B2 notes | `docs/apps/vocab-quiz.md` |
| One doc per root app (+ its JS/data and implementation notes) | `docs/apps/{lectura-veloz,mundliche,escritura,kasus,chat-voz,corrector,diccionario,chat-reformulaciones,gramatica,plan,landing}.md` |
| `auth.js`, `config.js`, `onboarding.js` | `docs/apps/auth.md` |
| `styles.css` / `Data*.json` | `docs/styles.md` / `docs/data.md` |
| `chatvoz2/`, `admin/`, `teacher/`, `marketing/`, `scripts/` | `<subdir>/CLAUDE.md` |
| `*.js`, Push Notifications flow, push env vars, Cron | `CLAUDE.md` |
| Migrations + every "Supabase table: X" schema | `supabase/CLAUDE.md` |
| Manual browser validation recipe | `docs/dev/browser-validation.md` |

## Active Files (index)

### Apps

| File | Purpose |
|------|---------|
| `A1.html` / `A2.html` / `B1.html` / `B2.html` / `C1.html` / `C2.html` | Vocabulary quiz per CEFR level, engine in `shared-game.js` via `window.APP_CONFIG`; PWA with offline support. Detail: `docs/apps/vocab-quiz.md` |
| `lectura veloz.html` | "Entrenamiento de lectura": ⚡ Sprint de vocabulario, 📚 Lectura veloz (RSVP), 📖 Comprensión (Modo A/B, Leseverstehen by Teile). Detail: `docs/apps/lectura-veloz.md` |
| `diccionario.html` | German dictionary via `/api/chat`, cached in Supabase + IndexedDB. Detail: `docs/apps/diccionario.md` |
| `chat-voz.html` | Voice chat (Whisper → GPT-4o-mini → TTS), A1–C2, roleplay scenarios, vocab summary. Detail: `docs/apps/chat-voz.md` |
| `chatvoz2/index.html` | Second voice chat via `/api/deepseek-chat`, scenarios with missions, multi-language, grammar focus. Detail: `chatvoz2/CLAUDE.md` |
| `corrector.html` | Grammar correction of photos (`/api/vision`) or pasted text (`/api/chat`). Detail: `docs/apps/corrector.md` |
| `escritura.html` | Goethe/telc-style writing tasks + AI evaluation (text or handwritten photo). Detail: `docs/apps/escritura.md` |
| `kasus.html` | Case trainer per level (articles, possessives, pronouns, adjectives, n-Deklination), shared verified bank, write mode, weak points. Detail: `docs/apps/kasus.md` |
| `mundliche.html` | Oral exam (Mündliche Prüfung) trainer per Teil and level, voice + rubric evaluation, Simulacro completo. Detail: `docs/apps/mundliche.md` |
| `chat-reformulaciones.html` | Umformung practice (rules / 🔗 Combos) from pregenerated banks, hybrid evaluation, rule SRS. Detail: `docs/apps/chat-reformulaciones.md` |
| `gramatica.html` | Grammar rules SPA per level (accordion) with "🎯 Practicar" quiz and Modo Examen. Detail: `docs/apps/gramatica.md` |
| `gramaticaA1.html` … `gramaticaC2.html` (6 files) | Static JS-free per-level grammar references, hand-transcribed from `GRAMMAR_DATA`. Detail: `docs/apps/gramatica.md` |
| `plan.html` | 30-day study plan SPA, progress synced to `user_data.plan_progress`; installable PWA. Detail: `docs/apps/plan.md` |
| `admin/index.html` | Admin-only dashboard (stats, users, access control, reports). Detail: `admin/CLAUDE.md` |
| `teacher/index.html` | Admin/teacher class planner per level (martes/jueves classes vs `GRAMMAR_DATA`). Detail: `teacher/CLAUDE.md` |
| `marketing/index.html` / `contenido.html` / `emails.html` / `calendario.html` / `resultados.html` | Admin-only marketing: strategy, content generator, emails, editorial calendar, KPIs. Detail: `marketing/CLAUDE.md` |

### API

Files in `api/`. All require Supabase JWT auth (except cron ones) and are rate limited. Detail (models, actions, limits): `api/CLAUDE.md`.

| File | Purpose |
|------|---------|
| `chat.js` | OpenAI `gpt-4o-mini` proxy + actions `generate-reading`, `generate-practice`, `generate-kasus`, `generate-mitexto`. |
| `_kasus.js` | Level config + server-side prompt/validator for `generate-kasus` (`kasus.html`); not a function (`_` prefix). |
| `_reading-topics.js` | Shared data for `generate-reading` (`TEMAS`, `READING_SPECS`, `READING_TEILE_SPECS`…); not a function (`_` prefix). |
| `whisper.js` | Audio transcription, model forced server-side to `gpt-4o-mini-transcribe`; enforces voice-STT daily cap. |
| `vision.js` | GPT-4o vision: `tarea`/`carta`/`frases`/`escritura`/`style-analysis`. |
| `tts.js` | OpenAI `tts-1` → audio/mpeg. |
| `image.js` | OpenAI Images (`gpt-image-2`), admin-only (fails closed). |
| `admin.js` | Admin actions `invite` / `set-status`. |
| `push-subscribe.js` | Web Push subscription CRUD + `notify-admins` action. |
| `push-notify.js` | Hourly cron sender of push reminders (`CRON_SECRET`). |
| `vocab-refresh.js` | Cron: appends current expressions to system `word_lists` row `nuevas`. |
| `deepseek-chat.js` | DeepSeek (`deepseek-v4-flash`, thinking disabled) proxy. |
| `finanzas.js` | Actions `price` / `history` (CoinGecko + Yahoo Finance). |
| `_lib.js` | Shared `verifyJWT()`, `createRateLimiter()`, `checkAccess()`. |

### Data

| File | Purpose |
|------|---------|
| `DATA.json` | Legacy B2 vocabulary (old format). Kept for backward compatibility with `sw.js` cache. |
| `DataA1.json` … `DataC2.json` (6 files) | Hand-curated vocabulary per level (core lists + extras + `tema: …`); **never regenerate with `generate-vocab.js`**. Detail: `docs/data.md` |
| `reformulaciones-data.json` / `reformulaciones-combos.js` / `reformulaciones-combos-data.json` | Umformung exercise bank, combo catalog, combo bank. Detail: `docs/apps/chat-reformulaciones.md` |
| `grammar-data.js` + `grammar-data-{a1..c2}.js` | Loader shim (plain blocking `<script>`) + per-level `window.GRAMMAR_DATA`. Detail: `docs/apps/gramatica.md` |
| `teacher/clases-a1.js` / `-a2` / `-b1` / `-b2` | `window.TEACHER_CLASES[level]` 30-day class mapping. Detail: `teacher/CLAUDE.md` |
| `redemittel-data.js` | `window.REDEMITTEL[level][teilId]` (only B1 populated). Detail: `docs/apps/mundliche.md` |

### Scripts (offline tools)

Files in `scripts/`. Detail: `scripts/CLAUDE.md`.

| File | Purpose |
|------|---------|
| `seed-word-lists.js` | Upserts `Data{LEVEL}.json` into `word_lists` (optional level arg). |
| `generate-vocab.js` | Generates `Data{LEVEL}.json` via GPT-4o (not for the hand-curated files). |
| `generate-reformulaciones.js` | Generates `reformulaciones-data.json` (incremental). |
| `generate-reformulaciones-combos.js` | Generates `reformulaciones-combos-data.json` with review pass. |
| `fix-duplicate-words.js` | One-off repair of duplicated words in Data files. |

### Database Migrations

Files in `supabase/migrations/`, run manually in the Supabase SQL editor. Full detail + every table schema: `supabase/CLAUDE.md`.

| File | Purpose |
|------|---------|
| `001_word_lists_srs.sql` | `word_lists` + `srs_progress`. |
| `002_user_data.sql` | `user_data`. |
| `003_reading_texts.sql` | `reading_texts` + `user_reading_seen`. |
| `004_marketing_posts.sql` | `marketing_posts` (admin RLS). |
| `005_marketing_views.sql` | 4 `marketing_*` KPI views. |
| `006_reading_texts_insert.sql` | Drops old client INSERT policy on `reading_texts`. |
| `007_marketing_posts_kind_curso_ad.sql` | `kind` CHECK adds `infografia`, `curso_ad`. |
| `008_grammar_rule_progress.sql` | `grammar_rule_progress`. |
| `009_access_control.sql` | `access_expires_at`, `is_access_valid()`, 15-day trial, RLS hardening. |
| `010_grammar_rule_id_b2c1_remap.sql` | Remaps B2/C1 rule ids. |
| `011_reading_texts_format_version.sql` | `reading_texts.format_version`. |
| `012_grammar_practice_exercises.sql` | `grammar_practice_exercises` + `user_grammar_practice_seen`. |
| `013_user_data_plan_progress.sql` | `user_data.plan_progress`. |
| `014_admin_read_srs_grammar_progress.sql` | Admin SELECT on `srs_progress`, `grammar_rule_progress`. |
| `015_admin_read_reading_grammar_practice.sql` | Admin SELECT on `user_reading_seen`, `user_grammar_practice_seen`. |
| `016_daily_usage_time.sql` | `daily_usage_time` + `upsert_daily_usage_time()`. |
| `017_feedback_reports.sql` | `feedback_reports`. |
| `018_active_sessions.sql` | `active_sessions` + `upsert_active_session()`. |
| `019_feedback_reports_respuesta.sql` | Admin replies on `feedback_reports` + `mark_feedback_seen()`. |
| `020_device_trials.sql` | `device_trials` + `claim_device_trial()`. |
| `021_user_data_cv_scenarios.sql` | `user_data.cv_scenarios`. |
| `022_reading_sessions.sql` | `reading_sessions`. |
| `023_feedback_reports_contexto.sql` | `feedback_reports.contexto` (jsonb) for per-exercise reports. |

### PWA & Deploy

| File | Purpose |
|------|---------|
| `manifest.json` / `sw.js` / `icon.svg` | PWA manifest, Service Worker (cache + push) and icon for `B2.html`. Detail: `docs/apps/vocab-quiz.md` |
| `manifest-{a1,a2,b1,c1,c2}.json` / `sw-{…}.js` / `icon-{…}.svg` | Same trio per quiz level. Detail: `docs/apps/vocab-quiz.md` |
| `manifest-plan.json` / `sw-plan.js` / `icon-plan.svg` | PWA trio for `plan.html`. Detail: `docs/apps/plan.md` |
| `index.html` | Landing page (app cards, navbar, SEO meta). Detail: `docs/apps/landing.md` |
| `privacidad.html` | Public privacy policy, no `auth.js` on purpose. Detail: `docs/apps/landing.md` |
| `vercel.json` | Configuración de Vercel: funciones serverless con `maxDuration: 60` (un solo patrón `api/*.js` — patrones superpuestos rompen el build). Sin rewrites (`/` sirve `index.html` directamente). |
| `robots.txt` | Permite indexación completa (`Allow: /`) y referencia `sitemap.xml`. |
| `sitemap.xml` | Sitemap con la landing (`/`) como única URL pública — las apps internas no se listan (requieren login/uso). |
| `package.json` | Node.js package declaration — forces Vercel to treat the project as Node. Dependencies: `@vercel/kv`, `web-push` (used by `api/push-notify.js`). |
| `.env.local` | Local env vars (not committed). Must define `OPENAI_API_KEY` for local dev. |

### App Scripts

| File | Purpose |
|------|---------|
| `config.js` | Supabase URL/anon key + VAPID public key globals; loaded before `auth.js`. Detail: `docs/apps/auth.md` |
| `auth.js` | Shared auth, login modal, stats panel, `NAV_ITEMS` menu, time/session tracking, feedback FAB, access gate. Detail: `docs/apps/auth.md` |
| `shared-game.js` | Quiz engine (state, TTS, SM-2 SRS, lists, Modo Escritura). Detail: `docs/apps/vocab-quiz.md` |
| `diccionario.js` | All JS for `diccionario.html`. Detail: `docs/apps/diccionario.md` |
| `corrector.js` | All JS for `corrector.html`. Detail: `docs/apps/corrector.md` |
| `gramatica.js` | SPA logic for `gramatica.html` (Practicar quiz, Modo Examen). Detail: `docs/apps/gramatica.md` |
| `plan.js` | `window.PLANS` data (a1–c2 × 30 days). Detail: `docs/apps/plan.md` |
| `onboarding.js` | First-visit guided tour on `index.html`. Detail: `docs/apps/auth.md` |

### Shared styles

| File | Purpose |
|------|---------|
| `styles.css` | Shared stylesheet; tokens in `:root`, EDITORIAL THEME LAYER `:is(#page-…)` list — add new app body ids there. Detail: `docs/styles.md` |

---

## Access control

Time-limited access per user, admin-controlled (migration `supabase/migrations/009_access_control.sql`). Single rule, re-implemented identically in three places:

```
is_access_valid := profiles.status <> 'blocked'
  AND (profiles.access_expires_at IS NULL OR profiles.access_expires_at > now())
```

- **New signups**: `handle_new_user()` sets `status = 'pending'` and `access_expires_at = now() + 15 days` — a 15-day trial with no admin action needed.
- **Admin control** (`admin/index.html` user detail panel → `api/admin.js` `set-status`): "Autorizar sin límite" (`status='approved'`, `access_expires_at=NULL`), "+15/+30 días" or a custom date (`status='approved'`, `access_expires_at=<date>`), "Denegar" (`status='blocked'`, does not touch the expiry). The same action restores access after either an expiry or a block.
- **Enforcement, defense in depth**:
  1. Postgres function `public.is_access_valid(user_id)` — used by the RLS `WITH CHECK`/`USING` on INSERT/UPDATE (not SELECT/DELETE) of `word_lists`, `srs_progress`, `grammar_rule_progress`, `user_reading_seen`, `user_data`.
  2. `api/_lib.js` `checkAccess(userId)` — called right after `verifyJWT()` in every endpoint that costs money (`chat.js`, `whisper.js`, `vision.js`, `tts.js`, `image.js`, `deepseek-chat.js`, `finanzas.js`); returns `403` if invalid. Fails open (allows the request) if `SUPABASE_SERVICE_ROLE_KEY` is unset or the Supabase REST call errors — same convention as `whisper.js`'s daily-usage check.
  3. `auth.js` `_isAccessValid()` — the universal gate: on every auth state change, `updateAuthUI()` shows a non-dismissable modal (`#access-blocked-modal`) blocking the whole page if the current user's profile fails the check. This is the only layer that covers apps with no serverless calls (B1–C2, `gramatica.html`, `plan.html`, …). Admins are always exempt, even from a stale row.
- **Gotcha**: `profiles` was created directly in Supabase, not tracked in this repo's migrations (same as its `status` column, added by `migrations/add_user_status.sql`). Before adding new RLS policies on tables owned by a user, check `pg_policies` for pre-existing untracked policies — migration 009 found and removed one on `user_data` (`"own data" FOR ALL`, permissive with no access check) that would have silently bypassed the new gate.

## Voice-STT daily usage cap

All apps that send audio to `/api/whisper` (`mundliche.html`, `chat-voz.html`, `chatvoz2/index.html`, `chat-reformulaciones.html`) share a single 60-minute-per-day cap per user, not one cap per app. Mechanism:
- `auth.js` defines `window.VOICE_STT_APPS = ['mundliche', 'chat-voz', 'chatvoz2', 'chat-reformulaciones']`.
- Each app logs `duration_ms` (client-reported recording length) via `window.logEvent(appId, 'audio_sent', { duration_ms })` into `usage_events`, keeping its own `app` value for per-app analytics (`admin/index.html`).
- Each app's `loadDailyUsage()` sums today's `duration_ms` across `.in('app', window.VOICE_STT_APPS)` (not just its own `app`) to compute the shared total and gate new recordings client-side.
- `api/whisper.js` also enforces the cap server-side (queries `usage_events` with `SUPABASE_SERVICE_ROLE_KEY` before calling OpenAI) so the client-side gate can't be bypassed by calling the endpoint directly.
- **The cap is 60 min/day for authorized users and 10 min/day for accounts still on the automatic 15-day trial** (`profiles.status <> 'approved'`; admins always get the full cap). `auth.js` sets `window.VOICE_DAILY_LIMIT_MS` from the profile in `updateAuthUI()` and the four apps read it via a local `DAILY_LIMIT_MS()` helper instead of hardcoding a constant; `api/whisper.js` re-derives the same two values from `checkAccess().role`/`.status`.
- `duration_ms` is still self-reported by the client, but it is no longer trusted on its own: `api/whisper.js` also derives a duration from the size of the audio part (`MAX_AUDIO_BYTES_PER_SECOND`, deliberately set above MediaRecorder's real Opus bitrate so the derived figure stays *below* the true duration and an honest client is never overcharged) and bills the cap with whichever is larger. Sending `duration_ms: 0` no longer buys unlimited transcription.

---

## Environment Variables — Complete Reference

| Variable | Used by | Required | Notes |
|----------|---------|----------|-------|
| `OPENAI_API_KEY` | `chat.js`, `whisper.js`, `vision.js`, `tts.js`, `vocab-refresh.js` | Yes | OpenAI secret key |
| `DEEPSEEK_API_KEY` | `deepseek-chat.js` | Yes | DeepSeek secret key |
| `SUPABASE_JWT_SECRET` | `_lib.js` (HS256) | Conditional | Required only for HS256 tokens; ES256 tokens (default Supabase) use JWKS and don't need this |
| `SUPABASE_URL` | `admin.js` | Yes | `https://<project>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | `admin.js`, `push-subscribe.js`, `push-notify.js`, `vocab-refresh.js`, `whisper.js` | Yes | Bypasses RLS — never expose to client. In `whisper.js` it's used to enforce the shared 60-min/day voice-STT cap server-side; if unset, that server-side check silently no-ops (client-side gate still applies) |
| `ALLOWED_ORIGIN` | `chat.js` | No | If set, rejects requests from other origins with 403 |
| `KV_REST_API_URL` | `_lib.js` | No | Enables Vercel KV for persistent rate limiting across cold starts; falls back to in-memory Map if absent |
| `KV_REST_API_TOKEN` | `_lib.js` | No | Required when `KV_REST_API_URL` is set |
| `VAPID_PUBLIC_KEY` | `push-notify.js` | Yes | Must match `window.VAPID_PUBLIC_KEY` in `config.js` |
| `VAPID_PRIVATE_KEY` | `push-notify.js` | Yes | Never sent to client |
| `VAPID_SUBJECT` | `push-notify.js` | Yes | `mailto:ed.urbaez@gmail.com` |
| `CRON_SECRET` | `push-notify.js`, `vocab-refresh.js` | Yes | Bearer token that cron-job.org sends |

For local dev, define these in `.env.local` (not committed). `vercel dev` loads them automatically.

---

## Local Development

```bash
# Requires Vercel CLI: npm i -g vercel
vercel dev
```

`vercel dev` runs all `api/*.js` serverless functions locally and serves static files. HTML apps that only use browser APIs (no serverless calls) can be opened directly in the browser without `vercel dev`.

Auth note: Supabase JWT verification hits the real Supabase JWKS endpoint even in local dev — internet connection required.

Manual browser validation of logged-in flows (session-token injection + Playwright recipe, and the known `vercel dev` bug where filenames containing a space 404): see `docs/dev/browser-validation.md`.

---

## Gotchas

- **Rate limiter resets on cold start** — `createRateLimiter()` in `_lib.js` defaults to an in-memory Map. A new Vercel function instance starts with a clean counter. This is intentional (no external dependency), but means limits are per-instance. Add `KV_REST_API_URL` + `KV_REST_API_TOKEN` to get persistent rate limiting via Vercel KV.

- **`res.text()` → `JSON.parse()` instead of `res.json()`** — used in all frontend API calls (e.g. `diccionario.js`, `chat-voz.html`). If the server returns an empty body or an HTML error page, `res.json()` throws a silent parse error with no useful message. The manual pattern preserves the raw response for debugging.

- **`DATA.json` is for the Service Worker, not the app** — `B2.html` embeds its vocabulary inline in a `DATA` object. `DATA.json` exists only so the SW cache manifest has a file to reference. Do not rely on `DATA.json` for runtime logic.

- **JWT verification supports ES256 and HS256** — `_lib.js` tries ES256 first (JWKS from Supabase, no secret needed). Falls back to HS256 only if the token header specifies it, requiring `SUPABASE_JWT_SECRET`. Default Supabase tokens are ES256; HS256 is legacy.

- **Hobby plan caps deployments at 12 serverless functions** — `_lib.js` doesn't count (files starting with `_` are ignored by Vercel). When adding a new endpoint, merge existing ones first (pattern: dispatch by `action` in the body, as in `admin.js` and `finanzas.js`).
