import { useEffect } from "react";
import "./App.css";
import useProducts from "./hooks/useProducts";

function App() {
  const { data, getData } = useProducts();
  console.log(data);
  useEffect(() => {
    getData({ limit: 20 });
  }, [getData]);
  return <div className="App"></div>;
}

export default App;
