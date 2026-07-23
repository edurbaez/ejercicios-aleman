-- Adds format_version to reading_texts so Leseverstehen sessions can migrate to the
-- Teile-based format (see lecturaplan.md) level by level without invalidating existing
-- rows or breaking user_reading_seen history.
-- format_version = 1: legacy flat format (questions = [{pregunta, opciones[4], correcta}])
-- format_version = 2: Teile format (questions = { teile: [...] }, see lecturaplan.md §4)
ALTER TABLE public.reading_texts
  ADD COLUMN IF NOT EXISTS format_version integer NOT NULL DEFAULT 1;
