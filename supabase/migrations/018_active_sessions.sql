-- Device/session tracking to detect concurrent usage (same account active on
-- 2+ devices at once). Each browser gets a stable device id (localStorage,
-- see auth.js _asDeviceId) that upserts its own row every ~60s while a tab is
-- visible and signed in. Admins read this in admin/index.html's user detail
-- panel; a row is considered "active now" if last_seen is within the last
-- 2 minutes (2x the client heartbeat interval).

create table if not exists public.active_sessions (
  session_id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  device text not null,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists active_sessions_user_id_idx on public.active_sessions (user_id);

alter table public.active_sessions enable row level security;

create policy "own active sessions - select"
  on public.active_sessions
  for select
  using (auth.uid() = user_id);

-- Admin read, same pattern as migrations 014/015/016.
create policy "admin read active sessions"
  on public.active_sessions
  for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- Client calls this via supabase-js .rpc(); writes are only possible through
-- this function (security definer, no INSERT/UPDATE policies on the table
-- itself) so a forged user_id in the payload is impossible.
create or replace function public.upsert_active_session(p_session_id uuid, p_device text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  insert into public.active_sessions (session_id, user_id, device, last_seen)
  values (p_session_id, v_user_id, left(p_device, 120), now())
  on conflict (session_id) do update
  set user_id = v_user_id,
      device = left(p_device, 120),
      last_seen = now();

  -- Retention: drop this user's own devices once inactive for a week.
  delete from public.active_sessions
  where user_id = v_user_id
    and session_id <> p_session_id
    and last_seen < (now() - interval '7 days');
end;
$$;

grant execute on function public.upsert_active_session(uuid, text) to authenticated;
