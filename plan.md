# Plan: Sistema de Autenticación + Dashboard de Administración

> **Estrategia de ejecución:** cada etapa es atómica y desplegable de forma independiente.
> Completa y despliega una etapa antes de iniciar la siguiente para mantener el sistema funcional en todo momento y minimizar el uso de tokens por sesión.

---

## Estado actual del proyecto

| Aspecto | Estado |
|---|---|
| Supabase conectado | ✅ `mzitpnacjcjpokmiqwtd.supabase.co` |
| Tablas `profiles` + `usage_events` | ✅ Creadas con índices y RLS |
| Trigger auto-perfil al registrarse | ✅ `on_auth_user_created` activo |
| Función `is_admin()` sin recursión | ✅ SECURITY DEFINER |
| Google OAuth en Supabase | ✅ Configurado |
| Redirect URLs en Supabase | ✅ `ejercicios-aleman-sand.vercel.app` + localhost |
| `auth.js` compartido | ✅ Cargado en las 5 páginas |
| Modal OTP + Google en todas las páginas | ✅ |
| Botón 👤 en todas las páginas | ✅ |
| Enlace "Dashboard →" para admin | ✅ Aparece en navbar al detectar `role = 'admin'` |
| Asignar rol admin (SQL) | ⚠️ Pendiente ejecutar tras primer login |
| Tracking de uso | ✅ Completo (Etapa 3) |
| Panel de estadísticas del usuario | ✅ Completo (Etapa 3) |
| Dashboard de administración | ✅ Completo (Etapa 4) |

---

## ✅ Etapa 1 — Base de datos y configuración de Supabase Auth — COMPLETA

### Completado
- Tablas `profiles` y `usage_events` creadas
- Trigger `on_auth_user_created` — crea perfil automáticamente al registrarse
- Función `is_admin()` con SECURITY DEFINER (evita recursión en RLS)
- RLS habilitado en ambas tablas con políticas de acceso por rol
- Google OAuth configurado en Supabase + Google Cloud Console
- Redirect URLs configuradas para producción y localhost

