---
target: lectura veloz.html
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-07-28T06-52-24Z
slug: lectura-veloz-html
---
Method: dual-agent (A: a3aa9e399e3804149 · B: a6d68322e39718757)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Buen progreso/WPM/spinner "Generando…"; sin feedback al guardar un texto |
| 2 | Match System / Real World | 4 | Nombres de Teile idénticos al examen Goethe/telc real |
| 3 | User Control and Freedom | 2 | `switchActivity()` mata un RSVP/Sprint en curso sin confirmar |
| 4 | Consistency and Standards | 3 | Clases compartidas del sistema, pero estilos inline duplican fallbacks de variables CSS |
| 5 | Error Prevention | 3 | Dedupe al guardar, mínimo de palabras en Sprint, guardas en el selector de Teile |
| 6 | Recognition Rather Than Recall | 2 | ORP sin leyenda visible; `sprint-source` mezcla SRS + 6 niveles + listas personales en un `<select>` plano |
| 7 | Flexibility and Efficiency | 4 | Atajos de teclado, deep-link `?level=B1`, WPM persistido |
| 8 | Aesthetic and Minimalist Design | 2 | Panel Comprensión apila tabs + pills + selector de Teile + texto + nav — denso |
| 9 | Error Recovery | 2 | Errores de servidor se muestran crudos (status + payload cortado) |
| 10 | Help and Documentation | 1 | Solo un banner descartable una vez; sin ayuda contextual después |
| **Total** | | **26/40** | **Acceptable** |

## Design Specificity Verdict

**LLM assessment**: Auténticamente diseñado para este producto: ORP con pacing sensible a puntuación (`.!?` → 2x, `,;:` → 1.5x), selector de Teile antes del simulacro B1 completo, e integración con el ecosistema SRS/listas compartido. No es un lector RSVP genérico con un re-skin.

**Deterministic scan**: `detect.mjs` reportó 4 hallazgos (exit code 2), todos confirmados reales tras revisar el código: dos `side-tab` (bordes de acento tipo pestaña lateral en el banner de ayuda `#hint-lv` línea 35 y en la tarjeta de texto del Modo B línea 1598), un `layout-transition` (la barra de progreso del blog anima `width` en vez de `transform`, línea 56 — riesgo de jank bajo por ser una barra fina de 6px), y `flat-type-hierarchy` (10 tamaños de fuente agrupados entre 14–16px, ratio 1.1:1 — jerarquía tipográfica plana).

**Visual overlays**: no disponibles — no hay herramienta de automatización de navegador en esta sesión; sin overlay visible que mostrar.

## Overall Impression

Motor de lectura rápida con pedagogía real detrás (ORP, pacing por puntuación, simulacro de examen fiel), pero la capa de feedback tras un error y el manejo de fallos de red quedan por debajo del resto del producto. La mayor oportunidad: cerrar el círculo pedagógico en Comprensión (hoy solo colorea correcto/incorrecto, sin explicación).

## What's Working

- **ORP + pacing por puntuación** (`showNextWord`): dobla el delay tras `.!?`, 1.5x tras `,;:` — mecánica de speed-reading real, no un intervalo fijo ingenuo.
- **Selector de Teile antes del simulacro completo** (`modoB_mostrarSelectorTeile`): respeta que un alumno quiera practicar solo un Teil en vez del examen entero de 5 partes.
- **Deep link `?level=B1`**: integra la app con el resto del sitio (plan.html, dashboards) en vez de vivir aislada.

## Estado de resolución (2026-07-28)

Los 5 Priority Issues (3 P1 + 2 P2) fueron aplicados y verificados. Ver detalle "✅ RESUELTO" en cada issue abajo. **No re-revisar estos 5 puntos** en una futura pasada de `/impeccable` sobre este archivo.

Explícitamente NO aplicado (fuera de alcance, sigue pendiente si se retoma):
- Minor Observations (las 3 de abajo).
- Persona Red Flags no elevados a Priority Issue: estados correcto/incorrecto solo por color (sin indicador no-visual), `showNameDialog()` sin `role="dialog"`/`aria-modal`, sin borrador local de una sesión de Teile en curso, muro de login inmediato en Modo B para un visitante nuevo.

## Priority Issues

**[P1] El listener global de teclado rompe los `<select>`** — ✅ RESUELTO (2026-07-28): guard del `keydown` global ampliado a `e.target.tagName === 'SELECT'`.
- **Why it matters**: el `keydown` global excluye `TEXTAREA`/`INPUT` pero no `SELECT` — cualquier flecha dentro de `blog-lang`, `comp-emparejar-select` o `sprint-source` dispara simultáneamente `changeWpm()`/navegación mientras el navegador cambia el valor del select, y Space bloquea la apertura nativa del desplegable.
- **Fix**: añadir `|| e.target.tagName === 'SELECT'` al guard, o limitar el listener a `currentActivity === 'lectura'`.
- **Suggested command**: `/impeccable harden`

