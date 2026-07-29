window.TEACHER_CLASES = window.TEACHER_CLASES || {};

(function () {
  var RULES = {
    'a2-01': {
      intro: 'Los verbos modales (können, müssen, wollen, sollen, dürfen, mögen) expresan actitud hacia una acción — posibilidad, obligación, deseo, mandato externo, permiso o gusto — y van siempre acompañados de un infinitivo que salta al final de la frase, igual que ya vieron con "gehen + infinitivo" en A1. La novedad frente al español es que en singular la vocal de la raíz cambia (kann, muss, will…) y que "ich"/"er" comparten la misma forma sin terminación, algo que no ocurre con ningún verbo regular español.',
      practica: [
        { incorrecto: 'Ich kannst gut Deutsch.', correcto: 'Ich kann gut Deutsch.' },
        { incorrecto: 'Du kann heute kommen?', correcto: 'Kannst du heute kommen?' },
        { incorrecto: 'Er müssen viel arbeiten.', correcto: 'Er muss viel arbeiten.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de los seis modales', texto: '', tabla: { headers: ['', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'], rows: [['ich/er', 'kann', 'muss', 'will', 'soll', 'darf', 'mag'], ['du', 'kannst', 'musst', 'willst', 'sollst', 'darfst', 'magst'], ['wir/sie', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen']] } },
        { titulo: '🟩 2. ich = er, sin terminación', texto: 'A diferencia de los verbos regulares (ich lerne / er lernt), en los modales la 1.ª y 3.ª persona singular comparten exactamente la misma forma y no llevan ninguna terminación: ich kann, er kann.' },
        { titulo: '🟧 3. El infinitivo va al final', texto: 'El modal ocupa la posición 2 (V2) y el verbo principal, en infinitivo, cierra la frase — el mismo "marco verbal" que verán generalizado en a2-11.' },
        { titulo: '🟨 4. möchte, la forma de cortesía', texto: '"mögen" casi nunca se usa con infinitivo; su forma de cortesía "möchte" (querría) es la que realmente se usa a diario: "Ich möchte einen Kaffee."' },
        { titulo: '🟪 5. Preview: pasado', texto: 'Adelanta que en pasado hablado se prefiere el Präteritum de los modales (musste, konnte) al Perfekt — lo verán en detalle en a2-16.' }
      ],
      resumen: 'Los 6 modales van en V2 + infinitivo al final. En singular cambian de vocal y ich/er comparten forma sin terminación. "möchte" es la forma de cortesía de mögen. En pasado hablado se prefiere el Präteritum (ver a2-16).'
    },
    'a2-02': {
      intro: 'El Perfekt es el tiempo pasado más usado en alemán hablado, y se forma con haben/sein en V2 más el Partizip II al final — otra vez el mismo marco verbal que los modales. La elección entre haben y sein es la parte más nueva para un hispanohablante: mientras que en español "haber" sirve para todos los compuestos, en alemán los verbos de movimiento o cambio de estado (gehen, fahren, aufwachen) usan "sein".',
      practica: [
        { incorrecto: 'Ich bin gearbeitet.', correcto: 'Ich habe gearbeitet.' },
        { incorrecto: 'Er hat gefahren nach Hause.', correcto: 'Er ist nach Hause gefahren.' },
        { incorrecto: 'Ich habe gebestellt.', correcto: 'Ich habe bestellt.' }
      ],
      pasos: [
        { titulo: '🟦 1. haben o sein según el verbo', texto: '', tabla: { headers: ['Tipo', 'Auxiliar', 'Ejemplo'], rows: [['Movimiento / cambio de estado', 'sein', 'ist gefahren, ist aufgewacht'], ['El resto (mayoría)', 'haben', 'hat gearbeitet, hat gegessen']] } },
        { titulo: '🟩 2. Formación del Partizip II', texto: 'Regular: ge- + raíz + -(e)t (gemacht, gearbeitet). Irregular: ge- + raíz modificada + -en (gegessen, gefahren). Con prefijo inseparable (be-, ver-, er-…): sin "ge-" (bestellt, verkauft).' },
        { titulo: '🟧 3. Truco para decidir el auxiliar', texto: 'Si el verbo expresa ir de A a B o nacer/morir/crecer/despertar, usa sein. Ante la duda, usa haben — es el auxiliar por defecto y el más frecuente con diferencia.' },
        { titulo: '🟨 4. Con prefijo separable', texto: 'El "ge-" se inserta entre el prefijo y la raíz: ausgegangen, eingekauft — no antes del prefijo.' }
      ],
      resumen: 'Perfekt = haben/sein (V2) + Partizip II (final). Movimiento/cambio de estado → sein; el resto → haben. Regular: ge-+raíz+-(e)t; irregular: ge-+raíz mod.+-en; prefijo inseparable: sin ge-.'
    },
    'a2-03': {
      intro: 'El dativo es el caso del objeto indirecto (¿a quién? ¿para quién?) y en A2 se consolida con su propia tabla de artículos y pronombres — pero la verdadera dificultad para un hispanohablante son los "verbos de dativo" (helfen, danken, gefallen, gehören…) que en español suenan a objeto directo ("ayudar A alguien") pero en alemán exigen dativo sin excepción.',
      practica: [
        { incorrecto: 'Ich helfe den Mann.', correcto: 'Ich helfe dem Mann.' },
        { incorrecto: 'Er dankt sie.', correcto: 'Er dankt ihr.' },
        { incorrecto: 'Das Buch gehört ihn.', correcto: 'Das Buch gehört ihm.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de dativo', texto: '', tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Art. def.', 'dem', 'der', 'dem', 'den+n'], ['Art. indef.', 'einem', 'einer', 'einem', '—'], ['Pron. pers.', 'ihm', 'ihr', 'ihm', 'ihnen']] } },
        { titulo: '🟩 2. Plural en -n', texto: 'En dativo plural, todo sustantivo que no termine ya en -n o -s añade una -n: den Kindern, den Männern (ya lo adelantaron en a1-09).' },
        { titulo: '🟧 3. Verbos "de dativo": la trampa clásica', texto: 'helfen, danken, gefallen, gehören, passen, glauben, folgen, begegnen suenan transitivos en español pero rigen dativo en alemán sin excepción. Se aprenden como lista cerrada.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Aprende cada verbo con un pronombre dativo pegado, como si fuera parte de la palabra: "helfen + dir", "gefallen + mir" — así el caso queda fijado junto al verbo, no se traduce desde el español.' }
      ],
      resumen: 'Dativo = objeto indirecto: dem/der/dem/den+n (artículos), mir/dir/ihm/ihr/uns/euch/ihnen (pronombres). Verbos como helfen, danken, gefallen, gehören rigen dativo aunque el español sugiera objeto directo — se memorizan como lista.'
    },
    'a2-04': {
      intro: 'Cinco preposiciones alemanas rigen siempre acusativo, sin excepción y sin depender del significado — algo más simple que el español, donde "por/para/contra/sin/hacia" no siguen ningún caso gramatical porque el español no declina. El mnemónico DOGFU (Durch, Ohne, Gegen, Für, Um) es la forma más rápida de fijarlas.',
      practica: [
        { incorrecto: 'Das ist für du.', correcto: 'Das ist für dich.' },
        { incorrecto: 'Wir fahren durch der Tunnel.', correcto: 'Wir fahren durch den Tunnel.' },
        { incorrecto: 'Er läuft um der See.', correcto: 'Er läuft um den See.' }
      ],
      pasos: [
        { titulo: '🟦 1. DOGFU: las cinco de acusativo', texto: '', tabla: { headers: ['Prep.', 'Significado'], rows: [['durch', 'a través de / por'], ['ohne', 'sin'], ['gegen', 'contra / hacia (hora aprox.)'], ['für', 'para / durante'], ['um', 'alrededor de / a las (hora exacta)']] } },
        { titulo: '🟩 2. Siempre acusativo, sin excepción', texto: 'A diferencia de las de dativo (a2-05) o las Wechselpräpositionen (a2-06), estas cinco no cambian nunca de caso según el contexto — es la familia más simple de memorizar.' },
        { titulo: '🟧 3. Contracciones coloquiales', texto: 'fürs (für das), durchs (durch das), ums (um das) — habituales en el habla informal.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'DOGFU en el orden de las letras (Durch, Ohne, Gegen, Für, Um) es más fácil de recordar que la lista suelta — repítela como una sola palabra.' }
      ],
      resumen: 'durch, ohne, gegen, für, um (DOGFU) rigen siempre acusativo, sin excepción y sin depender del significado. Contracciones frecuentes: fürs, durchs, ums.'
    },
    'a2-05': {
      intro: 'Ocho preposiciones rigen siempre dativo — el espejo de las DOGFU de a2-04. Para un hispanohablante lo más nuevo es que preposiciones de sentido muy distinto (origen, compañía, destino, causa) comparten el mismo caso simplemente porque el alemán las agrupa por régimen gramatical, no por significado.',
      practica: [
        { incorrecto: 'Ich komme aus die Schweiz.', correcto: 'Ich komme aus der Schweiz.' },
        { incorrecto: 'Sie wohnt bei ihre Mutter.', correcto: 'Sie wohnt bei ihrer Mutter.' },
        { incorrecto: 'Ich fahre mit der Bus.', correcto: 'Ich fahre mit dem Bus.' }
      ],
      pasos: [
        { titulo: '🟦 1. Las ocho de dativo', texto: '', tabla: { headers: ['Prep.', 'Significado', 'Contracción'], rows: [['aus', 'de / desde (origen)', '—'], ['bei', 'en / junto a', 'beim'], ['mit', 'con / en (transporte)', '—'], ['nach', 'hacia / después de', '—'], ['seit', 'desde (hasta ahora)', '—'], ['von', 'de / por (agente)', 'vom'], ['zu', 'a / hacia (destino)', 'zum / zur'], ['gegenüber', 'frente a', '—']] } },
        { titulo: '🟩 2. Rima para memorizarlas', texto: '"aus, bei, mit, nach, seit, von, zu — diese Wörter regier\'n den Dativ nu!" — cantarla ayuda a fijar las siete primeras; gegenüber se añade aparte.' },
        { titulo: '🟧 3. Contracciones muy frecuentes', texto: 'beim (bei dem), vom (von dem), zum (zu dem), zur (zu der) — se usan más que la forma sin contraer en el habla cotidiana.' },
        { titulo: '🟨 4. gegenüber, la excepción de posición', texto: 'A diferencia de las demás, puede ir antes o después del sustantivo: "gegenüber dem Bahnhof" o "dem Bahnhof gegenüber".' }
      ],
      resumen: 'aus, bei, mit, nach, seit, von, zu, gegenüber rigen siempre dativo. Contracciones: beim, vom, zum, zur. Rima mnemotécnica para las siete primeras; gegenüber puede ir antes o después del sustantivo.'
    },
    'a2-06': {
      intro: 'Las nueve Wechselpräpositionen (an, auf, in, über, unter, vor, hinter, neben, zwischen) son el verdadero desafío de esta familia: la misma preposición cambia de acusativo a dativo según si hay movimiento hacia un destino (wohin) o solo posición estática (wo). El español no distingue esto gramaticalmente ("en la mesa" vale para ambos casos), así que conviene practicar los pares de verbos legen/liegen, stellen/stehen como ancla mental.',
      practica: [
        { incorrecto: 'Ich lege das Buch auf dem Tisch.', correcto: 'Ich lege das Buch auf den Tisch.' },
        { incorrecto: 'Das Buch liegt auf den Tisch.', correcto: 'Das Buch liegt auf dem Tisch.' },
        { incorrecto: 'Sie geht in der Stadt.', correcto: 'Sie geht in die Stadt.' }
      ],
      pasos: [
        { titulo: '🟦 1. La pregunta decide el caso', texto: '', tabla: { headers: ['Pregunta', 'Caso', 'Par de verbos típico'], rows: [['Wohin? (movimiento)', 'Acusativo', 'legen, stellen, hängen (activo)'], ['Wo? (posición)', 'Dativo', 'liegen, stehen, hängen (estado)']] } },
        { titulo: '🟩 2. hängen es el mismo verbo en ambos casos', texto: 'A diferencia de legen/liegen o stellen/stehen (verbos distintos), "hängen" sirve tanto para colgar algo (movimiento, Akk.) como para "estar colgado" (estado, Dat.) — solo el caso del artículo lo distingue.' },
        { titulo: '🟧 3. Contracciones', texto: 'im (in dem), am (an dem), ins (in das), ans (an das) — muy frecuentes, sobre todo con dativo (im, am).' },
        { titulo: '🟨 4. Truco rápido', texto: '¿La frase responde a "adónde"? → Akkusativ. ¿Responde solo a "dónde"? → Dativ. Practicar siempre en pares (legen/liegen) fija la distinción mejor que memorizar reglas sueltas.' }
      ],
      resumen: 'an, auf, in, über, unter, vor, hinter, neben, zwischen: Akkusativ con movimiento (wohin), Dativ con posición (wo). Pares legen/liegen, stellen/stehen ilustran la distinción; hängen usa el mismo verbo para ambos casos.'
    },
    'a2-09': {
      intro: 'El comparativo y superlativo alemanes son mecánicos (-er / am -sten), más simples que el español en la formación regular, pero con dos trampas: el umlaut en adjetivos monosílabos (alt→älter) y tres formas totalmente irregulares que hay que memorizar de bloque, igual que "bueno/mejor" en español pero con tres casos en vez de uno.',
      practica: [
        { incorrecto: 'Er ist gutter als ich.', correcto: 'Er ist besser als ich.' },
        { incorrecto: 'Das ist der schnellste Auto.', correcto: 'Das ist das schnellste Auto.' },
        { incorrecto: 'Ich mag Tee mehr als Kaffee.', correcto: 'Ich mag Tee lieber als Kaffee.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de formación', texto: '', tabla: { headers: ['Base', 'Comparativo', 'Superlativo pred.'], rows: [['schnell', 'schneller', 'am schnellsten'], ['alt', 'älter', 'am ältesten'], ['groß', 'größer', 'am größten'], ['gut', 'besser', 'am besten'], ['viel', 'mehr', 'am meisten'], ['gern', 'lieber', 'am liebsten']] } },
        { titulo: '🟩 2. "als" para comparar', texto: 'Al comparar dos elementos se usa "als" (que): "Er ist größer als ich" — nunca "wie" en comparativo de superioridad.' },
        { titulo: '🟧 3. Umlaut en monosílabos', texto: 'alt→älter, jung→jünger, groß→größer — patrón frecuente pero no universal; se aprende junto con cada adjetivo.' },
        { titulo: '🟨 4. Las tres irregulares totales', texto: 'gut/besser/best-, viel/mehr/meist-, gern/lieber/liebst- no siguen ningún patrón — se memorizan como bloque, igual que "bueno/mejor/el mejor" en español.' }
      ],
      resumen: 'Comparativo: adjetivo+-er (a veces con umlaut). Superlativo predicativo: am …-sten. "als" para comparar. gut/viel/gern son completamente irregulares (besser, mehr, lieber) y se memorizan aparte.'
    },
    'a2-10': {
      intro: 'Los verbos reflexivos alemanes usan un pronombre que concuerda con el sujeto, similar al "me/te/se" español — pero muchos verbos son reflexivos en alemán sin serlo en español (sich erinnern = recordar, sich interessieren = interesarse) y, al revés, algunos reflexivos españoles no lo son en alemán. La otra novedad es que el pronombre puede ir en acusativo o en dativo según si ya hay otro objeto directo en la frase.',
      practica: [
        { incorrecto: 'Ich freue.', correcto: 'Ich freue mich.' },
        { incorrecto: 'Er interessiert an Musik.', correcto: 'Er interessiert sich für Musik.' },
        { incorrecto: 'Ich wasche die Hände mich.', correcto: 'Ich wasche mir die Hände.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de pronombres reflexivos', texto: '', tabla: { headers: ['Pronombre', 'Reflexivo Akk.', 'Reflexivo Dat.'], rows: [['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er/sie/es/Sie', 'sich', 'sich'], ['wir', 'uns', 'uns'], ['ihr', 'euch', 'euch']] } },
        { titulo: '🟩 2. Akkusativ si es el único objeto', texto: '"Ich wasche mich" — el reflexivo es el único objeto de la frase, va en acusativo.' },
        { titulo: '🟧 3. Dativ si ya hay un acusativo', texto: '"Ich wasche mir die Hände" — "die Hände" ya ocupa el acusativo, así que el reflexivo pasa a dativo.' },
        { titulo: '🟨 4. Aprende el verbo con su preposición', texto: 'sich freuen (auf/über), sich erinnern (an), sich interessieren (für), sich kümmern (um) — la preposición forma parte del verbo y no se traduce literalmente desde el español.' }
      ],
      resumen: 'Reflexivos: mich/dich/sich/uns/euch (acusativo, único objeto) o mir/dir/sich/uns/euch (dativo, si ya hay acusativo). Muchos verbos son reflexivos en alemán sin serlo en español: sich erinnern, sich freuen, sich interessieren.'
    },
    'a2-11': {
      intro: 'Esta regla generaliza algo que ya vieron con los modales (a2-01) y el Perfekt (a2-02): el alemán organiza la frase principal en dos posiciones fijas — el verbo conjugado en posición 2, y una segunda parte del predicado (infinitivo, participio, prefijo separable) que se desplaza siempre al final, formando el "marco verbal" (Satzklammer). Verlo como un patrón único, no como reglas sueltas, ayuda a que el alumno reconozca la estructura en cualquier construcción nueva que aparezca después.',
      practica: [
        { incorrecto: 'Ich schwimmen gehe.', correcto: 'Ich gehe schwimmen.' },
        { incorrecto: 'Ich kann schwimmen gut.', correcto: 'Ich kann gut schwimmen.' },
        { incorrecto: 'Ich an rufe dich.', correcto: 'Ich rufe dich an.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tres construcciones, un mismo patrón', texto: '', tabla: { headers: ['Posición 2', 'Final de la frase', 'Ejemplo'], rows: [['gehe', 'schwimmen', 'Ich gehe schwimmen.'], ['kann', 'schwimmen', 'Ich kann schwimmen.'], ['rufe', 'an', 'Ich rufe dich an.']] } },
        { titulo: '🟩 2. gehen + infinitivo: solo actividades', texto: '"gehen" + infinitivo funciona solo con actividades físicas o de ocio (schwimmen, einkaufen, tanzen, joggen) — no con cualquier verbo.' },
        { titulo: '🟧 3. Por qué importa verlo como un solo patrón', texto: 'Este mismo marco reaparecerá en el Perfekt (haben…Partizip II) y en los verbos separables — reconocerlo ahora como estructura general evita tratarlo como una regla distinta cada vez.' },
        { titulo: '🟨 4. Truco visual', texto: 'Dibuja la frase como un marco: [posición 2 — verbo conjugado] … [final — el resto]. Todo lo que no sea el verbo conjugado tiende a viajar al final.' }
      ],
      resumen: 'El verbo conjugado va en posición 2; el resto del predicado (infinitivo tras gehen/modal, prefijo separable) se desplaza al final, formando el "marco verbal" (Satzklammer) — el mismo patrón que reaparece en Perfekt y separables.'
    },
    'a2-12': {
      intro: 'Verbos como geben, schenken, zeigen, schicken llevan dos objetos: uno en dativo (la persona) y otro en acusativo (la cosa). El español ordena estos objetos con bastante libertad ("le regalo un libro a mi padre" / "se lo regalo"), pero el alemán tiene una regla de orden estricta que depende de si los objetos son sustantivos o pronombres — y el caso de los dos pronombres juntos invierte la regla general.',
      practica: [
        { incorrecto: 'Ich schenke ein Buch meinem Vater.', correcto: 'Ich schenke meinem Vater ein Buch.' },
        { incorrecto: 'Ich zeige meinem Vater es.', correcto: 'Ich zeige es meinem Vater.' },
        { incorrecto: 'Ich schenke ihm es.', correcto: 'Ich schenke es ihm.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de orden', texto: '', tabla: { headers: ['Caso', 'Orden', 'Ejemplo'], rows: [['2 sustantivos', 'Dat. + Akk.', 'Ich schenke meinem Vater ein Buch.'], ['1 pronombre (Akk.)', 'Pron. + sustantivo', 'Ich schenke es meinem Vater.'], ['1 pronombre (Dat.)', 'Pron. + sustantivo', 'Ich schenke ihm ein Buch.'], ['2 pronombres', 'Akk. + Dat.', 'Ich schenke es ihm.']] } },
        { titulo: '🟩 2. Regla general: Dativo antes de Acusativo', texto: 'Con dos sustantivos, el objeto dativo (la persona) siempre va primero: Ich schenke meinem Vater ein Buch, nunca al revés.' },
        { titulo: '🟧 3. El pronombre siempre se adelanta', texto: 'Si uno de los dos objetos es un pronombre, sea cual sea su caso, salta delante del sustantivo restante.' },
        { titulo: '🟨 4. La excepción a memorizar', texto: 'Con dos pronombres, el orden se invierte respecto a la regla general: Acusativo antes de Dativo (es ihm, no ihm es) — el único caso donde el orden cambia.' }
      ],
      resumen: 'Verbos con doble objeto (geben, schenken, zeigen…): con dos sustantivos, Dativo antes de Acusativo. Con un pronombre, este se adelanta. Con dos pronombres, el orden se invierte: Acusativo antes de Dativo.'
    },
    'a2-13': {
      intro: 'Continuación directa de a2-03: un grupo cerrado de verbos muy frecuentes (helfen, danken, gefallen, gehören, passen, schmecken, gratulieren, folgen, antworten, glauben) rige siempre dativo, aunque el español los traduzca con objeto directo ("ayudar a alguien", "responder algo"). No hay lógica que lo prediga desde el significado: se memorizan como lista cerrada, igual que el vocabulario nuevo.',
      practica: [
        { incorrecto: 'Ich helfe ihn.', correcto: 'Ich helfe ihm.' },
        { incorrecto: 'Das gehört mich.', correcto: 'Das gehört mir.' },
        { incorrecto: 'Wir danken sie.', correcto: 'Wir danken ihr.' }
      ],
      pasos: [
        { titulo: '🟦 1. Lista de verbos de dativo frecuentes', texto: '', tabla: { headers: ['Verbo', 'Significado'], rows: [['helfen', 'ayudar'], ['danken', 'agradecer'], ['gefallen', 'gustar'], ['gehören', 'pertenecer'], ['passen', 'quedar bien / sentar'], ['schmecken', 'saber a / gustar (comida)'], ['gratulieren', 'felicitar'], ['folgen', 'seguir'], ['antworten', 'responder'], ['glauben', 'creer']] } },
        { titulo: '🟩 2. Sin lógica traducible', texto: 'El español sugiere objeto directo ("ayudar A alguien" ya lleva "a", pero suena a acusativo); en alemán no hay forma de deducirlo, solo memorizar cada verbo.' },
        { titulo: '🟧 3. No tienen pasiva personal', texto: 'Como no llevan acusativo, estos verbos solo admiten pasiva impersonal (es wird ihm geholfen), nunca "er wird geholfen" — dato útil para más adelante.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Aprende cada verbo con un pronombre dativo pegado: "helfen + dir", "gefallen + mir", "danken + Ihnen" — el caso queda fijado junto al verbo.' }
      ],
      resumen: 'helfen, danken, gefallen, gehören, passen, schmecken, gratulieren, folgen, antworten, glauben rigen siempre dativo, sin lógica traducible desde el español. Se memorizan como lista cerrada, cada uno con su pronombre dativo.'
    },
    'a2-14': {
      intro: 'Para preguntar por personas, "wer" se declina según el caso (wer/wen/wem/wessen) — el mismo patrón que el artículo masculino. Para preguntar por cosas se usa "was", invariable, salvo cuando hay una preposición de por medio: ahí el alemán fusiona preposición + wo(r)- en una sola palabra (womit, wofür), algo que el español no hace nunca.',
      practica: [
        { incorrecto: 'Was siehst du dort?', correcto: 'Wen siehst du dort?' },
        { incorrecto: 'Mit was schreibst du?', correcto: 'Womit schreibst du?' },
        { incorrecto: 'Wer machst du gerade?', correcto: 'Was machst du gerade?' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla persona vs. cosa', texto: '', tabla: { headers: ['Caso', 'Persona', 'Cosa'], rows: [['Nominativ', 'wer', 'was'], ['Akkusativ', 'wen', 'was'], ['Dativ', 'wem', '(sin caso)'], ['Genitiv', 'wessen', '—']] } },
        { titulo: '🟩 2. wer se declina como el artículo masculino', texto: 'wer→wen→wem→wessen sigue el mismo patrón que der→den→dem→dessen — un paralelismo útil para memorizarlo.' },
        { titulo: '🟧 3. Preposición + cosa = wo(r)+preposición', texto: 'No se dice "für was" o "mit was" en registro cuidado: se fusiona en womit (¿con qué?), wofür (¿para qué?), worüber (¿sobre qué?).' },
        { titulo: '🟨 4. Con personas, la preposición queda separada', texto: 'Con personas no hay fusión: "Mit wem sprichst du?" (¿con quién hablas?) — la fusión wo(r)+prep es exclusiva de las cosas.' }
      ],
      resumen: 'wer se declina según el caso (wer/wen/wem/wessen) para personas; "was" es invariable para cosas. Con preposición + cosa se fusiona en wo(r)+preposición (womit, wofür); con personas la preposición queda separada (mit wem).'
    },
    'a2-15': {
      intro: 'Aunque el Perfekt domina el habla alemana (a2-02), "sein" y "haben" son la gran excepción: casi siempre se usan en Präteritum (war, hatte) incluso en conversación cotidiana, porque su Perfekt (bin gewesen, habe gehabt) suena forzado. Es de las pocas conjugaciones de pasado que conviene memorizar de memoria desde ya, porque se usan constantemente.',
      practica: [
        { incorrecto: 'Ich bin müde gewesen gestern.', correcto: 'Ich war gestern müde.' },
        { incorrecto: 'Wir haben keine Zeit gehabt.', correcto: 'Wir hatten keine Zeit.' },
        { incorrecto: 'Er ist in Berlin gewesen letzte Woche.', correcto: 'Er war letzte Woche in Berlin.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de conjugación', texto: '', tabla: { headers: ['', 'sein', 'haben'], rows: [['ich', 'war', 'hatte'], ['du', 'warst', 'hattest'], ['er/sie/es', 'war', 'hatte'], ['wir', 'waren', 'hatten'], ['ihr', 'wart', 'hattet'], ['sie/Sie', 'waren', 'hatten']] } },
        { titulo: '🟩 2. La excepción a la regla del Perfekt', texto: 'Con el resto de verbos se usa Perfekt al hablar (a2-02); con sein/haben (y los modales, a2-16) se prefiere el Präteritum incluso en conversación informal.' },
        { titulo: '🟧 3. Por qué el Perfekt suena forzado aquí', texto: '"Ich bin gewesen" o "ich habe gehabt" son gramaticalmente correctos pero poco naturales — un hablante nativo diría casi siempre "ich war"/"ich hatte".' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Memoriza esta tabla entera como un bloque, igual que hicieron con la conjugación de presente de sein/haben en A1 (a1-03) — es el mismo tipo de esfuerzo, ahora en pasado.' }
      ],
      resumen: 'sein→war/warst/war/waren/wart/waren; haben→hatte/hattest/hatte/hatten/hattet/hatten. Se usan en Präteritum incluso al hablar — la excepción más notable a la preferencia general por el Perfekt.'
    },
    'a2-16': {
      intro: 'Los modales, igual que sein/haben, se prefieren en Präteritum incluso hablando. La formación es regular en las terminaciones (-te, -test, -te…), pero recuperan la vocal del infinitivo en vez de la vocal modificada del presente: kann→konnte, no *könnte, que es Konjunktiv II — una confusión de un solo umlaut que cambia completamente el significado.',
      practica: [
        { incorrecto: 'Ich könnte nicht kommen gestern.', correcto: 'Ich konnte gestern nicht kommen.' },
        { incorrecto: 'Er hat arbeiten gemusst.', correcto: 'Er musste arbeiten.' },
        { incorrecto: 'Wir haben ins Kino gehen gewollt.', correcto: 'Wir wollten ins Kino gehen.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de Präteritum de los modales', texto: '', tabla: { headers: ['', 'können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'], rows: [['ich/er', 'konnte', 'musste', 'wollte', 'sollte', 'durfte', 'mochte'], ['du', 'konntest', 'musstest', 'wolltest', 'solltest', 'durftest', 'mochtest'], ['wir/sie', 'konnten', 'mussten', 'wollten', 'sollten', 'durften', 'mochten']] } },
        { titulo: '🟩 2. Terminaciones regulares, vocal del infinitivo', texto: 'Las terminaciones (-te/-test/-te/-ten/-tet/-ten) son las mismas que cualquier verbo regular en Präteritum; lo irregular es que la vocal vuelve a ser la del infinitivo (können→konnte, no köntte).' },
        { titulo: '🟧 3. konnte ≠ könnte', texto: 'konnte (Präteritum) = "pude/podía"; könnte (Konjunktiv II) = "podría" — un solo umlaut separa un hecho pasado de una hipótesis, la confusión más frecuente de esta regla.' },
        { titulo: '🟨 4. Se usa incluso hablando', texto: 'Igual que sein/haben (a2-15), el Präteritum de los modales es la forma natural en conversación — no hace falta usar el Perfekt (habe gekonnt) casi nunca.' }
      ],
      resumen: 'Modales en Präteritum: terminaciones regulares (-te…) + vocal del infinitivo (konnte, musste, wollte, sollte, durfte, mochte). Se usan en conversación normal. Ojo: konnte (pasado) ≠ könnte (Konjunktiv II, "podría").'
    },
    'a2-17': {
      intro: 'Esta regla resume y cierra las dos anteriores: la duda constante de "¿Präteritum o Perfekt?" tiene una respuesta práctica y simple — hablando, casi todo va en Perfekt, salvo sein/haben/modales, que van en Präteritum. El Präteritum "puro" con el resto de verbos pertenece sobre todo a la lengua escrita (narración, noticias, cuentos), donde el alumno lo reconocerá al leer aunque no lo use tanto al hablar.',
      practica: [
        { incorrecto: 'Ich arbeitete gestern.', correcto: 'Ich habe gestern gearbeitet.' },
        { incorrecto: 'Ich bin gestern müde gewesen.', correcto: 'Ich war gestern müde.' },
        { incorrecto: 'Er hat nicht kommen gekonnt.', correcto: 'Er konnte nicht kommen.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla resumen', texto: '', tabla: { headers: ['Contexto', 'Tiempo preferido', 'Ejemplo'], rows: [['Habla general', 'Perfekt', 'Ich habe gearbeitet.'], ['sein / haben (habla)', 'Präteritum', 'Ich war müde.'], ['Modales (habla)', 'Präteritum', 'Ich konnte nicht.'], ['Narración escrita', 'Präteritum', 'Er ging langsam nach Hause.']] } },
        { titulo: '🟩 2. Al hablar: Perfekt para casi todo', texto: 'Excepto sein, haben y los modales (a2-15, a2-16), el resto de verbos se usa en Perfekt en conversación — decir "ich arbeitete" en vez de "ich habe gearbeitet" suena literario.' },
        { titulo: '🟧 3. Al leer: espera Präteritum en todos los verbos', texto: 'Novelas, cuentos, biografías y noticias usan Präteritum con cualquier verbo — es importante que el alumno lo reconozca al leer aunque no lo use tanto al hablar.' },
        { titulo: '🟨 4. Variación regional (nota rápida)', texto: 'En el sur de Alemania, Austria y Suiza incluso sein/haben tienden a usarse más en Perfekt en el habla informal — mencionarlo solo como curiosidad, no como norma a seguir.' }
      ],
      resumen: 'Hablando: Perfekt para casi todo, Präteritum solo con sein/haben/modales. Escribiendo (narración): Präteritum con todos los verbos. Es la síntesis práctica de a2-02, a2-15 y a2-16.'
    },
    'a2-18': {
      intro: 'Para expresar destino (¿adónde?) el alemán elige la preposición según el TIPO de lugar, no de forma libre como el español "a": nach para ciudades/países sin artículo, zu para personas o edificios-institución, e in/an/auf + Akkusativ según el tipo de espacio. Presentarlas siempre asociadas a su categoría (no sueltas) evita la mezcla, el error más frecuente de esta regla.',
      practica: [
        { incorrecto: 'Ich fahre in Berlin.', correcto: 'Ich fahre nach Berlin.' },
        { incorrecto: 'Ich gehe nach Arzt.', correcto: 'Ich gehe zum Arzt.' },
        { incorrecto: 'Wir gehen nach Kino.', correcto: 'Wir gehen ins Kino.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla por tipo de destino', texto: '', tabla: { headers: ['Preposición', 'Se usa con', 'Ejemplo'], rows: [['nach', 'ciudades/países sin artículo', 'nach Berlin'], ['zu', 'personas / edificios-instituciones', 'zum Arzt, zur Schule'], ['in + Akk.', 'espacios cerrados/delimitados', 'ins Kino, in die Stadt'], ['an + Akk.', 'límites, orillas', 'ans Meer'], ['auf + Akk.', 'superficies / eventos', 'auf den Markt']] } },
        { titulo: '🟩 2. Países/ciudades CON artículo: excepción', texto: 'die Schweiz, die Türkei no usan "nach" sino "in + Akkusativ": in die Schweiz, nunca "nach die Schweiz".' },
        { titulo: '🟧 3. zu = persona o institución como destino', texto: '"zum Arzt" no significa literalmente "al edificio médico" sino "a la consulta/cita del médico" — zu se centra en la persona o función, no en el edificio físico.' },
        { titulo: '🟨 4. Truco de la pregunta guía', texto: '¿Ciudad/país? → nach. ¿Persona o institución? → zu. ¿Espacio cerrado? → in+Akk. ¿Orilla/límite? → an+Akk. ¿Superficie/evento? → auf+Akk.' }
      ],
      resumen: 'Destino (wohin): nach (ciudades/países sin artículo), zu (personas/instituciones), in/an/auf + Akkusativ según el tipo de espacio. Países con artículo (die Schweiz) usan in+Akk, no nach.'
    },
    'a2-19': {
      intro: 'Para expresar ubicación (¿dónde?) se reutilizan las mismas preposiciones que en a2-18, pero con dativo en vez de acusativo — es la aplicación concreta de las Wechselpräpositionen (a2-06) al contraste destino/ubicación. Se suma "bei", exclusiva de posición, sin par de movimiento con la misma preposición (para "ir a casa de alguien" se usa "zu", no "bei").',
      practica: [
        { incorrecto: 'Ich bin in Kino.', correcto: 'Ich bin im Kino.' },
        { incorrecto: 'Er ist zum Arzt.', correcto: 'Er ist beim Arzt.' },
        { incorrecto: 'Wir sind auf den Markt.', correcto: 'Wir sind auf dem Markt.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla por tipo de ubicación', texto: '', tabla: { headers: ['Preposición', 'Se usa con', 'Ejemplo'], rows: [['in + Dat.', 'espacios cerrados/delimitados', 'im Kino, in der Stadt'], ['an + Dat.', 'límites, orillas', 'am Meer'], ['auf + Dat.', 'superficies / eventos', 'auf dem Markt'], ['bei + Dat.', 'personas', 'bei meiner Mutter, beim Arzt']] } },
        { titulo: '🟩 2. Comparar siempre con a2-18', texto: 'La misma preposición (in, an, auf) cambia de Akkusativ a Dativ según si hay movimiento (wohin) o solo ubicación (wo) — es el ejemplo más claro de Wechselpräposition en uso real.' },
        { titulo: '🟧 3. bei ≠ zu', texto: '"beim Arzt" (estoy en la consulta ahora) es posición; "zum Arzt" (voy a la consulta) es destino — bei no tiene par de movimiento con la misma preposición, ahí se usa zu.' },
        { titulo: '🟨 4. Truco rápido', texto: 'Si la frase responde solo a "¿dónde estás?" sin implicar llegar a ningún sitio, usa Dativ. En cuanto hay verbo de movimiento hacia el lugar, vuelve a a2-18 (Akkusativ).' }
      ],
      resumen: 'Ubicación (wo): las mismas preposiciones que el destino (in, an, auf) pero con Dativ. bei + Dat. se añade para personas (bei meiner Mutter) o profesionales (beim Arzt) — sin par de movimiento con la misma preposición (ahí se usa zu).'
    },
    'a2-20': {
      intro: 'Para expresar origen (¿de dónde?) el alemán distingue aus (desde dentro de un lugar, incluida nacionalidad) y von (punto de partida del que uno se aleja, sin implicar "dentro"). Forman parejas simétricas con las de destino de a2-18: nach/in↔aus, zu↔von — aprenderlas en pareja evita confundirlas.',
      practica: [
        { incorrecto: 'Ich komme von Spanien.', correcto: 'Ich komme aus Spanien.' },
        { incorrecto: 'Er kommt aus dem Arzt.', correcto: 'Er kommt vom Arzt.' },
        { incorrecto: 'Sie kommt von den Bergen.', correcto: 'Sie kommt aus den Bergen.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla aus / von', texto: '', tabla: { headers: ['Preposición', 'Se usa con', 'Ejemplo'], rows: [['aus', 'origen / nacionalidad / interior de un lugar', 'aus Spanien, aus dem Haus'], ['von', 'punto de partida, alejándose de', 'vom Arzt, von der Arbeit']] } },
        { titulo: '🟩 2. Parejas simétricas con a2-18', texto: 'nach/in (destino) ↔ aus (origen); zu (destino, persona/institución) ↔ von (origen, alejándose) — memorizarlas en pareja fija la lógica de las tres direcciones (wohin/wo/woher) de una vez.' },
        { titulo: '🟧 3. La trampa: "vom Arzt", no "aus dem Arzt"', texto: 'Si el destino se expresaba con zu/bei (zum Arzt, beim Arzt), el origen se expresa con von (vom Arzt) — no con aus, aunque la consulta sea un espacio cerrado.' },
        { titulo: '🟨 4. Truco de memorización', texto: 'Pregúntate primero cómo dirías el destino (nach/zu/in) y usa la pareja correspondiente para el origen (aus/von/aus) — las tres preguntas wohin/wo/woher siempre se estudian juntas.' }
      ],
      resumen: 'Origen (woher): aus (desde dentro de un lugar / nacionalidad) y von (punto de partida, alejándose). Parejas simétricas con el destino: nach/in↔aus, zu↔von. "vom Arzt" (no "aus dem Arzt") es la trampa más frecuente.'
    },
    'a2-21': {
      intro: 'A diferencia de und/aber/oder/denn (posición 0, vistos en a1-16), conectores como deshalb, sonst, dann, danach cuentan como el primer elemento de la frase (posición 1) y provocan inversión: el verbo va justo después (posición 2) y el sujeto se desplaza a la posición 3. La señal más clara para distinguir ambos grupos es fijarse en si el sujeto aparece justo después del conector o no.',
      practica: [
        { incorrecto: 'Es regnet, deshalb ich bleibe zu Hause.', correcto: 'Es regnet, deshalb bleibe ich zu Hause.' },
        { incorrecto: 'Beeil dich, sonst du kommst zu spät.', correcto: 'Beeil dich, sonst kommst du zu spät.' },
        { incorrecto: 'Wir essen, dann wir gehen ins Kino.', correcto: 'Wir essen, dann gehen wir ins Kino.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de conectores de posición 1', texto: '', tabla: { headers: ['Conector', 'Significado', 'Posición'], rows: [['deshalb', 'por eso', 'Posición 1 (con inversión)'], ['sonst', 'si no / de lo contrario', 'Posición 1 (con inversión)'], ['dann', 'entonces / luego', 'Posición 1 (con inversión)'], ['danach', 'después de eso', 'Posición 1 (con inversión)'], ['und/aber/oder/denn', '(ver a1-16)', 'Posición 0 (sin inversión)']] } },
        { titulo: '🟩 2. Contraste con und/aber/oder/denn', texto: 'Esos cuatro (a1-16) no cuentan como elemento de la frase: el sujeto sigue justo detrás del verbo sin invertirse. deshalb/sonst/dann/danach sí cuentan, y por eso invierten sujeto y verbo.' },
        { titulo: '🟧 3. Truco de comprobación rápida', texto: 'Si justo después del conector aparece el sujeto (sin verbo en medio), es de posición 0. Si aparece el verbo primero y el sujeto después, es de posición 1.' },
        { titulo: '🟨 4. Uso frecuente en la vida diaria', texto: 'deshalb y sonst son extremadamente comunes para justificar decisiones o advertir consecuencias — practicarlos con ejemplos cotidianos ayuda a automatizar la inversión.' }
      ],
      resumen: 'deshalb, sonst, dann, danach ocupan la posición 1: provocan inversión sujeto-verbo (verbo en 2, sujeto en 3) — a diferencia de und/aber/oder/denn (posición 0, sin inversión, ver a1-16).'
    },
    'a2-22': {
      intro: 'weil, wenn y dass introducen subordinadas donde el verbo conjugado se va al final — la estructura contraria a la V2 de las frases principales, y una de las más visibles diferencias frente al español. La trampa clásica es confundir "weil" (subordinante, verbo al final) con "denn" (a1-16, posición 0, sin cambiar el orden), aunque ambas se traduzcan como "porque".',
      practica: [
        { incorrecto: 'Ich bleibe zu Hause, weil ich bin krank.', correcto: 'Ich bleibe zu Hause, weil ich krank bin.' },
        { incorrecto: 'Wenn ich habe Zeit, rufe ich dich an.', correcto: 'Wenn ich Zeit habe, rufe ich dich an.' },
        { incorrecto: 'Ich glaube, dass er hat recht.', correcto: 'Ich glaube, dass er recht hat.' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de las tres conjunciones', texto: '', tabla: { headers: ['Conjunción', 'Significado', 'Función'], rows: [['weil', 'porque', 'causa (verbo al final)'], ['wenn', 'si / cuando', 'condición o repetición (verbo al final)'], ['dass', 'que', 'subordinada sustantiva (verbo al final)'], ['denn', 'porque (ver a1-16)', 'posición 0, sin cambiar el orden']] } },
        { titulo: '🟩 2. weil ≠ denn', texto: '"Ich bleibe zu Hause, denn ich bin krank" (orden normal, denn en posición 0) frente a "..., weil ich krank bin" (verbo al final, weil subordinante) — mismo significado, estructura opuesta.' },
        { titulo: '🟧 3. wenn: condición o repetición', texto: 'wenn cubre tanto condiciones ("si tengo tiempo") como acciones repetidas en cualquier tiempo ("cuando llueve, siempre…") — se distingue de "als" (un único evento en pasado, contenido de niveles superiores).' },
        { titulo: '🟨 4. dass tras verbos de opinión', texto: 'glauben, denken, wissen, hoffen suelen ir seguidos de una subordinada con "dass" — muy frecuente para expresar opiniones en A2.' }
      ],
      resumen: 'weil (causa), wenn (condición/repetición) y dass (subordinada sustantiva) mandan el verbo al final. La coma separa siempre principal y subordinada. weil ≠ denn (a1-16, posición 0, sin cambiar el orden) aunque ambas signifiquen "porque".'
    },
    'a2-23': {
      intro: 'Este tema cierra A2 combinando dos aspectos de "sonar natural" en alemán. Las partículas modales (doch, mal, ja, denn, eigentlich, einfach) matizan el tono sin traducción literal — se aprenden por el oído, no por diccionario. Los sufijos de formación de palabras (-chen/-lein, -er, -in, -ung) permiten crear vocabulario nuevo de forma productiva, con una regla de género especialmente fiable: -chen/-lein es SIEMPRE neutro.',
      practica: [
        { incorrecto: 'der Häuschen', correcto: 'das Häuschen' },
        { incorrecto: 'Sie ist Lehrer.', correcto: 'Sie ist Lehrerin.' },
        { incorrecto: 'der Übung', correcto: 'die Übung' }
      ],
      pasos: [
        { titulo: '🟦 1. Tabla de sufijos de formación', texto: '', tabla: { headers: ['Sufijo', 'Función', 'Género', 'Ejemplo'], rows: [['-chen / -lein', 'diminutivo', 'siempre neutro', 'das Häuschen, das Büchlein'], ['-er', 'agente (persona)', 'masculino', 'der Lehrer, der Arbeiter'], ['-in', 'agente femenino', 'femenino', 'die Lehrerin'], ['-ung', 'verbo → sustantivo', 'femenino', 'die Übung, die Zeitung']] } },
        { titulo: '🟩 2. -chen/-lein: siempre neutro, sin excepción', texto: 'Aunque la palabra base sea masculina o femenina, el diminutivo es siempre das: der Mann → das Männchen, die Frau → (no aplica igual, pero das Mädchen ya lo vieron en a1-01).' },
        { titulo: '🟧 3. Partículas modales: se aprenden por el oído', texto: 'doch (insistencia/contradicción), mal (suaviza una petición), ja (sorpresa/evidencia), denn (curiosidad en preguntas), eigentlich (en realidad) — no tienen traducción fija, se fijan escuchando ejemplos.' },
        { titulo: '🟨 4. -er + -in: el patrón agente más productivo', texto: 'Casi cualquier verbo puede dar un sustantivo de agente en -er (masculino) y su femenino en -in — muy útil para adivinar profesiones nuevas sin memorizarlas una por una.' }
      ],
      resumen: 'Partículas modales (doch, mal, ja, denn, eigentlich) matizan el tono, se aprenden de oído. Sufijos: -chen/-lein (diminutivo, siempre neutro), -er (agente masc.), -in (agente fem.), -ung (verbo→sustantivo fem.).'
    }
  };

  function base(id) {
    var r = RULES[id];
    return { ruleId: id, intro: r.intro, practica: r.practica, pasos: r.pasos, resumen: r.resumen };
  }

  function repaso(id, nota) {
    var b = base(id);
    b.intro = b.intro + ' ' + nota;
    return b;
  }

  var NOTA_FINAL = 'Nota para el profesor: esto es repaso final de cierre de curso — no introduzcas matices nuevos, el objetivo es consolidar antes del simulacro.';
  var NOTA_LIBRE = 'Nota para el profesor: es repaso libre de consolidación de fin de semana — retómalo con ejemplos nuevos, sin añadir contenido nuevo a la regla.';
  var NOTA_SIMULACRO = 'Nota para el profesor: repaso puntual y breve antes del simulacro — no es momento de explicar nada nuevo, solo refrescar lo esencial.';

  window.TEACHER_CLASES.a2 = [
    { day: 1, semana: 1, focus: 'Verbos modales, Perfekt y Dativo', ruleIds: ['a2-01', 'a2-02', 'a2-03'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-01'), base('a2-02'), base('a2-03') ] } },
    { day: 2, semana: 1, focus: 'Preposiciones + Acusativo/Dativo y Wechselpräpositionen', ruleIds: ['a2-04', 'a2-05', 'a2-06'], esClaseEnVivo: true, contenido: { reglas: [ base('a2-04'), base('a2-05'), base('a2-06') ] } },
    { day: 3, semana: 1, focus: 'Comparativo/superlativo, reflexivos y posiciones en la oración', ruleIds: ['a2-09', 'a2-10', 'a2-11'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-09'), base('a2-10'), base('a2-11') ] } },
    { day: 4, semana: 1, focus: 'Verbos con Akkusativ/Dativ y preguntas por personas/cosas', ruleIds: ['a2-12', 'a2-13', 'a2-14'], esClaseEnVivo: true, contenido: { reglas: [ base('a2-12'), base('a2-13'), base('a2-14') ] } },
    { day: 5, semana: 1, focus: 'Präteritum de sein/haben, modales y uso de tiempos', ruleIds: ['a2-15', 'a2-16', 'a2-17'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-15'), base('a2-16'), base('a2-17') ] } },
    { day: 6, semana: 1, focus: 'Preposiciones locales: Wohin, Wo y Woher', ruleIds: ['a2-18', 'a2-19', 'a2-20'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-18'), base('a2-19'), base('a2-20') ] } },
    { day: 7, semana: 1, focus: 'Conectores, Nebensätze (weil/wenn/dass) y partículas', ruleIds: ['a2-21', 'a2-22', 'a2-23'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-21'), base('a2-22'), base('a2-23') ] } },

    { day: 8, semana: 2, focus: 'Dativo: caso, verbos con doble objeto y verbos de Dativo', ruleIds: ['a2-03', 'a2-12', 'a2-13'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-03'), base('a2-12'), base('a2-13') ] } },
    { day: 9, semana: 2, focus: 'Preposiciones de caso fijo y Wechselpräpositionen', ruleIds: ['a2-04', 'a2-05', 'a2-06'], esClaseEnVivo: true, contenido: { reglas: [ base('a2-04'), base('a2-05'), base('a2-06') ] } },
    { day: 10, semana: 2, focus: 'Verbos modales y Präteritum de sein/haben/modales', ruleIds: ['a2-01', 'a2-15', 'a2-16'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-01'), base('a2-15'), base('a2-16') ] } },
    { day: 11, semana: 2, focus: 'Perfekt, uso de tiempos pasados y estructura de la oración', ruleIds: ['a2-02', 'a2-17', 'a2-11'], esClaseEnVivo: true, contenido: { reglas: [ base('a2-02'), base('a2-17'), base('a2-11') ] } },
    { day: 12, semana: 2, focus: 'Preposiciones locales: Wohin, Wo y Woher', ruleIds: ['a2-18', 'a2-19', 'a2-20'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-18'), base('a2-19'), base('a2-20') ] } },
    { day: 13, semana: 2, focus: 'Conectores, Nebensätze (weil/wenn/dass) y partículas', ruleIds: ['a2-21', 'a2-22', 'a2-23'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-21'), base('a2-22'), base('a2-23') ] } },
    { day: 14, semana: 2, focus: 'Comparativo/superlativo, reflexivos y preguntas por personas/cosas', ruleIds: ['a2-09', 'a2-10', 'a2-14'], esClaseEnVivo: false, contenido: { reglas: [ base('a2-09'), base('a2-10'), base('a2-14') ] } },

    { day: 15, semana: 3, focus: 'Repaso: verbos modales + pasado hablado de sein/haben y modales', ruleIds: ['a2-01', 'a2-15', 'a2-16'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-01', NOTA_LIBRE), repaso('a2-15', NOTA_LIBRE), repaso('a2-16', NOTA_LIBRE) ] } },
    { day: 16, semana: 3, focus: 'Repaso: Perfekt, estructura de dos posiciones y uso de tiempos pasados', ruleIds: ['a2-02', 'a2-11', 'a2-17'], esClaseEnVivo: true, contenido: { reglas: [ repaso('a2-02', NOTA_LIBRE), repaso('a2-11', NOTA_LIBRE), repaso('a2-17', NOTA_LIBRE) ] } },
    { day: 17, semana: 3, focus: 'Repaso: Dativo (artículos, verbos con Akk./Dativ y verbos de Dativo)', ruleIds: ['a2-03', 'a2-12', 'a2-13'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-03', NOTA_LIBRE), repaso('a2-12', NOTA_LIBRE), repaso('a2-13', NOTA_LIBRE) ] } },
    { day: 18, semana: 3, focus: 'Repaso: preposiciones + Acusativo, + Dativo y Wechselpräpositionen', ruleIds: ['a2-04', 'a2-05', 'a2-06'], esClaseEnVivo: true, contenido: { reglas: [ repaso('a2-04', NOTA_LIBRE), repaso('a2-05', NOTA_LIBRE), repaso('a2-06', NOTA_LIBRE) ] } },
    { day: 19, semana: 3, focus: 'Repaso: preposiciones locales (wohin, wo, woher)', ruleIds: ['a2-18', 'a2-19', 'a2-20'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-18', NOTA_LIBRE), repaso('a2-19', NOTA_LIBRE), repaso('a2-20', NOTA_LIBRE) ] } },
    { day: 20, semana: 3, focus: 'Repaso: comparativo/superlativo, verbos reflexivos y preguntas por personas/cosas', ruleIds: ['a2-09', 'a2-10', 'a2-14'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-09', NOTA_LIBRE), repaso('a2-10', NOTA_LIBRE), repaso('a2-14', NOTA_LIBRE) ] } },
    { day: 21, semana: 3, focus: 'Repaso: conectores en posición 1, subordinadas (weil/wenn/dass) y partículas', ruleIds: ['a2-21', 'a2-22', 'a2-23'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-21', NOTA_LIBRE), repaso('a2-22', NOTA_LIBRE), repaso('a2-23', NOTA_LIBRE) ] } },

    { day: 22, semana: 4, focus: 'Repaso final: verbos modales, Perfekt y Dativo', ruleIds: ['a2-01', 'a2-02', 'a2-03'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-01', NOTA_FINAL), repaso('a2-02', NOTA_FINAL), repaso('a2-03', NOTA_FINAL) ] } },
    { day: 23, semana: 4, focus: 'Repaso final: preposiciones + Acusativo/Dativo y Wechselpräpositionen', ruleIds: ['a2-04', 'a2-05', 'a2-06'], esClaseEnVivo: true, contenido: { reglas: [ repaso('a2-04', NOTA_FINAL), repaso('a2-05', NOTA_FINAL), repaso('a2-06', NOTA_FINAL) ] } },
    { day: 24, semana: 4, focus: 'Repaso final: Zwei feste Positionen, Verben mit Akkusativ und Dativ y Verben mit Dativ', ruleIds: ['a2-09', 'a2-10', 'a2-11'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-09', NOTA_FINAL), repaso('a2-10', NOTA_FINAL), repaso('a2-11', NOTA_FINAL) ] } },
    { day: 25, semana: 4, focus: 'Repaso final: Verben mit Akkusativ und Dativ, Verben mit Dativ y Frage nach Personen und Sachen', ruleIds: ['a2-12', 'a2-13', 'a2-14'], esClaseEnVivo: true, contenido: { reglas: [ repaso('a2-12', NOTA_FINAL), repaso('a2-13', NOTA_FINAL), repaso('a2-14', NOTA_FINAL) ] } },
    { day: 26, semana: 4, focus: 'Repaso final: Präteritum sein/haben, Präteritum Modalverben y Zeitgebrauch', ruleIds: ['a2-15', 'a2-16', 'a2-17'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-15', NOTA_FINAL), repaso('a2-16', NOTA_FINAL), repaso('a2-17', NOTA_FINAL) ] } },
    { day: 27, semana: 4, focus: 'Repaso final: preposiciones locales wohin, wo y woher', ruleIds: ['a2-18', 'a2-19', 'a2-20'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-18', NOTA_FINAL), repaso('a2-19', NOTA_FINAL), repaso('a2-20', NOTA_FINAL) ] } },
    { day: 28, semana: 4, focus: 'Repaso libre: conectores en posición 1, subordinadas (weil/wenn/dass) y partículas', ruleIds: ['a2-21', 'a2-22', 'a2-23'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-21', NOTA_LIBRE), repaso('a2-22', NOTA_LIBRE), repaso('a2-23', NOTA_LIBRE) ] } },
    { day: 29, semana: 4, focus: 'Simulacro final A2 (día 1/2): escritura evaluada + Teil 1 oral', ruleIds: ['a2-03'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-03', NOTA_SIMULACRO) ] } },
    { day: 30, semana: 4, focus: 'Simulacro final A2 (día 2/2): los 3 Teile orales completos, puntuación 0-100', ruleIds: ['a2-06'], esClaseEnVivo: false, contenido: { reglas: [ repaso('a2-06', NOTA_SIMULACRO) ] } }
  ];
})();
