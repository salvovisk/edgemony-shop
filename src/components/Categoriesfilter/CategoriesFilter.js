import "./CategoriesFilter.css";

import CategoryFilter from './../CategoryFilter.js/CategoryFilter';

function CategoriesFilter({
  categories,
  selectedCategories,
  onSelectCategory,
}) {
  return (
    <div className="CategoriesFilter">
      {categories.map((category) => (
        <CategoryFilter
          key={category}
          name={category}
          selectedCategories={selectedCategories}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </div>
  );
}

export default CategoriesFilter;
