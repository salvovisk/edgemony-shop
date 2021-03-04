import "./Header.css"

function Header(props) {
  return (
    <header className="Header">
      <img src={props.logo} alt="headerLogo" className="logo" />
    </header>
  );
}

export default Header