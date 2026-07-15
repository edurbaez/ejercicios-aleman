window.GRAMMAR_DATA = window.GRAMMAR_DATA || {};
window.GRAMMAR_DATA.C2 = [
    {
      id: 'c2-01',
      titulo: 'Registro y variación estilística',
      subtitulo: 'formal / coloquial / científico / burocrático',
      regla_base: 'Dominar múltiples registros y saber elegir conscientemente según la situación comunicativa es la competencia central del nivel C2.',
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
      regla_base: 'Redewendungen: significado global no deducible de sus partes. Aprenderlas en contexto narrativo, no en listas. Buscar equivalente funcional, no traducción literal.',
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
      regla_base: 'Ironía: dice lo contrario. Eufemismo: suaviza. Lítotes: niega el contrario para afirmar (nicht uninteressant). Hipérbole: exagera deliberadamente.',
      tabla: { headers: ['Figura', 'Definición', 'Ejemplo'], rows: [['Ironie', 'Dice lo contrario de lo pensado', '"Das war ja ein toller Erfolg!" (tras fracaso)'], ['Euphemismus', 'Suaviza realidades duras', '"Er ist von uns gegangen." (= murió)'], ['Litotes', 'Niega el contrario para afirmar', '"nicht uninteressant" = muy interesante'], ['Hyperbel', 'Exageración deliberada', '"Ich habe das tausendmal gesagt!"']] },
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
      regla_base: 'Lo comunicado va más allá de lo literal. Implicaturas, presuposiciones y sobreentendidos culturales son clave para la comprensión real en C2.',
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
      regla_base: 'Pasiva impersonal, pronombre man, nominalizaciones densas y hedging (mitigación de afirmaciones) son las marcas del texto académico alemán.',
      tabla: { headers: ['Recurso', 'Ejemplo'], rows: [['Pasiva impersonal', 'Es konnte gezeigt werden, dass…'], ['Pronombre man', 'Man geht davon aus, dass…'], ['Hedging', 'Es lässt sich vermuten, dass…'], ['Nominalización', 'die Weiterentwicklung der Forschungsmethodik']] },
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
      regla_base: 'Formas arcaicas en textos clásicos y bíblicos: ward (Prät. de werden), möge (optativo), sei (Konj.I desiderativo). Reconocerlas es suficiente en C2.',
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
      regla_base: 'Tres macrodialectos principales: bávaro-austriaco, alemánico (suizo) y bajo alemán/Plattdeutsch. Exposición activa es el único método de comprensión.',
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
      regla_base: 'Fórmulas metadiscursivas para organizar el discurso, relativizar afirmaciones y señalar la actitud del hablante. Imprescindibles en exámenes orales C2.',
      tabla: { headers: ['Función', 'Fórmula'], rows: [['Relativizar', 'Soweit ich weiß, … / Es scheint, als ob…'], ['Reformular', 'Mit anderen Worten: … / Das heißt, …'], ['Concluir', 'Abschließend lässt sich sagen, dass…'], ['Objetar', 'Man könnte einwenden, dass…'], ['Ejemplificar', 'So zum Beispiel / Nehmen wir etwa…']] },
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
      regla_base: 'Combinaciones modal+Konjunktiv II+adverbio para matizar probabilidad u obligación. müsste eigentlich = en principio. dürfte wohl = estimación con reserva.',
      excepciones: '"Eigentlich" con modal: la realidad no corresponde a la expectativa. "Wohl" con modal: suposición probabilística. Combinarlos ("müsste eigentlich wohl") es firma del hablante C2.',
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
      regla_base: 'Cada tipo de texto tiene convenciones propias de estructura, léxico y registro. Analizar modelos e identificar sus fórmulas de apertura, desarrollo y cierre.',
      tabla: { headers: ['Tipo', 'Estructura / rasgo clave'], rows: [['Essay', 'Einleitung → Argumentation → Schlussfolgerung'], ['Leserbrief', 'Fórmula apertura + referencia al artículo + cierre'], ['Gutachten', 'Lenguaje formal impersonal; valoración razonada'], ['Protokoll', 'Objetivo, sin opinión, verbo en Konjunktiv I o pasado']] },
      explicacion: 'Cada tipo de texto tiene convenciones propias de estructura, léxico y registro que deben dominarse en C2. El ensayo argumentativo sigue la estructura Einleitung → Argumentation → Schlussfolgerung con conectores de lógica y concesión. La carta al director (Leserbrief) exige fórmulas de apertura, referencia al artículo y cierre. El informe/dictamen (Gutachten) usa lenguaje formal impersonal. El protocolo (Protokoll) es objetivo, sin opinión, con uso de indirecto. El TestDaF, DSH y Goethe-C2 incluyen producción de varios de estos tipos.',
      ejemplos: [
        { de: 'Essay: Einleitung → Argumentation → Schlussfolgerung', es: 'Introducción → Argumentación → Conclusión' },
        { de: '"Zu Ihrem Artikel vom … möchte ich anmerken, dass…"', es: 'Apertura de Leserbrief: Con respecto a su artículo del…' },
        { de: '"Im Folgenden wird beurteilt, ob…"', es: 'Apertura de Gutachten: A continuación se evalúa si…' },
        { de: 'Protokoll: sachlich, kein ich, Vergangenheit o Präsens', es: 'Objetivo, sin primera persona, en pasado o presente' }
      ],
      tip: 'Para el examen: analiza modelos de cada tipo de texto e identifica sus fórmulas de apertura, desarrollo y cierre. La estructura formal pesa tanto como el contenido en la puntuación.'
    }
];
