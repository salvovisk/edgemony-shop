import "./ErrorProduct.css";

function ErrorProduct(props) {
  return (
    <div className="ErrorProduct">
      <h2>Ops! Non siamo riusciti a caricare i prodotti</h2>
      <button className="reloadBtn" onClick={props.setCount}>Riprova</button>
      
    </div>
  );
}

export default ErrorProduct;
