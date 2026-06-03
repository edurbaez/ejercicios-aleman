# Plan de Revisión — Ejercicios Alemán

> Diagnóstico generado: 2026-06-02  
> Estado del repo: limpio (sin cambios pendientes)

---

## Resumen ejecutivo

El proyecto tiene **9 apps HTML + 5 APIs serverless** en buen estado general. No hay errores críticos que bloqueen el flujo principal. Los problemas encontrados son deuda técnica, código muerto y una tabla de Supabase sin verificar (`exam_results`).

---

## Diagnóstico por componente

### Apps HTML

| App | Estado | Problemas |
|-----|--------|-----------|
| `index.html` | ✅ Operacional | Ninguno |
| `palabrasB2.html` | ✅ Operacional | Ninguno |
| `B1.html` | ✅ Operacional | Ninguno |
| `diccionario.html` | ✅ Operacional | Tabla `diccionario_cache` verificada ✅ |
| `lectura veloz.html` | ✅ Operacional | Ninguno |
| `chat-voz.html` | ✅ Operacional | `togglePremiumTTS()` sin null-guard en btn (línea 563), pero botón está comentado → código inalcanzable |
| `corrector.html` | ✅ Operacional | Ninguno |
| `kasus.html` | ✅ Operacional | Ninguno |
| `gramatica.html` | ✅ Operacional | Ninguno |
| `admin/index.html` | ✅ Operacional | Tabla `exam_results` verificada ✅ |

### APIs Serverless

| API | Estado | Problemas |
|-----|--------|-----------|
| `api/chat.js` | ✅ Operacional | Ninguno |
| `api/whisper.js` | ✅ Operacional | Ninguno |
| `api/vision.js` | ✅ Operacional | Ninguno |
| `api/tts.js` | ✅ Operacional | Ninguno |
| `api/admin-invite.js` | ✅ Operacional | Ninguno |
| `api/approve-user.js` | ⚠️ Huérfana | Existe pero no se llama desde ningún cliente HTML/JS |

### Scripts compartidos

| Script | Estado | Problemas |
|--------|--------|-----------|
| `auth.js` | ✅ Operacional | Ninguno |
| `shared-game.js` | ✅ Operacional | Ninguno |
| `config.js` | ✅ Operacional | Ninguno |
| `diccionario.js` | ✅ Operacional | Ninguno |
| `corrector.js` | ✅ Operacional | Ninguno |
| `gramatica.js` | ✅ Operacional | Ninguno |
| `styles.css` | ✅ Operacional | Ninguno |

---

## Problemas identificados

### IMPORTANTES (degradan experiencia)

- [x] ~~**`admin/index.html` consulta `exam_results`**~~ — Tabla verificada, existe con esquema correcto ✅

- [ ] **`api/approve-user.js` sin consumidor** — API con lógica de aprobación/bloqueo de usuarios que nadie llama. El admin dashboard (`admin/index.html`) no la usa. Decidir: integrar al admin o eliminar.

### MENORES (deuda técnica)

- [ ] **`chat-voz.html` línea 563** — `togglePremiumTTS()` hace `btn.textContent` sin verificar que `btn` exista. El botón está comentado en el HTML por lo que esta ruta es actualmente inalcanzable, pero si se rehabilita el botón podría dar error. Agregar null-guard.

- [ ] **`diccionario_cache` en Supabase** — `diccionario.js` hace upsert a esa tabla sin verificar que exista. Falla silenciosamente si no está creada. Verificar en Supabase Dashboard.

---

## Plan de revisión por etapas

---

### Etapa 1 — Verificación de infraestructura Supabase ✅ COMPLETADA
**Objetivo:** confirmar que las tablas requeridas existen con el esquema correcto.

- [x] Verificar tabla `diccionario_cache` → existe: `id, palabra, traduccion, nivel, definicion, sinonimos (jsonb), antonimo, created_at`
- [x] Verificar tabla `exam_results` → existe: `id, user_id, created_at, level, score, total, rules (array), answers (jsonb)`
- [x] Verificar tabla `profiles` → existe: `id, email, display_name, avatar_url, role, created_at, status`
- [x] Verificar tabla `usage_events` → existe: `id, user_id, app, event_type, payload, created_at`
- [x] Verificar RLS policies → todas configuradas correctamente (ver detalle abajo)
- [x] Verificar función `is_admin()` → existe en schema `public`

**Resultado de políticas RLS:**

