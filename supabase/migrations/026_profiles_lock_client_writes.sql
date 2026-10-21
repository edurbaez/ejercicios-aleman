-- profiles was created directly in Supabase (no tracked migration). Supabase's
-- template ships a "users can update own profile" policy; with it a student could
-- set role='admin' or access_expires_at=NULL on their own row, and every admin RLS
-- policy (004, 014-024) plus the access gate trust these columns.
--
-- No client code writes profiles: handle_new_user() (SECURITY DEFINER) creates the
-- row and api/admin.js changes it with the service role. So clients lose every write
-- privilege, and a trigger guards the sensitive columns as a second layer in case a
-- grant is re-added later from the dashboard.

DO $$
DECLARE pol record;
BEGIN
    FOR pol IN
        SELECT policyname FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'profiles'
          AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
    LOOP
        EXECUTE format('DROP POLICY %I ON public.profiles', pol.policyname);
    END LOOP;
END $$;

REVOKE INSERT, UPDATE, DELETE ON public.profiles FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.profiles_guard_privileged_columns()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF current_user IN ('anon', 'authenticated') AND (
        TG_OP = 'INSERT'
        OR NEW.role IS DISTINCT FROM OLD.role
        OR NEW.status IS DISTINCT FROM OLD.status
        OR NEW.access_expires_at IS DISTINCT FROM OLD.access_expires_at
    ) THEN
        RAISE EXCEPTION 'profiles: role/status/access_expires_at can only be changed by the server';
    END IF;
    RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS profiles_guard_privileged_columns ON public.profiles;
CREATE TRIGGER profiles_guard_privileged_columns
    BEFORE INSERT OR UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.profiles_guard_privileged_columns();
