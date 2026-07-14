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
- [x] **2. Semana 1 · Jueves (día 4)** — ruleIds b1-10, b1-11, b1-12
- [x] **3. Semana 2 · Martes (día 9)** — ruleIds b1-25, b1-26, b1-27
- [x] **4. Semana 2 · Jueves (día 11)** — ruleIds b1-31, b1-01, b1-02
- [x] **5. Semana 3 · Martes (día 16)** — ruleIds b1-03, b1-07
- [x] **6. Semana 3 · Jueves (día 18)** — ruleIds b1-05, b1-18
- [x] **7. Semana 4 · Martes (día 23)** — ruleIds b1-21, b1-27
- [x] **8. Semana 4 · Jueves (día 25)** — ruleIds b1-25, b1-28

Cada tarea 1-8 debe producir, para cada `ruleId` de esa entrada, un objeto completo siguiendo el esquema de arriba (ver `clases-b1.js` semana 1 martes como referencia de tono y estructura).

## Pendiente: Ampliación a los 30 días del plan (no solo martes/jueves)

Motivo: aunque el profesor solo da clase en vivo martes/jueves, el alumno puede preguntar por cualquier día del plan de 30 días (`plan.js` → `PLANS.b1`). Hoy, fuera de martes/jueves, el único contenido es el genérico de `gramatica.html` (sin tips de aula, práctica con errores típicos ni resumen docente). Objetivo: tener el mismo tipo de contenido narrativo (`contenido.reglas[]`, esquema de la Tarea 0) preparado para los 22 días restantes, como material de apoyo del profesor — no implica que haya clase en vivo esos días.

### Tarea 9 — Infraestructura para 30 días (previa a las tareas de contenido 10-31)
- [x] Migrada la estructura de `clases-b1.js`: `TEACHER_CLASES.b1` pasó de un array de semanas con `martes`/`jueves` a un array plano de 30 entradas `{ day, semana, focus, ruleIds, esClaseEnVivo, contenido }`, uno por cada día 1-30. Los 8 días ya completados (2, 4, 9, 11, 16, 18, 23, 25) conservan su `contenido.reglas` intacto y llevan `esClaseEnVivo: true`; los 22 restantes llevan `focus`/`ruleIds` ya resueltos (cruzados con `plan.js`/`grammar-data.js`) y `contenido: { reglas: [] }` pendiente, `esClaseEnVivo: false`.
- [x] Actualizado `teacher/index.html` (`renderWeeks`/`renderClassCol`): agrupa los 30 días por `semana` y renderiza cada día con un badge (🟢 Clase en vivo / 📖 Autoestudio) según `esClaseEnVivo`. `class-grid` ahora usa columnas flexibles (`auto-fill, minmax(260px, 1fr)`) para acomodar hasta 7 días por semana en vez de 2.

### Tareas 10-31 — una por día restante del plan de 30 días (rellenar `contenido.reglas` de cada día)
Días ya cubiertos (no repetir): 2, 4, 9, 11, 16, 18, 23, 25.

RuleIds obtenidos cruzando el `focus`/tasks de cada día en `plan.js` (`PLANS.b1`) con los títulos de `GRAMMAR_DATA.B1` en `grammar-data.js`. Días marcados "repaso" en `plan.js` deben tratarse igual que las tareas 1-8 que ya fueron repaso (ej. Tarea 2 con b1-12, Tarea 7/8): intro más breve reconociendo que es repaso, práctica enfocada en errores persistentes, ejemplos nuevos (no reutilizar los del día en que la regla se presentó por primera vez).

- [x] **10. Día 1** — focus "Präteritum + Konjunktiv II + oraciones de relativo" — ruleIds b1-01, b1-02, b1-03
- [x] **11. Día 3** — focus "Verbos con preposición fija + infinitivo con zu + pasiva básica" — ruleIds b1-07, b1-08, b1-09
- [x] **12. Día 5** — focus "Preguntas indirectas + infinitivo sin zu + relativas con preposición" — ruleIds b1-13, b1-14, b1-15
- [x] **13. Día 6** — focus "je…desto + n-Deklination + Adjektive als Nomen" — ruleIds b1-16, b1-17, b1-18
- [x] **14. Día 7** — focus "da-/wo-Präpositionaladverbien + preposiciones con Genitiv + preposiciones temporales" — ruleIds b1-19, b1-20, b1-21
- [x] **15. Día 8** — focus "Funciones de werden + verbos separables/inseparables + reflexivos ampliado" — ruleIds b1-22, b1-23, b1-24
- [x] **16. Día 10** — focus "lassen + Finalsätze um…zu/damit + Doppelkonnektoren" — ruleIds b1-28, b1-29, b1-30
- [x] **17. Día 12** (repaso) — focus "Repaso: oraciones de relativo + Genitiv + declinación de adjetivos" — ruleIds b1-03, b1-04, b1-05
- [x] **18. Día 13** (repaso) — focus "Repaso: conectores subordinantes + verbos con preposición fija + infinitivo con zu" — ruleIds b1-06, b1-07, b1-08
- [x] **19. Día 14** (repaso) — focus "Repaso: pasiva básica + futuro" — ruleIds b1-09, b1-10
- [x] **20. Día 15** (repaso) — focus "Consolidación: Präteritum + Konjunktiv II" — ruleIds b1-01, b1-02
- [x] **21. Día 17** — focus "Genitiv (kasus.html) + repaso n-Deklination" — ruleIds b1-04, b1-17 (repaso)
- [x] **22. Día 19** (repaso) — focus "Contraste: infinitivo con zu vs. sin zu" — ruleIds b1-08, b1-14
- [x] **23. Día 20** (repaso) — focus "Pasiva básica + funciones de werden" — ruleIds b1-09, b1-22
- [x] **24. Día 21** (repaso) — focus "Conectores subordinantes + wenn vs. als (ampliado)" — ruleIds b1-06, b1-12
- [x] **25. Día 22** (repaso) — focus "Repaso: da-/wo-Präpositionaladverbien + preposiciones con Genitiv" — ruleIds b1-19, b1-20
- [x] **26. Día 24** (repaso) — focus "Repaso: verbos separables/inseparables + reflexivos ampliado" — ruleIds b1-23, b1-24
- [x] **27. Día 26** (repaso) — focus "Repaso: Finalsätze um…zu/damit + Doppelkonnektoren" — ruleIds b1-29, b1-30
- [x] **28. Día 27** (repaso) — focus "Repaso general: Plusquamperfekt + Partizip I als Adjektiv" — ruleIds b1-11, b1-31
- [x] **29. Día 28** (repaso libre) — focus "Repaso libre: preguntas indirectas + je…desto + preposiciones con Genitiv" — ruleIds b1-13, b1-16, b1-20
- [x] **30. Día 29** (repaso ligero, simulacro) — focus "Simulacro final (1/2): escritura evaluada + repaso ligero" — ruleId b1-02
- [x] **31. Día 30** (repaso ligero, simulacro) — focus "Simulacro final (2/2): mündliche evaluada, los 3 Teile" — ruleId b1-09

Nota: el listado de ruleIds por día se hizo cruzando manualmente `focus`/`tasks` de `plan.js` (`PLANS.b1`) con `GRAMMAR_DATA.B1` — verificar contra `plan.js` al ejecutar cada tarea por si hay algún desfase menor.
