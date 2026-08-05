-- Admin dashboard needs to read every student's SRS progress (vocabulary +
-- grammar rules) to show mastery stats in the user detail panel. Existing
-- policies on these tables only let each user read their own rows; this adds
-- an extra permissive SELECT policy for admins (same "profiles.role = 'admin'"
-- check used by marketing_posts in 004_marketing_posts.sql). Postgres ORs
-- permissive policies together, so ordinary users are unaffected.
CREATE POLICY "srs_progress: admin read all"
  ON public.srs_progress FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "grammar_rule_progress: admin read all"
  ON public.grammar_rule_progress FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));
