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

    const range = days <= 7 ? '5d' : days <= 30 ? '1mo' : '3mo';
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;
    const resp = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
    });
    if (!resp.ok) throw new Error(`Yahoo Finance error ${resp.status}`);
    const raw = await resp.json();

    const result = raw?.chart?.result?.[0];
    if (!result) throw new Error('Sin datos para este símbolo');

    const timestamps = result.timestamp || [];
    const closes = result.indicators?.quote?.[0]?.close || [];

    const data = timestamps
        .map((t, i) => ({ t: t * 1000, p: closes[i] }))
        .filter(d => d.p != null);

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
