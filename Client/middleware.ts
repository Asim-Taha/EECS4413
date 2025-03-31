import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("session")?.value;

  const isProtectedRoute = pathname.startsWith("/dashboard") && pathname !== "/dashboard/review";
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  console.log("📍 Middleware executing:", pathname);
  console.log("🍪 Cookie token exists:", !!token);

  // 🔐 Block protected routes if no token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🧭 Redirect logged-in users away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/login/:path", "/signup/:path*"],
};