import "./ModalProduct.css";
import { formatPrice } from './../../services/utils';

function ModalProduct({ content, closeModal, isOpen, cart, setCart }) {
  // function to check if a product is already in the cart and toggle for the button
  const isAlreadyInCart = () =>
    cart.find((product) => product.id === content.id);

  const toggleCart = () => {
    if (isAlreadyInCart()) {
      const newCart = cart.filter((product) => product.id !== content.id);
      setCart(newCart);
    } else {
      setCart([{ ...content, quantity: 1 }, ...cart]);
    }
  };

  return (
    <div className={`ModalProduct ${isOpen ? `isOpen` : ""}`}>
      <div className="overlay" onClick={closeModal} />
      <div className="body">
        <span className="btnSpan">
          <button className="closeBtn" type="button" onClick={closeModal}>
            ✖️
          </button>
        </span>
        {!!content ? (
          <div className="modalContent">
            <img src={content.image} alt="productImg" />
            <div className="modalTextContent">
              <h3>{content.title}</h3>
              <p className="descriptionModal">{content.description}</p>
              <span>
                <button
                  type="button"
                  id={content.id}
                  className="handleCartBtn"
                  onClick={toggleCart}
                >
                  {isAlreadyInCart() ? `Remove from Cart` : `Add to Cart`}
                </button>
                <h6>Price: </h6>{formatPrice(content.price)}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ModalProduct;
