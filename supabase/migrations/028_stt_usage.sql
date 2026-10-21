-- Server-billed voice-STT usage. api/whisper.js inserts one row per successful
-- transcription (service role) and sums today's rows to enforce the shared daily cap,
-- instead of trusting the client-inserted `audio_sent` usage_events (audit S5).
-- No client policies: RLS on with nothing granted means only the service role reads
-- or writes it. Admins read it through the same policy pattern as 014/015.

CREATE TABLE IF NOT EXISTS public.stt_usage (
    id          bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    duration_ms integer     NOT NULL CHECK (duration_ms >= 0),
    created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS stt_usage_user_created_idx
    ON public.stt_usage (user_id, created_at);

ALTER TABLE public.stt_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stt_usage: admins read all"
    ON public.stt_usage FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
