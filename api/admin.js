import { verifyJWT } from './_lib.js';

const VALID_STATUSES = new Set(['approved', 'blocked', 'pending']);

async function handleInvite(req, res, supaUrl, serviceKey) {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'email inválido' });
    }

    const inviteRes = await fetch(`${supaUrl}/auth/v1/invite`, {
        method: 'POST',
        headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const raw = await inviteRes.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = {}; }

    if (!inviteRes.ok) {
        return res.status(inviteRes.status).json({ error: data.message || data.msg || 'Error al enviar invitación' });
    }
    return res.status(200).json({ message: `Invitación enviada a ${email}` });
}

async function handleSetStatus(req, res, supaUrl, serviceKey) {
    const { userId, status, access_expires_at } = req.body;
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId requerido' });
    }
    if (!VALID_STATUSES.has(status)) {
        return res.status(400).json({ error: 'status debe ser approved, blocked o pending' });
    }
    // access_expires_at is optional: omit to leave it untouched, null for unlimited access,
    // or an ISO date string to set/extend the access window (see supabase/migrations/009_access_control.sql).
    const body = { status };
    if (access_expires_at !== undefined) {
        if (access_expires_at !== null && Number.isNaN(Date.parse(access_expires_at))) {
            return res.status(400).json({ error: 'access_expires_at debe ser null o una fecha válida' });
        }
        body.access_expires_at = access_expires_at;
    }

    const updateRes = await fetch(
        `${supaUrl}/rest/v1/profiles?id=eq.${userId}`,
        {
            method: 'PATCH',
            headers: {
                apikey: serviceKey,
                Authorization: `Bearer ${serviceKey}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
            },
            body: JSON.stringify(body),
        }
    );

    if (!updateRes.ok) {
        const err = await updateRes.text();
        return res.status(500).json({ error: `Error al actualizar: ${err}` });
    }

    return res.status(200).json({ message: `Usuario ${status === 'approved' ? 'aprobado' : status === 'blocked' ? 'bloqueado' : 'puesto en pendiente'} correctamente` });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'No autenticado' });

    const payload = await verifyJWT(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido o expirado' });

    const supaUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supaUrl || !serviceKey) {
        return res.status(500).json({ error: 'Configuración de servidor incompleta (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)' });
    }

    const profileRes = await fetch(
        `${supaUrl}/rest/v1/profiles?id=eq.${payload.sub}&select=role`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    const profiles = await profileRes.json().catch(() => []);
    if (!profiles[0] || profiles[0].role !== 'admin') {
        return res.status(403).json({ error: 'Solo administradores' });
    }

    const { action } = req.body || {};
    try {
        if (action === 'invite') return await handleInvite(req, res, supaUrl, serviceKey);
        if (action === 'set-status') return await handleSetStatus(req, res, supaUrl, serviceKey);
        return res.status(400).json({ error: 'action debe ser invite o set-status' });
    } catch (e) {
        return res.status(500).json({ error: e.message || 'Error interno' });
    }
}
