import { useState, useEffect } from "react";
import { fetchProducts, fetchCatogories } from "./../services/api";

import Hero from "./../components/Hero/Hero";
import ProductsSection from "./../components/ProductsSection/ProductsSection";
import Loader from "./../components/Loader/Loader";
import ErrorProduct from "./../components/ErrorProduct/ErrorProduct";
import MainSec from "./../containers/Main";

import data from "./../utilities/data";

import { AppContainer } from "./../styles/styles";

let cache;

function Home() {
  // Api data logic

  const [products, setProducts] = useState(cache ? cache.products : []);
  const [categories, setCategories] = useState(cache ? cache.categories : []);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    if (cache !== undefined) {
      return;
    }
    setLoading(true);
    setError("");
    Promise.all([fetchProducts(), fetchCatogories()])
      .then(([products, categories]) => {
        setProducts(products);
        setCategories(categories);
        cache = { products, categories };
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [retry]);

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
        ) : isError ? (
          <ErrorProduct
            message={isError}
            close={() => setError("")}
            retry={() => setRetry(!retry)}
          />
        ) : (
          <ProductsSection products={products} categories={categories} />
        )}
      </MainSec>
    </AppContainer>
  );
}

export default Home;
