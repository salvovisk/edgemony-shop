function Sidebar({ isOpen, close, title, children }) {
  return (
    <div className={`Cart ${isOpen ? `isOpen` : ""}`}>
      <div className="CartWrapper">
        <header className="CartHeader">
          <button className="CartCloseBtn" onClick={close}>
            ✖️
          </button>
          <h3>{title}</h3>
        </header>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
