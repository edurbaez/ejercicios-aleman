// Shared config + prompt builder for chat.js `generate-kasus` (kasus.html).
// Prompts are built server-side so the shared exercise bank can't be poisoned by client text.

export const KASUS_CASOS = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
export const KASUS_RELLENOS = ['articulo', 'posesivo', 'pronombre', 'adjetivo', 'ndekl'];

// Kept in sync by hand with KAS_LEVELS in kasus.html.
export const KASUS_LEVELS = {
    A1: {
        casos: ['Nominativ', 'Akkusativ', 'Dativ'],
        wechsel: false,
        rellenos: ['articulo', 'posesivo', 'pronombre'],
        vocab: 'vocabulario básico A1 (familia, comida, casa, ciudad, compras, rutina diaria); frases cortas de 5-9 palabras, presente de indicativo',
        estructuras: [
            'una oración simple en presente (sujeto + verbo + complemento)',
            'una pregunta con W-Frage (Wer, Was, Wo, Wohin…)',
            'una oración con verbo modal en presente (können, möchten, müssen)',
            'una oración con el orden invertido (adverbio de tiempo inicial + verbo en segunda posición)',
        ],
        regentes: {
            Dativ: ['una preposición de Dativ (mit, zu, von, bei, aus)', 'el verbo helfen, gefallen o geben'],
        },
    },
    A2: {
        casos: ['Nominativ', 'Akkusativ', 'Dativ'],
        wechsel: true,
        rellenos: ['articulo', 'posesivo', 'pronombre', 'adjetivo'],
        vocab: 'vocabulario A2 de la vida cotidiana (trabajo, viajes, salud, tiempo libre, vivienda); frases de 6-12 palabras',
        estructuras: [
            'una oración simple en presente',
            'una oración en Perfekt',
            'una oración con verbo modal',
            'una oración con weil, dass o wenn (verbo al final de la subordinada)',
            'una oración con el orden invertido (adverbio inicial + verbo en segunda posición)',
        ],
    },
    B1: {
        casos: KASUS_CASOS,
        wechsel: true,
        rellenos: KASUS_RELLENOS,
        vocab: 'vocabulario B1 (trabajo, medios, medio ambiente, estudios, relaciones); frases de 8-16 palabras',
        estructuras: [
            'una oración en Perfekt o Präteritum',
            'una oración de relativo (Relativsatz) donde el hueco está en la cláusula principal',
            'una oración de relativo (Relativsatz) donde el hueco está dentro de la cláusula relativa',
            'una oración con dos cláusulas unidas por weil, obwohl, wenn o dass',
            'una oración con un complemento TEKAMOLO (temporal, causal, modal, local en ese orden)',
            'una oración con verbo modal',
        ],
    },
    B2: {
        casos: KASUS_CASOS,
        wechsel: true,
        rellenos: KASUS_RELLENOS,
        vocab: 'vocabulario B2-C1 (sociedad, economía, ciencia, política, cultura), registro escrito; frases de 10-20 palabras',
        estructuras: [
            'una oración de relativo con preposición (mit dem, für die, wegen dessen…)',
            'una oración en voz pasiva (werden + Partizip II)',
            'una oración con Konjunktiv II',
            'una oración con atributo participial (Partizipialattribut) antes del sustantivo',
            'una oración con dos cláusulas subordinadas',
            'una oración con nominalización propia del registro escrito',
        ],
    },
};

const REGENTES = {
    Nominativ: ['el sujeto de la oración', 'el predicado nominal tras sein, werden o bleiben'],
    Akkusativ: [
        'el objeto directo de un verbo transitivo',
        'una preposición de Akkusativ (für, ohne, gegen, durch, um)',
        'una expresión con es gibt',
    ],
    Dativ: [
        'un verbo que rige Dativ (helfen, danken, gefallen, gehören, antworten, gratulieren, folgen, passen, schmecken, fehlen, vertrauen)',
        'un verbo que rige Dativ (helfen, danken, gefallen, gehören, antworten, gratulieren, folgen, passen, schmecken, fehlen, vertrauen)',
        'una preposición de Dativ (mit, nach, bei, seit, von, zu, aus, gegenüber)',
        'el objeto indirecto de un verbo con dos objetos (geben, schenken, zeigen, erklären, empfehlen)',
    ],
    Genitiv: [
        'una relación de posesión entre dos sustantivos',
        'una preposición de Genitiv (wegen, trotz, während, statt, innerhalb, außerhalb, aufgrund)',
    ],
};

