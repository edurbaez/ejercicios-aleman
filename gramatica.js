const GRAMMAR_DATA = {
  A1: [
    {
      id: 'a1-01',
      titulo: 'Artículos definidos',
      subtitulo: 'der, die, das',
      explicacion: 'En alemán cada sustantivo tiene un género gramatical: masculino (der), femenino (die) o neutro (das). El género no siempre sigue una lógica natural y debe aprenderse junto con cada palabra. En plural siempre se usa "die" sin importar el género.',
      ejemplos: [
        { de: 'der Mann', es: 'el hombre (masc.)' },
        { de: 'die Frau', es: 'la mujer (fem.)' },
        { de: 'das Kind', es: 'el niño (neutro)' },
        { de: 'die Kinder', es: 'los niños (plural)' }
      ],
      tip: 'Aprende siempre el artículo junto con el sustantivo: no "Tisch", sino "der Tisch". Es mucho más difícil aprenderlos por separado.'
    },
    {
      id: 'a1-02',
      titulo: 'Pronombres personales',
      subtitulo: 'ich, du, er/sie/es…',
      explicacion: 'Los pronombres personales en alemán son: ich (yo), du (tú/vos), er (él), sie (ella), es (ello), wir (nosotros), ihr (vosotros/ustedes informal), sie (ellos/ellas), Sie (usted/es formal). "Sie" formal siempre va en mayúscula.',
      ejemplos: [
        { de: 'Ich bin müde.', es: 'Yo estoy cansado.' },
        { de: 'Er kommt aus Spanien.', es: 'Él viene de España.' },
        { de: 'Wir lernen Deutsch.', es: 'Nosotros aprendemos alemán.' },
        { de: 'Sie sind Lehrerin.', es: 'Ella es profesora. / Usted es profesora.' }
      ],
      tip: '"sie" (minúscula) significa "ella" o "ellos/as"; "Sie" (mayúscula) es el usted formal. El contexto y la conjugación verbal ayudan a distinguirlos.'
    },
    {
      id: 'a1-03',
      titulo: 'Verbos sein y haben',
      subtitulo: 'ser/estar y tener en presente',
      explicacion: '"Sein" (ser/estar) y "haben" (tener) son los dos verbos más importantes del alemán. Ambos son irregulares y se usan también como auxiliares para formar tiempos compuestos. Hay que memorizarlos completos.',
      ejemplos: [
        { de: 'Ich bin / du bist / er ist', es: 'soy / eres / es' },
        { de: 'wir sind / ihr seid / sie sind', es: 'somos / sois / son' },
        { de: 'Ich habe / du hast / er hat', es: 'tengo / tienes / tiene' },
        { de: 'wir haben / ihr habt / sie haben', es: 'tenemos / tenéis / tienen' }
      ],
      tip: 'Practica estas conjugaciones hasta que salgan automáticas; las necesitarás en casi cada frase que construyas en alemán.'
    },
    {
      id: 'a1-04',
      titulo: 'Presente verbos regulares',
      subtitulo: 'terminaciones -e, -st, -t, -en, -t, -en',
      explicacion: 'Los verbos regulares en alemán toman un conjunto fijo de terminaciones en presente. La raíz se obtiene quitando la "-en" del infinitivo (lernen → lern-). Las terminaciones son: -e, -st, -t, -en, -t, -en para ich/du/er/wir/ihr/sie.',
      ejemplos: [
        { de: 'ich lerne / du lernst', es: 'aprendo / aprendes' },
        { de: 'er lernt / wir lernen', es: 'aprende / aprendemos' },
        { de: 'ihr lernt / sie lernen', es: 'aprendéis / aprenden' },
        { de: 'Ich spiele Gitarre.', es: 'Toco la guitarra.' }
      ],
      tip: 'Si la raíz termina en -t o -d (arbeiten, reden), se añade una -e antes de -st y -t: du arbeitest, er arbeitet. Esto facilita la pronunciación.'
    },
    {
      id: 'a1-05',
      titulo: 'Negación: nicht y kein',
      subtitulo: 'cuándo usar cada uno',
      explicacion: '"Nicht" niega verbos, adjetivos, adverbios y sustantivos con artículo definido o pronombre posesivo. "Kein/keine/kein" niega sustantivos que irían con artículo indefinido (ein/eine) o sin artículo.',
      ejemplos: [
        { de: 'Ich komme nicht.', es: 'No vengo.' },
        { de: 'Das ist nicht gut.', es: 'Eso no es bueno.' },
        { de: 'Ich habe kein Auto.', es: 'No tengo coche.' },
        { de: 'Sie trinkt keinen Kaffee.', es: 'Ella no bebe café.' }
      ],
      tip: 'Regla rápida: si en español puedes decir "no tengo un/ningún…", usa kein. Si niegas el verbo o un adjetivo, usa nicht.'
    },
    {
      id: 'a1-06',
      titulo: 'Acusativo básico',
      subtitulo: 'cambio del artículo masculino (der → den)',
      explicacion: 'El acusativo es el caso del objeto directo. El único artículo que cambia visiblemente es el masculino: der → den, ein → einen, kein → keinen. Los artículos femeninos, neutros y plurales no cambian en acusativo.',
      ejemplos: [
        { de: 'Ich sehe den Mann.', es: 'Veo al hombre. (masc. acus.)' },
        { de: 'Ich kaufe einen Apfel.', es: 'Compro una manzana.' },
        { de: 'Sie liest die Zeitung.', es: 'Ella lee el periódico. (fem. sin cambio)' },
        { de: 'Er hat das Buch.', es: 'Él tiene el libro. (neutro sin cambio)' }
      ],
      tip: 'Memoriza "den" como la señal del acusativo masculino. Con femenino, neutro y plural el artículo es idéntico al nominativo.'
    },
    {
      id: 'a1-07',
      titulo: 'W-Fragen',
      subtitulo: 'palabras interrogativas',
      explicacion: 'Las W-Fragen son preguntas abiertas que empiezan con palabra interrogativa. En alemán el verbo sigue inmediatamente a la palabra interrogativa (posición V2). Las principales son: wer (quién), was (qué), wo (dónde), wann (cuándo), wie (cómo), warum (por qué), woher (de dónde), wohin (a dónde).',
      ejemplos: [
        { de: 'Wer ist das?', es: '¿Quién es ese?' },
        { de: 'Wo wohnst du?', es: '¿Dónde vives?' },
        { de: 'Warum lernst du Deutsch?', es: '¿Por qué aprendes alemán?' },
        { de: 'Wie heißt du?', es: '¿Cómo te llamas?' }
      ],
      tip: '"Wer" se declina como el artículo: wer (nom.), wen (acus.), wem (dat.), wessen (gen.). Por ahora enfócate en wer/wen.'
    },
    {
      id: 'a1-08',
      titulo: 'Orden de palabras',
      subtitulo: 'el verbo siempre en posición 2',
      explicacion: 'En una frase declarativa alemana el verbo conjugado ocupa SIEMPRE la segunda posición (V2), independientemente de qué elemento esté en primer lugar. Si el sujeto no es el primer elemento, verbo y sujeto se invierten (inversión sujeto-verbo).',
      ejemplos: [
        { de: 'Ich lerne jeden Tag Deutsch.', es: 'Aprendo alemán cada día.' },
        { de: 'Jeden Tag lerne ich Deutsch.', es: 'Cada día aprendo alemán.' },
        { de: 'Heute gehe ich ins Kino.', es: 'Hoy voy al cine.' },
        { de: 'Das Buch lese ich gern.', es: 'El libro me gusta leerlo.' }
      ],
      tip: 'Visualiza la frase como: [posición 1] + [VERBO] + [sujeto si no es pos. 1] + [resto]. El verbo es el ancla fija.'
    },
    {
      id: 'a1-09',
      titulo: 'Plurales',
      subtitulo: 'las 5 formas más frecuentes',
      explicacion: 'El plural en alemán no tiene una única regla; hay 5 patrones principales. Cada sustantivo tiene su plural propio que debes aprender. En dativo plural siempre se añade una -n si el plural no termina ya en -n.',
      ejemplos: [
        { de: 'der Tag → die Tage (+e)', es: 'el día → los días' },
        { de: 'die Hand → die Hände (¨+e)', es: 'la mano → las manos' },
        { de: 'das Kind → die Kinder (+er)', es: 'el niño → los niños' },
        { de: 'die Frau → die Frauen (+en)', es: 'la mujer → las mujeres' }
      ],
      tip: 'Aprende el plural junto con el artículo al memorizar nuevas palabras: "der Tag / die Tage". Los diccionarios lo listan siempre.'
    },
    {
      id: 'a1-10',
      titulo: 'Artículo indefinido y su negación',
      subtitulo: 'ein/eine/ein — kein/keine/kein',
      explicacion: 'El artículo indefinido es ein (masc./neutro) y eine (fem.). En acusativo el masculino cambia a einen. "Kein" sigue exactamente la misma declinación que "ein" y sirve para negar sustantivos que llevarían artículo indefinido o que van sin artículo.',
      ejemplos: [
        { de: 'Das ist ein Hund.', es: 'Eso es un perro.' },
        { de: 'Ich habe eine Katze.', es: 'Tengo un gato (fem.).' },
        { de: 'Ich habe kein Auto.', es: 'No tengo coche.' },
        { de: 'Sie trinkt keinen Wein.', es: 'Ella no bebe vino.' }
      ],
      tip: 'Nota que "ein" no tiene plural. Para el plural sin artículo simplemente no se pone nada: "Ich habe Bücher" (Tengo libros).'
    }
  ],

  A2: [
    {
      id: 'a2-01',
      titulo: 'Verbos modales',
      subtitulo: 'können, müssen, wollen, sollen, dürfen, mögen',
      explicacion: 'Los verbos modales expresan posibilidad, obligación, deseo, permiso, etc. Se conjugan de forma irregular y siempre van acompañados de un infinitivo que se coloca al final de la frase. En presente no llevan terminación en ich/er/sie/es.',
      ejemplos: [
        { de: 'Ich kann schwimmen.', es: 'Sé nadar / Puedo nadar.' },
        { de: 'Du musst arbeiten.', es: 'Tienes que trabajar.' },
        { de: 'Er will Arzt werden.', es: 'Él quiere ser médico.' },
        { de: 'Darf ich hier rauchen?', es: '¿Puedo fumar aquí?' }
      ],
      tip: 'ich kann / du kannst / er kann — la vocal cambia y no hay -t en 3.ª persona singular. Memoriza el paradigma de "können" y aplícalo a los demás.'
    },
    {
      id: 'a2-02',
      titulo: 'Pretérito perfecto (Perfekt)',
      subtitulo: 'haben/sein + Partizip II',
      explicacion: 'El Perfekt es el tiempo pasado más usado en la lengua hablada. Se forma con haben o sein en presente + el Partizip II al final. Los verbos de movimiento y cambio de estado (gehen, kommen, fahren, werden…) usan sein; los demás, haben.',
      ejemplos: [
        { de: 'Ich habe gegessen.', es: 'He comido / Comí.' },
        { de: 'Er hat gearbeitet.', es: 'Ha trabajado.' },
        { de: 'Sie ist nach Berlin gefahren.', es: 'Ha ido a Berlín.' },
        { de: 'Wir sind aufgewacht.', es: 'Nos hemos despertado.' }
      ],
      tip: 'Partizip II de verbos regulares: ge- + raíz + -(e)t (gemacht, gearbeitet). Irregulares: ge- + raíz cambiada + -en (gegessen, gefahren). Los separables: eingekauft.'
    },
    {
      id: 'a2-03',
      titulo: 'Dativo',
      subtitulo: 'artículos y pronombres en dativo',
      explicacion: 'El dativo es el caso del objeto indirecto (¿a quién?). Los artículos definidos en dativo son: dem (masc./neutro), der (fem.), den+n (plural). Los pronombres personales cambian: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.',
      ejemplos: [
        { de: 'Ich gebe dem Mann das Buch.', es: 'Le doy el libro al hombre.' },
        { de: 'Er hilft der Frau.', es: 'Él ayuda a la mujer.' },
        { de: 'Sie schreibt mir eine E-Mail.', es: 'Ella me escribe un correo.' },
        { de: 'Wir danken euch.', es: 'Les/Os damos las gracias.' }
      ],
      tip: 'Truco para el dativo masculino/neutro: "dem Mann" suena como "dem" → piensa en "dem-asiado" para recordar que es dativo.'
    },
    {
      id: 'a2-04',
      titulo: 'Preposiciones + Acusativo',
      subtitulo: 'durch, für, gegen, ohne, um',
      explicacion: 'Cinco preposiciones van siempre en acusativo: durch (a través de), für (para), gegen (contra/hacia), ohne (sin), um (alrededor de / a las [hora]). El artículo que sigue cambia según las reglas del acusativo.',
      ejemplos: [
        { de: 'Das ist für dich.', es: 'Esto es para ti.' },
        { de: 'Wir fahren durch den Tunnel.', es: 'Pasamos por el túnel.' },
        { de: 'Ohne einen Plan geht es nicht.', es: 'Sin un plan no funciona.' },
        { de: 'Er läuft um den See.', es: 'Él corre alrededor del lago.' }
      ],
      tip: 'Memoriza la lista como una palabra mnemotécnica: DOGFU — Durch, Ohne, Gegen, Für, Um. Siempre Acusativo.'
    },
    {
      id: 'a2-05',
      titulo: 'Preposiciones + Dativo',
      subtitulo: 'aus, bei, mit, nach, seit, von, zu, gegenüber',
      explicacion: 'Estas preposiciones siempre rigen dativo: aus (de/desde), bei (en casa de/en), mit (con), nach (después de/hacia[ciudad]), seit (desde[tiempo]), von (de/desde), zu (a/hacia), gegenüber (frente a).',
      ejemplos: [
        { de: 'Ich komme aus der Schweiz.', es: 'Soy de Suiza.' },
        { de: 'Sie wohnt bei ihrer Mutter.', es: 'Vive en casa de su madre.' },
        { de: 'Ich fahre mit dem Bus.', es: 'Voy en autobús.' },
        { de: 'Seit einem Jahr lerne ich Deutsch.', es: 'Llevo un año aprendiendo alemán.' }
      ],
      tip: 'Rima para recordarlas: "aus, bei, mit, nach, seit, von, zu — diese Wörter regier\'n den Dativ nu!"'
    },
    {
      id: 'a2-06',
      titulo: 'Wechselpräpositionen',
      subtitulo: 'Akk. (¿adónde?) vs. Dat. (¿dónde?)',
      explicacion: 'Nueve preposiciones pueden llevar acusativo o dativo: an, auf, in, über, unter, vor, hinter, neben, zwischen. La clave: acusativo para movimiento/dirección (¿wohin?), dativo para posición/lugar (¿wo?).',
      ejemplos: [
        { de: 'Ich lege das Buch auf den Tisch. (Akk)', es: 'Pongo el libro en la mesa.' },
        { de: 'Das Buch liegt auf dem Tisch. (Dat)', es: 'El libro está en la mesa.' },
        { de: 'Sie geht in die Stadt. (Akk)', es: 'Ella va al centro.' },
        { de: 'Sie ist in der Stadt. (Dat)', es: 'Ella está en el centro.' }
      ],
      tip: '¿Hay movimiento hacia un destino? → Acusativo. ¿Se describe una posición estática? → Dativo. Los verbos legen/stellen/hängen piden Akk; liegen/stehen/hängen piden Dat.'
    },
    {
      id: 'a2-07',
      titulo: 'Verbos separables',
      subtitulo: 'prefijo al final en frase principal',
      explicacion: 'Muchos verbos alemanes tienen un prefijo separable (auf-, an-, ein-, mit-, zurück-, etc.). En una frase principal en presente o pasado, el prefijo se separa y va al final de la oración. En infinitivo y Partizip II van unidos.',
      ejemplos: [
        { de: 'Ich rufe dich an.', es: 'Te llamo (por teléfono).' },
        { de: 'Der Laden macht um 9 Uhr auf.', es: 'La tienda abre a las 9.' },
        { de: 'Wir steigen am Bahnhof aus.', es: 'Bajamos en la estación.' },
        { de: 'Er hat das Licht ausgemacht.', es: 'Apagó la luz.' }
      ],
      tip: 'Si ves un verbo y al final de la frase hay una sílaba suelta que no encaja, probablemente es el prefijo separado. En Partizip II: aus+ge+macht = ausgemacht.'
    },
    {
      id: 'a2-08',
      titulo: 'Imperativo',
      subtitulo: 'formas du / ihr / Sie',
      explicacion: 'El imperativo tiene tres formas según a quién te diriges. Para "du": raíz del verbo sola (sin terminación, sin pronombre). Para "ihr": raíz + -t. Para "Sie": infinitivo + Sie. Los verbos irregulares con cambio de raíz lo mantienen en la forma "du".',
      ejemplos: [
        { de: 'Komm her! (du)', es: '¡Ven aquí!' },
        { de: 'Kommt her! (ihr)', es: '¡Venid aquí!' },
        { de: 'Kommen Sie herein! (Sie)', es: '¡Entre usted!' },
        { de: 'Lies das Buch! (du — lesen → lies)', es: '¡Lee el libro!' }
      ],
      tip: 'La forma "du" del imperativo de "sein" es irregular: "Sei ruhig!" (¡Estate quieto!). Para "haben": "Hab Geduld!" (¡Ten paciencia!).'
    },
    {
      id: 'a2-09',
      titulo: 'Comparativo y superlativo',
      subtitulo: 'schneller / am schnellsten',
      explicacion: 'El comparativo se forma añadiendo -er al adjetivo. El superlativo se forma con am + adjetivo + -sten. Muchos adjetivos monosílabos añaden umlaut (a→ä, o→ö, u→ü). Hay irregulares que deben memorizarse.',
      ejemplos: [
        { de: 'Das Auto ist schnell → schneller → am schnellsten.', es: 'El coche es rápido → más rápido → el más rápido.' },
        { de: 'alt → älter → am ältesten', es: 'viejo → más viejo → el más viejo' },
        { de: 'gut → besser → am besten', es: 'bueno → mejor → el mejor' },
        { de: 'viel → mehr → am meisten', es: 'mucho → más → el más' }
      ],
      tip: 'Irregulares clave: gut/besser/best-, viel/mehr/meist-, gern/lieber/liebst-. Apréndelos de memoria; son los más frecuentes.'
    },
    {
      id: 'a2-10',
      titulo: 'Verbos reflexivos',
      subtitulo: 'sich waschen, sich freuen…',
      explicacion: 'Los verbos reflexivos necesitan un pronombre reflexivo (mich, dich, sich, uns, euch, sich). Algunos son reflexivos en alemán pero no en español, y viceversa. El pronombre va inmediatamente después del verbo conjugado en frases normales.',
      ejemplos: [
        { de: 'Ich wasche mich.', es: 'Me lavo.' },
        { de: 'Du freust dich.', es: 'Te alegras.' },
        { de: 'Er erinnert sich nicht.', es: 'Él no recuerda.' },
        { de: 'Wir setzen uns.', es: 'Nos sentamos.' }
      ],
      tip: 'Algunos verbos cambian de significado con o sin reflexivo: "erinnern" (recordar a alguien) vs. "sich erinnern" (recordar algo uno mismo). ¡Presta atención al "sich"!'
    }
  ],

  B1: [
    {
      id: 'b1-01',
      titulo: 'Präteritum',
      subtitulo: 'pasado narrativo escrito',
      explicacion: 'El Präteritum es el tiempo pasado usado en textos escritos (novelas, noticias) y para verbos modales y auxiliares incluso en la lengua hablada. Los verbos regulares añaden -te al radical; los irregulares cambian la vocal y debes memorizarlos.',
      ejemplos: [
        { de: 'Ich arbeitete den ganzen Tag. (regular)', es: 'Trabajé todo el día.' },
        { de: 'Er fuhr nach Berlin. (fahren → fuhr)', es: 'Viajó a Berlín.' },
        { de: 'Sie hatte keine Zeit. (haben → hatte)', es: 'Ella no tenía tiempo.' },
        { de: 'Wir mussten warten. (müssen → musste)', es: 'Tuvimos que esperar.' }
      ],
      tip: 'Habla siempre en Perfekt, pero usa Präteritum para sein/haben/los modales: "Ich war", "Er hatte", "Wir wollten". Estas formas suenan más naturales que el Perfekt en estos verbos.'
    },
    {
      id: 'b1-02',
      titulo: 'Konjunktiv II',
      subtitulo: 'hipótesis y cortesía',
      explicacion: 'El Konjunktiv II expresa situaciones hipotéticas, deseos, cortesía y consejos. La forma más común: würde + Infinitivo. Pero los verbos auxiliares y modales forman su propio Konjunktiv II: wäre (sein), hätte (haben), könnte, müsste, sollte, dürfte, möchte.',
      ejemplos: [
        { de: 'Ich würde gern mitkommen.', es: 'Me encantaría ir contigo.' },
        { de: 'Könntest du mir helfen?', es: '¿Podrías ayudarme?' },
        { de: 'Wenn ich Zeit hätte, würde ich reisen.', es: 'Si tuviera tiempo, viajaría.' },
        { de: 'An deiner Stelle würde ich das nicht tun.', es: 'Yo en tu lugar no haría eso.' }
      ],
      tip: 'Usa "würde + Inf." como comodín con casi cualquier verbo. Reserva wäre/hätte/könnte para los casos donde la frase queda más natural y corta.'
    },
    {
      id: 'b1-03',
      titulo: 'Oraciones de relativo',
      subtitulo: 'pronombres relativos + verbo al final',
      explicacion: 'Las oraciones de relativo amplían información sobre un sustantivo. El pronombre relativo concuerda en género y número con el sustantivo al que se refiere, pero adopta el caso que le corresponde dentro de la subordinada. El verbo va al final.',
      ejemplos: [
        { de: 'Das ist der Mann, der dort wohnt.', es: 'Ese es el hombre que vive allí.' },
        { de: 'Ich kenne die Frau, die du meinst.', es: 'Conozco a la mujer que mencionas.' },
        { de: 'Das ist das Buch, das ich lese.', es: 'Es el libro que estoy leyendo.' },
        { de: 'Der Mann, dem ich helfe, ist nett.', es: 'El hombre al que ayudo es simpático.' }
      ],
      tip: 'Los pronombres relativos son casi idénticos a los artículos definidos. La única excepción: en dativo plural y en genitivo: denen / dessen / deren.'
    },
    {
      id: 'b1-04',
      titulo: 'Genitivo',
      subtitulo: 'posesión y complementos nominales',
      explicacion: 'El genitivo expresa posesión o pertenencia. Los artículos son: des (masc./neutro), der (fem./plural). Los sustantivos masculinos y neutros añaden -s o -es. En la lengua coloquial el genitivo a menudo se reemplaza por "von + Dativo".',
      ejemplos: [
        { de: 'Das ist das Auto des Mannes.', es: 'Es el coche del hombre.' },
        { de: 'Die Tasche der Frau ist rot.', es: 'El bolso de la mujer es rojo.' },
        { de: 'Wegen des Regens bleibe ich zu Hause.', es: 'Me quedo en casa a causa de la lluvia.' },
        { de: 'trotz des schlechten Wetters', es: 'a pesar del mal tiempo' }
      ],
      tip: 'Preposiciones que rigen genitivo: wegen (a causa de), trotz (a pesar de), während (durante), statt (en lugar de). Son muy frecuentes en B1.'
    },
    {
      id: 'b1-05',
      titulo: 'Declinación de adjetivos',
      subtitulo: 'después de def. / indef. / sin artículo',
      explicacion: 'Los adjetivos atributivos (antes del sustantivo) se declinan según el artículo que los precede. Hay tres tablas: tras artículo definido (terminaciones débiles), tras artículo indefinido (mixtas), y sin artículo (fuertes, el adjetivo carga toda la información de caso).',
      ejemplos: [
        { de: 'der alte Mann (def. nom.)', es: 'el hombre viejo' },
        { de: 'einen alten Mann (indef. acus.)', es: 'a un hombre viejo' },
        { de: 'mit frischem Brot (sin art. dat.)', es: 'con pan fresco' },
        { de: 'kalter Kaffee schmeckt nicht. (sin art. nom.)', es: 'El café frío no sabe bien.' }
      ],
      tip: 'Empieza con la tabla del artículo definido (las terminaciones son -e o -en). La más difícil es sin artículo. Practícalas con frases reales, no de memoria abstracta.'
    },
    {
      id: 'b1-06',
      titulo: 'Conectores subordinantes',
      subtitulo: 'weil, dass, obwohl, wenn, als, bevor, nachdem',
      explicacion: 'Estos conectores introducen oraciones subordinadas donde el verbo conjugado va AL FINAL. "Weil/da" (porque), "dass" (que), "obwohl" (aunque), "wenn" (si/cuando habitual), "als" (cuando - pasado puntual), "bevor" (antes de que), "nachdem" (después de que).',
      ejemplos: [
        { de: 'Ich lerne, weil ich eine Prüfung habe.', es: 'Estudio porque tengo un examen.' },
        { de: 'Ich glaube, dass er kommt.', es: 'Creo que él viene.' },
        { de: 'Obwohl es regnet, gehe ich raus.', es: 'Aunque llueve, salgo.' },
        { de: 'Als ich jung war, lebte ich in Berlin.', es: 'Cuando era joven vivía en Berlín.' }
      ],
      tip: '"Wenn" se usa para condiciones y acciones repetidas en cualquier tiempo; "als" solo para un momento único en el pasado. Este error es muy típico y vale la pena dominarlo.'
    },
    {
      id: 'b1-07',
      titulo: 'Verbos con preposición fija',
      subtitulo: 'warten auf, denken an, sprechen über…',
      explicacion: 'Muchos verbos alemanes se combinan con una preposición específica que rige un caso determinado. No existe una lógica deducible: hay que aprenderlos como unidades léxicas. Si el complemento es una cosa o idea (no persona) se puede usar un pronombre pronominal adverbial: darauf, daran, darüber…',
      ejemplos: [
        { de: 'Ich warte auf den Bus. (auf + Akk)', es: 'Espero el autobús.' },
        { de: 'Sie denkt oft an ihre Familie. (an + Akk)', es: 'Ella piensa mucho en su familia.' },
        { de: 'Wir sprechen über das Problem. (über + Akk)', es: 'Hablamos sobre el problema.' },
        { de: 'Er freut sich auf den Urlaub. (sich freuen auf + Akk)', es: 'Está contento por las vacaciones.' }
      ],
      tip: 'Aprende siempre el verbo con su preposición y el caso: "warten AUF + Akk", "helfen BEI + Dat". Los diccionarios modernos los listan así.'
    },
    {
      id: 'b1-08',
      titulo: 'Infinitivo con "zu"',
      subtitulo: 'versuchen zu, aufhören zu…',
      explicacion: 'Muchos verbos, adjetivos y sustantivos van seguidos de infinitivo con "zu". El "zu" se coloca directamente antes del infinitivo. Con verbos separables, "zu" se inserta entre prefijo y raíz: aufzuhören. No se usa "zu" después de verbos modales ni de lassen, sehen, hören.',
      ejemplos: [
        { de: 'Ich versuche, pünktlich zu sein.', es: 'Intento ser puntual.' },
        { de: 'Er hört auf zu rauchen.', es: 'Deja de fumar.' },
        { de: 'Es ist wichtig, gesund zu essen.', es: 'Es importante comer sano.' },
        { de: 'Sie hat keine Zeit, mich anzurufen.', es: 'No tiene tiempo de llamarme.' }
      ],
      tip: 'Con verbos separables: auf|zu|hören → aufzuhören. El "zu" se cuela en el medio. Practica con: anfangen, aufhören, versuchen, vergessen, vorhaben.'
    },
    {
      id: 'b1-09',
      titulo: 'Pasiva básica',
      subtitulo: 'werden + Partizip II',
      explicacion: 'La voz pasiva desplaza el foco del agente al proceso o resultado. Se forma con "werden" (conjugado) + Partizip II al final. El agente puede mencionarse con "von + Dativo". El Präteritum de werden es "wurde"; Perfekt: "ist … worden".',
      ejemplos: [
        { de: 'Das Haus wird gebaut. (Präsens)', es: 'La casa está siendo construida.' },
        { de: 'Das Buch wurde geschrieben. (Prät.)', es: 'El libro fue escrito.' },
        { de: 'Der Brief ist von ihm geschrieben worden. (Perf.)', es: 'La carta fue escrita por él.' },
        { de: 'Hier wird Deutsch gesprochen.', es: 'Aquí se habla alemán.' }
      ],
      tip: 'Nota: en pasiva perfecta es "worden" (sin ge-), no "geworden". Este es uno de los errores más comunes en B1.'
    },
    {
      id: 'b1-10',
      titulo: 'Futuro',
      subtitulo: 'werden + Infinitivo / Präsens + Zeitangabe',
      explicacion: 'El futuro en alemán puede expresarse de dos maneras: (1) werden + Infinitivo al final, para planes o predicciones; (2) Präsens con marcador temporal, que es incluso más natural en la lengua hablada para eventos planeados.',
      ejemplos: [
        { de: 'Ich werde morgen arbeiten.', es: 'Trabajaré mañana.' },
        { de: 'Es wird regnen.', es: 'Lloverá (predicción).' },
        { de: 'Morgen fahre ich nach München.', es: 'Mañana voy a Múnich. (Präsens)' },
        { de: 'Das wirst du bereuen!', es: '¡Te vas a arrepentir de esto!' }
      ],
      tip: '"werden + Infinitiv" también puede expresar suposición en el presente: "Er wird schon zu Hause sein" (Seguramente estará en casa).'
    }
  ],

  B2: [
    {
      id: 'b2-01',
      titulo: 'Konjunktiv I',
      subtitulo: 'discurso indirecto',
      explicacion: 'El Konjunktiv I se usa en el discurso indirecto para reportar lo que alguien dijo sin tomar partido. Se forma desde el infinitivo: raíz + -e/-est/-e/-en/-et/-en. Cuando coincide con el Indikativ se usa Konjunktiv II o "würde + Inf." como sustituto.',
      ejemplos: [
        { de: 'Er sagt, er sei krank.', es: 'Dice que está enfermo.' },
        { de: 'Sie berichtet, das Wetter sei schön.', es: 'Informa de que el tiempo está bonito.' },
        { de: 'Er meinte, er habe keine Zeit.', es: 'Dijo que no tenía tiempo.' },
        { de: 'Sie erklärte, sie würden kommen.', es: 'Explicó que vendrían.' }
      ],
      tip: 'El Konjunktiv I es principalmente escrito (prensa, literatura). En conversación se prefiere el Konjunktiv II o simplemente el Indikativ con "dass".'
    },
    {
      id: 'b2-02',
      titulo: 'Konjunktiv II pasado',
      subtitulo: 'hipótesis irreales en el pasado',
      explicacion: 'Para expresar que algo no ocurrió pero hubiera podido ocurrir, se usa hätte/wäre + Partizip II. En las oraciones condicionales: "Wenn + hätte/wäre... + P.II, hätte/wäre... + P.II". Es el equivalente al "hubiera hecho" del español.',
      ejemplos: [
        { de: 'Ich hätte das nicht gemacht.', es: 'No habría hecho eso.' },
        { de: 'Wenn ich mehr gelernt hätte, wäre ich nicht durchgefallen.', es: 'Si hubiera estudiado más, no habría suspendido.' },
        { de: 'Er wäre gern mitgekommen.', es: 'Habría venido de buena gana.' },
        { de: 'Das hätte ich wissen müssen.', es: 'Debería haberlo sabido.' }
      ],
      tip: 'La estructura es la misma que el Perfekt pero con hätte/wäre en lugar de hat/ist. Compara: "Er hat gegessen" → "Er hätte gegessen".'
    },
    {
      id: 'b2-03',
      titulo: 'Partizip I como adjetivo',
      subtitulo: 'acción en curso',
      explicacion: 'El Partizip I (Infinitiv + -d) puede usarse como adjetivo antes de un sustantivo, expresando una acción en curso o simultánea. Se declina igual que cualquier adjetivo atributivo. Es muy frecuente en la lengua escrita.',
      ejemplos: [
        { de: 'das schlafende Kind', es: 'el niño que duerme (durmiendo)' },
        { de: 'die weinende Frau', es: 'la mujer que llora' },
        { de: 'ein wachsender Markt', es: 'un mercado en crecimiento' },
        { de: 'mit steigenden Kosten', es: 'con costes en aumento' }
      ],
      tip: 'Partizip I ≈ acción activa en curso. Partizip II ≈ acción pasiva completada. Compara: "das laufende Programm" (el programa en ejecución) vs. "das abgeschlossene Programm" (el programa cerrado).'
    },
    {
      id: 'b2-04',
      titulo: 'Partizip II como adjetivo',
      subtitulo: 'acción completada / resultado',
      explicacion: 'El Partizip II también funciona como adjetivo atributivo, expresando el resultado de una acción (equivale a un participio pasivo en español). Se declina con las mismas terminaciones de adjetivo.',
      ejemplos: [
        { de: 'das geöffnete Fenster', es: 'la ventana abierta' },
        { de: 'ein gebratenes Hähnchen', es: 'un pollo asado' },
        { de: 'die unterschriebenen Dokumente', es: 'los documentos firmados' },
        { de: 'ein gut geschriebener Artikel', es: 'un artículo bien escrito' }
      ],
      tip: 'Cuando el adjetivo participial tiene complementos propios, el grupo entero va antes del sustantivo: "das von der Regierung beschlossene Gesetz" (el proyecto aprobado por el gobierno) → ¡esto ya es nivel C1!'
    },
    {
      id: 'b2-05',
      titulo: 'Pasiva con agente',
      subtitulo: 'von (agente) / durch (medio o causa)',
      explicacion: 'En la pasiva se puede mencionar quien realiza la acción con "von + Dativo" (agente animado) o expresar el medio/causa con "durch + Acusativo". La distinción es sutil: "von" para personas, "durch" para instrumentos o causas.',
      ejemplos: [
        { de: 'Das Haus wurde von einem Architekten entworfen.', es: 'La casa fue diseñada por un arquitecto.' },
        { de: 'Das Fenster wurde durch den Sturm zerstört.', es: 'La ventana fue destruida por la tormenta.' },
        { de: 'Der Brief wurde von der Sekretärin geschrieben.', es: 'La carta fue escrita por la secretaria.' },
        { de: 'Viele Jobs werden durch KI ersetzt.', es: 'Muchos trabajos son reemplazados por la IA.' }
      ],
      tip: 'Si puedes contestar "¿por quién?" con una persona → von + Dat. Si es un instrumento, fenómeno o causa impersonal → durch + Akk.'
    },
    {
      id: 'b2-06',
      titulo: 'Conectores de dos partes',
      subtitulo: 'sowohl…als auch, weder…noch…',
      explicacion: 'Estos pares de conectores coordinan dos elementos o frases. Cada parte del par va en una posición específica de la oración y el orden de palabras puede variar. Son muy frecuentes en textos formales y argumentativos.',
      ejemplos: [
        { de: 'Sowohl er als auch sie kommen.', es: 'Tanto él como ella vienen.' },
        { de: 'Weder er noch sie hat angerufen.', es: 'Ni él ni ella llamó.' },
        { de: 'Entweder du kommst jetzt, oder du bleibst.', es: 'O vienes ahora o te quedas.' },
        { de: 'Nicht nur schnell, sondern auch günstig.', es: 'No solo rápido, sino también económico.' }
      ],
      tip: 'Con "weder…noch" el verbo va en singular si los sujetos son singulares. Con "sowohl…als auch" puede ir en plural. ¡Atención a la concordancia!'
    },
    {
      id: 'b2-07',
      titulo: 'Nominalizaciones',
      subtitulo: 'sustantivación de verbos y adjetivos',
      explicacion: 'El alemán nominaliza frecuentemente verbos y adjetivos, especialmente en registros formales y escritos. Los infinitivos nominalizados son neutros (das Lesen, das Schreiben). Los adjetivos nominalizados toman artículo y declinación de adjetivo (der/die Kranke, das Gute).',
      ejemplos: [
        { de: 'Das Lesen macht mir Spaß.', es: 'La lectura / Leer me divierte.' },
        { de: 'Die Entscheidung war schwierig.', es: 'La decisión fue difícil.' },
        { de: 'Beim Kochen hört er Musik.', es: 'Mientras cocina escucha música.' },
        { de: 'Das Beste daran ist…', es: 'Lo mejor de eso es…' }
      ],
      tip: 'El infinitivo nominalizado siempre lleva artículo neutro y mayúscula. Muy útil para variar el estilo: en vez de "Ich lese gern" → "Das Lesen ist mein Hobby".'
    },
    {
      id: 'b2-08',
      titulo: 'Partículas modales',
      subtitulo: 'doch, mal, ja, eigentlich, eben, halt',
      explicacion: 'Las Modalpartikeln añaden matiz emocional o pragmático a la frase: actitud del hablante, grado de certeza, invitación, reproche… No se traducen literalmente; su significado depende totalmente del contexto y la entonación.',
      ejemplos: [
        { de: 'Komm doch mit!', es: '¡Venga, ven con nosotros!' },
        { de: 'Schau mal!', es: '¡Mira!' },
        { de: 'Das weißt du ja.', es: 'Ya lo sabes (y ambos lo sabemos).' },
        { de: 'Das ist eben so.', es: 'Así son las cosas (y no hay nada que hacer).' }
      ],
      tip: '"Doch" es la partícula más versátil: puede refutar ("Doch!" = ¡Sí que lo es!), invitar, consolar. Escucha cómo los hablantes nativos las usan en podcasts o series.'
    },
    {
      id: 'b2-09',
      titulo: 'Finalidad: um…zu / damit',
      subtitulo: 'para que / con el fin de',
      explicacion: '"Um…zu + Infinitivo" expresa finalidad cuando el sujeto de las dos acciones es el mismo. "Damit + Nebensatz" se usa cuando los sujetos son distintos. "Damit" introduce una oración subordinada con verbo al final.',
      ejemplos: [
        { de: 'Ich lerne, um die Prüfung zu bestehen.', es: 'Estudio para aprobar el examen. (mismo sujeto)' },
        { de: 'Ich erkläre es langsam, damit du es verstehst.', es: 'Lo explico despacio para que tú lo entiendas. (sujetos distintos)' },
        { de: 'Er spart, um ein Haus zu kaufen.', es: 'Ahorra para comprar una casa.' },
        { de: 'Wir flüstern, damit das Kind schläft.', es: 'Hablamos en voz baja para que el niño duerma.' }
      ],
      tip: 'Regla sencilla: ¿mismo sujeto en ambas frases? → um…zu. ¿Sujetos distintos? → damit + verbo al final. El 90% de los casos se resuelve con esta pregunta.'
    },
    {
      id: 'b2-10',
      titulo: 'Concesión y adversación',
      subtitulo: 'obwohl, trotzdem, dennoch, zwar…aber',
      explicacion: 'Estas estructuras expresan contraste o concesión (algo sucede a pesar de otra cosa). "Obwohl" introduce una subordinada (verbo al final). "Trotzdem/dennoch" son adverbios que van al inicio de la frase principal (verbo en V2). "Zwar…aber" es un par coordinante.',
      ejemplos: [
        { de: 'Obwohl es regnet, gehen wir spazieren.', es: 'Aunque llueve, salimos a pasear.' },
        { de: 'Es regnet. Trotzdem gehen wir spazieren.', es: 'Llueve. Sin embargo, salimos a pasear.' },
        { de: 'Er ist zwar müde, aber er arbeitet weiter.', es: 'Está cansado, pero sigue trabajando.' },
        { de: 'Die Aufgabe ist schwer, dennoch versuche ich es.', es: 'La tarea es difícil; sin embargo lo intento.' }
      ],
      tip: '"Obwohl" → subordinada (verbo al final). "Trotzdem/dennoch" → frase principal (verbo en posición 2). Mezclarlos es el error más típico en B2.'
    }
  ],

  C1: [
    {
      id: 'c1-01',
      titulo: 'lassen + sich',
      subtitulo: 'pasiva alternativa activa',
      explicacion: '"Lassen + sich + Infinitivo" es una construcción activa con sentido pasivo que expresa posibilidad o factibilidad. Equivale a "se puede + Infinitivo" o "es posible + Infinitivo". Es muy frecuente en alemán formal y coloquial.',
      ejemplos: [
        { de: 'Das lässt sich machen.', es: 'Eso se puede hacer / es hacible.' },
        { de: 'Das lässt sich nicht beweisen.', es: 'Eso no se puede demostrar.' },
        { de: 'Der Fehler lässt sich leicht beheben.', es: 'El error se puede corregir fácilmente.' },
        { de: 'Diese Frage lässt sich nicht so einfach beantworten.', es: 'Esta pregunta no se puede responder tan fácilmente.' }
      ],
      tip: 'Compara tres formas de expresar lo mismo: "Man kann es machen" / "Es kann gemacht werden" (pasiva) / "Es lässt sich machen". La última suena más elegante y directa en C1.'
    },
    {
      id: 'c1-02',
      titulo: 'sein + zu + Infinitivo',
      subtitulo: 'obligación o posibilidad pasiva',
      explicacion: '"sein + zu + Infinitivo" expresa que algo debe hacerse (obligación) o puede hacerse (posibilidad), según el contexto. Es equivalente a "müssen/können + Passiv" pero más conciso. Muy frecuente en textos legales, técnicos y administrativos.',
      ejemplos: [
        { de: 'Das ist zu beachten.', es: 'Esto debe/hay que tener en cuenta.' },
        { de: 'Die Aufgabe ist bis morgen zu erledigen.', es: 'La tarea hay que terminarla para mañana.' },
        { de: 'Der Fehler ist kaum zu übersehen.', es: 'El error es difícil de pasar por alto.' },
        { de: 'Diese Lösung ist nicht zu empfehlen.', es: 'Esta solución no es recomendable.' }
      ],
      tip: 'Negativo: "nicht zu + Inf." → imposibilidad o algo no recomendable. Positivo: obligación o posibilidad según contexto. ¡El tono lo determina todo!'
    },
    {
      id: 'c1-03',
      titulo: 'Atributo participial extendido',
      subtitulo: 'das von X beschlossene Gesetz',
      explicacion: 'El atributo participial extendido (erweitertes Partizipialattribut) es un participio con sus propios complementos, todo ello insertado entre artículo y sustantivo. Es una estructura muy densa típica del alemán escrito formal. Al leerla, conviene ir al sustantivo primero.',
      ejemplos: [
        { de: 'das von der Regierung beschlossene Gesetz', es: 'la ley aprobada por el gobierno' },
        { de: 'ein in Deutschland hergestelltes Produkt', es: 'un producto fabricado en Alemania' },
        { de: 'die seit Jahren diskutierte Frage', es: 'la cuestión debatida desde hace años' },
        { de: 'der auf dem Tisch liegende Brief', es: 'la carta que está sobre la mesa' }
      ],
      tip: 'Estrategia de lectura: [artículo] + [todo lo que viene hasta el sustantivo = atributo] + [sustantivo]. Luego traduce el atributo como una oración de relativo: "die …, die seit Jahren diskutiert wird".'
    },
    {
      id: 'c1-04',
      titulo: 'Colocaciones verbonominales',
      subtitulo: 'Funktionsverbgefüge',
      explicacion: 'Son combinaciones fijas de verbo + sustantivo (en acusativo o con preposición) que forman una unidad de significado. No pueden parafrasearse literalmente. Son frecuentes en el registro formal y administrativo.',
      ejemplos: [
        { de: 'in Frage stellen', es: 'cuestionar, poner en tela de juicio' },
        { de: 'zur Verfügung stehen/stellen', es: 'estar/poner a disposición' },
        { de: 'Kritik üben (an + Dat.)', es: 'criticar, ejercer crítica' },
        { de: 'eine Entscheidung treffen', es: 'tomar una decisión' }
      ],
      tip: 'Aprende estas colocaciones como bloques léxicos, no palabra a palabra. En escritura formal suenan más precisas que el verbo equivalente simple (stellen vs. bezweifeln).'
    },
    {
      id: 'c1-05',
      titulo: 'Irrealis del pasado',
      subtitulo: 'hätte + P.II / wäre + P.II',
      explicacion: 'El irrealis del pasado expresa que algo no ocurrió pero podría haber ocurrido. En una oración condicional irreal en pasado: "Wenn + hätte/wäre + P.II …, hätte/wäre + P.II". Los verbos modales forman también su propio irrealis: hätte … können/müssen/sollen.',
      ejemplos: [
        { de: 'Wenn ich das gewusst hätte, wäre ich nicht gegangen.', es: 'Si lo hubiera sabido, no habría ido.' },
        { de: 'Du hättest mich anrufen sollen!', es: '¡Deberías haberme llamado!' },
        { de: 'Er hätte das vermeiden können.', es: 'Podría haberlo evitado.' },
        { de: 'Wäre ich früher aufgestanden, hätte ich den Zug nicht verpasst.', es: 'Si me hubiera levantado antes, no habría perdido el tren.' }
      ],
      tip: 'Modal en pasado irreal: hätte + Infinitivo + können/sollen/müssen. El orden puede variar: "Er hätte kommen können" o "Er hätte kommen müssen". El modal va al final.'
    },
    {
      id: 'c1-06',
      titulo: 'Estructuras de frase compleja',
      subtitulo: 'subordinadas encadenadas',
      explicacion: 'En C1 es habitual encontrar varias cláusulas subordinadas anidadas o encadenadas. El verbo de cada subordinada va al final de esa cláusula. Cuando dos infinitivos o participios coinciden al final, el orden es: objeto → participio → auxiliar (Ersatzinfinitiv para modales).',
      ejemplos: [
        { de: 'Ich weiß, dass er sagt, dass es schwer ist.', es: 'Sé que él dice que es difícil.' },
        { de: 'Obwohl er müde war, weil er nicht geschlafen hatte, arbeitete er weiter.', es: 'Aunque estaba cansado porque no había dormido, siguió trabajando.' },
        { de: 'Er hat es nicht kommen sehen. (Ersatzinfinitiv)', es: 'No lo vio venir.' },
        { de: 'Sie hat es tun wollen. (modal en Perf.)', es: 'Ella lo quiso hacer.' }
      ],
      tip: 'El Ersatzinfinitiv: cuando un modal o "sehen/hören/lassen" va en Perfekt, usa infinitivo en vez de Partizip II: "hat… sehen" (no "hat… gesehen"). Es una excepción crucial.'
    },
    {
      id: 'c1-07',
      titulo: 'Formación de palabras: compuestos',
      subtitulo: 'Komposita — cómo interpretar la cadena',
      explicacion: 'El alemán puede crear compuestos nominales casi sin límite uniendo dos o más palabras. El género del compuesto es el del último elemento (el núcleo). El primer elemento modifica al segundo. Para interpretarlos: ve de derecha a izquierda.',
      ejemplos: [
        { de: 'die Haustür', es: 'la puerta de la casa (Haus + Tür → fem.)' },
        { de: 'der Krankenversicherungsbeitrag', es: 'la cotización al seguro médico' },
        { de: 'die Bundestagswahl', es: 'las elecciones al Bundestag' },
        { de: 'das Handtuch', es: 'la toalla (Hand + Tuch → neutro)' }
      ],
      tip: 'Cuando veas un compuesto desconocido, divídelo por sus partes. A veces hay una -s- o -en- de enlace entre elementos (Bundestagswahl, Kindergarten). No forman parte de ninguna de las palabras componentes.'
    },
    {
      id: 'c1-08',
      titulo: 'Partículas de evidencialidad',
      subtitulo: 'soll, will, dürfte (fuente de información)',
      explicacion: 'Ciertos modales en Konjunktiv II o Indikativ expresan la fuente o grado de certeza de una afirmación. "soll" (según se dice / se supone), "will" (según afirma él mismo), "dürfte" (probablemente / es de suponer), "müsste" (debería ser así según cálculo).',
      ejemplos: [
        { de: 'Er soll sehr reich sein.', es: 'Dicen que es muy rico.' },
        { de: 'Sie will das nicht gewusst haben.', es: 'Ella afirma que no lo sabía.' },
        { de: 'Das dürfte schwierig sein.', es: 'Eso probablemente sea difícil.' },
        { de: 'Es müsste jetzt fertig sein.', es: 'Ya debería estar listo (calculando).' }
      ],
      tip: '"soll" = fuente externa (otros dicen). "will" = fuente es el propio sujeto (él afirma). "dürfte" = estimación probabilística del hablante. Muy útil en textos periodísticos y académicos.'
    },
    {
      id: 'c1-09',
      titulo: 'Cohesión textual',
      subtitulo: 'referencia anafórica, elipsis, sustitución',
      explicacion: 'Un texto cohesionado en C1 evita repeticiones usando pronombres, pronombres demostrativos (dieser, jener), adverbios pronominales (dabei, dazu, darüber) y elipsis. Estos mecanismos crean fluidez y claridad referencial.',
      ejemplos: [
        { de: 'Das Problem ist bekannt. Dieses / Es wurde bereits diskutiert.', es: 'El problema es conocido. Este / Ya fue debatido.' },
        { de: 'Er sprach über Klimawandel. Dabei betonte er…', es: 'Habló sobre el cambio climático. Al respecto subrayó…' },
        { de: 'Sie lehnte den Vorschlag ab. Dazu sagte sie…', es: 'Rechazó la propuesta. Sobre eso dijo…' },
        { de: 'Ich habe das Buch gelesen. Du auch? — Ja, ich auch.', es: '¿También tú? — Sí, yo también. (elipsis)' }
      ],
      tip: 'Los adverbios pronominales (da- + preposición) remiten a cosas o ideas, nunca a personas: "darüber" (sobre ello), "dafür" (para ello). Para personas usa pronombre: "für ihn".'
    },
    {
      id: 'c1-10',
      titulo: 'Inversión estilística',
      subtitulo: 'Kaum…als, Nicht nur…sondern',
      explicacion: 'La inversión (colocar un elemento no sujeto en posición 1 para énfasis) es un recurso de estilo habitual en C1. Algunas estructuras inversivas fijas: "Kaum hatte er… als…" (apenas hubo… cuando), "Nicht nur…, sondern auch…", inicio con cláusula adverbial.',
      ejemplos: [
        { de: 'Kaum hatte er das Zimmer betreten, als das Licht ausging.', es: 'Apenas había entrado en la habitación cuando se fue la luz.' },
        { de: 'Nie hätte ich das gedacht.', es: 'Jamás lo habría pensado.' },
        { de: 'Erst wenn du fertig bist, können wir gehen.', es: 'Solo cuando hayas terminado podremos irnos.' },
        { de: 'So groß war die Überraschung, dass er sprachlos war.', es: 'Tan grande fue la sorpresa que se quedó sin palabras.' }
      ],
      tip: '"Kaum…als" → ambos verbos en Präteritum. Cuando la subordinada va primero, el verbo principal va inmediatamente después de la coma (V2): "Als es regnete, blieb er zu Hause."'
    }
  ],

  C2: [
    {
      id: 'c2-01',
      titulo: 'Registro y variación estilística',
      subtitulo: 'formal / coloquial / científico / burocrático',
      explicacion: 'En C2 el hablante domina múltiples registros y puede cambiar entre ellos conscientemente. El alemán formal usa nominalizaciones densas, pasiva y subjuntivo; el coloquial prefiere frases cortas, verbos activos y partículas modales. El registro científico tiende a la impersonalidad.',
      ejemplos: [
        { de: 'Formal: "Die Entscheidung wurde getroffen." / Coloquial: "Wir haben entschieden."', es: 'La decisión fue tomada. / Decidimos.' },
        { de: 'Científico: "Es konnte nachgewiesen werden, dass…"', es: 'Se pudo demostrar que…' },
        { de: 'Burocrático: "Gemäß § 5 Abs. 2 wird hiermit…"', es: 'Conforme al § 5 párr. 2 se dispone…' },
        { de: 'Coloquial: "Das ist halt so."', es: 'Así son las cosas.' }
      ],
      tip: 'Ejercicio: toma la misma idea y exprésala en tres registros distintos. Reconocer el registro adecuado para cada situación es el núcleo de la competencia C2.'
    },
    {
      id: 'c2-02',
      titulo: 'Fraseología e idiomatismos',
      subtitulo: 'expresiones fijas, opacidad semántica',
      explicacion: 'Las expresiones idiomáticas tienen un significado que no se deduce de sus partes. En C2 se espera que el hablante las reconozca en contexto y las use activamente. Muchas están ligadas a campos semánticos (partes del cuerpo, animales, clima) y tienen equivalentes en otras lenguas.',
      ejemplos: [
        { de: 'Das ist nicht mein Bier.', es: 'Eso no es asunto mío.' },
        { de: 'Tomaten auf den Augen haben', es: 'No ver lo obvio (lit.: tener tomates en los ojos)' },
        { de: 'jemandem auf den Zahn fühlen', es: 'sonsacar a alguien / tantear el terreno' },
        { de: 'die Katze im Sack kaufen', es: 'comprar algo a ciegas' }
      ],
      tip: 'Aprende los idiomatismos en contexto narrativo, no en listas. Al escuchar o leer uno nuevo, busca su equivalente funcional en español (no traducción literal).'
    },
    {
      id: 'c2-03',
      titulo: 'Figuras retóricas',
      subtitulo: 'Ironie, Euphemismus, Litotes, Hyperbel',
      explicacion: 'En C2 se reconocen y producen figuras retóricas en texto escrito y oral. La ironía dice lo contrario de lo que se piensa; el eufemismo suaviza realidades duras; la lítote niega el contrario para afirmar; la hipérbole exagera para enfatizar.',
      ejemplos: [
        { de: 'Ironía: "Das war ja wieder ein toller Erfolg!" (tras un fracaso)', es: '¡Vaya gran éxito de nuevo! (sarcasmo)' },
        { de: 'Eufemismo: "Er ist von uns gegangen."', es: 'Nos ha dejado. (= ha muerto)' },
        { de: 'Lítotes: "Das ist nicht uninteressant."', es: 'Eso no carece de interés. (= es interesante)' },
        { de: 'Hyperbel: "Ich habe tausendmal gesagt, das soll er nicht tun!"', es: 'Se lo he dicho mil veces.' }
      ],
      tip: 'La lítotes es especialmente típica del alemán académico y de la prensa seria: suaviza afirmaciones contundentes. Aprende a detectarla para no interpretar una doble negación como negación simple.'
    },
    {
      id: 'c2-04',
      titulo: 'Ambigüedad pragmática',
      subtitulo: 'implicatura, presuposición, sobreentendido',
      explicacion: 'En C2 se comprende lo que se dice más allá de las palabras literales: implicaturas (lo que se da a entender sin decirlo), presuposiciones (lo que se asume como cierto) y sobreentendidos culturales. La competencia pragmática distingue el nivel C2 del C1.',
      ejemplos: [
        { de: '"Kannst du das Fenster aufmachen?" (pregunta que es en realidad una petición)', es: '¿Puedes abrir la ventana? (= ábrela, por favor)' },
        { de: 'Presuposición: "Wann hörst du auf zu rauchen?" (asume que fumas)', es: '¿Cuándo dejas de fumar? (presupone que fumas)' },
        { de: 'Implicatura: "Es gibt noch Kuchen." (insinuando: sírvete)', es: 'Queda pastel. (insinuación: cómelo)' },
        { de: '"Das war ja… interessant." (con pausa y entonación → ironía)', es: '"Fue… interesante." (sobreentendido negativo)' }
      ],
      tip: 'La entonación y las pausas son cruciales para la pragmática oral. En texto escrito, los puntos suspensivos, las comillas irónicas y el contexto son las pistas principales.'
    },
    {
      id: 'c2-05',
      titulo: 'Convenciones del texto científico',
      subtitulo: 'pasiva, nominalizaciones densas, hedging',
      explicacion: 'El alemán académico y científico usa pasiva impersonal, nominalizaciones en cadena y estructuras de hedging (mitigación de afirmaciones) para expresar objetividad. El sujeto "man" también es frecuente como alternativa a la pasiva.',
      ejemplos: [
        { de: 'Es konnte gezeigt werden, dass… (pasiva impersonal)', es: 'Se pudo demostrar que…' },
        { de: 'die Weiterentwicklung der Forschungsmethodik (nominalización)', es: 'el desarrollo ulterior de la metodología de investigación' },
        { de: 'Es scheint, als ob… / Es lässt sich vermuten, dass… (hedging)', es: 'Parece que… / Cabe suponer que…' },
        { de: 'Man geht davon aus, dass… (man impersonal)', es: 'Se parte de que… / Se asume que…' }
      ],
      tip: 'El hedging mitiga las afirmaciones para mostrar rigor científico: "Es wurde beobachtet, dass…" suena más objetivo que "Ich sah, dass…". Practica estas fórmulas para la escritura académica.'
    },
    {
      id: 'c2-06',
      titulo: 'Arcaísmos y registro literario',
      subtitulo: 'ward, sei, möge — uso estilístico',
      explicacion: 'Algunas formas arcaicas sobreviven en textos literarios, bíblicos, jurídicos o en usos estilísticos. "Ward" es el Präteritum arcaico de "werden"; "sei" es Konjunktiv I de "sein" en frases formularias; "möge" es el optativo de "mögen".',
      ejemplos: [
        { de: '"Es ward Licht." (Génesis bíblico)', es: 'Y hubo luz. (Präteritum arcaico de werden)' },
        { de: '"Er sei gesegnet." (fórmula)', es: 'Sea bendecido.' },
        { de: '"Möge er in Frieden ruhen."', es: 'Que descanse en paz.' },
        { de: '"Herr, dein Wille geschehe."', es: 'Señor, hágase tu voluntad.' }
      ],
      tip: 'No necesitas producir estos arcaísmos activamente, pero sí reconocerlos al leer literatura clásica alemana (Goethe, Schiller, Kafka) o textos religiosos y jurídicos.'
    },
    {
      id: 'c2-07',
      titulo: 'Variantes dialectales',
      subtitulo: 'reconocer rasgos bávaros, suizos, austriacos',
      explicacion: 'El alemán tiene variantes regionales con vocabulario, pronunciación y gramática propios. El estándar (Hochdeutsch) es la base C2, pero la comprensión de variantes es esencial para la comunicación real. Los mayores dialectos: bávaro-austriaco, suizo-alemán, bajo alemán (Plattdeutsch).',
      ejemplos: [
        { de: 'Bávaro: "Servus / Grüß Gott" (saludo)', es: 'Hola / Buenos días' },
        { de: 'Austriaco: "Jänner" (enero), "Paradeiser" (tomate)', es: 'vs. Januar, Tomate en el estándar' },
        { de: 'Suizo: "Ich bin am Essen." (Verlaufsform frecuente)', es: 'Estoy comiendo.' },
        { de: 'Platt: "Moin!" (saludo), "dat" en vez de "das"', es: '¡Buenos días!, eso' }
      ],
      tip: 'El suizo-alemán oral es prácticamente ininteligible para un hablante de Hochdeutsch sin exposición previa. Escucha podcasts en variantes dialectales para entrenar la comprensión.'
    },
    {
      id: 'c2-08',
      titulo: 'Metaidioma',
      subtitulo: 'relativizar, distanciarse, comentar',
      explicacion: 'En C2 el hablante usa con fluidez fórmulas metadiscursivas para estructurar su discurso, relativizar afirmaciones, marcar ejemplos o conclusiones, y distanciarse de una opinión. Estas fórmulas son características de los registros oral y escrito formales.',
      ejemplos: [
        { de: 'Es scheint, als ob… / Soweit ich weiß,…', es: 'Parece que… / Hasta donde sé,…' },
        { de: 'Mit anderen Worten: … / Das heißt,…', es: 'En otras palabras: … / Es decir,…' },
        { de: 'Abschließend lässt sich sagen, dass…', es: 'A modo de conclusión, cabe decir que…' },
        { de: 'Man könnte einwenden, dass…', es: 'Podría objetarse que…' }
      ],
      tip: 'Estas fórmulas son imprescindibles en exámenes orales de C2 (TestDaF, DSH, Goethe-C2) porque demuestran fluidez discursiva. Practícalas integrándolas en tus producciones escritas y orales.'
    },
    {
      id: 'c2-09',
      titulo: 'Modalidad compleja',
      subtitulo: 'müsste eigentlich, dürfte wohl, hätte können',
      explicacion: 'En C2 se dominan combinaciones de modal + Konjunktiv II + adverbio para matizar grados de probabilidad, obligación o posibilidad con precisión. La combinación de varios modificadores en una frase es característica del alemán culto.',
      ejemplos: [
        { de: 'Das müsste eigentlich funktionieren.', es: 'Eso debería funcionar en principio.' },
        { de: 'Das dürfte wohl kaum stimmen.', es: 'Es poco probable que eso sea correcto.' },
        { de: 'Er hätte das vermeiden können.', es: 'Podría haberlo evitado.' },
        { de: 'Das sollte doch möglich sein.', es: 'Eso sí que debería ser posible.' }
      ],
      tip: '"Eigentlich" con modal añade el matiz "en principio / en teoría". "Wohl" con modal expresa suposición probabilística. Estos adverbios matizadores son la firma del hablante C2.'
    },
    {
      id: 'c2-10',
      titulo: 'Características de tipos de texto',
      subtitulo: 'Protokoll, Gutachten, Leserbrief, Essay',
      explicacion: 'Cada tipo de texto tiene convenciones propias de estructura, léxico y registro. En C2 se espera dominar al menos: el ensayo argumentativo, la carta al director, el informe/protocolo y la reseña. Cada uno tiene fórmulas de apertura, desarrollo y cierre específicas.',
      ejemplos: [
        { de: 'Essay: Einleitung → Argumentation → Schlussfolgerung', es: 'Ensayo: introducción → argumentación → conclusión' },
        { de: 'Leserbrief: "Zu Ihrem Artikel vom … möchte ich anmerken, dass…"', es: 'Carta al director: "Con respecto a su artículo del… quisiera señalar que…"' },
        { de: 'Gutachten: "Im Folgenden wird beurteilt, ob…"', es: 'Informe/Dictamen: "A continuación se evalúa si…"' },
        { de: 'Protokoll: sachlich, ohne Meinung, Vergangenheit oder Indikativ Präsens', es: 'Acta: objetivo, sin opinión, en pasado o presente' }
      ],
      tip: 'Para el examen C2 (Goethe-C2, DSH, TestDaF): analiza modelos de cada tipo de texto e identifica sus fórmulas de apertura y cierre. La estructura formal pesa tanto como el contenido.'
    }
  ]
};

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

