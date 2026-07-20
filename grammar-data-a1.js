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
    },
    {
      id: 'a1-11',
      titulo: 'Verben mit Vokalwechsel',
      subtitulo: 'cambio vocálico en presente, du/er',
      regla_base: 'Algunos verbos irregulares cambian la vocal de la raíz SOLO en las formas du y er/sie/es. Tres patrones: e→i, e→ie, a→ä.',
      tabla: { headers: ['Patrón', 'Infinitiv', 'du', 'er/sie/es'], rows: [['e → i', 'essen', 'isst', 'isst'], ['e → i', 'sprechen', 'sprichst', 'spricht'], ['e → i', 'geben', 'gibst', 'gibt'], ['e → ie', 'lesen', 'liest', 'liest'], ['e → ie', 'sehen', 'siehst', 'sieht'], ['a → ä', 'fahren', 'fährst', 'fährt'], ['a → ä', 'schlafen', 'schläfst', 'schläft'], ['a → ä', 'tragen', 'trägst', 'trägt']] },
      excepciones: 'El cambio nunca afecta a ich, wir, ihr ni sie/Sie (plural). Solo du y er/sie/es cambian la vocal; el resto de la conjugación es totalmente regular.',
      explicacion: 'En presente, un grupo de verbos irregulares alemanes cambia la vocal de la raíz, pero únicamente en las formas "du" y "er/sie/es" — nunca en ich, wir, ihr o sie/Sie. Hay tres patrones principales: e→i (essen → du isst, er isst; sprechen → du sprichst; geben → du gibst), e→ie (lesen → du liest, er liest; sehen → du siehst, er sieht) y a→ä (fahren → du fährst, er fährt; schlafen → du schläfst; tragen → du trägst). Fuera de esa vocal, las terminaciones son las normales del presente regular (-st, -t). No hay una regla que prediga qué verbos cambian: hay que aprenderlos junto con su forma "er", igual que se aprende el artículo con el sustantivo.',
      ejemplos: [
        { de: 'Ich esse Brot, aber er isst Reis.', es: 'Yo como pan, pero él come arroz.' },
        { de: 'Sprichst du Deutsch?', es: '¿Hablas alemán?' },
        { de: 'Er liest ein Buch, ich lese eine Zeitung.', es: 'Él lee un libro, yo leo un periódico.' },
        { de: 'Sie fährt nach Berlin, wir fahren nach München.', es: 'Ella viaja a Berlín, nosotros viajamos a Múnich.' }
      ],
      tip: 'El cambio vocálico solo aparece en du y er/sie/es. Si dudas, revisa la forma "ich": si es regular (ich esse, ich fahre), memoriza aparte la forma "er" del mismo verbo, que es la que más varía.'
    },
    {
      id: 'a1-12',
      titulo: 'Possessivartikel',
      subtitulo: 'mein, dein, sein, ihr, unser, euer, ihr/Ihr',
      regla_base: 'Los artículos posesivos (mein, dein, sein, ihr, unser, euer, ihr, Ihr) se declinan exactamente igual que ein/kein: mismas terminaciones según género y caso.',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'mein', 'meine', 'mein', 'meine'], ['Akk.', 'meinen', 'meine', 'mein', 'meine']] },
      excepciones: 'euer pierde la -e- de la raíz cuando lleva terminación: euer Vater, pero eure Mutter (no "euere").',
      explicacion: 'Los artículos posesivos indican a quién pertenece algo: mein (mi), dein (tu), sein (su, de él), ihr (su, de ella), unser (nuestro), euer (vuestro), ihr (su, de ellos) e Ihr (su, formal). Se declinan exactamente con el mismo patrón de terminaciones que "ein" y "kein": sin terminación en masculino y neutro nominativo, -e en femenino y plural, -en en masculino acusativo, etc. Al igual que "ein", no llevan terminación en nominativo/acusativo neutro y masculino singular, pero sí la añaden en los demás casos y géneros. "Euer" es una excepción ortográfica: al añadir una terminación pierde la segunda -e- (euer → eure, no "euere").',
      ejemplos: [
        { de: 'Das ist mein Vater.', es: 'Este es mi padre. (masc.)' },
        { de: 'Das ist meine Mutter.', es: 'Esta es mi madre. (fem.)' },
        { de: 'Das ist mein Kind.', es: 'Este es mi hijo/hija. (neutro)' },
        { de: 'Das sind unsere Kinder.', es: 'Estos son nuestros hijos. (plural)' }
      ],
      tip: 'Si ya sabes declinar "ein" y "kein", ya sabes declinar todos los posesivos: la terminación depende del género/caso del sustantivo que sigue, no de la persona que posee.'
    },
    {
      id: 'a1-13',
      titulo: 'Artikel interrogativ und demonstrativ',
      subtitulo: 'welcher? — dieser!',
      regla_base: 'welcher/welche/welches (¿cuál?) y dieser/diese/dieses (este/esta) se declinan igual que el artículo definido der/die/das (der-Wörter).',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'welcher / dieser', 'welche / diese', 'welches / dieses', 'welche / diese'], ['Akk.', 'welchen / diesen', 'welche / diese', 'welches / dieses', 'welche / diese']] },
      explicacion: '"Welcher/welche/welches" (¿cuál?, ¿qué...?) se usa para preguntar por una opción entre varias, y "dieser/diese/dieses" (este/esta/esto) para señalar algo específico. Ambos pertenecen al grupo de los llamados "der-Wörter": se declinan con exactamente las mismas terminaciones que el artículo definido der/die/das, tanto en género como en caso. Por eso, si dominas la declinación de der/die/das, welcher y dieser no presentan dificultad adicional: solo hay que sustituir la raíz (welch-, dies-) y mantener la misma terminación.',
      ejemplos: [
        { de: 'Welcher Mantel gefällt dir?', es: '¿Qué abrigo te gusta? (masc.)' },
        { de: 'Dieser Mantel ist schön.', es: 'Este abrigo es bonito. (masc.)' },
        { de: 'Welches Buch liest du?', es: '¿Qué libro lees? (neutro)' },
        { de: 'Dieses Buch ist sehr interessant.', es: 'Este libro es muy interesante. (neutro)' }
      ],
      tip: 'welcher y dieser copian exactamente las terminaciones de der/die/das. Aprende una sola tabla de declinación (la del artículo definido) y aplícala a los tres: der, welcher, dieser.'
    },
    {
      id: 'a1-14',
      titulo: 'Personalpronomen: Akkusativ und Dativ',
      subtitulo: 'mich, dir, ihn, ihr...',
      regla_base: 'Los pronombres personales cambian de forma en acusativo y dativo; deben aprenderse como un bloque junto al pronombre de nominativo.',
      tabla: { headers: ['Nominativ', 'Akkusativ', 'Dativ'], rows: [['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er', 'ihn', 'ihm'], ['sie (ella)', 'sie', 'ihr'], ['es', 'es', 'ihm'], ['wir', 'uns', 'uns'], ['ihr', 'euch', 'euch'], ['sie (ellos)', 'sie', 'ihnen'], ['Sie', 'Sie', 'Ihnen']] },
      excepciones: 'wir, ihr(objeto) y du(dat.) coinciden parcialmente con formas ya conocidas (uns/euch son iguales en acus. y dat.); es y er comparten la misma forma de dativo: ihm.',
      explicacion: 'Al igual que los artículos, los pronombres personales cambian de forma según el caso gramatical. En acusativo (objeto directo) y dativo (objeto indirecto) las formas son distintas del nominativo: ich → mich (acus.) / mir (dat.), du → dich / dir, er → ihn / ihm, sie (ella) → sie / ihr, es → es / ihm, wir → uns / uns, ihr → euch / euch, sie (ellos) → sie / ihnen, Sie → Sie / Ihnen. Estas formas no siguen un patrón derivable de la raíz, por lo que conviene memorizar la tabla completa como un bloque, igual que se hizo con sein/haben.',
      ejemplos: [
        { de: 'Ich sehe dich.', es: 'Te veo. (acusativo)' },
        { de: 'Er hilft mir.', es: 'Él me ayuda. (dativo)' },
        { de: 'Sie gibt es ihm.', es: 'Ella se lo da a él. (acus. + dat.)' },
        { de: 'Wir danken euch.', es: 'Os damos las gracias. (dativo)' }
      ],
      tip: 'Muchos verbos alemanes exigen dativo aunque en español se traduzcan con objeto directo (helfen = ayudar a alguien → dativo). Aprende el verbo junto con el caso que exige, no lo traduzcas mecánicamente.'
    },
    {
      id: 'a1-15',
      titulo: 'Temporale Präpositionen',
      subtitulo: 'im, am, um, von...bis, nach, vor',
      regla_base: 'Cada preposición temporal se usa con un tipo concreto de expresión de tiempo: im (meses/estaciones), am (días/fechas), um (hora exacta), von...bis (periodo), nach/vor (después/antes de).',
      tabla: { headers: ['Preposición', 'Uso', 'Ejemplo'], rows: [['im', 'meses y estaciones', 'im Januar, im Winter'], ['am', 'días y fechas', 'am Montag, am 3. Mai'], ['um', 'hora exacta', 'um 8 Uhr'], ['von...bis', 'periodo', 'von Montag bis Freitag'], ['nach', 'después de', 'nach der Arbeit'], ['vor', 'antes de', 'vor dem Essen']] },
      excepciones: 'im es la contracción de in + dem (dativo neutro): por eso se usa con meses y estaciones (neutros). am es la contracción de an + dem: por eso se usa con días (también neutros/masculinos en dativo).',
      explicacion: 'El alemán usa preposiciones distintas según el tipo de expresión temporal. "Im" (contracción de in dem) se usa con meses y estaciones del año: im Januar, im Winter. "Am" (contracción de an dem) se usa con días de la semana y fechas: am Montag, am 3. Mai. "Um" se usa para la hora exacta: um 8 Uhr. "Von...bis" expresa un periodo con inicio y fin: von Montag bis Freitag. "Nach" indica que algo ocurre después de un momento o evento, y "vor" que ocurre antes. Estas preposiciones son fijas y no se pueden intercambiar libremente; hay que aprenderlas asociadas al tipo de expresión temporal que acompañan.',
      ejemplos: [
        { de: 'Im Sommer fahre ich nach Spanien.', es: 'En verano viajo a España.' },
        { de: 'Am Montag habe ich Deutschkurs.', es: 'El lunes tengo clase de alemán.' },
        { de: 'Der Kurs beginnt um 9 Uhr.', es: 'El curso empieza a las 9.' },
        { de: 'Ich arbeite von Montag bis Freitag.', es: 'Trabajo de lunes a viernes.' }
      ],
      tip: 'Asocia cada preposición con su categoría: im = mes/estación, am = día/fecha, um = hora exacta. Si memorizas esta correspondencia como bloque, evitarás el error más común de mezclar im/am.'
    },
    {
      id: 'a1-16',
      titulo: 'Hauptsätze verbinden: Position 0',
      subtitulo: 'und, aber, oder, denn',
      regla_base: 'und (y), aber (pero), oder (o) y denn (porque/pues) unen dos frases principales sin ocupar una posición en la frase: van en "posición 0" y no cuentan para la regla V2, así que el verbo de la segunda frase sigue justo después de su sujeto.',
      tabla: { headers: ['Conjunción', 'Significado'], rows: [['und', 'y'], ['aber', 'pero'], ['oder', 'o'], ['denn', 'porque / pues']] },
      excepciones: 'No confundas denn (posición 0, orden normal) con weil (subordinante, verbo al final): "Ich bleibe zu Hause, denn ich bin krank" vs. "Ich bleibe zu Hause, weil ich krank bin".',
      explicacion: 'Und, aber, oder y denn son conjunciones coordinantes: unen dos frases principales de igual nivel sin alterar el orden de palabras de la segunda frase. A diferencia de conectores como "deshalb" (por eso), que sí ocupan la posición 1 y provocan la inversión sujeto-verbo, estas cuatro conjunciones van en la llamada "posición 0": no cuentan como un elemento de la frase, así que después de ellas el sujeto de la segunda frase aparece primero y el verbo sigue en su posición 2 normal. Esto las hace muy fáciles de usar: basta con escribir la conjunción y continuar la segunda frase con su orden habitual (sujeto + verbo + resto). "Denn" (porque/pues) introduce una causa, igual que "weil", pero sin mandar el verbo al final, a diferencia de "weil" que sí es subordinante.',
      ejemplos: [
        { de: 'Ich lerne Deutsch, und ich lerne Englisch.', es: 'Aprendo alemán, y aprendo inglés.' },
        { de: 'Er ist müde, aber er arbeitet weiter.', es: 'Está cansado, pero sigue trabajando.' },
        { de: 'Möchtest du Tee oder Kaffee?', es: '¿Quieres té o café?' },
        { de: 'Ich komme nicht, denn ich bin krank.', es: 'No vengo, porque estoy enfermo.' }
      ],
      tip: 'Después de und, aber, oder y denn el orden es siempre normal: sujeto + verbo. Si el verbo aparece al final, esa conjunción no era una de estas cuatro (probablemente era weil, dass o wenn, que sí son subordinantes).'
    },
    {
      id: 'a1-17',
      titulo: 'Komposita',
      subtitulo: 'Kinderarzt oder Arztkinder?',
      regla_base: 'Las palabras compuestas (Komposita) se forman uniendo dos o más palabras, normalmente sustantivos. El género y el número de toda la palabra los determina siempre la ÚLTIMA palabra (Grundwort), no la primera.',
      excepciones: 'A veces se inserta una letra de enlace (Fugenelement) entre las dos partes: -s- (Arbeitszeit) o -n- (Straßenname). No hay regla fija para saber cuándo aparece: se aprende con cada palabra.',
      explicacion: 'El alemán forma palabras nuevas uniendo dos o más sustantivos (o combinaciones de adjetivo+sustantivo, verbo+sustantivo) en una sola palabra compuesta, llamada Kompositum. La regla clave es que el género y el número de toda la palabra compuesta los determina siempre la última parte (el Grundwort o "palabra base"), no la primera (el Bestimmungswort o "palabra determinante"). Además, el orden de las partes cambia completamente el significado: "der Kinderarzt" (el pediatra, literalmente "médico de niños") es muy distinto de "die Arztkinder" (los hijos del médico). A veces, entre las dos partes se inserta una letra de enlace (Fugenelement) como -s- o -n- para facilitar la pronunciación, por ejemplo en "die Arbeitszeit" (Arbeit + s + Zeit) o "der Straßenname" (Straße + n + Name).',
      ejemplos: [
        { de: 'das Kinderzimmer', es: 'la habitación infantil (Kind + Zimmer, neutro por Zimmer)' },
        { de: 'die Hausaufgabe', es: 'la tarea (Haus + Aufgabe, femenino por Aufgabe)' },
        { de: 'der Fußball', es: 'el fútbol (Fuß + Ball, masculino por Ball)' },
        { de: 'der Kinderarzt / die Arztkinder', es: 'el pediatra / los hijos del médico (el orden cambia el significado)' }
      ],
      tip: 'Para saber el género de una palabra compuesta, mira solo la ÚLTIMA parte: das Zimmer → das Kinderzimmer. Ignora el género de la primera parte, aunque sea distinto.'
    },
    {
      id: 'a1-18',
      titulo: 'Zusammengesetzte Verben',
      subtitulo: 'verbos formados con sustantivo/adjetivo + verbo',
      regla_base: 'Además de los prefijos separables clásicos (an-, auf-, aus-...), hay verbos formados con un sustantivo o adjetivo + verbo (Rad fahren, fernsehen, spazieren gehen) que se comportan igual que los separables: la parte no verbal salta al final de la frase.',
      excepciones: 'Estos verbos se escriben en dos palabras en el infinitivo (Rad fahren, spazieren gehen) o en una sola (fernsehen), pero el comportamiento sintáctico —parte no verbal al final— es idéntico en ambos casos.',
      explicacion: 'Ya conoces los verbos con prefijo separable como "aufstehen" (an-, auf-, aus-...). Existe un grupo similar formado combinando un sustantivo o un adjetivo con un verbo, que se comporta exactamente igual: Rad fahren (montar en bici), spazieren gehen (ir de paseo), fernsehen (ver la tele), kennenlernen (conocer a alguien). En la frase principal, el verbo conjugado ocupa la posición 2 como siempre, y la parte no verbal (Rad, spazieren, fern, kennen) salta al final de la frase, formando el mismo "marco verbal" (Satzklammer) que los prefijos separables clásicos. En el Perfekt, el participio se forma como una sola palabra: ferngesehen, kennengelernt.',
      ejemplos: [
        { de: 'Ich fahre gern Rad.', es: 'Me gusta montar en bici.' },
        { de: 'Wir gehen jeden Abend spazieren.', es: 'Salimos a pasear cada noche.' },
        { de: 'Sie sieht viel fern.', es: 'Ella ve mucho la tele.' },
        { de: 'Ich habe ihn letztes Jahr kennengelernt.', es: 'Lo conocí el año pasado.' }
      ],
      tip: 'Pregúntate: ¿el verbo va acompañado de un sustantivo o adjetivo "pegado" a su significado (Rad, fern, spazieren, kennen)? Si es así, esa parte casi siempre salta al final de la frase, igual que un prefijo separable.'
    },
    {
      id: 'a1-19',
      titulo: 'Genusregeln',
      subtitulo: 'patrones para adivinar der/die/das',
      regla_base: 'El género gramatical debe aprenderse con cada palabra, pero hay patrones fiables por terminación o categoría semántica que ayudan a predecirlo en la mayoría de los casos.',
      tabla: { headers: ['Género', 'Patrón', 'Ejemplo'], rows: [['der', 'días, meses, estaciones', 'der Montag, der Mai, der Sommer'], ['der', 'agentes en -er', 'der Lehrer'], ['der', 'terminados en -ismus', 'der Tourismus'], ['die', 'terminados en -e', 'die Blume'], ['die', '-ung, -heit, -keit, -schaft', 'die Zeitung, die Freiheit'], ['die', '-tion, -ie', 'die Nation, die Familie'], ['das', 'diminutivos -chen/-lein', 'das Mädchen'], ['das', 'infinitivos sustantivados', 'das Essen'], ['das', 'letras y colores', 'das Rot']] },
      excepciones: 'Hay excepciones frecuentes: "der Junge" (el chico) termina en -e pero es masculino. Los patrones son una guía útil, no una regla absoluta; ante la duda, aprende el artículo con cada palabra.',
      explicacion: 'Aunque en principio el género de cada sustantivo debe memorizarse individualmente, existen patrones de terminación bastante fiables que ayudan a adivinarlo. Son masculinos (der) los días de la semana, los meses y las estaciones del año (der Montag, der Mai, der Sommer), los agentes terminados en -er (der Lehrer) y las palabras en -ismus. Son femeninos (die) la mayoría de las palabras terminadas en -e (die Blume, con excepciones como "der Junge"), y casi todas las terminadas en -ung, -heit, -keit, -schaft, -tion o -ie. Son neutros (das) todos los diminutivos terminados en -chen o -lein, sin excepción (das Mädchen), los infinitivos usados como sustantivo (das Essen, del verbo essen) y las letras, colores e idiomas usados como sustantivo (das Rot, das Deutsch).',
      ejemplos: [
        { de: 'der Donnerstag, der Winter', es: 'el jueves, el invierno (día/estación → der)' },
        { de: 'die Wohnung, die Freundschaft', es: 'el piso, la amistad (-ung/-schaft → die)' },
        { de: 'das Brötchen', es: 'el panecillo (-chen → das, siempre)' },
        { de: 'das Lesen ist wichtig', es: 'leer es importante (infinitivo sustantivado → das)' }
      ],
      tip: 'Los sufijos -chen y -lein son la regla más fiable de todas: SIEMPRE neutro, sin ninguna excepción (das Mädchen, das Brötchen). Apóyate en ella cuando dudes de un diminutivo.'
    },
    {
      id: 'a1-20',
      titulo: 'Verbos separables',
      subtitulo: 'prefijo al final en frase principal',
      regla_base: 'En frases principales el prefijo salta al final (marco verbal). En subordinadas, infinitivo y Partizip II permanece unido al verbo.',
      tabla: { headers: ['Contexto', 'Posición del prefijo', 'Ejemplo (anrufen)'], rows: [['Frase principal', 'Al final', 'Ich rufe dich an.'], ['Subordinada', 'Unido al verbo (final)', '…weil ich dich anrufe.'], ['Infinitivo', 'Unido', '…dich anzurufen'], ['Partizip II', 'ge- insertado', 'angerufen']] },
      excepciones: 'En Partizip II el ge- se inserta entre el prefijo y la raíz: an-ge-rufen, aus-ge-gangen. Los prefijos inseparables (be-, ver-, er-…) son átonos y nunca se separan.',
      explicacion: 'Muchos verbos alemanes tienen un prefijo separable (auf-, an-, ein-, aus-, mit-, zurück-, vor-, ab-…) que aporta significado adicional al verbo base. En una frase principal en presente o imperativo, el prefijo se separa y salta al final de la oración, creando el típico "marco verbal" (Satzklammer). En infinitivo, subordinada y Partizip II van unidos. Los prefijos separables son siempre tónicos (se acentúan) al pronunciarlos, lo que ayuda a distinguirlos de los inseparables (be-, ver-, er-, ge-, zer-, mis-…) que son átonos y nunca se separan.',
      ejemplos: [
        { de: 'Ich rufe dich an.', es: 'Te llamo. (an|rufen)' },
        { de: 'Der Laden macht um 9 auf.', es: 'La tienda abre a las 9. (auf|machen)' },
        { de: 'Wir steigen am Bahnhof aus.', es: 'Bajamos en la estación. (aus|steigen)' },
        { de: 'Er hat das Licht ausgemacht.', es: 'Apagó la luz. (P.II: aus+ge+macht)' }
      ],
      tip: 'En Partizip II el "ge-" se inserta entre el prefijo y la raíz: aus-ge-macht, ein-ge-kauft, an-ge-rufen. Si ves una forma larga con "ge-" en el medio, es un verbo separable en Perfekt.'
    },
    {
      id: 'a1-21',
      titulo: 'Imperativo',
      subtitulo: 'formas du / ihr / Sie',
      regla_base: 'du: raíz sola (sin -e ni pronombre) · ihr: raíz + -t · Sie: infinitivo + Sie pospuesto.',
      tabla: { headers: ['Forma', 'Estructura', 'kommen', 'lesen (e→ie)'], rows: [['du', 'raíz', 'Komm!', 'Lies!'], ['ihr', 'raíz + -t', 'Kommt!', 'Lest!'], ['Sie', 'inf. + Sie', 'Kommen Sie!', 'Lesen Sie!']] },
      excepciones: 'El cambio e→i/ie en presente (du) se mantiene en el imperativo: lesen → Lies!, sprechen → Sprich!. El cambio a→ä NO se mantiene: fahren → Fahr! (no *Fähr!).',
      explicacion: 'El imperativo alemán tiene tres formas según el interlocutor. Para "du" (informal singular): raíz del verbo sin terminación ni pronombre — "Komm!", "Lern!". Para "ihr" (informal plural): raíz + -t, sin pronombre — "Kommt!", "Lernt!". Para "Sie" (formal): infinitivo + Sie después del verbo — "Kommen Sie!", "Lernen Sie!". Los verbos irregulares con cambio vocálico en "du" presente (e→i/ie: lesen→liest, sprechen→spricht) mantienen ese cambio en el imperativo: "Lies!", "Sprich!". Los verbos con cambio a→ä (fahren→fährst) NO lo mantienen: "Fahr!".',
      ejemplos: [
        { de: 'Komm her! (du)', es: '¡Ven aquí!' },
        { de: 'Kommt her! (ihr)', es: '¡Venid aquí!' },
        { de: 'Kommen Sie herein! (Sie)', es: '¡Entre usted!' },
        { de: 'Lies das Buch! (du — lesen → lies)', es: '¡Lee el libro!' }
      ],
      tip: 'Forma "du" de verbos irregulares: si en presente "du" tiene e→i o e→ie, el imperativo lo mantiene. Si solo tiene a→ä, el imperativo vuelve a la "a" original. "Sei ruhig!" y "Hab Geduld!" son las formas irregulares de sein y haben.'
    }
];
