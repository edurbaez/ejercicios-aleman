-- Access control: time-limited access per user, admin-controlled.
-- Reinterprets profiles.status (from migrations/add_user_status.sql):
--   'blocked'  -> always denied, regardless of access_expires_at (admin override)
--   'pending'/'approved' -> access allowed until access_expires_at (NULL = unlimited)
-- New signups get an automatic 15-day trial via access_expires_at.

-- 1. New column: NULL = unlimited access.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS access_expires_at timestamptz;

-- 2. Grandfather already-approved users: unlimited access, no disruption.
UPDATE public.profiles
  SET access_expires_at = NULL
  WHERE status = 'approved' AND access_expires_at IS NULL;

-- 3. Single source of truth for access validity, reused by RLS policies below.
--    Reads the caller's own profile row (same access pattern auth.js already
--    relies on for `_getRole()`), so it does not need SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.is_access_valid(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT status <> 'blocked' AND (access_expires_at IS NULL OR access_expires_at > now())
  FROM public.profiles
  WHERE id = p_user_id
$$;

-- 4. New signups: 15-day automatic trial instead of indefinite 'pending'.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role, status, access_expires_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    'student',
    'pending',
    now() + interval '15 days'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 5. Defense-in-depth: block writes (not reads) from expired/blocked users on
--    their own data, in case the client-side/server-side gates are bypassed.
--    SELECT/DELETE policies are left untouched so history stays readable.

-- word_lists: existing INSERT/UPDATE policies gain the access check.
DROP POLICY IF EXISTS "word_lists: users insert own lists" ON public.word_lists;
CREATE POLICY "word_lists: users insert own lists"
  ON public.word_lists FOR INSERT
  WITH CHECK (user_id = auth.uid() AND is_system = false AND public.is_access_valid(auth.uid()));

DROP POLICY IF EXISTS "word_lists: users update own lists" ON public.word_lists;
CREATE POLICY "word_lists: users update own lists"
  ON public.word_lists FOR UPDATE
  USING (user_id = auth.uid() AND is_system = false)
  WITH CHECK (user_id = auth.uid() AND is_system = false AND public.is_access_valid(auth.uid()));

-- srs_progress: split the old FOR ALL policy so SELECT/DELETE stay open.
DROP POLICY IF EXISTS "srs_progress: users manage own data" ON public.srs_progress;
CREATE POLICY "srs_progress: users select own data"
  ON public.srs_progress FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "srs_progress: users delete own data"
  ON public.srs_progress FOR DELETE
  USING (user_id = auth.uid());
CREATE POLICY "srs_progress: users insert own data"
  ON public.srs_progress FOR INSERT
  WITH CHECK (user_id = auth.uid() AND public.is_access_valid(auth.uid()));
CREATE POLICY "srs_progress: users update own data"
  ON public.srs_progress FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid() AND public.is_access_valid(auth.uid()));

-- grammar_rule_progress: same split as srs_progress.
DROP POLICY IF EXISTS "grammar_rule_progress: users manage own data" ON public.grammar_rule_progress;
CREATE POLICY "grammar_rule_progress: users select own data"
  ON public.grammar_rule_progress FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "grammar_rule_progress: users delete own data"
  ON public.grammar_rule_progress FOR DELETE
  USING (user_id = auth.uid());
CREATE POLICY "grammar_rule_progress: users insert own data"
  ON public.grammar_rule_progress FOR INSERT
  WITH CHECK (user_id = auth.uid() AND public.is_access_valid(auth.uid()));
CREATE POLICY "grammar_rule_progress: users update own data"
  ON public.grammar_rule_progress FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid() AND public.is_access_valid(auth.uid()));

-- user_reading_seen: same split.
DROP POLICY IF EXISTS "user_reading_seen: users manage own data" ON public.user_reading_seen;
CREATE POLICY "user_reading_seen: users select own data"
  ON public.user_reading_seen FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "user_reading_seen: users delete own data"
  ON public.user_reading_seen FOR DELETE
  USING (user_id = auth.uid());
CREATE POLICY "user_reading_seen: users insert own data"
  ON public.user_reading_seen FOR INSERT
  WITH CHECK (user_id = auth.uid() AND public.is_access_valid(auth.uid()));

-- user_data: this table also had a pre-existing "own data" FOR ALL policy
-- (added directly in Supabase, not tracked in any repo migration) with
-- WITH CHECK (auth.uid() = user_id) and no access check. RLS policies are
-- permissive/OR'd, so leaving it in place would let a blocked/expired user
-- bypass the gated policies below entirely. It's fully superseded by the
-- three split policies (select/insert/update) that follow, so drop it.
DROP POLICY IF EXISTS "own data" ON public.user_data;

-- user_data: existing INSERT/UPDATE policies gain the access check.
DROP POLICY IF EXISTS "Users insert own data" ON public.user_data;
CREATE POLICY "Users insert own data"
  ON public.user_data FOR INSERT
  WITH CHECK (auth.uid() = user_id AND public.is_access_valid(auth.uid()));

DROP POLICY IF EXISTS "Users update own data" ON public.user_data;
CREATE POLICY "Users update own data"
  ON public.user_data FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND public.is_access_valid(auth.uid()));
