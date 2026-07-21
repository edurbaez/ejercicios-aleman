 
## Reglas obligatorias (no negociables)

1. **Revisar compatibilidad antes de tocar código.** Antes de modificar cualquier archivo, identificar qué otros archivos lo importan, qué funciones expone, y qué estructura de datos espera. Documentar el análisis brevemente aquí antes de proceder.
2. **Actualizar este plan al terminar cada tarea.** Marcar con `[x]` y anotar cambios relevantes al diseño si los hubo.
3. **Actualizar `CLAUDE.md`** cuando se agregue un archivo activo al proyecto.

## Mejora del plan de 30 días por nivel (`plan.js`)

Objetivo: que cada día del plan de 30 días (por nivel A1–C2) referencie únicamente estructuras reales de la app — reglas gramaticales que existen en `GRAMMAR_DATA` (`grammar-data.js`), categorías de vocabulario que existen en `Data{NIVEL}.json` (los sets que arma `shared-game.js` a partir de `Object.keys(DATA)`), y funciones reales de las apps (p. ej. Teile de `mundliche.html`, evaluación estructurada de `escritura.html`) — con `escritura.html` y `mundliche.html` a diario (no solo semana 4).

Compatibilidad revisada: `plan.js` solo define `window.PLANS`, consumido por `plan.html` para renderizar el calendario y los enlaces de tareas (`{ app, label, minutes }`). No hay otros archivos que dependan de la estructura interna de cada día, así que los cambios son seguros mientras cada `task.app` siga siendo un archivo HTML válido del proyecto.

**Niveles ya completados (A1, A2, B1)** siguen este mismo patrón (deep-linking por task, 2-3 reglas gramaticales/día, vocabulario máx. 5 min/día, escritura + mündliche diarios, simulacro final días 29-30) y sirven de plantilla real para B2/C1/C2 abajo — revisar sus arrays en `plan.js` como referencia de formato antes de escribir los que faltan.

### B2 — pendiente (plan de modificación definido, listo para ejecutar por sesiones)

**Requisito específico del usuario para B2 (distinto al patrón A1/A2):** cada uno de los 30 días debe incluir **2-3 reglas gramaticales** (no 1), **escritura diaria** (`escritura.html`, no solo semana 4) y **mündliche diaria** (`mundliche.html`, no solo semana 4). Tope de tiempo: repaso de vocabulario **máx. 5 min/día**, cada regla gramatical **5 min**.

**Recursos reales disponibles (verificados en código):**
- `GRAMMAR_DATA.B2` (`grammar-data.js`, 10 ids `b2-01`…`b2-10`, todos con banco completo en `reformulaciones-data.json` para `chat-reformulaciones.html`):
  1. `b2-01` Konjunktiv I (discurso indirecto)
  2. `b2-02` Konjunktiv II pasado (hipótesis irreales en el pasado)
  3. `b2-03` Partizip I como adjetivo (acción en curso)
  4. `b2-04` Partizip II como adjetivo (acción completada/resultado)
  5. `b2-05` Pasiva con agente (von/durch, Zustandspassiv)
  6. `b2-06` Conectores de dos partes (sowohl…als auch, weder…noch…)
  7. `b2-07` Nominalizaciones
  8. `b2-08` Partículas modales (doch, mal, ja, eigentlich, eben, halt)
  9. `b2-09` Finalidad: um…zu / damit
  10. `b2-10` Concesión y adversación (obwohl, trotzdem, dennoch, zwar…aber)
