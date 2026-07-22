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
