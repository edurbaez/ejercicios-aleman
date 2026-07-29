# Plan de clases — pendientes

Fase 1 (implementada): estructura de datos (`clases-b1.js`) + página de solo lectura (`index.html`) con el mapeo martes/jueves → reglas gramaticales de B1.

Fase 2 (implementada y verificada): los 30 días de `TEACHER_CLASES.b1` tienen `contenido.reglas[]` completo (intro/práctica/pasos/resumen por cada ruleId), con `esClaseEnVivo` marcando los 8 días de clase real. `teacher/index.html` renderiza los 30 días agrupados por semana con badge 🟢/📖.

## Pendiente

**Orden sugerido (revisión 2026-07-18):** la tarea de mayor impacto pedagógico es la **4** — hoy `teacher/index.html` solo sirve para dar clase de B1; extenderlo a A1/A2/B2/C1/C2 es lo que más valor aporta porque habilita el uso real de la herramienta en el resto de tus clases. Las tareas 1-2 (edición + persistencia) son mejoras de comodidad sobre lo que ya existe y pueden esperar. La 3 (mapeo por fecha de inicio del alumno) y la 5 (selector de nivel) dependen de que la 4 tenga al menos un nivel adicional. Orden recomendado: **4 → 5 → 1+2 (acopladas) → 3**.

### 1. Edición desde la UI de tips/ejemplos del profesor
Hoy `clases-b1.js` es estático (hardcoded) y `teacher/index.html` es de solo lectura. No hay ningún campo de edición para que el profesor ajuste `intro`/`practica`/`pasos`/`resumen` sin tocar código.

Pasos de ejecución:
1. Definir el modelo de edición: ¿se edita el objeto completo por ruleId, o solo se agregan notas adicionales encima del contenido generado? (afecta el esquema de la tabla en el paso 3).
2. Agregar un modo "editar" en `teacher/index.html` por día/regla: formulario inline o modal reutilizando el esquema de `contenido.reglas[]` (intro, practica[], pasos[], resumen).
3. Decidir origen de la verdad tras editar: ¿el JS estático deja de ser la fuente y pasa a ser solo el seed inicial, con Supabase como override? Ver tarea 2 (persistencia) — están acopladas, conviene resolverlas juntas.
4. Guardar cambios (local primero con `confirm`/validación, luego persistir — ver tarea 2).

### 2. Persistencia en Supabase de tips/ejemplos editados
Hoy no existe tabla para esto. Depende de que la tarea 1 defina qué se edita.

Pasos de ejecución:
1. Diseñar la tabla, ej. `teacher_class_content` con columnas `level` (text), `day` (int), `rule_id` (text), `contenido` (jsonb con el override de intro/practica/pasos/resumen), `updated_at`. PK compuesta `(level, day, rule_id)`.
2. Escribir migración `supabase/migrations/00X_teacher_class_content.sql` siguiendo el patrón de `004_marketing_posts.sql` (RLS: solo `profiles.role = 'admin'`, trigger `updated_at`).
3. En `teacher/index.html`, al cargar: leer overrides de Supabase y hacer merge sobre `TEACHER_CLASES.b1` (Supabase gana si existe fila para ese `day`+`rule_id`).
4. Al guardar desde el editor (tarea 1): upsert directo a Supabase con el cliente admin (mismo patrón que `marketing/contenido.html`, sin función serverless — no hay generación IA involucrada).
5. Actualizar el CLAUDE.md (tabla de Supabase + Active Files) según la regla de mantenimiento del proyecto.

### 3. Mapeo dinámico según fecha real de inicio del alumno
Hoy el mapeo martes=día 2 / jueves=día 4 es fijo por semana calendario; no contempla alumnos que empiezan un día distinto de lunes.

Pasos de ejecución:
1. Determinar de dónde sale la fecha de inicio del alumno (¿ya existe en `user_data` o hay que agregarla?).
2. Calcular, dado `fecha_inicio` + fecha actual, qué día del plan de 30 (`PLANS.b1[i]`) le corresponde al alumno hoy, y cuál es el próximo martes/jueves de clase en vivo relativo a esa fecha.
3. Ajustar `teacher/index.html` para aceptar un parámetro de alumno (o selector) y resaltar el día correspondiente en vez de asumir semana calendario fija.
4. Evaluar impacto en `esClaseEnVivo`: ¿sigue siendo fijo (el profesor solo da clase martes/jueves reales) o pasa a depender del alumno? Probablemente se mantiene fijo — el profesor da clase en un calendario común; lo que cambia es qué día del plan de 30 le toca revisar a cada alumno.

### 4. Extender a otros niveles (A1, A2, B2, C1, C2)
**A1 — completado (sesión 2026-07-29).** `teacher/clases-a1.js` creado con los 30 días de `PLANS.a1` cruzados contra las 21 reglas de `GRAMMAR_DATA.A1`, mismo esquema de contenido que B1 (`intro`/`practica`/`pasos`/`resumen` por regla). `esClaseEnVivo` sigue el mismo patrón que B1 (alumno empieza lunes, martes=día 2/jueves=día 4 de cada semana → 8 días en vivo: 2, 4, 9, 11, 16, 18, 23, 25). Diferencia de implementación respecto a B1: en vez de repetir literalmente el bloque de cada regla en cada día donde aparece, el archivo usa un mapa interno `RULES` (21 entradas) + helpers `base(id)`/`repaso(id, nota)` para evitar duplicar/desincronizar el mismo contenido pedagógico entre los días que repasan la misma regla (a1-01 aparece en día 1, 8, 21, 22, por ejemplo) — el resultado final `window.TEACHER_CLASES.a1` sigue siendo el mismo array plano de 30 objetos que espera `teacher/index.html`. Aún no enlazado en `teacher/index.html` (eso es la tarea 5 de abajo).

