-- Daily active-time tracking per user/app. Local-first: the client accumulates
-- time in localStorage during the day and syncs once, the next time the app is
-- opened on a different day (see auth.js, _dtSyncIfStale). Multiple devices are
-- merged additively via upsert_daily_usage_time instead of overwritten.

create table if not exists public.daily_usage_time (
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  apps jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, date)
);

alter table public.daily_usage_time enable row level security;

create policy "own daily usage time - select"
  on public.daily_usage_time
  for select
  using (auth.uid() = user_id);

-- Admin read, same pattern as migrations 014/015.
create policy "admin read daily usage time"
  on public.daily_usage_time
  for select
  using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  ));

-- Client calls this via supabase-js .rpc(); writes/merges are only possible
-- through this function (security definer, no INSERT/UPDATE policies on the
-- table itself) so a forged user_id in the payload is impossible.
create or replace function public.upsert_daily_usage_time(p_date date, p_apps jsonb)
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

  insert into public.daily_usage_time (user_id, date, apps, updated_at)
  values (v_user_id, p_date, p_apps, now())
  on conflict (user_id, date) do update
  set apps = (
        select coalesce(jsonb_object_agg(k, v), '{}'::jsonb)
        from (
          select k,
                 coalesce((daily_usage_time.apps ->> k)::bigint, 0)
                 + coalesce((p_apps ->> k)::bigint, 0) as v
          from (
            select key as k from jsonb_object_keys(daily_usage_time.apps) as key
            union
            select key as k from jsonb_object_keys(p_apps) as key
          ) all_keys
        ) sums
      ),
      updated_at = now();

  -- Retention: keep only the last 60 days, enforced per-user on their own sync.
  delete from public.daily_usage_time
  where user_id = v_user_id
    and date < (current_date - 60);
end;
$$;

grant execute on function public.upsert_daily_usage_time(date, jsonb) to authenticated;
