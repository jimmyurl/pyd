import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="[&_div:nth-child(2)>div:first-child]:text-primary-foreground [&_div:nth-child(2)>div:last-child]:text-primary-foreground/60" />
          <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
            A youth-led NGO in Mwanza, Tanzania advancing economic empowerment for youth and young mothers through skills, entrepreneurship and market access.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/80">
            Call us: <a href="tel:+255744111803" className="font-medium hover:text-accent">+255 744 111 803</a>
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/programs" className="hover:text-accent">Programs</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Get involved</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-accent">Partner with us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Join a program</Link></li>
            <li><Link to="/admin" className="hover:text-accent">Admin login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/50 md:flex-row">
          <span>© {new Date().getFullYear()} Power of Youth Development. Mwanza, Tanzania.</span>
          <span>Skills → Entrepreneurship → Markets → Livelihoods</span>
        </div>
      </div>
    </footer>
  );
}
