window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
window.GRAMMAR_DATA.C1 = [
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
];
