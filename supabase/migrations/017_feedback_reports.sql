-- Feedback inbox: users report bugs/suggestions, admins triage them like a mailbox
-- (see admin/index.html "Reportes" section and auth.js's floating feedback button).

create table if not exists public.feedback_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tipo text not null check (tipo in ('bug', 'sugerencia')),
  mensaje text not null,
  pagina text,
  estado text not null default 'nuevo' check (estado in ('nuevo', 'leido', 'resuelto')),
  created_at timestamptz not null default now()
);

alter table public.feedback_reports enable row level security;

create policy "insert own report"
  on public.feedback_reports for insert
  with check (auth.uid() = user_id);

create policy "select own report"
  on public.feedback_reports for select
  using (auth.uid() = user_id);

create policy "admin select all reports"
  on public.feedback_reports for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "admin update reports"
  on public.feedback_reports for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
