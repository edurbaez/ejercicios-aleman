-- diccionario_cache is shared by every user (diccionario.html, lectura veloz.html).
-- Clients used to upsert it directly, which allowed stored XSS across users.
-- From now on only api/chat.js (action lookup-word, service role) writes it;
-- clients keep read access.
--
-- The table was created directly in Supabase (no tracked migration), so its
-- current policies are unknown: drop all of them and recreate SELECT only.

ALTER TABLE public.diccionario_cache ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE pol record;
BEGIN
    FOR pol IN
        SELECT policyname FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'diccionario_cache'
    LOOP
        EXECUTE format('DROP POLICY %I ON public.diccionario_cache', pol.policyname);
    END LOOP;
END $$;

CREATE POLICY "diccionario_cache read"
    ON public.diccionario_cache FOR SELECT
    TO anon, authenticated
    USING (true);

REVOKE INSERT, UPDATE, DELETE ON public.diccionario_cache FROM anon, authenticated;

-- Clean entries poisoned before this migration.
DELETE FROM public.diccionario_cache
WHERE palabra ~ '[<>]'
   OR traduccion ~ '[<>]'
   OR definicion ~ '[<>]'
   OR antonimo ~ '[<>]'
   OR sinonimos::text ~ '[<>]';
