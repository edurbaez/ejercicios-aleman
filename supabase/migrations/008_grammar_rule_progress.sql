-- Progreso de repetición espaciada (SM-2) por regla gramatical.
-- A diferencia de srs_progress (que es por palabra y por app b1/b2),
-- las reglas de grammar-data-{level}.js son globales, así que esta tabla
-- no lleva app_id: el mismo rule_id sirve para cualquier app que quiera
-- reutilizar el progreso (hoy solo chat-reformulaciones.html).
CREATE TABLE IF NOT EXISTS public.grammar_rule_progress (
  user_id    uuid    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rule_id    text    NOT NULL,
  ease       numeric NOT NULL DEFAULT 2.5,
  interval   int     NOT NULL DEFAULT 1,
  reps       int     NOT NULL DEFAULT 0,
  due        bigint  NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, rule_id)
);

ALTER TABLE public.grammar_rule_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "grammar_rule_progress: users manage own data"
  ON public.grammar_rule_progress FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE TRIGGER grammar_rule_progress_updated_at
  BEFORE UPDATE ON public.grammar_rule_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
