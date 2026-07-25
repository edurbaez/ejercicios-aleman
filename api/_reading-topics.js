// Data for api/chat.js's generate-reading action. File starts with "_" so Vercel doesn't
// count it as a separate serverless function (Hobby plan caps at 12 — see CLAUDE.md Gotchas).

// Themenkatalog per CEFR level, mirrored from escritura.html's TEMAS (kept in sync manually —
// duplicated here because this file is an ESM serverless module, not a browser script).
// ⚠️ If you edit these topics, also update the matching TEMAS object in escritura.html.
export const TEMAS = {
    A1: ['la familia', 'la comida y las bebidas', 'la rutina diaria', 'el tiempo libre', 'la casa y la vivienda', 'las compras', 'una cita (médico, amigo)', 'un cumpleaños o una fiesta'],
    A2: ['las vacaciones', 'el trabajo diario', 'una invitación', 'la salud y el médico', 'el transporte y la ciudad', 'una mudanza', 'el fin de semana', 'el clima y las estaciones'],
    B1: ['el medio ambiente y el reciclaje', 'la vida en la ciudad vs. el campo', 'el deporte y la salud', 'aprender idiomas', 'las redes sociales', 'el trabajo y la formación profesional', 'los viajes y el turismo', 'la alimentación sana'],
    B2: ['el teletrabajo', 'el consumo y la publicidad', 'la educación digital', 'la migración y la integración', 'la movilidad y el transporte del futuro', 'la inteligencia artificial en la vida diaria', 'el turismo de masas', 'el sistema de salud'],
    C1: ['la globalización y sus efectos', 'la ética en la ciencia', 'el mercado laboral moderno', 'la protección de datos', 'el cambio climático y la política', 'la cultura y la identidad', 'la desigualdad social', 'el papel de los medios de comunicación'],
    C2: ['la bioética', 'la libertad de expresión y sus límites', 'el arte contemporáneo y su valor', 'la tecnología y la condición humana', 'la política internacional', 'la literatura y la sociedad', 'la memoria histórica', 'el futuro de la democracia'],
};

// Randomizing dimensions injected into the prompt so texts on the same tema don't converge
// on the same scene every time. Each generation picks one value per dimension.
export const PERSONAS = ['una persona sola', 'dos amigos', 'una pareja', 'una familia', 'un grupo de compañeros de trabajo', 'un grupo de estudiantes'];
export const LUGARES   = ['una oficina', 'un supermercado', 'un parque', 'una estación de tren', 'un restaurante', 'una casa', 'un almacén', 'una escuela', 'un hospital', 'una calle de la ciudad', 'un aeropuerto', 'un pueblo pequeño'];
export const TONOS     = ['un relato en tercera persona', 'un diálogo entre los personajes', 'una narración en primera persona', 'un artículo informativo'];
export const MOMENTOS  = ['por la mañana', 'al mediodía', 'por la tarde', 'por la noche', 'un fin de semana', 'durante unas vacaciones'];
export const CONFLICTOS = ['algo no sale como estaba planeado', 'deben tomar una decisión difícil', 'reciben una noticia inesperada', 'resuelven un pequeño problema juntos', 'descubren algo nuevo', 'celebran un logro'];

// Longitud objetivo y tipo de texto por nivel — acerca los textos generados al Leseverstehen
// real de Goethe/telc (A1/A2: avisos/notas cortas; B1-C2: relatos/artículos que crecen en
// longitud y complejidad). `simple: true` marca los niveles donde no se fuerza una narrativa
// con personaje/conflicto, solo un texto funcional breve.
export const READING_SPECS = {
    A1: { minWords: 30,  maxWords: 50,  textType: 'un mensaje corto, una nota o un anuncio sencillo (SMS, nota en la puerta, cartel, anuncio breve)', simple: true },
    A2: { minWords: 50,  maxWords: 80,  textType: 'un correo o mensaje breve, una nota informativa o un pequeño anuncio', simple: true },
    B1: { minWords: 100, maxWords: 150, textType: 'un relato breve o un artículo informativo', simple: false },
    B2: { minWords: 150, maxWords: 200, textType: 'un artículo de opinión o de blog', simple: false },
    C1: { minWords: 200, maxWords: 260, textType: 'un artículo periodístico o de opinión con vocabulario más elaborado', simple: false },
    C2: { minWords: 250, maxWords: 300, textType: 'un artículo complejo, de registro formal y vocabulario abstracto', simple: false },
};

