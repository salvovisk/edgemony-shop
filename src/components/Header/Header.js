import "./Header.css";

function Header({ logo, isInCart }) {
  function totalOfCart() {
    const total = isInCart.map((obj) => {
      return obj.price;
    });

    // console.log(typeof total[0]);
    if (total.length > 0) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return total.reduce(reducer);
    }
  }

  return (
    <header className="Header">
      <img src={logo} alt="headerLogo" className="logo" />
      <span style={{ color: "white" }}>
        {isInCart.length > 0 && isInCart.length}
        {isInCart.length > 0 && <h6>€ {totalOfCart()}</h6>}
      </span>
    </header>
  );
}

export default Header;
