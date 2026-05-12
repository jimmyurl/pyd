import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, GraduationCap, Rocket, Network, Smartphone, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Power of Youth Development" },
      { name: "description", content: "Five integrated programs that move youth and young mothers from skills acquisition to sustainable livelihoods." },
      { property: "og:title", content: "PYD Programs" },
      { property: "og:description", content: "Skills, entrepreneurship, market linkages, financial inclusion and support for young mothers." },
    ],
  }),
  component: ProgramsPage,
});

const iconMap: Record<string, any> = { GraduationCap, Rocket, Network, Smartphone, HeartHandshake, Sparkles };

type Program = {
  id: string; position: number; title: string; summary: string;
  focus_areas: string; outcome: string; sdgs: string[]; icon: string;
};

export type ProgramsPageContent = {
  eyebrow: string;
  heading: string;
  heading_accent: string;
  intro: string;
  cta_heading: string;
  cta_primary_label: string;
  cta_secondary_label: string;
};

export const PROGRAMS_PAGE_DEFAULTS: ProgramsPageContent = {
  eyebrow: "Our programs",
  heading: "From skills acquisition to",
  heading_accent: "stable livelihoods.",
  intro: "Power of Youth Development implements integrated programs designed to move youth and young mothers from skills to sustainable economic participation.",
  cta_heading: "Become part of a system that turns skills into livelihoods.",
  cta_primary_label: "Join a program",
  cta_secondary_label: "Partner with us",
};

function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [content, setContent] = useState<ProgramsPageContent>(PROGRAMS_PAGE_DEFAULTS);
  useEffect(() => {
    supabase.from("programs").select("*").order("position").then(({ data }) => setPrograms((data as Program[]) || []));
    supabase.from("site_content").select("value").eq("key", "programs_page").maybeSingle().then(({ data }) => {
      if (data?.value) setContent({ ...PROGRAMS_PAGE_DEFAULTS, ...(data.value as Partial<ProgramsPageContent>) });
    });
  }, []);

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pt-24">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{content.eyebrow}</div>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl">
            {content.heading} <em className="not-italic text-accent">{content.heading_accent}</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {content.intro}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-6">
            {programs.map((p, i) => {
              const Icon = iconMap[p.icon] || Sparkles;
              return (
                <article key={p.id} className="grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-12 md:p-12">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="font-display text-5xl font-bold text-muted-foreground/30">0{i + 1}</div>
                    </div>
                    <h2 className="mt-6 font-display text-2xl font-bold md:text-3xl">{p.title}</h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-muted-foreground">{p.summary}</p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-accent">Focus areas</div>
                        <div className="mt-2 text-sm">{p.focus_areas}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-accent">Outcome</div>
                        <div className="mt-2 text-sm">{p.outcome}</div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.sdgs.map((s) => (
                        <span key={s} className="rounded-full border border-border bg-cream px-3 py-1 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-balance md:text-5xl">
            {content.cta_heading}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">{content.cta_primary_label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">{content.cta_secondary_label}</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