const TEMAS = [
    'comida y restaurantes', 'viajes y transporte', 'familia y relaciones',
    'trabajo y oficina', 'ciudad y lugares', 'naturaleza y medio ambiente',
    'tiempo libre y hobbies', 'compras y tiendas', 'escuela y universidad',
    'salud y medicina', 'tecnología y redes sociales', 'deportes',
    'música y cultura', 'clima y estaciones', 'mascotas y animales',
];

const WECHSEL_PREPS = ['in', 'an', 'auf', 'über', 'unter', 'vor', 'hinter', 'neben', 'zwischen'];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

export function kasusRuleId(level, caso, wechsel, relleno) {
    return `kasus:${level}:${wechsel ? 'W-' : ''}${caso}:${relleno}`;
}

// Returns an error string, or null if the combination is allowed for the level.
export function validateKasusRequest(level, caso, wechsel, relleno) {
    const cfg = KASUS_LEVELS[level];
    if (!cfg) return 'level inválido';
    if (!KASUS_RELLENOS.includes(relleno) || !cfg.rellenos.includes(relleno)) return 'relleno no disponible en este nivel';
    if (wechsel) {
        if (!cfg.wechsel) return 'Wechselpräpositionen no disponibles en este nivel';
        if (!['Akkusativ', 'Dativ'].includes(caso)) return 'caso inválido para Wechsel';
        if (!['articulo', 'adjetivo'].includes(relleno)) return 'relleno inválido para Wechsel';
        return null;
    }
    if (!cfg.casos.includes(caso)) return 'caso no disponible en este nivel';
    if (relleno === 'pronombre' && caso === 'Genitiv') return 'no hay pronombres en Genitiv';
    if (relleno === 'ndekl' && caso === 'Nominativ') return 'la n-Deklination no cambia en Nominativ singular';
    return null;
}

function rellenoSpec(relleno, caso) {
    switch (relleno) {
        case 'articulo':
            return {
                hueco: 'un artículo declinado (definido der/die/das o indefinido ein/kein). El sustantivo va visible justo después del hueco; no escribas ningún otro artículo junto al hueco',
                opciones: 'el mismo artículo declinado en otros casos o géneros (p. ej. der/den/dem/des)',
                pista: 'SOLO el tipo de artículo, sin revelar el género: exactamente "der/die/das" si es definido, "ein/eine" si es indefinido o "kein/keine" si es negativo',
                ejemplo: '{"frase":"Ich schenke ___ Freundin Blumen.","opciones":["der","die","dem","den"],"respuesta":"der","pista":"der/die/das","caso":"Dativ","genero":"f"}',
            };
        case 'posesivo':
            return {
                hueco: 'un posesivo declinado (mein, dein, sein, ihr, unser, euer, Ihr). El sustantivo va visible justo después del hueco',
                opciones: 'el mismo posesivo con otras terminaciones (p. ej. mein/meinen/meinem/meiner)',
                pista: 'exactamente el posesivo base sin terminación (mein, dein, sein, ihr, unser, euer o Ihr)',
                ejemplo: '{"frase":"Wir fahren mit ___ Auto nach Berlin.","opciones":["unser","unserem","unseren","unserer"],"respuesta":"unserem","pista":"unser","caso":"Dativ","genero":"n"}',
            };
        case 'pronombre':
            return {
                hueco: `un pronombre personal en ${caso} (mich/mir, dich/dir, ihn/ihm, sie/ihr, uns, euch, sie/ihnen, Sie/Ihnen). No uses pronombres reflexivos`,
                opciones: 'el mismo pronombre en otros casos (p. ej. ich/mich/mir) y una forma de otra persona',
                pista: 'exactamente el pronombre en Nominativ que hay que declinar: ich, du, er, sie, es, wir, ihr o Sie (nunca otra palabra de la frase)',
                ejemplo: '{"frase":"Kannst du ___ morgen helfen?","opciones":["mich","mir","ich","dir"],"respuesta":"mir","pista":"ich","caso":"Dativ","genero":"m"}',
                extraGenero: 'Para "sie", "genero" distingue ella ("f") de ellos ("pl").',
            };
        case 'adjetivo':
            return {
                hueco: 'UNA sola palabra: el adjetivo declinado. El artículo o posesivo (si lo hay) va escrito fuera del hueco, justo antes, y el sustantivo justo después; nunca pongas el artículo dentro del hueco ni en las opciones',
                opciones: 'el mismo adjetivo con distintas terminaciones (-e, -en, -em, -er, -es)',
                pista: 'el adjetivo sin terminación (p. ej. "groß")',
                ejemplo: '{"frase":"Sie wohnt in einer ___ Wohnung.","opciones":["kleine","kleinen","kleiner","kleinem"],"respuesta":"kleinen","pista":"klein","caso":"Dativ","genero":"f"}',
                extra: 'Alterna entre declinación débil (tras der/die/das), mixta (tras ein/kein/posesivo) y fuerte (sin artículo; solo con plurales o sustantivos incontables como Wasser, Kaffee, Wetter, Musik, Geld).',
            };
        case 'ndekl':
            return {
                hueco: 'SOLO el sustantivo (sin artículo) de un masculino de la n-Deklination en singular. Usa únicamente estos: Student, Kollege, Junge, Mensch, Herr, Nachbar, Kunde, Name, Präsident, Tourist, Polizist, Löwe, Journalist, Praktikant, Experte, Bär, Held, Patient, Assistent. El artículo o posesivo va visible justo antes del hueco. El sustantivo NO aparece escrito en la frase: en su lugar va "___"',
                opciones: 'el mismo sustantivo con distintas terminaciones (p. ej. Student/Studenten/Studentes/Studentens)',
                pista: 'el sustantivo en Nominativ singular (p. ej. "Student")',
                ejemplo: '{"frase":"Ich habe gestern mit dem ___ gesprochen.","opciones":["Kollege","Kollegen","Kolleges","Kollegem"],"respuesta":"Kollegen","pista":"Kollege","caso":"Dativ","genero":"m"}',
            };
    }
}

