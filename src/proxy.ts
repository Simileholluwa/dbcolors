import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const domains = ['dbcolors.ng', 'dbcolorsng.com', 'localhost:3000'];

  const currentDomain = domains.find(d => hostname.endsWith(d));

  if (currentDomain) {
    const subdomain = hostname.replace(`.${currentDomain}`, '');

    if (subdomain === hostname && url.pathname.startsWith('/admin')) {
      const newPathname = url.pathname.replace(/^\/admin/, '') || '/';
      return NextResponse.redirect(new URL(`https://admin.${currentDomain}${newPathname}${url.search}`, request.url));
    }

    if (subdomain === 'admin') {
      if (url.pathname.startsWith('/admin')) {
        return NextResponse.next();
      }
      return NextResponse.rewrite(new URL(`/admin${url.pathname}${url.search}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (local images in public folder)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};
