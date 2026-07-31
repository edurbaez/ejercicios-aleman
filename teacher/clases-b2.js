window.TEACHER_CLASES = window.TEACHER_CLASES || {};

(function () {
  var RULES = {
    'b2-01': {
      intro: 'El Konjunktiv I es el tiempo del discurso indirecto en la lengua escrita alemana (prensa, informes, literatura): permite reportar lo que alguien dijo sin que el narrador se responsabilice de que sea cierto, algo que el español resuelve con "que" + indicativo/subjuntivo sin cambiar la forma del verbo reportado. Se forma desde el infinitivo (-e/-est/-e/-en/-et/-en), y sus formas más usadas son "sei" (sein) y "habe" (haben). La trampa clásica: cuando la forma del Konjunktiv I coincide con el Indikativ —muy frecuente en plural— hay que sustituirla por el Konjunktiv II o por "würde + Infinitivo", porque si no, el lector no puede distinguir si es una cita indirecta o un hecho afirmado por el narrador.',
      practica: [
        { incorrecto: 'Er sagt, dass er ist krank.', correcto: 'Er sagt, er sei krank.' },
        { incorrecto: 'Sie berichteten, sie kommen morgen.', correcto: 'Sie berichteten, sie würden morgen kommen.' },
        { incorrecto: 'Er meinte, dass er hatte keine Zeit gehabt.', correcto: 'Er meinte, er habe keine Zeit gehabt.' }
      ],
      pasos: [
        { titulo: '🟦 1. Formación desde el infinitivo', texto: '', tabla: { headers: ['Verbo', 'er/sie/es Konj.I', 'Uso frecuente'], rows: [['sein', 'sei', 'Er sagt, er sei krank.'], ['haben', 'habe', 'Er meint, er habe keine Zeit.'], ['kommen', 'komme', 'Sie berichtet, er komme morgen.'], ['können', 'könne', 'Er erklärt, er könne helfen.']] } },
        { titulo: '🟩 2. Para qué sirve: distancia del narrador', texto: 'El Konjunktiv I señala que lo dicho es una cita ajena, no un hecho verificado por quien escribe — muy usado en noticias: "Der Minister erklärte, das Budget sei ausreichend."' },
        { titulo: '🟧 3. La trampa: cuando coincide con el Indikativ', texto: 'En plural, casi todas las formas del Konjunktiv I son idénticas al Indikativ (sie kommen, sie haben...) — en ese caso se sustituye por Konjunktiv II o "würde + Infinitivo": "Sie sagten, sie würden kommen", nunca "sie kommen".' },
        { titulo: '🟨 4. Sin "dass": estilo periodístico', texto: 'En prensa es habitual prescindir de "dass" y usar directamente coma + Konjunktiv I: "Der Minister erklärte, das Budget sei ausreichend" — el orden es entonces el de una frase principal normal.' },
        { titulo: '🟪 5. Contraste con el español', texto: 'El español no tiene un modo verbal exclusivo para el discurso indirecto (usa el mismo indicativo/subjuntivo de siempre); en alemán el cambio de modo ES la señal gramatical de que se trata de una cita, así que no se puede omitir sin más.' }
      ],
      resumen: 'Konjunktiv I = infinitivo + -e/-est/-e/-en/-et/-en, usado en discurso indirecto escrito. Formas clave: sei, habe. Si coincide con el Indikativ (frecuente en plural), se sustituye por Konjunktiv II o würde+Infinitivo.'
    },
    'b2-02': {
      intro: 'El Konjunktiv II pasado (hätte/wäre + Partizip II) expresa hipótesis irreales sobre el pasado — cosas que no ocurrieron pero podrían haber ocurrido, equivalente al español "habría hecho/hubiera hecho". La elección entre hätte y wäre sigue exactamente el mismo criterio que en el Perfekt: verbos de movimiento o cambio de estado usan wäre, el resto hätte. La construcción se complica con verbos modales, que forman un "doble infinitivo" al final de la frase (hätte...können) en vez de usar el participio del modal.',
      practica: [
        { incorrecto: 'Ich habe das nicht gemacht, wenn ich mehr Zeit gehabt habe.', correcto: 'Ich hätte das nicht gemacht, wenn ich mehr Zeit gehabt hätte.' },
        { incorrecto: 'Er ist gern mitgekommen, aber er konnte nicht.', correcto: 'Er wäre gern mitgekommen, aber er konnte nicht.' },
        { incorrecto: 'Das habe ich wissen gemusst.', correcto: 'Das hätte ich wissen müssen.' }
      ],
      pasos: [
        { titulo: '🟦 1. hätte/wäre + Partizip II, igual que el Perfekt', texto: '', tabla: { headers: ['Perfekt (real)', 'Konjunktiv II pasado (irreal)'], rows: [['Er hat gegessen.', 'Er hätte gegessen.'], ['Sie ist gefahren.', 'Sie wäre gefahren.'], ['Wir haben gearbeitet.', 'Wir hätten gearbeitet.']] } },
        { titulo: '🟩 2. Condicionales irreales de pasado', texto: 'Wenn + hätte/wäre...Partizip II, ...hätte/wäre...Partizip II: "Wenn ich mehr gelernt hätte, wäre ich nicht durchgefallen" (si hubiera estudiado más, no habría suspendido).' },
        { titulo: '🟧 3. Modales: hätte + doble infinitivo al final', texto: 'Con verbos modales no se usa el participio del modal (gemusst, gekonnt), sino hätte + infinitivo del verbo principal + infinitivo del modal, en ese orden: "Das hätte ich wissen müssen" (debería haberlo sabido).' },
        { titulo: '🟨 4. Un solo cambio respecto al Perfekt', texto: 'Solo cambia "hat"→"hätte" y "ist"→"wäre"; el resto de la estructura (Partizip II) es idéntica, así que quien domina el Perfekt tiene ya el 90% de esta regla.' }
      ],
      resumen: 'Konjunktiv II pasado: hätte/wäre + Partizip II, mismo criterio que el Perfekt para elegir auxiliar. Con modales: hätte + Infinitivo + Modal (doble infinitivo al final). Equivale a "habría/hubiera hecho".'
    },
    'b2-03': {
      intro: '"Als ob"/"als wenn" (o "als" con inversión) + Konjunktiv II compara con algo que no es real ("actúa como si..."); "sonst"/"andernfalls" + Konjunktiv II expresa una consecuencia irreal (lo que habría pasado de no actuar de cierta manera). La trampa más frecuente es usar Indikativ tras "als ob" cuando la comparación es ficticia — el español "como si" ya implica subjuntivo, pero el alumno tiende a "olvidar" el Konjunktiv II en frases largas.',
      practica: [
        { incorrecto: 'Er tut, als ob er nichts weiß.', correcto: 'Er tut, als ob er nichts wüsste.' },
        { incorrecto: 'Sie sieht aus, als sie krank wäre.', correcto: 'Sie sieht aus, als wäre sie krank.' },
        { incorrecto: 'Ich musste mich beeilen, sonst ich habe den Zug verpasst.', correcto: 'Ich musste mich beeilen, sonst hätte ich den Zug verpasst.' }
      ],
      pasos: [
        { titulo: '🟦 1. Dos estructuras para comparar con algo irreal', texto: '', tabla: { headers: ['Estructura', 'Orden de palabras', 'Ejemplo'], rows: [['als ob / als wenn + Konj.II', 'verbo conjugado al final', 'Er tut, als ob er nichts wüsste.'], ['als + Konj.II', 'inversión verbo-sujeto', 'Er tut, als wüsste er nichts.'], ['sonst / andernfalls + Konj.II', 'orden normal, oración independiente', 'Ich musste mich beeilen, sonst hätte ich den Zug verpasst.']] } },
        { titulo: '🟩 2. als ob = como si + Konjunktiv II, sin excepción', texto: 'Si lo comparado no es real (solo aparenta serlo), el verbo va siempre en Konjunktiv II, nunca en Indikativ — aunque el hispanohablante tienda a "relajar" el modo en frases largas.' },
        { titulo: '🟧 3. als sin ob: versión abreviada con inversión', texto: 'Quitar "ob" obliga a que el verbo "salte" justo después de als, ocupando el hueco que dejó "ob": "als wüsste er nichts" en vez de "als er nichts wüsste".' },
        { titulo: '🟨 4. sonst/andernfalls: consecuencia irreal, no comparación', texto: 'Introduce una oración independiente con orden normal (sujeto-verbo) que explica qué habría pasado de no haber actuado así — no confundir con als ob, que es comparación.' }
      ],
      resumen: 'als ob/als wenn (verbo al final) o als (con inversión) + Konjunktiv II compara con algo irreal. sonst/andernfalls + Konjunktiv II expresa la consecuencia de no haber actuado de cierta forma. El Indikativ tras als ob es el error más frecuente.'
    },
    'b2-04': {
      intro: 'La pasiva alemana puede especificar quién o qué realiza la acción con dos preposiciones que no son intercambiables: "von + Dativo" para un agente animado (persona, institución, animal) y "durch + Acusativo" para un medio, instrumento o causa impersonal — una distinción que el español no marca (siempre "por"). Además del Vorgangspassiv (werden + Partizip II, la acción en proceso) existe el Zustandspassiv (sein + Partizip II), que describe el resultado o estado ya alcanzado, no la acción en sí.',
      practica: [
        { incorrecto: 'Das Haus wurde durch einem Architekten entworfen.', correcto: 'Das Haus wurde von einem Architekten entworfen.' },
        { incorrecto: 'Das Fenster wurde von dem Sturm zerstört.', correcto: 'Das Fenster wurde durch den Sturm zerstört.' },
        { incorrecto: 'Die Tür wird schon seit einer Stunde geöffnet.', correcto: 'Die Tür ist schon seit einer Stunde geöffnet.' }
      ],
      pasos: [
        { titulo: '🟦 1. von vs. durch vs. sein+Partizip II', texto: '', tabla: { headers: ['Estructura', 'Uso', 'Ejemplo'], rows: [['von + Dat.', 'agente animado', '…vom Architekten entworfen'], ['durch + Akk.', 'medio / causa', '…durch den Sturm zerstört'], ['sein + P.II', 'estado resultado (Zustands.)', 'Die Tür ist geöffnet.']] } },
        { titulo: '🟩 2. von + Dativo: agente animado', texto: 'Persona, animal o institución que realiza la acción conscientemente: "Das Haus wurde von einem Architekten entworfen."' },
        { titulo: '🟧 3. durch + Acusativo: medio o causa impersonal', texto: 'Fenómenos, instrumentos o causas sin voluntad propia: "durch den Sturm zerstört", "durch KI ersetzt".' },
        { titulo: '🟨 4. Zustandspassiv: sein + Partizip II = estado, no proceso', texto: '"Die Tür wird geöffnet" describe la acción de abrir ocurriendo; "Die Tür ist geöffnet" describe el resultado: la puerta ya está abierta, sin importar cuándo se abrió.' }
      ],
      resumen: 'Agente animado → von+Dativo. Medio/causa impersonal → durch+Acusativo. Estado resultante (no proceso) → sein+Partizip II (Zustandspassiv), distinto del Vorgangspassiv (werden+P.II).'
    },
    'b2-05': {
      intro: 'Cuando un verbo modal se combina con la pasiva, el modal se conjuga normalmente en posición 2 y al final de la frase se apilan Partizip II + werden (en infinitivo) — el mismo "marco verbal" que ya conocen de otras estructuras, solo que ahora con dos piezas al final en vez de una. El matiz depende del modal: müssen (obligación), können (posibilidad), dürfen (permiso, muy frecuente en negativo) y sollen (norma o recomendación externa).',
      practica: [
        { incorrecto: 'Das muss heute noch werden erledigt.', correcto: 'Das muss heute noch erledigt werden.' },
        { incorrecto: 'Hier darf nicht rauchen werden.', correcto: 'Hier darf nicht geraucht werden.' },
        { incorrecto: 'Der Antrag soll werden bis Freitag eingereicht.', correcto: 'Der Antrag soll bis Freitag eingereicht werden.' }
      ],
      pasos: [
        { titulo: '🟦 1. Orden fijo: modal (V2) … Partizip II + werden', texto: '', tabla: { headers: ['Tiempo', 'Modal', 'Ejemplo'], rows: [['Präsens', 'müssen', 'Das muss heute noch erledigt werden.'], ['Präteritum', 'müssen', 'Das musste sofort erledigt werden.'], ['Präsens', 'können', 'Das kann repariert werden.'], ['Präsens', 'dürfen', 'Hier darf nicht geraucht werden.']] } },
        { titulo: '🟩 2. El matiz depende del modal elegido', texto: 'müssen = obligación (hay que repararlo), können = posibilidad (se puede reparar), dürfen = permiso, muy frecuente en negativo (aquí no se puede fumar), sollen = norma o recomendación externa.' },
        { titulo: '🟧 3. Funciona en todos los tiempos', texto: 'Präsens (muss…werden), Präteritum (musste…werden) y, de forma más compleja, Perfekt con el Ersatzinfinitiv ("hat…werden müssen", tema de C1 — en B2 basta con reconocerlo al leer).' },
        { titulo: '🟨 4. Truco: parte de la pasiva simple', texto: 'Toma la pasiva simple ("wird repariert") y añade el modal delante, empujando "werden" al final: "kann repariert werden".' }
      ],
      resumen: 'Modal (V2) + … + Partizip II + werden (final). müssen=obligación, können=posibilidad, dürfen=permiso, sollen=norma externa. En Perfekt usa el Ersatzinfinitiv (reconocer, no producir activamente en B2).'
    },
    'b2-06': {
      intro: 'Algunos verbos intransitivos (sin objeto acusativo) forman una pasiva sin sujeto real —el "unpersönliches Passiv"— que despersonaliza la acción y pone el foco en la actividad misma: "Hier wird gelacht" (aquí se ríe). La condición es que el verbo describa algo que un agente realiza voluntariamente (lachen, tanzen, arbeiten); verbos de estado, meteorológicos, mentales o modales no lo admiten, por mucho que la frase "suene" posible.',
      practica: [
        { incorrecto: 'Es wird geregnet.', correcto: 'Es regnet.' },
        { incorrecto: 'Hier werden gelacht.', correcto: 'Hier wird gelacht.' },
        { incorrecto: 'Es wird gewusst, dass er Recht hat.', correcto: 'Es ist bekannt, dass er Recht hat.' }
      ],
      pasos: [
        { titulo: '🟦 1. Qué verbos sí y qué verbos no', texto: '', tabla: { headers: ['Sí forman pasiva impersonal', 'No forman pasiva impersonal'], rows: [['lachen → Hier wird gelacht.', 'regnen → *Es wird geregnet. (meteorológico)'], ['tanzen → Auf der Party wird getanzt.', 'sein/haben → *Es wird gewesen. (estado)'], ['arbeiten → Sonntags wird nicht gearbeitet.', 'wissen/kennen → *Es wird gewusst. (estado mental)'], ['singen → Im Chor wird viel gesungen.', 'können/müssen → *Es wird gekonnt. (modal)']] } },
        { titulo: '🟩 2. "es" es un simple relleno de posición 1', texto: '"Es" no es sujeto gramatical (el verbo va siempre en 3ª persona singular); si otra palabra ocupa la posición 1, "es" desaparece: "Es wird hier viel gelacht" → "Hier wird viel gelacht."' },
        { titulo: '🟧 3. El verbo siempre en singular', texto: 'Como no hay sujeto real que concuerde, el verbo se queda en 3ª persona singular sin importar cuántas personas participen: "gelacht wird", nunca "gelacht werden".' },
        { titulo: '🟨 4. Pregunta guía', texto: '¿Es una acción que alguien hace voluntariamente? (lachen, tanzen, arbeiten) → posible. ¿Es estado, clima, conocimiento o verbo modal? (regnen, sein, wissen, können) → imposible.' }
      ],
      resumen: 'werden + Partizip II sin sujeto real (unpersönliches Passiv), solo con verbos de acción voluntaria. "es" es relleno de posición 1, desaparece si otra palabra la ocupa. Verbo siempre en 3ª persona singular.'
    },
    'b2-07': {
      intro: 'El Partizip I (infinitivo + -d: laufend, schlafend) funciona como adjetivo atributivo para expresar una acción en curso o simultánea a la principal — "el niño que está durmiendo" se convierte en "das schlafende Kind". Se declina exactamente igual que cualquier otro adjetivo y, a diferencia del Partizip II, nunca lleva el prefijo "ge-". La trampa más frecuente es confundirlo con el Partizip II (b2-08): Partizip I = activo/simultáneo, Partizip II = pasivo/completado.',
      practica: [
        { incorrecto: 'das schlafend Kind', correcto: 'das schlafende Kind' },
        { incorrecto: 'ein wachsend Markt', correcto: 'ein wachsender Markt' },
        { incorrecto: 'die geweinende Frau', correcto: 'die weinende Frau' }
      ],
      pasos: [
        { titulo: '🟦 1. Formación: infinitivo + -d', texto: 'schlafen→schlafend, weinen→weinend, wachsen→wachsend — a diferencia del Partizip II, nunca lleva el prefijo "ge-".' },
        { titulo: '🟩 2. Se declina como cualquier adjetivo atributivo', texto: 'Mismas terminaciones según género, caso y presencia de artículo que cualquier otro adjetivo: "die weinende Frau", "mit steigenden Kosten".' },
        { titulo: '🟧 3. Partizip I ≠ Partizip II', texto: 'Partizip I = acción activa simultánea (das laufende Programm, el programa que está corriendo). Partizip II = acción pasiva o completada (das abgeschlossene Programm, el programa finalizado). Compararlos en pareja fija la diferencia.' },
        { titulo: '🟨 4. Registro: más escrito que hablado', texto: 'Es muy frecuente en la lengua escrita y formal; en la conversación cotidiana se prefiere una oración de relativo ("das Kind, das schläft").' }
      ],
      resumen: 'Partizip I = infinitivo + -d, sin "ge-", declinado como cualquier adjetivo, expresa acción activa simultánea. No confundir con el Partizip II (resultado/pasivo, b2-08).'
    },
    'b2-08': {
      intro: 'El Partizip II también puede funcionar como adjetivo atributivo, pero al contrario que el Partizip I expresa el resultado de una acción, con sentido pasivo: "das geöffnete Fenster" (la ventana abierta, ya abierta por alguien). Se declina con las mismas terminaciones que cualquier adjetivo. En C1 puede llevar complementos propios antes del sustantivo (erweitertes Partizipialattribut); en B2 basta con dominar los casos sin complementos.',
      practica: [
        { incorrecto: 'das öffnende Fenster', correcto: 'das geöffnete Fenster' },
        { incorrecto: 'ein bratendes Hähnchen', correcto: 'ein gebratenes Hähnchen' },
        { incorrecto: 'die unterschreibende Dokumente', correcto: 'die unterschriebenen Dokumente' }
      ],
      pasos: [
        { titulo: '🟦 1. Resultado de una acción, sentido pasivo', texto: '"das geöffnete Fenster" no es "la ventana que abre" sino "la ventana que fue abierta y ahora está abierta" — el resultado, no la acción en curso.' },
        { titulo: '🟩 2. Se declina igual que cualquier adjetivo', texto: 'Mismas terminaciones que un adjetivo normal según género, caso y presencia de artículo: "ein gut geschriebener Artikel", "die unterschriebenen Dokumente".' },
        { titulo: '🟧 3. Preview C1: complementos antes del sustantivo', texto: '"das von der Regierung beschlossene Gesetz" (la ley aprobada por el gobierno) añade un complemento propio (von der Regierung) delante del participio — se lee de derecha a izquierda, del sustantivo hacia atrás. En B2 basta con reconocerlo al leer.' },
        { titulo: '🟨 4. Truco de lectura', texto: 'Ante una cadena larga [artículo] + [complementos] + [Partizip II] + [sustantivo], localiza primero el sustantivo final y el Partizip II justo antes; el resto son complementos de esa acción.' }
      ],
      resumen: 'Partizip II como adjetivo expresa resultado/estado pasivo, se declina como cualquier adjetivo. Puede llevar complementos antes del sustantivo (erweitertes Partizipialattribut, profundizado en C1) — en B2 basta reconocerlo al leer.'
    },
    'b2-09': {
      intro: 'El Futur II se forma con werden + Partizip II + haben/sein en infinitivo ("Er wird den Zug verpasst haben"), pero a pesar de su nombre casi nunca se usa para hablar del futuro: su función principal en B2/C1 es expresar una suposición sobre algo que ya ocurrió, equivalente al español "seguramente habrá + participio". El auténtico "futuro anterior" (algo que estará terminado en un punto del futuro) existe pero es mucho más raro y casi siempre necesita un marcador temporal explícito (bis morgen).',
      practica: [
        { incorrecto: 'Er hat wahrscheinlich den Zug verpasst haben.', correcto: 'Er wird den Zug verpasst haben.' },
        { incorrecto: 'Sie ist schon angekommen sein.', correcto: 'Sie wird schon angekommen sein.' },
        { incorrecto: 'Bis morgen hat er die Arbeit beendet haben.', correcto: 'Bis morgen wird er die Arbeit beendet haben.' }
      ],
      pasos: [
        { titulo: '🟦 1. Dos usos, uno mucho más frecuente', texto: '', tabla: { headers: ['Uso', 'Ejemplo', 'Significado'], rows: [['Suposición sobre el pasado (el más frecuente)', 'Sie wird schon angekommen sein.', 'Seguramente ya habrá llegado.'], ['Futuro anterior real (raro)', 'Bis morgen wird er die Arbeit beendet haben.', 'Para mañana habrá terminado el trabajo.']] } },
        { titulo: '🟩 2. El uso real: suposición sobre el pasado', texto: '"Sie wird schon angekommen sein" no habla de futuro, habla de una conjetura sobre algo que probablemente ya pasó — "seguramente ya habrá llegado".' },
        { titulo: '🟧 3. Casi siempre acompañado de wohl/sicher/wahrscheinlich', texto: 'Estos adverbios de probabilidad refuerzan el matiz de suposición: "Er wird wohl verschlafen haben" (seguramente se habrá quedado dormido).' },
        { titulo: '🟨 4. El futuro anterior real es raro', texto: 'Necesita casi siempre un marcador temporal explícito (bis morgen, bis nächste Woche) para no leerse como suposición: "Bis morgen wird er die Arbeit beendet haben."' }
      ],
      resumen: 'Futur II = werden + Partizip II + haben/sein. Su uso más frecuente en B2/C1 no es futuro, sino suposición sobre el pasado ("seguramente habrá…"), casi siempre con wohl/sicher/wahrscheinlich. El futuro anterior real es raro y necesita marcador temporal.'
    },
    'b2-10': {
      intro: 'Cuatro construcciones enlazan la frase principal con un infinitivo (o una subordinada) para expresar finalidad, ausencia o sustitución: um…zu (para/con el fin de), ohne…zu (sin hacer algo), (an)statt…zu (en vez de) y damit (para que). Las tres primeras con "zu+Infinitivo" solo funcionan si el sujeto es el mismo en ambas acciones; en cuanto los sujetos difieren, hay que cambiar a la subordinada correspondiente con verbo conjugado al final: damit, ohne dass, (an)statt dass.',
      practica: [
        { incorrecto: 'Ich lerne, um bestehe die Prüfung.', correcto: 'Ich lerne, um die Prüfung zu bestehen.' },
        { incorrecto: 'Ich erkläre es langsam, um du es verstehst.', correcto: 'Ich erkläre es langsam, damit du es verstehst.' },
        { incorrecto: 'Er ging, ohne dass sich zu verabschieden.', correcto: 'Er ging, ohne sich zu verabschieden.' }
      ],
      pasos: [
        { titulo: '🟦 1. Cuatro estructuras, un solo criterio: ¿mismo sujeto?', texto: '', tabla: { headers: ['Estructura', 'Significado', 'Condición'], rows: [['um…zu + Infinitiv', 'para / con el fin de', 'mismo sujeto en ambas frases'], ['damit + Nebensatz', 'para que', 'sujetos distintos (o insistencia)'], ['ohne…zu + Infinitiv', 'sin (hacer algo)', 'mismo sujeto en ambas frases'], ['(an)statt…zu + Infinitiv', 'en vez de', 'mismo sujeto en ambas frases']] } },
        { titulo: '🟩 2. um…zu: finalidad, mismo sujeto', texto: '"Ich lerne, um die Prüfung zu bestehen" — el que aprende y el que aprueba es la misma persona.' },
        { titulo: '🟧 3. damit: finalidad, sujetos distintos', texto: '"Ich erkläre es langsam, damit du es verstehst" — quien explica y quien entiende son personas distintas, así que no puede usarse um…zu.' },
        { titulo: '🟨 4. ohne…zu y (an)statt…zu: mismo patrón', texto: 'ohne…zu = sin hacer algo ("Er ging, ohne sich zu verabschieden"); (an)statt…zu = en vez de ("Er half mir, anstatt zu kritisieren") — ambas exigen mismo sujeto; si no, ohne dass / (an)statt dass.' },
        { titulo: '🟪 5. Pregunta guía única', texto: '¿Mismo sujeto en ambas frases? Sí → zu+Infinitivo (um…/ohne…/[an]statt…). No → subordinada con verbo al final (damit/ohne dass/[an]statt dass).' }
      ],
      resumen: 'um…zu (finalidad), ohne…zu (sin), (an)statt…zu (en vez de): mismo sujeto + zu+Infinitivo. Si los sujetos difieren: damit, ohne dass, (an)statt dass + verbo al final.'
    },
    'b2-11': {
      intro: 'Para expresar que algo ocurre a pesar de otra cosa, el alemán distingue estructuralmente entre "obwohl" (subordinada, verbo al final) y "trotzdem"/"dennoch" (adverbios que encabezan una frase principal con V2) — la confusión entre ambos es el error más clásico de B2, porque el español "aunque" y "sin embargo" no marcan esta diferencia de posición verbal tan claramente. "Zwar…aber" coordina dentro de la misma idea, y "wohingegen" introduce un contraste (no una concesión) con el verbo también al final.',
      practica: [
        { incorrecto: 'Obwohl es regnet, wir gehen raus.', correcto: 'Obwohl es regnet, gehen wir raus.' },
        { incorrecto: 'Es regnet, trotzdem wir gehen raus.', correcto: 'Es regnet, trotzdem gehen wir raus.' },
        { incorrecto: 'Er ist zwar müde, er arbeitet weiter.', correcto: 'Er ist zwar müde, aber er arbeitet weiter.' }
      ],
      pasos: [
        { titulo: '🟦 1. Cinco conectores, tres comportamientos distintos', texto: '', tabla: { headers: ['Conector', 'Estructura', 'Ejemplo'], rows: [['obwohl', 'subordinada (verbo al final)', 'Obwohl es regnet, gehe ich raus.'], ['trotzdem', 'frase principal (V2)', 'Es regnet. Trotzdem gehe ich raus.'], ['dennoch', 'frase principal (V2)', 'Es ist schwer. Dennoch versuche ich es.'], ['zwar … aber', 'coordinación', 'Er ist zwar müde, aber er arbeitet.'], ['wohingegen', 'subordinada, contraste', 'Er arbeitet gern im Büro, wohingegen sie lieber von zu Hause aus arbeitet.']] } },
        { titulo: '🟩 2. obwohl: subordinada, verbo al final', texto: 'Puede ir antes o después de la principal: "Obwohl es regnet, gehen wir spazieren" / "Wir gehen spazieren, obwohl es regnet."' },
        { titulo: '🟧 3. trotzdem/dennoch: frase principal, V2', texto: 'Encabezan una frase principal nueva: "Es regnet. Trotzdem gehen wir spazieren" — el verbo va justo después, no al final.' },
        { titulo: '🟨 4. zwar…aber: coordinación con "aber" casi obligatorio', texto: '"Er ist zwar müde, aber er arbeitet weiter" — zwar admite el hecho, aber lo contrapone; omitir "aber" suena incompleto.' },
        { titulo: '🟪 5. wohingegen: contraste, no concesión', texto: 'Comparte la posición final del verbo con obwohl, pero no implica un obstáculo superado: "Er arbeitet gern im Büro, wohingegen sie lieber von zu Hause aus arbeitet" — simplemente contrapone dos preferencias.' }
      ],
      resumen: 'obwohl → subordinada (verbo al final). trotzdem/dennoch → frase principal (V2). zwar…aber → coordinación. wohingegen → contraste (no concesión), verbo también al final. Comprobar siempre la posición del verbo para no confundir obwohl con trotzdem.'
    },
    'b2-12': {
      intro: 'Las oraciones consecutivas expresan el resultado de lo dicho antes. "Sodass" (hoy generalmente junto) introduce una consecuencia neutra con el verbo al final; "so + adjetivo/adverbio…, dass" intensifica primero la causa antes de dar la consecuencia; "dermaßen/derart…+dass" es la variante formal/enfática; y "weshalb/weswegen" retoman TODA la oración anterior como causa (no un sustantivo concreto), a diferencia de un pronombre relativo normal.',
      practica: [
        { incorrecto: 'Er hat sich beeilt, so dass er den Zug noch erreichte er.', correcto: 'Er hat sich beeilt, sodass er den Zug noch erreichte.' },
        { incorrecto: 'Sie war müde so, dass sie sofort einschlief.', correcto: 'Sie war so müde, dass sie sofort einschlief.' },
        { incorrecto: 'Er kam zu spät, weshalb er verpasste die Prüfung.', correcto: 'Er kam zu spät, weshalb er die Prüfung verpasste.' }
      ],
      pasos: [
        { titulo: '🟦 1. Cuatro formas de expresar consecuencia', texto: '', tabla: { headers: ['Estructura', 'Función', 'Ejemplo'], rows: [['sodass / so dass + Nebensatz', 'consecuencia general', 'Er hat sich beeilt, sodass er den Zug noch erreichte.'], ['so + Adj/Adv …, dass', 'intensifica la causa', 'Sie war so müde, dass sie sofort einschlief.'], ['dermaßen/derart + Adj …, dass', 'variante formal/enfática', 'Er war dermaßen erschöpft, dass er nicht mehr sprechen konnte.'], ['weshalb / weswegen', 'retoma toda la oración anterior', 'Er kam zu spät, weshalb er die Prüfung verpasste.']] } },
        { titulo: '🟩 2. sodass: consecuencia neutra', texto: 'Se escribe generalmente junto en textos modernos: "Er hat sich beeilt, sodass er den Zug noch erreichte."' },
        { titulo: '🟧 3. so.../dermaßen... + dass: intensifica la causa', texto: 'Cuando la consecuencia depende de un adjetivo o adverbio concreto: "Sie war so müde, dass…" — la variante formal sustituye "so" por "dermaßen"/"derart": "Er war dermaßen erschöpft, dass…"' },
        { titulo: '🟨 4. weshalb/weswegen: retoman toda la oración anterior', texto: 'No apuntan a un sustantivo concreto como haría un relativo normal, sino a todo el hecho previo: "Er kam zu spät, weshalb er die Prüfung verpasste" (llegar tarde, en su totalidad, es la causa).' }
      ],
      resumen: 'sodass = consecuencia neutra. so/dermaßen + adjetivo…, dass = intensifica la causa antes de la consecuencia. weshalb/weswegen retoman toda la oración anterior, no un sustantivo. Todas mandan el verbo al final.'
    },
    'b2-13': {
      intro: '"Dessen" y "deren" equivalen a "cuyo/cuya/cuyos/cuyas", pero con una regla que no existe en español: concuerdan con el género y número del ANTECEDENTE (el poseedor), nunca con el sustantivo poseído — masculino/neutro toman dessen, femenino/plural toman deren. El error típico de un hispanohablante es hacerlos concordar con lo poseído en vez de con el dueño, porque en español "cuyo" tampoco concuerda con el poseedor sino con lo poseído, justo al revés que en alemán.',
      practica: [
        { incorrecto: 'Der Mann, deren Tochter Ärztin ist, wohnt nebenan.', correcto: 'Der Mann, dessen Tochter Ärztin ist, wohnt nebenan.' },
        { incorrecto: 'Die Frau, dessen Hund bellt, ist meine Nachbarin.', correcto: 'Die Frau, deren Hund bellt, ist meine Nachbarin.' },
        { incorrecto: 'Der Mann, dessen die Tochter ich kenne, ist mein Chef.', correcto: 'Der Mann, dessen Tochter ich kenne, ist mein Chef.' }
      ],
      pasos: [
        { titulo: '🟦 1. dessen/deren concuerdan con el antecedente', texto: '', tabla: { headers: ['Antecedente', 'Pronombre', 'Ejemplo'], rows: [['maskulin (der Mann)', 'dessen', 'Der Mann, dessen Tochter Ärztin ist, wohnt nebenan.'], ['neutrum (das Kind)', 'dessen', 'Das Kind, dessen Eltern verreist sind, wohnt bei der Oma.'], ['feminin (die Frau)', 'deren', 'Die Frau, deren Hund bellt, ist meine Nachbarin.'], ['Plural (die Leute)', 'deren', 'Die Leute, deren Auto kaputt ist, warten auf den Abschleppdienst.']] } },
        { titulo: '🟩 2. La trampa: no concuerda con lo poseído', texto: '"Der Mann, dessen Tochter Ärztin ist" usa "dessen" (no "deren") porque el antecedente es "der Mann" (masculino), aunque "Tochter" sea femenino — al revés que el "cuyo/cuya" español, que sí concuerda con lo poseído.' },
        { titulo: '🟧 3. Sin artículo tras dessen/deren', texto: 'El sustantivo poseído nunca lleva artículo: "dessen Tochter", nunca "dessen die Tochter".' },
        { titulo: '🟨 4. El caso del sustantivo poseído es independiente', texto: 'Dentro de la subordinada, ese sustantivo puede ser sujeto, objeto directo o indirecto según su propia función: "Der Mann, dessen Tochter ich kenne" (Tochter es Akkusativ de "kenne", pero dessen sigue en genitivo por concordar con der Mann).' }
      ],
      resumen: 'dessen (masc./neutro) y deren (fem./plural) = "cuyo/a", concuerdan con el ANTECEDENTE (el poseedor), no con lo poseído — al revés que en español. Sin artículo después. El caso del sustantivo poseído depende de su función en la subordinada, no del genitivo.'
    },
    'b2-14': {
      intro: '"Was" funciona como pronombre relativo cuando el antecedente no es un sustantivo concreto con género, sino "etwas", "nichts", "alles", el demostrativo neutro "das/dies" o directamente toda la oración anterior (equivalente al "lo cual" español). Cuando este relativo necesita preposición, el alemán nunca combina la preposición con "was" (nunca "über was"): funde la preposición con "wo-" (o "wor-" ante vocal): worüber, worauf, womit.',
      practica: [
        { incorrecto: 'Er hat etwas gesagt, das mich überrascht hat.', correcto: 'Er hat etwas gesagt, was mich überrascht hat.' },
        { incorrecto: 'Es gibt nichts, über was wir uns streiten müssten.', correcto: 'Es gibt nichts, worüber wir uns streiten müssten.' },
        { incorrecto: 'Er kam zu spät, das mich sehr geärgert hat.', correcto: 'Er kam zu spät, was mich sehr geärgert hat.' }
      ],
      pasos: [
        { titulo: '🟦 1. Cuándo se usa "was" en vez de der/die/das', texto: '', tabla: { headers: ['Antecedente', 'Relativo', 'Ejemplo'], rows: [['etwas', 'was', 'Er hat etwas gesagt, was mich überrascht hat.'], ['nichts (+ preposición)', 'worüber / worauf…', 'Es gibt nichts, worüber wir uns streiten müssten.'], ['alles', 'was', 'Sie glaubt alles, was er sagt.'], ['toda la oración anterior', 'was', 'Er kam zu spät, was mich sehr geärgert hat.']] } },
        { titulo: '🟩 2. etwas, nichts, alles: antecedentes neutros indefinidos', texto: '"Sie glaubt alles, was er sagt" — el antecedente no tiene género propio, así que "was" sustituye al relativo normal.' },
        { titulo: '🟧 3. Toda la oración anterior como antecedente', texto: '"Er kam zu spät, was mich sehr geärgert hat" — "was" retoma el hecho completo (llegar tarde), no una palabra suelta; equivale al "lo cual" español.' },
        { titulo: '🟨 4. Con preposición: nunca "preposición+was", siempre wo(r)-', texto: 'Nunca "für was" o "an was" en este contexto: "wofür", "woran" — fusión obligatoria con wo(r)-, muy usada para retomar una idea sin repetir el sustantivo.' }
      ],
      resumen: '"was" es relativo cuando el antecedente es etwas/nichts/alles/das o toda la oración anterior. Con preposición se funde en wo(r)-+preposición (worüber, wofür) — nunca "preposición+was".'
    },
    'b2-15': {
      intro: 'Los conectores coordinantes de dos partes enlazan elementos equivalentes con matices que no son intercambiables entre sí: sowohl…als auch (suma, "tanto…como"), weder…noch (doble negación, "ni…ni"), entweder…oder (alternativa excluyente, "o…o"), nicht nur…sondern auch (suma enfática) y zwar…aber (concesión). La concordancia verbal tiene sus propias reglas: con weder…noch el verbo concuerda con el sujeto más cercano; con sowohl…als auch puede ir en plural aunque los sujetos sean singulares.',
      practica: [
        { incorrecto: 'Sowohl er als auch sie kommt.', correcto: 'Sowohl er als auch sie kommen.' },
        { incorrecto: 'Weder er noch sie haben angerufen.', correcto: 'Weder er noch sie hat angerufen.' },
        { incorrecto: 'Entweder du kommst jetzt, du bleibst.', correcto: 'Entweder du kommst jetzt, oder du bleibst.' }
      ],
      pasos: [
        { titulo: '🟦 1. Cinco pares, cinco matices distintos', texto: '', tabla: { headers: ['Par', 'Significado'], rows: [['sowohl … als auch', 'tanto … como (suma)'], ['weder … noch', 'ni … ni (doble negación)'], ['entweder … oder', 'o … o (alternativa)'], ['nicht nur … sondern auch', 'no solo … sino también'], ['zwar … aber', 'bien es verdad … pero (concesión)']] } },
        { titulo: '🟩 2. sowohl…als auch: suma, admite plural', texto: '"Sowohl er als auch sie kommen" — aunque cada sujeto sea singular, el conjunto se trata como plural.' },
        { titulo: '🟧 3. weder…noch: concuerda con el sujeto más cercano', texto: '"Weder er noch sie hat angerufen" — el verbo concuerda con "sie" (el elemento más próximo al verbo), no con la suma de ambos.' },
        { titulo: '🟨 4. zwar…aber: "aber" casi obligatorio', texto: 'zwar admite un hecho, y prácticamente siempre necesita el "aber" que lo contrapone: "Er ist zwar müde, aber er arbeitet weiter."' }
      ],
      resumen: 'sowohl…als auch (suma), weder…noch (ni…ni, verbo con sujeto más cercano), entweder…oder (alternativa), nicht nur…sondern auch (suma enfática), zwar…aber (concesión). Cada par tiene un matiz propio, no intercambiable.'
    },
    'b2-16': {
      intro: 'El alemán nominaliza verbos con mucha más frecuencia que el español, especialmente en registro escrito y formal. Un infinitivo nominalizado es SIEMPRE neutro y se escribe con mayúscula (das Lesen, das Schreiben), y puede funcionar como sujeto, objeto o ir tras preposición (beim Kochen). Los adjetivos nominalizados (der Kranke, das Gute) siguen la declinación fuerte de adjetivo, no la de sustantivo normal — y varios sufijos muy productivos (-ung, -heit/-keit, -schaft, -tum, -ling) permiten crear sustantivos nuevos con género predecible.',
      practica: [
        { incorrecto: 'das lesen macht mir Spaß.', correcto: 'Das Lesen macht mir Spaß.' },
        { incorrecto: 'der Gute daran ist...', correcto: 'Das Gute daran ist...' },
        { incorrecto: 'Der Lösung war kompliziert.', correcto: 'Die Lösung war kompliziert.' }
      ],
      pasos: [
        { titulo: '🟦 1. Infinitivo sustantivado: siempre neutro', texto: 'das Lesen, das Schreiben, das Lernen — mayúscula obligatoria, funciona como sujeto, objeto o con preposición: "Beim Kochen hört er Musik."' },
        { titulo: '🟩 2. Adjetivos nominalizados: declinación fuerte', texto: '', tabla: { headers: ['Adjetivo', 'Nominalización', 'Ejemplo'], rows: [['krank', 'der/die Kranke', 'el/la enfermo/a'], ['gut', 'das Gute', 'lo bueno'], ['arbeitslos', 'der/die Arbeitslose', 'el/la desempleado/a']] } },
        { titulo: '🟧 3. Sufijos productivos y su género', texto: '-ung→die (die Lösung), -heit/-keit→die (die Freiheit, die Möglichkeit), -schaft→die (die Freundschaft), -tum→das (das Wachstum), -ling→der (der Lehrling).' },
        { titulo: '🟨 4. Truco de reconocimiento', texto: 'Si ves "das" seguido de una palabra con mayúscula que parece un verbo en infinitivo, es casi seguro una nominalización — muy típico en textos académicos y periodísticos.' }
      ],
      resumen: 'Infinitivo sustantivado: siempre "das" + mayúscula (das Lesen). Adjetivo sustantivado: declinación fuerte (der Kranke, das Gute). Sufijos productivos con género fijo: -ung/-heit/-keit/-schaft→die, -tum→das, -ling→der.'
    },
    'b2-17': {
      intro: 'Las Modalpartikeln (doch, mal, ja, eigentlich, eben, halt) añaden un matiz emocional o pragmático que no se traduce palabra por palabra — su significado depende del contexto y la entonación, no del diccionario. Van siempre en el Mittelfeld (posición media de la frase), nunca al inicio, y son la clave para que el alemán hablado suene natural en vez de "de manual". No forman parte del contenido proposicional de la frase: quitarlas no cambia el hecho comunicado, solo su matiz.',
      practica: [
        { incorrecto: 'Doch komm mit!', correcto: 'Komm doch mit!' },
        { incorrecto: 'Mal schau!', correcto: 'Schau mal!' },
        { incorrecto: 'Das ist so, eben.', correcto: 'Das ist eben so.' }
      ],
      pasos: [
        { titulo: '🟦 1. Matiz principal de cada partícula', texto: '', tabla: { headers: ['Partícula', 'Matiz principal'], rows: [['doch', 'refuta negación / invita / consuela'], ['ja', 'algo compartido / conocido por ambos'], ['mal', 'suaviza una petición'], ['eben / halt', 'resignación — así son las cosas'], ['eigentlich', 'matización / ligera corrección']] } },
        { titulo: '🟩 2. Nunca al inicio de la frase', texto: 'Ocupan siempre el Mittelfeld, después del verbo conjugado: "Komm doch mit!", nunca "Doch komm mit!"' },
        { titulo: '🟧 3. doch: la más versátil', texto: 'Puede refutar una negación ("Doch!" = ¡Sí que es!), invitar, consolar o añadir sorpresa — el significado exacto depende siempre del contexto.' },
        { titulo: '🟨 4. No se aprenden de una lista, se aprenden de oído', texto: 'El mejor método es escuchar series, podcasts o conversaciones reales en alemán y fijarse en qué matiz añade cada partícula en cada situación concreta.' }
      ],
      resumen: 'doch, mal, ja, eigentlich, eben, halt matizan el tono sin cambiar el contenido de la frase. Van en el Mittelfeld, nunca al inicio. No tienen traducción fija — se aprenden escuchando alemán real.'
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

  var NOTA_REPASO1 = 'Nota para el profesor: repaso de la semana 1, ya se vio una vez — refuerza con ejemplos nuevos en vez de reexplicar desde cero.';
  var NOTA_LIBRE = 'Nota para el profesor: es repaso libre de consolidación — retómalo con ejemplos nuevos, sin añadir contenido nuevo a la regla.';
  var NOTA_FINAL = 'Nota para el profesor: esto es repaso final de cierre de curso — no introduzcas matices nuevos, el objetivo es consolidar antes del simulacro.';
  var NOTA_SIMULACRO = 'Nota para el profesor: repaso puntual y breve antes del simulacro — no es momento de explicar nada nuevo, solo refrescar lo esencial.';

  window.TEACHER_CLASES.b2 = [
    { day: 1, semana: 1, focus: 'Konjunktiv I (discurso indirecto) + Konjunktiv II pasado + Comparaciones y consecuencias irreales', ruleIds: ['b2-01', 'b2-02', 'b2-03'], esClaseEnVivo: false, contenido: { reglas: [ base('b2-01'), base('b2-02'), base('b2-03') ] } },
    { day: 2, semana: 1, focus: 'Pasiva con agente (von/durch) + Pasiva con verbos modales + Passivsätze ohne Subjekt', ruleIds: ['b2-04', 'b2-05', 'b2-06'], esClaseEnVivo: true, contenido: { reglas: [ base('b2-04'), base('b2-05'), base('b2-06') ] } },
    { day: 3, semana: 1, focus: 'Partizip I como adjetivo + Partizip II como adjetivo + Futur II', ruleIds: ['b2-07', 'b2-08', 'b2-09'], esClaseEnVivo: false, contenido: { reglas: [ base('b2-07'), base('b2-08'), base('b2-09') ] } },
    { day: 4, semana: 1, focus: 'Finalidad y contraste con infinitivo + Concesión y adversación + Konsekutive Nebensätze', ruleIds: ['b2-10', 'b2-11', 'b2-12'], esClaseEnVivo: true, contenido: { reglas: [ base('b2-10'), base('b2-11'), base('b2-12') ] } },
    { day: 5, semana: 1, focus: 'Relativsätze im Genitiv + Relativpronomen mit was/wo(r)- + Conectores de dos partes', ruleIds: ['b2-13', 'b2-14', 'b2-15'], esClaseEnVivo: false, contenido: { reglas: [ base('b2-13'), base('b2-14'), base('b2-15') ] } },
    { day: 6, semana: 1, focus: 'Nominalizaciones + Partículas modales + Konjunktiv I (discurso indirecto) (repaso)', ruleIds: ['b2-16', 'b2-17', 'b2-01'], esClaseEnVivo: false, contenido: { reglas: [ base('b2-16'), base('b2-17'), base('b2-01') ] } },
    { day: 7, semana: 1, focus: 'Repaso semana 1: Konjunktiv I (discurso indirecto) + Konjunktiv II pasado + Comparaciones y consecuencias irreales', ruleIds: ['b2-01', 'b2-02', 'b2-03'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-01', NOTA_REPASO1), repaso('b2-02', NOTA_REPASO1), repaso('b2-03', NOTA_REPASO1) ] } },

    { day: 8, semana: 2, focus: 'Repaso: Pasiva con agente (von/durch) + Pasiva con verbos modales + Passivsätze ohne Subjekt', ruleIds: ['b2-04', 'b2-05', 'b2-06'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-04', NOTA_REPASO1), repaso('b2-05', NOTA_REPASO1), repaso('b2-06', NOTA_REPASO1) ] } },
    { day: 9, semana: 2, focus: 'Repaso: Partizip I como adjetivo + Partizip II como adjetivo + Futur II', ruleIds: ['b2-07', 'b2-08', 'b2-09'], esClaseEnVivo: true, contenido: { reglas: [ repaso('b2-07', NOTA_REPASO1), repaso('b2-08', NOTA_REPASO1), repaso('b2-09', NOTA_REPASO1) ] } },
    { day: 10, semana: 2, focus: 'Repaso: Finalidad y contraste con infinitivo + Concesión y adversación + Konsekutive Nebensätze', ruleIds: ['b2-10', 'b2-11', 'b2-12'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-10', NOTA_REPASO1), repaso('b2-11', NOTA_REPASO1), repaso('b2-12', NOTA_REPASO1) ] } },
    { day: 11, semana: 2, focus: 'Repaso: Relativsätze im Genitiv + Relativpronomen mit was/wo(r)- + Conectores de dos partes', ruleIds: ['b2-13', 'b2-14', 'b2-15'], esClaseEnVivo: true, contenido: { reglas: [ repaso('b2-13', NOTA_REPASO1), repaso('b2-14', NOTA_REPASO1), repaso('b2-15', NOTA_REPASO1) ] } },
    { day: 12, semana: 2, focus: 'Repaso: Nominalizaciones + Partículas modales + Konjunktiv I (discurso indirecto)', ruleIds: ['b2-16', 'b2-17', 'b2-01'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-16', NOTA_REPASO1), repaso('b2-17', NOTA_REPASO1), repaso('b2-01', NOTA_REPASO1) ] } },
    { day: 13, semana: 2, focus: 'Repaso: Konjunktiv II pasado + Comparaciones y consecuencias irreales + Pasiva con agente (von/durch)', ruleIds: ['b2-02', 'b2-03', 'b2-04'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-02', NOTA_REPASO1), repaso('b2-03', NOTA_REPASO1), repaso('b2-04', NOTA_REPASO1) ] } },
    { day: 14, semana: 2, focus: 'Repaso semana 2: Pasiva con verbos modales + Passivsätze ohne Subjekt + Partizip I como adjetivo', ruleIds: ['b2-05', 'b2-06', 'b2-07'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-05', NOTA_REPASO1), repaso('b2-06', NOTA_REPASO1), repaso('b2-07', NOTA_REPASO1) ] } },

    { day: 15, semana: 3, focus: 'Partizip II como adjetivo + Futur II + Finalidad y contraste con infinitivo', ruleIds: ['b2-08', 'b2-09', 'b2-10'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-08', NOTA_LIBRE), repaso('b2-09', NOTA_LIBRE), repaso('b2-10', NOTA_LIBRE) ] } },
    { day: 16, semana: 3, focus: 'Concesión y adversación + Konsekutive Nebensätze + Relativsätze im Genitiv', ruleIds: ['b2-11', 'b2-12', 'b2-13'], esClaseEnVivo: true, contenido: { reglas: [ repaso('b2-11', NOTA_LIBRE), repaso('b2-12', NOTA_LIBRE), repaso('b2-13', NOTA_LIBRE) ] } },
    { day: 17, semana: 3, focus: 'Relativpronomen mit was/wo(r)- + Conectores de dos partes + Nominalizaciones', ruleIds: ['b2-14', 'b2-15', 'b2-16'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-14', NOTA_LIBRE), repaso('b2-15', NOTA_LIBRE), repaso('b2-16', NOTA_LIBRE) ] } },
    { day: 18, semana: 3, focus: 'Partículas modales + Konjunktiv I (discurso indirecto) + Konjunktiv II pasado', ruleIds: ['b2-17', 'b2-01', 'b2-02'], esClaseEnVivo: true, contenido: { reglas: [ repaso('b2-17', NOTA_LIBRE), repaso('b2-01', NOTA_LIBRE), repaso('b2-02', NOTA_LIBRE) ] } },
    { day: 19, semana: 3, focus: 'Comparaciones y consecuencias irreales + Pasiva con agente (von/durch) + Pasiva con verbos modales', ruleIds: ['b2-03', 'b2-04', 'b2-05'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-03', NOTA_LIBRE), repaso('b2-04', NOTA_LIBRE), repaso('b2-05', NOTA_LIBRE) ] } },
    { day: 20, semana: 3, focus: 'Passivsätze ohne Subjekt + Partizip I como adjetivo + Partizip II como adjetivo', ruleIds: ['b2-06', 'b2-07', 'b2-08'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-06', NOTA_LIBRE), repaso('b2-07', NOTA_LIBRE), repaso('b2-08', NOTA_LIBRE) ] } },
    { day: 21, semana: 3, focus: 'Repaso semana 3: Futur II + Finalidad y contraste con infinitivo + Concesión y adversación', ruleIds: ['b2-09', 'b2-10', 'b2-11'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-09', NOTA_LIBRE), repaso('b2-10', NOTA_LIBRE), repaso('b2-11', NOTA_LIBRE) ] } },

    { day: 22, semana: 4, focus: 'Konsekutive Nebensätze + Relativsätze im Genitiv + Relativpronomen mit was/wo(r)-', ruleIds: ['b2-12', 'b2-13', 'b2-14'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-12', NOTA_FINAL), repaso('b2-13', NOTA_FINAL), repaso('b2-14', NOTA_FINAL) ] } },
    { day: 23, semana: 4, focus: 'Conectores de dos partes + Nominalizaciones + Partículas modales', ruleIds: ['b2-15', 'b2-16', 'b2-17'], esClaseEnVivo: true, contenido: { reglas: [ repaso('b2-15', NOTA_FINAL), repaso('b2-16', NOTA_FINAL), repaso('b2-17', NOTA_FINAL) ] } },
    { day: 24, semana: 4, focus: 'Konjunktiv I (discurso indirecto) + Konjunktiv II pasado + Comparaciones y consecuencias irreales', ruleIds: ['b2-01', 'b2-02', 'b2-03'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-01', NOTA_FINAL), repaso('b2-02', NOTA_FINAL), repaso('b2-03', NOTA_FINAL) ] } },
    { day: 25, semana: 4, focus: 'Pasiva con agente (von/durch) + Pasiva con verbos modales + Passivsätze ohne Subjekt', ruleIds: ['b2-04', 'b2-05', 'b2-06'], esClaseEnVivo: true, contenido: { reglas: [ repaso('b2-04', NOTA_FINAL), repaso('b2-05', NOTA_FINAL), repaso('b2-06', NOTA_FINAL) ] } },
    { day: 26, semana: 4, focus: 'Partizip I como adjetivo + Partizip II como adjetivo + Futur II', ruleIds: ['b2-07', 'b2-08', 'b2-09'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-07', NOTA_FINAL), repaso('b2-08', NOTA_FINAL), repaso('b2-09', NOTA_FINAL) ] } },
    { day: 27, semana: 4, focus: 'Finalidad y contraste con infinitivo + Concesión y adversación + Konsekutive Nebensätze', ruleIds: ['b2-10', 'b2-11', 'b2-12'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-10', NOTA_FINAL), repaso('b2-11', NOTA_FINAL), repaso('b2-12', NOTA_FINAL) ] } },
    { day: 28, semana: 4, focus: 'Relativsätze im Genitiv + Relativpronomen mit was/wo(r)- + Conectores de dos partes', ruleIds: ['b2-13', 'b2-14', 'b2-15'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-13', NOTA_FINAL), repaso('b2-14', NOTA_FINAL), repaso('b2-15', NOTA_FINAL) ] } },
    { day: 29, semana: 4, focus: 'Simulacro final (1/2): escritura evaluada + repaso ligero', ruleIds: ['b2-16', 'b2-17'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-16', NOTA_SIMULACRO), repaso('b2-17', NOTA_SIMULACRO) ] } },
    { day: 30, semana: 4, focus: 'Simulacro final (2/2): mündliche evaluada, los Teile reales del examen', ruleIds: ['b2-01', 'b2-02'], esClaseEnVivo: false, contenido: { reglas: [ repaso('b2-01', NOTA_SIMULACRO), repaso('b2-02', NOTA_SIMULACRO) ] } }
  ];
})();
