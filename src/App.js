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

  const cartProducts = cart.map((cartItem) => {
    const { price, image, title, id } = products.find(
      (p) => p.id === cartItem.id
    );
    return { price, image, title, id, quantity: cartItem.quantity };
  });
  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  function isInCart(product) {
    return product != null && cart.find((p) => p.id === product.id) != null;
  }
  function addToCart(productId) {
    setCart([...cart, { id: productId, quantity: 1 }]);
  }
  function removeFromCart(productId) {
    setCart(cart.filter((product) => product.id !== productId));
  }
  function setProductQuantity(productId, quantity) {
    setCart(
      cart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  }

  // CartModal Logic
  const [cartIsOpen, setCartIsOpen] = useState(false);

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
    if (modalIsOpen || cartIsOpen) {
      document.body.style.height = `100vh`;
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.height = ``;
      document.body.style.overflow = ``;
    }
  }, [modalIsOpen, cartIsOpen]);

  return (
    <div className="App">
      <Header
        logo={data.logo}
        cart={cart}
        products={products}
        openCartModal={() => setCartIsOpen(true)}
        totalPrice={totalPrice}
      />
      <CartModal
        products={cartProducts}
        isOpen={cartIsOpen}
        close={() => setCartIsOpen(false)}
        totalPrice={totalPrice}
        removeFromCart={removeFromCart}
        setProductQuantity={setProductQuantity}
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
        inCart={isInCart(productInModal)}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        isOpen={modalIsOpen}
        content={productInModal}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
