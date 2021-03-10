import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../services/utils";

function Header({ logo, cart, openCartModal, totalPrice }) {
  return (
    <header className="Header">
      <img src={logo} alt="headerLogo" className="logo" />

      <span className="priceCart">
        {!!cart.length && <h6>{formatPrice(totalPrice)}</h6>}
      </span>
      <span className="cartIcon">
        <FontAwesomeIcon
          onClick={openCartModal}
          icon={faShoppingCart}
          className="faiconcart"
        />
        {!!cart.length && <span className="badgeCart"> {cart.length}</span>}
      </span>
    </header>
  );
}

export default Header;