**[P1] Se pierde el progreso en curso al cambiar de pestaña sin avisar** — ✅ RESUELTO (2026-07-28): `switchActivity()` ahora es async y muestra `showConfirmDialog()` (overlay custom, no `confirm()` nativo) antes de interrumpir un RSVP/blog-view/sprint en curso; cancelar deja todo intacto.
- **Why it matters**: `switchActivity()` detiene un RSVP/Sprint activo sin confirmación ni opción de reanudar — un alumno puede perder una sesión de lectura o un simulacro a medio hacer por un clic accidental.
- **Fix**: si `isRunning`/`sprintRunning` es true, mostrar una confirmación inline de una línea antes de cambiar de actividad.
- **Suggested command**: `/impeccable harden`

**[P1] Cero explicación tras responder mal en Comprensión** — ✅ RESUELTO (2026-07-28): campo `explicacion`/`explicaciones` añadido a los 3 flujos (Modo A, Modo B legado, Modo B por Teile — prompts, validadores y `max_tokens` en `api/chat.js`) y renderizado vía `.comp-explicacion`/`explicacionHtml()`; degrada bien ante filas antiguas de Supabase sin el campo.
- **Why it matters**: en los tres modos de quiz (A, B legado, Teile mcq/richtig_falsch/emparejar) solo se colorea la opción correcta/incorrecta — para un entrenador de comprensión lectora, esto socava el propósito pedagógico central.
- **Fix**: que la IA/el dataset incluya un campo de explicación de una línea y se muestre al comprobar.
- **Suggested command**: `/impeccable clarify`

**[P2] Errores técnicos crudos mostrados al alumno** — ✅ RESUELTO (2026-07-28): `friendlyApiError()` reemplaza status/payload crudo por copy amigable (detalle solo a `console.error`); `compShowError`/`modoB_showError` ganan botón "Reintentar" opcional.
- **Why it matters**: `compShowError`/`modoB_showError` imprimen literalmente el status HTTP y un fragmento del payload del servidor — rompe la sensación de producto cuidado justo en un momento de frustración.
- **Fix**: mapear a copy amigable + botón de reintentar; loguear el texto crudo solo en consola.
- **Suggested command**: `/impeccable polish`

**[P2] El banner de bienvenida choca con el tema oscuro por defecto** — ✅ RESUELTO (2026-07-28): `#hint-lv` usa `var(--card)`/`var(--color-b2)`/`var(--text)` en vez de hex fijos; adapta correctamente a `#page-lv.dark`.
- **Why it matters**: el modo oscuro es el default (`darkMode !== 'false'`), pero `#hint-lv` usa `background:#E3F2FD` hardcodeado — lo primero que ve un visitante nuevo puede parecer un bug visual.
- **Fix**: usar variables de tema en vez de hex fijo para el banner.
- **Suggested command**: `/impeccable colorize`

## Persona Red Flags

**Jordan (primera vez)**: la app carga por defecto en `currentActivity = 'comprension'` con Modo B activo — al hacer clic en "Obtener texto" recibe de inmediato `modoB_showError('Inicia sesión para usar este modo.')`. La primera interacción es un muro de login sin aviso previo.

**Sam (accesibilidad/teclado)**: los estados correcto/incorrecto en `.comp-opcion`/`.comp-emparejar-select` son solo de color (falla para daltónicos); `showNameDialog()` es un modal custom sin `role="dialog"`/`aria-modal` ni trampa de foco; y el bug P1 del `keydown` global rompe directamente el uso por teclado de cualquier `<select>` de la página.

**Riley (stress tester)**: refrescar o navegar fuera durante una sesión de `TeilState` activa pierde todo el progreso (no hay borrador en localStorage de un simulacro en curso); cambiar rápido de pestaña durante un Sprint activo descarta el lote silenciosamente sin resumen.

## Minor Observations

- `cargarTexto()` llama a `entrarBlogView()` y luego inmediatamente `salirBlogView()` solo para poblar el textarea — un rodeo confuso en el código (inofensivo visualmente, pero deuda de mantenimiento).
- Iconografía inconsistente: Guardar/Subir archivo tienen iconos SVG, Cargar/Leer/Borrar son solo texto.
- `showToast()` centra un overlay de 20px que puede tapar el elemento con el que se acaba de interactuar.

## Questions to Consider

- ¿El silencio + borde rojo tras una respuesta incorrecta realmente enseña algo, o solo puntúa?
- La documentación dice que Sprint es la pestaña por defecto, pero el código arranca en Comprensión Modo B (con muro de login) — ¿es intencional, o la función más vistosa perdió el embudo de entrada sin que nadie lo notara?
- Si `onboarding_level` ya existe a nivel de sitio, ¿por qué Comprensión obliga a re-elegir el nivel CEFR en cada visita en vez de recordarlo?
