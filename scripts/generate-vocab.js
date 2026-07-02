#!/usr/bin/env node
// Generates German vocabulary JSON files per CEFR level using GPT-4o.
// Each category is generated in a separate API call (~100-150 words each = safe token size).
// Usage: node scripts/generate-vocab.js [a1|a2|b1|b2|c1|c2]
// Without argument: generates all levels A1→C2 in order.

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

const LEVEL_DESC = {
  a1: 'A1 (absolute beginner): greetings, numbers 1-100, days/months, colors, family, rooms, body parts. Core verbs: sein, haben, kommen, gehen, machen, essen, trinken, wohnen, heißen, sprechen, sehen, kaufen, schlafen, lesen, spielen, wollen, können, müssen.',
  a2: 'A2 (elementary): daily routines, shopping, transport, weather, holidays, school, job basics. Modal verbs in use. More irregular verbs. Perfekt tense vocabulary. Common time expressions.',
  b1: 'B1 (intermediate): travel, work, health, environment, media, opinions. Reflexive verbs, trennbare Verben, two-way prepositions, Konjunktiv II basics (würde, wäre, hätte), passive constructions intro.',
  b2: 'B2 (upper-intermediate): politics, economics, culture, science, society, technology. Konjunktiv I (reported speech), complex passive, extended participial phrases, idiomatic expressions, register variation.',
  c1: 'C1 (advanced): academic, professional, research, formal writing contexts. Subjunctive nuances, stylistic variation, complex syntax, nominalization, sophisticated collocations, varied registers.',
  c2: 'C2 (mastery): literary language, rare vocabulary, subtle distinctions, proverbs, technical terms across disciplines, high-precision nuanced translations.',
};

const CAT_SPECS = {
  verbos:      { count: 120, desc: 'verbs in infinitive form' },
  sustantivos: { count: 150, desc: 'nouns WITH article prefix (der/die/das Noun)' },
  adjetivos:   { count: 100, desc: 'adjectives and adverbs' },
  expresiones: { count: 100, desc: 'fixed expressions, connectors, adverbs, idioms, fixed phrases' },
};

function collectWords(data) {
  const words = new Set();
  for (const cat of Object.values(data)) {
    if (Array.isArray(cat.de)) {
      cat.de.forEach(w => words.add(w.toLowerCase().replace(/^(der|die|das)\s+/i, '').trim()));
    }
  }
  return words;
}

function collectWordsFromFile(filepath) {
  try { return collectWords(JSON.parse(fs.readFileSync(filepath, 'utf8'))); } catch { return new Set(); }
}

async function callGPT(prompt, attempt = 0) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
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
    console.log(`    (response truncated, retrying...)`);
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

async function generateCategory(catName, spec, level, excludeWords) {
  const excludeStr = excludeWords.size > 0
    ? `\n\nDo NOT include any of these (already used in lower levels or prior categories):\n${[...excludeWords].slice(0, 800).join(', ')}`
    : '';

  const prompt = `Generate a German vocabulary list for CEFR ${level.toUpperCase()} — category: ${catName} (${spec.desc}).

Level context: ${LEVEL_DESC[level]}

Generate exactly ${spec.count} entries.

Rules:
- All ${spec.count} entries must be appropriate for ${level.toUpperCase()} level
- Spanish translations must be accurate and natural
${catName === 'sustantivos' ? '- Every noun MUST start with der/die/das: "der Baum", "die Frau", "das Kind"' : ''}
${catName === 'verbos' ? '- Verbs in infinitive only: "laufen", "sprechen", "arbeiten"' : ''}
- Group semantically related words together${excludeStr}

Return this exact JSON:
{ "de": [exactly ${spec.count} strings], "es": [exactly ${spec.count} strings] }`;

  const data = await callGPT(prompt);
  if (!Array.isArray(data.de) || !Array.isArray(data.es))
    throw new Error(`${catName}: missing de[] or es[]`);
  if (data.de.length !== data.es.length) {
    const min = Math.min(data.de.length, data.es.length);
    console.log(`    ${catName}: trimming mismatch ${data.de.length}/${data.es.length} → ${min}`);
    data.de = data.de.slice(0, min);
    data.es = data.es.slice(0, min);
  }
  console.log(`    ${catName}: ${data.de.length} words`);
  return data;
}

async function generateEsenciales(level, allData, excludeWords) {
  const sample = Object.entries(allData)
    .map(([cat, d]) => d.de.slice(0, 20).map((w, i) => `${w} (${d.es[i]})`).join(', '))
    .join('; ');

  const prompt = `From the following German vocabulary at ${level.toUpperCase()} level, select the 50 most important and frequently used words.

Available words: ${sample.slice(0, 3000)}

Return the 50 most essential ones for a learner at this level.
Return this exact JSON: { "de": [exactly 50 strings], "es": [exactly 50 strings] }`;

  const data = await callGPT(prompt);
  if (data.de.length !== data.es.length) {
    const min = Math.min(data.de.length, data.es.length);
    data.de = data.de.slice(0, min); data.es = data.es.slice(0, min);
  }
  if (data.de.length < 40 || data.de.length > 60)
    throw new Error(`esenciales: expected ~50, got ${data.de.length}`);
  console.log(`    esenciales: 50 words`);
  return data;
}

async function generateLevel(level) {
  const levelIdx = LEVELS.indexOf(level);

  // Build exclusion list from all lower levels
  const excluded = new Set();
  for (let i = 0; i < levelIdx; i++) {
    collectWordsFromFile(path.join(ROOT, FILES[LEVELS[i]])).forEach(w => excluded.add(w));
  }

  const result = {};

  for (const [catName, spec] of Object.entries(CAT_SPECS)) {
    const catData = await generateCategory(catName, spec, level, excluded);
    result[catName] = catData;
    // Add newly generated words to exclusion for next categories in this level
    catData.de.forEach(w => excluded.add(w.toLowerCase().replace(/^(der|die|das)\s+/i, '').trim()));
    await new Promise(r => setTimeout(r, 500)); // brief pause between calls
  }

  result.esenciales = await generateEsenciales(level, result, excluded);

  // Reorder: esenciales first
  return {
    esenciales:  result.esenciales,
    verbos:      result.verbos,
    sustantivos: result.sustantivos,
    adjetivos:   result.adjetivos,
    expresiones: result.expresiones,
  };
}

async function main() {
  const target = process.argv[2]?.toLowerCase();
  if (target && !LEVELS.includes(target)) {
    console.error(`Unknown level "${target}". Valid: ${LEVELS.join(', ')}`); process.exit(1);
  }
  const toGenerate = target ? [target] : LEVELS;

  for (const level of toGenerate) {
    console.log(`\n=== ${level.toUpperCase()} ===`);
    const data = await generateLevel(level);
    const outPath = path.join(ROOT, FILES[level]);
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
    const total = ['verbos', 'sustantivos', 'adjetivos', 'expresiones'].reduce((s, k) => s + data[k].de.length, 0);
    console.log(`  ✓ Saved ${FILES[level]} (${total} words + 50 esenciales)`);
  }

  console.log('\nAll done.');
}

main().catch(err => { console.error('\n✗', err.message); process.exit(1); });
