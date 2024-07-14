//import Producto from '@/app/model/productModel'
//import Variante from '@/app/model/variantModel'
import { comprobarExistenciaEnBD, getCheapestVariante } from '@/app/services/productsService';
import { NextResponse } from "next/server";
//import { connectDb } from "@/app/lib/mongodb"

/*


const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function GET(request, { params }) {


    const { id } = params;

    try {
        const response = await fetch(`https://api.printful.com/store/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            return new Response('Failed to fetch product', { status: response.status });
        }
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
/*
export async function Post(request, { params }) {


    const { id } = params;

    try {
        const response = await fetch(`https://api.printful.com/store/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            return new Response('Failed to fetch product', { status: response.status });
        }
        const data = await response.json();
        const category = {id:'1', name:'camisetas'}
        addCategoryToProductDetails(data, category)
       return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        return new Response('Failed to fetch product', { status: 500 });
    }
}
*/
/*
export async function POST(request, { params }) {
    //connectDb()
    const { id } = params;
    const requestJson = await request.json()
    const category = requestJson.category
    console.log(category);
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
        const existencia = await comprobarExistenciaEnBD(data.result.sync_product.id);
        console.log(existencia);
        if (!existencia) {
            const newProduct = new Producto(data.result.sync_product)
            newProduct.category = category
            console.log('llega');
            newProduct.price = await getCheapestVariante( data.result.sync_variants)
            console.log(newProduct);
            const savedProduct = await newProduct.save()
            console.log(savedProduct);
            data.result.sync_variants.map(async variant => {
                const variante = new Variante(variant)
                variante.sync_product_id = savedProduct._id
                const savedVariante = await variante.save()
                

            });
           
            console.log(savedProduct);
            return NextResponse.json({
                "Producto": savedProduct,
                "Variantes": data.result.sync_variants
            }

            )
        }

        return NextResponse.json("Operación denegada, este producto ya existe en la Base de datos. Modifiquelo o eliminelo.", {
            status: 401
        }
        )

    } catch (err) {
        return NextResponse.json(err.message, {
            status: 400
        }
        )
    }
}*/