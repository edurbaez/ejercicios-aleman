export const config = { api: { bodyParser: false } };

import { verifyJWT, createRateLimiter, checkAccess } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:whisper');

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
const DAILY_LIMIT_MS = 60 * 60 * 1000; // 60 min, shared across all voice-STT apps (see auth.js VOICE_STT_APPS)
const VOICE_STT_APPS = ['mundliche', 'chat-voz', 'chatvoz2', 'chat-reformulaciones'];

// duration_ms is client-reported (browser recording timer), not verified against actual audio bytes —
// this check only prevents bypassing the client-side gate via a direct fetch, not a spoofed duration_ms.
async function getDailyUsageMs(userId) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key) return 0;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const appsFilter = `(${VOICE_STT_APPS.join(',')})`;
    const url = `${SUPA_URL}/rest/v1/usage_events?select=payload&user_id=eq.${userId}&event_type=eq.audio_sent&app=in.${appsFilter}&created_at=gte.${startOfDay.toISOString()}`;
    try {
        const resp = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
        if (!resp.ok) return 0;
        const rows = await resp.json();
        return rows.reduce((sum, r) => sum + (r.payload?.duration_ms || 0), 0);
    } catch {
        return 0;
    }
}

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

    const access = await checkAccess(jwtPayload.sub);
    if (!access.valid) {
        return res.status(403).json({ error: 'Acceso restringido', status: access.status, expires_at: access.expires_at });
    }

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const usedMs = await getDailyUsageMs(jwtPayload.sub);
    if (usedMs >= DAILY_LIMIT_MS) {
        return res.status(429).json({ error: 'Límite diario de 60 minutos de voz alcanzado.' });
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
