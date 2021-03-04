import Products from "../Products/Products";
import "./ProductsSection.css";

function ProductsSection({ products, openProductModal }) {
  return (
    <section className="ProductsSection">
      {products.map((product) => {
        return (
          <Products
            product={product}
            key={product.id}
            openProductModal={() => openProductModal(product)}
          />
        );
      })}
    </section>
  );
}

export default ProductsSection;