- Categorías reales de vocabulario — `DataB2.json` (vía `palabrasB2.html`, leídas por `shared-game.js`): `esenciales`, `verbos`, `sustantivos`, `adjetivos`, `expresiones`.
- `escritura.html` nivel B2 (`LEVEL_SPECS.B2`, 130-180 palabras): 3 tipos reales — `foro` (Forumsbeitrag argumentativo), `reclamacion` (carta/e-mail formal de queja), `email-trabajo` (e-mail formal laboral/estudios).
- `mundliche.html` nivel B2 (`LEVEL_SPECS.B2.teile`): 3 Teile reales — `praesentation` (Teil 1, monólogo 150s), `bildbeschreibung` (Teil 2, "describir una situación", monólogo 90s), `diskussion` (Teil 3, diálogo 60s×6 turnos).
- `chat-reformulaciones.html`: banco `b2-01`…`b2-10` completo en `reformulaciones-data.json` — se usa para las pasadas de repaso/consolidación (en vez de `gramatica.html`, que se reserva para la primera explicación de cada regla).
- `kasus.html` **no aplica a B2**: sus modos (Nominativ/Akkusativ/Dativ/Genitiv/Wechselpräpositionen) son contenido de A1/A2; ninguna regla `b2-01`…`b2-10` es de flexión de caso. Se omite del plan B2 salvo que se quiera un repaso puntual de A2 (no solicitado).

**Plantilla diaria (misma estructura los 30 días):**
```
tasks: [
  { app: "gramatica.html" | "chat-reformulaciones.html", label: "Gramática: <título regla>", minutes: 5 },  // × 2-3, una por regla del día
  { app: "palabrasB2.html", label: "Vocabulario: <categoría del día>", minutes: 5 },
  { app: "escritura.html", label: "Escritura: <tipo del día>", minutes: 15 },
  { app: "mundliche.html", label: "Mündliche: <Teil del día>", minutes: 10 }
]
```
Total: ~35-45 min/día (5-6 tareas).

**Rotación de vocabulario y escritura/mündliche (ciclos fijos, sin necesidad de lógica nueva en la app):**
- Vocabulario: cicla las 5 categorías de `DataB2.json` cada 5 días (`esenciales→verbos→sustantivos→adjetivos→expresiones→repite`).
- Escritura: cicla los 3 tipos (`foro→reclamacion→email-trabajo→repite`).
- Mündliche: cicla los 3 Teile (`praesentation→bildbeschreibung→diskussion→repite`).

**Rotación de gramática (spaced repetition, 3 pasadas + repaso final):**
- **Semana 1 (días 1-7) — primera pasada, explicación con `gramatica.html`:** día 1: `b2-01,02,03`; día 2: `b2-04,05,06`; día 3: `b2-07,08,09`; día 4: `b2-10` + repaso `b2-01,02`; días 5-7: repaso por pares con `chat-reformulaciones.html` (`b2-03+04`, `b2-05+06`, `b2-07+08`) — cierra la primera pasada completa de las 10 reglas.
- **Semana 2 (días 8-14) — segunda pasada, consolidación temática con `chat-reformulaciones.html`:** agrupar por familia — día 8: `b2-01+02` (Konjunktiv I/II); día 9: `b2-03+04` (Partizip I/II); día 10: `b2-05+07` (pasiva + nominalización, frecuentes juntas en registro formal); día 11: `b2-06+10` (conectores dobles + concesión); día 12: `b2-09+10` (finalidad + concesión); día 13: `b2-08` + repaso libre; día 14: repaso mixto 3 reglas más débiles (a definir en la sesión de ejecución según errores registrados, o `b2-01,05,09` por defecto).
- **Semana 3 (días 15-21) — tercera pasada, combinaciones cruzadas:** día 15: `b2-01+05`; día 16: `b2-02+04`; día 17: `b2-03+09`; día 18: `b2-06+08`; día 19: `b2-07+10`; día 20: repaso 3 reglas (`b2-02,06,09`); día 21: repaso 3 reglas (`b2-01,04,08`).
- **Semana 4 (días 22-30) — repaso final + simulacro:** días 22-27: ciclo completo una vez más a 2/día (`b2-01,02` / `b2-03,04` / `b2-05,06` / `b2-07,08` / `b2-09,10` / repaso libre 2 reglas más flojas); día 28: repaso general 3 reglas variadas; días 29-30: **simulacro final** — mantener escritura/mündliche del día pero evaluación completa (`escritura.html` tipo `foro` + `mundliche.html` Teile completos con puntuación 0-100), como cierre del mes, sin introducir gramática nueva (solo repaso ligero 2 reglas).

