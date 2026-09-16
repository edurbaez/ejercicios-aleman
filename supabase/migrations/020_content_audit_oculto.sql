-- Lets admins hide AI-generated content (reading_texts, grammar_practice_exercises) that turns
-- out to be inappropriate, without a real DELETE — which would cascade into user_reading_seen /
-- user_grammar_practice_seen (003/012) and lose per-user history. Read paths in lectura veloz.html
-- and gramatica.js filter oculto = false; the new admin audit panel does not, so admins can review
-- and un-hide.
ALTER TABLE public.reading_texts
  ADD COLUMN IF NOT EXISTS oculto boolean NOT NULL DEFAULT false;

ALTER TABLE public.grammar_practice_exercises
  ADD COLUMN IF NOT EXISTS oculto boolean NOT NULL DEFAULT false;

CREATE POLICY "reading_texts: admin update oculto"
  ON public.reading_texts FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "grammar_practice_exercises: admin update oculto"
  ON public.grammar_practice_exercises FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));
