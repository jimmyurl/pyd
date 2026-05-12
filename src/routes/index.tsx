import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GraduationCap, Rocket, Network, Smartphone, HeartHandshake } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-youth.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const HERO_SLIDES = [
  { src: heroImg, alt: "Young women collaborating in Mwanza, Tanzania" },
  { src: hero2, alt: "Young entrepreneur at her sewing workshop" },
  { src: hero3, alt: "Youth in a digital skills training class" },
];

export const Route = createFileRoute("/")({
 
  component: Index,
});

const iconMap: Record<string, any> = { GraduationCap, Rocket, Network, Smartphone, HeartHandshake, Sparkles };

type Stat = { id: string; label: string; value: string; description: string | null; position: number };
type Program = { id: string; title: string; summary: string; icon: string; sdgs: string[]; position: number };

function Index() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    supabase.from("impact_stats").select("*").order("position").then(({ data }) => setStats((data as Stat[]) || []));
    supabase.from("programs").select("id,title,summary,icon,sdgs,position").order("position").then(({ data }) => setPrograms((data as Program[]) || []));
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Slides fill the entire section */}
        <div className="absolute inset-0 -z-10">
          {HERO_SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {/* Readability overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="grain absolute inset-0 opacity-30" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-32 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-background"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-background backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Mwanza · Tanzania
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl lg:text-8xl">
              From skills to <em className="not-italic text-accent">sustainable</em> livelihoods.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-background/85">
              A youth-led NGO connecting ideas, skills and markets — moving young people and young mothers from training to real economic participation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/programs">Explore programs <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-background/40 bg-background/10 text-background backdrop-blur hover:bg-background/20 hover:text-background">
                <Link to="/contact">Partner with us</Link>
              </Button>
            </div>
          </motion.div>

          {/* Controls row */}
          <div className="mt-12 flex items-end justify-between gap-6">
            <div className="hidden max-w-[14rem] rounded-2xl bg-background/95 p-4 shadow-elegant backdrop-blur md:block">
              <div className="font-display text-3xl font-bold text-primary">58,755+</div>
              <div className="text-xs text-muted-foreground">Youth reached through training & empowerment</div>
            </div>
            <div className="flex items-center gap-3">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-10 bg-background" : "w-4 bg-background/50 hover:bg-background/80"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PATHWAY */}
      <section className="border-y border-border bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our pathway</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">We don't focus on training. We focus on livelihoods.</h2>
          <div className="mt-10 grid gap-3 md:grid-cols-4">
            {["Skills & Ideas", "Entrepreneurship", "Market Access", "Sustainable Livelihoods"].map((step, i) => (
              <div key={step} className="group relative rounded-2xl border border-border bg-background p-6 transition hover:border-accent">
                <div className="font-display text-xs font-semibold text-accent">STEP 0{i + 1}</div>
                <div className="mt-4 font-display text-xl font-bold">{step}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {["Practical, market-relevant training.", "Mentorship to build & grow enterprises.", "Networks and economic ecosystems.", "Income, resilience, dignity."][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Impact</div>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">Measured in livelihoods.</h2>
            </div>
            <Link to="/about" className="text-sm font-medium text-primary hover:text-accent">Read our story →</Link>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.id} className="bg-background p-8">
                <div className="font-display text-4xl font-bold text-primary md:text-5xl">{s.value}</div>
                <div className="mt-2 font-medium">{s.label}</div>
                {s.description && <div className="mt-1 text-sm text-muted-foreground">{s.description}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Programs</div>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-5xl">Five integrated paths to a livelihood.</h2>
            </div>
            <Link to="/programs" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90">All programs</Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 3).map((p) => {
              const Icon = iconMap[p.icon] || Sparkles;
              return (
                <Link key={p.id} to="/programs" className="group rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 transition hover:border-accent hover:bg-primary-foreground/10">
                  <Icon className="h-8 w-8 text-accent" />
                  <div className="mt-4 font-display text-xl font-bold">{p.title}</div>
                  <div className="mt-2 line-clamp-3 text-sm text-primary-foreground/70">{p.summary}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.sdgs.map((s) => (
                      <span key={s} className="rounded-full border border-primary-foreground/20 px-2 py-0.5 text-[10px] uppercase tracking-wider">{s}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-balance md:text-6xl">
            Help us turn skills into <em className="not-italic text-accent">stable livelihoods.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Partner with us to expand access to sustainable livelihoods for youth and young mothers across Tanzania.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Become a partner</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/programs">Join a program</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
