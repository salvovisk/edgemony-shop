import "./CartModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

function CartModal() {
  return (
    <div className="CartModal">
      <div className="CartModalWrapper">
        <header className="CartModalHeader">
          <button className="CartModalCloseBtn">✖️</button>
          <h3>Cart</h3>
        </header>
        <div className="CartModalBody">
          <div className="ProductInCart">
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt="productimg"
            />
            <div className="CartModalContent">
              <h4>Shirt Orange</h4>
              <span className="CardQty">
                {" "}
                <h4>Qty.</h4>
                <FontAwesomeIcon icon={faMinus} className="faiconqty" />{" "}
                <h4>12</h4>{" "}
                <FontAwesomeIcon icon={faPlus} className="faiconqty" />{" "}
              </span>
              <h4>Price: 52.30 €</h4>
              <button className="removeCartBtn">Remove</button>
            </div>
          </div>
        </div>
        <footer className="CartModalFooter"> Total: 123.45 €</footer>
      </div>
    </div>
  );
}

export default CartModal;
