import { rest } from "msw";
const products = require("./data/products.json");
const categories = require("./data/categories.json");

const localStoragePrefix = "_edgemony-shop";
const localStorageJSON = localStorage.getItem(localStoragePrefix);
const savedData = localStorageJSON
  ? JSON.parse(localStorageJSON)
  : { orders: [], carts: [], cartId: 0, v: "0.1" };

function save() {
  localStorage.setItem(localStoragePrefix, JSON.stringify(savedData));
}

{
  if (!localStorage.getItem("edgemony-cart-id")) {
    const newCart = createCart();
    localStorage.setItem("edgemony-cart-id", newCart.id);
  }
  const currentCartId = JSON.parse(localStorage.getItem("edgemony-cart-id"));
  const cart = getCart(currentCartId);
  localStorage.setItem(
    "edgemony-cart",
    JSON.stringify(getCartWithProducts(cart))
  );
}

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function getCart(cartId) {
  const cart = savedData.carts.find((cart) => cart.id === cartId);
  if (!cart) {
    throw new HttpError("Cart not found", 404);
  }
  return cart;
}

function getCartWithProducts(cart) {
  return {
    ...cart,
    items: cart.items.map(({ id: productId, quantity }) => {
      const { id, title, price, image } = getProduct(productId, 400);
      return { id, title, price, image, quantity };
    }),
  };
}

function createCart() {
  const id = ++savedData.cartId;
  const cart = { id, items: [] };
  savedData.carts.push(cart);
  save();
  return cart;
}

function addToCart(cartId, productId, quantity) {
  if (!cartId || !productId || quantity <= 0) {
    throw new HttpError("Invalid data", 400);
  }
  const cart = getCart(cartId);
  const { id } = getProduct(productId, 400); // check if the product exists
  const index = cart.items.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.items[index].quantity = quantity;
  } else {
    cart.items.push({ id, quantity });
  }
  save();
  return getCartWithProducts(cart);
}

function removeFromCart(cartId, productId) {
  const cart = getCart(cartId);
  const index = cart.items.findIndex((product) => product.id === productId);
  if (index === -1) {
    throw new HttpError("Item not found", 404);
  }
  cart.items.splice(index, 1);
  save();
  return getCartWithProducts(cart);
}

function getProduct(id, status = 404) {
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new HttpError("Product not found", status);
  }
  return product;
}

const baseURL = "https://fakestoreapi.herokuapp.com";

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
    if (Math.random() > 0.9) {
      const { status, message } = getError();
      return res(ctx.status(status), ctx.json({ message }));
    }
    return resolverFn(req, res, ctx);
  };
}

export const handlers = [
  rest.get(
    `${baseURL}/products`,
    randomError(function getProductsApi(req, res, ctx) {
      const q = req.url.searchParams.get("q");
      const limit = parseInt(req.url.searchParams.get("limit"));
      const offset = parseInt(req.url.searchParams.get("offset")) || 0;
      let filteredProducts = products.map((product) => {
        // delete product.description;
        return product;
      });
      if (q) {
        filteredProducts = filteredProducts.filter(
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
    randomError(function getCategoriesApi(req, res, ctx) {
      return res(ctx.status(200), ctx.json(categories));
    })
  ),
  rest.get(
    `${baseURL}/products/categories/:category`,
    randomError(function getCategoryApi(req, res, ctx) {
      const { category } = req.params;
      const filteredProducts = products.filter((p) => p.category === category);
      return res(ctx.status(200), ctx.json(filteredProducts));
    })
  ),
  rest.get(
    `${baseURL}/products/:productId`,
    randomError(function getProductApi(req, res, ctx) {
      const productId = parseInt(req.params.productId);
      return res(ctx.status(200), ctx.json(getProduct(productId)));
    })
  ),
  rest.get(
    `${baseURL}/carts/:id`,
    randomError(function getCartApi(req, res, ctx) {
      const id = parseInt(req.params.id);
      try {
        const cart = getCart(id);
        return res(ctx.status(200), ctx.json(getCartWithProducts(cart)));
      } catch (error) {
        if (error instanceof HttpError) {
          return res(
            ctx.status(error.status),
            ctx.json({ message: error.message })
          );
        }
        return res(ctx.status(500), ctx.json({ message: error.message }));
      }
    })
  ),
  rest.post(
    `${baseURL}/carts/:id/items`,
    randomError(function addToCartApi(req, res, ctx) {
      try {
        const id = parseInt(req.params.id);
        const { id: productId, quantity } = JSON.parse(req.body);
        return res(
          ctx.status(200),
          ctx.json(addToCart(id, productId, quantity))
        );
      } catch (error) {
        if (error instanceof HttpError) {
          return res(
            ctx.status(error.status),
            ctx.json({ message: error.message })
          );
        }
        return res(ctx.status(500), ctx.json({ message: error.message }));
      }
    })
  ),
  rest.post(
    `${baseURL}/carts`,
    randomError(function createCartApi(req, res, ctx) {
      return res(ctx.status(200), ctx.json(createCart()));
    })
  ),
  rest.delete(
    `${baseURL}/carts/:id/items/:productId`,
    randomError(function removeCartItemApi(req, res, ctx) {
      try {
        const id = parseInt(req.params.id);
        const productId = parseInt(req.params.productId);
        return res(ctx.status(200), ctx.json(removeFromCart(id, productId)));
      } catch (error) {
        if (error instanceof HttpError) {
          return res(
            ctx.status(error.status),
            ctx.json({ message: error.message })
          );
        }
        return res(ctx.status(500), ctx.json({ message: error.message }));
      }
    })
  ),
];
