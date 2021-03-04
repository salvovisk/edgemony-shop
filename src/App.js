import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import Loader from "./components/Loader";
import ErrorProduct from "./components/ErrorProduct";
import ModalProduct from "./components/ModalProduct";
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

  // // Modal Logic
  const [productInModal, setProductInModal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openProductModal(product) {
    // console.log(product);
    setProductInModal(product);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setTimeout(() => {
      setProductInModal(null);
    }, 500);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.height = `100vh`;
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.height = ``;
      document.body.style.overflow = ``;
    }
  }, [modalIsOpen]);

  // Api data logic

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const hasError = Math.random() > 0.5;
        if (!hasError) {
          setProducts(data);
          setLoading(false);
          setError("");
        } else {
          throw new Error("Product server API call response error");
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [retry]);

  return (
    <div className="App">
      <Header logo={data.logo} />
      <Hero
        cover={data.cover}
        title={data.title}
        description={data.description}
      />
      {isLoading
        ?<Loader />
        : !isError && <ProductsSection products={products} openProductModal={openProductModal}/>
      }
      
      { isError && <ErrorProduct retry={retry} setRetry={setRetry} />}
      <ModalProduct
        isOpen={modalIsOpen}
        content={productInModal}
        closeModal={closeModal}
      />
      <Footer />
    </div>
  );
}

export default App;
