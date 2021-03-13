import { SearchProductsSect } from "../../styles/styles";
import "./SearchProducts.css"

function SearchProducts({ value, onChange }) {
  const SearchInput = "search" + (value ? " contains" : "");

  return (
    <SearchProductsSect>
      <input
        className={SearchInput}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="🔎 'Curved Monitor'"
      />
    </SearchProductsSect>
  );
}

export default SearchProducts;
