-- user_data: adds plan_progress to sync plan.html's 30-day progress across devices.
-- Shape: { [level]: bool[30] }, one entry per CEFR level the user has started —
-- independent per level, so studying several levels at once doesn't collide.

ALTER TABLE user_data ADD COLUMN IF NOT EXISTS plan_progress jsonb NOT NULL DEFAULT '{}'::jsonb;
