import "./CartModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "./../../services/utils";

function CartModal({ isOpen, closeCartModal, totalPrice, cart, setCart }) {
  // Logic to interact with cart
  const removeFromCart = (item) => {
    const newCart = cart.filter((product) => product.id !== item.id);
    setCart(newCart);
  };

  // to modify quantities in the cart
  const addQty = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart([{ quantity: product.quantity++, ...product }, ...newCart]);
  };

  const minusQty = (product) => {
    if (product.quantity === 1) {
      const newCart = cart.filter((item) => item.id !== product.id);

      setCart([{ quantity: product.quantity--, ...product }, ...newCart]);
      removeFromCart(product);
    } else {
      const newCart = cart.filter((item) => item.id !== product.id);

      setCart([{ quantity: product.quantity--, ...product }, ...newCart]);
    }
  };

  return (
    <div className={`CartModal ${isOpen ? `isOpen` : ""}`}>
      <div className="CartModalWrapper">
        <header className="CartModalHeader">
          <button className="CartModalCloseBtn" onClick={closeCartModal}>
            ✖️
          </button>
          <h3>Cart</h3>
        </header>
        <div className="CartModalBody">
          {cart.map((item) => {
            return (
              <div key={item.id} className="ProductInCart">
                <img src={item.image} alt="productimg" />
                <div className="CartModalContent">
                  <h4 className="CartItemTitle">{item.title}</h4>
                  <span className="CardQty">
                    {" "}
                    <h4>Qty.</h4>
                    <FontAwesomeIcon
                      onClick={() => minusQty(item)}
                      icon={faMinus}
                      className="faiconqty"
                    />{" "}
                    <h4>{item.quantity}</h4>{" "}
                    <FontAwesomeIcon
                      onClick={() => addQty(item)}
                      icon={faPlus}
                      className="faiconqty"
                    />{" "}
                  </span>
                  <h4>Price: {formatPrice(item.price)}</h4>
                  <button
                    className="removeCartBtn"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
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
