# Plan de Mejoras

## regla obligatoria
- Después de implementar cualquier cosa, actualiza el estado en este plan.

---

## Archivo — Sección Gramática ✅

> Completado: 2026-06-11  
> Scope: `gramatica.js` + `gramatica.html` + `styles.css`

| Bloque | Descripción | Estado |
|--------|-------------|--------|
| 1 | Explicaciones didácticas (regla_base, tabla, excepciones) | ✅ 2026-06-05 |
| 2 | Ejercicios variados + feedback + mini-racha + gamificación | ✅ 2026-06-11 |
| 3 | Examen mejorado (incremental, mixto, SRS, resumen por regla) | ✅ 2026-06-06 |
| 4 | UX visual (flashcards, anillo de progreso, historial) | ✅ 2026-06-11 |

---

## Archivo — chat-reformulaciones.html v1 ✅

> Completado: 2026-06-15  
> Scope: `chat-reformulaciones.html` (standalone)

| Etapa | Descripción | Estado |
|-------|-------------|--------|
| 1 | Selector de reglas (chips, filtro por nivel, aleatorio) | ✅ 2026-06-15 |
| 2 | Motor de sesión + system prompt | ✅ 2026-06-15 |
| 3 | Interfaz de práctica (burbujas, feedback cards, score) | ✅ 2026-06-15 |
| 4 | Entrada de voz (grabación + Whisper) | ✅ 2026-06-15 |
| 5 | Resultados por sesión y por regla | ✅ 2026-06-15 |
| 6 | Navbar, dark mode, auth, logEvent | ✅ 2026-06-15 |

---

---

# Plan — chat-reformulaciones.html v2

> Iniciado: 2026-06-17  
> Scope: `chat-reformulaciones.html` + `styles.css`  
> Base: diagnóstico del código actual (v1 completado)

---

## Diagnóstico del estado actual

### Lo que funciona
- Selector de reglas con chips, filtro por nivel y aleatorio.
- Motor de sesión con cola de reglas, system prompt estructurado.
- Burbujas de chat + tarjetas de feedback verde/naranja/rojo.
- Grabación → Whisper → respuesta IA con evaluación `---NUEVA---`.
- Score por sesión (✅/⚠️/❌) y resumen por regla al finalizar.
- Dark mode, auth, logEvent.

### Problemas identificados

#### Rendimiento y costo de API
- El array `State.messages` crece sin límite: en una sesión larga con muchas reglas se envían decenas de turnos al modelo. Costo y latencia crecen linealmente.
- No hay indicación al usuario de cuántos tokens aproximados se están enviando.

#### Calidad de TTS
- Usa `SpeechSynthesisUtterance` (browser TTS). En Windows/Chrome la voz alemana es robótica y a veces no está disponible. `shared-game.js` ya resuelve esto con `/api/tts` (OpenAI `tts-1`) con fallback al TTS del browser.

#### Continuidad entre sesiones
- Las reglas seleccionadas se pierden al cerrar o recargar la página.
- No hay historial de sesiones anteriores: el usuario no sabe qué reglas practicó ayer ni cuántos intentos lleva acumulados.
- No hay integración con el SRS de `gramatica.html`: si fallas mucho en una regla, no se programa para repaso automático.

#### UX dentro de la sesión
- "Siguiente regla →" no requiere ningún mínimo de turnos: el usuario puede saltar sin haber respondido nada.
- No hay barra de progreso visual de la cola (solo texto "Regla N de M").
- El hint panel muestra `regla_base` + `tip` pero no los ejemplos: el usuario no tiene referencias concretas sin salir de la app.
- No hay atajo de teclado para iniciar/detener la grabación (la app es de voz, el mouse interrumpe el flujo).
- El botón "Finalizar" no pide confirmación: es fácil terminarlo sin querer.

#### Calidad del selector de reglas
- Con 60 reglas, el grid es difícil de navegar. No hay búsqueda por texto.
- No se recuerdan las reglas seleccionadas de la sesión anterior.
- No hay integración con los favoritos de `gramatica.html` (no se pueden filtrar por favoritos).

