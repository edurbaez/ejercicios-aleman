# Plan: Sistema de Autenticación + Dashboard de Administración

> **Estrategia de ejecución:** cada etapa es atómica y desplegable de forma independiente.
> Completa y despliega una etapa antes de iniciar la siguiente para mantener el sistema funcional en todo momento y minimizar el uso de tokens por sesión.

---

## Estado actual del proyecto

| Aspecto | Estado |
|---|---|
| Supabase ya conectado | ✅ `mzitpnacjcjpokmiqwtd.supabase.co` |
| Auth UI parcial | ✅ Modal OTP en B1/B2 (email → código 6 dígitos) |
| Botón 👤 en navbar | ✅ Presente en B1/B2, ausente en las demás páginas |
| Supabase Auth habilitado | ⚠️ Por confirmar (depende de la config del proyecto Supabase) |
| Google OAuth | ❌ No implementado |
| Tracking de uso | ❌ No implementado |
| Dashboard de administración | ❌ No implementado |

---

## Etapa 1 — Base de datos y configuración de Supabase Auth

**Objetivo:** dejar el backend completamente listo antes de tocar una línea de frontend.

### 1.1 Verificar / activar Supabase Auth

- Confirmar que el proyecto Supabase tiene el proveedor **Email** habilitado con OTP (magic link o código de 6 dígitos).
- Activar el proveedor **Google OAuth** en Supabase → Authentication → Providers.
- Crear credenciales OAuth en Google Cloud Console (Client ID + Secret) y pegarlas en Supabase.
- Configurar las **Redirect URLs** en Google Cloud y en Supabase (`https://<tu-dominio>/`, `http://localhost`).

### 1.2 Crear tablas de tracking en Supabase

Ejecutar el siguiente SQL en el editor de Supabase:

```sql
-- Perfil público de cada usuario
CREATE TABLE public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text,
  display_name text,
  avatar_url  text,
  role        text NOT NULL DEFAULT 'student',   -- 'student' | 'admin'
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Trigger: crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Registro de eventos de uso por usuario
CREATE TABLE public.usage_events (
  id          bigserial PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app         text NOT NULL,        -- 'b2' | 'b1' | 'diccionario' | 'chat-voz' | 'lectura'
  event_type  text NOT NULL,        -- 'session_start' | 'word_answered' | 'lookup' | 'audio_sent' | 'session_end'
  payload     jsonb,                -- datos opcionales (palabra, acierto, duración, etc.)
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Índices para el dashboard
CREATE INDEX idx_usage_user    ON public.usage_events(user_id);
CREATE INDEX idx_usage_app     ON public.usage_events(app);
CREATE INDEX idx_usage_created ON public.usage_events(created_at DESC);
```

### 1.3 Row Level Security (RLS)

```sql
-- profiles: cada usuario ve y edita solo su fila; admin ve todo
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);

CREATE POLICY "admin reads all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );

-- usage_events: el usuario inserta sus propios eventos; admin lee todo
ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert own events"
  ON public.usage_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "select own events"
  ON public.usage_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "admin reads all events"
  ON public.usage_events FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
  );
```