### Pendiente (ejecutar tras primer login en la app)

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'ed.urbaez@gmail.com';
```

---

## ✅ Etapa 2 — Módulo de autenticación compartido (`auth.js`) — COMPLETA

### Completado
- `auth.js` creado: cliente Supabase como `window.sb`, `window.currentUser`
- Modal inyectado dinámicamente con botón Google + separador + flujo OTP
- `window.openAuthModal`, `window.closeAuthModal`, `window.sendOtp`, `window.verifyOtp`
- `window.signInWithGoogle` — OAuth con redirect a la misma página
- `window.logout`, `window.updateAuthUI`, `window.logEvent`
- Hook `window.onAuthSignedIn` — cada página puede definirlo para reaccionar al login
- Botón 👤 en las 5 páginas; muestra el nombre del usuario al iniciar sesión
- Admin: enlace "Dashboard →" aparece en el dropdown del navbar (`_addDashboardLink`)
- `palabrasB2.html` y `B1.html`: bloque AUTH reducido a `onSignedIn` + `syncToCloud` (usan `window.sb`)
- Deployed en Vercel (commit `a98f238`)

### Archivos modificados
| Archivo | Cambio |
|---|---|
| `auth.js` | Creado |
| `palabrasB2.html` | +`auth.js`, modal viejo eliminado, AUTH simplificado |
| `B1.html` | Ídem |
| `lectura veloz.html` | +`auth.js`, modal viejo eliminado |
| `diccionario.html` | +`auth.js`, +botón `auth-btn` |
| `chat-voz.html` | +Supabase CDN, +`auth.js`, +botón `auth-btn` |
| `CLAUDE.md` | Documentado `auth.js` |

---

## ✅ Etapa 3 — Tracking de uso + Panel de estadísticas del usuario — COMPLETA

### Completado
- `logEvent()` instrumentado en las 5 apps (B1, B2, Diccionario, Chat de Voz, Lectura Veloz)
- `window.openStatsPanel()` / `window.closeStatsPanel()` añadidos a `auth.js`
- Panel lateral inyectado dinámicamente: muestra nombre/email, palabras respondidas + % aciertos, búsquedas, audios, sesiones
- Botón "Cerrar sesión" integrado dentro del panel
- Clic en el nombre de usuario en el navbar abre el panel (ya no hace logout directo)
- `CLAUDE.md` actualizado con las nuevas funciones expuestas

### Archivos modificados
| Archivo | Cambio |
|---|---|
| `auth.js` | +`openStatsPanel`, +`closeStatsPanel`, `updateAuthUI` apunta al panel |
| `palabrasB2.html` | +`logEvent` en `toggleSet`, `handleSelectionPick`, botón Auto |
| `B1.html` | Ídem (app: `'b1'`) |
| `diccionario.js` | +`logEvent` en `buscar()` para cada fuente (cache/supabase/api) |
| `chat-voz.html` | +`logEvent` al inicio de `transcribeAndSend` |
| `lectura veloz.html` | +`logEvent` en `startReading`, `pauseReading` y `stopReading` |

**Objetivo:** registrar eventos de uso y permitir que cada alumno vea su propio progreso.

### 3.1 `logEvent()` ya disponible en `auth.js`

```js
window.logEvent(app, eventType, payload)
// Solo registra si hay sesión activa. No hace nada si el usuario no está logueado.
```

### 3.2 Instrumentar cada app

#### `palabrasB2.html` y `B1.html`

| Dónde | `event_type` | `payload` |
|---|---|---|
| Al activar el primer set | `session_start` | `{ app: 'b2' }` |
| Al responder correctamente | `word_answered` | `{ word_de, correct: true }` |
| Al responder incorrectamente | `word_answered` | `{ word_de, correct: false }` |
| Al activar Modo Auto | `mode_change` | `{ mode: 'auto', active: true }` |

#### `diccionario.js`

| Dónde | `event_type` | `payload` |
|---|---|---|
| Al buscar una palabra | `lookup` | `{ word, source: 'cache'\|'supabase'\|'api' }` |

#### `chat-voz.html`

| Dónde | `event_type` | `payload` |
|---|---|---|
| Al enviar audio | `audio_sent` | `{ level, duration_ms }` |

#### `lectura veloz.html`

| Dónde | `event_type` | `payload` |
|---|---|---|
| Al iniciar lectura | `session_start` | `{ wpm, text_length }` |
| Al pausar o terminar | `session_end` | `{ words_read }` |

### 3.3 Panel de estadísticas del usuario

Al hacer clic en el nombre del usuario en el navbar → abre un **panel lateral** (no una página separada) con su propio resumen de actividad.

**Contenido del panel:**
- Nombre / email del usuario
- Total de palabras respondidas (B1 + B2) y % de aciertos
- Búsquedas en diccionario
- Audios enviados en Chat de Voz
- Sesiones de lectura
- Botón "Cerrar sesión"

**Implementación:** función `window.openStatsPanel()` en `auth.js`. El panel consulta `usage_events` filtrando por `user_id = auth.uid()` (RLS garantiza que solo ve sus propios datos).

**Entregable:** tabla `usage_events` acumulando datos reales + cada alumno puede ver su progreso.

---

## ✅ Etapa 4 — Dashboard de administración — COMPLETA

**Objetivo:** página independiente, fuera de la estructura de las apps de estudio.

### 4.1 Crear `admin/index.html`

Ruta: `admin/index.html` → accesible en `https://<dominio>/admin/`.

> Esta página NO forma parte del navbar de las apps de estudio. El enlace "Dashboard →" del navbar lleva aquí solo para el admin.

