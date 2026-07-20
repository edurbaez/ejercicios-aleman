window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
window.GRAMMAR_DATA.A2 = [
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
    },
    {
      id: 'a2-11',
      titulo: 'Zwei feste Positionen im Satz',
      subtitulo: 'verbo conjugado + segunda parte al final, ej. gehen + infinitivo',
      regla_base: 'Además de V2 (verbo conjugado en posición 2), muchas construcciones tienen una segunda posición fija al final: gehen + infinitivo de actividad, modal + infinitivo, o prefijo separable.',
      tabla: { headers: ['Posición 2', 'Final de la frase', 'Ejemplo'], rows: [['gehe', 'schwimmen', 'Ich gehe schwimmen.'], ['kann', 'schwimmen', 'Ich kann schwimmen.'], ['rufe', 'an', 'Ich rufe dich an.']] },
      excepciones: 'gehen + infinitivo solo funciona con verbos de actividad física o de ocio (schwimmen, einkaufen, tanzen, joggen); no se usa para cualquier infinitivo (no *Ich gehe arbeiten en el sentido de "voy a trabajar" como intención, aunque sí como actividad concreta).',
      explicacion: 'La sintaxis alemana se organiza en torno a dos posiciones fijas dentro de la frase principal: el verbo conjugado siempre ocupa la posición 2 (V2), y el resto del predicado —cuando lo hay— se coloca al final, formando lo que se llama el "marco verbal" (Satzklammer). Este patrón aparece con "gehen" seguido de un infinitivo que indica la actividad a la que se va (Ich gehe schwimmen = voy a nadar), con los verbos modales seguidos de infinitivo (Ich kann schwimmen), y con los verbos separables cuyo prefijo salta al final (Ich rufe dich an). Entender esta estructura de "dos posiciones" es clave para construir frases alemanas correctas desde el nivel A2, porque se repite en Perfekt (haben/sein … Partizip II), modales, y verbos separables. Todo lo que no sea el verbo conjugado en P2 tiende a desplazarse al final de la oración.',
      ejemplos: [
        { de: 'Ich gehe heute Abend tanzen.', es: 'Esta noche voy a bailar.' },
        { de: 'Wir gehen im Sommer schwimmen.', es: 'En verano vamos a nadar.' },
        { de: 'Er geht jeden Tag joggen.', es: 'Él va a correr todos los días.' },
        { de: 'Gehst du morgen einkaufen?', es: '¿Vas a hacer la compra mañana?' }
      ],
      tip: 'Piensa en la frase alemana como un marco (Satzklammer): el verbo conjugado abre el marco en posición 2, y todo lo demás —infinitivo, participio, prefijo separable— cierra el marco al final.'
    },
    {
      id: 'a2-12',
      titulo: 'Verben mit Akkusativ und Dativ',
      subtitulo: 'geben, schenken, zeigen, schicken — doble objeto',
      regla_base: 'Con dos sustantivos: Dativo antes de Acusativo. Con un pronombre: el pronombre va primero. Con dos pronombres: Acusativo antes de Dativo.',
      tabla: { headers: ['Caso', 'Orden', 'Ejemplo'], rows: [['2 sustantivos', 'Dat. + Akk.', 'Ich schenke meinem Vater ein Buch.'], ['1 pronombre (Akk.)', 'Pron. + sust.', 'Ich schenke es meinem Vater.'], ['1 pronombre (Dat.)', 'Pron. + sust.', 'Ich schenke ihm ein Buch.'], ['2 pronombres', 'Akk. + Dat.', 'Ich schenke es ihm.']] },
      excepciones: 'El orden Akk. antes de Dat. con dos pronombres es la excepción a la regla general de "Dativo antes de Acusativo" — memorízalo como caso aparte.',
      explicacion: 'Verbos como geben (dar), schenken (regalar), zeigen (mostrar), schicken (enviar), bringen (traer), erzählen (contar), erklären (explicar) y kaufen (comprar) rigen dos objetos: uno en dativo (la persona, ¿a quién?) y otro en acusativo (la cosa, ¿qué?). El orden depende de si los objetos son sustantivos o pronombres. Si ambos son sustantivos, el dativo va antes que el acusativo (Ich schenke meinem Vater ein Buch). Si uno de los dos es un pronombre, el pronombre se adelanta, sea cual sea su caso (Ich schenke es meinem Vater / Ich schenke ihm ein Buch). Si ambos son pronombres, el orden se invierte respecto a la regla general: acusativo antes de dativo (Ich schenke es ihm).',
      ejemplos: [
        { de: 'Ich schenke meinem Vater ein Buch.', es: 'Le regalo un libro a mi padre.' },
        { de: 'Ich schenke es meinem Vater.', es: 'Se lo regalo a mi padre.' },
        { de: 'Ich schenke ihm ein Buch.', es: 'Le regalo un libro (a él).' },
        { de: 'Ich schenke es ihm.', es: 'Se lo regalo (a él).' }
      ],
      tip: 'Regla mnemotécnica: "sustantivos: Dat-Akk; con un pronombre, el pronombre salta al frente; con dos pronombres: Akk-Dat" — el único orden que se invierte es cuando ambos objetos son pronombres.'
    },
    {
      id: 'a2-13',
      titulo: 'Verben mit Dativ',
      subtitulo: 'helfen, danken, gefallen, gehören...',
      regla_base: 'Ciertos verbos rigen siempre dativo, aunque en español parezcan transitivos (llevar objeto directo).',
      tabla: { headers: ['Verbo', 'Significado'], rows: [['helfen', 'ayudar'], ['danken', 'agradecer'], ['gefallen', 'gustar'], ['gehören', 'pertenecer'], ['passen', 'quedar bien / sentar'], ['schmecken', 'saber a / gustar (comida)'], ['gratulieren', 'felicitar'], ['folgen', 'seguir'], ['antworten', 'responder'], ['glauben', 'creer']] },
      excepciones: 'En español estos verbos suelen construirse con objeto directo ("ayudar a alguien", "responder algo"), lo que lleva a errores frecuentes al traducir literalmente al acusativo alemán.',
      explicacion: 'Un grupo de verbos alemanes de uso muy frecuente rige exclusivamente el caso dativo, no el acusativo, aunque su traducción al español sugiera un objeto directo. Entre los más comunes en A2 están: helfen (ayudar), danken (agradecer), gefallen (gustar), gehören (pertenecer), passen (quedar bien, sentar), schmecken (saber a, gustar en el sentido de sabor), gratulieren (felicitar), folgen (seguir), antworten (responder) y glauben (creer). Como estos verbos no llevan objeto en acusativo, no tienen forma pasiva personal (solo impersonal). Es recomendable memorizarlos como lista cerrada, ya que no siguen una regla predecible desde el significado.',
      ejemplos: [
        { de: 'Ich helfe dir.', es: 'Te ayudo.' },
        { de: 'Das gehört mir.', es: 'Eso es mío / me pertenece.' },
        { de: 'Es schmeckt ihm gut.', es: 'Le sabe bien (a él).' },
        { de: 'Wir danken Ihnen für die Hilfe.', es: 'Le agradecemos la ayuda.' }
      ],
      tip: 'Aprende cada verbo con un pronombre dativo pegado, como si fuera parte de la palabra: "helfen + dir", "danken + Ihnen", "gefallen + mir" — así el caso se memoriza junto al verbo.'
    },
    {
      id: 'a2-14',
      titulo: 'Frage nach Personen und Sachen',
      subtitulo: 'wer/wen/wem vs. was',
      regla_base: 'Para personas, "wer" se declina según el caso (wer/wen/wem/wessen). Para cosas se usa "was", invariable salvo con preposición (wo(r)+prep).',
      tabla: { headers: ['Caso', 'Persona', 'Cosa'], rows: [['Nominativ', 'wer', 'was'], ['Akkusativ', 'wen', 'was'], ['Dativ', 'wem', '(kein Fall)'], ['Genitiv', 'wessen', '—']] },
      excepciones: 'Con preposición + cosa se usa la forma fusionada "wo(r)+preposición": Womit schreibst du? (¿con qué escribes?), Wofür interessierst du dich? (¿por qué te interesas?). Con personas se usa preposición + wen/wem: Mit wem sprichst du?',
      explicacion: 'Para preguntar por personas, el pronombre interrogativo "wer" se declina según la función que cumple en la frase: wer en nominativo (sujeto, ¿quién?), wen en acusativo (objeto directo, ¿a quién?), wem en dativo (objeto indirecto, ¿a quién/para quién?) y wessen en genitivo (posesión, ¿de quién?). Para preguntar por cosas se usa "was", que es invariable en nominativo y acusativo; en combinación con preposiciones no se dice "für was" o "mit was" en el registro cuidado, sino la forma fusionada "wo(r)+preposición": Womit (¿con qué?), Wofür (¿para qué?), Worüber (¿sobre qué?). Esta distinción persona/cosa es clave para no confundir "wen" (persona, acusativo) con "was" (cosa).',
      ejemplos: [
        { de: 'Wer kommt heute?', es: '¿Quién viene hoy?' },
        { de: 'Wen siehst du dort?', es: '¿A quién ves allí?' },
        { de: 'Wem hilfst du?', es: '¿A quién ayudas?' },
        { de: 'Was machst du gerade?', es: '¿Qué estás haciendo ahora?' }
      ],
      tip: 'Si la respuesta esperada es una persona, usa wer/wen/wem/wessen según el caso; si es una cosa, usa was (o wo(r)+preposición si hay preposición de por medio).'
    },
    {
      id: 'a2-15',
      titulo: 'Präteritum: sein und haben',
      subtitulo: 'war, hatte...',
      regla_base: 'Aunque el Perfekt domina en el habla, sein y haben casi siempre se usan en Präteritum incluso en conversación: war, hatte en vez de bin gewesen, habe gehabt.',
      tabla: { headers: ['', 'sein', 'haben'], rows: [['ich', 'war', 'hatte'], ['du', 'warst', 'hattest'], ['er/sie/es', 'war', 'hatte'], ['wir', 'waren', 'hatten'], ['ihr', 'wart', 'hattet'], ['sie/Sie', 'waren', 'hatten']] },
      excepciones: 'Con otros verbos, el Perfekt es la norma en el habla; sein y haben (junto a los modales) son la excepción donde se prefiere el Präteritum incluso hablando.',
      explicacion: 'En alemán hablado, el Perfekt es el tiempo pasado más habitual para la mayoría de los verbos. Sin embargo, "sein" y "haben" son una excepción notable: incluso en conversación cotidiana se usan casi siempre en Präteritum (war, hatte) en lugar de su forma de Perfekt (bin gewesen, habe gehabt), que suena forzada o poco natural. Las conjugaciones son: sein → war, warst, war, waren, wart, waren; haben → hatte, hattest, hatte, hatten, hattet, hatten. Merece la pena memorizar estas dos conjugaciones desde el principio, ya que se usan constantemente para describir estados y posesiones en el pasado.',
      ejemplos: [
        { de: 'Ich war müde.', es: 'Yo estaba cansado.' },
        { de: 'Wir hatten keine Zeit.', es: 'No teníamos tiempo.' },
        { de: 'Er war in Berlin.', es: 'Él estuvo en Berlín.' },
        { de: 'Hattest du Hunger?', es: '¿Tenías hambre?' }
      ],
      tip: 'Regla práctica: para "sein" y "haben" (y también para los modales), usa siempre el Präteritum al hablar, no el Perfekt — es la forma natural incluso en conversación informal.'
    },
    {
      id: 'a2-16',
      titulo: 'Präteritum: Modalverben',
      subtitulo: 'musste, konnte, wollte...',
      regla_base: 'Los modales en Präteritum pierden el cambio vocálico del presente (vuelven a la vocal del infinitivo) y toman terminaciones regulares de pasado.',
      tabla: { headers: ['', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'], rows: [['ich/er', 'konnte', 'musste', 'wollte', 'sollte', 'durfte', 'mochte'], ['du', 'konntest', 'musstest', 'wolltest', 'solltest', 'durftest', 'mochtest'], ['wir/sie', 'konnten', 'mussten', 'wollten', 'sollten', 'durften', 'mochten']] },
      excepciones: 'A diferencia del presente, en Präteritum la 1.ª y 3.ª persona singular vuelven a coincidir (konnte/konnte) pero sin la vocal modificada del presente (kann → konnte, no *könnte, que es el Konjunktiv II).',
      explicacion: 'Los verbos modales forman su Präteritum de manera regular en cuanto a terminaciones (-te, -test, -te, -ten, -tet, -ten), pero recuperan la vocal del infinitivo en lugar de la vocal modificada que usan en presente. Así, können (presente: kann) pasa a konnte; müssen (muss) a musste; wollen (will) a wollte; sollen (soll) a sollte; dürfen (darf) a durfte; mögen (mag) a mochte. Este Präteritum de los modales se usa constantemente también en el habla coloquial, no solo en textos escritos, a diferencia del Präteritum de la mayoría de los demás verbos. Es una de las excepciones más importantes a la preferencia general por el Perfekt al hablar.',
      ejemplos: [
        { de: 'Ich konnte nicht kommen.', es: 'No pude venir.' },
        { de: 'Er musste arbeiten.', es: 'Tuvo que trabajar.' },
        { de: 'Wir wollten ins Kino gehen.', es: 'Queríamos ir al cine.' },
        { de: 'Sie durfte als Kind nicht fernsehen.', es: 'De niña no le dejaban ver la tele.' }
      ],
      tip: 'No confundas konnte (Präteritum, "pude/podía") con könnte (Konjunktiv II, "podría") — la diferencia de un umlaut cambia completamente el significado.'
    },
    {
      id: 'a2-17',
      titulo: 'Zeitgebrauch',
      subtitulo: '¿Präteritum o Perfekt?',
      regla_base: 'En alemán hablado se usa casi siempre el Perfekt, EXCEPTO con sein, haben y los modales, que casi siempre van en Präteritum incluso hablando.',
      tabla: { headers: ['Contexto', 'Tiempo preferido', 'Ejemplo'], rows: [['Habla general', 'Perfekt', 'Ich habe gearbeitet.'], ['sein / haben (habla)', 'Präteritum', 'Ich war müde.'], ['Modales (habla)', 'Präteritum', 'Ich konnte nicht.'], ['Narración escrita', 'Präteritum', 'Er ging langsam nach Hause.']] },
      excepciones: 'La distinción no es absoluta: en el sur de Alemania, Austria y Suiza el Präteritum casi no se usa ni siquiera con sein/haben en el habla informal, prefiriendo también ahí el Perfekt.',
      explicacion: 'Una duda muy frecuente en A2 es cuándo usar Präteritum y cuándo Perfekt. La regla práctica es: en alemán hablado se usa casi siempre el Perfekt para referirse al pasado, salvo con sein, haben y los verbos modales, que casi siempre aparecen en Präteritum (war, hatte, konnte, musste) incluso en una conversación informal, porque su forma de Perfekt (bin gewesen, habe gehabt, habe gekonnt) suena forzada. El Präteritum "puro" con el resto de verbos es propio sobre todo de la lengua escrita y narrativa: novelas, cuentos, noticias, biografías. Al hablar, decir "Ich arbeitete gestern" en vez de "Ich habe gestern gearbeitet" suena artificial o literario.',
      ejemplos: [
        { de: 'Ich war gestern krank.', es: 'Ayer estaba enfermo. (no "bin gewesen")' },
        { de: 'Ich habe gestern gearbeitet.', es: 'Ayer trabajé. (Perfekt, no *arbeitete)' },
        { de: 'Er konnte nicht kommen, weil er krank war.', es: 'No pudo venir porque estaba enfermo.' },
        { de: 'In der Geschichte ging der Mann langsam nach Hause.', es: 'En la historia, el hombre iba caminando despacio a casa. (narración escrita)' }
      ],
      tip: 'Al hablar: usa Perfekt para casi todo, pero Präteritum para sein/haben/modales. Al escribir una narración o leer un texto, espera encontrar Präteritum con todos los verbos.'
    },
    {
      id: 'a2-18',
      titulo: 'Lokale Präpositionen: Wohin?',
      subtitulo: 'in, an, auf, nach, zu + movimiento',
      regla_base: 'Para expresar destino (¿adónde?) la preposición depende del tipo de lugar: nach (ciudades/países), zu (personas/edificios), in/an/auf + Akkusativ (espacios/límites/superficies).',
      tabla: { headers: ['Preposición', 'Se usa con', 'Ejemplo'], rows: [['nach', 'ciudades/países sin artículo', 'nach Berlin, nach Deutschland'], ['zu', 'personas / edificios-instituciones', 'zum Arzt, zur Schule'], ['in + Akk.', 'espacios cerrados/delimitados', 'ins Kino, in die Stadt'], ['an + Akk.', 'límites, orillas', 'ans Meer'], ['auf + Akk.', 'superficies / eventos', 'auf den Markt']] },
      excepciones: 'Países y ciudades con artículo (die Schweiz, die Türkei) no usan nach sino in + Akkusativ: in die Schweiz, no *nach die Schweiz.',
      explicacion: 'Para preguntar y responder sobre la dirección o el destino de un movimiento (¿wohin?) el alemán distingue varias preposiciones según el tipo de lugar. "Nach" se usa con ciudades y países sin artículo (nach Berlin, nach Deutschland, nach Spanien). "Zu" se usa cuando el destino es una persona o un edificio/institución concebido como punto de referencia (zum Arzt = a la consulta del médico, zur Schule = al colegio). "In" + acusativo se usa para espacios cerrados o delimitados en los que se entra (ins Kino, in die Stadt). "An" + acusativo se usa para límites o líneas, como orillas (ans Meer, an die Grenze). "Auf" + acusativo se usa para superficies o eventos concebidos como superficie abierta (auf den Markt, auf die Party).',
      ejemplos: [
        { de: 'Ich fahre nach Berlin.', es: 'Voy a Berlín.' },
        { de: 'Ich gehe zum Arzt.', es: 'Voy al médico.' },
        { de: 'Wir gehen ins Kino.', es: 'Vamos al cine.' },
        { de: 'Sie fahren ans Meer.', es: 'Van a la costa/al mar.' }
      ],
      tip: 'Pregúntate qué tipo de destino es: ¿ciudad/país? → nach. ¿persona o edificio-institución? → zu. ¿espacio cerrado? → in + Akk. ¿orilla/límite? → an + Akk. ¿superficie/evento? → auf + Akk.'
    },
    {
      id: 'a2-19',
      titulo: 'Lokale Präpositionen: Wo?',
      subtitulo: 'in, an, auf, bei + Dativ',
      regla_base: 'Para expresar ubicación (¿dónde?) se usan las mismas preposiciones que para el destino, pero con dativo en vez de acusativo.',
      tabla: { headers: ['Preposición', 'Se usa con', 'Ejemplo'], rows: [['in + Dat.', 'espacios cerrados/delimitados', 'im Kino, in der Stadt'], ['an + Dat.', 'límites, orillas', 'am Meer'], ['auf + Dat.', 'superficies / eventos', 'auf dem Markt'], ['bei + Dat.', 'personas', 'bei meiner Mutter, beim Arzt']] },
      excepciones: '"Bei" con una institución (beim Arzt) significa estar físicamente en ese lugar en el momento presente; no debe confundirse con "zu", que expresa dirección hacia allí.',
      explicacion: 'Para expresar dónde está algo o alguien (¿wo?), es decir una posición estática sin movimiento, el alemán usa en dativo las mismas preposiciones que en acusativo se usaban para el destino: "in" + dativo para espacios cerrados o delimitados (im Kino, in der Stadt), "an" + dativo para límites u orillas (am Meer), "auf" + dativo para superficies o eventos (auf dem Markt). Además, "bei" + dativo se usa para expresar que alguien está en casa de una persona o junto a ella (bei meiner Mutter, bei einem Freund) o en la consulta/local de un profesional (beim Arzt, beim Friseur). Esta pareja Wohin/Wo con las mismas preposiciones pero distinto caso es una de las Wechselpräpositionen vistas en a2-06, aplicada específicamente al contraste destino/ubicación.',
      ejemplos: [
        { de: 'Ich bin im Kino.', es: 'Estoy en el cine.' },
        { de: 'Er ist beim Arzt.', es: 'Está en el médico.' },
        { de: 'Wir sind auf dem Markt.', es: 'Estamos en el mercado.' },
        { de: 'Sie wohnt bei ihrer Mutter.', es: 'Vive en casa de su madre.' }
      ],
      tip: 'Compara siempre con a2-18: la misma preposición (in, an, auf) cambia de Akkusativ a Dativ según si hay movimiento (wohin) o solo ubicación (wo). "Bei" es exclusiva de Wo, no tiene par de movimiento con la misma preposición (se usa "zu" en su lugar).'
    },
    {
      id: 'a2-20',
      titulo: 'Lokale Präpositionen: Woher?',
      subtitulo: 'aus, von',
      regla_base: 'Para expresar origen/procedencia (¿de dónde?) se usan aus (de dentro de un lugar) y von (desde un punto, alejándose).',
      tabla: { headers: ['Preposición', 'Se usa con', 'Ejemplo'], rows: [['aus', 'origen / nacionalidad / interior de un lugar', 'aus Spanien, aus dem Haus'], ['von', 'punto de partida, alejándose de', 'vom Arzt, von der Arbeit']] },
      excepciones: 'Con personas o instituciones a las que se fue con "zu"/"bei", el regreso se expresa con "von": Ich war beim Arzt → Ich komme vom Arzt (no *aus dem Arzt).',
      explicacion: 'Para preguntar y responder sobre el origen o la procedencia de algo o alguien (¿woher?), el alemán distingue principalmente entre "aus" y "von". "Aus" indica el origen desde dentro de un lugar, incluida la nacionalidad o procedencia geográfica: aus Spanien (de España), aus dem Haus (de dentro de la casa). "Von" indica un punto de partida del que uno se aleja, sin implicar que se estuviera "dentro": vom Arzt (de la consulta del médico, volviendo de allí), von der Arbeit (del trabajo). Estas dos preposiciones forman parejas simétricas con las de dirección vistas en a2-18: nach/zu (wohin) se corresponden con aus/von (woher) — el destino con zu se corresponde con el origen con von, y el destino con nach/in se corresponde con el origen con aus.',
      ejemplos: [
        { de: 'Ich komme aus Spanien.', es: 'Soy/Vengo de España.' },
        { de: 'Er kommt vom Arzt.', es: 'Viene del médico.' },
        { de: 'Sie kommt aus den Bergen.', es: 'Ella viene de las montañas.' },
        { de: 'Wir kommen gerade von der Arbeit.', es: 'Acabamos de venir del trabajo.' }
      ],
      tip: 'Parejas simétricas wohin↔woher: nach↔aus (ciudades/países), zu↔von (personas/instituciones-edificios como el médico), in↔aus (espacios cerrados). Aprenderlas en pareja ayuda a no confundirlas.'
    },
    {
      id: 'a2-21',
      titulo: 'Hauptsätze verbinden: Position 1',
      subtitulo: 'deshalb, sonst, dann, danach',
      regla_base: 'A diferencia de und/aber/oder/denn (posición 0), conectores como deshalb, sonst, dann, danach ocupan la posición 1: provocan inversión, el verbo va en posición 2 y el sujeto pasa a la posición 3.',
      tabla: { headers: ['Conector', 'Significado', 'Posición'], rows: [['deshalb', 'por eso', 'Posición 1 (con inversión)'], ['sonst', 'si no / de lo contrario', 'Posición 1 (con inversión)'], ['dann', 'entonces / luego', 'Posición 1 (con inversión)'], ['danach', 'después de eso', 'Posición 1 (con inversión)'], ['und/aber/oder/denn', '(ver a1-16)', 'Posición 0 (sin inversión)']] },
      excepciones: 'No confundir con und, aber, oder, denn (a1-16), que ocupan la posición 0 y no cuentan como elemento de la frase, por lo que el sujeto sigue justo después del verbo sin inversión.',
      explicacion: 'Para unir dos frases principales el alemán tiene dos estrategias distintas. Los conectores und, aber, oder, denn (vistos en a1-16) van en posición 0: no cuentan como un elemento de la frase, así que el orden interno de la segunda frase no cambia. En cambio, conectores como deshalb (por eso), sonst (si no), dann (entonces/luego) y danach (después de eso) sí ocupan la posición 1, es decir, cuentan como el primer elemento de la frase. Esto obliga a que el verbo conjugado vaya justo después, en posición 2, y el sujeto se desplace a la posición 3. Esta inversión sujeto-verbo es la señal más clara para distinguir ambos grupos de conectores. Dominar esta diferencia es esencial para escribir frases compuestas naturales en alemán desde el nivel A2.',
      ejemplos: [
        { de: 'Es regnet, deshalb bleibe ich zu Hause.', es: 'Llueve, por eso me quedo en casa.' },
        { de: 'Beeil dich, sonst kommst du zu spät.', es: 'Date prisa, si no llegarás tarde.' },
        { de: 'Wir essen, dann gehen wir ins Kino.', es: 'Comemos, luego vamos al cine.' },
        { de: 'Wir kaufen ein, danach kochen wir.', es: 'Compramos, después de eso cocinamos.' }
      ],
      tip: 'Truco rápido: si después del conector el sujeto NO va justo detrás (el verbo se cuela primero), es un conector de posición 1 (deshalb, sonst, dann, danach). Si el sujeto va justo después del conector, es de posición 0 (und, aber, oder, denn).'
    },
    {
      id: 'a2-22',
      titulo: 'Nebensätze mit weil, wenn und dass',
      subtitulo: 'el verbo va al final',
      regla_base: 'weil, wenn y dass introducen subordinadas donde el verbo conjugado va al final. La coma separa siempre principal y subordinada.',
      tabla: { headers: ['Conjunción', 'Significado', 'Función'], rows: [['weil', 'porque', 'causa (subordinada, verbo al final)'], ['wenn', 'si / cuando', 'condición o repetición (subordinada, verbo al final)'], ['dass', 'que', 'subordinada sustantiva (verbo al final)'], ['denn', 'porque (ver a1-16)', 'posición 0, sin cambiar el orden']] },
      excepciones: 'weil (causa, subordinada) no debe confundirse con denn (también "porque" pero de posición 0, ver a1-16, sin alterar el orden). wenn (condicional o repetido en alemán) se distingue de als (una sola vez en pasado), que se estudia en niveles superiores.',
      explicacion: 'weil (porque), wenn (si/cuando) y dass (que) introducen frases subordinadas, en las que el verbo conjugado se coloca al final de la subordinada, un orden distinto al de la frase principal. La coma separa siempre la frase principal de la subordinada. weil expresa causa y no debe confundirse con denn, que también significa "porque" pero es una conjunción de posición 0 que no cambia el orden de la frase que introduce (ver a1-16): "Ich bleibe zu Hause, denn ich bin krank" (orden normal) frente a "..., weil ich krank bin" (verbo al final). wenn se usa para condiciones o para acciones que se repiten en cualquier tiempo verbal; se diferencia de als, que en alemán se reserva para un único evento en pasado (contenido de niveles superiores). dass introduce subordinadas sustantivas, muy frecuentes tras verbos de opinión o percepción como glauben, denken, wissen, hoffen.',
      ejemplos: [
        { de: 'Ich bleibe zu Hause, weil ich krank bin.', es: 'Me quedo en casa porque estoy enfermo.' },
        { de: 'Wenn ich Zeit habe, rufe ich dich an.', es: 'Si tengo tiempo, te llamo.' },
        { de: 'Ich glaube, dass er recht hat.', es: 'Creo que él tiene razón.' },
        { de: 'Wenn es regnet, bleiben wir zu Hause.', es: 'Cuando llueve, nos quedamos en casa.' }
      ],
      tip: 'Regla de oro de las subordinadas: verbo conjugado al FINAL. Para comprobarlo rápido, busca el verbo conjugado en la subordinada y verifica que sea la última palabra antes de la coma o el punto.'
    },
    {
      id: 'a2-23',
      titulo: 'Partikeln und Wortbildung',
      subtitulo: 'doch, mal, ja... + -chen, -lein, -er, -in, -ung',
      regla_base: 'Partículas modales (doch, mal, ja, denn, eigentlich, einfach) matizan el tono sin cambiar el significado literal. Sufijos de formación de palabras: -chen/-lein (diminutivo, neutro), -er (agente masc.), -in (agente fem.), -ung (sustantivo fem. desde verbo).',
      tabla: { headers: ['Sufijo', 'Función', 'Género', 'Ejemplo'], rows: [['-chen / -lein', 'diminutivo', 'siempre neutro', 'das Häuschen, das Büchlein'], ['-er', 'agente (persona que hace algo)', 'masculino', 'der Lehrer, der Arbeiter'], ['-in', 'agente femenino (se añade a -er)', 'femenino', 'die Lehrerin'], ['-ung', 'convierte verbo en sustantivo', 'femenino', 'die Übung, die Zeitung']] },
      excepciones: 'Los diminutivos con -chen/-lein suelen llevar Umlaut si es posible (Haus→Häuschen, Buch→Büchlein) y son siempre neutros aunque la palabra base sea masculina o femenina (der Mann → das Männchen).',
      explicacion: 'Este tema combina dos aspectos del alemán natural. Por un lado, las partículas modales (doch, mal, ja, denn, eigentlich, einfach) son palabras cortas que matizan el tono emocional o la intención de una frase sin alterar su significado literal; son imprescindibles para sonar natural: "Komm doch mal her!" (anima o insiste), "Was machst du denn?" (curiosidad/sorpresa en preguntas), "Das ist ja toll!" (sorpresa/énfasis). Por otro lado, ciertos sufijos permiten formar palabras nuevas de manera productiva: -chen y -lein forman diminutivos, siempre de género neutro sea cual sea el género de la palabra base (das Häuschen, das Büchlein); -er forma sustantivos de agente masculino a partir de verbos (der Lehrer de lehren, der Arbeiter de arbeiten); -in se añade a la forma en -er para crear el femenino correspondiente (die Lehrerin); -ung convierte verbos en sustantivos femeninos abstractos (die Übung de üben, die Zeitung de la raíz de "berichten/Zeit").',
      ejemplos: [
        { de: 'Komm doch mal her, ich zeige dir die Übung.', es: 'Ven aquí anda, te enseño el ejercicio.' },
        { de: 'Was machst du denn mit dem Häuschen?', es: '¿Qué haces con la casita?' },
        { de: 'Das ist ja meine Lehrerin!', es: '¡Anda, si es mi profesora!' },
        { de: 'Lies einfach die Zeitung, das ist gut für dein Deutsch.', es: 'Simplemente lee el periódico, es bueno para tu alemán.' }
      ],
      tip: 'Las partículas modales no se traducen palabra por palabra: aprende su "sabor" (doch = insistencia/contradicción, mal = suaviza una petición, ja = sorpresa/evidencia) escuchando ejemplos, no buscando una traducción fija.'
    }
];
