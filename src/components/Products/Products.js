import {
  ProductCard,
  ProductCardContent,
  ProductCardImg,
  ProductCardTitle,
  PriceAndBtnWrapper,
  DefaultBlueBtn,
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
          <Link to={`/products/${product.id}`}>
            {" "}
            <DefaultBlueBtn type="button"> View Details </DefaultBlueBtn>{" "}
          </Link>
        </PriceAndBtnWrapper>
      </ProductCardContent>
    </ProductCard>
  );
}

export default Products;
