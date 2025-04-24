// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0]; // Extrae el subdominio
  const response = NextResponse.next();
  response.cookies.set('store_id', subdomain); // Guarda el subdominio en una cookie
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
