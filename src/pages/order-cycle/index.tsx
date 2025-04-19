import React, { useState } from "react";
import Cart from "../../components/cart-checkout/cart";
import Checkout from "../../components/cart-checkout/checkout";
import { Link } from "react-router-dom";

const Complete_cart_checkout = () => {
  const [totalMRP, setTotalMRP] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  return (
    <div className="bg-white p-8 max-md:p-0">
      {itemCount === 0 ? (
        <div className="flex flex-col items-center justify-center  text-gray-600 h-[80vh] py-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your cart is empty</h2>
        <Link
          to="/"
          className="text-blue-600 hover:underline font-medium text-center"
        >
          Shop now
        </Link>
      </div>
      
      
      ) : (
        <div className="flex w-[90%] m-auto max-md:flex-col max-md:w-full border">
          <Cart
            setTotalMRP={setTotalMRP}
            setDiscountAmount={setDiscountAmount}
            setTotalAmount={setTotalAmount}
            setItemCount={setItemCount}
          />
          <Checkout
            totalMRP={totalMRP.toFixed(2)}
            discount={discountAmount.toFixed(2)}
            totalAmount={totalAmount.toFixed(2)}
            itemCount={itemCount}
          />
        </div>
      )}
    </div>
  );
};

export default Complete_cart_checkout;
