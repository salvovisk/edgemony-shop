import {
  ProductCard,
  ProductCardContent,
  ProductCardImg,
  ProductCardTitle,
  PriceAndBtnWrapper,
  DefaultBlueBtn
} from "../../styles/styles";
import { formatPrice } from "./../../services/utils";

function Products({ product, openProductModal }) {
  return (
    <ProductCard>
      <ProductCardImg src={product.image} alt={product.title} />
      <ProductCardContent>
        <ProductCardTitle>{product.title}</ProductCardTitle>
        <PriceAndBtnWrapper>
          {" "}
          {formatPrice(product.price)}
          <DefaultBlueBtn onClick={openProductModal}>
            View Details
          </DefaultBlueBtn>
        </PriceAndBtnWrapper>
      </ProductCardContent>
    </ProductCard>
  );
}

export default Products;
