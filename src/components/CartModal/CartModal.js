import "./CartModal.css";
import { formatPrice } from "./../../services/utils";
import CartProduct from './../CartProduct/CartProduct';


function CartModal({
  isOpen,
  close,
  totalPrice,
  products,
  removeFromCart,
  setProductQuantity,
}) {
  return (
    <div className={`CartModal ${isOpen ? `isOpen` : ""}`}>
      <div className="CartModalWrapper">
        <header className="CartModalHeader">
          <button className="CartModalCloseBtn" onClick={close}>
            ✖️
          </button>
          <h3>Cart</h3>
        </header>
        <div className="CartModalBody">
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
            <p className="ModalCart__content__empty">The cart is empty</p>
          )}
        </div>
        <footer className="CartModalFooter">
          {" "}
          Total: {formatPrice(totalPrice)}
        </footer>
      </div>
    </div>
  );
}

export default CartModal;
