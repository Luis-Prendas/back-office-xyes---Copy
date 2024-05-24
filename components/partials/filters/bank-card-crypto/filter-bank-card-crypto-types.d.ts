export interface Subcategory {
    name: string;
    total: number;
}

export interface Category {
    name: string;
    total: number;
    subcategories: Subcategory[];
}

export interface Provider {
    name: string;
    total: number;
    categories: Category[];
}

export interface RootReponse {
    providers: Provider[]
    name: string
}