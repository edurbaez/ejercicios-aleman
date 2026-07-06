-- Marketing KPI views. All use security_invoker so the RLS of the underlying
-- tables applies: admins (is_admin() policies) see everything, other users
-- only their own rows — the /marketing/ pages are admin-gated anyway.

-- 1. New signups per week
CREATE OR REPLACE VIEW public.marketing_weekly_signups
WITH (security_invoker = true) AS
SELECT date_trunc('week', created_at)::date AS week,
       count(*)::int                        AS signups
FROM public.profiles
GROUP BY 1
ORDER BY 1;

-- 2. Weekly activity: distinct active users + events per week
CREATE OR REPLACE VIEW public.marketing_weekly_active
WITH (security_invoker = true) AS
SELECT date_trunc('week', created_at)::date AS week,
       count(DISTINCT user_id)::int         AS active_users,
       count(*)::int                        AS events
FROM public.usage_events
GROUP BY 1
ORDER BY 1;

-- 3. Usage per app (all-time and last 30 days)
CREATE OR REPLACE VIEW public.marketing_app_usage
WITH (security_invoker = true) AS
SELECT app,
       count(*)::int AS events_total,
       count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS events_30d,
       count(DISTINCT user_id)::int AS users_total,
       count(DISTINCT user_id) FILTER (WHERE created_at > now() - interval '30 days')::int AS users_30d
FROM public.usage_events
GROUP BY app
ORDER BY events_30d DESC;

-- 4. One-row summary: totals, active 7/30 days, simple retention
--    retained_2w = users active in >= 2 distinct weeks within the last 8 weeks
CREATE OR REPLACE VIEW public.marketing_summary
WITH (security_invoker = true) AS
SELECT
  (SELECT count(*)::int FROM public.profiles) AS total_users,
  (SELECT count(DISTINCT user_id)::int FROM public.usage_events
    WHERE created_at > now() - interval '7 days')  AS active_7d,
  (SELECT count(DISTINCT user_id)::int FROM public.usage_events
    WHERE created_at > now() - interval '30 days') AS active_30d,
  (SELECT count(*)::int FROM (
     SELECT user_id FROM public.usage_events
     WHERE created_at > now() - interval '56 days'
     GROUP BY user_id
     HAVING count(DISTINCT date_trunc('week', created_at)) >= 2) t) AS retained_2w,
  (SELECT count(DISTINCT user_id)::int FROM public.usage_events
    WHERE created_at > now() - interval '56 days') AS active_8w;
