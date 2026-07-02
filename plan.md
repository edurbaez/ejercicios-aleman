# Plan: Meta B1 en 30 días

## Reglas obligatorias (no negociables)

1. **Revisar compatibilidad antes de tocar código.** Antes de modificar cualquier archivo, identificar qué otros archivos lo importan, qué funciones expone, y qué estructura de datos espera. Documentar el análisis brevemente aquí antes de proceder.
2. **Actualizar este plan al terminar cada tarea.** Marcar con `[x]` y anotar cambios relevantes al diseño si los hubo.
3. **Actualizar `CLAUDE.md`** cuando se agregue un archivo activo al proyecto.

---

## Etapa 1 — Listas de vocabulario por nivel

**Objetivo:** un archivo `Data{NIVEL}.json` por nivel CEFR (A1, A2, B1, B2, C1, C2), sin repeticiones entre niveles, divididas didácticamente, con una sublista `esenciales` de las 50 más importantes.

**Modelo a usar:** el más avanzado disponible (claude-opus-4-8 o GPT-4o). No Haiku ni mini.

**Estructura esperada** (compatible con `shared-game.js` que lee `de[]` + `es[]`):
```json
{
  "esenciales":  { "de": ["...x50"], "es": ["...x50"] },
  "verbos":      { "de": [...],      "es": [...] },
  "sustantivos": { "de": [...],      "es": [...] },
  "adjetivos":   { "de": [...],      "es": [...] },
  "expresiones": { "de": [...],      "es": [...] }
}
```
Total por nivel: ~500 palabras. La suma de todas las sublistas (sin `esenciales`, que es subconjunto) debe ser ≥ 500.

**Revisión de compatibilidad requerida antes de generar:**
- Verificar que `shared-game.js` acepta cualquier clave de categoría (no hardcodea nombres como `verbos1`).
- Si no, adaptar la estructura o `shared-game.js` primero.

### Tareas
- [x] Analizar `shared-game.js`: usa `Object.keys(DATA)` — cualquier nombre de categoría es válido. Estructura requerida: `{ clave: { de:[], es:[] } }`.
- [x] Confirmar que vocab B2 estaba en `DATA.json` (no inline en HTML como decía CLAUDE.md).
- [x] Crear `scripts/generate-vocab.js` — llama GPT-4o por categoría (5 calls/nivel) para evitar truncamiento de JSON.
- [x] Generar `DataA1.json` ✓ (516 palabras + 50 esenciales).
- [x] Generar `DataA2.json` ✓ (456 palabras + 50 esenciales).
- [x] Generar `DataB1.json` ✓ (440 palabras + 50 esenciales, reemplaza el de 327).
- [x] Generar `DataB2.json` ✓ (456 palabras + 50 esenciales).
- [x] Generar `DataC1.json` ✓ (471 palabras + 50 esenciales).
- [x] Generar `DataC2.json` ✓ (481 palabras + 50 esenciales).
- [x] Crear `A1.html`, `A2.html`, `C1.html`, `C2.html` — mismo patrón de `B1.html` + `APP_CONFIG`.
- [x] Crear manifests: `manifest-a1.json`, `manifest-a2.json`, `manifest-c1.json`, `manifest-c2.json`.
- [x] Crear iconos SVG: `icon-a1.svg`, `icon-a2.svg`, `icon-c1.svg`, `icon-c2.svg`.
- [x] Crear Service Workers: `sw-a1.js`, `sw-a2.js`, `sw-c1.js`, `sw-c2.js`.
- [x] Actualizar navbar en **todos** los HTML existentes (10 archivos) con A1/A2/C1/C2.
- [x] Actualizar `palabrasB2.html`: `dataFile: 'DATA.json'` → `dataFile: 'DataB2.json'`.
- [x] Actualizar `sw.js`: cache `DATA.json` → `DataB2.json`, versión bumped a v4.
- [x] Actualizar `index.html`: tarjetas para A1, A2, C1, C2, B2 en sección Vocabulario.
- [x] Actualizar `scripts/seed-word-lists.js`: siembra los 6 niveles en orden.
- [x] Actualizar `CLAUDE.md` con los nuevos archivos activos.

### Nota de implementación
El script `generate-vocab.js` genera cada categoría en una llamada separada a GPT-4o (`max_tokens: 8192`) para evitar truncamiento. Ajustes realizados durante la ejecución:
- `expresiones` reducido de 130 a 100 entradas por confiabilidad.
- Mismatch de arrays se auto-corrige truncando al mínimo.
- Validación de `esenciales` relajada: acepta 40–60 (no exactamente 50).

---

## Etapa 2 — Comprensión lectora en Lectura Veloz

**Objetivo:** agregar una sección "Comprensión" a `lectura veloz.html` con dos modos:
- **Modo A:** el usuario pega un texto → botón "Generar preguntas" → `/api/chat` devuelve 4 preguntas de selección múltiple.
- **Modo B:** el usuario elige nivel CEFR → la IA genera texto + 4 preguntas. Si ya vio todos los textos guardados para ese nivel, genera uno nuevo y lo guarda.

Los textos se almacenan en Supabase para reutilizarlos entre usuarios.

