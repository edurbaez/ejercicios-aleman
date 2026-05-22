import { createHmac } from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mzitpnacjcjpokmiqwtd.supabase.co';

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

const VALID_STATUSES = new Set(['approved', 'blocked', 'pending']);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'No autenticado' });

    const payload = verifyJWT(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido o expirado' });

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return res.status(500).json({ error: 'Configuración incompleta' });

    // Verify caller is admin
    const callerRes = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?id=eq.${payload.sub}&select=role`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    const callerProfiles = await callerRes.json().catch(() => []);
    if (!callerProfiles[0] || callerProfiles[0].role !== 'admin') {
        return res.status(403).json({ error: 'Solo administradores pueden modificar el acceso de usuarios' });
    }

    const { userId, status } = req.body;
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: 'userId requerido' });
    }
    if (!VALID_STATUSES.has(status)) {
        return res.status(400).json({ error: 'status debe ser approved, blocked o pending' });
    }

    const updateRes = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`,
        {
            method: 'PATCH',
            headers: {
                apikey: serviceKey,
                Authorization: `Bearer ${serviceKey}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
            },
            body: JSON.stringify({ status }),
        }
    );

    if (!updateRes.ok) {
        const err = await updateRes.text();
        return res.status(500).json({ error: `Error al actualizar: ${err}` });
    }

    return res.status(200).json({ message: `Usuario ${status === 'approved' ? 'aprobado' : status === 'blocked' ? 'bloqueado' : 'puesto en pendiente'} correctamente` });
}
