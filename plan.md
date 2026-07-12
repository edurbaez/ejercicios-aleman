 
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

### B1 — pendiente

## Ampliación de gramática B1 (`grammar-data.js`)

`grammar-data.js` tiene hoy 10 reglas B1 (`b1-01`…`b1-10`). Comparando contra el índice de un libro de referencia, faltan ~14 reglas B1 reales y hay 3 reglas que el libro clasifica como B1 pero que en la app viven en B2 (`b2-03` Partizip I, `b2-06` Doppelkonnektoren, `b2-09` Finalsätze). Decisión: no tocar lo que ya existe en B2 — se crean versiones nuevas y propias de B1, con explicaciones y ejemplos calibrados al nivel (más simples que sus contrapartes B2), como entradas adicionales en `grammar-data.js`. Es trabajo de redacción de contenido (no de ingeniería — `gramatica.js` renderiza cualquier regla que exista en `GRAMMAR_DATA` sin cambios de código), repartido en 5 sesiones para cuidar la calidad de cada explicación/ejemplo.

- [x] Sesión 1 — completada: Pasado y subordinadas (continuación de lo existente)
  - `b1-11` Plusquamperfekt (continúa de `b1-01` Präteritum)
  - `b1-12` Wenn vs. als (extensión explícita de `b1-06`)
  - `b1-13` Indirekte Fragen (ob / W-Wort + verbo final)
  - `b1-14` Infinitiv ohne zu (contraste directo con `b1-08`)

- [x] Sesión 2 — completada: Relativas, comparación y declinación nominal
  - `b1-15` Relativsätze mit Präposition (extensión de `b1-03`)
  - `b1-16` Vergleichssätze: je...desto
  - `b1-17` n-Deklination
  - `b1-18` Adjektive als Nomen (para personas y neutros — "der Jugendliche", "alles Gute")

- [x] Sesión 3 — completada: Preposiciones
  - `b1-19` Präpositionaladverbien (da-/wo-) — relacionado con `b1-07`
  - `b1-20` Präpositionen mit Genitiv (während, wegen, trotz, innerhalb, außerhalb)
  - `b1-21` Temporale Präpositionen 2 (repaso/ampliación)

- [x] Sesión 4 — completada: werden, verbos con partícula, reflexivos, negación
  - `b1-22` Funktionen von werden (verbo pleno / futuro / pasiva — unifica `b1-09` y `b1-10`)
  - `b1-23` Trennbare vs. untrennbare Verben (antes de `b1-07` en la secuencia de lectura)
  - `b1-24` Reflexivpronomen im Akkusativ und Dativ
  - `b1-25` Negationswörter: nicht mehr / noch nicht

- [x] Sesión 5 — completada: Adverbios/verbos de posición, lassen, y equivalentes B1 de temas hoy en B2
  - `b1-26` Lokale Adverbien: Position und Direktion
  - `b1-27` Positions-/Direktionsverben (stehen/stellen, sitzen/setzen, liegen/legen, hängen)
  - `b1-28` Das Verb lassen (causativo básico — distinto de `c1-01`)
  - `b1-29` Finalsätze B1 (um...zu / damit) — versión propia B1, `b2-09` se mantiene intacto
  - `b1-30` Doppelkonnektoren B1 (entweder...oder, weder...noch, sowohl...als auch) — versión propia B1, `b2-06` se mantiene intacto
  - `b1-31` Partizip I als Adjektiv B1 — versión propia B1, `b2-03` se mantiene intacto

Cada sesión se ejecuta y marca `[x]` de forma independiente; verificar antes de escribir cada regla que el id no colisione con uno ya usado en `grammar-data.js`.

### B2 — pendiente
### C1 — pendiente
### C2 — pendiente
