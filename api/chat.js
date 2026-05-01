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
const RATE_LIMIT = 20;
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
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Origin check
    const origin  = req.headers.origin || '';
    const allowed = process.env.ALLOWED_ORIGIN;
    if (allowed && origin && origin !== allowed) {
        return res.status(403).json({ error: 'Origen no permitido' });
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

    // Rate limit by user ID
    if (isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const { messages, system } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'messages requerido' });
    }
    if (messages.length > 20) {
        return res.status(400).json({ error: 'Demasiados mensajes' });
    }
    if (system && String(system).length > 2000) {
        return res.status(400).json({ error: 'System prompt demasiado largo' });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada en Vercel' });
    }

    try {
        const body = {
            model: 'gpt-4o-mini',
            max_tokens: 500,
            messages: system
                ? [{ role: 'system', content: String(system) }, ...messages]
                : messages,
        };

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
