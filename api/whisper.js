export const config = { api: { bodyParser: false } };

import { createHmac, createPublicKey, verify as cryptoVerify } from 'crypto';

const SUPABASE_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
let _jwksCache = null;
let _jwksCacheTime = 0;

async function _getJWKS() {
    if (_jwksCache && Date.now() - _jwksCacheTime < 3_600_000) return _jwksCache;
    const resp = await fetch(`${SUPABASE_URL}/auth/v1/.well-known/jwks.json`);
    _jwksCache = await resp.json();
    _jwksCacheTime = Date.now();
    return _jwksCache;
}

// JWT verification — supports ES256 (current) and HS256 (legacy)
async function verifyJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const [header, payload, sig] = parts;
        const headerDecoded = JSON.parse(Buffer.from(header, 'base64url').toString('utf8'));
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;

        if (headerDecoded.alg === 'ES256') {
            const jwks = await _getJWKS();
            const jwk = jwks.keys?.find(k => k.kid === headerDecoded.kid);
            if (!jwk) return null;
            const publicKey = createPublicKey({ key: jwk, format: 'jwk' });
            const valid = cryptoVerify(
                'SHA256',
                Buffer.from(`${header}.${payload}`),
                { key: publicKey, dsaEncoding: 'ieee-p1363' },
                Buffer.from(sig, 'base64url')
            );
            if (!valid) return null;
        } else if (headerDecoded.alg === 'HS256') {
            const secret = process.env.SUPABASE_JWT_SECRET;
            if (!secret) return null;
            const expected = createHmac('sha256', secret)
                .update(`${header}.${payload}`)
                .digest('base64url');
            if (expected !== sig) return null;
        } else {
            return null;
        }

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
    const jwtPayload = await verifyJWT(token);
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
