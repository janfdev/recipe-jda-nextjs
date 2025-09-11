import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("callbackUrl", req.nextUrl.href);
  return NextResponse.redirect(url);
}

function redirectTo(req: NextRequest, path: string) {
  const url = req.nextUrl.clone();
  url.pathname = path;
  url.search = "";
  return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAdminRoute =
    pathname === "/admin/dashboard" || pathname.startsWith("/admin/dashboard/");
  const isUserRoute =
    pathname === "/profile" || pathname.startsWith("/profile/");

  if (!isAdminRoute && !isUserRoute) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return redirectToLogin(req);

  if (isAdminRoute) {
    if (token.role !== "ADMIN") {
      return redirectTo(req, "/");
    }
    return NextResponse.next();
  }

  if (isUserRoute) {
    if (token.role !== "USER") {
      return redirectTo(req, "/admin/dashboard");
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/dashboard/:path*",
    "/profile",
    "/profile/:path*"
  ]
};
