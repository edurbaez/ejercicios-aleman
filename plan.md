# regla principal de plan.md
 despues de hacer cualquier implementacion del plan se actualizara plan.md, claude.md y readme.md con los cambios realizados.  


# Plan de mejoras UX — Aplicación de Alemán

Prioridad: **P1** = crítico / alto impacto · **P2** = medio impacto · **P3** = pulido / bajo impacto

---

## P1 — Crítico / Alto impacto

### ~~1. Corregir atributo `lang` en todas las páginas~~ ✅ DONE
- `palabrasB2.html`, `chat-voz.html`, `kasus.html`, `B1.html` → `lang="es"`.

### 2. Convertir las opciones del quiz de `<div>` a `<button>`
- **Archivos:** `shared-game.js` (renderiza `#op1`–`#op4` como `<div class="option">`), `styles.css` (ajustar estilos a `button.option`).
- **Por qué:** Los `<div>` no son alcanzables con Tab ni activables con teclado; lectores de pantalla no los anuncian como interactivos. Afecta 100% de la funcionalidad principal.
- **Alcance:** Cambiar el render JS + CSS (quitar `cursor:pointer` redundante). ~1h.

### 3. Sincronizar modo oscuro entre páginas con una clave unificada
- **Archivos:** `shared-game.js`, `auth.js`, `lectura veloz.html`, `diccionario.html`, `kasus.html`, `corrector.html`, `gramatica.html`, `chat-voz.html`, `index.html`.
- **Por qué:** Cada página guarda `darkMode_<id>` por separado — el usuario activa dark mode en B2 y llega a Kasus en modo claro. Genera desorientación constante.
- **Solución:** Usar una clave única `darkMode` en localStorage; leerla al cargar y escribirla al togglear en todos los archivos.
- **Alcance:** Refactor de función `toggleDarkMode` / `toggleKasDark` etc. ~2h total.

### 4. Añadir `focus trap` y `aria-*` al modal de autenticación
- **Archivos:** `auth.js` (función `_injectModal`).
- **Por qué:** El Tab sale del modal hacia el fondo; no tiene `role="dialog"` ni `aria-modal="true"`. Viola WCAG 2.1 criterio 2.1.2.
- **Solución:** Agregar `role="dialog" aria-modal="true" aria-labelledby="auth-title"`, capturar Tab/Shift+Tab dentro del modal, restaurar foco al cerrarlo.
- **Alcance:** ~1.5h.

### ~~5. Eliminar sombra roja de las cards del quiz~~ ✅ DONE
- `styles.css` `.card` y `.option` → `box-shadow: rgba(0,0,0,0.08)`.

### ~~6. Marcar "Vocabulario B2" como `active` en el navbar de `palabrasB2.html`~~ ✅ DONE
- Añadido `<a href="palabrasB2.html" class="active">Vocabulario B2</a>` al dropdown.

---

## P2 — Medio impacto

### ~~7. Corregir cabeceras de tabla "Uno" / "Dos" → "Español" / "Alemán"~~ ✅ DONE
- `palabrasB2.html` y `B1.html` → `<th>Español</th>` / `<th>Alemán</th>`.

### 8. Añadir `aria-live` para feedback dinámico del quiz y el chat
- **Archivos:** `shared-game.js` (resultado de respuesta), `chat-voz.html` (`#chatArea`), `kasus.html` (feedback de ejercicio).
- **Por qué:** El contenido dinámico no se anuncia a lectores de pantalla.
- **Solución:** Agregar `aria-live="polite"` al contenedor de feedback; `aria-live="assertive"` para respuestas correctas/incorrectas inmediatas.
- **Alcance:** ~45 min.

### 9. Estandarizar el orden y categorías del menú en todas las páginas
- **Archivos:** Todos los `<nav id="navbar">` en las 8 páginas HTML.
- **Por qué:** El dropdown de sub-páginas tiene orden diferente al de la landing (sin categorías, orden distinto). El usuario no puede predecir dónde está cada app.
- **Solución:** Copiar la estructura categorizada de `index.html` al dropdown de cada sub-página, o al menos unificar el orden: Vocabulario B2, B1, Diccionario | Gramática, Kasus, Corrector | Chat de Voz, Lectura Veloz.
- **Alcance:** ~1h (copiar/pegar + ajustar estilos).

### 10. Añadir estado vacío instructivo al quiz B2/B1
- **Archivos:** `shared-game.js` (sección donde se muestra `#palabra`).
- **Por qué:** Si no hay listas seleccionadas, las opciones aparecen vacías sin ningún mensaje. Primer uso confuso.
- **Solución:** Mostrar un mensaje centrado "Selecciona al menos una lista en el selector de arriba para comenzar" cuando `State.de.length === 0`.
- **Alcance:** ~30 min.