export function buildKasusPrompt(level, caso, wechsel, relleno, n) {
    const cfg = KASUS_LEVELS[level];
    const spec = rellenoSpec(relleno, caso);
    // B2 structures (passive, participial attributes) produced broken sentences around pronouns.
    const estructuras = relleno === 'pronombre' && level === 'B2' ? KASUS_LEVELS.B1.estructuras : cfg.estructuras;
    const items = Array.from({ length: n }, (_, i) => {
        const tema = pick(TEMAS);
        if (wechsel) return `${i + 1}. Preposición "${pick(WECHSEL_PREPS)}", tema "${tema}".`;
        return `${i + 1}. Tema "${tema}"; estructura: ${pick(estructuras)}; el ${caso} lo exige ${pick(cfg.regentes?.[caso] || REGENTES[caso])}.`;
    }).join('\n');

    const sentido = caso === 'Akkusativ'
        ? 'TODAS las frases expresan dirección o movimiento hacia un lugar (wohin? → Akkusativ), con verbos como gehen, legen, stellen, hängen, setzen, fahren, laufen'
        : 'TODAS las frases expresan posición estática (wo? → Dativ), con verbos como sein, liegen, stehen, hängen, sitzen, wohnen, arbeiten';
    const soloLocal = 'La preposición tiene siempre sentido espacial (un lugar real); nunca uses verbos con preposición fija (sprechen über, warten auf, denken an, Angst haben vor) ni usos temporales';
    let tarea, ejemplo;
    if (wechsel && relleno === 'articulo') {
        tarea = `Cada ejercicio trabaja una Wechselpräposition en ${caso}. ${sentido}. ${soloLocal}. El hueco (___) sustituye JUNTOS la preposición y el artículo definido (p. ej. "ins", "im", "in den", "in der", "am", "an die"); después del hueco va directamente el sustantivo, sin artículo. Las 4 opciones usan la misma preposición. "pista": la preposición + "der/die/das" (p. ej. "in + der/die/das").`;
        ejemplo = caso === 'Akkusativ'
            ? '{"frase":"Ich lege das Buch ___ Tisch.","opciones":["auf den","auf dem","auf die","auf der"],"respuesta":"auf den","pista":"auf + der/die/das","caso":"Akkusativ","genero":"m"}'
            : '{"frase":"Das Buch liegt ___ Tisch.","opciones":["auf den","auf dem","auf die","auf der"],"respuesta":"auf dem","pista":"auf + der/die/das","caso":"Dativ","genero":"m"}';
    } else if (wechsel) {
        tarea = `Cada ejercicio trabaja la declinación del adjetivo tras una Wechselpräposition en ${caso}. ${sentido}. ${soloLocal}. La preposición, el artículo y el sustantivo son visibles; el hueco (___) es solo el adjetivo. Opciones: ${spec.opciones}. "pista": ${spec.pista}.`;
        ejemplo = spec.ejemplo;
    } else {
        tarea = `Cada ejercicio trabaja el ${caso}. El hueco (___) es ${spec.hueco}. Opciones: ${spec.opciones}. "pista": ${spec.pista}. ${spec.extra || ''}`;
        ejemplo = spec.ejemplo;
    }

    const system = `Eres un profesor de alemán que prepara ejercicios de nivel ${level}. Usa ${cfg.vocab}.
${tarea}
Ejemplo del formato de un ítem (sin "explicacion"): ${ejemplo}
Reglas para todos los ejercicios:
- Frases 100 % en alemán correcto y natural; exactamente un hueco "___" por frase.
- 4 opciones distintas; exactamente una es correcta y, con la pista, la respuesta es inequívoca. La respuesta correcta aparece literalmente entre las 4 opciones (no copies las opciones del ejemplo).
- Varía los sustantivos; evita "Mann", "Frau", "Kind" salvo que sean imprescindibles.
- "genero": género del sustantivo afectado ("m", "f", "n" o "pl"). ${spec.extraGenero || ''}
- "explicacion": breve, en español; cita qué rige el caso (verbo, preposición o función sintáctica), el género y, si aplica, el tipo de declinación.
Devuelve SOLO un objeto JSON: {"ejercicios":[{"frase":"…___…","opciones":["","","",""],"respuesta":"","pista":"","caso":"${caso}","genero":"m","explicacion":""}]}. El campo "caso" es literalmente "${caso}".`;

    const prompt = `Genera ${n} ejercicios, uno por línea de esta lista:\n${items}`;
    return { system, prompt };
}

