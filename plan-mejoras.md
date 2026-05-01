# Plan de Mejoras — Ejercicios Alemán

> Fecha: 2026-05-01  
> Base: auditoría completa del codebase. El plan.md anterior documenta lo ya construido; este archivo cubre la siguiente fase.

---

## Qué se ejecutó (2026-05-01)

**Limpieza inicial:**
- Eliminado bloque HTML comentado `<!-- Botones modo ... -->` en `palabrasB2.html` y `B1.html`.
- Eliminado comentario muerto `/* DATA se carga desde DATA.json */` en `palabrasB2.html`.

**Mejora 1 — `shared-game.js` ✅**
- Creado `shared-game.js` (697 líneas) con toda la lógica de juego compartida.
- `palabrasB2.html` y `B1.html` reducidos de ~1 100 líneas a 150 líneas cada uno.
- `B1.html` recibió el input `filter-lista` que le faltaba (paridad con B2).
- Cada página define `window.APP_CONFIG` con sus valores específicos antes de cargar el script.

**Mejora 2 — `config.js` ✅**
- Creado `config.js` con `window.SUPA_URL` y `window.SUPA_KEY`.
- Eliminadas las credenciales duplicadas de `auth.js` y `diccionario.js`.
- Eliminadas de `admin/index.html`; usa las globales de `config.js`.
- `config.js` añadido al `<head>` de las 5 páginas + admin.
- `diccionario.js` ahora usa `window.sb` de `auth.js` en lugar de crear su propio cliente.

**Mejora 3 — Auth duplicado en `lectura veloz.html` ✅**
- Eliminadas 109 líneas de auth duplicado (OTP, logout, updateAuthUI, etc.).
- LV ahora usa `window.openAuthModal`, `window.sb`, `window.currentUser` de `auth.js`.
- La lógica específica de LV (`onSignedIn`, `syncToCloud`) se preserva y conecta vía `window.onAuthSignedIn`.

---

## Problemas técnicos — por prioridad

### 🔴 Alta

#### ~~1. Duplicación masiva B2 / B1~~ ✅ COMPLETADO

~~`palabrasB2.html` y `B1.html` son ~95% idénticos (~1 100 líneas cada uno).~~

**Resultado:** `shared-game.js` creado (697 líneas). `palabrasB2.html` y `B1.html` reducidos de ~1 100 líneas a 150 líneas cada uno. `B1.html` recibió el input `filter-lista` que le faltaba.

---

#### ~~2. Credenciales Supabase duplicadas en 5 archivos~~ ✅ COMPLETADO

~~`auth.js`, `diccionario.js`, `lectura veloz.html`, `admin/index.html` y `api/admin-invite.js` definen la misma URL y clave pública.~~

**Resultado:** `config.js` creado con `window.SUPA_URL` y `window.SUPA_KEY`. Duplicados eliminados de `auth.js`, `diccionario.js` y `admin/index.html`. Añadido al `<head>` de las 5 páginas + admin.

---

#### ~~3. Auth duplicado en `lectura veloz.html`~~ ✅ COMPLETADO

~~Las líneas 658–766 reimplementan `openAuthModal`, `sendOtp`, `verifyOtp` y `logout` de forma completamente separada de `auth.js`.~~

**Resultado:** Eliminadas 109 líneas de auth duplicado. LV usa `window.openAuthModal`, `window.sb`, `window.currentUser` de `auth.js`. La lógica específica de LV (`onSignedIn`, `syncToCloud`) se preserva vía `window.onAuthSignedIn`.

---

#### 4. Sin rate limit en `api/admin-invite.js`
El endpoint de invitaciones no tiene control de frecuencia. Un admin puede spamear sin restricción.

**Solución:** Mismo patrón de ventana deslizante que `api/chat.js`, límite de 5 invitaciones/min por IP.

---

#### 5. Sin límite de tamaño en `api/whisper.js`
El endpoint acepta audio sin verificar el tamaño. Un archivo muy grande puede agotar la memoria del servidor Vercel.

**Solución:** Rechazar con 413 si `Content-Length` supera 10 MB antes de leer el body:
```js
if (parseInt(req.headers['content-length'] || '0') > 10 * 1024 * 1024) {
  return res.status(413).json({ error: 'Archivo demasiado grande (máx 10 MB)' });
}
```

---

### 🟡 Media

#### 6. Admin dashboard — todo inline
`admin/index.html` tiene 416 líneas de JS mezclado con el HTML. Difícil de leer y de mantener.

