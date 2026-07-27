-- grammar_practice_exercises: AI-generated practice sentences per grammar rule (gramatica.html)
CREATE TABLE IF NOT EXISTS public.grammar_practice_exercises (
  id         uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id    text        NOT NULL,
  level      text        NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  oraciones  jsonb       NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Fast lookups by rule
CREATE INDEX IF NOT EXISTS grammar_practice_exercises_rule_idx
  ON public.grammar_practice_exercises (rule_id);

ALTER TABLE public.grammar_practice_exercises ENABLE ROW LEVEL SECURITY;

-- Exercise sets are publicly readable (no auth required)
CREATE POLICY "grammar_practice_exercises: public read"
  ON public.grammar_practice_exercises FOR SELECT
  USING (true);

-- Only service role can write (no policy = denied for authenticated/anon users)

-- ──────────────────────────────────────────────────────────────

-- user_grammar_practice_seen: tracks which exercise sets each user has already practiced
CREATE TABLE IF NOT EXISTS public.user_grammar_practice_seen (
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id uuid        NOT NULL REFERENCES public.grammar_practice_exercises(id) ON DELETE CASCADE,
  seen_at     timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exercise_id)
);

-- Fast lookups by user
CREATE INDEX IF NOT EXISTS user_grammar_practice_seen_user_idx
  ON public.user_grammar_practice_seen (user_id);

ALTER TABLE public.user_grammar_practice_seen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_grammar_practice_seen: users manage own data"
  ON public.user_grammar_practice_seen FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