### 1.4 Designar el primer administrador

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'ed.urbaez@gmail.com';
```

**Entregable de la etapa:** tablas creadas, RLS activo, Google OAuth configurado, admin asignado. Nada de código frontend modificado.

---

## Etapa 2 — Módulo de autenticación compartido (`auth.js`)

**Objetivo:** un único archivo JS que todos los `.html` importan. Sin duplicar lógica.

### 2.1 Crear `auth.js` en la raíz

Responsabilidades del módulo:

```
auth.js
├── initSupabase()          — crea el cliente Supabase (reutiliza la key existente)
├── getSession()            — devuelve la sesión activa o null
├── signInWithEmail(email)  — envía OTP / magic link
├── verifyOtp(email, token) — verifica el código de 6 dígitos
├── signInWithGoogle()      — inicia flujo OAuth con redirect
├── signOut()               — cierra sesión y recarga
├── onAuthChange(cb)        — suscribe callback a cambios de sesión
└── getProfile()            — obtiene { id, email, display_name, role } del usuario activo
```

### 2.2 Actualizar el modal de auth existente (actualmente solo en B1/B2)

El modal actual tiene:
- Campo email → envío de OTP
- Campo código → verificación

Ampliar para agregar:
- Botón **"Continuar con Google"** (llama a `signInWithGoogle()`)
- Separador visual "— o —"
- Mantener el flujo OTP existente sin cambios

### 2.3 Replicar el botón 👤 y el modal en las páginas que aún no lo tienen

Páginas que requieren el botón: `diccionario.html`, `chat-voz.html`, `lectura veloz.html`.

### 2.4 Comportamiento post-login

| Rol | Comportamiento |
|---|---|
| `student` | Se cierra el modal, el botón 👤 muestra el avatar o inicial del nombre |
| `admin` | Ídem + aparece un enlace "Dashboard →" en el dropdown del navbar |

**Entregable de la etapa:** cualquier usuario puede registrarse o iniciar sesión desde cualquier página. La sesión persiste entre páginas.

---

## Etapa 3 — Tracking de uso

**Objetivo:** registrar automáticamente los eventos clave de cada app sin que el usuario lo note.

### 3.1 Función helper en `auth.js`

```js
export async function logEvent(app, eventType, payload = {}) {
  const session = await getSession();
  if (!session) return;                       // sin sesión → no registrar
  await supabase.from('usage_events').insert({
    user_id:    session.user.id,
    app,
    event_type: eventType,
    payload
  });
}
```

### 3.2 Puntos de instrumentación por app

#### `palabrasB2.html` y `B1.html`

| Evento | `event_type` | `payload` |
|---|---|---|
| Inicia sesión de práctica | `session_start` | `{ app_version }` |
| Responde una palabra | `word_answered` | `{ word_de, correct: bool }` |
| Activa Modo Auto | `mode_change` | `{ mode: 'auto', active: true }` |

#### `diccionario.html`

| Evento | `event_type` | `payload` |
|---|---|---|
| Busca una palabra | `lookup` | `{ word, source: 'cache' \| 'supabase' \| 'api' }` |

#### `chat-voz.html`

| Evento | `event_type` | `payload` |
|---|---|---|
| Envía audio | `audio_sent` | `{ level, duration_ms }` |

#### `lectura veloz.html`

| Evento | `event_type` | `payload` |
|---|---|---|
| Inicia lectura | `session_start` | `{ wpm, text_length }` |
| Pausa / termina | `session_end` | `{ words_read }` |

### 3.3 Privacidad

- Solo se registra si el usuario está autenticado.
- Los eventos no contienen contenido privado del usuario (no se guarda el texto del audio, solo duración).
- No se trackea si el usuario no ha iniciado sesión.

**Entregable de la etapa:** tabla `usage_events` acumulando datos reales de uso.

---

## Etapa 4 — Dashboard de administración

**Objetivo:** página independiente, fuera de la estructura de las apps de estudio.

### 4.1 Crear `admin/index.html`

Ruta: `admin/index.html` → accesible en `https://<dominio>/admin/`.

> Esta página NO forma parte del navbar de las apps de estudio. Es un acceso directo solo para el administrador.

Estructura de la página:

```
admin/index.html
├── Verificación de rol al cargar (redirige si role ≠ 'admin')
├── Header: título + botón cerrar sesión
└── Main (4 secciones / cards):
    ├── 1. Resumen general
    │   ├── Total usuarios registrados
    │   ├── Usuarios activos (últimas 24 h / 7 días)
    │   └── Total eventos registrados
    ├── 2. Actividad por app (gráfico de barras simple)
    │   └── Conteo de eventos agrupado por `app`
    ├── 3. Tabla de usuarios
    │   ├── Avatar / nombre / email / fecha de registro / última actividad
    │   └── Buscador por nombre o email
    └── 4. Detalle de un usuario
        └── Al hacer clic en una fila → lista de eventos cronológicos
```

### 4.2 Queries Supabase para el dashboard

