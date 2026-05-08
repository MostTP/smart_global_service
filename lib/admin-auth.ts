import { auth } from "@/auth";

export async function requireAdmin(request: Request) {
  const apiKey = request.headers.get("x-admin-key");
  if (apiKey && process.env.ADMIN_API_KEY && apiKey === process.env.ADMIN_API_KEY) {
    return { kind: "api_key" as const };
  }

  const session = await auth();
  if (session?.user?.role === "ADMIN") {
    return { kind: "session" as const, userId: session.user.id };
  }

  return null;
}
