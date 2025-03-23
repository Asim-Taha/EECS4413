import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/auth/session";
import { cookies } from "next/headers";
import { log } from "console";


// Protected and Public routes
const protectedRoutes = ['/dashboard','/dashboard/*']
const publicRoutes = ['/', '/signup', '/login']


export default async function middleware(request: NextRequest) {
    const protectedRoutes = ['/dashboard']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(currentPath)

    const cookie = (await cookies()).get('session')?.value
    const session = await verifySession();

    if (isProtectedRoute || (currentPath.startsWith('/dashboard') && !currentPath.startsWith('/dashboard/settings'))) {
        // Check for valid session 
        if (!session?.name) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
    }
    

    if (session?.name && (currentPath.startsWith('/login') || currentPath.startsWith('/signup'))){
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    
    return NextResponse.next()
}

//Routes Middleware should only run on /dashboard paths 
export const config = {
    matcher: ['/login/:path*','/signup/:path*','/dashboard/:path*'],
}