import { verifyJWT, createRateLimiter, checkAccess, fetchWithRetry, validateProxyMessages } from './_lib.js';
import { KASUS_VERIFY_SYSTEM, buildKasusPrompt, normalizeKasusItem, validKasusItem, kasusVerified, validateKasusRequest, kasusRuleId } from './_kasus.js';
import { normalizeTask, countWords, weightedScore, writingEvalSystem, writingEvalUser, saveSubmission } from './_writing.js';
import { PRACTICE_SYSTEM_PROMPT, findRule, buildPracticePrompt, cleanSentence } from './_practice.js';
import { TEMAS, PERSONAS, LUGARES, TONOS, MOMENTOS, CONFLICTOS, READING_SPECS, READING_TEILE_SPECS, READING_CALIDAD, pick } from './_reading-topics.js';

const isRateLimited = createRateLimiter(20, 60_000, 'rl:chat');

// Generation actions cost several (or pricier) OpenAI calls each, so they get their own
// per-minute window plus a daily cap instead of sharing the chat limit.
const DAY_MS = 86_400_000;
const ACTIONS = {
    'generate-reading':  { run: (req, res) => generateReading(req, res),  perMin: createRateLimiter(3, 60_000, 'rl:reading'),  perDay: createRateLimiter(20, DAY_MS, 'rl:reading:day') },
    'generate-practice': { run: (req, res) => generatePractice(req, res), perMin: createRateLimiter(6, 60_000, 'rl:practice'), perDay: createRateLimiter(60, DAY_MS, 'rl:practice:day') },
    'generate-kasus':    { run: (req, res) => generateKasus(req, res),    perMin: createRateLimiter(6, 60_000, 'rl:kasus'),    perDay: createRateLimiter(60, DAY_MS, 'rl:kasus:day') },
    'generate-mitexto':  { run: (req, res) => generateMiTexto(req, res),  perMin: createRateLimiter(4, 60_000, 'rl:mitexto'),  perDay: createRateLimiter(30, DAY_MS, 'rl:mitexto:day') },
    'evaluate-writing':  { run: (req, res, sub) => evaluateWriting(req, res, sub),  perMin: createRateLimiter(6, 60_000, 'rl:writing'),  perDay: createRateLimiter(40, DAY_MS, 'rl:writing:day') },
    'lookup-word':       { run: (req, res) => lookupWord(req, res),       perMin: createRateLimiter(30, 60_000, 'rl:lookup'),  perDay: createRateLimiter(500, DAY_MS, 'rl:lookup:day') },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const origin  = req.headers.origin || '';
    const allowed = process.env.ALLOWED_ORIGIN;
    if (allowed && origin && origin !== allowed) {
        return res.status(403).json({ error: 'Origen no permitido' });
    }

    const authHeader = req.headers.authorization || '';
    const token      = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) {
        return res.status(401).json({ error: 'Autenticación requerida' });
    }
    const jwtPayload = await verifyJWT(token);
    if (!jwtPayload) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const access = await checkAccess(jwtPayload.sub);
    if (!access.valid) {
        return res.status(403).json({ error: 'Acceso restringido', status: access.status, expires_at: access.expires_at });
    }

    const { action, messages, system, max_tokens, json, temperature } = req.body || {};

    const named = Object.hasOwn(ACTIONS, action) ? ACTIONS[action] : null;
    if (named) {
        if (await named.perMin(jwtPayload.sub)) {
            return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
        }
        if (await named.perDay(jwtPayload.sub)) {
            return res.status(429).json({ error: 'Has alcanzado el límite diario de generaciones. Vuelve mañana.' });
        }
        return named.run(req, res, jwtPayload.sub);
    }

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const invalid = validateProxyMessages(messages, system);
    if (invalid) return res.status(400).json({ error: invalid });
    if (system && String(system).length > 4000) {
        return res.status(400).json({ error: 'System prompt demasiado largo' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }

    const resolvedMaxTokens = (Number.isInteger(max_tokens) && max_tokens > 0 && max_tokens <= 4096)
        ? max_tokens
        : 500;

    try {
        const body = {
            model: 'gpt-4o-mini',
            max_tokens: resolvedMaxTokens,
            messages: system
                ? [{ role: 'system', content: String(system) }, ...messages]
                : messages,
        };
        if (json === true) body.response_format = { type: 'json_object' };
        if (typeof temperature === 'number' && temperature >= 0 && temperature <= 2) body.temperature = temperature;

        const response = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return res.status(response.status).json({ error: err?.error?.message || 'Error de OpenAI' });
        }

        const data = await response.json();
        return res.status(200).json({ reply: data.choices[0].message.content });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}

// ── evaluate-writing: escritura.html typed-text grading ──────────────────────
// Prompt built here and the submission stored with the service role (see _writing.js).
async function evaluateWriting(req, res, jwtSub) {
    const task = normalizeTask(req.body.task);
    const texto = typeof req.body.texto === 'string' ? req.body.texto.trim() : '';
    if (!task) return res.status(400).json({ error: 'task inválida' });
    if (countWords(texto) < 5 || texto.length > 12000) return res.status(400).json({ error: 'texto inválido' });
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }

    let ev = null;
    for (let intento = 0; intento < 2 && !ev; intento++) {
        try {
            const parsed = await openaiJson('gpt-4o-mini', writingEvalSystem(task.level), writingEvalUser(task, texto), 4000);
            if (Array.isArray(parsed.errores) && weightedScore(parsed) !== null) ev = parsed;
        } catch { /* retry once */ }
    }
    if (!ev) return res.status(502).json({ error: 'La corrección llegó en un formato inválido. Inténtalo de nuevo.' });

    ev.puntuacion = weightedScore(ev);
    await saveSubmission(jwtSub, task, 'texto', texto, ev);
    return res.status(200).json({ evaluacion: ev });
}

