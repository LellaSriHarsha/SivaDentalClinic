import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  HeartHandshake,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Waypoints,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";

import clinicImage from "@/assets/dental-clinic.jpg";
import consultationImage from "@/assets/dental-consultation.jpg";
import heroImage from "@/assets/dental-hero.jpg";
import clinicLogo from "@/assets/clinic-logo.png";
import { Button } from "@/components/ui/button";

const PHONE_DISPLAY = "+91 93451 50623";
const PHONE_LINK = "tel:+919345150623";
const MAP_URL =
  "https://www.google.co.in/maps/place/Dr.+SIVA'S+MULTISPECIALITY+DENTAL+CLINIC/@13.0454897,80.1794364,16.05z/data=!4m6!3m5!1s0x3a5261ab3902e17d:0xcf9f0f58692a7a1!8m2!3d13.0452946!4d80.1842209";

const timeSlots = Array.from({ length: 28 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${minute.toString().padStart(2, "0")} ${suffix}`;
});

const googleReviews = [
  {
    author: "Karthik",
    when: "2 months ago",
    text: "The doctor was highly professional, patient, and explained every step clearly, which made me feel comfortable and confident. The clinic was clean, well-maintained, and the staff were friendly and supportive.",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT21oTldrWnVWMlpJUTNCRWNqRm1iMkZzVldkZlEyYxAB!2m1!1s0x3a5261ab3902e17d:0xcf9f0f58692a7a1",
  },
  {
    author: "Kev L",
    when: "5 months ago",
    text: "From the onset everything was explained clearly and the process and procedures listed out step by step with utmost clarity for easy understanding. Both are brilliant young doctors.",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2xWbkxXNTZORkpGZGtoRlFXc3dXWE15Ykc0dFVHYxAB!2m1!1s0x3a5261ab3902e17d:0xcf9f0f58692a7a1",
  },
  {
    author: "Gokul Sankar",
    when: "6 months ago",
    text: "Visited Dr. Siva for wisdom tooth extraction and cleaning. He was patient and explained everything before starting. The procedure was smooth and the staff were supportive.",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2s1cWJrcDRZV2d5TUdkUFIwOVZORWxhZVZsbU5HYxAB!2m1!1s0x3a5261ab3902e17d:0xcf9f0f58692a7a1",
  },
] as const;

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Why Choose Us", "#why-us"],
  ["Patient Experience", "#experience"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
];

const services = [
  ["Root Canal Treatment", "Comfort-focused treatment for infected or damaged teeth.", Stethoscope],
  ["Dental Implants", "Tooth replacement solutions designed to restore function and confidence.", Waypoints],
  ["Dental Crowns & Restorations", "Restorative options for damaged or weakened teeth.", ShieldCheck],
  ["Orthodontic Treatment", "Conventional braces, ceramic braces and invisible aligners, subject to assessment.", Sparkles],
  ["Teeth Whitening", "Cosmetic treatment to brighten the appearance of your smile.", Star],
  ["Veneers & Cosmetic Dentistry", "Aesthetic solutions for improving the appearance of teeth.", Sparkles],
  ["Cosmetic Bonding", "Conservative cosmetic treatment for selected dental concerns.", HeartHandshake],
  ["Dental Emergency Care", "Support for urgent dental concerns during clinic hours.", Clock3],
] as const;

const inputClass =
  "h-12 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. SIVA'S Multispeciality Dental Clinic | Dentist in Valasaravakkam, Chennai" },
      {
        name: "description",
        content:
          "Dr. SIVA'S Multispeciality Dental Clinic in Valasaravakkam, Chennai offers comprehensive dental care including root canal treatment, dental implants, orthodontics, cosmetic dentistry and more.",
      },
      { property: "og:title", content: "Dr. SIVA'S Multispeciality Dental Clinic | Valasaravakkam" },
      {
        property: "og:description",
        content: "Comprehensive, patient-first dental care in Valasaravakkam, Chennai. Open daily from 9 AM to 11 PM.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: "Dr. SIVA'S Multispeciality Dental Clinic",
          telephone: "+919345150623",
          address: {
            "@type": "PostalAddress",
            streetAddress: "327B, Kamarajar Salai, Ramakrishna Nagar, Alwartirunagar",
            addressLocality: "Valasaravakkam, Chennai",
            addressRegion: "Tamil Nadu",
            postalCode: "600087",
            addressCountry: "IN",
          },
          openingHours: "Mo-Su 09:00-23:00",
          hasMap: MAP_URL,
        }),
      },
    ],
  }),
  component: Index,
});

function Brand() {
  return (
    <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Dr. SIVA'S home">
      <img src={clinicLogo} alt="Shiny Smiles — Dr. SIVA'S Multispeciality Dental Clinic logo" width={44} height={44} className="size-11 shrink-0" />
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-base font-extrabold text-primary">Dr. SIVA&apos;S</span>
        <span className="mt-1 block truncate text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Multispeciality Dental Clinic
        </span>
      </span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="secondary"><a href={PHONE_LINK}><Phone className="size-4" />Call Now</a></Button>
          <Button asChild><a href="#appointment"><CalendarDays className="size-4" />Book Appointment</a></Button>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent">{label}</a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-secondary" : "text-primary"}`}>{eyebrow}</p>
      <h2 className={`text-3xl font-extrabold leading-tight sm:text-4xl ${light ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>
      {body && <p className={`mt-4 leading-7 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{body}</p>}
    </div>
  );
}

