import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import Loader from "./components/Loader/Loader";
import ErrorProduct from "./components/ErrorProduct/ErrorProduct";
import ModalProduct from "./components/ModalProduct/ModalProduct";
import SearchProducts from "./components/SearchProducts/SearchProducts";
// import Footer from "./components/Footer/Footer";

const data = {
  title: "Edgemony Shop",
  description: "A fake e-commerce with a lot of potential",
  logo:
    "https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png",
  cover:
    "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
};

function App() {
  // Search input Logic
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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
  const [isError, setError] = useState("");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const hasError = Math.random() > 1; /* TO CHANGE */
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

  // ErrorBanner logic
  const [errorBannerIsOpen, setErrorBannerIsOpen] = useState(true);

  function closeBanner() {
    setErrorBannerIsOpen(false);
    console.log("test");
  }

  return (
    <div className="App">
      <Header logo={data.logo} />
      <Hero
        cover={data.cover}
        title={data.title}
        description={data.description}
      />
      <SearchProducts value={searchTerm} onChange={handleChange} />
      {isLoading ? (
        <Loader />
      ) : (
        !isError && (
          <>
            <ProductsSection
              products={searchResults[0] ? searchResults : products}
              openProductModal={openProductModal}
            />
          </>
        )
      )}

      {isError && (
        <ErrorProduct
          retry={retry}
          setRetry={setRetry}
          isOpen={errorBannerIsOpen}
          closeBanner={closeBanner}
        />
      )}
      <ModalProduct
        isOpen={modalIsOpen}
        content={productInModal}
        closeModal={closeModal}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
