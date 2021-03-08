const baseURL = "https://fakestoreapi.com";

async function callAPI(endpoint) {
  const response = await fetch(`${baseURL}/${endpoint}`);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.message);
  }
  return data;
}

export async function fetchProducts() {
  return callAPI("products");
}

export async function fetchCatogories() {
  return callAPI("products/categories");
}