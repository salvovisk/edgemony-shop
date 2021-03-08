import "./ErrorProduct.css";

function ErrorProduct({ message, retry, close }) {
  return (
    <div className="ErrorProduct">
      <h2>{message}</h2>
      <button type="button" className="reloadBtn" onClick={() => retry()}>
        Riprova
      </button>
      <button type="button" className="closeErrorBtn" onClick={() => close()}>
        {" "}
        ✖️{" "}
      </button>
    </div>
  );
}

export default ErrorProduct;
