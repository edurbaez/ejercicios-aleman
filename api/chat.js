import { verifyJWT, createRateLimiter, checkAccess, fetchWithRetry } from './_lib.js';
import { TEMAS, PERSONAS, LUGARES, TONOS, MOMENTOS, CONFLICTOS, READING_SPECS, READING_TEILE_SPECS, pick } from './_reading-topics.js';

const isRateLimited = createRateLimiter(20, 60_000, 'rl:chat');

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

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const { action, messages, system, max_tokens, json, temperature } = req.body;

    if (action === 'generate-reading') {
        return generateReading(req, res);
    }

    if (action === 'generate-practice') {
        return generatePractice(req, res);
    }

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages requerido' });
    }
    if (messages.length > 40) {
        return res.status(400).json({ error: 'Demasiados mensajes' });
    }
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
Luego genera 4 preguntas de comprensión de selección múltiple. Responde SOLO con JSON: {"titulo": "...", "contenido": "...", "preguntas": [{"pregunta": "...", "opciones": ["A","B","C","D"], "correcta": 0}]}`
        : `Genera un texto en alemán de nivel ${level} (${spec.minWords}-${spec.maxWords} palabras) con título, en forma de ${spec.textType}.
Tema: ${tema}.
La situación debe involucrar a ${pick(PERSONAS)} en ${pick(LUGARES)}, ${pick(MOMENTOS)}, contada como ${pick(TONOS)}. En la historia, ${pick(CONFLICTOS)}.${noRepeat}
Luego genera 4 preguntas de comprensión de selección múltiple. Responde SOLO con JSON: {"titulo": "...", "contenido": "...", "preguntas": [{"pregunta": "...", "opciones": ["A","B","C","D"], "correcta": 0}]}`;

    try {
        const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 1200,
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
                && Number.isInteger(p.correcta) && p.correcta >= 0 && p.correcta < 4);
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
    const { system, prompt } = req.body;

    if (!ruleId) return res.status(400).json({ error: 'ruleId requerido' });
    if (!['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
        return res.status(400).json({ error: 'level inválido (A1–C2)' });
    }
    if (typeof prompt !== 'string' || !prompt) return res.status(400).json({ error: 'prompt requerido' });
    if (system && String(system).length > 4000) {
        return res.status(400).json({ error: 'System prompt demasiado largo' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(500).json({ error: 'Supabase no configurado en Vercel' });
    }

    try {
        const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 400,
                messages: system
                    ? [{ role: 'system', content: String(system) }, { role: 'user', content: prompt }]
                    : [{ role: 'user', content: prompt }],
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

// ── format_version 2: Teile-based sessions (see lecturaplan.md) ──────────────────

function validMcqTeil(t, opcionesCount = 3) {
    return Array.isArray(t.textos) && t.textos.length > 0
        && t.textos.every(x => typeof x.titulo === 'string' && typeof x.contenido === 'string')
        && Array.isArray(t.items) && t.items.length > 0
        && t.items.every(it =>
            typeof it.pregunta === 'string'
            && Array.isArray(it.opciones) && it.opciones.length === opcionesCount
            && Number.isInteger(it.correcta) && it.correcta >= 0 && it.correcta < opcionesCount);
}

function validRichtigFalschTeil(t) {
    return Array.isArray(t.textos) && t.textos.length > 0
        && t.textos.every(x => typeof x.titulo === 'string' && typeof x.contenido === 'string')
        && Array.isArray(t.items) && t.items.length > 0
        && t.items.every(it => typeof it.afirmacion === 'string' && typeof it.correcta === 'boolean');
}

function validEmparejarTeil(t) {
    if (!Array.isArray(t.columnaIzquierda) || t.columnaIzquierda.length === 0) return false;
    if (!Array.isArray(t.columnaDerecha) || t.columnaDerecha.length < t.columnaIzquierda.length) return false;
    const isItem = x => x && typeof x.id === 'string' && typeof x.texto === 'string';
    if (!t.columnaIzquierda.every(isItem) || !t.columnaDerecha.every(isItem)) return false;
    if (!t.solucion || typeof t.solucion !== 'object') return false;
    const derechaIds = new Set(t.columnaDerecha.map(x => x.id));
    return t.columnaIzquierda.every(izq =>
        typeof t.solucion[izq.id] === 'string' && derechaIds.has(t.solucion[izq.id]));
}

const TEIL_VALIDATORS = { mcq: validMcqTeil, richtig_falsch: validRichtigFalschTeil, emparejar: validEmparejarTeil };

function validTeileSession(parsed, spec) {
    if (!parsed || typeof parsed.titulo !== 'string' || !Array.isArray(parsed.teile)) return false;
    if (parsed.teile.length !== spec.length) return false;
    return spec.every((expected, i) => {
        const t = parsed.teile[i];
        return t && t.id === expected.id && t.tipo === expected.tipo
            && typeof t.instrucciones === 'string'
            && TEIL_VALIDATORS[expected.tipo](t, expected.opcionesCount || 3);
    });
}

function buildTeilePrompt(level, spec, tema) {
    const { minWords, maxWords } = READING_SPECS[level];
    const teilPrompts = spec
        .map(t => t.promptFragment.replace(/\{minWords\}/g, minWords).replace(/\{maxWords\}/g, maxWords))
        .join('\n');

    return `Genera una sesión de comprensión lectora en alemán de nivel ${level}, siguiendo el formato del examen Goethe/telc Leseverstehen (estructura general, sin copiar textos de exámenes reales). Tema general de fondo: ${tema}.

Genera estos 5 Teile:
${teilPrompts}

Responde SOLO con JSON válido (sin markdown) con este formato exacto:
{"titulo": "título general de la sesión", "teile": [
  {"id":"teil1","tipo":"mcq","instrucciones":"instrucción en español de qué hacer","textos":[{"titulo":"...","contenido":"..."}],"items":[{"pregunta":"...","opciones":["...","...","..."],"correcta":0}]},
  {"id":"teil2","tipo":"emparejar","instrucciones":"...","columnaIzquierda":[{"id":"p1","texto":"..."}],"columnaDerecha":[{"id":"a1","texto":"..."}],"solucion":{"p1":"a1"}},
  {"id":"teil3","tipo":"emparejar","instrucciones":"...","textos":[{"titulo":"...","contenido":"..."}],"columnaIzquierda":[{"id":"s1","texto":"..."}],"columnaDerecha":[{"id":"anna","texto":"Anna"}],"solucion":{"s1":"anna"}},
  {"id":"teil4","tipo":"richtig_falsch","instrucciones":"...","textos":[{"titulo":"...","contenido":"..."}],"items":[{"afirmacion":"...","correcta":true}]},
  {"id":"teil5","tipo":"emparejar","instrucciones":"...","columnaIzquierda":[{"id":"s1","texto":"..."}],"columnaDerecha":[{"id":"r1","texto":"..."}],"solucion":{"s1":"r1"}}
]}
Todo el contenido en alemán (textos, opciones, anuncios, reglas) debe ser apropiado para nivel ${level}. Las "instrucciones" de cada Teil van en español, breves, explicando la tarea al estudiante.`;
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

    const noRepeat = recentTitles.length ? `\nNo repitas estos títulos ni sus situaciones: ${recentTitles.join(', ')}.` : '';
    const prompt = buildTeilePrompt(level, spec, tema) + noRepeat;

    try {
        const aiRes = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                max_tokens: 4200,
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

        if (!validTeileSession(parsed, spec)) {
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
                content: `Simulacro de Leseverstehen ${level} — ${spec.length} Teile`,
                questions: { teile: parsed.teile },
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
