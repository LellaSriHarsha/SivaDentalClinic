CREATE TABLE public.appointment_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_fingerprint TEXT NOT NULL CHECK (char_length(phone_fingerprint) = 64),
  ip_fingerprint TEXT NOT NULL CHECK (char_length(ip_fingerprint) = 64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.appointment_rate_limits TO service_role;
ALTER TABLE public.appointment_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE INDEX appointment_rate_limits_phone_created_idx
  ON public.appointment_rate_limits (phone_fingerprint, created_at DESC);
CREATE INDEX appointment_rate_limits_ip_created_idx
  ON public.appointment_rate_limits (ip_fingerprint, created_at DESC);

CREATE OR REPLACE FUNCTION public.check_appointment_rate_limit(
  _phone_fingerprint TEXT,
  _ip_fingerprint TEXT,
  _limit INTEGER DEFAULT 3,
  _window INTERVAL DEFAULT interval '1 hour'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(_phone_fingerprint), hashtext(_ip_fingerprint));

  DELETE FROM public.appointment_rate_limits
  WHERE created_at < now() - interval '24 hours';

  SELECT count(*) INTO recent_count
  FROM public.appointment_rate_limits
  WHERE created_at >= now() - _window
    AND (phone_fingerprint = _phone_fingerprint OR ip_fingerprint = _ip_fingerprint);

  IF recent_count >= _limit THEN
    RETURN FALSE;
  END IF;

  INSERT INTO public.appointment_rate_limits (phone_fingerprint, ip_fingerprint)
  VALUES (_phone_fingerprint, _ip_fingerprint);

  RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.check_appointment_rate_limit(TEXT, TEXT, INTEGER, INTERVAL) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_appointment_rate_limit(TEXT, TEXT, INTEGER, INTERVAL) TO service_role;