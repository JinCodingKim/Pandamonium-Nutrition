import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import STRIPE_PUBLISHABLE from "../../constants/stripe";
import PAYMENT_SERVER_URL from "../../constants/server";

//Sweetalert2
import swal from "sweetalert2";

const CURRENCY = "USD";

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  swal({
    title: `Thank you for your business!`,
    type: "success",
    confirmButtonText: "Back to Cart",
    confirmButtonColor: "#757575"
  });
};

const errorPayment = data => {
  swal({
    title: `Uh-oh! Try again!`,
    type: "error",
    confirmButtonText: "Back to Cart",
    confirmButtonColor: "#757575"
  });
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={"pk_test_hupM6s14kQbOFeFdl1LotXoZ"}
  />
);

export default Checkout;