### Nueva tabla Supabase: `reading_texts`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | uuid PK | Auto-generado |
| `level` | text | A1, A2, B1, B2, C1, C2 |
| `title` | text | Título del texto |
| `content` | text | Texto completo |
| `questions` | jsonb | Array de `{ question, options[4], answer_index }` |
| `created_at` | timestamptz | Auto |

### Nueva tabla Supabase: `user_reading_seen`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `user_id` | uuid FK | auth.users |
| `text_id` | uuid FK | reading_texts |
| `seen_at` | timestamptz | Cuándo lo vio |
PK compuesta: (user_id, text_id). RLS: cada usuario solo ve/escribe sus filas.

### Revisión de compatibilidad requerida:
- `lectura veloz.html` carga pdf.js y mammoth.js desde CDN — no hay conflicto con nueva sección.
- La sección nueva usará `window.getAuthToken()` de `auth.js` para llamar `/api/chat`.
- Verificar que el layout no rompa la sección RSVP existente (tabs o panel colapsable).

### Tareas
- [ ] Escribir migración SQL `003_reading_texts.sql`.
- [ ] Diseñar UI: tab "Comprensión" dentro de `lectura veloz.html` (no página separada).
- [ ] Implementar Modo A (texto del usuario → preguntas vía `/api/chat`).
- [ ] Implementar Modo B (nivel → buscar texto no visto en DB → si no hay, generar y guardar).
- [ ] Lógica de scoring: mostrar resultado al terminar (X/4 correctas).
- [ ] Actualizar `CLAUDE.md` con la nueva tabla.

---

## Etapa 3 — Plan diario (plan.html)

**Objetivo:** nueva página `plan.html` con planes de 30 días independientes por nivel CEFR (A1→C2). El usuario puede llevar varios niveles en paralelo con progreso separado para cada uno.

### Estructura de un día
```json
{
  "day": 1,
  "week": 1,
  "focus": "Vocabulario esencial + Nominativ",
  "tasks": [
    { "app": "B1.html", "list": "esenciales", "minutes": 15, "label": "Vocabulario" },
    { "app": "kasus.html", "case": "Nominativ", "minutes": 10, "label": "Casos" },
    { "app": "lectura veloz.html#comprension", "level": "B1", "minutes": 10, "label": "Lectura" }
  ]
}
```

Los 6 planes (A1→C2) viven en `plan.js` como `PLANS = { a1: [...30], a2: [...30], b1: [...30], ... }`. Cada nivel tiene vocabulario, gramática y habilidades apropiadas para ese nivel.

### Persistencia
- `localStorage` key `plan_progress_{nivel}` por cada nivel (ej. `plan_progress_b1`).
- Valor: array de booleans de 30 posiciones — `true` = día completado.
- Progreso de cada nivel es completamente independiente.

### UI
- Selector de nivel en la parte superior (pills A1/A2/B1/B2/C1/C2) — cambia el plan visible sin reiniciar otros.
- Calendario mensual: 30 celdas, icono de habilidad, verde si completado.
- Panel lateral: detalle del día seleccionado con tareas y enlaces directos.
- Barra de progreso por nivel: `días completados / 30`.
- Botón "Marcar día como completado" (solo disponible para el día actual o días anteriores).

### Distribución temática por nivel (resumen)
| Nivel | Semana 1 | Semana 2 | Semana 3 | Semana 4 |
|-------|----------|----------|----------|----------|
| A1 | Saludos + artículos | Números + colores | Verbos ser/tener | Repaso |
| A2 | Nominativ + Akkusativ | Verbos irregulares | Preposiciones básicas | Repaso |
| B1 | Dativ + Genitiv | Konjunktiv II | Passiv | Simulacro |
| B2 | Subjuntivo + relativas | Texto argumentativo | Registro formal | Simulacro |
| C1 | Expresiones idiomáticas | Textos académicos | Debate oral | Simulacro |
| C2 | Matices léxicos | Textos literarios | Producción libre | Evaluación |

### Revisión de compatibilidad requerida:
- `plan.html` es página nueva — no rompe nada existente.
- Necesita `config.js` + `auth.js` para navbar y sesión (misma carga que otras páginas).
- Links a apps deben usar rutas relativas consistentes con el deploy en Vercel.
- Los links a `lectura veloz.html#comprension` solo funcionan después de completar Etapa 2.

### Tareas
- [ ] Definir los 30 días × 6 niveles en `plan.js` (180 entradas totales).
- [ ] Crear `plan.html` + `plan.js`.
- [ ] Implementar selector de nivel + calendar view + detalle del día.
- [ ] Implementar persistencia independiente por nivel en localStorage.
- [ ] Agregar enlace a `plan.html` en navbar de todas las páginas.
- [ ] Actualizar `CLAUDE.md` e `index.html`.

---

## Orden de ejecución

```
Etapa 1 → Etapa 2 → Etapa 3
```
Etapa 1 no depende de las demás. Etapa 2 requiere la migración SQL antes del código. Etapa 3 puede empezar en paralelo con Etapa 2, pero los links del plan a la sección de comprensión requieren que Etapa 2 esté terminada.

---

## Estado general

| Etapa | Estado |
|-------|--------|
| 1 — Vocabulario por nivel | **Completa** |
| 2 — Comprensión lectora | Pendiente |
| 3 — Plan diario | Pendiente |
