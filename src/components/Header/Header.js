import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header({ logo, cart, products }) {


  const totalPrice = cart
    .reduce((acc, cartItem) => {
      const product = products.find(product => product.id === cartItem.id)
      return acc + product.price;
    }, 0)
    .toFixed(2);

  return (
    <header className="Header">
      <img src={logo} alt="headerLogo" className="logo" />

      <span className="priceCart">
        {!!cart.length && <h6>{` €${totalPrice}`}</h6>}
      </span>
      <span className="cartIcon">
        <FontAwesomeIcon icon={faShoppingCart} className="faiconcart" />
        {!!cart.length && <span className="badgeCart"> {cart.length}</span>}
      </span>
    </header>
  );
}

export default Header;
