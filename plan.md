 
## Reglas obligatorias (no negociables)

1. **Revisar compatibilidad antes de tocar código.** Antes de modificar cualquier archivo, identificar qué otros archivos lo importan, qué funciones expone, y qué estructura de datos espera. Documentar el análisis brevemente aquí antes de proceder.
2. **Actualizar este plan al terminar cada tarea.** Marcar con `[x]` y anotar cambios relevantes al diseño si los hubo.
3. **Actualizar `CLAUDE.md`** cuando se agregue un archivo activo al proyecto.

## Mejora del plan de 30 días por nivel (`plan.js`)

Objetivo: que cada día del plan de 30 días (por nivel A1–C2) referencie únicamente estructuras reales de la app — reglas gramaticales que existen en `GRAMMAR_DATA` (`grammar-data.js`), categorías de vocabulario que existen en `Data{NIVEL}.json` (los sets que arma `shared-game.js` a partir de `Object.keys(DATA)`), y funciones reales de las apps (p. ej. Teile de `mundliche.html`, evaluación estructurada de `escritura.html`) — con `escritura.html` y `mundliche.html` a diario (no solo semana 4).

Compatibilidad revisada: `plan.js` solo define `window.PLANS`, consumido por `plan.html` para renderizar el calendario y los enlaces de tareas (`{ app, label, minutes }`). No hay otros archivos que dependan de la estructura interna de cada día, así que los cambios son seguros mientras cada `task.app` siga siendo un archivo HTML válido del proyecto.

**Niveles ya completados (A1, A2, B1)** siguen este mismo patrón (deep-linking por task, 2-3 reglas gramaticales/día, vocabulario máx. 5 min/día, escritura + mündliche diarios, simulacro final días 29-30) y sirven de plantilla real para B2/C1/C2 abajo — revisar sus arrays en `plan.js` como referencia de formato antes de escribir los que faltan.

### B2 — completado (sesión 2026-07-29, sesiones B2.1-B2.4)

**Hallazgo al arrancar la sesión: el trabajo ya estaba hecho.** Este documento describía B2 como "pendiente" con un diseño de rotación basado en **10 reglas** (`b2-01`…`b2-10`), pero al revisar `plan.js` antes de generar nada (regla obligatoria de la cabecera) se encontró que el array `b2` **ya estaba completo desde el commit `0b0b425` ("ajuste planta B2 inclucion del lesen", 2026-07-26)** — 3 días antes de que se escribiera el diagnóstico de arriba. Ese diagnóstico nunca se actualizó tras el commit, quedando desincronizado con el código real. Causa raíz del error de diseño: `GRAMMAR_DATA.B2` tiene en realidad **17 reglas** (`b2-01`…`b2-17`, no 10 — ver nota de `CLAUDE.md`: "B2/C1 follow the chapter granularity of *Grammatik aktiv B2/C1*, Cornelsen"), y la rotación de 30 días ya implementada en `plan.js` sí usa correctamente las 17.

**Verificación técnica realizada (Node, antes de tocar nada):** los 30 días de `PLANS.b2` resuelven contra `GRAMMAR_DATA.B2` (17/17 reglas cubiertas, 0 ids inválidos), contra las categorías reales de `DataB2.json` (esenciales/verbos/sustantivos/adjetivos/expresiones), contra los tipos reales de `escritura.html` nivel B2 (foro/reclamacion/email-trabajo) y los Teile reales de `mundliche.html` nivel B2 (praesentation/bildbeschreibung/diskussion), y contra el deep-link `lectura veloz.html?level=B2` (soportado, confirmado en el código de esa app).

**Revisión pedagógica (2 subagentes independientes, días 1-14 y 15-30) — hallazgos y correcciones aplicadas:**
- Días 8-13 (semana 2, repaso de las 17 reglas): el `focus` no distinguía "primera pasada" de "repaso" salvo en los días 7 y 14 — corregido añadiendo prefijo "Repaso:" a los `focus` de los días 8, 9, 10, 11, 12 y 13.
- Día 29 (simulacro, Bildbeschreibung): llevaba label genérico "Mündliche: Eine Situation beschreiben" en vez de indicar que es parte del simulacro — corregido a "Simulacro examen: Eine Situation beschreiben (activar Modo examen)".
- Día 30 (simulacro, Präsentation): le faltaba la indicación "(activar Modo examen)" que sí tenía la tarea de Diskussion del mismo día — corregido para que ambas la lleven.
- Verificado con Node tras los cambios: 30 días secuenciales, 0 referencias de regla inválidas.

