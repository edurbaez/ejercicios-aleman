import { verifyJWT, createRateLimiter, checkAccess, fetchWithRetry } from './_lib.js';

const isRateLimited = createRateLimiter(5, 60_000, 'rl:vision');

const PROMPTS = {
    tarea: 'Eres un profesor de alemán experto. Analiza la imagen adjunta, que contiene una tarea escrita en alemán. Identifica todos los errores gramaticales, ortográficos y de estilo.',
    carta: 'Eres un experto en redacción formal e informal en alemán. Analiza la carta de la imagen. Revisa estructura, fórmulas epistolares, registro y gramática.',
    frases: 'Eres un corrector nativo de alemán. Analiza cada frase de la imagen por separado. Indica si cada frase es gramaticalmente correcta y natural para un hablante nativo.',
};

const STYLE_ANALYSIS_PROMPT = `You are a graphic design analyst. Look at the reference image and describe its visual style in a single dense paragraph (80-120 words) so it can be pasted into an AI image-generation prompt for a similar-looking design. Cover: color palette (name the actual hues), overall mood/tone, decorative motifs (icons, illustrations, shapes, textures), layout structure (badges, panels, cards, borders), and typography feel (weight, style, serif/sans). Do not describe or mention any text content, logos, or people in the image. Write in English, as a plain descriptive paragraph with no markdown, no preamble.
Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "style_description": "<párrafo descriptivo en inglés>"
}`;

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
  "texto_corregido": "<el texto completo corregido en alemán>",
  "observaciones_generales": "<observaciones finales en español>"
}
Si no hay errores, usa "errores": []. No incluyas texto ni markdown fuera del JSON.`;

const VALID_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const cap = (s, n) => String(s || '').slice(0, n);

// Evaluation prompt for escritura.html: grades a handwritten text against a
// generated writing task; response schema mirrors the app's typed-text flow.
function buildEscrituraPrompt(task) {
    const puntos = (Array.isArray(task.puntos) ? task.puntos : []).slice(0, 6).map(p => cap(p, 200));
    return `Eres un examinador oficial de alemán (Goethe-Institut) que corrige tareas de expresión escrita de nivel ${cap(task.level, 2)}. La imagen contiene el texto MANUSCRITO del alumno: transcríbelo primero con fidelidad (si algo es ilegible, márcalo como [ilegible]) y evalúalo después contra esta tarea con los criterios del nivel: cumplimiento de la tarea, corrección gramatical, vocabulario, cohesión y registro. Sé exigente pero pedagógico; las explicaciones van en español.

TAREA (registro ${cap(task.registro, 20)}, ${Number(task.min_palabras) || 0}-${Number(task.max_palabras) || 0} palabras):
${cap(task.titulo, 200)}
${cap(task.situacion, 600)}
Puntos guía: ${puntos.join(' | ')}

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "texto_transcrito": "<transcripción fiel del texto manuscrito>",
  "puntuacion": <número entero 0-100>,
  "puntos_cubiertos": [<true|false por cada punto guía, en el mismo orden>],
  "registro_adecuado": <true|false>,
  "errores": [{"original":"<fragmento con error>","correccion":"<fragmento corregido>","explicacion":"<explicación breve en español>","categoria":"<gramática|vocabulario|ortografía|registro|estructura>"}],
  "version_mejorada": "<el texto completo del alumno corregido y ligeramente mejorado manteniendo su contenido>",
  "comentario": "<valoración global en español (2-4 frases) con lo mejor y lo prioritario a mejorar>"
}
Si el texto no tiene errores, usa "errores": []. No incluyas texto ni markdown fuera del JSON.`;
}

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

    const access = await checkAccess(jwtPayload.sub);
    if (!access.valid) {
        return res.status(403).json({ error: 'Acceso restringido', status: access.status, expires_at: access.expires_at });
    }

    if (await isRateLimited(jwtPayload.sub)) {
        return res.status(429).json({ error: 'Demasiadas peticiones. Máximo 5 revisiones por minuto.' });
    }

    const { image_base64, mime_type, type, task } = req.body;

    if (!image_base64 || typeof image_base64 !== 'string') {
        return res.status(400).json({ error: 'image_base64 requerido' });
    }
    if (!VALID_MIME.has(mime_type)) {
        return res.status(400).json({ error: 'mime_type inválido. Usa jpeg, png, webp o gif.' });
    }

    let systemPrompt;
    if (type === 'escritura') {
        if (!task || typeof task !== 'object') {
            return res.status(400).json({ error: 'task requerido para type escritura' });
        }
        systemPrompt = buildEscrituraPrompt(task);
    } else if (type === 'style-analysis') {
        systemPrompt = STYLE_ANALYSIS_PROMPT;
    } else {
        const reviewType = ['tarea', 'carta', 'frases'].includes(type) ? type : 'tarea';
        systemPrompt = `${PROMPTS[reviewType]}\n\n${SYSTEM_JSON}`;
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY no configurada' });
    }

    try {
        const body = {
            model: 'gpt-4o',
            max_tokens: 2500,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: systemPrompt },
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

        const response = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
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
