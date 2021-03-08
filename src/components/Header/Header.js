import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header({ logo, isInCart }) {
  function totalOfCart() {
    const total = isInCart.map((obj) => {
      return obj.price;
    });

    // console.log(typeof total[0]);
    if (total.length > 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return total.reduce(reducer);
    }
  }

  return (
    <header className="Header">
      <img src={logo} alt="headerLogo" className="logo" />

      <span className="priceCart">
        {isInCart.length > 0 && <h6>{` €${totalOfCart()}`}</h6>}
      </span>
      <span className="cartIcon">
        <FontAwesomeIcon icon={faShoppingCart} className="faiconcart" />
        <span className="badgeCart">
          {/* isInCart.length > 0 && i */ isInCart.length}
        </span>
      </span>
    </header>
  );
}

export default Header;
