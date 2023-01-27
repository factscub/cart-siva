import { useEffect, useState } from "react";

const useDebounce = (text: string, time: number = 500) => {
  const [str, setStr] = useState("");
  useEffect(() => {
    let id = setTimeout(() => {
      setStr(text);
    }, time);

    return () => {
      clearTimeout(id);
    };
  }, [text, time]);

  return str;
};

export default useDebounce;
