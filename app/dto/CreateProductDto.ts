export interface ProductDetailsDto {
    code: number;
    result: Result;
    extra: any[];
}

export interface Result {
    sync_product: SyncProduct;
    sync_variants: SyncVariant[];
}

export interface SyncProduct {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
    category: Category;//Añadido adicionalmente
}

export interface SyncVariant {
    id: number;
    external_id: string;
    sync_product_id: number;
    name: string;
    synced: boolean;
    variant_id: number;
    main_category_id: number;
    warehouse_product_id: null;
    warehouse_product_variant_id: null;
    retail_price: string;
    sku: string;
    currency: string;
    product: Product;
    files: File[];
    options: SyncVariantOption[];
    is_ignored: boolean;
    size: string;
    color: string;
    availability_status: string;
}






export interface File {
    id: number;
    type: string;
    hash: string | null;
    url: null;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number | null;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
    is_temporary: boolean;
    message: string;
    options?: FileOption[];
    stitch_count_tier: null;
}





export interface FileOption {
    id: string;
    value: ValueClass;
}



export interface ValueClass {
    validationHash: string;
    isValid: boolean;
    validatedImageUrl: string;
}




export interface SyncVariantOption {
    id: string;
    value: any[] | boolean | string;
}




export interface Product {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
}

export enum Category{//Añadido adicionalemnte
    Camisetas= "Camisetas",
    Sudaderas = "Sudaderas",
    Lienzos = "Lienzos",
    Bolsos = "Bolsos"
}