// ── lookup-word: shared diccionario_cache, written only here ─────────────────
// The cache is read by every user (diccionario.html, lectura veloz.html), so clients
// only SELECT it; entries come from a fixed server-side prompt with sanitized fields.

const LOOKUP_SYSTEM_FULL = `Eres un diccionario de alemán preciso. El usuario te dará una palabra en alemán.
Responde SIEMPRE con un JSON válido con exactamente estas claves:
{
  "traduccion": "traducción al español",
  "nivel": "A1|A2|B1|B2|C1|C2",
  "definicion": "definición en alemán, clara y concisa",
  "sinonimos": ["palabra1", "palabra2"],
  "antonimo": "antónimo en alemán o null si no tiene"
}
No incluyas nada fuera del JSON.`;
const LOOKUP_SYSTEM_TRANSLATE = 'Traduce al español la palabra alemana que recibas. Responde SOLO con la traducción, máximo 4 palabras, sin comillas ni punto final.';
const LOOKUP_WORD_RE = /^[\p{L}\p{M}][\p{L}\p{M}' .-]{0,59}$/u;

function cleanText(v, max) {
    if (typeof v !== 'string') return null;
    const t = v.replace(/[<>]/g, '').trim().slice(0, max);
    return t && t.toLowerCase() !== 'null' ? t : null;
}

function supaHeaders(extra = {}) {
    return {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        ...extra,
    };
}

async function lookupWord(req, res) {
    const palabra = String(req.body.palabra || '').trim();
    const mode = req.body.mode === 'translate' ? 'translate' : 'full';
    if (!LOOKUP_WORD_RE.test(palabra)) return res.status(400).json({ error: 'palabra inválida' });
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }
    const id = palabra.toLowerCase();
    const hasSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

    try {
        if (hasSupabase) {
            const r = await fetch(
                `${process.env.SUPABASE_URL}/rest/v1/diccionario_cache?id=eq.${encodeURIComponent(id)}&select=*`,
                { headers: supaHeaders() }
            );
            const [row] = r.ok ? await r.json() : [];
            if (row && (mode === 'translate' ? row.traduccion : row.definicion)) {
                return res.status(200).json({ entry: row });
            }
        }

        let entry;
        if (mode === 'full') {
            const info = await openaiJson('gpt-4o-mini', LOOKUP_SYSTEM_FULL, palabra, 400);
            const nivel = String(info.nivel || '').toUpperCase();
            entry = {
                id, palabra,
                traduccion: cleanText(info.traduccion, 200),
                nivel: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(nivel) ? nivel : null,
                definicion: cleanText(info.definicion, 600),
                sinonimos: (Array.isArray(info.sinonimos) ? info.sinonimos : [])
                    .map(x => cleanText(x, 60)).filter(Boolean).slice(0, 8),
                antonimo: cleanText(info.antonimo, 60),
            };
            if (!entry.traduccion) return res.status(502).json({ error: 'La IA devolvió un formato inesperado' });
        } else {
            const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    max_tokens: 30,
                    messages: [{ role: 'system', content: LOOKUP_SYSTEM_TRANSLATE }, { role: 'user', content: palabra }],
                }),
            });
            if (!aiRes.ok) return res.status(502).json({ error: 'Error de OpenAI' });
            const data = await aiRes.json();
            const traduccion = cleanText((data.choices[0].message.content || '').replace(/^["']+|["'.]+$/g, ''), 80);
            if (!traduccion) return res.status(502).json({ error: 'El modelo no devolvió traducción' });
            entry = { id, palabra, traduccion };
        }

        if (hasSupabase) {
            // merge-duplicates only overwrites the columns sent, so a translate-only
            // entry never wipes the definition of a full one.
            await fetch(`${process.env.SUPABASE_URL}/rest/v1/diccionario_cache`, {
                method: 'POST',
                headers: supaHeaders({ 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }),
                body: JSON.stringify(entry),
            }).catch(() => {});
        }
        return res.status(200).json({ entry });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}

// Generates a reading-comprehension text server-side and stores it in reading_texts
// with the service role key (the table has no client INSERT policy).
async function generateReading(req, res) {
    const level = String(req.body.level || '').toUpperCase();
    if (!['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
        return res.status(400).json({ error: 'level inválido (A1–C2)' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(500).json({ error: 'Supabase no configurado en Vercel' });
    }

    if (READING_TEILE_SPECS[level]) {
        return generateReadingTeile(req, res, level);
    }

    const spec = READING_SPECS[level];
    const tema = pick(TEMAS[level]);

    let recentTitles = [];
    try {
        const recentRes = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/reading_texts?level=eq.${level}&select=title&order=created_at.desc&limit=8`,
            { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
        );
        if (recentRes.ok) recentTitles = (await recentRes.json()).map(r => r.title);
    } catch { /* best-effort — a failed lookup shouldn't block generation */ }

    const noRepeat = recentTitles.length ? `\nNo repitas estos títulos ni sus situaciones: ${recentTitles.join(', ')}.` : '';

    const prompt = spec.simple
        ? `Genera un texto en alemán de nivel ${level} (${spec.minWords}-${spec.maxWords} palabras) con título.
El texto debe ser ${spec.textType}, sobre el tema: ${tema}.
Usa vocabulario y gramática muy simples, apropiados para nivel ${level}, con frases cortas.${noRepeat}
Luego genera 4 preguntas de comprensión de selección múltiple. Responde SOLO con JSON: {"titulo": "...", "contenido": "...", "preguntas": [{"pregunta": "...", "opciones": ["A","B","C","D"], "correcta": 0, "explicacion": "una frase breve en español explicando por qué es correcta"}]}`
        : `Genera un texto en alemán de nivel ${level} (${spec.minWords}-${spec.maxWords} palabras) con título, en forma de ${spec.textType}.
Tema: ${tema}.
La situación debe involucrar a ${pick(PERSONAS)} en ${pick(LUGARES)}, ${pick(MOMENTOS)}, contada como ${pick(TONOS)}. En la historia, ${pick(CONFLICTOS)}.${noRepeat}
Luego genera 4 preguntas de comprensión de selección múltiple. Responde SOLO con JSON: {"titulo": "...", "contenido": "...", "preguntas": [{"pregunta": "...", "opciones": ["A","B","C","D"], "correcta": 0, "explicacion": "una frase breve en español explicando por qué es correcta"}]}`;

    try {
        const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 1500,
                response_format: { type: 'json_object' },
                messages: [{ role: 'user', content: prompt }],
            }),
        });
        if (!aiRes.ok) {
            const err = await aiRes.json().catch(() => ({}));
            return res.status(aiRes.status).json({ error: err?.error?.message || 'Error de OpenAI' });
        }
        const aiData = await aiRes.json();
        const parsed = JSON.parse(aiData.choices[0].message.content);

        const valid = parsed
            && typeof parsed.titulo === 'string'
            && typeof parsed.contenido === 'string'
            && Array.isArray(parsed.preguntas)
            && parsed.preguntas.length > 0
            && parsed.preguntas.every(p =>
                typeof p.pregunta === 'string'
                && Array.isArray(p.opciones) && p.opciones.length === 4
                && Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta < 4
                && typeof p.explicacion === 'string');
        if (!valid) {
            return res.status(502).json({ error: 'La IA devolvió un formato inesperado' });
        }

        const insertRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/reading_texts`, {
            method: 'POST',
            headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation',
            },
            body: JSON.stringify({
                level,
                title: parsed.titulo,
                content: parsed.contenido,
                questions: parsed.preguntas,
            }),
        });
        if (!insertRes.ok) {
            const errText = await insertRes.text().catch(() => '');
            return res.status(502).json({ error: 'Error al guardar el texto: ' + errText.slice(0, 200) });
        }
        const [row] = await insertRes.json();
        return res.status(200).json({
            text: { id: row.id, title: row.title, content: row.content, questions: row.questions },
        });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}

// Generates practice sentences for a grammar rule (gramatica.html) and stores them
// server-side in grammar_practice_exercises so other users can reuse the same set
// instead of triggering a new OpenAI call each time.
async function generatePractice(req, res) {
    const ruleId = String(req.body.ruleId || '');
    const level  = String(req.body.level || '').toUpperCase();

    if (!['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
        return res.status(400).json({ error: 'level inválido (A1–C2)' });
    }
    let rule;
    try { rule = findRule(level, ruleId); } catch { return res.status(500).json({ error: 'Datos de gramática no disponibles' }); }
    if (!rule) return res.status(400).json({ error: 'ruleId inválido' });

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(500).json({ error: 'Supabase no configurado en Vercel' });
    }

    let extraUsed = [];
    try {
        const usedRes = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/grammar_practice_exercises?rule_id=eq.${encodeURIComponent(ruleId)}&select=oraciones&order=created_at.desc&limit=6`,
            { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
        );
        if (usedRes.ok) extraUsed = (await usedRes.json()).flatMap(r => (r.oraciones || []).map(o => o.de)).filter(Boolean);
    } catch { /* best-effort — a failed lookup shouldn't block generation */ }

    try {
        const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 1500,
                messages: [
                    { role: 'system', content: PRACTICE_SYSTEM_PROMPT },
                    { role: 'user', content: buildPracticePrompt(rule, level, extraUsed) },
                ],
            }),
        });
        if (!aiRes.ok) {
            const err = await aiRes.json().catch(() => ({}));
            return res.status(aiRes.status).json({ error: err?.error?.message || 'Error de OpenAI' });
        }
        const aiData = await aiRes.json();
        const reply = aiData.choices[0].message.content || '';

        let oraciones;
        try {
            oraciones = JSON.parse(reply);
        } catch {
            const arrMatch = reply.match(/\[[\s\S]*\]/);
            if (!arrMatch) return res.status(502).json({ error: 'La IA devolvió un formato inesperado' });
            try { oraciones = JSON.parse(arrMatch[0]); } catch { return res.status(502).json({ error: 'La IA devolvió un formato inesperado' }); }
        }
        const valid = Array.isArray(oraciones) && oraciones.length > 0
            && oraciones.every(o => o && typeof o.de === 'string' && typeof o.es === 'string');
        if (!valid) return res.status(502).json({ error: 'La IA devolvió un formato inesperado' });

        // Los distractores de par mínimo son opcionales: se guardan solo si vienen completos,
        // para que el cliente pueda distinguirlos de las filas antiguas (que no los tienen).
        const cleanList = arr => (Array.isArray(arr) ? arr : []).map(x => cleanSentence(x)).filter(Boolean);
        oraciones = oraciones.slice(0, 10).map(o => {
            const row = { de: cleanSentence(o.de), es: cleanSentence(o.es) };
            const ds = cleanList(o.distractores).filter(d => d !== row.de);
            if (ds.length >= 3) {
                row.distractores = ds.slice(0, 3);
                const ws = cleanList(o.por_que_mal);
                if (ws.length >= 3) row.por_que_mal = ws.slice(0, 3);
            }
            const ordenes = cleanList(o.ordenes_validos);
            if (ordenes.length) row.ordenes_validos = ordenes.slice(0, 3);
            return row;
        }).filter(o => o.de && o.es);
        if (!oraciones.length) return res.status(502).json({ error: 'La IA devolvió un formato inesperado' });

        const insertRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/grammar_practice_exercises`, {
            method: 'POST',
            headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation',
            },
            body: JSON.stringify({ rule_id: ruleId, level, oraciones }),
        });
        if (!insertRes.ok) {
            const errText = await insertRes.text().catch(() => '');
            return res.status(502).json({ error: 'Error al guardar el ejercicio: ' + errText.slice(0, 200) });
        }
        const [row] = await insertRes.json();
        return res.status(200).json({ exercise: { id: row.id, oraciones: row.oraciones } });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}

// ── generate-kasus: exercise set for kasus.html ──────────────────────────────
// One generation call (KASUS_SET_SIZE items) + one independent-solve verification call;
// only items whose verified answer matches are stored in grammar_practice_exercises
// (rule_id "kasus:…") so later students reuse the set instead of paying for new calls.

const KASUS_SET_SIZE = 6;
// gpt-4o-mini produced wrong cases/hints that its own verifier accepted; the verifier also corrects
// unnatural sentences, which gpt-4.1-mini let through, so it gets the full model (one call per banked set).
const KASUS_MODEL = 'gpt-4.1-mini';
const KASUS_VERIFY_MODEL = 'gpt-4.1';
const KASUS_MIN_VALID = 3;

async function openaiJson(model, system, user, maxTokens) {
    const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            max_tokens: maxTokens,
            response_format: { type: 'json_object' },
            messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        }),
    });
    if (!aiRes.ok) throw new Error('openai');
    const data = await aiRes.json();
    return JSON.parse(data.choices[0].message.content || '{}');
}

