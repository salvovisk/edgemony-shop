import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "./../../services/utils";
import {
  ProductInCart,
  ProductInCartImg,
  CartContent,
  CartContentTitle,
  CartQty,
  RemoveFromCart,
} from "../../styles/styles";
import "./CartProduct.css";

function CartProduct({ product, removeFromCart, setProductQuantity }) {
  const { image, title, price, quantity, id } = product;
  const increment = () => setProductQuantity(id, quantity + 1);
  const decrement = () => setProductQuantity(id, quantity - 1);
  const remove = () => removeFromCart(id);
  return (
    <ProductInCart key={id}>
      <ProductInCartImg src={image} alt={title} />
      <CartContent>
        <CartContentTitle>{title}</CartContentTitle>
        <CartQty>
          <h4>Qty.</h4>
          <button
            className="qtyBtn"
            type="button"
            disabled={quantity === 1}
            onClick={decrement}
          >
            <FontAwesomeIcon icon={faMinus} className="faiconqty" />
          </button>
          <h4>{quantity}</h4>
          <button className="qtyBtn" type="button" onClick={increment}>
            <FontAwesomeIcon icon={faPlus} className="faiconqty" />
          </button>
        </CartQty>
        <h4>Price: {formatPrice(price)}</h4>
        <RemoveFromCart onClick={remove}>Remove</RemoveFromCart>
      </CartContent>
    </ProductInCart>
  );
}

export default CartProduct;
