-- Hourly push reminders driven by Supabase itself (replaces cron-job.org).
-- pg_cron calls /api/push-notify via pg_net with the CRON_SECRET read from Vault,
-- so the secret never lives in this file.
--
-- Prerequisite (run once, by hand, with the real value of Vercel's CRON_SECRET):
--   select vault.create_secret('<CRON_SECRET>', 'push_cron_secret');
-- To rotate later:
--   select vault.update_secret(id, '<new>') from vault.secrets where name = 'push_cron_secret';

create extension if not exists pg_net;
create extension if not exists pg_cron;

-- cron.schedule upserts by job name, so re-running this migration is safe.
select cron.schedule(
  'push-notify-hourly',
  '0 * * * *',
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

-- Check results after the next full hour:
--   select status_code, content, created from net._http_response order by created desc limit 5;