**Hallazgos NO corregidos (documentados como deuda menor, no bloqueante):**
- Límite de semana inconsistente: en A1/A2/B1 cada semana son exactamente 7 días; en B2 la semana 1 dura 6 días y la semana 2, 8 (el resto compensa: 6+8+7+9=30). No rompe nada en `plan.html` (agrupa por el campo `week`, no asume 7 días), pero difiere de la convención visual del resto de niveles. No se corrigió por requerir renumerar el campo `week` de los días 8-30, cambio más invasivo que el valor que aporta.
- Ligero desbalance de repetición en la primera pasada + repaso (días 1-14): `b2-01` aparece 4 veces mientras `b2-13`/`14`/`15`/`16`/`17` aparecen solo 2 — dentro de lo razonable para repetición espaciada, no se tocó.
- **`reformulaciones-data.json` solo tiene banco pregenerado para 10 de las 17 reglas b2** (`b2-01,02,04,07,08,10,11,15,16,17`); las 7 restantes (`b2-03,05,06,09,12,13,14`), usadas en varios días de la semana 3 vía `chat-reformulaciones.html`, funcionan por el fallback normal de generación IA en vivo de esa app (no es un bug, solo menos eficiente en costo/latencia que usar el banco). Ver ítem nuevo en el Backlog de abajo.

**Próximo paso:** con B2 verificado y correcto, `teacher/clases-b2.js` (tarea 4 de `teacher/plan.md`, bloqueada hasta ahora) queda desbloqueado — puede ejecutarse como siguiente sesión de P-teacher-1. **Aviso importante para C1:** la sección "C1 — pendiente" de más abajo en este mismo archivo tiene el mismo error de diseño que tenía B2 (asume 10 reglas `c1-01`…`c1-10`, pero `GRAMMAR_DATA.C1` también tiene 17 reglas reales, confirmado con Node) — antes de ejecutar cualquier sesión C1.x hay que re-diagnosticar esa sección contra las 17 reglas reales, igual que se hizo aquí para B2, y **primero comprobar si `plan.js` ya tiene contenido para `c1` que este documento no refleje** (mismo error que causó este hallazgo en B2).

**Requisito específico del usuario para B2 (distinto al patrón A1/A2):** cada uno de los 30 días debe incluir **2-3 reglas gramaticales** (no 1), **escritura diaria** (`escritura.html`, no solo semana 4) y **mündliche diaria** (`mundliche.html`, no solo semana 4). Tope de tiempo: repaso de vocabulario **máx. 5 min/día**, cada regla gramatical **5 min**.

**Re-auditoría (sesión 2026-07-31):** el usuario pidió revisar si el plan B2 cubre todas las reglas gramaticales, todos los ejercicios orales y si el Lesen está adaptado. Verificación con Node (no solo lectura del documento, para no repetir el error de diagnóstico desactualizado que tuvo B2 antes de la sesión 2026-07-29):
- **Gramática:** 17/17 reglas de `GRAMMAR_DATA.B2` cubiertas, 0 ids inválidos.
- **Oral (`mundliche.html`):** los 3 Teile de `LEVEL_SPECS.B2` (`praesentation`, `bildbeschreibung`, `diskussion`) están usados en el plan.
- **Escritura:** los 3 tipos de `LEVEL_SPECS.B2` (`foro`, `reclamacion`, `email-trabajo`) están usados.
- **Lesen:** **ya estaba adaptado antes de esta sesión** — `lecturaplan.md` §12 documenta que la Fase 2 (B2, formato por Teile real del examen) se implementó en `api/_reading-topics.js`/`api/chat.js`/`lectura veloz.html` en una sesión anterior a esta; confirmado en código (`READING_TEILE_SPECS.B2` existe, poblado con 5 Teile). Los 15 días del plan que incluyen lectura apuntan a `lectura veloz.html?level=B2`, que hace deep-link a Comprensión → Por nivel → B2 y ya sirve el formato Teile (no el MCQ plano legado). **No hacía falta ninguna implementación nueva** — el único hallazgo fue documentación desactualizada: `CLAUDE.md` describía `READING_TEILE_SPECS` como "solo B1 poblado" (corregido en esta sesión a "B1 y B2") y el ítem de backlog sobre deep-linking B2/C1/C2 (más abajo) seguía sin marcar como hecho la parte de B2 (corregido).
- **Conclusión:** B2 no requiere ninguna sesión de "adaptación" adicional — está completo en las 3 dimensiones pedidas. Queda C1/C2 (secciones de abajo, aún pendientes de generar su array en `plan.js`).

### C1 — pendiente (diagnóstico hecho, listo para diseñar rotación — ⚠️ re-verificar antes de ejecutar, ver aviso arriba)

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

