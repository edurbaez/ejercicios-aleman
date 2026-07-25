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

// Checks profiles.status / access_expires_at (see supabase/migrations/009_access_control.sql)
// for the given user. Fails open (valid: true) when SUPABASE_SERVICE_ROLE_KEY is unset or the
// Supabase REST call errors — same "no-op if unconfigured" convention as whisper.js's daily-usage
// check, so a Supabase hiccup doesn't take every endpoint down for every user.
export async function checkAccess(userId) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!key) return { valid: true };
    try {
        const resp = await fetch(
            `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=status,access_expires_at`,
            { headers: { apikey: key, Authorization: `Bearer ${key}` } }
        );
        if (!resp.ok) return { valid: true };
        const [profile] = await resp.json();
        if (!profile) return { valid: true };
        const valid = profile.status !== 'blocked'
            && (!profile.access_expires_at || new Date(profile.access_expires_at) > new Date());
        return { valid, status: profile.status, expires_at: profile.access_expires_at };
    } catch {
        return { valid: true };
    }
}

// Retries a fetch call on 429 (rate limit) and transient 5xx errors, honoring the
// Retry-After header when the provider sends one. Exponential backoff + jitter,
// capped at maxDelayMs so total added latency stays well inside Vercel's 60s
// maxDuration even after 3 retries (~4s worst case with the defaults below).
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

export async function fetchWithRetry(url, options = {}, { maxRetries = 3, baseDelayMs = 500, maxDelayMs = 8000 } = {}) {
    let lastResponse;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const response = await fetch(url, options);
        if (response.ok || !RETRYABLE_STATUS.has(response.status) || attempt === maxRetries) {
            return response;
        }
        lastResponse = response;
        try { await response.text(); } catch { /* drain body before retrying */ }

        const retryAfterSec = Number(response.headers.get('retry-after'));
        const delay = Number.isFinite(retryAfterSec) && retryAfterSec > 0
            ? Math.min(retryAfterSec * 1000, maxDelayMs)
            : Math.min(baseDelayMs * 2 ** attempt, maxDelayMs) + Math.random() * 250;
        await new Promise(r => setTimeout(r, delay));
    }
    return lastResponse;
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
