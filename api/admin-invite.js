import { createHmac } from 'crypto';

function verifyJWT(token) {
    const secret = process.env.SUPABASE_JWT_SECRET;
    if (!secret) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const [header, payload, sig] = parts;
        const expected = createHmac('sha256', secret)
            .update(`${header}.${payload}`)
            .digest('base64url');
        if (expected !== sig) return null;
        const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
        return decoded;
    } catch {
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'No autenticado' });

    const payload = verifyJWT(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido o expirado' });

    const supaUrl     = process.env.SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supaUrl || !serviceKey) {
        return res.status(500).json({ error: 'Configuración de servidor incompleta (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)' });
    }

    // Verify the caller is an admin via the profiles table
    const profileRes = await fetch(
        `${supaUrl}/rest/v1/profiles?id=eq.${payload.sub}&select=role`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    const profiles = await profileRes.json().catch(() => []);
    if (!profiles[0] || profiles[0].role !== 'admin') {
        return res.status(403).json({ error: 'Solo administradores pueden invitar usuarios' });
    }

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

    // Pre-approve the invited user (upsert in case trigger already created the profile)
    if (data.id) {
        await fetch(
            `${supaUrl}/rest/v1/profiles`,
            {
                method: 'POST',
                headers: {
                    apikey: serviceKey,
                    Authorization: `Bearer ${serviceKey}`,
                    'Content-Type': 'application/json',
                    Prefer: 'resolution=merge-duplicates,return=minimal',
                },
                body: JSON.stringify({ id: data.id, email, status: 'approved', role: 'student' }),
            }
        );
    }

    return res.status(200).json({ message: `Invitación enviada a ${email}` });
}
