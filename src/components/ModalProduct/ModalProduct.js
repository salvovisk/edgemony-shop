import "./ModalProduct.css";

function ModalProduct({ content, closeModal, isOpen }) {
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
