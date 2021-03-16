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
  ) : (
    <Loader />
  );
}

export default Product;
