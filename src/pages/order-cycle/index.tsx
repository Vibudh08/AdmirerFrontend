import React from "react";

import Cart from "../../components/cart-checkout/cart";
import Checkout from "../../components/cart-checkout/checkout";

const Complete_cart_checkout = () => {
  return (
    <div className="bg-white p-8 max-md:p-0">
      <div className="flex w-[90%] m-auto max-md:flex-col max-md:w-full  border">
        <Cart />
        <Checkout />
      </div>
    </div>
  );
};

export default Complete_cart_checkout;
