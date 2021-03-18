import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Header from "./components/Header/Header";
import Page404 from "./pages/Page404";
import Cart from "./pages/Cart";
import { deleteItemFromCart, postItemToCart, fetchCart } from "./services/api";

import data from "./utilities/data";

let cartId;

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

  async function updateCart(fn, ...apiParams) {
    try {
      const newCart = await fn(...apiParams);
      setCart(newCart.items);
    } catch (error) {
      console.error(`${fn.name} API call response error! ${error.message}`);
    }
  }

  async function addToCart(productId) {
    updateCart(postItemToCart, cartId, productId, 1);
  }

  async function removeFromCart(productId) {
    updateCart(deleteItemFromCart, cartId, productId);
  }

  async function setProductQuantity(productId, quantity) {
    updateCart(postItemToCart, cartId, productId, quantity);
  }

  useEffect(() => {
    const cartIdFromLocalStorage = localStorage.getItem("edgemony-cart-id");

    if (cartIdFromLocalStorage) {
      async function fetchCartInEffect() {
        try {
          const cartObj = await fetchCart(cartIdFromLocalStorage);
          setCart(cartObj.items);
          cartId = cartObj.id;
        } catch (error) {
          console.error("fetchCart API call response error! ", error.message);
        }
      }
      fetchCartInEffect();
    }
  }, []);

  return (
    <Router>
      <Header logo={data.logo} cart={cart} totalPrice={totalPrice} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/cart">
          <Cart
            products={cart}
            totalPrice={totalPrice}
            removeFromCart={removeFromCart}
            setProductQuantity={setProductQuantity}
          />
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
