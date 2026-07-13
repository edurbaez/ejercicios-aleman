 
## Reglas obligatorias (no negociables)

1. **Revisar compatibilidad antes de tocar código.** Antes de modificar cualquier archivo, identificar qué otros archivos lo importan, qué funciones expone, y qué estructura de datos espera. Documentar el análisis brevemente aquí antes de proceder.
2. **Actualizar este plan al terminar cada tarea.** Marcar con `[x]` y anotar cambios relevantes al diseño si los hubo.
3. **Actualizar `CLAUDE.md`** cuando se agregue un archivo activo al proyecto.

## Mejora del plan de 30 días por nivel (`plan.js`)

Objetivo: que cada día del plan de 30 días (por nivel A1–C2) referencie únicamente estructuras reales de la app — reglas gramaticales que existen en `GRAMMAR_DATA` (`grammar-data.js`), categorías de vocabulario que existen en `Data{NIVEL}.json` (los sets que arma `shared-game.js` a partir de `Object.keys(DATA)`), y funciones reales de las apps (p. ej. Modo Repetir de `chat-voz.html`, Teile de `mundliche.html`, evaluación estructurada de `escritura.html`) — e incorporar los servicios nuevos que faltaban (`escritura.html`, `mundliche.html`).

Compatibilidad revisada: `plan.js` solo define `window.PLANS`, consumido por `plan.html` para renderizar el calendario y los enlaces de tareas (`{ app, label, minutes }`). No hay otros archivos que dependan de la estructura interna de cada día, así que los cambios son seguros mientras cada `task.app` siga siendo un archivo HTML válido del proyecto.

### A1 — en progreso
- [x] Semana 4 (días 22-30): incorporados `escritura.html` (día 24, reemplaza a `corrector.html` para la tarea de escritura estructurada con Leitpunkte y puntuación) y `mundliche.html` (día 27, simulacro oral estructurado; día 30, junto con `escritura.html`, convierte la "evaluación final" en un simulacro real de examen con puntuación 0-100 en ambas destrezas, reemplazando `chat-voz.html` + `corrector.html`).
- [x] Semana 1 (días 1-7): corregidos temas de gramática inventados que no existen en `GRAMMAR_DATA.A1` (p. ej. "saludos y despedidas", "Woher kommst du?") por los 10 reales (`a1-01` a `a1-10`, cubiertos `a1-01`–`a1-06` en esta semana); corregidas categorías de vocabulario inventadas ("profesiones", "países y lenguas", "objetos cotidianos"...) por las reales de `DataA1.json` (`esenciales`, `verbos`, `sustantivos`, `adjetivos`, `expresiones`); añadido `kasus.html` (Akkusativ) en el día 6, coherente con "Acusativo básico"; incorporado `chat-voz.html` en los 7 días usando su Modo Repetir real (`repetirBtn`/`toggleRepetirMode()` — escuchar y repetir frase con puntaje de coincidencia) en vez de "conversación libre" genérica.
- [x] Semana 2 (días 8-14): corregidos temas de gramática/vocabulario inventados ("números cardinales", "la hora", "adjetivos atributivos", "fechas y calendarios", "mögen y möchten"; vocab "números", "colores", "días y meses", "familia", "comida y bebida") por las 4 reglas reales restantes de `GRAMMAR_DATA.A1` (`a1-07` W-Fragen, `a1-08` Orden de palabras, `a1-09` Plurales, `a1-10` Artículo indefinido y su negación) y las categorías reales de `DataA1.json`. Incorporado `chat-reformulaciones.html` (bank `reformulaciones-data.json` cubre los 10 ids `a1-01`…`a1-10`, cero costo de API) para práctica dirigida e integrada de estas reglas en los días 9, 11, 12 y 13. Mantenido Modo Repetir de `chat-voz.html` en los días con práctica oral.
- [x] Semana 3 (días 15-21): como las 10 reglas de `GRAMMAR_DATA.A1` ya quedaron cubiertas en semanas 1-2, esta semana pasa de "gramática nueva inventada" (p. ej. "adjetivos atributivos", "precios y cantidades", vocab temático "la casa"/"ropa y tiendas") a **consolidación real**: `chat-reformulaciones.html` combinando pares de reglas ya vistas (días 15, 16, 18, 19 — el banco `reformulaciones-data.json` cubre los 10 ids), `kasus.html` con práctica combinada Nominativ/Akkusativ (día 17), primera práctica de escritura libre con `corrector.html` (día 20, previo al simulacro de `escritura.html` en semana 4), y Modo Repetir de `chat-voz.html` donde corresponde.

