import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowLeft, ArrowUpRight, CheckCircle2, Send, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EVENTS, getEventBySlug } from "@/lib/events";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug);
    if (!event) throw notFound();
    return event;
  },
  component: EventDetailPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">Event not found</h1>
      <p className="mt-3 text-muted-foreground">We couldn't find that event. It may have been renamed or removed.</p>
      <Link to="/events" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        <ArrowLeft className="h-4 w-4" /> Back to events
      </Link>
    </div>
  ),
});

function EventDetailPage() {
  const event = Route.useLoaderData();
  const related = EVENTS.filter((e) => e.slug !== event.slug).slice(0, 3);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleRsvp(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please add your name and email.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject: `RSVP — ${event.title}`,
      message: message || `I'd like to RSVP to ${event.title} on ${event.date} (${event.startTime}–${event.endTime}).`,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit your RSVP. Please try again.");
      return;
    }
    setDone(true);
    toast.success("RSVP received — we'll be in touch.");
  }

  return (
    <SiteLayout>
      <div className="bg-background">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-ink text-background">
          <img src={event.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/40" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
            <Link to="/events" className="inline-flex items-center gap-2 text-sm text-background/80 hover:text-accent">
              <ArrowLeft className="h-4 w-4" /> All events
            </Link>
            <span className="mt-6 inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              {event.category}
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] md:text-6xl">{event.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-background/80">{event.description}</p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <dt className="sr-only">Date</dt>
                <dd>{event.date}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <dt className="sr-only">Time</dt>
                <dd>{event.startTime} – {event.endTime}</dd>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <dt className="sr-only">Location</dt>
                <dd>{event.location}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* BODY */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">About this event</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85">
              {event.longDescription.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* GALLERY */}
            <h3 className="mt-14 font-display text-xl font-semibold">Gallery</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {event.gallery.map((src: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={src}
                    alt={`${event.title} — photo ${i + 1}`}
                    className="aspect-square h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="md:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">By the numbers</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {event.highlights.map((h: string) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RSVP */}
            <div id="rsvp" className="mt-6 rounded-2xl border border-border bg-ink p-6 text-background">
              {done ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
                  <h3 className="mt-3 font-display text-xl font-semibold">You're on the list</h3>
                  <p className="mt-2 text-sm text-background/80">We'll send confirmation and details to {email}.</p>
                  <div className="mt-4 rounded-lg border border-background/15 bg-background/5 p-3 text-left text-sm">
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {event.date}</p>
                    <p className="mt-1.5 flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> {event.startTime} – {event.endTime}</p>
                    <p className="mt-1.5 flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> {event.location}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-semibold">RSVP / Get in touch</h3>
                  <p className="mt-1 text-sm text-background/70">Reserve a spot or ask a question about this event.</p>
                  <form onSubmit={handleRsvp} className="mt-5 space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-background/20 bg-background/10 px-3 py-2 text-sm placeholder:text-background/50 focus:border-accent focus:outline-none"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-background/20 bg-background/10 px-3 py-2 text-sm placeholder:text-background/50 focus:border-accent focus:outline-none"
                      required
                    />
                    <textarea
                      placeholder="Anything we should know? (optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full rounded-md border border-background/20 bg-background/10 px-3 py-2 text-sm placeholder:text-background/50 focus:border-accent focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink hover:bg-accent/90 disabled:opacity-60"
                    >
                      {submitting ? "Sending…" : (<>Send RSVP <Send className="h-4 w-4" /></>)}
                    </button>
                  </form>
                </>
              )}
            </div>
          </aside>
        </section>

        {/* RELATED */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">More events</h2>
              <Link to="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                See all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((e) => (
                <Link
                  key={e.slug}
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={e.image} alt={e.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">{e.category}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-accent">{e.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{e.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}