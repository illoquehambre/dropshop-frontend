// app/api/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(request) {
  // 1. Parsear credenciales del cuerpo
  const { identifier, password } = await request.json();

  // 2. Llamar a Strapi para obtener JWT
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
    {
      method: 'POST',                                                     // Strapi Auth endpoint :contentReference[oaicite:0]{index=0}
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    }
  );
  const data = await apiRes.json();

  // 3. Manejar error de autenticación
  if (!apiRes.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Login fallido' },
      { status: apiRes.status }
    );
  }

  // 4. Crear la respuesta y setear cookie HttpOnly con el JWT
  const response = NextResponse.json(
    { user: data.user },
    { status: 200 }
  );
  // Usamos `cookie.serialize` para generar el header Set-Cookie :contentReference[oaicite:1]{index=1}
  cookies().set({
    name: 'token',
    value: data.jwt,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });


  return response;
}
