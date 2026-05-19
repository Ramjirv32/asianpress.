import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token');
  const { pathname } = request.nextUrl;

  // Protect /admin dashboard (but allow /admin/login)
  if (pathname === '/admin') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect admin APIs — reject any request without a valid session cookie
  const isAdminApi =
    pathname.startsWith('/api/colleges') ||
    pathname.startsWith('/api/submissions');

  if (isAdminApi) {
    // /api/colleges/countries and /api/colleges/by-country are read-only public endpoints
    // used by the fellowships apply form. Allow GET requests to those two only.
    const isPublicReadOnly =
      (pathname === '/api/colleges/countries' || pathname === '/api/colleges/by-country') &&
      request.method === 'GET';

    if (!isPublicReadOnly && !token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match /admin (exact) plus all /api/colleges and /api/submissions sub-paths
  matcher: ['/admin', '/api/colleges/:path*', '/api/submissions/:path*'],
};
