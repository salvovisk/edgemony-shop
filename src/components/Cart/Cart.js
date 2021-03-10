import "./Cart.css";
import { formatPrice } from "../../services/utils";
import CartProduct from "../CartProduct/CartProduct";

function Cart({
  totalPrice,
  products,
  removeFromCart,
  setProductQuantity,
}) {
  return (
    <>
      <div className="CartBody">
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
      </div>
      <footer className="CartFooter">
        {" "}
        Total: {formatPrice(totalPrice)}
      </footer>
    </>
  );
}

export default Cart;
