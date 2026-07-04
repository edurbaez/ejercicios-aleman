import { verifyJWT, createRateLimiter } from './_lib.js';

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

    const { messages, system, max_tokens, json } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages requerido' });
    }
    if (messages.length > 40) {
        return res.status(400).json({ error: 'Demasiados mensajes' });
    }
    if (system && String(system).length > 2000) {
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