- [x] **Aplicar deep-linking directo (mismo patrón que A1/A2/B1) a B2, C1, C2.** Cada `task.app` debe apuntar a la actividad concreta (`gramatica.html#{ruleId}`, `{NIVEL}.html?set={categoria}`, `escritura.html?level={NIVEL}&tipo={id}`, `mundliche.html?level={NIVEL}&teil={id}`, `chat-reformulaciones.html?rule={id}`), no solo a la portada genérica de la app. **B2 verificado con Node (sesión 2026-07-31): los 30 días usan deep-linking completo, incluyendo `lectura veloz.html?level=B2` — 0 issues.** C1/C2 siguen pendientes (bloqueados por la generación de sus arrays en `plan.js`, ver secciones de arriba).
- [ ] **Dashboard de profesor: reglas gramaticales más falladas entre alumnos.** Desde que `chat-reformulaciones.html` incorporó SRS por regla (`grammar_rule_progress`, `supabase/migrations/008_grammar_rule_progress.sql`), cada alumno ve su propio historial de repaso pero no hay agregación a nivel de profesor — no hay visibilidad de qué reglas fallan más *entre* alumnos. Con `grammar_rule_progress` ya poblándose en Supabase (PK `(user_id, rule_id)`, columnas `ease/interval/reps/due`), un dashboard tipo `admin/index.html` que agregue `reps`/`ease` bajos por `rule_id` across usuarios sería una extensión natural y de bajo costo (sin tabla nueva, solo una vista o query agregada) si llega a interesar.
- [ ] **(Opcional, no bloqueante) `reformulaciones-data.json`:** renombrar las claves huérfanas `a2-07`/`a2-08` → `a1-20`/`a1-21` (esas reglas se reubicaron de A2 a A1 al ampliar `GRAMMAR_DATA`) si se quiere reaprovechar el banco existente en vez de depender del fallback de generación IA para esas dos reglas en `chat-reformulaciones.html`.
- [ ] **(Opcional, no bloqueante) `reformulaciones-data.json` — hueco de cobertura B2/C1 tras la expansión 10→17 reglas (migración `010_grammar_rule_id_b2c1_remap.sql`):** el banco solo tiene 10 entradas para B2 (`b2-01,02,04,07,08,10,11,15,16,17`) y 10 para C1 (`c1-01,02,04,05,06,07,09,14,15,16`) — las 7 reglas nuevas de cada nivel (p. ej. B2: `b2-03,05,06,09,12,13,14`) no tienen ejercicios pregenerados y `chat-reformulaciones.html` genera por IA en cada uso (fallback normal, no roto, solo menos eficiente en costo/latencia). Detectado durante la verificación de `plan.js` B2 (sesión 2026-07-29). Ejecutar `scripts/generate-reformulaciones.js` para las reglas faltantes si se quiere cerrar el hueco.

---

## Mejoras pedagógicas (auditoría 2026-07-29)

> Origen: revisión completa de la suite pedida por el usuario para identificar mejoras
> a nivel pedagógico (no técnico). Los puntos marcados "ya en backlog/lecturaplan/
> teacher/plan" no se rediseñan aquí — solo se referencian para que el orden de
> ejecución de abajo quede completo; su diseño vive en su documento original.
> Regla obligatoria de la cabecera de este archivo aplica igual aquí: revisar
> compatibilidad antes de tocar código, marcar `[x]` al terminar cada sesión,
> actualizar `CLAUDE.md`/`README.md` si se agrega un archivo activo.

### P1. Hörverstehen — no existe entrenamiento de comprensión auditiva

**Diagnóstico:** Lesen (`lectura veloz.html` Modo B), Schreiben (`escritura.html`) y
Sprechen (`mundliche.html`) tienen simulacros fieles al formato Goethe/telc. Hören no
tiene equivalente — `chat-voz.html`/`chatvoz2` son conversación (habla-y-escucha-una-
respuesta), no una tarea de "escucha un audio → responde preguntas de comprensión".

**Diseño propuesto:** reutilizar el patrón ya construido en `lectura veloz.html` Modo B
(`READING_TEILE_SPECS`, `validTeileSession`/`TEIL_VALIDATORS`, renderers `mcq`/
`richtig_falsch`/`emparejar`) invirtiendo el flujo: en vez de mostrar un texto, generar
un guion por IA y reproducirlo con `api/tts.js` (mismo patrón que la voz premium de
`mundliche.html`), luego preguntar sobre lo escuchado. No requiere Whisper (no hay STT,
es al revés).