// ── Deterministic checks: given caso + género + pista, the right form is computable ──
const DEF = {
    Nominativ: { m: 'der', f: 'die', n: 'das', pl: 'die' },
    Akkusativ: { m: 'den', f: 'die', n: 'das', pl: 'die' },
    Dativ:     { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
    Genitiv:   { m: 'des', f: 'der', n: 'des', pl: 'der' },
};
const EIN_END = {
    Nominativ: { m: '', f: 'e', n: '', pl: 'e' },
    Akkusativ: { m: 'en', f: 'e', n: '', pl: 'e' },
    Dativ:     { m: 'em', f: 'er', n: 'em', pl: 'en' },
    Genitiv:   { m: 'es', f: 'er', n: 'es', pl: 'er' },
};
const PRON = {
    ich: ['ich', 'mich', 'mir'], du: ['du', 'dich', 'dir'], er: ['er', 'ihn', 'ihm'], es: ['es', 'es', 'ihm'],
    wir: ['wir', 'uns', 'uns'], ihr: ['ihr', 'euch', 'euch'], Sie: ['Sie', 'Sie', 'Ihnen'],
};
const CASE_IDX = { Nominativ: 0, Akkusativ: 1, Dativ: 2 };
const CONTRACT = {
    im: 'in dem', ins: 'in das', am: 'an dem', ans: 'an das', aufs: 'auf das',
    vom: 'von dem', zum: 'zu dem', zur: 'zu der', beim: 'bei dem',
};
const TO_CONTRACT = { 'in dem': 'im', 'in das': 'ins', 'an dem': 'am', 'an das': 'ans' };
const DETERMINERS = /^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|kein|keine|keinen|keinem|keiner|keines|mein\w*|dein\w*|sein\w*|unser\w*|euer|eur\w*)$/i;

function einForm(base, caso, genero) {
    const end = EIN_END[caso][genero];
    if (!end) return base;
    return (base.toLowerCase() === 'euer' ? base.slice(0, 2) + 'r' : base) + end;
}

