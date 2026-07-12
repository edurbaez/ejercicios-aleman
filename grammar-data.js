const GRAMMAR_DATA = {
  A1: [
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
  ],

  A2: [
    {
      id: 'a2-01',
      titulo: 'Verbos modales',
      subtitulo: 'können, müssen, wollen, sollen, dürfen, mögen',
      regla_base: 'Los modales van en V2; el infinitivo principal va al final. En singular 1.ª y 3.ª persona no llevan terminación. La vocal de la raíz cambia en singular.',
      tabla: { headers: ['', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'], rows: [['ich/er', 'kann', 'muss', 'will', 'soll', 'darf', 'mag'], ['du', 'kannst', 'musst', 'willst', 'sollst', 'darfst', 'magst'], ['wir/sie', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen']] },
      excepciones: 'En pasado hablado se prefiere el Präteritum de los modales (musste, konnte, wollte) al Perfekt. Mögen raramente acompaña infinitivo; su forma de cortesía es möchte (querría).',
      explicacion: 'Los verbos modales expresan actitudes hacia una acción: posibilidad (können), obligación (müssen), deseo (wollen), mandato externo (sollen), permiso/prohibición (dürfen) y gusto/suposición (mögen). Siempre van acompañados de un infinitivo que se coloca al final de la frase. En presente son irregulares: la vocal de la raíz cambia en singular y la primera y tercera persona singular no llevan terminación (-Ø, no -e ni -t). En pasado hablado se prefiere el Präteritum de los modales (musste, konnte) al Perfekt.',
      ejemplos: [
        { de: 'Ich kann schwimmen.', es: 'Sé nadar / Puedo nadar.' },
        { de: 'Du musst arbeiten.', es: 'Tienes que trabajar.' },
        { de: 'Er will Arzt werden.', es: 'Él quiere ser médico.' },
        { de: 'Darf ich hier rauchen?', es: '¿Puedo / Se puede fumar aquí?' }
      ],
      tip: 'Paradigma de können: ich kann / du kannst / er kann / wir können / ihr könnt / sie können. Fíjate: ich y er tienen la misma forma (sin terminación). Este patrón se repite en todos los modales.'
    },
    {
      id: 'a2-02',
      titulo: 'Pretérito perfecto (Perfekt)',
      subtitulo: 'haben/sein + Partizip II',
      regla_base: 'haben/sein en V2 + Partizip II al final. Movimiento o cambio de estado → sein; el resto → haben.',
      tabla: { headers: ['Tipo', 'Formación P.II', 'Ejemplo'], rows: [['Regular', 'ge- + raíz + -(e)t', 'gemacht, gearbeitet'], ['Irregular', 'ge- + raíz modif. + -en', 'gegessen, gefahren'], ['Prefijo insep.', 'sin ge-', 'bestellt, verkauft, erzählt']] },
      excepciones: 'Los verbos con prefijo inseparable (be-, ver-, er-, ge-, zer-, mis-) nunca llevan ge-: bestellt, nicht *gebestellt. Con prefijos separables, el ge- se inserta: ausgegangen, eingekauft.',
      explicacion: 'El Perfekt es el tiempo pasado más usado en la lengua hablada alemana para referirse a acciones pasadas. Se forma con el auxiliar "haben" o "sein" en presente más el Partizip II al final. Los verbos de movimiento o cambio de estado (gehen, kommen, fahren, aufwachen, werden…) usan "sein"; la gran mayoría usa "haben". El Partizip II de verbos regulares se forma con el prefijo "ge-" + raíz + -(e)t (gemacht, gearbeitet). Los irregulares añaden "ge-" + raíz modificada + -en (gegessen, gefahren). Los verbos con prefijo inseparable (be-, ver-, er-…) no toman "ge-".',
      ejemplos: [
        { de: 'Ich habe gegessen.', es: 'He comido / Comí.' },
        { de: 'Er hat gearbeitet.', es: 'Ha trabajado / Trabajó.' },
        { de: 'Sie ist nach Berlin gefahren.', es: 'Ha ido a Berlín (bewegung → sein).' },
        { de: 'Wir sind aufgewacht.', es: 'Nos hemos despertado (cambio de estado → sein).' }
      ],
      tip: 'Truco para sein vs. haben: si el verbo expresa movimiento de A a B o un cambio de estado (nacer, morir, crecer, despertar), usa sein. En caso de duda, usa haben — es el auxiliar más frecuente.'
    },
    {
      id: 'a2-03',
      titulo: 'Dativo',
      subtitulo: 'artículos y pronombres en dativo',
      regla_base: 'El dativo marca el objeto indirecto (¿a quién? / ¿para quién?). Artículos: dem (masc./neutro), der (fem.), den+n (plural).',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Art. def.', 'dem', 'der', 'dem', 'den+n'], ['Art. indef.', 'einem', 'einer', 'einem', '—'], ['Pron. pers.', 'ihm', 'ihr', 'ihm', 'ihnen']] },
      excepciones: 'Verbos que rigen dativo aunque parecen transitivos: helfen, danken, gefallen, gehören, passen, glauben, folgen, begegnen. Apréndelos como lista.',
      explicacion: 'El dativo es el caso del objeto indirecto: responde a ¿a quién? o ¿para quién? Los artículos definidos en dativo son: dem (masc. y neutro), der (fem.), den+n (plural — todos los sustantivos en dativo plural añaden -n si no terminan ya en -n). Los artículos indefinidos: einem (masc./neutro), einer (fem.). Los pronombres personales cambian completamente: mir (yo), dir (tú), ihm (él/eso), ihr (ella), uns (nosotros), euch (vosotros), ihnen/Ihnen (ellos/usted). Ciertos verbos "de dativo" como helfen, danken, gefallen, gehören, passen siempre rigen dativo aunque parezcan querer acusativo.',
      ejemplos: [
        { de: 'Ich gebe dem Mann das Buch.', es: 'Le doy el libro al hombre.' },
        { de: 'Er hilft der Frau.', es: 'Él ayuda a la mujer. (helfen + Dat)' },
        { de: 'Sie schreibt mir eine E-Mail.', es: 'Ella me escribe un correo.' },
        { de: 'Das gefällt mir sehr.', es: 'Eso me gusta mucho. (gefallen + Dat)' }
      ],
      tip: 'Los verbos que "se sienten" como transitivos pero rigen dativo son una trampa clásica: helfen, danken, gratulieren, schaden, folgen, begegnen. Aprende cada uno con su caso.'
    },
    {
      id: 'a2-04',
      titulo: 'Preposiciones + Acusativo',
      subtitulo: 'durch, für, gegen, ohne, um',
      regla_base: 'Cinco preposiciones rigen siempre acusativo. Mnemónico: DOGFU — Durch, Ohne, Gegen, Für, Um.',
      tabla: { headers: ['Prep.', 'Significado principal'], rows: [['durch', 'a través de / por'], ['ohne', 'sin'], ['gegen', 'contra / hacia (hora aprox.)'], ['für', 'para / durante'], ['um', 'alrededor de / a las (hora exacta)']] },
      explicacion: 'Cinco preposiciones rigen siempre acusativo: durch (a través de / por medio de), für (para / durante), gegen (contra / hacia / alrededor de [hora aproximada]), ohne (sin), um (alrededor de / a las [hora exacta] / para [con infinitivo]). El artículo que sigue a estas preposiciones toma la forma acusativa. En la lengua coloquial se producen contracciones: fürs (für das), durchs (durch das), ums (um das).',
      ejemplos: [
        { de: 'Das ist für dich.', es: 'Esto es para ti.' },
        { de: 'Wir fahren durch den Tunnel.', es: 'Pasamos por el túnel.' },
        { de: 'Ohne einen Plan geht es nicht.', es: 'Sin un plan no funciona.' },
        { de: 'Er läuft um den See.', es: 'Corre alrededor del lago.' }
      ],
      tip: 'Mnemotécnico: DOGFU — Durch, Ohne, Gegen, Für, Um. Todas llevan Acusativo. Si memorizas estas cinco, no las confundirás con las de dativo.'
    },
    {
      id: 'a2-05',
      titulo: 'Preposiciones + Dativo',
      subtitulo: 'aus, bei, mit, nach, seit, von, zu, gegenüber',
      regla_base: 'Ocho preposiciones rigen siempre dativo. Rima: "aus, bei, mit, nach, seit, von, zu — diese Wörter regier\'n den Dativ nu!"',
      tabla: { headers: ['Prep.', 'Significado', 'Contracción'], rows: [['aus', 'de / desde (origen)', '—'], ['bei', 'en / junto a', 'beim (bei dem)'], ['mit', 'con / en (transporte)', '—'], ['nach', 'hacia / después de', '—'], ['seit', 'desde (hasta ahora)', '—'], ['von', 'de / por (agente)', 'vom (von dem)'], ['zu', 'a / hacia (destino)', 'zum / zur'], ['gegenüber', 'frente a', '—']] },
      explicacion: 'Estas ocho preposiciones rigen siempre dativo: aus (de / desde [origen o material]), bei (en casa de / en [empresa o lugar]), mit (con / en [medio de transporte]), nach (después de / hacia [ciudad o país sin artículo]), seit (desde [punto en el tiempo hasta ahora — presente o pasado]), von (de / desde / por [agente en pasiva]), zu (a / hacia [destino]), gegenüber (frente a — puede ir antes o después del sustantivo). Se producen contracciones frecuentes: beim (bei dem), vom (von dem), zum (zu dem), zur (zu der).',
      ejemplos: [
        { de: 'Ich komme aus der Schweiz.', es: 'Soy de Suiza.' },
        { de: 'Sie wohnt bei ihrer Mutter.', es: 'Vive en casa de su madre.' },
        { de: 'Ich fahre mit dem Bus.', es: 'Voy en autobús.' },
        { de: 'Seit einem Jahr lerne ich Deutsch.', es: 'Llevo un año aprendiendo alemán.' }
      ],
      tip: 'Rima para recordarlas: "aus, bei, mit, nach, seit, von, zu — diese Wörter regier\'n den Dativ nu!" Cántala hasta memorizarla.'
    },
    {
      id: 'a2-06',
      titulo: 'Wechselpräpositionen',
      subtitulo: 'Akk. (¿adónde?) vs. Dat. (¿dónde?)',
      regla_base: '9 preposiciones (an, auf, in, über, unter, vor, hinter, neben, zwischen): wohin? (movimiento) → Acusativo · wo? (posición) → Dativo.',
      tabla: { headers: ['Pregunta', 'Caso', 'Par de verbos típico'], rows: [['Wohin? (movimiento)', 'Acusativo', 'legen, stellen, hängen (activo)'], ['Wo? (posición)', 'Dativo', 'liegen, stehen, hängen (estado)']] },
      excepciones: 'Contracciones frecuentes: im (in dem), am (an dem), ins (in das), ans (an das). hängen es el mismo verbo tanto para movimiento como para estado — el caso lo diferencia.',
      explicacion: 'Nueve preposiciones admiten tanto acusativo como dativo según el significado: an, auf, in, über, unter, vor, hinter, neben, zwischen. La regla fundamental: si la frase expresa movimiento hacia un destino (¿wohin?) → acusativo; si expresa posición o estado en un lugar (¿wo?) → dativo. Los pares de verbos legen/liegen, stellen/stehen, hängen/hängen, setzen/sitzen ilustran bien la distinción: los primeros son de acción/movimiento (acusativo) y los segundos de estado (dativo). Contracciones frecuentes: im (in dem), am (an dem), ins (in das), ans (an das).',
      ejemplos: [
        { de: 'Ich lege das Buch auf den Tisch.', es: 'Pongo el libro en la mesa. (Akk — movimiento)' },
        { de: 'Das Buch liegt auf dem Tisch.', es: 'El libro está en la mesa. (Dat — posición)' },
        { de: 'Sie geht in die Stadt.', es: 'Va al centro. (Akk — dirección)' },
        { de: 'Sie ist in der Stadt.', es: 'Está en el centro. (Dat — ubicación)' }
      ],
      tip: '¿Puedes preguntar "¿adónde?" (wohin)? → Acusativo. ¿Solo "¿dónde?" (wo)? → Dativo. Los verbos legen/stellen/hängen siempre piden Akk; liegen/stehen/hängen (estado) siempre piden Dat.'
    },
    {
      id: 'a2-07',
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
      id: 'a2-08',
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
    },
    {
      id: 'a2-09',
      titulo: 'Comparativo y superlativo',
      subtitulo: 'schneller / am schnellsten',
      regla_base: 'Comparativo: adjetivo + -er (schneller). Superlativo predicativo: am …-sten. Para comparar usa "als" (que).',
      tabla: { headers: ['Base', 'Comparativo', 'Superlativo pred.'], rows: [['schnell', 'schneller', 'am schnellsten'], ['alt', 'älter', 'am ältesten'], ['groß', 'größer', 'am größten'], ['gut', 'besser', 'am besten'], ['viel', 'mehr', 'am meisten'], ['gern', 'lieber', 'am liebsten']] },
      excepciones: 'gut, viel y gern son completamente irregulares. Los adjetivos monosílabos frecuentemente añaden umlaut: alt→älter, jung→jünger, groß→größer.',
      explicacion: 'El comparativo se forma añadiendo el sufijo -er al adjetivo (schnell → schneller). Para hacer comparaciones se usa "als" (que): "Er ist größer als ich". El superlativo atributivo añade -(e)sten con terminación de adjetivo: "der schnellste Zug". El superlativo predicativo usa "am … -sten": "Er läuft am schnellsten". Muchos adjetivos monosílabos añaden umlaut en comparativo y superlativo (alt→älter, groß→größer, jung→jünger). Hay formas completamente irregulares que deben memorizarse: gut/besser/best-, viel/mehr/meist-, gern/lieber/liebst-.',
      ejemplos: [
        { de: 'schnell → schneller → am schnellsten', es: 'rápido → más rápido → el más rápido' },
        { de: 'alt → älter → am ältesten', es: 'viejo → más viejo → el más viejo' },
        { de: 'gut → besser → am besten', es: 'bueno → mejor → el mejor' },
        { de: 'Er ist größer als sein Bruder.', es: 'Es más alto que su hermano.' }
      ],
      tip: 'No confundas el comparativo predicativo ("Er ist schneller") con el atributivo ("der schnellere Läufer" — con declinación de adjetivo). El atributivo necesita la terminación de caso.'
    },
    {
      id: 'a2-10',
      titulo: 'Verbos reflexivos',
      subtitulo: 'sich waschen, sich freuen…',
      regla_base: 'El pronombre reflexivo concuerda con el sujeto. Acusativo si es el único objeto; dativo si ya hay un acusativo en la frase.',
      tabla: { headers: ['Pronombre', 'Reflexivo Akk.', 'Reflexivo Dat.'], rows: [['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er/sie/es/Sie', 'sich', 'sich'], ['wir', 'uns', 'uns'], ['ihr', 'euch', 'euch']] },
      excepciones: 'Ich wasche mich (acus. — solo objeto) vs. Ich wasche mir die Hände (dat. — las manos son el objeto directo). Muchos verbos son reflexivos en alemán pero no en español: sich erinnern, sich freuen, sich befinden.',
      explicacion: 'Los verbos reflexivos usan un pronombre reflexivo que concuerda con el sujeto: mich (ich), dich (du), sich (er/sie/es/sie/Sie), uns (wir), euch (ihr). Algunos verbos son reflexivos en alemán pero no en español (sich erinnern = recordar) y viceversa. Cuando el reflexivo actúa como objeto directo (acusativo), se usa mich/dich/sich/uns/euch. Cuando es objeto indirecto (dativo) y hay ya un acusativo, cambia: mir/dir/sich/uns/euch. Ejemplo: "Ich wasche mich" (acus.) vs. "Ich wasche mir die Hände" (dat. — las manos son el acusativo).',
      ejemplos: [
        { de: 'Ich wasche mich. / Ich wasche mir die Hände.', es: 'Me lavo. / Me lavo las manos.' },
        { de: 'Du freust dich.', es: 'Te alegras.' },
        { de: 'Er erinnert sich nicht.', es: 'Él no se acuerda / no recuerda.' },
        { de: 'Wir setzen uns.', es: 'Nos sentamos.' }
      ],
      tip: 'Lista de verbos reflexivos frecuentes: sich freuen (auf/über), sich erinnern (an), sich interessieren (für), sich kümmern (um), sich treffen (mit). Apréndelos con su preposición desde el principio.'
    }
  ],

  B1: [
    {
      id: 'b1-01',
      titulo: 'Präteritum',
      subtitulo: 'pasado narrativo escrito',
      regla_base: 'Pasado escrito y narrativo. Regulares: raíz + -te. Irregulares: cambio vocálico (fuhr, schrieb). 1.ª y 3.ª sg. sin terminación.',
      tabla: { headers: ['', 'Regular (lernen)', 'Irregular (fahren)', 'Modal (müssen)'], rows: [['ich/er', 'lernte', 'fuhr', 'musste'], ['du', 'lerntest', 'fuhrst', 'musstest'], ['wir/sie', 'lernten', 'fuhren', 'mussten'], ['ihr', 'lerntet', 'fuhrt', 'musstet']] },
      excepciones: 'En conversación solo se usa Präteritum para sein, haben y modales (war, hatte, musste). Para el resto del pasado hablado se usa el Perfekt.',
      explicacion: 'El Präteritum es el tiempo pasado propio de la lengua escrita (novelas, cuentos, noticias, cartas formales). En la lengua hablada se usa casi solo para sein, haben y los verbos modales, donde suena más natural que el Perfekt. Los verbos regulares forman el Präteritum añadiendo -te a la raíz: lernte, arbeitete, spielte. Los irregulares (verbos fuertes) cambian la vocal de la raíz — estas formas deben memorizarse en listas: fuhr, schrieb, sprach, trank. El mismo patrón de cambio vocálico se aplica a todas las personas; la primera y tercera persona singular no llevan terminación.',
      ejemplos: [
        { de: 'Ich arbeitete den ganzen Tag.', es: 'Trabajé todo el día. (regular)' },
        { de: 'Er fuhr nach Berlin. (fahren → fuhr)', es: 'Viajó a Berlín.' },
        { de: 'Sie hatte keine Zeit. (haben → hatte)', es: 'No tenía tiempo.' },
        { de: 'Wir mussten warten. (müssen → musste)', es: 'Tuvimos que esperar.' }
      ],
      tip: 'En la conversación habitual, usa Perfekt para todo el pasado excepto con sein/haben/modales: "Ich war", "Er hatte", "Sie musste". Estas formas de Präteritum suenan más naturales que sus equivalentes en Perfekt.'
    },
    {
      id: 'b1-02',
      titulo: 'Konjunktiv II',
      subtitulo: 'hipótesis y cortesía',
      regla_base: 'Hipótesis, deseos y peticiones corteses. Comodín: würde+Inf. Los verbos clave tienen forma propia más elegante.',
      tabla: { headers: ['Verbo', 'Konj. II propio'], rows: [['sein', 'wäre'], ['haben', 'hätte'], ['werden', 'würde'], ['können', 'könnte'], ['müssen', 'müsste'], ['sollen', 'sollte'], ['dürfen', 'dürfte']] },
      excepciones: 'Con sein/haben/modales usa siempre la forma propia (wäre, hätte, könnte…), no würde+Inf. — "Er würde sein" suena incorrecto; lo correcto es "Er wäre".',
      explicacion: 'El Konjunktiv II expresa situaciones hipotéticas, deseos irreales, consejos y peticiones corteses. La construcción más productiva en B1 es "würde + Infinitivo", que funciona como comodín para casi cualquier verbo. Sin embargo, los verbos auxiliares y modales forman su propio Konjunktiv II a partir del Präteritum con umlaut cuando es posible: wäre (sein), hätte (haben), könnte (können), müsste (müssen), sollte (sollen), dürfte (dürfen), möchte (mögen). Estas formas propias suenan más elegantes que "würde + Inf." con los mismos verbos.',
      ejemplos: [
        { de: 'Ich würde gern mitkommen.', es: 'Me encantaría acompañaros.' },
        { de: 'Könntest du mir helfen?', es: '¿Podrías ayudarme?' },
        { de: 'Wenn ich Zeit hätte, würde ich reisen.', es: 'Si tuviera tiempo, viajaría.' },
        { de: 'An deiner Stelle würde ich das nicht tun.', es: 'Yo en tu lugar no haría eso.' }
      ],
      tip: 'Para peticiones corteses usa "Könnten Sie…?", "Würden Sie…?" o "Dürfte ich…?". Son la equivalencia alemana de "¿Podría usted…?" en español formal.'
    },
    {
      id: 'b1-03',
      titulo: 'Oraciones de relativo',
      subtitulo: 'pronombres relativos + verbo al final',
      regla_base: 'El pronombre relativo concuerda en género/número con el antecedente, pero toma el caso según su función en la subordinada. Verbo siempre al final.',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'der', 'die', 'das', 'die'], ['Akk.', 'den', 'die', 'das', 'die'], ['Dat.', 'dem', 'der', 'dem', 'denen'], ['Gen.', 'dessen', 'deren', 'dessen', 'deren']] },
      excepciones: 'Dativo plural: denen (no den). Genitivo: dessen/deren (no des/der). Estos 3 casos son las únicas diferencias respecto al artículo definido.',
      explicacion: 'Las oraciones de relativo añaden información sobre un sustantivo (el antecedente). El pronombre relativo concuerda en género y número con el antecedente, pero adopta el caso que le corresponde dentro de la subordinada (¿qué función cumple en esa frase?). Los pronombres relativos son casi idénticos a los artículos definidos, con tres excepciones: dativo plural "denen" (no "den"), genitivo masculino/neutro "dessen" y genitivo femenino/plural "deren". El verbo de la relativa siempre va al final. La relativa va entre comas.',
      ejemplos: [
        { de: 'Das ist der Mann, der dort wohnt.', es: 'Ese es el hombre que vive allí. (nom.)' },
        { de: 'Ich kenne die Frau, die du meinst.', es: 'Conozco a la mujer que mencionas. (acus.)' },
        { de: 'Der Mann, dem ich helfe, ist nett.', es: 'El hombre al que ayudo es simpático. (dat.)' },
        { de: 'Das ist das Buch, dessen Autor ich kenne.', es: 'Es el libro cuyo autor conozco. (gen.)' }
      ],
      tip: 'Determina el caso del pronombre relativo preguntándote qué función cumple dentro de la subordinada: ¿sujeto (nom.)? ¿objeto directo (acus.)? ¿objeto indirecto (dat.)? ¿posesión (gen.)?'
    },
    {
      id: 'b1-04',
      titulo: 'Genitivo',
      subtitulo: 'posesión y complementos nominales',
      regla_base: 'Posesión y especificación. Artículos: des (masc./neutro), der (fem./plural). Masc. y neutro añaden -s o -es al sustantivo.',
      tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Art. def.', 'des', 'der', 'des', 'der'], ['Art. indef.', 'eines', 'einer', 'eines', '—'], ['Sust.', '+(-e)s', 'sin cambio', '+(-e)s', 'sin cambio']] },
      excepciones: 'En lenguaje coloquial el genitivo se sustituye por von+Dativo. Preposiciones que rigen genitivo: wegen, trotz, während, statt, innerhalb, außerhalb, aufgrund.',
      explicacion: 'El genitivo expresa posesión, pertenencia o especificación. Los artículos definidos son: des (masc. y neutro) y der (fem. y plural). Los sustantivos masculinos y neutros añaden -s o -es en genitivo (des Mannes, des Kindes). Los sustantivos femeninos y plurales no cambian. Varias preposiciones rigen genitivo: wegen (a causa de), trotz (a pesar de), während (durante), statt (en lugar de), innerhalb/außerhalb (dentro/fuera de), aufgrund (debido a). En la lengua coloquial el genitivo se sustituye frecuentemente por "von + Dativo": "das Auto von dem Mann" en lugar de "das Auto des Mannes".',
      ejemplos: [
        { de: 'Das ist das Auto des Mannes.', es: 'Es el coche del hombre.' },
        { de: 'Die Tasche der Frau ist rot.', es: 'El bolso de la mujer es rojo.' },
        { de: 'Wegen des Regens bleibe ich zu Hause.', es: 'Me quedo en casa a causa de la lluvia.' },
        { de: 'Trotz des schlechten Wetters gingen wir raus.', es: 'A pesar del mal tiempo salimos.' }
      ],
      tip: 'Las preposiciones de genitivo más frecuentes en B1: wegen, trotz, während, statt. Están siendo remplazadas por dativo en el habla coloquial, pero en textos escritos formales son obligatorias.'
    },
    {
      id: 'b1-05',
      titulo: 'Declinación de adjetivos',
      subtitulo: 'después de def. / indef. / sin artículo',
      regla_base: 'Tras art. definido → débil (-e/-en). Tras art. indefinido → mixta. Sin artículo → fuerte (el adjetivo lleva la señal de caso).',
      tabla: { headers: ['', 'Masc. Nom.', 'Masc. Akk.', 'Fem. Nom.', 'Neutro Nom.'], rows: [['Def. (der/die/das)', '-e', '-en', '-e', '-e'], ['Indef. (ein/kein)', '-er', '-en', '-e', '-es'], ['Sin artículo', '-er', '-en', '-e', '-es']] },
      excepciones: 'Con artículo definido en casos oblicuos (Akk. masc., Dat., Gen.) casi siempre termina en -en. La terminación fuerte "sin artículo" es idéntica a la del artículo definido (der→-er, dem→-em, des→-en).',
      explicacion: 'Los adjetivos atributivos (los que preceden al sustantivo) se declinan de tres maneras según qué artículo los acompaña. Tras artículo definido (der/die/das) las terminaciones son "débiles" (-e o -en), porque el artículo ya da toda la información de género, número y caso. Tras artículo indefinido (ein, kein, mein…) las terminaciones son "mixtas": el adjetivo asume la señal de caso donde el artículo no la muestra (nominativo masc., acus. neutro → -er, -es). Sin artículo las terminaciones son "fuertes": el adjetivo debe indicar solo todo el género y el caso.',
      ejemplos: [
        { de: 'der alte Mann (def. nom. masc.)', es: 'el hombre viejo (-e)' },
        { de: 'einen alten Mann (indef. acus. masc.)', es: 'a un hombre viejo (-en)' },
        { de: 'mit frischem Brot (sin art. dat. neutro)', es: 'con pan fresco (-em)' },
        { de: 'Kalter Kaffee schmeckt nicht.', es: 'El café frío no sabe bien. (-er, sin art.)' }
      ],
      tip: 'Empieza con la declinación tras artículo definido (solo -e o -en). Es la más fácil. La más difícil es sin artículo. Un truco: las terminaciones fuertes son las mismas que las del artículo definido (der→-er, dem→-em, den→-en…).'
    },
    {
      id: 'b1-06',
      titulo: 'Conectores subordinantes',
      subtitulo: 'weil, dass, obwohl, wenn, als, bevor, nachdem',
      regla_base: 'Estos conectores mandan el verbo conjugado al final de la subordinada. Si la subordinada va primera, la principal empieza directamente con el verbo (V2 global).',
      tabla: { headers: ['Conector', 'Significado', 'Uso'], rows: [['weil / da', 'porque', 'causa'], ['dass', 'que', 'contenido indirecto'], ['obwohl', 'aunque', 'concesión'], ['wenn', 'cuando / si', 'condición o hábito (cualquier tiempo)'], ['als', 'cuando', 'momento único pasado'], ['bevor', 'antes de que', 'temporal'], ['nachdem', 'después de que', 'temporal']] },
      excepciones: 'wenn vs. als: wenn para condiciones y acciones habituales en cualquier tiempo; als exclusivamente para un momento único y concreto en el pasado.',
      explicacion: 'Estos conectores introducen oraciones subordinadas (Nebensätze) en las que el verbo conjugado va obligatoriamente AL FINAL. "Weil/da" expresan causa (porque); "damit/um…zu" expresan finalidad; "dass" introduce contenido (que); "obwohl" expresa concesión (aunque); "wenn" introduce condiciones o acciones habituales en cualquier tiempo; "als" se usa exclusivamente para un momento único en el pasado; "bevor" y "nachdem" indican relación temporal. Si la subordinada precede a la principal, la principal comienza directamente con el verbo (V2 global se mantiene).',
      ejemplos: [
        { de: 'Ich lerne, weil ich eine Prüfung habe.', es: 'Estudio porque tengo un examen.' },
        { de: 'Ich glaube, dass er kommt.', es: 'Creo que él viene.' },
        { de: 'Obwohl es regnet, gehe ich raus.', es: 'Aunque llueve, salgo.' },
        { de: 'Als ich jung war, lebte ich in Berlin.', es: 'Cuando era joven vivía en Berlín.' }
      ],
      tip: '"Wenn" para condiciones y acciones repetidas en cualquier tiempo; "als" para UN momento concreto en el pasado. Mezclarlos es el error más frecuente en B1.'
    },
    {
      id: 'b1-07',
      titulo: 'Verbos con preposición fija',
      subtitulo: 'warten auf, denken an, sprechen über…',
      regla_base: 'Cada verbo exige una preposición y caso específicos. Para sustituir cosas/ideas: da(r)+prep. (darauf, daran). Para personas: pronombre+prep. (auf ihn, an sie).',
      tabla: { headers: ['Verbo', 'Prep. + Caso', 'da(r)-Ersatz'], rows: [['warten', 'auf + Akk.', 'darauf'], ['denken', 'an + Akk.', 'daran'], ['sprechen', 'über + Akk.', 'darüber'], ['sich freuen', 'auf/über + Akk.', 'darauf/darüber'], ['sich erinnern', 'an + Akk.', 'daran'], ['sich kümmern', 'um + Akk.', 'darum']] },
      explicacion: 'Muchos verbos alemanes se combinan con una preposición específica que rige un caso determinado, igual que en español "depender de" o "pensar en". Estas combinaciones no son deducibles lógicamente y deben aprenderse como unidades léxicas junto con su caso. Cuando el complemento preposicional es una cosa o idea (no una persona), puede reemplazarse por un pronombre "pronominal adverbial" formado con da(r)- + preposición: darauf (auf + cosa), daran (an + cosa), darüber (über + cosa), etc. Con personas se usan los pronombres normales: auf ihn, an sie.',
      ejemplos: [
        { de: 'Ich warte auf den Bus.', es: 'Espero el autobús. (auf + Akk)' },
        { de: 'Sie denkt oft an ihre Familie.', es: 'Piensa mucho en su familia. (an + Akk)' },
        { de: 'Wir sprechen über das Problem.', es: 'Hablamos del problema. (über + Akk)' },
        { de: 'Darauf warte ich. / Auf sie warte ich.', es: 'Eso / A ella espero.' }
      ],
      tip: 'Aprende cada verbo con su preposición y caso como un bloque: "warten AUF + Akk", "sich freuen AUF + Akk", "sich erinnern AN + Akk". Los diccionarios modernos y el Duden los listan con esta información.'
    },
    {
      id: 'b1-08',
      titulo: 'Infinitivo con "zu"',
      subtitulo: 'versuchen zu, aufhören zu…',
      regla_base: 'zu + infinitivo después de ciertos verbos (versuchen, aufhören…), adjetivos (es ist wichtig) y sustantivos (die Zeit). Con separables: prefijo|zu|raíz.',
      excepciones: 'NO llevan zu: verbos modales (muss gehen), lassen, sehen, hören, fühlen. Con separables: auf|zu|hören, ein|zu|kaufen, an|zu|rufen — el zu se "cuela" dentro.',
      explicacion: 'Muchos verbos (versuchen, anfangen, aufhören, vergessen, vorhaben…), adjetivos predicativos (es ist wichtig/schön/schwer…) y sustantivos (die Möglichkeit, die Zeit…) van seguidos de infinitivo con "zu". El "zu" se coloca directamente antes del infinitivo. Con verbos separables, "zu" se inserta entre el prefijo y la raíz: "aufzuhören", "einzukaufen", "anzurufen". No se usa "zu" después de verbos modales (ich muss gehen), ni tras lassen, sehen, hören, fühlen (estos toman infinitivo sin zu, con "Ersatzinfinitiv" en Perfekt).',
      ejemplos: [
        { de: 'Ich versuche, pünktlich zu sein.', es: 'Intento ser puntual.' },
        { de: 'Er hört auf zu rauchen.', es: 'Deja de fumar.' },
        { de: 'Es ist wichtig, gesund zu essen.', es: 'Es importante comer sano.' },
        { de: 'Sie hat keine Zeit, mich anzurufen.', es: 'No tiene tiempo de llamarme. (an|zu|rufen)' }
      ],
      tip: 'Con verbos separables el "zu" se cuela dentro: auf|zu|hören → aufzuhören. Piensa en él como si el "zu" "abriera" el verbo por su junta de separación. Practica con: anfangen, aufhören, versuchen, vergessen, vorhaben.'
    },
    {
      id: 'b1-09',
      titulo: 'Pasiva básica',
      subtitulo: 'werden + Partizip II',
      regla_base: 'werden (conjugado) + Partizip II al final. Agente opcional: von+Dativo. Perfekt de pasiva: ist … worden (sin ge-).',
      tabla: { headers: ['Tiempo', 'Estructura', 'Ejemplo'], rows: [['Präsens', 'wird + P.II', 'Das Haus wird gebaut.'], ['Präteritum', 'wurde + P.II', 'Das Haus wurde gebaut.'], ['Perfekt', 'ist + P.II + worden', 'Das Haus ist gebaut worden.']] },
      excepciones: 'Perfekt pasivo: worden (sin ge-), NO geworden. geworden es el P.II de werden como verbo pleno (convertirse). Este error es muy frecuente en B1.',
      explicacion: 'La voz pasiva (Vorgangspassiv) desplaza el foco del agente al proceso o resultado de la acción. Se forma con "werden" conjugado en el tiempo deseado más el Partizip II al final. El agente (¿por quién?) puede mencionarse con "von + Dativo" pero en alemán se omite con frecuencia. Conjugaciones de "werden": Präsens → wird; Präteritum → wurde; Perfekt → ist … worden (importante: "worden" sin "ge-"). En Konjunktiv II: würde … werden.',
      ejemplos: [
        { de: 'Das Haus wird gebaut. (Präsens)', es: 'La casa se está construyendo.' },
        { de: 'Das Buch wurde geschrieben. (Prät.)', es: 'El libro fue escrito.' },
        { de: 'Der Brief ist von ihm geschrieben worden.', es: 'La carta fue escrita por él. (Perf.)' },
        { de: 'Hier wird Deutsch gesprochen.', es: 'Aquí se habla alemán.' }
      ],
      tip: 'Pasiva perfecta: "ist … worden" (sin ge-), NO "geworden". "Geworden" es el participio de "werden" como verbo principal (sich verwandeln). Este error es uno de los más comunes en B1.'
    },
    {
      id: 'b1-10',
      titulo: 'Futuro',
      subtitulo: 'werden + Infinitivo / Präsens + Zeitangabe',
      regla_base: 'werden+Inf. para predicciones y suposiciones. Präsens+marcador temporal (morgen, bald…) para planes concretos — más natural en el habla.',
      excepciones: 'werden+Inf. también expresa suposición sobre el presente (uso epistémico): "Er wird schon zu Hause sein" = seguramente está en casa. El adverbio schon o wohl suele acompañarlo.',
      explicacion: 'El futuro en alemán tiene dos formas principales. La construcción "werden + Infinitivo" se usa para predicciones, promesas solemnes o probabilidades. Sin embargo, en la lengua hablada el Präsens con un marcador temporal (morgen, nächste Woche, bald) es igualmente válido y suena más natural para planes concretos. "Werden + Inf." también puede expresar suposición sobre el presente: "Er wird schon zu Hause sein" (Seguramente está en casa). Este uso epistémico de "werden" es muy frecuente en B1.',
      ejemplos: [
        { de: 'Ich werde morgen arbeiten.', es: 'Trabajaré mañana.' },
        { de: 'Es wird regnen. (predicción)', es: 'Lloverá.' },
        { de: 'Morgen fahre ich nach München. (Präsens)', es: 'Mañana voy a Múnich.' },
        { de: 'Er wird schon zu Hause sein.', es: 'Seguramente estará en casa. (suposición)' }
      ],
      tip: '"Werden + Inf." también expresa suposición en presente: "Das wird teuer sein" (Eso debe de ser caro). Si "werden" expresa suposición, el adverbio "schon" o "wohl" suele acompañarlo.'
    },
    {
      id: 'b1-11',
      titulo: 'Plusquamperfekt',
      subtitulo: 'el pasado del pasado',
      regla_base: 'hatte/war (Präteritum de haben/sein) + Partizip II. Expresa una acción anterior a otra ya pasada, típicamente junto a "nachdem".',
      tabla: { headers: ['', 'mit haben', 'mit sein'], rows: [['ich/er', 'hatte gelernt', 'war gefahren'], ['du', 'hattest gelernt', 'warst gefahren'], ['wir/sie', 'hatten gelernt', 'waren gefahren'], ['ihr', 'hattet gelernt', 'wart gefahren']] },
      excepciones: 'Se usa el mismo verbo auxiliar (haben o sein) que en el Perfekt de ese verbo — si un verbo forma su Perfekt con "sein" (fahren → ist gefahren), su Plusquamperfekt también usa "war" (war gefahren).',
      explicacion: 'El Plusquamperfekt (pluscuamperfecto) expresa una acción que ya había terminado antes de que ocurriera otra acción pasada — es "el pasado del pasado". Se forma igual que el Perfekt de `b1-01`, pero con el auxiliar en Präteritum en vez de en Präsens: hatte/war + Partizip II. Aparece muy frecuentemente junto al conector "nachdem" (`b1-06`), que exige que la acción de su subordinada sea anterior a la de la principal: "Nachdem ich gegessen hatte, ging ich ins Bett" — primero comí (Plusquamperfekt), después me fui a la cama (Präteritum).',
      ejemplos: [
        { de: 'Nachdem ich gegessen hatte, ging ich ins Bett.', es: 'Después de haber comido, me fui a la cama.' },
        { de: 'Sie war schon weggefahren, als ich ankam.', es: 'Ella ya se había ido cuando llegué.' },
        { de: 'Wir hatten das Buch schon gelesen.', es: 'Ya habíamos leído el libro.' },
        { de: 'Er hatte nichts gegessen, bevor er kam.', es: 'No había comido nada antes de venir.' }
      ],
      tip: 'Piensa en el Plusquamperfekt como "un paso más atrás" que el Präteritum: si la frase principal ya está en pasado, la acción anterior a ella necesita Plusquamperfekt, casi siempre introducida por "nachdem".'
    },
    {
      id: 'b1-12',
      titulo: 'Wenn vs. als (repaso ampliado)',
      subtitulo: 'condición/repetición vs. momento único pasado',
      regla_base: '"als" solo para un evento único y concreto en el pasado. "wenn" para todo lo demás: condiciones (cualquier tiempo) y acciones repetidas (incluido el pasado).',
      tabla: { headers: ['Situación', 'Conector', 'Ejemplo'], rows: [['Condición (presente/futuro)', 'wenn', 'Wenn es regnet, bleibe ich zu Hause.'], ['Repetición en pasado', 'wenn', 'Wenn ich Kind war, spielte ich viel.'], ['Momento único en pasado', 'als', 'Als ich 18 war, zog ich um.']] },
      excepciones: 'La trampa más común: con acciones repetidas en pasado se usa "wenn" (no "als"), aunque toda la frase esté en pasado — el criterio no es el tiempo verbal sino si el evento fue único o repetido.',
      explicacion: 'Esta regla amplía `b1-06`, donde "wenn" y "als" se presentaron por primera vez. La distinción real no depende del tiempo verbal, sino de si la acción fue un evento único o uno repetido/habitual. "Als" se usa exclusivamente para un momento concreto y no repetible en el pasado ("Als ich sie kennenlernte…" — el día en que la conocí, solo pasó una vez). "Wenn" cubre todo lo demás: condiciones en cualquier tiempo ("Wenn ich Zeit habe…") y acciones habituales o repetidas, incluso en pasado ("Wenn ich Kind war, spielte ich jeden Tag draußen" — pasaba muchas veces, no una sola).',
      ejemplos: [
        { de: 'Als ich sie kennenlernte, war ich 20.', es: 'Cuando la conocí, tenía 20 años. (único, pasado)' },
        { de: 'Wenn ich Kind war, spielte ich viel draußen.', es: 'Cuando era niño, jugaba mucho fuera. (repetido, pasado)' },
        { de: 'Wenn du Zeit hast, ruf mich an.', es: 'Cuando tengas tiempo, llámame. (condición)' },
        { de: 'Immer wenn es regnete, blieben wir zu Hause.', es: 'Siempre que llovía, nos quedábamos en casa. (repetido)' }
      ],
      tip: 'Pregúntate: ¿pasó una sola vez en el pasado? → als. ¿Pasó varias veces, o no es pasado? → wenn. "Immer wenn…" (siempre que…) es una señal clara de que toca "wenn", nunca "als".'
    },
    {
      id: 'b1-13',
      titulo: 'Preguntas indirectas',
      subtitulo: 'ob / W-Wort + verbo al final',
      regla_base: 'Una pregunta directa se convierte en subordinada: si tenía sí/no, se introduce con "ob"; si tenía W-Wort (was, wo, wann…), se mantiene el W-Wort. El verbo pasa al final.',
      tabla: { headers: ['Pregunta directa', 'Pregunta indirecta'], rows: [['Kommt er?', 'Ich weiß nicht, ob er kommt.'], ['Wo wohnst du?', 'Sag mir, wo du wohnst.'], ['Wann beginnt der Kurs?', 'Ich frage mich, wann der Kurs beginnt.']] },
      excepciones: 'Nunca se usa el orden de pregunta directa (verbo en 2ª posición) dentro de la indirecta — el error típico es decir "ob kommt er" en vez de "ob er kommt".',
      explicacion: 'Las preguntas indirectas se usan para reportar o preguntar algo de forma más cortés o dentro de otra frase (Ich weiß nicht…, Können Sie mir sagen…, Ich frage mich…). Si la pregunta original era de sí/no (Ja/Nein-Frage), la subordinada se introduce con "ob" (si). Si la pregunta original tenía una palabra interrogativa (W-Frage: was, wer, wo, wann, warum, wie…), esa misma palabra introduce la subordinada. En ambos casos, como es una subordinada, el verbo conjugado se coloca al final — igual que con "weil" o "dass" (`b1-06`).',
      ejemplos: [
        { de: 'Weißt du, ob das Geschäft heute offen ist?', es: '¿Sabes si la tienda está abierta hoy?' },
        { de: 'Können Sie mir sagen, wo der Bahnhof ist?', es: '¿Puede decirme dónde está la estación?' },
        { de: 'Ich frage mich, warum er nicht angerufen hat.', es: 'Me pregunto por qué no ha llamado.' },
        { de: 'Er wollte wissen, wann wir ankommen.', es: 'Quería saber cuándo llegamos.' }
      ],
      tip: 'Formas corteses típicas para introducir preguntas indirectas: "Wissen Sie, ob/wo/wann…?", "Können Sie mir sagen, ob/wo/wann…?", "Ich frage mich, ob/wo/wann…". Recuerda: el verbo siempre al final.'
    },
    {
      id: 'b1-14',
      titulo: 'Infinitivo sin "zu"',
      subtitulo: 'modales, lassen, sehen, hören, gehen+Inf.',
      regla_base: 'Contraste con `b1-08`: modales, lassen, sehen, hören, fühlen y verbos de movimiento (gehen, kommen, fahren) van seguidos de infinitivo SIN "zu".',
      tabla: { headers: ['Verbo', 'Ejemplo'], rows: [['modal', 'Ich muss gehen.'], ['lassen', 'Ich lasse das Auto reparieren.'], ['sehen/hören', 'Ich sehe ihn kommen.'], ['gehen/kommen', 'Wir gehen schwimmen.']] },
      excepciones: 'En Perfekt, los modales y "lassen/sehen/hören" usan el llamado Ersatzinfinitiv (doble infinitivo) en vez del Partizip II: "Ich habe gehen müssen" (no "gemusst"), "Ich habe ihn kommen sehen" (no "gesehen").',
      explicacion: 'Esta regla es el contraste directo de `b1-08` (infinitivo CON zu). Un grupo cerrado de verbos toma el infinitivo directamente, sin "zu": los verbos modales (können, müssen, wollen…), "lassen" (mandar hacer algo, causativo — ver también `b1-28` en niveles superiores), los verbos de percepción "sehen", "hören", "fühlen", y los verbos de movimiento "gehen", "kommen", "fahren" cuando van seguidos de otra actividad ("schwimmen gehen", "einkaufen fahren"). Un detalle avanzado: en Perfekt, con modales y con lassen/sehen/hören, no se usa el Partizip II normal sino el llamado "Ersatzinfinitiv" — el propio infinitivo ocupa el lugar del participio: "Ich habe nicht kommen können" (no "gekonnt kommen").',
      ejemplos: [
        { de: 'Ich muss heute arbeiten.', es: 'Tengo que trabajar hoy.' },
        { de: 'Er lässt sein Auto reparieren.', es: 'Manda reparar su coche.' },
        { de: 'Ich höre die Vögel singen.', es: 'Oigo cantar a los pájaros.' },
        { de: 'Wir gehen heute Abend tanzen.', es: 'Esta noche vamos a bailar.' }
      ],
      tip: 'Compáralo siempre con `b1-08`: "versuchen ZU kommen" (con zu) frente a "muss kommen", "lässt kommen", "sieht kommen" (sin zu). Estos últimos son un grupo cerrado de verbos que hay que memorizar.'
    },
    {
      id: 'b1-15',
      titulo: 'Relativsätze mit Präposition',
      subtitulo: 'der Mann, mit dem ich spreche…',
      regla_base: 'Extiende `b1-03`: si el verbo de la relativa exige preposición, esta se coloca delante del pronombre relativo, que toma el caso que rige esa preposición (no el de su función habitual).',
      tabla: { headers: ['Antecedente', 'Prep. + Caso', 'Ejemplo'], rows: [['persona (masc.)', 'mit + Dat.', 'der Mann, mit dem ich spreche'], ['persona (fem.)', 'für + Akk.', 'die Frau, für die ich arbeite'], ['cosa/idea', 'über + Akk.', 'das Buch, über das wir sprechen']] },
      excepciones: 'Con antecedente neutro/cosa abstracta e indefinida (algo genérico, "alles was", "das, worüber…") se puede usar wo(r)+prep. en vez de prep.+pronombre relativo, pero en B1 basta con dominar la forma con pronombre.',
      explicacion: 'Cuando el verbo de la oración de relativo (`b1-03`) exige una preposición fija (como los verbos de `b1-07`: sprechen über, warten auf, sich freuen auf…), esa preposición no desaparece: se coloca inmediatamente delante del pronombre relativo. El pronombre relativo ya no toma el caso de su función lógica en la frase, sino el caso que esa preposición exige. El género y número del pronombre siguen dependiendo del antecedente, exactamente igual que en `b1-03`.',
      ejemplos: [
        { de: 'Der Mann, mit dem ich spreche, ist mein Kollege.', es: 'El hombre con el que hablo es mi colega.' },
        { de: 'Das ist die Firma, für die ich arbeite.', es: 'Esta es la empresa para la que trabajo.' },
        { de: 'Das Thema, über das wir sprechen, ist wichtig.', es: 'El tema del que hablamos es importante.' },
        { de: 'Die Freunde, auf die ich warte, kommen gleich.', es: 'Los amigos que espero llegan enseguida.' }
      ],
      tip: 'Primero identifica el verbo de la subordinada y su preposición fija (`b1-07`: warten AUF, sich freuen AUF, sprechen ÜBER…), luego pon esa misma preposición delante del pronombre relativo correcto.'
    },
    {
      id: 'b1-16',
      titulo: 'Vergleichssätze: je...desto',
      subtitulo: 'cuanto más… (más/menos)',
      regla_base: '"je" + comparativo + verbo al final (subordinada), "desto" + comparativo + verbo en 2ª posición (principal). Ambas partes usan el adjetivo/adverbio en comparativo.',
      tabla: { headers: ['', 'Estructura', 'Orden del verbo'], rows: [['je-parte', 'je + comparativo + …', 'verbo al final'], ['desto-parte', 'desto + comparativo + verbo + …', 'verbo en 2ª posición']] },
      excepciones: 'No confundir con "umso", sinónimo de "desto" en la segunda parte (je…, umso…) — ambas formas son correctas e intercambiables.',
      explicacion: 'La estructura "je…, desto…" (cuanto más…, tanto más…) compara dos hechos que aumentan o disminuyen en paralelo. La primera parte, introducida por "je", es una oración subordinada: el verbo va al final, como con "weil" o "wenn" (`b1-06`). La segunda parte, introducida por "desto" (o su sinónimo "umso"), es la oración principal: el verbo conjugado ocupa la segunda posición, justo después de "desto + comparativo". Tanto tras "je" como tras "desto" va siempre la forma comparativa del adjetivo o adverbio (más, mehr, größer, schneller…).',
      ejemplos: [
        { de: 'Je mehr ich lerne, desto besser verstehe ich es.', es: 'Cuanto más estudio, mejor lo entiendo.' },
        { de: 'Je älter er wird, desto ruhiger wird er.', es: 'Cuanto más mayor se hace, más tranquilo se vuelve.' },
        { de: 'Je früher wir gehen, desto mehr Zeit haben wir.', es: 'Cuanto antes salgamos, más tiempo tendremos.' },
        { de: 'Je schneller du fährst, umso gefährlicher ist es.', es: 'Cuanto más rápido conduces, más peligroso es.' }
      ],
      tip: 'Recuerda el orden del verbo con esta imagen: en la parte "je" el verbo "se esconde" al final como en cualquier subordinada; en la parte "desto" el verbo "sale a saludar" justo después, como en cualquier principal.'
    },
    {
      id: 'b1-17',
      titulo: 'n-Deklination',
      subtitulo: 'sustantivos masculinos débiles: der Junge, den Jungen…',
      regla_base: 'Un grupo de sustantivos masculinos (mayormente personas y algunos animales) añade -n o -en en TODOS los casos excepto Nominativ singular.',
      tabla: { headers: ['', 'Nom.', 'Akk.', 'Dat.', 'Gen.'], rows: [['der Junge', 'der Junge', 'den Jungen', 'dem Jungen', 'des Jungen'], ['der Mensch', 'der Mensch', 'den Menschen', 'dem Menschen', 'des Menschen'], ['der Herr', 'der Herr', 'den Herrn', 'dem Herrn', 'des Herrn']] },
      excepciones: 'Grupo cerrado que hay que memorizar por sustantivo: personas/profesiones en -e (der Junge, der Kollege, der Kunde), varios en -ent/-ist/-and (der Student, der Polizist), y casos irregulares como der Herr (-n, no -en) y der Name (des Namens, con -s extra en genitivo).',
      explicacion: 'A diferencia de la mayoría de sustantivos masculinos, un grupo específico —principalmente personas y algunos seres vivos— añade la terminación -n o -en en Akkusativ, Dativ y Genitiv singular (y también en plural, donde ya coincide con la terminación normal). Solo el Nominativ singular queda sin terminación. Este patrón se llama "n-Deklination" o "schwache Maskulina" (masculinos débiles). Es un grupo cerrado que debe aprenderse sustantivo por sustantivo, típicamente al memorizar el vocabulario: der Junge (el chico), der Kollege (el colega), der Kunde (el cliente), der Mensch (el ser humano), der Student (el estudiante), der Polizist (el policía), der Herr (el señor, único con -n en vez de -en).',
      ejemplos: [
        { de: 'Der Junge spielt. / Ich sehe den Jungen.', es: 'El chico juega. / Veo al chico. (Nom. vs. Akk.)' },
        { de: 'Ich helfe dem Kollegen.', es: 'Ayudo al colega. (Dat.)' },
        { de: 'Das Auto des Kunden ist neu.', es: 'El coche del cliente es nuevo. (Gen.)' },
        { de: 'Guten Tag, Herr Müller! — Ich kenne Herrn Müller.', es: 'Buenos días, señor Müller. — Conozco al señor Müller.' }
      ],
      tip: 'Al aprender vocabulario nuevo de personas/profesiones masculinas terminadas en -e (der Kollege, der Kunde, der Junge…), memoriza directamente que llevan -n en los demás casos — así evitas el error clásico de dejarlas invariables.'
    },
    {
      id: 'b1-18',
      titulo: 'Adjektive als Nomen',
      subtitulo: 'der/die Jugendliche, das Beste, etwas Neues…',
      regla_base: 'Un adjetivo sustantivado se escribe con mayúscula pero se declina EXACTAMENTE como el adjetivo (`b1-05`), según lleve artículo definido, indefinido o ninguno.',
      tabla: { headers: ['Artículo', 'Ejemplo (der Jugendliche)', 'Terminación'], rows: [['definido', 'der Jugendliche / die Jugendliche', 'débil (-e)'], ['indefinido', 'ein Jugendlicher / eine Jugendliche', 'mixta (-er/-e)'], ['neutro genérico', 'etwas Neues / nichts Interessantes', 'fuerte (-es)']] },
      excepciones: 'Tras "etwas", "nichts", "viel", "wenig" el adjetivo sustantivado neutro lleva siempre la terminación fuerte -es (etwas Neues, nichts Besonderes), aunque estas palabras no sean artículos.',
      explicacion: 'En alemán, muchos adjetivos pueden funcionar como sustantivo sin cambiar de forma más que la mayúscula inicial y la terminación de declinación — se declinan exactamente igual que un adjetivo normal ante ese mismo sustantivo (`b1-05`). Para personas, el género indica sexo: "der/ein Jugendliche(r)" (el/un joven), "die/eine Jugendliche" (la/una joven). Para conceptos abstractos y generalizaciones se usa el género neutro: "das Beste" (lo mejor), "das Wichtigste" (lo más importante). Tras palabras indefinidas como "etwas", "nichts", "viel", "wenig" el adjetivo neutro sustantivado lleva terminación fuerte -es: "etwas Neues" (algo nuevo), "nichts Besonderes" (nada especial).',
      ejemplos: [
        { de: 'Der Jugendliche wartet auf den Bus.', es: 'El joven espera el autobús. (persona, def.)' },
        { de: 'Ich habe etwas Neues gelernt.', es: 'He aprendido algo nuevo. (neutro, tras etwas)' },
        { de: 'Das ist das Beste an diesem Job.', es: 'Eso es lo mejor de este trabajo. (concepto, def.)' },
        { de: 'Ein Bekannter hat mir das erzählt.', es: 'Un conocido me contó eso. (persona, indef.)' }
      ],
      tip: 'No memorices estas palabras como sustantivos nuevos e invariables: trátalas como el adjetivo que son y aplica la tabla de declinación de `b1-05` según el artículo que las acompañe.'
    },
    {
      id: 'b1-19',
      titulo: 'Präpositionaladverbien: da- und wo-',
      subtitulo: 'darauf, damit, davon… / worauf, womit, wovon…',
      regla_base: 'da(r)+prep. sustituye a "prep.+cosa/idea" (nunca personas). wo(r)+prep. pregunta o introduce una subordinada por esa misma cosa/idea: "Worauf wartest du?" — "Ich weiß nicht, worauf er wartet."',
      tabla: { headers: ['Función', 'Forma', 'Ejemplo'], rows: [['sustituir cosa/idea', 'da(r)+prep.', 'Ich warte darauf. (= auf den Bus)'], ['preguntar por cosa/idea', 'wo(r)+prep.', 'Worauf wartest du?'], ['subordinada indirecta', 'wo(r)+prep. + verbo final', 'Ich weiß nicht, worauf er wartet.']] },
      excepciones: 'Se añade una -r- de enlace cuando la preposición empieza por vocal: da+auf → darauf, wo+an → woran (no "daauf" ni "woan").',
      explicacion: 'Esta regla retoma `b1-07`: los verbos con preposición fija (warten auf, denken an, sich freuen über…) ya introdujeron da(r)+prep. como sustituto de "prep.+cosa". Aquí se completa el sistema con su pareja interrogativa: wo(r)+prep. Se usa para preguntar por una cosa o idea ("Woran denkst du?" — ¿en qué piensas?) y, exactamente igual que "ob"/W-Wort en `b1-13`, también para introducir una pregunta indirecta cuando el elemento por el que se pregunta es una cosa regida por preposición: "Ich frage mich, worüber sie sprechen" (me pregunto de qué hablan). Con personas nunca se usa da-/wo-: se usa pronombre o "wer" + preposición (an ihn, an wen).',
      ejemplos: [
        { de: 'Ich freue mich darauf. (= auf die Reise)', es: 'Me alegro por ello. (= por el viaje)' },
        { de: 'Woran denkst du gerade?', es: '¿En qué piensas ahora mismo?' },
        { de: 'Ich weiß nicht, womit er das gemacht hat.', es: 'No sé con qué hizo eso.' },
        { de: 'An wen denkst du? — An meinen Bruder.', es: '¿En quién piensas? — En mi hermano. (persona: sin wo-)' }
      ],
      tip: 'Regla rápida: ¿la preposición se refiere a una cosa/idea? → da-/wo-. ¿Se refiere a una persona? → pronombre normal o "wer". Y recuerda la -r- de enlace ante vocal: darauf, woran, darüber, worüber.'
    },
    {
      id: 'b1-20',
      titulo: 'Präpositionen mit Genitiv',
      subtitulo: 'während, wegen, trotz, innerhalb, außerhalb',
      regla_base: 'Estas preposiciones rigen Genitiv. En el habla coloquial, wegen/trotz se usan a menudo con Dativ, pero en B1 y en el examen se exige Genitiv.',
      tabla: { headers: ['Preposición', 'Significado', 'Ejemplo'], rows: [['während', 'durante', 'während des Kurses'], ['wegen', 'a causa de', 'wegen des Wetters'], ['trotz', 'a pesar de', 'trotz des Regens'], ['innerhalb', 'dentro de (tiempo/espacio)', 'innerhalb einer Woche'], ['außerhalb', 'fuera de', 'außerhalb der Stadt']] },
      excepciones: 'Con nombres propios y sustantivos sin artículo (sobre todo en plural) el Genitiv no siempre es visible; en la práctica se reconoce por el artículo/adjetivo: des/der + -(e)s en masculino/neutro singular.',
      explicacion: 'A diferencia de las preposiciones ya vistas con Akkusativ, Dativ o Wechselpräpositionen, este grupo rige siempre Genitiv: el sustantivo que sigue lleva artículo en Genitiv (des/der) y, en masculino/neutro singular, el propio sustantivo añade -(e)s. Son preposiciones frecuentes en textos formales y también en el habla: "während" (durante, simultaneidad), "wegen" (a causa de, causa), "trotz" (a pesar de, concesión — como versión nominal de "obwohl", `b1-06`), "innerhalb" y "außerhalb" (dentro de / fuera de, tanto en sentido temporal como espacial). En el alemán coloquial es común oír "wegen dem Wetter" o "trotz dem Regen" con Dativ, pero esa forma se considera incorrecta en el registro estándar y en los exámenes.',
      ejemplos: [
        { de: 'Während des Kurses war ich krank.', es: 'Durante el curso estuve enfermo.' },
        { de: 'Wegen des schlechten Wetters bleiben wir zu Hause.', es: 'A causa del mal tiempo nos quedamos en casa.' },
        { de: 'Trotz des Regens gehen wir spazieren.', es: 'A pesar de la lluvia salimos a pasear.' },
        { de: 'Der Bahnhof liegt außerhalb der Stadt.', es: 'La estación está fuera de la ciudad.' }
      ],
      tip: 'Memoriza estas 5 preposiciones como bloque "Genitiv-Gruppe" y practica siempre con el artículo: des Kurses, des Wetters, des Regens, einer Woche, der Stadt. En el examen, evita "wegen dem/trotz dem" aunque lo oigas en la calle.'
    },
    {
      id: 'b1-21',
      titulo: 'Temporale Präpositionen (Wiederholung und Erweiterung)',
      subtitulo: 'seit, vor, in, ab, bis + Dativ',
      regla_base: 'Preposiciones temporales de uso frecuente, todas con Dativ (excepto "bis", que suele ir sin artículo o combinada con "zu"): seit (desde), vor (hace), in (dentro de/en), ab (a partir de), bis (hasta).',
      tabla: { headers: ['Preposición', 'Significado', 'Ejemplo'], rows: [['seit', 'desde (hasta ahora)', 'seit einem Jahr'], ['vor', 'hace (en el pasado)', 'vor zwei Tagen'], ['in', 'dentro de / en (futuro)', 'in einer Woche'], ['ab', 'a partir de', 'ab nächstem Montag'], ['bis (zu)', 'hasta', 'bis Freitag / bis zum Freitag']] },
      excepciones: '"seit" con Präsens describe una acción que empezó en el pasado y sigue ahora — donde el español usa pretérito perfecto o "llevo + gerundio": "Ich lerne seit einem Jahr Deutsch" (Llevo un año aprendiendo alemán / He aprendido alemán desde hace un año), nunca Perfekt.',
      explicacion: 'Este grupo de preposiciones temporales de Dativ ya apareció suelto en `a2-05` (aus, bei, mit, nach, seit, von, zu) y en el vocabulario de nivel A2/B1, pero aquí se agrupan y se refuerza su uso porque suelen confundirse entre sí por su significado similar. "Seit" señala el punto de inicio de algo que continúa hasta el presente (y por eso se combina con Präsens, no con Perfekt, a diferencia del español). "Vor" señala una distancia hacia atrás desde ahora (hace X tiempo). "In" con expresión de tiempo señala una distancia hacia adelante desde ahora (dentro de X tiempo) — no confundir con el "in" locativo de las Wechselpräpositionen (`a2-06`). "Ab" marca el punto de arranque de algo futuro o programado. "Bis" marca el límite final y frecuentemente se combina con "zu" cuando lleva artículo: "bis zum Freitag".',
      ejemplos: [
        { de: 'Ich lerne seit einem Jahr Deutsch.', es: 'Llevo un año aprendiendo alemán.' },
        { de: 'Vor zwei Tagen habe ich sie getroffen.', es: 'Hace dos días la encontré.' },
        { de: 'In einer Woche fahre ich nach Berlin.', es: 'Dentro de una semana voy a Berlín.' },
        { de: 'Ab nächstem Montag arbeite ich hier.', es: 'A partir del próximo lunes trabajo aquí.' }
      ],
      tip: 'No traduzcas "seit" literalmente con Perfekt: en alemán, si la acción sigue en el presente, va en Präsens + seit ("Ich wohne seit drei Jahren hier"), aunque en español digamos "he vivido" o "llevo viviendo".'
    },
    {
      id: 'b1-22',
      titulo: 'Funktionen von werden',
      subtitulo: 'verbo pleno, futuro y pasiva',
      regla_base: '"werden" tiene tres funciones distintas: verbo pleno (+ Nominativ = convertirse en), futuro/suposición (+ Infinitivo, `b1-10`) y pasiva (+ Partizip II, `b1-09`). Se distinguen por lo que sigue a "werden".',
      tabla: { headers: ['Función', 'Estructura', 'Ejemplo'], rows: [['verbo pleno', 'werden + Nominativ/Adjektiv', 'Sie wird Ärztin.'], ['futuro/suposición', 'werden + Infinitiv', 'Ich werde anrufen.'], ['pasiva', 'werden + Partizip II', 'Das Auto wird repariert.']] },
      excepciones: 'El Partizip II de "werden" cambia según la función: como verbo pleno → geworden ("Sie ist Ärztin geworden"); como auxiliar de pasiva en Perfekt → worden, sin ge- (`b1-09`: "Das Auto ist repariert worden").',
      explicacion: 'Esta regla no introduce gramática nueva, sino que unifica y contrasta explícitamente las tres caras de "werden" que ya se vieron por separado en `b1-09` (pasiva) y `b1-10` (futuro), añadiendo la tercera función —el uso como verbo pleno con significado propio ("convertirse en", "llegar a ser")— que hasta ahora no tenía entrada propia. La clave para distinguirlas es mirar qué elemento acompaña a "werden": si va seguido de un sustantivo en Nominativ o un adjetivo, es verbo pleno (cambio de estado); si va seguido de un infinitivo, es futuro o suposición; si va seguido de un Partizip II, es pasiva. El Partizip II del propio "werden" también distingue las funciones: "geworden" cuando es verbo pleno, "worden" (sin ge-) cuando es auxiliar de pasiva en Perfekt.',
      ejemplos: [
        { de: 'Sie wird Ärztin. (verbo pleno)', es: 'Ella se hace/llega a ser médica.' },
        { de: 'Es wird kalt. (verbo pleno + adjetivo)', es: 'Está haciéndose frío.' },
        { de: 'Ich werde dich morgen anrufen. (futuro)', es: 'Te llamaré mañana.' },
        { de: 'Das Auto wird repariert. (pasiva)', es: 'El coche está siendo reparado.' }
      ],
      tip: 'Pregúntate qué va DESPUÉS de "werden": ¿Nominativ/Adjektiv? → verbo pleno. ¿Infinitivo? → futuro (`b1-10`). ¿Partizip II? → pasiva (`b1-09`). Esa sola pista resuelve la ambigüedad casi siempre.'
    },
    {
      id: 'b1-23',
      titulo: 'Trennbare vs. untrennbare Verben',
      subtitulo: 'prefijos separables e inseparables',
      regla_base: 'Prefijos SIEMPRE separables (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-…): llevan acento tónico y el prefijo se va al final en Präsens/Präteritum. Prefijos SIEMPRE inseparables (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-): sin acento, nunca se separan, sin "ge-" en Partizip II.',
      tabla: { headers: ['Tipo', 'Prefijos', 'Ejemplo'], rows: [['separable', 'ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-', 'Ich rufe dich an. / Ich habe angerufen.'], ['inseparable', 'be-, emp-, ent-, er-, ge-, miss-, ver-, zer-', 'Ich besuche dich. / Ich habe besucht.'], ['dual (según sentido)', 'durch-, über-, unter-, um-, wieder-, wider-', 'umfahren (atropellar) vs. umfahren (rodear)']] },
      excepciones: 'Un grupo de prefijos (durch-, über-, unter-, um-, wieder-, wider-) puede ser separable o inseparable según el significado: si el prefijo tiene sentido literal/espacial suele ser separable y tónico (Er fährt das Schild um = lo atropella); si tiene sentido figurado suele ser inseparable y átono (Er umfährt die Stadt = la rodea, evita pasar por ella).',
      explicacion: 'Esta regla precede lógicamente a `b1-07` en la secuencia de aprendizaje del verbo alemán: antes de combinar un verbo con su preposición fija conviene saber si su prefijo se separa o no. Los verbos con prefijo separable llevan el acento tónico en el prefijo, y en Präsens/Präteritum/Imperativ ese prefijo se desplaza al final de la frase, dejando la raíz conjugada en 2ª posición: "an|rufen" → "Ich rufe dich an." En Partizip II, el "ge-" se inserta entre el prefijo y la raíz: "angerufen". Los verbos con prefijo inseparable nunca separan el prefijo, este va átono, y su Partizip II NO lleva "ge-": "besuchen" → "besucht" (no "gebesucht"). Un tercer grupo de prefijos (durch-, über-, unter-, um-, wieder-, wider-) es "dual": el mismo prefijo puede ser separable o inseparable según si el verbo tiene un sentido literal/espacial (separable) o figurado/abstracto (inseparable) — este subgrupo se reconoce mejor por el contexto que por regla fija.',
      ejemplos: [
        { de: 'Ich stehe früh auf. / Ich bin früh aufgestanden.', es: 'Me levanto temprano. / Me levanté temprano. (separable)' },
        { de: 'Ich verstehe das Problem nicht. / Ich habe es nicht verstanden.', es: 'No entiendo el problema. / No lo entendí. (inseparable)' },
        { de: 'Er übersetzt den Text. (inseparable, figurado: traduce)', es: 'Él traduce el texto.' },
        { de: 'Die Fähre setzt uns über. (separable, literal: nos cruza)', es: 'El ferry nos lleva al otro lado.' }
      ],
      tip: 'Escucha dónde cae el acento al pronunciar el infinitivo: si suena fuerte en el prefijo (ÁNrufen), es separable; si suena fuerte en la raíz (beSUchen), es inseparable. Los 8 prefijos siempre inseparables (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-) conviene memorizarlos como bloque cerrado.'
    },
    {
      id: 'b1-24',
      titulo: 'Reflexivpronomen: Erweiterung',
      subtitulo: 'reflexivos con preposición fija y "einander"',
      regla_base: 'Extiende `a2-10`: muchos verbos reflexivos exigen además una preposición fija (sich interessieren FÜR, sich freuen AUF/ÜBER — patrón de `b1-07`). Para expresar reciprocidad ("el uno al otro") se usa "einander" en vez del reflexivo.',
      tabla: { headers: ['Verbo reflexivo + Präp.', 'Caso', 'Ejemplo'], rows: [['sich interessieren für', 'Akk.', 'Ich interessiere mich für Musik.'], ['sich freuen auf/über', 'Akk.', 'Ich freue mich auf die Ferien.'], ['sich verlieben in', 'Akk.', 'Er hat sich in sie verliebt.'], ['sich treffen mit', 'Dat.', 'Wir treffen uns mit Freunden.']] },
      excepciones: '"einander" es invariable (no concuerda con persona/número) y sustituye al reflexivo cuando la acción es mutua entre varios sujetos: "Sie helfen sich" es ambiguo (¿se ayudan a sí mismos o entre ellos?), mientras que "Sie helfen einander" es inequívocamente recíproco. Con preposición, "einander" se pega a ella: miteinander, füreinander.',
      explicacion: 'Esta regla amplía `a2-10` en dos direcciones. Primero, retoma el patrón de verbo+preposición fija de `b1-07` aplicado a verbos reflexivos: "sich interessieren FÜR", "sich freuen AUF/ÜBER", "sich verlieben IN", "sich treffen MIT" — el pronombre reflexivo concuerda con el sujeto como en `a2-10`, pero además hay que memorizar la preposición y el caso que exige, igual que con cualquier verbo de `b1-07`. Segundo, introduce "einander" (el uno al otro/entre sí) para expresar reciprocidad clara entre varios sujetos, evitando la ambigüedad del reflexivo simple con sujetos plurales. Combinado con preposición, "einander" se une a ella formando una sola palabra: "miteinander sprechen" (hablar entre sí), "füreinander da sein" (estar el uno para el otro).',
      ejemplos: [
        { de: 'Ich interessiere mich für Geschichte.', es: 'Me interesa la historia.' },
        { de: 'Wir haben uns über das Geschenk gefreut.', es: 'Nos alegramos por el regalo.' },
        { de: 'Sie kennen einander seit der Schule.', es: 'Se conocen desde el colegio. (recíproco)' },
        { de: 'Die Kollegen sprechen oft miteinander.', es: 'Los colegas hablan a menudo entre sí.' }
      ],
      tip: 'Aprende cada reflexivo con su preposición como bloque, igual que en `b1-07`: "sich freuen AUF/ÜBER", "sich interessieren FÜR". Y si la frase puede significar "a sí mismos" o "entre ellos", usa "einander" para dejar claro que es recíproco.'
    },
    {
      id: 'b1-25',
      titulo: 'Negationswörter',
      subtitulo: 'nicht mehr, noch nicht, noch nie, nie mehr',
      regla_base: 'nicht mehr = ya no (algo que era pero terminó). noch nicht = todavía no (algo que aún no empezó, pero se espera). noch nie = nunca (hasta ahora). nie mehr = nunca más.',
      tabla: { headers: ['Expresión', 'Significado', 'Ejemplo'], rows: [['nicht mehr', 'ya no', 'Ich rauche nicht mehr.'], ['noch nicht', 'todavía no', 'Er ist noch nicht da.'], ['noch nie', 'nunca (hasta ahora)', 'Ich war noch nie in Berlin.'], ['nie mehr', 'nunca más', 'Ich mache das nie mehr.']] },
      excepciones: 'Con un sustantivo (en vez de un verbo/adjetivo) "nicht mehr" se convierte en "kein… mehr": "Ich habe keine Zeit mehr" (ya no tengo tiempo) — no se dice "Ich habe nicht mehr Zeit" en este sentido.',
      explicacion: 'Estas cuatro combinaciones son las expresiones de negación temporal más frecuentes en B1 y suelen confundirse porque el español usa "ya no" y "todavía no" de forma parecida en ambos sentidos. "Nicht mehr" niega algo que antes era cierto y ahora ha dejado de serlo (un cambio de estado hacia el "no"). "Noch nicht" indica que algo esperado aún no ha ocurrido, pero se presupone que ocurrirá (un cambio de estado hacia el "sí" que todavía no llegó). "Noch nie" es la versión con "je/nie" del Perfekt de experiencia: nunca, en toda la vida hasta ahora. "Nie mehr" (o "nicht mehr… nie", menos frecuente) combina la negación definitiva con el futuro: nunca más va a pasar. Con sustantivos contables, "nicht mehr" se reemplaza por "kein… mehr".',
      ejemplos: [
        { de: 'Ich arbeite nicht mehr bei dieser Firma.', es: 'Ya no trabajo en esta empresa.' },
        { de: 'Die Prüfungsergebnisse sind noch nicht da.', es: 'Los resultados del examen todavía no están.' },
        { de: 'Ich war noch nie in Japan.', es: 'Nunca he estado en Japón.' },
        { de: 'Das mache ich nie mehr!', es: '¡Eso no lo vuelvo a hacer nunca más!' }
      ],
      tip: 'Pregúntate la dirección del cambio: ¿algo que ERA y dejó de ser? → nicht mehr / kein… mehr. ¿Algo que AÚN no es pero se espera? → noch nicht. Con "nie" siempre piensas en toda la vida hasta ahora (noch nie) o hacia el futuro (nie mehr).'
    },
    {
      id: 'b1-26',
      titulo: 'Lokale Adverbien: Position und Direktion',
      subtitulo: 'hier/dort/da vs. hierhin/dorthin/dahin',
      regla_base: '¿Wo? (posición, sin movimiento) → hier, dort, da. ¿Wohin? (dirección, con movimiento) → hierhin, dorthin, dahin (o hier-/dort- + her/hin separado: hier her, dort hin).',
      tabla: { headers: ['Pregunta', 'Adverbio', 'Ejemplo'], rows: [['Wo? (posición)', 'hier / dort / da', 'Ich bin hier.'], ['Wohin? (dirección)', 'hierhin / dorthin', 'Komm hierhin!'], ['Woher? (procedencia)', 'von hier / von dort', 'Ich komme von dort.']] },
      excepciones: 'En el habla coloquial es muy frecuente separar la dirección en dos palabras al final de la frase: "Ich gehe da hin" (en vez de "dahin"), igual que ocurre con los verbos separables — "hin" y "her" se comportan como un prefijo separable pospuesto.',
      explicacion: 'Esta regla extiende a los adverbios de lugar la misma distinción wo/wohin ya vista con las preposiciones (`a2-06` Wechselpräpositionen): "hier/dort/da" responden a la pregunta "wo?" (posición estática, sin movimiento), mientras que "hierhin/dorthin/dahin" responden a "wohin?" (dirección, con movimiento hacia ese lugar). El componente "-hin" indica alejamiento del hablante (dahin, dorthin) y "-her" indica acercamiento hacia el hablante (hierher, daher). En la lengua hablada, en vez de fusionar el adverbio con -hin/-her, es muy común dejarlos separados al final de la frase: "Wo gehst du hin?" en vez de "Wohin gehst du?", "Ich komme da her" en vez de "Ich komme daher".',
      ejemplos: [
        { de: 'Ich warte hier. (wo?)', es: 'Espero aquí. (posición)' },
        { de: 'Komm bitte hierher! (wohin?)', es: 'Ven aquí, por favor. (dirección hacia el hablante)' },
        { de: 'Geh dorthin! / Geh da hin!', es: '¡Ve ahí! (dirección, alejamiento)' },
        { de: 'Wo gehst du eigentlich hin?', es: '¿Adónde vas exactamente? (forma coloquial separada)' }
      ],
      tip: 'Regla rápida: si puedes preguntar "wo?" (sin verbo de movimiento claro), usa hier/dort/da. Si puedes preguntar "wohin?" (hay desplazamiento), añade -hin o -her. En el habla, separarlos al final ("da hin", "hier her") es tan correcto como fusionarlos.'
    },
    {
      id: 'b1-27',
      titulo: 'Positions- und Direktionsverben',
      subtitulo: 'stehen/stellen, sitzen/setzen, liegen/legen, hängen',
      regla_base: 'Verbo intransitivo (posición, Dativ, "wo?"): stehen, sitzen, liegen, hängen. Verbo transitivo (acción de colocar, Akkusativ, "wohin?"): stellen, setzen, legen, hängen.',
      tabla: { headers: ['Posición (wo? + Dat.)', 'Dirección (wohin? + Akk.)', 'Objeto típico'], rows: [['stehen (estar de pie)', 'stellen (poner de pie)', 'algo alto/estrecho: Glas, Lampe'], ['sitzen (estar sentado)', 'setzen (sentar)', 'personas, animales'], ['liegen (estar tumbado)', 'legen (tumbar/poner)', 'algo plano: Buch, Teller'], ['hängen (estar colgado)', 'hängen (colgar)', 'ropa, cuadros — mismo verbo, ambos usos']] },
      excepciones: '"hängen" es irregular en este sistema: usa la misma forma para ambos sentidos, pero conjuga distinto — intransitivo (posición) es fuerte: hängt/hing/gehangen; transitivo (dirección) es regular: hängt/hängte/gehängt.',
      explicacion: 'Este grupo de pares de verbos retoma directamente la distinción wo/wohin de las Wechselpräpositionen (`a2-06`) y de los adverbios locales (`b1-26`), pero aplicada al verbo mismo en vez de a la preposición o al adverbio. Los verbos intransitivos (stehen, sitzen, liegen, hängen) describen una posición ya existente, sin movimiento, y se combinan con preposición + Dativ: "Das Glas steht auf dem Tisch." Sus contrapartes transitivas (stellen, setzen, legen, hängen) describen la acción de colocar algo en esa posición, con movimiento, y se combinan con preposición + Akkusativ: "Ich stelle das Glas auf den Tisch." La elección del verbo depende también de la forma del objeto: algo alto y estrecho "steht/wird gestellt", algo plano "liegt/wird gelegt", una persona "sitzt/wird gesetzt".',
      ejemplos: [
        { de: 'Das Buch liegt auf dem Tisch. (Position, Dat.)', es: 'El libro está sobre la mesa. (posición)' },
        { de: 'Ich lege das Buch auf den Tisch. (Direktion, Akk.)', es: 'Pongo el libro sobre la mesa. (dirección)' },
        { de: 'Die Lampe steht in der Ecke.', es: 'La lámpara está en la esquina.' },
        { de: 'Er stellt die Lampe in die Ecke.', es: 'Él coloca la lámpara en la esquina.' }
      ],
      tip: 'Piensa primero en el objeto y su postura (¿de pie, sentado, tumbado, colgado?) para elegir el verbo correcto, y después en si hay movimiento (transitivo + Akk.) o no (intransitivo + Dat.) — exactamente el mismo criterio wo/wohin de `a2-06`.'
    },
    {
      id: 'b1-28',
      titulo: 'Das Verb lassen',
      subtitulo: 'causativo básico: mandar hacer / dejar hacer',
      regla_base: 'lassen + Akkusativ + Infinitiv (sin zu) = mandar/permitir que algo se haga. Con persona: "encargar a alguien que…". Con cosa: "mandar hacer algo".',
      tabla: { headers: ['Estructura', 'Sentido', 'Ejemplo'], rows: [['lassen + Person + Inf.', 'encargar / permitir a alguien', 'Ich lasse ihn arbeiten.'], ['lassen + Sache + Inf.', 'mandar hacer algo (a un tercero)', 'Ich lasse das Auto reparieren.'], ['lass mich/uns + Inf.', 'petición de permiso/invitación', 'Lass mich das erklären.']] },
      excepciones: 'No confundir con `c1-01` (lassen + sich + Inf.), que expresa POSIBILIDAD pasiva ("das lässt sich machen" = eso se puede hacer), no una orden ni un encargo. Aquí el sujeto de "lassen" es quien causa la acción, no quien la sufre.',
      explicacion: 'El verbo "lassen" ya apareció en `b1-14` dentro del grupo de verbos con infinitivo sin "zu". Esta regla profundiza en su uso más importante en ese grupo: el valor causativo. "Lassen + Akkusativo + Infinitivo" indica que el sujeto no realiza la acción él mismo, sino que hace que otra persona (o un servicio, como en la peluquería o el taller) la realice: "Ich lasse mein Auto reparieren" no significa que yo repare el coche, sino que encargo a alguien que lo haga. Con un complemento de persona puede significar también "permitir": "Ich lasse ihn spielen" (le dejo jugar). En imperativo, "Lass mich/uns + Infinitivo" es una fórmula muy frecuente para pedir permiso o proponer algo juntos: "Lass uns gehen!" (¡Vámonos!).',
      ejemplos: [
        { de: 'Ich lasse mir die Haare schneiden.', es: 'Me corto el pelo. (mando que me lo corten)' },
        { de: 'Sie lässt ihre Kinder spät ins Bett gehen.', es: 'Deja que sus hijos se vayan tarde a la cama.' },
        { de: 'Lass mich in Ruhe!', es: '¡Déjame en paz!' },
        { de: 'Lass uns morgen ins Kino gehen.', es: 'Vamos al cine mañana. (propuesta)' }
      ],
      tip: 'Distíngelo de `c1-01`: aquí el sujeto de "lassen" CAUSA que algo pase ("mando hacer", "dejo que"), mientras que "lassen + sich" en C1 dice que algo ES POSIBLE de hacer, sin que nadie en concreto lo ordene.'
    },
    {
      id: 'b1-29',
      titulo: 'Finalsätze: um...zu / damit (B1)',
      subtitulo: 'para / para que — versión básica',
      regla_base: 'Mismo sujeto en las dos partes → um…zu + Infinitiv (sin sujeto propio en la segunda parte). Sujetos diferentes → damit + subordinada con el verbo al final.',
      tabla: { headers: ['Sujetos', 'Estructura', 'Ejemplo'], rows: [['iguales', 'um…zu + Inf.', 'Ich lerne, um besser zu sprechen.'], ['diferentes', 'damit + Nebensatz', 'Ich spreche langsam, damit du mich verstehst.']] },
      excepciones: 'Con "um…zu" nunca se repite el sujeto ni se conjuga un segundo verbo: es un simple infinitivo al final, no una subordinada completa. Error típico de B1: escribir "um ich lerne zu…" — así no funciona.',
      explicacion: 'Esta es la introducción básica a la finalidad (para qué se hace algo) que en niveles superiores se retoma como `b2-09` con más matices y ejemplos formales. En B1 basta con el criterio esencial: si el que estudia y el que aprueba son la misma persona, se usa la construcción corta "um…zu + Infinitivo", sin sujeto propio en la segunda parte. Si son personas distintas, hace falta una subordinada completa con su propio sujeto y verbo conjugado al final, introducida por "damit" — el mismo tipo de orden de verbo que ya se vio con "weil"/"dass" en `b1-06`.',
      ejemplos: [
        { de: 'Ich rufe an, um Hallo zu sagen.', es: 'Llamo para saludar. (mismo sujeto)' },
        { de: 'Er arbeitet viel, um Geld zu verdienen.', es: 'Trabaja mucho para ganar dinero.' },
        { de: 'Ich schreibe es auf, damit ich es nicht vergesse.', es: 'Lo apunto para no olvidarlo. (mismo sujeto también, pero con damit es igual de válido)' },
        { de: 'Die Mutter singt, damit das Baby einschläft.', es: 'La madre canta para que el bebé se duerma. (sujetos distintos)' }
      ],
      tip: 'Primero identifica el sujeto de las dos acciones. ¿Es la misma persona? → intenta "um…zu" primero, es más natural. ¿Son personas distintas? → "damit" es obligatorio, "um…zu" no funciona.'
    },
    {
      id: 'b1-30',
      titulo: 'Doppelkonnektoren (B1)',
      subtitulo: 'entweder…oder, weder…noch, sowohl…als auch',
      regla_base: 'Tres pares básicos de conectores dobles: entweder…oder (alternativa: o…o), weder…noch (doble negación: ni…ni), sowohl…als auch (suma: tanto…como).',
      tabla: { headers: ['Par', 'Significado', 'Ejemplo'], rows: [['entweder … oder', 'o … o', 'Entweder ich gehe, oder ich bleibe.'], ['weder … noch', 'ni … ni', 'Ich mag weder Kaffee noch Tee.'], ['sowohl … als auch', 'tanto … como', 'Er spricht sowohl Deutsch als auch Englisch.']] },
      excepciones: 'Con "weder…noch" el verbo se niega una sola vez a través de la estructura misma — no se añade además "nicht": "Ich mag weder Kaffee noch Tee" (no "Ich mag nicht weder…").',
      explicacion: 'Esta es la introducción básica a los conectores de dos partes, ampliada en niveles superiores como `b2-06` con más pares y matices de concordancia. En B1 conviene dominar primero los tres más frecuentes y útiles en la conversación cotidiana. "Entweder…oder" presenta dos opciones excluyentes entre las que hay que elegir. "Weder…noch" niega dos elementos a la vez, sin necesidad de "nicht" adicional. "Sowohl…als auch" suma dos elementos afirmativos con énfasis, más enfático que un simple "und". Cuando "entweder" o "weder" empiezan la frase, la palabra que sigue directamente puede ocupar la posición 1, empujando el verbo a la 2ª posición como en cualquier frase principal.',
      ejemplos: [
        { de: 'Entweder wir fahren mit dem Zug, oder wir fliegen.', es: 'O vamos en tren, o volamos.' },
        { de: 'Sie hat weder angerufen noch geschrieben.', es: 'No ha llamado ni ha escrito.' },
        { de: 'Das Hotel ist sowohl günstig als auch zentral.', es: 'El hotel es tanto barato como céntrico.' },
        { de: 'Weder er noch ich haben Zeit.', es: 'Ni él ni yo tenemos tiempo.' }
      ],
      tip: 'Memoriza los tres pares como bloques fijos, nunca se mezclan sus mitades: "entweder…oder", "weder…noch", "sowohl…als auch". Nunca digas "entweder…noch" ni "weder…oder".'
    },
    {
      id: 'b1-31',
      titulo: 'Partizip I als Adjektiv (B1)',
      subtitulo: 'acción en curso — versión básica',
      regla_base: 'Infinitivo + -d (schlafend, lachend) funciona como adjetivo delante de un sustantivo y se declina con las terminaciones normales de adjetivo (`b1-05`). Describe una acción que ocurre al mismo tiempo.',
      tabla: { headers: ['Infinitivo', 'Partizip I', 'Uso como adjetivo'], rows: [['schlafen', 'schlafend', 'das schlafende Kind'], ['lachen', 'lachend', 'die lachende Frau'], ['weinen', 'weinend', 'der weinende Junge']] },
      excepciones: 'No confundir con el gerundio español: "das schlafende Kind" no es "el niño durmiendo" como frase verbal, sino "el niño que duerme/está durmiendo" como adjetivo — se declina como cualquier adjetivo (`b1-05`), con -e, -en, -es según artículo, género y caso.',
      explicacion: 'Esta es la introducción básica al Partizip I como adjetivo, ampliada en `b2-03` con más ejemplos y contraste explícito con el Partizip II. En B1 conviene aprender la forma y el uso esencial: se construye añadiendo "-d" al infinitivo (schlafen → schlafend, lachen → lachend) y funciona exactamente como cualquier adjetivo atributivo delante de un sustantivo, siguiendo las mismas reglas de declinación de `b1-05` según lleve artículo definido, indefinido o ninguno. Expresa que la acción del verbo ocurre al mismo tiempo que la del verbo principal, con un sentido activo (a diferencia del Partizip II, que expresa resultado o pasiva, `b1-09`).',
      ejemplos: [
        { de: 'Das schlafende Kind liegt im Bett.', es: 'El niño que duerme está en la cama.' },
        { de: 'Ich sehe eine lachende Frau.', es: 'Veo a una mujer que ríe.' },
        { de: 'Ein weinendes Kind braucht Hilfe.', es: 'Un niño que llora necesita ayuda.' },
        { de: 'Die spielenden Kinder sind laut.', es: 'Los niños que juegan hacen ruido.' }
      ],
      tip: 'Fórmula simple: infinitivo + "-d" + terminación de adjetivo según `b1-05`. Piensa en él como una forma corta de decir "que + verbo": "das schlafende Kind" = "el niño que duerme".'
    }
  ],

  B2: [
    {
      id: 'b2-01',
      titulo: 'Konjunktiv I',
      subtitulo: 'discurso indirecto',
      regla_base: 'Discurso indirecto escrito (prensa, informes). Formado desde el infinitivo + -e/-est/-e/-en/-et/-en. Formas clave: sei, habe.',
      tabla: { headers: ['Verbo', 'er/sie/es Konj.I', 'Uso frecuente'], rows: [['sein', 'sei', 'Er sagt, er sei krank.'], ['haben', 'habe', 'Er meint, er habe keine Zeit.'], ['kommen', 'komme', 'Sie berichtet, er komme morgen.'], ['können', 'könne', 'Er erklärt, er könne helfen.']] },
      excepciones: 'Si la forma del Konj.I coincide con el Indikativ (muy frecuente en plural), se sustituye por Konj.II o würde+Inf.: "Sie sagten, sie würden kommen" (no *sie kommen).',
      explicacion: 'El Konjunktiv I se usa en la lengua escrita (prensa, literatura, informes) para reportar lo que alguien dijo o pensó sin que el narrador asuma responsabilidad de la veracidad. Se forma desde el infinitivo añadiendo las terminaciones -e/-est/-e/-en/-et/-en. Cuando una forma del Konjunktiv I coincide con el Indikativ (lo que ocurre frecuentemente en plural), se sustituye por el Konjunktiv II o por "würde + Inf.". Los verbos sein y haben tienen Konj. I propios muy usados: sei, habe.',
      ejemplos: [
        { de: 'Er sagt, er sei krank.', es: 'Dice que está enfermo.' },
        { de: 'Sie berichtet, das Wetter sei schön.', es: 'Informa de que el tiempo está bonito.' },
        { de: 'Er meinte, er habe keine Zeit gehabt.', es: 'Dijo que no había tenido tiempo.' },
        { de: 'Sie erklärte, sie würden kommen. (Konj.II sustituto)', es: 'Explicó que vendrían.' }
      ],
      tip: 'El Konjunktiv I es fundamentalmente escrito. En la prensa se ve sin "dass": "Der Minister erklärte, das Budget sei ausreichend." Reconocerlo te permitirá leer noticias con mayor fluidez.'
    },
    {
      id: 'b2-02',
      titulo: 'Konjunktiv II pasado',
      subtitulo: 'hipótesis irreales en el pasado',
      regla_base: 'hätte/wäre + Partizip II. Mismo criterio que Perfekt: movimiento/cambio de estado → wäre; resto → hätte. Equivale a "habría/hubiera hecho".',
      excepciones: 'Modales en pasado irreal: hätte + Inf. + Modal (siempre al final). hätte kommen können, hätte schreiben müssen, hätte gehen sollen.',
      explicacion: 'Para expresar situaciones que no ocurrieron pero podrían haber ocurrido, se usa "hätte/wäre + Partizip II". La elección entre hätte y wäre sigue la misma regla que en el Perfekt: verbos de movimiento/cambio de estado → wäre; los demás → hätte. En oraciones condicionales irreales en pasado: "Wenn + hätte/wäre + P.II, …hätte/wäre + P.II". Los verbos modales en este tiempo forman construcciones especiales: "hätte … können/müssen/sollen + Infinitivo". Este tiempo equivale al español "habría hecho / hubiera hecho".',
      ejemplos: [
        { de: 'Ich hätte das nicht gemacht.', es: 'No habría hecho eso.' },
        { de: 'Wenn ich mehr gelernt hätte, wäre ich nicht durchgefallen.', es: 'Si hubiera estudiado más, no habría suspendido.' },
        { de: 'Er wäre gern mitgekommen.', es: 'Habría venido de buena gana.' },
        { de: 'Das hätte ich wissen müssen.', es: 'Debería haberlo sabido.' }
      ],
      tip: 'Compara Perfekt vs. Konjunktiv II pasado: "Er hat gegessen" (comió) → "Er hätte gegessen" (habría comido). Solo cambia hat→hätte / ist→wäre. La estructura es idéntica.'
    },
    {
      id: 'b2-03',
      titulo: 'Partizip I como adjetivo',
      subtitulo: 'acción en curso o simultánea',
      regla_base: 'Infinitivo + -d (laufend, schlafend). Expresa acción activa simultánea. En posición atributiva se declina como adjetivo.',
      excepciones: 'Partizip I ≈ acción activa simultánea. Partizip II ≈ acción pasiva o completada: das laufende Programm (que corre) vs. das abgeschlossene Programm (finalizado).',
      explicacion: 'El Partizip I (Infinitiv + -d: laufend, schlafend, wachsend) puede usarse como adjetivo atributivo antes de un sustantivo, expresando una acción que ocurre simultáneamente o de forma continua. Se declina exactamente igual que cualquier otro adjetivo atributivo. En posición predicativa (tras sein) no se declina: "Das Kind schläft" → atrib.: "das schlafende Kind". Es muy frecuente en la lengua escrita y formal; en la hablada se prefieren oraciones de relativo.',
      ejemplos: [
        { de: 'das schlafende Kind', es: 'el niño que está durmiendo' },
        { de: 'die weinende Frau', es: 'la mujer que llora' },
        { de: 'ein wachsender Markt', es: 'un mercado en crecimiento' },
        { de: 'mit steigenden Kosten', es: 'con costes en aumento' }
      ],
      tip: 'Partizip I ≈ acción activa simultánea. Partizip II ≈ acción pasiva o completada. Compara: "das laufende Programm" (el programa que está corriendo) vs. "das abgeschlossene Programm" (el programa finalizado).'
    },
    {
      id: 'b2-04',
      titulo: 'Partizip II como adjetivo',
      subtitulo: 'acción completada / resultado',
      regla_base: 'Partizip II como adjetivo expresa resultado o estado pasivo. Se declina igual que cualquier adjetivo atributivo.',
      excepciones: 'En C1 puede llevar complementos propios antes del sustantivo: das von der Regierung beschlossene Gesetz. En B2 basta con los casos sin complementos.',
      explicacion: 'El Partizip II puede funcionar como adjetivo atributivo, expresando el resultado de una acción (sentido pasivo). Se declina con las mismas terminaciones que cualquier adjetivo. Puede tener sus propios complementos antes del sustantivo, formando el "atributo participial extendido" (erweitertes Partizipialattribut) típico de C1: "das von der Regierung beschlossene Gesetz". En B2 es suficiente con los casos sin complementos adicionales.',
      ejemplos: [
        { de: 'das geöffnete Fenster', es: 'la ventana abierta' },
        { de: 'ein gebratenes Hähnchen', es: 'un pollo asado' },
        { de: 'die unterschriebenen Dokumente', es: 'los documentos firmados' },
        { de: 'ein gut geschriebener Artikel', es: 'un artículo bien escrito' }
      ],
      tip: 'Para expandir con complementos: [artículo] + [complementos + P.II] + [sustantivo]. "das gestern gekaufte Buch" = el libro comprado ayer. Lee del sustantivo hacia atrás para entenderlo.'
    },
    {
      id: 'b2-05',
      titulo: 'Pasiva con agente',
      subtitulo: 'von (agente) / durch (medio o causa)',
      regla_base: 'von+Dativo para agentes animados. durch+Acusativo para medios o causas impersonales. Zustandspassiv: sein+P.II = estado resultante.',
      tabla: { headers: ['Estructura', 'Uso', 'Ejemplo'], rows: [['von + Dat.', 'agente animado', '…vom Architekten entworfen'], ['durch + Akk.', 'medio / causa', '…durch den Sturm zerstört'], ['sein + P.II', 'estado resultado (Zustands.)', 'Die Tür ist geöffnet.']] },
      explicacion: 'En la pasiva se puede especificar quién o qué realiza la acción. Para un agente animado (persona, animal, institución) se usa "von + Dativo". Para un medio, instrumento o causa impersonal se usa "durch + Acusativo". Además del Vorgangspassiv (werden + P.II, proceso), existe el Zustandspassiv (sein + P.II, resultado o estado resultante): "Die Tür wird geöffnet" (proceso) vs. "Die Tür ist geöffnet" (estado: la puerta está abierta). El Zustandspassiv describe el resultado, no la acción.',
      ejemplos: [
        { de: 'Das Haus wurde von einem Architekten entworfen.', es: 'La casa fue diseñada por un arquitecto. (von)' },
        { de: 'Das Fenster wurde durch den Sturm zerstört.', es: 'La ventana fue destruida por la tormenta. (durch)' },
        { de: 'Die Tür ist geöffnet.', es: 'La puerta está abierta. (Zustandspassiv)' },
        { de: 'Viele Jobs werden durch KI ersetzt.', es: 'Muchos trabajos son reemplazados por la IA.' }
      ],
      tip: '¿Agente animado? → von + Dat. ¿Instrumento o causa impersonal? → durch + Akk. ¿Estado resultante? → sein + P.II (Zustandspassiv). Las tres estructuras expresan cosas distintas.'
    },
    {
      id: 'b2-06',
      titulo: 'Conectores de dos partes',
      subtitulo: 'sowohl…als auch, weder…noch…',
      regla_base: 'Pares de conectores coordinantes que enlazan elementos equivalentes. Cada par tiene un matiz preciso que no puede sustituirse por otro.',
      tabla: { headers: ['Par', 'Significado'], rows: [['sowohl … als auch', 'tanto … como (suma)'], ['weder … noch', 'ni … ni (doble negación)'], ['entweder … oder', 'o … o (alternativa)'], ['nicht nur … sondern auch', 'no solo … sino también'], ['zwar … aber', 'bien es verdad … pero (concesión)']] },
      excepciones: 'Con weder…noch el verbo concuerda con el sujeto más cercano: "Weder er noch sie hat angerufen." Con sowohl…als auch puede ir en plural.',
      explicacion: 'Los conectores coordinantes de dos partes (zweiteilige Konjunktionen) enlazan dos elementos equivalentes. "Sowohl…als auch" (tanto…como): suma dos elementos afirmativos. "Weder…noch" (ni…ni): niega ambos. "Entweder…oder" (o…o): presenta alternativa exclusiva. "Nicht nur…sondern auch" (no solo…sino también): suma con énfasis. "Zwar…aber" (bien es cierto que…pero): admite un hecho y lo contrapone. La concordancia verbal es compleja: con "sowohl…als auch" el verbo puede ir en plural; con "weder…noch" se rige por el sujeto más cercano.',
      ejemplos: [
        { de: 'Sowohl er als auch sie kommen.', es: 'Tanto él como ella vienen.' },
        { de: 'Weder er noch sie hat angerufen.', es: 'Ni él ni ella llamó.' },
        { de: 'Entweder du kommst jetzt, oder du bleibst.', es: 'O vienes ahora o te quedas.' },
        { de: 'Nicht nur schnell, sondern auch günstig.', es: 'No solo rápido, sino también económico.' }
      ],
      tip: '"Zwar" introduce la concesión y siempre va en posición 1 o detrás del verbo: "Er ist zwar müde, aber er arbeitet weiter." El "aber" después de "zwar" es prácticamente obligatorio.'
    },
    {
      id: 'b2-07',
      titulo: 'Nominalizaciones',
      subtitulo: 'sustantivación de verbos y adjetivos',
      regla_base: 'Infinitivos sustantivados: siempre neutros (das Lesen), con mayúscula. Adjetivos nominalizados: declinación fuerte (der Kranke, das Gute).',
      excepciones: 'Sufijos muy productivos: -ung → die (die Lösung), -heit/-keit → die (die Freiheit), -schaft → die (die Freundschaft), -tum → das (das Wachstum), -ling → der (der Lehrling).',
      explicacion: 'El alemán nominaliza con gran frecuencia verbos e infinitivos, especialmente en el registro escrito y formal. Un infinitivo nominalizado es siempre neutro (das Lesen, das Schreiben, das Lernen) y se escribe con mayúscula. Puede ir como sujeto, objeto o en construcciones con preposición (beim Kochen, zum Lernen). Los adjetivos nominalizados siguen la declinación fuerte: "der Kranke" (el enfermo), "die Kranke", "das Gute" (lo bueno). Las nominalizaciones de verbos con sufijos son muy productivas: -ung (die Lösung, die Entscheidung), -heit/-keit (die Gesundheit, die Möglichkeit).',
      ejemplos: [
        { de: 'Das Lesen macht mir Spaß.', es: 'Leer / La lectura me divierte.' },
        { de: 'Beim Kochen hört er Musik.', es: 'Mientras cocina escucha música.' },
        { de: 'Das Beste daran ist…', es: 'Lo mejor de eso es…' },
        { de: 'die Entscheidung, die Möglichkeit', es: 'la decisión, la posibilidad (-ung, -keit)' }
      ],
      tip: 'Un infinitivo nominalizado siempre lleva mayúscula y artículo neutro "das". Si ves "das" seguido de una forma que parece un verbo con mayúscula, es una nominalización de infinitivo.'
    },
    {
      id: 'b2-08',
      titulo: 'Partículas modales',
      subtitulo: 'doch, mal, ja, eigentlich, eben, halt',
      regla_base: 'Añaden matiz pragmático o emocional. Van en el Mittelfeld (posición media), nunca al inicio. No tienen traducción directa — su valor depende del contexto.',
      tabla: { headers: ['Partícula', 'Matiz principal'], rows: [['doch', 'refuta negación / invita / consuela'], ['ja', 'algo compartido / conocido por ambos'], ['mal', 'suaviza una petición'], ['eben / halt', 'resignación — así son las cosas'], ['eigentlich', 'matización / ligera corrección']] },
      explicacion: 'Las Modalpartikeln (partículas modales) son palabras que añaden un matiz emocional o pragmático a la frase: actitud del hablante, nivel de certeza, sorpresa, impaciencia, consuelo, invitación… No tienen traducción directa; su significado cambia radicalmente según el contexto y la entonación. "Doch" refuta una negación o añade énfasis/exhortación. "Ja" marca algo como conocido por ambos interlocutores. "Mal" suaviza una petición. "Eben/halt" indica resignación. "Eigentlich" matiza o corrige ligeramente. Solo aparecen en el Mittelfeld (posición media) de la frase, nunca al inicio.',
      ejemplos: [
        { de: 'Komm doch mit!', es: '¡Venga, ven con nosotros!' },
        { de: 'Schau mal!', es: '¡Mira (un momento)!' },
        { de: 'Das weißt du ja.', es: 'Ya lo sabes (ambos lo sabemos).' },
        { de: 'Das ist eben so.', es: 'Así son las cosas (y no hay nada que hacer).' }
      ],
      tip: '"Doch" es la partícula más versátil: puede refutar ("Doch!" = ¡Sí que es!), invitar, consolar o añadir sorpresa. El mejor método para aprenderlas es escuchar series y podcasts alemanes en voz alta.'
    },
    {
      id: 'b2-09',
      titulo: 'Finalidad: um…zu / damit',
      subtitulo: 'para que / con el fin de',
      regla_base: 'Mismo sujeto en ambas frases → um…zu+Inf. Sujetos distintos → damit+subordinada (verbo al final).',
      excepciones: 'um…zu es imposible si los sujetos difieren. damit siempre funciona pero es más largo. "Ich erkläre es langsam, damit du es verstehst." — aquí um…zu sería incorrecto.',
      explicacion: '"Um…zu + Infinitivo" y "damit + Nebensatz" expresan finalidad (propósito). La elección entre ambos depende de si el sujeto de las dos frases es el mismo o diferente. Si el sujeto es el mismo: "um…zu + Infinitivo" (conciso, elegante). Si los sujetos son diferentes: "damit + subordinada con verbo al final". En ambos casos la estructura final puede ir antes o después de la frase principal. "Um…zu" es imposible si los sujetos difieren.',
      ejemplos: [
        { de: 'Ich lerne, um die Prüfung zu bestehen.', es: 'Estudio para aprobar el examen. (mismo sujeto)' },
        { de: 'Ich erkläre es langsam, damit du es verstehst.', es: 'Lo explico despacio para que tú lo entiendas. (sujetos distintos)' },
        { de: 'Er spart, um ein Haus zu kaufen.', es: 'Ahorra para comprar una casa.' },
        { de: 'Wir flüstern, damit das Kind schläft.', es: 'Hablamos bajo para que el niño duerma.' }
      ],
      tip: '¿Mismo sujeto en ambas frases? → um…zu. ¿Sujetos distintos? → damit + verbo al final. Esa es la única pregunta que necesitas hacerte en el 95% de los casos.'
    },
    {
      id: 'b2-10',
      titulo: 'Concesión y adversación',
      subtitulo: 'obwohl, trotzdem, dennoch, zwar…aber',
      regla_base: 'obwohl → verbo al final (subordinada). trotzdem/dennoch → V2 (frase principal). zwar…aber → coordinación.',
      tabla: { headers: ['Conector', 'Estructura', 'Ejemplo'], rows: [['obwohl', 'subordinada (verbo al final)', 'Obwohl es regnet, gehe ich raus.'], ['trotzdem', 'frase principal (V2)', 'Es regnet. Trotzdem gehe ich raus.'], ['dennoch', 'frase principal (V2)', 'Es ist schwer. Dennoch versuche ich es.'], ['zwar … aber', 'coordinación', 'Er ist zwar müde, aber er arbeitet.']] },
      excepciones: 'Confundir obwohl con trotzdem es el error más clásico en B2. Comprueba siempre el orden del verbo: ¿va al final? → obwohl. ¿Va en V2 después del conector? → trotzdem.',
      explicacion: 'Para expresar que algo ocurre a pesar de otra cosa el alemán ofrece varias estructuras. "Obwohl" + Nebensatz (verbo al final): la subordinada puede ir antes o después de la principal. "Trotzdem" y "dennoch" son adverbios conjuntivos que encabezan la frase principal siguiente (verbo en V2). "Zwar…aber" es un par coordinante dentro de la frase o entre dos frases. "Jedoch" y "allerdings" son alternativas formales a "aber" para la adversación. La diferencia entre "obwohl" y "trotzdem" es estructural: uno introduce subordinada, el otro encabeza frase principal.',
      ejemplos: [
        { de: 'Obwohl es regnet, gehen wir spazieren.', es: 'Aunque llueve, salimos a pasear.' },
        { de: 'Es regnet. Trotzdem gehen wir spazieren.', es: 'Llueve. Sin embargo, salimos a pasear.' },
        { de: 'Er ist zwar müde, aber er arbeitet weiter.', es: 'Está cansado, pero sigue trabajando.' },
        { de: 'Die Aufgabe ist schwer, dennoch versuche ich es.', es: 'La tarea es difícil; sin embargo lo intento.' }
      ],
      tip: '"Obwohl" → subordinada con verbo al final. "Trotzdem/dennoch" → frase principal con V2. Confundirlos es el error más clásico en B2. Comprueba siempre el orden del verbo.'
    }
  ],

  C1: [
    {
      id: 'c1-01',
      titulo: 'lassen + sich',
      subtitulo: 'posibilidad pasiva activa',
      regla_base: 'lassen+sich+Inf. expresa posibilidad o factibilidad (algo puede hacerse). Más conciso y elegante que la pasiva con werden.',
      excepciones: 'En negativo: lässt sich nicht+Inf. = imposibilidad. "Das lässt sich nicht rechtfertigen" = eso no tiene justificación. Muy usado en el habla culta formal.',
      explicacion: '"Lassen + sich + Infinitivo" es una construcción activa con valor pasivo-modal que expresa posibilidad o factibilidad: algo es posible de hacer (o no). Equivale a "se puede + Infinitivo" o "es posible + Infinitivo". A diferencia de la pasiva con "werden", esta construcción tiene un tono más general e impersonal y es muy frecuente en el alemán formal hablado y escrito. Comparar las tres opciones disponibles: "Man kann es machen" / "Es kann gemacht werden" (pasiva plena) / "Es lässt sich machen" (más concisa y elegante).',
      ejemplos: [
        { de: 'Das lässt sich machen.', es: 'Eso se puede hacer / es factible.' },
        { de: 'Das lässt sich nicht beweisen.', es: 'Eso no se puede demostrar.' },
        { de: 'Der Fehler lässt sich leicht beheben.', es: 'El error se puede corregir fácilmente.' },
        { de: 'Diese Frage lässt sich nicht so einfach beantworten.', es: 'Esta pregunta no es fácil de responder.' }
      ],
      tip: 'En negativo "lässt sich nicht + Inf." expresa imposibilidad o inviabilidad: "Das lässt sich nicht rechtfertigen" (Eso no tiene justificación). Es una expresión muy elegante para evitar la pasiva en el habla culta.'
    },
    {
      id: 'c1-02',
      titulo: 'sein + zu + Infinitivo',
      subtitulo: 'obligación o posibilidad pasiva',
      regla_base: 'sein+zu+Inf. expresa obligación (debe hacerse) o posibilidad (puede hacerse) según contexto. Propio del registro formal y escrito.',
      excepciones: 'Positivo: obligación o posibilidad. Negativo (nicht zu): imposibilidad o algo no recomendable. El contexto y la semántica del verbo determinan la interpretación.',
      explicacion: '"sein + zu + Infinitivo" es una construcción pasiva impersonal muy frecuente en textos legales, técnicos, administrativos y periodísticos. Expresa obligación (algo debe hacerse) o posibilidad (algo puede hacerse) según el contexto semántico. Es más concisa que "müssen/können + Passiv" y suena más formal. En negativo ("nicht zu + Inf.") expresa imposibilidad o algo no recomendable. La declinación de "sein" sigue el paradigma normal.',
      ejemplos: [
        { de: 'Das ist zu beachten.', es: 'Esto hay que tener en cuenta. (obligación)' },
        { de: 'Die Aufgabe ist bis morgen zu erledigen.', es: 'La tarea hay que terminarla para mañana.' },
        { de: 'Der Fehler ist kaum zu übersehen.', es: 'El error es difícil de pasar por alto. (posibilidad)' },
        { de: 'Diese Lösung ist nicht zu empfehlen.', es: 'Esta solución no es recomendable.' }
      ],
      tip: 'Positivo: "ist zu + Inf." → obligación o posibilidad. Negativo: "ist nicht zu + Inf." → imposibilidad o algo no recomendable. El contexto y la semántica del verbo determinan la interpretación.'
    },
    {
      id: 'c1-03',
      titulo: 'Atributo participial extendido',
      subtitulo: 'das von X beschlossene Gesetz',
      regla_base: '[artículo] + [complementos + participio] + [sustantivo]. Comprime una oración de relativo. Leer de derecha a izquierda: el sustantivo es el núcleo.',
      excepciones: 'Para producirlo: toma la relativa → quita el pronombre relativo y auxiliar → convierte el verbo al participio → insértalo. "die Frage, die seit Jahren diskutiert wird" → "die seit Jahren diskutierte Frage".',
      explicacion: 'El atributo participial extendido (erweitertes Partizipialattribut) inserta entre el artículo y el sustantivo un participio acompañado de sus propios complementos. Es una estructura que "comprime" una oración de relativo en un grupo nominal. La estrategia de lectura: identificar el artículo, saltar al sustantivo (al final del grupo) y luego interpretar todo lo intermedio como un modificador de ese sustantivo. Esta estructura es omnipresente en el alemán escrito culto y en los textos de examen.',
      ejemplos: [
        { de: 'das von der Regierung beschlossene Gesetz', es: 'la ley aprobada por el gobierno' },
        { de: 'ein in Deutschland hergestelltes Produkt', es: 'un producto fabricado en Alemania' },
        { de: 'die seit Jahren diskutierte Frage', es: 'la cuestión debatida desde hace años' },
        { de: 'der auf dem Tisch liegende Brief', es: 'la carta que está sobre la mesa' }
      ],
      tip: 'Para producirlo: toma la oración de relativo → quita el pronombre relativo y el auxiliar → convierte el verbo al participio correspondiente → insértalo entre artículo y sustantivo. "die Frage, die seit Jahren diskutiert wird" → "die seit Jahren diskutierte Frage".'
    },
    {
      id: 'c1-04',
      titulo: 'Colocaciones verbonominales',
      subtitulo: 'Funktionsverbgefüge',
      regla_base: 'Verbo+sustantivo formando unidad de significado equivalente a un verbo simple. Propios del registro formal. No se traducen literalmente.',
      tabla: { headers: ['FVG', 'Equivalente simple'], rows: [['in Frage stellen', 'bezweifeln (cuestionar)'], ['zur Verfügung stehen', 'verfügbar sein (estar disponible)'], ['eine Entscheidung treffen', 'entscheiden (decidir)'], ['in Betracht ziehen', 'berücksichtigen (considerar)'], ['zum Ausdruck bringen', 'ausdrücken (expresar)']] },
      explicacion: 'Los Funktionsverbgefüge son combinaciones fijas de verbo + sustantivo (en acusativo o con preposición) que forman una unidad de significado equivalente a un verbo simple. Son muy frecuentes en el registro formal y administrativo. La ventaja sobre el verbo simple es la precisión de matiz o el registro más elevado que aportan. No admiten sustitución de sus partes ni traducción literal. El sustantivo nuclear es siempre el semánticamente relevante; el verbo (stellen, bringen, nehmen, kommen, stehen, treffen…) aporta el aspecto o la dirección de la acción.',
      ejemplos: [
        { de: 'in Frage stellen', es: 'cuestionar, poner en tela de juicio' },
        { de: 'zur Verfügung stehen/stellen', es: 'estar/poner a disposición' },
        { de: 'Kritik üben an + Dat.', es: 'ejercer crítica sobre, criticar' },
        { de: 'eine Entscheidung treffen', es: 'tomar una decisión' }
      ],
      tip: 'Aprende estos bloques como unidades léxicas: "in Frage stellen", "in Betracht ziehen", "zum Ausdruck bringen", "unter Druck setzen". En escritura formal suenan más precisos que el verbo simple equivalente.'
    },
    {
      id: 'c1-05',
      titulo: 'Irrealis del pasado con modales',
      subtitulo: 'hätte … können/müssen/sollen',
      regla_base: 'hätte + Infinitivo + Modal (siempre al final). Evalúa retrospectivamente posibilidades u obligaciones no cumplidas.',
      tabla: { headers: ['Estructura', 'Matiz'], rows: [['hätte … können', 'posibilidad desperdiciada'], ['hätte … müssen', 'obligación incumplida'], ['hätte … sollen', 'reproche'], ['wäre … geworden', 'transformación no ocurrida']] },
      explicacion: 'Cuando se combina el Konjunktiv II del pasado con verbos modales se expresan valoraciones retrospectivas: algo que podría, debería o tendría que haber ocurrido pero no ocurrió. La estructura es "hätte + Infinitivo + Modal". El orden en la subordinada puede variar pero el modal siempre va al final. En frases principales: "Er hätte kommen können" (Podría haber venido). "Hätte … sollen" implica reproche; "hätte … können" implica posibilidad desperdiciada; "hätte … müssen" implica obligación no cumplida.',
      ejemplos: [
        { de: 'Wenn ich das gewusst hätte, wäre ich nicht gegangen.', es: 'Si lo hubiera sabido, no habría ido.' },
        { de: 'Du hättest mich anrufen sollen!', es: '¡Deberías haberme llamado! (reproche)' },
        { de: 'Er hätte das vermeiden können.', es: 'Podría haberlo evitado. (posibilidad perdida)' },
        { de: 'Wäre ich früher aufgestanden, hätte ich den Zug nicht verpasst.', es: 'Si me hubiera levantado antes, no habría perdido el tren.' }
      ],
      tip: 'Modal en pasado irreal: hätte + Inf. + können/sollen/müssen. El modal va SIEMPRE al final. "hätte sollen" = reproche. "hätte können" = posibilidad perdida. "hätte müssen" = obligación incumplida.'
    },
    {
      id: 'c1-06',
      titulo: 'Strukturen mit Ersatzinfinitiv',
      subtitulo: 'hat sehen / hat lassen / hat können',
      regla_base: 'Modales, lassen, sehen, hören en Perfekt usan infinitivo en lugar de Partizip II (Ersatzinfinitiv): hat kommen können, hat tun lassen.',
      excepciones: 'Produce doble infinitivo al final: "Er hat es tun lassen." En subordinada el orden: objeto + inf. + auxiliar + modal → "weil er es hat tun müssen."',
      explicacion: 'Cuando los verbos modales, "lassen", "sehen", "hören" y "fühlen" aparecen en Perfekt o Plusquamperfekt, no forman un Partizip II normal sino que usan el infinitivo como sustituto (Ersatzinfinitiv). Por eso aparecen dos infinitivos seguidos al final de la frase: "hat kommen können", "hat es tun lassen", "hat ihn kommen sehen". Esto produce el complejo "Verbklammeranhäufung" (acumulación de verbos al final) típico del alemán formal escrito. El orden en subordinadas con modal: objeto → P.II/Inf. → auxiliar → modal.',
      ejemplos: [
        { de: 'Er hat es nicht kommen sehen.', es: 'No lo vio venir. (sehen → Ersatzinf.)' },
        { de: 'Sie hat ihn gehen lassen.', es: 'Ella lo dejó irse. (lassen → Ersatzinf.)' },
        { de: 'Ich habe das tun wollen.', es: 'Quise hacer eso. (wollen → Ersatzinf.)' },
        { de: 'Weil er es hat tun müssen, …', es: 'Porque tuvo que hacerlo, … (subordinada)' }
      ],
      tip: 'Regla del Ersatzinfinitiv: si un modal/lassen/sehen/hören funciona como auxiliar en Perfekt, usa infinitivo, no Partizip II. "hat gemacht" (normal) vs. "hat machen lassen" (Ersatzinf.).'
    },
    {
      id: 'c1-07',
      titulo: 'Formación de palabras: compuestos',
      subtitulo: 'Komposita — cómo interpretar la cadena',
      regla_base: 'Género = el del último elemento (núcleo). Significado = modificador + núcleo. Para interpretar, lee de derecha a izquierda.',
      excepciones: 'Fugenzeichen (vocal/consonante de enlace): -s- (Bundestagswahl), -en- (Kinderwagen), -e- (Hundeleine). No añaden significado; son puramente fonéticos.',
      explicacion: 'El alemán puede crear sustantivos compuestos casi sin límite uniendo dos o más palabras. El género del compuesto es siempre el del último elemento (el núcleo). El primer elemento modifica al segundo. Para interpretarlos, ve de derecha a izquierda: el núcleo está al final. Entre los elementos puede aparecer una vocal o consonante de enlace (Fugenzeichen): -s- (Bundestagswahl), -en- (Kinderwagen), -e- (Hundeleine). Los compuestos permiten comprimir oraciones enteras en una sola palabra, lo que los hace omnipresentes en el alemán técnico, periodístico y administrativo.',
      ejemplos: [
        { de: 'die Haustür', es: 'la puerta de la casa (Haus + Tür → fem.)' },
        { de: 'der Krankenversicherungsbeitrag', es: 'la cotización al seguro de enfermedad' },
        { de: 'die Bundestagswahl', es: 'las elecciones al Bundestag (-s- de enlace)' },
        { de: 'das Handtuch', es: 'la toalla (Hand + Tuch → neutro)' }
      ],
      tip: 'Cuando encuentres un compuesto desconocido, divídelo por sus partes morfológicas. El sentido global es [modificador + núcleo]. "Krankenversicherung" = Kranken + Versicherung = seguro para enfermos.'
    },
    {
      id: 'c1-08',
      titulo: 'Partículas de evidencialidad',
      subtitulo: 'soll, will, dürfte — fuente de información',
      regla_base: 'Modales como marcadores de fuente: soll = otros dicen · will = el sujeto afirma · dürfte = el hablante estima · müsste = cálculo lógico.',
      tabla: { headers: ['Modal', 'Fuente de info.', 'Ejemplo'], rows: [['soll', 'fuentes externas', 'Er soll sehr reich sein.'], ['will', 'el propio sujeto afirma', 'Sie will das nicht gewusst haben.'], ['dürfte', 'estimación del hablante', 'Das dürfte schwierig sein.'], ['müsste', 'lógicamente debería', 'Es müsste jetzt fertig sein.']] },
      explicacion: 'Algunos verbos modales en Indikativ o Konjunktiv II expresan de dónde proviene la información del hablante, no solo modalidad. "Soll" (se dice que, según fuentes externas): "Er soll sehr reich sein" (Dicen que es muy rico). "Will" (según afirma el propio sujeto): "Sie will das nicht gewusst haben" (Ella afirma que no lo sabía). "Dürfte" (Konj.II de dürfen, estimación probabilística del hablante): "Das dürfte schwierig sein". "Müsste" (estimación lógica del hablante): "Es müsste jetzt fertig sein". Muy frecuentes en prensa y textos académicos.',
      ejemplos: [
        { de: 'Er soll sehr reich sein.', es: 'Dicen que es muy rico. (fuente externa)' },
        { de: 'Sie will das nicht gewusst haben.', es: 'Ella afirma que no lo sabía. (fuente: ella misma)' },
        { de: 'Das dürfte schwierig sein.', es: 'Eso probablemente sea difícil. (estimación)' },
        { de: 'Es müsste jetzt fertig sein.', es: 'Ya debería estar listo. (cálculo lógico)' }
      ],
      tip: '"soll" = otros dicen. "will" = él/ella afirma. "dürfte" = yo calculo/estimo. "müsste" = lógicamente debería. En prensa: "Die Kosten sollen stark gestiegen sein" no significa que deban subir, sino que según se informa habrían subido.'
    },
    {
      id: 'c1-09',
      titulo: 'Cohesión textual',
      subtitulo: 'referencia anafórica, elipsis, pronombres adverbiales',
      regla_base: 'Pronombres adverbiales (da(r)+prep.) remiten a cosas o ideas. Para personas siempre pronombre personal+prep. (über ihn, für sie).',
      excepciones: 'darüber, dafür, daran, damit → solo para cosas. Para personas: über ihn, für sie, mit ihr. Mezclarlos es un error C1 muy visible.',
      explicacion: 'Un texto C1 bien construido evita repeticiones usando mecanismos de cohesión: pronombres (er, sie, es), pronombres demostrativos (dieser, jener, derjenige), pronombres adverbiales (dabei, dazu, darüber, dafür…) y elipsis (omisión de elementos recuperables del contexto). Los pronombres adverbiales (da(r)- + preposición) remiten a ideas, cosas o hechos mencionados antes — nunca a personas. Para personas se usan pronombres personales con preposición: "für ihn", "mit ihr".',
      ejemplos: [
        { de: 'Das Problem ist bekannt. Dieses wurde bereits diskutiert.', es: 'El problema es conocido. Este ya fue debatido.' },
        { de: 'Er sprach über Klimawandel. Dabei betonte er…', es: 'Habló sobre el cambio climático. Al respecto subrayó…' },
        { de: 'Sie lehnte den Vorschlag ab. Dazu sagte sie, dass…', es: 'Rechazó la propuesta. Sobre eso dijo que…' },
        { de: 'Ich habe das Buch gelesen. Du auch? — Ja, ich auch.', es: '¿Tú también? — Sí, yo también. (elipsis)' }
      ],
      tip: '"Darüber" (sobre ello), "dafür" (para ello), "damit" (con ello), "daran" (en ello): siempre para cosas o ideas. Para personas: "über ihn" (sobre él), "für sie" (para ella). Mezclarlos es un error C1 muy visible.'
    },
    {
      id: 'c1-10',
      titulo: 'Inversión estilística',
      subtitulo: 'Kaum…als, Erst wenn, inicio con adverbial',
      regla_base: 'Un elemento no-sujeto en posición 1 fuerza inversión V2. Kaum…als: ambos verbos en Präteritum. Nie/Selten+inversión crean énfasis retórico.',
      excepciones: 'Si la subordinada va primero, la principal comienza directamente con el verbo (no con el sujeto). Kaum…als es estructura fija literaria — no mezclar con "sobald" o "wenn".',
      explicacion: 'La inversión estilística coloca un elemento no sujeto en la primera posición para lograr énfasis o un efecto narrativo. "Kaum hatte er … als …" (apenas hubo … cuando) usa ambos verbos en Präteritum y es una estructura fija literaria. "Erst wenn/als" (solo cuando) desplaza la condición al inicio. Iniciar con una subordinada adverbial fuerza automáticamente la inversión en la principal. "Nie/Selten/Kaum + hätte/wäre…" con inversión crean énfasis retórico: "Nie hätte ich das gedacht."',
      ejemplos: [
        { de: 'Kaum hatte er das Zimmer betreten, als das Licht ausging.', es: 'Apenas había entrado cuando se fue la luz.' },
        { de: 'Nie hätte ich das gedacht.', es: 'Jamás lo habría pensado.' },
        { de: 'Erst wenn du fertig bist, können wir gehen.', es: 'Solo cuando hayas terminado podremos irnos.' },
        { de: 'So groß war die Überraschung, dass er sprachlos war.', es: 'Tan grande fue la sorpresa que se quedó sin palabras.' }
      ],
      tip: '"Kaum…als": ambos verbos en Präteritum. "Als es regnete, blieb er zu Hause" → la principal comienza directamente con el verbo (blieb), no con el sujeto. La inversión es automática cuando la subordinada va primera.'
    }
  ],

  C2: [
    {
      id: 'c2-01',
      titulo: 'Registro y variación estilística',
      subtitulo: 'formal / coloquial / científico / burocrático',
      regla_base: 'Dominar múltiples registros y saber elegir conscientemente según la situación comunicativa es la competencia central del nivel C2.',
      explicacion: 'En C2 el hablante domina múltiples registros y puede cambiar conscientemente entre ellos según la situación comunicativa. El alemán formal y escrito tiende a usar nominalizaciones densas, construcciones pasivas, oraciones largas y Konjunktiv. El coloquial prefiere frases cortas, verbos activos, partículas modales y elipsis. El registro científico se distingue por la impersonalidad (pasiva, "man"), el hedging (mitigación de afirmaciones) y la nominalización. El burocrático y legal recurre a fórmulas fijas, gerundios y estructuras arcaicas.',
      ejemplos: [
        { de: 'Formal: "Die Entscheidung wurde getroffen." / Coloquial: "Wir haben entschieden."', es: 'La decisión fue tomada. / Decidimos.' },
        { de: 'Científico: "Es konnte nachgewiesen werden, dass…"', es: 'Se pudo demostrar que…' },
        { de: 'Burocrático: "Gemäß § 5 Abs. 2 wird hiermit…"', es: 'Conforme al § 5 párr. 2 se dispone…' },
        { de: 'Coloquial: "Das ist halt so, ne?"', es: 'Así son las cosas, ¿no?' }
      ],
      tip: 'Ejercicio C2: toma la misma idea y exprésala en tres registros distintos. La conciencia del registro — saber elegirlo y reconocerlo — es el núcleo de la competencia lingüística C2.'
    },
    {
      id: 'c2-02',
      titulo: 'Fraseología e idiomatismos',
      subtitulo: 'expresiones fijas, opacidad semántica',
      regla_base: 'Redewendungen: significado global no deducible de sus partes. Aprenderlas en contexto narrativo, no en listas. Buscar equivalente funcional, no traducción literal.',
      explicacion: 'Las expresiones idiomáticas (Redewendungen) tienen un significado global que no se deduce de sus componentes individuales. En C2 se espera reconocerlas en contexto y usarlas activamente en producción oral y escrita. Muchas están organizadas por campos semánticos: partes del cuerpo, animales, clima, colores. Algunas tienen equivalentes funcionales en español (aunque no literales); otras son culturalmente específicas. El riesgo de traducir literalmente una expresión idiomática puede producir incoherencias o malentendidos graves.',
      ejemplos: [
        { de: 'Das ist nicht mein Bier.', es: 'Eso no es asunto mío.' },
        { de: 'Tomaten auf den Augen haben', es: 'No ver lo obvio (tener tomates en los ojos)' },
        { de: 'jemandem auf den Zahn fühlen', es: 'sonsacar a alguien / tantear el terreno' },
        { de: 'die Katze im Sack kaufen', es: 'comprar algo a ciegas' }
      ],
      tip: 'Aprende los idiomatismos en contexto narrativo o con una frase de ejemplo, no en listas. Cuando escuches o leas uno nuevo, busca su equivalente funcional en tu lengua (no la traducción literal).'
    },
    {
      id: 'c2-03',
      titulo: 'Figuras retóricas',
      subtitulo: 'Ironie, Euphemismus, Litotes, Hyperbel',
      regla_base: 'Ironía: dice lo contrario. Eufemismo: suaviza. Lítotes: niega el contrario para afirmar (nicht uninteressant). Hipérbole: exagera deliberadamente.',
      tabla: { headers: ['Figura', 'Definición', 'Ejemplo'], rows: [['Ironie', 'Dice lo contrario de lo pensado', '"Das war ja ein toller Erfolg!" (tras fracaso)'], ['Euphemismus', 'Suaviza realidades duras', '"Er ist von uns gegangen." (= murió)'], ['Litotes', 'Niega el contrario para afirmar', '"nicht uninteressant" = muy interesante'], ['Hyperbel', 'Exageración deliberada', '"Ich habe das tausendmal gesagt!"']] },
      explicacion: 'En C2 se reconocen y producen figuras retóricas tanto en texto escrito como oral. La ironía dice lo contrario de lo que se piensa, con frecuencia marcada por la entonación o el contexto. El eufemismo suaviza o enmascara realidades duras o tabú. La lítotes niega el contrario para afirmar indirectamente y con mayor elegancia ("nicht uninteressant" en lugar de "sehr interessant"). La hipérbole exagera deliberadamente para enfatizar. El alemán académico y periodístico hace un uso especialmente frecuente de la lítotes.',
      ejemplos: [
        { de: 'Ironía: "Das war ja wieder ein toller Erfolg!"', es: '¡Vaya gran éxito de nuevo! (sarcasmo tras un fracaso)' },
        { de: 'Eufemismo: "Er ist von uns gegangen."', es: 'Nos ha dejado. (= ha muerto)' },
        { de: 'Lítotes: "Das ist nicht uninteressant."', es: 'Eso no carece de interés. (= es interesante)' },
        { de: 'Hyperbel: "Ich habe das tausendmal gesagt!"', es: '¡Lo he dicho mil veces!' }
      ],
      tip: 'La lítotes es especialmente típica del alemán académico y de la prensa: "nicht unerheblich" (nada desdeñable), "nicht ohne Interesse" (de cierto interés). No interpretes la doble negación como simple negación.'
    },
    {
      id: 'c2-04',
      titulo: 'Ambigüedad pragmática',
      subtitulo: 'implicatura, presuposición, sobreentendido',
      regla_base: 'Lo comunicado va más allá de lo literal. Implicaturas, presuposiciones y sobreentendidos culturales son clave para la comprensión real en C2.',
      explicacion: 'La competencia pragmática en C2 permite comprender lo que se comunica más allá de las palabras literales. Las implicaturas son inferencias que el oyente extrae de lo dicho sin que se explicite. Las presuposiciones son supuestos que el hablante da por conocidos y que el enunciado presupone como ciertos. Los sobreentendidos culturales son referencias compartidas que dan significado adicional. La entonación, las pausas y el contexto son fundamentales para interpretar correctamente la intención del hablante.',
      ejemplos: [
        { de: '"Kannst du das Fenster aufmachen?"', es: '¿Puedes abrir la ventana? (= ábrela, es una petición)' },
        { de: 'Presuposición: "Wann hörst du auf zu rauchen?"', es: '¿Cuándo dejas de fumar? (presupone que fumas)' },
        { de: 'Implicatura: "Es gibt noch Kuchen."', es: 'Queda pastel. (insinúa: sírvete)' },
        { de: '"Das war ja… interessant." (con pausa)', es: '"Fue… interesante." (sobreentendido negativo por la pausa)' }
      ],
      tip: 'En el examen oral C2, reconocer y producir implicaturas demuestra fluidez pragmática. En texto escrito, las comillas irónicas, los puntos suspensivos y el contexto son las principales pistas.'
    },
    {
      id: 'c2-05',
      titulo: 'Convenciones del texto científico',
      subtitulo: 'pasiva impersonal, nominalizaciones, hedging',
      regla_base: 'Pasiva impersonal, pronombre man, nominalizaciones densas y hedging (mitigación de afirmaciones) son las marcas del texto académico alemán.',
      tabla: { headers: ['Recurso', 'Ejemplo'], rows: [['Pasiva impersonal', 'Es konnte gezeigt werden, dass…'], ['Pronombre man', 'Man geht davon aus, dass…'], ['Hedging', 'Es lässt sich vermuten, dass…'], ['Nominalización', 'die Weiterentwicklung der Forschungsmethodik']] },
      explicacion: 'El texto científico y académico alemán sigue convenciones propias. Usa pasiva impersonal ("Es wurde gezeigt, dass…") y el pronombre "man" para evitar la primera persona. Las nominalizaciones en cadena comprimen información de forma densa ("die Weiterentwicklung der Forschungsmethodik"). El hedging (mitigación de afirmaciones) es obligatorio para mostrar rigor: "Es scheint, als ob…", "Es lässt sich vermuten, dass…", "Es ist denkbar, dass…". El uso de citas y referencias integradas en el texto es convención fundamental del género.',
      ejemplos: [
        { de: 'Es konnte gezeigt werden, dass… (pasiva impersonal)', es: 'Se pudo demostrar que…' },
        { de: 'die Weiterentwicklung der Forschungsmethodik', es: 'el desarrollo ulterior de la metodología de investigación' },
        { de: 'Es scheint, als ob… / Es lässt sich vermuten, dass…', es: 'Parece que… / Cabe suponer que…' },
        { de: 'Man geht davon aus, dass…', es: 'Se parte de que… / Se asume generalmente que…' }
      ],
      tip: 'El hedging mitiga afirmaciones para mostrar rigor científico: "Es wurde beobachtet" suena más objetivo que "Ich sah". Practica estas fórmulas para producciones escritas académicas.'
    },
    {
      id: 'c2-06',
      titulo: 'Arcaísmos y registro literario',
      subtitulo: 'ward, sei, möge — uso estilístico',
      regla_base: 'Formas arcaicas en textos clásicos y bíblicos: ward (Prät. de werden), möge (optativo), sei (Konj.I desiderativo). Reconocerlas es suficiente en C2.',
      explicacion: 'Ciertas formas gramaticales arcaicas sobreviven en textos literarios clásicos (Goethe, Schiller, Kafka), textos bíblicos, fórmulas jurídicas y usos estilísticos deliberados. "Ward" es el Präteritum arcaico de "werden" (equivalente moderno: wurde). "Sei" como Konjunktiv I de sein en frases formularias ("Gott sei Dank", "Es sei denn"). "Möge" expresa el optativo (deseo solemne). El género literario puede emplear también el Konjunktiv I narrativo como recurso de distancia. Reconocerlos es suficiente en C2; producirlos activamente es opcional.',
      ejemplos: [
        { de: '"Es ward Licht." (Génesis)', es: 'Y hubo luz. (Prät. arcaico de werden)' },
        { de: '"Er sei gesegnet." (fórmula)', es: 'Sea bendecido. (Konj. I desiderativo)' },
        { de: '"Möge er in Frieden ruhen."', es: 'Que descanse en paz.' },
        { de: '"Herr, dein Wille geschehe."', es: 'Señor, hágase tu voluntad.' }
      ],
      tip: 'No necesitas producir estos arcaísmos activamente, pero reconocerlos te permitirá leer literatura clásica alemana con comprensión plena y apreciar los recursos estilísticos del texto.'
    },
    {
      id: 'c2-07',
      titulo: 'Variantes dialectales',
      subtitulo: 'rasgos bávaros, suizos, austriacos, Plattdeutsch',
      regla_base: 'Tres macrodialectos principales: bávaro-austriaco, alemánico (suizo) y bajo alemán/Plattdeutsch. Exposición activa es el único método de comprensión.',
      explicacion: 'El alemán estándar (Hochdeutsch) convive con variantes regionales que tienen vocabulario, pronunciación y en algunos casos gramática propios. Los tres macrodialectos más relevantes son el bávaro-austriaco (sud-este de Alemania, Austria), el alemánico (Suiza, Alsacia, Baden), y el bajo alemán/Plattdeutsch (norte de Alemania). El suizo-alemán oral (Schweizerdeutsch) es prácticamente ininteligible para hablantes de Hochdeutsch sin exposición previa. En Austria las diferencias léxicas son más relevantes que las gramaticales.',
      ejemplos: [
        { de: 'Bávaro/Austriaco: "Servus / Grüß Gott"', es: 'Hola / Buenos días (en lugar de Hallo/Guten Tag)' },
        { de: 'Austriaco: "Jänner / Paradeiser"', es: 'enero / tomate (vs. Januar, Tomate en estándar)' },
        { de: 'Suizo: "Ich bin am Essen." (Verlaufsform frecuente)', es: 'Estoy comiendo. (más usado que en el estándar)' },
        { de: 'Plattdeutsch: "Moin!" / "dat" (= das)', es: '¡Buenos días! / eso, lo' }
      ],
      tip: 'Escucha podcasts o radio pública en variantes dialectales (Bayern 1, SRF aus der Schweiz, ORF aus Österreich) para familiarizarte con las diferencias de pronunciación y léxico.'
    },
    {
      id: 'c2-08',
      titulo: 'Metaidioma y fórmulas discursivas',
      subtitulo: 'relativizar, distanciarse, estructurar',
      regla_base: 'Fórmulas metadiscursivas para organizar el discurso, relativizar afirmaciones y señalar la actitud del hablante. Imprescindibles en exámenes orales C2.',
      tabla: { headers: ['Función', 'Fórmula'], rows: [['Relativizar', 'Soweit ich weiß, … / Es scheint, als ob…'], ['Reformular', 'Mit anderen Worten: … / Das heißt, …'], ['Concluir', 'Abschließend lässt sich sagen, dass…'], ['Objetar', 'Man könnte einwenden, dass…'], ['Ejemplificar', 'So zum Beispiel / Nehmen wir etwa…']] },
      explicacion: 'En C2 el hablante usa con fluidez fórmulas metadiscursivas para organizar su discurso, relativizar afirmaciones, introducir ejemplos, reformular, extraer conclusiones y distanciarse de una opinión. Estas fórmulas son la "coreografía" del discurso formal oral y escrito: anuncian lo que viene, conectan bloques temáticos y señalan la actitud del hablante hacia el contenido. Su dominio distingue el hablante fluido del que simplemente encadena frases correctas.',
      ejemplos: [
        { de: 'Soweit ich weiß, … / Es scheint, als ob…', es: 'Hasta donde sé, … / Parece que…' },
        { de: 'Mit anderen Worten: … / Das heißt,…', es: 'En otras palabras: … / Es decir,…' },
        { de: 'Abschließend lässt sich sagen, dass…', es: 'A modo de conclusión, cabe decir que…' },
        { de: 'Man könnte einwenden, dass…', es: 'Podría objetarse que…' }
      ],
      tip: 'Estas fórmulas son imprescindibles en exámenes orales C2 (Goethe-C2, DSH, TestDaF) porque demuestran fluidez discursiva. Incorpóralas en tus producciones escritas primero, luego transfiere su uso al oral.'
    },
    {
      id: 'c2-09',
      titulo: 'Modalidad compleja',
      subtitulo: 'müsste eigentlich, dürfte wohl, hätte können',
      regla_base: 'Combinaciones modal+Konjunktiv II+adverbio para matizar probabilidad u obligación. müsste eigentlich = en principio. dürfte wohl = estimación con reserva.',
      excepciones: '"Eigentlich" con modal: la realidad no corresponde a la expectativa. "Wohl" con modal: suposición probabilística. Combinarlos ("müsste eigentlich wohl") es firma del hablante C2.',
      explicacion: 'En C2 se dominan combinaciones de modal + Konjunktiv II + adverbio modal para matizar con precisión grados de probabilidad, obligación, posibilidad o evaluación. "Müsste eigentlich" añade el matiz "en principio / en teoría". "Dürfte wohl" expresa estimación probabilística con cierta reserva. "Hätte… können/müssen/sollen" evalúa retrospectivamente posibilidades u obligaciones no cumplidas. La combinación de dos o más de estos elementos en una sola frase es característica del alemán culto.',
      ejemplos: [
        { de: 'Das müsste eigentlich funktionieren.', es: 'Eso debería funcionar en principio.' },
        { de: 'Das dürfte wohl kaum stimmen.', es: 'Es poco probable que eso sea correcto.' },
        { de: 'Er hätte das vermeiden können.', es: 'Podría haberlo evitado.' },
        { de: 'Das sollte doch eigentlich möglich sein.', es: 'Eso sí que debería ser posible en principio.' }
      ],
      tip: '"Eigentlich" con modal: la realidad no corresponde a la expectativa. "Wohl" con modal: suposición probabilística. Combinarlos ("müsste eigentlich wohl") es firma del hablante C2.'
    },
    {
      id: 'c2-10',
      titulo: 'Características de tipos de texto',
      subtitulo: 'Essay, Gutachten, Leserbrief, Protokoll',
      regla_base: 'Cada tipo de texto tiene convenciones propias de estructura, léxico y registro. Analizar modelos e identificar sus fórmulas de apertura, desarrollo y cierre.',
      tabla: { headers: ['Tipo', 'Estructura / rasgo clave'], rows: [['Essay', 'Einleitung → Argumentation → Schlussfolgerung'], ['Leserbrief', 'Fórmula apertura + referencia al artículo + cierre'], ['Gutachten', 'Lenguaje formal impersonal; valoración razonada'], ['Protokoll', 'Objetivo, sin opinión, verbo en Konjunktiv I o pasado']] },
      explicacion: 'Cada tipo de texto tiene convenciones propias de estructura, léxico y registro que deben dominarse en C2. El ensayo argumentativo sigue la estructura Einleitung → Argumentation → Schlussfolgerung con conectores de lógica y concesión. La carta al director (Leserbrief) exige fórmulas de apertura, referencia al artículo y cierre. El informe/dictamen (Gutachten) usa lenguaje formal impersonal. El protocolo (Protokoll) es objetivo, sin opinión, con uso de indirecto. El TestDaF, DSH y Goethe-C2 incluyen producción de varios de estos tipos.',
      ejemplos: [
        { de: 'Essay: Einleitung → Argumentation → Schlussfolgerung', es: 'Introducción → Argumentación → Conclusión' },
        { de: '"Zu Ihrem Artikel vom … möchte ich anmerken, dass…"', es: 'Apertura de Leserbrief: Con respecto a su artículo del…' },
        { de: '"Im Folgenden wird beurteilt, ob…"', es: 'Apertura de Gutachten: A continuación se evalúa si…' },
        { de: 'Protokoll: sachlich, kein ich, Vergangenheit o Präsens', es: 'Objetivo, sin primera persona, en pasado o presente' }
      ],
      tip: 'Para el examen: analiza modelos de cada tipo de texto e identifica sus fórmulas de apertura, desarrollo y cierre. La estructura formal pesa tanto como el contenido en la puntuación.'
    }
  ]
};

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
