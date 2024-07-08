import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import Checkout from "@/components/Form/Checkout/Checkout";

import config from "@/config/config";

const stripePromise = loadStripe(config.stripePublishableKey);

const FormCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default FormCheckout;
