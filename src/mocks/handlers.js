import { rest } from "msw";
const products = require("./data/products.json");
const categories = require("./data/categories.json");

const localStoragePrefix = "_edgemony-shop";
const localStorageJSON = localStorage.getItem(localStoragePrefix);
const savedData = localStorageJSON
  ? JSON.parse(localStorageJSON)
  : { orders: [], carts: [], cartId: 0, orderId: 0, v: "0.2" };

(function migration02() {
  if (savedData.v === "0.1") {
    savedData.v = "0.2";
    savedData.orderId = 0;
  }
})();

function save() {
  localStorage.setItem(localStoragePrefix, JSON.stringify(savedData));
}

if (!localStorage.getItem("edgemony-cart-id")) {
  const newCart = createCart();
  localStorage.setItem("edgemony-cart-id", newCart.id);
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

function mapItem({ id: productId, quantity }) {
  const { id, title, price, image } = getProduct(productId, 400);
  return { id, title, price, image, quantity };
}

function mapOrderToListItem(order) {
  const { id, items, billingData, created } = order;
  return {
    id,
    nItems: items.length,
    totalPrice: items.reduce((total, item) => total + item.price, 0),
    name: billingData?.name,
    lastName: billingData?.lastName,
    email: billingData?.email,
    created,
  };
}

function mapOrderToItem(order) {
  const { id, items, billingData, created } = order;
  return {
    id,
    items: items.map(mapItem),
    billingData,
    created,
  };
}

function mapCart(cart) {
  const { items, ...otherProps } = cart;
  return {
    items: items.map(mapItem),
    ...otherProps,
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
  return cart;
}

function removeFromCart(cartId, productId) {
  const cart = getCart(cartId);
  const index = cart.items.findIndex((product) => product.id === productId);
  if (index === -1) {
    throw new HttpError("Item not found", 404);
  }
  cart.items.splice(index, 1);
  save();
  return cart;
}

function getProduct(id, status = 404) {
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new HttpError("Product not found", status);
  }
  return product;
}

function updateCartBillingData(cartId, billingData) {
  if (
    !cartId ||
    typeof billingData !== "object" ||
    typeof billingData.name !== "string" ||
    !billingData.name ||
    typeof billingData.lastName !== "string" ||
    !billingData.lastName ||
    typeof billingData.address !== "string" ||
    !billingData.address ||
    typeof billingData.email !== "string" ||
    !billingData.email
  ) {
    throw new HttpError("Invalid data", 400);
  }
  const cart = getCart(cartId);
  cart.billingData = billingData;
  save();
  return cart;
}

function createOrder(cartId) {
  const cart = getCart(cartId);
  const id = ++savedData.orderId;
  const order = { ...cart, id, created: new Date() };
  savedData.orders.push(order);
  save();
  return order;
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
        return res(ctx.status(200), ctx.json(mapCart(cart)));
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
  rest.patch(
    `${baseURL}/carts/:id`,
    randomError(function getCartApi(req, res, ctx) {
      const id = parseInt(req.params.id);
      try {
        const { billingData } = JSON.parse(req.body);
        const cart = updateCartBillingData(id, billingData);
        return res(ctx.status(200), ctx.json(mapCart(cart)));
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
        const cart = addToCart(id, productId, quantity);
        return res(ctx.status(200), ctx.json(mapCart(cart)));
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
        const cart = removeFromCart(id, productId);
        return res(ctx.status(200), ctx.json(mapCart(cart)));
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
  rest.get(
    `${baseURL}/orders`,
    randomError(function getOrdersApi(req, res, ctx) {
      try {
        const orders = savedData.orders;
        return res(ctx.status(200), ctx.json(orders.map(mapOrderToListItem)));
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
    `${baseURL}/orders`,
    randomError(function createOrderApi(req, res, ctx) {
      try {
        const { cartId } = JSON.parse(req.body);
        const order = createOrder(cartId);
        return res(ctx.status(200), ctx.json(mapOrderToItem(order)));
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
