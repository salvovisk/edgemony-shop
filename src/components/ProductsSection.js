import Products from "./Products";
import "./ProductsSection.css";

function ProductsSection(props) {
  const { products } = props;
  return (
    <section className="ProductsSection">
      {products.map((product) => {
        return (
          <Products
            image={product.image}
            title={product.title}
            price={product.price}
            key={ product.id }
            description={product.description}
          />
        );
      })}
    </section>
  );
}

export default ProductsSection;
