import { formatPrice } from "../../services/utils";
import { CartBody, CartFooter } from "../../styles/styles";
import CartProduct from "../CartProduct/CartProduct";

function Cart({
  totalPrice,
  products,
  removeFromCart,
  setProductQuantity,
}) {
  return (
    <>
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
      <CartFooter>
        {" "}
        Total: {formatPrice(totalPrice)}
      </CartFooter>
    </>
  );
}

export default Cart;
