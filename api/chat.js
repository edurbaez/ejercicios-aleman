export default async function handler(req, res) {
    // Solo POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { messages, system } = req.body;

    // Validación básica
    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "messages requerido" });
    }
    if (messages.length > 20) {
        return res.status(400).json({ error: "Demasiados mensajes" });
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
