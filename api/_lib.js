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

_getJWKS().catch(() => {});

export async function verifyJWT(token) {
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

// Returns an isRateLimited(userId) function.
// Uses Vercel KV (Redis) when KV_REST_API_URL is set; falls back to in-memory Map.
export function createRateLimiter(limit, windowMs = 60_000, namespace = 'rl') {
    const memStore = new Map();

    setInterval(() => {
        const cutoff = Date.now() - windowMs;
        for (const [k, entry] of memStore) {
            if (entry.windowStart < cutoff) memStore.delete(k);
        }
    }, 300_000);

    return async function isRateLimited(userId) {
        if (process.env.KV_REST_API_URL) {
            try {
                const { kv } = await import('@vercel/kv');
                const key = `${namespace}:${userId}`;
                const windowSec = Math.ceil(windowMs / 1000);
                const count = await kv.incr(key);
                if (count === 1) await kv.expire(key, windowSec);
                return count > limit;
            } catch {
                // KV unavailable — fall through to memory store
            }
        }

        const now = Date.now();
        const entry = memStore.get(userId);
        if (!entry || now - entry.windowStart > windowMs) {
            memStore.set(userId, { count: 1, windowStart: now });
            return false;
        }
        if (entry.count >= limit) return true;
        entry.count++;
        return false;
    };
}
