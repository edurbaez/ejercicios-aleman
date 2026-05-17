# Posibles mejoras — gramatica.html / gramatica.js

> Última actualización: 2026-05-16

---

## Implementadas ✅

| # | Mejora | Notas |
|---|--------|-------|
| 1 | Explicaciones extendidas | 60 reglas (A1–C2) con 4-6 oraciones cada una |
| 2 | Búsqueda de reglas | Filtra en tiempo real en todos los niveles; badge de nivel en resultados |
| 3 | Favoritos | Botón ☆/★ por regla, persistido en `localStorage`; vista "★ Favs" en la barra de niveles |
| 4 | Progreso de lectura | Contador `N/10` en cada pill de nivel; punto naranja en reglas ya abiertas |
| 5 | Quiz por regla | Botón "Practicar" — muestra el español, 4 opciones, feedback con color |
| 6 | Repaso rápido | Overlay con los tips del nivel activo, barra de progreso, navegación Anterior/Siguiente |
| 7 | Compartir enlace | Botón "Copiar enlace" genera `gramatica.html#b2-07`; la URL abre y expande esa regla |
| 8 | Navegación por teclado | `←`/`→` niveles · `↑`/`↓` reglas · `F` favorito · `Esc` cierra repaso |

---

## Pendientes (requieren servicio adicional)

| # | Mejora | Dependencia |
|---|--------|-------------|
| 9 | Audio TTS por ejemplo | `/api/tts` (ya existe) — botón 🔊 junto a cada frase alemana |
| 10 | Ejercicios generados por IA | `/api/chat` — genera fill-in-the-blank a partir de la regla activa |

---

## Ideas de mejora futura (sin servicios)

- **Tabla de declinaciones interactiva** — reemplazar los ejemplos de casos por una tabla der/die/das/Pl con la celda activa resaltada al pasar el cursor. Requiere añadir un campo `tabla[]` a las reglas relevantes en `GRAMMAR_DATA`.
- **Estadísticas de quiz** — guardar en `localStorage` el historial de aciertos/errores por regla y mostrar un mini-indicador de dominio (% correcto) junto al título.
- **Orden aleatorio en repaso rápido** — opción para barajar los tips en vez de seguir el orden de la lista.

---

## Modo Examen — Plan de implementación detallado

> Estado: pendiente de implementar  
> Archivos a modificar: `gramatica.html`, `gramatica.js`, `styles.css`

### Concepto

Quiz cerrado de 10 preguntas generadas por IA (`/api/chat`). Los temas son **N reglas aleatorias** del nivel activo (N configurable, default 5). El modelo recibe los títulos y ejemplos de esas reglas y genera 2 ejercicios por regla. El usuario responde sin feedback inmediato; al final ve la puntuación y las correcciones.

---

### Selección aleatoria de reglas (detalle)

Cada nivel tiene exactamente 10 reglas en `GRAMMAR_DATA`. El examen toma **5 reglas al azar** del nivel activo:

```js
function pickRandomRules(level, count = 5) {
  const rules = GRAMMAR_DATA[level];           // array de 10 reglas
  const shuffled = [...rules].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
```

Cada vez que el usuario inicia un examen las reglas cambian — nunca el mismo examen dos veces.

---

### Llamada a la API

**Una sola llamada** al inicio del examen. Se envían los títulos, subtítulos y un ejemplo por regla para dar contexto al modelo sin exceder el límite de 2 000 chars del system prompt.

**System prompt (en `gramatica.js`, constante `EXAM_SYSTEM_PROMPT`):**
```
Eres un profesor de alemán. Genera exactamente 10 ejercicios de gramática en JSON.
Cada ejercicio cubre una de las reglas proporcionadas (2 ejercicios por regla).
Tipos permitidos: "completar" (fill-in-the-blank), "elegir" (multiple choice 4 opciones).
Varía los tipos entre los 10 ejercicios.
Responde ÚNICAMENTE con un array JSON válido, sin texto adicional.
```

**User message:** lista de las 5 reglas seleccionadas con título + subtítulo + 1 ejemplo.

**Formato JSON esperado de la respuesta:**
```json
[
  {
    "tipo": "completar",
    "enunciado": "Ich ___ gestern ins Kino gegangen.",
    "respuesta_correcta": "bin",
    "explicacion": "Perfekt con sein: verbos de movimiento usan sein como auxiliar.",
    "regla_id": "b1-05"
  },
  {
    "tipo": "elegir",
    "enunciado": "¿Cuál es el artículo correcto? ___ Tisch ist neu.",
    "opciones": ["Der", "Die", "Das", "Den"],
    "respuesta_correcta": "Der",
    "explicacion": "Tisch es masculino → der en nominativo.",
    "regla_id": "a1-01"
  }
]
```

---

### Estados del modo examen

```
IDLE → LOADING → IN_PROGRESS → RESULTS
```

