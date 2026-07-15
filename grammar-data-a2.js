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
];
