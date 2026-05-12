import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { LayoutDashboard, BookOpen, BarChart3, Mail, LogOut, Save, Plus, Trash2, ShieldAlert, FileText } from "lucide-react";
import { PROGRAMS_PAGE_DEFAULTS, type ProgramsPageContent } from "./programs";

export const Route = createFileRoute("/admin/")({
  component: AdminPanel,
});

type Tab = "overview" | "programs" | "programs_page" | "stats" | "messages";

function AdminPanel() {
  const { session, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!loading && !session) nav({ to: "/admin/login" });
  }, [session, loading, nav]);

  if (loading) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 font-display text-3xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({session.user.email}) is signed in but is not an admin yet.
            Ask an existing admin to grant you the admin role, or — for the first admin —
            run this in the database:
          </p>
          <pre className="mt-4 overflow-auto rounded-lg bg-muted p-3 text-left font-mono text-xs">
{`insert into user_roles (user_id, role)
values ('${session.user.id}', 'admin');`}
          </pre>
          <Button className="mt-6 rounded-full" onClick={async () => { await supabase.auth.signOut(); nav({ to: "/admin/login" }); }}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "programs", label: "Programs", icon: BookOpen },
    { id: "programs_page", label: "Programs Page", icon: FileText },
    { id: "stats", label: "Impact Stats", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: Mail },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 flex-col border-r border-sidebar-border bg-sidebar p-6 text-sidebar-foreground md:flex">
        <Link to="/" className="[&_div:nth-child(2)>div:first-child]:text-sidebar-foreground [&_div:nth-child(2)>div:last-child]:text-sidebar-foreground/60">
          <Logo />
        </Link>
        <nav className="mt-10 flex-1 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                tab === t.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" className="justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={async () => { await supabase.auth.signOut(); nav({ to: "/" }); }}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-8 py-4 backdrop-blur">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Control Panel</div>
            <h1 className="font-display text-2xl font-bold capitalize">{tab}</h1>
          </div>
          <div className="text-sm text-muted-foreground">{session.user.email}</div>
        </header>

        <div className="p-8">
          {tab === "overview" && <Overview />}
          {tab === "programs" && <ProgramsAdmin />}
          {tab === "programs_page" && <ProgramsPageAdmin />}
          {tab === "stats" && <StatsAdmin />}
          {tab === "messages" && <MessagesAdmin />}
        </div>
      </main>
    </div>
  );
}

