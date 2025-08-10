import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/admin/login', '/admin/api'];
  
  // Check if the current path is an admin route
  if (pathname.startsWith('/admin') && !publicRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // For now, just check if token exists and is not empty
    // The actual JWT verification will happen in the AuthGuard component
    if (token.length < 10) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Add user info to headers for API routes (we'll verify the token in API routes)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('auth-token', token);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};