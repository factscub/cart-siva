
export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
  };
  export type Data = {
    limit: number;
    skip: number;
    total: number;
    products: Product[];
  };
  
  export type DataParams = {
    limit?: number;
    page?: number;
  };