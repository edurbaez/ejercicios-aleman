# Plan de Mejoras — Sección Gramática

> Iniciado: 2026-06-04  
> Scope: `gramatica.js` + `gramatica.html` + estilos en `styles.css`  
> Base: diagnóstico de la implementación actual (acordeón A1–C2, quiz de opción múltiple, examen vía API, SRS, repaso rápido)

## regla obligatoria
 - despues de imsplementar cualquier cosa actualiza plan.md

---

## Diagnóstico del estado actual

### Lo que funciona bien
- Acordeón por nivel (A1–C2) con 10 reglas cada uno.
- Explicaciones detalladas con ejemplos y tip.
- SRS (SM-2) para espaciar el repaso.
- Examen por nivel: genera 10 preguntas vía GPT-4o (5 reglas × 2 ejercicios). Tipos: `completar` y `elegir`.
- Búsqueda global de reglas.
- Favoritos, lectura marcada, hash routing.

### Problemas identificados

#### En las explicaciones
- El texto es denso: un solo párrafo largo por regla. El estudiante no distingue a primera vista la estructura (regla base → excepciones → patrones → trampas).
- Los ejemplos son solo 4 frases estáticas. No hay contexto situacional ni variedad por nivel de dificultad.
- El `tip` es la parte más útil pero está al final y pasa desapercibido visualmente.
- No hay diferenciación visual entre el concepto central y los casos borde.

#### En los ejercicios por regla (quiz inline)
- Solo un tipo de ejercicio: opción múltiple de traducción directa (elige la frase alemana que corresponde a la española).
- Las distractoras son otras frases del mismo nivel, no variantes gramaticales. No fuerzan razonar la regla.
- No hay feedback explicativo: solo "✓ Correcto" o "✗ La respuesta era X". No enseña por qué.
- Una sola pregunta a la vez; no hay progreso visible ni incentivo a continuar.
- Ninguna mecánica de variedad: siempre es "elige la traducción".

#### En el examen por nivel
- Pide todas las preguntas a la vez (10 en un solo call). Si falla la API, el usuario ve solo un spinner y un error; pierde todo.
- El resultado muestra ✅/❌ pero no relaciona el error con la regla específica ni sugiere qué repasar.
- No hay resumen por regla (ej. "fallaste 2 de 2 en Wechselpräpositionen").
- Feedback visual de resultados: lista plana de preguntas, difícil de procesar.
- Sin variedad de tipos: el prompt no incluye tipos como "ordenar palabras", "detectar el error", "completar con la forma correcta del artículo".
- No hay examen mixto (multi-nivel), útil para estudiantes que quieren consolidar varios niveles.

---

## Mejoras planificadas

---

### BLOQUE 1 — Explicaciones más didácticas

**Objetivo:** que el estudiante entienda la regla en 30 segundos antes de practicar.

#### 1.1 Reestructurar el contenido de cada regla en secciones visuales

En vez de un párrafo plano, mostrar:

```
┌──────────────────────────────────────────────┐
│  REGLA BASE (1–2 frases, texto destacado)    │
│  PATRÓN / TABLA (cuando aplica)              │
│  EXCEPCIÓN (etiqueta "⚠️ Cuidado")           │
│  TRUCO MNEMOTÉCNICO (etiqueta "💡 Tip")      │
└──────────────────────────────────────────────┘
```

**Implementación:**
- Agregar campos opcionales a cada regla en `GRAMMAR_DATA`:
  - `regla_base`: string — la regla nuclear en 1–2 frases.
  - `tabla`: array de filas `{ label, value }` para tablas de declinación/conjugación.
  - `excepciones`: string — casos especiales o trampas.
- El campo `explicacion` actual pasa a ser el "desarrollo completo" (colapsable con "Leer más").
- El `tip` se promueve visualmente: badge naranja fijo, siempre visible al abrir la regla.

#### 1.2 Ejemplos con audio y contexto situacional

- Cada regla puede tener hasta 6 ejemplos organizados en dos grupos:
  - `ejemplos_basicos` (2–3): ilustran el caso más simple.
  - `ejemplos_avanzados` (2–3, opcional): muestran el caso en oraciones más naturales o con excepciones.
- Cada ejemplo lleva un botón TTS (ya existe, mantener).
- Para los niveles B2–C2 agregar `contexto` a cada ejemplo: una etiqueta pequeña que indica el registro (formal, coloquial, literario, etc.).