### A2 — completado
- [x] Semana 1 (días 1-7): reemplazados labels inventados de Nominativ/Akkusativ (temas de A1) por las 2 reglas reales de casos de `GRAMMAR_DATA.A2` (`a2-03` Dativ, `a2-06` Wechselpräpositionen) entrenadas con `kasus.html`; categorías de vocabulario alineadas a las 5 reales de `DataA2.json`. Repaso A1 intercalado (`gramatica.html`, 10 min) en días 2, 4, 6, 7 (`a1-01`–`a1-04`).
- [x] Semana 2 (días 8-14): corregidos labels inventados de "verbos con cambio vocálico" por las 4 reglas reales que faltaban parcial o totalmente (`a2-01` modales, `a2-02` Perfekt, `a2-07` separables — antes ausente, `a2-08` imperativo — antes ausente). `chat-reformulaciones.html` con los bancos correspondientes. Repaso A1 en días 9, 11, 13, 14 (`a1-05`–`a1-08`).
- [x] Semana 3 (días 15-21): cubiertas las 4 reglas reales restantes de A2 (`a2-04` prep.+Akk., `a2-05` prep.+Dat., `a2-09` comparativo/superlativo — antes ausente, `a2-10` reflexivos — antes ausente), completando las 10 reglas de `GRAMMAR_DATA.A2` en el mes. Primera práctica de escritura libre con `corrector.html` (día 20, mismo patrón que A1). Repaso A1 en días 16, 18 (`a1-09`, `a1-10`) — cierra el ciclo de las 10 reglas de A1 dentro del plan A2.
- [x] Semana 4 (días 22-30): incorporados `escritura.html` (día 23, reemplaza `corrector.html`) y `mundliche.html` (día 27; día 30 evaluación final combinando `mundliche.html` + `escritura.html`, reemplazando `chat-voz.html` + `corrector.html`) — mismo patrón que A1.

Diagnóstico previo (referencia histórica, ya aplicado arriba):

**Reglas reales disponibles — `GRAMMAR_DATA.A2`** (`grammar-data.js`, 10 ids `a2-01`…`a2-10`, todas con banco en `reformulaciones-data.json` para `chat-reformulaciones.html`):
1. `a2-01` Verbos modales (können, müssen, wollen, sollen, dürfen, mögen)
2. `a2-02` Pretérito perfecto (Perfekt)
3. `a2-03` Dativo
4. `a2-04` Preposiciones + Acusativo (durch, für, gegen, ohne, um)
5. `a2-05` Preposiciones + Dativo (aus, bei, mit, nach, seit, von, zu, gegenüber)
6. `a2-06` Wechselpräpositionen (Akk. ¿adónde? vs. Dat. ¿dónde?)
7. `a2-07` Verbos separables
8. `a2-08` Imperativo
9. `a2-09` Comparativo y superlativo
10. `a2-10` Verbos reflexivos

**Categorías reales de vocabulario — `DataA2.json`** (leídas por `shared-game.js` vía `Object.keys(DATA)`): solo `esenciales`, `verbos`, `sustantivos`, `adjetivos`, `expresiones` — igual que A1. No existen categorías temáticas ("ocio y pasatiempos", "cuerpo y salud", "viajes y vacaciones", "trabajo y empresa", etc.).

