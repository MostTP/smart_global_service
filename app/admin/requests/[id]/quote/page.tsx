import AdminQuoteForm from "./quote-form";

export default async function AdminQuoteRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminQuoteForm requestId={id} />;
}
