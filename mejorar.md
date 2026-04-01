# Sugerencias de Mejora

Análisis basado en la lectura del código real de `palabrasB2.html`, `lectura veloz.html` y `styles.css`.
Todas las sugerencias respetan la arquitectura existente: HTML puro, sin build system, sin dependencias externas salvo las ya usadas.

---

## palabrasB2.html

### 1. Modo inverso DE → ES
**Qué:** Un botón que invierta el sentido del quiz: mostrar la palabra en alemán y elegir la traducción al español.
**Por qué:** El aprendizaje bidireccional es mucho más efectivo. La lógica ya existe — solo hay que intercambiar `State.es` y `State.de` en `renderSelectionNext()`.
**Escalabilidad:** No requiere cambiar DATA ni la estructura de sets.

---

### 2. Atajos de teclado en el quiz
**Qué:** Teclas `1`, `2`, `3`, `4` para seleccionar opciones; `Espacio` para avanzar en modo repetición.
**Por qué:** En escritorio, el quiz es lento si el usuario tiene que hacer clic. Con teclado la sesión fluye mucho más rápido.
**Escalabilidad:** Añadir un `keydown` listener similar al que ya existe en `lectura veloz.html`.

---

### 3. Estadísticas persistentes por lista
**Qué:** Guardar en `localStorage` cuántas veces se respondió bien/mal cada palabra de cada lista.
**Por qué:** Permite detectar qué palabras son sistemáticamente difíciles entre sesiones y priorizarlas.
**Escalabilidad:** Clave `b2_stats_<listKey>` como objeto `{ [index]: { ok, fail } }`. Compatible con cualquier lista futura en `DATA`.

---

### 4. Ponderación de palabras difíciles
**Qué:** En `nextUnseenIndex()`, aumentar la probabilidad de que aparezcan palabras con alta tasa de error histórica.
**Por qué:** Refuerza justo donde el usuario necesita más práctica.
**Escalabilidad:** Depende de la mejora #3. Se implementa modificando el sampling en `nextUnseenIndex()` sin tocar DATA.

---

### 5. Resumen al completar un set
**Qué:** Cuando `aciertos >= State.winnummer`, mostrar un panel con: tiempo total, errores, lista de palabras falladas con su traducción correcta.
**Por qué:** El timer ya para en ese punto; es el momento natural para consolidar el aprendizaje.
**Escalabilidad:** Solo requiere leer `State.erroresSet` y mapear contra `State.es`/`State.de`.

---

### 6. Filtro/búsqueda en la tabla de palabras
**Qué:** Un `<input>` encima de la tabla `#lista` que filtre filas en tiempo real mientras el usuario escribe.
**Por qué:** La tabla puede tener +40 pares por lista; encontrar una palabra específica es tedioso.
**Escalabilidad:** Funciona con cualquier cantidad de palabras; no toca la lógica del juego.

---

### 7. Exportar errores de la sesión
**Qué:** Botón "Copiar errores" que ponga en el clipboard las palabras falladas en formato `ES — DE`.
**Por qué:** Permite al usuario llevar esas palabras a una tarjeta, Anki, o repasar en papel.
**Escalabilidad:** Una línea con `navigator.clipboard.writeText()` usando `State.erroresSet`.

---

### 8. Selección de voz TTS
**Qué:** Un `<select>` con las voces disponibles de `speechSynthesis.getVoices()` filtradas por `de-DE`.
**Por qué:** La calidad de la pronunciación varía mucho entre voces instaladas; el usuario debería poder elegir.
**Escalabilidad:** Compatible con `speakLoop()` sin modificar su lógica, solo cambiar la voz usada en `SpeechSynthesisUtterance`.

---

### 9. Contador de racha (streak)
**Qué:** Mostrar visualmente cuántas respuestas correctas consecutivas lleva el usuario.
**Por qué:** Motivación. Un simple número o animación breve en el panel de stats es suficiente.
**Escalabilidad:** Una variable `State.streak` que se resetea en error y suma en acierto.

---

### 10. Nombres descriptivos en los botones de lista
**Qué:** Los botones del `#sets-bar` muestran la clave interna (`B2_verbosb2dat`). Añadir un mapa de etiquetas legibles.
**Por qué:** "Verbos con Dativo" es mucho más claro que `B2_verbosb2dat` para el usuario.
**Escalabilidad:** Un objeto `LABELS = { lista1: "Lista 1 — Conectores", B2_verbosb2dat: "Verbos con Dativo", ... }` independiente de DATA.

---

## lectura veloz.html

### 11. Persistencia del WPM
**Qué:** Guardar el WPM elegido en `localStorage` y restaurarlo al cargar la página.
**Por qué:** El usuario siempre tiene que volver a ajustarlo; es una fricción innecesaria en cada sesión.
**Escalabilidad:** Dos líneas: `localStorage.setItem('lv_wpm', wpm)` en `changeWpm()` y lectura en el init.

---

### 12. Renombrar textos guardados
**Qué:** Un botón de edición (✏️) en cada item de `#textosguardados` que permita cambiar el nombre con un `prompt()`.
**Por qué:** Al subir un archivo el nombre se toma del filename; no siempre es el que el usuario quiere.
**Escalabilidad:** Añadir `dbUpdate(id, { name })` — una transacción `readwrite` con `put()`, mismo patrón que `dbAdd`.

