window.TEACHER_CLASES = {
  b1: [
    {
      day: 1,
      semana: 1,
      focus: 'Präteritum + Konjunktiv II + oraciones de relativo',
      ruleIds: ['b1-01', 'b1-02', 'b1-03'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-01',
            intro: 'El Präteritum es el pasado propio de textos escritos (novelas, cuentos, noticias, cartas formales) — el equivalente narrativo de nuestro pretérito indefinido español, pero con una diferencia clave: en alemán HABLADO casi nadie lo usa, excepto con sein, haben y los verbos modales. Para el resto del pasado oral, los alumnos ya conocen el Perfekt; hoy añaden el registro escrito.',
            practica: [
              { incorrecto: 'Ich habe gearbeitet den ganzen Tag, wie ein Roman erzählt würde.', correcto: 'Ich arbeitete den ganzen Tag.' },
              { incorrecto: 'Er hat nach Berlin gefahren.', correcto: 'Er fuhr nach Berlin.' },
              { incorrecto: 'Wir haben gemusst warten.', correcto: 'Wir mussten warten.' }
            ],
            pasos: [
              { titulo: '🟦 1. ¿Para qué sirve?', texto: 'Es el pasado de la lengua escrita: novelas, cuentos, noticias, cartas formales. En una conversación normal casi no aparece — salvo con sein, haben y los modales, donde SÍ es lo natural incluso hablando: "Ich war", "Er hatte", "Sie musste".' },
              {
                titulo: '🟩 2. Verbos regulares',
                texto: 'Raíz + -te (+ terminación de persona). Igual de mecánico que añadir "-é/-aste" en español.',
                tabla: { headers: ['', 'lernen', 'arbeiten', 'spielen'], rows: [['ich/er', 'lernte', 'arbeitete', 'spielte'], ['du', 'lerntest', 'arbeitetest', 'spieltest'], ['wir/sie', 'lernten', 'arbeiteten', 'spielten'], ['ihr', 'lerntet', 'arbeitetet', 'spieltet']] }
              },
              {
                titulo: '🟧 3. Verbos irregulares (fuertes) y modales',
                texto: 'Cambian la vocal de la raíz — no hay truco, se memorizan en listas, igual que un verbo irregular en español (fahren→fuhr, schreiben→schrieb, sprechen→sprach). 1.ª y 3.ª persona singular no llevan terminación.',
                tabla: { headers: ['', 'fahren', 'müssen', 'haben', 'sein'], rows: [['ich/er', 'fuhr', 'musste', 'hatte', 'war'], ['du', 'fuhrst', 'musstest', 'hattest', 'warst'], ['wir/sie', 'fuhren', 'mussten', 'hatten', 'waren'], ['ihr', 'fuhrt', 'musstet', 'hattet', 'wart']] }
              },
              {
                titulo: '🟨 4. Regla práctica Perfekt vs. Präteritum',
                texto: 'En clase, dales esta regla simple: "Si hablas, usa Perfekt (ich habe gearbeitet); si escribes o hablas de sein/haben/modales, usa Präteritum (ich war, ich hatte, ich musste)." Es la distinción que más rápido internalizan.'
              }
            ],
            resumen: 'El Präteritum es el pasado de la lengua escrita. Regulares: raíz + -te (lernte). Irregulares: cambio vocálico que hay que memorizar (fuhr, schrieb). En el habla diaria solo se usa con sein/haben/modales (war, hatte, musste); el resto del pasado hablado sigue siendo Perfekt.'
          },
          {
            ruleId: 'b1-02',
            intro: 'El Konjunktiv II es el modo de lo hipotético, lo deseado y lo cortés — como nuestro condicional e imperfecto de subjuntivo combinados ("me gustaría", "si tuviera tiempo, viajaría"). Su gran ventaja para B1 es que tiene un comodín universal: "würde + Infinitivo" funciona con casi cualquier verbo, así que no hace falta memorizar formas nuevas para empezar a usarlo.',
            practica: [
              { incorrecto: 'Ich möchte gern mitfahren wenn ich Zeit habe würde.', correcto: 'Ich würde gern mitfahren, wenn ich Zeit hätte.' },
              { incorrecto: 'Er würde sein müde.', correcto: 'Er wäre müde.' },
              { incorrecto: 'Kannst du mir helfen? (para pedir de forma cortés)', correcto: 'Könntest du mir helfen?' }
            ],
            pasos: [
              { titulo: '🟦 1. ¿Para qué sirve?', texto: 'Tres usos: hipótesis irreales ("si tuviera tiempo…"), deseos ("me encantaría…") y peticiones/consejos corteses ("¿podrías…?", "yo en tu lugar…").' },
              { titulo: '🟩 2. El comodín: würde + Infinitivo', texto: 'Para la gran mayoría de los verbos, basta con conjugar "würde" (ich würde, du würdest, er würde, wir würden…) y añadir el infinitivo al final: "Ich würde gern reisen." Es el recurso que deben usar por defecto.' },
              {
                titulo: '🟧 4. Excepción: verbos con forma propia',
                texto: 'sein, haben y los modales NO usan würde — tienen su propia forma de Konjunktiv II, derivada del Präteritum con umlaut cuando es posible. Suenan más naturales y elegantes que "würde sein/haben/können".',
                tabla: { headers: ['Verbo', 'Konj. II'], rows: [['sein', 'wäre'], ['haben', 'hätte'], ['können', 'könnte'], ['müssen', 'müsste'], ['sollen', 'sollte'], ['dürfen', 'dürfte'], ['mögen', 'möchte']] }
              },
              { titulo: '🟨 5. Cortesía formal', texto: '"Könnten Sie…?", "Würden Sie…?", "Dürfte ich…?" son el equivalente alemán de nuestro "¿Podría usted…?". Muy útil para practicar diálogos formales (hotel, oficina, tienda).' }
            ],
            resumen: 'El Konjunktiv II expresa hipótesis, deseos y cortesía. Por defecto se usa "würde + Infinitivo" (comodín universal); pero sein, haben y los modales tienen forma propia y más natural: wäre, hätte, könnte, müsste, sollte, dürfte, möchte.'
          },
          {
            ruleId: 'b1-03',
            intro: 'Las oraciones de relativo añaden información sobre un sustantivo ya mencionado — "el hombre QUE vive allí", "el libro CUYO autor conozco". La dificultad en alemán no es el concepto (idéntico al español) sino que el pronombre relativo debe llevar el caso correcto según su función dentro de la subordinada, y el verbo se va al final.',
            practica: [
              { incorrecto: 'Das ist der Mann, den dort wohnt.', correcto: 'Das ist der Mann, der dort wohnt.' },
              { incorrecto: 'Ich kenne die Frau, die du meinst sie.', correcto: 'Ich kenne die Frau, die du meinst.' },
              { incorrecto: 'Der Mann, der ich helfe, ist nett.', correcto: 'Der Mann, dem ich helfe, ist nett.' }
            ],
            pasos: [
              { titulo: '🟦 1. Concuerda con el antecedente, pero...', texto: 'El pronombre relativo copia género y número del sustantivo al que se refiere (der Mann → masc. sing.), pero el CASO depende de qué función cumple dentro de su propia oración, no de la principal.' },
              {
                titulo: '🟩 2. Casi iguales al artículo definido',
                texto: 'La buena noticia: los pronombres relativos son casi idénticos a der/die/das. Solo 3 formas cambian.',
                tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'der', 'die', 'das', 'die'], ['Akk.', 'den', 'die', 'das', 'die'], ['Dat.', 'dem', 'der', 'dem', 'denen ⚠️'], ['Gen.', 'dessen ⚠️', 'deren ⚠️', 'dessen ⚠️', 'deren ⚠️']] }
              },
              { titulo: '🟧 3. Pregunta clave para elegir el caso', texto: 'Dentro de la subordinada: ¿el relativo es sujeto? → Nominativo. ¿objeto directo? → Acusativo. ¿objeto indirecto? → Dativo. ¿posesión ("cuyo")? → Genitivo (dessen/deren).' },
              { titulo: '🟨 4. Verbo al final y coma obligatoria', texto: 'Como cualquier subordinada alemana, el verbo conjugado va al final del bloque relativo, y la relativa siempre se separa con comas: "..., der dort WOHNT."' },
              { titulo: '🟪 5. Ejemplo con las 4 formas', texto: 'Nom.: Das ist der Mann, der dort wohnt. Akus.: Ich kenne die Frau, die du meinst. Dat.: Der Mann, dem ich helfe, ist nett. Gen.: Das ist das Buch, dessen Autor ich kenne.' }
            ],
            resumen: 'El pronombre relativo copia género/número del antecedente pero toma el caso según su función en la subordinada (sujeto→Nom., objeto directo→Akk., objeto indirecto→Dat., posesión→Gen.). Es casi igual al artículo definido, salvo dativo plural "denen" y genitivo "dessen/deren". El verbo va siempre al final.'
          }
        ]
      }
    },
    {
      day: 2,
      semana: 1,
      focus: 'Genitivo + declinación de adjetivos + conectores subordinantes',
      ruleIds: ['b1-04', 'b1-05', 'b1-06'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-04',
            intro: 'El genitivo expresa posesión: "el coche del hombre". En el alemán hablado esto casi siempre se dice con "von + Dativo" ("das Auto von dem Mann"), pero en textos formales y detrás de ciertas preposiciones (wegen, trotz, während, statt) se espera el genitivo real.',
            practica: [
              { incorrecto: 'Das ist das Auto der Mann.', correcto: 'Das ist das Auto des Mannes.' },
              { incorrecto: 'Wegen der Regen bleibe ich zu Hause.', correcto: 'Wegen des Regens bleibe ich zu Hause.' },
              { incorrecto: 'Trotz das schlechte Wetter gingen wir raus.', correcto: 'Trotz des schlechten Wetters gingen wir raus.' }
            ],
            pasos: [
              { titulo: '🟦 1. ¿Cuándo se usa?', texto: 'Para posesión ("el coche DEL hombre") y detrás de un grupo fijo de preposiciones: wegen, trotz, während, statt, innerhalb, außerhalb, aufgrund.' },
              {
                titulo: '🟩 2. Formación',
                texto: 'Masculino y neutro: artículo des + sustantivo con -s/-es. Femenino y plural: artículo der, el sustantivo no cambia.',
                tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Art. def.', 'des', 'der', 'des', 'der'], ['Sustantivo', '+(-e)s', 'sin cambio', '+(-e)s', 'sin cambio']] }
              },
              {
                titulo: '🟧 3. Alternativa coloquial',
                texto: 'En la calle casi nadie dice "des Mannes" — se dice "von dem Mann" (von + Dativo). El genitivo real se mantiene vivo sobre todo en escritura formal y tras las preposiciones fijas.'
              },
              {
                titulo: '🟨 4. Truco para memorizar',
                texto: 'Aprende "wegen, trotz, während, statt" como un bloque cerrado: son las 4 preposiciones de genitivo que sí se usan constantemente en el habla cotidiana, a diferencia del genitivo posesivo.'
              }
            ],
            resumen: 'El genitivo indica posesión o va detrás de wegen/trotz/während/statt. Artículo des (masc./neutro) + sustantivo con -s/-es; artículo der (fem./plural) sin cambios. En la calle se reemplaza por "von + Dativo".'
          },
          {
            ruleId: 'b1-05',
            intro: 'En español el adjetivo antes del sustantivo no cambia de forma según el caso ("el coche nuevo", "del coche nuevo"). En alemán, en cambio, la terminación del adjetivo varía según qué artículo lo acompaña.',
            practica: [
              { incorrecto: 'Ich habe ein neu Auto gekauft.', correcto: 'Ich habe ein neues Auto gekauft.' },
              { incorrecto: 'Der alte Mann trinkt ein kalt Bier.', correcto: 'Der alte Mann trinkt ein kaltes Bier.' },
              { incorrecto: 'Mit frisches Brot schmeckt es besser.', correcto: 'Mit frischem Brot schmeckt es besser.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Tres declinaciones posibles',
                texto: 'Débil (tras der/die/das): el artículo ya da toda la información, el adjetivo solo lleva -e o -en. Mixta (tras ein/kein/mein…): el adjetivo compensa donde el artículo no marca el caso. Fuerte (sin artículo): el adjetivo hace todo el trabajo del artículo.'
              },
              {
                titulo: '🟩 2. Por dónde empezar',
                texto: 'Practica primero solo con artículo definido (der alte Mann, die alte Frau, das alte Kind) — es la más fácil, solo -e/-en. Introduce indefinido y "sin artículo" después.'
              },
              {
                titulo: '🟧 3. Tabla de terminaciones',
                texto: 'Nominativo, comparando los tres casos:',
                tabla: {
                  headers: ['', 'Masc. Nom.', 'Masc. Akk.', 'Fem. Nom.', 'Neutro Nom.'],
                  rows: [['Def. (der/die/das)', '-e', '-en', '-e', '-e'], ['Indef. (ein/kein)', '-er', '-en', '-e', '-es'], ['Sin artículo', '-er', '-en', '-e', '-es']]
                }
              },
              {
                titulo: '🟨 4. Truco',
                texto: 'Sin artículo, el adjetivo copia la terminación del artículo definido: der→-er, dem→-em, den→-en, des→-en. Si ya saben el artículo definido, "sin artículo" es casi gratis.'
              }
            ],
            resumen: 'La terminación del adjetivo depende del artículo: con der/die/das es simple (-e/-en); con ein/kein es mixta; sin artículo el adjetivo "hace de artículo" (mismas terminaciones que der/die/das).'
          },
          {
            ruleId: 'b1-06',
            intro: 'En español el verbo no se mueve dentro de la oración subordinada ("porque tengo un examen"). En alemán, conectores como weil, dass, obwohl, wenn, als, bevor y nachdem mandan el verbo conjugado al final de su bloque.',
            practica: [
              { incorrecto: 'Ich lerne, weil ich habe eine Prüfung.', correcto: 'Ich lerne, weil ich eine Prüfung habe.' },
              { incorrecto: 'Als ich war jung, ich lebte in Berlin.', correcto: 'Als ich jung war, lebte ich in Berlin.' },
              { incorrecto: 'Wenn es regnet, ich bleibe zu Hause.', correcto: 'Wenn es regnet, bleibe ich zu Hause.' }
            ],
            pasos: [
              { titulo: '🟦 1. El verbo va al final', texto: 'Dentro del bloque introducido por el conector, el verbo conjugado siempre se coloca al final: "..., weil ich eine Prüfung HABE."' },
              {
                titulo: '🟩 2. Si la subordinada va primero',
                texto: 'La oración principal empieza directamente con el verbo (se mantiene la regla V2 de toda la oración): "Weil ich eine Prüfung habe, LERNE ich." — no "ich lerne".'
              },
              {
                titulo: '🟧 3. Tabla de conectores',
                texto: '',
                tabla: {
                  headers: ['Conector', 'Significado', 'Uso'],
                  rows: [
                    ['weil / da', 'porque', 'causa'],
                    ['dass', 'que', 'contenido indirecto'],
                    ['obwohl', 'aunque', 'concesión'],
                    ['wenn', 'cuando / si', 'condición o hábito'],
                    ['als', 'cuando', 'momento único pasado'],
                    ['bevor', 'antes de que', 'temporal'],
                    ['nachdem', 'después de que', 'temporal']
                  ]
                }
              },
              {
                titulo: '🟨 4. Wenn vs. als',
                texto: 'Español no distingue: ambos son "cuando". "Wenn" = condición o algo que se repite (en cualquier tiempo); "als" = un momento único y concreto en el pasado. Es el error más frecuente en B1.'
              }
            ],
            resumen: 'El verbo conjugado va al final de la subordinada. Si esta va primero, la principal arranca directo con el verbo. Ojo con wenn (condición/hábito) vs. als (momento único en pasado) — en español ambos son "cuando".'
          }
        ]
      }
    },
    {
      day: 3,
      semana: 1,
      focus: 'Verbos con preposición fija + infinitivo con zu + pasiva básica',
      ruleIds: ['b1-07', 'b1-08', 'b1-09'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-07',
            intro: 'En español muchos verbos van con la preposición "lógica" (esperar A, pensar EN, hablar DE/SOBRE), pero en alemán cada verbo exige una preposición fija y un caso concretos que no siempre coinciden con el español: "warten AUF" (no "warten für"), "denken AN" (no "denken über"), "sich freuen AUF/ÜBER". Hay que aprenderlos como bloques, verbo + preposición + caso, igual que se aprende una palabra nueva.',
            practica: [
              { incorrecto: 'Ich warte für den Bus.', correcto: 'Ich warte auf den Bus.' },
              { incorrecto: 'Sie denkt über ihre Familie.', correcto: 'Sie denkt an ihre Familie.' },
              { incorrecto: 'Ich freue mich für die Ferien.', correcto: 'Ich freue mich auf die Ferien.' }
            ],
            pasos: [
              { titulo: '🟦 1. El verbo trae su preposición pegada', texto: 'No traduzcas la preposición del español: cada verbo alemán "elige" la suya y hay que memorizarla junto con el verbo, no por separado. "Warten" siempre va con "auf", nunca con "für".' },
              {
                titulo: '🟩 2. Verbos más frecuentes en B1',
                texto: 'Estos seis cubren la mayoría de casos en el examen:',
                tabla: { headers: ['Verbo', 'Prep. + Caso', 'Ejemplo'], rows: [['warten', 'auf + Akk.', 'Ich warte auf den Bus.'], ['denken', 'an + Akk.', 'Sie denkt an ihre Familie.'], ['sprechen', 'über + Akk.', 'Wir sprechen über das Problem.'], ['sich freuen', 'auf/über + Akk.', 'Ich freue mich auf die Reise.'], ['sich erinnern', 'an + Akk.', 'Ich erinnere mich an ihn.'], ['sich kümmern', 'um + Akk.', 'Sie kümmert sich um die Kinder.']] }
              },
              {
                titulo: '🟧 3. Sustituir la parte de la preposición',
                texto: 'Para cosas/ideas se usa da(r)+preposición: "darauf", "daran", "darüber" ("Ich warte darauf" = espero eso). Para personas se usa preposición + pronombre normal: "auf ihn", "an sie" ("Ich warte auf ihn" = lo espero a él). Nunca se dice "darauf" refiriéndose a una persona.'
              },
              {
                titulo: '🟨 4. Truco para memorizar',
                texto: 'Aprende cada verbo con mayúscula en la preposición como si fuera parte del verbo: "warten AUF", "sich freuen AUF/ÜBER", "sich erinnern AN". Este mismo bloque reaparecerá en el día de hoy para formar oraciones de relativo con preposición.'
              }
            ],
            resumen: 'Cada verbo alemán exige una preposición y un caso fijos que hay que memorizar junto con el verbo (warten AUF, denken AN, sprechen ÜBER, sich freuen AUF/ÜBER, sich erinnern AN, sich kümmern UM). Para cosas: da(r)+prep. (darauf, daran). Para personas: prep.+pronombre (auf ihn, an sie).'
          },
          {
            ruleId: 'b1-08',
            intro: 'En español el infinitivo simplemente se pega detrás de ciertos verbos ("intento SER puntual", "deja de FUMAR"). En alemán, entre el verbo principal y el infinitivo se intercala la partícula "zu": "versuchen, pünktlich ZU sein", "aufhören ZU rauchen". Con verbos separables, el "zu" se cuela literalmente dentro del verbo, entre el prefijo y la raíz.',
            practica: [
              { incorrecto: 'Ich versuche pünktlich sein.', correcto: 'Ich versuche, pünktlich zu sein.' },
              { incorrecto: 'Er hört rauchen auf.', correcto: 'Er hört auf zu rauchen.' },
              { incorrecto: 'Sie hat keine Zeit, mich zu anrufen.', correcto: 'Sie hat keine Zeit, mich anzurufen.' }
            ],
            pasos: [
              { titulo: '🟦 1. ¿Cuándo aparece "zu"?', texto: 'Detrás de muchos verbos (versuchen, aufhören, vergessen, vorhaben, anfangen), de adjetivos con "es ist" (es ist wichtig, ZU essen…) y de sustantivos como "die Zeit, ZU + Inf.": "Ich habe keine Zeit, zu kommen."' },
              {
                titulo: '🟩 2. Con verbos separables: el zu se cuela dentro',
                texto: 'El prefijo separable y la raíz se separan y el "zu" se inserta justo en medio: auf|zu|hören (aufzuhören), ein|zu|kaufen (einzukaufen), an|zu|rufen (anzurufen). Es un solo bloque escrito sin espacios.'
              },
              {
                titulo: '🟧 3. Excepción importante: los que NO llevan zu',
                texto: 'Un grupo cerrado de verbos va con infinitivo directo, sin "zu": los modales (muss gehen, kann kommen), y además lassen, sehen, hören, fühlen ("Ich lasse das Auto reparieren", "Ich sehe ihn kommen"). Este grupo se retomará más adelante como contraste directo con esta regla.'
              },
              {
                titulo: '🟨 4. Truco para memorizar',
                texto: 'Piensa en el "zu" como si "abriera" el verbo separable por su costura: auf|zu|hören. Practica primero con los cuatro verbos más frecuentes del B1: anfangen, aufhören, versuchen, vorhaben — todos siempre llevan zu, y ninguno es separable en su forma "zu", salvo aufhören/anfangen que sí lo son.'
              }
            ],
            resumen: 'zu + infinitivo va detrás de verbos como versuchen/aufhören/vorhaben, de "es ist + adjetivo" y de sustantivos como "die Zeit". Con verbos separables el zu se cuela dentro: auf|zu|hören → aufzuhören. NO llevan zu: modales, lassen, sehen, hören, fühlen (infinitivo directo).'
          },
          {
            ruleId: 'b1-09',
            intro: 'En español la pasiva se forma con "ser + participio" ("la casa ES construida"). En alemán se usa "werden" (conjugado) + Partizip II al final de la frase: "Das Haus WIRD gebaut". El foco pasa del agente (quién hace la acción) al proceso o resultado; el agente, si se menciona, va con "von + Dativo" y muchas veces se omite directamente.',
            practica: [
              { incorrecto: 'Das Haus ist gebaut.', correcto: 'Das Haus wird gebaut.' },
              { incorrecto: 'Das Buch wird geschrieben von ihm letztes Jahr.', correcto: 'Das Buch wurde letztes Jahr von ihm geschrieben.' },
              { incorrecto: 'Der Brief ist geschrieben geworden.', correcto: 'Der Brief ist geschrieben worden.' }
            ],
            pasos: [
              { titulo: '🟦 1. Estructura base', texto: '"werden" conjugado en el tiempo que se necesite + Partizip II al final del bloque. El agente es opcional: "von + Dativo" (Der Brief wird VON IHM geschrieben) — en alemán se omite con más frecuencia que en español.' },
              {
                titulo: '🟩 2. Werden en cada tiempo',
                texto: 'Solo cambia la forma de "werden"; el Partizip II se queda fijo al final:',
                tabla: { headers: ['Tiempo', 'Estructura', 'Ejemplo'], rows: [['Präsens', 'wird + P.II', 'Das Haus wird gebaut.'], ['Präteritum', 'wurde + P.II', 'Das Haus wurde gebaut.'], ['Perfekt', 'ist + P.II + worden', 'Das Haus ist gebaut worden.']] }
              },
              {
                titulo: '🟧 3. La trampa del Perfekt: "worden" sin ge-',
                texto: 'En Perfekt de pasiva se usa "ist … worden", NUNCA "ist … geworden". "Geworden" es el Partizip II de "werden" como verbo pleno (convertirse en algo): "Sie ist Ärztin geworden" (se hizo médica) es una frase completamente distinta a "Der Brief ist geschrieben worden" (la carta fue escrita). Este es el error más frecuente de esta regla en B1.'
              },
              {
                titulo: '🟨 4. Truco para reconocer la pasiva',
                texto: 'Pregúntate: ¿qué va después de "werden"? Si es un Partizip II describiendo una acción que "se le hace" al sujeto → pasiva. Compara con el uso de "werden" como futuro (+ infinitivo: "ich werde anrufen") o como verbo pleno (+ nombre/adjetivo: "sie wird Ärztin"): la clave está siempre en lo que sigue a "werden".'
              }
            ],
            resumen: 'Pasiva = werden (conjugado) + Partizip II al final; el agente opcional va con "von + Dativo". Präsens: wird + P.II. Präteritum: wurde + P.II. Perfekt: ist + P.II + worden (sin ge- — "geworden" es otra cosa: el Partizip II de werden como verbo pleno).'
          }
        ]
      }
    },
    {
      day: 4,
      semana: 1,
      focus: 'Futuro + Plusquamperfekt + wenn vs. als',
      ruleIds: ['b1-10', 'b1-11', 'b1-12'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-10',
            intro: 'En español el futuro es una conjugación propia ("trabajaré"). En alemán, para planes cotidianos casi nunca se usa "werden + Infinitivo" — se prefiere el Präsens con un marcador temporal (morgen, bald, nächste Woche). "Werden" se reserva para predicciones, promesas o suposiciones.',
            practica: [
              { incorrecto: 'Ich werde morgen arbeite.', correcto: 'Ich werde morgen arbeiten.' },
              { incorrecto: 'Morgen ich fahre nach München.', correcto: 'Morgen fahre ich nach München.' },
              { incorrecto: 'Er wird schon zu Hause.', correcto: 'Er wird schon zu Hause sein.' }
            ],
            pasos: [
              { titulo: '🟦 1. Dos formas de futuro', texto: '"Werden + Infinitivo" (predicciones, promesas solemnes) y "Präsens + marcador temporal" (planes concretos, más natural en el habla cotidiana).' },
              {
                titulo: '🟩 2. Cuándo usar cada una',
                texto: '',
                tabla: {
                  headers: ['Situación', 'Forma', 'Ejemplo'],
                  rows: [
                    ['Plan concreto', 'Präsens + marcador', 'Morgen fahre ich nach München.'],
                    ['Predicción', 'werden + Inf.', 'Es wird regnen.'],
                    ['Suposición sobre el presente', 'werden + Inf. + schon/wohl', 'Er wird schon zu Hause sein.']
                  ]
                }
              },
              {
                titulo: '🟧 3. Uso especial: suposición',
                texto: '"Werden + Inf." también sirve para suponer algo sobre el presente, no solo el futuro: "Das wird teuer sein" = "Eso debe de ser caro". Suele ir acompañado de "schon" o "wohl".'
              },
              { titulo: '🟨 4. Truco', texto: 'Para hablar de planes propios (lo más frecuente en clase), usa presente + marcador temporal. Reserva "werden" para cuando realmente quieras predecir o suponer algo.' }
            ],
            resumen: 'Para planes usa Präsens + marcador temporal (morgen, bald…) — es lo más natural. "Werden + Infinitivo" es para predicciones, promesas o suposiciones (a menudo con schon/wohl).'
          },
          {
            ruleId: 'b1-11',
            intro: 'El pluscuamperfecto también existe en español ("había comido"), así que la idea es intuitiva. La dificultad en alemán está en elegir el auxiliar correcto (hatte o war) y en el orden de palabras dentro de la subordinada.',
            practica: [
              { incorrecto: 'Nachdem ich hatte gegessen, ging ich ins Bett.', correcto: 'Nachdem ich gegessen hatte, ging ich ins Bett.' },
              { incorrecto: 'Sie hatte schon weggefahren, als ich ankam.', correcto: 'Sie war schon weggefahren, als ich ankam.' },
              { incorrecto: 'Wir haben das Buch schon gelesen gehabt.', correcto: 'Wir hatten das Buch schon gelesen.' }
            ],
            pasos: [
              { titulo: '🟦 1. Qué es', texto: 'El "pasado del pasado": una acción que ya había terminado antes de que ocurriera otra acción pasada.' },
              {
                titulo: '🟩 2. Formación',
                texto: 'Igual que el Perfekt, pero con el auxiliar en Präteritum en vez de Präsens: hatte/war + Partizip II.',
                tabla: { headers: ['', 'mit haben', 'mit sein'], rows: [['ich/er', 'hatte gelernt', 'war gefahren'], ['du', 'hattest gelernt', 'warst gefahren'], ['wir/sie', 'hatten gelernt', 'waren gefahren']] }
              },
              {
                titulo: '🟧 3. El auxiliar no cambia',
                texto: 'Se usa el mismo verbo auxiliar que en el Perfekt de ese verbo: si "fahren" hace su Perfekt con sein (ist gefahren), su Plusquamperfekt también usa war (war gefahren).'
              },
              {
                titulo: '🟨 4. Casi siempre con "nachdem"',
                texto: 'Aparece muy frecuentemente junto al conector "nachdem" (visto el martes en b1-06), que exige que la subordinada sea anterior a la principal: primero Plusquamperfekt, después Präteritum.'
              }
            ],
            resumen: 'El Plusquamperfekt es "un paso más atrás" que el Präteritum: si la frase principal ya está en pasado, la acción anterior necesita hatte/war + Partizip II — casi siempre con "nachdem".'
          },
          {
            ruleId: 'b1-12',
            intro: 'Esta clase amplía lo visto el martes con "wenn" y "als" (b1-06): el criterio real no es el tiempo verbal, sino si el evento fue único o repetido. Es la trampa más frecuente en B1 para hispanohablantes.',
            practica: [
              { incorrecto: 'Als ich Kind war, spielte ich jeden Tag draußen.', correcto: 'Wenn ich Kind war, spielte ich jeden Tag draußen.' },
              { incorrecto: 'Wenn ich sie kennenlernte, war ich 20.', correcto: 'Als ich sie kennenlernte, war ich 20.' },
              { incorrecto: 'Immer als es regnete, blieben wir zu Hause.', correcto: 'Immer wenn es regnete, blieben wir zu Hause.' }
            ],
            pasos: [
              { titulo: '🟦 1. El criterio real', texto: 'No es si la frase está en pasado o no — es si el evento fue único e irrepetible, o si se repitió / es una condición.' },
              { titulo: '🟩 2. Als = evento único en pasado', texto: '"Als ich sie kennenlernte…" — el día en que la conoció, ocurrió una sola vez.' },
              {
                titulo: '🟧 3. Wenn = condición o repetición',
                texto: 'Cubre condiciones en cualquier tiempo y acciones repetidas, incluso en pasado.',
                tabla: {
                  headers: ['Situación', 'Conector', 'Ejemplo'],
                  rows: [
                    ['Condición (presente/futuro)', 'wenn', 'Wenn es regnet, bleibe ich zu Hause.'],
                    ['Repetición en pasado', 'wenn', 'Wenn ich Kind war, spielte ich viel.'],
                    ['Momento único en pasado', 'als', 'Als ich 18 war, zog ich um.']
                  ]
                }
              },
              { titulo: '🟨 4. Señal clara', texto: '"Immer wenn…" (siempre que…) nunca lleva "als" — si hay repetición explícita, es garantía de "wenn".' }
            ],
            resumen: 'La pregunta clave es: ¿pasó una sola vez en el pasado? → als. ¿Se repitió, o no es pasado? → wenn. "Immer wenn" es la señal más clara de que toca "wenn".'
          }
        ]
      }
    },
    {
      day: 5,
      semana: 1,
      focus: 'Preguntas indirectas + infinitivo sin zu + relativas con preposición',
      ruleIds: ['b1-13', 'b1-14', 'b1-15'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-13',
            intro: 'En español convertimos una pregunta en subordinada casi sin tocarla: "¿Viene?" → "No sé si viene". En alemán la operación es igual de sencilla en el fondo (se pregunta lo mismo dentro de otra frase), pero el verbo tiene que desplazarse al final, como en cualquier subordinada con weil/dass (b1-06). Si la pregunta original era de sí/no, se introduce con "ob"; si tenía una palabra interrogativa (was, wo, wann, warum…), esa misma palabra se conserva.',
            practica: [
              { incorrecto: 'Ich weiß nicht, ob kommt er.', correcto: 'Ich weiß nicht, ob er kommt.' },
              { incorrecto: 'Sag mir, wo wohnst du.', correcto: 'Sag mir, wo du wohnst.' },
              { incorrecto: 'Ich frage mich, wann beginnt der Kurs.', correcto: 'Ich frage mich, wann der Kurs beginnt.' }
            ],
            pasos: [
              { titulo: '🟦 1. Dos tipos de pregunta original', texto: 'Si la pregunta directa era de sí/no ("Kommt er?"), la indirecta se introduce con "ob". Si tenía W-Wort ("Wo wohnst du?"), se mantiene ese mismo W-Wort ("wo").' },
              { titulo: '🟩 2. El verbo va al final', texto: 'Como es una subordinada, el verbo conjugado se manda al final del bloque — igual que con weil/dass: "Ich weiß nicht, ob er KOMMT." No "ob kommt er".' },
              {
                titulo: '🟧 3. Tabla de transformación',
                texto: '',
                tabla: {
                  headers: ['Pregunta directa', 'Pregunta indirecta'],
                  rows: [
                    ['Kommt er?', 'Ich weiß nicht, ob er kommt.'],
                    ['Wo wohnst du?', 'Sag mir, wo du wohnst.'],
                    ['Wann beginnt der Kurs?', 'Ich frage mich, wann der Kurs beginnt.']
                  ]
                }
              },
              { titulo: '🟨 4. Fórmulas de cortesía típicas', texto: 'Las preguntas indirectas suenan más corteses o naturales dentro de frases como "Wissen Sie, ob/wo/wann…?", "Können Sie mir sagen, ob/wo/wann…?", "Ich frage mich, ob/wo/wann…". Son el contexto donde el alumno las va a usar en la vida real (pedir información en la calle, en una oficina).' },
              { titulo: '🟪 5. Error típico a vigilar', texto: 'El fallo casi universal en clase es dejar el verbo en 2ª posición como en la pregunta original: "ob kommt er" en vez de "ob er kommt". Corrígelo señalando siempre: "esto ya no es una pregunta, es una subordinada".' }
            ],
            resumen: 'Pregunta directa de sí/no → "ob + verbo al final". Pregunta con W-Wort → se mantiene el W-Wort + verbo al final. Nunca se deja el verbo en 2ª posición dentro de la indirecta.'
          },
          {
            ruleId: 'b1-14',
            intro: 'En b1-08 los alumnos aprendieron que muchos verbos exigen "zu" antes del infinitivo ("versuchen zu kommen"). Ahora toca el contraste: un grupo cerrado de verbos —modales, "lassen", los verbos de percepción sehen/hören/fühlen, y los de movimiento gehen/kommen/fahren— van seguidos de infinitivo SIN "zu". Es la misma estructura de dos verbos en la frase, pero sin la partícula.',
            practica: [
              { incorrecto: 'Ich muss zu gehen.', correcto: 'Ich muss gehen.' },
              { incorrecto: 'Ich lasse zu reparieren das Auto.', correcto: 'Ich lasse das Auto reparieren.' },
              { incorrecto: 'Wir gehen zu schwimmen.', correcto: 'Wir gehen schwimmen.' }
            ],
            pasos: [
              { titulo: '🟦 1. El grupo cerrado sin "zu"', texto: 'Modales (können, müssen, wollen…), lassen (mandar hacer algo), sehen/hören/fühlen (percepción) y gehen/kommen/fahren + otra actividad (schwimmen gehen, einkaufen fahren) van con infinitivo directo, sin "zu".' },
              {
                titulo: '🟩 2. Tabla de ejemplos por grupo',
                texto: '',
                tabla: {
                  headers: ['Verbo', 'Ejemplo'],
                  rows: [
                    ['modal', 'Ich muss gehen.'],
                    ['lassen', 'Ich lasse das Auto reparieren.'],
                    ['sehen/hören', 'Ich sehe ihn kommen.'],
                    ['gehen/kommen', 'Wir gehen schwimmen.']
                  ]
                }
              },
              { titulo: '🟧 3. Contraste directo con b1-08', texto: 'Compara siempre en la pizarra: "versuchen ZU kommen" (con zu) frente a "muss kommen", "lässt kommen", "sieht kommen" (sin zu). El truco docente es escribir ambas frases una debajo de otra para que el contraste visual quede claro.' },
              { titulo: '🟨 4. Detalle avanzado: Ersatzinfinitiv en Perfekt', texto: 'En Perfekt, estos verbos no usan el Partizip II normal sino el llamado "doble infinitivo" (Ersatzinfinitiv): "Ich habe gehen müssen" (no "gemusst"), "Ich habe ihn kommen sehen" (no "gesehen"). Mencionarlo en clase solo como nota, sin profundizar si el grupo aún no domina lo básico.' },
              { titulo: '🟪 5. Truco para memorizar el grupo', texto: 'Son pocos verbos y siempre los mismos: memorízalos como una lista fija (modales + lassen + sehen/hören/fühlen + gehen/kommen/fahren), igual que en b1-06 se memoriza el bloque wegen/trotz/während/statt.' }
            ],
            resumen: 'Modales, lassen, sehen/hören/fühlen y gehen/kommen/fahren + otra actividad llevan el infinitivo SIN "zu" ("ich muss gehen", "wir gehen schwimmen"). Contrasta con b1-08 (infinitivo CON zu). En Perfekt usan Ersatzinfinitiv: "ich habe gehen müssen".'
          },
          {
            ruleId: 'b1-15',
            intro: 'En b1-03 el pronombre relativo (der/die/das/den/dem…) tomaba su caso según su función en la subordinada (sujeto, objeto directo, objeto indirecto). Ahora entra una capa más: si el verbo de la relativa exige una preposición fija (las de b1-07: warten AUF, sich freuen AUF, sprechen ÜBER…), esa preposición no puede desaparecer — se coloca justo delante del pronombre relativo, y es ELLA quien decide el caso, no la función lógica del pronombre.',
            practica: [
              { incorrecto: 'Der Mann, den ich spreche, ist mein Kollege.', correcto: 'Der Mann, mit dem ich spreche, ist mein Kollege.' },
              { incorrecto: 'Das ist die Firma, die ich arbeite.', correcto: 'Das ist die Firma, für die ich arbeite.' },
              { incorrecto: 'Das Thema, das wir sprechen, ist wichtig.', correcto: 'Das Thema, über das wir sprechen, ist wichtig.' }
            ],
            pasos: [
              { titulo: '🟦 1. Punto de partida: el verbo con preposición fija', texto: 'Primero identifica el verbo de la subordinada y su preposición fija (b1-07: warten AUF, sich freuen AUF, sprechen ÜBER…). Esa preposición es la que se va a "pegar" delante del pronombre relativo.' },
              { titulo: '🟩 2. La preposición manda sobre el caso', texto: 'El pronombre relativo ya no toma el caso de su función en la frase (sujeto/objeto), sino el caso que esa preposición exige siempre: "mit" pide Dativo, "für" pide Akkusativ, "über" pide Akkusativ. El género/número del pronombre sigue dependiendo del antecedente, igual que en b1-03.' },
              {
                titulo: '🟧 3. Tabla de ejemplos',
                texto: '',
                tabla: {
                  headers: ['Antecedente', 'Prep. + Caso', 'Ejemplo'],
                  rows: [
                    ['persona (masc.)', 'mit + Dat.', 'der Mann, mit dem ich spreche'],
                    ['persona (fem.)', 'für + Akk.', 'die Frau, für die ich arbeite'],
                    ['cosa/idea', 'über + Akk.', 'das Buch, über das wir sprechen']
                  ]
                }
              },
              { titulo: '🟨 4. Excepción: wo(r)+prep. con antecedentes abstractos', texto: 'Con antecedentes neutros/abstractos e indefinidos ("algo", "alles was", "das, worüber…") se puede usar wo(r)+prep. en vez de prep.+pronombre. En B1 basta con que dominen la forma con pronombre relativo; wo(r)+prep. se trabaja más a fondo en niveles superiores.' },
              { titulo: '🟪 5. Método en tres pasos para el alumno', texto: '1) Busca el verbo de la relativa y su preposición fija. 2) Determina el caso que esa preposición exige. 3) Combina preposición + pronombre relativo en ese caso, respetando el género/número del antecedente.' }
            ],
            resumen: 'Si el verbo de la relativa exige preposición fija, esa preposición va delante del pronombre relativo, y es ella quien determina el caso (no la función lógica del pronombre). Género y número del pronombre siguen dependiendo del antecedente, como en b1-03: "der Mann, MIT DEM ich spreche".'
          }
        ]
      }
    },
    {
      day: 6,
      semana: 1,
      focus: 'je…desto + n-Deklination + Adjektive als Nomen',
      ruleIds: ['b1-16', 'b1-17', 'b1-18'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-16',
            intro: 'En español "cuanto más… más/menos" es una estructura fija, pero no obliga a mover el verbo. En alemán "je... desto..." sí lo hace: la parte "je" es una subordinada (verbo al final) y la parte "desto" es una principal (verbo en 2ª posición) — y ambas necesitan el adjetivo en comparativo, no en positivo.',
            practica: [
              { incorrecto: 'Je mehr ich lerne, ich verstehe besser.', correcto: 'Je mehr ich lerne, desto besser verstehe ich.' },
              { incorrecto: 'Je älter er wird, er wird ruhiger.', correcto: 'Je älter er wird, desto ruhiger wird er.' },
              { incorrecto: 'Je schnell du fährst, desto gefährlich ist es.', correcto: 'Je schneller du fährst, desto gefährlicher ist es.' }
            ],
            pasos: [
              { titulo: '🟦 1. Dos bloques, dos comportamientos', texto: '"Je + comparativo + resto..." es una subordinada: el verbo conjugado va al final. "desto + comparativo + verbo..." es la principal: el verbo va justo después, en 2ª posición.' },
              {
                titulo: '🟩 2. Ambas partes en comparativo',
                texto: 'El adjetivo o adverbio de cada bloque siempre va en comparativo (mehr, besser, älter, schneller...), nunca en la forma base. Es un error típico decir "je schnell" en vez de "je schneller".'
              },
              {
                titulo: '🟧 3. Esquema visual',
                texto: '',
                tabla: { headers: ['', 'Estructura', 'Orden del verbo'], rows: [['je-parte', 'je + comparativo + …', 'verbo al final'], ['desto-parte', 'desto + comparativo + verbo + …', 'verbo en 2ª posición']] }
              },
              {
                titulo: '🟨 4. Alternativa "umso"',
                texto: '"umso" es intercambiable con "desto" en la segunda parte: "Je mehr, umso besser" = "Je mehr, desto besser". Mismo significado, misma posición del verbo.'
              },
              {
                titulo: '🟪 5. Truco para memorizar',
                texto: 'El verbo "se esconde" al final en la parte "je" (como cualquier subordinada) y "sale a saludar" justo después de "desto" (como cualquier principal). Practicar oralmente con pares cotidianos (je mehr... desto besser / je früher... desto mehr Zeit) fija la estructura rápido.'
              }
            ],
            resumen: '"Je" + comparativo + verbo al final, "desto" (o "umso") + comparativo + verbo en 2ª posición. Las dos partes siempre llevan el adjetivo/adverbio en comparativo: "Je mehr ich lerne, desto besser verstehe ich es."'
          },
          {
            ruleId: 'b1-17',
            intro: 'En español ningún sustantivo cambia de forma según el caso ("veo al chico", "ayudo al chico"). En alemán hay un grupo cerrado de sustantivos masculinos —sobre todo personas y profesiones terminadas en -e— que sí añaden una terminación en todos los casos menos el Nominativ singular: son la "n-Deklination".',
            practica: [
              { incorrecto: 'Ich sehe den Junge.', correcto: 'Ich sehe den Jungen.' },
              { incorrecto: 'Ich helfe dem Kollege.', correcto: 'Ich helfe dem Kollegen.' },
              { incorrecto: 'Das Auto des Kunde ist neu.', correcto: 'Das Auto des Kunden ist neu.' }
            ],
            pasos: [
              { titulo: '🟦 1. La regla básica', texto: 'Estos sustantivos masculinos añaden -n o -en en Akkusativ, Dativ y Genitiv singular (y también en plural, donde ya coincide con la forma normal). Solo el Nominativ singular queda igual que el diccionario.' },
              {
                titulo: '🟩 2. Tabla de declinación',
                texto: '',
                tabla: { headers: ['', 'Nom.', 'Akk.', 'Dat.', 'Gen.'], rows: [['der Junge', 'der Junge', 'den Jungen', 'dem Jungen', 'des Jungen'], ['der Mensch', 'der Mensch', 'den Menschen', 'dem Menschen', 'des Menschen'], ['der Herr', 'der Herr', 'den Herrn', 'dem Herrn', 'des Herrn']] }
              },
              {
                titulo: '🟧 3. ¿Quiénes forman parte de este grupo?',
                texto: 'Es un grupo cerrado que se memoriza sustantivo por sustantivo: personas/profesiones en -e (der Junge, der Kollege, der Kunde), muchos en -ent/-ist/-and (der Student, der Polizist, der Praktikant), y algunos irregulares: der Herr (-n, no -en) y der Name (des Namens, con -s extra solo en Genitiv).'
              },
              {
                titulo: '🟨 4. Contraste con el genitivo normal',
                texto: 'Ojo: "des Jungen" NO lleva -s como el genitivo regular de b1-04 ("des Mannes"). En la n-Deklination el genitivo se forma igual que el resto de casos, con -n/-en, salvo la excepción de der Name.'
              },
              {
                titulo: '🟪 5. Truco para memorizar',
                texto: 'Al aprender vocabulario nuevo de personas masculinas en -e (der Kollege, der Kunde, der Junge) o en -ent/-ist, apréndelo directamente junto con su forma en Akkusativ ("den Kollegen") para no dejarlo invariable por costumbre.'
              }
            ],
            resumen: 'Un grupo cerrado de sustantivos masculinos (personas en -e: der Junge, der Kollege; en -ent/-ist: der Student; y algún irregular: der Herr, der Name) añade -n/-en en todos los casos excepto el Nominativ singular. Se memoriza pieza por pieza.'
          },
          {
            ruleId: 'b1-18',
            intro: 'En español "el joven", "lo mejor" o "algo nuevo" funcionan como sustantivos fijos. En alemán son en realidad adjetivos que se han sustantivado: se escriben con mayúscula, pero se declinan exactamente igual que cualquier adjetivo (regla b1-05), según el artículo que los acompañe.',
            practica: [
              { incorrecto: 'Der jugendliche wartet auf den Bus.', correcto: 'Der Jugendliche wartet auf den Bus.' },
              { incorrecto: 'Ich habe etwas neu gelernt.', correcto: 'Ich habe etwas Neues gelernt.' },
              { incorrecto: 'Ein bekannter hat mir das erzählt.', correcto: 'Ein Bekannter hat mir das erzählt.' }
            ],
            pasos: [
              { titulo: '🟦 1. La idea clave', texto: 'No son sustantivos nuevos que memorizar de cero: son adjetivos (jung, neu, bekannt, best-) que se usan sin el sustantivo al que acompañarían, y por eso se escriben con mayúscula — pero la declinación sigue siendo la del adjetivo.' },
              {
                titulo: '🟩 2. Se aplica la tabla de b1-05',
                texto: '',
                tabla: { headers: ['Artículo', 'Ejemplo (der Jugendliche)', 'Terminación'], rows: [['definido', 'der Jugendliche / die Jugendliche', 'débil (-e)'], ['indefinido', 'ein Jugendlicher / eine Jugendliche', 'mixta (-er/-e)'], ['neutro genérico', 'etwas Neues / nichts Interessantes', 'fuerte (-es)']] }
              },
              {
                titulo: '🟧 3. Caso especial: etwas / nichts / viel / wenig',
                texto: 'Tras estas palabras, el adjetivo sustantivado neutro lleva siempre terminación fuerte -es, aunque etwas/nichts/viel/wenig no sean artículos propiamente dichos: "etwas Neues", "nichts Besonderes", "viel Interessantes".'
              },
              {
                titulo: '🟨 4. Dos usos frecuentes',
                texto: 'Personas (der/die Jugendliche = el/la joven, der/die Bekannte = el/la conocido/a, der/die Deutsche = el/la alemán/-ana) y conceptos abstractos (das Beste = lo mejor, das Wichtigste = lo más importante).'
              },
              {
                titulo: '🟪 5. Truco para memorizar',
                texto: 'No aprendas "der Jugendliche" como palabra suelta e invariable: piensa "jung" + terminación de adjetivo según el artículo. Si ya dominas la tabla de b1-05, esta regla es casi gratis.'
              }
            ],
            resumen: 'Los adjetivos sustantivados (der Jugendliche, das Beste, etwas Neues) se escriben con mayúscula pero se declinan como adjetivos normales (tabla de b1-05) según lleven artículo definido, indefinido o ninguno. Tras etwas/nichts/viel/wenig, el neutro siempre es -es.'
          }
        ]
      }
    },
    {
      day: 7,
      semana: 1,
      focus: 'da-/wo-Präpositionaladverbien + preposiciones con Genitiv + preposiciones temporales',
      ruleIds: ['b1-19', 'b1-20', 'b1-21'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-19',
            intro: 'En español repetimos la preposición con un pronombre ("Espero el autobús. Lo espero.") o, si es una cosa/idea, decimos simplemente "eso" ("Pienso en eso"). En alemán no se puede combinar una preposición con "es" ni con "das" cuando se refiere a una cosa o idea: se fusionan en una sola palabra con da(r)- o wo(r)-. Ojo: esto solo vale para cosas/ideas, nunca para personas.',
            practica: [
              { incorrecto: 'Ich warte auf es.', correcto: 'Ich warte darauf.' },
              { incorrecto: 'An was denkst du?', correcto: 'Woran denkst du?' },
              { incorrecto: 'Ich weiß nicht, an was er denkt.', correcto: 'Ich weiß nicht, woran er denkt.' }
            ],
            pasos: [
              { titulo: '🟦 1. El problema que resuelven', texto: 'En alemán no se dice "auf es" ni "an das" para referirse a algo ya mencionado o abstracto. Esa combinación (preposición + es/das) se sustituye por una sola palabra: da(r) + preposición.' },
              {
                titulo: '🟩 2. da- para sustituir cosas/ideas',
                texto: 'da(r)+prep. reemplaza a "prep. + cosa/idea" que ya se conoce por contexto: "Ich freue mich auf die Reise." → "Ich freue mich darauf."',
                tabla: { headers: ['Preposición', 'Forma da-', 'Ejemplo'], rows: [['auf', 'darauf', 'Ich warte darauf.'], ['an', 'daran', 'Ich erinnere mich daran.'], ['mit', 'damit', 'Ich schreibe damit.'], ['von', 'davon', 'Ich habe davon gehört.']] }
              },
              {
                titulo: '🟧 3. wo- para preguntar o subordinar',
                texto: 'wo(r)+prep. se usa en preguntas directas ("Worauf wartest du?") y en subordinadas indirectas, donde además el verbo va al final: "Ich weiß nicht, worauf er wartet." (repaso de b1-06: el conector empuja el verbo al final).'
              },
              { titulo: '🟨 4. La -r- de enlace', texto: 'Se añade una -r- cuando la preposición empieza por vocal, para que no choquen dos vocales: da+an → daran, da+auf → darauf, wo+an → woran, wo+auf → worauf. Sin vocal inicial no hay -r-: damit, womit, davon, wovon.' },
              { titulo: '🟪 5. La prueba de la persona', texto: 'Si la preposición se refiere a una persona, NUNCA se usa da-/wo-: se usa el pronombre normal (an ihn, mit ihr) o, en preguntas, "wer" declinado (An wen denkst du? — no "Woran denkst du?" si hablas de tu hermano).' }
            ],
            resumen: 'da(r)+preposición sustituye "preposición + cosa/idea" (darauf, damit, davon...); wo(r)+preposición pregunta o introduce una subordinada por esa misma cosa/idea (worauf, womit, wovon...). Se añade -r- ante vocal (darauf, woran). Nunca se usan para personas: ahí va el pronombre normal o "wer".'
          },
          {
            ruleId: 'b1-20',
            intro: 'Ya conocen el genitivo de posesión y las preposiciones wegen/trotz/während/statt (b1-04). Hoy ampliamos ese bloque cerrado con dos preposiciones más de uso muy frecuente en B1: innerhalb y außerhalb, que además tienen un matiz espacial además del temporal.',
            practica: [
              { incorrecto: 'Während der Kurs war ich krank.', correcto: 'Während des Kurses war ich krank.' },
              { incorrecto: 'Innerhalb einer Woche ich werde antworten.', correcto: 'Innerhalb einer Woche werde ich antworten.' },
              { incorrecto: 'Der Bahnhof liegt außerhalb der Stadt Zentrum.', correcto: 'Der Bahnhof liegt außerhalb des Stadtzentrums.' }
            ],
            pasos: [
              { titulo: '🟦 1. El bloque se amplía', texto: 'A wegen, trotz, während, statt (ya vistos en b1-04) se suman hoy innerhalb y außerhalb. Las seis rigen Genitiv y se recuerdan mejor como una sola lista que se va memorizando poco a poco.' },
              {
                titulo: '🟩 2. Significado y ejemplo de cada una',
                texto: 'während = durante; wegen = a causa de; trotz = a pesar de; innerhalb = dentro de (tiempo o espacio); außerhalb = fuera de.',
                tabla: { headers: ['Preposición', 'Significado', 'Ejemplo'], rows: [['während', 'durante', 'während des Kurses'], ['wegen', 'a causa de', 'wegen des Wetters'], ['trotz', 'a pesar de', 'trotz des Regens'], ['innerhalb', 'dentro de', 'innerhalb einer Woche'], ['außerhalb', 'fuera de', 'außerhalb der Stadt']] }
              },
              { titulo: '🟧 3. innerhalb/außerhalb: tiempo y espacio', texto: '"innerhalb einer Woche" (dentro de una semana, tiempo) y "außerhalb der Stadt" (fuera de la ciudad, espacio) usan la misma preposición para dos ideas distintas — el contexto aclara cuál es.' },
              { titulo: '🟨 4. La forma coloquial existe, pero en el examen no', texto: 'En la calle es común oír "wegen dem Wetter" o "trotz dem Regen" (con Dativ). En B1 y en el examen se exige siempre el Genitiv: des/der + sustantivo.' },
              { titulo: '🟪 5. Truco de memoria', texto: 'Repite el bloque como una frase-mnemotecnia: "Wegen, trotz, während, statt, innerhalb, außerhalb — todas piden des/der." Practicar siempre con un sustantivo detrás fija la terminación -(e)s.' }
            ],
            resumen: 'während (durante), wegen (a causa de), trotz (a pesar de), innerhalb (dentro de) y außerhalb (fuera de) rigen Genitiv: des/-(e)s en masculino/neutro, der sin cambios en femenino/plural. En el habla se oye Dativ (wegen dem), pero en B1 y examen siempre Genitiv.'
          },
          {
            ruleId: 'b1-21',
            intro: 'En español usamos el mismo tiempo verbal ("llevo un año aprendiendo", "he vivido tres años aquí") tanto si la acción sigue en el presente como si ya terminó. En alemán, "seit" exige Präsens cuando la acción continúa ahora — un punto que suele sonar "raro" al estudiante hispanohablante la primera vez que lo ve.',
            practica: [
              { incorrecto: 'Ich habe seit einem Jahr Deutsch gelernt.', correcto: 'Ich lerne seit einem Jahr Deutsch.' },
              { incorrecto: 'Vor zwei Tage habe ich sie getroffen.', correcto: 'Vor zwei Tagen habe ich sie getroffen.' },
              { incorrecto: 'In eine Woche fahre ich nach Berlin.', correcto: 'In einer Woche fahre ich nach Berlin.' }
            ],
            pasos: [
              { titulo: '🟦 1. Las cinco preposiciones de hoy', texto: 'seit (desde), vor (hace), in (dentro de/en futuro), ab (a partir de), bis (hasta). Todas van con Dativ, excepto "bis" que suele ir sola o combinada como "bis zu + Dativ".' },
              {
                titulo: '🟩 2. Tabla de uso',
                texto: '',
                tabla: { headers: ['Preposición', 'Significado', 'Ejemplo'], rows: [['seit', 'desde (hasta ahora)', 'seit einem Jahr'], ['vor', 'hace (pasado)', 'vor zwei Tagen'], ['in', 'dentro de (futuro)', 'in einer Woche'], ['ab', 'a partir de', 'ab nächstem Montag'], ['bis (zu)', 'hasta', 'bis Freitag / bis zum Freitag']] }
              },
              { titulo: '🟧 3. seit + Präsens, el punto clave', texto: '"Ich lerne seit einem Jahr Deutsch" = llevo un año aprendiendo alemán / he aprendido alemán durante un año, y sigo aprendiendo. Nunca "Ich habe seit einem Jahr gelernt" si la acción continúa: sería un error típico de calco del español.' },
              { titulo: '🟨 4. vor vs. in: pasado vs. futuro', texto: '"vor" mira hacia atrás (vor zwei Tagen = hace dos días, con Perfekt/Präteritum); "in" mira hacia delante (in einer Woche = dentro de una semana, con Präsens o Futur). Son espejo una de otra sobre el eje temporal.' },
              { titulo: '🟪 5. ab y bis: apertura y cierre de un periodo', texto: '"ab" marca el inicio de algo que continúa ("ab nächstem Montag arbeite ich hier" = a partir del lunes, y sigue); "bis" marca el final ("bis Freitag" = hasta el viernes). Juntas, "ab...bis..." delimitan un intervalo completo.' }
            ],
            resumen: 'seit (desde, con Präsens si la acción sigue), vor (hace, pasado), in (dentro de, futuro), ab (a partir de) y bis (hasta) son las preposiciones temporales clave de Dativ. El error más típico: traducir "seit" con Perfekt en vez de Präsens cuando la acción continúa en el presente.'
          }
        ]
      }
    },
    {
      day: 8,
      semana: 2,
      focus: 'Funciones de werden + verbos separables/inseparables + reflexivos ampliado',
      ruleIds: ['b1-22', 'b1-23', 'b1-24'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-22',
            intro: '"werden" es uno de los verbos más versátiles del alemán: puede ser verbo pleno ("convertirse en"), auxiliar de futuro, o auxiliar de pasiva. En español no hay un solo verbo equivalente — según el caso se traduce como "hacerse/llegar a ser", "ir a" o "ser + participio (voz pasiva)". La clave para no confundirse es mirar SIEMPRE qué palabra viene justo después de "werden".',
            practica: [
              { incorrecto: 'Sie wird eine Ärztin werden.', correcto: 'Sie wird Ärztin. / Sie wird Ärztin werden.' },
              { incorrecto: 'Das Auto wird reparieren.', correcto: 'Das Auto wird repariert.' },
              { incorrecto: 'Ich bin Ärztin geworden worden.', correcto: 'Ich bin Ärztin geworden.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Tres caras del mismo verbo',
                texto: 'werden + Nominativ/Adjektiv = verbo pleno ("Sie wird Ärztin", "Es wird kalt"). werden + Infinitivo = futuro o suposición ("Ich werde anrufen"). werden + Partizip II = pasiva ("Das Auto wird repariert"). Es literalmente el mismo verbo "werden" cambiando de función según su acompañante.'
              },
              {
                titulo: '🟩 2. El truco: mira lo que sigue',
                texto: 'Pregúntate: ¿después de "werden" hay un sustantivo o adjetivo? → verbo pleno. ¿Hay un infinitivo? → futuro (b1-10). ¿Hay un participio (Partizip II)? → pasiva (b1-09). Con esta única pregunta se resuelve el 90% de la ambigüedad en clase.',
                tabla: {
                  headers: ['¿Qué sigue a werden?', 'Función', 'Ejemplo'],
                  rows: [
                    ['Nominativ / Adjektiv', 'verbo pleno', 'Sie wird Ärztin. / Es wird kalt.'],
                    ['Infinitiv', 'futuro / suposición', 'Ich werde dich morgen anrufen.'],
                    ['Partizip II', 'pasiva', 'Das Auto wird repariert.']
                  ]
                }
              },
              {
                titulo: '🟧 3. Cuidado con el Perfekt',
                texto: 'En Perfekt, el Partizip II de "werden" cambia según su función: como verbo pleno usa "geworden" ("Sie ist Ärztin geworden"), pero como auxiliar de pasiva usa "worden", SIN el prefijo "ge-" ("Das Auto ist repariert worden"). Es una excepción que suele sorprender porque rompe la regla habitual de formar el participio.'
              },
              {
                titulo: '🟨 4. Comparación con el español',
                texto: 'En español usamos verbos distintos para cada función: "hacerse/llegar a ser" médico, "ir a" llamar, "ser" reparado. El alemán economiza usando un solo verbo para las tres — por eso al estudiante le cuesta al principio distinguirlas, aunque estructuralmente sea sencillo una vez interiorizado el truco del paso 2.'
              }
            ],
            resumen: '"werden" cambia de función según lo que le sigue: + Nominativ/Adjektiv = "convertirse en" o "ponerse" (verbo pleno); + Infinitivo = futuro; + Partizip II = pasiva. En Perfekt, ojo: "geworden" (verbo pleno) vs. "worden" sin "ge-" (auxiliar de pasiva).'
          },
          {
            ruleId: 'b1-23',
            intro: 'En español los prefijos verbales (des-, re-, sobre-…) nunca se separan del verbo. En alemán, en cambio, algunos prefijos SÍ se separan y se van al final de la oración en Präsens/Präteritum, mientras que otros nunca se separan. Distinguirlos es clave para no romper el orden de la oración ni el significado del verbo.',
            practica: [
              { incorrecto: 'Ich anrufe dich morgen.', correcto: 'Ich rufe dich morgen an.' },
              { incorrecto: 'Ich habe geverstanden.', correcto: 'Ich habe verstanden.' },
              { incorrecto: 'Ich aufstehe früh, aber ich verstehe nicht die Regel.', correcto: 'Ich stehe früh auf, aber ich verstehe die Regel nicht.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Los dos grupos fijos',
                texto: 'Prefijos SIEMPRE separables: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-… llevan el acento tónico y se van al final del bloque verbal. Prefijos SIEMPRE inseparables: be-, emp-, ent-, er-, ge-, miss-, ver-, zer- — nunca se separan, sin acento propio y sin "ge-" en el Partizip II.'
              },
              {
                titulo: '🟩 2. Cómo se comportan en la oración',
                texto: 'Separable en Präsens/Präteritum: el prefijo salta al final ("Ich rufe dich an" / "Ich rief dich an"). En Partizip II: se mantiene "ge-" en medio del verbo ("angerufen"). Inseparable: el verbo siempre queda junto, en cualquier tiempo, y en Partizip II NO lleva "ge-" ("verstanden", no "geverstanden").',
                tabla: {
                  headers: ['Tipo', 'Prefijos', 'Ejemplo (Präsens → Partizip II)'],
                  rows: [
                    ['separable', 'ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-', 'Ich rufe an. → angerufen'],
                    ['inseparable', 'be-, emp-, ent-, er-, ge-, miss-, ver-, zer-', 'Ich besuche. → besucht'],
                    ['dual (según sentido)', 'durch-, über-, unter-, um-, wieder-, wider-', 'umfahren (atropellar) / umfahren (rodear)']
                  ]
                }
              },
              {
                titulo: '🟧 3. El grupo "dual" — el más difícil',
                texto: 'durch-, über-, unter-, um-, wieder-, wider- pueden ser separables O inseparables, cambiando el significado del verbo. Sentido literal/espacial → separable y tónico ("Er fährt das Schild UM" = lo atropella). Sentido figurado/abstracto → inseparable y átono ("Er umFÄHRT die Stadt" = la rodea, la evita). No hace falta cubrir todos los ejemplos en clase, pero conviene avisar de que existen para que no se sorprendan más adelante.'
              },
              {
                titulo: '🟨 4. Truco del acento',
                texto: 'Al escuchar o pronunciar el infinitivo, si el golpe de voz cae en el prefijo (ÁN-rufen) es separable; si cae en la raíz (be-SU-chen) es inseparable. Recomienda a los alumnos memorizar los 8 prefijos siempre inseparables como un bloque cerrado (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-) — son un número fijo y cerrado, no crece.'
              }
            ],
            resumen: 'Prefijos siempre separables (ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-) se van al final y llevan "ge-" en Partizip II ("angerufen"). Prefijos siempre inseparables (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-) nunca se separan y no llevan "ge-" ("verstanden"). Un grupo pequeño (durch-, über-, unter-, um-, wieder-, wider-) puede ser ambos según si el sentido es literal o figurado.'
          },
          {
            ruleId: 'b1-24',
            intro: 'Ya conocen los reflexivos básicos (mich, dich, sich…) de A2. En B1 el tema se amplía en dos direcciones: muchos verbos reflexivos exigen además una preposición fija con un caso concreto (como ya vieron con los verbos preposicionales de b1-07), y para expresar reciprocidad ("el uno al otro") el alemán usa una palabra especial, "einander", en vez del reflexivo normal.',
            practica: [
              { incorrecto: 'Ich interessiere mich Musik.', correcto: 'Ich interessiere mich für Musik.' },
              { incorrecto: 'Ich freue mich die Ferien.', correcto: 'Ich freue mich auf die Ferien.' },
              { incorrecto: 'Sie helfen sich seit Jahren. (queriendo decir "se ayudan mutuamente")', correcto: 'Sie helfen einander seit Jahren.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Reflexivo + preposición fija',
                texto: 'Igual que en b1-07 con verbos preposicionales normales, muchos reflexivos exigen una preposición concreta que hay que memorizar junto al verbo, no deducir: sich interessieren FÜR (+Akk.), sich freuen AUF/ÜBER (+Akk.), sich verlieben IN (+Akk.), sich treffen MIT (+Dat.).',
                tabla: {
                  headers: ['Verbo reflexivo + Präp.', 'Caso', 'Ejemplo'],
                  rows: [
                    ['sich interessieren für', 'Akk.', 'Ich interessiere mich für Musik.'],
                    ['sich freuen auf/über', 'Akk.', 'Ich freue mich auf die Ferien.'],
                    ['sich verlieben in', 'Akk.', 'Er hat sich in sie verliebt.'],
                    ['sich treffen mit', 'Dat.', 'Wir treffen uns mit Freunden.']
                  ]
                }
              },
              {
                titulo: '🟩 2. auf vs. über con "sich freuen"',
                texto: '"sich freuen AUF" se usa para algo que aún no ha pasado, que se espera con ilusión (futuro): "Ich freue mich auf die Ferien" (tengo ganas de las vacaciones). "sich freuen ÜBER" se usa para algo que ya ocurrió o ya existe: "Ich freue mich über das Geschenk" (me alegro por el regalo que ya recibí). Es un matiz que conviene remarcar porque en español ambos se dirían simplemente "alegrarse de/por".'
              },
              {
                titulo: '🟧 3. El problema de la ambigüedad reflexiva',
                texto: '"Sie helfen sich" es ambiguo: puede significar que cada uno se ayuda a sí mismo, o que se ayudan mutuamente entre ellos. Para eliminar esa ambigüedad y dejar claro que la acción es recíproca ("el uno al otro"), el alemán usa "einander" en vez del reflexivo: "Sie helfen einander" = inequívocamente se ayudan mutuamente.'
              },
              {
                titulo: '🟨 4. "einander" es invariable',
                texto: '"einander" no concuerda con persona ni número (a diferencia de mich/dich/sich/uns/euch/sich) — es siempre la misma palabra. Con preposición se pega directamente a ella formando una sola palabra: miteinander (unos con otros), füreinander (unos para otros), voneinander (unos de otros). Ejemplo: "Die Kollegen sprechen oft miteinander" (Los colegas hablan a menudo entre sí).'
              }
            ],
            resumen: 'Muchos reflexivos llevan una preposición fija que hay que aprender de memoria junto al verbo (sich interessieren FÜR, sich freuen AUF/ÜBER, sich verlieben IN, sich treffen MIT). Cuando la acción es recíproca ("el uno al otro") y "sich" resultaría ambiguo, se usa "einander" (invariable), que además se puede combinar con preposiciones: miteinander, füreinander.'
          }
        ]
      }
    },
    {
      day: 9,
      semana: 2,
      focus: 'Negationswörter + adverbios locales + verbos de posición/dirección',
      ruleIds: ['b1-25', 'b1-26', 'b1-27'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-25',
            intro: 'En español decimos simplemente "ya no" o "todavía no" y el verbo no cambia de forma. En alemán, en cambio, hay cuatro partículas distintas según la dirección del cambio en el tiempo — y elegir la incorrecta cambia completamente el sentido de la frase, así que vale la pena pararse a pensarlo un segundo antes de hablar.',
            practica: [
              { incorrecto: 'Ich habe nicht mehr Lust auf Pizza.', correcto: 'Ich habe keine Lust mehr auf Pizza.' },
              { incorrecto: 'Sie ist nicht mehr mit dem Studium fertig.', correcto: 'Sie ist noch nicht mit dem Studium fertig.' },
              { incorrecto: 'Ich fahre nie mehr Ski.', correcto: 'Ich bin noch nie Ski gefahren.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Las cuatro direcciones del tiempo',
                texto: 'Pregúntate: ¿la cosa YA pasó y se acabó, o AÚN no ha pasado pero se espera? Eso decide entre el par "mehr" (algo que era) y el par "nie" (algo que nunca ha sido).'
              },
              {
                titulo: '🟩 2. Las cuatro fórmulas',
                texto: 'Compáralas en bloque para no mezclarlas.',
                tabla: {
                  headers: ['Partícula', 'Significado', 'Ejemplo'],
                  rows: [
                    ['nicht mehr', 'ya no (algo terminó)', 'nicht mehr müde'],
                    ['noch nicht', 'todavía no (se espera)', 'noch nicht fertig'],
                    ['noch nie', 'nunca (hasta ahora)', 'noch nie Sushi gegessen'],
                    ['nie mehr', 'nunca más (decisión)', 'nie mehr lügen']
                  ]
                }
              },
              {
                titulo: '🟧 3. Cuidado con el sustantivo',
                texto: 'Cuando "nicht mehr" acompaña a un sustantivo contable/incontable, "nicht" se convierte en "kein": no se dice "nicht mehr Zeit" sino "keine Zeit mehr". El "mehr" siempre se queda al final del bloque.'
              },
              {
                titulo: '🟨 4. nie mehr vs. noch nie — el error más común',
                texto: '"nie mehr" es una decisión hacia el futuro ("no lo vuelvo a hacer nunca más"); "noch nie" habla de tu experiencia hasta hoy ("nunca lo he hecho"). Muchos alumnos usan "nie mehr" cuando en realidad quieren contar que algo nunca les ha pasado.'
              }
            ],
            resumen: 'nicht mehr = ya no; noch nicht = todavía no; noch nie = nunca (hasta ahora); nie mehr = nunca más. Con sustantivo, "nicht mehr" pasa a ser "kein... mehr".'
          },
          {
            ruleId: 'b1-26',
            intro: 'En español "aquí" y "allí" sirven tanto para decir dónde está algo como hacia dónde te mueves ("estoy aquí" / "ven aquí"). El alemán es más estricto: separa la posición (wo?) de la dirección (wohin?) con formas distintas, algo que también pasa con las preposiciones de Akkusativ/Dativ que ya conoces.',
            practica: [
              { incorrecto: 'Ich fahre morgen dort.', correcto: 'Ich fahre morgen dorthin.' },
              { incorrecto: 'Komm bitte hier!', correcto: 'Komm bitte hierher!' },
              { incorrecto: 'Wo fährst du in den Ferien?', correcto: 'Wohin fährst du in den Ferien?' }
            ],
            pasos: [
              { titulo: '🟦 1. Pregunta primero', texto: 'Si la pregunta es "wo?" (¿dónde está?), usa hier/dort/da. Si la pregunta es "wohin?" (¿hacia dónde va?), necesitas la forma con -hin o -her.' },
              {
                titulo: '🟩 2. Las dos series',
                texto: 'La serie de posición no cambia; la de dirección añade -hin (alejándose del hablante) o -her (acercándose).',
                tabla: { headers: ['Posición (wo?)', 'Dirección (wohin?)'], rows: [['hier', 'hierher (hacia aquí)'], ['dort', 'dorthin (hacia allí)'], ['da', 'dahin (hacia ahí)']] }
              },
              {
                titulo: '🟧 3. La forma coloquial',
                texto: 'En el alemán hablado casi nadie junta la palabra: en vez de "dorthin" se dice "da hin" o "dort hin", separando el "hin"/"her" al final de la frase — igual que con los verbos separables.'
              },
              {
                titulo: '🟨 4. Truco rápido',
                texto: 'Si tu frase en español lleva un verbo de movimiento (ir, venir, viajar), casi seguro necesitas "wohin" y la forma con -hin/-her, aunque en español "dónde" se use por costumbre ("¿dónde vas?").'
              }
            ],
            resumen: 'hier/dort/da responden a "wo?" (posición); hierhin/dorthin/dahin (o hier her/dort hin) responden a "wohin?" (dirección). En el habla diaria el -hin/-her suele ir separado al final.'
          },
          {
            ruleId: 'b1-27',
            intro: 'En español "estar" y "poner" ya distinguen posición y acción, así que la idea no es nueva — lo nuevo es que el alemán tiene un verbo distinto para cada postura del objeto (de pie, sentado, tumbado, colgado) y además marca la diferencia con el caso: Dativ si no hay movimiento, Akkusativ si lo colocas tú.',
            practica: [
              { incorrecto: 'Ich stehe die Tasche neben die Tür.', correcto: 'Ich stelle die Tasche neben die Tür.' },
              { incorrecto: 'Er legt das Handy auf dem Tisch.', correcto: 'Er legt das Handy auf den Tisch.' },
              { incorrecto: 'Das Handy liegt auf den Tisch.', correcto: 'Das Handy liegt auf dem Tisch.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Elige el verbo por la postura',
                texto: 'stehen/stellen = de pie; sitzen/setzen = sentado; liegen/legen = tumbado/plano; hängen = colgado. Piensa primero en cómo queda el objeto, no en el objeto en sí.'
              },
              {
                titulo: '🟩 2. Pareja intransitiva vs. transitiva',
                texto: 'La forma corta (sin movimiento, Dativ) describe un estado; la forma con -en/-en (con movimiento, Akkusativ) describe la acción de colocar algo ahí.',
                tabla: { headers: ['Estado (wo? + Dativ)', 'Acción (wohin? + Akkusativ)'], rows: [['stehen', 'stellen'], ['sitzen', 'setzen'], ['liegen', 'legen'], ['hängen (fuerte)', 'hängen (regular)']] }
              },
              {
                titulo: '🟧 3. El caso es la clave, no solo el verbo',
                texto: 'Aunque elijas bien el verbo, si te equivocas de caso la frase suena mal igual: "liegt auf dem Tisch" (Dativ, ya está ahí) frente a "legt auf den Tisch" (Akkusativ, lo estás poniendo).'
              },
              {
                titulo: '🟨 4. El caso especial de hängen',
                texto: '"hängen" se escribe igual en las dos versiones, pero conjuga distinto: intransitivo fuerte (hängt/hing/ist gehangen) para el estado, transitivo regular (hängt/hängte/hat gehängt) para la acción de colgar algo.'
              }
            ],
            resumen: 'Postura del objeto → verbo: stehen/stellen, sitzen/setzen, liegen/legen, hängen. Sin movimiento (wo?) = forma intransitiva + Dativ; con movimiento (wohin?) = forma transitiva + Akkusativ.'
          }
        ]
      }
    },
    {
      day: 10,
      semana: 2,
      focus: 'lassen + Finalsätze um…zu/damit + Doppelkonnektoren',
      ruleIds: ['b1-28', 'b1-29', 'b1-30'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-28',
            intro: 'Hasta ahora "lassen" se ha visto de pasada como parte del grupo de verbos con infinitivo sin "zu" (b1-14: modal, lassen, sehen, hören + Inf.). Hoy se presenta a fondo como verbo causativo: "lassen" describe que el sujeto NO hace la acción él mismo, sino que hace que otro la haga, o que permite que suceda. En español lo traducimos con "mandar hacer", "hacer que", "dejar que" o simplemente con un verbo pronominal ("me corto el pelo" = en realidad me lo cortan).',
            practica: [
              { incorrecto: 'Ich lasse mein Auto zu reparieren.', correcto: 'Ich lasse mein Auto reparieren.' },
              { incorrecto: 'Ich lasse repariere das Auto von einem Mechaniker.', correcto: 'Ich lasse das Auto von einem Mechaniker reparieren.' },
              { incorrecto: 'Sie lässt ihre Kinder gehen spät ins Bett.', correcto: 'Sie lässt ihre Kinder spät ins Bett gehen.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. La estructura base',
                texto: '"lassen" se conjuga en 2ª posición como cualquier verbo, y el infinitivo de la acción real va al final SIN "zu": Sujeto + lassen (conjugado) + [Akkusativ] + ... + Infinitiv. Ejemplo: "Ich lasse das Auto reparieren" (mando reparar el coche).'
              },
              {
                titulo: '🟩 2. Dos lecturas según el objeto',
                texto: 'Si el Akkusativ es una PERSONA, "lassen" significa encargar/permitir a alguien que haga algo: "Ich lasse ihn arbeiten" (dejo/hago que él trabaje). Si el Akkusativ es una COSA, significa mandar que un tercero (normalmente implícito) la haga: "Ich lasse das Auto reparieren" (mando reparar el coche — no lo reparo yo).',
                tabla: {
                  headers: ['Objeto Akk.', 'Sentido', 'Ejemplo'],
                  rows: [
                    ['Persona', 'encargar / permitir a alguien', 'Ich lasse ihn arbeiten.'],
                    ['Cosa', 'mandar hacer algo (a un tercero)', 'Ich lasse das Auto reparieren.'],
                    ['mich/uns + Inf.', 'petición de permiso o invitación', 'Lass mich das erklären. / Lass uns gehen.']
                  ]
                }
              },
              {
                titulo: '🟧 3. El caso especial "lassen + reflexivo"',
                texto: 'Con verbos que normalmente llevan pronombre reflexivo en tercera persona ("sich die Haare schneiden"), al usar "lassen" el pronombre pasa a Dativo y se refiere al sujeto que se beneficia: "Ich lasse MIR die Haare schneiden" (me corto el pelo — literalmente: "hago que a mí me corten el pelo"). Es una de las estructuras más útiles y más usadas en el habla cotidiana (peluquería, taller, reparaciones).'
              },
              {
                titulo: '🟨 4. No confundir con lassen+sich (nivel C1)',
                texto: '"lassen + sich + Inf." (nivel C1: "das lässt sich machen" = eso se puede hacer) expresa POSIBILIDAD pasiva, no una orden. Aquí, en cambio, siempre hay un sujeto que causa activamente la acción — la diferencia es sujeto-que-manda vs. estructura-que-permite-una-lectura-pasiva. En B1 basta con dejar caer la distinción como aviso, sin profundizar.'
              }
            ],
            resumen: '"lassen" + Akkusativ + Infinitivo (sin zu) = mandar que alguien haga algo, o dejar que pase. Con persona: "encargar/permitir". Con cosa: "mandar hacer" (normalmente un servicio: reparar, cortar, arreglar). "lassen + Dativ reflexivo" (Ich lasse MIR...) es la forma típica para "me hago [algo] a mí mismo" a través de un tercero.'
          },
          {
            ruleId: 'b1-29',
            intro: 'En español la palabra "para" sirve tanto si el sujeto de las dos acciones es el mismo ("estudio para aprobar") como si son distintos ("hablo despacio para que me entiendas"). En alemán hay que elegir la estructura correcta según ese criterio: mismo sujeto → "um...zu" + infinitivo; sujetos distintos → "damit" + oración subordinada completa.',
            practica: [
              { incorrecto: 'Ich lerne, um ich besser spreche.', correcto: 'Ich lerne, um besser zu sprechen.' },
              { incorrecto: 'Ich spreche langsam, um du mich verstehst.', correcto: 'Ich spreche langsam, damit du mich verstehst.' },
              { incorrecto: 'Er arbeitet viel, damit Geld zu verdienen.', correcto: 'Er arbeitet viel, um Geld zu verdienen.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Primero identifica el sujeto',
                texto: 'Antes de elegir el conector, pregúntate: ¿quién hace la primera acción y quién se beneficia/hace la segunda? Si es la MISMA persona en las dos partes, la frase se puede comprimir con "um...zu". Si son personas DISTINTAS, hace falta una subordinada completa con "damit".'
              },
              {
                titulo: '🟩 2. "um...zu" — mismo sujeto',
                texto: 'Estructura: oración principal + coma + "um" + (resto de la frase) + "zu" + Infinitivo al final. No lleva sujeto propio ni verbo conjugado en la segunda parte — es un infinitivo puro, igual que "ohne...zu" o "anstatt...zu" que verán más adelante.',
                tabla: {
                  headers: ['Sujetos', 'Estructura', 'Ejemplo'],
                  rows: [
                    ['iguales', 'um...zu + Infinitiv', 'Ich lerne, um besser zu sprechen.'],
                    ['iguales', 'um...zu + Infinitiv', 'Er arbeitet viel, um Geld zu verdienen.']
                  ]
                }
              },
              {
                titulo: '🟧 3. "damit" — sujetos diferentes (obligatorio)',
                texto: 'Estructura: oración principal + coma + "damit" + sujeto propio + ... + verbo conjugado al FINAL (como cualquier subordinada con conector, ver b1-06). Ejemplo: "Die Mutter singt, damit das Baby einschläft" (la madre canta, el bebé duerme — dos sujetos distintos). Aquí "um...zu" es imposible porque no hay un único sujeto que compartir.'
              },
              {
                titulo: '🟨 4. Zona gris: mismo sujeto también admite "damit"',
                texto: 'Cuando el sujeto es el mismo, "um...zu" es la opción más natural y compacta, pero "damit" también es gramaticalmente correcto y a veces se usa por énfasis: "Ich schreibe es auf, damit ich es nicht vergesse" es válido aunque "um es nicht zu vergessen" sería más idiomático. La regla dura es la contraria: con sujetos DISTINTOS, "um...zu" nunca funciona.'
              }
            ],
            resumen: 'Mismo sujeto en ambas partes → "um...zu" + Infinitivo (sin sujeto ni verbo conjugado propios). Sujetos diferentes → "damit" + subordinada completa con verbo al final. Con "um...zu" nunca se repite el sujeto ni se conjuga un segundo verbo; ese es el error típico de B1.'
          },
          {
            ruleId: 'b1-30',
            intro: 'El español conecta ideas alternativas, negativas o acumulativas con parejas fijas: "o...o", "ni...ni", "tanto...como". El alemán tiene sus propios pares fijos — los Doppelkonnektoren — que funcionan igual de "cerrados": las dos mitades siempre van juntas y no se mezclan entre pares distintos.',
            practica: [
              { incorrecto: 'Entweder ich gehe, noch ich bleibe.', correcto: 'Entweder ich gehe, oder ich bleibe.' },
              { incorrecto: 'Ich mag nicht weder Kaffee noch Tee.', correcto: 'Ich mag weder Kaffee noch Tee.' },
              { incorrecto: 'Er spricht sowohl Deutsch und Englisch.', correcto: 'Er spricht sowohl Deutsch als auch Englisch.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Los tres pares básicos',
                texto: 'entweder...oder (alternativa excluyente: "o...o"), weder...noch (doble negación: "ni...ni"), sowohl...als auch (suma/combinación: "tanto...como"). Se memorizan como bloques cerrados, nunca como piezas sueltas intercambiables.',
                tabla: {
                  headers: ['Par', 'Significado', 'Ejemplo'],
                  rows: [
                    ['entweder ... oder', 'o ... o', 'Entweder ich gehe, oder ich bleibe.'],
                    ['weder ... noch', 'ni ... ni', 'Ich mag weder Kaffee noch Tee.'],
                    ['sowohl ... als auch', 'tanto ... como', 'Er spricht sowohl Deutsch als auch Englisch.']
                  ]
                }
              },
              {
                titulo: '🟩 2. Efecto en el orden de palabras',
                texto: '"entweder" al principio de la frase cuenta como elemento en posición 1, así que el verbo va justo después (V2): "Entweder GEHE ich, oder ich bleibe." Si "entweder" no abre la frase, el orden normal no se altera: "Ich gehe entweder heute, oder ich gehe morgen." "weder...noch" y "sowohl...als auch" no provocan inversión del verbo.'
              },
              {
                titulo: '🟧 3. "weder...noch" no lleva doble negación',
                texto: 'A diferencia del español ("no me gusta ni el café ni el té", con "no" + "ni...ni"), en alemán la negación está ya contenida en "weder...noch" y NO se añade "nicht" ni "kein": "Ich mag weder Kaffee noch Tee" (nunca "Ich mag nicht weder Kaffee noch Tee"). Es el error más frecuente por transferencia directa del español.'
              },
              {
                titulo: '🟨 4. Truco para memorizar sin mezclar',
                texto: 'Practica las tres parejas siempre completas, en voz alta, como si fueran una sola palabra: "entwederoder", "wedernoch", "sowohlalsauch". Así se evita el error de cruzar mitades (p. ej. "entweder...noch", que no existe).'
              }
            ],
            resumen: 'Tres pares fijos que nunca se mezclan: entweder...oder (o...o), weder...noch (ni...ni, sin "nicht" adicional), sowohl...als auch (tanto...como). "Entweder" al inicio provoca inversión V2 del verbo; los otros dos pares no alteran el orden normal de la frase.'
          }
        ]
      }
    },
    {
      day: 11,
      semana: 2,
      focus: 'Partizip I als Adjektiv + repaso Präteritum/Konjunktiv II',
      ruleIds: ['b1-31', 'b1-01', 'b1-02'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-31',
            intro: 'En español para describir una acción simultánea usamos el gerundio ("el niño durmiendo") o una oración de relativo ("el niño que duerme"). El alemán tiene un adjetivo hecho a partir del verbo: el Partizip I (infinitivo + -d), que se coloca delante del sustantivo y se declina exactamente igual que cualquier otro adjetivo. Es muy típico en alemán escrito, mucho más que en español hablado.',
            practica: [
              { incorrecto: 'Der Junge, der lacht, sitzt dort.', correcto: 'Der lachende Junge sitzt dort.' },
              { incorrecto: 'Ich sehe ein spielend Kind im Garten.', correcto: 'Ich sehe ein spielendes Kind im Garten.' },
              { incorrecto: 'Das Kind, das beim Schlafen ist, ist ruhig.', correcto: 'Das schlafende Kind ist ruhig.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Qué es',
                texto: 'El Partizip I describe una acción que ocurre al mismo tiempo que la acción principal, y funciona como un adjetivo normal: va delante del sustantivo, no forma un tiempo verbal.'
              },
              {
                titulo: '🟩 2. Formación',
                texto: 'Infinitivo completo + "-d" (schlafen → schlafend, lachen → lachend). A partir de ahí se comporta como cualquier adjetivo: necesita la terminación según artículo, género, caso y número.'
              },
              {
                titulo: '🟧 3. Se declina como cualquier adjetivo',
                texto: 'No hay reglas nuevas que aprender aquí — usa exactamente la declinación de adjetivos que ya conoces (fuerte, débil o mixta según el artículo).',
                tabla: {
                  headers: ['Artículo', 'Partizip I + terminación', 'Ejemplo (Nominativ)'],
                  rows: [
                    ['der', '-e', 'der lachende Mann'],
                    ['die', '-e', 'die lachende Frau'],
                    ['das', '-e', 'das lachende Kind'],
                    ['ein/eine (das)', '-es', 'ein lachendes Kind'],
                    ['plural (die)', '-en', 'die lachenden Kinder']
                  ]
                }
              },
              {
                titulo: '🟨 4. Cuándo usarlo',
                texto: 'Es una alternativa elegante y muy común en textos escritos a una oración de relativo ("der Mann, der lacht" → "der lachende Mann"). No lo traduzcas mentalmente como gerundio español: nunca aparece con "beim" ni describe una frase verbal, es solo un adjetivo.'
              }
            ],
            resumen: 'Partizip I = infinitivo + "-d", funciona como adjetivo normal y se declina igual que cualquier otro adjetivo: describe algo que pasa "al mismo tiempo", como forma corta de "que + verbo".'
          },
          {
            ruleId: 'b1-01',
            intro: 'Repaso del Präteritum: ya vimos que es el pasado narrativo/escrito y que los irregulares cambian de vocal. Los errores que más persisten a estas alturas no son de formación, sino de cuándo usarlo (mezclarlo con el Perfekt en conversación) y de terminaciones que se olvidan en 2ª persona.',
            practica: [
              { incorrecto: 'Ich fahrte letztes Jahr nach Italien.', correcto: 'Ich fuhr letztes Jahr nach Italien.' },
              { incorrecto: 'Gestern kaufte ich Brot und dann ich ging ins Kino.', correcto: 'Gestern habe ich Brot gekauft und bin dann ins Kino gegangen.' },
              { incorrecto: 'Du warst gestern nicht da, aber du hattet keine Zeit.', correcto: 'Du warst gestern nicht da, aber du hattest keine Zeit.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Recordatorio rápido',
                texto: 'Regulares: raíz + "-te" (kaufen → kaufte). Irregulares: cambio de vocal, sin terminación en ich/er (fahren → fuhr, gehen → ging).',
                tabla: { headers: ['Infinitiv', 'Präteritum (ich/er)'], rows: [['fahren', 'fuhr'], ['gehen', 'ging'], ['sprechen', 'sprach'], ['kaufen', 'kaufte']] }
              },
              {
                titulo: '🟩 2. El error que más se repite',
                texto: 'En conversación cotidiana, casi todos los verbos "normales" van en Perfekt, no en Präteritum — el Präteritum ahí queda casi solo para sein, haben y los modales. Contar una anécdota entera en Präteritum suena a libro, no a charla.'
              },
              { titulo: '🟧 3. Terminaciones que se olvidan', texto: 'La forma de "du" siempre lleva "-st" (warst, hattest, kauftest), aunque en la cabeza suene raro comparado con "er/es/sie" que no lleva nada.' }
            ],
            resumen: 'Repaso: el Präteritum se forma bien casi siempre, el problema es usarlo donde no toca — en una conversación, todo excepto sein/haben/modales va en Perfekt.'
          },
          {
            ruleId: 'b1-02',
            intro: 'Repaso del Konjunktiv II: recordamos que "würde + Infinitiv" es el comodín universal, pero sein, haben y los modales tienen su propia forma (más elegante y más usada) y no deberían ir con würde. Ese es justo el error que más se repite.',
            practica: [
              { incorrecto: 'Wenn ich Zeit würde haben, würde ich kommen.', correcto: 'Wenn ich Zeit hätte, würde ich kommen.' },
              { incorrecto: 'Er würde froh sein, wenn du kämst.', correcto: 'Er wäre froh, wenn du kämst.' },
              { incorrecto: 'Würdest du können mir helfen?', correcto: 'Könntest du mir helfen?' }
            ],
            pasos: [
              { titulo: '🟦 1. Recordatorio', texto: '"würde + Infinitiv" funciona para casi cualquier verbo, pero suena forzado (y es un error frecuente) con sein, haben y los modales, que tienen forma propia.' },
              {
                titulo: '🟩 2. Las formas que hay que memorizar sí o sí',
                texto: 'Estas cinco son las que más aparecen y las que sustituyen a "würde + Infinitiv" en la práctica.',
                tabla: { headers: ['Infinitiv', 'Konjunktiv II'], rows: [['sein', 'wäre'], ['haben', 'hätte'], ['können', 'könnte'], ['müssen', 'müsste'], ['dürfen', 'dürfte']] }
              },
              {
                titulo: '🟧 3. Peticiones corteses',
                texto: 'Para pedir algo con educación, las fórmulas fijas más usadas son "Könnten Sie…?", "Würden Sie…?" y "Dürfte ich…?" — conviene memorizarlas como bloque, no construirlas cada vez desde cero.'
              }
            ],
            resumen: 'Repaso: würde+Infinitiv es el comodín, pero con sein/haben/modales usa siempre su forma propia (wäre, hätte, könnte…) — nunca "er würde sein" o "würdest du können".'
          }
        ]
      }
    },
    {
      day: 12,
      semana: 2,
      focus: 'Repaso: oraciones de relativo + Genitiv + declinación de adjetivos',
      ruleIds: ['b1-03', 'b1-04', 'b1-05'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-03',
            intro: 'Ya vimos las oraciones de relativo: el pronombre concuerda en género/número con el antecedente pero toma el caso según su función dentro de la subordinada. El error que persiste en esta etapa no es el orden del verbo (eso ya se automatiza), sino elegir mal el caso del pronombre — sobre todo confundir "der/die/das" con "dem/den/dessen".',
            practica: [
              { incorrecto: 'Das ist die Kollegin, die ich gestern geholfen habe.', correcto: 'Das ist die Kollegin, der ich gestern geholfen habe.' },
              { incorrecto: 'Ich kenne den Mann, der Auto kaputt ist.', correcto: 'Ich kenne den Mann, dessen Auto kaputt ist.' },
              { incorrecto: 'Das Restaurant, der wir empfohlen haben, war voll.', correcto: 'Das Restaurant, das wir empfohlen haben, war voll.' }
            ],
            pasos: [
              { titulo: '🟦 1. El error típico en esta etapa', texto: 'Ya no se olvida mandar el verbo al final — el problema ahora es elegir el caso correcto del pronombre. "Helfen" rige dativo, así que aunque el antecedente sea femenino (die Kollegin), el pronombre relativo debe ser "der" (dativo fem.), no "die".' },
              { titulo: '🟩 2. Método de 2 pasos', texto: 'Paso 1: identifica género/número del antecedente (fija la columna de la tabla). Paso 2: identifica la función del pronombre DENTRO de la subordinada (fija la fila: Nom./Akk./Dat./Gen.) mirando qué rige el verbo de esa subordinada.' },
              {
                titulo: '🟧 3. Repaso rápido de la tabla',
                texto: '',
                tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Nom.', 'der', 'die', 'das', 'die'], ['Akk.', 'den', 'die', 'das', 'die'], ['Dat.', 'dem', 'der', 'dem', 'denen'], ['Gen.', 'dessen', 'deren', 'dessen', 'deren']] }
              },
              { titulo: '🟨 4. Los verbos con dativo son la trampa', texto: 'Verbos como helfen, danken, gefallen, gehören rigen dativo. Con antecedente femenino esto produce "der" en vez del "die" que se espera por reflejo — practica identificando primero el rection del verbo.' }
            ],
            resumen: 'Repaso: el pronombre relativo toma género/número del antecedente pero el caso de su función en la subordinada. El error típico ahora es olvidar que verbos como "helfen" piden dativo, no el orden del verbo.'
          },
          {
            ruleId: 'b1-04',
            intro: 'Repaso del genitivo: posesión y las preposiciones fijas (wegen, trotz, während, statt). A estas alturas el error ya no es usar "von+Dativo" en vez del genitivo, sino formar mal el genitivo real cuando sí se necesita — sobre todo olvidar la -s/-es del sustantivo o mezclar el artículo.',
            practica: [
              { incorrecto: 'Das ist das Büro des Chef.', correcto: 'Das ist das Büro des Chefs.' },
              { incorrecto: 'Während des Sommer arbeite ich viel.', correcto: 'Während des Sommers arbeite ich viel.' },
              { incorrecto: 'Statt des Auto nehme ich das Fahrrad.', correcto: 'Statt des Autos nehme ich das Fahrrad.' }
            ],
            pasos: [
              { titulo: '🟦 1. El error persistente', texto: 'No es olvidar "des/der" — eso ya lo dominan. Es olvidar la -s/-es final del sustantivo masculino/neutro: "des Chefs", no "des Chef". El artículo cambia, pero el sustantivo TAMBIÉN.' },
              { titulo: '🟩 2. Regla rápida de la terminación', texto: 'Sustantivos de una sílaba añaden -es (des Mannes, des Sommers → aquí -s porque termina en vocal átona); sustantivos de varias sílabas normalmente solo -s (des Chefs, des Computers).' },
              {
                titulo: '🟧 3. Repaso de las 4 preposiciones fijas',
                texto: 'Practica combinándolas con sustantivos distintos a los ya vistos:',
                tabla: { headers: ['Preposición', 'Ejemplo'], rows: [['wegen', 'wegen des Staus'], ['trotz', 'trotz des Nebels'], ['während', 'während des Meetings'], ['statt', 'statt des Taxis']] }
              },
              { titulo: '🟨 4. Truco de revisión', texto: 'Al escribir una frase con genitivo, revisa dos cosas por separado: (1) ¿el artículo es des/der correcto?, (2) ¿el sustantivo masc./neutro lleva su -s/-es? Son dos errores independientes.' }
            ],
            resumen: 'Repaso: el genitivo va con des/der + sustantivo con -s/-es (masc./neutro). El error que persiste ya no es confundirlo con von+Dativo, sino olvidar la terminación del sustantivo mismo.'
          },
          {
            ruleId: 'b1-05',
            intro: 'Repaso de la declinación de adjetivos. El punto más simple (artículo definido) ya suele estar automatizado; lo que sigue fallando en esta etapa es la declinación MIXTA (tras ein/kein/mein…) y la fuerte (sin artículo), donde el adjetivo tiene que "hacer de artículo".',
            practica: [
              { incorrecto: 'Ich trinke ein kalte Wasser.', correcto: 'Ich trinke ein kaltes Wasser.' },
              { incorrecto: 'Mit gutem Freunden reist man gern.', correcto: 'Mit guten Freunden reist man gern.' },
              { incorrecto: 'Frisches Obst schmecken gut.', correcto: 'Frisches Obst schmeckt gut.' }
            ],
            pasos: [
              { titulo: '🟦 1. Dónde sigue el error', texto: 'La declinación débil (der alte Mann) ya suele salir bien de forma automática. La mixta (ein kaltes Wasser) y la fuerte en dativo/genitivo plural (mit guten Freunden) son las que todavía fallan.' },
              { titulo: '🟩 2. Foco: neutro tras "ein"', texto: '"Ein" no marca el neutro, así que el adjetivo debe hacerlo con -es: "ein kaltes Wasser", "ein schönes Haus" — es el error mixto más frecuente en esta etapa.' },
              {
                titulo: '🟧 3. Foco: plural sin artículo o con "mit/bei/nach"',
                texto: 'En dativo plural, sin excepción, el adjetivo lleva -en, igual que en la declinación débil y fuerte:',
                tabla: { headers: ['Caso', 'Ejemplo', 'Terminación'], rows: [['Dat. Plural (sin art.)', 'mit guten Freunden', '-en'], ['Dat. Plural (mit kein-)', 'mit keinen guten Freunden', '-en'], ['Nom. Sing. neutro (mit ein-)', 'ein kaltes Wasser', '-es']] }
              },
              { titulo: '🟨 4. Truco de autocorrección', texto: 'Antes de escribir la terminación, pregúntate: ¿el artículo (der/ein/nada) ya muestra el género y caso? Si NO lo muestra claramente, el adjetivo tiene que compensarlo con -es/-em/-en/-er.' }
            ],
            resumen: 'Repaso: la declinación débil ya sale casi sola; lo que aún falla es la mixta (ein + neutro → -es) y el dativo plural (mit/bei/nach + adjetivo → siempre -en).'
          }
        ]
      }
    },
    {
      day: 13,
      semana: 2,
      focus: 'Repaso: conectores subordinantes + verbos con preposición fija + infinitivo con zu',
      ruleIds: ['b1-06', 'b1-07', 'b1-08'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-06',
            intro: 'Repaso de conectores subordinantes (weil, dass, obwohl, wenn, als, bevor, nachdem). A estas alturas ya saben "el verbo va al final" — el error que persiste es olvidarlo cuando el verbo tiene dos partes (modal + infinitivo, o Perfekt) y cuando la subordinada va primero y hay que invertir la principal.',
            practica: [
              { incorrecto: 'Ich rufe dich an, nachdem ich habe gegessen.', correcto: 'Ich rufe dich an, nachdem ich gegessen habe.' },
              { incorrecto: 'Obwohl er hat wenig Zeit, hilft er mir immer.', correcto: 'Obwohl er wenig Zeit hat, hilft er mir immer.' },
              { incorrecto: 'Als ich klein war, ich spielte im Garten.', correcto: 'Als ich klein war, spielte ich im Garten.' }
            ],
            pasos: [
              { titulo: '🟦 1. Recordatorio rápido', texto: 'weil, dass, obwohl, wenn, als, bevor, nachdem mandan el verbo conjugado al final de su bloque. Esto ya lo conocen — el reto ahora son los casos con verbo compuesto.' },
              {
                titulo: '🟩 2. El error que persiste: verbos de dos partes',
                texto: 'Con modal+infinitivo o Perfekt, TODO se va al final, y la parte conjugada (el modal o el auxiliar haben/sein) va la última: "..., nachdem ich gegessen HABE" — no "...nachdem ich habe gegessen".'
              },
              {
                titulo: '🟧 3. El otro error que persiste: la principal',
                texto: 'Si la subordinada abre la frase, la principal debe empezar directo con el verbo (V2 de toda la oración): "Als ich klein war, SPIELTE ich im Garten." — no "ich spielte". Cuentan la subordinada como "un solo elemento" que ocupa la primera posición.'
              },
              {
                titulo: '🟨 4. Wenn vs. als, otra vez',
                texto: 'Sigue siendo el error más frecuente en B1: "wenn" para condición o repetición (en cualquier tiempo); "als" solo para un momento único y concreto en el pasado. Pídeles ejemplos propios para detectar si ya lo interiorizaron.'
              }
            ],
            resumen: 'El verbo conjugado va al final de la subordinada, incluso con verbos compuestos (modal o auxiliar al final de todo). Si la subordinada va primero, la principal arranca directo con el verbo. Wenn = condición/repetición; als = momento único en pasado.'
          },
          {
            ruleId: 'b1-07',
            intro: 'Repaso de verbos con preposición fija (warten auf, denken an, sich freuen auf/über, sich interessieren für…). El error que persiste ya no es olvidar que existe una preposición, sino elegir la preposición equivocada por interferencia del español o confundir "auf" con "über" en sich freuen.',
            practica: [
              { incorrecto: 'Ich freue mich für die Ferien.', correcto: 'Ich freue mich auf die Ferien.' },
              { incorrecto: 'Er denkt oft in seine Kindheit.', correcto: 'Er denkt oft an seine Kindheit.' },
              { incorrecto: 'Ich interessiere mich an Musik.', correcto: 'Ich interessiere mich für Musik.' }
            ],
            pasos: [
              { titulo: '🟦 1. No es traducción literal', texto: 'El español no ayuda aquí: "pensar EN" no siempre es "denken IN", "interesarse POR" no es "interessieren AN". Cada verbo alemán trae su propia preposición fija, memorizada como bloque.' },
              {
                titulo: '🟩 2. Sich freuen: auf vs. über',
                texto: '"sich freuen AUF" = algo que todavía no pasó (anticipación): "Ich freue mich auf die Ferien" (aún no llegan). "sich freuen ÜBER" = algo que ya pasó o ya tienen: "Ich freue mich über das Geschenk" (ya lo recibieron).'
              },
              {
                titulo: '🟧 3. Tabla de repaso rápido',
                texto: '',
                tabla: { headers: ['Verbo', 'Prep. + Caso', 'Truco'], rows: [['sich freuen', 'auf + Akk. (futuro) / über + Akk. (ya pasó)', 'auf = todavía no; über = ya'], ['denken', 'an + Akk.', 'nunca "in"'], ['sich interessieren', 'für + Akk.', 'nunca "an"'], ['warten', 'auf + Akk.', 'nunca "für"']] }
              },
              {
                titulo: '🟨 4. Truco para el examen',
                texto: 'Ante la duda, sustituyan mentalmente por "darauf/daran/dafür" (cosa) o "auf ihn/an sie/für es" (persona) — si la sustitución no suena natural, probablemente la preposición elegida es incorrecta.'
              }
            ],
            resumen: 'Las preposiciones fijas no se traducen del español: hay que memorizarlas verbo por verbo. Ojo especial con sich freuen auf (futuro) vs. über (pasado), y con no confundir denken an / sich interessieren für con sus falsos amigos en español.'
          },
          {
            ruleId: 'b1-08',
            intro: 'Repaso de infinitivo con "zu" (versuchen zu, aufhören zu, es ist wichtig zu…). El error que persiste ya no es olvidar el "zu", sino colocarlo mal: fuera de los verbos separables, o añadido por hipercorrección después de un modal (que nunca lleva zu).',
            practica: [
              { incorrecto: 'Ich habe vor, morgen zu einkaufen.', correcto: 'Ich habe vor, morgen einzukaufen.' },
              { incorrecto: 'Er versucht zu nicht rauchen.', correcto: 'Er versucht, nicht zu rauchen.' },
              { incorrecto: 'Ich muss zu gehen.', correcto: 'Ich muss gehen.' }
            ],
            pasos: [
              { titulo: '🟦 1. Recordatorio rápido', texto: '"zu" + infinitivo va después de versuchen, aufhören, vorhaben, vergessen y de expresiones como "es ist wichtig". Con verbos separables, el "zu" se cuela DENTRO: prefijo|zu|raíz (ein|zu|kaufen → einzukaufen).' },
              {
                titulo: '🟩 2. Error persistente #1: zu suelto antes del separable',
                texto: 'A estas alturas ya conocen la regla, pero bajo presión muchos ponen "zu einkaufen" en vez de "einzukaufen". Recuérdenles: busquen primero el prefijo separable y metan el zu justo ahí.'
              },
              {
                titulo: '🟧 3. Error persistente #2: la negación',
                texto: '"nicht" va justo antes de "zu + verbo", nunca entre "zu" y el verbo ni antes del "zu": "versuchen, NICHT ZU rauchen" — no "zu nicht rauchen".'
              },
              {
                titulo: '🟨 4. Error persistente #3: hipercorrección con modales',
                texto: 'Después de aprender esta regla, algunos empiezan a añadir "zu" también tras verbos modales (müssen, können, wollen…) — que va exactamente al revés, siempre SIN zu (b1-14). Contrastar ambas listas ayuda a fijar la frontera.'
              }
            ],
            resumen: 'El "zu" va antes del infinitivo (o se cuela dentro del separable: einzukaufen), nunca suelto delante de un separable ni después de un modal. La negación "nicht" se coloca justo antes de "zu + verbo".'
          }
        ]
      }
    },
    {
      day: 14,
      semana: 2,
      focus: 'Repaso: pasiva básica + futuro',
      ruleIds: ['b1-09', 'b1-10'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-09',
            intro: 'Repaso de la pasiva (werden + Partizip II), vista en el día 3. El error que más persiste en esta etapa es el Perfekt: seguir escribiendo "geworden" en vez de "worden".',
            practica: [
              { incorrecto: 'Die Straße ist letztes Jahr repariert geworden.', correcto: 'Die Straße ist letztes Jahr repariert worden.' },
              { incorrecto: 'Der Termin wurde von der Chefin verschiebt.', correcto: 'Der Termin wurde von der Chefin verschoben.' },
              { incorrecto: 'Meine Tasche wird gestohlen gestern.', correcto: 'Meine Tasche wurde gestern gestohlen.' }
            ],
            pasos: [
              { titulo: '🟦 1. Repaso rápido', texto: 'werden (conjugado) + Partizip II al final. Presente: wird + P.II. Pasado simple: wurde + P.II. Perfekt: ist + P.II + worden.' },
              { titulo: '🟩 2. El error nº1', texto: 'En Perfekt NO se dice "ist … geworden", se dice "ist … worden" (sin ge-). "Geworden" es el participio de werden como verbo pleno ("convertirse en algo"), no como auxiliar de pasiva.' },
              {
                titulo: '🟧 3. Contraste rápido',
                texto: 'Compara ambos usos de werden en Perfekt:',
                tabla: { headers: ['Uso de werden', 'Perfekt', 'Ejemplo'], rows: [['Auxiliar de pasiva', 'ist … worden', 'Das Auto ist repariert worden.'], ['Verbo pleno (convertirse)', 'ist … geworden', 'Er ist Lehrer geworden.']] }
              },
              { titulo: '🟨 4. Posición del agente', texto: 'Si aparece "von + Dativo", va normalmente entre werden/wurde y el Partizip II: "Der Brief wurde von ihr geschrieben." No lo pongan al final.' },
              { titulo: '🟪 5. Práctica activa', texto: 'Pide a la clase que transformen 3 frases activas del día a pasiva, una en cada tiempo (Präsens, Präteritum, Perfekt), controlando especialmente el "worden" del Perfekt.' }
            ],
            resumen: 'Pasiva = werden + Partizip II. En Perfekt es "ist … worden" (sin ge-) — "geworden" solo cuando werden significa "convertirse en". El agente con "von+Dativo" va antes del participio, no al final.'
          },
          {
            ruleId: 'b1-10',
            intro: 'Repaso del futuro: werden + Infinitivo para predicciones, y Präsens + marcador temporal para planes concretos. En esta etapa el error típico ya no es la forma, sino el uso: usar "werden" de más, donde un alemán diría simplemente el Präsens.',
            practica: [
              { incorrecto: 'Ich werde nächsten Sommer nach Italien fahren, weil ich das schon seit Wochen plane.', correcto: 'Ich fahre nächsten Sommer nach Italien, weil ich das schon seit Wochen plane.' },
              { incorrecto: 'Er wird wohl schon zu Hause.', correcto: 'Er wird wohl schon zu Hause sein.' },
              { incorrecto: 'Morgen ich werde meine Prüfung schreiben.', correcto: 'Morgen schreibe ich meine Prüfung.' }
            ],
            pasos: [
              { titulo: '🟦 1. Repaso rápido', texto: 'Dos formas de futuro: werden + Infinitivo (predicciones, promesas, suposiciones) y Präsens + marcador temporal (morgen, nächste Woche…) para planes ya decididos.' },
              { titulo: '🟩 2. El error típico en esta etapa', texto: 'Muchos estudiantes de B1 abusan de "werden" incluso para planes concretos y ya organizados. Cuanto más seguro es el plan, más natural suena el Präsens: "Morgen fahre ich nach Berlin" (no "werde fahren").' },
              {
                titulo: '🟧 3. Cuándo usar cada uno',
                texto: '',
                tabla: { headers: ['Situación', 'Forma preferida', 'Ejemplo'], rows: [['Plan concreto y organizado', 'Präsens + marcador', 'Nächste Woche ziehe ich um.'], ['Predicción / promesa', 'werden + Inf.', 'Es wird bald regnen.'], ['Suposición sobre el presente', 'werden + Inf. (+ schon/wohl)', 'Sie wird schon angekommen sein.']] }
              },
              { titulo: '🟨 4. No olvidar el Infinitiv final', texto: 'Con "werden" de suposición, el verbo principal en infinitivo NO puede faltar: no "Er wird schon zu Hause", sino "Er wird schon zu Hause SEIN".' },
              { titulo: '🟪 5. Práctica activa', texto: 'Pide a la clase 3 frases sobre sus planes reales para la próxima semana: primero en Präsens (plan seguro), luego reformular una como predicción con "werden + Inf." para notar la diferencia de matiz.' }
            ],
            resumen: 'Futuro = werden + Infinitivo (predicciones/suposiciones) o Präsens + marcador temporal (planes concretos, más natural). Ojo con dos errores típicos: abusar de "werden" cuando el plan ya es seguro, y olvidar el infinitivo final en el uso de suposición ("wird … sein").'
          }
        ]
      }
    },
    { day: 15, semana: 3, focus: 'Consolidación: Präteritum + Konjunktiv II', ruleIds: ['b1-01', 'b1-02'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-01',
        intro: 'Repaso del día 1: el Präteritum ya se presentó como el pasado de la lengua escrita. Hoy no se explica de nuevo desde cero — se detectan y corrigen los errores que persisten después de dos semanas de práctica: mezcla de Perfekt y Präteritum en la misma frase, y formas irregulares mal recordadas.',
        practica: [
          { incorrecto: 'Gestern ich bin gegangen ins Kino und ich sah einen Film.', correcto: 'Gestern bin ich ins Kino gegangen und habe einen Film gesehen.' },
          { incorrecto: 'Als Kind, ich hatte Angst vor Hunden und ich habe geweint oft.', correcto: 'Als Kind hatte ich Angst vor Hunden und weinte oft.' },
          { incorrecto: 'Sie schreibte einen Brief an ihre Oma.', correcto: 'Sie schrieb einen Brief an ihre Oma.' }
        ],
        pasos: [
          { titulo: '🟦 1. Error típico: mezclar registros', texto: 'El fallo más común a estas alturas es empezar una frase en Perfekt y terminarla en Präteritum (o viceversa) dentro del mismo texto. Regla de consolidación: un mismo relato debe mantener un solo registro — si es un cuento o una biografía escrita, Präteritum de principio a fin (salvo diálogos citados).' },
          { titulo: '🟩 2. Error típico: "-te" en verbos fuertes', texto: 'Alumnos que ya dominan la regla regular tienden a aplicarla también a irregulares: *schreibte, *fahrte. Recordatorio: los verbos fuertes cambian la vocal, no añaden "-te". Conviene repasar la lista de los 10 irregulares más usados: war, hatte, kam, ging, sah, gab, nahm, fand, wusste, wurde.' },
          {
            titulo: '🟧 3. Autocorrección rápida',
            texto: 'Ejercicio de consolidación en clase: dictar 6 frases cotidianas en presente y pedir que las transformen oralmente a Präteritum, alternando regulares e irregulares, para automatizar el cambio.',
            tabla: { headers: ['Presente', 'Präteritum'], rows: [['er geht', 'er ging'], ['sie hat', 'sie hatte'], ['wir sehen', 'wir sahen'], ['ich weiß', 'ich wusste']] }
          },
          { titulo: '🟨 4. Recordatorio de uso', texto: 'Fuera de sein/haben/modales, si el alumno está hablando (no escribiendo un texto formal), el Perfekt sigue siendo la opción natural. El objetivo de hoy es reconocer las formas de Präteritum al leerlas, no forzar su uso oral constante.' }
        ],
        resumen: 'Repaso enfocado en dos errores persistentes: mezclar Perfekt y Präteritum en un mismo texto, y aplicar la terminación regular "-te" a verbos fuertes. Se refuerza la lista de irregulares más frecuentes con ejercicio oral de transformación presente → Präteritum.'
      },
      {
        ruleId: 'b1-02',
        intro: 'Repaso del día 1: el Konjunktiv II ya se introdujo con el comodín "würde + Infinitivo" y las formas propias de sein/haben/modales. Hoy se trabaja el error más frecuente después de dos semanas: usar "würde" también con sein y haben, y confundir Konjunktiv II con el simple condicional español mal traducido.',
        practica: [
          { incorrecto: 'Wenn ich reich würde sein, ich würde nicht arbeiten.', correcto: 'Wenn ich reich wäre, würde ich nicht arbeiten.' },
          { incorrecto: 'Ich würde haben gern mehr Zeit.', correcto: 'Ich hätte gern mehr Zeit.' },
          { incorrecto: 'Wenn du mir helfen würdest, ich wäre glücklich sein.', correcto: 'Wenn du mir helfen würdest, wäre ich glücklich.' }
        ],
        pasos: [
          { titulo: '🟦 1. Error típico: "würde sein" / "würde haben"', texto: 'Aunque "würde + Infinitivo" es el comodín general, sein y haben NUNCA lo usan en la práctica — siempre wäre / hätte. Es la excepción que más cuesta automatizar porque el alumno ya confía en el comodín.' },
          { titulo: '🟩 2. Error típico: orden en frases con "wenn"', texto: 'En la oración con "wenn" el verbo va al final; en la oración principal, el verbo conjugado (würde/wäre/hätte) va en segunda posición. Practicar el par completo como bloque fijo: "Wenn ich Zeit hätte, würde ich reisen" — no traducir palabra por palabra desde el español.' },
          {
            titulo: '🟧 3. Repaso rápido de formas propias',
            texto: 'Encuesta oral en clase: cada alumno responde con una forma propia distinta a "¿Qué harías si tuvieras un día libre?".',
            tabla: { headers: ['Verbo', 'Konj. II', 'Ejemplo'], rows: [['sein', 'wäre', 'Ich wäre zu Hause.'], ['haben', 'hätte', 'Ich hätte mehr Zeit.'], ['können', 'könnte', 'Ich könnte lesen.'], ['mögen', 'möchte', 'Ich möchte ausschlafen.']] }
          },
          { titulo: '🟨 4. Cortesía en contexto real', texto: 'Simular un diálogo breve en una tienda o restaurante usando solo peticiones corteses: "Könnten Sie…?", "Hätten Sie…?", "Würden Sie…?" — refuerza la forma propia de haben en contexto natural.' }
        ],
        resumen: 'Repaso enfocado en el error de usar "würde" con sein/haben (en vez de wäre/hätte) y en fijar el orden fijo de las frases con "wenn". Práctica oral con formas propias y diálogos de cortesía.'
      }
    ] } },
    {
      day: 16,
      semana: 3,
      focus: 'Consolidación: oraciones de relativo + verbos con preposición fija',
      ruleIds: ['b1-03', 'b1-07'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-03',
            intro: 'Hoy toca consolidar las oraciones de relativo: ya sabes que el pronombre relativo copia género y número del antecedente, pero el CASO lo decide el verbo o la preposición de la subordinada — igual que en español "el hombre AL QUE llamé" no es lo mismo que "el hombre QUE me llamó". El error más típico de hispanohablantes es dejar el pronombre en nominativo sin fijarse en qué papel juega dentro de la frase secundaria.',
            practica: [
              { incorrecto: 'Das ist der Lehrer, der ich gestern getroffen habe.', correcto: 'Das ist der Lehrer, den ich gestern getroffen habe.' },
              { incorrecto: 'Das ist der Kollege, den ich vertraue.', correcto: 'Das ist der Kollege, dem ich vertraue.' },
              { incorrecto: 'Das ist das Projekt, an dem wir uns oft erinnern.', correcto: 'Das ist das Projekt, an das wir uns oft erinnern.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. El género no cambia, el caso sí',
                texto: 'El pronombre relativo siempre concuerda en género y número con la palabra a la que se refiere (der Lehrer → masculino), pero su caso depende solo de la función que cumple dentro de la oración de relativo, no de la principal.'
              },
              {
                titulo: '🟩 2. La tabla de casos',
                texto: 'Es casi idéntica al artículo definido, con solo dos excepciones que hay que memorizar aparte.',
                tabla: {
                  headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'],
                  rows: [['Nom.', 'der', 'die', 'das', 'die'], ['Akk.', 'den', 'die', 'das', 'die'], ['Dat.', 'dem', 'der', 'dem', 'denen'], ['Gen.', 'dessen', 'deren', 'dessen', 'deren']]
                }
              },
              {
                titulo: '🟧 3. Pregúntate: ¿quién hace qué a quién?',
                texto: 'Antes de escribir el pronombre, aísla mentalmente la subordinada y pregúntate qué caso pide el verbo: "ich habe ihn getroffen" (Akk.) → den; "ich vertraue ihm" (Dat., porque vertrauen rige dativo) → dem. Si hay una preposición fija de por medio (an, über, auf...), esa preposición manda su caso habitual, como en b1-07.'
              },
              {
                titulo: '🟨 4. Consolidando: verbo siempre al final',
                texto: 'No lo olvides nunca: en la subordinada de relativo el verbo conjugado se va al final. Es el mismo orden que ya practicaste con weil o dass — la relativa es solo una subordinada más.'
              }
            ],
            resumen: 'El pronombre relativo copia género/número del antecedente, pero el caso lo marca el verbo (o la preposición) de la subordinada: mira qué necesita ese verbo (Akk./Dat./mit preposición) y elige el pronombre correspondiente. Ojo con las dos excepciones: denen (Dat. plural) y dessen/deren (Genitivo). Verbo siempre al final.'
          },
          {
            ruleId: 'b1-07',
            intro: 'Segunda parada de la consolidación de hoy: los verbos con preposición fija. En español "esperar" va con POR o PARA según contexto, pero en alemán cada verbo tiene UNA sola preposición pegada que no se puede cambiar por lógica ni traducir literalmente — warten auf (no für), sich erinnern an, sprechen über. Hay que aprenderlos como bloques cerrados, verbo+preposición+caso, tal como memorizaste ayer los pronombres relativos como bloques de caso.',
            practica: [
              { incorrecto: 'Ich warte für den Bus.', correcto: 'Ich warte auf den Bus.' },
              { incorrecto: 'Wir sprechen über der Termin.', correcto: 'Wir sprechen über den Termin.' },
              { incorrecto: 'Erinnerst du dich an der Lehrerin, die uns Deutsch unterrichtet hat?', correcto: 'Erinnerst du dich an die Lehrerin, die uns Deutsch unterrichtet hat?' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Verbo y preposición son un paquete',
                texto: 'No traduzcas la preposición desde el español: "esperar POR" no da "warten für", da "warten AUF". Cada verbo trae su propia preposición fija, y esa preposición además exige un caso concreto (casi siempre Akkusativ en los verbos más frecuentes de B1).'
              },
              {
                titulo: '🟩 2. Los verbos más usados',
                texto: 'Memorízalos en bloque junto con su da(r)-Ersatz, la forma que se usa para sustituir cosas o ideas (nunca personas).',
                tabla: {
                  headers: ['Verbo', 'Prep. + Caso', 'da(r)-Ersatz'],
                  rows: [
                    ['warten', 'auf + Akk.', 'darauf'],
                    ['denken', 'an + Akk.', 'daran'],
                    ['sprechen', 'über + Akk.', 'darüber'],
                    ['sich freuen', 'auf/über + Akk.', 'darauf/darüber'],
                    ['sich erinnern', 'an + Akk.', 'daran'],
                    ['sich kümmern', 'um + Akk.', 'darum']
                  ]
                }
              },
              {
                titulo: '🟧 3. Personas vs. cosas',
                texto: 'Si lo que sustituyes es una persona, usa preposición + pronombre personal ("Ich denke an sie"); si es una cosa o idea, usa da(r)+preposición ("Ich denke daran"). Confundir esto es un error clásico, así que revísalo siempre antes de hablar.'
              },
              {
                titulo: '🟨 4. Consolidando con la relativa',
                texto: 'Cuando este tipo de verbo aparece dentro de una oración de relativo, la preposición se coloca justo antes del pronombre relativo y el caso lo sigue marcando el verbo, no el antecedente: "die Lehrerin, an die ich mich erinnere" — exactamente la lógica que acabas de repasar en b1-03.'
              }
            ],
            resumen: 'Cada verbo lleva pegada una preposición fija y un caso que no se deducen del español, hay que memorizarlos como bloque (warten AUF + Akk., sich erinnern AN + Akk., sprechen ÜBER + Akk.). Para sustituir cosas usa da(r)+preposición (darauf, daran); para personas, preposición+pronombre (auf ihn, an sie). Dentro de una relativa, esa misma preposición se coloca delante del pronombre relativo.'
          }
        ]
      }
    },
    { day: 17, semana: 3, focus: 'Genitiv (kasus.html) + repaso n-Deklination', ruleIds: ['b1-04', 'b1-17'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-04',
        intro: 'Hoy toca practicar el genitivo con más ejercicios en kasus.html (modo Genitiv). Recuerda la idea central: posesión ("el jardín DEL vecino") o después de wegen/trotz/während/statt — masculino y neutro con des+(-e)s, femenino y plural con der sin cambios.',
        practica: [
          { incorrecto: 'Das ist der Garten der Nachbar.', correcto: 'Das ist der Garten des Nachbarn.' },
          { incorrecto: 'Während der Sommer arbeite ich viel.', correcto: 'Während des Sommers arbeite ich viel.' },
          { incorrecto: 'Statt der Bus nehme ich das Fahrrad.', correcto: 'Statt des Busses nehme ich das Fahrrad.' }
        ],
        pasos: [
          { titulo: '🟦 1. Repaso rápido', texto: 'Genitivo = posesión o detrás de wegen, trotz, während, statt, innerhalb, außerhalb, aufgrund. Artículo des (masc./neutro) o der (fem./plural).' },
          {
            titulo: '🟩 2. El sustantivo también cambia',
            texto: 'No basta con cambiar el artículo: masculino y neutro añaden -s o -es al sustantivo (der Garten → des Gartens, der Bus → des Busses). Femenino y plural quedan igual.',
            tabla: { headers: ['', 'Masc.', 'Fem.', 'Neutro', 'Plural'], rows: [['Art. def.', 'des', 'der', 'des', 'der'], ['Sustantivo', '+(-e)s', 'sin cambio', '+(-e)s', 'sin cambio']] }
          },
          {
            titulo: '🟧 3. Práctica en kasus.html',
            texto: 'En el selector "Kasus" elige Genitiv: el trainer genera frases con espacios para completar artículo + terminación del sustantivo, y corrige cada intento al momento.'
          },
          {
            titulo: '🟨 4. Error típico a vigilar',
            texto: 'Olvidar la -s/-es del sustantivo aunque el artículo esté bien (decir "des Garten" en vez de "des Gartens"). El artículo y la terminación del sustantivo van siempre juntos.'
          }
        ],
        resumen: 'Genitivo: des+(-e)s para masc./neutro, der sin cambios para fem./plural. Practicar en kasus.html (modo Genitiv) hasta que la terminación del sustantivo salga automática, no solo el artículo.'
      },
      {
        ruleId: 'b1-17',
        intro: 'Repaso de la n-Deklination, vista en la semana 2 (día 6): ese grupo cerrado de masculinos (personas en -e, en -ent/-ist, y algún irregular) que añade -n/-en en todos los casos menos el Nominativ singular. Hoy con ejemplos nuevos.',
        practica: [
          { incorrecto: 'Ich vertraue dem Präsident.', correcto: 'Ich vertraue dem Präsidenten.' },
          { incorrecto: 'Sie kennt den Assistent gut.', correcto: 'Sie kennt den Assistenten gut.' },
          { incorrecto: 'Das ist die Meinung des Experte.', correcto: 'Das ist die Meinung des Experten.' }
        ],
        pasos: [
          { titulo: '🟦 1. Recordatorio de la regla', texto: 'Sustantivos como der Präsident, der Experte, der Assistent añaden -n/-en en Akkusativ, Dativ y Genitiv singular. Solo el Nominativ singular queda sin terminación.' },
          {
            titulo: '🟩 2. Nuevos ejemplos del grupo',
            texto: '',
            tabla: { headers: ['', 'Nom.', 'Akk.', 'Dat.', 'Gen.'], rows: [['der Präsident', 'der Präsident', 'den Präsidenten', 'dem Präsidenten', 'des Präsidenten'], ['der Experte', 'der Experte', 'den Experten', 'dem Experten', 'des Experten'], ['der Assistent', 'der Assistent', 'den Assistenten', 'dem Assistenten', 'des Assistenten']] }
          },
          {
            titulo: '🟧 3. Combinación con el genitivo de hoy',
            texto: 'Ojo al combinar con b1-04: "des Präsidenten" (n-Deklination) NO lleva la -s del genitivo regular ("des Mannes"). El genitivo de estos sustantivos se forma igual que el resto de sus casos, con -n/-en.'
          },
          {
            titulo: '🟨 4. Truco para no olvidarlo',
            texto: 'Si un sustantivo masculino nuevo termina en -e, -ent, -ist o -and y designa una persona/profesión, revisa siempre si pertenece a este grupo antes de usarlo en Akkusativ, Dativ o Genitiv.'
          }
        ],
        resumen: 'Repaso: der Präsident, der Experte, der Assistent y sustantivos similares añaden -n/-en en todos los casos excepto Nominativ singular — incluido el Genitiv, donde NO llevan la -s del genitivo regular.'
      }
    ] } },
    {
      day: 18,
      semana: 3,
      focus: 'Declinación de adjetivos (kasus.html) + repaso Adjektive als Nomen',
      ruleIds: ['b1-05', 'b1-18'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-05',
            intro: 'Ya vimos cómo se declina el adjetivo en Nominativ — hoy toca repasarlo mezclado con Akkusativ y, sobre todo, Dativ, que es donde más fallan los hispanohablantes porque en español no existe ese caso. Buena noticia: el Dativ es el caso "más fácil" de memorizar porque casi todo termina en -en.',
            practica: [
              { incorrecto: 'Ich habe den neu Computer gekauft.', correcto: 'Ich habe den neuen Computer gekauft.' },
              { incorrecto: 'Er hilft einer alt Frau über die Straße.', correcto: 'Er hilft einer alten Frau über die Straße.' },
              { incorrecto: 'Nach lang Diskussion haben wir uns geeinigt.', correcto: 'Nach langer Diskussion haben wir uns geeinigt.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Repaso relámpago',
                texto: 'Tres patrones: con artículo definido (der/die/das) el adjetivo va "débil" (-e/-en), con artículo indefinido (ein/kein/mein) va "mixto", y sin artículo va "fuerte" (el adjetivo carga la marca de género y caso porque no hay artículo que la lleve).'
              },
              {
                titulo: '🟩 2. El Dativ, el caso "todo -en"',
                texto: 'Con artículo definido o indefinido (dem/der/dem, einem/einer/einem) el adjetivo SIEMPRE termina en -en, sin importar el género. Solo cuando no hay artículo el adjetivo recupera las terminaciones fuertes.',
                tabla: {
                  headers: ['', 'Masc. Dat.', 'Fem. Dat.', 'Neutro Dat.', 'Plural Dat.'],
                  rows: [['Def. (dem/der/dem/den)', '-en', '-en', '-en', '-en'], ['Indef./Poses. (einem/einer)', '-en', '-en', '-en', '-en'], ['Sin artículo', '-em', '-er', '-em', '-en']]
                }
              },
              {
                titulo: '🟧 3. Conecta con kasus.html',
                texto: 'En el trainer de casos vas a ver frases con preposiciones de Dativ (mit, bei, nach, aus, von, zu) y de Akkusativ (für, ohne, durch, gegen). Antes de pensar en la terminación del adjetivo, identifica primero el caso que pide la preposición — la terminación viene después, casi automática.'
              },
              {
                titulo: '🟨 4. Truco para no bloquearse',
                texto: 'Si ves un artículo definido o indefinido delante del adjetivo y estás en Dativ, no lo pienses: es -en. La única vez que hay que memorizar tabla de verdad es cuando NO hay artículo (ahí sí cambia según el género).'
              }
            ],
            resumen: 'En Dativ, si hay artículo (definido o indefinido) el adjetivo siempre lleva -en. Sin artículo, la terminación fuerte marca el género: -em (masc./neutro), -er (fem.), -en (plural). El Akkusativ ya lo conoces del nominativo: solo cambia el masculino singular, que pasa a -en.'
          },
          {
            ruleId: 'b1-18',
            intro: 'En alemán muchos adjetivos funcionan también como sustantivos: "der Deutsche" (el alemán), "die Kranke" (la enferma), "das Gute" (lo bueno). Se escriben con mayúscula como cualquier sustantivo, pero ojo: no son sustantivos con una declinación propia que haya que memorizar — se declinan EXACTAMENTE como el adjetivo que son, siguiendo la misma tabla que acabas de repasar en b1-05.',
            practica: [
              { incorrecto: 'Die deutsche hat mir geholfen, den Antrag auszufüllen.', correcto: 'Die Deutsche hat mir geholfen, den Antrag auszufüllen.' },
              { incorrecto: 'Ich wünsche dir alles gut für die Prüfung.', correcto: 'Ich wünsche dir alles Gute für die Prüfung.' },
              { incorrecto: 'Ich habe mit einem Deutscher gesprochen, der auch Spanisch kann.', correcto: 'Ich habe mit einem Deutschen gesprochen, der auch Spanisch kann.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Mayúscula sí, declinación propia no',
                texto: 'El primer error típico es escribirlo en minúscula pensando que "sigue siendo adjetivo". Se escribe con mayúscula como sustantivo, pero mentalmente sigue comportándose como adjetivo: pregúntate "¿qué terminación llevaría este adjetivo aquí?" y esa es la respuesta.'
              },
              {
                titulo: '🟩 2. La misma tabla de siempre, con "Deutsche" como ejemplo',
                texto: 'Con artículo definido: débil (-e en Nominativ). Con artículo indefinido: mixta. Sin artículo (plural genérico): fuerte.',
                tabla: {
                  headers: ['Artículo', 'Ejemplo (Nominativ)', 'Terminación'],
                  rows: [
                    ['definido (der/die)', 'der Deutsche / die Deutsche', 'débil -e'],
                    ['indefinido (ein)', 'ein Deutscher / eine Deutsche', 'mixta -er/-e'],
                    ['sin artículo (plural)', 'Deutsche kommen oft hierher', 'fuerte -e']
                  ]
                }
              },
              {
                titulo: '🟧 3. El caso especial de alles/etwas/nichts/viel/wenig',
                texto: 'Con "etwas", "nichts", "viel" y "wenig" el adjetivo sustantivado neutro lleva terminación fuerte -es: "etwas Neues", "nichts Besonderes". Pero con "alles" es la excepción de la excepción: lleva -e, no -es ("alles Gute", "alles Beste") — trátalo como una expresión fija que hay que memorizar aparte.'
              },
              {
                titulo: '🟨 4. Truco para no memorizar de más',
                texto: 'No aprendas "der Deutsche", "die Kranke", "das Gute" como palabras sueltas con su propia lista de terminaciones: son el mismo adjetivo (deutsch, krank, gut) que ya declinas todos los días, solo que ahora hace de sustantivo.'
              }
            ],
            resumen: 'Los adjetivos sustantivados (der/die Deutsche, das Gute) llevan mayúscula pero se declinan como adjetivos normales según lleven artículo definido, indefinido o ninguno. Excepción a memorizar aparte: tras etwas/nichts/viel/wenig va -es (etwas Neues), pero tras alles va -e (alles Gute).'
          }
        ]
      }
    },
    { day: 19, semana: 3, focus: 'Contraste: infinitivo con zu vs. sin zu', ruleIds: ['b1-08', 'b1-14'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-08',
        intro: 'Repaso de contraste: hoy no se presenta la regla como algo nuevo, sino codo con codo con su opuesto (b1-14). El objetivo es que el alumno, al ver un verbo, decida en un segundo si necesita "zu" o no — la duda constante entre ambos es el error más persistente en este nivel.',
        practica: [
          { incorrecto: 'Ich vergesse zu nicht anrufen dich.', correcto: 'Ich vergesse nicht, dich anzurufen.' },
          { incorrecto: 'Er hat vor zu einkaufen gehen.', correcto: 'Er hat vor, einkaufen zu gehen.' },
          { incorrecto: 'Es macht Spaß tanzen.', correcto: 'Es macht Spaß, zu tanzen.' }
        ],
        pasos: [
          { titulo: '🟦 1. La pregunta de un segundo', texto: 'Ante cualquier verbo en infinitivo al final de la frase, pregúntate: ¿el verbo principal está en la "lista cerrada sin zu" (b1-14)? Si NO está en esa lista, casi seguro lleva zu.' },
          {
            titulo: '🟩 2. Pares gemelos para practicar el contraste',
            texto: 'Mismos verbos de acción, un compañero con zu y otro sin zu — ideal para dictado o pizarra dividida en dos columnas.',
            tabla: { headers: ['CON zu (b1-08)', 'SIN zu (b1-14)'], rows: [['Ich habe vor, schwimmen zu gehen.', 'Ich gehe schwimmen.'], ['Er versucht, das Auto zu reparieren.', 'Er lässt das Auto reparieren.'], ['Sie hofft, ihn bald zu sehen.', 'Sie sieht ihn kommen.']] }
          },
          { titulo: '🟧 3. Separable + zu: el error que reaparece bajo presión', texto: 'En repaso oral, muchos alumnos vuelven a decir "zu einkaufen gehen" en vez de "einkaufen zu gehen" (aquí "gehen" es el verbo que rige, no separable en este uso) — corrige señalando cuál es el infinitivo que realmente necesita el zu.' }
        ],
        resumen: 'Ante un infinitivo, primero descarta si el verbo principal pertenece al grupo cerrado sin zu (b1-14); si no pertenece, lleva zu. Practicar pares gemelos (mismo contexto, con y sin zu) fija la frontera mejor que repasar cada regla por separado.'
      },
      {
        ruleId: 'b1-14',
        intro: 'Contrapartida de b1-08: hoy se refuerza la lista cerrada de verbos sin zu comparándola directamente, frase a frase, con sus equivalentes que sí llevan zu, para que el contraste quede fijado por asociación en vez de por memorización aislada.',
        practica: [
          { incorrecto: 'Ich sehe ihn zu kommen.', correcto: 'Ich sehe ihn kommen.' },
          { incorrecto: 'Wir gehen zu einkaufen.', correcto: 'Wir gehen einkaufen.' },
          { incorrecto: 'Sie lässt zu reparieren das Fahrrad.', correcto: 'Sie lässt das Fahrrad reparieren.' }
        ],
        pasos: [
          { titulo: '🟦 1. Repaso rápido de la lista cerrada', texto: 'Modales, lassen, sehen/hören/fühlen y gehen/kommen/fahren + actividad: siempre infinitivo directo, nunca zu. Es un grupo fijo y pequeño — se memoriza entero, no regla por regla.' },
          {
            titulo: '🟩 2. Mismo verbo, dos construcciones distintas',
            texto: '"sehen" y "hören" pueden llevar zu cuando NO son verbos de percepción con infinitivo, sino que rigen otra estructura (p. ej. sustantivo + zu): compara para no generalizar de más.',
            tabla: { headers: ['Sin zu (percepción directa)', 'Con zu (otro régimen)'], rows: [['Ich höre die Vögel singen.', 'Ich habe keine Zeit, dich zu hören.'], ['Ich sehe ihn kommen.', 'Es ist schön, dich zu sehen.']] }
          },
          { titulo: '🟧 3. Diagnóstico de error frecuente en repaso', texto: 'Bajo presión (dictado, examen oral), el error típico ya no es olvidar la regla, sino aplicarla de más: añadir zu a un modal recién visto en la misma frase que un verbo con zu (b1-08). Practicar frases mixtas ayuda a distinguir cuál rige cuál.' }
        ],
        resumen: 'El grupo cerrado (modales, lassen, sehen/hören/fühlen, gehen/kommen/fahren+actividad) va siempre sin zu; el mismo verbo (sehen, hören) puede llevar zu cuando actúa con otro régimen distinto al de percepción directa + infinitivo. El contraste con b1-08 se fija mejor con pares gemelos que con listas aisladas.'
      }
    ] } },
    { day: 20, semana: 3, focus: 'Pasiva básica + funciones de werden', ruleIds: ['b1-09', 'b1-22'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-09',
        intro: 'Repaso de la pasiva (día 3): "werden" (conjugado) + Partizip II al final. El error que más persiste a estas alturas es el Perfekt — confundir "worden" (auxiliar de pasiva, sin ge-) con "geworden" (werden como verbo pleno). Hoy se repasa justo esa distinción, de la mano de la regla b1-22.',
        practica: [
          { incorrecto: 'Der Brief ist geschrieben geworden.', correcto: 'Der Brief ist geschrieben worden.' },
          { incorrecto: 'Das Auto wird reparieren.', correcto: 'Das Auto wird repariert.' },
          { incorrecto: 'Die Fenster wurden geputzt von der Putzfrau letzte Woche.', correcto: 'Die Fenster wurden letzte Woche von der Putzfrau geputzt.' }
        ],
        pasos: [
          { titulo: '🟦 1. Repaso rápido de la estructura', texto: '"werden" conjugado en el tiempo que haga falta + Partizip II al final. El agente, si aparece, va con "von + Dativo" y suele omitirse.' },
          {
            titulo: '🟩 2. Werden en cada tiempo',
            texto: 'Solo cambia la forma de "werden"; el Partizip II se queda fijo al final.',
            tabla: { headers: ['Tiempo', 'Estructura', 'Ejemplo'], rows: [['Präsens', 'wird + P.II', 'Das Haus wird gebaut.'], ['Präteritum', 'wurde + P.II', 'Das Haus wurde gebaut.'], ['Perfekt', 'ist + P.II + worden', 'Das Haus ist gebaut worden.']] }
          },
          { titulo: '🟧 3. El error persistente: worden vs. geworden', texto: '"worden" (sin ge-) es el único Partizip II válido de "werden" como auxiliar de pasiva en Perfekt. "geworden" pertenece a otra frase distinta: "werden" como verbo pleno ("Sie ist Ärztin geworden" = se hizo médica). Nunca coexisten los dos "worden/geworden" en una misma pasiva.' },
          { titulo: '🟨 4. Práctica de corrección', texto: 'Dales frases con el error mezclado y pídeles que digan en voz alta si es pasiva (worden) o cambio de estado (geworden) antes de corregir — la pausa de identificar la función es lo que fija la regla.' }
        ],
        resumen: 'Pasiva: werden (conjugado) + Partizip II al final; agente opcional con "von + Dativo". Perfekt: "ist … worden" (sin ge-) — nunca "geworden", que es el Partizip II de werden como verbo pleno.'
      },
      {
        ruleId: 'b1-22',
        intro: 'Repaso de las tres funciones de "werden" (día 8), aprovechando que hoy también se repasa la pasiva (b1-09): "werden" es verbo pleno (convertirse en), auxiliar de futuro/suposición (b1-10) o auxiliar de pasiva (b1-09) — y la única pista fiable para distinguirlas es mirar qué palabra viene justo después.',
        practica: [
          { incorrecto: 'Sie wird eine Ärztin werden.', correcto: 'Sie wird Ärztin. / Sie wird Ärztin werden.' },
          { incorrecto: 'Es wird regnen morgen kalt.', correcto: 'Es wird morgen kalt. (verbo pleno) / Es wird morgen regnen. (futuro)' },
          { incorrecto: 'Ich bin Ärztin worden.', correcto: 'Ich bin Ärztin geworden.' }
        ],
        pasos: [
          {
            titulo: '🟦 1. La pregunta clave: ¿qué sigue a werden?',
            texto: 'Nominativ/Adjektiv → verbo pleno (cambio de estado). Infinitivo → futuro o suposición (b1-10). Partizip II → pasiva (b1-09). Es el mismo verbo cambiando de función según su acompañante.',
            tabla: { headers: ['¿Qué sigue a werden?', 'Función', 'Ejemplo'], rows: [['Nominativ / Adjektiv', 'verbo pleno', 'Sie wird Ärztin. / Es wird kalt.'], ['Infinitiv', 'futuro / suposición', 'Ich werde dich morgen anrufen.'], ['Partizip II', 'pasiva', 'Das Auto wird repariert.']] }
          },
          { titulo: '🟧 2. El puente con la pasiva: geworden vs. worden', texto: 'Aquí es donde las dos reglas de hoy se tocan directamente: en Perfekt, "geworden" (sin worden) es el verbo pleno — "Sie ist Ärztin geworden". "worden" (sin ge-) es el auxiliar de pasiva — "Das Auto ist repariert worden". Confundirlos produce frases sin sentido, como "Ich bin Ärztin worden" o "Der Brief ist geschrieben geworden": ambas mezclan las dos funciones.' },
          { titulo: '🟨 3. Truco combinado para hoy', texto: 'Primero identifica la función con la pregunta "¿qué sigue a werden?" (paso 1); si el resultado es pasiva y estás en Perfekt, aplica automáticamente "worden" sin ge- (regla b1-09). Encadenar ambos pasos evita el 90% de los errores de esta pareja de reglas.' }
        ],
        resumen: '"werden" cambia de función según lo que sigue: + Nominativ/Adjektiv = verbo pleno; + Infinitivo = futuro; + Partizip II = pasiva. En Perfekt, "geworden" (verbo pleno) vs. "worden" sin ge- (auxiliar de pasiva, b1-09) son las dos caras que más se confunden.'
      }
    ] } },
    { day: 21, semana: 3, focus: 'Conectores subordinantes + wenn vs. als (ampliado)', ruleIds: ['b1-06', 'b1-12'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-06',
        intro: 'Repaso: a estas alturas los alumnos ya han usado weil/dass/obwohl/wenn/als/bevor/nachdem en varias tareas, pero el orden de palabras dentro de la subordinada sigue fallando bajo presión (al hablar espontáneamente vuelven al orden V2 del español). Hoy no se reintroduce la regla desde cero — se ataca el error persistente con producción rápida.',
        practica: [
          { incorrecto: 'Ich bin müde, weil ich habe schlecht geschlafen.', correcto: 'Ich bin müde, weil ich schlecht geschlafen habe.' },
          { incorrecto: 'Obwohl er ist krank, er arbeitet weiter.', correcto: 'Obwohl er krank ist, arbeitet er weiter.' },
          { incorrecto: 'Ich weiß, dass sie wird morgen kommen.', correcto: 'Ich weiß, dass sie morgen kommen wird.' }
        ],
        pasos: [
          { titulo: '🟦 1. El error que persiste', texto: 'No es que no sepan la regla — es que bajo presión (hablando rápido) el cerebro vuelve al orden español. El síntoma típico: el verbo conjugado se queda en segunda posición dentro de la subordinada en vez de irse al final.' },
          { titulo: '🟩 2. Con verbos compuestos (Perfekt, Futur, modal+Inf.)', texto: 'Cuando la subordinada tiene un verbo compuesto, TODO el bloque verbal se va al final, en el orden auxiliar/modal al final del todo: "..., weil ich schlecht geschlafen HABE." / "..., dass sie morgen kommen WIRD." Es el punto donde más fallan a este nivel.' },
          { titulo: '🟧 3. Producción oral cronometrada', texto: 'Ejercicio de clase: dar una frase principal + conector y pedir que completen en menos de 5 segundos, en voz alta, sin escribir primero. El objetivo es automatizar el orden, no razonarlo.' },
          { titulo: '🟨 4. Tabla-resumen rápida', texto: 'Recordatorio visual de los 7 conectores y su matiz:', tabla: { headers: ['Conector', 'Significado', 'Uso'], rows: [['weil / da', 'porque', 'causa'], ['dass', 'que', 'contenido indirecto'], ['obwohl', 'aunque', 'concesión'], ['wenn', 'cuando / si', 'condición o hábito'], ['als', 'cuando', 'momento único pasado'], ['bevor', 'antes de que', 'temporal'], ['nachdem', 'después de que', 'temporal']] } }
        ],
        resumen: 'El verbo conjugado (o todo el bloque verbal, si es compuesto) va al final de la subordinada. El error persistente en B1 no es de conocimiento sino de automatismo bajo presión oral — se corrige con práctica cronometrada, no con más teoría.'
      },
      {
        ruleId: 'b1-12',
        intro: 'Repaso ampliado de wenn vs. als: no se trata solo de repetir la regla, sino de blindarla contra las frases-trampa que más fallan — sobre todo cuando "immer" u otro adverbio de repetición aparece lejos del conector, o cuando la frase mezcla un momento único con una descripción de fondo repetida.',
        practica: [
          { incorrecto: 'Jedes Mal, als ich ihn traf, hatte er schlechte Laune.', correcto: 'Jedes Mal, wenn ich ihn traf, hatte er schlechte Laune.' },
          { incorrecto: 'Wenn ich zum ersten Mal nach Deutschland kam, konnte ich kein Wort Deutsch.', correcto: 'Als ich zum ersten Mal nach Deutschland kam, konnte ich kein Wort Deutsch.' },
          { incorrecto: 'Als ich klein war, hatte ich oft Angst im Dunkeln.', correcto: 'Wenn ich klein war, hatte ich oft Angst im Dunkeln.' }
        ],
        pasos: [
          { titulo: '🟦 1. Frases-trampa: señales de repetición escondidas', texto: '"Jedes Mal", "immer", "oft", "jeden Tag", "damals immer" son marcadores de repetición aunque estén lejos del conector o al principio de la frase — cualquiera de ellos exige "wenn", nunca "als", por muy pasado que suene el resto de la frase.' },
          { titulo: '🟩 2. "Zum ersten Mal" es la señal contraria', texto: '"Zum ersten Mal" (por primera vez), "einmal" (una vez), "an jenem Tag" (aquel día) marcan un evento único e irrepetible → siempre "als", aunque describan un estado o proceso más largo.' },
          { titulo: '🟧 3. Micro-dictado de corrección', texto: 'Ejercicio de clase: leer en voz alta 6-8 frases con wenn/als mezclados (algunas correctas, otras no) y que los alumnos solo digan "correcto" o corrijan en el acto — fuerza el reconocimiento auditivo rápido, no solo la producción escrita.' },
          { titulo: '🟨 4. Diferencia con el "wenn" condicional', texto: 'No confundir con el "wenn" de condición pura (Wenn es regnet, bleibe ich zu Hause) — ese no compite nunca con "als", porque "als" jamás se usa para condiciones, solo para pasado. La confusión wenn/als solo existe dentro del terreno del pasado.' }
        ],
        resumen: 'Blindaje del criterio único vs. repetido: marcadores como "jedes Mal", "immer", "oft" exigen wenn aunque estén lejos del conector; "zum ersten Mal", "einmal", "an jenem Tag" exigen als. El "wenn" condicional (presente/futuro) nunca compite con "als" — la duda solo existe en pasado.'
      }
    ] } },
    { day: 22, semana: 4, focus: 'Repaso: da-/wo-Präpositionaladverbien + preposiciones con Genitiv', ruleIds: ['b1-19', 'b1-20'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-19',
        intro: 'Ya vimos en la semana 1 que las preposiciones nunca se combinan con "es" o "das" cuando se refieren a una cosa/idea: se fusionan en da(r)-/wo(r)-. Sigue siendo el error más persistente en producción libre, así que hoy toca cazarlo en frases propias, no solo reconocerlo.',
        practica: [
          { incorrecto: 'Ich interessiere mich für es.', correcto: 'Ich interessiere mich dafür.' },
          { incorrecto: 'Für was interessierst du dich?', correcto: 'Wofür interessierst du dich?' },
          { incorrecto: 'Ich habe keine Ahnung, für was er sich interessiert.', correcto: 'Ich habe keine Ahnung, wofür er sich interessiert.' }
        ],
        pasos: [
          { titulo: '🟦 1. Diagnóstico rápido', texto: 'Antes de hablar, pregúntate: ¿la preposición va con una cosa/idea o con una persona? Si es cosa/idea → nunca "es"/"das" sueltos, siempre da(r)-/wo(r)-. Si es persona → pronombre normal o "wer".' },
          {
            titulo: '🟩 2. Verbos con preposición fija más usados (repaso de b1-07)',
            texto: 'Estos verbos son los que más generan da-/wo- en la práctica real: sich interessieren für, sich freuen auf/über, warten auf, denken an, sich erinnern an, sprechen über.',
            tabla: { headers: ['Verbo + Präp.', 'da-Form', 'wo-Form'], rows: [['sich interessieren für', 'dafür', 'wofür'], ['sich freuen über', 'darüber', 'worüber'], ['sprechen über', 'darüber', 'worüber'], ['sich erinnern an', 'daran', 'woran']] }
          },
          { titulo: '🟧 3. Error típico: usar "es" en vez de fusionar', texto: 'El calco del español ("pienso en ello" → "ich denke an es") es el fallo número uno. La corrección automática: cada vez que quieras decir "en/con/de/por... eso", revisa si esa preposición existe con da(r)-.' },
          { titulo: '🟪 5. Autocorrección en subordinadas', texto: 'En "Ich weiß nicht, worüber sie sprechen" recuerda dos cosas a la vez: wo(r)- por ser cosa/idea, Y el verbo al final por ser subordinada (repaso de b1-06/b1-13). Practica diciendo la frase completa, no solo el conector.' }
        ],
        resumen: 'Repaso: da(r)+preposición sustituye "preposición + cosa/idea"; wo(r)+preposición pregunta o subordina por esa cosa/idea. El error más común sigue siendo usar "es"/"das" sueltos en vez de fusionar — revisa siempre verbo+preposición fija (b1-07) antes de hablar.'
      },
      {
        ruleId: 'b1-20',
        intro: 'También repasamos wegen/trotz/während/innerhalb/außerhalb + Genitiv (visto junto con da-/wo- en la semana 1). El error persistente no es olvidar la preposición, sino olvidar la terminación -(e)s del sustantivo o usar Dativ por costumbre del habla coloquial.',
        practica: [
          { incorrecto: 'Wegen der Verkehr komme ich zu spät.', correcto: 'Wegen des Verkehrs komme ich zu spät.' },
          { incorrecto: 'Trotz das schlechte Wetter gehen wir raus.', correcto: 'Trotz des schlechten Wetters gehen wir raus.' },
          { incorrecto: 'Innerhalb der Prüfung darf man nicht sprechen.', correcto: 'Während der Prüfung darf man nicht sprechen.' }
        ],
        pasos: [
          { titulo: '🟦 1. El bloque completo de memoria', texto: 'während, wegen, trotz, innerhalb, außerhalb — las cinco rigen Genitiv. Si no recuerdas alguna, repite el bloque en voz alta hasta que salga automático, no lo pienses palabra por palabra.' },
          {
            titulo: '🟩 2. La terminación es lo que más se olvida',
            texto: 'No basta con poner des/der: en masculino y neutro singular el propio sustantivo añade -(e)s. Es el detalle que más puntos resta en el examen.',
            tabla: { headers: ['Género', 'Artículo', 'Sustantivo', 'Ejemplo completo'], rows: [['masc./neutro sg.', 'des', '+ -(e)s', 'wegen des Wetters'], ['femenino sg.', 'der', 'sin cambio', 'während der Prüfung'], ['plural', 'der', 'sin cambio', 'trotz der Kosten']] }
          },
          { titulo: '🟧 3. während vs. innerhalb: no son intercambiables', texto: '"während" = simultaneidad pura (durante X, al mismo tiempo que X). "innerhalb" = dentro de un plazo o límite (antes de que termine X). "Während der Prüfung" (mientras dura el examen) ≠ "innerhalb einer Woche" (en algún momento antes de que pase una semana).' },
          { titulo: '🟨 4. El Dativ coloquial sigue siendo un error en el examen', texto: 'Aunque en la calle se oiga "wegen dem Wetter", en producción escrita/oral evaluada siempre Genitiv: wegen des Wetters. Corrígete a ti mismo si te sale el Dativ por costumbre.' }
        ],
        resumen: 'Repaso: während, wegen, trotz, innerhalb, außerhalb rigen Genitiv (des/-(e)s en masc./neutro sg., der sin cambios en fem./plural). Cuidado con dos errores típicos: olvidar la -(e)s del sustantivo y usar Dativ coloquial (wegen dem) en vez de Genitiv.'
      }
    ] } },
    {
      day: 23,
      semana: 4,
      focus: 'Repaso: preposiciones temporales + verbos de posición/dirección',
      ruleIds: ['b1-21', 'b1-27'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-21',
            intro: 'En español usamos "desde", "hace", "en", "a partir de" y "hasta" casi sin pensar en el caso gramatical que exigen. En alemán, en cambio, seit, vor, in, ab y bis rigen Dativ (bis es la única excepción, que normalmente aparece como "bis zum/zur + Dativ" o sola sin artículo). El error más típico de un hispanohablante es olvidar la terminación -n/-r del Dativ en el sustantivo o el artículo que sigue a la preposición.',
            practica: [
              { incorrecto: 'Ich habe seit drei Jahren in Berlin gewohnt.', correcto: 'Ich wohne seit drei Jahren in Berlin.' },
              { incorrecto: 'In drei Tage fahre ich nach Wien.', correcto: 'In drei Tagen fahre ich nach Wien.' },
              { incorrecto: 'Ich arbeite ab nächste Woche hier.', correcto: 'Ich arbeite ab nächster Woche hier.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Todas van con Dativ (casi todas)',
                texto: 'seit, vor, in y ab exigen Dativ siempre. Solo "bis" se comporta distinto: aparece sola ("bis Freitag") o combinada con "zu + Dativ" ("bis zum Freitag").'
              },
              {
                titulo: '🟩 2. Cuadro rápido',
                texto: '',
                tabla: {
                  headers: ['Preposición', 'Significado', 'Ejemplo'],
                  rows: [
                    ['seit', 'desde (acción que sigue)', 'seit drei Jahren'],
                    ['vor', 'hace (pasado cerrado)', 'vor einem Monat'],
                    ['in', 'dentro de / en (futuro)', 'in drei Tagen'],
                    ['ab', 'a partir de', 'ab nächster Woche'],
                    ['bis (zu)', 'hasta', 'bis Freitag / bis zum Freitag']
                  ]
                }
              },
              {
                titulo: '🟧 3. El caso especial de "seit"',
                texto: 'Si la acción empezó en el pasado pero sigue ahora, en español usamos pretérito perfecto o "llevo + gerundio" ("he vivido", "llevo viviendo"), pero en alemán va en Präsens: "Ich wohne seit drei Jahren in Berlin" — nunca "Ich habe seit... gewohnt".'
              },
              {
                titulo: '🟨 4. Truco de examen',
                texto: 'Antes de escribir el sustantivo después de estas preposiciones, pregúntate: ¿masculino/neutro → -m o -n? ¿femenino/plural → -r o -n? Si dudas, di la frase con "dem/der/den" y comprueba que la terminación del sustantivo (si es plural o débil) concuerde.'
              }
            ],
            resumen: 'seit, vor, in, ab siempre van con Dativ; bis casi siempre va sola o con "zu + Dativ". Y ojo: "seit" con acción que continúa se dice en Präsens, nunca en Perfekt.'
          },
          {
            ruleId: 'b1-27',
            intro: 'Repaso: recordemos la diferencia entre los verbos de posición (stehen, sitzen, liegen, hängen — responden a "wo?" y van con Dativ) y los verbos de dirección (stellen, setzen, legen, hängen — responden a "wohin?" y van con Akkusativ). El error más persistente de los alumnos hispanohablantes no es tanto elegir el verbo equivocado, sino mezclar el caso: usar Akkusativ donde el objeto ya está quieto, o Dativ cuando alguien está colocando algo.',
            practica: [
              { incorrecto: 'Der Schlüssel liegt auf den Tisch.', correcto: 'Der Schlüssel liegt auf dem Tisch.' },
              { incorrecto: 'Ich stelle die Vase in dem Regal.', correcto: 'Ich stelle die Vase in das Regal.' },
              { incorrecto: 'Seit einer Woche hängt das Bild an die Wand.', correcto: 'Seit einer Woche hängt das Bild an der Wand.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. La pregunta clave: wo o wohin',
                texto: '"Wo?" (¿dónde está?, sin movimiento) → Dativ. "Wohin?" (¿hacia dónde se mueve/coloca?) → Akkusativ. Si el sujeto ya está en su sitio, es wo; si alguien lo está poniendo ahí, es wohin.'
              },
              {
                titulo: '🟩 2. Los pares verbo por verbo',
                texto: '',
                tabla: {
                  headers: ['Posición (wo, Dativ)', 'Dirección (wohin, Akkusativ)', 'Ejemplo dirección'],
                  rows: [
                    ['stehen', 'stellen', 'Ich stelle die Vase in das Regal.'],
                    ['sitzen', 'setzen', 'Er setzt das Kind auf den Stuhl.'],
                    ['liegen', 'legen', 'Sie legt den Schlüssel auf den Tisch.'],
                    ['hängen (Dativ)', 'hängen (Akkusativ)', 'Ich hänge das Bild an die Wand.']
                  ]
                }
              },
              {
                titulo: '🟧 3. "hängen" es especial',
                texto: 'Es el único verbo con la misma forma para ambos casos, pero conjuga distinto según el sentido: intransitivo fuerte (hängt / hing / ist gehangen) para posición, y transitivo regular (hängt / hängte / hat gehängt) para dirección.'
              },
              {
                titulo: '🟨 4. Repaso integrado',
                texto: 'Combina esto con las preposiciones temporales: "Seit einer Woche hängt das Bild an der Wand" — el cuadro ya está colgado (wo, Dativ) desde hace una semana (seit + Dativ). Si en cambio alguien lo está colgando ahora, sería "wohin": "Ich hänge das Bild an die Wand."'
              }
            ],
            resumen: 'Pregúntate siempre wo o wohin: sin movimiento va Dativ (stehen, sitzen, liegen, hängen), con movimiento va Akkusativ (stellen, setzen, legen, hängen). "hängen" comparte forma pero cambia de conjugación según el sentido.'
          }
        ]
      }
    },
    {
      day: 24,
      semana: 4,
      focus: 'Repaso: verbos separables/inseparables + reflexivos ampliado',
      ruleIds: ['b1-23', 'b1-24'],
      esClaseEnVivo: false,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-23',
            intro: 'Repaso: el error que más persiste con los verbos de prefijo no es identificar el prefijo, sino olvidar aplicarlo en el orden de la oración — separarlo en Präsens/Präteritum y colocar el "ge-" en el lugar correcto del Partizip II. Antes de cada frase con estos verbos conviene preguntarse: ¿este prefijo es de los 8 fijos inseparables o de los demás (probablemente separables)?',
            practica: [
              { incorrecto: 'Ich nehme morgen an dem Kurs.', correcto: 'Ich nehme morgen an dem Kurs teil.' },
              { incorrecto: 'Ich habe das Auto gerepariert.', correcto: 'Ich habe das Auto repariert.' },
              { incorrecto: 'Er erklärt das Problem und dann klärt er es auf.', correcto: 'Er erklärt das Problem und klärt es dann auf.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. El atajo de los 8 prefijos cerrados',
                texto: 'Si el verbo empieza por be-, emp-, ent-, er-, ge-, miss-, ver- o zer-, es inseparable: nunca se rompe y nunca lleva "ge-" en Partizip II. Con cualquier otro prefijo (ab-, an-, auf-, aus-, ein-, mit-, teil-, vor-, zu-…) asume que es separable hasta que un diccionario te diga lo contrario.'
              },
              {
                titulo: '🟩 2. Verbos que suelen fallar en B1',
                texto: 'Algunos verbos separables llevan prefijos poco intuitivos porque en español no tienen un equivalente "de un solo golpe": teilnehmen (participar), aufklären (aclarar), stattfinden (tener lugar). El truco sigue siendo el mismo: raíz conjugada en 2ª posición, prefijo al final.',
                tabla: {
                  headers: ['Verbo', 'Präsens', 'Partizip II'],
                  rows: [
                    ['teilnehmen (an + Dat.)', 'Ich nehme an dem Kurs teil.', 'teilgenommen'],
                    ['aufklären', 'Er klärt das Missverständnis auf.', 'aufgeklärt'],
                    ['stattfinden', 'Die Prüfung findet morgen statt.', 'stattgefunden'],
                    ['sich verabreden (inseparable)', 'Wir verabreden uns für Samstag.', 'verabredet']
                  ]
                }
              },
              {
                titulo: '🟧 4. Frase con dos verbos: no mezclar los bloques',
                texto: 'Cuando hay un verbo separable y uno inseparable en la misma oración conectados por "und", cada uno se comporta según su propia regla — el separable manda su prefijo al final de SU cláusula, el inseparable se queda intacto. No hay que "igualar" el comportamiento de ambos.'
              }
            ],
            resumen: 'Reconoce primero si el prefijo pertenece al bloque cerrado de 8 inseparables (be-, emp-, ent-, er-, ge-, miss-, ver-, zer-); si no, trátalo como separable: prefijo al final en Präsens/Präteritum, "ge-" insertado antes de la raíz en Partizip II.'
          },
          {
            ruleId: 'b1-24',
            intro: 'Repaso: el fallo típico ya no es olvidar el reflexivo (eso se domina desde A2), sino olvidar la preposición fija que lo acompaña o confundir "auf" con "über" en "sich freuen", además de seguir usando "sich" donde el sentido pide claramente "einander".',
            practica: [
              { incorrecto: 'Ich freue mich das Konzert nächste Woche.', correcto: 'Ich freue mich auf das Konzert nächste Woche.' },
              { incorrecto: 'Ich freue mich auf das Geschenk, das ich schon bekommen habe.', correcto: 'Ich freue mich über das Geschenk, das ich schon bekommen habe.' },
              { incorrecto: 'Die zwei Freunde kennen sich seit der Kindheit.', correcto: 'Die zwei Freunde kennen einander seit der Kindheit.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. Memoriza el bloque verbo+preposición+caso',
                texto: 'Igual que con b1-07, cada reflexivo con preposición fija se aprende como una unidad: sich interessieren FÜR (+Akk.), sich freuen AUF/ÜBER (+Akk.), sich verlieben IN (+Akk.), sich treffen MIT (+Dat.). No es cuestión de lógica, es memorización de bloque.'
              },
              {
                titulo: '🟩 2. El matiz auf vs. über, otra vez',
                texto: '"auf" mira hacia adelante (algo que todavía no ha pasado): "Ich freue mich auf die Ferien". "über" mira hacia lo ya ocurrido o presente: "Ich freue mich über das Geschenk". Pista rápida: si puedes decir "tengo ganas de…" en español, es "auf"; si dices "me alegro por/de algo que ya tengo", es "über".',
                tabla: {
                  headers: ['Situación', 'Preposición', 'Ejemplo'],
                  rows: [
                    ['algo futuro, con ilusión', 'auf (+Akk.)', 'Ich freue mich auf den Urlaub.'],
                    ['algo ya ocurrido/presente', 'über (+Akk.)', 'Ich freue mich über die gute Note.']
                  ]
                }
              },
              {
                titulo: '🟧 3. "einander" cuando el reflexivo es ambiguo',
                texto: 'Con sujetos plurales (wir, sie, die Kollegen…) y verbos como helfen, kennen, sehen, lieben, pregúntate si "sich" podría entenderse como "a sí mismos" en vez de "entre ellos". Si hay duda real, usa "einander" para eliminarla: "Sie kennen einander seit der Schule" es inequívoco; "Sie kennen sich" podría (aunque raramente) sonar reflexivo puro.'
              },
              {
                titulo: '🟨 4. Combinación con preposición',
                texto: '"einander" se pega directamente a la preposición sin espacio: miteinander, füreinander, voneinander, gegeneinander. Practica reformulando frases con reflexivo + preposición mutua: "Sie sprechen mit sich" (raro, reflexivo puro) vs. "Sie sprechen miteinander" (hablan entre ellos, lo habitual).'
              }
            ],
            resumen: 'Repasa el bloque cerrado verbo+preposición+caso de los reflexivos frecuentes (für/auf-über/in/mit), afina el matiz auf (futuro) vs. über (ya ocurrido) en "sich freuen", y usa "einander" —invariable, combinable con preposición— cuando "sich" resultaría ambiguo entre reflexivo y recíproco.'
          }
        ]
      }
    },
    {
      day: 25,
      semana: 4,
      focus: 'Repaso: Negationswörter + lassen',
      ruleIds: ['b1-25', 'b1-28'],
      esClaseEnVivo: true,
      contenido: {
        reglas: [
          {
            ruleId: 'b1-25',
            intro: 'Retomamos las Negationswörter para consolidar el punto que más falla: cuando la negación va delante de un sustantivo, "nicht mehr" se convierte en "kein… mehr". Es un error muy típico en hispanohablantes porque en español simplemente decimos "ya no tengo dinero", sin ese ajuste gramatical.',
            practica: [
              { incorrecto: 'Ich habe nicht mehr Geduld mit ihm.', correcto: 'Ich habe keine Geduld mehr mit ihm.' },
              { incorrecto: 'Wir haben nicht mehr Milch im Kühlschrank.', correcto: 'Wir haben keine Milch mehr im Kühlschrank.' },
              { incorrecto: 'Er hat nicht mehr Lust, ins Fitnessstudio zu gehen.', correcto: 'Er hat keine Lust mehr, ins Fitnessstudio zu gehen.' }
            ],
            pasos: [
              {
                titulo: '🟦 1. La regla base (repaso rápido)',
                texto: '"nicht mehr" niega un verbo o adjetivo (algo que era y ya no es); "noch nicht" es "todavía no"; "noch nie" es "nunca hasta ahora"; "nie mehr" es "nunca más".'
              },
              {
                titulo: '🟩 2. El punto que más falla: sustantivos',
                texto: 'Cuando lo que se niega es un sustantivo, no se usa "nicht mehr" sino "kein… mehr", con "kein" declinado según género y caso del sustantivo, y "mehr" se coloca después.',
                tabla: {
                  headers: ['Frase con verbo/adjetivo', 'Frase con sustantivo'],
                  rows: [['Ich arbeite nicht mehr.', 'Ich habe keine Arbeit mehr.'], ['Er raucht nicht mehr.', 'Er hat keine Zigaretten mehr.'], ['Wir wohnen nicht mehr hier.', 'Wir haben keine Wohnung mehr hier.']]
                }
              },
              {
                titulo: '🟧 3. Por qué se equivocan los hispanohablantes',
                texto: 'En español "ya no tengo tiempo" no cambia de estructura al meter un sustantivo, pero en alemán "Zeit" es un sustantivo y necesita "keine Zeit mehr" — no "nicht mehr Zeit".'
              },
              { titulo: '🟨 4. Truco para no fallar', texto: 'Antes de decir "nicht mehr", pregúntate: ¿lo que sigue es un sustantivo? Si sí, cambia automáticamente a "kein/keine/keinen… mehr".' }
            ],
            resumen: 'Con verbos o adjetivos: nicht mehr. Con sustantivos: kein/keine/keinen… mehr. "Ich habe keine Zeit mehr" — nunca "Ich habe nicht mehr Zeit".'
          },
          {
            ruleId: 'b1-28',
            intro: 'El verbo "lassen" seguido de un infinitivo (sin "zu") sirve para decir que alguien manda hacer algo o permite que algo ocurra, sin hacerlo él mismo. En español usamos "mandar/hacer que" o "dejar", pero la estructura alemana es más compacta: sujeto + lassen + persona/cosa en Akkusativ + infinitivo al final.',
            practica: [
              { incorrecto: 'Ich repariere meinen Computer bei dem Techniker.', correcto: 'Ich lasse meinen Computer bei dem Techniker reparieren.' },
              { incorrecto: 'Meine Mutter erlaubt mir zu spät nach Hause kommen.', correcto: 'Meine Mutter lässt mich spät nach Hause kommen.' },
              { incorrecto: 'Lass wir zusammen kochen!', correcto: 'Lass uns zusammen kochen!' }
            ],
            pasos: [
              {
                titulo: '🟦 1. La estructura básica',
                texto: '"lassen" + persona/cosa en Akkusativ + infinitivo al final de la frase. El infinitivo nunca lleva "zu" — a diferencia de otros verbos que sí lo exigen.'
              },
              {
                titulo: '🟩 2. Dos sentidos: encargar o permitir',
                texto: 'Con una cosa suele significar "mandar hacer algo" (lo hace un tercero); con una persona puede significar "encargarle algo" o directamente "permitirle algo".',
                tabla: {
                  headers: ['Estructura', 'Sentido', 'Ejemplo'],
                  rows: [
                    ['lassen + Sache + Inf.', 'mandar hacer algo (a un tercero)', 'Ich lasse meine Haare schneiden.'],
                    ['lassen + Person + Inf.', 'encargar a alguien que haga algo', 'Der Chef lässt die Sekretärin die E-Mails schreiben.'],
                    ['lassen + Person + Inf.', 'permitir a alguien', 'Meine Eltern lassen mich lange feiern.']
                  ]
                }
              },
              {
                titulo: '🟧 3. "Lass uns…" para proponer planes',
                texto: '"Lass uns + Infinitivo" es una fórmula fija muy usada para proponer hacer algo juntos, equivalente a "vamos a…" — no confundir con "Lass wir", que no existe.'
              },
              {
                titulo: '🟨 4. No confundir con "sich lassen" (más adelante)',
                texto: '"Ich lasse mein Auto reparieren" no significa que yo lo repare, sino que encargo a otro que lo haga. Distinto es "lassen + sich" (nivel C1), que expresa que algo se puede hacer, como "Das Problem lässt sich lösen" (el problema se puede resolver) — eso lo veremos más adelante, hoy solo el uso básico.'
              }
            ],
            resumen: 'lassen + persona/cosa + infinitivo (sin zu) = mandar hacer algo o permitir que pase. "Ich lasse mein Auto reparieren" (lo manda reparar), "Lass uns kochen!" (propuesta conjunta). No confundir con "sich lassen" (posibilidad), que es otro tema más avanzado.'
          }
        ]
      }
    },
    { day: 26, semana: 4, focus: 'Repaso: Finalsätze um…zu/damit + Doppelkonnektoren', ruleIds: ['b1-29', 'b1-30'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-29',
        intro: 'Repaso de "um…zu" vs. "damit" (visto en el día 10). El error que más se repite no es elegir el conector equivocado, sino mezclar las dos estructuras: poner un sujeto propio dentro de "um…zu", o dejar el verbo sin conjugar después de "damit".',
        practica: [
          { incorrecto: 'Ich rufe dich an, um wir treffen uns morgen.', correcto: 'Ich rufe dich an, damit wir uns morgen treffen.' },
          { incorrecto: 'Sie spart Geld, damit zu reisen.', correcto: 'Sie spart Geld, um zu reisen.' },
          { incorrecto: 'Er öffnet das Fenster, um die Luft ist frischer.', correcto: 'Er öffnet das Fenster, damit die Luft frischer wird.' }
        ],
        pasos: [
          {
            titulo: '🟦 1. El chequeo rápido de un segundo',
            texto: 'Antes de escribir el conector, pregunta en voz alta: "¿quién hace la acción número dos?" Si la respuesta es la misma persona que la acción número uno → "um…zu". Si es otra persona (o cosa) distinta → "damit". Este chequeo evita el 90% de los errores.'
          },
          {
            titulo: '🟩 2. Señal de alarma: un sujeto after "um"',
            texto: 'Si después de "um" aparece un pronombre o sustantivo con función de sujeto ("um ich…", "um wir…", "um die Luft…"), la frase ya está mal — "um…zu" jamás lleva sujeto propio, solo el infinitivo al final.',
            tabla: {
              headers: ['Señal de error', 'Ejemplo incorrecto', 'Corrección'],
              rows: [
                ['sujeto tras "um"', 'um wir treffen uns', 'damit wir uns treffen'],
                ['"damit" + infinitivo sin sujeto', 'damit zu reisen', 'um zu reisen'],
                ['"um" + verbo conjugado', 'um die Luft ist frischer', 'damit die Luft frischer wird']
              ]
            }
          },
          {
            titulo: '🟧 3. Ejemplos nuevos para practicar en pareja',
            texto: 'Uno propone la primera parte de la frase, el otro decide "um…zu" o "damit" según quién hace la segunda acción: "Ich mache das Licht aus, …" (mismo sujeto → um…zu schlafen) / "Der Lehrer spricht langsam, …" (sujetos distintos → damit die Schüler verstehen).'
          }
        ],
        resumen: 'Repaso: mismo sujeto → "um…zu" + infinitivo sin sujeto propio; sujetos distintos → "damit" + subordinada completa con verbo conjugado al final. El error persistente es mezclar ambas estructuras (sujeto dentro de "um…zu", o infinitivo tras "damit").'
      },
      {
        ruleId: 'b1-30',
        intro: 'Repaso de los tres Doppelkonnektoren (entweder…oder, weder…noch, sowohl…als auch). El error persistente ya no suele ser cruzar las mitades, sino olvidar que "weder…noch" ya niega por sí solo y añadir un "nicht" de más, por transferencia directa del español.',
        practica: [
          { incorrecto: 'Ich habe nicht weder Zeit noch Lust.', correcto: 'Ich habe weder Zeit noch Lust.' },
          { incorrecto: 'Entweder du kommst mit, noch du bleibst hier.', correcto: 'Entweder du kommst mit, oder du bleibst hier.' },
          { incorrecto: 'Das Restaurant ist sowohl teuer und gut.', correcto: 'Das Restaurant ist sowohl teuer als auch gut.' }
        ],
        pasos: [
          {
            titulo: '🟦 1. Repaso relámpago de los tres pares',
            texto: 'entweder…oder (alternativa: o…o), weder…noch (doble negación: ni…ni, sin "nicht" extra), sowohl…als auch (suma con énfasis: tanto…como, nunca "und" a secas).'
          },
          {
            titulo: '🟩 2. El error típico en esta fase: doble negación',
            texto: 'Como en español decimos "no tengo ni tiempo ni ganas" con un "no" delante, muchos alumnos añaden "nicht" antes de "weder": "Ich habe nicht weder Zeit noch Lust" — incorrecto. La negación ya está en "weder…noch"; añadir "nicht" es redundante y agramatical.',
            tabla: {
              headers: ['Par', 'Error frecuente', 'Forma correcta'],
              rows: [
                ['weder…noch', '+ "nicht" extra', 'sin "nicht": Ich habe weder Zeit noch Lust.'],
                ['entweder…oder', 'mezclar con "noch"', 'Entweder…, oder… (nunca entweder…noch)'],
                ['sowohl…als auch', 'usar solo "und"', 'sowohl…als auch (no "sowohl…und")']
              ]
            }
          },
          {
            titulo: '🟧 3. Práctica con ejemplos nuevos',
            texto: 'Transformar frases sueltas en Doppelkonnektoren: "Er kann kochen. Er kann backen." → "Er kann sowohl kochen als auch backen." / "Wir fahren nicht mit dem Auto. Wir fahren nicht mit dem Bus." → "Wir fahren weder mit dem Auto noch mit dem Bus."'
          }
        ],
        resumen: 'Repaso: tres pares fijos que no se mezclan (entweder…oder, weder…noch, sowohl…als auch). "Weder…noch" ya niega por sí mismo — nunca se añade "nicht" delante. "Sowohl…als auch" no se reduce a un simple "und".'
      }
    ] } },
    { day: 27, semana: 4, focus: 'Repaso general: Plusquamperfekt + Partizip I als Adjektiv', ruleIds: ['b1-11', 'b1-31'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-11',
        intro: 'Repaso del Plusquamperfekt visto en la semana 1. El error que más persiste no es el concepto (los alumnos entienden bien "el pasado del pasado"), sino dos detalles mecánicos: elegir el auxiliar correcto (hatte/war) y mandar el verbo al final en la subordinada con "nachdem".',
        practica: [
          { incorrecto: 'Nachdem er hatte gefrühstückt, verließ er das Haus.', correcto: 'Nachdem er gefrühstückt hatte, verließ er das Haus.' },
          { incorrecto: 'Sie hatte nach Hamburg gezogen, bevor sie den Job fand.', correcto: 'Sie war nach Hamburg gezogen, bevor sie den Job fand.' },
          { incorrecto: 'Ich hatte das Geld schon ausgegeben gehabt.', correcto: 'Ich hatte das Geld schon ausgegeben.' }
        ],
        pasos: [
          { titulo: '🟦 1. Recordatorio rápido', texto: 'Plusquamperfekt = hatte/war + Partizip II. Se usa para una acción ya terminada antes de otra acción pasada, casi siempre con "nachdem".' },
          {
            titulo: '🟩 2. Los dos errores típicos que corregimos hoy',
            texto: 'a) Verbo en el sitio equivocado dentro de la subordinada con "nachdem" — el auxiliar conjugado va al FINAL, no después del sujeto. b) Auxiliar equivocado — verbos de movimiento/cambio de estado (gehen, fahren, ziehen, aufwachen…) usan "war", no "hatte".',
            tabla: { headers: ['Verbo', 'Perfekt', 'Plusquamperfekt'], rows: [['frühstücken', 'hat gefrühstückt', 'hatte gefrühstückt'], ['ziehen', 'ist gezogen', 'war gezogen'], ['aufwachen', 'ist aufgewacht', 'war aufgewacht']] }
          },
          { titulo: '🟧 3. Práctica dirigida', texto: 'Da frases sueltas en Perfekt con "nachdem" y pide reescribirlas: la acción de "nachdem" pasa a Plusquamperfekt, la principal se queda en Präteritum. Ej.: "Nachdem sie aufgewacht ist, hat sie geduscht" → "Nachdem sie aufgewacht war, duschte sie."' },
          { titulo: '🟨 4. Contraste final', texto: 'Pregunta de control: ¿hay dos acciones pasadas y una es claramente anterior a la otra? Si sí, la más antigua va en Plusquamperfekt. Si solo hay una acción pasada, no hace falta — con Perfekt o Präteritum basta.' }
        ],
        resumen: 'Plusquamperfekt = hatte/war + Partizip II, casi siempre con "nachdem". Los dos fallos que persisten: verbo al final en la subordinada, y usar "war" (no "hatte") con verbos de movimiento/cambio de estado.'
      },
      {
        ruleId: 'b1-31',
        intro: 'Repaso del Partizip I als Adjektiv visto en la semana 2. El error que más se repite es tratarlo como si fuera el gerundio español ("el niño durmiendo") en vez de un adjetivo que se declina — y olvidar la terminación de caso/género.',
        practica: [
          { incorrecto: 'Die Kinder, die singen, stehen auf der Bühne.', correcto: 'Die singenden Kinder stehen auf der Bühne.' },
          { incorrecto: 'Ich habe ein weinend Baby gehört.', correcto: 'Ich habe ein weinendes Baby gehört.' },
          { incorrecto: 'Der Mann beim Wartend ist mein Chef.', correcto: 'Der wartende Mann ist mein Chef.' }
        ],
        pasos: [
          { titulo: '🟦 1. Recordatorio rápido', texto: 'Infinitivo + "-d" (singen → singend, warten → wartend) funciona como adjetivo delante de un sustantivo y se declina igual que cualquier otro adjetivo (b1-05).' },
          {
            titulo: '🟩 2. El error persistente: olvidar la declinación',
            texto: 'Formar "-d" está automatizado, pero muchos se olvidan de añadir la terminación de adjetivo después. No existe "ein weinend Baby" — hace falta "-es" porque es neutro + artículo indefinido en Nominativ/Akkusativ.',
            tabla: { headers: ['Artículo', 'Terminación', 'Ejemplo'], rows: [['der/die/das', '-e (Nom. sing.)', 'die singende Frau'], ['ein/eine (neutro)', '-es', 'ein weinendes Baby'], ['sin artículo (plural)', '-e', 'singende Kinder']] }
          },
          { titulo: '🟧 3. Nunca "beim + Partizip I"', texto: 'El calco más común del español ("el hombre esperando" → *"der Mann beim Wartend") no existe en alemán. El Partizip I nunca lleva preposición: es directamente adjetivo delante del sustantivo, "der wartende Mann".' },
          { titulo: '🟨 4. Práctica dirigida', texto: 'Da oraciones de relativo simples (visto en b1-03) y pide transformarlas a Partizip I: "der Mann, der arbeitet" → "der arbeitende Mann"; "die Frau, die lächelt" → "die lächelnde Frau". Refuerza que es una alternativa más elegante, no una estructura nueva.' }
        ],
        resumen: 'Partizip I = infinitivo + "-d", declinado como cualquier adjetivo. Los dos fallos que persisten: olvidar la terminación de declinación, y calcar el gerundio español con "beim + Partizip I", que no existe en alemán.'
      }
    ] } },
    { day: 28, semana: 4, focus: 'Repaso libre: preguntas indirectas + je…desto + preposiciones con Genitiv', ruleIds: ['b1-13', 'b1-16', 'b1-20'], esClaseEnVivo: false, contenido: { reglas: [
      {
        ruleId: 'b1-13',
        intro: 'Repaso: las preguntas indirectas sirven para preguntar o reportar algo con más cortesía o dentro de otra frase ("Ich weiß nicht, ob…", "Können Sie mir sagen, wo…"). Hoy toca practicar la mezcla de "ob" y W-Wort en contexto libre, no solo frases sueltas.',
        practica: [
          { incorrecto: 'Ich weiß nicht, ist der Laden offen.', correcto: 'Ich weiß nicht, ob der Laden offen ist.' },
          { incorrecto: 'Können Sie mir sagen, wann kommt der Zug?', correcto: 'Können Sie mir sagen, wann der Zug kommt?' },
          { incorrecto: 'Ich frage mich, hat sie das schon gehört.', correcto: 'Ich frage mich, ob sie das schon gehört hat.' }
        ],
        pasos: [
          { titulo: '🟦 1. Primer filtro: ¿sí/no o W-Wort?', texto: 'Si la pregunta original se contesta con sí/no → "ob". Si tenía was, wo, wann, warum, wie… → se conserva esa misma palabra.' },
          { titulo: '🟩 2. El verbo siempre al final', texto: 'Da igual si es "ob" o un W-Wort: la estructura es de subordinada, así que el verbo conjugado va al final del bloque, nunca en 2ª posición.' },
          { titulo: '🟧 3. Práctica cruzada con Perfekt', texto: 'Cuando la pregunta indirecta está en Perfekt, el orden es: sujeto + resto + Partizip II + auxiliar al final. Ej.: "Ich weiß nicht, ob sie angerufen hat."', tabla: { headers: ['Directa', 'Indirecta'], rows: [['Hat sie angerufen?', 'Ich weiß nicht, ob sie angerufen hat.'], ['Wo warst du gestern?', 'Sag mir, wo du gestern warst.']] } }
        ],
        resumen: 'Repaso: "ob" para preguntas de sí/no, W-Wort para preguntas con palabra interrogativa; en ambos casos el verbo va al final, incluso en Perfekt (Partizip II + auxiliar).'
      },
      {
        ruleId: 'b1-16',
        intro: 'Repaso de "je…, desto…": compara dos cosas que cambian en paralelo ("cuanto más…, tanto más…"). Hoy se practica combinándolo con vocabulario de otras semanas (comparativos ya vistos, verbos con preposición) para que suene natural y no memorizado.',
        practica: [
          { incorrecto: 'Je mehr du übst, desto du wirst besser.', correcto: 'Je mehr du übst, desto besser wirst du.' },
          { incorrecto: 'Je die Wohnung ist größer, desto teurer ist sie.', correcto: 'Je größer die Wohnung ist, desto teurer ist sie.' },
          { incorrecto: 'Je mehr Geld er verdient, desto mehr er gibt aus.', correcto: 'Je mehr Geld er verdient, desto mehr gibt er aus.' }
        ],
        pasos: [
          { titulo: '🟦 1. Dos mitades, dos órdenes distintos', texto: '"je" abre una subordinada (verbo al final); "desto"/"umso" abre la principal (verbo en 2ª posición, justo tras "desto + comparativo").' },
          { titulo: '🟩 2. Siempre comparativo en ambas partes', texto: 'Ni "je" ni "desto" van nunca con la forma base del adjetivo: "je größer… desto teurer…", nunca "je groß… desto teuer…".' },
          { titulo: '🟧 3. Combínalo con vocabulario ya visto', texto: 'Practica con adjetivos y verbos de otras semanas para reforzar retención: "Je öfter wir Deutsch sprechen, desto sicherer werden wir." "Je länger die Reise dauert, desto müder sind wir."' }
        ],
        resumen: 'Repaso: "je" + comparativo + verbo final (subordinada), "desto"/"umso" + comparativo + verbo en 2ª posición (principal). Ambas partes siempre en comparativo.'
      },
      {
        ruleId: 'b1-20',
        intro: 'Repaso de las preposiciones de Genitiv (während, wegen, trotz, innerhalb, außerhalb). Hoy se insiste en el uso correcto del artículo en Genitiv y en distinguirlas de sus preposiciones "primas" ya vistas (nach/durch temporales, obwohl concesivo).',
        practica: [
          { incorrecto: 'Wegen dem Regen bleiben wir zu Hause.', correcto: 'Wegen des Regens bleiben wir zu Hause.' },
          { incorrecto: 'Trotz der Kälte er ist rausgegangen.', correcto: 'Trotz der Kälte ist er rausgegangen.' },
          { incorrecto: 'Innerhalb eine Woche bekommst du Antwort.', correcto: 'Innerhalb einer Woche bekommst du Antwort.' }
        ],
        pasos: [
          { titulo: '🟦 1. El bloque completo', texto: 'während (durante), wegen (a causa de), trotz (a pesar de), innerhalb / außerhalb (dentro de / fuera de) — las cinco rigen Genitiv: des/der + -(e)s en masc./neutro singular.' },
          { titulo: '🟩 2. Trotz como versión nominal de obwohl', texto: 'Compárese con la subordinada concesiva "obwohl" (`b1-06`): "Obwohl es regnet, gehen wir raus" = "Trotz des Regens gehen wir raus". Misma idea, dos estructuras distintas.' },
          { titulo: '🟧 3. El error más común en el examen', texto: 'Evitar "wegen dem/trotz dem" (Dativ coloquial): en el registro estándar y en el examen se exige Genitiv siempre.', tabla: { headers: ['Preposición', 'Ejemplo correcto'], rows: [['während', 'während des Kurses'], ['wegen', 'wegen des Wetters'], ['trotz', 'trotz des Regens'], ['innerhalb', 'innerhalb einer Woche'], ['außerhalb', 'außerhalb der Stadt']] } }
        ],
        resumen: 'Repaso: während/wegen/trotz/innerhalb/außerhalb rigen siempre Genitiv (des/der + -(e)s). Evitar en el examen la forma coloquial con Dativ ("wegen dem", "trotz dem").'
      }
    ] } },
    { day: 29, semana: 4, focus: 'Simulacro final (1/2): escritura evaluada + repaso ligero', ruleIds: ['b1-02', 'b1-06'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 30, semana: 4, focus: 'Simulacro final (2/2): mündliche evaluada, los 3 Teile', ruleIds: ['b1-09'], esClaseEnVivo: false, contenido: { reglas: [] } }
  ]
};
