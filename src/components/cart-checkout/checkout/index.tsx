import React, { useState } from "react";
import { GoTag } from "react-icons/go";
import { Modal } from "antd";
import Coupons_screen from "../../coupons/Coupons_screen";

interface PriceDetail {
  label: string;
  value: string;
  isFree?: boolean;
  isDiscount?: boolean;
  isLink?: boolean;
}

interface IndexProps {
  itemCount?: number;
  totalMRP?: string;
  discount?: string;
  couponApplied?: boolean;
  platformFee?: string;
  shippingFee?: string;
  totalAmount?: string;
}

const Checkout: React.FC<IndexProps> = ({
  itemCount = 1,
  totalMRP = "0",
  discount = "0",
  couponApplied = false,
  platformFee = "Free",
  shippingFee = "Free",
  totalAmount = "0",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("online");

  // Loader condition based on props
  const isLoading =
    !itemCount || itemCount === 0 ||
    !totalMRP || totalMRP === "0" ||
    !totalAmount || totalAmount === "0";

  if (isLoading) {
    return (
      <div></div>
    );
  }

  const priceDetails: PriceDetail[] = [
    { label: "Total MRP", value: `₹${totalMRP}` },
    { label: "Discount on MRP", value: `-₹${discount}`, isDiscount: true },
    {
      label: "Platform Fee",
      value: platformFee,
      isFree: platformFee === "Free",
    },
    {
      label: "Shipping Fee",
      value: shippingFee,
      isFree: shippingFee === "Free",
    },
  ];

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
    
      <div className="w-[35%] max-md:w-[100%] p-5 py-6 border-l bg-white border-[#eaeaec]">
        {/* Price Details */}
        <div className="mt-3 mb-4">
          <h3 className="text-[14px] text-[#535766] font-bold mb-4">
            PRICE DETAILS ({itemCount} item{itemCount > 1 ? "s" : ""})
          </h3>
          <div className="leading-[28px]">
            {priceDetails.map((detail, index) => (
              <div key={index} className="flex justify-between text-[14px]">
                <div className="text-[#282c3f] tracking-normal">{detail.label}</div>
                <div
                  className={`${
                    detail.isDiscount
                      ? "text-[#03a685]"
                      : detail.isLink
                      ? "text-[#7B48A5]"
                      : detail.isFree
                      ? "text-[#03a685]"
                      : "text-[#282c3f]"
                  }`}
                >
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="mb-5">
          <div className="flex justify-between mt-4 mb-4 text-[15px] font-bold text-[#3e4152]">
            <div>Total Amount</div>
            <div>₹{totalAmount}</div>
          </div>
        </div>
        <hr />

        <h2 className="text-[14px] text-[#535766] font-bold mb-4 mt-5">PAYMENT METHOD</h2>

        <div
          onClick={() => setSelected("online")}
          className={`flex items-center p-2 border rounded cursor-pointer ${
            selected === "online" ? "border-purple-600" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={selected === "online"}
            onChange={() => setSelected("online")}
            className="form-radio text-purple-700 mr-3"
          />
          <label className="text-[14px] select-none cursor-pointer">Online</label>
        </div>

        <div
          onClick={() => setSelected("cod")}
          className={`flex items-center p-2 border rounded mt-2.5 cursor-pointer mb-5 ${
            selected === "cod" ? "border-purple-600" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={selected === "cod"}
            onChange={() => setSelected("cod")}
            className="form-radio text-purple-700 mr-3"
          />
          <label className="text-[14px] select-none cursor-pointer">Cash On Delivery</label>
        </div>
        <button className="w-full border rounded h-[44px] py-2 text-sm font-semibold text-white hover:bg-purple-700 bg-purple-600">
          PLACE ORDER
        </button>
      </div>
    </>
  );
};

export default Checkout;
