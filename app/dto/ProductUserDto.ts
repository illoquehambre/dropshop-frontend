export interface ProductUserInterface {
    _id: string
    id: number;
    name: string;
    variants: number;
    synced: number;
    thumbnailUrl: string;
    isIgnored: boolean;
    category: string;
    price: number;
}

// Clase DTO ProductUserDto que implementa la interfaz Product
export class ProductUserDto implements ProductUserInterface {
    _id: string;
    id: number;
    name: string;
    variants: number;
    synced: number;
    thumbnailUrl: string;
    isIgnored: boolean;
    category: string;
    price: number;

    constructor(product: ProductUserInterface) {

        this.id = product.id;
        this._id = product._id;
        this.name = product.name;
        this.variants = product.variants;
        this.synced = product.synced;
        this.thumbnailUrl = product.thumbnailUrl;
        this.isIgnored = product.isIgnored;
        this.category = product.category;
        this.price = product.price;
    }
}