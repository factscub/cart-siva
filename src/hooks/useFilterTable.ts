import { useCallback } from "react";

const useFilterTable = () => {
  const filterTable = useCallback(
    (products: any, brand: any, category: any) => {
      if (!category) {
        return products;
      }

      if (category && !brand) {
        return products?.filter((product: any) => {
          return (
            // product?.brand?.toLowerCase() === brand?.toLowerCase() &&
            product?.category?.toLowerCase() === category?.toLowerCase()
          );
        });
      }
      return products?.filter((product: any) => {
        return (
          product?.brand?.toLowerCase() === brand?.toLowerCase() &&
          product?.category?.toLowerCase() === category?.toLowerCase()
        );
      });
    },
    []
  );

  return filterTable;
};

export default useFilterTable;
