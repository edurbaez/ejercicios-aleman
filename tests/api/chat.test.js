import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createHmac } from 'crypto';

const SECRET = 'test-secret';

function makeToken(sub = 'user-1', expiresInSec = 3600) {
    const b64url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const header = b64url({ alg: 'HS256', typ: 'JWT' });
    const body = b64url({ sub, exp: Math.floor(Date.now() / 1000) + expiresInSec });
    const sig = createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
    return `${header}.${body}.${sig}`;
}

function makeRes() {
    const res = {};
    res.statusCode = null;
    res.body = null;
    res.status = vi.fn((code) => { res.statusCode = code; return res; });
    res.json = vi.fn((payload) => { res.body = payload; return res; });
    return res;
}

function makeReq({ method = 'POST', token = makeToken(), body = {}, origin } = {}) {
    return {
        method,
        headers: {
            authorization: token ? `Bearer ${token}` : '',
            ...(origin ? { origin } : {}),
        },
        body,
    };
}

describe('api/chat.js handler', () => {
    const originalFetch = global.fetch;
    let handler;

    beforeEach(async () => {
        vi.resetModules();
        process.env.SUPABASE_JWT_SECRET = SECRET;
        process.env.OPENAI_API_KEY = 'sk-fake';
        delete process.env.SUPABASE_SERVICE_ROLE_KEY; // checkAccess fails open without it
        delete process.env.ALLOWED_ORIGIN;
        ({ default: handler } = await import('../../api/chat.js'));
    });

    afterEach(() => {
        global.fetch = originalFetch;
        delete process.env.SUPABASE_JWT_SECRET;
        delete process.env.OPENAI_API_KEY;
    });

    it('rejects non-POST methods', async () => {
        const req = makeReq({ method: 'GET' });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(405);
    });

    it('rejects requests with no Authorization header', async () => {
        const req = makeReq({ token: null });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(401);
    });

    it('rejects an invalid token', async () => {
        const req = { method: 'POST', headers: { authorization: 'Bearer garbage' }, body: {} };
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(401);
    });

    it('rejects a request from a disallowed origin when ALLOWED_ORIGIN is set', async () => {
        process.env.ALLOWED_ORIGIN = 'https://ejercicios-aleman.vercel.app';
        const req = makeReq({ origin: 'https://evil.example.com' });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(403);
    });

    it('requires a non-empty messages array', async () => {
        const req = makeReq({ body: {} });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/messages/i);
    });

    it('rejects more than 40 messages', async () => {
        const messages = Array.from({ length: 41 }, () => ({ role: 'user', content: 'hi' }));
        const req = makeReq({ body: { messages } });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(400);
    });

    it('returns 500 when OPENAI_API_KEY is not configured', async () => {
        delete process.env.OPENAI_API_KEY;
        const req = makeReq({ body: { messages: [{ role: 'user', content: 'hola' }] } });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(500);
    });

    it('proxies to OpenAI and returns the reply on success', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ choices: [{ message: { content: 'Hallo!' } }] }),
        });
        const req = makeReq({ body: { messages: [{ role: 'user', content: 'hola' }] } });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ reply: 'Hallo!' });
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.openai.com/v1/chat/completions',
            expect.objectContaining({ method: 'POST' })
        );
    });

    it('forwards the OpenAI error status when the upstream call fails', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 400, // non-retryable so this test stays fast; retry behavior is covered in _lib.test.js
            headers: new Map(),
            text: async () => '',
            json: async () => ({ error: { message: 'upstream down' } }),
        });
        const req = makeReq({ body: { messages: [{ role: 'user', content: 'hola' }] } });
        const res = makeRes();
        await handler(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('upstream down');
    });

    it('rate-limits a user after 20 requests within the window', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
        });
        const token = makeToken('rate-limited-user');
        const body = { messages: [{ role: 'user', content: 'hola' }] };
        let lastRes;
        for (let i = 0; i < 21; i++) {
            const req = makeReq({ token, body });
            lastRes = makeRes();
            await handler(req, lastRes);
        }
        expect(lastRes.statusCode).toBe(429);
    });
});
