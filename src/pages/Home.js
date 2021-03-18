import { useState, useEffect } from "react";
import { fetchProducts, fetchCatogories } from "./../services/api";

import Hero from "./../components/Hero/Hero";
import ProductsSection from "./../components/ProductsSection/ProductsSection";

import MainSec from "./../containers/Main";

import data from "./../utilities/data";

import { AppContainer } from "./../styles/styles";

let cache;

function Home({ setIsLoading, setApiError, apiError }) {
  const [products, setProducts] = useState(cache ? cache.products : []);
  const [categories, setCategories] = useState(cache ? cache.categories : []);

  useEffect(() => {
    if (cache !== undefined) {
      return;
    }
    setIsLoading(true);
    setApiError("");
    Promise.all([fetchProducts(), fetchCatogories()])
      .then(([products, categories]) => {
        setProducts(products);
        setCategories(categories);
        cache = { products, categories };
      })
      .catch((err) => setApiError(err.message))
      .finally(() => setIsLoading(false));
  }, [apiError]);

  return (
    <AppContainer>
      <MainSec>
        <Hero
          cover={data.cover}
          title={data.title}
          description={data.description}
        />
        <ProductsSection products={products} categories={categories} />
      </MainSec>
    </AppContainer>
  );
}

export default Home;