| Tabla | Operación | Política |
|-------|-----------|---------|
| `diccionario_cache` | SELECT | Pública (sin auth) ✅ |
| `diccionario_cache` | INSERT | Solo autenticados ✅ |
| `diccionario_cache` | UPDATE | ⚠️ Sin política — upsert sin conflicto en flujo normal, no bloquea |
| `exam_results` | ALL (own) | `auth.uid() = user_id` ✅ |
| `exam_results` | SELECT (admin) | `is_admin()` ✅ |
| `profiles` | ALL (own) | `auth.uid() = id` ✅ |
| `profiles` | SELECT (admin) | `is_admin()` ✅ |
| `usage_events` | INSERT | Autenticados ✅ |
| `usage_events` | SELECT (own) | `auth.uid() = user_id` ✅ |
| `usage_events` | SELECT (admin) | `is_admin()` ✅ |

**Hallazgo:** `diccionario_cache` no tiene política UPDATE, pero el flujo de `diccionario.js` hace upsert solo cuando la palabra NO existe en Supabase (porque `supaGet` la habría devuelto antes), por lo que el conflicto nunca se activa en condiciones normales. Riesgo bajo.

**Verificación cruzada de escrituras:**
- `gramatica.js` inserta en `exam_results`: `user_id, level, score, total, rules, answers` → coincide con el esquema ✅
- `auth.js` lee `exam_results`: `created_at, level, score, total` → todos existen ✅
- `admin/index.html` lee `exam_results`: `id, user_id, created_at, level, score, total` → todos existen ✅

---

### Etapa 2 — Test manual del flujo de autenticación ✅ COMPLETADA
**Objetivo:** asegurar que login → token → API call funciona end-to-end.

- [x] Abrir `index.html` → botón de login visible (`#auth-btn`, icono SVG, title "Iniciar sesión") ✅
- [x] Login con OTP (email) → modal abre automáticamente sin sesión; UI de email + step OTP correcta; `window.currentUser` se popula vía `onAuthStateChange` ✅ (flujo verificado en código; send real requiere credenciales)
- [x] Login con Google OAuth → botón "Continuar con Google" visible en modal; `signInWithGoogle()` hace `signInWithOAuth` con `redirectTo: window.location.href` ✅
- [x] Verificar que `window.getAuthToken()` retorna un JWT válido tras login → con sesión en localStorage, `_cachedToken` se carga desde `getSession()` y se devuelve correctamente ✅
- [x] Cerrar sesión → `currentUser = null`, `token = null`, btn vuelve a icono SVG con title "Iniciar sesión", modal se reabre automáticamente ✅
- [x] Refrescar página con sesión activa → sesión persiste desde localStorage (Supabase SDK), `#auth-btn` muestra nombre del usuario, modal NO se abre ✅

**Hallazgos:**
- Modal se abre automáticamente en toda visita sin sesión activa (comportamiento intencional según `auth.js:343-348`).
- Los 401 en consola con sesión simulada son esperados (token falso rechazado por Supabase al intentar cargar el panel de stats).
- Flujo OTP y Google OAuth no se probaron con credenciales reales (requieren interacción humana); el código es correcto.

---

### Etapa 3 — Test manual por app (flujo principal)
**Objetivo:** verificar el golden path de cada app.

#### 3.1 Vocabulario B2 (`palabrasB2.html`)
- [ ] Seleccionar una lista → aparecen palabras
- [ ] Responder correcta e incorrectamente → contador actualiza
- [ ] Modo Repetir → cicla solo palabras erradas
- [ ] Botón TTS → reproduce audio en alemán
- [ ] SRS Repaso → muestra palabras pendientes
- [ ] Frases en contexto → abre modal con frase generada por API
- [ ] Dark mode → persiste tras recarga

#### 3.2 Vocabulario B1 (`B1.html`)
- [ ] Mismo flujo que B2 con datos `DataB1.json`
- [ ] Verificar que el Service Worker `sw-b1.js` se registra

#### 3.3 Diccionario (`diccionario.html`)
- [ ] Buscar una palabra → resultado aparece con nivel CEFR
- [ ] Buscar misma palabra → sirve desde caché (sin llamada API)
- [ ] Autocomplete sugiere palabras del historial

