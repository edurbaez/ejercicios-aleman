import { verifyJWT, createRateLimiter, checkAccess, fetchWithRetry } from './_lib.js';

const isRateLimited = createRateLimiter(20, 60_000, 'rl:deepseek-chat');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
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

    if (!process.env.DEEPSEEK_API_KEY) {
        return res.status(500).json({ error: 'DEEPSEEK_API_KEY no configurada en Vercel' });
    }

    const resolvedMaxTokens =
        Number.isInteger(max_tokens) && max_tokens > 0 && max_tokens <= 4096
            ? max_tokens
            : 500;

    try {
        const body = {
            model: 'deepseek-v4-flash',
            max_tokens: resolvedMaxTokens,
            messages: system
                ? [{ role: 'system', content: String(system) }, ...messages]
                : messages,
        };
        if (json === true) body.response_format = { type: 'json_object' };

        const response = await fetchWithRetry('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return res.status(response.status).json({ error: err?.error?.message || 'Error de DeepSeek' });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || '';
        if (!reply) {
            return res.status(500).json({
                error: 'DeepSeek devolvió respuesta vacía',
                debug: JSON.stringify(data).slice(0, 300),
            });
        }
        return res.status(200).json({ reply });
    } catch (e) {
        return res.status(500).json({ error: 'Error interno', debug: e?.message });
    }
}
