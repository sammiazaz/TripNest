import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PRIVATE_ROUTES = ['/dashboard', '/finances', '/itinerary', '/memory-vault'];

function isPrivatePath(pathname: string) {
  return PRIVATE_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token);

  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isPrivatePath(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/finances/:path*', '/itinerary/:path*', '/memory-vault/:path*'],
};