async function generateKasus(req, res) {
    const level   = String(req.body.level || '').toUpperCase();
    const caso    = String(req.body.caso || '');
    const relleno = String(req.body.relleno || '');
    const wechsel = req.body.wechsel === true;

    const invalid = validateKasusRequest(level, caso, wechsel, relleno);
    if (invalid) return res.status(400).json({ error: invalid });
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(500).json({ error: 'Supabase no configurado en Vercel' });
    }

    try {
        // Deterministic + verifier filters drop several items per batch; a second batch tops the set up.
        const verified = [];
        for (let intento = 0; intento < 2 && verified.length < KASUS_MIN_VALID; intento++) {
            const { system, prompt } = buildKasusPrompt(level, caso, wechsel, relleno, KASUS_SET_SIZE);
            let gen;
            try { gen = await openaiJson(KASUS_MODEL, system, prompt, 2500); } catch { continue; }
            const items = (Array.isArray(gen.ejercicios) ? gen.ejercicios : [])
                .map(normalizeKasusItem)
                .filter(ej => validKasusItem(ej, caso, wechsel, relleno))
                .map(({ frase, opciones, respuesta, pista, genero, explicacion }) => ({ frase, opciones, respuesta, pista, caso, genero, explicacion }));
            if (!items.length) continue;

            const listado = items.map((ej, i) => `${i + 1}. ${ej.frase} (pista: ${ej.pista}) — opciones: ${ej.opciones.join(' | ')}`).join('\n');
            let ver;
            try { ver = await openaiJson(KASUS_VERIFY_MODEL, KASUS_VERIFY_SYSTEM, listado, 1500); } catch { continue; }
            const respuestas = Array.isArray(ver.respuestas) ? ver.respuestas : [];
            verified.push(...items.filter((ej, i) => kasusVerified(ej, respuestas[i], caso)));
        }
        if (verified.length < KASUS_MIN_VALID) {
            return res.status(502).json({ error: 'Los ejercicios no superaron la verificación' });
        }

        const insertRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/grammar_practice_exercises`, {
            method: 'POST',
            headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation',
            },
            body: JSON.stringify({ rule_id: kasusRuleId(level, caso, wechsel, relleno), level, oraciones: verified }),
        });
        if (!insertRes.ok) {
            const errText = await insertRes.text().catch(() => '');
            return res.status(502).json({ error: 'Error al guardar el ejercicio: ' + errText.slice(0, 200) });
        }
        const [row] = await insertRes.json();
        return res.status(200).json({ exercise: { id: row.id, oraciones: row.oraciones } });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}

// ── generate-mitexto: free-reading text for Comprensión "Mi texto" ──────────────
// Not stored server-side (the student keeps it in IndexedDB). Length matches the longest
// text of that level's Teile session; C2's Teile aren't adapted yet, so it borrows C1's.

const MITEXTO_LONGITUD_REF = { C2: 'C1' };
const MITEXTO_N_PALABRAS = { A1: 5, A2: 6, B1: 8, B2: 10, C1: 12, C2: 12 };
const MITEXTO_MIN_USADAS = 0.6;
function miTextoMaxPalabras(level) {
    const ref = MITEXTO_LONGITUD_REF[level] || level;
    const maxTeile = Math.max(0, ...(READING_TEILE_SPECS[ref] || []).map(t => t.palabras?.[1] || 0));
    return maxTeile || READING_SPECS[ref].maxWords;
}

// Topic names (TEMAS) and list names ("tema: …") were written independently and rarely share
// words, so string matching misses most pairs; a tiny classification call picks the list instead.
async function listaParaTema(tema, listas) {
    const candidatas = listas.filter(l => l.name.startsWith('tema:'));
    if (!candidatas.length) return null;
    try {
        const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 40,
                temperature: 0,
                messages: [{ role: 'user', content: `Tema de un texto: "${tema}". ¿Cuál de estas listas de vocabulario encaja mejor con ese tema? Responde SOLO con el nombre exacto de la lista, o "ninguna" si ninguna tiene relación clara.\n${candidatas.map(l => l.name).join('\n')}` }],
            }),
        });
        if (!aiRes.ok) return null;
        const reply = ((await aiRes.json()).choices[0].message.content || '').trim().replace(/^["']|["']$/g, '');
        return candidatas.find(l => l.name === reply) || null;
    } catch {
        return null;
    }
}

function apareceEn(entrada, textoLower) {
    const tokens = entrada.toLowerCase().replace(/^(der|die|das|ein|eine|sich)\s+/, '').split(/[\s,/()]+/).filter(Boolean);
    const core = tokens.reduce((a, b) => (b.length > a.length ? b : a), '');
    if (!core) return false;
    return textoLower.includes(core.length > 5 ? core.slice(0, -2) : core);
}

function sanitizarListas(raw) {
    if (!Array.isArray(raw)) return [];
    return raw.slice(0, 60)
        .filter(l => l && typeof l.name === 'string' && Array.isArray(l.words))
        .map(l => ({
            name: l.name.slice(0, 80),
            words: l.words.filter(w => typeof w === 'string' && w.trim() && w.length <= 80).slice(0, 400),
        }))
        .filter(l => l.words.length);
}

async function generateMiTexto(req, res) {
    const level = String(req.body.level || '').toUpperCase();
    if (!['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
        return res.status(400).json({ error: 'level inválido (A1–C2)' });
    }
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }

    const listas = sanitizarListas(req.body.listas);
    if (!listas.length) return res.status(400).json({ error: 'listas requerido' });

    const evitar = new Set(Array.isArray(req.body.evitarTemas) ? req.body.evitarTemas.map(String) : []);
    const temasLibres = TEMAS[level].filter(t => !evitar.has(t));
    const tema = pick(temasLibres.length ? temasLibres : TEMAS[level]);

    let lista = listas.find(l => l.name === req.body.lista) || await listaParaTema(tema, listas);
    if (!lista) {
        const core = listas.filter(l => ['sustantivos', 'verbos', 'adjetivos'].includes(l.name));
        lista = { name: 'sustantivos + verbos + adjetivos', words: (core.length ? core : listas).flatMap(l => l.words) };
    }
    const palabras = shuffle([...new Set(lista.words)]).slice(0, MITEXTO_N_PALABRAS[level]);

    const maxWords = miTextoMaxPalabras(level);
    const minWords = Math.round(maxWords * 0.85);
    const parrafos = Math.max(1, Math.ceil(minWords / 55));
    const objetivo = Math.round(maxWords * 1.3);
    const simple = READING_SPECS[level].simple;

    const prompt = `Escribe un texto de lectura en alemán de nivel ${level} con título, sobre el tema: ${tema}.
${simple
        ? `Usa vocabulario y gramática muy simples, apropiados para nivel ${level}, con frases cortas.`
        : `La situación involucra a ${pick(PERSONAS)} en ${pick(LUGARES)}, ${pick(MOMENTOS)}, contada como ${pick(TONOS)}. En la historia, ${pick(CONFLICTOS)}. Vocabulario y gramática propios de nivel ${level}.`}

VOCABULARIO OBLIGATORIO: el texto debe usar de forma natural TODAS estas palabras o expresiones (puedes declinarlas o conjugarlas): ${palabras.join('; ')}.

LONGITUD OBLIGATORIA: unas ${objetivo} palabras${parrafos > 1 ? `, en EXACTAMENTE ${parrafos} párrafos separados por "\\n\\n", cada uno con AL MENOS 5 frases completas` : ` y al menos ${Math.ceil(minWords / 10)} frases completas`}. Un texto más corto se rechaza automáticamente.

Responde SOLO con JSON válido: {"titulo": "...", "contenido": "..."} — título y contenido en alemán.`;

    let lastErr = 'La IA devolvió un formato inesperado';
    for (let intento = 1; intento <= 2; intento++) {
        try {
            const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    max_tokens: 3000,
                    response_format: { type: 'json_object' },
                    messages: [{ role: 'user', content: prompt }],
                }),
            });
            if (!aiRes.ok) {
                const err = await aiRes.json().catch(() => ({}));
                return res.status(aiRes.status).json({ error: err?.error?.message || 'Error de OpenAI' });
            }
            const aiData = await aiRes.json();
            const parsed = JSON.parse(aiData.choices[0].message.content);
            if (!(parsed && typeof parsed.titulo === 'string' && typeof parsed.contenido === 'string')) continue;

            const n = countLetterWords(parsed.contenido);
            if (n < Math.floor(minWords * MIN_WORDS_RATIO)) { lastErr = `Texto demasiado corto (${n} palabras)`; continue; }
            const lower = parsed.contenido.toLowerCase();
            const usadas = palabras.filter(p => apareceEn(p, lower));
            if (usadas.length < palabras.length * MITEXTO_MIN_USADAS) { lastErr = 'El texto no usó el vocabulario pedido'; continue; }

            return res.status(200).json({
                titulo: parsed.titulo, contenido: parsed.contenido, tema, lista: lista.name, palabras, usadas, nPalabras: n,
            });
        } catch {
            lastErr = 'Error interno';
        }
    }
    return res.status(502).json({ error: lastErr });
}

// ── format_version 2: Teile-based sessions (see lecturaplan.md) ──────────────────

// El número de ítems real del Modellsatz vive en el spec (`itemsCount`, ver
// _reading-topics.js) y se exige exacto: si el modelo devuelve 5 preguntas donde el examen
// pide 9, el Teil se descarta y se reintenta, igual que con cualquier otro campo mal formado.
function hasItemsCount(arr, expected) {
    return Array.isArray(arr) && (expected.itemsCount ? arr.length === expected.itemsCount : arr.length > 0);
}

function validMcqTeil(t, expected) {
    const opcionesCount = expected.opcionesCount || 3;
    return Array.isArray(t.textos) && t.textos.length > 0
        && t.textos.every(x => typeof x.titulo === 'string' && typeof x.contenido === 'string')
        && hasItemsCount(t.items, expected)
        && t.items.every(it =>
            typeof it.pregunta === 'string'
            && Array.isArray(it.opciones) && it.opciones.length === opcionesCount
            && Number.isInteger(it.correcta) && it.correcta >= 0 && it.correcta < opcionesCount
            && (it.explicacion === undefined || typeof it.explicacion === 'string'));
}

function validRichtigFalschTeil(t, expected) {
    return Array.isArray(t.textos) && t.textos.length > 0
        && t.textos.every(x => typeof x.titulo === 'string' && typeof x.contenido === 'string')
        && hasItemsCount(t.items, expected)
        && t.items.every(it => typeof it.afirmacion === 'string' && typeof it.correcta === 'boolean'
            && (it.explicacion === undefined || typeof it.explicacion === 'string'));
}

function validEmparejarTeil(t, expected) {
    if (!hasItemsCount(t.columnaIzquierda, expected)) return false;
    // derechaCount se exige como mínimo, no exacto: un candidato distractor de más no rompe
    // el ejercicio, y relajarlo evita descartar Teile por lo demás válidos (mismo criterio
    // que con "explicaciones" más abajo).
    const minDerecha = Math.max(t.columnaIzquierda.length, expected.derechaCount || 0);
    if (!Array.isArray(t.columnaDerecha) || t.columnaDerecha.length < minDerecha) return false;
    const isItem = x => x && typeof x.id === 'string' && typeof x.texto === 'string';
    if (!t.columnaIzquierda.every(isItem) || !t.columnaDerecha.every(isItem)) return false;
    // Some emparejar Teile (e.g. a Lückentext) need a source text the student reads before
    // matching — without it the exercise is unanswerable (blanks with nothing to fill them
    // from). The AI drops "textos" for these fairly often since nothing else in the schema
    // implies it's required, so it must be enforced explicitly per spec.
    if (expected.requiereTextos) {
        if (!Array.isArray(t.textos) || t.textos.length === 0) return false;
        if (!t.textos.every(x => typeof x.titulo === 'string' && typeof x.contenido === 'string')) return false;
    }
    if (!t.solucion || typeof t.solucion !== 'object') return false;
    const derechaIds = new Set(t.columnaDerecha.map(x => x.id));
    const usados = t.columnaIzquierda.map(izq => t.solucion[izq.id]);
    if (expected.solucionUnica && new Set(usados).size !== usados.length) return false;
    // "explicaciones" is supplementary (explicacionHtml() on the frontend already renders
    // nothing for a missing entry) — only type-check entries that are actually present,
    // don't require every izq id to have one. gpt-4o-mini drops this field inconsistently
    // on the heavier B2/C1/C2 Teile, and it isn't worth failing/discarding an otherwise
    // valid session over it.
    return t.columnaIzquierda.every(izq =>
        typeof t.solucion[izq.id] === 'string' && derechaIds.has(t.solucion[izq.id])
        && (!t.explicaciones || t.explicaciones[izq.id] === undefined || typeof t.explicaciones[izq.id] === 'string'));
}

const TEIL_VALIDATORS = { mcq: validMcqTeil, richtig_falsch: validRichtigFalschTeil, emparejar: validEmparejarTeil };

// Tolerance below the spec's minimum: word counting is fuzzy (gap markers, compounds), but a
// text at a third of the requested length — what gpt-4o-mini produced for C1 — is rejected.
const MIN_WORDS_RATIO = 0.8;

function countLetterWords(s) {
    return s.trim().split(/\s+/).filter(w => /\p{L}/u.test(w)).length;
}

function shortTexts(t, expected) {
    if (!expected.palabras || !Array.isArray(t.textos)) return [];
    const min = Math.floor(expected.palabras[0] * MIN_WORDS_RATIO);
    return t.textos.map(x => countLetterWords(x.contenido)).filter(n => n < min);
}

// gpt-4o-mini occasionally emits token soup like "Was_KIND_sicht_Erne_autonomie" inside an
// otherwise valid Teil; no legitimate German item text joins words with underscores.
function hasGarbage(t) {
    return /\p{L}_\p{L}/u.test(JSON.stringify([t.textos, t.items, t.columnaIzquierda, t.columnaDerecha]));
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// The model puts the right MCQ option in position 1 most of the time and lists forum
// statements in the same order as the comments; `barajar` removes that positional clue.
// Emparejar ids are never shown to the student and the frontend already shuffles the right
// column, so only the left column needs reordering.
function barajarTeil(t) {
    if (t.tipo === 'mcq') {
        t.items = t.items.map(it => {
            const orden = shuffle(it.opciones.map((_, i) => i));
            return { ...it, opciones: orden.map(i => it.opciones[i]), correcta: orden.indexOf(it.correcta) };
        });
    } else if (t.tipo === 'emparejar') {
        t.columnaIzquierda = shuffle(t.columnaIzquierda);
    }
    return t;
}

// Each Teil is generated by its own OpenAI call instead of one combined call for the whole
// session. A single call asking for all 5 Teile at once let the model spread itself thin —
// live testing showed it silently drop required fields (or the whole thing stopping after
// Teil 1) on the heavier levels, especially the Lückentext Teil. Isolating each Teil narrows
// what the model has to hold in its "attention budget" per call, and the 5 calls run in
// parallel so wall-clock latency stays close to a single call's.
function schemaEjemploTeil(expected) {
    if (expected.tipo === 'mcq') {
        const opciones = Array.from({ length: expected.opcionesCount || 3 }, (_, i) => `"opción ${i + 1}"`).join(',');
        return `{"id":"${expected.id}","tipo":"mcq","instrucciones":"instrucción en español de qué hacer","textos":[{"titulo":"...","contenido":"..."}],"items":[{"pregunta":"...","opciones":[${opciones}],"correcta":0,"explicacion":"una frase breve en español explicando por qué es correcta"}]}`;
    }
    if (expected.tipo === 'richtig_falsch') {
        return `{"id":"${expected.id}","tipo":"richtig_falsch","instrucciones":"...","textos":[{"titulo":"...","contenido":"..."}],"items":[{"afirmacion":"...","correcta":true,"explicacion":"una frase breve en español explicando por qué es correcta"}]}`;
    }
    const textosPart = expected.requiereTextos ? '"textos":[{"titulo":"...","contenido":"..."}],' : '';
    return `{"id":"${expected.id}","tipo":"emparejar","instrucciones":"...",${textosPart}"columnaIzquierda":[{"id":"x1","texto":"..."}],"columnaDerecha":[{"id":"y1","texto":"..."}],"solucion":{"x1":"y1"},"explicaciones":{"x1":"una frase breve en español explicando la relación"}}`;
}

function buildSingleTeilPrompt(level, tema, expected, noRepeat) {
    const [minWords, maxWords] = expected.palabras || [READING_SPECS[level].minWords, READING_SPECS[level].maxWords];
    const fragment = expected.promptFragment
        .replace(/\{minWords\}/g, minWords).replace(/\{maxWords\}/g, maxWords)
        .replace(/\{n\}/g, expected.itemsCount).replace(/\{d\}/g, expected.derechaCount);
    // Measured 2026-09-27 on C1: asking for "550-700 palabras" yields ~60-70% of that with
    // gpt-4o-mini, gpt-4.1-mini and gpt-4o alike. An exact paragraph count with a minimum of
    // sentences each, plus a word target inflated above the max, lands in range ~90% of the time.
    const parrafos = Math.max(1, Math.ceil(minWords / 55));
    const objetivo = Math.round(maxWords * 1.3);
    const longitud = expected.palabras
        ? `\n\nLONGITUD OBLIGATORIA: cada "contenido" de "textos" debe tener unas ${objetivo} palabras${parrafos > 1 ? `, en EXACTAMENTE ${parrafos} párrafos separados por "\\n\\n", y CADA párrafo con AL MENOS 5 frases completas` : ` y al menos ${Math.ceil(minWords / 12)} frases completas`}. Un texto más corto se rechaza automáticamente: desarrolla ejemplos concretos, matices y argumentos hasta alcanzar la longitud.`
        : '';
    return `Genera UNA sola parte (${expected.id}) de un examen de comprensión lectora en alemán de nivel ${level}, estilo Goethe/telc Leseverstehen (estructura general, sin copiar textos de exámenes reales). Tema general de fondo: ${tema}.

${fragment}${longitud}${READING_CALIDAD[level] ? `\n\n${READING_CALIDAD[level]}` : ''}${noRepeat}

Responde SOLO con JSON válido (sin markdown), un único objeto con exactamente este formato:
${schemaEjemploTeil(expected)}

Todo el contenido en alemán debe ser apropiado para nivel ${level}. IMPORTANTE sobre idiomas: los campos "textos[].titulo", "textos[].contenido", "items[].pregunta", "items[].opciones", "items[].afirmacion", "columnaIzquierda[].texto" y "columnaDerecha[].texto" deben estar SIEMPRE en alemán — nunca en español, ni siquiera parcialmente, aunque alguna parte de esta instrucción esté redactada en español. Solo "instrucciones", "explicacion" y "explicaciones" van en español, breves, explicando la tarea o la respuesta al estudiante. IMPORTANTE: usa EXACTAMENTE los nombres de campo del JSON de ejemplo de arriba (están en español) — nunca los traduzcas ni los sustituyas por nombres en alemán, aunque el contenido del texto sea en alemán.`;
}

async function generateOneTeilAttempt(level, tema, expected, noRepeat) {
    const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: expected.model || 'gpt-4o-mini',
            max_tokens: expected.maxTokens || 2000,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: buildSingleTeilPrompt(level, tema, expected, noRepeat) }],
        }),
    });
    if (!aiRes.ok) {
        const err = await aiRes.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Error de OpenAI (${aiRes.status})`);
    }
    const aiData = await aiRes.json();
    const parsed = JSON.parse(aiData.choices[0].message.content);
    if (!(parsed && parsed.id === expected.id && parsed.tipo === expected.tipo
        && typeof parsed.instrucciones === 'string' && TEIL_VALIDATORS[expected.tipo](parsed, expected))) {
        throw new Error(`"${expected.id}" con formato inválido`);
    }
    const cortos = shortTexts(parsed, expected);
    if (cortos.length) {
        throw new Error(`"${expected.id}" texto demasiado corto (${cortos.join(', ')} palabras, mínimo ${expected.palabras[0]})`);
    }
    if (hasGarbage(parsed)) throw new Error(`"${expected.id}" contiene texto corrupto`);
    return expected.barajar ? barajarTeil(parsed) : parsed;
}

