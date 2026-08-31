import { verifyJWT, createRateLimiter, checkAccess, fetchWithRetry } from './_lib.js';

const isRateLimited = createRateLimiter(3, 60_000, 'rl:image');

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

    const { prompt, size, quality } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'prompt requerido' });
    }
    if (prompt.length > 1500) {
        return res.status(400).json({ error: 'Prompt demasiado largo' });
    }

    const ALLOWED_SIZES = ['1024x1024', '1024x1536', '1536x1024'];
    const resolvedSize = ALLOWED_SIZES.includes(size) ? size : '1024x1536';
    const ALLOWED_QUALITY = ['low', 'medium', 'high'];
    const resolvedQuality = ALLOWED_QUALITY.includes(quality) ? quality : 'medium';

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }

    try {
        const response = await fetchWithRetry('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            // gpt-image models always return b64_json; response_format is not accepted
            body: JSON.stringify({
                model: 'gpt-image-2',
                prompt,
                n: 1,
                size: resolvedSize,
                quality: resolvedQuality,
            }),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return res.status(response.status).json({ error: err?.error?.message || 'Error de OpenAI Images' });
        }

        const data = await response.json();
        const b64 = data.data?.[0]?.b64_json;
        if (!b64) {
            return res.status(500).json({ error: 'OpenAI devolvió respuesta vacía' });
        }
        return res.status(200).json({ image_base64: b64 });
    } catch (e) {
        return res.status(500).json({ error: 'Error interno', debug: e?.message });
    }
}
