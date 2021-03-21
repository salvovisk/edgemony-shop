import {
  CheckoutBody,
  CheckoutHeader,
  CheckoutForm,
  InputLabel,
  CheckoutInput,
  CheckoutBtn,
} from "../styles/styles";

import { useRef } from "react";
// import { createOrderApi, updateCartApi } from "../services/api";

function Checkout({ cartId, onSubmitOrder }) {
  const form = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(form.current);
    const billingData = Object.fromEntries(data);
    const billingDataraw = { billingData };
    onSubmitOrder(cartId, billingDataraw);
  }

  return (
    <CheckoutBody>
      <CheckoutForm ref={form} onSubmit={onSubmit}>
        <CheckoutHeader>Confirm your order</CheckoutHeader>
        <InputLabel htmlFor="name">Name</InputLabel>
        <CheckoutInput
          id="name"
          type="text"
          name="name"
          required
        ></CheckoutInput>
        <InputLabel htmlFor="lastName"> Last Name</InputLabel>
        <CheckoutInput
          id="lastName"
          type="text"
          name="lastName"
          required
        ></CheckoutInput>
        <InputLabel htmlFor="address">Address</InputLabel>
        <CheckoutInput
          id="address"
          type="text"
          name="address"
          required
        ></CheckoutInput>
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <CheckoutInput
          id="email"
          type="email"
          name="email"
          required
        ></CheckoutInput>
        <CheckoutBtn type="submit"> Confirm </CheckoutBtn>
      </CheckoutForm>
    </CheckoutBody>
  );
}

export default Checkout;
