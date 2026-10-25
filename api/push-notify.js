import webpush from 'web-push';
import { isValidPushSubscription } from './_lib.js';

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
const INTERVAL_SLACK_MINUTES = 5;

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
    process.env.VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

function supaFetch(path, options = {}) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    return fetch(`${SUPA_URL}/rest/v1/${path}`, {
        ...options,
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const secret = process.env.CRON_SECRET;
    const provided = (req.headers.authorization || '').replace('Bearer ', '');
    if (!secret || provided !== secret) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
        return res.status(500).json({ error: 'VAPID keys not configured' });
    }

    const r = await supaFetch('push_subscriptions?select=*');
    if (!r.ok) return res.status(500).json({ error: 'DB error' });
    const rows = await r.json();

    const now = new Date();
    const nowUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

    const results = { sent: 0, skipped: 0, removed: 0, errors: 0 };

    await Promise.allSettled(rows.map(async (row) => {
        // Convert UTC to user's local hour
        const localMinutes = ((nowUtcMinutes + row.utc_offset_minutes) % 1440 + 1440) % 1440;
        const localHour = Math.floor(localMinutes / 60);

        if (localHour < row.window_start || localHour >= row.window_end) {
            results.skipped++;
            return;
        }

        if (row.last_notified_at) {
            const minutesSince = (now - new Date(row.last_notified_at)) / 60_000;
            const intervalMinutes = row.interval_minutes ?? row.interval_hours * 60;
            // last_notified_at is stamped a few seconds after each cron tick, so without slack
            // the next tick lands just short of the interval and every reminder skips one cycle.
            if (minutesSince < intervalMinutes - INTERVAL_SLACK_MINUTES) {
                results.skipped++;
                return;
            }
        }

        if (!isValidPushSubscription(row.subscription)) {
            results.skipped++;
            return;
        }

        try {
            await webpush.sendNotification(
                row.subscription,
                JSON.stringify({
                    title: '¡Practica alemán! 🇩🇪',
                    body: 'Es hora de tu sesión de estudio.',
                    url: '/',
                })
            );

            await supaFetch(`push_subscriptions?id=eq.${row.id}`, {
                method: 'PATCH',
                headers: { Prefer: 'return=minimal' },
                body: JSON.stringify({ last_notified_at: now.toISOString() }),
            });
            results.sent++;
        } catch (err) {
            if (err.statusCode === 410 || err.statusCode === 404) {
                // Subscription expired — remove it
                await supaFetch(`push_subscriptions?id=eq.${row.id}`, {
                    method: 'DELETE',
                    headers: { Prefer: 'return=minimal' },
                });
                results.removed++;
            } else {
                results.errors++;
            }
        }
    }));

    return res.status(200).json(results);
}
