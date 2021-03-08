import "./SearchProducts.css";


function SearchProducts({ value, onChange }) {
  const SearchInput = "search" + (value ? " contains" : "")
 

  return (
    <div className="SearchProducts">
      <input
        className={SearchInput}
        type="text"
        value={value}
        onChange={(event)=>onChange(event.target.value)}
        placeholder="🔎 'Curved Monitor'"
      />
    </div>
  );
}

export default SearchProducts;
