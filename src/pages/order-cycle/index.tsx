import React, { useEffect, useState } from "react";
import Cart from "../../components/cart-checkout/cart";
import Checkout from "../../components/cart-checkout/checkout";
import { Link } from "react-router-dom";

const Complete_cart_checkout = () => {
  const [totalMRP, setTotalMRP] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [shippingData, setShippingData] = useState();
  useEffect(() => {
    console.log("shipping id at main page is = ", shippingData);
  }, [shippingData]);
  useEffect(() => {
    localStorage.setItem("itemCount", itemCount.toString());
  }, [itemCount]);
  return (
    <div className="bg-white p-8 max-md:p-0">
      <div className="flex w-[85%] m-auto max-md:flex-col max-md:w-full border">
        <Cart
          setTotalMRP={setTotalMRP}
          setDiscountAmount={setDiscountAmount}
          setTotalAmount={setTotalAmount}
          setItemCount={setItemCount}
          setShippingData={setShippingData}
        />
        <Checkout
          totalMRP={totalMRP.toFixed(2)}
          discount={discountAmount.toFixed(2)}
          totalAmount={totalAmount.toFixed(2)}
          itemCount={itemCount}
          shippingData={shippingData}
        />
      </div>
      <div className="mt-8 border-t flex max-md:flex-col justify-between w-[90%] m-auto items-center">
        <div className="mt-5 flex gap-2 flex-wrap">
          <div className="w-16 h-fit">
            <img 
              src="/icons/footer-bank-visa.png"
              alt=""
            />
          </div>
          <div className="w-16 h-fit">
            <img
              src="/icons/footer-bank-mc.png"
              alt=""
            />
          </div>
          <div className="w-16 h-fit">
            <img
              src="/icons/footer-bank-ae.png"
              alt=""
            />
          </div>
          <div className="w-16 h-fit">
            <img
            className="h-[38px]"
              src="/icons/footer-bank-cod.png"
              alt=""
            />
          </div>
          <div className="w-16 h-fit">
            <img
            className="h-[38px]"
              src="/icons/footer-bank-nb.png"
              alt=""
            />
          </div>
          <div className="w-16 h-fit">
            <img
              src="/icons/footer-bank-rupay.png"
              alt=""
            />
          </div>
          <div className="w-16 h-fit">
            <img
              src="/icons/footer-bank-bhim.png"
              alt=""
            />
          </div>
        </div>
        <div className="mt-5 text-[#1f295c] text-sm cursor-pointer font-[500]">
        <Link to="/help_faq"> <strong> Need Help? Contact Us</strong></Link>
        </div>
      </div>
    </div>
  );
};

export default Complete_cart_checkout;
