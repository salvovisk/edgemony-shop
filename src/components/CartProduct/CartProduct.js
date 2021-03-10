import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "./../../services/utils";

function CartProduct({ product, removeFromCart, setProductQuantity }) {
  const { image, title, price, quantity, id } = product;
  const increment = () => setProductQuantity(id, quantity + 1);
  const decrement = () => setProductQuantity(id, quantity - 1);
  const remove = () => removeFromCart(id);
  return (
    <div key={id} className="ProductInCart">
      <img src={image} alt={title} />
      <div className="CartModalContent">
        <h4 className="CartItemTitle">{title}</h4>
        <span className="CardQty">
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
        </span>
        <h4>Price: {formatPrice(price)}</h4>
        <button className="removeCartBtn" onClick={remove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
