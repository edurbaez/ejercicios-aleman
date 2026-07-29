window.TEACHER_CLASES = window.TEACHER_CLASES || {};

(function () {
  var RULES = {
    'a1-01': {
      intro: 'En español solo hay dos géneros (el/la), pero en alemán hay tres: der (masculino), die (femenino) y das (neutro) — y el género no siempre sigue la biología: "das Mädchen" (la chica) es neutro. Desde el primer día conviene insistir en que el artículo se aprende PEGADO al sustantivo, nunca la palabra sola, porque de este artículo dependerá después toda la declinación (acusativo, dativo…). En plural, alemán regala una simplificación: los tres géneros colapsan en uno solo, die, sin excepción.',
      practica: [
        { incorrecto: 'Der Mädchen spielt im Garten.', correcto: 'Das Mädchen spielt im Garten.' },
        { incorrecto: 'Ich habe der Auto.', correcto: 'Ich habe das Auto.' },
        { incorrecto: 'Die Tisch ist neu.', correcto: 'Der Tisch ist neu.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tres géneros, no dos', texto: 'A diferencia del español (el/la), alemán distingue der/die/das. No hay forma de adivinarlo por lógica: hay que memorizarlo con cada palabra nueva, como si el artículo fuera parte del propio sustantivo.' },
        { titulo: '🟩 2. El género no sigue la biología ni el español', texto: '"das Mädchen" es neutro aunque se refiera a una chica; "der Tisch" (la mesa) es masculino aunque en español sea femenino. Nunca traduzcas el género desde el español — es la trampa más frecuente en A1.' },
        { titulo: '🟧 3. Patrones que ayudan (no son regla absoluta)', texto: 'Terminaciones en -ung/-heit/-keit/-schaft → casi siempre die. Terminaciones en -chen/-lein → siempre das. Infinitivos usados como sustantivo (das Essen, das Lernen) → siempre das.' },
        { titulo: '🟨 4. Plural: siempre die', texto: 'Es la única simplificación real: en plural desaparece la distinción de género, todos los sustantivos usan "die" (die Männer, die Frauen, die Kinder).' },
        { titulo: '🟪 5. Truco de estudio', texto: 'Recomienda fichas de vocabulario coloreadas por género (azul=der, rojo=die, verde=das). El cerebro asocia color+palabra más rápido que memorizar la lista suelta, y evita el reflejo de traducir el género del español.' }
      ],
      resumen: 'Cada sustantivo lleva un género fijo (der/die/das) que no se traduce del español y debe aprenderse junto a la palabra. En plural todos usan "die". Los patrones de terminación (-chen/-lein→das, -ung/-heit→die) ayudan, pero no sustituyen la memorización.'
    },
    'a1-02': {
      intro: 'En español el pronombre sujeto suele omitirse ("estoy cansado" ya deja claro quién habla), pero en alemán es obligatorio: "Ich bin müde", nunca solo "Bin müde". Además, alemán marca la formalidad con du/Sie de forma mucho más estricta que el tú/usted español: "Sie" formal siempre lleva el verbo conjugado como si fuera "ellos", y se escribe con mayúscula en medio de la frase para no confundirse con "sie" (ella/ellos).',
      practica: [
        { incorrecto: 'Bin Student.', correcto: 'Ich bin Student.' },
        { incorrecto: 'Du sind mein Chef.', correcto: 'Sie sind mein Chef.' },
        { incorrecto: 'Ich sehe Sie oft.', correcto: 'Ich sehe sie oft.' }
      ],
      pasos: [
        { titulo: '🟦 1. El pronombre nunca se omite', texto: 'A diferencia del español, donde la conjugación ya indica quién habla, en alemán el pronombre sujeto es obligatorio en toda frase: "Ich bin müde", no "Bin müde".' },
        { titulo: '🟩 2. Tabla completa', texto: 'Conviene presentarla entera desde el primer día, singular y plural juntos.', tabla: { headers: ['Singular', '', 'Plural', ''], rows: [['ich', 'yo', 'wir', 'nosotros'], ['du', 'tú', 'ihr', 'vosotros'], ['er/sie/es', 'él/ella/ello', 'sie / Sie', 'ellos / usted']] } },
        { titulo: '🟧 3. du vs. Sie: más estricto que tú/usted', texto: 'Con desconocidos adultos siempre "Sie"; con amigos, familia y niños, "du". A diferencia del español, mezclar registro suena mucho más incorrecto en alemán que en español.' },
        { titulo: '🟨 4. La mayúscula como señal', texto: '"Sie" con mayúscula en medio de la frase es siempre tratamiento formal. "sie" en minúscula puede ser "ella" o "ellos" — solo el contexto y la conjugación del verbo lo aclaran.' }
      ],
      resumen: 'El pronombre sujeto es obligatorio en alemán, a diferencia del español. "Sie" (mayúscula) es el tratamiento formal y lleva verbo en forma de plural; "sie" (minúscula) es ella o ellos, según contexto.'
    },
    'a1-03': {
      intro: '"Sein" (ser/estar) y "haben" (tener) son los dos verbos más importantes del alemán y ambos son completamente irregulares — hay que memorizar su conjugación entera antes de avanzar, porque además de su significado propio serán los auxiliares del Perfekt más adelante. Ojo con los calcos del español: "tener hambre/miedo/razón" se dice con haben en alemán, no con sein, aunque en español usemos "tener".',
      practica: [
        { incorrecto: 'Ich bin Hunger.', correcto: 'Ich habe Hunger.' },
        { incorrecto: 'Er hat müde.', correcto: 'Er ist müde.' },
        { incorrecto: 'Wir sind zwei Kinder.', correcto: 'Wir haben zwei Kinder.' }
      ],
      pasos: [
        { titulo: '🟦 1. Sein cubre ser Y estar', texto: 'El español distingue ser/estar; alemán no — "sein" cubre ambos usos según contexto ("ich bin müde" = estoy cansado, "ich bin Lehrer" = soy profesor).' },
        { titulo: '🟩 2. Tabla de conjugación', texto: 'Ambos verbos son irregulares y se memorizan enteros, sin atajos.', tabla: { headers: ['', 'sein', 'haben'], rows: [['ich', 'bin', 'habe'], ['du', 'bist', 'hast'], ['er/sie/es', 'ist', 'hat'], ['wir', 'sind', 'haben'], ['ihr', 'seid', 'habt'], ['sie/Sie', 'sind', 'haben']] } },
        { titulo: '🟧 3. Expresiones fijas con haben', texto: 'Hunger haben, Durst haben, Angst haben, Recht haben — en español decimos "tener hambre/sed/miedo/razón" con tener, coincide con haben, pero el riesgo es usar "sein" por calco de "estoy con hambre". Memorizar como bloque: haben + sustantivo.' },
        { titulo: '🟨 4. Preview: futuros auxiliares', texto: 'Adelanta que estos dos verbos volverán a aparecer más adelante como auxiliares de tiempos compuestos — cuanto mejor se automaticen ahora, más fácil será entonces.' }
      ],
      resumen: 'Sein=ser/estar (sin distinción); haben=tener. Ambos completamente irregulares, se memorizan enteros. Expresiones como Hunger/Angst/Recht haben van siempre con haben, no con sein, aunque el español sugiera "estar".'
    },
    'a1-04': {
      intro: 'Los verbos regulares alemanes siguen un patrón muy mecánico: se quita "-en" del infinitivo y se añaden terminaciones fijas según el pronombre — mucho más regular que el español, donde conviven tres conjugaciones (-ar/-er/-ir) con muchas irregularidades. La única complicación son dos ajustes fonéticos: raíces en -t/-d insertan una -e-, y raíces en -s/-ß/-z simplifican la terminación de "du".',
      practica: [
        { incorrecto: 'Ich lerne Deutsch, du lerne auch.', correcto: 'Ich lerne Deutsch, du lernst auch.' },
        { incorrecto: 'Er arbeit viel.', correcto: 'Er arbeitet viel.' },
        { incorrecto: 'Du reisst nach Berlin.', correcto: 'Du reist nach Berlin.' }
      ],
      pasos: [
        { titulo: '🟦 1. Quitar -en, añadir terminación', texto: 'lernen → lern- + terminación según el pronombre. Es mecánico: no hay conjugaciones distintas como en español (-ar/-er/-ir), una sola tabla sirve para casi todos los verbos.' },
        { titulo: '🟩 2. Tabla de terminaciones', texto: '', tabla: { headers: ['Pronombre', 'Terminación', 'lernen'], rows: [['ich', '-e', 'lerne'], ['du', '-st', 'lernst'], ['er/sie/es', '-t', 'lernt'], ['wir', '-en', 'lernen'], ['ihr', '-t', 'lernt'], ['sie/Sie', '-en', 'lernen']] } },
        { titulo: '🟧 3. Ajuste con raíz en -t/-d', texto: 'arbeiten, reden: se inserta una -e- antes de -st y -t para poder pronunciarlo: du arbeitest, er arbeitet (no "arbeitst"/"arbeitt").' },
        { titulo: '🟨 4. Ajuste con raíz en -s/-ß/-z', texto: 'reisen, heißen: la forma "du" no dobla la -s, solo añade -t: du reist (no "du reisst").' },
        { titulo: '🟪 5. Truco de memorización', texto: 'Las dos formas más usadas en clase son "ich" (siempre -e) y "er/sie/es" (siempre -t) — automatízalas primero, el resto se aprende casi solo por repetición.' }
      ],
      resumen: 'Raíz del infinitivo + terminación (-e/-st/-t/-en/-t/-en). Si la raíz termina en -t/-d se inserta -e- (arbeitet); si termina en -s/-ß/-z, "du" solo añade -t (reist). Mucho más regular que el español.'
    },
    'a1-05': {
      intro: 'En español "no" niega casi todo por igual, pero alemán obliga a elegir entre dos negaciones según lo que se niegue: "nicht" para verbos, adjetivos y sustantivos con artículo definido/posesivo; "kein" para sustantivos que llevarían "ein" o que van sin artículo. Es una distinción que el español no tiene y que hay que automatizar desde el principio para no calcar "no" con "nicht" siempre.',
      practica: [
        { incorrecto: 'Ich habe nicht Auto.', correcto: 'Ich habe kein Auto.' },
        { incorrecto: 'Das ist kein gut.', correcto: 'Das ist nicht gut.' },
        { incorrecto: 'Er trinkt nicht Kaffee.', correcto: 'Er trinkt keinen Kaffee.' }
      ],
      pasos: [
        { titulo: '🟦 1. La pregunta rápida del profesor', texto: '¿En positivo pondrías "un/una" o nada delante del sustantivo? → usa "kein". ¿Niegas un verbo, un adjetivo o un sustantivo con "el/la"? → usa "nicht".' },
        { titulo: '🟩 2. Kein se declina como ein', texto: 'kein/keine/kein en nominativo, keinen en masculino acusativo — exactamente la misma tabla que "ein" (regla siguiente), solo se añade la "k-" inicial.' },
        { titulo: '🟧 3. Posición de nicht', texto: 'Normalmente al final de la frase, o justo antes del elemento que se quiere negar con más énfasis (un adjetivo, un adverbio, una preposición): "Das ist nicht gut", "Ich komme nicht heute".' },
        { titulo: '🟨 4. Error típico a vigilar', texto: 'Usar "nicht" delante de un sustantivo sin artículo (como en el ejemplo de práctica "nicht Kaffee") — ahí siempre corresponde "kein/keinen".' }
      ],
      resumen: '"Nicht" niega verbos, adjetivos y sustantivos con artículo definido/posesivo. "Kein" niega sustantivos que llevarían "ein" o van sin artículo, y se declina igual que "ein". El español no distingue esto: hay que automatizarlo con práctica.'
    },
    'a1-06': {
      intro: 'En español ningún artículo cambia según la función en la frase, pero en alemán el objeto directo (acusativo) provoca un cambio visible: solo el artículo masculino, der→den y ein→einen; femenino, neutro y plural quedan idénticos al nominativo. Es la primera vez que el alumno ve "declinación" real, así que conviene presentarlo como un cambio pequeño y localizado, no como una regla que afecta a todo.',
      practica: [
        { incorrecto: 'Ich sehe der Mann.', correcto: 'Ich sehe den Mann.' },
        { incorrecto: 'Ich kaufe ein Apfel.', correcto: 'Ich kaufe einen Apfel.' },
        { incorrecto: 'Er hat er gern.', correcto: 'Er hat ihn gern.' }
      ],
      pasos: [
        { titulo: '🟦 1. Solo el masculino cambia', texto: 'Es la buena noticia de esta regla: femenino, neutro y plural son idénticos en nominativo y acusativo. Solo hay que aprender un cambio, no cuatro.' },
        { titulo: '🟩 2. Tabla nominativo vs. acusativo', texto: '', tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nominativo', 'der / ein', 'die / eine', 'das / ein', 'die / —'], ['Acusativo', 'den / einen', 'die / eine', 'das / ein', 'die / —']] } },
        { titulo: '🟧 3. El pronombre también cambia', texto: '"er" (nominativo) se convierte en "ihn" (acusativo) cuando es objeto directo — el mismo tipo de cambio que el artículo masculino, y muy fácil de olvidar porque "sie" y "es" no cambian.' },
        { titulo: '🟨 4. Truco visual', texto: '"den" es la señal inequívoca de acusativo masculino: si ves "den" delante de un sustantivo, ese sustantivo es el objeto directo de la frase.' }
      ],
      resumen: 'En acusativo solo cambia el artículo masculino (der→den, ein→einen) y el pronombre er→ihn. Femenino, neutro y plural quedan igual que en nominativo — el contexto determina el caso en esos casos.'
    },
    'a1-07': {
      intro: 'Las palabras interrogativas alemanas se parecen bastante a las españolas en significado (wer=quién, was=qué, wann=cuándo), pero alemán distingue tres matices que el español mezcla bajo "dónde": wo (posición, "¿dónde estás?"), wohin (dirección, "¿adónde vas?") y woher (origen, "¿de dónde vienes?"). Es la trampa más frecuente de esta regla para hispanohablantes.',
      practica: [
        { incorrecto: 'Wo gehst du?', correcto: 'Wohin gehst du?' },
        { incorrecto: 'Woher wohnst du?', correcto: 'Wo wohnst du?' },
        { incorrecto: 'Wohin kommst du?', correcto: 'Woher kommst du?' }
      ],
      pasos: [
        { titulo: '🟦 1. Estructura básica', texto: '[W-Wort] + [verbo] + [sujeto] + [resto] — la palabra interrogativa siempre abre la frase, seguida directamente del verbo conjugado (regla V2, se retomará en a1-08).' },
        { titulo: '🟩 2. Tabla de W-Wörter', texto: '', tabla: { headers: ['Pregunta', 'Significado'], rows: [['wer', 'quién'], ['was', 'qué'], ['wo', 'dónde (posición)'], ['wohin', 'adónde (dirección)'], ['woher', 'de dónde'], ['wann', 'cuándo'], ['wie', 'cómo'], ['warum', 'por qué'], ['wie viel/viele', 'cuánto/cuántos']] } },
        { titulo: '🟧 3. wo / wohin / woher: la distinción que el español no marca', texto: '"¿Dónde vas?" en español cubre posición y dirección; en alemán "wo" es solo posición estática, "wohin" es movimiento hacia un lugar, "woher" es origen. Practicar los tres juntos con gestos (aquí / hacia allí / desde allí) ayuda a fijarlo.' },
        { titulo: '🟨 4. wer se declina', texto: 'wer (nominativo) → wen (acusativo) → wem (dativo) → wessen (genitivo) — sigue el mismo patrón que el artículo definido masculino, adelanto útil para cuando lleguen a acusativo/dativo.' }
      ],
      resumen: 'Estructura: [W-Wort]+[verbo]+[sujeto]+[resto]. La distinción clave para hispanohablantes es wo (posición) / wohin (dirección) / woher (origen), que el español no separa. "Wer" se declina como el artículo masculino.'
    },
    'a1-08': {
      intro: 'La regla más importante del alemán, y la que más contrasta con el español: el verbo conjugado ocupa SIEMPRE la segunda posición de la frase (V2), sin importar qué elemento vaya primero. En español el orden es mucho más libre y el verbo no tiene una posición fija; en alemán, si algo distinto al sujeto abre la frase, el sujeto y el verbo se invierten para que el verbo se mantenga en su sitio.',
      practica: [
        { incorrecto: 'Heute ich gehe ins Kino.', correcto: 'Heute gehe ich ins Kino.' },
        { incorrecto: 'Morgen ich kann nicht kommen.', correcto: 'Morgen kann ich nicht kommen.' },
        { incorrecto: 'Jeden Tag ich lerne Deutsch.', correcto: 'Jeden Tag lerne ich Deutsch.' }
      ],
      pasos: [
        { titulo: '🟦 1. El verbo es el ancla fija', texto: 'Visualiza la frase como dos bloques: [posición 1 — cualquier elemento] + [VERBO — siempre aquí] + [resto]. No importa qué vaya en la posición 1, el verbo no se mueve de la 2.' },
        { titulo: '🟩 2. Inversión sujeto-verbo', texto: 'Si el sujeto no abre la frase (por ejemplo, un elemento temporal como "heute" o "morgen"), el sujeto salta después del verbo: "Morgen kann ich nicht kommen", no "Morgen ich kann".' },
        { titulo: '🟧 3. Contraste con el español', texto: 'En español "Hoy voy al cine" y "Voy al cine hoy" son ambas correctas sin tocar el verbo. En alemán, cambiar el orden de los elementos SIEMPRE obliga a reajustar la posición del verbo respecto al sujeto.' },
        { titulo: '🟨 4. Preview: subordinadas', texto: 'Adelanta brevemente que esta regla solo aplica a frases principales — en subordinadas (weil, dass, wenn…) el verbo se va al final, algo que verán más adelante.' }
      ],
      resumen: 'El verbo conjugado va siempre en 2ª posición en frases principales. Si algo distinto al sujeto abre la frase, sujeto y verbo se invierten. Es la diferencia estructural más grande frente al orden libre del español.'
    },
    'a1-09': {
      intro: 'En español el plural es casi siempre simple: añadir -s o -es. En alemán no existe una regla única — cada sustantivo tiene su propio plural, y hay que aprenderlo junto con el artículo desde el primer día (los diccionarios lo indican así: "der Tag, -e"). Hay cinco patrones principales que ayudan a organizar el aprendizaje, aunque no sustituyen la memorización palabra por palabra.',
      practica: [
        { incorrecto: 'Ich habe drei Kinds.', correcto: 'Ich habe drei Kinder.' },
        { incorrecto: 'die Fraus', correcto: 'die Frauen' },
        { incorrecto: 'die Manns', correcto: 'die Männer' }
      ],
      pasos: [
        { titulo: '🟦 1. No hay una sola regla', texto: 'A diferencia del español (-s/-es prácticamente siempre), el plural alemán depende de cada palabra. Hay que aprenderlo como parte del vocabulario, no derivarlo.' },
        { titulo: '🟩 2. Los 5 patrones principales', texto: '', tabla: { headers: ['Patrón', 'Ejemplo'], rows: [['Sin cambio / umlaut', 'der Lehrer → die Lehrer · die Mutter → die Mütter'], ['+e / umlaut+e', 'der Tag → die Tage · die Hand → die Hände'], ['+er / umlaut+er', 'das Kind → die Kinder · das Haus → die Häuser'], ['+en / -n', 'die Frau → die Frauen · die Blume → die Blumen'], ['+s (extranjerismos)', 'das Auto → die Autos · das Hotel → die Hotels']] } },
        { titulo: '🟧 3. Dativo plural añade -n', texto: 'Detalle que aparecerá más adelante con el dativo: si el plural no termina ya en -n o -s, se añade una -n extra (den Kindern, den Männern).' },
        { titulo: '🟨 4. Truco de estudio', texto: 'Aprende siempre artículo + singular + plural juntos, como aparece en el diccionario: "der Tag, -e". Intentar deducir el plural después es mucho más difícil que memorizarlo desde el principio.' }
      ],
      resumen: 'No existe una regla única de plural en alemán: 5 patrones frecuentes (sin cambio, +e, +er, +en/-n, +s) pero cada palabra se aprende con su propio plural, junto al artículo. En dativo plural se añade -n si aún no termina en -n/-s.'
    },
    'a1-10': {
      intro: 'El artículo indefinido "ein/eine/ein" equivale al español "un/una", y su negación "kein/keine/kein" al español "ningún/ninguna" — pero con una diferencia importante: "ein" no tiene plural (en positivo simplemente se omite el artículo), mientras que "kein" sí tiene forma plural, "keine". "Kein" se declina exactamente igual que "ein", así que dominar uno es dominar el otro.',
      practica: [
        { incorrecto: 'Ich habe einen Kinder.', correcto: 'Ich habe Kinder.' },
        { incorrecto: 'Das ist keine Hund.', correcto: 'Das ist kein Hund.' },
        { incorrecto: 'Ich kaufe eine Auto.', correcto: 'Ich kaufe ein Auto.' }
      ],
      pasos: [
        { titulo: '🟦 1. ein/eine/ein según género', texto: 'ein para masculino y neutro, eine para femenino — igual de sencillo que "un/una" en español, pero recuerda que el género de cada palabra puede no coincidir con el español (regla a1-19).' },
        { titulo: '🟩 2. Tabla ein/kein', texto: '', tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'ein / kein', 'eine / keine', 'ein / kein', '— / keine'], ['Akk.', 'einen / keinen', 'eine / keine', 'ein / kein', '— / keine']] } },
        { titulo: '🟧 3. ein no tiene plural, kein sí', texto: 'En positivo, plural sin artículo: "Ich habe Bücher". En negativo, siempre "keine": "Ich habe keine Bücher". Es un contraste que no existe igual en español (donde "unos libros" / "ningunos libros" serían más raros).' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Si ya sabes declinar "ein", ya sabes declinar "kein": añade simplemente la "k-" al inicio, la terminación es idéntica en cada caso y género.' }
      ],
      resumen: '"ein/eine/ein" = un/una, se niega con "kein/keine/kein" (misma declinación + "k-"). Diferencia clave: "ein" no tiene plural (se omite en positivo), pero "keine" sí existe para negar sustantivos en plural.'
    },
    'a1-11': {
      intro: 'El español también tiene verbos con cambio vocálico en presente (poder→puedo, pedir→pido), así que el concepto no es nuevo para el alumno — pero en alemán el cambio solo afecta a "du" y "er/sie/es", nunca a ich/wir/ihr/sie, mientras que en español el cambio afecta a todas las personas salvo nosotros/vosotros. Aprovecha ese paralelismo para explicar la idea, pero marca bien la diferencia de qué personas cambian.',
      practica: [
        { incorrecto: 'Du esst gern Pizza.', correcto: 'Du isst gern Pizza.' },
        { incorrecto: 'Er sprecht Deutsch.', correcto: 'Er spricht Deutsch.' },
        { incorrecto: 'Du fahrst nach Berlin.', correcto: 'Du fährst nach Berlin.' }
      ],
      pasos: [
        { titulo: '🟦 1. Paralelismo con el español', texto: 'Igual que "poder"→"puedo" cambia la vocal solo en algunas personas, alemán también tiene verbos así — pero aquí el cambio ocurre SOLO en du y er/sie/es, nunca en ich, wir, ihr, sie/Sie.' },
        { titulo: '🟩 2. Los tres patrones', texto: '', tabla: { headers: ['Patrón', 'Infinitiv', 'du', 'er/sie/es'], rows: [['e → i', 'essen', 'isst', 'isst'], ['e → i', 'sprechen', 'sprichst', 'spricht'], ['e → ie', 'lesen', 'liest', 'liest'], ['a → ä', 'fahren', 'fährst', 'fährt']] } },
        { titulo: '🟧 3. No hay regla que prediga cuáles cambian', texto: 'Se aprenden verbo por verbo, junto con su forma "er" (la que más varía) — igual que se aprende el artículo con el sustantivo.' },
        { titulo: '🟨 4. Truco de repaso', texto: 'Si la forma "ich" es totalmente regular (ich esse, ich fahre), revisa siempre aparte la forma "er" del mismo verbo: es la que concentra la irregularidad.' }
      ],
      resumen: 'Un grupo de verbos cambia la vocal SOLO en du/er-sie-es (e→i, e→ie, a→ä) — igual concepto que en español, pero afecta a menos personas. Se memoriza verbo por verbo junto con su forma "er".'
    },
    'a1-12': {
      intro: 'Los posesivos alemanes (mein, dein, sein, ihr, unser, euer, ihr/Ihr) equivalen a mi/tu/su del español, pero se declinan exactamente como "ein" y "kein" — mismas terminaciones según género y caso del sustantivo que acompañan, no según quién posee. Es un ahorro de esfuerzo: si el alumno ya domina la tabla de "ein", los posesivos casi vienen gratis.',
      practica: [
        { incorrecto: 'Das ist mein Mutter.', correcto: 'Das ist meine Mutter.' },
        { incorrecto: 'Ich liebe meine Vater.', correcto: 'Ich liebe meinen Vater.' },
        { incorrecto: 'Das sind meine Kind.', correcto: 'Das ist mein Kind.' }
      ],
      pasos: [
        { titulo: '🟦 1. Misma declinación que ein/kein', texto: 'mein/meine/mein en nominativo, meinen en masculino acusativo — exactamente el patrón ya visto, solo cambia la raíz (mein-, dein-, sein-…).' },
        { titulo: '🟩 2. Tabla base', texto: '', tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'mein', 'meine', 'mein', 'meine'], ['Akk.', 'meinen', 'meine', 'mein', 'meine']] } },
        { titulo: '🟧 3. La terminación depende del sustantivo, no del dueño', texto: 'Error típico: pensar que "mi madre" lleva la misma terminación que "mi padre" porque ambos son "mi". En realidad depende del género de "Mutter" (fem.) vs. "Vater" (masc.), no de quién posee.' },
        { titulo: '🟨 4. Excepción ortográfica: euer', texto: '"euer" pierde la segunda -e- al llevar terminación: euer Vater, pero eure Mutter (no "euere"). Es la única irregularidad de todo el bloque.' }
      ],
      resumen: 'Los posesivos (mein, dein, sein, ihr, unser, euer, ihr/Ihr) se declinan exactamente como "ein"/"kein": la terminación depende del género y caso del sustantivo poseído, no de la persona que posee. Excepción: euer→eure.'
    },
    'a1-13': {
      intro: 'En español "cuál" y "este/esta" no cambian de forma según lo que acompañan, pero en alemán "welcher/welche/welches" (¿cuál?) y "dieser/diese/dieses" (este/esta) se declinan exactamente igual que el artículo definido der/die/das. Si el alumno ya domina esa tabla, welcher y dieser no añaden dificultad real: solo cambia la raíz.',
      practica: [
        { incorrecto: 'Welche Mantel gefällt dir?', correcto: 'Welcher Mantel gefällt dir?' },
        { incorrecto: 'Dieses Frau ist nett.', correcto: 'Diese Frau ist nett.' },
        { incorrecto: 'Welcher Auto kaufst du?', correcto: 'Welches Auto kaufst du?' }
      ],
      pasos: [
        { titulo: '🟦 1. Son "der-Wörter"', texto: 'welcher y dieser pertenecen al mismo grupo que der/die/das: copian sus terminaciones exactas, tanto en género como en caso.' },
        { titulo: '🟩 2. Tabla comparativa', texto: '', tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'welcher / dieser', 'welche / diese', 'welches / dieses', 'welche / diese'], ['Akk.', 'welchen / diesen', 'welche / diese', 'welches / dieses', 'welche / diese']] } },
        { titulo: '🟧 3. Una sola tabla para tres palabras', texto: 'Si el alumno confunde una terminación de welcher, pídele que la compare directamente con der/die/das — es exactamente la misma.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'No hace falta aprender tres tablas distintas: aprende una (la del artículo definido) y aplícala a las tres palabras (der, welcher, dieser) cambiando solo la raíz.' }
      ],
      resumen: 'welcher (¿cuál?) y dieser (este/esta) se declinan exactamente como der/die/das — mismas terminaciones, solo cambia la raíz. Dominar el artículo definido es dominar automáticamente estas dos palabras.'
    },
    'a1-14': {
      intro: 'El español distingue me/te/lo-la/le entre objeto directo e indirecto, pero de forma menos marcada que el alemán, que tiene una tabla completa de pronombres en acusativo (mich, dich, ihn…) y dativo (mir, dir, ihm…). El punto más delicado es que algunos verbos alemanes exigen dativo aunque en español se traduzcan con objeto directo, como "helfen" (ayudar a alguien).',
      practica: [
        { incorrecto: 'Ich sehe er.', correcto: 'Ich sehe ihn.' },
        { incorrecto: 'Er hilft ihn.', correcto: 'Er hilft ihm.' },
        { incorrecto: 'Sie gibt ich das Buch.', correcto: 'Sie gibt mir das Buch.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla completa acusativo/dativo', texto: '', tabla: { headers: ['Nominativ', 'Akkusativ', 'Dativ'], rows: [['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er', 'ihn', 'ihm'], ['sie (ella)', 'sie', 'ihr'], ['es', 'es', 'ihm'], ['wir', 'uns', 'uns'], ['ihr', 'euch', 'euch'], ['sie (ellos)', 'sie', 'ihnen'], ['Sie', 'Sie', 'Ihnen']] } },
        { titulo: '🟩 2. No son derivables, se memorizan', texto: 'A diferencia del artículo (der→den es un patrón claro), estas formas no siguen una regla derivable de la raíz — se memorizan como bloque, igual que sein/haben.' },
        { titulo: '🟧 3. El caso lo exige el verbo, no la traducción', texto: '"helfen" (ayudar) exige dativo en alemán aunque en español "ayudar a alguien" suene a objeto directo. Aprende el verbo junto con su caso, no traduzcas mecánicamente desde el español.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'wir, ihr y du(dat.) ya son parcialmente conocidos: uns y euch son iguales en acusativo y dativo, lo que reduce el esfuerzo real de memorización a la mitad de la tabla.' }
      ],
      resumen: 'Los pronombres cambian de forma en acusativo (mich, dich, ihn…) y dativo (mir, dir, ihm…); se memorizan como bloque. Ojo con verbos como "helfen" que exigen dativo aunque el español sugiera objeto directo.'
    },
    'a1-15': {
      intro: 'En español usamos "en/el/a" de forma bastante libre para el tiempo ("en verano", "el lunes", "a las 9"), pero alemán exige una preposición distinta según el TIPO de expresión temporal: im para meses/estaciones, am para días/fechas, um para la hora exacta. Mezclarlas es el error más común de esta regla, así que conviene presentarlas siempre asociadas a su categoría, no de forma suelta.',
      practica: [
        { incorrecto: 'Am Winter fahre ich nach Spanien.', correcto: 'Im Winter fahre ich nach Spanien.' },
        { incorrecto: 'Im Montag habe ich Kurs.', correcto: 'Am Montag habe ich Kurs.' },
        { incorrecto: 'Der Kurs beginnt am 9 Uhr.', correcto: 'Der Kurs beginnt um 9 Uhr.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de preposiciones temporales', texto: '', tabla: { headers: ['Preposición', 'Uso', 'Ejemplo'], rows: [['im', 'meses y estaciones', 'im Januar, im Winter'], ['am', 'días y fechas', 'am Montag, am 3. Mai'], ['um', 'hora exacta', 'um 8 Uhr'], ['von...bis', 'periodo', 'von Montag bis Freitag'], ['nach', 'después de', 'nach der Arbeit'], ['vor', 'antes de', 'vor dem Essen']] } },
        { titulo: '🟩 2. Por qué im y am son contracciones', texto: '"im" = in + dem (dativo neutro) → por eso se usa con meses/estaciones. "am" = an + dem → por eso se usa con días/fechas. Explicar el origen ayuda a que no se mezclen por casualidad.' },
        { titulo: '🟧 3. Categoría, no lógica libre', texto: 'A diferencia del español, donde "en/el/a" se eligen con bastante libertad, en alemán cada preposición está fija a su categoría temporal y no son intercambiables.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Asocia cada preposición a su categoría como bloque cerrado: im=mes/estación, am=día/fecha, um=hora exacta. Memorizado así, el error de mezclar im/am prácticamente desaparece.' }
      ],
      resumen: 'im (meses/estaciones), am (días/fechas), um (hora exacta) son fijas según la categoría temporal, sin intercambio libre como en español. von…bis marca periodo; nach/vor, después/antes de un momento.'
    },
    'a1-16': {
      intro: 'En español "y/pero/o/porque" son conjunciones simples que no alteran el orden de la frase siguiente. En alemán, und/aber/oder/denn se comportan igual — van en "posición 0" y no cuentan para la regla V2 (a1-08) — pero hay una trampa clásica: "denn" (porque, posición 0) no debe confundirse con "weil" (porque, subordinante que manda el verbo al final), aunque ambas se traduzcan igual al español.',
      practica: [
        { incorrecto: 'Ich bin müde, aber arbeite ich weiter.', correcto: 'Ich bin müde, aber ich arbeite weiter.' },
        { incorrecto: 'Ich komme nicht, denn ich bin krank bin.', correcto: 'Ich komme nicht, denn ich bin krank.' },
        { incorrecto: 'Ich bleibe zu Hause, denn ich bin krank weil.', correcto: 'Ich bleibe zu Hause, weil ich krank bin.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de conjunciones', texto: '', tabla: { headers: ['Conjunción', 'Significado'], rows: [['und', 'y'], ['aber', 'pero'], ['oder', 'o'], ['denn', 'porque / pues']] } },
        { titulo: '🟩 2. Posición 0: no cuentan para el orden', texto: 'Después de und/aber/oder/denn, el orden de la segunda frase sigue siendo el normal: sujeto + verbo + resto. No provocan inversión como sí lo haría un elemento en posición 1.' },
        { titulo: '🟧 3. denn ≠ weil', texto: '"denn" introduce causa igual que "weil", pero SIN mandar el verbo al final: "Ich komme nicht, denn ich bin krank" (orden normal) frente a "..., weil ich krank bin" (verbo al final). El español no distingue esto porque "porque" es una sola palabra.' },
        { titulo: '🟨 4. Truco de comprobación', texto: 'Si después de la conjunción el verbo aparece al final, esa conjunción no era una de estas cuatro — probablemente era weil, dass o wenn, subordinantes de verdad.' }
      ],
      resumen: 'und/aber/oder/denn van en "posición 0": no alteran el orden de la frase siguiente (sujeto+verbo normal). "denn" es causal como "weil" pero sin mandar el verbo al final — el español no distingue este matiz.'
    },
    'a1-17': {
      intro: 'En español las palabras compuestas suelen formarse con preposición ("médico de niños"), pero alemán las une directamente en una sola palabra (Kinderarzt) — y la regla clave es que el género y número de toda la palabra los determina siempre la ÚLTIMA parte, no la primera. Además, el orden de las partes cambia completamente el significado, algo que el español resuelve con preposiciones y por tanto no genera esta ambigüedad.',
      practica: [
        { incorrecto: 'der Kinderzimmer', correcto: 'das Kinderzimmer' },
        { incorrecto: 'der Hausaufgabe', correcto: 'die Hausaufgabe' },
        { incorrecto: 'die Fußball', correcto: 'der Fußball' }
      ],
      pasos: [
        { titulo: '🟦 1. La última parte manda', texto: 'El género de toda la palabra compuesta lo determina la última parte (Grundwort): das Zimmer → das Kinderzimmer; die Aufgabe → die Hausaufgabe; der Ball → der Fußball.' },
        { titulo: '🟩 2. El orden cambia el significado', texto: '"der Kinderarzt" (el pediatra) es muy distinto de "die Arztkinder" (los hijos del médico) — invertir las partes no es un simple error de estilo, cambia por completo lo que se dice.' },
        { titulo: '🟧 3. A veces hay una letra de enlace', texto: 'Entre las dos partes puede aparecer -s- o -n- (die Arbeitszeit, der Straßenname) sin regla fija — se aprende con cada palabra compuesta nueva.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Para saber el género, mira SOLO la última parte e ignora el género de la primera, aunque sea distinto: das Kind (neutro) + das Zimmer (neutro) = das Kinderzimmer; pero der Kaffee (masc.) + die Tasse (fem.) = die Kaffeetasse (fem., por Tasse).' }
      ],
      resumen: 'Las palabras compuestas se forman uniendo sustantivos; el género y número los determina siempre la ÚLTIMA parte, no la primera. El orden de las partes cambia el significado por completo. A veces se inserta -s-/-n- de enlace.'
    },
    'a1-18': {
      intro: 'Además de los prefijos separables clásicos (a1-20), hay verbos formados con un sustantivo o adjetivo + verbo (Rad fahren, fernsehen, spazieren gehen) que se comportan exactamente igual: en la frase principal, la parte no verbal salta al final, formando el mismo "marco verbal" que ya se practicará con los separables. El español no tiene un fenómeno directamente comparable, así que conviene presentarlo como una extensión de la regla de los separables, no como algo nuevo desde cero.',
      practica: [
        { incorrecto: 'Ich fahre Rad gern.', correcto: 'Ich fahre gern Rad.' },
        { incorrecto: 'Wir gehen spazieren jeden Abend.', correcto: 'Wir gehen jeden Abend spazieren.' },
        { incorrecto: 'Ich habe kennengelernt ihn letztes Jahr.', correcto: 'Ich habe ihn letztes Jahr kennengelernt.' }
      ],
      pasos: [
        { titulo: '🟦 1. Mismo comportamiento que los separables', texto: 'El verbo conjugado ocupa la posición 2 como siempre, y la parte no verbal (Rad, spazieren, fern, kennen) salta al final de la frase — igual que un prefijo separable clásico.' },
        { titulo: '🟩 2. Ejemplos frecuentes', texto: 'Rad fahren (montar en bici), spazieren gehen (ir de paseo), fernsehen (ver la tele), kennenlernen (conocer a alguien) — vocabulario de uso muy cotidiano en A1.' },
        { titulo: '🟧 3. En Perfekt, una sola palabra', texto: 'El participio se escribe junto: ferngesehen, kennengelernt — aunque en el infinitivo algunas de estas combinaciones se escriban en dos palabras (Rad fahren, spazieren gehen).' },
        { titulo: '🟨 4. Pregunta de control', texto: '¿El verbo va acompañado de un sustantivo o adjetivo "pegado" a su significado? Si es así, esa parte casi siempre salta al final de la frase, igual que un prefijo separable.' }
      ],
      resumen: 'Verbos formados con sustantivo/adjetivo + verbo (Rad fahren, fernsehen, kennenlernen) se comportan como los separables: la parte no verbal salta al final de la frase principal, y en Perfekt el participio se escribe junto.'
    },
    'a1-19': {
      intro: 'El género gramatical debe aprenderse con cada palabra, pero hay patrones de terminación bastante fiables que ayudan a predecirlo en la mayoría de los casos — útiles como apoyo, nunca como regla absoluta, porque siempre hay excepciones frecuentes (como "der Junge", masculino a pesar de terminar en -e). Conviene insistir en no traducir el género desde el español, fuente constante de errores en A1.',
      practica: [
        { incorrecto: 'die Mädchen ist klein.', correcto: 'Das Mädchen ist klein.' },
        { incorrecto: 'der Freiheit ist wichtig.', correcto: 'Die Freiheit ist wichtig.' },
        { incorrecto: 'die Junge spielt Fußball.', correcto: 'Der Junge spielt Fußball.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de patrones fiables', texto: '', tabla: { headers: ['Género', 'Patrón', 'Ejemplo'], rows: [['der', 'días, meses, estaciones', 'der Montag, der Mai, der Sommer'], ['der', 'agentes en -er', 'der Lehrer'], ['die', 'terminados en -e', 'die Blume'], ['die', '-ung, -heit, -keit, -schaft', 'die Zeitung, die Freiheit'], ['das', 'diminutivos -chen/-lein', 'das Mädchen'], ['das', 'infinitivos sustantivados', 'das Essen']] } },
        { titulo: '🟩 2. -chen/-lein: la regla más fiable de todas', texto: 'SIEMPRE neutro, sin ninguna excepción (das Mädchen, das Brötchen) — la única regla de género en la que el alumno puede confiar al cien por cien.' },
        { titulo: '🟧 3. Excepciones frecuentes', texto: '"der Junge" termina en -e como los femeninos típicos, pero es masculino — los patrones son una guía útil, no una ley, ante la duda se aprende con la palabra.' },
        { titulo: '🟨 4. Truco general', texto: 'Nunca traduzcas el género del español (la mesa→der Tisch es masculino): usa los patrones de terminación como primera pista, y memoriza la excepción cuando aparezca.' }
      ],
      resumen: 'Patrones fiables: días/meses/estaciones y agentes en -er → der; -e, -ung/-heit/-keit/-schaft → die; -chen/-lein (siempre, sin excepción) e infinitivos sustantivados → das. Son ayuda, no regla absoluta — hay excepciones como "der Junge".'
    },
    'a1-20': {
      intro: 'Muchos verbos alemanes tienen un prefijo separable (auf-, an-, ein-, aus-, mit-…) que en la frase principal salta al final, creando el llamado "marco verbal" (Satzklammer) — un fenómeno que el español no tiene, donde el verbo siempre queda junto ("te llamo", no "te llam-o -o al final"). Es una de las estructuras más visibles y distintivas del alemán frente al español.',
      practica: [
        { incorrecto: 'Ich anrufe dich.', correcto: 'Ich rufe dich an.' },
        { incorrecto: 'Der Laden aufmacht um 9.', correcto: 'Der Laden macht um 9 auf.' },
        { incorrecto: 'Er hat das Licht gemacht aus.', correcto: 'Er hat das Licht ausgemacht.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de contextos', texto: '', tabla: { headers: ['Contexto', 'Posición del prefijo', 'Ejemplo (anrufen)'], rows: [['Frase principal', 'Al final', 'Ich rufe dich an.'], ['Subordinada', 'Unido al verbo (final)', '…weil ich dich anrufe.'], ['Infinitivo', 'Unido', '…dich anzurufen'], ['Partizip II', 'ge- insertado', 'angerufen']] } },
        { titulo: '🟩 2. El prefijo es tónico', texto: 'Los prefijos separables se acentúan al pronunciarlos (AN-rufen, AUF-machen), lo que ayuda a distinguirlos de los inseparables (be-, ver-, er-…), que son átonos y nunca se separan.' },
        { titulo: '🟧 3. En Partizip II, "ge-" se cuela en medio', texto: 'aus-ge-macht, ein-ge-kauft, an-ge-rufen — si el alumno ve una forma larga con "ge-" en el medio, es la señal de un verbo separable en Perfekt.' },
        { titulo: '🟨 4. Contraste con el español', texto: 'En español el verbo nunca se parte en dos: "te llamo" queda junto siempre. En alemán, la frase principal exige que la partícula viaje al final — es un cambio de hábito mental, no solo gramatical.' }
      ],
      resumen: 'Verbos con prefijo separable: en frase principal el prefijo salta al final (marco verbal); en subordinada, infinitivo y Partizip II va unido, con "ge-" insertado en el participio (ausgemacht). Fenómeno sin equivalente directo en español.'
    },
    'a1-21': {
      intro: 'El español conjuga el imperativo de forma distinta según tú/vosotros/usted (habla/hablad/hable), y alemán hace algo parecido con tres formas (du/ihr/Sie) — pero la forma "du" es más simple de lo esperado: solo la raíz del verbo, sin terminación ni pronombre. Ojo con los verbos que cambian vocal en presente (a1-11): algunos mantienen el cambio en imperativo y otros no.',
      practica: [
        { incorrecto: 'Du kommst her!', correcto: 'Komm her!' },
        { incorrecto: 'Kommt Sie herein!', correcto: 'Kommen Sie herein!' },
        { incorrecto: 'Lest das Buch!', correcto: 'Lies das Buch!' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de las tres formas', texto: '', tabla: { headers: ['Forma', 'Estructura', 'kommen', 'lesen (e→ie)'], rows: [['du', 'raíz', 'Komm!', 'Lies!'], ['ihr', 'raíz + -t', 'Kommt!', 'Lest!'], ['Sie', 'inf. + Sie', 'Kommen Sie!', 'Lesen Sie!']] } },
        { titulo: '🟩 2. du = solo la raíz', texto: 'Ni terminación ni pronombre: "Komm!", "Lern!" — más corto incluso que el imperativo español informal.' },
        { titulo: '🟧 3. El cambio vocálico e→i/ie se mantiene', texto: 'Los verbos que cambian e→i/ie en "du" presente (lesen→liest, sprechen→spricht) mantienen ese cambio en imperativo: "Lies!", "Sprich!".' },
        { titulo: '🟨 4. El cambio a→ä NO se mantiene', texto: 'fahren→fährst en presente, pero el imperativo vuelve a la "a" original: "Fahr!" (no "Fähr!") — la excepción más memorizable de esta regla.' },
        { titulo: '🟪 5. Formas irregulares de sein/haben', texto: '"Sei ruhig!" (sé tranquilo) y "Hab Geduld!" (ten paciencia) son las formas irregulares de sein y haben — se memorizan aparte, no siguen ningún patrón de la tabla.' }
      ],
      resumen: 'Imperativo: du=raíz sola, ihr=raíz+-t, Sie=infinitivo+Sie pospuesto. El cambio e→i/ie de a1-11 se mantiene (Lies!), pero a→ä no (Fahr!, no Fähr!). Sein y haben tienen formas irregulares propias: Sei…!, Hab…!.'
    }
  };

  function base(id) {
    var r = RULES[id];
    return { ruleId: id, intro: r.intro, practica: r.practica, pasos: r.pasos, resumen: r.resumen };
  }

  function repaso(id, nota) {
    var b = base(id);
    b.intro = b.intro + ' ' + nota;
    return b;
  }

  var NOTA_FINAL = 'Nota para el profesor: esto es repaso final de cierre de curso — no introduzcas matices nuevos, el objetivo es consolidar antes del simulacro.';
  var NOTA_LIBRE = 'Nota para el profesor: es repaso libre de consolidación de fin de semana — retómalo con ejemplos nuevos, sin añadir contenido nuevo a la regla.';
  var NOTA_SIMULACRO = 'Nota para el profesor: repaso puntual y breve antes del simulacro — no es momento de explicar nada nuevo, solo refrescar lo esencial.';

  window.TEACHER_CLASES.a1 = [
    { day: 1, semana: 1, focus: 'Artículos definidos + Pronombres personales + Verbos sein y haben', ruleIds: ['a1-01', 'a1-02', 'a1-03'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-01'), base('a1-02'), base('a1-03') ] } },
    { day: 2, semana: 1, focus: 'Presente verbos regulares + Negación: nicht y kein + Acusativo básico', ruleIds: ['a1-04', 'a1-05', 'a1-06'], esClaseEnVivo: true, contenido: { reglas: [ base('a1-04'), base('a1-05'), base('a1-06') ] } },
    { day: 3, semana: 1, focus: 'W-Fragen + Orden de palabras + Plurales', ruleIds: ['a1-07', 'a1-08', 'a1-09'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-07'), base('a1-08'), base('a1-09') ] } },
    { day: 4, semana: 1, focus: 'Artículo indefinido y su negación + Verben mit Vokalwechsel + Possessivartikel', ruleIds: ['a1-10', 'a1-11', 'a1-12'], esClaseEnVivo: true, contenido: { reglas: [ base('a1-10'), base('a1-11'), base('a1-12') ] } },
    { day: 5, semana: 1, focus: 'Artikel interrogativ und demonstrativ + Personalpronomen: Akkusativ und Dativ + Temporale Präpositionen', ruleIds: ['a1-13', 'a1-14', 'a1-15'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-13'), base('a1-14'), base('a1-15') ] } },
    { day: 6, semana: 1, focus: 'Hauptsätze verbinden: Position 0 + Komposita + Zusammengesetzte Verben', ruleIds: ['a1-16', 'a1-17', 'a1-18'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-16'), base('a1-17'), base('a1-18') ] } },
    { day: 7, semana: 1, focus: 'Genusregeln + Verbos separables + Imperativo', ruleIds: ['a1-19', 'a1-20', 'a1-21'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-19'), base('a1-20'), base('a1-21') ] } },

    { day: 8, semana: 2, focus: 'Artículos definidos + Artículo indefinido y su negación + Genusregeln', ruleIds: ['a1-01', 'a1-10', 'a1-19'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-01'), base('a1-10'), base('a1-19') ] } },
    { day: 9, semana: 2, focus: 'Pronombres personales + Possessivartikel + Personalpronomen: Akkusativ und Dativ', ruleIds: ['a1-02', 'a1-12', 'a1-14'], esClaseEnVivo: true, contenido: { reglas: [ base('a1-02'), base('a1-12'), base('a1-14') ] } },
    { day: 10, semana: 2, focus: 'Verbos sein y haben + Presente verbos regulares + Verben mit Vokalwechsel', ruleIds: ['a1-03', 'a1-04', 'a1-11'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-03'), base('a1-04'), base('a1-11') ] } },
    { day: 11, semana: 2, focus: 'Negación: nicht y kein + Acusativo básico + Artikel interrogativ und demonstrativ', ruleIds: ['a1-05', 'a1-06', 'a1-13'], esClaseEnVivo: true, contenido: { reglas: [ base('a1-05'), base('a1-06'), base('a1-13') ] } },
    { day: 12, semana: 2, focus: 'W-Fragen + Orden de palabras + Hauptsätze verbinden: Position 0', ruleIds: ['a1-07', 'a1-08', 'a1-16'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-07'), base('a1-08'), base('a1-16') ] } },
    { day: 13, semana: 2, focus: 'Plurales + Temporale Präpositionen + Komposita', ruleIds: ['a1-09', 'a1-15', 'a1-17'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-09'), base('a1-15'), base('a1-17') ] } },
    { day: 14, semana: 2, focus: 'Zusammengesetzte Verben + Verbos separables + Imperativo', ruleIds: ['a1-18', 'a1-20', 'a1-21'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-18'), base('a1-20'), base('a1-21') ] } },

    { day: 15, semana: 3, focus: 'Acusativo aplicado: artículos, artículo indefinido negado y pronombres', ruleIds: ['a1-06', 'a1-10', 'a1-14'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-06'), base('a1-10'), base('a1-14') ] } },
    { day: 16, semana: 3, focus: 'El marco verbal (Satzklammer): orden de palabras, Position 0 y verbos separables', ruleIds: ['a1-08', 'a1-16', 'a1-20'], esClaseEnVivo: true, contenido: { reglas: [ base('a1-08'), base('a1-16'), base('a1-20') ] } },
    { day: 17, semana: 3, focus: 'Presente regular vs. cambio vocálico vs. imperativo', ruleIds: ['a1-04', 'a1-11', 'a1-21'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-04'), base('a1-11'), base('a1-21') ] } },
    { day: 18, semana: 3, focus: 'Negación, posesivos y género gramatical', ruleIds: ['a1-05', 'a1-12', 'a1-19'], esClaseEnVivo: true, contenido: { reglas: [ base('a1-05'), base('a1-12'), base('a1-19') ] } },
    { day: 19, semana: 3, focus: 'Pronombres interrogativos: wer, wo, welcher y dieser', ruleIds: ['a1-02', 'a1-07', 'a1-13'], esClaseEnVivo: false, contenido: { reglas: [ base('a1-02'), base('a1-07'), base('a1-13') ] } },
    { day: 20, semana: 3, focus: 'Repaso libre: preposiciones temporales, compuestos y verbos compuestos', ruleIds: ['a1-15', 'a1-17', 'a1-18'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-15', NOTA_LIBRE), repaso('a1-17', NOTA_LIBRE), repaso('a1-18', NOTA_LIBRE) ] } },
    { day: 21, semana: 3, focus: 'Repaso general de cierre de semana: artículos, sein/haben y plurales', ruleIds: ['a1-01', 'a1-03', 'a1-09'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-01', NOTA_LIBRE), repaso('a1-03', NOTA_LIBRE), repaso('a1-09', NOTA_LIBRE) ] } },

    { day: 22, semana: 4, focus: 'Repaso final: artículos definidos, pronombres personales y acusativo básico', ruleIds: ['a1-01', 'a1-02', 'a1-03'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-01', NOTA_FINAL), repaso('a1-02', NOTA_FINAL), repaso('a1-03', NOTA_FINAL) ] } },
    { day: 23, semana: 4, focus: 'Repaso final: presente regular, negación y acusativo básico', ruleIds: ['a1-04', 'a1-05', 'a1-06'], esClaseEnVivo: true, contenido: { reglas: [ repaso('a1-04', NOTA_FINAL), repaso('a1-05', NOTA_FINAL), repaso('a1-06', NOTA_FINAL) ] } },
    { day: 24, semana: 4, focus: 'Repaso final: W-Fragen, orden de palabras y plurales', ruleIds: ['a1-07', 'a1-08', 'a1-09'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-07', NOTA_FINAL), repaso('a1-08', NOTA_FINAL), repaso('a1-09', NOTA_FINAL) ] } },
    { day: 25, semana: 4, focus: 'Repaso final: artículo indefinido negado, Vokalwechsel y Possessivartikel', ruleIds: ['a1-10', 'a1-11', 'a1-12'], esClaseEnVivo: true, contenido: { reglas: [ repaso('a1-10', NOTA_FINAL), repaso('a1-11', NOTA_FINAL), repaso('a1-12', NOTA_FINAL) ] } },
    { day: 26, semana: 4, focus: 'Repaso final: artículos interrogativos/demostrativos, Akkusativ und Dativ y preposiciones temporales', ruleIds: ['a1-13', 'a1-14', 'a1-15'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-13', NOTA_FINAL), repaso('a1-14', NOTA_FINAL), repaso('a1-15', NOTA_FINAL) ] } },
    { day: 27, semana: 4, focus: 'Repaso final: Position 0, Komposita y verbos compuestos', ruleIds: ['a1-16', 'a1-17', 'a1-18'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-16', NOTA_FINAL), repaso('a1-17', NOTA_FINAL), repaso('a1-18', NOTA_FINAL) ] } },
    { day: 28, semana: 4, focus: 'Repaso libre: reglas de género, verbos separables e imperativo', ruleIds: ['a1-19', 'a1-20', 'a1-21'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-19', NOTA_LIBRE), repaso('a1-20', NOTA_LIBRE), repaso('a1-21', NOTA_LIBRE) ] } },
    { day: 29, semana: 4, focus: 'Simulacro final A1 (día 1/2): escritura evaluada + Teil 1 oral', ruleIds: ['a1-06'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-06', NOTA_SIMULACRO) ] } },
    { day: 30, semana: 4, focus: 'Simulacro final A1 (día 2/2): los 3 Teile orales completos, puntuación 0-100', ruleIds: ['a1-20'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a1-20', NOTA_SIMULACRO) ] } }
  ];
})();
