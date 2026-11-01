#!/usr/bin/env node
// Generates reformulaciones-data.json: a bank of reformulation exercises
// per grammar rule in grammar-data.js, using GPT-4o.
// Usage: node scripts/generate-reformulaciones.js [a1|a2|b1|b2|c1|c2] [rule-id] [--force] [--dry-run]
// Without argument: generates all levels. Existing rules in the output file
// are skipped unless a specific rule-id or --force is passed (forces regeneration).
// --dry-run prints the prompts without calling the API.
// Levels present in reformulaciones-guias.js use the guided prompt: fewer,
// harder exercises shaped by the teacher's per-rule guide, plus a review pass.

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
new Function('window', fs.readFileSync(path.join(ROOT, 'reformulaciones-guias.js'), 'utf8'))(windowShim);
const GUIAS = windowShim.REFORMULACIONES_GUIAS || {};
// Guided prompt builders live in api/_reformulaciones.js (ESM), shared with generate-reformulaciones.
let buildGuidedPrompt, buildReviewPrompt, filterCandidates, applyReview, isWellFormed, GENERATION_SYSTEM;

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
        { role: 'system', content: GENERATION_SYSTEM },
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

async function generateGuidedRule(rule, nivel, cfg) {
  const data = await callGPT(buildGuidedPrompt(rule, nivel, cfg));
  if (!Array.isArray(data.exercises)) throw new Error(`${rule.id}: missing exercises[]`);
  const wellFormed = filterCandidates(data.exercises, cfg, [], (e, why) => console.log(`      ✗ ${why}: ${e.source}`));

  const { reviews } = await callGPT(buildReviewPrompt(rule, nivel, cfg, wellFormed));
  if (!Array.isArray(reviews)) throw new Error(`${rule.id}: review returned no reviews[]`);
  const { kept, passed } = applyReview(wellFormed, reviews, cfg, (e, why, i) => console.log(`      ✗ dropped #${i}: ${why} — ${e.source}`));
  if (kept.length < Math.ceil(cfg.ejercicios * 0.6))
    throw new Error(`${rule.id}: only ${kept.length} valid exercises after review`);
  console.log(`    ${rule.id} (${rule.titulo}): ${kept.length} kept (${passed}/${wellFormed.length} passed review)`);
  return kept;
}

async function generateRule(rule, nivel) {
  if (GUIAS[nivel]) return generateGuidedRule(rule, nivel, GUIAS[nivel]);
  const data = await callGPT(buildPrompt(rule, nivel));
  if (!Array.isArray(data.exercises)) throw new Error(`${rule.id}: missing exercises[]`);
  const valid = data.exercises.filter(isWellFormed);
  if (valid.length < EXERCISES_PER_RULE * 0.6)
    throw new Error(`${rule.id}: only ${valid.length} valid exercises`);
  console.log(`    ${rule.id} (${rule.titulo}): ${valid.length} exercises`);
  return valid;
}

async function main() {
  ({ buildGuidedPrompt, buildReviewPrompt, filterCandidates, applyReview, isWellFormed, GENERATION_SYSTEM } =
    await import('../api/_reformulaciones.js'));
  const args     = process.argv.slice(2);
  const force    = args.includes('--force');
  const dryRun   = args.includes('--dry-run');
  const [rawLevel, rawRule] = args.filter(a => !a.startsWith('--'));
  const argLevel = rawLevel?.toUpperCase();
  const argRule  = rawRule?.toLowerCase();
  if (argLevel && !LEVELS.includes(argLevel)) {
    console.error(`Unknown level "${rawLevel}". Valid: ${LEVELS.join(', ')}`); process.exit(1);
  }
  if (!dryRun && !API_KEY) { console.error('Missing OPENAI_API_KEY in .env.local'); process.exit(1); }

  let bank = {};
  try { bank = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch {}

  const levels = argLevel ? [argLevel] : LEVELS;
  const failed = [];
  for (const nivel of levels) {
    console.log(`\n=== ${nivel} ===`);
    for (const rule of GRAMMAR_DATA[nivel] || []) {
      if (argRule && rule.id !== argRule) continue;
      if (dryRun) {
        const prompt = GUIAS[nivel] ? buildGuidedPrompt(rule, nivel, GUIAS[nivel]) : buildPrompt(rule, nivel);
        console.log(`\n----- ${rule.id} -----\n${prompt}`);
        continue;
      }
      if (!argRule && !force && Array.isArray(bank[rule.id]) && bank[rule.id].length > 0) {
        console.log(`    ${rule.id}: already in bank, skipping`);
        continue;
      }
      try {
        bank[rule.id] = await generateRule(rule, nivel);
        fs.writeFileSync(OUT, JSON.stringify(bank, null, 2), 'utf8');
      } catch (err) {
        console.error(`    ✗ ${err.message}`);
        failed.push(rule.id);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (dryRun) return;
  const totalRules = Object.keys(bank).length;
  const totalEx = Object.values(bank).reduce((s, a) => s + a.length, 0);
  console.log(`\n✓ Saved reformulaciones-data.json (${totalRules} rules, ${totalEx} exercises)`);
  if (failed.length) { console.error(`✗ Failed (kept previous bank entry): ${failed.join(', ')}`); process.exit(1); }
}

main().catch(err => { console.error('\n✗', err.message); process.exit(1); });
