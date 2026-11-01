// Guided prompts for Umformung exercises, shared by generate-reformulaciones (api/chat.js)
// and scripts/generate-reformulaciones.js so both ask for exercises the same way.
// The per-rule content comes from the teacher's guide in reformulaciones-guias.js.
import { readFileSync } from 'fs';
import { join } from 'path';
import vm from 'vm';

// Ask for spare candidates: the review pass usually drops some.
export const GUIDED_SPARE = 5;

export const GENERATION_SYSTEM = 'You are a certified German language teacher creating exam-style transformation exercises (Umformungen). Return ONLY valid JSON. No markdown. No commentary.';

let guiasCache = null;

export function levelGuide(level) {
    if (!guiasCache) {
        const ctx = { window: {} };
        vm.runInNewContext(readFileSync(join(process.cwd(), 'reformulaciones-guias.js'), 'utf8'), ctx);
        guiasCache = ctx.window.REFORMULACIONES_GUIAS || {};
    }
    return guiasCache[level] || null;
}

export function buildGuidedPrompt(rule, nivel, cfg, usedSources = []) {
    const ejemplos = (rule.ejemplos || []).map(e => `  • ${e.de} — ${e.es}`).join('\n');
    const g = cfg.reglas?.[rule.id];
    const guide = g ? `
RULE-SPECIFIC GUIDE (written by the teacher — follow it strictly):
Transformation patterns (one per exercise, each used at least once if possible):
${g.patrones.map(p => `  - ${p}`).join('\n')}
Direction: ${g.direccion}
Avoid: ${g.evitar}
Model exercise (match this complexity, do not copy its topic):
  source: ${g.modelo.source}
  instruction: ${g.modelo.instruction}
  solution: ${g.modelo.solution}
` : '';
    const used = usedSources.length ? `
ALREADY USED SOURCES (do not repeat their topic or sentence structure):
${usedSources.map(s => `  - ${s}`).join('\n')}
` : '';
    return `Create ${cfg.ejercicios + GUIDED_SPARE} German sentence-transformation exercises (Umformungsübungen) for this grammar rule.

Grammar rule (CEFR ${nivel}):
TITLE: ${rule.titulo} (${rule.subtitulo || ''})
RULE: ${rule.regla_base || ''}
NOTES: ${rule.excepciones || ''}
TIP: ${rule.tip || ''}
EXAMPLES:
${ejemplos}
${guide}
CEFR ${nivel} complexity requirements:
${cfg.requisitos.map(r => `- ${r}`).join('\n')}
${used}
Each exercise MUST have:
- "source": the German sentence to transform.
- "instruction": a short, precise instruction in SPANISH stating exactly which transformation to apply.
- "solutions": an array of ALL valid reformulations (1–4 German sentences), including equally correct word-order variants. The first one is canonical.
- "explanation": 1–2 sentences in SPANISH naming what changed and why.

The transformation must strictly REQUIRE applying the target rule — it cannot be solved without it.

Return this exact JSON:
{ "exercises": [ { "source": "...", "instruction": "...", "solutions": ["..."], "explanation": "..." } ] }`;
}

// Independent second pass, same approach as generate-reformulaciones-combos.js:
// the generator's self-check lets trivial or already-transformed sources through.
export function buildReviewPrompt(rule, nivel, cfg, exercises) {
    const items = exercises.map((e, i) =>
        `${i}. SOURCE: ${e.source}\n   INSTRUCTION: ${e.instruction}\n   SOLUTIONS: ${e.solutions.join(' || ')}`
    ).join('\n');
    return `You are reviewing German transformation exercises (CEFR ${nivel}) for this grammar rule:
${rule.titulo}: ${rule.regla_base || ''}

For each item decide "ok": true only if ALL of these hold:
1. The source is grammatical, natural German and does NOT already contain the target structure.
2. The instruction plus the source lead to ONE answer (up to word-order variants); nothing in the answer is invented beyond the source.
3. The target rule is really needed, and the transformation is not trivial (not solvable by adding or removing a single word).
4. Every listed solution is grammatically correct, natural and keeps the meaning of the source.
5. It meets these ${nivel} requirements:
${cfg.requisitos.map(r => `   - ${r}`).join('\n')}
When "ok" is true, list in "extra_solutions" any other equally correct answers missing from SOLUTIONS — or [] if none. When false, say why in "motivo" (Spanish, one sentence).

Items:
${items}

Return JSON: { "reviews": [ { "index": 0, "ok": true, "extra_solutions": [], "motivo": "" } ] }`;
}

export const norm = s => s.toLowerCase().replace(/[.!?…]+\s*$/, '').replace(/\s+/g, ' ').trim();

export const isWellFormed = e =>
    e && typeof e.source === 'string' && typeof e.instruction === 'string' &&
    Array.isArray(e.solutions) && e.solutions.length > 0 && e.solutions.every(s => typeof s === 'string') &&
    typeof e.explanation === 'string';

// Local filter before the review call. The model ignores the prompted length, so
// minPalabras is enforced here; `reject(e, reason)` lets the script log drops.
export function filterCandidates(exercises, cfg, usedSources = [], reject = () => {}) {
    const used = new Set(usedSources.map(norm));
    return exercises.filter(e => {
        if (!isWellFormed(e) || e.solutions.some(s => norm(s) === norm(e.source))) return false;
        if (cfg.minPalabras && e.source.trim().split(/\s+/).length < cfg.minPalabras) { reject(e, 'too short'); return false; }
        if (used.has(norm(e.source))) { reject(e, 'already used'); return false; }
        return true;
    });
}

// Keeps the items the review approved, adding its extra solutions. Returns at most cfg.ejercicios.
export function applyReview(candidates, reviews, cfg, reject = () => {}) {
    const byIndex = new Map(reviews.map(r => [r.index, r]));
    const valid = [];
    candidates.forEach((e, i) => {
        const r = byIndex.get(i);
        if (!r?.ok) { reject(e, r?.motivo || 'no review', i); return; }
        const extra = (Array.isArray(r.extra_solutions) ? r.extra_solutions : [])
            .filter(s => typeof s === 'string' && !e.solutions.some(x => norm(x) === norm(s)));
        valid.push({ ...e, solutions: [...e.solutions, ...extra] });
    });
    return { kept: valid.slice(0, cfg.ejercicios), passed: valid.length };
}
