-- reading_texts stays write-only for the service role: AI-generated texts are
-- inserted server-side by /api/chat (action: 'generate-reading'), not by the client.
-- Drops the client INSERT policy if a previous version of this migration created it.
DROP POLICY IF EXISTS "reading_texts: authenticated insert" ON public.reading_texts;