#### 1.3 Tabla de referencia rápida para reglas con declinación/conjugación

Para reglas de artículos, verbos modales, casos, comparativo: renderizar una tabla compacta en lugar de (o además de) texto.

```
Nominativo   der   die   das   die (pl)
Acusativo    den   die   das   die (pl)
Dativo       dem   der   dem   den+n
Genitivo     des   der   des   der
```

**Implementación:** campo `tabla` en `GRAMMAR_DATA`. Si existe, `renderRuleCard` inserta una `<table class="gram-table">` antes del bloque de ejemplos.

---

### BLOQUE 2 — Ejercicios por regla más variados y con feedback real

**Objetivo:** cada sesión de práctica se siente diferente; el estudiante razona la regla, no solo reconoce.

#### 2.1 Nuevos tipos de ejercicio (inline, sin API)

Los tipos actuales y nuevos se ejecutan completamente en el cliente, usando los datos ya embebidos en `GRAMMAR_DATA`. Sin llamadas a la API — respuesta instantánea, disponibles offline.

| Tipo | Descripción | Dónde aplica |
|------|-------------|-------------|
| `opcion_multiple` | Actual: elige la frase alemana (mejorar distractoras) | Todos |
| `completar_articulo` | La frase tiene `___` y el estudiante elige entre 4 formas del artículo (der/die/das/den/dem…) | Reglas de casos |
| `ordenar_palabras` | Palabras desordenadas → arrastrar o clic para ordenar la frase correcta (V2, verbos separables) | A1-08, A2-07 |
| `detectar_error` | Se muestra la frase con un error gramatical; el estudiante lo identifica y lo corrige | B1–C2 |
| `traduccion_inversa` | Se muestra la frase en español; el estudiante escribe la forma alemana (solo la palabra crítica, no la frase entera) | Todos |
| `par_correcto` | Mostrar 4 pares de (artículo + sustantivo) y elegir el correcto para el caso indicado | Casos |

**Cómo asignar tipos por regla:**
- Agregar campo `ejercicio_tipos` a cada regla: `['completar_articulo', 'ordenar_palabras']`.
- `startQuiz()` elige al azar uno de los tipos disponibles para esa regla → variedad garantizada.
- Las preguntas se construyen dinámicamente a partir de `rule.ejemplos` (no requieren datos extra).

#### 2.2 Feedback explicativo después de cada respuesta

Actualmente: "✗ La respuesta correcta era X".  
Nuevo: mostrar el `tip` de la regla + una frase corta de por qué:

```
✗ Incorrecto — la respuesta era "den Mann".
💡 En acusativo, solo el artículo masculino cambia: der → den.
   Recuerda: femenino, neutro y plural no cambian en acusativo.
```

**Implementación:** al construir cada ejercicio inline, guardar el `tip` de la regla; mostrarlo en el `gram-quiz-feedback` siempre (correcto o incorrecto), con estilo diferente.

#### 2.3 Mini-racha por regla (3 preguntas en secuencia)

En vez de una sola pregunta con "Nueva pregunta" manual, mostrar automáticamente 3 preguntas consecutivas (tipos variados) con barra de progreso. Al terminar: resultado `N/3` con opción "Repetir" o "Cerrar".

**Implementación:**
- `QuizSession` object: `{ ruleId, questions: [], currentIndex, results: [] }`.
- `startQuiz(ruleId)` genera 3 preguntas de tipos diferentes.
- `nextQuizQuestion()` avanza automáticamente.
- Al llegar a 3: muestra mini-resultado, actualiza SRS con el rating basado en aciertos.

#### 2.4 Gamificación liviana: racha y estrellas

- Si el estudiante responde bien las 3: aparece un "⚡ ¡Racha!" con animación CSS breve.
- El botón SRS de la regla muestra `★★★` / `★★☆` / `★☆☆` según el rendimiento reciente.
- Un contador global `gram_daily_score` en localStorage: cuántos ejercicios correctos hoy (visible en el toolbar como "Hoy: N ✓").

---

### BLOQUE 3 — Examen por nivel mejorado

**Objetivo:** examen más robusto, resultados más útiles, más variedad de tipos.

#### 3.1 Nuevos tipos de pregunta en el examen (vía API)

Ampliar el `EXAM_SYSTEM_PROMPT` con 3 tipos adicionales:

