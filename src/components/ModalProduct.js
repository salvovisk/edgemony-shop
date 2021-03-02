import "./ModalProduct.css";

function ModalProduct({ isOpen, onClose, cover, title, description, price }) {
 
  return (
    isOpen && (
      <div className="modal">
        <div className="modalBody">
          <span className="btnSpan">
            <button
              className="closeBtn"
              type="button"
              onClick={() => {
                onClose();
                document.documentElement.style.overflow = "scroll";
                document.body.scroll = "yes";
              }}
            >
              ✖️
            </button>
          </span>
          <div className="modalContent">
            <img src={cover} alt="productImg" />
            <div className="modalTextContent">
              <h3>{title}</h3>
              <p className="descriptionModal">{description}</p>
              <span>{price} €</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalProduct;
