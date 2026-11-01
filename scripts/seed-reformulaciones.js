#!/usr/bin/env node
// Inserts reformulaciones-data.json into the reformulaciones_exercises Supabase table.
// Run after applying supabase/migrations/033_reformulaciones_exercises.sql:
//   node scripts/seed-reformulaciones.js        (all levels)
//   node scripts/seed-reformulaciones.js c1     (one level)
// Idempotent: rows already present (same rule_id + source) are skipped, never overwritten,
// so existing ids — and the users' progress pointing at them — survive a re-run.
// Requires .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

const fs   = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, '');
  });
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const API = `${SUPABASE_URL}/rest/v1/reformulaciones_exercises?on_conflict=rule_id,source`;
const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Prefer': 'resolution=ignore-duplicates,return=representation',
};
const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const BATCH = 200;

(async () => {
  const only = process.argv[2]?.toLowerCase();
  if (only && !LEVELS.includes(only)) {
    console.error(`Unknown level "${only}". Use one of: ${LEVELS.join(', ')}`);
    process.exit(1);
  }

  const bank = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'reformulaciones-data.json'), 'utf8'));
  const rows = [];
  for (const [ruleId, exercises] of Object.entries(bank)) {
    const level = ruleId.split('-')[0];
    if (only && level !== only) continue;
    for (const e of exercises) {
      rows.push({
        level: level.toUpperCase(),
        rule_id: ruleId,
        source: e.source,
        instruction: e.instruction,
        solutions: e.solutions,
        explanation: e.explanation,
      });
    }
  }

  // PostgREST rejects a batch that hits ON CONFLICT twice on the same key, so dedupe locally first.
  const unique = [...new Map(rows.map(r => [`${r.rule_id}|${r.source}`, r])).values()];
  if (unique.length < rows.length) console.log(`Skipping ${rows.length - unique.length} duplicate(s) inside the JSON`);

  let inserted = 0;
  for (let i = 0; i < unique.length; i += BATCH) {
    const res = await fetch(API, { method: 'POST', headers: HEADERS, body: JSON.stringify(unique.slice(i, i + BATCH)) });
    if (!res.ok) throw new Error(`INSERT batch ${i / BATCH}: HTTP ${res.status}: ${await res.text()}`);
    inserted += (await res.json()).length;
  }
  console.log(`Done. ${inserted} inserted, ${unique.length - inserted} already present (${unique.length} total).`);
})().catch(err => { console.error(err.message); process.exit(1); });
