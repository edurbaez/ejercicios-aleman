window.TEACHER_CLASES = {
  b1: [
    {
      semana: 1,
      martes: {
        day: 2,
        focus: "Genitivo + declinación de adjetivos + conectores subordinantes",
        ruleIds: ['b1-04', 'b1-05', 'b1-06'],
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
                { titulo: '🟧 3. Alternativa coloquial', texto: 'En la calle casi nadie dice "des Mannes" — se dice "von dem Mann" (von + Dativo). El genitivo real se mantiene vivo sobre todo en escritura formal y tras las preposiciones fijas.' },
                { titulo: '🟨 4. Truco para memorizar', texto: 'Aprende "wegen, trotz, während, statt" como un bloque cerrado: son las 4 preposiciones de genitivo que sí se usan constantemente en el habla cotidiana, a diferencia del genitivo posesivo.' }
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
                { titulo: '🟦 1. Tres declinaciones posibles', texto: 'Débil (tras der/die/das): el artículo ya da toda la información, el adjetivo solo lleva -e o -en. Mixta (tras ein/kein/mein…): el adjetivo compensa donde el artículo no marca el caso. Fuerte (sin artículo): el adjetivo hace todo el trabajo del artículo.' },
                { titulo: '🟩 2. Por dónde empezar', texto: 'Practica primero solo con artículo definido (der alte Mann, die alte Frau, das alte Kind) — es la más fácil, solo -e/-en. Introduce indefinido y "sin artículo" después.' },
                {
                  titulo: '🟧 3. Tabla de terminaciones',
                  texto: 'Nominativo, comparando los tres casos:',
                  tabla: { headers: ['', 'Masc. Nom.', 'Masc. Akk.', 'Fem. Nom.', 'Neutro Nom.'], rows: [['Def. (der/die/das)', '-e', '-en', '-e', '-e'], ['Indef. (ein/kein)', '-er', '-en', '-e', '-es'], ['Sin artículo', '-er', '-en', '-e', '-es']] }
                },
                { titulo: '🟨 4. Truco', texto: 'Sin artículo, el adjetivo copia la terminación del artículo definido: der→-er, dem→-em, den→-en, des→-en. Si ya saben el artículo definido, "sin artículo" es casi gratis.' }
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
                { titulo: '🟩 2. Si la subordinada va primero', texto: 'La oración principal empieza directamente con el verbo (se mantiene la regla V2 de toda la oración): "Weil ich eine Prüfung habe, LERNE ich." — no "ich lerne".' },
                {
                  titulo: '🟧 3. Tabla de conectores',
                  texto: '',
                  tabla: { headers: ['Conector', 'Significado', 'Uso'], rows: [['weil / da', 'porque', 'causa'], ['dass', 'que', 'contenido indirecto'], ['obwohl', 'aunque', 'concesión'], ['wenn', 'cuando / si', 'condición o hábito'], ['als', 'cuando', 'momento único pasado'], ['bevor', 'antes de que', 'temporal'], ['nachdem', 'después de que', 'temporal']] }
                },
                { titulo: '🟨 4. Wenn vs. als', texto: 'Español no distingue: ambos son "cuando". "Wenn" = condición o algo que se repite (en cualquier tiempo); "als" = un momento único y concreto en el pasado. Es el error más frecuente en B1.' }
              ],
              resumen: 'El verbo conjugado va al final de la subordinada. Si esta va primero, la principal arranca directo con el verbo. Ojo con wenn (condición/hábito) vs. als (momento único en pasado) — en español ambos son "cuando".'
            }
          ]
        }
      },
      jueves: {
        day: 4,
        focus: "Futuro + Plusquamperfekt + wenn vs. als",
        ruleIds: ['b1-10', 'b1-11', 'b1-12'],
        contenido: { reglas: [] }
      }
    },
    {
      semana: 2,
      martes: {
        day: 9,
        focus: "Negationswörter + adverbios locales + verbos de posición/dirección",
        ruleIds: ['b1-25', 'b1-26', 'b1-27'],
        contenido: { reglas: [] }
      },
      jueves: {
        day: 11,
        focus: "Partizip I als Adjektiv + repaso Präteritum/Konjunktiv II",
        ruleIds: ['b1-31', 'b1-01', 'b1-02'],
        contenido: { reglas: [] }
      }
    },
    {
      semana: 3,
      martes: {
        day: 16,
        focus: "Consolidación: oraciones de relativo + verbos con preposición fija",
        ruleIds: ['b1-03', 'b1-07'],
        contenido: { reglas: [] }
      },
      jueves: {
        day: 18,
        focus: "Declinación de adjetivos (kasus.html) + repaso Adjektive als Nomen",
        ruleIds: ['b1-05', 'b1-18'],
        contenido: { reglas: [] }
      }
    },
    {
      semana: 4,
      martes: {
        day: 23,
        focus: "Repaso: preposiciones temporales + verbos de posición/dirección",
        ruleIds: ['b1-21', 'b1-27'],
        contenido: { reglas: [] }
      },
      jueves: {
        day: 25,
        focus: "Repaso: Negationswörter + lassen",
        ruleIds: ['b1-25', 'b1-28'],
        contenido: { reglas: [] }
      }
    }
  ]
};
