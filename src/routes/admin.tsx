import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/components/AuthProvider";

export const Route = createFileRoute("/admin")({
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});
