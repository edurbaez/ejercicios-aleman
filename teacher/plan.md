# Plan de clases — pendientes

Fase 1 (implementada): estructura de datos (`clases-b1.js`) + página de solo lectura (`index.html`) con el mapeo martes/miércoles → reglas gramaticales de B1.

## Pendiente

- **Edición desde la UI** de tips y ejemplos adicionales del profesor (los que no están en `gramatica.html`) — hoy no hay ningún campo para esto en `clases-b1.js` ni en la página.
- **Persistencia en Supabase** de esos tips/ejemplos, si se agrega la edición (hoy no existe tabla; evaluar si conviene una tabla nueva o extender `marketing_posts`-style).
- **Mapeo dinámico según fecha real de inicio del alumno** — hoy el mapeo martes=día 2 / miércoles=día 3 es fijo por semana; no contempla alumnos que empiezan otro día distinto de lunes.
- **Extender a otros niveles** (A1, A2, B2, C1, C2) — hoy solo existe `clases-b1.js`; la estructura de `TEACHER_CLASES` ya está pensada para agregar más claves de nivel.
- **Selector de nivel en `teacher/index.html`** — la página hoy solo lee `TEACHER_CLASES.b1`; falta el selector de nivel (como en `plan.html`) una vez existan más niveles.
