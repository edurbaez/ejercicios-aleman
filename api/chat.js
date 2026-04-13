// Rate limiting: ventana deslizante por IP
// En Vercel cada instancia es independiente, pero protege contra abuso dentro de una instancia caliente.
const RATE_LIMIT = 20;       // requests máximos
const WINDOW_MS = 60_000;    // por minuto
const ipStore = new Map();   // IP → { count, windowStart }

function isRateLimited(ip) {
    const now = Date.now();
    const entry = ipStore.get(ip);

    if (!entry || now - entry.windowStart > WINDOW_MS) {
        ipStore.set(ip, { count: 1, windowStart: now });
        return false;
    }
    if (entry.count >= RATE_LIMIT) return true;
    entry.count++;
    return false;
}

// Limpia entradas viejas cada 5 minutos para evitar fuga de memoria
setInterval(() => {
    const cutoff = Date.now() - WINDOW_MS;
    for (const [ip, entry] of ipStore) {
        if (entry.windowStart < cutoff) ipStore.delete(ip);
    }
}, 300_000);

export default async function handler(req, res) {
    // Solo POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Comprobación de origen (bloquea peticiones fuera del dominio propio)
    const origin = req.headers.origin || "";
    const allowed = process.env.ALLOWED_ORIGIN;   // ej: https://tu-app.vercel.app
    if (allowed && origin && origin !== allowed) {
        return res.status(403).json({ error: "Origen no permitido" });
    }

    // Rate limit por IP
    const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: "Demasiadas peticiones. Espera un momento." });
    }

    const { messages, system } = req.body;

    // Validación básica
    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "messages requerido" });
    }
    if (messages.length > 20) {
        return res.status(400).json({ error: "Demasiados mensajes" });
    }

    // Limita el tamaño del system prompt para evitar requests inflados
    if (system && String(system).length > 2000) {
        return res.status(400).json({ error: "System prompt demasiado largo" });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "OPENAI_API_KEY no configurada en Vercel" });
    }

    try {
        const body = {
            model: "gpt-4o-mini",
            max_tokens: 500,
            messages: system
                ? [{ role: "system", content: String(system) }, ...messages]
                : messages,
        };

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return res.status(response.status).json({ error: err?.error?.message || "Error de OpenAI" });
        }

        const data = await response.json();
        return res.status(200).json({ reply: data.choices[0].message.content });

    } catch (e) {
        return res.status(500).json({ error: "Error interno" });
    }
}
