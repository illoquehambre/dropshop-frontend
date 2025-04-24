// app/api/strapi/route.ts
import { NextResponse } from 'next/server';

export async function GET(req) {
  const host = req.headers.get('host') ?? 'localhost:3000';
  const origin = host.startsWith('localhost') ? 'http://' + host : 'https://' + host;
    console.log('host', host) // localhost:3000 o https://example.com
    const slug = host.split('.')[0]; // localhost o example
    console.log('slug', slug) 
  // Llamada a Strapi absoluta
  const strapiRes = await fetch(`${process.env.STRAPI_API_URL}/stores/${slug}`, {
    /*headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },*/
  });

  // Si Strapi devuelve error, propágalo
  if (!strapiRes.ok) {
    console.error('Error fetching from Strapi:', strapiRes.status, strapiRes.statusText);
    return NextResponse.json(
      { error: 'Error fetching from Strapi', status: strapiRes.status },
      { status: 502 }
    );
  }
  console.log('strapiRes', strapiRes) // localhost o example
  const json = await strapiRes.text();
  console.log(json)    // leemos como texto
  let data;
  try {
    data = JSON.parse(json);    
    console.log(data)         // parseamos manualmente
  } catch {
    data = null;
  }

  // Devuelve siempre un objeto JSON, aunque sea null
  return NextResponse.json(data);
}
