import { useCallback } from "react";

const useSearch = () => {
  const search = useCallback((array: any, text: any) => {
    text = text.toLowerCase();
    return array.filter((o: any) => {
      return ["title", "rating", "price"].some((k) => {
        return o[k].toString().toLowerCase().indexOf(text) !== -1;
      });
    });
  }, []);
  return search;
};

export default useSearch;
