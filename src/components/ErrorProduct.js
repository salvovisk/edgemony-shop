import "./ErrorProduct.css";

function ErrorProduct({ retry, setRetry }) {
  return (
    <div className="ErrorProduct">
      <h2>Ops! Non siamo riusciti a caricare i prodotti</h2>
      <button className="reloadBtn" onClick={() => setRetry(!retry)}>
        Riprova
      </button>
    </div>
  );
}

export default ErrorProduct;
