-- reading_texts: AI-generated reading comprehension texts per CEFR level
CREATE TABLE IF NOT EXISTS public.reading_texts (
  id         uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level      text        NOT NULL CHECK (level IN ('A1','A2','B1','B2','C1','C2')),
  title      text        NOT NULL,
  content    text        NOT NULL,
  questions  jsonb       NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Fast lookups by level
CREATE INDEX IF NOT EXISTS reading_texts_level_idx
  ON public.reading_texts (level);

ALTER TABLE public.reading_texts ENABLE ROW LEVEL SECURITY;

-- Texts are publicly readable (no auth required)
CREATE POLICY "reading_texts: public read"
  ON public.reading_texts FOR SELECT
  USING (true);

-- Only service role can write (no policy = denied for authenticated/anon users)

-- ──────────────────────────────────────────────────────────────

-- user_reading_seen: tracks which texts each user has already read
CREATE TABLE IF NOT EXISTS public.user_reading_seen (
  user_id  uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text_id  uuid        NOT NULL REFERENCES public.reading_texts(id) ON DELETE CASCADE,
  seen_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, text_id)
);

-- Fast lookups by user
CREATE INDEX IF NOT EXISTS user_reading_seen_user_idx
  ON public.user_reading_seen (user_id);

ALTER TABLE public.user_reading_seen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_reading_seen: users manage own data"
  ON public.user_reading_seen FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
