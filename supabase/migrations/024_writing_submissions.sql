-- Textos corregidos en escritura.html. Hasta ahora solo vivían en el IndexedDB del alumno
-- (usage_events solo guarda nivel/tipo/nota), así que el profesor no podía revisar lo que
-- escribieron las tareas del plan de 30 días. admin/index.html los muestra en el detalle del alumno.

create table if not exists public.writing_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level text not null,
  tipo text,
  modo text not null check (modo in ('texto', 'foto')),
  -- { titulo, situacion, puntos[], registro, tipoNombre, min_palabras, max_palabras }
  tarea jsonb not null,
  -- En modo 'foto' es la transcripción del manuscrito que devuelve /api/vision.
  texto text not null,
  palabras integer,
  puntuacion integer,
  evaluacion jsonb,
  created_at timestamptz not null default now()
);

create index if not exists writing_submissions_user_created_idx
  on public.writing_submissions (user_id, created_at desc);

alter table public.writing_submissions enable row level security;

create policy "insert own writing submission"
  on public.writing_submissions for insert
  with check (auth.uid() = user_id and public.is_access_valid(auth.uid()));

create policy "select own writing submission"
  on public.writing_submissions for select
  using (auth.uid() = user_id);

create policy "admin select all writing submissions"
  on public.writing_submissions for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
