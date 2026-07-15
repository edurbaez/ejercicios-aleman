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
];
