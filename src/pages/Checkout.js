import {
  CheckoutBody,
  CheckoutHeader,
  CheckoutForm,
  InputLabel,
  CheckoutInput,
  CheckoutBtn,
} from "../styles/styles";

import { useRef } from "react";

function Checkout() {
  const form = useRef(null);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(form.current);
    const parsed = JSON.stringify(Object.fromEntries(data));
    // console.log(data.getAll('first-name', 'last-name',));
    console.log(parsed);
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
        <InputLabel htmlFor="last-name"> Last Name</InputLabel>
        <CheckoutInput
          id="last-name"
          type="text"
          name="last-name"
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
