// Appointment request checks.
//
// The clinic site runs in two shapes:
//   * server-backed (Lovable preview/publish, Nitro builds) where
//     POST /api/appointment-check applies the authoritative per-phone/per-IP limit
//   * static hosting (GitHub Pages) where no server exists at all
//
// The form always calls checkAppointmentRequest(). When the endpoint answers with
// JSON the server verdict is used; when the request cannot reach a server the check
// falls back to a browser-side limit so a patient still gets a clear message instead
// of a dead form.

export type AppointmentCheckResult = { allowed: true } | { allowed: false; error: string };

type AppointmentCheckPayload = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  reason: string;
  message: string;
};

const GENERIC_ERROR = "We could not prepare your request. Please call the clinic.";
const THROTTLED_ERROR =
  "Too many requests were prepared recently. Please wait an hour or call the clinic.";

const LOCAL_STORAGE_KEY = "siva:appointment-requests";
const LOCAL_LIMIT = 3;
const LOCAL_WINDOW_MS = 60 * 60 * 1000;

type LocalRecord = { phone: string; at: number };

function readRecords(): LocalRecord[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - LOCAL_WINDOW_MS;
    return parsed.filter(
      (entry): entry is LocalRecord =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as LocalRecord).phone === "string" &&
        typeof (entry as LocalRecord).at === "number" &&
        (entry as LocalRecord).at > cutoff,
    );
  } catch {
    // Private browsing or a disabled store must never block a patient.
    return [];
  }
}

function writeRecords(records: LocalRecord[]): void {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Ignore: the limit is a convenience, not a requirement.
  }
}

function checkWithoutServer(payload: AppointmentCheckPayload): AppointmentCheckResult {
  const phone = payload.phone.replace(/\D/g, "").slice(-10);
  const recent = readRecords();
  const attempts = recent.filter((record) => record.phone === phone).length;

  if (attempts >= LOCAL_LIMIT) return { allowed: false, error: THROTTLED_ERROR };

  writeRecords([...recent, { phone, at: Date.now() }]);
  return { allowed: true };
}

export async function checkAppointmentRequest(
  payload: AppointmentCheckPayload,
): Promise<AppointmentCheckResult> {
  try {
    const response = await fetch("/api/appointment-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const contentType = response.headers.get("content-type") ?? "";

    // Static hosting answers with the site's own HTML/404 page, not JSON.
    if (!contentType.includes("application/json")) return checkWithoutServer(payload);

    const result = (await response.json()) as { allowed?: boolean; error?: string };
    if (response.ok && result.allowed) return { allowed: true };
    if (response.status === 404 || response.status === 405) return checkWithoutServer(payload);

    return { allowed: false, error: result.error ?? GENERIC_ERROR };
  } catch {
    // Offline, blocked, or no server route: fall back to the browser-side limit.
    return checkWithoutServer(payload);
  }
}
