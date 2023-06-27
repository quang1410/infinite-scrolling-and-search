export type ProductType = {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>
}

export type ResultType = {
    limit: number,
    skip: number,
    total: number,
    products: ProductType[]
} 