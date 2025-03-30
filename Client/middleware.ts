import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/auth/session";
import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = currentPath.startsWith('/dashboard');
  const isAuthPage = currentPath.startsWith('/login') || currentPath.startsWith('/signup');

  console.log("📍 Middleware executing:", request.nextUrl.pathname);
const session = await verifySession();
console.log("📦 Middleware session:", session);


  // 🔐 Block access to protected routes if not logged in
  if (isProtectedRoute && !session?.name) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ⛔ Redirect logged-in users away from auth pages
  if (session?.name && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*', '/signup/:path*'],
};
