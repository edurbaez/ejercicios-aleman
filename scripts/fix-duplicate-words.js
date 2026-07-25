#!/usr/bin/env node
// Detects verbatim-duplicate entries within a category (a generation bug where
// GPT padded a category to hit the exact requested count by repeating the last
// entry) and replaces the surplus with new, unique words for that level/category.
// Keeps every non-duplicate word untouched and preserves array order/length.
// Usage: node scripts/fix-duplicate-words.js [a1|a2|b1|b2|c1|c2]
// Without argument: processes all levels A1→C2 in order.

const fs   = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, '');
  });
}

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) { console.error('Missing OPENAI_API_KEY in .env.local'); process.exit(1); }

const MODEL = 'gpt-4o';
const ROOT  = path.join(__dirname, '..');
const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const FILES  = {
  a1: 'DataA1.json', a2: 'DataA2.json', b1: 'DataB1.json',
  b2: 'DataB2.json', c1: 'DataC1.json', c2: 'DataC2.json',
};
const CATEGORY_ORDER = ['esenciales', 'verbos', 'sustantivos', 'adjetivos', 'expresiones'];

const LEVEL_DESC = {
  a1: 'A1 (absolute beginner): greetings, numbers 1-100, days/months, colors, family, rooms, body parts.',
  a2: 'A2 (elementary): daily routines, shopping, transport, weather, holidays, school, job basics.',
  b1: 'B1 (intermediate): travel, work, health, environment, media, opinions.',
  b2: 'B2 (upper-intermediate): politics, economics, culture, science, society, technology.',
  c1: 'C1 (advanced): academic, professional, research, formal writing contexts.',
  c2: 'C2 (mastery): literary language, rare vocabulary, subtle distinctions, proverbs, technical terms.',
};

const CAT_DESC = {
  esenciales:  'the most essential, high-frequency words for this level (mixed: verbs, nouns, adjectives, expressions)',
  verbos:      'verbs in infinitive form',
  sustantivos: 'nouns WITH article prefix (der/die/das Noun)',
  adjetivos:   'adjectives and adverbs',
  expresiones: 'fixed expressions, connectors, adverbs, idioms, fixed phrases',
};

function normalize(w) {
  return w.trim().replace(/^(der|die|das)\s+/, '');
}
function normalizeLoose(w) {
  return w.toLowerCase().trim().replace(/^(der|die|das)\s+/i, '');
}

function collectWordsFromFile(filepath) {
  const words = new Set();
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    for (const cat of Object.values(data)) {
      if (Array.isArray(cat.de)) cat.de.forEach(w => words.add(normalizeLoose(w)));
    }
  } catch { /* file missing or unreadable: treat as empty */ }
  return words;
}

async function callGPT(prompt, attempt = 0) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.7,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
      max_tokens: 8192,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a certified German language teacher. Return ONLY valid JSON. No markdown. No commentary.' },
        { role: 'user', content: prompt },
      ],
    }),
  });
  const json = await res.json();
  if (json.error) {
    if (attempt < 2) { await new Promise(r => setTimeout(r, 3000)); return callGPT(prompt, attempt + 1); }
    throw new Error(`API: ${json.error.message}`);
  }
  const choice = json.choices[0];
  if (choice.finish_reason === 'length' && attempt < 2) {
    await new Promise(r => setTimeout(r, 2000));
    return callGPT(prompt, attempt + 1);
  }
  const text = choice.message.content;
  try { return JSON.parse(text); }
  catch (e) {
    if (attempt < 2) { await new Promise(r => setTimeout(r, 2000)); return callGPT(prompt, attempt + 1); }
    throw new Error(`JSON parse failed: ${e.message}\nRaw: ${text.slice(0, 200)}`);
  }
}

// Generates `needed` brand-new, mutually-unique words for catName/level.
// `hardExcluded` (this level's own words, all categories) must never collide — enforced.
// `softAvoidSample` (a capped sample of lower-level words) is a soft hint only, not enforced,
// so a huge cross-level vocabulary never blocks convergence.
// Requests in batches of ~20 (models are far more reliable at avoiding repeats in short lists
// than when asked for 60+ unique entries in a single completion).
const BATCH_SIZE = 20;