```js
// Resumen general
const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

const since7d = new Date(Date.now() - 7 * 864e5).toISOString();
const { data: activeUsers } = await supabase
  .from('usage_events')
  .select('user_id')
  .gte('created_at', since7d);
const uniqueActive = new Set(activeUsers.map(r => r.user_id)).size;

// Actividad por app
const { data: byApp } = await supabase
  .from('usage_events')
  .select('app, id.count()')   // Supabase aggregate via PostgREST
  .group('app');               // equivale a GROUP BY app

// Lista de usuarios con última actividad
const { data: users } = await supabase
  .from('profiles')
  .select('id, email, display_name, avatar_url, created_at')
  .order('created_at', { ascending: false });
```

### 4.3 Seguridad

- Al cargar `admin/index.html`: llama `getProfile()` → si `role !== 'admin'` redirige a `/`.
- Las RLS del paso 1.3 garantizan que aunque alguien puentee el redirect, Supabase no devuelva datos de otros usuarios.
- El dashboard NO tiene serverless functions propias; consulta Supabase directamente (la anon key es suficiente con RLS).

### 4.4 Estilo

- Usar `styles.css` del proyecto para consistencia visual (ya tiene modo oscuro).
- **No** añadir el navbar de las apps de estudio. Header propio minimalista.
- Sin frameworks adicionales — HTML/CSS/JS vanilla.

**Entregable de la etapa:** dashboard funcional en `/admin/` mostrando datos reales.

---

## Etapa 5 — Pulido y hardening

**Objetivo:** preparar el sistema para uso real con estudiantes.

### 5.1 Proteger el acceso a las apps (opcional pero recomendado)

Decidir la política de acceso:
- **Opción A (abierto):** las apps funcionan sin login; el tracking simplemente no se activa.
- **Opción B (restringido):** mostrar el modal de login al cargar si no hay sesión activa (recomendado si es un curso privado).

### 5.2 Proteger la API con el JWT de Supabase

Pasar el token de sesión en el header `Authorization: Bearer <jwt>` al llamar a `/api/chat` y `/api/whisper`. Verificar el JWT en el serverless function con la clave `SUPABASE_JWT_SECRET` (disponible en Supabase → Settings → API).

Esto reemplaza el rate limit por IP con un rate limit real por usuario autenticado.

### 5.3 Invitaciones / gestión de usuarios

- Añadir en el dashboard un formulario "Invitar alumno" que llame a `supabase.auth.admin.inviteUserByEmail()` desde un serverless function `api/admin-invite.js` (requiere `SUPABASE_SERVICE_ROLE_KEY` en Vercel, nunca en el frontend).

### 5.4 Añadir `admin/` al CLAUDE.md y README.md

Actualizar la tabla de Active Files con los nuevos archivos.

**Entregable de la etapa:** sistema listo para producción.

---

## Resumen de archivos a crear / modificar

| Archivo | Acción | Etapa |
|---|---|---|
| SQL en Supabase | Crear tablas + RLS | 1 |
| `auth.js` | Crear | 2 |
| `styles.css` | Añadir estilos botón Google + ajustes modal | 2 |
| `palabrasB2.html` | Importar `auth.js`, actualizar modal | 2 |
| `B1.html` | Importar `auth.js`, actualizar modal | 2 |
| `diccionario.html` | Añadir botón 👤 + modal | 2 |
| `chat-voz.html` | Añadir botón 👤 + modal | 2 |
| `lectura veloz.html` | Añadir botón 👤 + modal | 2 |
| `palabrasB2.html` | Añadir llamadas a `logEvent()` | 3 |
| `B1.html` | Añadir llamadas a `logEvent()` | 3 |
| `diccionario.js` | Añadir llamadas a `logEvent()` | 3 |
| `chat-voz.html` | Añadir llamadas a `logEvent()` | 3 |
| `lectura veloz.html` | Añadir llamadas a `logEvent()` | 3 |
| `admin/index.html` | Crear | 4 |
| `admin/admin.js` | Crear | 4 |
| `admin/admin.css` | Crear | 4 |
| `api/admin-invite.js` | Crear (opcional) | 5 |
| `CLAUDE.md` | Actualizar tabla Active Files | 5 |
| `README.md` | Actualizar sección Apps/Deploy | 5 |

---

## Dependencias entre etapas

```
Etapa 1 → Etapa 2 → Etapa 3 → Etapa 4 → Etapa 5
   ↑           ↑
Supabase    auth.js
configurado compartido
```

Cada etapa puede desplegarse en Vercel y probarse en producción antes de continuar.