### 11. Mejorar el estado visual de botones de modo (Auto/Dual/Leer)
- **Archivos:** `styles.css` (`.btn-active`), `shared-game.js`.
- **Por qué:** `.btn-active` usa `red` que se percibe como error. No comunica "modo activo" de forma positiva.
- **Solución:** Cambiar a un color de acento positivo (ej. `#2E7D32` verde oscuro o el color de acento de la app) con ícono de check o borde más grueso.
- **Alcance:** ~30 min CSS.

### 12. Corregir overflow horizontal de `lectura veloz.html` en móvil
- **Archivos:** `styles.css` sección `#page-lv`, posiblemente `lectura veloz.html`.
- **Por qué:** `#page-lv { margin: 20px }` aplica margen al body en lugar del contenedor, causando scroll horizontal en pantallas < 360px.
- **Solución:** Mover el `margin` al contenedor interno; el body solo debe tener `padding-top: 56px`.
- **Alcance:** ~20 min.

### 13. Mejorar descripciones de listas en `#sets-bar`
- **Archivos:** `shared-game.js` (render de botones del `#sets-bar`), `DATA.json`, `DataB1.json`.
- **Por qué:** Botones como "lista1" o "c1lista1" son crípticos. El usuario no sabe qué palabras contiene cada lista.
- **Solución:** Añadir `title` tooltip con la categoría y cantidad de palabras, o mostrar un subtítulo debajo del botón.
- **Alcance:** ~1h.

---

## P3 — Pulido / Bajo impacto

### 14. Unificar tipografía entre landing e interiores
- **Archivos:** `index.html` (estilos inline del `<head>`), `styles.css`.
- **Por qué:** La landing usa `'Segoe UI', -apple-system` y el resto usa `Arial`. Sensación tipográfica diferente al entrar a las apps.
- **Solución:** Mover la declaración de fuente al `styles.css` global (`#page-home { font-family: Arial, Helvetica, sans-serif }`).
- **Alcance:** 5 min.

### 15. Revisar contraste de texto secundario en modo oscuro
- **Archivos:** `styles.css` (`.cv-hint`, `.cor-header p`, `.kas-header p`).
- **Por qué:** Textos con `opacity: 0.65` sobre backgrounds oscuros pueden caer por debajo del ratio WCAG AA (4.5:1).
- **Solución:** Usar colores fijos con contraste verificado en lugar de `opacity` para texto de ayuda; herramienta: https://webaim.org/resources/contrastchecker/.
- **Alcance:** ~45 min (medir + ajustar).

### 16. Agregar sugerencia de ruta de aprendizaje en la landing
- **Archivos:** `index.html`.
- **Por qué:** Un usuario nuevo ve 8 apps sin orientación. Añadir una sección pequeña "¿Por dónde empezar?" con pasos sugeridos (ej. A1 → B1 vocab → Kasus → B2) reduciría abandono inicial.
- **Alcance:** ~1h (solo HTML/CSS, sin lógica).

### 17. Reemplazar `alert()` de auth por mensajes inline
- **Archivos:** `auth.js` (función `sendOtp`, `verifyOtp`).
- **Por qué:** Los `alert()` nativos rompen la experiencia visual y no son estilizables. Inconsistente con el resto de la UI.
- **Solución:** Mostrar el error dentro del modal con un `<p id="auth-error">` estilizado.
- **Alcance:** ~30 min.

### 18. Añadir `aria-label` a botones de icono en el navbar
- **Archivos:** Todos los HTML (botón `#auth-btn`, `#darkModeBtn`).
- **Por qué:** Solo tienen `title` que algunos lectores de pantalla ignoran. `aria-label="Iniciar sesión"` y `aria-label="Activar modo oscuro"` garantizan descripción accesible.
- **Alcance:** 2 atributos por archivo. ~15 min total.

---

## Notas de implementación

- Los ítems 1, 5, 6, 7 son cambios de 5–15 min cada uno: buenos candidatos para una sesión rápida.
- El ítem 3 (dark mode unificado) es el de mayor ROI para experiencia diaria — hacerlo antes que cualquier otro P2.
- Los ítems 2 y 4 (accesibilidad de teclado) son independientes y pueden hacerse en orden cualquiera.
- El ítem 9 (menú consistente) puede hacerse copiando el bloque HTML de `index.html` y es repetitivo pero bajo riesgo.
