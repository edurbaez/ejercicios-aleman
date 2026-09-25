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
// and {n}/{d} from this entry's own itemsCount/derechaCount by buildSingleTeilPrompt() in
// api/chat.js, so the same generic code path works for every level without hardcoding word
// counts, item counts or Teil semantics per id. `opcionesCount` (mcq only) defaults to 3
// when omitted. `maxTokens` overrides the generator's default budget per call — needed
// where the Teil's text or item list is long enough that the JSON answer would otherwise
// be truncated.
// `itemsCount` is how many items that Teil is scored on (mcq/richtig_falsch: entries in
// "items"; emparejar: entries in "columnaIzquierda") and `derechaCount` how many candidates
// the right column offers (the surplus are distractors). Both come from the real Modellsatz
// of each level (lecturaplan.md §11-§15) instead of the flat 5-per-Teil used until
// 2026-09-25; the validator enforces itemsCount exactly and derechaCount as a minimum.
// Única excepción documentada: B1 teil3 (foro) mantiene 5 y no las 7 afirmaciones reales,
// porque el examen real las reparte entre 5 personas y `validEmparejarTeil` exige columna
// derecha >= izquierda.
// Los 6 niveles (A1-C2) están poblados (fases 1-5 del plan, ver lecturaplan.md). Ningún
// nivel requirió tipos de tarea nuevos: todos encajan en mcq/richtig_falsch/emparejar.
export const READING_TEILE_SPECS = {
    A1: [
        {
            id: 'teil1', tipo: 'richtig_falsch', itemsCount: 5, nombre: 'Teil 1 — Richtig oder falsch',
            promptFragment: '- "teil1" (tipo "richtig_falsch"): 2 textos muy cortos en alemán en "textos" (2 elementos, cada uno con "titulo" y "contenido" de {minWords}-{maxWords} palabras — un SMS, una nota o un anuncio muy sencillo, nivel A1), y EXACTAMENTE {n} afirmaciones sobre esos textos en "items", cada una con "afirmacion" (string, en alemán muy simple) y "correcta" (true o false), mezclando verdaderas y falsas y repartidas entre los dos textos.',
        },
        {
            id: 'teil2', tipo: 'emparejar', itemsCount: 5, derechaCount: 7, nombre: 'Teil 2 — ¿Dónde encuentras la información?',
            promptFragment: '- "teil2" (tipo "emparejar"): sin "textos". EXACTAMENTE {n} situaciones cotidianas muy sencillas en "columnaIzquierda" (id "s1".."s{n}", "texto" describiendo en alemán muy simple qué información busca una persona, p.ej. horarios de tren, el tiempo, una receta) y EXACTAMENTE {d} páginas web o categorías de información en "columnaDerecha" (id "w1".."w{d}", "texto" = nombre breve de la web/categoría en alemán, p.ej. "Bahnfahrplan.de"). "solucion" mapea cada situación al id de la web que le corresponde; las webs restantes son distractoras.',
        },
        {
            id: 'teil3', tipo: 'richtig_falsch', itemsCount: 5, nombre: 'Teil 3 — Avisos públicos',
            promptFragment: '- "teil3" (tipo "richtig_falsch"): 2 carteles o avisos públicos muy breves en alemán en "textos" (2 elementos, "titulo" = dónde está el cartel, p.ej. "Aushang: Bahnhof", "contenido" de {minWords}-{maxWords} palabras cada uno — horarios, normas o información de un lugar público como una estación, una tienda o una escuela), y EXACTAMENTE {n} afirmaciones sobre esos carteles en "items", cada una con "afirmacion" (string) y "correcta" (true o false), mezclando verdaderas y falsas.',
        },
    ],
    A2: [
        {
            id: 'teil1', tipo: 'mcq', opcionesCount: 3, itemsCount: 5, nombre: 'Teil 1 — Artículo: preguntas',
            promptFragment: '- "teil1" (tipo "mcq"): 1 texto en alemán (90-120 palabras, un artículo breve de revista o periódico sobre una persona o un tema cotidiano, nivel A2) en "textos" (1 elemento con "titulo" y "contenido"), y EXACTAMENTE {n} preguntas en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil2', tipo: 'mcq', opcionesCount: 3, itemsCount: 5, nombre: 'Teil 2 — Guía/directorio: preguntas',
            promptFragment: '- "teil2" (tipo "mcq"): 1 texto en alemán (60-90 palabras) en "textos" (1 elemento, "titulo" = "Wegweiser" o similar, "contenido" = un listado breve tipo directorio, p.ej. las plantas de unos grandes almacenes o el programa de un centro cultural, indicando qué se encuentra en cada sección), y EXACTAMENTE {n} preguntas en "items" sobre dónde encontrar algo (en alemán, p.ej. "Wo finden Sie...?"), cada una con "pregunta" (en alemán), "opciones" (array de EXACTAMENTE 3 strings, en alemán) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil3', tipo: 'mcq', opcionesCount: 3, itemsCount: 5, nombre: 'Teil 3 — Correo electrónico: preguntas',
            promptFragment: '- "teil3" (tipo "mcq"): 1 correo electrónico personal en alemán (100-140 palabras) en "textos" (1 elemento, "titulo" = "E-Mail von ..." y "contenido" = el correo), y EXACTAMENTE {n} preguntas de comprensión en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil4', tipo: 'emparejar', itemsCount: 5, derechaCount: 6, nombre: 'Teil 4 — Anuncios y personas',
            promptFragment: '- "teil4" (tipo "emparejar"): sin "textos". EXACTAMENTE {n} personas en "columnaIzquierda" (id "p1".."p{n}", "texto" describiendo brevemente en alemán simple qué busca cada una, p.ej. un local para una fiesta, un café tranquilo) y EXACTAMENTE {d} anuncios breves en "columnaDerecha" (id "a1".."a{d}", "texto" = el anuncio, 20-30 palabras cada uno). "solucion" mapea cada persona al id del anuncio que le corresponde; el anuncio restante es un distractor sin solución asociada.',
        },
    ],
    B1: [
        {
            id: 'teil1', tipo: 'mcq', itemsCount: 6, nombre: 'Teil 1 — Texto y preguntas',
            promptFragment: '- "teil1" (tipo "mcq"): 1 texto en alemán ({minWords}-{maxWords} palabras, relato o artículo breve) en "textos" (1 elemento con "titulo" y "contenido"), y EXACTAMENTE {n} preguntas en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil2', tipo: 'emparejar', itemsCount: 7, derechaCount: 10, maxTokens: 2500, nombre: 'Teil 2 — Personas y anuncios',
            promptFragment: '- "teil2" (tipo "emparejar"): sin "textos". EXACTAMENTE {n} personas en "columnaIzquierda" (id "p1".."p{n}", "texto" describiendo brevemente qué busca/necesita cada una) y EXACTAMENTE {d} anuncios breves en "columnaDerecha" (id "a1".."a{d}", "texto" el anuncio). "solucion" debe mapear cada persona al id del anuncio que le corresponde; los anuncios restantes son distractores sin solución asociada.',
        },
        {
            id: 'teil3', tipo: 'emparejar', requiereTextos: true, itemsCount: 5, derechaCount: 5, nombre: 'Teil 3 — Foro de opiniones',
            promptFragment: '- "teil3" (tipo "emparejar"): 1 texto en "textos" con "titulo" tipo "Forum: ..." y "contenido" con EXACTAMENTE {d} comentarios cortos de personas distintas (nombre en negrita al inicio de cada uno, separados por saltos de línea). EXACTAMENTE {n} afirmaciones/opiniones en "columnaIzquierda" (id "s1".."s{n}") que coinciden con lo que dijo una de esas personas, y las {d} personas en "columnaDerecha" (id = nombre en minúsculas sin espacios, "texto" = nombre). "solucion" mapea cada afirmación a la persona que la dijo.',
        },
        {
            id: 'teil4', tipo: 'richtig_falsch', itemsCount: 6, nombre: 'Teil 4 — Richtig oder falsch',
            promptFragment: '- "teil4" (tipo "richtig_falsch"): 1 texto en alemán ({minWords}-{maxWords} palabras) en "textos", y EXACTAMENTE {n} afirmaciones sobre el texto en "items", cada una con "afirmacion" (string) y "correcta" (true o false), mezclando verdaderas y falsas.',
        },
        {
            id: 'teil5', tipo: 'emparejar', itemsCount: 4, derechaCount: 10, maxTokens: 2500, nombre: 'Teil 5 — Situaciones y reglas',
            promptFragment: '- "teil5" (tipo "emparejar"): sin "textos". EXACTAMENTE {n} situaciones cotidianas en "columnaIzquierda" (id "s1".."s{n}") y EXACTAMENTE {d} reglas breves de un reglamento (Hausordnung, normas de una biblioteca, gimnasio, etc.) en "columnaDerecha" (id "r1".."r{d}"). "solucion" mapea cada situación a la regla que aplica; las reglas restantes son distractores.',
        },
    ],
    B2: [
        {
            id: 'teil1', tipo: 'mcq', opcionesCount: 4, itemsCount: 9, maxTokens: 2800, nombre: 'Teil 1 — Personas y afirmaciones',
            promptFragment: '- "teil1" (tipo "mcq"): 4 personas opinando sobre el tema en "textos" (4 elementos, "titulo" = nombre de la persona, "contenido" = su opinión en alemán, 60-90 palabras cada una). EXACTAMENTE {n} afirmaciones en "items", cada una con "pregunta" (la afirmación), "opciones" (array de EXACTAMENTE 4 strings — los 4 nombres de las personas, en el mismo orden en todos los items) y "correcta" (índice 0-3 de quién lo dijo). Distintos items pueden compartir la misma persona correcta.',
        },
        {
            id: 'teil2', tipo: 'emparejar', requiereTextos: true, itemsCount: 6, derechaCount: 8, maxTokens: 2800, nombre: 'Teil 2 — Texto con huecos',
            promptFragment: '- "teil2" (tipo "emparejar"): OBLIGATORIO incluir el campo "textos" con 1 artículo en alemán (220-300 palabras) — sin este artículo el ejercicio no se puede resolver. "columnaIzquierda" son EXACTAMENTE {n} huecos (id "h1".."h{n}", "texto" = "Lücke 1".."Lücke {n}") — literalmente marcados como "[1]".."[{n}]" dentro del "contenido" del artículo, en los puntos donde falta una frase. "columnaDerecha" son EXACTAMENTE {d} frases candidatas en alemán (id "f1".."f{d}", "texto" = la frase completa), de las cuales solo {n} completan correctamente un hueco (el resto son distractoras). "solucion" mapea cada hueco al id de la frase que le corresponde.',
        },
        {
            id: 'teil3', tipo: 'mcq', opcionesCount: 3, itemsCount: 6, nombre: 'Teil 3 — Preguntas de comprensión',
            promptFragment: '- "teil3" (tipo "mcq"): 1 texto en alemán ({minWords}-{maxWords} palabras, artículo de opinión o de blog) en "textos" (1 elemento con "titulo" y "contenido"), y EXACTAMENTE {n} preguntas en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil4', tipo: 'emparejar', itemsCount: 6, derechaCount: 8, maxTokens: 2500, nombre: 'Teil 4 — Opiniones y titulares',
            promptFragment: '- "teil4" (tipo "emparejar"): sin "textos". EXACTAMENTE {n} titulares breves en "columnaIzquierda" (id "t1".."t{n}", "texto" = el titular) y EXACTAMENTE {d} opiniones/comentarios completos sobre el tema en "columnaDerecha" (id "o1".."o{d}", "texto" = la opinión, 2-3 frases cada una, 30-50 palabras). "solucion" mapea cada titular al id de la opinión que resume; las opiniones restantes son distractoras.',
        },
        {
            id: 'teil5', tipo: 'emparejar', itemsCount: 3, derechaCount: 8, nombre: 'Teil 5 — Reglamento y párrafos',
            promptFragment: '- "teil5" (tipo "emparejar"): sin "textos". EXACTAMENTE {n} párrafos (30-60 palabras cada uno) de un reglamento o normativa (por ejemplo, normas de una comunidad de vecinos, de una biblioteca universitaria o de una empresa) en "columnaIzquierda" (id "p1".."p{n}", "texto" = el párrafo) y EXACTAMENTE {d} posibles encabezados cortos en "columnaDerecha" (id "e1".."e{d}", "texto" = el encabezado). "solucion" mapea cada párrafo al id del encabezado que le corresponde; los encabezados restantes son distractores.',
        },
    ],
    C1: [
        {
            id: 'teil1', tipo: 'mcq', opcionesCount: 4, itemsCount: 8, maxTokens: 2800, nombre: 'Teil 1 — Texto con huecos (léxico)',
            promptFragment: '- "teil1" (tipo "mcq"): 1 texto en alemán (280-360 palabras) sobre el tema, en "textos" (1 elemento con "titulo" y "contenido"), con EXACTAMENTE {n} huecos numerados marcados literalmente como "[1]".."[{n}]" dentro del "contenido", en lugares donde falta una palabra o expresión (verbo, conector, preposición, locución fija — no frases completas). EXACTAMENTE {n} preguntas en "items" (una por hueco, en el mismo orden), cada una con "pregunta" (p.ej. "Lücke 1"), "opciones" (array de EXACTAMENTE 4 strings, alternativas léxicas o gramaticales plausibles y del mismo nivel para ese hueco) y "correcta" (índice 0-3).',
        },
        {
            id: 'teil2', tipo: 'mcq', opcionesCount: 3, itemsCount: 7, maxTokens: 4000, nombre: 'Teil 2 — Artículo y preguntas',
            promptFragment: '- "teil2" (tipo "mcq"): 1 texto en alemán (550-700 palabras, artículo de revista con alta densidad informativa) en "textos" (1 elemento con "titulo" y "contenido"), y EXACTAMENTE {n} preguntas de comprensión en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 3 strings) y "correcta" (índice 0-2).',
        },
        {
            id: 'teil3', tipo: 'emparejar', requiereTextos: true, itemsCount: 8, derechaCount: 10, maxTokens: 3800, nombre: 'Teil 3 — Texto con huecos (frases)',
            promptFragment: '- "teil3" (tipo "emparejar"): OBLIGATORIO incluir el campo "textos" con 1 artículo en alemán (450-550 palabras, comentario o reportaje de prensa sobre un tema abstracto o de opinión) — sin este artículo el ejercicio no se puede resolver. "columnaIzquierda" son EXACTAMENTE {n} huecos (id "h1".."h{n}", "texto" = "Lücke 1".."Lücke {n}") marcados literalmente como "[1]".."[{n}]" dentro del "contenido", en puntos donde falta una frase completa. "columnaDerecha" son EXACTAMENTE {d} frases candidatas en alemán (id "f1".."f{d}", "texto" = la frase completa), de las cuales solo {n} completan correctamente un hueco (el resto son distractoras). "solucion" mapea cada hueco al id de la frase correspondiente.',
        },
        {
            id: 'teil4', tipo: 'mcq', opcionesCount: 4, itemsCount: 7, maxTokens: 3000, nombre: 'Teil 4 — Opiniones de expertos',
            promptFragment: '- "teil4" (tipo "mcq"): 3 expertos opinando sobre el tema desde perspectivas distintas en "textos" (3 elementos, "titulo" = nombre del experto, "contenido" = su opinión en alemán, 130-160 palabras cada una). EXACTAMENTE {n} afirmaciones en "items", cada una con "pregunta" (la afirmación), "opciones" (array de EXACTAMENTE 4 strings — los 3 nombres de los expertos más una cuarta opción "Keiner von ihnen", en el mismo orden en todos los items) y "correcta" (índice 0-3). Distintos items pueden compartir la misma persona correcta; procura, sin que sea obligatorio, que al menos una afirmación no corresponda a ningún experto (Keiner von ihnen).',
        },
    ],
    C2: [
        {
            id: 'teil1', tipo: 'mcq', opcionesCount: 4, itemsCount: 10, maxTokens: 3000, nombre: 'Teil 1 — Comentario y preguntas',
            promptFragment: '- "teil1" (tipo "mcq"): 1 texto en alemán ({minWords}-{maxWords} palabras, un comentario de opinión (Kommentar) de registro formal y argumentación elaborada) en "textos" (1 elemento con "titulo" y "contenido"), y EXACTAMENTE {n} preguntas en "items", cada una con "pregunta", "opciones" (array de EXACTAMENTE 4 strings) y "correcta" (índice 0-3).',
        },
        {
            id: 'teil2', tipo: 'emparejar', requiereTextos: true, itemsCount: 6, derechaCount: 8, maxTokens: 2800, nombre: 'Teil 2 — Artículo por secciones',
            promptFragment: '- "teil2" (tipo "emparejar"): OBLIGATORIO incluir el campo "textos" con 1 artículo en alemán (260-340 palabras, tema complejo o científico-divulgativo) dividido en EXACTAMENTE {n} secciones numeradas marcadas literalmente como "[1]".."[{n}]" dentro del "contenido" (un salto de línea antes de cada número). "columnaIzquierda" son esas {n} secciones (id "s1".."s{n}", "texto" = "Abschnitt 1".."Abschnitt {n}"). "columnaDerecha" son EXACTAMENTE {d} afirmaciones breves en alemán que resumen el contenido de una sección (id "a1".."a{d}", "texto" = la afirmación), de las cuales solo {n} corresponden a una sección (el resto son distractoras). "solucion" mapea cada sección al id de la afirmación que la resume.',
        },
        {
            id: 'teil3', tipo: 'emparejar', requiereTextos: true, itemsCount: 6, derechaCount: 7, maxTokens: 2800, nombre: 'Teil 3 — Texto con huecos (fragmentos)',
            promptFragment: '- "teil3" (tipo "emparejar"): OBLIGATORIO incluir el campo "textos" con 1 reportaje o artículo narrativo en alemán (280-350 palabras, registro formal, estilo periodístico) — sin este texto el ejercicio no se puede resolver. "columnaIzquierda" son EXACTAMENTE {n} huecos (id "h1".."h{n}", "texto" = "Lücke 1".."Lücke {n}") marcados literalmente como "[1]".."[{n}]" dentro del "contenido", en puntos donde falta un fragmento de texto (una o dos frases). "columnaDerecha" son EXACTAMENTE {d} fragmentos candidatos en alemán (id "f1".."f{d}", "texto" = el fragmento completo), de los cuales solo {n} completan correctamente un hueco (el resto son distractores). "solucion" mapea cada hueco al id del fragmento correspondiente.',
        },
        {
            id: 'teil4', tipo: 'mcq', opcionesCount: 4, itemsCount: 8, maxTokens: 2500, nombre: 'Teil 4 — Anuncios de empleo',
            promptFragment: '- "teil4" (tipo "mcq"): 4 anuncios de empleo breves en alemán en "textos" (4 elementos, "titulo" = "Anzeige A".."Anzeige D", "contenido" = el anuncio, 40-70 palabras cada uno). EXACTAMENTE {n} afirmaciones sobre el perfil o requisitos buscados en "items", cada una con "pregunta" (la afirmación), "opciones" (array de EXACTAMENTE 4 strings — "Anzeige A","Anzeige B","Anzeige C","Anzeige D", en el mismo orden en todos los items) y "correcta" (índice 0-3 del anuncio al que corresponde). Distintos items pueden compartir el mismo anuncio correcto.',
        },
    ],
};
