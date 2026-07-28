---
target: mundliche.html
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 1
timestamp: 2026-07-28T06-52-25Z
slug: mundliche-html
---
Method: dual-agent (A: a08b6dbe612038f2e · B: a3fde117befb69535)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Solo texto tipo spinner para transcripción/evaluación; sin medidor de nivel de micrófono durante la grabación |
| 2 | Match System / Real World | 4 | Nombres de Teile fieles, Bestanden/Nicht bestanden, Redemittel, tiempos de Vorbereitung reales |
| 3 | User Control and Freedom | 1 | Sin cancelar/descartar/regrabar una vez iniciada la grabación (solo timeout automático o Enviar) |
| 4 | Consistency and Standards | 3 | Comparte convenciones `mp-` de pills/tarjetas/badges con apps hermanas |
| 5 | Error Prevention | 2 | Sin confirmación antes de "Simulacro completo" (cadena irreversible de varios Teile) |
| 6 | Recognition Rather Than Recall | 3 | Tarea/puntos/Redemittel visibles durante la grabación; Notizen en modo examen |
| 7 | Flexibility and Efficiency | 3 | Deep-links, prefetch, modo examen, simulacro para power users |
| 8 | Aesthetic and Minimalist Design | 2 | Pantalla de evaluación apila 8+ secciones (score, veredicto, checklist, 4 subscores, duración, fluidez, interacción, errores, redemittel, musterlösung) |
| 9 | Error Recovery | 2 | "Error: no se pudo acceder al micrófono" sin ninguna vía de solución |
| 10 | Help and Documentation | 2 | Disclaimer y nota de pronunciación son buena ayuda embebida; sin onboarding para Simulacro/Modo examen |
| **Total** | | **24/40** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment**: El *contenido* está inequívocamente diseñado para este caso de uso exacto — `LEVEL_SPECS` refleja la estructura real de Teile del Goethe/telc por nivel, los ejercicios extra se etiquetan explícitamente "no forma parte del examen real", los bancos `REDEMITTEL` y el disclaimer sobre limitaciones de Whisper muestran conocimiento de dominio genuino. Pero el *diseño de interacción en el momento de estrés* — grabar, esperar, recibir un veredicto — es plomería de app de voz genérica: botón de grabar, barra que cambia de color, spinner, luego un círculo grande de color. El rigor específico del examen vive en los prompts y los datos, todavía no en cómo se gestiona la ansiedad en pantalla.

**Deterministic scan**: `detect.mjs` no reportó hallazgos (exit code 0, `[]`) sobre `mundliche.html`. Sin falsos positivos que reconciliar. La revisión manual sí encontró gaps que el detector automático no cubre (ver más abajo).

**Visual overlays**: no disponibles — no hay herramienta de automatización de navegador en esta sesión.

## Overall Impression

El contenido pedagógico y las guardas de confianza en la IA (disclaimers, anti-inyección) son de alto nivel. Pero el momento de mayor carga emocional del producto —grabar una respuesta oral y recibir un "Nicht bestanden"— está gestionado con la plomería genérica de cualquier app de voz, sin cojines de reconfort. Esa es la mayor oportunidad de mejora.

## What's Working

- **Redemittel + checklist fonológico** (sin coste de API): dan andamiaje concreto y accionable justo donde la confianza suele ser más baja — un diseño de contenido muy bien dirigido.
- **Encadenamiento Vortrag→Diskussion** (`findVortragPrevio`): hace que el Simulacro se sienta como un examen coherente en vez de ejercicios sueltos.
- **Guardas anti-inyección + disclosure explícito de las limitaciones del STT**: construyen confianza en un dominio donde la confianza en la corrección por IA importa mucho.

## Priority Issues

**[P0] Sin salida a mitad de grabación**
- **Why it matters**: una vez que arranca `startMonologoRecording`/`startDialogoRecording`, las únicas salidas son el corte duro por `duracion_seg` o "Enviar" — no hay "descartar y repetir". Un tropiezo en la primera frase obliga a completar toda la respuesta.
- **Fix**: añadir un botón de descartar durante la grabación.
- **Suggested command**: `/impeccable harden`

**[P1] El veredicto se revela primero, sin ningún marco previo**
- **Why it matters**: `renderEvaluacion` abre con el score y el veredicto antes de cualquier texto de contextualización — el peor golpe emocional posible llega primero y sin moderar.
- **Fix**: anteponer un mensaje neutro ("aquí tienes tu feedback") y animar la entrada del score en vez de mostrarlo de golpe.
- **Suggested command**: `/impeccable animate`

**[P2] Sin confirmación en vivo del micrófono**
- **Why it matters**: los usuarios solo descubren que el micrófono falló mediante "No se detectó voz" después de haber perdido toda la ventana de grabación.
- **Fix**: un indicador simple de nivel con `AnalyserNode`.
- **Suggested command**: `/impeccable polish`

**[P2] Errores de permisos genéricos**
- **Why it matters**: "Error: no se pudo acceder al micrófono" no da ninguna guía de recuperación.
- **Fix**: detectar `NotAllowedError` y enlazar pasos concretos de configuración del navegador.
- **Suggested command**: `/impeccable clarify`

**[P3] Redemittel forzado abierto por defecto**
- **Why it matters**: satura la pantalla de tarea antes incluso de empezar la preparación.
- **Fix**: colapsado por defecto.
- **Suggested command**: `/impeccable quieter`

## Persona Red Flags

**Jordan (primera vez)**: la explicación de "🎓 Simulacro completo" vive solo en un atributo `title` — invisible en dispositivos táctiles, así que un usuario móvil entra a una cadena irreversible de varios Teile a ciegas.

**Riley (stress tester)**: cambiar de nivel a mitad de un Simulacro pone `sesion.activa = false` silenciosamente, sin aviso — el usuario puede creer que el examen sigue en curso.

**Sam (accesibilidad)**: `setHint()` actualiza `#mp-hint` sin `aria-live`, así que "Grabando…"/"Transcribiendo…"/errores son silenciosos para lectores de pantalla en un flujo ya de por sí manual-intensivo. Confirmado por el escaneo objetivo: solo 2 `aria-label` en todo el archivo (los dos botones de navbar), cero `role` y cero `tabindex` en el archivo entero; el textarea de Notizen no tiene `<label>` ni `aria-label`, solo `placeholder`.

## Minor Observations

- Los umbrales de `.mp-score` (≥75 bien/≥50 medio/si no bajo) no coinciden con el corte de `veredicto` de la IA (~60), así que una insignia "Bestanden" puede aparecer junto a un círculo amarillo de score "medio" — señal mixta.
- `mp-daily-info` formatea el tiempo como `12.34/60.00` (punto, no dos puntos) — se lee como decimal en vez de minutos:segundos.

## Questions to Consider

- ¿Qué pasaría si la app separara *captura* de *juicio* — un "gracias, ya escuchamos tu respuesta" antes de que aparezca cualquier número?
- Los examinadores reales no muestran una cuenta regresiva que se pone roja a mitad de la respuesta — ¿por qué esta interfaz importa señales de ansiedad de examen que el examen real no tiene?
- ¿Podría "nicht bestanden" convertirse en lenguaje de crecimiento ("aún no aprobado, esto es lo que hay que trabajar") sin perder el realismo que es la propuesta de valor central del producto?