**Solución:** Extraer a `admin/admin.js` y `admin/admin.css`. El HTML queda solo con la estructura y los imports.

---

#### 7. Colores hardcoded en CSS — sin variables
`#1976D2` (azul B2) y `#388E3C` (verde B1) aparecen decenas de veces en `styles.css`. Si cambia el branding hay que hacer buscar/reemplazar manual.

**Solución:** Variables CSS en `:root`:
```css
:root {
  --color-b2: #1976D2;
  --color-b1: #388E3C;
  --color-danger: #D32F2F;
  --radius: 8px;
  --gap: 12px;
}
```

---

#### 8. Sin timeout en llamadas a OpenAI
`api/chat.js` y `api/whisper.js` no tienen timeout. Si OpenAI se demora, la función Vercel expira a los 30 s con un error genérico para el usuario.

**Solución:**
```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 25000);
fetch(url, { signal: controller.signal, ...opts }).finally(() => clearTimeout(timer));
```

---

#### 9. `escapeHtml` con tres nombres diferentes
- `escHtml()` en `diccionario.js`
- `escapeHtml()` en `palabrasB2.html` / `B1.html`
- `esc()` en `admin/index.html`

Al crear `shared-game.js`, consolidar en una implementación con un solo nombre.

---

#### 10. Accesibilidad básica faltante
- Botones de opciones del quiz sin `aria-label` (lector de pantalla no sabe qué opción es correcta).
- No hay `:focus-visible` en modo oscuro — navegación por teclado invisible.
- El filtro de búsqueda no anuncia resultados filtrados a lectores de pantalla.

---

### 🟢 Baja

#### 11. `api/admin-invite.js` solo soporta HS256
`api/chat.js` soporta ES256 + HS256 para JWT. `admin-invite.js` solo HS256. Si Supabase rota algoritmo, admin-invite se rompe.

**Solución:** Copiar el verificador dual de `chat.js`.

---

#### 12. Sin paginación en el admin
`admin/index.html` carga hasta 10 000 eventos de una vez. Con crecimiento de usuarios esto será lento.

**Solución:** Paginación server-side con `.range(offset, offset + pageSize - 1)` y controles de navegación en la UI.

---

## Mejoras pedagógicas y de UX

### 💡 Alto impacto

#### A. Repetición espaciada (SRS básico)
El quiz presenta palabras al azar. La repetición espaciada prioriza palabras con más errores, mejorando la retención significativamente.

**Implementación mínima (sin SM-2):**
- Guardar en IndexedDB: `{ de, correcto: N, incorrecto: M, ultimaVez: timestamp }` por palabra.
- Al elegir la siguiente palabra: ponderar por tasa de error e intervalo transcurrido.
- No requiere algoritmo complejo — incluso una fórmula simple como `score = errores / (dias_desde_ultima + 1)` ya mejora mucho.
- Añadir indicador visual: palabras "pendientes de repasar" destacadas en la lista.

---

#### B. Historial de progreso por sesión
El usuario no puede ver su rendimiento histórico. El panel de stats muestra solo la sesión actual.

**Propuesta:**
- Guardar en Supabase por sesión: `{ user_id, app, lista, palabras_vistas, aciertos, errores, duracion_s, fecha }`.
- Panel de progreso expandido: gráfica semanal de aciertos por día.
- Racha de días consecutivos estudiando (motivación).
- Botón de descarga CSV del historial propio.

---

#### C. Modo Escritura (producción activa)
Los quizzes son de reconocimiento (elegir entre 4 opciones). La producción activa — escribir la traducción sin ver opciones — es más exigente y más efectiva.

**Propuesta:** Toggle "Modo Escritura" en la barra de controles que reemplaza las 4 opciones por un `<input type="text">`. La corrección puede ser exacta o fuzzy (distancia de Levenshtein ≤ 1 para tolerar un error de tipeo).

---

#### D. Integración Diccionario → Quiz
El usuario busca una palabra en `diccionario.html` pero no puede practicarla.

**Propuesta:** Botón "Practicar esta palabra" que añade la palabra a una lista temporal en el quiz B2/B1 (la misma infraestructura que las listas personales ya existentes). El usuario puede cerrar el diccionario e ir directo al quiz a practicarla.

---

#### E. Guardar transcripciones en `chat-voz.html`
Las conversaciones con el AI se pierden al recargar. El usuario no puede revisar vocabulario ni errores.

