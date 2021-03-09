import "./CartModal.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faMinus } from "@fortawesome/free-solid-svg-icons";

function CartModal({ isOpen, closeCartModal, totalPrice, cart, setCart }) {
  const removeFromCart = (item) => {
    const newCart = cart.filter((product) => product.id !== item.id);
    setCart(newCart);
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
                  <h4>Shirt Orange</h4>
                  {/* <span className="CardQty">
                    {" "}
                    <h4>Qty.</h4>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="faiconqty"
                    />{" "}
                    <h4>{item.quantity}</h4>{" "}
                    <FontAwesomeIcon
                      onClick={() => addQty(item)}
                      icon={faPlus}
                      className="faiconqty"
                    />{" "}
                  </span> */}
                  <h4>Price: {item.price /* * item.quantity */} €</h4>
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
        <footer className="CartModalFooter"> Total: {totalPrice} €</footer>
      </div>
    </div>
  );
}

export default CartModal;
