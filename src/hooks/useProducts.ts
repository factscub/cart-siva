import { useCallback, useState } from "react";
import fetchProducts from "../services/api/fetchData";
import { Data, DataParams } from "../types/types";

const useProducts = () => {
  const [data, setData] = useState<Data>();

  const fetchProductsData = useCallback(
    async ({ limit = 10, page = 1 }: DataParams = {}) => {
      setData(undefined)
      const url = `https://dummyjson.com/products?limit=${limit}&skip=${
        page * limit - limit
      }`;

      const productsData = await fetchProducts<Data>(url);
      setData(productsData);
    },
    []
  );
  return { data, fetchProductsData };
};

export default useProducts;
