import Products from "../Products/Products";
import SearchProducts from "../SearchProducts/SearchProducts";
import CategoriesFilter from "./../Categoriesfilter/CategoriesFilter";
import { useState } from "react";
import { ProductsList } from "../../styles/styles";

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
    <>
      <SearchProducts value={searchTerm} onChange={setSearchTerm} />
      <CategoriesFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={setSelectedCategories}
      />
      <ProductsList>
        {filteredProducts.map((product) => (
          <Products
            product={product}
            key={product.id}
            openProductModal={() => openProductModal(product)}
          />
        ))}
      </ProductsList>
    </>
  );
}

export default ProductsSection;
