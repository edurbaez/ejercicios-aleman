import { verifyJWT, createRateLimiter } from './_lib.js';
import { TEMAS, PERSONAS, LUGARES, TONOS, MOMENTOS, CONFLICTOS, pick } from './_reading-topics.js';

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

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const { action, messages, system, max_tokens, json, temperature } = req.body;

    if (action === 'generate-reading') {
        return generateReading(req, res);
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

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
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

    const tema      = pick(TEMAS[level]);
    const personas  = pick(PERSONAS);
    const lugar     = pick(LUGARES);
    const tono      = pick(TONOS);
    const momento   = pick(MOMENTOS);
    const conflicto = pick(CONFLICTOS);

    let recentTitles = [];
    try {
        const recentRes = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/reading_texts?level=eq.${level}&select=title&order=created_at.desc&limit=8`,
            { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
        );
        if (recentRes.ok) recentTitles = (await recentRes.json()).map(r => r.title);
    } catch { /* best-effort — a failed lookup shouldn't block generation */ }

    const prompt = `Genera un texto en alemán de nivel ${level} (100-150 palabras) con título.
Tema: ${tema}.
La situación debe involucrar a ${personas} en ${lugar}, ${momento}, contada como ${tono}. En la historia, ${conflicto}.${recentTitles.length ? `\nNo repitas estos títulos ni sus situaciones: ${recentTitles.join(', ')}.` : ''}
Luego genera 4 preguntas de comprensión de selección múltiple. Responde SOLO con JSON: {"titulo": "...", "contenido": "...", "preguntas": [{"pregunta": "...", "opciones": ["A","B","C","D"], "correcta": 0}]}`;

    try {
        const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
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