**Propuesta:**
- Guardar historial de conversación en IndexedDB con timestamp.
- Panel lateral "Conversaciones" con lista de sesiones anteriores.
- Exportar conversación a `.txt` con un clic.
- (Opcional) Resaltar palabras de nivel B1/B2 en la transcripción para conectar con el vocabulario estudiado.

---

#### F. Aviso de límite de grabación en `chat-voz.html`
La grabación se corta automáticamente a los 60 segundos sin aviso previo.

**Fix:** En los últimos 10 segundos mostrar un contador regresivo en el botón que cambia de color (amarillo → rojo). Una línea de código añadida al intervalo existente.

---

#### G. Estadísticas de lectura en `lectura veloz.html`
El lector no muestra métricas de la sesión ni progreso histórico.

**Propuesta:**
- Al terminar un texto: popup con palabras leídas, WPM promedio, tiempo total.
- Comparar con sesiones anteriores del mismo texto para visualizar mejora.

---

#### H. Onboarding para usuarios nuevos
Un usuario que entra por primera vez no sabe qué hacer.

**Propuesta:** Tres tooltips secuenciales en la primera visita:
1. "Selecciona una lista de palabras"
2. "Elige la traducción correcta"
3. "Activa Modo Auto para escuchar las palabras en bucle"

Guardado en `localStorage('onboarding_b2_done')` para no repetirlo. Tiempo de implementación: ~1 hora.

---

### 💡 Impacto medio

#### I. Barra de progreso de vocabulario total
Mostrar "Has visto 87 de 320 palabras en B2" para dar sensación de avance y motivar completar el vocabulario.

#### J. Compartir resultado
Botón para copiar al portapapeles: `"Hoy respondí 47 palabras correctas en alemán B2 🇩🇪"`. Fácil de implementar, útil para motivación.

#### K. Indicador de nivel CEFR activo en navbar
Mostrar el nivel activo (B1/B2) en el navbar al navegar entre apps para orientar al usuario.

---

## Orden sugerido de implementación

| # | Tarea | Esfuerzo | Impacto | Estado |
|---|-------|----------|---------|--------|
| 1 | Extraer `shared-game.js` | Alto | Técnico crítico | ✅ |
| 2 | Crear `config.js` con credenciales | Bajo | Mantenimiento | ✅ |
| 3 | Fix auth duplicado en `lectura veloz.html` | Medio | Calidad | ✅ |
| 4 | Variables CSS en `styles.css` | Bajo | Mantenimiento | ⬜ |
| 5 | Rate limit en `api/admin-invite.js` | Bajo | Seguridad | ⬜ |
| 6 | Timeout en llamadas OpenAI | Bajo | Confiabilidad | ⬜ |
| 7 | Aviso 10 s antes del corte en grabación | Bajo | UX inmediato | ⬜ |
| 8 | Onboarding primera visita | Bajo | Retención | ⬜ |
| 9 | Modo Escritura en quiz B1/B2 | Medio | Pedagógico alto | ⬜ |
| 10 | Repetición espaciada básica | Medio | Pedagógico alto | ⬜ |
| 11 | Barra de progreso vocabulario total | Bajo | Motivación | ⬜ |
| 12 | Historial de sesiones + gráfica | Alto | Motivación | ⬜ |
| 13 | Guardar transcripciones chat-voz | Medio | Utilidad | ⬜ |
| 14 | Integración diccionario → quiz | Medio | Pedagógico medio | ⬜ |
| 15 | Paginación admin | Medio | Escalabilidad | ⬜ |
| 16 | Accesibilidad (aria-label, focus-visible) | Medio | Inclusión | ⬜ |

---

## Notas de arquitectura

- **Sin build step** — fortaleza por simplicidad. Para `shared-game.js` usar módulos ES nativos (`<script type="module">`) que todos los browsers modernos soportan sin bundler.
- **Rate limiting in-memory** en las APIs serverless funciona en producción con cold starts frecuentes pero puede ser inconsistente bajo alta carga. Si el tráfico crece, migrar a Vercel KV.
- **Supabase como única BD** — mantener el stack simple. No añadir otra capa de persistencia sin necesidad clara.
- **Dark mode por app** — las diferentes claves de localStorage (`darkMode_b2`, `darkMode_b1`, etc.) son intencionales si se quiere estado independiente por app. Si se quiere un modo oscuro global, unificar en `auth.js`.
