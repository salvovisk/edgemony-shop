import { formatPrice } from "./../../services/utils";
import {
  ModalOfProduct,
  Overlay,
  ModalProductBody,
  CloseBtn,
  ModalProductContent,
  ModalProductTextContent,
  DefaultBlueBtn,
  ModalProductImg,
  ModalProductDescription,
  ModalProductPriceAndBtn,
} from "../../styles/styles";

function ModalProduct({
  content,
  closeModal,
  isOpen,
  inCart,
  addToCart,
  removeFromCart,
}) {
  // function to check if a product is already in the cart and toggle for the button
  const toggleCart = () => {
    if (inCart) {
      removeFromCart(content.id);
    } else {
      addToCart(content.id);
    }
  };

  return (
    <ModalOfProduct isOpen={isOpen}>
      <Overlay isOpen={isOpen} onClick={closeModal} />
      <ModalProductBody isOpen={isOpen}>
        <CloseBtn type="button" onClick={closeModal}>
          ✖️
        </CloseBtn>

        {!!content ? (
          <ModalProductContent>
            <ModalProductImg src={content.image} alt="productImg" />
            <ModalProductTextContent>
              <h3>{content.title}</h3>
              <ModalProductDescription>
                {content.description}
              </ModalProductDescription>
              <ModalProductPriceAndBtn>
                <DefaultBlueBtn
                  type="button"
                  className="handleCartBtn"
                  onClick={toggleCart}
                >
                  {inCart ? `Remove from Cart` : `Add to Cart`}
                </DefaultBlueBtn>
                Price:
                {` ${formatPrice(content.price)}`}
              </ModalProductPriceAndBtn>
            </ModalProductTextContent>
          </ModalProductContent>
        ) : null}
      </ModalProductBody>
    </ModalOfProduct>
  );
}

export default ModalProduct;