**A2 — completado (sesión 2026-07-29).** `teacher/clases-a2.js` creado con el mismo patrón que `clases-a1.js` (mapa `RULES` de 21 entradas + `base(id)`/`repaso(id, nota)`), cruzando los 30 días de `PLANS.a2` contra las 21 reglas de `GRAMMAR_DATA.A2` (ids `a2-01`…`a2-23`, sin `a2-07`/`a2-08` — renumeradas a A1, ver backlog de `plan.md` raíz). Mismo calendario de clase en vivo que A1/B1 (días 2, 4, 9, 11, 16, 18, 23, 25). Verificado con Node: 30 días secuenciales, `contenido.reglas[]` alineado 1:1 con `ruleIds` en cada día, y las 21 reglas cubiertas 4-5 veces cada una (mismo patrón de repetición espaciada que A1). Nota al margen (no corregida en esta sesión, ajena a esta tarea): el `focus` del día 24 en `plan.js` ("Zwei feste Positionen, Verben mit Akkusativ und Dativ y Verben mit Dativ") no coincide con las reglas realmente practicadas ese día (`a2-09`/`a2-10`/`a2-11`, comparativo/reflexivos/posiciones) — drift preexistente en `plan.js`, no introducido aquí; `teacher/clases-a2.js` usa las reglas reales de las tasks, no el texto del focus. Aún no enlazado en `teacher/index.html` (tarea 5). Queda `teacher/clases-b2.js`/`-c1`/`-c2` para sesiones futuras de esta misma tarea, condicionado a que `plan.js` de esos niveles esté reescrito primero (ver nota de dependencia abajo).

Hoy además de A1 existe `clases-b1.js`. `TEACHER_CLASES` ya está pensado para agregar más claves de nivel (`TEACHER_CLASES.a1`, etc.), y `PLANS`/`GRAMMAR_DATA` ya tienen datos para todos los niveles.

**Dependencia con `plan.md` (raíz del repo):** el paso 2 de abajo (cruzar `focus`/`ruleIds` contra `plan.js`) solo puede hacerse de forma fiable una vez que el plan de 30 días de ese nivel esté verificado contra reglas/vocabulario reales — ver el archivo `plan.md` de la raíz. Estado actual (revisión 2026-07-18): **A1, A2 y B1 ya están verificados y listos** (se puede empezar por cualquiera de los tres); **B2 tiene el diseño de rotación listo pero `plan.js` aún no reescrito**; **C1 y C2 tienen diagnóstico y rotación de gramática recién documentados en `plan.md` pero tampoco reescritos todavía**. Orden recomendado para esta tarea: `teacher/clases-a1.js` o `clases-a2.js` primero (día a día ya son fiables hoy mismo), y dejar B2/C1/C2 para después de que su sesión correspondiente en `plan.md` quede marcada `[x]`.

Pasos de ejecución (repetir por nivel, un nivel por sesión igual que se hizo con B1):
1. Crear `teacher/clases-{nivel}.js` con la misma estructura plana de 30 entradas usada en B1 (`{ day, semana, focus, ruleIds, esClaseEnVivo, contenido }`).
2. Cruzar `PLANS.{nivel}` (`plan.js`) con `GRAMMAR_DATA.{NIVEL}` (`grammar-data.js` / `grammar-data-{nivel}.js`) para resolver `focus`/`ruleIds` de cada día (mismo método que la Tarea 9 de B1 — ver nota final del historial abajo). Recordar que el conteo de reglas difiere por nivel: A1/A2/B2/C1/C2 tienen 10 reglas cada uno (`{nivel}-01`…`{nivel}-10`); B1 tiene 31 (`b1-01`…`b1-31`).
3. Marcar `esClaseEnVivo: true` en los días que correspondan a clase real martes/jueves de ese nivel (confirmar con el profesor el calendario si difiere del de B1).
4. Rellenar `contenido.reglas[]` para los días en vivo primero (prioridad), luego los de autoestudio — mismo esquema que B1 (intro/practica/pasos/resumen), una tarea por día o agrupando varios días de bajo contenido en una sesión si el profesor lo prefiere.
5. Actualizar CLAUDE.md (Active Files) con la nueva entrada de datos.

### 5. Selector de nivel en `teacher/index.html`
Hoy la página solo lee `TEACHER_CLASES.b1`, hardcoded. Depende de que la tarea 4 haya generado al menos un nivel adicional.

Pasos de ejecución:
1. Agregar un selector de nivel (pill buttons, mismo patrón que `plan.html`) arriba del `class-grid`.
2. Cargar dinámicamente `teacher/clases-{nivel}.js` según selección, o precargar todos los scripts disponibles y cambiar la referencia en `renderWeeks`.
3. Persistir el nivel seleccionado (localStorage, mismo patrón que `esc_level` en `escritura.html`).
4. Actualizar el título/badges de la página para reflejar el nivel activo.

---

## Historial de ejecución (referencia, no pendiente)

Fase de contenido B1 completada en 32 tareas (Tarea 0 infraestructura inicial, Tareas 1-8 días de clase en vivo, Tarea 9 migración a 30 días planos, Tareas 10-31 días restantes de autoestudio). Ver `git log -- teacher/clases-b1.js` para el detalle de cada sesión. El método de cruce `focus`/`ruleIds` fue: tomar `focus`/`tasks` de cada día en `plan.js` (`PLANS.b1`) y mapearlo contra los títulos de `GRAMMAR_DATA.B1` en `grammar-data.js`; útil como referencia al repetir el proceso para otros niveles (tarea 4 arriba).
