import "./ModalProduct.css";

function ModalProduct({ content, closeModal, isOpen, isInCart, addToCart }) {

  function addtoCart() {
    if (!isInCart.includes(content)) {
      addToCart([...isInCart, content]);
      document.getElementById(content.id).disabled = true;
    } else {
      document.getElementById(content.id).disabled = true;
    }
  }

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
                  id={content.id}
                  className="detailsBtn"
                  onClick={addtoCart}
                >
                  {" "}
                  Add to Cart{" "}
                </button>
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
