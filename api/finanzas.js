import { verifyJWT, createRateLimiter, checkAccess } from './_lib.js';

const isRateLimited = createRateLimiter(10, 60_000, 'rl:finanzas');

const cache = new Map();
const PRICE_TTL_MS = 5 * 60 * 1000;
const HISTORY_TTL_MS = 30 * 60 * 1000;

function fromCache(key, ttl) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > ttl) { cache.delete(key); return null; }
    return entry.data;
}

function toCache(key, data) {
    cache.set(key, { data, ts: Date.now() });
}

const YAHOO_HEADERS = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

// ─── Price ───

async function fetchCrypto(ids) {
    if (!ids.length) return {};
    const cacheKey = 'crypto:' + ids.sort().join(',');
    const cached = fromCache(cacheKey, PRICE_TTL_MS);
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
    const cached = fromCache(cacheKey, PRICE_TTL_MS);
    if (cached) return cached;

    const encoded = symbols.map(s => encodeURIComponent(s)).join(',');
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encoded}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,shortName`;
    const resp = await fetch(url, { headers: YAHOO_HEADERS });
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

async function handlePrice(req, res) {
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

    const [cryptoData, indicesData] = await Promise.all([
        fetchCrypto(crypto),
        fetchIndices(indices),
    ]);
    return res.status(200).json({ crypto: cryptoData, indices: indicesData });
}

// ─── History ───

async function fetchCryptoHistory(id, days = 30) {
    const cacheKey = `crypto-hist:${id}:${days}`;
    const cached = fromCache(cacheKey, HISTORY_TTL_MS);
    if (cached) return cached;

    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!resp.ok) throw new Error(`CoinGecko error ${resp.status}`);
    const raw = await resp.json();

    const data = (raw.prices || []).map(([ts, price]) => ({ t: ts, p: price }));
    toCache(cacheKey, data);
    return data;
}

async function fetchIndexHistory(symbol, days = 30) {
    const cacheKey = `index-hist:${symbol}:${days}`;
    const cached = fromCache(cacheKey, HISTORY_TTL_MS);
    if (cached) return cached;

    const range = days <= 7 ? '5d' : days <= 30 ? '1mo' : '3mo';
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;
    const resp = await fetch(url, { headers: YAHOO_HEADERS });
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

async function handleHistory(req, res) {
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

    const prices = asset_type === 'crypto'
        ? await fetchCryptoHistory(symbol, days)
        : await fetchIndexHistory(symbol, days);

    return res.status(200).json({ symbol, asset_type, days, prices });
}

// ─── Handler ───

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Autenticación requerida' });

    const jwtPayload = await verifyJWT(token);
    if (!jwtPayload) return res.status(401).json({ error: 'Token inválido o expirado' });

    const access = await checkAccess(jwtPayload.sub);
    if (!access.valid) {
        return res.status(403).json({ error: 'Acceso restringido', status: access.status, expires_at: access.expires_at });
    }

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' });
    }

    const { action } = req.body || {};
    try {
        if (action === 'history') return await handleHistory(req, res);
        if (action === 'price') return await handlePrice(req, res);
        return res.status(400).json({ error: 'action debe ser price o history' });
    } catch (e) {
        return res.status(500).json({ error: e.message || 'Error interno' });
    }
}
