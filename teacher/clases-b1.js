window.TEACHER_CLASES = {
  b1: [
    { day: 1, semana: 1, focus: 'Präteritum + Konjunktiv II + oraciones de relativo', ruleIds: ['b1-01', 'b1-02', 'b1-03'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 3, semana: 1, focus: 'Verbos con preposición fija + infinitivo con zu + pasiva básica', ruleIds: ['b1-07', 'b1-08', 'b1-09'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 5, semana: 1, focus: 'Preguntas indirectas + infinitivo sin zu + relativas con preposición', ruleIds: ['b1-13', 'b1-14', 'b1-15'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 6, semana: 1, focus: 'je…desto + n-Deklination + Adjektive als Nomen', ruleIds: ['b1-16', 'b1-17', 'b1-18'], esClaseEnVivo: false, contenido: { reglas: [] } },
    {
      day: 7,
      semana: 1,
      focus: 'da-/wo-Präpositionaladverbien + preposiciones con Genitiv + preposiciones temporales',
      ruleIds: ['b1-19', 'b1-20', 'b1-21'],
      esClaseEnVivo: false,
      contenido: { reglas: [] }
    },
    { day: 8, semana: 2, focus: 'Funciones de werden + verbos separables/inseparables + reflexivos ampliado', ruleIds: ['b1-22', 'b1-23', 'b1-24'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 10, semana: 2, focus: 'lassen + Finalsätze um…zu/damit + Doppelkonnektoren', ruleIds: ['b1-28', 'b1-29', 'b1-30'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 12, semana: 2, focus: 'Repaso: oraciones de relativo + Genitiv + declinación de adjetivos', ruleIds: ['b1-03', 'b1-04', 'b1-05'], esClaseEnVivo: false, contenido: { reglas: [] } },
    {
      day: 13,
      semana: 2,
      focus: 'Repaso: conectores subordinantes + verbos con preposición fija + infinitivo con zu',
      ruleIds: ['b1-06', 'b1-07', 'b1-08'],
      esClaseEnVivo: false,
      contenido: { reglas: [] }
    },
    { day: 14, semana: 2, focus: 'Repaso: pasiva básica + futuro', ruleIds: ['b1-09', 'b1-10'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 15, semana: 3, focus: 'Consolidación: Präteritum + Konjunktiv II', ruleIds: ['b1-01', 'b1-02'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 17, semana: 3, focus: 'Genitiv (kasus.html) + repaso n-Deklination', ruleIds: ['b1-04', 'b1-17'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 19, semana: 3, focus: 'Contraste: infinitivo con zu vs. sin zu', ruleIds: ['b1-08', 'b1-14'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 20, semana: 3, focus: 'Pasiva básica + funciones de werden', ruleIds: ['b1-09', 'b1-22'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 21, semana: 3, focus: 'Conectores subordinantes + wenn vs. als (ampliado)', ruleIds: ['b1-06', 'b1-12'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 22, semana: 4, focus: 'Repaso: da-/wo-Präpositionaladverbien + preposiciones con Genitiv', ruleIds: ['b1-19', 'b1-20'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 24, semana: 4, focus: 'Repaso: verbos separables/inseparables + reflexivos ampliado', ruleIds: ['b1-23', 'b1-24'], esClaseEnVivo: false, contenido: { reglas: [] } },
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
    { day: 26, semana: 4, focus: 'Repaso: Finalsätze um…zu/damit + Doppelkonnektoren', ruleIds: ['b1-29', 'b1-30'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 27, semana: 4, focus: 'Repaso general: Plusquamperfekt + Partizip I als Adjektiv', ruleIds: ['b1-11', 'b1-31'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 28, semana: 4, focus: 'Repaso libre: preguntas indirectas + je…desto + preposiciones con Genitiv', ruleIds: ['b1-13', 'b1-16', 'b1-20'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 29, semana: 4, focus: 'Simulacro final (1/2): escritura evaluada + repaso ligero', ruleIds: ['b1-02', 'b1-06'], esClaseEnVivo: false, contenido: { reglas: [] } },
    { day: 30, semana: 4, focus: 'Simulacro final (2/2): mündliche evaluada, los 3 Teile', ruleIds: ['b1-09'], esClaseEnVivo: false, contenido: { reglas: [] } }
  ]
};
