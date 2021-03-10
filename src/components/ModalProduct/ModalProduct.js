import "./ModalProduct.css";
import { formatPrice } from "./../../services/utils";

function ModalProduct({
  content,
  closeModal,
  isOpen,
  inCart,
  addToCart,
  removeFromCart,
}) {
  // function to check if a product is already in the cart and toggle for the button
  const toggleCart = () => {
    if (inCart) {
      removeFromCart(content.id);
    } else {
      addToCart(content.id);
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
                  className="handleCartBtn"
                  onClick={toggleCart}
                >
                  {inCart ? `Remove from Cart` : `Add to Cart`}
                </button>
                <h6>Price: </h6>
                {formatPrice(content.price)}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ModalProduct;
