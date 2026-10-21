-- admin/index.html downloaded raw rows of per-user tables with .limit(20000), but
-- PostgREST caps responses at 1000 rows, so its per-user stats were silently
-- truncated (audit D3). These views return one row per user instead.
-- security_invoker: the RLS of the underlying tables applies (admins read all via
-- migrations 014/015; anyone else only gets their own rows).

CREATE OR REPLACE VIEW public.admin_srs_summary
WITH (security_invoker = true) AS
SELECT user_id,
       count(*)::int                          AS total,
       count(*) FILTER (WHERE reps >= 2)::int AS mastered
FROM public.srs_progress
GROUP BY user_id;

CREATE OR REPLACE VIEW public.admin_grammar_summary
WITH (security_invoker = true) AS
SELECT user_id,
       count(*)::int                          AS total,
       count(*) FILTER (WHERE reps >= 2)::int AS mastered
FROM public.grammar_rule_progress
GROUP BY user_id;

CREATE OR REPLACE VIEW public.admin_reading_seen_counts
WITH (security_invoker = true) AS
SELECT user_id, count(*)::int AS n
FROM public.user_reading_seen
GROUP BY user_id;

-- Excludes kasus.html sets, which share the bank table but aren't gramatica.html practice.
CREATE OR REPLACE VIEW public.admin_grammar_practice_counts
WITH (security_invoker = true) AS
SELECT s.user_id, count(*)::int AS n
FROM public.user_grammar_practice_seen s
JOIN public.grammar_practice_exercises e ON e.id = s.exercise_id
WHERE e.rule_id NOT LIKE 'kasus:%'
GROUP BY s.user_id;

-- Audit D4: usage_events is filtered by (user_id, event_type, created_at) by the voice
-- cap, the four voice apps, auth.js stats and admin; exam_results by user + date.
CREATE INDEX IF NOT EXISTS usage_events_user_type_created_idx
    ON public.usage_events (user_id, event_type, created_at);
CREATE INDEX IF NOT EXISTS usage_events_created_idx
    ON public.usage_events (created_at DESC);
CREATE INDEX IF NOT EXISTS exam_results_user_created_idx
    ON public.exam_results (user_id, created_at);
