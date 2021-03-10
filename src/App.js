import "./App.css";

import { useState, useEffect } from "react";
import { fetchProducts, fetchCatogories } from "./services/api";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import Loader from "./components/Loader/Loader";
import ErrorProduct from "./components/ErrorProduct/ErrorProduct";
import ModalProduct from "./components/ModalProduct/ModalProduct";
import CartModal from "./components/CartModal/CartModal";

const data = {
  title: "Edgemony Shop",
  description: "A fake e-commerce with a lot of potential",
  logo:
    "https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png",
  cover:
    "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
};

function App() {
  // Api data logic

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([fetchProducts(), fetchCatogories()])
      .then(([products, categories]) => {
        setProducts(products);
        setCategories(categories);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retry]);

  // Shopping Cart Logic
  const [cart, setCart] = useState([]);

  // const cartProducts = cart.map((cartItem) => {
  //   const product = products.find((product) => product.id === cartItem.id);
  // });

  // totalPrice of items in the cart
  const totalPrice = cart
    .reduce((acc, cartItem) => {
      const product = cart.find((product) => product.id === cartItem.id);
      return acc + product.price * product.quantity;
    }, 0);

  // CartModal Logic
  const [cartIsOpen, setCartIsOpen] = useState(false);

  function openCartModal() {
    setCartIsOpen(true);
  }

  function closeCartModal() {
    setCartIsOpen(false);
  }

  useEffect(() => {
    if (cartIsOpen) {
      document.body.style.height = `100vh`;
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.height = ``;
      document.body.style.overflow = ``;
    }
  }, [cartIsOpen]);

  // // Modal Logic
  const [productInModal, setProductInModal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openProductModal(product) {
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

  return (
    <div className="App">
      <Header
        logo={data.logo}
        cart={cart}
        products={products}
        openCartModal={() => openCartModal()}
        totalPrice={totalPrice}
      />
      <CartModal
        isOpen={cartIsOpen}
        closeCartModal={() => closeCartModal()}
        totalPrice={totalPrice}
        cart={cart}
        setCart={setCart}
        products={products}
      />
      <Hero
        cover={data.cover}
        title={data.title}
        description={data.description}
      />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorProduct
          message={isError}
          close={() => setError("")}
          retry={() => setRetry(!retry)}
        />
      ) : (
        <ProductsSection
          products={products}
          categories={categories}
          openProductModal={openProductModal}
        />
      )}

      <ModalProduct
        cart={cart}
        setCart={setCart}
        isOpen={modalIsOpen}
        content={productInModal}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
