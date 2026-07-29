import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createHmac } from 'crypto';
import { verifyJWT, createRateLimiter, fetchWithRetry } from '../../api/_lib.js';

function makeHS256Token(payload, secret) {
    const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const header = b64url({ alg: 'HS256', typ: 'JWT' });
    const body = b64url(payload);
    const sig = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
    return `${header}.${body}.${sig}`;
}

describe('verifyJWT', () => {
    const secret = 'test-secret';
    beforeEach(() => { process.env.SUPABASE_JWT_SECRET = secret; });
    afterEach(() => { delete process.env.SUPABASE_JWT_SECRET; });

    it('accepts a validly signed HS256 token', async () => {
        const token = makeHS256Token({ sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }, secret);
        const decoded = await verifyJWT(token);
        expect(decoded?.sub).toBe('user-1');
    });

    it('rejects a token signed with the wrong secret', async () => {
        const token = makeHS256Token({ sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }, 'wrong-secret');
        expect(await verifyJWT(token)).toBeNull();
    });

    it('rejects an expired token', async () => {
        const token = makeHS256Token({ sub: 'user-1', exp: Math.floor(Date.now() / 1000) - 10 }, secret);
        expect(await verifyJWT(token)).toBeNull();
    });

    it('rejects a malformed token', async () => {
        expect(await verifyJWT('not-a-jwt')).toBeNull();
    });
});

describe('createRateLimiter', () => {
    it('allows requests under the limit and blocks once the limit is exceeded', async () => {
        const isRateLimited = createRateLimiter(3, 60_000, 'rl:test:' + Math.random());
        expect(await isRateLimited('user-a')).toBe(false);
        expect(await isRateLimited('user-a')).toBe(false);
        expect(await isRateLimited('user-a')).toBe(false);
        expect(await isRateLimited('user-a')).toBe(true);
    });

    it('tracks separate users independently', async () => {
        const isRateLimited = createRateLimiter(1, 60_000, 'rl:test:' + Math.random());
        expect(await isRateLimited('user-a')).toBe(false);
        expect(await isRateLimited('user-b')).toBe(false);
        expect(await isRateLimited('user-a')).toBe(true);
    });
});

describe('fetchWithRetry', () => {
    const originalFetch = global.fetch;
    afterEach(() => { global.fetch = originalFetch; });

    it('returns immediately on a successful response', async () => {
        global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200 });
        const res = await fetchWithRetry('https://example.com');
        expect(res.ok).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('retries on a 429 and succeeds on the next attempt', async () => {
        global.fetch = vi.fn()
            .mockResolvedValueOnce({ ok: false, status: 429, headers: new Map(), text: async () => '' })
            .mockResolvedValueOnce({ ok: true, status: 200 });
        const res = await fetchWithRetry('https://example.com', {}, { baseDelayMs: 1, maxDelayMs: 5 });
        expect(res.ok).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('gives up after maxRetries and returns the last failing response', async () => {
        global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 503, headers: new Map(), text: async () => '' });
        const res = await fetchWithRetry('https://example.com', {}, { maxRetries: 2, baseDelayMs: 1, maxDelayMs: 5 });
        expect(res.ok).toBe(false);
        expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    it('does not retry on a non-retryable status', async () => {
        global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 400, headers: new Map(), text: async () => '' });
        const res = await fetchWithRetry('https://example.com', {}, { baseDelayMs: 1, maxDelayMs: 5 });
        expect(res.status).toBe(400);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
