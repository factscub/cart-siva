import { useCallback, useState } from "react";
import fetchProducts from "../services/api/fetchProducts";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
};
type Data = {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
};

type DataParams = {
  limit?: number;
  page?: number;
};
const useProducts = () => {
  const [data, setData] = useState<Data>({} as Data);

  const getData =useCallback( async ({ limit = 10, page = 1 }: DataParams = {}) => {
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${
      page * limit - limit
    }`;

    const productsData = await fetchProducts<Data>(url);
    setData(productsData);
  },[])
  return { data, getData };
};

export default useProducts;