**Decisiones a tomar en la Sesión 1 (no asumir de antemano):**
- Tabla nueva `listening_texts` (mismo shape que `reading_texts` + columna `audio_text`
  para el guion) vs. reusar `reading_texts` con una columna `skill` (`lesen`/`hoeren`).
  Recomendado: tabla nueva — evita mezclar políticas RLS/columnas no usadas entre dos
  dominios distintos, y `user_reading_seen` seguiría referenciando solo Lesen sin
  ambigüedad.
- Audio generado on-the-fly en cada intento (más simple, repite costo de TTS por
  alumno) vs. cachear el audio generado la primera vez (requiere Supabase Storage,
  más complejo). Recomendado: on-the-fly primero, igual que TTS en el resto de la
  suite — revisar costo real de `tts-1` antes de invertir en caché.
- Nivel de partida: **B1**, mismo criterio que Lesen (nivel bisagra más demandado, ya
  hay Teile/validadores de referencia que copiar).

**Sesiones de ejecución:**
- [ ] Sesión Hören.1 — Diseño: fijar las decisiones de arriba, definir
  `LISTENING_TEILE_SPECS.B1` (formato Hörverstehen B1 real: 5 Teile, mezcla de
  `richtig_falsch`/`mcq`/`emparejar` sobre anuncios cortos, diálogos, entrevista) y el
  esquema de audio (guion con indicaciones de hablante para poder generar TTS con
  distintas voces si el diálogo tiene 2+ personas).
- [ ] Sesión Hören.2 — Backend: migración de la tabla elegida, `generateListeningTeile()`
  en `api/chat.js` o archivo nuevo si ya se acerca al límite de 12 funciones (ver
  Gotcha de `CLAUDE.md` sobre Hobby plan), validadores por tipo (reutilizar los de
  Lesen si el shape es idéntico).
- [ ] Sesión Hören.3 — Frontend: nueva pestaña "🎧 Hörverstehen" en `lectura veloz.html`
  (o app nueva si no encaja en el flujo de "Comprensión" ya existente — decidir en
  Sesión 1), reproductor de audio con controles básicos (play/pause/repetir, sin
  scrubbing libre para simular el examen real donde el audio se oye 1-2 veces), UI de
  Teile reutilizando los renderers `mcq`/`richtig_falsch`/`emparejar` ya construidos.
- [ ] Sesión Hören.4 — Extender a B2/C1/C2 (mismo patrón que Lesen: mcq/emparejar,
  ajustar solo longitud/complejidad del guion). A1/A2 al final (formato más simple:
  anuncios/números/horarios).
- [ ] Cierre: actualizar `CLAUDE.md` (Active Files + tabla Supabase nueva) y `README.md`.

---

### P2. Perfil de debilidades unificado entre apps

**Diagnóstico:** cada app evalúa y muestra errores con detalle (`escritura.html`,
`corrector.html`: error cards por categoría; `mundliche.html`: subscores por rúbrica;
`kasus.html`: aciertos/fallos por caso), pero esa señal no persiste más allá del
historial local de 20 intentos por app (IndexedDB). Solo `srs_progress` (vocabulario) y
`grammar_rule_progress` (reglas, vía `chat-reformulaciones.html`) tienen memoria
persistente en Supabase — y son sistemas separados entre sí. Un alumno puede fallar el
mismo punto (p. ej. Konjunktiv II) en `escritura`, `kasus` y `mundliche` sin que el
sistema conecte esas tres señales.

**Diseño propuesto:** no crear un sistema de tracking nuevo — extender
`grammar_rule_progress` (ya existe, ya tiene SM-2, ya está poblándose) para que
reciba señales de más apps, en vez de que solo `chat-reformulaciones.html` escriba en
ella. Esto convierte la tabla en el "perfil de debilidades" real sin tabla nueva.

**Sesiones de ejecución:**
- [ ] Sesión Perfil.1 — Diseño: para cada evaluación con IA (`escritura.html`,
  `corrector.html`, `mundliche.html`, `gramatica.html` Modo Examen), decidir cómo
  pedirle al modelo que etiquete cada error con el `rule_id` de `GRAMMAR_DATA` más
  cercano cuando aplique (muchos error cards ya son claramente "esto es Konjunktiv II"
  o "esto es orden de palabras en subordinada"; otros son léxicos/ortográficos y no
  deben forzarse a una regla). Definir el criterio de cuándo NO taggear (evitar ruido:
  un error de tipeo no es una debilidad gramatical).
- [ ] Sesión Perfil.2 — Implementar el tagging en `escritura.html` (prompt de
  evaluación ya devuelve error cards con categoría; añadir `rule_id?` opcional al
  schema) y llamar a la misma actualización SM-2 que usa `chat-reformulaciones.html`
  cuando el error trae `rule_id` (reutilizar la función existente, no reimplementarla).
- [ ] Sesión Perfil.3 — Repetir para `mundliche.html` (subscores `gramatica_y_lexico`)
  y `corrector.html`.
