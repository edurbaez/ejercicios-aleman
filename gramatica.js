const GRAMMAR_DATA = {
  A1: [
    {
      id: 'a1-01',
      titulo: 'Artículos definidos',
      subtitulo: 'der, die, das',
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
      explicacion: 'El futuro en alemán tiene dos formas principales. La construcción "werden + Infinitivo" se usa para predicciones, promesas solemnes o probabilidades. Sin embargo, en la lengua hablada el Präsens con un marcador temporal (morgen, nächste Woche, bald) es igualmente válido y suena más natural para planes concretos. "Werden + Inf." también puede expresar suposición sobre el presente: "Er wird schon zu Hause sein" (Seguramente está en casa). Este uso epistémico de "werden" es muy frecuente en B1.',
      ejemplos: [
        { de: 'Ich werde morgen arbeiten.', es: 'Trabajaré mañana.' },
        { de: 'Es wird regnen. (predicción)', es: 'Lloverá.' },
        { de: 'Morgen fahre ich nach München. (Präsens)', es: 'Mañana voy a Múnich.' },
        { de: 'Er wird schon zu Hause sein.', es: 'Seguramente estará en casa. (suposición)' }
      ],
      tip: '"Werden + Inf." también expresa suposición en presente: "Das wird teuer sein" (Eso debe de ser caro). Si "werden" expresa suposición, el adverbio "schon" o "wohl" suele acompañarlo.'
    }
  ],

  B2: [
    {
      id: 'b2-01',
      titulo: 'Konjunktiv I',
      subtitulo: 'discurso indirecto',
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

// ─── State ────────────────────────────────────────────────────────────────────
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
let currentLevel = 'A1';
let openRuleId = null;
let searchQuery = '';
let showFavsOnly = false;
let reviewItems = [];
let reviewIndex = 0;

// Exam state
let examQuestions = [];
let examAnswers = [];
let examCurrentIndex = 0;
let examSelectedRules = [];

// ─── Persistence helpers ──────────────────────────────────────────────────────
function getFavs() { try { return JSON.parse(localStorage.getItem('gram_favs') || '[]'); } catch(e) { return []; } }
function saveFavs(arr) { localStorage.setItem('gram_favs', JSON.stringify(arr)); }
function getRead() { try { return JSON.parse(localStorage.getItem('gram_read') || '{}'); } catch(e) { return {}; } }
function markRead(id) { const r = getRead(); r[id] = true; localStorage.setItem('gram_read', JSON.stringify(r)); }
function isFav(id) { return getFavs().includes(id); }

function toggleFav(id, e) {
  e.stopPropagation();
  const favs = getFavs();
  const idx = favs.indexOf(id);
  if (idx === -1) favs.push(id); else favs.splice(idx, 1);
  saveFavs(favs);
  renderAll();
}

// ─── Hash routing ─────────────────────────────────────────────────────────────
function parseHash() {
  const h = location.hash.replace('#', '');
  const lvlMatch = LEVELS.find(l => l.toLowerCase() === h.toLowerCase());
  if (lvlMatch) return { level: lvlMatch, ruleId: null };
  for (const lvl of LEVELS) {
    const rule = GRAMMAR_DATA[lvl].find(r => r.id === h);
    if (rule) return { level: lvl, ruleId: rule.id };
  }
  return { level: 'A1', ruleId: null };
}

function setLevel(level, pushState = true) {
  currentLevel = level;
  openRuleId = null;
  showFavsOnly = false;
  const btn = document.getElementById('fav-filter-btn');
  if (btn) btn.classList.remove('active');
  if (pushState) history.pushState(null, '', '#' + level.toLowerCase());
  renderAll();
}

// ─── Search ───────────────────────────────────────────────────────────────────
function onSearch(val) {
  searchQuery = val.trim().toLowerCase();
  document.getElementById('gram-search-clear').classList.toggle('visible', searchQuery.length > 0);
  document.getElementById('gram-level-bar').style.display = searchQuery ? 'none' : '';
  document.getElementById('gram-toolbar').style.display = searchQuery ? 'none' : '';
  document.getElementById('gram-search-label').style.display = searchQuery ? '' : 'none';
  renderAll();
}

function clearSearch() {
  document.getElementById('gram-search').value = '';
  onSearch('');
}

function getSearchResults() {
  const results = [];
  for (const lvl of LEVELS) {
    for (const rule of GRAMMAR_DATA[lvl]) {
      const haystack = [rule.titulo, rule.subtitulo, rule.explicacion, rule.tip,
        ...rule.ejemplos.map(e => e.de + ' ' + e.es)].join(' ').toLowerCase();
      if (haystack.includes(searchQuery)) results.push(Object.assign({}, rule, { _level: lvl }));
    }
  }
  return results;
}

// ─── Favorites filter ─────────────────────────────────────────────────────────
function toggleFavFilter() {
  showFavsOnly = !showFavsOnly;
  const btn = document.getElementById('fav-filter-btn');
  btn.classList.toggle('active', showFavsOnly);
  renderAll();
}

// ─── Progress ─────────────────────────────────────────────────────────────────
function getLevelProgress(lvl) {
  const read = getRead();
  const total = GRAMMAR_DATA[lvl].length;
  const done = GRAMMAR_DATA[lvl].filter(r => read[r.id]).length;
  return { done, total };
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderAll() {
  if (searchQuery) {
    renderSearchResults();
  } else {
    renderLevelTabs();
    renderRuleList();
  }
}

function renderLevelTabs() {
  const bar = document.getElementById('gram-level-bar');
  const favsActive = showFavsOnly;
  bar.innerHTML = LEVELS.map(lvl => {
    const { done, total } = getLevelProgress(lvl);
    const prog = done > 0 ? ' <span class="gram-level-progress">' + done + '/' + total + '</span>' : '';
    return '<button class="gram-level-btn' + (lvl === currentLevel && !favsActive ? ' active' : '') +
      '" onclick="setLevel(\'' + lvl + '\')">' + lvl + prog + '</button>';
  }).join('') +
  '<button class="gram-level-btn' + (favsActive ? ' active' : '') + '" id="fav-level-btn" onclick="toggleFavFilter()">&#9733; Favs</button>' +
  '<button class="gram-level-btn exam-level-btn" id="exam-start-btn" onclick="startExam()">&#128221; Examen</button>';
  document.getElementById('gram-toolbar').style.display = '';
}

function getRulesToShow() {
  if (showFavsOnly) {
    const favs = getFavs();
    const all = [];
    for (const lvl of LEVELS) {
      GRAMMAR_DATA[lvl].forEach(r => {
        if (favs.includes(r.id)) all.push(Object.assign({}, r, { _level: lvl }));
      });
    }
    return all;
  }
  return GRAMMAR_DATA[currentLevel].map(r => Object.assign({}, r, { _level: currentLevel }));
}

function renderRuleList() {
  const rules = getRulesToShow();
  const container = document.getElementById('gram-rules');
  if (rules.length === 0) {
    container.innerHTML = '<div class="gram-empty">No hay reglas favoritas todavía. Haz clic en ☆ para guardar.</div>';
    return;
  }
  const read = getRead();
  container.innerHTML = rules.map(function(rule, i) { return renderRuleCard(rule, i, read, false); }).join('');
}

function renderSearchResults() {
  const results = getSearchResults();
  const label = document.getElementById('gram-search-label');
  const container = document.getElementById('gram-rules');
  if (results.length === 0) {
    label.textContent = 'Sin resultados.';
    container.innerHTML = '<div class="gram-empty">No se encontraron reglas con ese término.</div>';
    return;
  }
  label.textContent = results.length + ' resultado' + (results.length !== 1 ? 's' : '') + ' en todos los niveles';
  const read = getRead();
  container.innerHTML = results.map(function(rule, i) { return renderRuleCard(rule, i, read, true); }).join('');
}

function esc(s) { return String(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;'); }

function speakDe(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function renderRuleCard(rule, i, read, showLevel) {
  const isOpen = openRuleId === rule.id;
  const favMark = isFav(rule.id) ? '&#9733;' : '&#9734;';
  const favTitle = isFav(rule.id) ? 'Quitar favorito' : 'Guardar favorito';
  const favClass = isFav(rule.id) ? ' active' : '';
  const readClass = read[rule.id] ? ' read' : '';
  const badge = showLevel ? '<span class="gram-result-level">' + rule._level + '</span>' : '';
  const ejemplosHtml = rule.ejemplos.map(function(ej) {
    const escaped = ej.de.replace(/'/g, '&#39;');
    return '<div class="gram-ejemplo">' +
      '<button class="gram-tts-btn" onclick="speakDe(\'' + escaped + '\')" title="Escuchar">&#128266;</button>' +
      '<span class="gram-ej-de">' + ej.de + '</span>' +
      '<span class="gram-ej-arrow">&rarr;</span><span class="gram-ej-es">' + ej.es + '</span></div>';
  }).join('');
  return '<div class="gram-rule-card' + (isOpen ? ' open' : '') + readClass + '" id="rule-' + rule.id + '">' +
    '<button class="gram-rule-header" onclick="toggleRule(\'' + rule.id + '\')">' +
    '<span class="gram-rule-num">' + (i + 1) + '</span>' +
    '<div class="gram-rule-read-dot"></div>' +
    '<span class="gram-rule-titles">' +
    '<span class="gram-rule-title">' + rule.titulo + badge + '</span>' +
    '<span class="gram-rule-subtitle">' + rule.subtitulo + '</span>' +
    '</span>' +
    '<button class="gram-fav-btn' + favClass + '" onclick="toggleFav(\'' + esc(rule.id) + '\',event)" title="' + favTitle + '">' + favMark + '</button>' +
    '<span class="gram-rule-chevron">' + (isOpen ? '&#9650;' : '&#9660;') + '</span>' +
    '</button>' +
    '<div class="gram-rule-body">' +
    '<p class="gram-rule-explicacion">' + rule.explicacion + '</p>' +
    '<div class="gram-ejemplos">' + ejemplosHtml + '</div>' +
    '<div class="gram-tip"><span class="gram-tip-icon">💡</span><span>' + rule.tip + '</span></div>' +
    '<div class="gram-quiz-wrap" id="quiz-' + rule.id + '">' +
    '<div class="gram-quiz-actions">' +
    '<button class="gram-quiz-btn" onclick="startQuiz(\'' + rule.id + '\')">&#127919; Practicar</button>' +
    '<button class="gram-quiz-btn" onclick="copyRuleLink(\'' + rule.id + '\')">&#128279; Copiar enlace</button>' +
    '</div></div>' +
    '</div></div>';
}

function toggleRule(id) {
  openRuleId = openRuleId === id ? null : id;
  if (openRuleId) markRead(id);
  renderAll();
  if (openRuleId) {
    var el = document.getElementById('rule-' + openRuleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
function getAllExamples() {
  var all = [];
  for (var i = 0; i < LEVELS.length; i++) {
    GRAMMAR_DATA[LEVELS[i]].forEach(function(r) { r.ejemplos.forEach(function(e) { all.push(e.de); }); });
  }
  return all;
}

function startQuiz(ruleId) {
  var rule = null;
  for (var i = 0; i < LEVELS.length; i++) {
    var found = GRAMMAR_DATA[LEVELS[i]].find(function(r) { return r.id === ruleId; });
    if (found) { rule = found; break; }
  }
  if (!rule || rule.ejemplos.length === 0) return;
  var qIdx = Math.floor(Math.random() * rule.ejemplos.length);
  var correct = rule.ejemplos[qIdx];
  var allDe = getAllExamples().filter(function(s) { return s !== correct.de; });
  allDe.sort(function() { return Math.random() - 0.5; });
  var distractors = allDe.slice(0, 3);
  var options = [correct.de].concat(distractors).sort(function() { return Math.random() - 0.5; });
  var optsHtml = options.map(function(opt) {
    return '<button class="gram-quiz-opt" onclick="checkQuiz(this,\'' + esc(correct.de) + '\',\'' + esc(opt) + '\',\'quiz-' + ruleId + '\')">' + opt + '</button>';
  }).join('');
  var wrap = document.getElementById('quiz-' + ruleId);
  wrap.innerHTML =
    '<div class="gram-quiz-question"><small>¿Cómo se dice en alemán?</small>' + correct.es + '</div>' +
    '<div class="gram-quiz-options">' + optsHtml + '</div>' +
    '<div class="gram-quiz-feedback" id="qfb-' + ruleId + '"></div>' +
    '<div class="gram-quiz-actions">' +
    '<button class="gram-quiz-btn primary" onclick="startQuiz(\'' + ruleId + '\')">Nueva pregunta</button>' +
    '<button class="gram-quiz-btn" onclick="resetQuiz(\'' + ruleId + '\')">Cerrar</button>' +
    '</div>';
}

function checkQuiz(btn, correct, chosen, wrapId) {
  var wrap = document.getElementById(wrapId);
  var opts = wrap.querySelectorAll('.gram-quiz-opt');
  opts.forEach(function(o) {
    o.disabled = true;
    if (o.textContent.trim() === correct) o.classList.add('correct');
  });
  var fb = wrap.querySelector('.gram-quiz-feedback');
  if (chosen === correct) {
    btn.classList.add('correct');
    fb.textContent = '✓ ¡Correcto!';
  } else {
    btn.classList.add('wrong');
    fb.textContent = '✗ La respuesta correcta era: "' + correct + '"';
  }
  fb.classList.add('visible');
}

function resetQuiz(ruleId) {
  var wrap = document.getElementById('quiz-' + ruleId);
  wrap.innerHTML = '<div class="gram-quiz-actions">' +
    '<button class="gram-quiz-btn" onclick="startQuiz(\'' + ruleId + '\')">&#127919; Practicar</button>' +
    '<button class="gram-quiz-btn" onclick="copyRuleLink(\'' + ruleId + '\')">&#128279; Copiar enlace</button>' +
    '</div>';
}

// ─── Share URL ─────────────────────────────────────────────────────────────────
function copyRuleLink(ruleId) {
  var url = location.origin + location.pathname + '#' + ruleId;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function() { showToast('Enlace copiado'); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    showToast('Enlace copiado');
  }
}

function showToast(msg) {
  var t = document.getElementById('gram-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

// ─── Quick Review ─────────────────────────────────────────────────────────────
function openReview() {
  var rules = getRulesToShow();
  if (rules.length === 0) { showToast('No hay reglas para repasar.'); return; }
  reviewItems = rules.slice();
  reviewIndex = 0;
  document.getElementById('gram-review-overlay').style.display = '';
  renderReviewCard();
}

function closeReview() {
  document.getElementById('gram-review-overlay').style.display = 'none';
}

function renderReviewCard() {
  var rule = reviewItems[reviewIndex];
  var total = reviewItems.length;
  var lvl = rule._level || currentLevel;
  document.getElementById('rv-meta').textContent = lvl + ' · Regla ' + (reviewIndex + 1) + ' de ' + total;
  document.getElementById('rv-title').textContent = rule.titulo;
  document.getElementById('rv-sub').textContent = rule.subtitulo;
  document.getElementById('rv-tip').textContent = rule.tip;
  document.getElementById('rv-counter').textContent = (reviewIndex + 1) + ' / ' + total;
  document.getElementById('rv-bar').style.width = (((reviewIndex + 1) / total) * 100) + '%';
  document.getElementById('rv-prev').disabled = reviewIndex === 0;
  document.getElementById('rv-next').disabled = reviewIndex === total - 1;
}

function reviewNav(dir) {
  reviewIndex = Math.max(0, Math.min(reviewItems.length - 1, reviewIndex + dir));
  renderReviewCard();
}

// ─── Keyboard navigation ──────────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  var examQOverlay = document.getElementById('exam-question-overlay');
  if (examQOverlay && examQOverlay.style.display !== 'none') {
    if (e.key === 'Escape') examConfirmExit();
    return;
  }
  var examResOverlay = document.getElementById('exam-results-overlay');
  if (examResOverlay && examResOverlay.style.display !== 'none') {
    if (e.key === 'Escape') hideAllExamOverlays();
    return;
  }
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  var overlay = document.getElementById('gram-review-overlay');
  if (overlay && overlay.style.display !== 'none') {
    if (e.key === 'ArrowLeft') reviewNav(-1);
    if (e.key === 'ArrowRight') reviewNav(1);
    if (e.key === 'Escape') closeReview();
    return;
  }
  var lvlIdx = LEVELS.indexOf(currentLevel);
  if (e.key === 'ArrowLeft' && lvlIdx > 0 && !searchQuery) setLevel(LEVELS[lvlIdx - 1]);
  if (e.key === 'ArrowRight' && lvlIdx < LEVELS.length - 1 && !searchQuery) setLevel(LEVELS[lvlIdx + 1]);
  if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !searchQuery) {
    e.preventDefault();
    var rules = getRulesToShow();
    var ids = rules.map(function(r) { return r.id; });
    var cur = ids.indexOf(openRuleId);
    var next;
    if (e.key === 'ArrowDown') next = cur === -1 ? 0 : Math.min(cur + 1, ids.length - 1);
    else next = cur <= 0 ? 0 : cur - 1;
    openRuleId = ids[next];
    markRead(openRuleId);
    renderAll();
    var el = document.getElementById('rule-' + openRuleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  if (e.key.toLowerCase() === 'f' && openRuleId) {
    var favs = getFavs();
    var idx = favs.indexOf(openRuleId);
    if (idx === -1) favs.push(openRuleId); else favs.splice(idx, 1);
    saveFavs(favs);
    renderAll();
    showToast(idx === -1 ? '★ Guardado en favoritos' : '☆ Eliminado de favoritos');
  }
});

// ─── Modo Examen ──────────────────────────────────────────────────────────────
const EXAM_RULES_COUNT = 5;
const EXAM_SYSTEM_PROMPT =
  'Eres un profesor de alemán. Genera exactamente 10 ejercicios de gramática en JSON.\n' +
  'Cada ejercicio cubre una de las reglas proporcionadas (2 ejercicios por regla).\n' +
  'Tipos permitidos:\n' +
  '  "completar": la frase contiene ___ donde va la respuesta (una sola palabra o forma verbal).\n' +
  '  "elegir": 4 opciones en el campo "opciones"; la respuesta correcta es exactamente una de ellas.\n' +
  'Varía los tipos entre los 10 ejercicios.\n' +
  'Campos obligatorios por ejercicio: tipo, enunciado, respuesta_correcta, explicacion, regla_id.\n' +
  'Para "elegir" añade también el campo "opciones" (array de 4 strings).\n' +
  'Responde ÚNICAMENTE con un array JSON válido. Sin texto adicional ni bloques de código markdown.';

function pickRandomRules(level, count) {
  const rules = GRAMMAR_DATA[level];
  return [...rules].sort(function() { return Math.random() - 0.5; }).slice(0, count);
}

function buildExamPrompt(rules) {
  return 'Genera 10 ejercicios de gramática alemana (2 por cada regla) sobre estas ' +
    rules.length + ' reglas:\n\n' +
    rules.map(function(r, i) {
      return (i + 1) + '. ' + r.titulo + ' (' + r.subtitulo + ')\n' +
        '   Ejemplo: ' + r.ejemplos[0].de + ' → ' + r.ejemplos[0].es + '\n' +
        '   regla_id: ' + r.id;
    }).join('\n\n');
}

function hideAllExamOverlays() {
  ['exam-loading-overlay', 'exam-question-overlay', 'exam-results-overlay'].forEach(function(id) {
    document.getElementById(id).style.display = 'none';
  });
}

async function startExam() {
  hideAllExamOverlays();
  examSelectedRules = pickRandomRules(currentLevel, EXAM_RULES_COUNT);
  examQuestions = [];
  examAnswers = [];
  examCurrentIndex = 0;

  const rulesList = document.getElementById('exam-rules-list');
  rulesList.innerHTML = examSelectedRules.map(function(r) {
    return '<li>' + r.titulo + '</li>';
  }).join('');
  document.getElementById('exam-loading-error').style.display = 'none';
  document.getElementById('exam-loading-spinner').style.display = '';
  document.getElementById('exam-retry-btn').style.display = 'none';
  document.getElementById('exam-loading-overlay').style.display = 'flex';

  try {
    examQuestions = await fetchExamQuestions(examSelectedRules);
    hideAllExamOverlays();
    renderExamQuestion(0);
    document.getElementById('exam-question-overlay').style.display = 'flex';
  } catch(err) {
    document.getElementById('exam-loading-spinner').style.display = 'none';
    var errEl = document.getElementById('exam-loading-error');
    if (err.message === 'no_auth') {
      errEl.textContent = 'Inicia sesión para usar el modo examen.';
    } else if (err.message === 'rate_limit') {
      errEl.textContent = 'Límite de peticiones alcanzado, espera un momento.';
    } else {
      errEl.textContent = 'No se pudo generar el examen. Intenta de nuevo.';
    }
    errEl.style.display = '';
    document.getElementById('exam-retry-btn').style.display = '';
  }
}

function renderExamQuestion(index) {
  examCurrentIndex = index;
  var q = examQuestions[index];
  var total = examQuestions.length;
  document.getElementById('exam-q-counter').textContent = 'Pregunta ' + (index + 1) + ' / ' + total;
  document.getElementById('exam-progress-bar').style.width = ((index / total) * 100) + '%';
  document.getElementById('exam-next-btn').style.display = 'none';

  var html = '<p class="exam-enunciado">' + q.enunciado + '</p>';
  if (q.tipo === 'elegir') {
    html += '<div class="exam-options">' +
      q.opciones.map(function(op) {
        return '<button class="exam-option-btn" onclick="selectExamOption(this,\'' + esc(op) + '\')">' + op + '</button>';
      }).join('') + '</div>';
  } else {
    html += '<div class="exam-input-wrap">' +
      '<input id="exam-input" class="exam-input" type="text" placeholder="Escribe la respuesta…" autocomplete="off" ' +
      'onkeydown="if(event.key===\'Enter\')submitExamInput()">' +
      '<button class="exam-submit-btn" onclick="submitExamInput()">→</button>' +
      '</div>';
  }
  document.getElementById('exam-q-body').innerHTML = html;
  if (q.tipo === 'completar') {
    setTimeout(function() {
      var inp = document.getElementById('exam-input');
      if (inp) inp.focus();
    }, 50);
  }
}

function selectExamOption(btn, value) {
  if (btn.classList.contains('selected')) return;
  document.querySelectorAll('.exam-option-btn').forEach(function(b) { b.disabled = true; });
  btn.classList.add('selected');
  examAnswers[examCurrentIndex] = value;
  document.getElementById('exam-next-btn').style.display = '';
}

function submitExamInput() {
  var inp = document.getElementById('exam-input');
  if (!inp) return;
  var val = inp.value.trim();
  if (!val) return;
  inp.disabled = true;
  var submitBtn = document.querySelector('.exam-submit-btn');
  if (submitBtn) submitBtn.disabled = true;
  examAnswers[examCurrentIndex] = val;
  document.getElementById('exam-next-btn').style.display = '';
}

function examNext() {
  if (examCurrentIndex < examQuestions.length - 1) {
    renderExamQuestion(examCurrentIndex + 1);
  } else {
    showExamResults();
  }
}

function showExamResults() {
  hideAllExamOverlays();
  var total = examQuestions.length;
  var correct = 0;
  var items = examQuestions.map(function(q, i) {
    var userAnswer = (examAnswers[i] || '').trim().toLowerCase();
    var correctAnswer = (q.respuesta_correcta || '').trim().toLowerCase();
    var isCorrect = userAnswer === correctAnswer;
    if (isCorrect) correct++;
    return { q: q, userAnswer: examAnswers[i] || '', isCorrect: isCorrect };
  });

  var pct = Math.round((correct / total) * 100);
  var emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚';

  var html = '<h2 class="exam-score">' + emoji + ' ' + correct + ' / ' + total + '</h2>' +
    '<p class="exam-score-sub">Nivel ' + currentLevel + ' · ' + EXAM_RULES_COUNT + ' reglas · ' + pct + '%</p>' +
    '<div class="exam-results-list">';
  items.forEach(function(item) {
    html += '<div class="exam-result-item ' + (item.isCorrect ? 'correct' : 'wrong') + '">' +
      '<span class="exam-result-icon">' + (item.isCorrect ? '✅' : '❌') + '</span>' +
      '<div class="exam-result-detail">' +
      '<p class="exam-result-q">' + item.q.enunciado + '</p>';
    if (!item.isCorrect) {
      html += '<p class="exam-result-answer">Tu respuesta: <em>' + (item.userAnswer || '—') + '</em></p>' +
        '<p class="exam-result-answer exam-result-correct">Correcta: <strong>' + item.q.respuesta_correcta + '</strong></p>';
    }
    if (item.q.explicacion) {
      html += '<p class="exam-result-exp">' + item.q.explicacion + '</p>';
    }
    html += '</div></div>';
  });
  html += '</div>';

  document.getElementById('exam-results-body').innerHTML = html;

  var failedCount = items.filter(function(it) { return !it.isCorrect && it.q.regla_id; }).length;
  document.getElementById('exam-show-failed-btn').style.display = failedCount > 0 ? '' : 'none';
  document.getElementById('exam-results-overlay').style.display = 'flex';

  // Silent insert — does not block or alert on failure
  if (window.sb && window.currentUser) {
    window.sb.from('exam_results').insert({
      user_id: window.currentUser.id,
      level: currentLevel,
      score: correct,
      total: total,
      rules: examSelectedRules.map(function(r) { return r.id; }),
      answers: items.map(function(it) {
        return {
          enunciado: it.q.enunciado,
          respuesta_correcta: it.q.respuesta_correcta,
          user_answer: it.userAnswer,
          is_correct: it.isCorrect
        };
      })
    }).then(function(res) {
      if (res.error) console.warn('[exam_results] insert failed:', res.error.message);
    });
  }
}

function examShowFailedRules() {
  hideAllExamOverlays();
  var items = examQuestions.map(function(q, i) {
    var isCorrect = (examAnswers[i] || '').trim().toLowerCase() === (q.respuesta_correcta || '').trim().toLowerCase();
    return { reglaId: q.regla_id, isCorrect: isCorrect };
  });
  var failedIds = items
    .filter(function(it) { return !it.isCorrect && it.reglaId; })
    .map(function(it) { return it.reglaId; });
  if (failedIds.length === 0) return;

  var levelKey = failedIds[0].replace(/-.*$/, '').toUpperCase();
  if (GRAMMAR_DATA[levelKey]) setLevel(levelKey, false);
  openRuleId = failedIds[0];
  renderAll();
  setTimeout(function() {
    var el = document.getElementById('rule-' + openRuleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 80);
}

function examConfirmExit() {
  if (confirm('¿Salir del examen? Se perderá el progreso.')) hideAllExamOverlays();
}

async function fetchExamQuestions(rules) {
  const token = typeof window.getAuthToken === 'function' ? await window.getAuthToken() : null;
  if (!token) throw new Error('no_auth');

  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({
      system: EXAM_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildExamPrompt(rules) }],
      max_tokens: 2000
    })
  });

  const raw = await resp.text();
  let data;
  try { data = JSON.parse(raw); } catch(e) { throw new Error('server_error'); }
  if (!resp.ok) {
    if (resp.status === 429) throw new Error('rate_limit');
    throw new Error(data.error || 'api_error');
  }

  const reply = data.reply || '';
  let questions;
  try {
    questions = JSON.parse(reply);
  } catch(e) {
    const mdMatch = reply.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (mdMatch) {
      try { questions = JSON.parse(mdMatch[1].trim()); } catch(e2) { throw new Error('json_error'); }
    } else {
      const arrMatch = reply.match(/\[[\s\S]*\]/);
      if (arrMatch) {
        try { questions = JSON.parse(arrMatch[0]); } catch(e2) { throw new Error('json_error'); }
      } else {
        throw new Error('json_error');
      }
    }
  }

  if (!Array.isArray(questions) || questions.length === 0) throw new Error('empty_response');
  return questions;
}

// ─── Dark mode ────────────────────────────────────────────────────────────────
var _moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
var _sunSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function toggleGramDark() {
  document.body.classList.toggle('dark');
  var isDark = document.body.classList.contains('dark');
  document.getElementById('darkModeBtn').innerHTML = isDark ? _sunSVG : _moonSVG;
  localStorage.setItem('darkMode_gram', isDark);
}

// ─── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('popstate', function() {
  var parsed = parseHash();
  currentLevel = parsed.level;
  openRuleId = parsed.ruleId;
  if (parsed.ruleId) markRead(parsed.ruleId);
  renderAll();
  if (parsed.ruleId) {
    setTimeout(function() {
      var el = document.getElementById('rule-' + parsed.ruleId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('darkMode_gram') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('darkModeBtn').innerHTML = _sunSVG;
  }
  var parsed = parseHash();
  currentLevel = parsed.level;
  openRuleId = parsed.ruleId;
  if (parsed.ruleId) markRead(parsed.ruleId);
  renderAll();
  if (parsed.ruleId) {
    setTimeout(function() {
      var el = document.getElementById('rule-' + parsed.ruleId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }
});
