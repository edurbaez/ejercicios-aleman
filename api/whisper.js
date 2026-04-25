export const config = { api: { bodyParser: false } };

const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const ipStore = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const entry = ipStore.get(ip);
    if (!entry || now - entry.windowStart > WINDOW_MS) {
        ipStore.set(ip, { count: 1, windowStart: now });
        return false;
    }
    if (entry.count >= RATE_LIMIT) return true;
    entry.count++;
    return false;
}

setInterval(() => {
    const cutoff = Date.now() - WINDOW_MS;
    for (const [ip, entry] of ipStore) {
        if (entry.windowStart < cutoff) ipStore.delete(ip);
    }
}, 300_000);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada' });
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const contentType = req.headers['content-type'];

    try {
        const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization':  `Bearer ${process.env.OPENAI_API_KEY}`,
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
    } catch (e) {
        return res.status(500).json({ error: 'Error interno' });
    }
}