| Estado | Descripción |
|--------|-------------|
| `IDLE` | Estado normal de la app. Botón "Modo Examen" visible en la barra de niveles. |
| `LOADING` | Spinner mientras la API genera los ejercicios. Muestra las reglas seleccionadas para transparencia. |
| `IN_PROGRESS` | Overlay de pantalla completa. Una pregunta a la vez. Sin feedback de correcto/incorrecto. |
| `RESULTS` | Pantalla final con puntuación, detalle de errores y botones de acción. |

---

### UI — Componentes nuevos

#### 1. Botón de entrada (barra de niveles)
```html
<button id="exam-btn">📝 Examen</button>
```
- Se añade al final de los pills de nivel en `gramatica.html`
- Color naranja `#E65100` (mismo acento de la app)

#### 2. Overlay de carga (`#exam-loading`)
```
┌─────────────────────────────┐
│  Preparando tu examen...    │
│  ○ Artículos definidos      │
│  ○ Acusativo básico         │
│  ○ Perfekt                  │
│  ○ Konjunktiv II            │
│  ○ Passiv                   │
│  [spinner animado]          │
└─────────────────────────────┘
```

#### 3. Pantalla de pregunta (`#exam-question`)
```
┌─────────────────────────────┐
│ Pregunta 3 / 10             │
│ ████████░░░░░░░░  30%       │
│                             │
│ Ich ___ gestern ins Kino    │
│ gegangen.                   │
│                             │
│  [bin]  [habe]              │
│  [war]  [wurde]             │ ← tipo "elegir"
│                             │
│ — o —                       │
│                             │
│ Ich ___ [input] gegangen.   │ ← tipo "completar"
│                    [→]      │
└─────────────────────────────┘
```
- Sin botón de salir durante el test (solo `Esc` con confirmación)
- Respuesta seleccionada queda resaltada; botón "Siguiente" aparece al responder

#### 4. Pantalla de resultados (`#exam-results`)
```
┌─────────────────────────────┐
│  Resultado: 7 / 10  🎉      │
│  Nivel B1 · 5 reglas        │
│                             │
│  ✅ Ich bin gegangen.       │
│  ❌ du gehst → du gehst ✓   │
│     [Perfekt con sein]      │
│  ...                        │
│                             │
│  [Repetir examen]  [Ver reglas falladas]  [Cerrar]
└─────────────────────────────┘
```
- "Ver reglas falladas": filtra y expande en el acordeón solo las reglas donde hubo error

---

### Lógica en `gramatica.js` — Funciones nuevas

| Función | Responsabilidad |
|---------|-----------------|
| `pickRandomRules(level, count)` | Devuelve N reglas aleatorias del nivel. |
| `buildExamPrompt(rules)` | Construye el user message con los datos de las reglas. |
| `fetchExamQuestions(rules)` | Llama `/api/chat`, parsea JSON, valida estructura. |
| `startExam()` | Orquesta: `pickRandomRules` → `fetchExamQuestions` → muestra overlay. |
| `renderQuestion(index)` | Renderiza la pregunta actual (tipo completar o elegir). |
| `submitAnswer(answer)` | Guarda respuesta, avanza al siguiente o muestra resultados. |
| `showResults()` | Calcula puntuación, renderiza pantalla de resultados. |
| `highlightFailedRules()` | Abre acordeón en las reglas con errores tras cerrar resultados. |

---

### Manejo de errores de API

- Si la respuesta no es JSON válido: reintentar una vez automáticamente, luego mostrar mensaje "No se pudo generar el examen, intenta de nuevo" con botón de retry.
- Si hay error de red o 429 (rate limit): mensaje específico "Límite de peticiones alcanzado, espera un momento".
- Validar que el array tenga exactamente 10 items antes de iniciar; si hay menos, completar con preguntas de las reglas disponibles o mostrar error.

---

### CSS en `styles.css` — Nuevas secciones

- `.exam-overlay` — posición fixed, z-index alto, fondo blanco/oscuro, scroll interno
- `.exam-question-card` — tarjeta centrada, max-width 600px
- `.exam-option-btn` — botones de opción, borde naranja al hover, verde/rojo al revelar en resultados
- `.exam-progress` — barra de progreso naranja (misma estética que repaso rápido)
- `.exam-results-item` — fila de resultado con icono ✅/❌ y explicación colapsable

---

### Orden de implementación

1. `gramatica.js` — funciones `pickRandomRules` y `buildExamPrompt`
2. `gramatica.js` — función `fetchExamQuestions` con manejo de errores
3. `gramatica.html` — añadir botón y estructuras HTML del overlay
4. `gramatica.js` — funciones `startExam`, `renderQuestion`, `submitAnswer`
5. `gramatica.js` — función `showResults` y `highlightFailedRules`
6. `styles.css` — estilos del examen (modo claro y oscuro)
7. Prueba manual: generar examen, responder, verificar resultados y "ver reglas falladas"
