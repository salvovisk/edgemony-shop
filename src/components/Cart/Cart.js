import { formatPrice } from "../../services/utils";
import { CartBody, CartFooter } from "../../styles/styles";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css"

function Cart({ totalPrice, products, removeFromCart, setProductQuantity }) {
  return (
    <div className="cartWrapper">
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
          <p className="Cart__content__empty">The cart is empty</p>
        )}
      </CartBody>
      <CartFooter> Total: {formatPrice(totalPrice)}</CartFooter>
    </div>
  );
}

export default Cart;