- [ ] Sesión Perfil.4 — Vista de alumno "Mis puntos débiles" (agregando
  `grammar_rule_progress` por `ease`/`reps` bajos, cualquiera sea el origen de la
  señal) — candidato natural: sección nueva en el panel de stats de `auth.js` o en
  `gramatica.html`.
- [ ] Sesión Perfil.5 — Dashboard de profesor (ver **P-backlog-1** abajo, ahora con más
  señal disponible que solo `chat-reformulaciones.html`).
- [ ] Cierre: actualizar `CLAUDE.md` (tabla `grammar_rule_progress` con las nuevas
  apps que escriben en ella).

---

### P3. Diagnóstico de nivel por destreza

**Diagnóstico:** el nivel CEFR se autoselecciona una vez en el onboarding
(`onboarding_level`, localStorage) y se asume igual para las 5+ apps que lo leen. No
hay noción de que un alumno puede ser B2 en lectura y A2 en producción oral (común en
autodidactas) — todo asume un nivel único transversal, sin test de nivelación real.

**Diseño propuesto (barato, sin test dedicado):** en vez de construir un examen de
nivelación nuevo, **inferir el nivel por destreza a partir de los resultados reales
ya generados** (`escritura.html` guarda `puntuacion` 0-100 por intento en IndexedDB;
`mundliche.html` guarda `puntuacion`/`veredicto`; Lesen por Teile ya guarda aciertos).
Si el alumno elige B2 pero sus últimas 3 evaluaciones de escritura promedian <40/100,
mostrar un aviso sugiriendo bajar a B1 en esa destreza concreta — sin bloquear, solo
orientar.

**Sesiones de ejecución:**
- [ ] Sesión Diag.1 — Diseño: definir el umbral de puntuación/veredicto que dispara el
  aviso por destreza (escritura, mündliche, lectura), y dónde persistir el nivel
  "sugerido" por destreza (extender `user_data`: columnas `nivel_sugerido_escritura`,
  `nivel_sugerido_mundliche`, etc., o una tabla `skill_level_estimates` más genérica —
  decidir según cuántas destrezas se cubran).
  Nota B1 mündliche: la simulacros aún cubren 3 niveles, la señal ya existe en el
  historial local de cada app (`escritura-db`, `mundliche-db`) — no requiere generar
  datos nuevos, solo agregarlos.
- [ ] Sesión Diag.2 — Implementar el cálculo (al cargar cada app, leer el historial
  local reciente y comparar contra el umbral) y el aviso no bloqueante (mismo patrón
  de warnings inline ya usado en `escritura.html`, sin `alert`/`confirm`).
- [ ] Sesión Diag.3 — Vista de profesor: desglose por alumno y destreza (depende de
  que `usage_events`/evaluaciones ya se logueen con `user_id`, lo cual ya ocurre).
- [ ] Cierre: actualizar `CLAUDE.md`.

---

### P4. Vocabulario SRS reciente sugerido en tareas de escritura

**Diagnóstico:** el vocabulario recién dominado (`reps >= 2` en `srs_progress`, ya
usado como fuente del Sprint de `lectura veloz.html`) no se inyecta en
`escritura.html`/`mundliche.html`. El alumno lo memoriza aislado pero rara vez se le
pide usarlo en producción real, que es donde se consolida.

**Sesiones de ejecución (una sola sesión, feature pequeña):**
- [ ] Sesión Vocab.1 — En `escritura.html`, al generar la tarea (`fetchTarea()`),
  consultar 3-5 palabras con `reps >= 2` del nivel activo desde `srs_progress` (mismo
  query que ya usa `lectura veloz.html` para el Sprint) y añadirlas como sugerencia
  opcional visible bajo el enunciado ("💡 Si querés, usá alguna de estas palabras que
  ya dominás: ..."), sin forzarlas en la evaluación (para no penalizar al alumno que
  no las use — es una tarea tipo examen real).

---

### P5. Interleaving en la práctica de gramática (`gramatica.html`)

**Diagnóstico:** el botón "🎯 Practicar" de `gramatica.html` genera 5 preguntas de
**una sola regla** por sesión (práctica en bloque). `chat-reformulaciones.html` ya
permite seleccionar varias reglas o modo aleatorio para una sesión — el patrón
intercalado ya existe en la suite, falta llevarlo a `gramatica.html`.

**Sesiones de ejecución:**
- [ ] Sesión Interleave.1 — Añadir un modo "Repaso mixto" en `gramatica.html`: elegir
  2-3 reglas ya practicadas antes (usando `grammar_rule_progress`/`user_grammar_practice_seen`
  para priorizar reglas con `due` próximo, mismo criterio SM-2 que ya usa
  `chat-reformulaciones.html`) y mezclar sus preguntas en una sola sesión de quiz en
  vez de una sesión por regla.
