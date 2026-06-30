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
  'Prefer': 'resolution=merge-duplicates,return=minimal',
};

async function upsertBatch(rows) {
  const res = await fetch(API, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
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

  // Insert in chunks of 50 to stay under payload limits
  const CHUNK = 50;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    await upsertBatch(chunk);
    console.log(`  ${appId}: inserted ${Math.min(i + CHUNK, rows.length)}/${rows.length} lists`);
  }
}

(async () => {
  const root = path.join(__dirname, '..');
  console.log('Seeding B2 lists...');
  await seedFile(path.join(root, 'DATA.json'), 'b2');
  console.log('Seeding B1 lists...');
  await seedFile(path.join(root, 'DataB1.json'), 'b1');
  console.log('Done.');
})().catch(err => { console.error(err.message); process.exit(1); });
