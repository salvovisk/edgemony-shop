import React, { useState, useEffect } from "react";
import { fetchProduct } from "./../services/api";
import { formatPrice } from "./../services/utils";
import { useParams } from "react-router-dom";

import {
  ModalProductContent,
  ModalProductTextContent,
  DefaultBlueBtn,
  ModalProductImg,
  ModalProductDescription,
  ModalProductPriceAndBtn,
} from "./../styles/styles.js";
import Loader from "../components/Loader/Loader";

function Product({ addToCart, removeFromCart, isInCart }) {
  let { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId).then((product) => {
      setProduct(product);
    });
  }, [productId]);

  const toggleCart = () => {
    if (isInCart(product)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return product ? (
    <ModalProductContent>
      <ModalProductImg src={product.image} alt="productImg" />
      <ModalProductTextContent>
        <h3>{product.title}</h3>
        <ModalProductDescription>{product.description}</ModalProductDescription>
        <ModalProductPriceAndBtn>
          <DefaultBlueBtn
            type="button"
            className="handleCartBtn"
            onClick={toggleCart}
          >
            {isInCart(product) ? `Remove from Cart` : `Add to Cart`}
          </DefaultBlueBtn>
          Price:
          {` ${formatPrice(product.price)}`}
        </ModalProductPriceAndBtn>
      </ModalProductTextContent>
    </ModalProductContent>
  ) : (
    <Loader />
  );
}

export default Product;