**Siguiente paso de ejecución:** generar el array `b2: [...]` en `plan.js` (30 objetos `{ day, week, focus, tasks }`) siguiendo la plantilla y rotaciones de arriba, reemplazando el `b2` actual (que usa labels inventados como "Vorgangspassiv básico", "conversación libre B2" sin regla real asociada, y no usa `escritura.html` ni `mundliche.html`). Hacerlo en una o más sesiones separadas (p. ej. semana por semana) para preservar contexto; marcar cada semana con `[x]` aquí al terminarla, siguiendo el mismo formato de bitácora usado en A1/A2/B1.

**Sesiones de ejecución (una por semana, mismo patrón que A1/A2/B1):**
- [ ] Sesión B2.1 — Semana 1 (días 1-7): escribir los 7 días siguiendo "Semana 1" de la rotación de gramática de arriba (primera pasada `b2-01`…`b2-10` con `gramatica.html`), vocabulario ciclando `esenciales→verbos→sustantivos→adjetivos→expresiones`, `escritura.html` ciclando `foro→reclamacion→email-trabajo`, `mundliche.html` ciclando `praesentation→bildbeschreibung→diskussion`. Verificar contra el `b2` actual que no queden labels inventados residuales en esos 7 días antes de sobrescribir.
- [ ] Sesión B2.2 — Semana 2 (días 8-14): segunda pasada por parejas temáticas con `chat-reformulaciones.html` (banco `b2-01`…`b2-10` ya completo en `reformulaciones-data.json`), continuar rotación de vocab/escritura/mündliche.
- [ ] Sesión B2.3 — Semana 3 (días 15-21): combinaciones cruzadas + 2 días de repaso libre (reglas más flojas, o `b2-02,06,09` / `b2-01,04,08` por defecto si no hay datos de errores todavía).
- [ ] Sesión B2.4 — Semana 4 (días 22-30): ciclo final a 2 reglas/día (días 22-27), repaso general día 28, simulacro completo días 29-30 (`escritura.html` tipo `foro` + `mundliche.html` los 3 Teile, puntuación 0-100, sin gramática nueva).
- [ ] Cierre: actualizar esta sección de `plan.md` marcando "B2 — completado" con el mismo formato de bitácora que A1/A2/B1 (resumen de lo corregido vs. el `b2` anterior) y verificar en `plan.html` que los 30 días renderizan sin errores de consola.

### C1 — pendiente (diagnóstico hecho, listo para diseñar rotación)

**Regla obligatoria (recordatorio):** antes de tocar `plan.js`, revisar el `c1` actual en el archivo para detectar labels/temas inventados, igual que se hizo con A1/A2/B1 antes de reescribir.

**Recursos reales disponibles (verificados en código):**
- `GRAMMAR_DATA.C1` (`grammar-data-c1.js`, 10 ids `c1-01`…`c1-10`, banco completo en `reformulaciones-data.json` para `chat-reformulaciones.html` — confirmado, los 10 ids existen como claves):
  1. `c1-01` lassen + sich (posibilidad pasiva activa)
  2. `c1-02` sein + zu + Infinitiv (obligación/posibilidad pasiva)
  3. `c1-03` Atributo participial extendido (erweitertes Partizipialattribut)
  4. `c1-04` Colocaciones verbonominales (Funktionsverbgefüge)
  5. `c1-05` Irrealis del pasado con modales (hätte…können/müssen/sollen)
  6. `c1-06` Ersatzinfinitiv (hat sehen/lassen/können)
  7. `c1-07` Formación de palabras: compuestos (Komposita)
  8. `c1-08` Partículas de evidencialidad (soll/will/dürfte/müsste)
  9. `c1-09` Cohesión textual (referencia anafórica, elipsis, pronombres adverbiales)
  10. `c1-10` Inversión estilística (Kaum…als, Erst wenn)
