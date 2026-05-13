import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const locales = ['en', 'ar'];
export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;
 const hasLocale = locales.some(l => pathname.startsWith('/' + l + '/') || pathname === '/' + l);
 if (hasLocale) return NextResponse.next();
 request.nextUrl.pathname = '/en' + pathname;
 return NextResponse.redirect(request.nextUrl);
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
