import { auth } from "@/auth";

export default auth((req) => {
  if (!req.nextUrl.pathname.startsWith("/admin")) return;
  const role = req.auth?.user?.role;
  if (role !== "ADMIN") {
    const url = new URL("/portal/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
