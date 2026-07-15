window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
window.GRAMMAR_DATA.A1 = [
    {
      id: 'a1-01',
      titulo: 'Artículos definidos',
      subtitulo: 'der, die, das',
      regla_base: 'Cada sustantivo tiene un género gramatical fijo: der (masculino), die (femenino), das (neutro). En plural todos usan die, sin excepción.',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nominativo', 'der', 'die', 'das', 'die']] },
      excepciones: 'El género no sigue la biología: das Mädchen es neutro. Patrones fiables: -ung/-heit/-keit → die; -chen/-lein → das; infinitivos sustantivados → das.',
      explicacion: 'En alemán cada sustantivo tiene un género gramatical: masculino (der), femenino (die) o neutro (das). El género no siempre sigue una lógica natural — "das Mädchen" (la chica) es neutro aunque se refiere a una persona femenina — y debe aprenderse junto con cada palabra nueva. En plural todos los géneros usan "die", sin excepción. Algunos patrones ayudan: las palabras terminadas en -ung, -heit, -keit, -schaft son casi siempre femeninas; las terminadas en -chen o -lein son siempre neutras; los infinitivos nominalizados son siempre neutros (das Essen, das Lernen).',
      ejemplos: [
        { de: 'der Mann', es: 'el hombre (masc.)' },
        { de: 'die Frau', es: 'la mujer (fem.)' },
        { de: 'das Kind', es: 'el niño (neutro)' },
        { de: 'die Kinder', es: 'los niños (plural → siempre die)' }
      ],
      tip: 'Aprende siempre el artículo junto con el sustantivo: no "Tisch", sino "der Tisch". Memorizarlos por separado es mucho más difícil y te costará errores de declinación más adelante.'
    },
    {
      id: 'a1-02',
      titulo: 'Pronombres personales',
      subtitulo: 'ich, du, er/sie/es…',
      regla_base: 'El pronombre sujeto es obligatorio en alemán. Sie (mayúscula) = tratamiento formal de respeto; sie (minúscula) = ella o ellos/ellas — el contexto y la conjugación lo distinguen.',
      tabla: { headers: ['Singular', '', 'Plural', ''], rows: [['ich', 'yo', 'wir', 'nosotros'], ['du', 'tú', 'ihr', 'vosotros'], ['er/sie/es', 'él/ella/ello', 'sie / Sie', 'ellos / usted']] },
      excepciones: '"sie" minúscula puede ser ella o ellos; solo el contexto aclara cuál. Con Sie formal el verbo va siempre en forma de ellos (kommen, nicht kommt).',
      explicacion: 'Los pronombres personales alemanes son: ich (yo), du (tú), er (él), sie (ella), es (ello/eso), wir (nosotros), ihr (vosotros/ustedes informal), sie (ellos/ellas), Sie (usted/es formal). La forma "Sie" formal se escribe siempre con mayúscula para distinguirla de "sie" (ella/ellos). En alemán el pronombre sujeto es obligatorio, a diferencia del español donde puede omitirse. La elección entre "du" y "Sie" depende del contexto social: con desconocidos adultos se usa "Sie"; con amigos, familia y niños se usa "du".',
      ejemplos: [
        { de: 'Ich bin müde.', es: 'Yo estoy cansado.' },
        { de: 'Er kommt aus Spanien.', es: 'Él viene de España.' },
        { de: 'Wir lernen Deutsch.', es: 'Nosotros aprendemos alemán.' },
        { de: 'Sie sind Lehrerin. / Sie sind Lehrer.', es: 'Ella es profesora. / Ustedes son profesores.' }
      ],
      tip: '"sie" (minúscula) puede significar "ella" o "ellos/as"; solo el contexto y la conjugación del verbo aclaran cuál es. "Sie" (mayúscula) en medio de frase es siempre el tratamiento formal de respeto.'
    },
    {
      id: 'a1-03',
      titulo: 'Verbos sein y haben',
      subtitulo: 'ser/estar y tener en presente',
      regla_base: 'Sein y haben son completamente irregulares. Además de su significado propio, son los auxiliares que forman el Perfekt y el Plusquamperfekt.',
      tabla: { headers: ['', 'sein', 'haben'], rows: [['ich', 'bin', 'habe'], ['du', 'bist', 'hast'], ['er/sie/es', 'ist', 'hat'], ['wir', 'sind', 'haben'], ['ihr', 'seid', 'habt'], ['sie/Sie', 'sind', 'haben']] },
      explicacion: '"Sein" (ser/estar) y "haben" (tener) son los dos verbos más importantes del alemán y ambos son completamente irregulares. No solo se usan para expresar identidad, estado y posesión, sino también como verbos auxiliares para formar el Perfekt y el Plusquamperfekt. La distinción español ser/estar no existe en alemán: "sein" cubre ambos significados según el contexto. Hay que memorizar toda la conjugación de los dos verbos antes de avanzar.',
      ejemplos: [
        { de: 'Ich bin / du bist / er ist', es: 'soy-estoy / eres-estás / es-está' },
        { de: 'wir sind / ihr seid / sie sind', es: 'somos / sois / son' },
        { de: 'Ich habe / du hast / er hat', es: 'tengo / tienes / tiene' },
        { de: 'wir haben / ihr habt / sie haben', es: 'tenemos / tenéis / tienen' }
      ],
      tip: 'Practica estas conjugaciones hasta que salgan automáticas. Las necesitarás para construir casi cualquier frase en alemán y para todos los tiempos compuestos que aprenderás después.'
    },
    {
      id: 'a1-04',
      titulo: 'Presente verbos regulares',
      subtitulo: 'terminaciones -e, -st, -t, -en, -t, -en',
      regla_base: 'Raíz (infinitivo sin -en) + terminación según el pronombre: ich -e · du -st · er/sie/es -t · wir -en · ihr -t · sie -en.',
      tabla: { headers: ['Pronombre', 'Terminación', 'lernen'], rows: [['ich', '-e', 'lerne'], ['du', '-st', 'lernst'], ['er/sie/es', '-t', 'lernt'], ['wir', '-en', 'lernen'], ['ihr', '-t', 'lernt'], ['sie/Sie', '-en', 'lernen']] },
      excepciones: 'Si la raíz termina en -t/-d (arbeiten), se inserta -e-: du arbeitest, er arbeitet. Si termina en -s/-ß/-z (reisen), du solo añade -t: du reist.',
      explicacion: 'Los verbos regulares alemanes siguen un patrón fijo: se quita la terminación "-en" del infinitivo para obtener la raíz (lernen → lern-) y se añaden las terminaciones -e / -st / -t / -en / -t / -en para ich/du/er/wir/ihr/sie respectivamente. Este sistema es muy regular comparado con el español. Hay dos ajustes fonéticos importantes: si la raíz termina en -t/-d (arbeiten, reden), se inserta una -e- antes de -st y -t para facilitar la pronunciación (du arbeitest, er arbeitet). Si la raíz termina en -s/-ß/-z, la forma "du" solo añade -t en vez de -st (reisen → du reist).',
      ejemplos: [
        { de: 'ich lerne / du lernst', es: 'aprendo / aprendes' },
        { de: 'er lernt / wir lernen', es: 'aprende / aprendemos' },
        { de: 'ihr lernt / sie lernen', es: 'aprendéis / aprenden' },
        { de: 'du arbeitest / er arbeitet', es: 'trabajas / trabaja (raíz en -t)' }
      ],
      tip: 'La forma "ich" siempre termina en -e (lerne, spiele, kaufe). La forma "er/sie/es" siempre termina en -t (lernt, spielt, kauft). Estas dos son las más frecuentes y son totalmente regulares.'
    },
    {
      id: 'a1-05',
      titulo: 'Negación: nicht y kein',
      subtitulo: 'cuándo usar cada uno',
      regla_base: 'nicht niega verbos, adjetivos y sustantivos con artículo definido/posesivo. kein niega sustantivos que llevarían ein o que van sin artículo.',
      excepciones: 'kein se declina exactamente igual que ein: keinen (masc. Akk.), keiner (fem. Gen./Dat.), keinem (Dat.), keine (fem. Nom./Akk. y plural).',
      explicacion: '"Nicht" niega verbos, adjetivos, adverbios, y sustantivos que van con artículo definido (der/die/das) o con pronombre posesivo (mein, dein…). "Kein/keine/kein" niega sustantivos que llevarían artículo indefinido (ein/eine) o que van sin artículo. "Nicht" se coloca generalmente al final de la frase, antes del elemento que niega con más énfasis, o antes de un adjetivo/adverbio. "Kein" sigue exactamente la misma declinación que "ein" y debe concordar con el género y el caso del sustantivo.',
      ejemplos: [
        { de: 'Ich komme nicht.', es: 'No vengo.' },
        { de: 'Das ist nicht gut.', es: 'Eso no es bueno.' },
        { de: 'Ich habe kein Auto.', es: 'No tengo coche.' },
        { de: 'Sie trinkt keinen Kaffee.', es: 'Ella no bebe café. (masc. acus. → keinen)' }
      ],
      tip: 'Regla rápida: ¿podrías poner "un/una" o nada delante del sustantivo en positivo? → usa kein. ¿Niegas el verbo, un adjetivo o un sustantivo con "el/la"? → usa nicht.'
    },
    {
      id: 'a1-06',
      titulo: 'Acusativo básico',
      subtitulo: 'cambio del artículo masculino (der → den)',
      regla_base: 'El acusativo marca el objeto directo (¿qué? / ¿a quién?). Solo el artículo masculino cambia: der→den, ein→einen. Femenino, neutro y plural son idénticos al nominativo.',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nominativo', 'der / ein', 'die / eine', 'das / ein', 'die / —'], ['Acusativo', 'den / einen', 'die / eine', 'das / ein', 'die / —']] },
      excepciones: 'El pronombre también cambia: er (nom.) → ihn (acus.). Pero sie (ella) y es permanecen igual en ambos casos.',
      explicacion: 'El acusativo es el caso del objeto directo, es decir, la persona o cosa que recibe directamente la acción del verbo (¿a quién? / ¿qué?). En alemán solo el artículo masculino cambia de forma visible en acusativo: "der" se convierte en "den" y "ein" en "einen". Los artículos femenino, neutro y plural son idénticos en nominativo y acusativo. Este cambio afecta también a los pronombres personales: er (nom.) → ihn (acus.), sie/es permanecen igual.',
      ejemplos: [
        { de: 'Ich sehe den Mann.', es: 'Veo al hombre. (der → den)' },
        { de: 'Ich kaufe einen Apfel.', es: 'Compro una manzana. (ein → einen)' },
        { de: 'Sie liest die Zeitung.', es: 'Lee el periódico. (fem. sin cambio)' },
        { de: 'Er hat das Buch.', es: 'Tiene el libro. (neutro sin cambio)' }
      ],
      tip: '"den" es la señal visual del acusativo masculino. Si ves "den" en una frase, ese sustantivo es el objeto directo y es masculino. Con femenino, neutro y plural el artículo es idéntico al nominativo — el caso lo determina el contexto.'
    },
    {
      id: 'a1-07',
      titulo: 'W-Fragen',
      subtitulo: 'palabras interrogativas',
      regla_base: 'Estructura: [W-Wort] + [verbo] + [sujeto] + [resto]. Casi todas las palabras interrogativas empiezan con W.',
      tabla: { headers: ['Pregunta', 'Significado'], rows: [['wer', 'quién'], ['was', 'qué'], ['wo', 'dónde (posición)'], ['wohin', 'adónde (dirección)'], ['woher', 'de dónde'], ['wann', 'cuándo'], ['wie', 'cómo'], ['warum', 'por qué'], ['wie viel/viele', 'cuánto/cuántos']] },
      excepciones: 'No confundas wo (posición), wohin (dirección) y woher (origen). wer se declina: wen (Akk.), wem (Dat.), wessen (Gen.).',
      explicacion: 'Las W-Fragen son preguntas abiertas que comienzan con una palabra interrogativa (casi todas empiezan con W en alemán). La estructura es: [W-Wort] + [verbo conjugado] + [sujeto si no es la propia W-palabra] + [resto]. Las principales son: wer (quién), was (qué), wo (dónde), wann (cuándo), wie (cómo), warum (por qué), woher (de dónde), wohin (hacia dónde), wie viel (cuánto), wie viele (cuántos). "Wer" se declina igual que el artículo definido masculino: wen (acus.), wem (dat.), wessen (gen.).',
      ejemplos: [
        { de: 'Wer ist das?', es: '¿Quién es ese?' },
        { de: 'Wo wohnst du?', es: '¿Dónde vives?' },
        { de: 'Warum lernst du Deutsch?', es: '¿Por qué aprendes alemán?' },
        { de: 'Wie heißt du?', es: '¿Cómo te llamas?' }
      ],
      tip: 'No confundas "wo" (¿dónde?/posición estática), "woher" (¿de dónde?/origen) y "wohin" (¿adónde?/dirección). La distinción posición/movimiento es fundamental en alemán.'
    },
    {
      id: 'a1-08',
      titulo: 'Orden de palabras',
      subtitulo: 'el verbo siempre en posición 2',
      regla_base: 'El verbo conjugado ocupa siempre la posición 2 (V2) en frases declarativas, sin importar qué elemento vaya en primera posición. Si el sujeto no abre la frase, se invierte: [Elemento 1] + [Verbo] + [Sujeto] + [Resto].',
      excepciones: 'En subordinadas (weil, dass, wenn…) el verbo va al final. Los prefijos separables e infinitivos van también al final de la frase principal, creando el "marco verbal" (Satzklammer).',
      explicacion: 'La regla más importante del alemán: en una frase declarativa el verbo conjugado ocupa SIEMPRE la segunda posición (V2), independientemente de qué elemento esté en la primera posición. Si el sujeto no abre la frase, el verbo y el sujeto se invierten (inversión sujeto-verbo). Esto da al alemán gran flexibilidad para enfatizar distintos elementos al colocarlos al inicio. Los verbos modales, auxiliares y los verbos con prefijo separable siguen esta misma regla: el verbo conjugado en V2, el infinitivo o el prefijo al final.',
      ejemplos: [
        { de: 'Ich lerne jeden Tag Deutsch.', es: 'Aprendo alemán cada día.' },
        { de: 'Jeden Tag lerne ich Deutsch.', es: 'Cada día aprendo alemán. (inversión)' },
        { de: 'Heute gehe ich ins Kino.', es: 'Hoy voy al cine. (inversión)' },
        { de: 'Morgen kann ich nicht kommen.', es: 'Mañana no puedo venir. (modal en V2)' }
      ],
      tip: 'Visualiza la frase como dos bloques: [posición 1 — cualquier elemento] + [VERBO — siempre aquí] + [resto]. El verbo es el ancla fija. Si algo distinto al sujeto va primero, el sujeto salta después del verbo.'
    },
    {
      id: 'a1-09',
      titulo: 'Plurales',
      subtitulo: 'las 5 formas más frecuentes',
      regla_base: 'No existe una sola regla de plural: debe aprenderse con cada sustantivo. Hay 5 patrones principales.',
      tabla: { headers: ['Patrón', 'Ejemplo'], rows: [['Sin cambio / umlaut', 'der Lehrer → die Lehrer · die Mutter → die Mütter'], ['+e / umlaut+e', 'der Tag → die Tage · die Hand → die Hände'], ['+er / umlaut+er', 'das Kind → die Kinder · das Haus → die Häuser'], ['+en / -n', 'die Frau → die Frauen · die Blume → die Blumen'], ['+s (extranjerismos)', 'das Auto → die Autos · das Hotel → die Hotels']] },
      excepciones: 'En dativo plural siempre se añade -n si el plural no termina ya en -n o -s: den Kindern, den Männern.',
      explicacion: 'El plural en alemán no tiene una regla única; cada sustantivo tiene su propio plural que debe aprenderse. Hay cinco patrones principales: (1) sin cambio o con umlaut (der Lehrer / die Lehrer); (2) +e o con umlaut +e (der Tag / die Tage, die Hand / die Hände); (3) +er o con umlaut +er (das Kind / die Kinder); (4) +en/-n (die Frau / die Frauen); (5) +s para palabras extranjeras (das Auto / die Autos). En dativo plural siempre se añade una -n si el plural no termina ya en -n o -s.',
      ejemplos: [
        { de: 'der Tag → die Tage (+e)', es: 'el día → los días' },
        { de: 'die Hand → die Hände (umlaut +e)', es: 'la mano → las manos' },
        { de: 'das Kind → die Kinder (+er)', es: 'el niño → los niños' },
        { de: 'die Frau → die Frauen (+en)', es: 'la mujer → las mujeres' }
      ],
      tip: 'Los diccionarios siempre indican el plural junto al artículo: "der Tag, -e". Aprende ambos desde el principio: artículo + singular + plural. Intentar deducirlos después es mucho más difícil.'
    },
    {
      id: 'a1-10',
      titulo: 'Artículo indefinido y su negación',
      subtitulo: 'ein/eine/ein — kein/keine/kein',
      regla_base: 'ein/eine/ein para masc./fem./neutro. kein sigue exactamente la misma declinación. ein no tiene plural: en positivo sin artículo, en negativo keine.',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'ein / kein', 'eine / keine', 'ein / kein', '— / keine'], ['Akk.', 'einen / keinen', 'eine / keine', 'ein / kein', '— / keine']] },
      explicacion: 'El artículo indefinido en alemán es "ein" para masculino y neutro, y "eine" para femenino. En acusativo el masculino cambia a "einen" (igual que der → den). "Kein" es la negación del artículo indefinido y sigue exactamente la misma declinación que "ein": kein/keine/kein en nominativo, keinen para masculino acusativo, etc. Importante: "ein" no tiene forma plural — en positivo se usa el sustantivo sin artículo (Ich habe Bücher), y en negativo "keine" (Ich habe keine Bücher).',
      ejemplos: [
        { de: 'Das ist ein Hund.', es: 'Eso es un perro.' },
        { de: 'Ich habe eine Katze.', es: 'Tengo una gata.' },
        { de: 'Ich habe kein Auto.', es: 'No tengo coche.' },
        { de: 'Ich habe keine Bücher.', es: 'No tengo libros. (plural)' }
      ],
      tip: '"kein" se declina exactamente como "ein". Si sabes declinar "ein", sabes declinar "kein". Añade simplemente "k-" al inicio.'
    }
];
