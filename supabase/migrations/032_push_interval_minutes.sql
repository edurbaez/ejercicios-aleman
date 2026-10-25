-- Reminder interval in minutes (allows 30 min) + cron every 30 min.
-- interval_hours is kept (written by api/push-subscribe.js as a rounded value) for older clients.

alter table public.push_subscriptions
  add column if not exists interval_minutes int;

update public.push_subscriptions
  set interval_minutes = interval_hours * 60
  where interval_minutes is null;

alter table public.push_subscriptions
  alter column interval_minutes set default 60,
  alter column interval_minutes set not null;

alter table public.push_subscriptions
  drop constraint if exists push_subscriptions_interval_minutes_check;
alter table public.push_subscriptions
  add constraint push_subscriptions_interval_minutes_check check (interval_minutes between 30 and 10080);

-- Replace the hourly job (031) with one every 30 min; push-notify.js applies each user's interval.
select cron.unschedule('push-notify-hourly')
  where exists (select 1 from cron.job where jobname = 'push-notify-hourly');

select cron.schedule(
  'push-notify-30min',
  '*/30 * * * *',
  $$
  select net.http_post(
    url := 'https://ejercicios-aleman-sand.vercel.app/api/push-notify',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        select decrypted_secret from vault.decrypted_secrets where name = 'push_cron_secret'
      )
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $$
);
