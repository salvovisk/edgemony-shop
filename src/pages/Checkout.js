import {
  CheckoutBody,
  CheckoutHeader,
  CheckoutForm,
  InputLabel,
  CheckoutInput,
  CheckoutBtn,
} from "../styles/styles";

function Checkout() {
  return (
    <CheckoutBody>
      <CheckoutForm>
        <CheckoutHeader>Confirm your order</CheckoutHeader>
        <InputLabel htmlFor="first-name">First Name</InputLabel>
        <CheckoutInput
          id="first-name"
          type="text"
          name="first-name"
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
        <CheckoutBtn> Confirm </CheckoutBtn>
      </CheckoutForm>
    </CheckoutBody>
  );
}

export default Checkout;
