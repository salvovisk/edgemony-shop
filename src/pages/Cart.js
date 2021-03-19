import React from "react";
import { formatPrice } from "../services/utils";
import { CartPage, CartBody, CartFooter, EmptycartMsg } from "../styles/styles";
import CartProduct from "../components/CartProduct/CartProduct";
import Loader from "../components/Loader/Loader";

function Cart({
  totalPrice,
  products,
  removeFromCart,
  setProductQuantity,
  isLoading,
}) {
  return isLoading ? (
    <Loader />
  ) : (
    <CartPage>
      <CartBody>
        {products.length > 0 ? (
          products.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              removeFromCart={removeFromCart}
              setProductQuantity={setProductQuantity}
            />
          ))
        ) : (
          <EmptycartMsg> Your Cart is empty </EmptycartMsg>
        )}
      </CartBody>
      <CartFooter> Total: {formatPrice(totalPrice)}</CartFooter>
    </CartPage>
  );
}

export default Cart;