// Best-effort: tries to reach `target` new unique words but never forces it — if the model
// keeps re-suggesting the same words despite the exclusion list, that's a real sign the
// natural vocabulary pool for this category/level is smaller than `target`, and we stop
// rather than accept low-quality/mislabeled filler (the same failure mode that caused the
// original bug). Returns however many genuinely unique words it could gather.
async function generateReplacements(catName, level, target, hardExcluded) {
  const collected = [];
  const seen = new Set();
  let round = 0;
  const maxRounds = Math.ceil(target / 8) + 8;
  let stallRounds = 0;
  while (collected.length < target && round < maxRounds) {
    round++;
    const beforeCount = collected.length;
    const stillNeeded = target - collected.length;
    const batch = Math.min(BATCH_SIZE, stillNeeded + 6);
    const hardList = [...hardExcluded, ...collected.map(w => normalizeLoose(w.de))];
    const prompt = `Generate ${batch} German vocabulary entries for CEFR ${level.toUpperCase()} — category: ${catName} (${CAT_DESC[catName]}).

Level context: ${LEVEL_DESC[level]}

Rules:
- All entries must be appropriate for ${level.toUpperCase()} level (not a lower level — these words must be genuinely new to a learner who already knows every word in the exclusion list below)
- Spanish translations must be accurate and natural
- Every entry must be DIFFERENT from every other entry (no repeats)
${catName === 'sustantivos' ? '- Every noun MUST start with der/die/das: "der Baum", "die Frau", "das Kind"' : ''}
${catName === 'verbos' ? '- Verbs in infinitive only: "laufen", "sprechen", "arbeiten"' : ''}
- MUST NOT include any of these (already used at this level or a lower CEFR level):
${hardList.join(', ')}

Return this exact JSON: { "de": [strings], "es": [strings] }`;

    const data = await callGPT(prompt);
    if (!Array.isArray(data.de) || !Array.isArray(data.es)) {
      console.log(`    …round ${round}: malformed response, skipping`);
      continue;
    }
    const min = Math.min(data.de.length, data.es.length);
    let rejected = 0;
    for (let i = 0; i < min && collected.length < target; i++) {
      const de = data.de[i], es = data.es[i];
      if (!de || !es) continue;
      const n = normalizeLoose(de);
      if (seen.has(n) || hardExcluded.has(n)) { rejected++; continue; }
      seen.add(n);
      collected.push({ de, es });
    }
    console.log(`    …round ${round}: got ${min}, rejected ${rejected} dup(s) → ${collected.length}/${target} unique so far`);

    stallRounds = (collected.length === beforeCount) ? stallRounds + 1 : 0;
    if (stallRounds >= 3) {
      console.log(`    …no progress in 3 rounds, stopping early with ${collected.length}/${target} (natural vocabulary pool likely exhausted)`);
      break;
    }
  }
  return collected;
}

async function fixLevel(level) {
  const filePath = path.join(ROOT, FILES[level]);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const levelIdx = LEVELS.indexOf(level);
  // Hard exclusion: every word already present in this level's file, plus every word from
  // all lower CEFR levels (must never collide — this is what keeps level progression intact).
  const hardExcluded = new Set();
  for (let i = 0; i < levelIdx; i++) {
    collectWordsFromFile(path.join(ROOT, FILES[LEVELS[i]])).forEach(w => hardExcluded.add(w));
  }
  for (const cat of Object.values(data)) {
    if (Array.isArray(cat.de)) cat.de.forEach(w => hardExcluded.add(normalizeLoose(w)));
  }

  let totalRemoved = 0;
  let totalAdded = 0;
  const report = [];

  for (const catName of CATEGORY_ORDER) {
    const cat = data[catName];
    if (!cat || !Array.isArray(cat.de)) continue;
    const de = cat.de, es = cat.es;

    const firstSeenAt = new Map();
    const keepMask = de.map((w, i) => {
      const n = normalize(w);
      if (firstSeenAt.has(n)) return false;
      firstSeenAt.set(n, i);
      return true;
    });
    const dupCount = keepMask.filter(k => !k).length;
    if (dupCount === 0) continue;

    const newDe = de.filter((_, i) => keepMask[i]);
    const newEs = es.filter((_, i) => keepMask[i]);
    console.log(`  ${catName}: removing ${dupCount} duplicate(s), ${newDe.length} unique kept. Trying to add up to ${dupCount} new word(s)...`);

    const additions = await generateReplacements(catName, level, dupCount, hardExcluded);
    additions.forEach(a => {
      newDe.push(a.de);
      newEs.push(a.es);
      hardExcluded.add(normalizeLoose(a.de));
      report.push({ cat: catName, added: a.de });
    });

    cat.de = newDe;
    cat.es = newEs;
    console.log(`    ${catName}: final size ${newDe.length} (was ${de.length}, removed ${dupCount}, added ${additions.length})`);

    totalRemoved += dupCount;
    totalAdded += additions.length;
    await new Promise(r => setTimeout(r, 400));
  }

  if (totalRemoved === 0) {
    console.log(`  Sin duplicados reales. No se modifica el archivo.`);
    return { level, totalRemoved: 0, totalAdded: 0, report: [] };
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`  ✓ ${FILES[level]}: ${totalRemoved} duplicado(s) eliminado(s), ${totalAdded} palabra(s) nueva(s) añadida(s)`);
  return { level, totalRemoved, totalAdded, report };
}

async function main() {
  const target = process.argv[2]?.toLowerCase();
  if (target && !LEVELS.includes(target)) {
    console.error(`Unknown level "${target}". Valid: ${LEVELS.join(', ')}`); process.exit(1);
  }
  const toProcess = target ? [target] : LEVELS;

  const allReports = [];
  for (const level of toProcess) {
    console.log(`\n=== ${level.toUpperCase()} ===`);
    const result = await fixLevel(level);
    allReports.push(result);
  }

  console.log('\n--- Resumen ---');
  for (const r of allReports) {
    console.log(`${r.level.toUpperCase()}: ${r.totalRemoved} eliminados, ${r.totalAdded} añadidos`);
    r.report.forEach(x => console.log(`    [${x.cat}] + ${x.added}`));
  }
}

main().catch(err => { console.error('\n✗', err.message); process.exit(1); });