- Categorías reales de vocabulario — `DataC1.json` (vía `C1.html`, leídas por `shared-game.js`): `esenciales`, `verbos`, `sustantivos`, `adjetivos`, `expresiones` — mismo esquema que A1/A2/B1/B2.
- `escritura.html` nivel C1 (`LEVEL_SPECS.C1`, 200-260 palabras): 3 tipos reales — `stellungnahme` (texto argumentativo a partir de puntos guía), `informe` (interpretar/comentar datos o resultados de una encuesta), `carta-formal` (correspondencia formal compleja).
- `mundliche.html` nivel C1 (`LEVEL_SPECS.C1.teile`): 3 Teile reales — `vortrag` (Teil 1, monólogo 210s, 3-4 puntos), `diskussion` (Teil 2, diálogo 60s×6 turnos, postura adversarial asignada al examinador), `feedback-geben` (Teil 3 "Stellung nehmen", monólogo 60s, reaccionar a una afirmación/dato dado).
- `kasus.html` **no aplica a C1** (flexión de caso es contenido A1/A2/B1); se omite del plan salvo repaso puntual no solicitado.

**Plantilla diaria (mismo patrón que B2):**
```
tasks: [
  { app: "gramatica.html" | "chat-reformulaciones.html", label: "Gramática: <título regla>", minutes: 5 },  // × 2-3
  { app: "C1.html", label: "Vocabulario: <categoría del día>", minutes: 5 },
  { app: "escritura.html", label: "Escritura: <tipo del día>", minutes: 15 },
  { app: "mundliche.html", label: "Mündliche: <Teil del día>", minutes: 10 }
]
```

**Rotación de vocabulario y escritura/mündliche (ciclos fijos):**
- Vocabulario: `esenciales→verbos→sustantivos→adjetivos→expresiones→repite` cada 5 días.
- Escritura: `stellungnahme→informe→carta-formal→repite` cada 3 días.
- Mündliche: `vortrag→diskussion→feedback-geben→repite` cada 3 días.

**Rotación de gramática propuesta (mismo esquema 3 pasadas + repaso que B2, adaptado a temas C1):**
- **Semana 1 (días 1-7) — primera pasada, `gramatica.html`:** día 1: `c1-01,02,03`; día 2: `c1-04,05,06`; día 3: `c1-07,08,09`; día 4: `c1-10` + repaso `c1-01,02`; días 5-7: repaso por pares con `chat-reformulaciones.html` (`c1-03+04`, `c1-05+06`, `c1-07+08`).
- **Semana 2 (días 8-14) — consolidación temática con `chat-reformulaciones.html`:** día 8: `c1-01+05` (lassen+sich / irrealis con modales — ambas alternativas a la pasiva); día 9: `c1-02+04` (sein+zu / colocaciones formales); día 10: `c1-03+09` (atributo participial + cohesión textual, ambas típicas de comprensión lectora densa); día 11: `c1-06+05` (Ersatzinfinitiv + irrealis, familia de "verbo doble al final"); día 12: `c1-08+09` (evidencialidad + cohesión, registro periodístico/académico); día 13: `c1-07` + repaso libre; día 14: repaso mixto 3 reglas más débiles (o `c1-01,04,10` por defecto).
- **Semana 3 (días 15-21) — combinaciones cruzadas:** día 15: `c1-01+02`; día 16: `c1-03+07`; día 17: `c1-04+08`; día 18: `c1-05+06`; día 19: `c1-09+10`; día 20: repaso 3 reglas (`c1-02,06,09`); día 21: repaso 3 reglas (`c1-01,04,08`).
- **Semana 4 (días 22-30) — repaso final + simulacro:** días 22-27: ciclo completo a 2/día (`c1-01,02` / `c1-03,04` / `c1-05,06` / `c1-07,08` / `c1-09,10` / repaso libre 2 reglas más flojas); día 28: repaso general 3 reglas variadas; días 29-30: simulacro final (`escritura.html` tipo `stellungnahme` + `mundliche.html` los 3 Teile, puntuación 0-100), sin gramática nueva.

