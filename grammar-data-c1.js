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
    },
    {
      id: 'c1-18',
      titulo: 'Nominalstil ↔ Verbalstil',
      subtitulo: 'Nominalización de frases completas: el estilo de los textos formales',
      regla_base: 'Nominalstil: el verbo se convierte en sustantivo (Verbalnomen) y sus complementos pasan a genitivo, posesivo o grupo preposicional; el adverbio pasa a adjetivo. Verbalstil: el camino inverso. Es el rasgo central de los textos académicos, administrativos y de prensa.',
      tabla: { headers: ['Verbalstil', 'Nominalstil', 'Qué cambia'], rows: [['Die Preise steigen.', 'der Anstieg der Preise', 'sujeto → genitivo'], ['Man untersucht die Proben.', 'die Untersuchung der Proben', 'objeto acusativo → genitivo'], ['Das Labor untersucht die Proben.', 'die Untersuchung der Proben durch das Labor', 'sujeto + objeto: objeto → genitivo, agente → durch'], ['Er ist mit dem Ergebnis zufrieden.', 'seine Zufriedenheit mit dem Ergebnis', 'pronombre sujeto → posesivo; la preposición se conserva'], ['Die Firma hat schnell reagiert.', 'die schnelle Reaktion der Firma', 'adverbio → adjetivo declinado']] },
      excepciones: 'Si el verbo tiene sujeto y objeto, solo uno puede ir en genitivo: el objeto va en genitivo y el agente con "durch" (die Prüfung der Anträge durch die Behörde). Los verbos con dativo o con preposición no pasan a genitivo: helfen → die Hilfe für/bei, warten auf → das Warten auf. Muchas formas nominales son léxicas y hay que aprenderlas: ankommen → die Ankunft, beginnen → der Beginn, abfahren → die Abfahrt, sinken → der Rückgang / das Sinken.',
      explicacion: 'En B2 viste la sustantivación de palabras sueltas (das Lesen, der Kranke). En C1 se nominalizan frases completas: "Die Bevölkerung altert" se convierte en "die Alterung der Bevölkerung", que puede funcionar como sujeto u objeto de otra frase ("Die Alterung der Bevölkerung stellt das Rentensystem vor große Herausforderungen"). Los pasos son siempre los mismos: 1) buscar el sustantivo del verbo (sufijo -ung, raíz sin terminación como der Anstieg, o infinitivo sustantivado como das Rauchen); 2) convertir el sujeto u objeto en genitivo (o en posesivo si es un pronombre: er entscheidet → seine Entscheidung); 3) conservar la preposición del verbo (sich interessieren für → das Interesse für/an); 4) convertir el adverbio en adjetivo (schnell reagieren → die schnelle Reaktion). El Nominalstil condensa la información y suena formal y objetivo; el Verbalstil es más claro y dinámico. Un buen texto C1 combina ambos: usar solo Nominalstil vuelve el texto pesado e ilegible. Saber "desnominalizar" (pasar de Nominalstil a Verbalstil) es igual de importante para comprender textos de prensa y ciencia en la prueba de lectura.',
      ejemplos: [
        { de: 'Die Bevölkerung altert. → die Alterung der Bevölkerung', es: 'La población envejece. → el envejecimiento de la población' },
        { de: 'Man muss die Kosten senken. → Die Senkung der Kosten ist notwendig.', es: 'Hay que reducir los costes. → La reducción de los costes es necesaria.' },
        { de: 'Die Behörden haben die Anträge geprüft. → die Prüfung der Anträge durch die Behörden', es: 'Las autoridades revisaron las solicitudes. → la revisión de las solicitudes por parte de las autoridades' },
        { de: 'Die Teilnehmer bewerten das Projekt positiv. → die positive Bewertung des Projekts durch die Teilnehmer', es: 'Los participantes valoran el proyecto positivamente. → la valoración positiva del proyecto por parte de los participantes' }
      ],
      tip: 'Tres pasos: 1) sustantivo del verbo (-ung, raíz, infinitivo sustantivado); 2) sujeto/objeto → genitivo o posesivo, agente → durch; 3) adverbio → adjetivo. En la Stellungnahme usa el Nominalstil con moderación: 2-3 bloques por párrafo, no frases enteras hechas solo de sustantivos.'
    },
    {
      id: 'c1-19',
      titulo: 'Nebensatz ↔ Präpositionalgruppe',
      subtitulo: 'weil → wegen, obwohl → trotz, wenn → bei, nachdem → nach…',
      regla_base: 'Una subordinada se puede condensar en un grupo preposicional con el verbo nominalizado (y al revés): weil/da → wegen/aufgrund, obwohl → trotz, wenn/falls → bei/im Falle, als (temporal) → bei, während → während, nachdem → nach, bevor → vor, bis → bis zu, um…zu/damit → zu(r)/zwecks, indem → durch, ohne dass → ohne.',
      tabla: { headers: ['Conector', 'Preposición + caso', 'Ejemplo'], rows: [['weil / da', 'wegen / aufgrund + Gen.', 'Weil es stark regnete → Wegen des starken Regens'], ['obwohl', 'trotz + Gen.', 'Obwohl er krank war → Trotz seiner Krankheit'], ['wenn / falls', 'bei + Dat. / im Falle + Gen.', 'Wenn es Probleme gibt → Bei Problemen'], ['als (temporal)', 'bei + Dat.', 'Als er ankam → Bei seiner Ankunft'], ['nachdem / bevor', 'nach / vor + Dat.', 'Bevor das Studium beginnt → Vor Beginn des Studiums'], ['bis', 'bis zu + Dat.', 'Bis das Projekt abgeschlossen ist → Bis zum Abschluss des Projekts'], ['um … zu / damit', 'zu(r) + Dat. / zwecks + Gen.', 'Um die Qualität zu verbessern → Zur Verbesserung der Qualität'], ['indem', 'durch + Akk.', 'Indem man Energie spart → Durch das Sparen von Energie']] },
      excepciones: 'La transformación exige nominalizar el verbo (ver c1-18) y adaptar el caso: trotz/wegen/während/aufgrund → genitivo; bei/nach/vor/zu/bis zu → dativo; durch/ohne → acusativo. El sujeto de la subordinada pasa a genitivo o a posesivo (als er ankam → bei seiner Ankunft). Si la subordinada contiene un modal, una negación compleja o varios complementos, la versión con subordinada suele ser más clara: no todo debe nominalizarse.',
      explicacion: 'Esta es la transformación más típica de los textos formales y de los ejercicios de reformulación de nivel C1: la misma relación lógica (causa, concesión, condición, tiempo, finalidad, modo) se puede expresar con un conector y una subordinada (Verbalstil) o con una preposición y un sustantivo (Nominalstil). "Weil die Nachfrage gestiegen ist, wurden die Preise erhöht" equivale a "Aufgrund der gestiegenen Nachfrage wurden die Preise erhöht". Observa tres cambios: el conector se convierte en preposición, el verbo en sustantivo (o en participio usado como adjetivo: gestiegen → der gestiegenen Nachfrage) y la frase completa pierde un verbo conjugado. Al revés, para entender un texto denso, "desnominalízalo": "Bei falscher Bedienung des Geräts" = "Wenn man das Gerät falsch bedient". Aprende las parejas como bloques fijos y revisa siempre el caso que exige la preposición.',
      ejemplos: [
        { de: 'Weil die Nachfrage gestiegen ist, wurden die Preise erhöht. → Aufgrund der gestiegenen Nachfrage wurden die Preise erhöht.', es: 'Debido al aumento de la demanda se subieron los precios.' },
        { de: 'Obwohl die Kritik heftig war, hielt die Ministerin an ihrem Plan fest. → Trotz der heftigen Kritik hielt die Ministerin an ihrem Plan fest.', es: 'A pesar de las fuertes críticas, la ministra mantuvo su plan.' },
        { de: 'Wenn man das Gerät falsch bedient, können Schäden entstehen. → Bei falscher Bedienung des Geräts können Schäden entstehen.', es: 'Si se usa mal el aparato, pueden producirse daños.' },
        { de: 'Nachdem er sein Studium abgeschlossen hatte, zog er nach Berlin. → Nach dem Abschluss seines Studiums zog er nach Berlin.', es: 'Tras terminar sus estudios se mudó a Berlín.' }
      ],
      tip: 'Memoriza las parejas: weil–wegen/aufgrund, obwohl–trotz, wenn–bei, nachdem–nach, bevor–vor, um…zu–zur, indem–durch. Después de transformar, comprueba el caso: trotz/wegen + Gen., bei/nach/vor/zu + Dat., durch/ohne + Akk.'
    },
    {
      id: 'c1-20',
      titulo: 'Indirekte Rede: Konjunktiv I completo',
      subtitulo: 'sustitución por Konjunktiv II, tiempos, preguntas y verbos introductorios',
      regla_base: 'En el discurso indirecto se usa Konjunktiv I; si su forma coincide con el indicativo (sobre todo en plural: sie haben, wir kommen), se sustituye por Konjunktiv II (sie hätten, wir kämen) o por würde + Inf. El tiempo del original se reduce a tres formas: presente (er komme), pasado (er habe gemacht / sei gekommen) y futuro (er werde kommen).',
      tabla: { headers: ['Original (direkte Rede)', 'Indirekte Rede', 'Regla'], rows: [['„Ich bin müde."', 'Er sagt, er sei müde.', 'presente → Konj. I'], ['„Wir haben keine Zeit."', 'Sie sagen, sie hätten keine Zeit.', 'Konj. I = indicativo (sie haben) → Konj. II'], ['„Ich habe das Problem gelöst." / „Ich löste es."', 'Er behauptet, er habe das Problem gelöst.', 'cualquier pasado → habe/sei + Partizip II'], ['„Ich werde morgen anrufen."', 'Sie verspricht, sie werde morgen anrufen.', 'futuro → werde + Inf.'], ['„Kommst du mit?"', 'Er fragt, ob ich mitkomme.', 'pregunta sí/no → ob'], ['„Wann beginnt der Kurs?"', 'Sie will wissen, wann der Kurs beginne.', 'pregunta W → palabra interrogativa']] },
      excepciones: 'Las órdenes se reproducen con sollen o mögen (ver c1-08). Pronombres y adverbios cambian de perspectiva: ich → er/sie, hier → dort, heute → an diesem Tag, morgen → am nächsten Tag. En la lengua hablada se usa a menudo el indicativo ("Er sagt, er ist müde"); en la escritura formal y en el examen, Konjunktiv I. "würde + Inf." es el sustituto cuando también el Konjunktiv II coincide con el Präteritum (sie arbeiten → sie arbeiteten → sie würden arbeiten).',
      explicacion: 'En B2 aprendiste las formas del Konjunktiv I (sei, habe, komme). En C1 hay que dominar el sistema completo, tal como aparece en la prensa y en los informes. Primero, la regla de sustitución: el Konjunktiv I solo se usa si es distinto del indicativo; si coincide (casi siempre en 1.ª persona del singular y en plural, salvo con "sein"), se pasa a Konjunktiv II, y si este también coincide con el Präteritum, a "würde + Infinitivo". Segundo, los tiempos: el discurso indirecto solo distingue presente, pasado y futuro; cualquier pasado del original (Präteritum, Perfekt, Plusquamperfekt) se expresa con "habe/sei + Partizip II". Tercero, la subordinada puede ir con "dass" (verbo al final) o sin "dass" (verbo en segunda posición), que es lo más habitual en la prensa: "Er sagte, er sei müde". Cuarto, el verbo introductorio aporta información y matiz: behaupten (afirmar sin pruebas), betonen (subrayar), einräumen (admitir), bestreiten (negar), versichern (asegurar), kritisieren, fordern. En la prensa, la fuente se introduce también con "laut + Dat.", "nach Angaben + Gen." o "dem Bericht zufolge", y la frase sigue en Konjunktiv I para marcar distancia.',
      ejemplos: [
        { de: 'Der Minister betonte, die Reform sei unumgänglich.', es: 'El ministro subrayó que la reforma era inevitable.' },
        { de: 'Die Forscher räumen ein, sie hätten die Risiken unterschätzt.', es: 'Los investigadores admiten que habían subestimado los riesgos.' },
        { de: 'Laut dem Pressesprecher habe das Unternehmen alle Auflagen erfüllt.', es: 'Según el portavoz, la empresa habría cumplido todos los requisitos.' },
        { de: 'Sie fragte, ob die Ergebnisse bereits vorlägen.', es: 'Preguntó si los resultados ya estaban disponibles.' }
      ],
      tip: 'Prueba rápida: conjuga en Konjunktiv I; si suena igual que el indicativo (wir haben, sie gehen), pasa a Konjunktiv II (wir hätten, sie gingen). Para el pasado da igual si el original estaba en Präteritum o Perfekt: siempre habe/sei + Partizip II. Varía el verbo introductorio: betonen, einräumen, bestreiten, versichern.'
    },
    {
      id: 'c1-21',
      titulo: 'Präpositionen mit Genitiv (ampliación)',
      subtitulo: 'angesichts, infolge, zwecks, hinsichtlich, ungeachtet… — el registro formal',
      regla_base: 'El alemán formal usa muchas preposiciones con genitivo, casi todas derivadas de sustantivos o participios. Sustituyen a subordinadas (ver c1-19) y dan precisión: causa (aufgrund, infolge, angesichts), finalidad (zwecks, zugunsten), concesión (ungeachtet), referencia (hinsichtlich, bezüglich), medio (mittels, anhand), motivo (anlässlich).',
      tabla: { headers: ['Preposición', 'Valor', 'Ejemplo'], rows: [['aufgrund / infolge', 'causa / consecuencia', 'Infolge des Unwetters fielen zahlreiche Züge aus.'], ['angesichts', 'en vista de', 'Angesichts der steigenden Kosten muss gespart werden.'], ['zwecks', 'con el fin de (administrativo)', 'zwecks Überprüfung der Unterlagen'], ['hinsichtlich / bezüglich', 'en cuanto a, respecto a', 'Hinsichtlich der Finanzierung gibt es noch offene Fragen.'], ['ungeachtet', 'a pesar de, sin tener en cuenta', 'Ungeachtet aller Warnungen wurde das Projekt fortgesetzt.'], ['mittels / anhand', 'mediante / a partir de', 'Anhand dieser Daten lässt sich zeigen, dass …'], ['zugunsten / zulasten', 'en favor de / a costa de', 'eine Entscheidung zugunsten der Umwelt'], ['anlässlich', 'con motivo de', 'Anlässlich des Jubiläums fand ein Festakt statt.']] },
      excepciones: 'En plural sin artículo ni adjetivo el genitivo no se distingue y se usa dativo: "mittels Sensoren", "laut Berichten". No confundas infolge (a consecuencia de, delante, + Gen.) con zufolge (según, normalmente detrás y + Dat.: "dem Bericht zufolge"). En el habla coloquial wegen y trotz aparecen con dativo; en la escritura formal y en el examen, siempre genitivo.',
      explicacion: 'En B1 viste las preposiciones de genitivo básicas (während, wegen, trotz, innerhalb, außerhalb). En C1 se amplía el repertorio con las preposiciones propias de la prensa, la administración y el lenguaje académico. Su ventaja es la precisión: "angesichts" no es solo causa, sino "teniendo en cuenta una situación evidente"; "infolge" marca una consecuencia directa; "ungeachtet" concede algo que se decide ignorar; "hinsichtlich" y "bezüglich" introducen el tema del que se habla. Combinadas con la nominalización (ver c1-18 y c1-19) permiten condensar una subordinada entera en pocas palabras: "Da die Kosten steigen, muss gespart werden" → "Angesichts steigender Kosten muss gespart werden". En la Stellungnahme y en la carta formal, 2 o 3 de estas preposiciones bien usadas elevan claramente el registro.',
      ejemplos: [
        { de: 'Angesichts der angespannten Haushaltslage wurden mehrere Projekte gestoppt.', es: 'En vista de la difícil situación presupuestaria se detuvieron varios proyectos.' },
        { de: 'Infolge des Fachkräftemangels bleiben viele Stellen unbesetzt.', es: 'A consecuencia de la falta de personal cualificado, muchos puestos quedan vacantes.' },
        { de: 'Hinsichtlich Ihrer Anfrage teilen wir Ihnen mit, dass …', es: 'En relación con su consulta le comunicamos que…' },
        { de: 'Ungeachtet der Proteste hielt die Stadt an dem Bauvorhaben fest.', es: 'A pesar de las protestas, la ciudad mantuvo el proyecto de construcción.' }
      ],
      tip: 'Prepara cuatro comodines para la escritura: angesichts (causa evidente), hinsichtlich (tema), aufgrund (causa neutra) y ungeachtet (concesión). Y recuerda: infolge = a consecuencia de; zufolge = según ("dem Bericht zufolge").'
    },
    {
      id: 'c1-22',
      titulo: 'Konnektoren der Argumentation',
      subtitulo: 'einerseits…andererseits, zwar…aber, insofern als, je nachdem, folglich',
      regla_base: 'Los conectores de argumentación estructuran la opinión: contraste (einerseits…andererseits, zwar…aber, wohingegen), adición (nicht nur…sondern auch, darüber hinaus), restricción (insofern als, allerdings, jedoch), alternativa condicionada (je nachdem, ob/wie) y consecuencia (folglich, somit, demzufolge). Cada uno tiene su posición sintáctica: coordinante (posición 0), adverbio (posición 1 con inversión) o subordinante (verbo al final).',
      tabla: { headers: ['Conector', 'Tipo / posición', 'Ejemplo'], rows: [['einerseits … andererseits', 'adverbio: posición 1 o Mittelfeld', 'Einerseits ist das Homeoffice flexibel, andererseits fehlt der persönliche Kontakt.'], ['zwar … aber', 'zwar en el Mittelfeld, aber en posición 0', 'Die Idee ist zwar gut, aber kaum umsetzbar.'], ['nicht nur … sondern auch', 'coordinante', 'Das betrifft nicht nur Studierende, sondern auch Lehrkräfte.'], ['wohingegen', 'subordinante (verbo al final)', 'Die Städte wachsen, wohingegen viele Dörfer schrumpfen.'], ['insofern …, als', 'subordinante: restringe una afirmación', 'Das Argument ist insofern richtig, als es die Kosten berücksichtigt.'], ['je nachdem, ob/wie', 'subordinante', 'Je nachdem, wie man es betrachtet, fällt die Bilanz anders aus.'], ['folglich / somit', 'adverbio: posición 1 → inversión', 'Die Nachfrage sinkt; folglich sinken auch die Preise.'], ['allerdings / jedoch', 'adverbio (jedoch también posición 0)', 'Das klingt überzeugend. Allerdings gibt es einen Haken.']] },
      excepciones: 'aber, sondern, denn y oder ocupan la posición 0 y no provocan inversión; folglich, allerdings, trotzdem, somit y andererseits sí (el verbo va justo después). "jedoch" admite ambas posiciones. "sondern" solo aparece tras una negación. "insofern" va en la principal y "als" introduce la subordinada: no se pueden separar de otra forma.',
      explicacion: 'En B2 viste los conectores de dos partes básicos (sowohl…als auch, weder…noch, entweder…oder) y los concesivos. En C1 el objetivo es argumentar con matices: presentar dos caras (einerseits…andererseits), conceder antes de contradecir (zwar…aber), añadir peso (nicht nur…sondern auch, darüber hinaus), limitar el alcance de una afirmación (insofern…, als), hacer depender algo de una condición (je nachdem, ob/wie) y sacar conclusiones (folglich, somit). En el examen, la variedad y la corrección de los conectores es un criterio explícito de la evaluación de la escritura y del Vortrag: repetir "aber" y "weil" limita la nota. El error más frecuente no es de significado sino de sintaxis: olvidar la inversión tras un adverbio conector ("Folglich die Preise sinken" ✗ → "Folglich sinken die Preise" ✓) o no mandar el verbo al final tras un subordinante (wohingegen, je nachdem).',
      ejemplos: [
        { de: 'Einerseits spart man Zeit, andererseits leidet die Kommunikation im Team.', es: 'Por un lado se ahorra tiempo; por otro, la comunicación del equipo se resiente.' },
        { de: 'Die Maßnahme ist zwar teuer, aber langfristig unverzichtbar.', es: 'La medida es cara, sí, pero a largo plazo imprescindible.' },
        { de: 'Ich stimme Ihnen insofern zu, als die Kosten tatsächlich gestiegen sind.', es: 'Le doy la razón en la medida en que los costes efectivamente han subido.' },
        { de: 'Je nachdem, ob die Förderung bewilligt wird, beginnt das Projekt im Frühjahr oder im Herbst.', es: 'Según se apruebe o no la subvención, el proyecto empezará en primavera o en otoño.' }
      ],
      tip: 'Para el Vortrag y la Stellungnahme, prepara una cadena fija: "Einerseits … andererseits …" (presentar), "zwar … aber" (conceder), "insofern, als" (matizar), "folglich" (concluir). Después de cada conector, comprueba dónde va el verbo.'
    },
    {
      id: 'c1-23',
      titulo: 'Modalpartikeln en la discusión',
      subtitulo: 'durchaus, schon, immerhin, ohnehin, eben, wohl — matizar la postura',
      regla_base: 'En C1 las partículas y adverbios de matiz sirven para graduar la postura en la discusión: conceder (durchaus, schon), relativizar (immerhin, wohl), presentar algo como evidente o inevitable (eben, nun mal, ja) y reforzar o contradecir (doch). Las partículas propiamente dichas (ja, doch, eben, halt, wohl, schon) van en el Mittelfeld, sin acento y nunca en posición 1; los adverbios de matiz (immerhin, durchaus, ohnehin) sí pueden ir en posición 1.',
      tabla: { headers: ['Palabra', 'Función', 'Ejemplo'], rows: [['durchaus', 'concesión fuerte: "sin duda, perfectamente"', 'Das ist durchaus ein berechtigter Einwand.'], ['schon (…, aber)', 'concesión parcial', 'Das stimmt schon, aber man muss auch bedenken, dass …'], ['immerhin', 'valoración positiva relativa: "al menos"', 'Immerhin wurde ein Kompromiss gefunden.'], ['ohnehin / sowieso', 'algo ya era así de todos modos', 'Die Kosten steigen ohnehin.'], ['eben / nun mal', 'hecho que hay que aceptar', 'So funktioniert der Markt nun mal.'], ['wohl', 'suposición, distancia', 'Das wird wohl nicht ausreichen.'], ['ja', 'algo conocido por todos', 'Das wissen wir ja alle.'], ['doch', 'recordar o contradecir', 'Das ist doch genau das Problem!']] },
      excepciones: '"halt" equivale a "eben" pero es coloquial (sur de Alemania, Austria): aceptable con moderación en el oral, nunca en la escritura formal. "schon" con acento es temporal (ya); sin acento es concesivo. El exceso suena artificial: 1-2 partículas por intervención. En la Stellungnahme escrita, solo durchaus, immerhin, ohnehin y wohl.',
      explicacion: 'En B2 aprendiste el valor emocional de las partículas básicas (doch, mal, ja, eigentlich, eben, halt). En C1 se usan de forma estratégica en la discusión oral y en la argumentación: permiten conceder un punto sin renunciar a la propia postura ("Das ist durchaus richtig, aber …"), relativizar un logro ("Immerhin ist das ein Anfang"), presentar algo como indiscutible ("Das ist eben der Preis der Flexibilität") o expresar una suposición con distancia ("Das dürfte wohl schwierig werden"). En la Diskussion del Goethe C1 se valora la capacidad de reaccionar a los argumentos del otro con matices, y estas palabras son la herramienta más económica para lograrlo. Su lugar natural es el Mittelfeld, normalmente después del verbo conjugado y de los pronombres, antes de la información nueva.',
      ejemplos: [
        { de: 'Da haben Sie durchaus recht, allerdings sollte man auch die Kosten bedenken.', es: 'En eso tiene toda la razón; sin embargo, también habría que tener en cuenta los costes.' },
        { de: 'Das Ergebnis ist nicht perfekt, aber immerhin ein Fortschritt.', es: 'El resultado no es perfecto, pero al menos es un avance.' },
        { de: 'Die Reform kommt ohnehin zu spät.', es: 'La reforma llega tarde de todos modos.' },
        { de: 'Das Problem lässt sich wohl nicht kurzfristig lösen.', es: 'Probablemente el problema no se pueda resolver a corto plazo.' }
      ],
      tip: 'En la Diskussion, conceder antes de contradecir suma puntos: "Das ist durchaus richtig, aber …", "Da haben Sie schon recht, allerdings …", "Immerhin muss man sagen, dass …". Memoriza tres fórmulas y úsalas tal cual.'
    },
    {
      id: 'c1-24',
      titulo: 'Uso subjetivo de los modales',
      subtitulo: 'graduar suposiciones: muss, dürfte, wird wohl, kann, könnte + Infinitiv Perfekt',
      regla_base: 'Los modales en uso subjetivo expresan el grado de seguridad del hablante sobre un hecho: muss (casi seguro) > dürfte (muy probable) > wird wohl (probable) > kann (posible) > könnte (quizá). Para suposiciones sobre el pasado: modal + Partizip II + haben/sein (Infinitiv Perfekt): "Er muss den Zug verpasst haben."',
      tabla: { headers: ['Grado', 'Modal', 'Presente', 'Pasado (Infinitiv Perfekt)'], rows: [['casi seguro (deducción)', 'muss', 'Er muss krank sein.', 'Er muss den Termin vergessen haben.'], ['muy probable', 'dürfte', 'Das dürfte teuer sein.', 'Sie dürfte davon gewusst haben.'], ['probable', 'wird (wohl)', 'Er wird wohl im Büro sein.', 'Er wird es wohl vergessen haben.'], ['posible', 'kann', 'Das kann stimmen.', 'Er kann sich geirrt haben.'], ['quizá', 'könnte', 'Es könnte Probleme geben.', 'Sie könnte die Mail übersehen haben.'], ['seguro que no', 'kann nicht', 'Das kann nicht sein.', 'Er kann das nicht gesagt haben.']] },
      excepciones: 'No confundir con el uso objetivo (obligación, capacidad): "Er muss arbeiten" (obligación) vs. "Er muss viel gearbeitet haben" (deducción). La negación del "muss" subjetivo no es "muss nicht" sino "kann nicht". "soll" y "will" indican la fuente de la información, no el grado de seguridad (ver c1-07). "hätte … können/müssen" es Irrealis del pasado, no suposición (ver c1-05).',
      explicacion: 'Los verbos modales tienen dos usos. En el uso objetivo describen una obligación, capacidad o permiso del sujeto ("Sie muss morgen früh aufstehen"). En el uso subjetivo expresan la valoración del hablante sobre la probabilidad de un hecho ("Sie muss sehr müde sein" = seguramente está muy cansada). Esta escala permite sustituir el repetitivo "vielleicht / wahrscheinlich / sicher" por estructuras más precisas y propias de C1. Para el pasado se usa el Infinitiv Perfekt (Partizip II + haben/sein) detrás del modal conjugado en presente: el modal está en presente porque la suposición se hace ahora, aunque el hecho sea pasado. En C2 este sistema se combina con adverbios (müsste eigentlich, dürfte wohl); en C1 basta con dominar la escala y la forma del pasado, y distinguirlos de los modales evidenciales (soll, will) y del Irrealis (hätte … müssen).',
      ejemplos: [
        { de: 'Die Ergebnisse müssen falsch berechnet worden sein.', es: 'Los resultados tienen que haberse calculado mal (deducción).' },
        { de: 'Die Mieten dürften in den nächsten Jahren weiter steigen.', es: 'Es muy probable que los alquileres sigan subiendo en los próximos años.' },
        { de: 'Er kann die Nachricht nicht gelesen haben, sonst hätte er reagiert.', es: 'No puede haber leído el mensaje; si no, habría reaccionado.' },
        { de: 'Die Verzögerung könnte mit dem Streik zusammenhängen.', es: 'El retraso podría estar relacionado con la huelga.' }
      ],
      tip: 'Para el pasado, la fórmula es siempre: modal conjugado + Partizip II + haben/sein al final ("Er muss den Zug verpasst haben"). En la Diskussion, sustituye "vielleicht" por "könnte" o "dürfte": matiza tu postura y suena a C1.'
    }
];
