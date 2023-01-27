import { useEffect, useState } from "react";
import fetchCategories from "../services/api/fetchData";

type Category = string[];

const useCategories = () => {
  const [categories, setCategories] = useState<Category>();

  useEffect(() => {
    (async () => {
      const url = "https://dummyjson.com/products/categories";
      const categoriesData = await fetchCategories<Category>(url);
      setCategories(categoriesData);
    })();
  }, []);

  return { categories };
};

export default useCategories;