**Siguiente paso de ejecución:** generar el array `c1: [...]` en `plan.js` siguiendo la plantilla y rotación de arriba, en sesiones separadas por semana (mismo patrón que B2 arriba); marcar cada semana con `[x]` al terminarla.

### C2 — pendiente (diagnóstico hecho, listo para diseñar rotación)

**Regla obligatoria (recordatorio):** revisar el `c2` actual en `plan.js` para detectar labels/temas inventados antes de reescribir.

**Recursos reales disponibles (verificados en código):**
- `GRAMMAR_DATA.C2` (`grammar-data-c2.js`, 10 ids `c2-01`…`c2-10`, banco completo en `reformulaciones-data.json`):
  1. `c2-01` Registro y variación estilística (formal/coloquial/científico/burocrático)
  2. `c2-02` Fraseología e idiomatismos (Redewendungen)
  3. `c2-03` Figuras retóricas (Ironie, Euphemismus, Litotes, Hyperbel)
  4. `c2-04` Ambigüedad pragmática (implicatura, presuposición, sobreentendido)
  5. `c2-05` Convenciones del texto científico (pasiva impersonal, nominalizaciones, hedging)
  6. `c2-06` Arcaísmos y registro literario (ward, sei, möge)
  7. `c2-07` Variantes dialectales (bávaro-austriaco, alemánico/suizo, Plattdeutsch)
  8. `c2-08` Metaidioma y fórmulas discursivas (relativizar, reformular, concluir)
  9. `c2-09` Modalidad compleja (müsste eigentlich, dürfte wohl, hätte können)
  10. `c2-10` Características de tipos de texto (Essay, Gutachten, Leserbrief, Protokoll)
- Categorías reales de vocabulario — `DataC2.json` (vía `C2.html`): `esenciales`, `verbos`, `sustantivos`, `adjetivos`, `expresiones` — mismo esquema.
- `escritura.html` nivel C2 (`LEVEL_SPECS.C2`, 300-400 palabras): 3 tipos reales — `ensayo` (artículo de opinión con estructura retórica elaborada), `resena` (reseña crítica de libro/película/exposición), `leserbrief` (carta al director reaccionando a un artículo de prensa).
- `mundliche.html` nivel C2 (`LEVEL_SPECS.C2.teile`): 3 Teile reales — `vortrag` (Teil 1, monólogo 240s, académico con estructura retórica Aufhänger/Entfaltung/Pointe), `diskussion` (Teil 2, diálogo 60s×6 turnos, registro alto), `zusammenfassen-kommentieren` (Teil 3, monólogo 90s, resumir y comentar un texto/cita breve).
- `kasus.html` **no aplica a C2** — se omite del plan.

**Plantilla diaria (mismo patrón que C1/B2):**
```
tasks: [
  { app: "gramatica.html" | "chat-reformulaciones.html", label: "Gramática: <título regla>", minutes: 5 },  // × 2-3
  { app: "C2.html", label: "Vocabulario: <categoría del día>", minutes: 5 },
  { app: "escritura.html", label: "Escritura: <tipo del día>", minutes: 15 },
  { app: "mundliche.html", label: "Mündliche: <Teil del día>", minutes: 10 }
]
```

**Rotación de vocabulario y escritura/mündliche:**
- Vocabulario: `esenciales→verbos→sustantivos→adjetivos→expresiones→repite` cada 5 días.
- Escritura: `ensayo→resena→leserbrief→repite` cada 3 días.
- Mündliche: `vortrag→diskussion→zusammenfassen-kommentieren→repite` cada 3 días.

