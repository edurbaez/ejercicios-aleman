-- Admin replies to feedback_reports, and a plain "mensaje" tipo (default in the feedback modal)
-- alongside the existing bug/sugerencia. See auth.js's feedback modal and admin/index.html's
-- "Reportes" section.

alter table public.feedback_reports
  drop constraint if exists feedback_reports_tipo_check;
alter table public.feedback_reports
  add constraint feedback_reports_tipo_check check (tipo in ('bug', 'sugerencia', 'mensaje'));

alter table public.feedback_reports add column if not exists respuesta text;
alter table public.feedback_reports add column if not exists respuesta_at timestamptz;
alter table public.feedback_reports add column if not exists respuesta_leida boolean not null default false;

-- Users have no UPDATE policy on this table (only admins do, via "admin update reports").
-- This lets a user ack a reply as read without opening a broader write hole for the row,
-- same security-definer-function pattern as upsert_active_session / upsert_daily_usage_time.
create or replace function public.mark_feedback_seen(p_report_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.feedback_reports
  set respuesta_leida = true
  where id = p_report_id and user_id = auth.uid();
end;
$$;
