import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = {
  title: "Admin login",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-sm text-slate-500">Loading…</div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
