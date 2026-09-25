-- Historial de sesiones de Leseverstehen (Comprensión de "lectura veloz.html").
-- Hasta ahora la puntuación solo vivía en pantalla: ni el alumno ni /admin/ veían
-- evolución en comprensión lectora, a diferencia de mundliche.html/escritura.html, que sí
-- guardan historial (ver lecturaplan.md, "Mejoras de producto posibles").
-- Guarda tanto las sesiones por Teile (format_version 2) como las del flujo plano (1).

create table if not exists public.reading_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null,
  text_id uuid references public.reading_texts(id) on delete set null,
  format_version integer not null default 1,
  aciertos integer not null,
  total integer not null,
  duracion_seg integer,
  modo_examen boolean not null default false,
  -- [{ id, nombre, correct, total }] por Teil; null en el flujo plano (format_version 1)
  teile jsonb,
  created_at timestamptz not null default now()
);

create index if not exists reading_sessions_user_created_idx
  on public.reading_sessions (user_id, created_at desc);

alter table public.reading_sessions enable row level security;

-- INSERT lleva is_access_valid() como defensa en profundidad, igual que las tablas de
-- progreso reforzadas en la migración 009.
create policy "insert own reading session"
  on public.reading_sessions for insert
  with check (auth.uid() = user_id and public.is_access_valid(auth.uid()));

create policy "select own reading session"
  on public.reading_sessions for select
  using (auth.uid() = user_id);

-- Mismo patrón que 014-018: el admin lee todas las filas para el panel de detalle de alumno.
create policy "admin select all reading sessions"
  on public.reading_sessions for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
