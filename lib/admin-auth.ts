import { cookies } from "next/headers";

const COOKIE = "sgs_admin";

export async function getAdminCookie(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value;
}

export async function isAdminSession(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const token = await getAdminCookie();
  return token === secret;
}

export function adminCookieName(): typeof COOKIE {
  return COOKIE;
}
