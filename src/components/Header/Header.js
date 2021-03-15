import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../services/utils";
import {
  HeaderContainer,
  HeaderLogo,
  HeaderPriceCartContainer,
  HeadercartIconSpan,
  HeadercartBadge,
} from "./../../styles/styles";

import "./Header.css";

function Header({ logo, cart, openCartModal, totalPrice }) {
  return (
    <HeaderContainer>
      <HeaderLogo src={logo} alt="headerLogo" />
      <HeaderPriceCartContainer>
        {!!cart.length && <h6>{formatPrice(totalPrice)}</h6>}
      </HeaderPriceCartContainer>
      <HeadercartIconSpan>
        <FontAwesomeIcon
          onClick={openCartModal}
          icon={faShoppingCart}
          className="faiconcart"
        />
        {!!cart.length && <HeadercartBadge> {cart.length}</HeadercartBadge>}
      </HeadercartIconSpan>
    </HeaderContainer>
  );
}

export default Header;
