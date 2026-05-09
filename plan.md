# Plan: Servicio de Revisión Gramatical por Imagen

## Concepto

El usuario sube o fotografía un texto escrito a mano o impreso (tarea, carta, frases sueltas).
La imagen se envía a la API de OpenAI (Vision / GPT-4o) junto con un prompt de revisión gramatical.
El modelo devuelve un análisis estructurado con los errores encontrados y las correcciones sugeridas.

---

## Casos de uso

| Tipo | Descripción | Prompt especializado |
|------|-------------|----------------------|
| **Tarea escolar** | Redacción o ejercicio de alemán manuscrito | Revisar gramática, ortografía, concordancia; señalar cada error con número de línea o frase |
| **Modelo de carta** | Carta formal/informal en alemán | Revisar estructura epistolar, fórmulas de saludo/despedida, registro (formal vs. informal), gramática |
| **Frases sueltas** | Lista de oraciones o traducciones propias | Revisar cada frase de forma independiente; indicar si la frase es natural para un hablante nativo |

---

## Arquitectura propuesta

```
[Frontend: corrector.html]
       │
       ├─ Selección de tipo (tarea / carta / frases)
       ├─ Upload de imagen (o captura desde cámara)
       ├─ Preview de la imagen
       └─ Botón "Revisar"
              │
              ▼
   [api/vision.js  — Vercel serverless]
       │
       ├─ Valida JWT (auth.js / Supabase)
       ├─ Rate limit: 5 req/min por usuario
       ├─ Construye prompt según tipo
       ├─ Llama a OpenAI Chat Completions con image_url
       │     model: gpt-4o
       │     messages: [system_prompt, {role:user, image + "Revisa este texto"}]
       └─ Devuelve JSON estructurado
              │
              ▼
   [Frontend: renderiza resultado]
       ├─ Lista de errores con número/frase de referencia
       ├─ Corrección sugerida por cada error
       ├─ Puntuación general (ej. 8/10)
       └─ Botón "Copiar correcciones"
```

---

## Estructura de la respuesta del modelo

El system prompt pedirá al modelo que responda **solo** con JSON válido:

```json
{
  "puntuacion": 7,
  "resumen": "El texto tiene buena estructura pero contiene errores de casos y concordancia verbal.",
  "errores": [
    {
      "fragmento_original": "Ich habe ein großen Hund",
      "correccion": "Ich habe einen großen Hund",
      "explicacion": "Acusativo masculino: 'ein' → 'einen', adjetivo mantiene '-en'.",
      "categoria": "declinación"
    }
  ],
  "observaciones_generales": "Revisar el uso del Akkusativ con artículos indefinidos."
}
```

Categorías posibles: `ortografía`, `declinación`, `conjugación`, `orden de palabras`, `registro`, `puntuación`, `vocabulario`.

---

## Archivos nuevos

| Archivo | Propósito |
|---------|-----------|
| `corrector.html` | App frontend: upload de imagen, selector de tipo, vista de resultado |
| `corrector.js` | Lógica JS: preview, llamada a API, render de errores |
| `api/vision.js` | Serverless: valida JWT, construye prompt, llama a GPT-4o con imagen |

---

## Archivos modificados

| Archivo | Cambio | Estado |
|---------|--------|--------|
| `styles.css` | Sección `/* CORRECTOR */` con tema naranja `#E65100`, dark mode, componentes | ✅ |
| `CLAUDE.md` | `corrector.html`, `corrector.js` y `api/vision.js` registrados en Active Files | ✅ |
| `README.md` | Añadir app Corrector en sección Apps | ✅ |

---

## Prompts por tipo

### Tarea
```
Eres un profesor de alemán experto. Analiza la imagen adjunta, que contiene una tarea escrita en alemán.
Identifica todos los errores gramaticales, ortográficos y de estilo. Responde SOLO con el JSON indicado.
```

### Modelo de carta
```
Eres un experto en redacción formal e informal en alemán. Analiza la carta de la imagen.
Revisa estructura, fórmulas epistolares, registro y gramática. Responde SOLO con el JSON indicado.
```

### Frases sueltas
```
Eres un corrector nativo de alemán. Analiza cada frase de la imagen por separado.
Indica si cada frase es gramaticalmente correcta y natural. Responde SOLO con el JSON indicado.
```

---

## Consideraciones técnicas

- **Modelo**: `gpt-4o` (soporta visión; `gpt-4o-mini` no tiene calidad suficiente para OCR + gramática compleja)
- **Formato imagen**: El frontend convierte la imagen a base64 y la envía en el body como `{ image_base64, type }`. El serverless la reenvía a OpenAI como `image_url: "data:image/jpeg;base64,..."`.
- **Tamaño máximo**: Limitar a 5 MB en el frontend antes de enviar.
- **Rate limit**: 5 req/min por usuario (más restrictivo que `/api/chat` por costo del modelo Vision).
- **Auth**: Mismo patrón que `/api/chat.js` — Bearer JWT validado con `SUPABASE_JWT_SECRET`.
- **Sin caché**: Las imágenes no se guardan ni en Supabase ni en IndexedDB (privacidad + tamaño).

---

## Fases de implementación

1. ~~**Fase 1 — API** (`api/vision.js`): endpoint funcional con prompt genérico, sin tipo aún.~~ ✅ **COMPLETADA** — `api/vision.js` con JWT ES256/HS256, rate limit 5 req/min, prompts por tipo, limpieza de markdown en respuesta.
2. ~~**Fase 2 — Frontend básico** (`corrector.html` + `corrector.js`): upload, preview, llamada, render JSON crudo.~~ ✅ **COMPLETADA** — Upload por archivo/cámara/drag-and-drop, validación 5 MB, preview, selector de tipo, render estructurado (score + tarjetas de error con badge de categoría coloreado + observaciones). CSS en `styles.css`, `CLAUDE.md` actualizado.
3. ~~**Fase 3 — Tipos y prompts**: selector de tipo, prompts especializados por caso de uso.~~ ✅ **COMPLETADA** — Selector de tipo en `corrector.html`, `PROMPTS` por tipo en `api/vision.js`, tipo enviado desde `corrector.js`.
4. ~~**Fase 4 — UI pulida**: tarjetas de error con categoría coloreada, puntuación visual, botón copiar.~~ ✅ **COMPLETADA** — Score visual, badges de categoría coloreados, botón "Copiar correcciones" con feedback "¡Copiado!" en `corrector.js`.
5. ~~**Fase 5 — PWA / navbar**: añadir al menú principal, integrar en `styles.css`.~~ ✅ **COMPLETADA** — "Corrector" añadido al dropdown de los 5 HTML restantes (`palabrasB2`, `B1`, `lectura veloz`, `diccionario`, `chat-voz`). `README.md` actualizado con sección Corrector, `/api/vision`, y Navigation.
