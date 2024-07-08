import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit} className="bg-green-600">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <CardElement />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </form>
  );
};

export default Checkout;
