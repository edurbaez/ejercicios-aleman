#!/usr/bin/env node
// Generates reformulaciones-combos-data.json: a bank of reformulation exercises
// per curated combo in reformulaciones-combos.js, where every exercise forces
// applying 2-3 grammar rules at once. Same pattern as generate-reformulaciones.js.
// Usage: node scripts/generate-reformulaciones-combos.js [a1|…|c2] [combo-id]
// Without argument: all levels. Existing combos in the output file are skipped
// unless a specific combo-id (e.g. b1-03+b1-05) is passed, which forces regeneration.

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
const OUT   = path.join(ROOT, 'reformulaciones-combos-data.json');
const EXERCISES_PER_COMBO = 12;

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const windowShim = { GRAMMAR_DATA: {} };
for (const lvl of LEVELS) {
  const src = fs.readFileSync(path.join(ROOT, `grammar-data-${lvl.toLowerCase()}.js`), 'utf8');
  new Function('window', src)(windowShim);
}
new Function('window', fs.readFileSync(path.join(ROOT, 'reformulaciones-combos.js'), 'utf8'))(windowShim);
const COMBOS = windowShim.REFORMULACIONES_COMBOS;

const RULES = new Map();
for (const lvl of LEVELS)
  for (const r of windowShim.GRAMMAR_DATA[lvl] || []) RULES.set(r.id, { ...r, nivel: lvl });

// Catalog sanity (plan §5.2): every id must exist, and rules may be at most one
// CEFR level apart, with the combo filed under the highest of them.
function checkCatalog() {
  const errors = [];
  for (const [nivel, combos] of Object.entries(COMBOS)) {
    for (const c of combos) {
      const missing = c.ruleIds.filter(id => !RULES.has(id));
      if (missing.length) { errors.push(`${c.id}: unknown rule ids ${missing.join(', ')}`); continue; }
      const idx = c.ruleIds.map(id => LEVELS.indexOf(RULES.get(id).nivel));
      if (Math.max(...idx) - Math.min(...idx) > 1) errors.push(`${c.id}: rules more than one level apart`);
      if (LEVELS[Math.max(...idx)] !== nivel) errors.push(`${c.id}: filed under ${nivel}, highest rule is ${LEVELS[Math.max(...idx)]}`);
      if (c.ruleIds.length < 2 || c.ruleIds.length > 3) errors.push(`${c.id}: combos need 2-3 rules`);
    }
  }
  if (errors.length) { console.error('Catalog errors:\n  ' + errors.join('\n  ')); process.exit(1); }
}

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

function buildPrompt(combo) {
  const rules = combo.ruleIds.map(id => RULES.get(id));
  const rulesBlock = rules.map((r, i) => {
    const ejemplos = (r.ejemplos || []).slice(0, 3).map(e => `    • ${e.de} — ${e.es}`).join('\n');
    return `RULE ${i + 1} — ${r.id} (CEFR ${r.nivel}): ${r.titulo} (${r.subtitulo || ''})
  RULE: ${r.regla_base || ''}
  TIP: ${r.tip || ''}
  EXAMPLES:
${ejemplos}`;
  }).join('\n\n');

  return `Create ${EXERCISES_PER_COMBO} German sentence-transformation exercises (Umformungsübungen) at CEFR ${combo.nivel}, titled "${combo.titulo}".

Every exercise must force the student to apply ALL of these grammar rules at once, in the same item — none of them may be solvable independently of the others:

${rulesBlock}
${combo.guia ? `\nEXERCISE SHAPE (follow it closely — it defines what a good item looks like for this combo):\n${combo.guia}\n` : ''}
Each exercise MUST have:
- "source": the German starting material (one to three short sentences, 8–25 words in total, CEFR ${combo.nivel}) where NONE of the rules above is applied yet. Use the alternative form each rule transforms from (e.g. Präsens instead of Perfekt, main clauses instead of a subordinate clause, active instead of passive, indicative instead of Konjunktiv). Not a single word of the source may already show a target structure (no würde/wäre/hätte when a rule is Konjunktiv II, no relative pronoun when a rule is relative clauses, and so on). When a rule is about a form that cannot be "un-applied" (declension, articles, possessives, pronouns), give it in parentheses in the right spot in its base form: the undeclined adjective ("(neu)"), or the nominative form in the noun's REAL gender ("(die Mannschaft)", "(mein Bruder)", "(meine Mutter)") — never a masculine form in front of a feminine or neuter noun. Only forms governed by the rules above may be in parentheses; do not add cases, prepositions or structures that belong to other rules.
- "instruction": a short instruction, always in SPANISH, naming every transformation to apply, e.g. "Une las frases con un pronombre relativo y declina el adjetivo entre paréntesis".
- "solutions": an array of ALL valid results (1–4 German sentences). Include natural word-order variants when they are equally correct. The first one is canonical.
- "explanation": 1–3 sentences in SPANISH explaining how EACH rule applies in this exercise — mention every rule.

Rules:
- The result must read as one real, coherent German idea — no textbook-artificial sentences.
- Each transformation must have one reasonable answer given the context (no ambiguity about which connector, tense or case is intended — make it explicit in the instruction if needed).
- If a rule admits variants (connectors, tenses, cases, prepositions), rotate them across the ${EXERCISES_PER_COMBO} exercises. Vary vocabulary and topics; increase difficulty gradually.
- All German must be appropriate for CEFR ${combo.nivel}.

Before returning, check each exercise: the source applies none of the rules, every rule is really needed to reach the solutions, and the solutions are grammatically correct. Drop and replace any exercise that fails.

Return this exact JSON:
{ "exercises": [ { "source": "...", "instruction": "...", "solutions": ["..."], "explanation": "..." } ] }`;
}