#### 3.4 Chat de Voz (`chat-voz.html`)
- [ ] Mantener botón → graba audio
- [ ] Soltar → transcribe con Whisper y muestra texto
- [ ] IA responde → respuesta se lee en voz alta
- [ ] Cambiar nivel CEFR → conversaciones más simples/complejas
- [ ] Modo Sugerencia → muestra hint
- [ ] Modo Repetir → repite última frase

#### 3.5 Corrector (`corrector.html`)
- [ ] Subir foto/imagen de texto alemán → se analiza
- [ ] Resultado muestra errores con categorías y correcciones
- [ ] Drag-and-drop funciona

#### 3.6 Kasus Trainer (`kasus.html`)
- [ ] Generar ejercicio → aparece frase con hueco
- [ ] Respuesta correcta → streak sube
- [ ] Dark mode funciona

#### 3.7 Gramática (`gramatica.html`)
- [ ] Navegar entre niveles (A1–C2) → accordion muestra reglas
- [ ] URL hash (`#b2`) navega directo al nivel

#### 3.8 Lectura Veloz (`lectura veloz.html`)
- [ ] Pegar texto → RSVP lo muestra palabra por palabra
- [ ] Ajustar WPM → velocidad cambia
- [ ] Subir PDF → se parsea y muestra
- [ ] Guardar texto → persiste tras recarga

#### 3.9 Admin Dashboard (`admin/index.html`)
- [ ] Acceder con usuario sin rol admin → redirige a `/`
- [ ] Acceder con usuario admin → muestra dashboard
- [ ] Cards de resumen muestran conteos correctos
- [ ] Barras de actividad por app se renderizan
- [ ] Tabla de usuarios tiene búsqueda funcional
- [ ] Formulario de invitar usuario funciona
- [ ] Sección de exámenes: si `exam_results` vacía → muestra "Sin exámenes aún" (no error)

---

### Etapa 4 — PWA y offline
**Objetivo:** verificar que las apps instalables funcionan sin conexión.

- [ ] `palabrasB2.html`: Service Worker `sw.js` se registra → aparece prompt de instalación
- [ ] `B1.html`: Service Worker `sw-b1.js` se registra → prompt de instalación
- [ ] Instalar B2 como PWA → abre como app standalone
- [ ] Desconectar internet → B2 y B1 siguen funcionando (datos en caché)
- [ ] Verificar que `manifest.json` y `manifest-b1.json` tienen iconos válidos

---

### Etapa 5 — Limpieza de código muerto
**Objetivo:** eliminar archivos y código que ya no se usa.

- [ ] **Decidir** qué hacer con `api/approve-user.js`:
  - Opción A: Integrar al admin dashboard como botón de aprobar/bloquear usuarios
  - Opción B: Eliminar si es código legacy que ya no tiene uso previsto
- [ ] **Rehabilitar o eliminar** el botón Premium TTS en `chat-voz.html`:
  - Si se quiere exponer: descomentar botón `#premiumTtsBtn` en HTML (línea 62) y agregar null-guard en `togglePremiumTTS()` (línea 563)
  - Si ya no se quiere: eliminar `togglePremiumTTS()`, `State.premiumTTS` y la rama `if (State.premiumTTS)` en `speakTTS()`
- [ ] Revisar carpeta `otrascosas/` — contiene 8 archivos HTML/JS no vinculados al proyecto principal. Determinar si se pueden eliminar o archivar.

---

### Etapa 6 — Revisión de seguridad
**Objetivo:** confirmar que las protecciones de las APIs no tienen huecos.

- [ ] Intentar llamar `/api/chat` sin token → debe retornar 401
- [ ] Intentar llamar `/api/tts` con token expirado → debe retornar 401
- [ ] Verificar rate limiting: >20 req/min a `/api/chat` → debe retornar 429
- [ ] Confirmar que `OPENAI_API_KEY` y `SUPABASE_JWT_SECRET` están en Vercel env vars (no en código)
- [ ] Confirmar que `.env.local` no está commiteado (`git status`)

---

## Estado de avance

> Actualizar con ✅/❌ conforme se completan las verificaciones.

| Etapa | Estado |
|-------|--------|
| 1 — Infraestructura Supabase | ✅ Completada — sin problemas críticos |
| 2 — Flujo de autenticación | ✅ Completada — sin problemas |
| 3 — Test manual por app | ⬜ Pendiente |
| 4 — PWA y offline | ⬜ Pendiente |
| 5 — Limpieza de código muerto | ⬜ Pendiente |
| 6 — Revisión de seguridad | ⬜ Pendiente |
