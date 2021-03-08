import Products from "../Products/Products";
import SearchProducts from "../SearchProducts/SearchProducts";
import CategoriesFilter from "./../Categoriesfilter/CategoriesFilter";
import "./ProductsSection.css";
import { useState } from "react";

function ProductsSection({ products, categories, openProductModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const termRegexp = new RegExp(searchTerm, "i");
  const filteredProducts = products.filter(
    (product) =>
      product.title.search(termRegexp) !== -1 &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category))
  );

  return (
    <section className="ProductsSection">
      <div className="ProductsSection__filters">
        <SearchProducts value={searchTerm} onChange={setSearchTerm} />
        <CategoriesFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />
      </div>
      <div className="ProductList__products">
        {filteredProducts.map((product) => (
          <Products
            product={product}
            key={product.id}
            openProductModal={() => openProductModal(product)}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductsSection;
