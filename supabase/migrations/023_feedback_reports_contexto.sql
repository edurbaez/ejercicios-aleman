-- Structured context for feedback reports sent from a specific exercise (e.g. kasus.html's
-- "⚑ Reportar este ejercicio"): { app, set_id, rule_id, frase, respuesta, ... }. Lets the admin
-- "Reportes" section show the exact item and hide its grammar_practice_exercises set (oculto, 020).
-- Covered by the existing "insert own report" policy (017): users can only attach it to their own rows.
alter table public.feedback_reports add column if not exists contexto jsonb;
