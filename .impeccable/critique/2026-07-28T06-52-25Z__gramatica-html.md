---
target: gramatica.html
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-07-28T06-52-25Z
slug: gramatica-html
---
Method: dual-agent (A: ae27595b854366af7 · B: a5b8645b5661c7ce5)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Anillos de progreso, toasts, barra de examen ricos; "Generando práctica…" sin retry/timeout a diferencia del modo examen |
| 2 | Match System / Real World | 4 | Terminología CEFR, tablas estilo libro de texto, glosas en español |
| 3 | User Control and Freedom | 3 | Sin cancelar a mitad de quiz (solo tras terminar); salida de examen vía diálogo nativo |
| 4 | Consistency and Standards | 2 | `examConfirmExit()` usa `confirm()` nativo mientras el resto de flujos usa overlays con estilo propio |
| 5 | Error Prevention | 3 | Botones se deshabilitan tras responder, "Comprobar" bloqueado hasta completar el orden |
| 6 | Recognition Rather Than Recall | 4 | Puntos de lectura, favoritos, anillos de progreso, resume de última posición |
| 7 | Flexibility and Efficiency | 4 | Navegación por teclado, SRS repaso, examen mixto, flashcards, copiar enlace |
| 8 | Aesthetic and Minimalist Design | 2 | Barra de nivel mezcla 10 botones del mismo estilo (A1–C2 + Favs + Examen + Mixto + Flashcards + Historial) |
| 9 | Error Recovery | 3 | Errores de examen diferencian no_auth/rate_limit/genérico con reintento por pregunta |
| 10 | Help and Documentation | 1 | Única "documentación" es un hint de teclado a opacidad 0.4 que desaparece al buscar; ratings SRS nunca se explican |
| **Total** | | **29/40** | **Good** |

## Design Specificity Verdict

**LLM assessment**: Diseñado a medida para este producto: anillos de progreso SVG por nivel ligados a un mapa de lectura, botones de calificación SM-2 tras cada regla, enlace cruzado a `kasus.html?caso=Akkusativ`, y un motor de quiz con cuatro tipos de ejercicio distintos más un modo examen cronometrado con mezcla de niveles. No es un wrapper de contenido genérico tipo acordeón/FAQ.

**Deterministic scan**: `detect.mjs` no reportó hallazgos (exit code 0, `[]`) sobre `gramatica.html`; nota que el escáner solo analizó ese archivo, no `gramatica.js` ni `styles.css`, así que problemas confinados a esos archivos no aparecerían aquí. La revisión manual del código sí encontró gaps de accesibilidad no cubiertos por el detector automático (ver Persona Red Flags).

**Visual overlays**: no disponibles — no hay herramienta de automatización de navegador en esta sesión.

## Overall Impression

El motor pedagógico (repetición espaciada, quiz variado, examen mixto) tiene una profundidad notable y coherente. El problema no es la lógica sino la barra de herramientas: 10 botones del mismo peso visual compiten con el contenido desde el primer segundo, y el patrón de accesibilidad de teclado/lectores de pantalla se queda atrás del resto del producto.

## What's Working

- **Anillos de progreso por nivel** (`levelProgressRing`): fusionan orientación con gamificación sobre un corpus de 117 reglas.
- **Caché de sets de práctica** (`grammar_practice_exercises`/`user_grammar_practice_seen`): la mayoría de clics en "Practicar" responden al instante y nunca repiten un set ya visto por el mismo usuario, sin coste extra de UI.
- **Profundidad del loop de dominio**: regla → quiz de tipo variado → calificación SRS → insignia de vencidas → modo examen → examen mixto — una escalera pedagógica coherente, no funciones pegadas encima.

## Priority Issues

