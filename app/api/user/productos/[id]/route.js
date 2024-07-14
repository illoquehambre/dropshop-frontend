//import { connectDb } from "@/app/lib/mongodb"
/*import Producto from '@/app/model/productModel'
import Variante from "@/app/model/variantModel";
import { NextResponse } from "next/server";


//const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export async function GET(request, { params }) {

    //connectDb()
    const { id } = params;
    console.log(id);
    try {
        const product = await Producto.find({ id: id });
        console.log(product);
        const variants = await Variante.find({ 'sync_product_id.$oid': product._id });
        console.log(product);

        if (product.length == 0) {
            return new Response('No existe este producto', { status: 404 });
        }

        return NextResponse.json({
            "Producto": product[0],
            "Variantes": variants
        }, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}*/