- [ ] Cierre: actualizar `CLAUDE.md` (nota en la fila de `gramatica.html`).

---

### P6. Encadenar Lesen → Schreiben (mismo patrón que Vortrag → Diskussion) — completado (sesión 2026-07-31)

**Diagnóstico:** `mundliche.html` ya encadena Vortrag→Diskussion en la misma sesión
(`findVortragPrevio()`) — un patrón fuerte porque simula uso real del idioma. No se
generalizó a Lesen→Schreiben (leer un texto de comprensión y luego escribir sobre el
mismo tema).

**Sesiones de ejecución:**
- [x] Sesión Cadena.1 — Al terminar una sesión de Teile en `lectura veloz.html` Modo B
  (`modoB_mostrarResultadoTeilFinal()`), se añadió el botón "✍️ Escribir sobre este tema"
  (`#comp-escribir-btn` dentro de `#comp-resultado`, oculto por defecto y explícitamente
  ocultado en los otros dos flujos que reusan el mismo contenedor — `compMostrarResultado()`
  Modo A y `modoB_mostrarResultado()` Modo B formato 1 — para que no aparezca fuera de una
  sesión por Teile). El botón navega a
  `escritura.html?level={TeilState.level}&tema={encodeURIComponent(TeilState.titulo)}`
  (`TeilState.titulo` es el título real de la sesión generada por IA, ya guardado en
  `reading_texts.title`). En `escritura.html`, `initLevel()` lee el nuevo param `tema` y lo
  guarda en `EscState.temaFijo`; `buildTaskPrompt()` usa `EscState.temaFijo` en vez de
  sortear del banco `TEMAS` cuando está presente. `renderTarea()` muestra un badge "📖 Tema
  del texto leído" (con el tema completo en `title` del badge) para que el alumno entienda
  por qué el tema no es aleatorio. Sin tabla ni migración nueva — solo deep-linking (mismo
  mecanismo que el backlog de B2/C1/C2).
  **Verificación realizada:** los 2 bloques `<script>` de cada archivo parsean con `new
  Function` (sin errores de sintaxis). **Probado en navegador real (Playwright/Chromium
  headless contra `vercel dev` local, sesión de usuario real inyectada)** junto con la
  validación manual de B1 Leseverstehen — ver `lecturaplan.md` §11. El botón aparece tras
  completar los 5 Teile, navega a `escritura.html?level=B1&tema=Umwelt%20und%20Recycling`
  (título real generado por la sesión de prueba), la pill de nivel B1 queda preseleccionada
  y `EscState.temaFijo`/`buildTaskPrompt()` confirmados usando ese tema (verificado sin
  llamar a la API real, que localmente falla por falta de `OPENAI_API_KEY` en `.env.local`
  — no es un bug de este cambio).

---

### Puntos ya diagnosticados en otros documentos (incluidos aquí solo para el orden de ejecución)

- **P-backlog-1 — Dashboard de profesor: reglas más falladas entre alumnos.** Ver
  Backlog arriba. Se beneficia directamente de P2 (más señal en `grammar_rule_progress`).
- **P-teacher-1 — Extender `teacher/index.html` a A1/A2/B2/C1/C2.** Ver
  `teacher/plan.md` tarea 4 — marcado por el propio usuario como la tarea de mayor
  impacto pedagógico (revisión 2026-07-18). **En progreso:** `teacher/clases-a1.js`
  (Sesión 1, 2026-07-29), `teacher/clases-a2.js` (Sesión 2, 2026-07-29), el
  **selector de nivel en `teacher/index.html` (Sesión 3, 2026-07-29, tarea 5 —
  completada)** y **`teacher/clases-b2.js` (Sesión 5, 2026-07-31 — completada)** —
  A1/A2/B1/B2 ya seleccionables en la UI, solo C1/C2 deshabilitados hasta que
  existan sus `clases-{nivel}.js`. De paso (Sesión 3) se corrigió un bug preexistente
  en `teacher/clases-b1.js` que sobrescribía `window.TEACHER_CLASES` entero en vez
  de fusionar (borraba A1/A2 al cargar los 3 scripts juntos) — ver detalle en
  `teacher/plan.md` tarea 5. Falta la tarea 4 para C1/C2 (bloqueada por
  P-plan-1 abajo).
