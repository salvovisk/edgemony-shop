import CategoryFilter from "./../CategoryFilter.js/CategoryFilter";
import { CategoriesFilterSection } from "../../styles/styles";

function CategoriesFilter({
  categories,
  selectedCategories,
  onSelectCategory,
}) {
  return (
    <CategoriesFilterSection>
      {categories.map((category) => (
        <CategoryFilter
          key={category}
          name={category}
          selectedCategories={selectedCategories}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </CategoriesFilterSection>
  );
}

export default CategoriesFilter;