| Tipo | Descripción |
|------|-------------|
| `ordenar` | 4–6 palabras desordenadas; el estudiante escribe la frase correcta (valida ignorando espacios extra) |
| `detectar_error` | Frase con un error gramatical; el estudiante escribe la forma correcta |
| `transformar` | Se da una frase base y una instrucción ("Transforma a plural", "Pon en Perfekt"); el estudiante escribe la forma transformada |

**Distribución sugerida:** de las 10 preguntas, 4 tipo `elegir`, 3 tipo `completar`, 2 tipo `detectar_error`, 1 tipo `transformar`. El prompt lo especifica con cuotas.

#### 3.2 Feedback inmediato por pregunta (no al final)

- Actualmente: el estudiante responde las 10 sin ver si va bien; solo ve resultados al terminar.
- Nuevo: después de cada respuesta, mostrar ✓/✗ con explicación de 2–3 líneas, luego "Siguiente →".
- Mantener la explicación que ya genera la API (`q.explicacion`), simplemente mostrarla después de responder.

**Implementación:** `selectExamOption()` y `submitExamInput()` muestran la explicación y el botón "Siguiente →" en el mismo panel, sin saltar a la siguiente pregunta automáticamente.

#### 3.3 Resumen por regla en resultados

Al mostrar resultados, agrupar los errores por regla:

```
📖 Reglas a repasar:
  • Wechselpräpositionen — 0 / 2 correctas  [→ Ver regla]
  • Comparativo            — 1 / 2 correctas  [→ Ver regla]
```

Cada ítem tiene un enlace que lleva a `gramatica.html#<rule-id>` directamente.

**Implementación:** tras `showExamResults()`, agrupar `items` por `q.regla_id`. Para cada regla con al menos un error: mostrar bloque con enlace hash.

#### 3.4 Examen incremental (pregunta por pregunta, no batch)

- Problema actual: si la API tarda o falla, el usuario espera 10+ segundos y puede perder todo.
- Nuevo flujo:
  1. Generar las preguntas de 2 en 2 (llamadas de 2 preguntas).
  2. Mostrar la primera pareja mientras se solicitan las siguientes.
  3. Si falla una llamada: mostrar "No se pudo cargar la siguiente pregunta" con botón "Reintentar".
- Esto requiere cambiar `buildExamPrompt` para aceptar 1 regla y generar 2 preguntas, y encadenar las llamadas.

#### 3.5 Examen mixto multi-nivel

- Nuevo botón en el toolbar: "🎲 Examen mixto" — elige 1 regla al azar de cada nivel (A1–B2) para un examen de 8 reglas / ~16 preguntas.
- Útil para estudiantes que ya pasaron varios niveles y quieren mantenerse.
- Implementar como `startMixedExam()` con `pickRandomRules` por cada nivel.

#### 3.6 Activar SRS automáticamente desde resultados del examen

- Si una regla falló ≥1 pregunta → llamar `updateSRSEntry(rule.id, 1)` para marcarla como "no la sé" y programar repaso.
- Si acertó ambas → llamar `updateSRSEntry(rule.id, 4)`.
- Mostrar en resultados: "✓ SRS actualizado — X reglas programadas para repaso."

---

### BLOQUE 4 — Mejoras de UX y variedad visual

#### 4.1 Modo "Flashcard" por nivel

- Un nuevo botón en el toolbar: "🃏 Flashcards".
- Muestra una regla a la vez en formato tarjeta: anverso = título + subtítulo; reverso = explicación + ejemplos.
- Navegar con teclas ← → o swipe (touch).
- Diferente del "Repaso rápido" actual (que solo muestra el tip): las flashcards incluyen el contenido completo.
- No requiere API; es una presentación alternativa de `GRAMMAR_DATA`.

#### 4.2 Indicador de progreso más visual

- Cambiar los números `3/10` en las pestañas de nivel por una barra de progreso circular pequeña (SVG).
- Añadir en el header de cada nivel: "Completadas: 7 · Pendientes SRS: 2 · Sin ver: 1".

#### 4.3 Estimación de tiempo de lectura

- Cada regla muestra debajo del subtítulo: "~2 min lectura · 3 ejercicios".
- El "~2 min" se calcula con `Math.ceil(explicacion.split(' ').length / 200)`.

#### 4.4 Historial de exámenes

- Tabla de los últimos 5 exámenes del usuario (nivel, puntuación, fecha) visible en un panel expandible.
- Datos ya se guardan en Supabase (`exam_results`); solo falta leerlos y mostrarlos.

---

