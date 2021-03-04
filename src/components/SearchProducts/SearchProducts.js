import "./SearchProducts.css";

function SearchProducts({ value, onChange }) {
  return (
    <div className="SearchProducts">
      <input
        className="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="🔎 'Curved Monitor'"
      />
    </div>
  );
}

export default SearchProducts;
