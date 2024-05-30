export interface ProductListDto {
    code: number;
    result: ProductDto[];
    extra: any[];
    paging: Paging;
}

export interface Paging {
    total: number;
    offset: number;
    limit: number;
}

export interface ProductDto {
    id: number;
    externalId: string;
    name: string;
    variants: number;
    synced: number;
    thumbnailUrl: string;
    isIgnored: boolean;
    savedInDb: boolean; //Este atributo indica si este producto existe en nuestra BD
    //Es decir, si está visible en la tienda online
}
