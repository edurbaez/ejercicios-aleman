# Plan de clases — pendientes

Fase 1 (implementada): estructura de datos (`clases-b1.js`) + página de solo lectura (`index.html`) con el mapeo martes/jueves → reglas gramaticales de B1.

## Pendiente

- **Edición desde la UI** de tips y ejemplos adicionales del profesor (los que no están en `gramatica.html`) — hoy no hay ningún campo para esto en `clases-b1.js` ni en la página.
- **Persistencia en Supabase** de esos tips/ejemplos, si se agrega la edición (hoy no existe tabla; evaluar si conviene una tabla nueva o extender `marketing_posts`-style).
- **Mapeo dinámico según fecha real de inicio del alumno** — hoy el mapeo martes=día 2 / jueves=día 4 es fijo por semana; no contempla alumnos que empiezan otro día distinto de lunes.
- **Extender a otros niveles** (A1, A2, B2, C1, C2) — hoy solo existe `clases-b1.js`; la estructura de `TEACHER_CLASES` ya está pensada para agregar más claves de nivel.
- **Selector de nivel en `teacher/index.html`** — la página hoy solo lee `TEACHER_CLASES.b1`; falta el selector de nivel (como en `plan.html`) una vez existan más niveles.

## Pendiente: Ampliación de contenido de clases (B1)

Objetivo: cada día de clase (`martes`/`jueves` en `clases-b1.js`) debe tener contenido más amplio que solo `focus` + `ruleIds` — agregar tips docentes, curiosidades del idioma alemán (cuando aplique) y ejemplos adicionales de aula. Este contenido es distinto del ya existente en `grammar-data.js` (`explicacion`, `ejemplos`, `tip`, `tabla`, `excepciones`), que ya se usa en `gramatica.html`.

Se ejecuta en sesiones separadas — una por tarea. No completar varias tareas en la misma sesión salvo que se indique lo contrario.

### Regla obligatoria
Después de cada tarea completada (0-8), revisar el cambio realizado y actualizar este `plan.md` marcando la tarea como hecha (`[x]`) antes de dar por cerrada la sesión.

### Tarea 0 — Infraestructura (previa a las tareas de contenido)
- [x] En `teacher/clases-b1.js`: agregar a cada entrada `martes`/`jueves` un campo `contenido: { reglas: [] }`.
- [x] En `teacher/index.html`: actualizar el render (`renderContenido`/`renderReglaContenido`/`renderTabla`) para mostrar, por cada regla del día, el bloque narrativo completo debajo de `focus`/`ruleIds`.

**Esquema de `contenido.reglas[]`** (uno por cada `ruleId` del día, en orden lógico — no separar en listas sueltas de tips/curiosidades/ejemplos):
```js
{
  ruleId: 'b1-XX',
  intro: 'string — contextualiza la regla, comparación con español si aplica',
  practica: [ { incorrecto: 'frase con error típico de alumno', correcto: 'frase corregida' } ],  // 2-3
  pasos: [ { titulo: '🟦 1. ...', texto: 'explicación', tabla?: { headers: [], rows: [[]] } } ],   // 3-5, con emoji secuencial (🟦🟩🟧🟨🟪)
  resumen: 'string — versión simple para explicar en clase, una sola frase/párrafo corto'
}
```
Tips docentes, curiosidades del idioma y ejemplos de aula ya no van en arrays separados: se integran dentro de `intro`/`pasos`/`resumen` en el punto donde tengan sentido narrativo (p. ej. una curiosidad histórica cabe en la `intro` o en un paso; un tip práctico cabe como paso o dentro del `resumen`).

### Tareas 1-8 — una por día de clase (rellenar el campo `contenido.reglas` de esa entrada)
- [x] **1. Semana 1 · Martes (día 2)** — ruleIds b1-04, b1-05, b1-06
- [ ] **2. Semana 1 · Jueves (día 4)** — ruleIds b1-10, b1-11, b1-12
- [ ] **3. Semana 2 · Martes (día 9)** — ruleIds b1-25, b1-26, b1-27
- [ ] **4. Semana 2 · Jueves (día 11)** — ruleIds b1-31, b1-01, b1-02
- [ ] **5. Semana 3 · Martes (día 16)** — ruleIds b1-03, b1-07
- [ ] **6. Semana 3 · Jueves (día 18)** — ruleIds b1-05, b1-18
- [ ] **7. Semana 4 · Martes (día 23)** — ruleIds b1-21, b1-27
- [ ] **8. Semana 4 · Jueves (día 25)** — ruleIds b1-25, b1-28

Cada tarea 1-8 debe producir, para cada `ruleId` de esa entrada, un objeto completo siguiendo el esquema de arriba (ver `clases-b1.js` semana 1 martes como referencia de tono y estructura).
