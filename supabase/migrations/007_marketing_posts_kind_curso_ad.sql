-- marketing_posts: widen the kind CHECK constraint to include 'infografia' (already used by
-- marketing/contenido.html but missing from the original 004 migration) and 'curso_ad' (new
-- "Publicidad de curso" tab).
ALTER TABLE public.marketing_posts DROP CONSTRAINT IF EXISTS marketing_posts_kind_check;
ALTER TABLE public.marketing_posts
  ADD CONSTRAINT marketing_posts_kind_check
  CHECK (kind IN ('carrusel','reel','testimonio','infografia','curso_ad','email'));