---

## Mejoras planificadas

---

### BLOQUE A — Robustez de la sesión

#### A.1 Límite de contexto en el historial enviado a la API

Actualmente se envía `State.messages` completo. Limitar a los últimos 8 mensajes (4 turnos) para mantener el contexto suficiente sin crecer indefinidamente.

```js
const msgs = userText
    ? State.messages.slice(-8)
    : [{ role: 'user', content: 'Beginne mit der ersten Aufgabe.' }];
```

El array completo sigue en `State.messages` (para referencia interna), solo se recorta al enviar.

**Esfuerzo:** Muy bajo. Una línea de cambio.  
**Estado:** ⬜ Pendiente

---

#### A.2 Mínimo de turnos antes de permitir "Siguiente regla"

Deshabilitar el botón "Siguiente regla →" hasta que el usuario haya respondido al menos **2 veces** a la regla actual. Pasados los 2 turnos, el botón se habilita.

**Implementación:** Agregar `State.currentRuleTurns` (contador de respuestas del usuario en la regla actual). Incrementar en `recordScore()`. `loadRule()` lo resetea a 0. El botón `cr-skip-btn` tiene `disabled` hasta que `currentRuleTurns >= 2`.

**Esfuerzo:** Bajo.  
**Estado:** ⬜ Pendiente

---

#### A.3 Confirmación antes de Finalizar

Reemplazar `onclick="endSession()"` por una función que muestre un `confirm()` nativo o un mini-modal inline si hay al menos 1 turno completado.

**Esfuerzo:** Muy bajo.  
**Estado:** ⬜ Pendiente

---

### BLOQUE B — TTS con OpenAI

#### B.1 Reemplazar browser TTS por `/api/tts`

Adaptar el patrón de `shared-game.js`: llamar `POST /api/tts` con `{ text, voice: 'onyx' }`, reproducir el audio/mpeg devuelto. Fallback a `SpeechSynthesisUtterance` si la llamada falla o el usuario no está autenticado.

```js
async function speak(text) {
    try {
        const token = await window.getAuthToken?.();
        if (!token) throw new Error('no auth');
        const resp = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ text, voice: 'onyx' }),
        });
        if (!resp.ok) throw new Error('tts error');
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        State.currentAudio = new Audio(url);
        State.currentAudio.onended = () => { State.isSpeaking = false; URL.revokeObjectURL(url); };
        State.currentAudio.play();
        State.isSpeaking = true;
    } catch {
        speakBrowser(text); // fallback
    }
}
```

**Esfuerzo:** Bajo.  
**Estado:** ⬜ Pendiente

---

### BLOQUE C — Persistencia y continuidad

#### C.1 Guardar reglas seleccionadas en localStorage

Al hacer `startSession()`, guardar el array de IDs seleccionados como `cr_last_rules` en localStorage. Al cargar la página, restaurar esa selección automáticamente.

**Esfuerzo:** Muy bajo.  
**Estado:** ⬜ Pendiente

---

#### C.2 Historial de sesiones (localStorage)

Al `endSession()`, guardar un registro en `cr_history` (array en localStorage, max 20 entradas):

```js
{ date: ISO, rules: [id...], correct, partial, incorrect, total }
```

En la pantalla de resultados, mostrar al final un acordeón "Últimas sesiones" con las 5 más recientes: fecha, reglas, porcentaje de acierto.

**Esfuerzo:** Bajo-Medio.  
**Estado:** ⬜ Pendiente

---

#### C.3 Integración con SRS de gramática

Después de mostrar resultados: para cada regla con más `incorrect` que `correct`, llamar `updateSRSEntry(ruleId, 1)` del módulo SRS de `gramatica.js` si está disponible en el mismo contexto. Si no (páginas separadas), guardar los IDs en `cr_srs_pending` en localStorage; `gramatica.html` los consumiría al cargar.

Mostrar en resultados: "📌 N reglas marcadas para repaso en Gramática."

**Esfuerzo:** Medio (requiere coordinar con el módulo SRS de gramatica.js).  
**Estado:** ⬜ Pendiente

---