**Problemas encontrados en el plan A2 actual (`plan.js`, días 1-30):**
- Días 1, 2, 4, 5, 8, 9, 17: labels de `gramatica.html` inventados que no corresponden a ninguna regla real ("el Nominativ", "el Akkusativ", "haben, sehen, kaufen…", "mich, dich, ihn…", "geben, nehmen, sprechen", "fahren, schlafen, laufen", "preposiciones de tiempo"). El Nominativ/Akkusativ ya son temas de A1, no de `GRAMMAR_DATA.A2`.
- **`a2-07` (Verbos separables), `a2-08` (Imperativo), `a2-09` (Comparativo y superlativo) y `a2-10` (Verbos reflexivos) no aparecen en ningún día del plan A2** — 4 de las 10 reglas reales de A2 están completamente ausentes.
- Todos los labels de `A2.html` usan categorías temáticas inventadas en vez de las 5 reales (`esenciales`, `verbos`, `sustantivos`, `adjetivos`, `expresiones`) — prácticamente en los 30 días.
- `escritura.html` y `mundliche.html` **no se usan en ningún día** del plan A2 (mismo hueco que tenía A1 antes de la corrección) — día 23 usa `corrector.html` para "escritura", día 30 usa `chat-voz.html` + `corrector.html` para la evaluación final.
- `kasus.html` sí tiene modo Wechselpräpositionen real (coincide con `a2-06`) — actualmente usado con label genérico "Entrenador: preposiciones mixtas" (día 16), se puede alinear mejor con el nombre de la regla.
- `chat-reformulaciones.html` con el banco de `a2-01`…`a2-10` no se usa nunca en el plan A2 actual (sí se usa una vez con label genérico "Reformulación A2: tiempos verbales", día 26, sin ligarlo a una regla concreta) — mismo patrón de oportunidad que se aprovechó en A1 semana 3.

**Propuesta de adaptación para la próxima sesión** (seguir el mismo patrón que A1):
1. Semana 1 (días 1-7): cubrir con `gramatica.html` + `kasus.html` reglas reales que ya empiezan bien encaminadas (Dativ `a2-03`, Wechselpräpositionen `a2-06`) — reemplazar labels de Nominativ/Akkusativ (temas A1) por contenido A2 genuino; usar categorías reales de `A2.html`.
2. Semana 2 (días 8-14): reglas `a2-01` (modales), `a2-02` (Perfekt), más `a2-07` (verbos separables) y `a2-08` (Imperativo) que hoy no aparecen en ningún lado.
3. Semana 3 (días 15-21): terminar de cubrir `a2-04`, `a2-05`, `a2-09` (comparativo/superlativo) y `a2-10` (reflexivos) — hoy ausentes — más `chat-reformulaciones.html` para consolidar.
4. Semana 4 (días 22-30): incorporar `escritura.html` (reemplazar `corrector.html` en el día de "escritura", p. ej. día 23) y `mundliche.html` (simulacro oral estructurado, y combinarlo con `escritura.html` en el día de evaluación final, día 30 — mismo patrón que A1).
5. Revisar que ningún día quede con vocabulario o gramática inventados que no correspondan a `DataA2.json` / `GRAMMAR_DATA.A2`.

### B1 — completado
- [x] Reescrito el array `b1` completo (30 días) en `plan.js` siguiendo la rotación de las 31 reglas de `GRAMMAR_DATA.B1` y las rotaciones de vocabulario/escritura/mündliche definidas abajo. Corrección al diagnóstico original: las categorías reales de `DataB1.json` son `esenciales, verbos, sustantivos, adjetivos, expresiones` (mismo esquema que A1/A2/B2), no `verbos1, verbos2, adjetivos, adverbios, particulas_modales` como se había anotado — se usó el esquema real. Semana 1 (días 1-7): primera pasada de las 21 primeras reglas (`b1-01`…`b1-21`) con `gramatica.html`. Semana 2 (días 8-14): termina la primera pasada (`b1-22`…`b1-31`) y arranca el repaso, incluyendo `kasus.html` para Genitiv/declinación de adjetivos (día 12). Semana 3 (días 15-21): consolidación con `chat-reformulaciones.html` para las reglas con banco (`b1-01`…`b1-10`) y `kasus.html` para Genitiv/adjetivos. Semana 4 (días 22-28): repaso cruzado de las reglas restantes; días 29-30: simulacro final repartido en dos días — día 29 escritura evaluada completa (tipo foro) + repaso ligero, día 30 mündliche evaluada con los 3 Teile del día en una sola sesión.

