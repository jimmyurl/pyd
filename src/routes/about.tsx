import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
// Use a runtime import with fallback so a missing asset never breaks the build/render.
const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><rect width='4' height='5' fill='%23e8d9c4'/><text x='2' y='2.7' text-anchor='middle' font-family='serif' font-size='0.4' fill='%237a5a3a'>PYD</text></svg>";
let aboutImg: string = PLACEHOLDER_IMG;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  aboutImg = new URL("../assets/about-image.jpg", import.meta.url).href;
} catch {
  aboutImg = PLACEHOLDER_IMG;
}
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Power of Youth Development" },
      { name: "description", content: "PYD is a youth-led NGO in Mwanza, Tanzania connecting skills and ideas to economic participation for youth and young mothers." },
      { property: "og:title", content: "About PYD" },
      { property: "og:description", content: "Who we are, our vision, mission and approach." },
    ],
  }),
  component: AboutPage,
});

const sdgs = [
  { n: 1, label: "No Poverty" },
  { n: 4, label: "Quality Education" },
  { n: 5, label: "Gender Equality" },
  { n: 8, label: "Decent Work & Economic Growth" },
  { n: 10, label: "Reduced Inequalities" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pt-24">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About us</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl"
          >
            A youth-led movement for <em className="not-italic text-accent">sustainable livelihoods.</em>
          </motion.h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Who we are</h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p><strong className="text-foreground">Power of Youth Development (PYD)</strong> is a registered youth-led and youth-focused non-governmental organization based in Mwanza, Tanzania, focused on advancing economic empowerment for youth and young mothers.</p>
              <p>We work at the intersection of idea and skills development, entrepreneurship, and inclusive economic opportunities to enable sustainable and stable livelihoods.</p>
              <p>In Tanzania's context of high youth participation in informal, low-income activities, the central challenge is not only access to skills, but the lack of clear pathways from learning to sustainable livelihoods. Evidence from World Bank and UNDP highlights this persistent gap.</p>
              <p>PYD connects ideas and skills to real economic participation — ensuring that youth and young mothers move beyond training into sustainable livelihoods.</p>
            </div>
          </div>
          <div className="md:col-span-5">
            <img
              src={aboutImg}
              alt="Young entrepreneur in Mwanza"
              loading="lazy"
              width={1400}
              height={1000}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-elegant"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
          {[
            { tag: "Vision", title: "An inclusive society where youth and young mothers thrive.", body: "Through sustainable and stable livelihoods, contributing to resilient communities and equitable economic growth." },
            { tag: "Mission", title: "Build sustainable livelihoods through skills, ideas and markets.", body: "We enable youth and young mothers through market-relevant skills development, entrepreneurship and inclusive economic opportunities." },
          ].map((c) => (
            <div key={c.tag} className="rounded-3xl border border-border bg-background p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our {c.tag}</div>
              <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">{c.title}</h3>
              <p className="mt-4 text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our approach</div>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-5xl">We don't focus on training delivery. We focus on livelihood outcomes.</h2>
          <div className="mt-12 flex flex-wrap items-center gap-3 text-lg">
            {["Skills & Ideas", "Entrepreneurship", "Market Access", "Sustainable Livelihoods"].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground">{s}</span>
                {i < 3 && <span className="text-accent">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Global development</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Our contribution to the SDGs.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {sdgs.map((s) => (
              <div key={s.n} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                <div className="font-display text-4xl font-bold text-accent">{s.n}</div>
                <div className="mt-2 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-balance md:text-5xl">Partner with us.</h2>
          <p className="mt-4 text-muted-foreground">Help expand access to sustainable livelihoods for youth and young mothers in Tanzania.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">Get in touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/programs">See our programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
