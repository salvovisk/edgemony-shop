import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Loader from "./components/Loader";
import ErrorProduct from "./components/ErrorProduct";
import Footer from "./components/Footer";

const data = {
  title: "Edgemony Shop",
  description: "A fake e-commerce with a lot of potential",
  logo:
    "https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png",
  cover:
    "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
};

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        // console.log(products);
      });
  }, [count]);

  return (
    <div className="App">
      <Header logo={data.logo} />
      <Hero
        cover={data.cover}
        title={data.title}
        description={data.description}
      />
      {isLoading && <Loader />}
      {isError && <ErrorProduct count={count} setCount={setCount} />}
      <ProductsSection products={products} />
      <Footer />
    </div>
  );
}

export default App;