### B1 — histórico (diagnóstico previo a la reescritura, ya aplicado arriba)

Mismo formato diario que B2 (ver abajo): **2-3 reglas gramaticales/día** (5 min c/u), **repaso de vocabulario máx. 5 min/día**, **escritura diaria** (`escritura.html`) y **mündliche diaria** (`mundliche.html`).

**Recursos reales disponibles (verificados en código):**
- `GRAMMAR_DATA.B1` (`grammar-data.js`) tiene **31 reglas** (`b1-01`…`b1-31`), muchas más que A1/A2/B2 (10 c/u): `b1-01` Präteritum, `b1-02` Konjunktiv II, `b1-03` Oraciones de relativo, `b1-04` Genitivo, `b1-05` Declinación de adjetivos, `b1-06` Conectores subordinantes, `b1-07` Verbos con preposición fija, `b1-08` Infinitivo con zu, `b1-09` Pasiva básica, `b1-10` Futuro, `b1-11` Plusquamperfekt, `b1-12` Wenn vs. als (ampliado), `b1-13` Preguntas indirectas, `b1-14` Infinitivo sin zu, `b1-15` Relativsätze mit Präposition, `b1-16` je…desto, `b1-17` n-Deklination, `b1-18` Adjektive als Nomen, `b1-19` da-/wo-Präpositionaladverbien, `b1-20` Präpositionen mit Genitiv, `b1-21` Preposiciones temporales, `b1-22` Funciones de werden, `b1-23` Verbos separables/inseparables, `b1-24` Reflexivpronomen (ampliado), `b1-25` Negationswörter, `b1-26` Adverbios locales wo/wohin, `b1-27` Positions-/Direktionsverben, `b1-28` lassen (causativo), `b1-29` Finalsätze um…zu/damit (B1), `b1-30` Doppelkonnektoren (B1), `b1-31` Partizip I als Adjektiv (B1).
- **`reformulaciones-data.json` solo cubre `b1-01`…`b1-10`** (banco gratuito para `chat-reformulaciones.html`). Para `b1-11`…`b1-31` la app usa su fallback de generación IA completa (protocolo `---NUEVA---`), con coste de API — tenerlo en cuenta al planificar cuántas veces se repasan esas reglas.
- Categorías reales de vocabulario — `DataB1.json` (vía `B1.html`): `verbos1`, `verbos2`, `adjetivos`, `adverbios`, `particulas_modales` (distintas de las de A1/A2/B2).
- `escritura.html` nivel B1 (`LEVEL_SPECS.B1`, 70-100 palabras): 3 tipos reales — `email-informal` (e-mail a un amigo), `foro` (opinión en foro), `email-formal` (semi-formal: disculpa, información, cancelación).
- `mundliche.html` nivel B1 (`LEVEL_SPECS.B1.teile`): 3 Teile reales — `vorstellung` (Teil 1, monólogo 50s), `praesentation` (Teil 2, "presentar un tema", monólogo 120s), `gemeinsam-planen` (Teil 3, diálogo 45s×6 turnos).
- `kasus.html` **sí aplica a B1** (a diferencia de B2): modo Genitiv cubre `b1-04`; modo "Rellenar: declinación de adjetivo" cubre `b1-05`; modo Wechselpräpositionen sirve de refuerzo para `b1-26`/`b1-27` (wo/wohin en adverbios y verbos de posición).

**Plantilla diaria:**
```
tasks: [
  { app: "gramatica.html" | "chat-reformulaciones.html" | "kasus.html", label: "Gramática: <título regla>", minutes: 5 },  // × 2-3
  { app: "B1.html", label: "Vocabulario: <categoría del día>", minutes: 5 },
  { app: "escritura.html", label: "Escritura: <tipo del día>", minutes: 15 },
  { app: "mundliche.html", label: "Mündliche: <Teil del día>", minutes: 10 }
]
```

