import webpush from 'web-push';
import { verifyJWT, createRateLimiter, isValidPushSubscription } from './_lib.js';

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
    process.env.VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

const isNotifyRateLimited = createRateLimiter(5, 60_000, 'notify-admins');
const isRateLimited = createRateLimiter(20, 60_000, 'rl:push');
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function intInRange(v, min, max, fallback) {
    if (v === undefined || v === null) return fallback;
    return Number.isInteger(v) && v >= min && v <= max ? v : NaN;
}

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
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token' });

    const payload = await verifyJWT(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido' });
    const userId = payload.sub;
    if (await isRateLimited(userId)) return res.status(429).json({ error: 'Demasiadas solicitudes' });

    if (req.method === 'GET') {
        const r = await supaFetch(
            `push_subscriptions?select=interval_hours,interval_minutes,window_start,window_end,last_notified_at&user_id=eq.${userId}`,
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
        if (typeof report_id !== 'string' || !UUID_RE.test(report_id)) return res.status(400).json({ error: 'report_id inválido' });

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
        const { subscription, interval_minutes, interval_hours, window_start, window_end, utc_offset_minutes } = req.body || {};
        if (!isValidPushSubscription(subscription)) return res.status(400).json({ error: 'subscription inválida' });
        const legacyHours = intInRange(interval_hours, 1, 168, 1);
        const minutes = intInRange(interval_minutes, 30, 10080, legacyHours * 60);
        const prefs = {
            interval_minutes: minutes,
            interval_hours: Number.isNaN(minutes) ? NaN : Math.max(1, Math.round(minutes / 60)),
            window_start: intInRange(window_start, 0, 23, 8),
            window_end: intInRange(window_end, 1, 24, 20),
            utc_offset_minutes: intInRange(utc_offset_minutes, -840, 840, 0),
        };
        if (Object.values(prefs).some(Number.isNaN)) return res.status(400).json({ error: 'Preferencias inválidas' });

        const r = await supaFetch('push_subscriptions?on_conflict=user_id', {
            method: 'POST',
            headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
            body: JSON.stringify({
                user_id: userId,
                subscription: { endpoint: subscription.endpoint, keys: { p256dh: subscription.keys.p256dh, auth: subscription.keys.auth } },
                ...prefs,
            }),
        });

        if (!r.ok) {
            console.error('[push-subscribe] upsert failed', r.status, await r.text().catch(() => ''));
            return res.status(500).json({ error: 'No se pudo guardar la suscripción' });
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
