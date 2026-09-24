-- Trial por dispositivo: impide que el mismo navegador encadene cuentas desechables
-- para renovar el trial automático de 15 días que da handle_new_user().
--
-- El id de dispositivo es el mismo `ejaleman_device_id` que ya usa active_sessions
-- (migración 018): un uuid generado una vez por navegador y guardado en localStorage.
-- Borrarlo renueva el trial, así que esto frena al abusador casual, no al determinado.
-- La barrera real para el registro público sigue siendo el cobro.

create table if not exists public.device_trials (
    device_id  uuid primary key,
    user_id    uuid not null references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

create index if not exists device_trials_user_id_idx on public.device_trials(user_id);

alter table public.device_trials enable row level security;

drop policy if exists "device_trials select own" on public.device_trials;
create policy "device_trials select own" on public.device_trials
    for select using (auth.uid() = user_id);

drop policy if exists "device_trials select admin" on public.device_trials;
create policy "device_trials select admin" on public.device_trials
    for select using (
        exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
    );

-- Sin policies de INSERT/UPDATE: sólo esta función escribe (mismo patrón que
-- upsert_active_session en 018 y upsert_daily_usage_time en 016).
--
-- Devuelve true si el dispositivo puede usar (o ya está usando) su trial con esta
-- cuenta; false si otra cuenta ya lo gastó, en cuyo caso el trial de la cuenta
-- actual se da por terminado y queda a la espera de que un admin la autorice.
create or replace function public.claim_device_trial(p_device_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
    v_owner  uuid;
    v_status text;
    v_role   text;
begin
    if auth.uid() is null or p_device_id is null then
        return true;
    end if;

    select status, role into v_status, v_role from profiles where id = auth.uid();

    -- Los admins nunca gastan ni chocan con un trial de dispositivo.
    if v_role = 'admin' then
        return true;
    end if;

    select user_id into v_owner from device_trials where device_id = p_device_id;

    if v_owner = auth.uid() then
        return true;
    end if;

    if v_owner is null then
        -- Sólo las cuentas que están de trial marcan el dispositivo: si quien lo usa
        -- ya es un alumno autorizado, el dispositivo queda libre para otra persona
        -- (aula o computadora compartida).
        if v_status is distinct from 'approved' then
            insert into device_trials (device_id, user_id)
            values (p_device_id, auth.uid())
            on conflict (device_id) do nothing;
        end if;
        return true;
    end if;

    -- El dispositivo ya gastó su trial con otra cuenta.
    if v_status is distinct from 'approved' then
        update profiles
           set access_expires_at = now()
         where id = auth.uid()
           and (access_expires_at is null or access_expires_at > now());
        return false;
    end if;

    return true;
end;
$$;

grant execute on function public.claim_device_trial(uuid) to authenticated;
