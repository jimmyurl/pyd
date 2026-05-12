import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const { session, loading } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && session) nav({ to: "/admin" }); }, [session, loading, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    const { error } = await fn;
    setBusy(false);
    if (error) return toast.error(error.message);
    if (mode === "signup") toast.success("Account created. Check your email to confirm.");
    else nav({ to: "/admin" });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-elegant">
        <Link to="/"><Logo /></Link>
        <h1 className="mt-8 font-display text-3xl font-bold">{mode === "signin" ? "Admin sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Control panel for Power of Youth Development.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <div><label className="mb-1 block text-sm font-medium">Email</label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><label className="mb-1 block text-sm font-medium">Password</label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button type="submit" disabled={busy} size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 w-full text-sm text-muted-foreground hover:text-accent">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