### BLOQUE D — UX del selector

#### D.1 Búsqueda por texto en el grid de reglas

Agregar un `<input type="search">` encima del grid. Al escribir, filtrar `State.filteredRules` por coincidencia en `titulo` o `regla_base` (case-insensitive). Se combina con el filtro de nivel activo.

**Esfuerzo:** Bajo.  
**Estado:** ⬜ Pendiente

---

#### D.2 Filtrar por favoritos de gramática

Si `localStorage.getItem('gram_favorites')` existe (array de IDs guardado por `gramatica.html`), mostrar un pill extra "⭐ Favoritos" en el filtro de nivel. Al activarlo, `filteredRules` solo muestra reglas en ese array.

**Esfuerzo:** Bajo (los favoritos ya están en localStorage con la misma clave).  
**Estado:** ⬜ Pendiente

---

### BLOQUE E — UX dentro de la sesión

#### E.1 Atajo de teclado para grabar (Espacio)

Mientras la práctica está activa y el `textInput` no tiene foco:
- `Espacio` → iniciar grabación (si no está grabando y el botón no está disabled).
- `Espacio` de nuevo → detener.

Esto permite flujo continuo: escuchar → Espacio → hablar → Espacio → escuchar respuesta, sin tocar el mouse.

**Implementación:** Listener `keydown` en `document`; activo solo cuando `crPractice` es visible y `document.activeElement` no es el textarea.

**Esfuerzo:** Bajo.  
**Estado:** ⬜ Pendiente

---

#### E.2 Barra de progreso visual de la cola

Reemplazar el texto "Regla N de M" por una barra de progreso fina (similar a `gram-quiz-progress-track` en gramática) debajo del `cr-rule-header`. Cada segmento representa una regla: completado (verde), actual (naranja), pendiente (gris).

**Esfuerzo:** Bajo.  
**Estado:** ⬜ Pendiente

---

#### E.3 Ejemplos en el panel de pista

El panel "💡 Ver regla" actualmente muestra solo `regla_base` + `tip`. Agregar los primeros 2 ejemplos de `rule.ejemplos` como referencias concretas, con botón de TTS por ejemplo.

**Esfuerzo:** Muy bajo.  
**Estado:** ⬜ Pendiente

---

## Orden de implementación sugerido

| Prioridad | Bloque | Tarea | Esfuerzo |
|-----------|--------|-------|---------|
| 🔴 Alta | A | A.1 Límite de contexto (slice -8) | Muy bajo |
| 🔴 Alta | B | B.1 TTS con OpenAI + fallback | Bajo |
| 🔴 Alta | A | A.2 Mínimo 2 turnos antes de saltar regla | Bajo |
| 🟡 Media | C | C.1 Guardar reglas seleccionadas en localStorage | Muy bajo |
| 🟡 Media | D | D.1 Búsqueda por texto en el selector | Bajo |
| 🟡 Media | E | E.1 Atajo Espacio para grabar | Bajo |
| 🟡 Media | E | E.2 Barra de progreso visual de la cola | Bajo |
| 🟡 Media | C | C.2 Historial de sesiones | Bajo-Medio |
| 🟡 Media | E | E.3 Ejemplos en el panel de pista | Muy bajo |
| 🟡 Media | A | A.3 Confirmación antes de Finalizar | Muy bajo |
| 🟢 Baja | D | D.2 Filtrar por favoritos de gramática | Bajo |
| 🟢 Baja | C | C.3 Integración con SRS de gramática | Medio |

---

## Estado

| Bloque | Descripción | Estado |
|--------|-------------|--------|
| A — Robustez de sesión | Límite de contexto, mínimo de turnos, confirmación | ⬜ Pendiente |
| B — TTS con OpenAI | Reemplazar browser TTS | ⬜ Pendiente |
| C — Persistencia | localStorage de selección, historial, SRS | ⬜ Pendiente |
| D — Selector UX | Búsqueda por texto, filtro favoritos | ⬜ Pendiente |
| E — UX en sesión | Atajo teclado, barra progreso, ejemplos en hint | ⬜ Pendiente |
