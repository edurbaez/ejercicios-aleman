export const config = { api: { bodyParser: false } };

import { verifyJWT, createRateLimiter } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:whisper');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada' });
    }

    const authHeader = req.headers.authorization || '';
    const token      = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) {
        return res.status(401).json({ error: 'Autenticación requerida' });
    }
    const contentType = req.headers['content-type'];

    const [jwtPayload, buffer] = await Promise.all([
        verifyJWT(token),
        (async () => {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            return Buffer.concat(chunks);
        })(),
    ]);

    if (!jwtPayload) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

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
