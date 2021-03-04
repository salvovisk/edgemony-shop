import "./ErrorProduct.css";

function ErrorProduct({ retry, setRetry, closeBanner, isOpen }) {
  return (
    <div className={`ErrorProduct ${!isOpen ? `isClosed` : ""}`}>
      <h2>Ops! Non siamo riusciti a caricare i prodotti</h2>
      <button className="reloadBtn" onClick={() => setRetry(!retry)}>
        Riprova
      </button>
      <button className="closeErrorBtn" type="button" onClick={closeBanner}>
        {" "}
        ✖️{" "}
      </button>
    </div>
  );
}

export default ErrorProduct;
