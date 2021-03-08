import { rest } from "msw";
const products = require("./data/products.json");
const categories = require("./data/categories.json");

const baseURL = "https://fakestoreapi.com";

function getError() {
  const errors = [
    { status: 400, message: "The server could not understand the request." },
    { status: 401, message: "The user is not authorized." },
    { status: 404, message: "Resource not found." },
    { status: 408, message: "Request timeout." },
    {
      status: 418,
      message: "I'm a teapot. I cannot brew coffee, because I'm a teapot.",
    },
    { status: 500, message: "An expected error occurred." },
    { status: 502, message: "Bad gateway." },
    { status: 503, message: "The server is not ready to handle the request." },
  ];
  return errors[Math.floor(Math.random() * errors.length)];
}

function randomError(resolverFn) {
  return function (req, res, ctx) {
    if (Math.random() > 0.8) {
      const { status, message } = getError();
      return res(ctx.status(status), ctx.json({ message }));
    }
    return resolverFn(req, res, ctx);
  };
}

export const handlers = [
  rest.get(
    `${baseURL}/products`,
    randomError(function orderItems(req, res, ctx) {
      const q = req.url.searchParams.get("q");
      const limit = parseInt(req.url.searchParams.get("limit"));
      const offset = parseInt(req.url.searchParams.get("offset")) || 0;
      let filteredProducts = products;
      if (q) {
        filteredProducts = products.filter(
          (product) => product.title.search(new RegExp(q, "i")) !== -1
        );
      }
      if (limit) {
        filteredProducts = filteredProducts.slice(offset, offset + limit);
      }
      return res(ctx.status(200), ctx.json(filteredProducts));
    })
  ),
  rest.get(
    `${baseURL}/products/categories`,
    randomError(function orderItems(req, res, ctx) {
      return res(ctx.status(200), ctx.json(categories));
    })
  ),
  rest.get(
    `${baseURL}/products/categories/:category`,
    randomError(function orderItems(req, res, ctx) {
      const { category } = req.params;
      const filteredProducts = products.filter((p) => p.category === category);
      return res(ctx.status(200), ctx.json(filteredProducts));
    })
  ),
  rest.get(
    `${baseURL}/products/:productId`,
    randomError(function orderItems(req, res, ctx) {
      const { productId } = req.params;
      const product = products.find((p) => p.id + "" === productId);
      if (product) {
        return res(ctx.status(200), ctx.json(product));
      }
      return res(ctx.status(404));
    })
  ),
];