**Rotación de gramática propuesta:**
- **Semana 1 (días 1-7) — primera pasada, `gramatica.html`:** día 1: `c2-01,02,03`; día 2: `c2-04,05,06`; día 3: `c2-07,08,09`; día 4: `c2-10` + repaso `c2-01,02`; días 5-7: repaso por pares con `chat-reformulaciones.html` (`c2-03+04`, `c2-05+06`, `c2-07+08`).
- **Semana 2 (días 8-14) — consolidación temática:** día 8: `c2-01+03` (registro + figuras retóricas, ambas sobre estilo); día 9: `c2-02+08` (idiomatismos + fórmulas discursivas, fluidez oral); día 10: `c2-05+10` (convenciones científicas + tipos de texto, escritura formal); día 11: `c2-04+08` (pragmática + metaidioma, comprensión fina); día 12: `c2-09+01` (modalidad compleja + registro); día 13: `c2-06+07` (arcaísmos + dialectos, reconocimiento pasivo); día 14: repaso mixto 3 reglas más débiles (o `c2-02,05,09` por defecto).
- **Semana 3 (días 15-21) — combinaciones cruzadas:** día 15: `c2-01+02`; día 16: `c2-03+04`; día 17: `c2-05+09`; día 18: `c2-08+10`; día 19: `c2-06+07`; día 20: repaso 3 reglas (`c2-02,05,08`); día 21: repaso 3 reglas (`c2-01,04,09`).
- **Semana 4 (días 22-30) — repaso final + simulacro:** días 22-27: ciclo completo a 2/día; día 28: repaso general 3 reglas variadas; días 29-30: simulacro final (`escritura.html` tipo `ensayo` + `mundliche.html` los 3 Teile, puntuación 0-100), sin gramática nueva.

**Siguiente paso de ejecución:** generar el array `c2: [...]` en `plan.js` siguiendo la plantilla y rotación de arriba, en sesiones separadas por semana; marcar cada semana con `[x]` al terminarla. Ejecutar **después** de C1 (mismo orden que el resto de niveles, de menor a mayor).

---

## Backlog — funcionalidades pendientes

- [ ] **Aplicar deep-linking directo (mismo patrón que A1/A2/B1) a B2, C1, C2.** Cada `task.app` debe apuntar a la actividad concreta (`gramatica.html#{ruleId}`, `{NIVEL}.html?set={categoria}`, `escritura.html?level={NIVEL}&tipo={id}`, `mundliche.html?level={NIVEL}&teil={id}`, `chat-reformulaciones.html?rule={id}`), no solo a la portada genérica de la app. El soporte de query params ya existe en todas las apps involucradas — se resuelve automáticamente al ejecutar las reescrituras de B2/C1/C2 de arriba, no requiere trabajo adicional.
- [ ] **Dashboard de profesor: reglas gramaticales más falladas entre alumnos.** Desde que `chat-reformulaciones.html` incorporó SRS por regla (`grammar_rule_progress`, `supabase/migrations/008_grammar_rule_progress.sql`), cada alumno ve su propio historial de repaso pero no hay agregación a nivel de profesor — no hay visibilidad de qué reglas fallan más *entre* alumnos. Con `grammar_rule_progress` ya poblándose en Supabase (PK `(user_id, rule_id)`, columnas `ease/interval/reps/due`), un dashboard tipo `admin/index.html` que agregue `reps`/`ease` bajos por `rule_id` across usuarios sería una extensión natural y de bajo costo (sin tabla nueva, solo una vista o query agregada) si llega a interesar.
- [ ] **(Opcional, no bloqueante) `reformulaciones-data.json`:** renombrar las claves huérfanas `a2-07`/`a2-08` → `a1-20`/`a1-21` (esas reglas se reubicaron de A2 a A1 al ampliar `GRAMMAR_DATA`) si se quiere reaprovechar el banco existente en vez de depender del fallback de generación IA para esas dos reglas en `chat-reformulaciones.html`.

