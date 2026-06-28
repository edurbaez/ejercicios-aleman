import { verifyJWT } from './_lib.js';

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';

function supaFetch(path, options = {}) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    return fetch(`${SUPA_URL}/rest/v1/${path}`, {
        ...options,
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
            ...(options.headers || {}),
        },
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });

    const payload = await verifyJWT(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido' });
    const userId = payload.sub;

    if (req.method === 'GET') {
        const r = await supaFetch(
            `push_subscriptions?select=interval_hours,window_start,window_end,last_notified_at&user_id=eq.${userId}`,
            { method: 'GET', headers: { Prefer: 'return=representation' } }
        );
        const rows = await r.json();
        return res.status(200).json({ subscription: rows[0] || null });
    }

    if (req.method === 'POST') {
        const { subscription, interval_hours, window_start, window_end, utc_offset_minutes } = req.body || {};
        if (!subscription) return res.status(400).json({ error: 'subscription requerida' });

        const r = await supaFetch('push_subscriptions', {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
            body: JSON.stringify({
                user_id: userId,
                subscription,
                interval_hours: interval_hours ?? 1,
                window_start: window_start ?? 8,
                window_end: window_end ?? 20,
                utc_offset_minutes: utc_offset_minutes ?? 0,
            }),
        });

        if (!r.ok) {
            const err = await r.text();
            return res.status(500).json({ error: err });
        }
        return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
        await supaFetch(`push_subscriptions?user_id=eq.${userId}`, {
            method: 'DELETE',
            headers: { Prefer: 'return=minimal' },
        });
        return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Método no permitido' });
}
