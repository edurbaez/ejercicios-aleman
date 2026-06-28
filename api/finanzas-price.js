import { verifyJWT, createRateLimiter } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:finanzas-price');

// In-memory cache: evita agotar el free tier de Twelve Data (800 req/día)
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

    const apiKey = process.env.TWELVE_DATA_API_KEY;
    if (!apiKey) throw new Error('TWELVE_DATA_API_KEY no configurada');

    const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(',')}&apikey=${apiKey}`;
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!resp.ok) throw new Error(`Twelve Data error ${resp.status}`);
    const raw = await resp.json();

    // Twelve Data devuelve el objeto directamente si es 1 símbolo,
    // o un objeto { SYMBOL: {...} } si son varios
    const data = {};
    if (symbols.length === 1) {
        const s = symbols[0];
        if (raw.code) throw new Error(raw.message || 'Error de Twelve Data');
        data[s] = {
            price: parseFloat(raw.close),
            change: parseFloat(raw.change),
            percent_change: parseFloat(raw.percent_change),
            name: raw.name,
        };
    } else {
        for (const s of symbols) {
            const q = raw[s];
            if (!q || q.code) continue;
            data[s] = {
                price: parseFloat(q.close),
                change: parseFloat(q.change),
                percent_change: parseFloat(q.percent_change),
                name: q.name,
            };
        }
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
