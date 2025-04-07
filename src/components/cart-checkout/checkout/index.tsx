import React, { useState } from "react";
import { GoTag } from "react-icons/go";
import { Modal, Button } from "antd";
import Coupons_screen from "../../coupons/Coupons_screen"; // Adjust path as needed

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
  totalMRP = "14,995",
  discount = "10,497",
  couponApplied = false,
  platformFee = "Free",
  shippingFee = "Free",
  totalAmount = "14,995",
}) => {
  const priceDetails: PriceDetail[] = [
    { label: "Total MRP", value: `₹${totalMRP}` },
    { label: "Discount on MRP", value: `-₹${discount}`, isDiscount: true },
    {
      label: "Coupon Discount",
      value: couponApplied ? "₹500" : "Apply Coupon",
      isLink: !couponApplied,
    },
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("online");

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  return (
    <>
      <div className="w-[35%] p-5 py-6 border-l bg-white border-[#eaeaec]">
        {/* Coupon Section */}
        <div className="mb-4">
          <h3 className="text-[13px] text-[rgb(83,87,102)] font-semibold mb-4">
            COUPONS
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <GoTag className="text-[19px] mt-1" />
              <p className="font-semibold text-[#282c3f] mb-0 mt-1">
                Apply Coupons
              </p>
            </div>
            <button
              className="px-3 py-1 border border-[#7B48A5] text-sm font-semibold text-[#7B48A5] hover:bg-[rgb(245,245,245)]"
              onClick={showModal}
            >
              APPLY
            </button>
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              width={550}
              centered
              closable={false}
              className="no-padding-modal"
              bodyStyle={{
                padding: 0,
                background: "transparent",
                boxShadow: "none",
                borderRadius: 0,
              }}
            >
              <Coupons_screen onClose={() => setIsModalOpen(false)} />
            </Modal>
          </div>
        </div>

        <hr />

        {/* Price Details */}
        <div className="mt-5 mb-4">
          <h3 className="text-[13px] text-[#535766] font-bold mb-4">
            PRICE DETAILS ({itemCount} item{itemCount > 1 ? "s" : ""})
          </h3>
          <div className="leading-[30px]">
            {priceDetails.map((detail, index) => (
              <div key={index} className="flex justify-between text-[14px]">
                <div className="text-[#282c3f] leading-5">{detail.label}</div>
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

        <h2 className="text-[13px] text-[#535766] font-bold mb-4 mt-5">PAYMENT METHOD</h2>

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
          <label className="text-[14px]">Online</label>
        </div>

        <div
          onClick={() => setSelected("cod")}
          className={`flex items-center p-2 border rounded mt-2 cursor-pointer mb-5 ${
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
          <label className="text-[14px]">Cash On Delivery</label>
        </div>
        <button className="w-full border rounded h-[44px] py-2 text-sm font-semibold text-white hover:bg-purple-700 bg-purple-600">
          PLACE ORDER
        </button>
      </div>
    </>
  );
};

export default Checkout;
