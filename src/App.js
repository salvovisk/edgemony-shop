import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Header from "./components/Header/Header";
import Page404 from "./pages/Page404";
import data from "./utilities/data";
import Modal from "./components/Modal/Modal";
import ModalBodySidebar from "./components/ModalBodySidebar/ModalBodySidebar";
import Cart from "./components/Cart/Cart";

function App() {
  // Shopping Cart Logic
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  function isInCart(product) {
    return product != null && cart.find((p) => p.id === product.id) != null;
  }
  function addToCart(product) {
    setCart([...cart, { ...product, quantity: 1 }]);
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

  useEffect(() => {
    if (cartIsOpen) {
      document.body.style.height = `100vh`;
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.height = ``;
      document.body.style.overflow = ``;
    }
  }, [cartIsOpen]);

  return (
    <Router>
      <Header
        logo={data.logo}
        cart={cart}
        openCartModal={() => setCartIsOpen(true)}
        totalPrice={totalPrice}
      />

      <Modal isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)}>
        <ModalBodySidebar
          isOpen={cartIsOpen}
          onClose={() => setCartIsOpen(false)}
          title={"Cart"}
        >
          <Cart
            products={cart}
            totalPrice={totalPrice}
            removeFromCart={removeFromCart}
            setProductQuantity={setProductQuantity}
          />
        </ModalBodySidebar>
      </Modal>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:productId">
          <Product
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isInCart={isInCart}
          />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
