-- reformulaciones_exercises: Umformung exercises for chat-reformulaciones.html, one row per
-- exercise. Seeded from reformulaciones-data.json (scripts/seed-reformulaciones.js) and grown
-- server-side by /api/chat when a user exhausts a rule's bank, so new ones are reused by everyone.
CREATE TABLE IF NOT EXISTS public.reformulaciones_exercises (
  id          uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level       text        NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  rule_id     text        NOT NULL,
  source      text        NOT NULL,
  instruction text        NOT NULL,
  solutions   jsonb       NOT NULL CHECK (jsonb_typeof(solutions) = 'array' AND jsonb_array_length(solutions) > 0),
  explanation text        NOT NULL,
  oculto      boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reformulaciones_exercises_rule_level_chk CHECK (rule_id LIKE lower(level) || '-%'),
  -- Two users exhausting the same rule at once must not store the same exercise twice.
  CONSTRAINT reformulaciones_exercises_rule_source_key UNIQUE (rule_id, source)
);

CREATE INDEX IF NOT EXISTS reformulaciones_exercises_rule_idx
  ON public.reformulaciones_exercises (rule_id) WHERE NOT oculto;

ALTER TABLE public.reformulaciones_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reformulaciones_exercises: public read"
  ON public.reformulaciones_exercises FOR SELECT
  USING (true);

-- INSERT only via service role (no policy = denied for anon/authenticated).

CREATE POLICY "reformulaciones_exercises: admin update oculto"
  ON public.reformulaciones_exercises FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- ──────────────────────────────────────────────────────────────

-- user_reformulaciones_done: exercises each user answered with ✅. Unlike user_reading_seen,
-- only correct answers are recorded, so ⚠️/❌ exercises come back in later sessions.
CREATE TABLE IF NOT EXISTS public.user_reformulaciones_done (
  user_id      uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id  uuid        NOT NULL REFERENCES public.reformulaciones_exercises(id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS user_reformulaciones_done_user_idx
  ON public.user_reformulaciones_done (user_id);

ALTER TABLE public.user_reformulaciones_done ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_reformulaciones_done: users select own data"
  ON public.user_reformulaciones_done FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "user_reformulaciones_done: users delete own data"
  ON public.user_reformulaciones_done FOR DELETE
  USING (user_id = auth.uid());

CREATE POLICY "user_reformulaciones_done: users insert own data"
  ON public.user_reformulaciones_done FOR INSERT
  WITH CHECK (user_id = auth.uid() AND public.is_access_valid(auth.uid()));
