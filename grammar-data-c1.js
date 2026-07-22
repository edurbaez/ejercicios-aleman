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
      titulo: 'Gerundivum',
      subtitulo: 'zu + Partizip I con valor pasivo',
      regla_base: '[artículo] + zu + Partizip I (declinado como adjetivo) + [sustantivo]. Expresa obligación o necesidad con matiz pasivo: "das zu lösende Problem" = el problema que debe resolverse.',
      tabla: { headers: ['Forma', 'Ejemplo'], rows: [['Gerundivum', 'das zu lösende Problem'], ['sein + zu + Inf.', 'das Problem, das zu lösen ist'], ['Nebensatz mit müssen + Passiv', 'das Problem, das gelöst werden muss']] },
      excepciones: 'A diferencia de "sein + zu + Inf." (c1-02), que según el verbo podía expresar obligación o simple posibilidad, el Gerundivum SIEMPRE implica obligación o necesidad, nunca mera posibilidad. Es la tercera gran alternativa a la pasiva (junto con lassen+sich y sein+zu), pero en forma de atributo antepuesto al sustantivo, no de predicado.',
      explicacion: 'El Gerundivum es una forma adjetival construida con "zu" + Partizip I (Infinitivo + -d), declinada como cualquier adjetivo atributivo, que se coloca entre el artículo y el sustantivo. Expresa que algo debe o tiene que sufrir la acción indicada, con un matiz claramente pasivo y de obligación: "das zu lösende Problem" (el problema que hay que resolver) equivale a "das Problem, das gelöst werden muss" o "das Problem, das zu lösen ist". Al igual que el atributo participial extendido con Partizip II, el Gerundivum puede llevar sus propios complementos antepuestos al participio: "die schnell zu lösenden Probleme" (los problemas que hay que resolver rápidamente). Es una estructura de registro muy formal y escrito, típica de textos legales, técnicos y académicos; apenas se usa en el habla coloquial.',
      ejemplos: [
        { de: 'die zu verkaufenden Bücher', es: 'los libros que hay que vender / que deben venderse' },
        { de: 'das zu lösende Problem', es: 'el problema que hay que resolver' },
        { de: 'die schnell zu erledigenden Aufgaben', es: 'las tareas que hay que terminar rápidamente' },
        { de: 'ein nicht zu unterschätzendes Risiko', es: 'un riesgo que no hay que subestimar' }
      ],
      tip: 'El Gerundivum ("zu + Partizip I" declinado) siempre expresa obligación/necesidad, nunca simple posibilidad, a diferencia de "sein + zu + Inf." que podía ser ambiguo. Puede llevar complementos propios antes del participio: "die schnell zu lösenden Probleme".'
    },
    {
      id: 'c1-04',
      titulo: 'Atributo participial extendido',
      subtitulo: 'das von X beschlossene Gesetz',
      regla_base: '[artículo] + [complementos + participio] + [sustantivo]. Comprime una oración de relativo. Leer de derecha a izquierda: el sustantivo es el núcleo.',
      excepciones: 'Para producirlo: toma la relativa → quita el pronombre relativo y auxiliar → convierte el verbo al participio → insértalo. "die Frage, die seit Jahren diskutiert wird" → "die seit Jahren diskutierte Frage". Compárese con el Gerundivum (c1-03, zu + Partizip I), que expresa obligación en vez de un resultado o estado ya producido.',
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
      id: 'c1-08',
      titulo: 'Wiedergabe von Aufforderungen und Gerüchten',
      subtitulo: 'sollen para órdenes · will + Perfekt Konj. I para autoafirmaciones dudosas',
      regla_base: 'Discurso indirecto pleno: una orden se reproduce con sollen (no existe Konj.I del imperativo); un rumor sin fuente con Konjunktiv I normal; una autoafirmación dudosa del sujeto con will + Perfekt Konjunktiv I.',
      tabla: { headers: ['Caso', 'Estructura', 'Ejemplo'], rows: [['Orden/petición (Aufforderung)', 'sollen en Konj.I/Indikativ', '„Geh nach Hause!" → Er sagte, ich solle nach Hause gehen.'], ['Rumor sin fuente', 'Konjunktiv I (man sagt, …)', 'Man sagt, er sei im Ausland.'], ['Autoafirmación dudosa del sujeto', 'will + Partizip II + Konj.I von haben/sein', 'Er will das nie gesagt haben.']] },
      excepciones: 'En el primer caso, "sollen" no funciona aquí como partícula evidencial (a diferencia de c1-07): es el sustituto obligatorio del imperativo al pasarlo a discurso indirecto, porque el imperativo no tiene forma propia de Konjunktiv I. No confundir con el "soll" de rumor de c1-07 ni con el "will" evidencial ya visto: aquí "will" se despliega en una construcción completa de Perfekt (haben/sein + Partizip II, en Konjunktiv I) para reportar que el propio sujeto afirma algo sobre su pasado, típicamente con matiz de duda del hablante.',
      explicacion: 'Esta regla retoma el discurso indirecto (Konjunktiv I, ya visto en B2) para dos usos específicos que van más allá de reportar simples afirmaciones. Primero, reproducir una orden o petición (Aufforderung): como el imperativo no tiene Konjunktiv I propio, se usa "sollen" como sustituto: "Geh nach Hause!" → "Er sagte, ich solle (o sollte) nach Hause gehen." Segundo, reproducir un rumor sin fuente identificada con la maquinaria plena del discurso indirecto: "Man sagt, er sei im Ausland" (Se dice que está en el extranjero) — aquí el Konjunktiv I es el mecanismo general de discurso reportado, no el "soll" evidencial suelto de c1-07. Tercero, y el uso más característico de C1: "will" combinado con un Perfekt en Konjunktiv I (haben/sein + Partizip II) para reproducir una afirmación que el propio sujeto hace sobre sí mismo, marcando que el hablante duda de su veracidad: "Er will das nie gesagt haben" (Él afirma que nunca dijo eso, pero yo no estoy tan seguro). A diferencia de c1-07, que trata partículas evidenciales sueltas en una frase, aquí el foco está en cómo se construye el discurso indirecto completo para órdenes y autoafirmaciones dudosas.',
      ejemplos: [
        { de: 'Er sagte, ich solle nach Hause gehen.', es: 'Dijo que me fuera a casa. (orden → sollen)' },
        { de: 'Der Chef sagte, wir sollten pünktlich kommen.', es: 'El jefe dijo que llegáramos puntuales. (orden → sollen)' },
        { de: 'Man sagt, er sei im Ausland.', es: 'Se dice que está en el extranjero. (rumor, Konj.I)' },
        { de: 'Er will das nie gesagt haben.', es: 'Él afirma que nunca dijo eso. (autoafirmación dudosa, will + Perfekt Konj.I)' }
      ],
      tip: 'Tres pistas: si reproduces una ORDEN, usa "sollen" (no hay Konj.I del imperativo). Si reproduces un RUMOR general, usa Konjunktiv I normal ("man sagt, … sei …"). Si el propio sujeto afirma algo dudoso sobre sí mismo, usa "will" + Partizip II + haben/sein: "Er will es nicht bemerkt haben."'
    },
    {
      id: 'c1-09',
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
      id: 'c1-10',
      titulo: 'Trennbare und untrennbare Verben',
      subtitulo: 'mitkommen, ankommen, bekommen, entkommen — el prefijo cambia el sentido',
      regla_base: 'Los prefijos separables (mit-, an-, auf-, aus-…, acento en el prefijo) y los inseparables (be-, ge-, ent-, er-, ver-, zer-, emp-, miss-, sin acento, sin "ge-" en Partizip II) transforman radicalmente el significado del verbo base.',
      tabla: { headers: ['Verbo', 'Tipo', 'Significado'], rows: [['mitkommen', 'separable', 'venir con, acompañar'], ['ankommen', 'separable', 'llegar'], ['bekommen', 'inseparable', 'recibir, obtener'], ['entkommen', 'inseparable', 'escapar, huir'], ['umfahren (Akk.)', 'inseparable', 'rodear/esquivar algo conduciendo: er umfährt den Baum'], ['umfahren (trennbar)', 'separable', 'atropellar/tirar algo al pasar: er fährt die Mülltonne um']] },
      excepciones: 'Pista práctica del acento tónico: si el acento cae sobre el prefijo, el verbo es separable (ÚMfahren = atropellar: "er fährt … um"). Si el acento cae sobre la raíz, es inseparable (umFAHren = rodear/esquivar: "er umfährt …", sin separar el prefijo ni al final de la frase). Esta es la única pista fiable para prefijos que pueden ser ambos, como "umfahren", "übersetzen" o "durchfahren".',
      explicacion: 'Muchos verbos alemanes comparten una raíz pero cambian completamente de significado según el prefijo que llevan: "kommen" (venir) da lugar a "mitkommen" (venir con, acompañar), "ankommen" (llegar), "bekommen" (recibir/obtener) y "entkommen" (escapar) — cuatro significados distintos sobre la misma base. Los prefijos separables (trennbar: mit-, an-, auf-, aus-…) llevan el acento tónico y se separan del verbo, yendo al final de la frase en tiempo presente/pasado simple: "Er kommt mit." Los prefijos inseparables (untrennbar: be-, ge-, ent-, er-, ver-, zer-, emp-, miss-) nunca se separan, no llevan acento y no toman "ge-" en el Partizip II: "bekommen → bekommen" (no "gebekommen"). El caso más interesante son los verbos con prefijos que pueden ser AMBOS según el sentido: "umfahren" separable significa atropellar o tirar algo al pasar conduciendo ("Er fährt die Mülltonne um" — el prefijo se separa y va al final), mientras que "umfahren" inseparable significa rodear o esquivar algo conduciendo ("Er umfährt den Baum" — el prefijo no se separa). Entre los prefijos inseparables más productivos: "zer-" indica destrucción (zerbrechen, zerreißen), "ent-" alejamiento o pérdida (entkommen, entfernen), "miss-" algo mal hecho (missverstehen, misslingen) y "ver-" a menudo un cambio negativo o de estado (verlaufen, verschlafen).',
      ejemplos: [
        { de: 'Kommst du mit ins Kino?', es: '¿Vienes conmigo al cine? (mitkommen, separable)' },
        { de: 'Er ist gestern in Berlin angekommen.', es: 'Llegó ayer a Berlín. (ankommen, separable)' },
        { de: 'Er fährt die Mülltonne um.', es: 'Él tira/atropella el cubo de basura al pasar. (umfahren separable)' },
        { de: 'Er umfährt den Baum.', es: 'Él rodea/esquiva el árbol conduciendo. (umfahren inseparable)' }
      ],
      tip: 'Escucha el acento: prefijo acentuado = separable (va al final: "…fährt … um"). Raíz acentuada = inseparable (prefijo pegado siempre: "umfährt …"). Los prefijos be-, ent-, er-, ver-, zer-, emp-, miss- son SIEMPRE inseparables, sin excepción.'
    },
    {
      id: 'c1-11',
      titulo: 'Compuestos con irgend-',
      subtitulo: 'irgendjemand, irgendetwas, irgendwo, irgendwann, irgendwie, irgendein',
      regla_base: 'El prefijo "irgend-" se antepone a pronombres y adverbios para añadir indeterminación total: no importa quién, qué, dónde, cuándo, cómo o cuál.',
      tabla: { headers: ['Forma', 'Significado'], rows: [['irgendjemand', 'alguien, quienquiera que sea'], ['irgendetwas / irgendwas', 'algo, sea lo que sea'], ['irgendwo', 'en algún lugar, no importa dónde'], ['irgendwann', 'en algún momento, cuando sea'], ['irgendwie', 'de algún modo, como sea'], ['irgendein/irgendeine', 'algún/alguna (sin especificar cuál), se declina como "ein"']] },
      excepciones: 'Las formas sin "irgend-" (jemand, etwas, wo, wann, wie, ein) ya implican cierta indeterminación, pero "irgend-" la refuerza hasta la indiferencia total sobre la identidad/lugar/momento/modo: "Ruf jemanden an" (llama a alguien, cualquiera vale más o menos) vs. "Ruf irgendjemanden an" (llama a quien sea, de verdad no importa a quién). Muy usado en preguntas retóricas o para expresar indiferencia.',
      explicacion: 'El prefijo "irgend-" convierte pronombres y adverbios indefinidos en formas de indeterminación absoluta: no aporta ninguna pista sobre la identidad, el lugar, el momento o el modo. "Irgendjemand" (alguien, quienquiera), "irgendetwas/irgendwas" (algo, lo que sea), "irgendwo" (en algún lugar), "irgendwann" (en algún momento), "irgendwie" (de algún modo) y "irgendein/irgendeine" (algún/alguna) son muy frecuentes en el alemán hablado y escrito culto para señalar que la elección concreta es irrelevante. "Irgendein" funciona como artículo indefinido y se declina exactamente igual que "ein" (irgendein Buch, irgendeine Idee, irgendeinem Problem).',
      ejemplos: [
        { de: 'Hat irgendjemand irgendetwas gesehen?', es: '¿Ha visto alguien algo (lo que sea)?' },
        { de: 'Wir treffen uns irgendwo in der Stadt.', es: 'Nos vemos en algún lugar de la ciudad (no importa dónde).' },
        { de: 'Ruf mich irgendwann an, wenn du Zeit hast.', es: 'Llámame en algún momento cuando tengas tiempo.' },
        { de: 'Er wird das Problem irgendwie lösen.', es: 'Resolverá el problema de algún modo.' }
      ],
      tip: '"Irgendein" se declina como "ein": irgendein Buch, irgendeine Idee, irgendeinem Kollegen. Úsalo cuando de verdad no importa cuál, no como simple sinónimo de "ein".'
    },
    {
      id: 'c1-12',
      titulo: 'Kausale Nebensätze mit da und wobei',
      subtitulo: 'da (causa conocida) vs. wobei (inciso causal-concesivo)',
      regla_base: '"Da" introduce una causa ya conocida o esperable, va antepuesto y es más formal que "weil". "Wobei" añade un comentario o matización lateral, casi un inciso.',
      tabla: { headers: ['Conector', 'Registro/posición', 'Matiz'], rows: [['weil', 'neutro, puede responder a "Warum?"', 'causa nueva o enfatizada'], ['da', 'formal, casi siempre antepuesto', 'causa ya conocida/esperable, nunca responde a "Warum?"'], ['wobei', 'culto, se pospone como inciso', 'observación o matización causal-concesiva lateral']] },
      excepciones: '"Da" no puede usarse para responder directamente a una pregunta con "Warum?" — en ese caso solo cabe "weil". "Wobei" no es intercambiable con "da": no introduce la causa principal, sino un comentario añadido que matiza o relativiza lo dicho, con un matiz entre causal y concesivo.',
      explicacion: 'Además del "weil" básico, el alemán culto usa "da" y "wobei" para matizar relaciones causales. "Da" (verbo al final, como "weil") introduce una causa que el oyente ya conoce o puede esperar, y por eso suele colocarse al principio de la oración, antes de la principal: "Da es regnete, blieben wir zu Hause." Es de registro más formal y escrito que "weil". "Wobei" no introduce una causa pura, sino una observación o matización lateral —a menudo con un matiz causal-concesivo— que se añade casi como un inciso a lo que se acaba de afirmar: "Er hat die Prüfung bestanden, wobei er sich kaum vorbereitet hatte."',
      ejemplos: [
        { de: 'Da es regnete, blieben wir zu Hause.', es: 'Como llovía, nos quedamos en casa.' },
        { de: 'Da du das schon weißt, muss ich es nicht erklären.', es: 'Como ya lo sabes, no hace falta que lo explique.' },
        { de: 'Er hat die Prüfung bestanden, wobei er sich kaum vorbereitet hatte.', es: 'Aprobó el examen, aunque apenas se había preparado.' },
        { de: 'Das Projekt war erfolgreich, wobei es auch einige Probleme gab.', es: 'El proyecto tuvo éxito, si bien también hubo algunos problemas.' }
      ],
      tip: 'Ante "Warum?" responde siempre con "weil", nunca con "da". "Wobei" no sustituye a "da": es un inciso que matiza, no la causa principal del enunciado.'
    },
    {
      id: 'c1-13',
      titulo: 'Modale Nebensätze mit indem',
      subtitulo: 'indem, dadurch dass, wodurch — el medio o método',
      regla_base: '"Indem" + Nebensatz expresa el medio/método por el cual se logra algo. "Dadurch, dass" es variante enfática. "Wodurch" retoma retrospectivamente una idea anterior con valor instrumental-consecutivo.',
      tabla: { headers: ['Estructura', 'Función', 'Ejemplo breve'], rows: [['indem + Nebensatz', 'medio/método simultáneo', 'indem er jeden Tag übte'], ['dadurch, dass + Nebensatz', 'medio/método enfatizado', 'dadurch, dass er jeden Tag übte'], ['wodurch (relativo)', 'retoma lo anterior como causa/medio', 'Er übte, wodurch er besser wurde']] },
      excepciones: '"Indem" introduce el medio de forma explícita, con la subordinada aportando el mismo peso informativo que la principal y valor de simultaneidad. "Wodurch" no introduce una subordinada nueva de medio, sino que retoma retrospectivamente toda la oración anterior con un matiz consecutivo-instrumental ("por lo cual"), de forma paralela a "wobei"/"was" ya conocidos.',
      explicacion: '"Indem" + Nebensatz (verbo al final) expresa el medio o método por el que se consigue algo, respondiendo a "¿cómo?": "Er verbesserte seine Aussprache, indem er jeden Tag laut las." "Dadurch, dass" + Nebensatz es una variante equivalente pero más explícita y enfática, útil para retomar o subrayar una explicación de causa-método; puede anticiparse "dadurch" en la oración principal y retomarse con "dass" en la subordinada: "Dadurch, dass er jeden Tag übte, wurde er immer besser." "Wodurch" es un relativo que retoma toda una oración anterior con valor de medio/instrumento causal: "Er las jeden Tag, wodurch sich seine Aussprache verbesserte."',
      ejemplos: [
        { de: 'Er verbesserte seine Aussprache, indem er jeden Tag laut las.', es: 'Mejoró su pronunciación leyendo en voz alta cada día.' },
        { de: 'Dadurch, dass er jeden Tag übte, wurde er immer besser.', es: 'Debido a que practicaba cada día, mejoraba cada vez más.' },
        { de: 'Er las jeden Tag, wodurch sich seine Aussprache verbesserte.', es: 'Leía cada día, por lo cual mejoró su pronunciación.' },
        { de: 'Man spart Energie, indem man das Licht ausschaltet.', es: 'Se ahorra energía apagando la luz.' }
      ],
      tip: '"Indem" = medio explícito y simultáneo a la acción principal. "Wodurch" = retoma como consecuencia lo que ya se dijo antes. No los confundas: "indem" abre la explicación, "wodurch" la cierra retrospectivamente.'
    },
    {
      id: 'c1-14',
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
      id: 'c1-15',
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
      id: 'c1-16',
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
    },
    {
      id: 'c1-17',
      titulo: 'Es como placeholder / sujeto formal',
      subtitulo: 'Cuándo "es" es puramente gramatical y no se puede traducir ni omitir',
      regla_base: 'Además del "es" pronombre real (que sustituye a un neutro concreto), existe un "es" formal: sujeto obligatorio con verbos impersonales, placeholder de posición 1 cuando el sujeto real va después, y objeto acusativo fijo en ciertas expresiones.',
      tabla: { headers: ['Uso', 'Ejemplo', 'Nota'], rows: [['Impersonal meteorológico/sensorial', 'Es regnet. / Es ist kalt. / Mir ist (es) kalt.', 'Sujeto formal obligatorio; con "mir" en posición 1, "es" puede omitirse.'], ['Placeholder de posición 1', 'Es freut mich, dass du kommst.', 'El sujeto real es la subordinada "dass du kommst"; "es" desaparece si esta ocupa la posición 1.'], ['Pasiva impersonal sin sujeto', 'Es wird hier viel gelacht.', 'Ver regla b2-06: "es" desaparece si otro elemento ocupa la posición 1.'], ['Objeto acusativo fijo', 'Ich habe es eilig. / Sie meint es gut mit dir. / Er hat es schwer.', '"es" es parte fija de la expresión; nunca se omite ni se sustituye.']] },
      excepciones: 'El "es" placeholder de posición 1 desaparece en cuanto otro elemento (la subordinada, "mir", etc.) ocupa esa posición, porque su única función es rellenar el hueco gramatical. En cambio, el "es" objeto fijo de expresiones como "es eilig haben", "es gut meinen" o "es schwer haben" NUNCA desaparece, sin importar el orden de la frase, porque no es un placeholder posicional sino parte fija e inseparable de la expresión.',
      explicacion: 'El "es" gramatical se distingue del "es" pronombre real (que reemplaza un sustantivo neutro concreto, p. ej. "Das Kind schläft. Es ist müde."). Primero, como sujeto formal obligatorio con verbos impersonales de clima o sensación: "Es regnet.", "Es ist kalt."; en construcciones con dativo como "Mir ist (es) kalt", "es" puede omitirse porque "mir" ya ocupa la posición 1. Segundo, como placeholder de la posición 1 cuando el sujeto gramatical real es una subordinada o un infinitivo que aparece después: "Es freut mich, dass du kommst." — aquí lo que realmente "alegra" es "dass du kommst"; si esa subordinada se antepone, "es" desaparece: "Dass du kommst, freut mich." Tercero, brevemente, en la pasiva impersonal sin sujeto (ya visto en B2): "Es wird hier viel gelacht" pierde el "es" en cuanto otro elemento ocupa la posición 1. Cuarto, como objeto acusativo obligatorio en expresiones fijas donde "es" no señala nada concreto y no puede omitirse ni sustituirse: "Ich habe es eilig." (Tengo prisa), "Sie meint es gut mit dir." (Ella tiene buenas intenciones contigo), "Er hat es schwer." (Lo tiene difícil). El reto para el estudiante es reconocer cuándo "es" es un pronombre real con referencia y cuándo es solo un elemento gramatical/formal.',
      ejemplos: [
        { de: 'Es schneit seit heute Morgen.', es: 'Está nevando desde esta mañana.' },
        { de: 'Es freut mich, dass du kommst.', es: 'Me alegra que vengas.' },
        { de: 'Dass du kommst, freut mich.', es: 'Que vengas me alegra.' },
        { de: 'Er hat es im Leben nicht leicht gehabt.', es: 'No lo ha tenido fácil en la vida.' }
      ],
      tip: 'Pregúntate: ¿puedo mover algo a la posición 1 y "es" desaparece? Entonces era un placeholder ("Es freut mich, dass…" → "Dass…, freut mich"). ¿"es" sigue ahí sin importar el orden? Entonces es objeto fijo de la expresión ("es eilig haben", "es gut meinen", "es schwer haben") y jamás se quita.'
    }
];