**[P1] Sobrecarga de la barra de herramientas**
- **Why it matters**: `renderLevelTabs()` renderiza 10 botones de estilo idéntico; `#gram-toolbar` añade 3 más más una insignia de puntaje diario y un hint de teclado, todo antes de mostrar contenido — entierra la tarea primaria (elegir nivel) entre herramientas secundarias.
- **Fix**: separar en un control segmentado de nivel + un menú "Practicar ▾" (Examen/Mixto/Flashcards/Historial).
- **Suggested command**: `/impeccable distill`

**[P1] `confirm()` nativo rompe la consistencia visual**
- **Why it matters**: `examConfirmExit()` es el único punto de salida/cierre que usa el diálogo nativo del navegador mientras todo lo demás usa overlays con estilo propio — choque justo en un momento de duda del alumno.
- **Fix**: reemplazar por un panel de confirmación in-overlay usando `.exam-action-btn`.
- **Suggested command**: `/impeccable harden`

**[P2] Sin salida a mitad de quiz**
- **Why it matters**: `gram-quiz-wrap` solo se reinicia vía `resetQuiz` después de terminar — un alumno que se arrepiente queda atrapado hasta el final.
- **Fix**: añadir una "✕" a `gram-quiz-progress`.
- **Suggested command**: `/impeccable clarify`

**[P2] Calificaciones SRS sin explicar**
- **Why it matters**: los botones "¿Cuánto lo dominas?" programan repetición espaciada sin ninguna explicación de qué significa cada opción.
- **Fix**: tooltip/popover informativo la primera vez que aparecen.
- **Suggested command**: `/impeccable onboard`

**[P3] Atajos de teclado invisibles**
- **Why it matters**: `#gram-kbd-hint` vive a opacidad 0.4 y se oculta durante la búsqueda — los power users nunca los descubren.
- **Fix**: panel de atajos descartable y descubrible.
- **Suggested command**: `/impeccable document`

## Persona Red Flags

**Jordan (primera vez)**: se enfrenta a 10 botones icono/texto (🎲/📝/🃏/📊) sin distinción visual entre "filtrar por nivel" y "iniciar una actividad"; el modo oscuro está activo por defecto en la primera visita, lo que puede leerse como un fallo visual.

**Sam (accesibilidad/teclado)**: `.gram-rule-header` son botones sin `aria-expanded`/`aria-controls`; la navegación por flechas hace `scrollIntoView` pero nunca `.focus()` la tarjeta abierta, así que el foco de teclado y la selección visual divergen. Confirmado también por el escaneo objetivo: cero `tabindex`/`role="` en todo el archivo, el buscador (`#gram-search`) y el input de examen (`#exam-input`) no tienen `<label>` ni `aria-label` (solo `placeholder`), y `.fc-scene` (flip de flashcard) es un `<div onclick>` sin `role`/`tabindex`/manejador de teclado — la única superficie interactiva del archivo que no es operable por teclado.

**Riley (stress tester)**: el pool de distractores de `buildQOpcion` toma ejemplos de otras reglas del mismo nivel — un nivel con pocas reglas/ejemplos (C2 solo tiene 10) arriesga tener menos de 3 distractores, produciendo opciones degeneradas silenciosamente.

## Minor Observations

- `esc()` solo escapa comillas mientras `safeAttr()` escapa completo — nombres/comportamiento inconsistentes para dos helpers de propósito similar.
- El texto de los anillos de progreso SVG es de 7px — al límite de la legibilidad en móvil.
- `gram-container` con max-width 680px mantiene el texto legible — buena decisión.

## Questions to Consider

- ¿Debería la búsqueda ser la vista de aterrizaje por defecto en vez de A1, dado que la mayoría de visitas son "buscar una regla" y no "explorar un nivel"?
- ¿Colapsar Examen/Mixto/Flashcards/Historial en un único menú "Practicar ▾" convertiría el muro de 10 botones en algo escaneable de un vistazo?
- Ya que el SRS rastrea el dominio por regla, ¿podría la app abrir en un dashboard de "reglas pendientes de repaso" en vez del nivel A1 — pasando de explorar a cerrar huecos?
