import { useState, useEffect, useCallback } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Header from "./components/Header/Header";

import ErrorProduct from "./components/ErrorProduct/ErrorProduct";
import Page404 from "./pages/Page404";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import { deleteItemFromCart, postItemToCart, fetchCart } from "./services/api";

import data from "./utilities/data";

let cartId;

function App() {
  // Shopping Cart Logic
  const [cart, setCart] = useState([]);
  const [newCart, setNewCart] = useState("");

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  function isInCart(product) {
    return product != null && cart.find((p) => p.id === product.id) != null;
  }

  async function updateCart(fn, ...apiParams) {
    try {
      const cartObj = await fn(...apiParams);
      setCart(cartObj.items);
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

  // async function createOrder(cartID, data) {
  //   await updateCart(async () => {
  //     const updatedCart = await await updateCartApi(cartID, data);
  //     await createOrderApi(updatedCart.id);
  //     const newCart = await createCart();
  //     localStorage.setItem("edgemony-cart-id", newCart.id);
  //   });
  // }

  // Error and Loading Logic
  const [apiErrors, setApiErrors] = useState({});

  const cartError = apiErrors.cart;

  const errorKey = Object.keys(apiErrors).find((key) => apiErrors[key] != null);

  const setProductListError = useCallback(
    (error) => setApiErrors((errors) => ({ ...errors, productList: error })),
    []
  );
  const setProductError = useCallback(
    (error) => setApiErrors((errors) => ({ ...errors, product: error })),
    []
  );
  const setCartError = useCallback(
    (error) => setApiErrors((errors) => ({ ...errors, cart: error })),
    []
  );

  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  // Cart fetch from Api
  useEffect(() => {
    const cartIdFromLocalStorage = localStorage.getItem("edgemony-cart-id");

    if (cartIdFromLocalStorage) {
      async function fetchCartInEffect() {
        try {
          setIsLoading(true);
          setApiErrors("");
          const cartObj = await fetchCart(cartIdFromLocalStorage);
          setCart(cartObj.items);
          cartId = cartObj.id;
        } catch ({ message }) {
          setCartError({ message, retry: () => setRetry(!retry) });
        } finally {
          setIsLoading(false);
        }
      }
      fetchCartInEffect();
    }
  }, [retry, setCartError, newCart]);

  return (
    <Router>
      <Header logo={data.logo} cart={cart} totalPrice={totalPrice} />

      <Switch>
        <Route exact path="/">
          <Home onError={setProductListError} />
        </Route>
        <Route path="/cart">
          <Cart
            products={cart}
            totalPrice={totalPrice}
            removeFromCart={removeFromCart}
            setProductQuantity={setProductQuantity}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/checkout">
          {cart.length === 0 ? (
            <Redirect to="/cart" />
          ) : (
            <Checkout cartId={cartId} setNewCart={setNewCart} />
          )}
        </Route>

        <Route path="/products/:productId">
          <Product
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            isInCart={isInCart}
            onError={setProductError}
          />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
      {errorKey ? (
        <ErrorProduct
          message={apiErrors[errorKey].message}
          close={() => setApiErrors({ ...apiErrors, [errorKey]: undefined })}
          retry={apiErrors[errorKey].retry}
        />
      ) : null}
    </Router>
  );
}

export default App;
