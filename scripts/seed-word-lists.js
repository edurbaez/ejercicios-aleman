#!/usr/bin/env node
// Inserts built-in vocabulary lists into Supabase as system rows.
// Run once after applying the migration:
//   node scripts/seed-word-lists.js
// Requires .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.

const fs   = require('fs');
const path = require('path');

// Load .env.local manually (no dotenv dependency needed)
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

const API = `${SUPABASE_URL}/rest/v1/word_lists`;
const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
};

// word_lists_sys_name_idx is a PARTIAL unique index (app_id, name) WHERE is_system = true,
// so PostgREST's `Prefer: resolution=merge-duplicates` can't infer it as an ON CONFLICT
// target (it falls back to the id PK, which never collides, then hits a plain insert
// conflict). Upsert manually instead: PATCH by filter, insert only if nothing matched.
async function upsertRow(row) {
  const filterUrl = `${API}?app_id=eq.${encodeURIComponent(row.app_id)}&name=eq.${encodeURIComponent(row.name)}&is_system=eq.true`;
  const patchRes = await fetch(filterUrl, {
    method: 'PATCH',
    headers: { ...HEADERS, 'Prefer': 'return=representation' },
    body: JSON.stringify({ words: row.words }),
  });
  if (!patchRes.ok) throw new Error(`PATCH ${row.app_id}/${row.name}: HTTP ${patchRes.status}: ${await patchRes.text()}`);
  const updated = await patchRes.json();
  if (updated.length > 0) return 'updated';

  const insertRes = await fetch(API, {
    method: 'POST',
    headers: { ...HEADERS, 'Prefer': 'return=minimal' },
    body: JSON.stringify([row]),
  });
  if (!insertRes.ok) throw new Error(`INSERT ${row.app_id}/${row.name}: HTTP ${insertRes.status}: ${await insertRes.text()}`);
  return 'inserted';
}

async function seedFile(filePath, appId) {
  const raw  = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  const rows = Object.entries(data).map(([name, words]) => ({
    app_id:    appId,
    name,
    is_system: true,
    words:     { de: words.de, es: words.es },
    user_id:   null,
  }));

  for (const row of rows) {
    const result = await upsertRow(row);
    console.log(`  ${appId}/${row.name}: ${result} (${row.words.de.length} words)`);
  }
}

(async () => {
  const root = path.join(__dirname, '..');
  const levels = [
    { file: 'DataA1.json', appId: 'a1', label: 'A1' },
    { file: 'DataA2.json', appId: 'a2', label: 'A2' },
    { file: 'DataB1.json', appId: 'b1', label: 'B1' },
    { file: 'DataB2.json', appId: 'b2', label: 'B2' },
    { file: 'DataC1.json', appId: 'c1', label: 'C1' },
    { file: 'DataC2.json', appId: 'c2', label: 'C2' },
  ];
  for (const { file, appId, label } of levels) {
    const filepath = path.join(root, file);
    if (!fs.existsSync(filepath)) { console.warn(`Skipping ${label}: ${file} not found`); continue; }
    console.log(`Seeding ${label}...`);
    await seedFile(filepath, appId);
  }
  console.log('Done.');
})().catch(err => { console.error(err.message); process.exit(1); });
