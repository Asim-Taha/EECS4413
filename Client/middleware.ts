import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  // 🔐 Block access to protected routes if no token
  if (isProtected && !token) {
    console.log("🚫 No session token. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Block access to login/signup if already logged in
  if (token && isAuthPage) {
    console.log("🔁 Already authenticated. Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/signup/:path*", "/dashboard/:path*"],
};
