import { verifyJWT, createRateLimiter } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:finanzas-history');

const cache = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

function fromCache(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) { cache.delete(key); return null; }
    return entry.data;
}

function toCache(key, data) {
    cache.set(key, { data, ts: Date.now() });
}

async function fetchCryptoHistory(id, days = 30) {
    const cacheKey = `crypto-hist:${id}:${days}`;
    const cached = fromCache(cacheKey);
    if (cached) return cached;

    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!resp.ok) throw new Error(`CoinGecko error ${resp.status}`);
    const raw = await resp.json();

    // raw.prices: [[timestamp_ms, price], ...]
    const data = (raw.prices || []).map(([ts, price]) => ({ t: ts, p: price }));
    toCache(cacheKey, data);
    return data;
}

async function fetchIndexHistory(symbol, days = 30) {
    const cacheKey = `index-hist:${symbol}:${days}`;
    const cached = fromCache(cacheKey);
    if (cached) return cached;

    const apiKey = process.env.TWELVE_DATA_API_KEY;
    if (!apiKey) throw new Error('TWELVE_DATA_API_KEY no configurada');

    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=${days}&apikey=${apiKey}`;
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!resp.ok) throw new Error(`Twelve Data error ${resp.status}`);
    const raw = await resp.json();

    if (raw.code) throw new Error(raw.message || 'Error de Twelve Data');

    // raw.values: [{ datetime, close, ... }, ...] — más reciente primero
    const data = (raw.values || [])
        .reverse()
        .map(v => ({ t: new Date(v.datetime).getTime(), p: parseFloat(v.close) }));

    toCache(cacheKey, data);
    return data;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Autenticación requerida' });

    const jwtPayload = await verifyJWT(token);
    if (!jwtPayload) return res.status(401).json({ error: 'Token inválido o expirado' });

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const { symbol, asset_type, days = 30 } = req.body;

    if (!symbol || !asset_type) {
        return res.status(400).json({ error: 'symbol y asset_type requeridos' });
    }
    if (!['crypto', 'index'].includes(asset_type)) {
        return res.status(400).json({ error: 'asset_type debe ser crypto o index' });
    }
    if (![7, 14, 30, 90].includes(days)) {
        return res.status(400).json({ error: 'days debe ser 7, 14, 30 o 90' });
    }

    try {
        const prices = asset_type === 'crypto'
            ? await fetchCryptoHistory(symbol, days)
            : await fetchIndexHistory(symbol, days);

        return res.status(200).json({ symbol, asset_type, days, prices });
    } catch (e) {
        return res.status(500).json({ error: e.message || 'Error interno' });
    }
}
