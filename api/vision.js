import { verifyJWT, createRateLimiter } from './_lib.js';

const isRateLimited = createRateLimiter(5, 60_000, 'rl:vision');

const PROMPTS = {
    tarea: 'Eres un profesor de alemán experto. Analiza la imagen adjunta, que contiene una tarea escrita en alemán. Identifica todos los errores gramaticales, ortográficos y de estilo.',
    carta: 'Eres un experto en redacción formal e informal en alemán. Analiza la carta de la imagen. Revisa estructura, fórmulas epistolares, registro y gramática.',
    frases: 'Eres un corrector nativo de alemán. Analiza cada frase de la imagen por separado. Indica si cada frase es gramaticalmente correcta y natural para un hablante nativo.',
};

const SYSTEM_JSON = `Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "puntuacion": <número entero del 1 al 10>,
  "resumen": "<resumen breve en español>",
  "errores": [
    {
      "fragmento_original": "<texto con el error>",
      "correccion": "<texto corregido>",
      "explicacion": "<explicación en español>",
      "categoria": "<ortografía|declinación|conjugación|orden de palabras|registro|puntuación|vocabulario>"
    }
  ],
  "observaciones_generales": "<observaciones finales en español>"
}
Si no hay errores, usa "errores": []. No incluyas texto ni markdown fuera del JSON.`;

const VALID_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const origin  = req.headers.origin || '';
    const allowed = process.env.ALLOWED_ORIGIN;
    if (allowed && origin && origin !== allowed) {
        return res.status(403).json({ error: 'Origen no permitido' });
    }

    const authHeader = req.headers.authorization || '';
    const token      = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Autenticación requerida' });

    const jwtPayload = await verifyJWT(token);
    if (!jwtPayload) return res.status(401).json({ error: 'Token inválido o expirado' });

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Máximo 5 revisiones por minuto.' });
    }

    const { image_base64, mime_type, type } = req.body;

    if (!image_base64 || typeof image_base64 !== 'string') {
        return res.status(400).json({ error: 'image_base64 requerido' });
    }
    if (!VALID_MIME.has(mime_type)) {
        return res.status(400).json({ error: 'mime_type inválido. Usa jpeg, png, webp o gif.' });
    }

    const reviewType = ['tarea', 'carta', 'frases'].includes(type) ? type : 'tarea';

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada' });
    }

    try {
        const body = {
            model: 'gpt-4o',
            max_tokens: 1500,
            messages: [
                { role: 'system', content: `${PROMPTS[reviewType]}\n\n${SYSTEM_JSON}` },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:${mime_type};base64,${image_base64}`,
                                detail: 'high',
                            },
                        },
                        { type: 'text', text: 'Revisa el texto de esta imagen.' },
                    ],
                },
            ],
        };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            return res.status(response.status).json({ error: err?.error?.message || 'Error de OpenAI' });
        }

        const data = await response.json();
        const raw  = data.choices[0].message.content;

        let result;
        try {
            const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
            result = JSON.parse(cleaned);
        } catch {
            return res.status(500).json({ error: 'La IA devolvió una respuesta no estructurada.', raw });
        }

        return res.status(200).json(result);
    } catch {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
