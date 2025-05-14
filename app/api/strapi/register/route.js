// app/api/register/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, email, password } = await request.json();

  // Llamada a Strapi/register
  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    }
  );
  const data = await apiRes.json();

  if (!apiRes.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Registro fallido' },
      { status: apiRes.status }
    );
  }

  // Seteamos cookie HttpOnly con JWT
  const response = NextResponse.json(
    { user: data.user },
    { status: 200 }
  );
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
