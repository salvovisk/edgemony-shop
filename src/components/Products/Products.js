import "./Products.css";
import { formatPrice } from "./../../services/utils";

function Products({ product, openProductModal }) {
  return (
    <div className="Products">
      <img src={product.image} alt={product.title} />
      <div className="cardContent">
        <h4 className="titleProduct">{product.title}</h4>
        <span className="priceAndBtn">
          {" "}
          {formatPrice(product.price)}
          <button className="detailsBtn" onClick={openProductModal}>
            View Details
          </button>
        </span>
      </div>
    </div>
  );
}

export default Products;
