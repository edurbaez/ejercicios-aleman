-- Admin dashboard needs to read every student's reading-comprehension and
-- grammar-practice completion counts. Existing policies on these tables only
-- let each user read their own rows; this adds an extra permissive SELECT
-- policy for admins, same pattern as 014_admin_read_srs_grammar_progress.sql.
CREATE POLICY "user_reading_seen: admin read all"
  ON public.user_reading_seen FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "user_grammar_practice_seen: admin read all"
  ON public.user_grammar_practice_seen FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));
