import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const { pathname } = request.nextUrl;

  // Se não estiver logado e tentar acessar qualquer página do dashboard
  if (!token && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se já estiver logado e estiver na raiz (login), manda para a triagem
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/triagem', request.url));
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
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
