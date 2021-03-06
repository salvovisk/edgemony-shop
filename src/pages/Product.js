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
import Loader from "../components/Loader/Loader";

function Product({ addToCart, removeFromCart, isInCart, onError }) {
  let { productId } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onError(undefined);
    fetchProduct(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch(({ message }) =>
        onError({ message, retry: () => setRetry(!retry) })
      )
      .finally(() => setIsLoading(false));
  }, [productId, onError, retry]);

  const toggleCart = () => {
    if (isInCart(product)) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
}

export default Product;