## Orden de implementación sugerido

| Prioridad | Bloque | Tarea | Esfuerzo |
|-----------|--------|-------|---------|
| 🔴 Alta | 2 | Feedback explicativo después de cada respuesta | Bajo |
| 🔴 Alta | 3 | Feedback inmediato por pregunta en examen | Bajo |
| 🔴 Alta | 3 | Resumen por regla en resultados del examen | Medio |
| 🟡 Media | 2 | Mini-racha de 3 preguntas por regla | Medio |
| 🟡 Media | 2 | Nuevos tipos de ejercicio inline (completar_articulo, detectar_error) | Medio |
| 🟡 Media | 1 | Reestructurar contenido de regla (regla_base, tabla, excepciones) | Alto |
| 🟡 Media | 3 | Nuevos tipos de pregunta en examen (detectar_error, transformar) | Medio |
| 🟢 Baja | 3 | Examen incremental (pregunta por pregunta) | Alto |
| 🟢 Baja | 3 | Examen mixto multi-nivel | Bajo |
| 🟢 Baja | 3 | Activar SRS automáticamente desde resultados | Bajo |
| 🟢 Baja | 4 | Modo Flashcard | Medio |
| 🟢 Baja | 4 | Historial de exámenes | Bajo |
| 🟢 Baja | 2 | Gamificación liviana (racha, contador diario) | Bajo |

---

## Estado

| Bloque | Estado |
|--------|--------|
| 1 — Explicaciones didácticas | ✅ Completado (2026-06-05) |
| 2 — Ejercicios variados + feedback | ⬜ Pendiente |
| 3 — Examen mejorado | ✅ Completado (2026-06-06) |
| 4 — UX y variedad visual | ⬜ Pendiente |

### Bloque 3 — Detalle de lo implementado

- **3.1 Nuevos tipos en el examen**: `EXAM_SYSTEM_PROMPT` ampliado con `detectar_error`, `transformar`, `ordenar`. Cada llamada pide 2 ejercicios de tipos variados por regla.
- **3.2 Feedback inmediato por pregunta**: `selectExamOption` y `submitExamInput` muestran `showExamFeedback()` con ✓/✗, respuesta correcta y `q.explicacion`. Las opciones se colorean (verde/rojo) al responder.
- **3.3 Resumen por regla en resultados**: `showExamResults()` agrupa por `regla_id` y muestra "📖 Reglas a repasar:" con contador N/M y enlace "→ Ver regla" que abre el acordeón.
- **3.4 Examen incremental**: `startExamWithRules()` hace fetch de la primera regla para desbloquear la UI, luego las restantes en paralelo. Si una falla, muestra estado `{_state:'error'}` con botón "↺ Reintentar". `renderExamQuestion` maneja estados `loading` / `error` / normal.
- **3.5 Examen mixto**: `startMixedExam()` — botón "🎲 Mixto" en la barra. Elige 2 reglas al azar de A1, A2, B1, B2 (= 8 reglas / ~16 preguntas). `examRepeat()` repite el tipo correcto al terminar.
- **3.6 SRS automático desde resultados**: `showExamResults()` calcula rating por regla (1/2/4) y llama `updateSRSEntry()`. Muestra "✓ SRS actualizado — N reglas programadas para repaso."

---

### Bloque 1 — Detalle de lo implementado

- **60 reglas enriquecidas** (A1–C2) con campo `regla_base` (núcleo de la regla en 1–2 frases).
- **Tablas** (`tabla`) añadidas a ~35 reglas: declinaciones, conjugaciones, listas de preposiciones, conectores, etc.
- **Excepciones** (`excepciones`) añadidas a ~40 reglas: trampas y casos borde con etiqueta ⚠️.
- **`renderRuleCard`** actualizado: muestra regla_base en bloque naranja destacado, tabla si existe, excepciones si existen, botón "▼ Leer más" para colapsar/expandir el texto `explicacion`.
- **`renderTabla`** nueva función que construye `<table class="gram-tabla">` desde datos estructurados.
- **`toggleExplicacion`** nueva función para mostrar/ocultar el texto largo (DOM directo, sin re-render).
- **`getSearchResults`** actualizado para incluir `regla_base` y `excepciones` en el índice de búsqueda.
- **CSS** en `styles.css`: `.gram-regla-base`, `.gram-tabla`, `.gram-excepcion`, `.gram-exp-toggle`, `.gram-rule-explicacion.open`.