// null = the hint/gender combination is invalid; undefined = no single computable form.
function expectedForm(caso, genero, relleno, pista, wechsel) {
    const p = pista.trim();
    if (wechsel && relleno === 'articulo') {
        const prep = p.split('+')[0].trim().toLowerCase();
        return WECHSEL_PREPS.includes(prep) ? `${prep} ${DEF[caso][genero]}` : null;
    }
    if (relleno === 'articulo') {
        const tipo = p.toLowerCase().replace(/\s/g, '');
        if (tipo === 'der/die/das') return DEF[caso][genero];
        if (tipo === 'ein/eine') return genero === 'pl' ? null : einForm('ein', caso, genero);
        if (tipo === 'kein/keine') return einForm('kein', caso, genero);
        return null;
    }
    if (relleno === 'posesivo') {
        return /^(mein|dein|sein|ihr|unser|euer)$/i.test(p) ? einForm(p, caso, genero) : null;
    }
    if (relleno === 'pronombre') {
        if (p === 'sie') return (genero === 'pl' ? ['sie', 'sie', 'ihnen'] : ['sie', 'sie', 'ihr'])[CASE_IDX[caso]];
        const forms = PRON[p] || PRON[p.toLowerCase()];
        return forms ? forms[CASE_IDX[caso]] : null;
    }
    return undefined;
}

function expandContraction(s) {
    return s.trim().split(/\s+/).map(w => CONTRACT[w.toLowerCase()] || w).join(' ').toLowerCase();
}

const ADJ_END = {
    weak: {
        Nominativ: { m: 'e', f: 'e', n: 'e', pl: 'en' }, Akkusativ: { m: 'en', f: 'e', n: 'e', pl: 'en' },
        Dativ: { m: 'en', f: 'en', n: 'en', pl: 'en' }, Genitiv: { m: 'en', f: 'en', n: 'en', pl: 'en' },
    },
    mixed: {
        Nominativ: { m: 'er', f: 'e', n: 'es', pl: 'en' }, Akkusativ: { m: 'en', f: 'e', n: 'es', pl: 'en' },
        Dativ: { m: 'en', f: 'en', n: 'en', pl: 'en' }, Genitiv: { m: 'en', f: 'en', n: 'en', pl: 'en' },
    },
    strong: {
        Nominativ: { m: 'er', f: 'e', n: 'es', pl: 'e' }, Akkusativ: { m: 'en', f: 'e', n: 'es', pl: 'e' },
        Dativ: { m: 'em', f: 'er', n: 'em', pl: 'en' }, Genitiv: { m: 'en', f: 'er', n: 'en', pl: 'er' },
    },
};
const DER_WORD_END = { der: 'er', die: 'e', das: 'es', den: 'en', dem: 'em', des: 'es' };
const EIN_WORD = /^(ein|kein|mein|dein|sein|ihr|unser|euer|eur)(e|en|em|er|es)?$/;

// Classifies the word before a blank as a determiner and checks it agrees with caso+género.
// Returns 'weak' | 'mixed' | 'strong' (no determiner), or null if it's a determiner that doesn't agree.
function determinerType(word, caso, genero) {
    const w = word.toLowerCase().replace(/[.,!?;:]/g, '');
    const def = DEF[caso][genero];
    if (DER_WORD_END[w] !== undefined) return w === def ? 'weak' : null;
    if (CONTRACT[w]) return CONTRACT[w].split(' ')[1] === def ? 'weak' : null;
    const derWord = w.match(/^(dies|jen|jed|welch|manch)(e|er|es|en|em)$/);
    if (derWord) return derWord[2] === DER_WORD_END[def] ? 'weak' : null;
    const einWord = w.match(EIN_WORD);
    if (einWord) {
        const base = einWord[1] === 'eur' ? 'euer' : einWord[1];
        if (base === 'ein' && genero === 'pl') return null;
        return w === einForm(base, caso, genero).toLowerCase() ? 'mixed' : null;
    }
    return 'strong';
}

function adjStems(base) {
    const b = base.toLowerCase();
    return [b, b.replace(/e([lr])$/, '$1'), b === 'hoch' ? 'hoh' : null].filter(Boolean);
}

// Trims fields and rewrites "in dem"/"in das"/"an dem"/"an das" answers to the natural contraction.
export function normalizeKasusItem(ej) {
    if (!ej || typeof ej !== 'object') return ej;
    const t = v => (typeof v === 'string' ? v.trim() : v);
    const out = { ...ej, frase: t(ej.frase), respuesta: t(ej.respuesta), pista: t(ej.pista), explicacion: t(ej.explicacion) };
    if (Array.isArray(ej.opciones)) out.opciones = ej.opciones.map(t);
    const contr = typeof out.respuesta === 'string' && TO_CONTRACT[out.respuesta.toLowerCase()];
    if (contr && Array.isArray(out.opciones) && !out.opciones.some(o => typeof o === 'string' && o.toLowerCase() === contr)) {
        out.opciones = out.opciones.map(o => (o === out.respuesta ? contr : o));
        out.respuesta = contr;
    }
    return out;
}

