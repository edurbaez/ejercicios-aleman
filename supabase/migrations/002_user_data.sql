-- user_data: persistent user preferences per app
-- Creates the table if it doesn't exist; safely adds columns if table already existed.

CREATE TABLE IF NOT EXISTS user_data (
  user_id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_user_profile  text NOT NULL DEFAULT '',
  cv_level         text NOT NULL DEFAULT 'B1',
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Idempotent column additions (for existing tables that had the old schema)
ALTER TABLE user_data ADD COLUMN IF NOT EXISTS cv_user_profile text NOT NULL DEFAULT '';
ALTER TABLE user_data ADD COLUMN IF NOT EXISTS cv_level        text NOT NULL DEFAULT 'B1';

ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own data"   ON user_data;
DROP POLICY IF EXISTS "Users insert own data" ON user_data;
DROP POLICY IF EXISTS "Users update own data" ON user_data;

CREATE POLICY "Users read own data"   ON user_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own data" ON user_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own data" ON user_data FOR UPDATE USING (auth.uid() = user_id);
