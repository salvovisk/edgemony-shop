const formatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(price) {
  return formatter.format(price);
}
