import "./Products.css";

function Products(props) {
  const { image, title, price, id } = props;

  return (
    <div className="Products" key={id}>
      <img src={image} alt="productImage" />
      <div className="cardContent">
        <h4 className="titleProduct">{title}</h4>
        <span className="priceAndBtn">
          {" "}
          € {price}
          <button className="detailsBtn">View Details</button>
        </span>
      </div>
    </div>
  );
}

export default Products;
