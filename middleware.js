import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // 🚫 Redirect unauthenticated users trying to access protected routes
  if (!token && (pathname === '/' || pathname.startsWith('/UserHome') || pathname.startsWith('/AdminHome'))) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // ✅ Redirect logged-in users from /login to their home
  if (pathname === '/login' && token) {
    const redirectPath = token.role === 'admin' ? '/AdminHome' : '/UserHome';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // ✅ Redirect root path to role-based home
  if (pathname === '/' && token) {
    const redirectPath = token.role === 'admin' ? '/AdminHome' : '/UserHome';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 🔒 Admin route protection: only admins can access /AdminHome
  if (pathname.startsWith('/AdminHome') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/UserHome', request.url));
  }

  // 🔒 Cashier route protection: only cashiers can access /UserHome
  if (pathname.startsWith('/UserHome') && token.role !== 'cashier') {
    return NextResponse.redirect(new URL('/AdminHome', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/AdminHome/:path*', '/UserHome/:path*', '/login'],
};
