#!/usr/bin/env node
// Audits reformulaciones-data.json exercises against their grammar rule's
// design constraints (the same constraints generate-reformulaciones.js's
// prompt asks for, but never verifies afterward): the source sentence must
// NOT already use the target structure, the instruction must correctly ask
// for it, and every solution must apply it correctly while staying a valid,
// meaning-preserving reformulation of the source.
// Usage: node scripts/validate-reformulaciones.js <a1|a2|b1|b2|c1|c2> [rule-id]

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

const MODEL = 'gpt-4o-mini';
const ROOT  = path.join(__dirname, '..');
const BANK_PATH   = path.join(ROOT, 'reformulaciones-data.json');
const REPORT_PATH = path.join(ROOT, 'scripts', 'validate-report.json');

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
      temperature: 0,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a certified German language teacher auditing Umformung (sentence-transformation) exercises for a language-learning app. Return ONLY valid JSON. No markdown. No commentary.' },
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

function buildPrompt(rule, nivel, exercises) {
  const ejemplos = (rule.ejemplos || []).map(e => `  • ${e.de} — ${e.es}`).join('\n');
  const list = exercises.map((e, i) => `  {"index": ${i}, "source": ${JSON.stringify(e.source)}, "instruction": ${JSON.stringify(e.instruction)}, "solutions": ${JSON.stringify(e.solutions)}}`).join(',\n');
  return `Grammar rule being tested (CEFR ${nivel}):
TITLE: ${rule.titulo} (${rule.subtitulo || ''})
RULE: ${rule.regla_base || ''}
TIP: ${rule.tip || ''}
EXAMPLES:
${ejemplos}

Below are ${exercises.length} transformation exercises (Umformungsübungen) designed for this rule. For EACH one, check strictly:
1. "source" must NOT already use the target structure — it must use an alternative form.
2. "instruction" must correctly ask for the transformation toward the target structure.
3. EVERY sentence in "solutions" must: (a) correctly apply the target structure, (b) be grammatically correct German, (c) be a valid reformulation of "source" that preserves its meaning.
4. The transformation must strictly REQUIRE the target rule — it must not be solvable without applying it.

Exercises:
[
${list}
]

Return this exact JSON: { "results": [ { "index": 0, "valid": true|false, "issues": ["..."] }, ... ] }
One result per exercise, same index. "issues" in Spanish, short phrases, empty array if valid. Mark "valid": false if ANY of the 4 checks fails.`;
}

async function validateRule(rule, nivel, exercises) {
  const data = await callGPT(buildPrompt(rule, nivel, exercises));
  if (!Array.isArray(data.results)) throw new Error(`${rule.id}: missing results[]`);
  const byIndex = new Map(data.results.map(r => [r.index, r]));
  return exercises.map((ex, i) => {
    const r = byIndex.get(i) || { valid: null, issues: ['sin resultado del validador'] };
    return { index: i, source: ex.source, instruction: ex.instruction, valid: r.valid, issues: r.issues || [] };
  });
}

async function main() {
  const argLevel = process.argv[2]?.toUpperCase();
  const argRule  = process.argv[3]?.toLowerCase();
  if (!argLevel || !LEVELS.includes(argLevel)) {
    console.error(`Usage: node scripts/validate-reformulaciones.js <${LEVELS.map(l => l.toLowerCase()).join('|')}> [rule-id]`);
    process.exit(1);
  }

  const bank = JSON.parse(fs.readFileSync(BANK_PATH, 'utf8'));
  const rules = (GRAMMAR_DATA[argLevel] || []).filter(r => !argRule || r.id === argRule);

  const report = { level: argLevel, generatedAt: new Date().toISOString(), rules: [] };
  let totalEx = 0, totalInvalid = 0;

  for (const rule of rules) {
    const exercises = bank[rule.id];
    if (!Array.isArray(exercises) || exercises.length === 0) {
      console.log(`  ${rule.id}: sin banco, omitida`);
      continue;
    }
    process.stdout.write(`  ${rule.id} (${rule.titulo})... `);
    const results = await validateRule(rule, argLevel, exercises);
    const invalid = results.filter(r => r.valid === false);
    totalEx += results.length;
    totalInvalid += invalid.length;
    console.log(`${results.length - invalid.length}/${results.length} OK`);
    if (invalid.length > 0) {
      invalid.forEach(r => console.log(`      ✗ [${r.index}] "${r.source}" → ${r.issues.join('; ')}`));
    }
    report.rules.push({ id: rule.id, titulo: rule.titulo, total: results.length, invalid: invalid.length, details: results });
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n✓ ${totalEx - totalInvalid}/${totalEx} ejercicios OK (${totalInvalid} con problemas). Reporte: scripts/validate-report.json`);
}

main().catch(err => { console.error('\n✗', err.message); process.exit(1); });