---

## Escalabilidad y deuda técnica (auditoría 2026-07-13)

> Nota: `plan-mejoras.md` ya trackea deuda técnica de nivel código (duplicación, accesibilidad, paginación admin, timeouts OpenAI). Esta sección cubre lo que ese archivo no cubre: **límites de infraestructura** (Vercel Hobby, base de datos en Supabase) y **drift de documentación** encontrados al revisar el proyecto completo, incluyendo consulta directa a los Advisors de Supabase (performance + security) sobre el proyecto real.

### 🔴 Escalabilidad — infraestructura

1. **Límite de 12 funciones serverless (Vercel Hobby) ya está al límite.**
   El proyecto ya fusiona endpoints por `action` en el body (`admin.js`, `finanzas.js`) precisamente para no exceder las 12 funciones. Cualquier feature nueva que necesite un endpoint propio obliga a fusionar otro existente o a subir a plan Pro.
   **Propuesta:** decidir de antemano — si se prevén ≥2 features nuevas con backend este año, evaluar upgrade a Vercel Pro (elimina el límite) en vez de seguir comprimiendo endpoints, que ya está degradando la cohesión de `admin.js`/`finanzas.js`.

2. **Rate limiting in-memory por instancia (`api/_lib.js`) sin `KV_REST_API_URL` configurado.**
   `createRateLimiter()` cae a un `Map` en memoria si no hay Vercel KV. Con cold starts frecuentes cada instancia tiene su propio contador — el límite real bajo tráfico repartido entre instancias es mucho más laxo que el nominal (20/min, 10/min, etc.). No es un problema con el tráfico actual, pero se vuelve inconsistente en cuanto haya picos de uso real (varios alumnos a la vez).
   **Propuesta:** activar Vercel KV (`KV_REST_API_URL`/`KV_REST_API_TOKEN`) — el código ya soporta ambos modos, es solo configuración.

3. **RLS re-evalúa `auth.uid()` por fila en casi todas las tablas** (confirmado por Supabase Performance Advisor: `word_lists`, `srs_progress`, `usage_events`, `profiles`, `user_data`, `daily_stats`, `exam_results`, `grammar_state`, `push_subscriptions`, `marketing_posts`, `diccionario_cache`, etc.). Con pocas filas no se nota; con miles de usuarios cada query paga ese costo por fila.
   **Propuesta:** migración que reemplace `auth.uid()` por `(select auth.uid())` en las políticas RLS existentes (fix mecánico, sin cambiar semántica — patrón documentado por Supabase).

4. **Políticas RLS permisivas duplicadas** en `daily_stats`, `exam_results`, `profiles`, `usage_events`, `user_data` (política "propia fila" + política "admin" se apilan y ambas se evalúan por rol). Mismo fix que el punto 3 (consolidar en una sola policy con `OR`) — bajo impacto ahora, crece con el volumen de datos.

5. **Foreign keys sin índice:** `exam_results.user_id`, `portfolio_positions.user_id`, `price_alerts.user_id`, `user_reading_seen.text_id`. No bloquean nada hoy (tablas pequeñas) pero cualquier `JOIN`/`DELETE CASCADE` sobre esas FKs escaneará tabla completa según crezca.
   **Propuesta:** una migración corta añadiendo los 4 índices — barato de aplicar ahora, caro de diagnosticar después.

6. **`usage_events` es la tabla de mayor crecimiento del proyecto** (cada respuesta de quiz, cada audio enviado, cada evento de app inserta una fila — 3 750 filas ya con uso reducido) y no tiene ninguna estrategia de retención. `api/vocab-refresh.js` y varias vistas de marketing (`005_marketing_views.sql`) la consultan sin límite de rango en varios casos.
   **Propuesta:** job de purga periódico (ya existe una función `purge_old_events` detectada por el Advisor de seguridad — confirmar que está en un cron activo; si no lo está, es el punto más barato de resolver aquí) y considerar particionar o archivar filas > 6 meses si el volumen crece 100x.

