// Server-side prompt for generate-practice (gramatica.html "🎯 Practicar").
// Built from the repo's own grammar-data-{level}.js so a client can't inject
// arbitrary prompts into the shared grammar_practice_exercises bank.
import { readFileSync } from 'fs';
import { join } from 'path';
import vm from 'vm';

const LEVEL_TOPICS = {
    A1: 'saludos, familia, números, colores, objetos cotidianos',
    A2: 'saludos, familia, números, colores, objetos cotidianos, compras, comida, tiempo libre, viajes simples, rutina diaria',
    B1: 'saludos, familia, compras, comida, tiempo libre, viajes, rutina, trabajo, estudios, opiniones, noticias simples, experiencias personales',
    B2: 'familia, trabajo, estudios, opiniones, noticias, cultura, argumentación, temas abstractos, medio ambiente, sociedad',
    C1: 'cultura, argumentación, temas abstractos, sociedad, ámbito académico, expresiones matizadas, debates complejos, política, economía',
    C2: 'ámbito académico, debates complejos, política, economía, literatura, filosofía, ironía, lenguaje idiomático avanzado, retórica',
};

const PRACTICE_EXERCISE_COUNT = 5;

export const PRACTICE_SYSTEM_PROMPT =
    'Eres un profesor de alemán. Genera exactamente ' + PRACTICE_EXERCISE_COUNT + ' oraciones de práctica en JSON para una regla gramatical.\n' +
    'Responde ÚNICAMENTE con un array JSON válido, sin texto adicional ni bloques de código markdown:\n' +
    '[{"de":"...","es":"...","distractores":["...","...","..."],"por_que_mal":["...","...","..."]},...]\n' +
    '"de": la oración correcta en alemán. "es": su traducción al español.\n' +
    '"distractores": exactamente 3 variantes INCORRECTAS de esa MISMA oración. Cada una idéntica a "de" salvo en el punto gramatical que evalúa la regla (el caso, la terminación, la posición del verbo, el auxiliar). No cambies el vocabulario, el tema ni la longitud: solo el rasgo gramatical. Ninguna puede ser correcta en alemán.\n' +
    '"por_que_mal": exactamente 3 explicaciones en español, una por distractor y en el mismo orden, de máximo 15 palabras, diciendo qué error concreto contiene.\n' +
    '"ordenes_validos" (opcional): otros órdenes de palabras de "de" igualmente correctos, con las MISMAS palabras (p. ej. anteponer un complemento manteniendo el verbo en 2ª posición). Omite el campo si no hay ninguno.\n' +
    'Las oraciones deben ser distintas entre sí y distintas a los ejemplos ya usados en la explicación.\n' +
    'Usa vocabulario y temas apropiados al nivel CEFR indicado.';

const rulesCache = {};

function levelRules(level) {
    if (!rulesCache[level]) {
        const ctx = { window: {} };
        const src = readFileSync(join(process.cwd(), `grammar-data-${level.toLowerCase()}.js`), 'utf8');
        vm.runInNewContext(src, ctx);
        rulesCache[level] = (ctx.window.GRAMMAR_DATA && ctx.window.GRAMMAR_DATA[level]) || [];
    }
    return rulesCache[level];
}

export function findRule(level, ruleId) {
    return levelRules(level).find(r => r.id === ruleId) || null;
}

export function buildPracticePrompt(rule, level, extraUsed) {
    const existing = [...rule.ejemplos.map(e => e.de), ...extraUsed].join(' / ');
    return (
        'Nivel: ' + level + '\n' +
        'Regla: ' + rule.titulo + ' — ' + rule.subtitulo + '\n' +
        'Clave: ' + rule.tip + '\n' +
        'Temas disponibles: ' + LEVEL_TOPICS[level] + '\n' +
        'Ejemplos YA USADOS (no repetir): ' + existing + '\n\n' +
        'Genera ' + PRACTICE_EXERCISE_COUNT + ' oraciones nuevas que practiquen esta regla. Varía los temas entre sí.'
    );
}

// Bank text is rendered by every client: drop markup characters and bound lengths.
export function cleanSentence(v, max = 300) {
    return typeof v === 'string' ? v.replace(/[<>]/g, '').trim().slice(0, max) : '';
}