const reasonOptions = [...services.map(([name]) => name), "General Consultation"] as string[];
const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long").regex(/^[\p{L} .'-]+$/u, "Use letters only"),
  phone: z.string().trim().regex(/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid Indian mobile number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(120)]),
  date: z.string().refine((v) => { const d = new Date(v); const t = new Date(); t.setHours(0, 0, 0, 0); return !isNaN(d.getTime()) && d >= t; }, "Choose today or a future date"),
  time: z.string().refine((value) => timeSlots.includes(value), "Select a time slot"),
  reason: z.string({ required_error: "Select a treatment" }).refine((v) => reasonOptions.includes(v), "Select a treatment"),
  message: z.string().trim().max(500, "Keep the message under 500 characters"),
});


function AppointmentForm() {
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const today = new Date().toISOString().split("T")[0];
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    if (raw["website"]) return; // spam trap
    const result = appointmentSchema.safeParse(raw);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      return;
    }
    const d = result.data;
    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointment-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      const payload = await response.json() as { allowed?: boolean; error?: string };
      if (!response.ok || !payload.allowed) {
        setSubmitError(payload.error ?? "We could not prepare your request. Please call the clinic.");
        return;
      }
      const text = [
        "🦷 *APPOINTMENT REQUEST*",
        "",
        `👤 *Name:* ${d.name}`,
        `📞 *Phone:* ${d.phone}`,
        ...(d.email ? [`✉️ *Email:* ${d.email}`] : []),
        `📅 *Preferred date:* ${d.date}`,
        `🕐 *Preferred time:* ${d.time}`,
        `🩺 *Reason for visit:* ${d.reason}`,
        ...(d.message ? ["", `💬 *Message:* ${d.message}`] : []),
        "",
        "✅ Please confirm whether this appointment time is available.",
        "_This is an appointment request, not a confirmed booking._",
      ].join("\n");
      setWhatsappUrl(`https://wa.me/919345150623?text=${encodeURIComponent(text)}`);
    } catch {
      setSubmitError("We could not prepare your request. Please call the clinic.");
    } finally {
      setIsSubmitting(false);
    }
  }
  const err = (k: string) => errors[k] && <span className="text-xs font-medium text-destructive">{errors[k]}</span>;
  if (whatsappUrl) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-lg border border-secondary/40 bg-accent p-8 text-center" role="status">
        <span className="mb-5 grid size-14 place-items-center rounded-full bg-secondary text-secondary-foreground"><Check className="size-7" /></span>
        <h3 className="text-3xl font-extrabold sm:text-4xl">Your appointment request is ready</h3>
        <p className="mt-3 max-w-md text-muted-foreground">Send it to the clinic on WhatsApp or call to confirm your preferred time. It is not booked until the clinic confirms.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" />Send on WhatsApp</a></Button>
          <Button asChild variant="secondary"><a href={PHONE_LINK}><Phone className="size-4" />Call {PHONE_DISPLAY}</a></Button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-lg bg-background p-5 shadow-xl shadow-primary/10 sm:grid-cols-2 sm:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
       <label className="grid gap-2 text-sm font-semibold"><span>Full Name <span className="sr-only">required</span><span aria-hidden="true" className="text-destructive">*</span></span><input required name="name" maxLength={80} autoComplete="name" className={inputClass} placeholder="Your name" />{err("name")}</label>
       <label className="grid gap-2 text-sm font-semibold"><span>Phone Number <span className="sr-only">required</span><span aria-hidden="true" className="text-destructive">*</span></span><input required name="phone" maxLength={16} type="tel" inputMode="tel" autoComplete="tel" className={inputClass} placeholder="98765 43210" />{err("phone")}</label>
      <label className="grid gap-2 text-sm font-semibold">Email (optional)<input name="email" maxLength={120} type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" />{err("email")}</label>
      <label className="grid gap-2 text-sm font-semibold">Preferred Date<input required name="date" type="date" min={today} className={inputClass} />{err("date")}</label>
       <label className="grid gap-2 text-sm font-semibold">Preferred Time Slot<select required name="time" className={inputClass} defaultValue=""><option value="" disabled>Select a time slot</option>{timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select>{err("time")}</label>
      <label className="grid gap-2 text-sm font-semibold">Reason for Visit<select required name="reason" className={inputClass} defaultValue=""><option value="" disabled>Select a treatment</option>{reasonOptions.map((name) => <option key={name}>{name}</option>)}</select>{err("reason")}</label>
      <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Message<textarea name="message" rows={4} maxLength={500} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20" placeholder="Tell us how we can help" />{err("message")}</label>
       {submitError && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-center text-sm font-semibold text-destructive sm:col-span-2">{submitError}</p>}
       <Button type="submit" size="lg" disabled={isSubmitting} className="min-h-14 text-base font-extrabold sm:col-span-2">{isSubmitting ? "Preparing request…" : "Prepare Appointment Request"}<ArrowRight className="size-5" /></Button>
      <p className="text-center text-xs text-muted-foreground sm:col-span-2">Your details stay on your device until you choose to send them. The clinic will confirm availability.</p>
    </form>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground md:pb-0">
      <Navbar />
      <main>
        <section id="home" className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-muted">
          <img src={heroImage} alt="Dentist in a bright, modern dental treatment room" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_94%,transparent)_39%,color-mix(in_oklab,var(--background)_18%,transparent)_72%)]" />
          <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-2xl animate-rise">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-background/85 px-4 py-2 text-xs font-bold text-primary shadow-sm backdrop-blur">
                <Navigation className="size-4 text-secondary" /> Valasaravakkam, Chennai
              </div>
              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] text-primary sm:text-6xl lg:text-7xl">Your Smile Deserves Expert Care</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg">Comprehensive dental care focused on your comfort, confidence and long-term oral health.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><a href="#appointment"><CalendarDays className="size-5" />Book an Appointment</a></Button>
                <Button asChild variant="secondary" size="lg"><a href={PHONE_LINK}><Phone className="size-5" />Call {PHONE_DISPLAY}</a></Button>
              </div>
              <div className="mt-10 grid max-w-2xl gap-px overflow-hidden rounded-lg border border-border bg-border shadow-lg sm:grid-cols-3">
                {[[<Star className="size-5" />, "5.0 Google rating", "70+ listing reviews"], [<ShieldCheck className="size-5" />, "Multispeciality care", "Under one roof"], [<Clock3 className="size-5" />, "Open daily", "9 AM – 11 PM"]].map(([icon, title, text]) => (
                  <div key={String(title)} className="flex items-center gap-3 bg-background/95 p-4 backdrop-blur"> <span className="text-secondary">{icon}</span><span><strong className="block text-sm">{title}</strong><small className="text-muted-foreground">{text}</small></span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Patient-first dentistry" title="Dental Care With a Patient-First Approach" body="Thoughtful, comprehensive care with an emphasis on comfort, hygiene, personalised treatment and modern dental practices." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[[HeartHandshake, "Personalised Treatment", "Care shaped around your individual dental needs."], [Sparkles, "Comfortable Care", "A warm environment attentive to your concerns."], [ShieldCheck, "Modern Practices", "Clear, considered approaches to dental care."], [Stethoscope, "Complete Services", "Multiple treatment options from one clinic."]].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof HeartHandshake;
                return <article key={String(title)} className="rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-lg"><FeatureIcon className="size-7 text-secondary" /><h3 className="mt-8 text-lg font-bold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{String(text)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section id="services" className="bg-muted py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading eyebrow="Our services" title="Complete Dental Care Under One Roof" body="From preventive support to restorative and cosmetic care, treatment recommendations follow consultation and clinical assessment." /><Button asChild variant="secondary"><a href="#appointment">Book a Consultation<ArrowRight className="size-4" /></a></Button></div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {services.map(([title, text, Icon]) => (
                <article key={title} className="group flex min-h-64 flex-col rounded-lg border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-lg">
                  <span className="grid size-11 place-items-center rounded-md bg-accent text-primary"><Icon className="size-5" /></span>
                  <h3 className="mt-6 text-lg font-bold leading-snug">{title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  <a href="#appointment" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">Book Consultation <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative overflow-hidden rounded-lg"><img src={consultationImage} alt="Dentist discussing a personalised treatment plan with a patient" loading="lazy" width={1200} height={900} className="aspect-[4/3] h-full w-full object-cover" /><div className="absolute bottom-4 left-4 rounded-md bg-background/95 px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur">Clear guidance. Considered care.</div></div>
            <div><SectionHeading eyebrow="Care made personal" title="Modern Dentistry. Personalised For You." body="Every patient’s dental needs are different. Treatment recommendations are made after consultation and clinical evaluation, with time to understand your concerns and options." /><Button asChild size="lg" className="mt-8"><a href="#appointment">Schedule Your Consultation<ArrowRight className="size-4" /></a></Button></div>
          </div>
        </section>

        <section id="why-us" className="bg-primary py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Why choose us" title="Why Patients Choose Dr. SIVA'S" light />
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-primary-foreground/15 md:grid-cols-2 lg:grid-cols-4">
              {[["01", "Patient-Centred Care", "Recommendations focused on individual patient needs."], ["02", "Comprehensive Services", "Multiple dental treatment options through one clinic."], ["03", "Comfort & Hygiene", "A clean, welcoming and patient-friendly environment."], ["04", "Convenient Hours", "Open every day from 9:00 AM to 11:00 PM."]].map(([number, title, text]) => <article key={number} className="bg-primary p-7 text-primary-foreground"><span className="text-sm font-bold text-secondary">{number}</span><h3 className="mt-10 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/70">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div><SectionHeading eyebrow="Patient experience" title="A More Comfortable Dental Experience" body="We know visiting a dentist can feel daunting. Our approach centres on listening first, communicating clearly and helping you feel at ease throughout your visit." />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">{["Friendly consultation", "Clear communication", "Personalised planning", "Attention to concerns"].map((item) => <li key={item} className="flex items-center gap-3 text-sm font-semibold"><span className="grid size-6 place-items-center rounded-full bg-accent text-primary"><Check className="size-4" /></span>{item}</li>)}</ul>
              <Button asChild variant="secondary" className="mt-8"><a href={PHONE_LINK}><Phone className="size-4" />Talk to Our Clinic</a></Button>
            </div>
            <img src={clinicImage} alt="Clean and welcoming modern dental clinic treatment room" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full rounded-lg object-cover" />
          </div>
        </section>

        <section id="reviews" className="bg-accent py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
              <div><div className="flex items-center gap-1 text-secondary" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-5 fill-current" />)}</div><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">5.0 from 77 Google reviews</h2><p className="mt-3 text-muted-foreground">Recent feedback shared publicly by clinic patients on Google.</p></div>
              <Button asChild size="lg"><a href={MAP_URL} target="_blank" rel="noreferrer">View all reviews on Google<ArrowRight className="size-4" /></a></Button>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {googleReviews.map((review) => (
                <article key={review.author} className="flex min-h-64 flex-col rounded-lg border border-border bg-background p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4"><div className="flex gap-1 text-secondary" aria-label="5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div><span className="text-xs text-muted-foreground">{review.when}</span></div>
                  <blockquote className="mt-5 flex-1 text-sm leading-7 text-foreground/80">“{review.text}”</blockquote>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4"><strong>{review.author}</strong><a href={review.url} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline">View on Google</a></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="appointment" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div><SectionHeading eyebrow="Appointments" title="Ready to Take Care of Your Smile?" body="Schedule a consultation with Dr. SIVA'S Multispeciality Dental Clinic." />
              <div className="mt-8 space-y-5 border-t border-border pt-8"><a href={PHONE_LINK} className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground"><Phone className="size-5" /></span><span><small className="block text-muted-foreground">Call the clinic</small><strong>{PHONE_DISPLAY}</strong></span></a><div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-md bg-accent text-primary"><Clock3 className="size-5" /></span><span><small className="block text-muted-foreground">Clinic hours</small><strong>Daily, 9:00 AM – 11:00 PM</strong></span></div></div>
            </div>
            <AppointmentForm />
          </div>
        </section>

        <section id="contact" className="bg-muted py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-lg bg-primary p-7 text-primary-foreground sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Visit the clinic</p><h2 className="mt-3 text-3xl font-extrabold">Dr. SIVA&apos;S Multispeciality Dental Clinic</h2><address className="mt-6 not-italic leading-7 text-primary-foreground/75">327B, Kamarajar Salai,<br />Ramakrishna Nagar, Alwartirunagar,<br />Valasaravakkam, Chennai,<br />Tamil Nadu 600087</address><p className="mt-6 font-semibold">Daily: 9:00 AM – 11:00 PM</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild variant="inverse"><a href={PHONE_LINK}><Phone className="size-4" />Call Now</a></Button><Button asChild variant="inverse"><a href={MAP_URL} target="_blank" rel="noreferrer"><Navigation className="size-4" />Get Directions</a></Button></div></div>
            <a href={MAP_URL} target="_blank" rel="noreferrer" className="group relative min-h-96 overflow-hidden rounded-lg bg-accent"><img src={clinicImage} alt="Open the clinic location in Google Maps" loading="lazy" width={1200} height={900} className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-primary/35" /><div className="relative flex h-full min-h-96 flex-col items-center justify-center p-8 text-center text-primary-foreground"><span className="grid size-16 place-items-center rounded-full bg-background text-primary shadow-xl"><Navigation className="size-7" /></span><h3 className="mt-5 text-2xl font-bold">Valasaravakkam, Chennai</h3><p className="mt-2 text-primary-foreground/80">Open location and turn-by-turn directions in Google Maps</p></div></a>
          </div>
        </section>
      </main>

      <footer className="bg-foreground pb-24 pt-14 text-background md:pb-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div><h2 className="font-display text-xl font-extrabold">Dr. SIVA&apos;S</h2><p className="mt-3 max-w-sm text-sm leading-6 text-background/65">Comprehensive dental care with a focus on comfort, confidence and healthy smiles.</p></div><div><h3 className="text-sm font-bold">Quick links</h3><div className="mt-4 grid gap-2">{navItems.slice(0, 3).concat([["Contact", "#contact"]]).map(([label, href]) => <a key={href} href={href} className="text-sm text-background/65 hover:text-background">{label}</a>)}</div></div><div><h3 className="text-sm font-bold">Contact</h3><a href={PHONE_LINK} className="mt-4 block text-sm text-background/65">{PHONE_DISPLAY}</a><p className="mt-2 text-sm text-background/65">Valasaravakkam, Chennai</p></div></div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-background/15 px-4 pt-6 text-xs text-background/50 sm:px-6 lg:px-8">© {new Date().getFullYear()} Dr. SIVA&apos;S Multispeciality Dental Clinic. All rights reserved.</div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 p-2 shadow-2xl backdrop-blur md:hidden">
        <a href={PHONE_LINK} className="flex min-h-12 flex-col items-center justify-center gap-1 text-[11px] font-bold text-primary"><Phone className="size-5" />Call</a>
        <a href={MAP_URL} target="_blank" rel="noreferrer" className="flex min-h-12 flex-col items-center justify-center gap-1 text-[11px] font-bold text-primary"><Navigation className="size-5" />Directions</a>
        <a href="#appointment" className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-md bg-primary text-[11px] font-bold text-primary-foreground"><CalendarDays className="size-5" />Book</a>
      </div>
    </div>
  );
}