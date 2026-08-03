window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
window.GRAMMAR_DATA.B1 = [
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
      tabla: { headers: ['Verbo', 'Konj. II propio'], rows: [['sein', 'wäre'], ['haben', 'hätte'], ['werden', 'würde'], ['können', 'könnte'], ['müssen', 'müsste'], ['sollen', 'sollte'], ['dürfen', 'dürfte'], ['mögen', 'möchte']] },
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
      tabla: { headers: ['', 'Masc. Nom.', 'Masc. Akk.', 'Fem. Nom.', 'Neutro Nom.', 'Neutro Dat.'], rows: [['Def. (der/die/das)', '-e', '-en', '-e', '-e', '-en'], ['Indef. (ein/kein)', '-er', '-en', '-e', '-es', '-en'], ['Sin artículo', '-er', '-en', '-e', '-es', '-em']] },
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
      tabla: { headers: ['Conector', 'Significado', 'Uso'], rows: [['weil / da', 'porque', 'causa'], ['damit', 'para que', 'finalidad'], ['dass', 'que', 'contenido indirecto'], ['obwohl', 'aunque', 'concesión'], ['wenn', 'cuando / si', 'condición o hábito (cualquier tiempo)'], ['als', 'cuando', 'momento único pasado'], ['bevor', 'antes de que', 'temporal'], ['nachdem', 'después de que', 'temporal']] },
      excepciones: 'wenn vs. als: wenn para condiciones y acciones habituales en cualquier tiempo; als exclusivamente para un momento único y concreto en el pasado.',
      explicacion: 'Estos conectores introducen oraciones subordinadas (Nebensätze) en las que el verbo conjugado va obligatoriamente AL FINAL. "Weil/da" expresan causa (porque); "damit" expresa finalidad; "dass" introduce contenido (que); "obwohl" expresa concesión (aunque); "wenn" introduce condiciones o acciones habituales en cualquier tiempo; "als" se usa exclusivamente para un momento único en el pasado; "bevor" y "nachdem" indican relación temporal. ("um…zu" también expresa finalidad, pero no es un conector subordinante: no lleva verbo conjugado, es una construcción de infinitivo.) Si la subordinada precede a la principal, la principal comienza directamente con el verbo (V2 global se mantiene).',
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
      tabla: { headers: ['Tiempo', 'Estructura', 'Ejemplo'], rows: [['Präsens', 'wird + P.II', 'Das Haus wird gebaut.'], ['Präteritum', 'wurde + P.II', 'Das Haus wurde gebaut.'], ['Perfekt', 'ist + P.II + worden', 'Das Haus ist gebaut worden.'], ['Konjunktiv II', 'würde + P.II + werden', 'Das Haus würde gebaut werden.']] },
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
      tabla: { headers: ['Verbo', 'Ejemplo'], rows: [['modal', 'Ich muss gehen.'], ['lassen', 'Ich lasse das Auto reparieren.'], ['sehen/hören/fühlen', 'Ich sehe ihn kommen.'], ['gehen/kommen', 'Wir gehen schwimmen.']] },
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
      tabla: { headers: ['Antecedente', 'Prep. + Caso', 'Ejemplo'], rows: [['persona (masc.)', 'mit + Dat.', 'der Mann, mit dem ich spreche'], ['persona (fem.)', 'für + Akk.', 'die Frau, für die ich arbeite'], ['cosa/idea', 'über + Akk.', 'das Buch, über das wir sprechen'], ['personas (plural)', 'auf + Akk.', 'die Freunde, auf die ich warte']] },
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
        { de: 'Ich freue mich darauf. (= auf die Reise)', es: 'Me alegro de ello. (= por el viaje)' },
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
        { de: 'Es wird kalt. (verbo pleno + adjetivo)', es: 'Se está poniendo frío.' },
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
      tabla: { headers: ['Tipo', 'Prefijos', 'Ejemplo'], rows: [['separable', 'ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-', 'Ich rufe dich an. / Ich habe angerufen.'], ['inseparable', 'be-, emp-, ent-, er-, ge-, miss-, ver-, zer-', 'Ich besuche dich. / Ich habe dich besucht.'], ['dual (según sentido)', 'durch-, über-, unter-, um-, wieder-, wider-', 'umfahren (atropellar) vs. umfahren (rodear)']] },
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
      tabla: { headers: ['Pregunta', 'Adverbio', 'Ejemplo'], rows: [['Wo? (posición)', 'hier / dort / da', 'Ich bin hier.'], ['Wohin? (dirección, alejamiento)', 'hierhin / dorthin / dahin', 'Geh dorthin!'], ['Wohin? (dirección, hacia el hablante)', 'hierher / dorther / daher', 'Komm hierher!'], ['Woher? (procedencia)', 'von hier / von dort', 'Ich komme von dort.']] },
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
        { de: 'Ich schreibe es auf, damit du es nicht vergisst.', es: 'Lo apunto para que no lo olvides.' },
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
];
