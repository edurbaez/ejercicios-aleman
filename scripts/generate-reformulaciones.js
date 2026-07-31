#!/usr/bin/env node
// Generates reformulaciones-data.json: a bank of reformulation exercises
// per grammar rule in grammar-data.js, using GPT-4o.
// Usage: node scripts/generate-reformulaciones.js [a1|a2|b1|b2|c1|c2] [rule-id]
// Without argument: generates all levels. Existing rules in the output file
// are skipped unless a specific rule-id is passed (which forces regeneration).

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
const OUT   = path.join(ROOT, 'reformulaciones-data.json');
const EXERCISES_PER_RULE = 20;

// grammar-data.js is a loader shim that document.writes the per-level scripts
// (browser-only); load each grammar-data-{level}.js directly here instead.
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const windowShim = { GRAMMAR_DATA: {} };
for (const lvl of LEVELS) {
  const src = fs.readFileSync(path.join(ROOT, `grammar-data-${lvl.toLowerCase()}.js`), 'utf8');
  new Function('window', src)(windowShim);
}
const GRAMMAR_DATA = windowShim.GRAMMAR_DATA;

async function callGPT(prompt, attempt = 0) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.4,
      max_tokens: 8192,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a certified German language teacher creating exam-style transformation exercises (Umformungen). Return ONLY valid JSON. No markdown. No commentary.' },
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
    console.log('    (response truncated, retrying...)');
    await new Promise(r => setTimeout(r, 2000));
    return callGPT(prompt, attempt + 1);
  }
  try { return JSON.parse(choice.message.content); }
  catch (e) {
    if (attempt < 2) { await new Promise(r => setTimeout(r, 2000)); return callGPT(prompt, attempt + 1); }
    throw new Error(`JSON parse failed: ${e.message}\nRaw: ${choice.message.content.slice(0, 200)}`);
  }
}

function buildPrompt(rule, nivel) {
  const ejemplos = (rule.ejemplos || []).map(e => `  • ${e.de} — ${e.es}`).join('\n');
  return `Create ${EXERCISES_PER_RULE} German sentence-transformation exercises (Umformungsübungen) for this grammar rule.

Grammar rule (CEFR ${nivel}):
TITLE: ${rule.titulo} (${rule.subtitulo || ''})
RULE: ${rule.regla_base || ''}
TIP: ${rule.tip || ''}
EXAMPLES:
${ejemplos}

Each exercise MUST have:
- "source": a German sentence (8–15 words, CEFR ${nivel}) that does NOT use the target structure — it uses an alternative form instead (e.g. rule = Perfekt → sentence in Präsens; rule = Passiv → active sentence; rule = connector → two separate main clauses; rule = declension/articles → sentence with a gap or a form to change).
- "instruction": a short instruction in SPANISH stating exactly which transformation to apply (e.g. "Reescribe la frase en Perfekt", "Une las dos frases con weil").
- "solutions": an array of ALL valid reformulations (1–4 German sentences). Include natural word-order variants when they are equally correct. The first solution is the canonical one.
- "explanation": 1–2 sentences in SPANISH explaining how the rule applies in this exercise.

Rules:
- The transformation must strictly REQUIRE applying the target rule — it cannot be solved without it.
- Vary vocabulary and topics across the ${EXERCISES_PER_RULE} exercises; increase difficulty gradually.
- All German must be appropriate for CEFR ${nivel}.

Return this exact JSON:
{ "exercises": [ { "source": "...", "instruction": "...", "solutions": ["..."], "explanation": "..." } ] }`;
}

async function generateRule(rule, nivel) {
  const data = await callGPT(buildPrompt(rule, nivel));
  if (!Array.isArray(data.exercises)) throw new Error(`${rule.id}: missing exercises[]`);
  const valid = data.exercises.filter(e =>
    e && typeof e.source === 'string' && typeof e.instruction === 'string' &&
    Array.isArray(e.solutions) && e.solutions.length > 0 && typeof e.explanation === 'string'
  );
  if (valid.length < EXERCISES_PER_RULE * 0.6)
    throw new Error(`${rule.id}: only ${valid.length} valid exercises`);
  console.log(`    ${rule.id} (${rule.titulo}): ${valid.length} exercises`);
  return valid;
}

async function main() {
  const argLevel = process.argv[2]?.toUpperCase();
  const argRule  = process.argv[3]?.toLowerCase();
  if (argLevel && !LEVELS.includes(argLevel)) {
    console.error(`Unknown level "${process.argv[2]}". Valid: ${LEVELS.join(', ')}`); process.exit(1);
  }

  let bank = {};
  try { bank = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch {}

  const levels = argLevel ? [argLevel] : LEVELS;
  for (const nivel of levels) {
    console.log(`\n=== ${nivel} ===`);
    for (const rule of GRAMMAR_DATA[nivel] || []) {
      if (argRule && rule.id !== argRule) continue;
      if (!argRule && Array.isArray(bank[rule.id]) && bank[rule.id].length > 0) {
        console.log(`    ${rule.id}: already in bank, skipping`);
        continue;
      }
      bank[rule.id] = await generateRule(rule, nivel);
      fs.writeFileSync(OUT, JSON.stringify(bank, null, 2), 'utf8');
      await new Promise(r => setTimeout(r, 500));
    }
  }

  const totalRules = Object.keys(bank).length;
  const totalEx = Object.values(bank).reduce((s, a) => s + a.length, 0);
  console.log(`\n✓ Saved reformulaciones-data.json (${totalRules} rules, ${totalEx} exercises)`);
}

main().catch(err => { console.error('\n✗', err.message); process.exit(1); });
