import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost'
  // Extraer subdominio (todo antes de .rootDomain)
  const match = host.match(new RegExp(`^(?<subdomain>[^.]+)\\.${rootDomain}$`))
  if (!match || !match.groups) {
    // No es un subdominio válido: continúa sin cambios
    return NextResponse.next()
  }
  const { subdomain } = match.groups

  // Reescribe la URL para que Next.js trate la ruta como /store/:tenant/...
  const url = req.nextUrl.clone()
  url.pathname = `/store/${subdomain}${url.pathname}`
  const response = NextResponse.rewrite(url)

  // Guarda el tenant en una cookie para que el cliente pueda leerlo
  response.cookies.set('tenant', subdomain, { path: '/' })
  return response
}

export const config = {
  // Aplica middleware a todas las rutas excepto API y páginas específicas
  matcher: ['/((?!api|login|_next|favicon.ico).*)'],
}