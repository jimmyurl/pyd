import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { EVENTS } from "@/lib/events";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function EventsPage() {
  const [hero, ...rest] = EVENTS;

  return (
    <SiteLayout>
      <div className="bg-background">
        {/* HERO */}
        <section className="relative isolate overflow-hidden border-b border-border/60 bg-ink text-background">
          <img
            src={hero.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/80 to-ink/40" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Events & Moments</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
              Where livelihoods<br />come to life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-background/80">
              Bootcamps, market days, graduations and grassroots outreach — a living archive of the youth and young mothers shaping Mwanza's economy.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#gallery" className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-ink hover:bg-background/90">
                Browse the gallery
              </a>
              <Link to="/contact" className="rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background/10">
                Host an event with us
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Latest</p>
              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Featured event</h2>
            </div>
            <p className="hidden max-w-md text-sm text-muted-foreground md:block">
              Every event is documented to keep partners and the community close to the work.
            </p>
          </div>

          <article className="grid gap-8 overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-12">
            <div className="md:col-span-7">
              <img
                src={hero.image}
                alt={hero.title}
                width={1280}
                height={896}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex flex-col justify-between gap-6 p-8 md:col-span-5 md:p-12">
              <div>
                <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {hero.category}
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">{hero.title}</h3>
                <p className="mt-4 text-muted-foreground">{hero.description}</p>
              </div>
              <dl className="space-y-3 border-t border-border pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-accent" />
                  <dt className="sr-only">Date</dt>
                  <dd>{hero.date}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <dt className="sr-only">Location</dt>
                  <dd>{hero.location}</dd>
                </div>
              </dl>
              <Link
                to="/events/$slug"
                params={{ slug: hero.slug }}
                className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                View event <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>

        {/* GRID */}
        <section className="border-t border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Recent gatherings</p>
              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">A year in pictures</h2>
              <p className="mt-4 text-muted-foreground">
                Six months of skills, ceremony and community — each frame a step toward sustainable livelihoods.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((e) => (
                <Link
                  key={e.slug}
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.title}
                      width={1280}
                      height={896}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink backdrop-blur">
                      {e.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl font-semibold leading-snug group-hover:text-accent">{e.title}</h3>
                    <p className="text-sm text-muted-foreground">{e.description}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-accent" /> {e.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-accent" /> {e.location}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">Want to sponsor or co-host?</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Partner with us on a bootcamp, market day or graduation. We welcome funders, mentors and volunteers.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}