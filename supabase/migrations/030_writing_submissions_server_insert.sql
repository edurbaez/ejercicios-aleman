-- writing_submissions is what the teacher reviews in admin/index.html. Its score used to
-- be computed and inserted by the browser, so a student could store any grade.
-- Now api/chat.js (evaluate-writing) and api/vision.js (type escritura) grade on the
-- server and insert with the service role; clients keep SELECT on their own rows.

DROP POLICY IF EXISTS "insert own writing submission" ON public.writing_submissions;
REVOKE INSERT, UPDATE, DELETE ON public.writing_submissions FROM anon, authenticated;
