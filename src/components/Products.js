import { useState } from "react";
import "./Products.css";
import ModalProduct from "./ModalProduct";

function Products(props) {
  const { image, title, price, id, description } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <ModalProduct
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        cover={image}
        title={title}
        description={description}
        price={price}
      />
      <div className="Products" key={id}>
        <img src={image} alt="productImage" />
        <div className="cardContent">
          <h4 className="titleProduct">{title}</h4>
          <span className="priceAndBtn">
            {" "}
            € {price}
            <button
              className="detailsBtn"
              onClick={() => {
                document.documentElement.style.overflow = "hidden";
                document.body.scroll = "no";
                setModalIsOpen(!modalIsOpen);
              }}
            >
              View Details
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default Products;