async function generateOneTeil(level, tema, expected, noRepeat, maxAttempts = 2) {
    let lastErr;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await generateOneTeilAttempt(level, tema, expected, noRepeat);
        } catch (err) {
            lastErr = err;
        }
    }
    throw lastErr;
}

async function generateReadingTeile(req, res, level) {
    const spec = READING_TEILE_SPECS[level];
    const tema = pick(TEMAS[level]);

    let recentTitles = [];
    try {
        const recentRes = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/reading_texts?level=eq.${level}&format_version=eq.2&select=title&order=created_at.desc&limit=8`,
            { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
        );
        if (recentRes.ok) recentTitles = (await recentRes.json()).map(r => r.title);
    } catch { /* best-effort — a failed lookup shouldn't block generation */ }

    const noRepeat = recentTitles.length ? `\nNo repitas estas situaciones/escenarios ya usados recientemente: ${recentTitles.join(', ')}.` : '';

    try {
        const results = await Promise.allSettled(spec.map(expected => generateOneTeil(level, tema, expected, noRepeat)));

        const failed = results.map((r, i) => ({ r, id: spec[i].id })).filter(x => x.r.status === 'rejected');
        if (failed.length > 0) {
            console.error('[generateReadingTeile]', level, failed.map(f => `${f.id}: ${f.r.reason?.message}`).join(' | '));
            return res.status(502).json({ error: 'La IA devolvió un formato inesperado' });
        }

        const teile = results.map(r => r.value);

        const insertRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/reading_texts`, {
            method: 'POST',
            headers: {
                apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=representation',
            },
            body: JSON.stringify({
                level,
                title: tema,
                content: `Simulacro de Leseverstehen ${level} — ${spec.length} Teile`,
                questions: { teile },
                format_version: 2,
            }),
        });
        if (!insertRes.ok) {
            const errText = await insertRes.text().catch(() => '');
            return res.status(502).json({ error: 'Error al guardar la sesión: ' + errText.slice(0, 200) });
        }
        const [row] = await insertRes.json();
        return res.status(200).json({
            text: { id: row.id, title: row.title, content: row.content, questions: row.questions, format_version: row.format_version },
        });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}
