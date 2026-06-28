import { verifyJWT, createRateLimiter } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:finanzas-price');

const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

function fromCache(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) { cache.delete(key); return null; }
    return entry.data;
}

function toCache(key, data) {
    cache.set(key, { data, ts: Date.now() });
}

async function fetchCrypto(ids) {
    if (!ids.length) return {};
    const cacheKey = 'crypto:' + ids.sort().join(',');
    const cached = fromCache(cacheKey);
    if (cached) return cached;

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`;
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!resp.ok) throw new Error(`CoinGecko error ${resp.status}`);
    const data = await resp.json();
    toCache(cacheKey, data);
    return data;
}

async function fetchIndices(symbols) {
    if (!symbols.length) return {};
    const cacheKey = 'indices:' + symbols.sort().join(',');
    const cached = fromCache(cacheKey);
    if (cached) return cached;

    const encoded = symbols.map(s => encodeURIComponent(s)).join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encoded}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,shortName`;
    const resp = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
    });
    if (!resp.ok) throw new Error(`Yahoo Finance error ${resp.status}`);
    const raw = await resp.json();

    const data = {};
    for (const q of (raw?.quoteResponse?.result || [])) {
        data[q.symbol] = {
            price: q.regularMarketPrice,
            change: q.regularMarketChange,
            percent_change: q.regularMarketChangePercent,
            name: q.shortName || q.symbol,
        };
    }
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

    const { crypto = [], indices = [] } = req.body;

    if (!Array.isArray(crypto) || !Array.isArray(indices)) {
        return res.status(400).json({ error: 'crypto e indices deben ser arrays' });
    }
    if (crypto.length + indices.length === 0) {
        return res.status(400).json({ error: 'Envía al menos un símbolo' });
    }
    if (crypto.length > 20 || indices.length > 10) {
        return res.status(400).json({ error: 'Demasiados símbolos' });
    }

    try {
        const [cryptoData, indicesData] = await Promise.all([
            fetchCrypto(crypto),
            fetchIndices(indices),
        ]);
        return res.status(200).json({ crypto: cryptoData, indices: indicesData });
    } catch (e) {
        return res.status(500).json({ error: e.message || 'Error interno' });
    }
}
