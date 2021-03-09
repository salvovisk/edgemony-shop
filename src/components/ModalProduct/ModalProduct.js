import "./ModalProduct.css";

function ModalProduct({ content, closeModal, isOpen, cart, setCart }) {
  const isAlreadyInCart = () =>
    cart.find((product) => product.id === content.id);
  const toggleCart = () => {
    if (isAlreadyInCart()) {
      const newCart = cart.filter((product) => product.id !== content.id);
      setCart(newCart);
    } else {
      setCart([{ id: content.id, quantity: 1 }, ...cart]);
    }
  };

  const currentQuantity = () => {
    const found = cart.find((cartItem) => cartItem.id === content.id);
    if (found) {
      return found.quantity;
    } else {
      return 0;
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
                <span className="qtyCart">
                  <button type="button">-</button>
                  <span>{currentQuantity()}</span>
                  <button type="button">+</button>
                </span>
                <h6>Price: </h6>€ {content.price}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ModalProduct;
