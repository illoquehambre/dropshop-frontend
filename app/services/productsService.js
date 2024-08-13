import { ProductDetailsDto, Category, SyncVariant } from '../dto/CreateProductDto';
import { ProductDto, ProductListDto } from '../dto/ProductListDto';
//import clientPromise from '../lib/mongodb';
//import Producto from '@/app/model/productModel';
import { Types } from 'mongoose';
//import Variante from '../model/variantModel';

//Este método deberá ejecutarse antes del volcado en el dto en el endpoint productos??
/*
export const comprobarExistenciaEnBD = async (id: number): Promise<boolean> => {


    //Recibe el id del producto

    try {
        //connectDb();
        const producto = await Producto.find({ id: id });
        

        return producto.length > 0;
    } catch (error) {
        console.error('Ha habido un error de algun tipo', error);
        return false;
    }

    //En caso de encontrarlo devuelve true. Si no, false.
}*/
/*
export const agregarAtributoSavedInDb = async (result: any) => {
    const persistenciaArray: boolean[] = [];

    //se itera los productos del listado llamando desde cada uno a la funcion comprobarExistenciaEnBD()
    for (const producto of result) {
        const persistencia = await comprobarExistenciaEnBD(producto.id.toString());
        persistenciaArray.push(persistencia);
    }

    //Se realiza el parseo al DTO agrgando en cada producto el valor correspondiente en el valor savedInDb
    result.forEach((producto: { savedInDb: boolean; }, index: number) => {
        producto.savedInDb = persistenciaArray[index];
        console.log(producto);
    });



    
    
}
*/
/*
export const transformToProductDto = async (data: any): Promise<ProductDto> => {
    return {
        id: data.id,
        externalId: data.external_id,
        name: data.name,
        thumbnailUrl: data.thumbnail_url,
        variants: data.variants,
        synced: data.synced,
        isIgnored: data.is_ignored,
        savedInDb: await comprobarExistenciaEnBD(data.id) // Aplicar la función para determinar el valor booleano
    };
};
*/
/*
export const parsearDto = async (data: any): Promise<ProductListDto> => {


    //Se realiza un foreach del antiguo listado mandando cada producto por iteración y devolviendo el DTO
    const productsDtoPromises = data.result.map(async (product: any) => await transformToProductDto(product));/*
    
    //Se realiza un listado de ProductosDTO
    const productsDto = await Promise.all(productsDtoPromises);
    *//*
    const productsDto = await Promise.all(productsDtoPromises);
    //console.log(productsDto);

    return {
        code: data.code,
        result: productsDto,
        extra: data.extra,
        paging: data.paging,
    };


}

export const addCategoryToProductDetails = async (productDetails: ProductDetailsDto, category: Category): Promise<ProductDetailsDto> => {
    try {
        const existencia = await comprobarExistenciaEnBD(productDetails.result.sync_product.id)
        if (existencia) throw new Error('Este elemento ya existe en la Base de Datos')
        productDetails.result.sync_product.category = category;
    } catch (e: any) {
        console.error(e.name, e.message)
    }

    return productDetails;
}

*/

export const getCheapestVariante = async (variants) => {

    try {
   
        variants.sort((a, b) => parseFloat(a.retail_price) - parseFloat(b.retail_price));

        if (variants.length > 0) {
            return variants[0].retail_price;
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error:', err);
    }
}  

export const checkVariantAvailable = async (id)=>{

    try{
        const {result} = await fetch(`/api/variant/${id}`)

        return result.availability_status=="active"
    }catch (err) {
        console.error('Error:', err);
    }
}

