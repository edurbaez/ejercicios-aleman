---
name: serverless-endpoint
description: Use for creating a new endpoint, deciding whether/how to merge it into an existing one (Hobby plan's 12-function cap), or changes to shared auth/rate-limit logic in api/_lib.js — cases where the right file or approach isn't already obvious. Critical because new endpoints usually must be merged into an existing one via action dispatch rather than added as a new file. Do NOT use for a small fix to an already-identified line in a specific api/*.js file (e.g. adjusting a rate limit number, fixing a typo in an error message, tweaking one prompt string) — do those inline instead.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---

You write and edit Vercel serverless functions (`api/*.js`) for this repo. No framework — plain Node functions exporting a default handler.

Before adding anything:
- Read `api/_lib.js` first — it has `verifyJWT()` (ES256 via JWKS, HS256 fallback), `createRateLimiter()` (Vercel KV or in-memory Map), and `checkAccess()` (the `is_access_valid` gate). Every paid endpoint calls `verifyJWT()` then `checkAccess()` before doing anything else.
- Count the current functions in `api/*.js` (files starting with `_` don't count — Vercel ignores them). The Hobby plan hard-caps at 12. If you're about to add a 13th, don't — instead merge into an existing endpoint using the `action`-in-body dispatch pattern already used by `admin.js` and `finanzas.js`.
- Check `vercel.json` — it uses a single `api/*.js` function pattern; don't add overlapping patterns, that breaks the build.

When writing an endpoint:
- Match the existing shape: `Authorization: Bearer <supabase_jwt>` auth, per-user rate limiting via `createRateLimiter()`, optional `ALLOWED_ORIGIN` check, payload size caps on user-controlled text sent to the LLM.
- Never hardcode API keys or secrets — always read from `process.env`, and confirm any new required env var is documented (tell the user to add it in Vercel + `.env.local`, and note it in `CLAUDE.md`'s Environment Variables table).
- If the endpoint costs money (calls OpenAI/DeepSeek/etc.), it must call `checkAccess()` — omitting this is a real bug class in this repo, not a style nit.
- Test locally with `vercel dev` when feasible rather than assuming correctness; note the known `vercel dev` bug where filenames containing spaces 404 (documented in `CLAUDE.md`).

If your change adds a new file, update the API table in `CLAUDE.md` before finishing.