export function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Teile-based session specs (format_version 2 in reading_texts, see lecturaplan.md).
// Each level lists its Teile in exam order with the task type ("tipo") the generator/
// validator/frontend renderer must agree on. `promptFragment` is the instruction sent
// to the AI for that Teil — {minWords}/{maxWords} are interpolated from READING_SPECS[level]
// by buildTeilePrompt() in api/chat.js, so the same generic code path works for every
// level without hardcoding word counts or Teil semantics per id. `opcionesCount`
// (mcq only) defaults to 3 when omitted.
// B1/B2 populated (fases 1-2 del plan); C1/C2 reuse the same task types once
// implemented, A1/A2 need new ones (emparejar de notas cortas, carteles) not modeled
// here yet.
export const READING_TEILE_SPECS = {
    B1: [
        {
            id: 'teil1', tipo: 'mcq', nombre: 'Teil 1 — Texto y preguntas',
            promptFragment: '- "teil1" (tipo "mcq"): 1 texto en alemán ({minWords}-{maxWords} palabras, relato o artículo breve) en "textos" (1 elemento con "titulo" y "contenido"), y 5 preguntas en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil2', tipo: 'emparejar', nombre: 'Teil 2 — Personas y anuncios',
            promptFragment: '- "teil2" (tipo "emparejar"): sin "textos". 5 personas en "columnaIzquierda" (id "p1".."p5", "texto" describiendo brevemente qué busca/necesita cada una) y 8 anuncios breves en "columnaDerecha" (id "a1".."a8", "texto" el anuncio). "solucion" debe mapear cada "p1".."p5" al id del anuncio que le corresponde; los 3 anuncios restantes son distractores sin solución asociada.',
        },
        {
            id: 'teil3', tipo: 'emparejar', nombre: 'Teil 3 — Foro de opiniones',
            promptFragment: '- "teil3" (tipo "emparejar"): 1 texto en "textos" con "titulo" tipo "Forum: ..." y "contenido" con 5 comentarios cortos de personas distintas (nombre en negrita al inicio de cada uno, separados por saltos de línea). 5 afirmaciones/opiniones en "columnaIzquierda" (id "s1".."s5") que coinciden con lo que dijo una de esas personas, y las 5 personas en "columnaDerecha" (id = nombre en minúsculas sin espacios, "texto" = nombre). "solucion" mapea cada afirmación a la persona que la dijo.',
        },
        {
            id: 'teil4', tipo: 'richtig_falsch', nombre: 'Teil 4 — Richtig oder falsch',
            promptFragment: '- "teil4" (tipo "richtig_falsch"): 1 texto en alemán ({minWords}-{maxWords} palabras) en "textos", y 5 afirmaciones sobre el texto en "items", cada una con "afirmacion" (string) y "correcta" (true o false), mezclando verdaderas y falsas.',
        },
        {
            id: 'teil5', tipo: 'emparejar', nombre: 'Teil 5 — Situaciones y reglas',
            promptFragment: '- "teil5" (tipo "emparejar"): sin "textos". 5 situaciones cotidianas en "columnaIzquierda" (id "s1".."s5") y 8 reglas breves de un reglamento (Hausordnung, normas de una biblioteca, gimnasio, etc.) en "columnaDerecha" (id "r1".."r8"). "solucion" mapea cada situación a la regla que aplica; 3 reglas son distractores.',
        },
    ],
    B2: [
        {
            id: 'teil1', tipo: 'mcq', opcionesCount: 4, nombre: 'Teil 1 — Personas y afirmaciones',
            promptFragment: '- "teil1" (tipo "mcq"): 4 personas opinando sobre el tema en "textos" (4 elementos, "titulo" = nombre de la persona, "contenido" = su opinión en alemán, 60-90 palabras cada una). 5 afirmaciones en "items", cada una con "pregunta" (la afirmación), "opciones" (array de EXACTAMENTE 4 strings — los 4 nombres de las personas, en el mismo orden en todos los items) y "correcta" (índice 0-3 de quién lo dijo). Distintos items pueden compartir la misma persona correcta.',
        },
        {
            id: 'teil2', tipo: 'emparejar', nombre: 'Teil 2 — Texto con huecos',
            promptFragment: '- "teil2" (tipo "emparejar"): 1 artículo en alemán (220-300 palabras) en "textos" (1 elemento), con 5 huecos numerados marcados literalmente como "[1]".."[5]" dentro del "contenido" en los puntos donde falta una frase. "columnaIzquierda" son los 5 huecos (id "h1".."h5", "texto" = "Lücke 1".."Lücke 5"). "columnaDerecha" son 8 frases candidatas en alemán (id "f1".."f8", "texto" = la frase completa), de las cuales solo 5 completan correctamente un hueco (3 son distractoras). "solucion" mapea cada "h1".."h5" al id de la frase que le corresponde.',
        },
        {
            id: 'teil3', tipo: 'mcq', opcionesCount: 3, nombre: 'Teil 3 — Preguntas de comprensión',
            promptFragment: '- "teil3" (tipo "mcq"): 1 texto en alemán ({minWords}-{maxWords} palabras, artículo de opinión o de blog) en "textos" (1 elemento con "titulo" y "contenido"), y 5 preguntas en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil4', tipo: 'emparejar', nombre: 'Teil 4 — Opiniones y titulares',
            promptFragment: '- "teil4" (tipo "emparejar"): sin "textos". 5 titulares breves en "columnaIzquierda" (id "t1".."t5", "texto" = el titular) y 8 opiniones/comentarios completos sobre el tema en "columnaDerecha" (id "o1".."o8", "texto" = la opinión, 2-3 frases cada una, 30-50 palabras). "solucion" mapea cada titular al id de la opinión que resume; las 3 opiniones restantes son distractoras.',
        },
        {
            id: 'teil5', tipo: 'emparejar', nombre: 'Teil 5 — Reglamento y párrafos',
            promptFragment: '- "teil5" (tipo "emparejar"): sin "textos". 3 párrafos (30-60 palabras cada uno) de un reglamento o normativa (por ejemplo, normas de una comunidad de vecinos, de una biblioteca universitaria o de una empresa) en "columnaIzquierda" (id "p1".."p3", "texto" = el párrafo) y 8 posibles encabezados cortos en "columnaDerecha" (id "e1".."e8", "texto" = el encabezado). "solucion" mapea cada párrafo al id del encabezado que le corresponde; los encabezados restantes son distractores.',
        },
    ],
};