- **P-plan-1 — Completar `plan.js` (B2/C1/C2) con gramática/escritura/mündliche
  diarios reales.** B2 **completado y verificado (sesión 2026-07-29)** — ver sección
  de arriba. C1/C2 siguen pendientes; C1 necesita re-diagnóstico previo (su sección de
  arriba asume 10 reglas cuando `GRAMMAR_DATA.C1` tiene 17 — mismo error que tenía B2).
- **P-lectura-1 — Extender Leseverstehen por Teile a C1/C2 (bajo esfuerzo) y A1/A2
  (medio esfuerzo, tipos de tarea nuevos).** Ver `lecturaplan.md` §12.

### Orden de ejecución sugerido (impacto pedagógico vs. esfuerzo/dependencias)

| Orden | Punto | Impacto | Esfuerzo | Depende de |
|-------|-------|---------|----------|------------|
| 1 | P-teacher-1 — `teacher/index.html` a todos los niveles | Alto | Medio | `plan.js` verificado por nivel |
| 2 | P-plan-1 — Completar `plan.js` B2/C1/C2 | Alto | Medio | B2 ✅ hecho; falta C1 (re-diagnóstico) / C2 |
| 3 | P2 — Perfil de debilidades unificado | Alto | Medio-alto | — |
| 4 | P1 — Hörverstehen | Alto | Medio-alto | — |
| 5 | P5 — Interleaving en `gramatica.html` | Medio | Bajo | — |
| 6 | P3 — Diagnóstico de nivel por destreza | Medio | Medio | Historial local ya existente |
| 7 | P4 — Vocabulario SRS sugerido en escritura | Medio | Bajo | — |
| 8 | P-backlog-1 — Dashboard profesor reglas más falladas | Medio | Bajo | Idealmente después de P2 |
| 9 | P6 — Encadenar Lesen→Schreiben | Bajo-Medio | Bajo | — |
| 10 | P-lectura-1 — Leseverstehen Teile a C1/C2/A1/A2 | Bajo-Medio | Bajo (C1/C2) / Medio (A1/A2) | — |

Ejecutar en el orden de la tabla salvo que el usuario priorice distinto en la sesión de
arranque de cada punto — cada fila es independiente entre sí salvo donde se anota una
dependencia explícita.

### Estado de ejecución (actualizado 2026-07-31)

**Ejecutado hasta ahora (5 sesiones — Sesiones 1-3 y 5 dentro de P-teacher-1, orden 1 de la tabla; Sesión 4 dentro de P-plan-1, orden 2):**
- [x] Sesión 1 — `teacher/clases-a1.js`: 30 días de `PLANS.a1` cruzados contra las 21
  reglas de `GRAMMAR_DATA.A1`. Detalle completo en `teacher/plan.md` tarea 4.
- [x] Sesión 2 — `teacher/clases-a2.js`: mismo patrón, 30 días de `PLANS.a2` cruzados
  contra las 21 reglas de `GRAMMAR_DATA.A2`. Verificado con Node (30 días secuenciales,
  8 días de clase en vivo, `contenido.reglas[]` alineado con `ruleIds`, 21 reglas
  cubiertas 4-5 veces cada una). Detalle en `teacher/plan.md` tarea 4.
- [x] Sesión 3 — Tarea 5 de `teacher/plan.md`: selector de nivel (pill buttons) en
  `teacher/index.html`, A1/A2/B1 seleccionables, B2/C1/C2 deshabilitados (listos para
  habilitarse con un cambio de una línea en el array `LEVELS` en cuanto existan). Bug
  preexistente corregido de paso: `teacher/clases-b1.js` sobrescribía
  `window.TEACHER_CLASES` entero en vez de fusionar, lo que borraba A1/A2 al cargar los
  3 scripts a la vez — solo se manifestaba con más de un nivel cargado, por eso no se
  había detectado antes. Verificado con Node cargando los 3 `grammar-data-{nivel}.js` +
  los 3 `clases-{nivel}.js` en el orden real del `<script>`: 30 días por nivel, 0
  referencias de `ruleId` rotas. Detalle completo en `teacher/plan.md` tarea 5.

- [x] **Sesión 4 (2026-07-29) — B2.1-B2.4 (P-plan-1, orden 2 de la tabla).** Al arrancar
  la sesión (regla obligatoria: revisar compatibilidad/estado real antes de generar) se
  encontró que `plan.js` **ya tenía el array `b2` completo** desde el commit `0b0b425`
  (2026-07-26) — este documento no se había actualizado tras ese commit y seguía
  describiendo B2 como pendiente, además con un diseño basado en 10 reglas cuando
  `GRAMMAR_DATA.B2` tiene 17. En vez de regenerar (que hubiera arriesgado pisar contenido
  ya bueno), se dividió el trabajo en 2 subagentes de revisión independiente (días 1-14 y
  15-30) más una validación técnica propia por Node (ids de regla, categorías de
  vocabulario, tipos de escritura, Teile de mündliche, cobertura de las 17 reglas — 0
  problemas). Los subagentes encontraron solo detalles menores de etiquetado (labels de
  "Repaso:" faltantes en días 8-13, etiquetas de simulacro inconsistentes en días 29-30),
  corregidos directamente. Detalle completo y hallazgos no corregidos (deuda menor) en la
  sección "B2 — completado" de arriba. Desbloquea `teacher/clases-b2.js` (tarea 4 de
  `teacher/plan.md`).

