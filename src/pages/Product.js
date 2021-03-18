import React, { useState, useEffect } from "react";
import { fetchProduct } from "./../services/api";
import { formatPrice } from "./../services/utils";
import { useParams } from "react-router-dom";

import {
  ProductContent,
  ProductTextContent,
  DefaultBlueBtn,
  ProductImg,
  ProductDescription,
  ProductPriceAndBtn,
} from "./../styles/styles.js";

function Product({
  addToCart,
  removeFromCart,
  isInCart,
  setIsLoading,
  setApiError,
}) {
  let { productId } = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchProduct(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((err) => setApiError(err.message))
      setIsLoading(false)
  }, [productId]);

  const toggleCart = () => {
    if (isInCart(product)) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  return product ? (
    <ProductContent>
      <ProductImg src={product.image} alt="productImg" />
      <ProductTextContent>
        <h3>{product.title}</h3>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPriceAndBtn>
          <DefaultBlueBtn
            type="button"
            className="handleCartBtn"
            onClick={toggleCart}
          >
            {isInCart(product) ? `Remove from Cart` : `Add to Cart`}
          </DefaultBlueBtn>
          {` ${formatPrice(product.price)}`}
        </ProductPriceAndBtn>
      </ProductTextContent>
    </ProductContent>
  ) : null;
}

export default Product;
