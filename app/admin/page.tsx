import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata = {
  title: "Admin | Smart Global Service",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-blue-950">Operations</h1>
      <p className="mt-1 text-sm text-slate-600">
        Review requests, set status, issue quotations, and trigger payment stubs.
      </p>
      <AdminDashboard />
    </div>
  );
}
