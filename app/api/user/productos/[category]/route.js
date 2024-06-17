
import Producto from '@/app/model/productModel'
import { getCheapestVariante } from '@/services/productsService'
import { connectDb } from "@/app/lib/mongodb"
import { ProductUserDto } from '@/dto/ProductUserDto'

export async function GET(request, { params }) {
  connectDb()
  try {
    const productList = await Producto.find({ category: params.category });

    if (productList.length == 0) {
      return new Response('No existen productos para esta categoria', { status: 404 });
    }

    const productListDtoPromises = productList.map(async product => {
      // Set the 'price' field to the specified 'precio' value
      console.log(product.thumbnail_url);
      return new ProductUserDto({
        _id: product._id,
        id: product.id,
        name: product.name,
        variants: product.variants,
        synced: product.synced,
        thumbnailUrl: product.thumbnail_url,
        isIgnored: product.is_ignored,
        category: product.category,
        price: await getCheapestVariante(product._id)
      });
    });


    const productListDto = await Promise.all(productListDtoPromises);


    return new Response(JSON.stringify(productListDto), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}