- [x] **Sesión 5 (2026-07-31) — `teacher/clases-b2.js` (tarea 4 de `teacher/plan.md`).**
  A raíz de una re-auditoría del plan B2 pedida por el usuario (gramática/oral/lesen, ver
  sección "B2 — completado" arriba) se ejecutó directamente la opción 3 de las candidatas
  de abajo. Generado con un subagente (para no cargar esta sesión con la escritura de
  contenido pedagógico de 17 reglas) y verificado de forma independiente con Node antes de
  darlo por bueno: 30 días secuenciales, `ruleIds`/`contenido.reglas[]` 1:1 en orden, 0 ids
  inválidos, `ruleIds` de cada día coinciden exactamente con las tasks reales de `PLANS.b2`,
  y los 4 `clases-{nivel}.js` cargados juntos no se pisan entre sí. Enlazado en
  `teacher/index.html` (`<script src="clases-b2.js">` + `LEVELS.b2.available = true`).
  Detalle completo en `teacher/plan.md` tarea 4. Desbloquea: solo quedan C1/C2 pendientes
  en `teacher/index.html` (opción 4 de abajo, sigue sin ejecutar).

**Pendiente — opciones restantes (no excluyentes, a decidir al arrancar la próxima sesión):**
1. **Tareas 1+2 de `teacher/plan.md`** (edición desde la UI + persistencia en Supabase)
   — mejora de comodidad sobre lo ya existente, acopladas entre sí.
2. **Tarea 3 de `teacher/plan.md`** (mapeo dinámico por fecha real de inicio del alumno).
3. ~~`teacher/clases-b2.js`~~ — completado, ver Sesión 5 arriba.
4. **Re-diagnosticar C1** en este archivo (su sección "C1 — pendiente" asume 10 reglas,
   la realidad son 17 — mismo error que tenía B2) y, antes de diseñar nada, **comprobar
   si `plan.js` ya tiene contenido en `c1` que el documento no refleje**, repitiendo el
   primer paso de la Sesión 4.

Recomendación por defecto: opción 4, es la más urgente de verificar antes de que alguien
intente ejecutar una sesión "C1.x" sobre un diagnóstico que puede estar tan desactualizado
como lo estaba el de B2.

---

## Escalabilidad y deuda técnica (auditoría 2026-07-13)

> Nota: `plan-mejoras.md` ya trackea deuda técnica de nivel código (duplicación, accesibilidad, paginación admin, timeouts OpenAI). Esta sección cubre lo que ese archivo no cubre: **límites de infraestructura** (Vercel Hobby, base de datos en Supabase) y **drift de documentación** encontrados al revisar el proyecto completo, incluyendo consulta directa a los Advisors de Supabase (performance + security) sobre el proyecto real.

### 🔴🔴 URGENTE — hallazgo no relacionado, detectado durante la validación de B1 (2026-07-31)

**`https://ejercicios-aleman.vercel.app` (la URL documentada en todo este repo como producción) ya no apunta a este proyecto.** Al probar la validación manual de B1 se comprobó que ese dominio sirve otra aplicación (Next.js, nav "Tablas / Ejercicios", nada que ver con este repo). `vercel ls`/`vercel domains ls` confirman que el proyecto Vercel real (`edurbaezde-3758s-projects/ejercicios-aleman`) **no tiene ningún dominio propio asignado** — solo existen las URLs autogeneradas por deployment (`ejercicios-aleman-<hash>-edurbaezde-3758s-projects.vercel.app`), y esas están detrás de la protección SSO de Vercel (redirigen a `vercel.com/sso-api`, no accesibles públicamente sin sesión de Vercel).

**Efecto práctico: si esto es así también para tus alumnos, la app no es accesible públicamente ahora mismo** — ni por el dominio corto documentado (que es de otro proyecto) ni por las URLs de deployment (bloqueadas por SSO). No se investigó más a fondo por estar fuera del alcance de esta sesión (P6 + validación B1), pero es el hallazgo más urgente de esta sesión — revisar el panel de Vercel (Settings → Domains del proyecto `ejercicios-aleman`) cuanto antes.

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