let currentLevel = 'A1';
let openRuleId = null;

function getHashLevel() {
  const h = location.hash.replace('#', '').toUpperCase();
  return LEVELS.includes(h) ? h : 'A1';
}

function setLevel(level, pushState = true) {
  currentLevel = level;
  openRuleId = null;
  if (pushState) history.pushState(null, '', '#' + level.toLowerCase());
  renderLevelTabs();
  renderRuleList();
}

function renderLevelTabs() {
  const bar = document.getElementById('gram-level-bar');
  bar.innerHTML = LEVELS.map(lvl => `
    <button class="gram-level-btn${lvl === currentLevel ? ' active' : ''}" onclick="setLevel('${lvl}')">
      ${lvl}
    </button>
  `).join('');
}

function renderRuleList() {
  const rules = GRAMMAR_DATA[currentLevel];
  const container = document.getElementById('gram-rules');
  container.innerHTML = rules.map((rule, i) => `
    <div class="gram-rule-card${openRuleId === rule.id ? ' open' : ''}" id="rule-${rule.id}">
      <button class="gram-rule-header" onclick="toggleRule('${rule.id}')">
        <span class="gram-rule-num">${i + 1}</span>
        <span class="gram-rule-titles">
          <span class="gram-rule-title">${rule.titulo}</span>
          <span class="gram-rule-subtitle">${rule.subtitulo}</span>
        </span>
        <span class="gram-rule-chevron">${openRuleId === rule.id ? '▲' : '▼'}</span>
      </button>
      <div class="gram-rule-body">
        <p class="gram-rule-explicacion">${rule.explicacion}</p>
        <div class="gram-ejemplos">
          ${rule.ejemplos.map(ej => `
            <div class="gram-ejemplo">
              <span class="gram-ej-de">${ej.de}</span>
              <span class="gram-ej-arrow">→</span>
              <span class="gram-ej-es">${ej.es}</span>
            </div>
          `).join('')}
        </div>
        <div class="gram-tip">
          <span class="gram-tip-icon">💡</span>
          <span>${rule.tip}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleRule(id) {
  openRuleId = openRuleId === id ? null : id;
  renderRuleList();
  if (openRuleId) {
    const el = document.getElementById('rule-' + openRuleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

window.addEventListener('popstate', () => {
  setLevel(getHashLevel(), false);
});

const _moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
const _sunSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function toggleGramDark() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('darkModeBtn').innerHTML = isDark ? _sunSVG : _moonSVG;
  localStorage.setItem('darkMode_gram', isDark);
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode_gram') === 'true') {
    document.body.classList.add('dark');
    document.getElementById('darkModeBtn').innerHTML = _sunSVG;
  }
  setLevel(getHashLevel(), false);
});
