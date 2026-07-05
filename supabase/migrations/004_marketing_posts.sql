-- marketing_posts: content pipeline for the marketing generator (admin-only)
CREATE TABLE IF NOT EXISTS public.marketing_posts (
  id           uuid        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind         text        NOT NULL CHECK (kind IN ('carrusel','reel','testimonio','email')),
  tema         text        NOT NULL,
  nivel        text        CHECK (nivel IS NULL OR nivel IN ('A1','A2','B1','B2','C1','C2')),
  contenido    jsonb       NOT NULL DEFAULT '{}',
  caption      text,
  estado       text        NOT NULL DEFAULT 'idea' CHECK (estado IN ('idea','generado','publicado')),
  publish_date date,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS marketing_posts_estado_idx ON public.marketing_posts (estado);
CREATE INDEX IF NOT EXISTS marketing_posts_publish_date_idx ON public.marketing_posts (publish_date);

CREATE OR REPLACE FUNCTION public.marketing_posts_touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS marketing_posts_updated_at ON public.marketing_posts;
CREATE TRIGGER marketing_posts_updated_at
  BEFORE UPDATE ON public.marketing_posts
  FOR EACH ROW EXECUTE FUNCTION public.marketing_posts_touch_updated_at();

ALTER TABLE public.marketing_posts ENABLE ROW LEVEL SECURITY;

-- Only admins (profiles.role = 'admin') can read/write
CREATE POLICY "marketing_posts: admin full access"
  ON public.marketing_posts FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));