// Second, independent pass: the generator's own self-check is not enough — the
// pilot let through sources that already applied a rule and answers whose main
// clause was invented. A fresh call judges each item and can add valid variants.
function buildReviewPrompt(combo, exercises) {
  const rules = combo.ruleIds.map(id => `- ${RULES.get(id).titulo}: ${RULES.get(id).regla_base || ''}`).join('\n');
  const items = exercises.map((e, i) =>
    `${i}. SOURCE: ${e.source}\n   INSTRUCTION: ${e.instruction}\n   SOLUTIONS: ${e.solutions.join(' || ')}`
  ).join('\n');
  return `You are reviewing German transformation exercises (CEFR ${combo.nivel}) that must force applying ALL of these rules at once:
${rules}

For each item decide "ok": true only if ALL of these hold:
1. The source is grammatical German and applies none of the target rules yet. A base form given in parentheses (nominative, undeclined adjective) is fine even when it happens to coincide with the target form (e.g. feminine/neuter/plural nominative = accusative) — the student still has to decide; reject it only if the nominative itself is wrong for the noun's gender.
2. The instruction is clear and, together with the source, leads to ONE answer (up to word-order variants) — nothing in the answer may be invented beyond the source.
3. Every target rule is really needed to reach the answer — e.g. an adjective that ends up predicative (after sein) is NOT adjective declension, and a genitive rule is not applied if no genitive form appears in the answer.
4. Every listed solution is grammatically correct and natural.
When "ok" is true, list in "extra_solutions" any other equally correct answers missing from SOLUTIONS (word-order variants, alternative correct connectors) — or [] if none. When false, say why in "motivo" (Spanish, one sentence).

Items:
${items}

Return JSON: { "reviews": [ { "index": 0, "ok": true, "extra_solutions": [], "motivo": "" } ] }`;
}

const norm = s => s.toLowerCase().replace(/[.!?…]+\s*$/, '').replace(/\s+/g, ' ').trim();

async function generateCombo(combo) {
  const data = await callGPT(buildPrompt(combo));
  if (!Array.isArray(data.exercises)) throw new Error(`${combo.id}: missing exercises[]`);
  const wellFormed = data.exercises.filter(e =>
    e && typeof e.source === 'string' && typeof e.instruction === 'string' &&
    Array.isArray(e.solutions) && e.solutions.length > 0 && e.solutions.every(s => typeof s === 'string') &&
    typeof e.explanation === 'string' &&
    !e.solutions.some(s => norm(s) === norm(e.source))
  );

  const { reviews } = await callGPT(buildReviewPrompt(combo, wellFormed));
  if (!Array.isArray(reviews)) throw new Error(`${combo.id}: review returned no reviews[]`);
  const byIndex = new Map(reviews.map(r => [r.index, r]));
  const valid = [];
  wellFormed.forEach((e, i) => {
    const r = byIndex.get(i);
    if (!r?.ok) { console.log(`      ✗ dropped #${i}: ${r?.motivo || 'no review'} — ${e.source}`); return; }
    const extra = (Array.isArray(r.extra_solutions) ? r.extra_solutions : [])
      .filter(s => typeof s === 'string' && !e.solutions.some(x => norm(x) === norm(s)));
    valid.push({ ...e, solutions: [...e.solutions, ...extra] });
  });

  if (valid.length < EXERCISES_PER_COMBO * 0.6)
    throw new Error(`${combo.id}: only ${valid.length} valid exercises after review`);
  console.log(`    ${combo.id} (${combo.titulo}): ${valid.length}/${wellFormed.length} exercises kept`);
  return valid;
}

async function main() {
  checkCatalog();
  const argLevel = process.argv[2]?.toUpperCase();
  const argCombo = process.argv[3]?.toLowerCase();
  if (argLevel && !LEVELS.includes(argLevel)) {
    console.error(`Unknown level "${process.argv[2]}". Valid: ${LEVELS.join(', ')}`); process.exit(1);
  }

  let bank = {};
  try { bank = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch {}

  const levels = argLevel ? [argLevel] : LEVELS;
  const failed = [];
  for (const nivel of levels) {
    console.log(`\n=== ${nivel} ===`);
    for (const combo of COMBOS[nivel] || []) {
      if (argCombo && combo.id !== argCombo) continue;
      if (!argCombo && Array.isArray(bank[combo.id]) && bank[combo.id].length > 0) {
        console.log(`    ${combo.id}: already in bank, skipping`);
        continue;
      }
      try {
        bank[combo.id] = await generateCombo(combo);
      } catch (e) {
        failed.push(combo.id);
        console.error(`    ✗ ${e.message}`);
        continue;
      }
      fs.writeFileSync(OUT, JSON.stringify(bank, null, 2), 'utf8');
      await new Promise(r => setTimeout(r, 500));
    }
  }

  const totalCombos = Object.keys(bank).length;
  const totalEx = Object.values(bank).reduce((s, a) => s + a.length, 0);
  console.log(`\n✓ Saved reformulaciones-combos-data.json (${totalCombos} combos, ${totalEx} exercises)`);
  if (failed.length) { console.error(`✗ Failed (re-run to retry): ${failed.join(', ')}`); process.exit(1); }
}

main().catch(err => { console.error('\n✗', err.message); process.exit(1); });
