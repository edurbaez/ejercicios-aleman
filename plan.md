# Plan de mejoras para Chat de Voz

## Estado actual

`chat-voz.html` es una app de conversación libre: el usuario graba audio → Whisper lo transcribe → GPT-4o-mini responde en alemán → el navegador lo lee en voz alta (browser TTS). Tiene:

- Selección de nivel CEFR (A1–C2)
- Rol e contexto personalizables por el usuario
- **Modo Guiado**: la IA añade una respuesta modelo al final de cada turno
- Corrección de gramática embebida en el texto de respuesta
- Límite diario de 60 minutos

---

## Propuestas de mejora

### 1. Escenarios predefinidos (impacto alto / esfuerzo bajo)

**Problema:** El usuario abre la app sin saber de qué hablar. El campo "Personalizar" es potente pero invisible para principiantes.

**Solución:** Añadir una galería de tarjetas de escenario antes de iniciar la conversación:

| Escenario | Rol de la IA |
|-----------|-------------|
| 🛒 Supermercado | Cajero en REWE |
| 🏥 Médico | Doctor en consulta |
| 🚉 Estación de tren | Empleado de información |
| ☕ Café | Mesero en cafetería |
| 💼 Entrevista de trabajo | Jefe que entrevista |
| 🏠 Búsqueda de piso | Arrendador que muestra el apartamento |

Al seleccionar uno, se precarga el rol y el objetivo de la conversación. El campo "Personalizar" sigue disponible para edición libre.

**Valor didáctico:** El estudiante practica vocabulario concreto y situacional — el más útil en la vida real.

---

### 2. Objetivo de misión por conversación (impacto alto / esfuerzo medio)

**Problema:** La conversación es abierta y el usuario no sabe cuándo "terminó" de practicar algo.

**Solución:** Cada escenario (o sesión libre) tiene un objetivo específico visible en pantalla:

> **Misión:** Pide un café con leche, pregunta el precio y paga.

La IA sabe el objetivo (incluido en el system prompt) y al final evalúa si el usuario lo completó, mostrando un mensaje de logro. Esto da sensación de cierre y progreso.

**Implementación:** Añadir `misionText` al system prompt como sección extra: `"Objetivo del estudiante: [misión]"`. Al detectar que el objetivo se cumplió (o al final del turno N), la IA incluye una marca `---MISION_CUMPLIDA---` que el frontend muestra como banner.

---

### 3. TTS de OpenAI en lugar del navegador ✅ IMPLEMENTADO

**Problema:** El TTS del navegador para alemán es de baja calidad en muchos dispositivos, con acento artificial y ritmo poco natural. El usuario aprende pronunciación incorrecta.

**Solución implementada:** Botón **"Voz Premium: ON/OFF"** en la barra de configuración. Cuando está ON, cada respuesta de la IA se envía a `/api/tts` (voz `onyx`) y se reproduce como audio MP3. Cuando está OFF (o si falla la API), cae automáticamente al TTS del navegador. El toggle requiere autenticación y persiste en `localStorage` (`cv_tts_premium`).

**Costo estimado:** ~$0.36 extra por hora de conversación (aprox. igual al costo de Whisper).

---

### 4. Panel de correcciones separado (impacto medio / esfuerzo bajo)

**Problema:** Las correcciones gramaticales aparecen en el flujo de texto de la IA, mezcladas con la respuesta conversacional. El usuario las ignora porque quiere seguir la conversación.

**Solución:** Pedir a la IA que use una marca delimitadora para las correcciones:

```
---CORRECCIÓN---
❌ "Ich bin gegangen in den Laden"
✅ "Ich bin in den Laden gegangen" (Verb va al final en Perfekt)
```

El frontend extrae esa sección y la muestra en un pequeño panel lateral o como una tarjeta colapsable debajo del burbuja del usuario. La burbuja de conversación queda limpia.

**Valor didáctico:** El usuario ve sus errores de forma clara, sin interrumpir el flujo conversacional.

---

### 5. Vocabulario nuevo en contexto (impacto medio / esfuerzo medio)

**Problema:** La IA usa palabras nuevas que el usuario no entiende pero no las explica (excepto en A1/A2 donde ya hay traducción en paréntesis).

**Solución:** Al final de cada respuesta de la IA (especialmente B1+), incluir 2-3 palabras clave usadas en la respuesta con su traducción al español, en un panel colapsable:

> **Palabras nuevas:**
> - *die Quittung* → el recibo
> - *bezahlen* → pagar
> - *wechseln* → dar el cambio

Estas palabras se podrían guardar en localStorage como mini-vocabulario personal de la sesión y exportarse al final.

---

### 6. Contador de turnos y estadísticas de sesión (impacto medio / esfuerzo bajo)

**Problema:** El usuario no sabe cuánto habló ni cuántas correcciones recibió. Sin feedback, no hay sensación de progreso.

**Solución:** Añadir una barra de estadísticas al final de la conversación (o accesible con botón "Ver resumen"):

- Turnos completados: 8
- Palabras aproximadas habladas: ~120
- Correcciones recibidas: 3
- Tiempo de conversación: 6:40

Opcionalmente guardar esto en Supabase para mostrar progreso histórico en el panel de estadísticas de `auth.js`.

---

### 7. Modo "Repetición fonética" (impacto medio / esfuerzo medio)

**Problema:** El usuario escucha la respuesta una sola vez y a velocidad normal. No puede practicar la pronunciación de una frase específica.

**Solución:** Al hacer clic en cualquier burbuja de la IA, el texto se resalta y se reproduce de nuevo (con TTS). Un botón extra "🐌 Despacio" reproduce la frase al 70% de velocidad para que el usuario pueda imitar mejor.

**Implementación:** Añadir `onclick` a cada `.cv-bubble-ai`, pasar el texto a `speak()` con `rate` ajustable.

---

### 8. Guardar y revisar conversaciones (impacto bajo / esfuerzo medio)

**Problema:** El usuario termina la sesión y pierde todo el historial. No puede revisar lo que aprendió ni los errores que cometió.

**Solución:** Botón "💾 Guardar conversación" al terminar. Guarda el historial en localStorage (o Supabase si está autenticado) con fecha, nivel y escenario. Una pantalla de historial permite releer la conversación y las correcciones.

---

## Prioridad sugerida de implementación

| # | Mejora | Impacto | Esfuerzo | Prioridad |
|---|--------|---------|----------|-----------|
| 3 | TTS de OpenAI | Alto | Bajo | ✅ Hecho |
| 4 | Panel de correcciones | Medio | Bajo | ⭐ 2 |
| 1 | Escenarios predefinidos | Alto | Bajo | ⭐ 3 |
| 2 | Objetivo de misión | Alto | Medio | ⭐ 4 |
| 6 | Estadísticas de sesión | Medio | Bajo | ⭐ 5 |
| 7 | Repetición fonética | Medio | Medio | ⭐ 6 |
| 5 | Vocabulario en contexto | Medio | Medio | ⭐ 7 |
| 8 | Guardar conversaciones | Bajo | Medio | ⭐ 8 |
