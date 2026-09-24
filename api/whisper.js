export const config = { api: { bodyParser: false } };

import { verifyJWT, createRateLimiter, checkAccess, fetchWithRetry } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:whisper');

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
const DAILY_LIMIT_MS = 60 * 60 * 1000; // 60 min, shared across all voice-STT apps (see auth.js VOICE_STT_APPS)
const TRIAL_DAILY_LIMIT_MS = 10 * 60 * 1000; // accounts still on the automatic 15-day trial
const VOICE_STT_APPS = ['mundliche', 'chat-voz', 'chatvoz2', 'chat-reformulaciones'];

// The client picks nothing: the model is forced here so a hand-rolled request can't
// ask for the pricier gpt-4o-transcribe. Keep in sync with the apps' FormData, which
// still sends a model field for readability — it gets replaced below either way.
const STT_MODEL = 'gpt-4o-mini-transcribe';
const MAX_AUDIO_BYTES = 25 * 1024 * 1024; // OpenAI's own per-file limit

// duration_ms is client-reported, so it can be under-reported (or sent as 0) to dodge
// the daily cap. We also derive a floor from the payload size and bill whichever is
// larger. 6 kB/s (~48 kbps) is above what MediaRecorder's Opus actually produces, so
// the derived value stays *below* the true duration — an honest client is never
// overcharged, while a client reporting 0 still burns most of its real usage.
const MAX_AUDIO_BYTES_PER_SECOND = 6000;

function _partName(headers) {
    const m = /name="([^"]*)"/i.exec(headers);
    return m ? m[1] : '';
}

// Splits a multipart body into { headers, body } parts. Returns null if the payload
// isn't well-formed multipart, in which case the caller forwards it untouched.
function _parseMultipart(buffer, boundary) {
    const delim = Buffer.from(`\r\n--${boundary}`);
    const buf = Buffer.concat([Buffer.from('\r\n'), buffer]);
    const parts = [];
    let start = buf.indexOf(delim);
    if (start === -1) return null;
    start += delim.length;
    for (;;) {
        if (buf[start] === 0x2d && buf[start + 1] === 0x2d) break; // closing "--"
        if (buf[start] === 0x0d && buf[start + 1] === 0x0a) start += 2;
        const end = buf.indexOf(delim, start);
        if (end === -1) return null;
        const raw = buf.subarray(start, end);
        const sep = raw.indexOf('\r\n\r\n');
        if (sep === -1) return null;
        parts.push({ headers: raw.subarray(0, sep).toString('latin1'), body: raw.subarray(sep + 4) });
        start = end + delim.length;
    }
    return parts.length ? parts : null;
}

function _buildMultipart(parts, boundary) {
    const chunks = [];
    for (const p of parts) {
        chunks.push(Buffer.from(`--${boundary}\r\n${p.headers}\r\n\r\n`), p.body, Buffer.from('\r\n'));
    }
    chunks.push(Buffer.from(`--${boundary}--\r\n`));
    return Buffer.concat(chunks);
}

// Rewrites the body so `model` is always ours, and reports the audio part's size.
// Falls back to the original buffer (model not forced) if the payload can't be parsed,
// so a browser quirk degrades the guard instead of breaking transcription outright.
export function forceModel(buffer, contentType) {
    const m = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType || '');
    if (!m) return { body: buffer, audioBytes: buffer.length };
    const boundary = (m[1] || m[2]).trim();
    const parts = _parseMultipart(buffer, boundary);
    if (!parts) return { body: buffer, audioBytes: buffer.length };

    const kept = parts.filter(p => _partName(p.headers) !== 'model');
    kept.push({ headers: 'Content-Disposition: form-data; name="model"', body: Buffer.from(STT_MODEL) });
    const file = kept.find(p => _partName(p.headers) === 'file');
    return { body: _buildMultipart(kept, boundary), audioBytes: file ? file.body.length : buffer.length };
}

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

    if (buffer.length > MAX_AUDIO_BYTES) {
        return res.status(413).json({ error: 'El audio supera el límite de 25 MB.' });
    }

    const { body, audioBytes } = forceModel(buffer, contentType);

    // Admins and authorized students get the full cap; accounts still on the
    // automatic trial get a tenth of it (see migration 009_access_control.sql).
    const onTrial = access.role !== 'admin' && access.status && access.status !== 'approved';
    const limitMs = onTrial ? TRIAL_DAILY_LIMIT_MS : DAILY_LIMIT_MS;

    const usedMs = await getDailyUsageMs(jwtPayload.sub);
    const thisCallMs = Math.round((audioBytes / MAX_AUDIO_BYTES_PER_SECOND) * 1000);
    if (usedMs + thisCallMs > limitMs) {
        return res.status(429).json({
            error: `Límite diario de ${Math.round(limitMs / 60000)} minutos de voz alcanzado.`,
            limit_ms: limitMs,
        });
    }

    try {
        const resp = await fetchWithRetry('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                Authorization:  `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': contentType,
            },
            body,
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
