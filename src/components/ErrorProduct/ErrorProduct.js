import "./ErrorProduct.css";

function ErrorProduct({ message, retry, setRetry, closeBanner, isOpen }) {
  return (
    <div className={`ErrorProduct ${!isOpen ? `isClosed` : ""}`}>
      <h2>{message}</h2>
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
