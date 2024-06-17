//DEBERÍA:
//1- Eliminar los datos innecesarios 
//2- Mostrar si existen ya o no en la base de datos local

import { parsearDto } from "@/app/services/productsService";
const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
import  Producto  from '@/app/model/productModel'
import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/mongodb"

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



export async function POST(request, { params }) {
  connectDb()
  const { id } = params;
  const category ='Camisetas'
  try {
    //Fetch a ptintfull de
    const response = await fetch(`https://api.printful.com/store/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return NextResponse.json(err.message, {
        status: response.status
      }
    )
      
    }

    const data = await response.json();//aqui recibiremos todo el producto menos categoria
    const newProduct = new Producto(data.sync_product)
    console.log("LLLEGA BIEN");
    newProduct.category = category
    const savedProduct = await newProduct.save()
    console.log(savedProduct);
    return NextResponse.json(
      savedProduct
    )

  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400
    }
    )
  }
}