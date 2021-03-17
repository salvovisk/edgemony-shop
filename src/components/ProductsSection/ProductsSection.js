import Products from "../Products/Products";
import SearchProducts from "../SearchProducts/SearchProducts";
import CategoriesFilter from "./../Categoriesfilter/CategoriesFilter";
import { useState } from "react";
import { ProductsList } from "../../styles/styles";
import { useHistory, useLocation } from "react-router";

function ProductsSection({ products, categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const selectedCategoriesParam = new URLSearchParams(location.search).get(
    "categories"
  );


  const selectedCategories = selectedCategoriesParam
    ? selectedCategoriesParam.split(",")
    : [];
  
  

  function updateCategories(categories) {
    const newParams = new URLSearchParams(location.search);

    const selectedParam = categories.join(",");
    if (categories.length === 0) {
      newParams.delete("categories");
    } else {
      newParams.set("categories", selectedParam);
    }
    history.push({ search: "?" + newParams.toString() });
  }

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
        onSelectCategory={updateCategories}
      />
      <ProductsList>
        {filteredProducts.map((product) => (
          <Products product={product} key={product.id} />
        ))}
      </ProductsList>
    </>
  );
}

export default ProductsSection;
