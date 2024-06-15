import { ProductDetailsDto, Category } from '../dto/CreateProductDto';
import { ProductDto, ProductListDto } from '../dto/ProductListDto';
import clientPromise from '../lib/mongodb';
import { ObjectId } from 'mongodb';


//Este método deberá ejecutarse antes del volcado en el dto en el endpoint productos??
export const comprobarExistenciaEnBD = async (id: number): Promise<boolean> => {

    const newId = id.toString()
    //Recibe el id del producto
    let query: any;
    if (ObjectId.isValid(newId) && newId.length === 24) {
        // Si el id es un ObjectId válido (24 caracteres hexadecimales)
        query = { _id: new ObjectId(newId) };
    } else {
        // Si el id es un string (u otro formato)
        query = { _id: newId };
    }

    try {
        const client = await clientPromise;
        const db = client.db('ComercioTest');

        const collection = db.collection('productos');

        const documents = await collection.find({}).toArray();
        console.log( documents);
        // Buscar un documento en la colección 'productos' con el _id correspondiente
        //En caso de encontrarlo devuelve el producto. Si no, null.
        const product = await db.collection('productos').findOne(query);
        console.log(!!product);

        /*
                if (!product) {
                    return false;
                }
        
                return true;
                */
        return !!product;
    } catch (error) {
        console.error('Ha habido un error de algun tipo', error);
        return false;
    }

    //En caso de encontrarlo devuelve true. Si no, false.
}
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

export const parsearDto = async (data: any): Promise<ProductListDto> => {


    //Se realiza un foreach del antiguo listado mandando cada producto por iteración y devolviendo el DTO
    const productsDtoPromises = data.result.map(async (product: any) => await transformToProductDto(product));/*
    
    //Se realiza un listado de ProductosDTO
    const productsDto = await Promise.all(productsDtoPromises);
    */
    const productsDto = await Promise.all(productsDtoPromises);
    console.log(productsDto);

    return {
        code: data.code,
        result: productsDto,
        extra: data.extra,
        paging: data.paging,
    };


}
export const  addCategoryToProductDetails = async (productDetails: ProductDetailsDto, category: Category): Promise<ProductDetailsDto> => {
    try{
        const existencia = await comprobarExistenciaEnBD(productDetails.result.sync_product.id)
        if(existencia)throw new Error('Este elemento ya existe en la Base de Datos')
        productDetails.result.sync_product.category = category;
    }catch (e:any){
        console.error(e.name, e.message)
    }
    
    return productDetails;
}

export const agregarABaseDeDatos = async(productDetails: ProductDetailsDto)=>{

}