export function validKasusItem(ej, caso, wechsel, relleno) {
    const shapeOk = ej && typeof ej.frase === 'string' && ej.frase.split('___').length === 2
        && Array.isArray(ej.opciones) && ej.opciones.length === 4
        && ej.opciones.every(o => typeof o === 'string' && o)
        && new Set(ej.opciones.map(expandContraction)).size === 4
        && typeof ej.respuesta === 'string' && ej.opciones.includes(ej.respuesta)
        && typeof ej.pista === 'string' && ej.pista
        && typeof ej.explicacion === 'string' && ej.explicacion
        && ['m', 'f', 'n', 'pl'].includes(ej.genero)
        && ej.caso === caso;
    if (!shapeOk) return false;

    const [antes, despues] = ej.frase.split('___');
    const sigPalabra = (despues.trim().split(/\s+/)[0] || '').replace(/[.,!?;:]/g, '');
    const prevWords = antes.trim().split(/\s+/);
    const antPalabra = prevWords[prevWords.length - 1] || '';
    if (['articulo', 'posesivo'].includes(relleno) && DETERMINERS.test(sigPalabra)) return false;
    if (relleno === 'articulo' && !wechsel && DETERMINERS.test(antPalabra)) return false;

    const esperado = expectedForm(caso, ej.genero, relleno, ej.pista, wechsel);
    if (esperado === null) return false;
    if (esperado !== undefined) return expandContraction(ej.respuesta) === expandContraction(esperado);

    if (relleno === 'ndekl') {
        const base = ej.pista;
        const det = [antPalabra, prevWords[prevWords.length - 2] || ''].map(w => determinerType(w, caso, 'm'));
        // The nearest determiner (directly before, or before an adjective) must agree with masculine singular.
        const detOk = det[0] === 'weak' || det[0] === 'mixed'
            || (det[0] === 'strong' && /en$/.test(antPalabra) && (det[1] === 'weak' || det[1] === 'mixed'));
        return ej.genero === 'm' && detOk && /^[A-ZÄÖÜ]/.test(ej.respuesta)
            && ['n', 'en', 'ns', 'ens'].some(suf => ej.respuesta === base + suf);
    }
    if (relleno === 'adjetivo') {
        if (DETERMINERS.test(ej.respuesta) || DETERMINERS.test(ej.pista)) return false;
        const tipo = determinerType(antPalabra, caso, ej.genero);
        if (!tipo) return false;
        const end = ADJ_END[tipo][caso][ej.genero];
        return adjStems(ej.pista).some(st => ej.respuesta.toLowerCase() === st + end);
    }
    return true;
}

// The verifier rewrites each completed sentence with minimal fixes instead of judging it:
// models correct far more reliably than they flag, so any edit means the item is rejected.
export const KASUS_VERIFY_SYSTEM = 'Eres un profesor de alemán de nivel nativo y muy exigente. Recibes una lista numerada de frases, cada una con un hueco (___), una pista con la forma base y 4 opciones. Para cada frase: elige la única opción gramaticalmente correcta; di en qué caso está la palabra del hueco según la función que cumple en la frase; en "problema" describe brevemente cualquier error o falta de naturalidad que tenga la frase completa con esa opción, o escribe exactamente "ninguno"; y escribe en "corregida" la frase completa con esa opción. Si algo en ella no es alemán correcto y natural (palabras que sobran o faltan, verbo que no encaja, orden incorrecto, terminaciones mal, algo que un nativo no diría), corrígelo con el mínimo cambio; si está bien, cópiala tal cual. Devuelve SOLO JSON: {"respuestas":[{"opcion":"opción copiada literalmente","caso":"Nominativ|Akkusativ|Dativ|Genitiv","problema":"ninguno","corregida":"frase completa"}, …]} en el mismo orden.';

const normSentence = s => String(s).toLowerCase().replace(/[.,!?;:"„“«»()]/g, '').replace(/\s+/g, ' ').trim();

export function kasusVerified(ej, r, caso) {
    return !!r && typeof r.opcion === 'string' && r.opcion.trim() === ej.respuesta && r.caso === caso
        && typeof r.problema === 'string' && r.problema.trim().toLowerCase().startsWith('ninguno')
        && typeof r.corregida === 'string'
        && normSentence(r.corregida) === normSentence(ej.frase.replace('___', ej.respuesta));
}
