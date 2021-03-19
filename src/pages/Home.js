import { useState, useEffect } from "react";
import { fetchProducts, fetchCatogories } from "./../services/api";

import Hero from "./../components/Hero/Hero";
import ProductsSection from "./../components/ProductsSection/ProductsSection";
import Loader from "./../components/Loader/Loader";
import MainSec from "./../containers/Main";

import data from "./../utilities/data";

import { AppContainer } from "./../styles/styles";

let cache;

function Home({ onError }) {
  const [products, setProducts] = useState(cache ? cache.products : []);
  const [categories, setCategories] = useState(cache ? cache.categories : []);
  const [isLoading, setIsLoading] = useState(false);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    if (cache !== undefined) {
      return;
    }
    setIsLoading(true);
    onError(undefined);
    Promise.all([fetchProducts(), fetchCatogories()])
      .then(([products, categories]) => {
        setProducts(products);
        setCategories(categories);
        cache = { products, categories };
      })
      .catch(({ message }) =>
        onError({ message, retry: () => setRetry(!retry) })
      )
      .finally(() => setIsLoading(false));
  }, [retry, onError]);

  return (
    <AppContainer>
      <MainSec>
        <Hero
          cover={data.cover}
          title={data.title}
          description={data.description}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <ProductsSection products={products} categories={categories} />
        )}
      </MainSec>
    </AppContainer>
  );
}

export default Home;
