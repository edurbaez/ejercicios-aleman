import webpush from 'web-push';
import { verifyJWT, createRateLimiter } from './_lib.js';

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
    process.env.VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

const isNotifyRateLimited = createRateLimiter(5, 60_000, 'notify-admins');

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

    if (req.method === 'POST' && req.body?.action === 'notify-admins') {
        if (await isNotifyRateLimited(userId)) return res.status(429).json({ error: 'Demasiadas solicitudes' });
        if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
            return res.status(500).json({ error: 'VAPID keys not configured' });
        }

        const { report_id } = req.body || {};
        if (!report_id) return res.status(400).json({ error: 'report_id requerido' });

        const reportR = await supaFetch(`feedback_reports?id=eq.${report_id}&select=user_id,tipo,mensaje`);
        const [report] = reportR.ok ? await reportR.json() : [];
        // Only the report's own author can trigger the admin notification for it.
        if (!report || report.user_id !== userId) return res.status(404).json({ error: 'Reporte no encontrado' });

        const adminsR = await supaFetch(`profiles?role=eq.admin&select=id`);
        const admins = adminsR.ok ? await adminsR.json() : [];
        if (!admins.length) return res.status(200).json({ ok: true, notified: 0 });

        const adminIds = admins.map(a => a.id).join(',');
        const subsR = await supaFetch(`push_subscriptions?user_id=in.(${adminIds})&select=id,subscription`);
        const subs = subsR.ok ? await subsR.json() : [];

        let notified = 0;
        await Promise.allSettled(subs.map(async (row) => {
            try {
                await webpush.sendNotification(
                    row.subscription,
                    JSON.stringify({
                        title: '📬 Nuevo reporte',
                        body: `${report.tipo === 'bug' ? 'Bug' : 'Sugerencia'}: ${report.mensaje.slice(0, 100)}`,
                        url: '/admin/#reportes',
                    })
                );
                notified++;
            } catch (err) {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    await supaFetch(`push_subscriptions?id=eq.${row.id}`, {
                        method: 'DELETE',
                        headers: { Prefer: 'return=minimal' },
                    });
                }
            }
        }));

        return res.status(200).json({ ok: true, notified });
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