function ProgramsPageAdmin() {
  const [content, setContent] = useState<ProgramsPageContent>(PROGRAMS_PAGE_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "programs_page").maybeSingle().then(({ data }) => {
      if (data?.value) setContent({ ...PROGRAMS_PAGE_DEFAULTS, ...(data.value as Partial<ProgramsPageContent>) });
      setLoading(false);
    });
  }, []);

  const set = <K extends keyof ProgramsPageContent>(k: K, v: ProgramsPageContent[K]) =>
    setContent((c) => ({ ...c, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ key: "programs_page", value: content as any, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Programs page updated");
  };

  const reset = () => setContent(PROGRAMS_PAGE_DEFAULTS);

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  const fields: { key: keyof ProgramsPageContent; label: string; multiline?: boolean }[] = [
    { key: "eyebrow", label: "Eyebrow (small uppercase tag)" },
    { key: "heading", label: "Heading (main text)" },
    { key: "heading_accent", label: "Heading accent (highlighted phrase)" },
    { key: "intro", label: "Intro paragraph", multiline: true },
    { key: "cta_heading", label: "Closing CTA heading", multiline: true },
    { key: "cta_primary_label", label: "Primary button label" },
    { key: "cta_secondary_label", label: "Secondary button label" },
  ];

  return (
    <div className="max-w-3xl space-y-5">
      <p className="text-sm text-muted-foreground">
        Edit the hero and call-to-action copy on the public Programs page. Individual program cards are managed under the “Programs” tab.
      </p>
      {fields.map((f) => (
        <div key={f.key} className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{f.label}</label>
          {f.multiline ? (
            <Textarea rows={3} value={content[f.key]} onChange={(e) => set(f.key, e.target.value)} />
          ) : (
            <Input value={content[f.key]} onChange={(e) => set(f.key, e.target.value)} />
          )}
        </div>
      ))}
      <div className="flex gap-2 pt-2">
        <Button onClick={save} disabled={saving} className="rounded-full"><Save className="mr-1 h-4 w-4" /> {saving ? "Saving…" : "Save changes"}</Button>
        <Button variant="outline" onClick={reset} className="rounded-full">Reset to defaults</Button>
      </div>
    </div>
  );
}

function Overview() {
  const [counts, setCounts] = useState({ programs: 0, stats: 0, messages: 0, unread: 0 });
  useEffect(() => {
    (async () => {
      const [p, s, m, u] = await Promise.all([
        supabase.from("programs").select("*", { count: "exact", head: true }),
        supabase.from("impact_stats").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false),
      ]);
      setCounts({ programs: p.count || 0, stats: s.count || 0, messages: m.count || 0, unread: u.count || 0 });
    })();
  }, []);

  const cards = [
    { label: "Programs", value: counts.programs },
    { label: "Impact Stats", value: counts.stats },
    { label: "Total Messages", value: counts.messages },
    { label: "Unread", value: counts.unread },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-2xl border border-border bg-card p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
          <div className="mt-2 font-display text-4xl font-bold text-primary">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

type Program = { id: string; position: number; title: string; summary: string; focus_areas: string; outcome: string; sdgs: string[]; icon: string };

function ProgramsAdmin() {
  const [items, setItems] = useState<Program[]>([]);
  const load = () => supabase.from("programs").select("*").order("position").then(({ data }) => setItems((data as Program[]) || []));
  useEffect(() => { load(); }, []);

  const update = (id: string, patch: Partial<Program>) =>
    setItems((s) => s.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const save = async (p: Program) => {
    const { error } = await supabase.from("programs").update({
      title: p.title, summary: p.summary, focus_areas: p.focus_areas,
      outcome: p.outcome, sdgs: p.sdgs, icon: p.icon, position: p.position,
    }).eq("id", p.id);
    if (error) toast.error(error.message); else toast.success("Saved");
  };

  const add = async () => {
    const { error } = await supabase.from("programs").insert({
      title: "New program", summary: "Summary", focus_areas: "", outcome: "", sdgs: [], icon: "Sparkles", position: items.length + 1,
    });
    if (error) toast.error(error.message); else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  return (
    <div className="space-y-4">
      <Button onClick={add} className="rounded-full"><Plus className="mr-1 h-4 w-4" /> Add program</Button>
      {items.map((p) => (
        <div key={p.id} className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <div className="flex gap-3">
            <Input className="w-20" type="number" value={p.position} onChange={(e) => update(p.id, { position: +e.target.value })} />
            <Input value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} className="flex-1 font-medium" />
            <Input className="w-40" value={p.icon} onChange={(e) => update(p.id, { icon: e.target.value })} placeholder="Icon name" />
          </div>
          <Textarea value={p.summary} onChange={(e) => update(p.id, { summary: e.target.value })} placeholder="Summary" />
          <div className="grid gap-3 md:grid-cols-2">
            <Textarea rows={2} value={p.focus_areas} onChange={(e) => update(p.id, { focus_areas: e.target.value })} placeholder="Focus areas" />
            <Textarea rows={2} value={p.outcome} onChange={(e) => update(p.id, { outcome: e.target.value })} placeholder="Outcome" />
          </div>
          <Input value={p.sdgs.join(", ")} onChange={(e) => update(p.id, { sdgs: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })} placeholder="SDGs (comma separated)" />
          <div className="flex gap-2">
            <Button onClick={() => save(p)} className="rounded-full"><Save className="mr-1 h-4 w-4" /> Save</Button>
            <Button variant="outline" onClick={() => remove(p.id)} className="rounded-full text-destructive"><Trash2 className="mr-1 h-4 w-4" /> Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

type Stat = { id: string; position: number; label: string; value: string; description: string | null };

function StatsAdmin() {
  const [items, setItems] = useState<Stat[]>([]);
  const load = () => supabase.from("impact_stats").select("*").order("position").then(({ data }) => setItems((data as Stat[]) || []));
  useEffect(() => { load(); }, []);

  const update = (id: string, patch: Partial<Stat>) => setItems((s) => s.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const save = async (s: Stat) => {
    const { error } = await supabase.from("impact_stats").update({ label: s.label, value: s.value, description: s.description, position: s.position }).eq("id", s.id);
    if (error) toast.error(error.message); else toast.success("Saved");
  };
  const add = async () => {
    const { error } = await supabase.from("impact_stats").insert({ label: "New", value: "0", description: "", position: items.length + 1 });
    if (error) toast.error(error.message); else load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("impact_stats").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  return (
    <div className="space-y-4">
      <Button onClick={add} className="rounded-full"><Plus className="mr-1 h-4 w-4" /> Add stat</Button>
      {items.map((s) => (
        <div key={s.id} className="grid gap-3 rounded-2xl border border-border bg-card p-6 md:grid-cols-12">
          <Input className="md:col-span-1" type="number" value={s.position} onChange={(e) => update(s.id, { position: +e.target.value })} />
          <Input className="md:col-span-3 font-bold" value={s.value} onChange={(e) => update(s.id, { value: e.target.value })} placeholder="Value" />
          <Input className="md:col-span-3" value={s.label} onChange={(e) => update(s.id, { label: e.target.value })} placeholder="Label" />
          <Input className="md:col-span-4" value={s.description ?? ""} onChange={(e) => update(s.id, { description: e.target.value })} placeholder="Description" />
          <div className="flex gap-2 md:col-span-1">
            <Button size="icon" onClick={() => save(s)}><Save className="h-4 w-4" /></Button>
            <Button size="icon" variant="outline" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        </div>
      ))}
    </div>
  );
}

type Msg = { id: string; name: string; email: string; subject: string | null; message: string; created_at: string; read: boolean };

function MessagesAdmin() {
  const [items, setItems] = useState<Msg[]>([]);
  const load = () => supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems((data as Msg[]) || []));
  useEffect(() => { load(); }, []);

  const toggleRead = async (m: Msg) => {
    await supabase.from("contact_messages").update({ read: !m.read }).eq("id", m.id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    load();
  };

  if (!items.length) return <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">No messages yet.</div>;

  return (
    <div className="space-y-3">
      {items.map((m) => (
        <div key={m.id} className={`rounded-2xl border bg-card p-6 ${m.read ? "border-border" : "border-accent"}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-medium">{m.name} <span className="text-muted-foreground">· {m.email}</span></div>
              {m.subject && <div className="text-sm font-medium text-accent">{m.subject}</div>}
              <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toggleRead(m)}>{m.read ? "Mark unread" : "Mark read"}</Button>
              <Button size="sm" variant="outline" className="text-destructive" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm">{m.message}</p>
        </div>
      ))}
    </div>
  );
}
