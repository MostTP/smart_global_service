import DesktopAdminPage from "@/app/desktop/admin/page";

export default async function AdminRoutePage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const sp = await searchParams;
  return <DesktopAdminPage sentUrl={sp.sent} />;
}