**Estructura:**
```
admin/index.html
├── Verificación de rol al cargar (redirige a / si role ≠ 'admin')
├── Header: título + botón cerrar sesión
└── Main (4 cards):
    ├── 1. Resumen general
    │   ├── Total usuarios registrados
    │   ├── Usuarios activos últimos 7 días
    │   └── Total eventos registrados
    ├── 2. Actividad por app (barras proporcionales simples, sin librería)
    ├── 3. Tabla de usuarios
    │   ├── Nombre / email / registro / última actividad
    │   └── Buscador por nombre o email
    └── 4. Detalle al hacer clic en un usuario
        └── Lista de eventos cronológicos con tipo y payload
```

### 4.2 Seguridad

- Verificación de rol en frontend al cargar (redirect inmediato si no es admin)
- RLS en Supabase garantiza que aunque se salte el redirect, no se devuelven datos ajenos
- Sin serverless functions propias — consulta Supabase directo con la anon key

### 4.3 Estilo
- Usa `styles.css` del proyecto (modo oscuro incluido)
- Header propio minimalista, sin navbar de las apps de estudio
- HTML/CSS/JS vanilla, sin frameworks

**Entregable:** dashboard funcional en `/admin/` con datos reales.

---

## ✅ Etapa 5 — Pulido y hardening — COMPLETA

**Objetivo:** preparar el sistema para uso real con estudiantes.

### 5.1 Política de acceso a las apps

- **Opción A (abierto):** apps funcionan sin login; tracking inactivo sin sesión. ← estado actual
- **Opción B (restringido):** modal de login obligatorio al cargar si no hay sesión.

### 5.2 Proteger la API con JWT de Supabase

Pasar `Authorization: Bearer <jwt>` al llamar `/api/chat` y `/api/whisper`. Verificar en el serverless con `SUPABASE_JWT_SECRET`. Reemplaza el rate limit por IP con rate limit real por usuario.

### 5.3 Invitaciones de alumnos

`api/admin-invite.js` — llama a `supabase.auth.admin.inviteUserByEmail()` con `SUPABASE_SERVICE_ROLE_KEY` (nunca en el frontend).

**Entregable:** sistema listo para producción con estudiantes reales.

---

## Resumen de archivos — estado

| Archivo | Estado | Etapa |
|---|---|---|
| SQL en Supabase (tablas + RLS) | ✅ Ejecutado | 1 |
| `auth.js` | ✅ Creado y deployed | 2 |
| `palabrasB2.html` | ✅ Actualizado | 2 |
| `B1.html` | ✅ Actualizado | 2 |
| `diccionario.html` | ✅ Actualizado | 2 |
| `chat-voz.html` | ✅ Actualizado | 2 |
| `lectura veloz.html` | ✅ Actualizado | 2 |
| `palabrasB2.html` — `logEvent()` | ✅ Completo | 3 |
| `B1.html` — `logEvent()` | ✅ Completo | 3 |
| `diccionario.js` — `logEvent()` | ✅ Completo | 3 |
| `chat-voz.html` — `logEvent()` | ✅ Completo | 3 |
| `lectura veloz.html` — `logEvent()` | ✅ Completo | 3 |
| `auth.js` — panel de stats del usuario | ✅ Completo | 3 |
| `admin/index.html` | ✅ Completo | 4 |
| `api/admin-invite.js` | ✅ Completo | 5 |
| `api/chat.js` — JWT auth | ✅ Completo | 5 |
| `api/whisper.js` — JWT auth | ✅ Completo | 5 |
| `auth.js` — `getAuthToken()` | ✅ Completo | 5 |
| `diccionario.js` — JWT en fetch | ✅ Completo | 5 |
| `chat-voz.html` — JWT en fetch | ✅ Completo | 5 |
| `CLAUDE.md` + `README.md` | ✅ Completo | 5 |

---

## Dependencias entre etapas

```
Etapa 1 ✅ → Etapa 2 ✅ → Etapa 3 ✅ → Etapa 4 → Etapa 5
```
