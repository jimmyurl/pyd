import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Power of Youth Development" },
      { name: "description", content: "Partner with us, join a program, or support youth and young mothers in Mwanza, Tanzania." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    setLoading(false);
    if (error) return toast.error("Could not send message");
    toast.success("Message sent — we'll be in touch.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pt-24">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get in touch</div>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl">
            Let's build <em className="not-italic text-accent">livelihoods</em> together.
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-2xl font-bold">Reach out</h2>
            <p className="mt-3 text-muted-foreground">Whether you want to partner, sponsor, or join a program — we'd love to hear from you.</p>
            <div className="mt-8 space-y-5">
              <div className="flex gap-4"><MapPin className="h-5 w-5 text-accent" /><div><div className="font-medium">Mwanza, Tanzania</div><div className="text-sm text-muted-foreground">Headquarters</div></div></div>
              <div className="flex gap-4"><Mail className="h-5 w-5 text-accent" /><div><div className="font-medium">info@pyd.or.tz</div><div className="text-sm text-muted-foreground">General inquiries</div></div></div>
              <div className="flex gap-4"><Phone className="h-5 w-5 text-accent" /><div><a href="tel:+255744111803" className="font-medium hover:text-accent">+255 744 111 803</a><div className="text-sm text-muted-foreground">Mon–Fri</div></div></div>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4 rounded-3xl border border-border bg-card p-8 md:col-span-7 md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-2 block text-sm font-medium">Name</label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="mb-2 block text-sm font-medium">Email</label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            </div>
            <div><label className="mb-2 block text-sm font-medium">Subject</label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
            <div><label className="mb-2 block text-sm font-medium">Message</label><Textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
