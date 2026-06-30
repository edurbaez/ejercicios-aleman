-- word_lists: stores built-in (system) and user-created vocabulary lists
CREATE TABLE IF NOT EXISTS public.word_lists (
  id         uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id     text        NOT NULL CHECK (app_id IN ('b1', 'b2', 'shared')),
  name       text        NOT NULL,
  is_system  boolean     NOT NULL DEFAULT false,
  words      jsonb       NOT NULL DEFAULT '{"de":[],"es":[]}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- No duplicate user lists with the same name
CREATE UNIQUE INDEX IF NOT EXISTS word_lists_user_name_idx
  ON public.word_lists (user_id, name) WHERE user_id IS NOT NULL;

-- No duplicate system lists with the same name + app
CREATE UNIQUE INDEX IF NOT EXISTS word_lists_sys_name_idx
  ON public.word_lists (app_id, name) WHERE is_system = true;

ALTER TABLE public.word_lists ENABLE ROW LEVEL SECURITY;

-- System lists are readable by everyone (no auth required)
CREATE POLICY "word_lists: system lists are public"
  ON public.word_lists FOR SELECT
  USING (is_system = true);

-- Authenticated users see their own lists
CREATE POLICY "word_lists: users see own lists"
  ON public.word_lists FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "word_lists: users insert own lists"
  ON public.word_lists FOR INSERT
  WITH CHECK (user_id = auth.uid() AND is_system = false);

CREATE POLICY "word_lists: users update own lists"
  ON public.word_lists FOR UPDATE
  USING (user_id = auth.uid() AND is_system = false);

CREATE POLICY "word_lists: users delete own lists"
  ON public.word_lists FOR DELETE
  USING (user_id = auth.uid() AND is_system = false);

-- updated_at trigger (reuse if already exists from other tables)
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER word_lists_updated_at
  BEFORE UPDATE ON public.word_lists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ──────────────────────────────────────────────────────────────

-- srs_progress: SM-2 spaced-repetition state per user + app + word
CREATE TABLE IF NOT EXISTS public.srs_progress (
  user_id    uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id     text    NOT NULL CHECK (app_id IN ('b1', 'b2')),
  word       text    NOT NULL,
  ease       numeric NOT NULL DEFAULT 2.5,
  interval   int     NOT NULL DEFAULT 1,
  reps       int     NOT NULL DEFAULT 0,
  due        bigint  NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, app_id, word)
);

ALTER TABLE public.srs_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "srs_progress: users manage own data"
  ON public.srs_progress FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER srs_progress_updated_at
  BEFORE UPDATE ON public.srs_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
