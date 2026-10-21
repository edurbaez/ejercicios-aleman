-- 001 only allowed app_id 'b1'/'b2' (+ 'shared' in word_lists), but the quiz apps
-- A1–C2 write a1/a2/c1/c2 to word_lists and srs_progress (shared-game.js), and
-- api/vocab-refresh.js writes system lists for every level. Without this the SRS
-- sync of those four levels fails silently (client try/catch).
-- Constraint names are dropped dynamically because production may already differ.

DO $$
DECLARE c record;
BEGIN
    FOR c IN
        SELECT conrelid::regclass AS tbl, conname
        FROM pg_constraint
        WHERE contype = 'c'
          AND conrelid IN ('public.word_lists'::regclass, 'public.srs_progress'::regclass)
          AND pg_get_constraintdef(oid) ILIKE '%app_id%'
    LOOP
        EXECUTE format('ALTER TABLE %s DROP CONSTRAINT %I', c.tbl, c.conname);
    END LOOP;
END $$;

ALTER TABLE public.word_lists
    ADD CONSTRAINT word_lists_app_id_check
    CHECK (app_id IN ('a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'shared'));

ALTER TABLE public.srs_progress
    ADD CONSTRAINT srs_progress_app_id_check
    CHECK (app_id IN ('a1', 'a2', 'b1', 'b2', 'c1', 'c2'));
