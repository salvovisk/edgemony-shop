import {
  ProductCard,
  ProductCardContent,
  ProductCardImg,
  ProductCardTitle,
  PriceAndBtnWrapper,
} from "../../styles/styles";
import { formatPrice } from "./../../services/utils";
import { Link } from "react-router-dom";

function Products({ product }) {
  return (
    <ProductCard>
      <ProductCardImg src={product.image} alt={product.title} />
      <ProductCardContent>
        <ProductCardTitle>{product.title}</ProductCardTitle>
        <PriceAndBtnWrapper>
          {" "}
          {formatPrice(product.price)}
          <Link to={`/products/${product.id}`}>View Details</Link>
        </PriceAndBtnWrapper>
      </ProductCardContent>
    </ProductCard>
  );
}

export default Products;