7. **Datos de vocabulario duplicados en dos fuentes de verdad:** `Data{LEVEL}.json` (estático, servido por Vercel) y las mismas listas sembradas como filas `is_system=true` en `word_lists` (Supabase). `loadSystemLists()` prioriza Supabase pero cae al JSON si falla — mantener ambos sincronizados es manual (`scripts/seed-word-lists.js` no se re-ejecuta automáticamente si se edita un `Data{LEVEL}.json`).
   **Propuesta:** documentar explícitamente en `CLAUDE.md` que tras editar cualquier `Data{LEVEL}.json` hay que re-ejecutar `seed-word-lists.js`, o eliminar la duplicación migrando `shared-game.js` a leer siempre desde Supabase con el JSON solo como fallback de emergencia (ya casi es así, falta forzar la sincronización).

### 🟡 Deuda técnica — drift de documentación

8. **`finance/` es un proyecto completo y no aparece en `CLAUDE.md`.** `finance/finanzas-dashboard.html`, `finanzas-styles.css`, `schema.sql` y los endpoints `api/finanzas.js` están terminados (`finance/plan.md` los marca ✅ Completo) pero violan la regla de mantenimiento del propio `CLAUDE.md` ("actualizar Active Files al añadir un archivo activo"). Es deliberadamente independiente del navbar de alemán, pero comparte `auth.js`/`config.js` y ocupa una de las 12 funciones serverless del mismo proyecto Vercel — por eso sí es relevante para quien mantenga la app de alemán.
   **Propuesta:** añadir una fila en `CLAUDE.md` (sección Apps o una nueva sección "Otros proyectos en este repo") señalando que `finance/` es independiente pero comparte infraestructura (auth, Vercel, cupo de 12 funciones).

9. **Tablas de Supabase activamente usadas y ausentes de la sección "Supabase table" de `CLAUDE.md`:** `usage_events` (la más consultada de todo el proyecto — analítica, cap de voz, vistas de marketing), `profiles`, `daily_stats`, `exam_results`, `grammar_state`, `diccionario_cache` (usadas en `auth.js`, `diccionario.js`, `gramatica.js`, `admin/index.html`). Ninguna tiene migración trackeada en `supabase/migrations/` — se crearon directamente en el editor SQL de Supabase, así que el historial de `git log` no refleja el esquema real de la base de datos.
   **Propuesta:** generar migraciones "de captura" (`CREATE TABLE IF NOT EXISTS` reflejando el estado actual) para estas 6 tablas y documentarlas en `CLAUDE.md` igual que las demás — cierra el hueco entre "lo que dice el repo" y "lo que hay en producción", que hoy solo se puede verificar consultando Supabase directamente.

### Orden sugerido
| # | Tarea | Esfuerzo | Impacto |
|---|-------|----------|---------|
| 5 | Índices en FKs sin indexar | Bajo | Escalabilidad |
| 3 | `(select auth.uid())` en policies RLS | Bajo-medio | Escalabilidad |
| 6 | Confirmar/activar `purge_old_events` en cron | Bajo | Escalabilidad |
| 2 | Activar Vercel KV para rate limiting | Bajo | Confiabilidad |
| 9 | Migraciones de captura + doc de las 6 tablas faltantes | Medio | Mantenibilidad |
| 8 | Documentar `finance/` en `CLAUDE.md` | Bajo | Mantenibilidad |
| 4 | Consolidar policies RLS duplicadas | Medio | Escalabilidad |
| 7 | Resolver duplicación Data{LEVEL}.json / word_lists | Medio | Mantenibilidad |
| 1 | Decidir sobre upgrade a Vercel Pro | — (decisión) | Escalabilidad |
