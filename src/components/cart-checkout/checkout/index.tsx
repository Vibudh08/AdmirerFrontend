import React, { useState } from "react";
import { GoTag } from "react-icons/go";
import { Modal } from "antd";
import Coupons_screen from "../../coupons/Coupons_screen";
import OrderSuccessModal from "../../OrderSuccessModal"; // ✅

interface PriceDetail {
  label: string;
  value: string;
  isFree?: boolean;
  isDiscount?: boolean;
  isLink?: boolean;
}

interface ShippingData {
  first_name: string;
  last_name: string;
  flat: string;
  street: string;
  locality: string;
  country_name: string;
  state_name: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  addr_type: string;
}

interface IndexProps {
  itemCount?: number;
  totalMRP?: string;
  discount?: string;
  couponApplied?: boolean;
  platformFee?: string;
  shippingFee?: string;
  totalAmount?: string;
  shippingData?: ShippingData;
}

const Checkout: React.FC<IndexProps> = ({
  itemCount = 1,
  totalMRP = "0",
  discount = "0",
  couponApplied = false,
  platformFee = "Free",
  shippingFee = "Free",
  totalAmount = "0",
  shippingData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("online");

  const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅
  const [orderId, setOrderId] = useState(""); // ✅

  const isLoading =
    !itemCount ||
    itemCount === 0 ||
    !totalMRP ||
    totalMRP === "0" ||
    !totalAmount ||
    totalAmount === "0";

  if (isLoading) {
    return <div></div>;
  }

  const handlePlaceOrder = async () => {
  if (!shippingData) {
    alert("No shipping address");
    return;
  }

  const order_number = "ORD" + new Date().getTime();

  const payload = {
    orderId: order_number,
    paymentType: selected === "cod" ? "COD" : "Prepaid",
    amount: totalAmount,
    city: shippingData.city,
    firstName: shippingData.first_name,
    lastName: shippingData.flat,
    shipping_address: shippingData.last_name,
    locality: shippingData.locality,
    state: shippingData.state_name,
    street: shippingData.street,
    pincode: shippingData.zip_code,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/NimbusShippingStart", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    const status = response.status;
    console.log("Status:", status);

    let result: any = {};
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.warn("⚠️ Non-JSON response:", text);
      throw new Error("Server did not return valid JSON");
    }

    console.log("✅ Response result:", result);

    if (result.success) {
      setOrderId(order_number);
      setShowSuccessModal(true);
    } else {
      alert(result.message || "Failed to place order.");
    }

  } catch (err) {
    console.error("❌ Error placing order:", err);
    alert("Something went wrong while placing your order.");
  }
};

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

  return (
    <>
      {/* ✅ Success Modal */}
      <OrderSuccessModal
        open={showSuccessModal}
        orderId={orderId}
        onClose={() => setShowSuccessModal(false)}
        onViewOrders={() => {
          setShowSuccessModal(false);
          // window.location.href = "/my-orders"; // or use navigate()
        }}
      />

      <div className="w-[35%] max-md:w-[100%] p-5 py-6 border-l bg-white border-[#eaeaec]">
        <div className="mt-3 mb-4">
          <h3 className="text-[14px] text-[#535766] font-bold mb-4">
            PRICE DETAILS ({itemCount} item{itemCount > 1 ? "s" : ""})
          </h3>
          <div className="leading-[28px]">
            {priceDetails.map((detail, index) => (
              <div key={index} className="flex justify-between text-[14px]">
                <div className="text-[#282c3f] tracking-normal">
                  {detail.label}
                </div>
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

        <div className="mb-5">
          <div className="flex justify-between mt-4 mb-4 text-[15px] font-bold text-[#3e4152]">
            <div>Total Amount</div>
            <div>₹{totalAmount}</div>
          </div>
        </div>
        <hr />

        <h2 className="text-[14px] text-[#535766] font-bold mb-4 mt-5">
          PAYMENT METHOD
        </h2>

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
          <label className="text-[14px] select-none cursor-pointer">
            Online
          </label>
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
          <label className="text-[14px] select-none cursor-pointer">
            Cash On Delivery
          </label>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full border rounded h-[44px] py-2 text-sm font-semibold text-white hover:bg-purple-700 bg-purple-600"
        >
          PLACE ORDER
        </button>
      </div>
    </>
  );
};

export default Checkout;