---

### 13. Estadísticas del texto en RSVP
**Qué:** Antes de iniciar, mostrar: total de palabras, tiempo estimado al WPM actual.
**Por qué:** El usuario puede calibrar WPM antes de empezar, especialmente en textos largos.
**Scalabilidad:** Calcular `words.length` y `Math.ceil(words.length / wpm)` al parsear el texto.

---

### 14. Retroceder palabras en RSVP
**Qué:** Botón "« 5" que retroceda 5 palabras; también con tecla `ArrowLeft`.
**Por qué:** Si el usuario se distrae o pierde el hilo, ahora la única opción es detener y ajustar el número de inicio.
**Escalabilidad:** `index = Math.max(0, index - 5)` y llamar `showNextWord()`. El listener de `keydown` ya existe.

---

### 15. Control de velocidad de TTS en Blog View
**Qué:** Un slider o botones `+`/`−` para ajustar `utter.rate` (por defecto 1) en la lectura TTS del blog.
**Por qué:** La velocidad de TTS óptima varía mucho por idioma y por usuario.
**Escalabilidad:** Una variable `blogRate` similar a `wpm`; se aplica en el `SpeechSynthesisUtterance` dentro de `speakChunk()`.

---

### 16. Barra de progreso en Blog View
**Qué:** Una barra `<progress>` o estilo `width: X%` que muestre `chunk actual / total chunks`.
**Por qué:** La vista blog puede ser muy larga y no hay indicador de dónde se está.
**Escalabilidad:** Actualizar en `highlightChunk(i)` con `i / chunks.length * 100`.

---

### 17. Pausa natural en puntuación (RSVP)
**Qué:** Agregar un multiplicador de intervalo cuando la palabra termina en `.`, `!`, `?` o `,`.
**Por qué:** El RSVP a ritmo constante resulta fatigante; una pausa breve en puntuación mejora la comprensión.
**Escalabilidad:** En `showNextWord()`, multiplicar el timeout: `if (/[.!?,]$/.test(words[index-1])) delay *= 1.5`.

---

### 18. Drag-and-drop o reordenación de textos guardados
**Qué:** Botones ↑ / ↓ en cada item de la lista guardada para reordenar manualmente.
**Por qué:** Con muchos textos, el usuario quiere los más usados arriba sin recordar cuál fue el último cargado.
**Escalabilidad:** Añadir un campo `order` en el schema de IndexedDB (upgrade de versión a 2) o reordenar en memoria y re-insertar.

---

## Mejoras transversales (ambas apps)

### 19. PWA para Lectura Veloz
**Qué:** Añadir `lectura veloz.html` al cache del Service Worker y un segundo `manifest` o `start_url` alternativo.
**Por qué:** `palabrasB2.html` es PWA e instalable; `lectura veloz.html` no lo es, aunque el `sw.js` ya está en el mismo origen.
**Escalabilidad:** Añadir la URL al array de cache en `sw.js` y un link `<rel="manifest">` en `lectura veloz.html`.

---

### 20. Enlace directo entre apps con estado preservado
**Qué:** Al hacer clic en "Lectura Veloz" desde palabrasB2, si hay una sesión de quiz en curso, advertir antes de navegar.
**Por qué:** El usuario puede perder accidentalmente el estado del quiz (timer, errores) al navegar.
**Escalabilidad:** Un listener en el enlace del navbar que compruebe `State.timerStarted` y muestre un `confirm()`.

---

## Prioridad sugerida

| Status | # | Mejora | Impacto | Esfuerzo |
|--------|---|--------|---------|----------|
| Implementada | 1 | Modo inverso DE→ES | Alto | Bajo |
| Implementada | 11 | Persistencia WPM | Alto | Mínimo |
| Implementada | 2 | Atajos de teclado quiz | Alto | Bajo |
| Implementada | 14 | Retroceder en RSVP | Alto | Bajo |
| — | 10 | Nombres legibles en botones | Medio | Mínimo |
| Implementada | 12 | Renombrar textos | Medio | Bajo |
| — | 5 | Resumen al completar set | Medio | Medio |
| — | 15 | Control velocidad TTS blog | Medio | Bajo |
| — | 3 | Stats persistentes por lista | Alto | Medio |
| Implementada | 17 | Pausa en puntuación RSVP | Medio | Mínimo |
| — | 6 | Filtro en tabla | Medio | Bajo |
| — | 16 | Progreso en blog view | Bajo | Mínimo |
| Implementada | 7 | Exportar errores | Bajo | Mínimo |
| — | 8 | Selección de voz TTS | Bajo | Medio |
| — | 13 | Stats del texto RSVP | Bajo | Mínimo |
| — | 19 | PWA Lectura Veloz | Bajo | Bajo |
| — | 9 | Streak counter | Bajo | Mínimo |
| — | 4 | Ponderación palabras difíciles | Alto | Alto |
| — | 18 | Reordenar textos guardados | Bajo | Alto |
| — | 20 | Advertencia al navegar | Bajo | Mínimo |
