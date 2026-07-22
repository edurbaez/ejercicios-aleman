window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
window.GRAMMAR_DATA.B2 = [
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
      titulo: 'Comparaciones y consecuencias irreales',
      subtitulo: 'als ob, als, sonst + Konjunktiv II',
      regla_base: 'Comparaciones irreales: als ob/als wenn (verbo al final) o als (con inversión) + Konjunktiv II. Consecuencias irreales: sonst/andernfalls + Konjunktiv II.',
      tabla: { headers: ['Estructura', 'Orden de palabras', 'Ejemplo'], rows: [['als ob / als wenn + Konj.II', 'verbo conjugado al final', 'Er tut, als ob er nichts wüsste.'], ['als + Konj.II', 'inversión verbo-sujeto', 'Er tut, als wüsste er nichts.'], ['sonst / andernfalls + Konj.II', 'orden normal, oración independiente', 'Ich musste mich beeilen, sonst hätte ich den Zug verpasst.']] },
      excepciones: 'Error frecuente: usar Indikativ después de "als ob" cuando la comparación es irreal ("Er tut, als ob er nichts weiß" ✗). Si el hecho comparado no es real (solo aparenta serlo), el verbo debe ir en Konjunktiv II: "als ob er nichts wüsste" ✓. El Indikativ tras als ob solo sería aceptable si se describiera un hecho realmente cierto, lo cual rara vez ocurre con esta estructura.',
      explicacion: 'Para comparar una situación con algo que no es real (una apariencia, una suposición), el alemán usa "als ob" o "als wenn" seguido de Konjunktiv II, con el verbo conjugado al final de la oración: "Er tut, als ob er nichts wüsste" (Actúa como si no supiera nada). Existe una variante más compacta con solo "als", que prescinde de "ob/wenn" pero exige la inversión sujeto-verbo justo después: "Er tut, als wüsste er nichts" — mismo significado, orden distinto. Ambas formas son intercambiables estilísticamente; "als" sin "ob" resulta algo más elegante o literario. Para expresar una consecuencia irreal (lo que habría pasado si no se hubiera actuado de cierta manera), se usan los conectores "sonst" o "andernfalls" ("de lo contrario") seguidos de Konjunktiv II pasado: "Ich musste mich beeilen, sonst hätte ich den Zug verpasst" (Tuve que darme prisa, si no habría perdido el tren). Aquí "sonst" introduce una oración independiente con orden normal (sujeto-verbo), a diferencia de "als ob".',
      ejemplos: [
        { de: 'Er tut, als ob er nichts wüsste.', es: 'Actúa como si no supiera nada.' },
        { de: 'Sie sieht aus, als wäre sie krank.', es: 'Parece como si estuviera enferma.' },
        { de: 'Du redest, als hättest du alles verstanden.', es: 'Hablas como si lo hubieras entendido todo.' },
        { de: 'Ich musste mich beeilen, sonst hätte ich den Zug verpasst.', es: 'Tuve que darme prisa, si no habría perdido el tren.' }
      ],
      tip: 'Piensa en "als" + inversión como una versión abreviada de "als ob": quitas "ob" pero el verbo "salta" justo después de "als", ocupando el hueco que dejó. Nunca dejes el verbo en Indikativ tras estas estructuras si la comparación es ficticia.'
    },
    {
      id: 'b2-04',
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
      id: 'b2-05',
      titulo: 'Pasiva con verbos modales',
      subtitulo: 'Modalverb + Partizip II + werden',
      regla_base: 'El modal conjugado ocupa la posición 2; al final van Partizip II + werden (infinitivo). Se forma en todos los tiempos: Präsens, Präteritum, Perfekt.',
      tabla: { headers: ['Tiempo', 'Modal', 'Ejemplo'], rows: [['Präsens', 'müssen', 'Das muss heute noch erledigt werden.'], ['Präteritum', 'müssen', 'Das musste sofort erledigt werden.'], ['Präsens', 'können', 'Das kann repariert werden.'], ['Präsens', 'dürfen', 'Hier darf nicht geraucht werden.'], ['Präsens', 'sollen', 'Der Antrag soll bis Freitag eingereicht werden.']] },
      excepciones: 'En Perfekt, la pasiva con modal usa el Ersatzinfinitiv en vez del participio del modal: "Das hat heute erledigt werden müssen" (no *gemusst). Esta construcción es poco frecuente y se trabaja en profundidad en C1; en B2 basta con reconocerla al leerla.',
      explicacion: 'Cuando un verbo modal (müssen, können, dürfen, sollen…) se combina con la voz pasiva, el modal se conjuga normalmente en posición 2 y al final de la oración se coloca el Partizip II del verbo principal seguido del infinitivo "werden": "Das muss heute noch erledigt werden" (Esto todavía debe resolverse hoy). Esta estructura funciona en todos los tiempos verbales: Präsens ("muss…werden"), Präteritum ("musste…werden") y, de forma más compleja, Perfekt (con el llamado Ersatzinfinitiv, tema que se profundiza en C1). El matiz de la oración depende del modal elegido: "müssen" indica obligación ("Das muss repariert werden" = hay que repararlo), "können" posibilidad ("Das kann repariert werden" = se puede reparar), "dürfen" permiso, frecuentemente en negativo ("Hier darf nicht geraucht werden" = aquí no se puede/debe fumar) y "sollen" una recomendación o norma externa ("Der Antrag soll bis Freitag eingereicht werden" = se supone que la solicitud debe presentarse antes del viernes).',
      ejemplos: [
        { de: 'Das muss heute noch erledigt werden.', es: 'Esto debe resolverse hoy todavía.' },
        { de: 'Das musste sofort repariert werden.', es: 'Eso tuvo que repararse de inmediato.' },
        { de: 'Hier darf nicht geraucht werden.', es: 'Aquí no se puede fumar.' },
        { de: 'Der Antrag soll bis Freitag eingereicht werden.', es: 'Se supone que la solicitud debe presentarse antes del viernes.' }
      ],
      tip: 'Recuerda el orden fijo al final de la oración: Partizip II + werden. Compáralo con la pasiva simple ("wird repariert") añadiendo el modal delante: "kann repariert werden". El modal siempre "empuja" a werden al último lugar.'
    },
    {
      id: 'b2-06',
      titulo: 'Passivsätze ohne Subjekt',
      subtitulo: 'pasiva impersonal — Hier wird gelacht!',
      regla_base: 'Verbos intransitivos sin objeto directo forman una pasiva "sin sujeto" (unpersönliches Passiv): werden + Partizip II, sin Nominativ. Solo es posible con verbos que describen una actividad realizada por agentes reales.',
      tabla: { headers: ['Sí forman pasiva impersonal', 'No forman pasiva impersonal'], rows: [['lachen → Hier wird gelacht.', 'regnen → *Es wird geregnet. (verbo meteorológico)'], ['tanzen → Auf der Party wird getanzt.', 'sein/haben → *Es wird gewesen. (verbos de estado)'], ['arbeiten → Sonntags wird nicht gearbeitet.', 'wissen/kennen → *Es wird gewusst. (verbos de estado mental)'], ['singen → Im Chor wird viel gesungen.', 'können/müssen → *Es wird gekonnt. (verbos modales)'], ['helfen (+ Dat.) → Hier wird gern geholfen.', 'kosten/wiegen → *Es wird gekostet. (medida, sin agente real)']] },
      excepciones: 'La partícula "es" solo aparece si ninguna otra palabra ocupa la posición 1 (funciona como relleno gramatical, no como sujeto real): "Es wird hier viel gelacht." Si otro elemento pasa a la posición 1, "es" desaparece: "Hier wird viel gelacht." El verbo siempre queda en 3ª persona singular (gelacht wird, no *gelacht werden), porque no hay sujeto gramatical que module la concordancia.',
      explicacion: 'Algunos verbos intransitivos (sin objeto acusativo) pueden formar una pasiva sin sujeto real, llamada "unpersönliches Passiv" o "subjektloses Passiv": werden + Partizip II. Esta construcción despersonaliza la acción, poniendo el foco en la actividad misma y no en quién la realiza: "Hier wird gelacht" (aquí se ríe / hay risas). La condición es que el verbo describa una acción realizada voluntariamente por un agente (lachen, tanzen, arbeiten, singen), no un estado, un fenómeno meteorológico o un verbo modal. Por eso "*Es wird geregnet" es incorrecto: llover no es una acción que alguien "realice", así que no admite pasiva. La partícula "es" es puramente un relleno de posición 1 (Platzhalter), no un sujeto gramatical (el verbo va siempre en 3ª persona singular): si otra palabra ocupa esa posición, "es" simplemente desaparece.',
      ejemplos: [
        { de: 'Hier wird gelacht!', es: '¡Aquí se ríe! / ¡Aquí hay risas!' },
        { de: 'Es wird heute Abend getanzt.', es: 'Esta noche se baila.' },
        { de: 'Am Sonntag wird nicht gearbeitet.', es: 'Los domingos no se trabaja.' },
        { de: 'In diesem Büro wird viel geraucht.', es: 'En esta oficina se fuma mucho.' }
      ],
      tip: 'Pregúntate: ¿es una acción que alguien "hace" voluntariamente? Si sí (lachen, tanzen, arbeiten) → pasiva impersonal posible. Si es estado, clima o verbo modal (regnen, sein, können) → pasiva imposible, por mucho que la frase "suene" pasable.'
    },
    {
      id: 'b2-07',
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
      id: 'b2-08',
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
      id: 'b2-09',
      titulo: 'Futur II',
      subtitulo: 'suposición sobre el pasado — Er wird den Zug verpasst haben',
      regla_base: 'werden + Partizip II + haben/sein (Infinitiv). Su uso principal en B2/C1 no es de futuro, sino de suposición sobre algo ya ocurrido.',
      tabla: { headers: ['Uso', 'Ejemplo', 'Significado'], rows: [['Suposición sobre el pasado (el más frecuente)', 'Sie wird schon angekommen sein.', 'Seguramente ya habrá llegado.'], ['Futuro anterior real (raro)', 'Bis morgen wird er die Arbeit beendet haben.', 'Para mañana habrá terminado el trabajo.']] },
      excepciones: 'El uso como suposición sobre el pasado es, con diferencia, el más frecuente en el alemán hablado y escrito actual; el uso como auténtico "futuro anterior" (acción terminada en un punto futuro) es raro y aparece casi solo con una referencia temporal explícita (bis morgen, bis nächste Woche).',
      explicacion: 'El Futur II se forma con werden + Partizip II del verbo + haben o sein en infinitivo: "Er wird den Zug verpasst haben." A pesar de llamarse "futuro", en la práctica se usa sobre todo para expresar una suposición o conjetura sobre algo que ya sucedió, equivalente al español "seguramente habrá + participio": "Sie wird schon angekommen sein" (seguramente ya habrá llegado). Esta suposición se refuerza a menudo con adverbios de probabilidad como wohl, sicher o wahrscheinlich: "Er wird wohl verschlafen haben" (seguramente se habrá quedado dormido). El uso como "futuro anterior" real —una acción que estará completada en un momento futuro— existe pero es mucho más raro y suele necesitar un marcador temporal explícito: "Bis morgen wird er die Arbeit beendet haben."',
      ejemplos: [
        { de: 'Er wird den Zug verpasst haben.', es: 'Seguramente ha perdido el tren.' },
        { de: 'Sie wird schon angekommen sein.', es: 'Seguramente ya habrá llegado.' },
        { de: 'Er wird wohl verschlafen haben.', es: 'Seguramente se habrá quedado dormido.' },
        { de: 'Bis morgen wird er die Arbeit beendet haben.', es: 'Para mañana habrá terminado el trabajo.' }
      ],
      tip: 'Si ves werden + Partizip II + haben/sein, piensa primero en "suposición sobre el pasado" (seguramente habrá…), no en "futuro". Los adverbios wohl, sicher, wahrscheinlich casi siempre acompañan a este uso.'
    },
    {
      id: 'b2-10',
      titulo: 'Finalidad y contraste con infinitivo: um…zu / damit / ohne…zu / (an)statt…zu',
      subtitulo: 'para que / sin / en vez de',
      regla_base: 'Familia de conectores que enlazan una frase principal con un infinitivo o subordinada: um…zu (finalidad, mismo sujeto), damit (finalidad, sujetos distintos), ohne…zu (sin + Inf., mismo sujeto), (an)statt…zu (en vez de + Inf., mismo sujeto).',
      tabla: { headers: ['Estructura', 'Significado', 'Condición'], rows: [['um…zu + Infinitiv', 'para / con el fin de', 'mismo sujeto en ambas frases'], ['damit + Nebensatz', 'para que', 'sujetos distintos (o para insistir en la intención de otro)'], ['ohne…zu + Infinitiv', 'sin (hacer algo)', 'mismo sujeto en ambas frases'], ['(an)statt…zu + Infinitiv', 'en vez de', 'mismo sujeto en ambas frases']] },
      excepciones: 'Las tres construcciones con "zu + Infinitiv" (um…zu, ohne…zu, (an)statt…zu) son imposibles si los sujetos de ambas acciones difieren; en ese caso hay que recurrir a una subordinada con verbo conjugado al final: damit (finalidad), ohne dass (sin que), (an)statt dass (en vez de que). Ejemplo: "Er ging, ohne dass sie es bemerkte." (sujetos distintos: er / sie).',
      explicacion: 'Varias construcciones alemanas combinan una preposición o conjunción con "zu + Infinitivo" para enlazar dos acciones del mismo sujeto, cada una con un matiz distinto. "Um…zu + Infinitivo" expresa finalidad ("para/con el fin de"): "Ich lerne, um die Prüfung zu bestehen." "Ohne…zu + Infinitivo" expresa ausencia de una acción esperada ("sin hacer algo"): "Er ging, ohne sich zu verabschieden" (se fue sin despedirse). "(An)statt…zu + Infinitivo" expresa sustitución ("en vez de"): "Er half mir, anstatt zu kritisieren" (me ayudó en vez de criticar). Las tres exigen que el sujeto de la frase principal y el de la acción con "zu" sean el mismo; si los sujetos difieren, se usa la subordinada correspondiente con verbo conjugado al final: "damit" para finalidad ("Ich erkläre es langsam, damit du es verstehst"), "ohne dass" para ausencia, "(an)statt dass" para sustitución. En todos los casos, la subordinada o el grupo con "zu" puede colocarse antes o después de la frase principal.',
      ejemplos: [
        { de: 'Ich lerne, um die Prüfung zu bestehen.', es: 'Estudio para aprobar el examen. (mismo sujeto)' },
        { de: 'Ich erkläre es langsam, damit du es verstehst.', es: 'Lo explico despacio para que tú lo entiendas. (sujetos distintos)' },
        { de: 'Er ging, ohne sich zu verabschieden.', es: 'Se fue sin despedirse. (mismo sujeto)' },
        { de: 'Er half mir, anstatt zu kritisieren.', es: 'Me ayudó en vez de criticar. (mismo sujeto)' },
        { de: 'Er ging, ohne dass sie es bemerkte.', es: 'Se fue sin que ella se diera cuenta. (sujetos distintos)' }
      ],
      tip: 'La pregunta clave para las tres estructuras con "zu": ¿mismo sujeto en ambas frases? Si sí → um…zu / ohne…zu / (an)statt…zu + Infinitivo. Si los sujetos difieren, cambia siempre a la subordinada: damit / ohne dass / (an)statt dass + verbo al final.'
    },
    {
      id: 'b2-11',
      titulo: 'Concesión y adversación',
      subtitulo: 'obwohl, trotzdem, dennoch, zwar…aber, wohingegen',
      regla_base: 'obwohl → verbo al final (subordinada). trotzdem/dennoch → V2 (frase principal). zwar…aber → coordinación. wohingegen → subordinada de contraste (no concesiva).',
      tabla: { headers: ['Conector', 'Estructura', 'Ejemplo'], rows: [['obwohl', 'subordinada (verbo al final)', 'Obwohl es regnet, gehe ich raus.'], ['trotzdem', 'frase principal (V2)', 'Es regnet. Trotzdem gehe ich raus.'], ['dennoch', 'frase principal (V2)', 'Es ist schwer. Dennoch versuche ich es.'], ['zwar … aber', 'coordinación', 'Er ist zwar müde, aber er arbeitet.'], ['wohingegen', 'subordinada (verbo al final), contraste', 'Er arbeitet gern im Büro, wohingegen sie lieber von zu Hause aus arbeitet.']] },
      excepciones: 'Confundir obwohl con trotzdem es el error más clásico en B2. Comprueba siempre el orden del verbo: ¿va al final? → obwohl. ¿Va en V2 después del conector? → trotzdem. "Wohingegen" no expresa concesión (algo "a pesar de"), sino puro contraste entre dos hechos equivalentes, como una versión más formal de "während" con matiz contrastivo; no lo mezcles semánticamente con obwohl/trotzdem aunque comparta la posición final del verbo.',
      explicacion: 'Para expresar que algo ocurre a pesar de otra cosa el alemán ofrece varias estructuras. "Obwohl" + Nebensatz (verbo al final): la subordinada puede ir antes o después de la principal. "Trotzdem" y "dennoch" son adverbios conjuntivos que encabezan la frase principal siguiente (verbo en V2). "Zwar…aber" es un par coordinante dentro de la frase o entre dos frases. "Jedoch" y "allerdings" son alternativas formales a "aber" para la adversación. La diferencia entre "obwohl" y "trotzdem" es estructural: uno introduce subordinada, el otro encabeza frase principal. "Wohingegen" introduce también una subordinada con verbo al final, pero su valor no es concesivo sino contrastivo: compara dos hechos que coexisten sin que uno sea un obstáculo para el otro, muy usado en registro escrito/formal para contraponer preferencias, datos o comportamientos.',
      ejemplos: [
        { de: 'Obwohl es regnet, gehen wir spazieren.', es: 'Aunque llueve, salimos a pasear.' },
        { de: 'Es regnet. Trotzdem gehen wir spazieren.', es: 'Llueve. Sin embargo, salimos a pasear.' },
        { de: 'Er ist zwar müde, aber er arbeitet weiter.', es: 'Está cansado, pero sigue trabajando.' },
        { de: 'Die Aufgabe ist schwer, dennoch versuche ich es.', es: 'La tarea es difícil; sin embargo lo intento.' },
        { de: 'Er arbeitet gern im Büro, wohingegen sie lieber von zu Hause aus arbeitet.', es: 'Él prefiere trabajar en la oficina, mientras que ella prefiere trabajar desde casa.' }
      ],
      tip: '"Obwohl" → subordinada con verbo al final. "Trotzdem/dennoch" → frase principal con V2. "Wohingegen" comparte la posición final del verbo con obwohl, pero no es concesivo: úsalo cuando quieras contraponer dos hechos sin que ninguno sea un obstáculo para el otro.'
    },
    {
      id: 'b2-12',
      titulo: 'Konsekutive Nebensätze',
      subtitulo: 'sodass, weshalb, dermaßen…, dass',
      regla_base: '"sodass"/"so dass" + Nebensatz (verbo al final) introduce una consecuencia. "so + Adj/Adv…, dass" intensifica la causa antes de dar la consecuencia. "dermaßen/derart + Adj…, dass" es variante más formal/enfática. "weshalb/weswegen" retoma toda la oración anterior como causa.',
      tabla: { headers: ['Estructura', 'Función', 'Ejemplo'], rows: [['sodass / so dass + Nebensatz', 'consecuencia general', 'Er hat sich beeilt, sodass er den Zug noch erreichte.'], ['so + Adj/Adv …, dass', 'intensifica la causa', 'Sie war so müde, dass sie sofort einschlief.'], ['dermaßen/derart + Adj …, dass', 'variante formal/enfática', 'Er war dermaßen erschöpft, dass er nicht mehr sprechen konnte.'], ['weshalb / weswegen', 'retoma toda la oración anterior', 'Er kam zu spät, weshalb er die Prüfung verpasste.']] },
      excepciones: 'Hoy en día "sodass" se escribe generalmente junto (variante estándar actual en textos modernos), aunque "so dass" separado sigue siendo correcto y frecuente en textos más antiguos o cuidados. No confundir "weshalb" (consecutivo, retoma toda la oración previa como causa) con un relativo que se refiera solo a un sustantivo: "weshalb"/"weswegen" siempre apuntan hacia atrás a la oración completa, nunca a una palabra concreta.',
      explicacion: 'Las oraciones consecutivas expresan el resultado o efecto de lo dicho en la oración principal. "Sodass" (o "so dass") introduce una Nebensatz con el verbo al final y presenta la consecuencia de forma neutra: "Er hat sich beeilt, sodass er den Zug noch erreichte." Cuando se quiere intensificar la causa antes de dar la consecuencia se usa "so + adjetivo/adverbio…, dass": "Sie war so müde, dass sie sofort einschlief." Una variante más formal y enfática sustituye "so" por "dermaßen" o "derart": "Er war dermaßen erschöpft, dass er nicht mehr sprechen konnte." Por último, "weshalb" y "weswegen" funcionan como conectores consecutivos que retoman toda la oración anterior (no un sustantivo concreto) y encabezan una nueva Nebensatz: "Er kam zu spät, weshalb er die Prüfung verpasste." Este uso es muy habitual en B2/C1 para enlazar causa y consecuencia sin repetir "deshalb...dass" ni empezar una nueva frase principal.',
      ejemplos: [
        { de: 'Er hat sich beeilt, sodass er den Zug noch erreichte.', es: 'Se dio prisa, de modo que todavía alcanzó el tren.' },
        { de: 'Sie war so müde, dass sie sofort einschlief.', es: 'Estaba tan cansada que se durmió enseguida.' },
        { de: 'Er war dermaßen erschöpft, dass er nicht mehr sprechen konnte.', es: 'Estaba tan agotado que ya no podía hablar.' },
        { de: 'Er kam zu spät, weshalb er die Prüfung verpasste.', es: 'Llegó tarde, por lo que se perdió el examen.' }
      ],
      tip: 'Si la consecuencia depende de un adjetivo o adverbio concreto (müde, schnell, laut…) usa "so…, dass" o su variante enfática "dermaßen/derart…, dass". Si simplemente enlazas dos hechos sin ese matiz de intensidad, "sodass" es la opción más neutra y natural.'
    },
    {
      id: 'b2-13',
      titulo: 'Relativsätze im Genitiv',
      subtitulo: 'dessen, deren',
      regla_base: '"dessen" (masculino/neutro) y "deren" (femenino/plural) equivalen a "cuyo/cuya/cuyos/cuyas". Concuerdan en género y número con el ANTECEDENTE (el poseedor), no con el sustantivo poseído, que además nunca lleva artículo tras dessen/deren.',
      tabla: { headers: ['Antecedente', 'Pronombre', 'Ejemplo'], rows: [['maskulin (der Mann)', 'dessen', 'Der Mann, dessen Tochter Ärztin ist, wohnt nebenan.'], ['neutrum (das Kind)', 'dessen', 'Das Kind, dessen Eltern verreist sind, wohnt bei der Oma.'], ['feminin (die Frau)', 'deren', 'Die Frau, deren Hund bellt, ist meine Nachbarin.'], ['Plural (die Leute)', 'deren', 'Die Leute, deren Auto kaputt ist, warten auf den Abschleppdienst.']] },
      excepciones: 'El error típico es hacer concordar dessen/deren con el sustantivo poseído en vez de con el antecedente: en "Der Mann, dessen Tochter Ärztin ist" se usa "dessen" (no "deren") porque el antecedente es "der Mann" (masculino), aunque "Tochter" sea femenino. El sustantivo que sigue a dessen/deren nunca lleva artículo ("dessen Tochter", no "dessen die Tochter"). El caso del sustantivo poseído dentro de la subordinada (Nominativ/Akkusativ/Dativ) depende de su propia función en esa oración, no del genitivo del pronombre relativo.',
      explicacion: 'Cuando una oración de relativo expresa posesión ("cuyo/cuya"), el alemán usa "dessen" o "deren" en lugar de der/die/das. La elección entre dessen y deren depende exclusivamente del género y número del antecedente (la persona o cosa "dueña"), nunca del sustantivo que se posee: masculino y neutro toman "dessen", femenino y plural toman "deren". Tras dessen/deren el sustantivo poseído aparece sin artículo. Además, ese sustantivo poseído puede desempeñar cualquier función dentro de la subordinada (sujeto, objeto directo, objeto indirecto) y su caso se decide por esa función, de forma independiente al genitivo ya marcado por dessen/deren: "Der Mann, dessen Tochter ich kenne" (Tochter es Akkusativ, objeto de "kenne", pero dessen sigue siendo genitivo por concordar con der Mann).',
      ejemplos: [
        { de: 'Der Mann, dessen Tochter Ärztin ist, wohnt nebenan.', es: 'El hombre cuya hija es médica vive al lado.' },
        { de: 'Das Kind, dessen Eltern verreist sind, wohnt bei der Oma.', es: 'El niño cuyos padres están de viaje vive con la abuela.' },
        { de: 'Die Frau, deren Hund bellt, ist meine Nachbarin.', es: 'La mujer cuyo perro ladra es mi vecina.' },
        { de: 'Die Leute, deren Auto kaputt ist, warten auf den Abschleppdienst.', es: 'La gente cuyo coche está averiado espera la grúa.' }
      ],
      tip: 'Pregúntate siempre "¿de quién es la cosa poseída?" y mira el género de ESA persona/cosa (el antecedente), no el género del objeto poseído: esa es la única clave para elegir entre dessen y deren.'
    },
    {
      id: 'b2-14',
      titulo: 'Relativpronomen mit was und wo(r)-',
      subtitulo: 'etwas, was… / nichts, worüber…',
      regla_base: '"was" se usa como relativo cuando el antecedente es "etwas", "nichts", "alles", "das/dies" (neutro genérico) o toda una oración anterior. Con preposición se usa "wo(r)- + preposición" en vez de "preposición + was".',
      tabla: { headers: ['Antecedente', 'Relativo', 'Ejemplo'], rows: [['etwas', 'was', 'Er hat etwas gesagt, was mich überrascht hat.'], ['nichts (+ preposición)', 'worüber / worauf…', 'Es gibt nichts, worüber wir uns streiten müssten.'], ['alles', 'was', 'Sie glaubt alles, was er sagt.'], ['toda la oración anterior', 'was', 'Er kam zu spät, was mich sehr geärgert hat.']] },
      excepciones: 'Con preposición nunca se dice "über was" sino "worüber" (y análogamente worauf, wovon, womit…) cuando el antecedente es etwas/nichts/alles o una oración completa. Como nota marginal: en alemán coloquial o regional a veces aparece "als" con valor relativo tras un superlativo o "der einzige/erste/letzte…" ("Er ist der Erste, als mir geholfen hat"), pero el estándar culto usa "der" en ese contexto ("der Erste, der mir geholfen hat"); no lo tomes como regla general.',
      explicacion: '"Was" funciona como pronombre relativo cuando su antecedente no es un sustantivo concreto con género propio, sino uno de los pronombres indefinidos neutros "etwas", "nichts", "alles", el demostrativo genérico "das/dies", o directamente toda la oración principal anterior (equivalente a "lo cual" en español): "Er kam zu spät, was mich sehr geärgert hat." Cuando ese relativo necesita ir precedido de una preposición, el alemán no combina la preposición con "was" (nunca "über was"), sino que fusiona la preposición con "wo-" (o "wor-" ante vocal): "worüber", "worauf", "womit", "wovon". Esta construcción es muy frecuente en B2 para retomar de forma compacta una idea completa sin repetir el sustantivo ni abrir una frase nueva.',
      ejemplos: [
        { de: 'Er hat etwas gesagt, was mich überrascht hat.', es: 'Dijo algo que me sorprendió.' },
        { de: 'Es gibt nichts, worüber wir uns streiten müssten.', es: 'No hay nada por lo que debamos discutir.' },
        { de: 'Sie glaubt alles, was er sagt.', es: 'Ella cree todo lo que él dice.' },
        { de: 'Er kam zu spät, was mich sehr geärgert hat.', es: 'Llegó tarde, lo cual me molestó mucho.' }
      ],
      tip: 'Si el relativo necesita preposición y el antecedente es etwas/nichts/alles o toda la oración anterior, funde la preposición con "wo(r)-": nunca "für was" sino "wofür", nunca "an was" sino "woran".'
    },
    {
      id: 'b2-15',
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
      id: 'b2-16',
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
      id: 'b2-17',
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
    }
];
