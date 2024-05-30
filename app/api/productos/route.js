//DEBERÍA:
//1- Eliminar los datos innecesarios 
//2- Mostrar si existen ya o no en la base de datos local

import { parsearDto } from "@/app/services/productsService";
const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function GET(request) {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response('Failed to fetch product', { status: response.status });
    }
    const data = await response.json();
    const productosListDto = await parsearDto(data);
    
    
    return new Response(JSON.stringify(productosListDto), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Failed to fetch product', { status: 500 });
  }
}