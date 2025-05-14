import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const config = {
  // Aplica middleware a todas las rutas excepto API y páginas específicas
  matcher: ['/admin', '/admin/:path*', '/((?!api|login|register|_next|favicon.ico|images).*)'],
}

export function middleware(req: NextRequest) {
  console.log('middleware', ' ENTRANDO')
  const hostHeader = req.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0];
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'
  // Extraer subdominio (todo antes de .rootDomain)
  const match = hostname.match(new RegExp(`^(?<subdomain>[^.]+)\\.${rootDomain}$`))
  console.log('match', match)


  // Reescribe la URL para que Next.js trate la ruta como /store/:tenant/...
  const url = req.nextUrl.clone()
  //maneja las rutas de admin
  console.log('url.pathname', url.pathname)
  if (url.pathname.startsWith('/admin')) {
    return handleAdminAuth(req);
  }

  if (!match || !match.groups) {
    // No es un subdominio válido: continúa sin cambios
    return NextResponse.next()
  }
  const { subdomain } = match.groups

  url.pathname = `/store/${subdomain}${url.pathname}`
  console.log('url.pathname', url.pathname)
  const response = NextResponse.rewrite(url)
  console.log('response', response)

  // Guarda el tenant en una cookie para que el cliente pueda leerlo
  response.cookies.set('tenant', subdomain, { path: '/' })
  return response
}


export async function handleAdminAuth(req: NextRequest) {
  console.log('handleAdminAuth')
  const token = req.cookies.get('token')?.value;
  console.log('token', token)
  const loginUrl = new URL('/login', req.nextUrl.origin);
  // Si no hay token, redirige a login
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verifica firma y expiración
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch {
    // Token inválido → elimina cookie y redirige
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set('token', '', { maxAge: 0, path: '/' })
  }
}