**Rotación de vocabulario/escritura/mündliche (ciclos fijos):**
- Vocabulario: `verbos1→verbos2→adjetivos→adverbios→particulas_modales→repite` cada 5 días.
- Escritura: `email-informal→foro→email-formal→repite` cada 3 días.
- Mündliche: `vorstellung→praesentation→gemeinsam-planen→repite` cada 3 días.

**Rotación de gramática (31 reglas en 30 días — primera pasada + consolidación):**
- **Semana 1 (días 1-7) — primera pasada, `gramatica.html`, 3/día:** día1 `b1-01,02,03`; día2 `b1-04,05,06`; día3 `b1-07,08,09`; día4 `b1-10,11,12`; día5 `b1-13,14,15`; día6 `b1-16,17,18`; día7 `b1-19,20,21` (21 reglas cubiertas).
- **Semana 2 (días 8-14) — termina primera pasada + repaso:** día8 `b1-22,23,24`; día9 `b1-25,26,27`; día10 `b1-28,29,30`; día11 `b1-31` + repaso `b1-01,02` (las 31 quedan cubiertas); día12 repaso `b1-03,04,05` (con `kasus.html` para 04/05); día13 repaso `b1-06,07,08`; día14 repaso `b1-09,10`.
- **Semana 3 (días 15-21) — consolidación temática, priorizando `chat-reformulaciones.html` donde hay banco (`b1-01`…`b1-10`) y `kasus.html` para declinación:** día15 `b1-01+02` (reformulaciones); día16 `b1-03+07` (relativas + verbos con preposición); día17 `kasus.html` Genitiv (`b1-04`) + repaso `b1-17` (n-Deklination, misma familia); día18 `kasus.html` adjetivos (`b1-05`) + repaso `b1-18` (Adjektive als Nomen); día19 `b1-08+14` (infinitivo con/sin zu, contraste directo); día20 `b1-09+22` (pasiva + funciones de werden); día21 `b1-06+12` (conectores subordinantes + wenn/als ampliado).
- **Semana 4 (días 22-30) — repaso cruzado final + simulacro:** día22 `b1-19+20` (da-/wo- + prep. genitivo); día23 `b1-21+27` (prep. temporales + verbos posición/dirección); día24 `b1-23+24` (separables/inseparables + reflexivos ampliado); día25 `b1-25+28` (negación temporal + lassen); día26 `b1-29+30` (finalidad B1 + conectores dobles); día27 `b1-11+31` (Plusquamperfekt + Partizip I) repaso general; día28 repaso libre de las 3 reglas más flojas (a definir en la sesión de ejecución según errores registrados, o `b1-13,16,20` por defecto); días 29-30: **simulacro final** — mantener escritura/mündliche del día pero con evaluación completa (`escritura.html` tipo `foro` + `mundliche.html` los 3 Teile con puntuación 0-100), sin gramática nueva (solo repaso ligero de 1-2 reglas).

**Siguiente paso de ejecución:** generar el array `b1: [...]` en `plan.js` (30 objetos `{ day, week, focus, tasks }`) siguiendo la plantilla y rotaciones de arriba, revisando primero el `b1` actual para detectar labels/temas inventados (mismo patrón de diagnóstico que se hizo con A1/A2 antes de reescribir). Ejecutar en una o más sesiones separadas (p. ej. semana por semana) para preservar contexto; marcar cada semana con `[x]` aquí al terminarla.

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

**Siguiente paso de ejecución:** generar el array `b2: [...]` en `plan.js` (30 objetos `{ day, week, focus, tasks }`) siguiendo la plantilla y rotaciones de arriba, reemplazando el `b2` actual (que usa labels inventados como "Vorgangspassiv básico", "conversación libre B2" sin regla real asociada, y no usa `escritura.html` ni `mundliche.html`). Hacerlo en una o más sesiones separadas (p. ej. semana por semana) para preservar contexto; marcar cada semana con `[x]` aquí al terminarla, siguiendo el mismo formato de bitácora usado en A1/A2.

### C1 — pendiente
### C2 — pendiente

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
