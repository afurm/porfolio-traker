import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// List of paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/portfolio',
  '/transactions',
  '/settings',
  '/analytics',
  '/market',
  '/alerts',
  '/assets',
];

// List of paths that are public
const publicPaths = [
  '/',
  '/signin',
  '/signup',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is an API route
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    const token = await getToken({ req: request });

    // If no token and trying to access protected API route, return 401
    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  // For non-API routes, check if the path requires authentication
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // If it's a protected path and no session exists, redirect to signin
  if (isProtectedPath) {
    const token = await getToken({ req: request });

    if (!token) {
      const url = new URL('/signin', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  // If it's a public path or the user is authenticated, continue
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /static (static files)
     * 3. /favicon.ico, /robots.txt (SEO files)
     */
    '/((?!_next|static|favicon.ico|robots.txt).*)',
  ],
};
