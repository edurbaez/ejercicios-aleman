export const config = { api: { bodyParser: false } };

import { createHmac } from 'crypto';

// JWT verification using SUPABASE_JWT_SECRET (HS256)
function verifyJWT(token) {
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const [header, payload, sig] = parts;
        const expected = createHmac('sha256', secret)
            .update(`${header}.${payload}`)
            .digest('base64url');
        if (expected !== sig) return null;
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
        return decoded;
    } catch {
        return null;
    }
}

// Rate limiting: sliding window per user ID
const RATE_LIMIT = 10;
const WINDOW_MS  = 60_000;
const userStore  = new Map();

function isRateLimited(key) {
    const now   = Date.now();
    const entry = userStore.get(key);
    if (!entry || now - entry.windowStart > WINDOW_MS) {
        userStore.set(key, { count: 1, windowStart: now });
        return false;
    }
    if (entry.count >= RATE_LIMIT) return true;
    entry.count++;
    return false;
}

setInterval(() => {
    const cutoff = Date.now() - WINDOW_MS;
    for (const [k, entry] of userStore) {
        if (entry.windowStart < cutoff) userStore.delete(k);
    }
}, 300_000);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada' });
    }

    // JWT verification — required
    const authHeader = req.headers.authorization || '';
    const token      = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) {
        return res.status(401).json({ error: 'Autenticación requerida' });
    }
    const jwtPayload = verifyJWT(token);
    if (!jwtPayload) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    if (isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer      = Buffer.concat(chunks);
    const contentType = req.headers['content-type'];

    try {
        const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                Authorization:  `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': contentType,
            },
            body: buffer,
        });

        const raw = await resp.text();
        let data;
        try {
            data = JSON.parse(raw);
        } catch {
            return res.status(500).json({ error: `OpenAI devolvió respuesta inválida: ${raw.slice(0, 200)}` });
        }
        if (!resp.ok) {
            return res.status(resp.status).json({ error: data?.error?.message || 'Error de Whisper' });
        }
        return res.status(200).json({ text: data.text });
    } catch {
        return res.status(500).json({ error: 'Error interno' });
    }
}
