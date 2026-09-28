import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";
import { z } from "zod";

const TIME_SLOTS = Array.from({ length: 28 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${suffix}`;
});

const requestSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(/^[\p{L} .'-]+$/u),
  phone: z.string().trim().regex(/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/),
  email: z.union([z.literal(""), z.string().trim().email().max(120)]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().refine((value) => TIME_SLOTS.includes(value)),
  reason: z.string().trim().min(1).max(100),
  message: z.string().trim().max(500),
});

function json(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/appointment-check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin && origin !== new URL(request.url).origin) return json({ error: "Request blocked." }, 403);

        const contentLength = Number(request.headers.get("content-length") ?? 0);
        if (contentLength > 4_096) return json({ error: "Request is too large." }, 413);

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid request." }, 400);
        }

        const parsed = requestSchema.safeParse(body);
        if (!parsed.success) return json({ error: "Please check the appointment details." }, 400);

        const requestedDate = new Date(`${parsed.data.date}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (Number.isNaN(requestedDate.getTime()) || requestedDate < today) {
          return json({ error: "Please choose today or a future date." }, 400);
        }

        const forwardedFor = request.headers.get("cf-connecting-ip")
          ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
          ?? "unknown";
        const pepper = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
        const fingerprint = (value: string) => createHash("sha256").update(`${pepper}:${value}`).digest("hex");
        const normalizedPhone = parsed.data.phone.replace(/\D/g, "").slice(-10);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: allowed, error } = await supabaseAdmin.rpc("check_appointment_rate_limit", {
          _phone_fingerprint: fingerprint(normalizedPhone),
          _ip_fingerprint: fingerprint(forwardedFor),
          _limit: 3,
          _window: "01:00:00",
        });

        if (error) {
          console.error("Appointment rate-limit check failed", error.message);
          return json({ error: "We could not prepare your request. Please call the clinic." }, 503);
        }
        if (!allowed) {
          return json({ error: "Too many requests were prepared recently. Please wait an hour or call the clinic." }, 429);
        }

        return json({ allowed: true });
      },
    },
  },
});
