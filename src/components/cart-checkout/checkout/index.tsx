import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import navigate
import { GoTag } from "react-icons/go";
import { Modal } from "antd";
import Coupons_screen from "../../coupons/Coupons_screen";
import OrderSuccessModal from "../../OrderSuccessModal";
import {
  nimbusDelievery_API,
  razorPayCreateOrderApi,
  razorPayStoreApi,
} from "../../api/api-end-points";

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
  state: string;
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
  useEffect(() => {
    console.log("the shipping data in checkout is = ", shippingData);
  }, [shippingData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("online");
  const [showAddressError, setShowAddressError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 👈 initialize navigate

  const isLoading =
    !itemCount ||
    itemCount === 0 ||
    !totalMRP ||
    totalMRP === "0" ||
    !totalAmount ||
    totalAmount === "0";

  if (isLoading) return <div></div>;

  const handlePlaceOrder = async () => {
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
      navigate("/LogIn"); // 👈 redirect if not logged in
      return;
    }

    if (!shippingData) {
      setShowAddressError(true);
      return;
    }
    setShowAddressError(false);
    setLoading(true);

    const order_number = "BTJ" + new Date().getTime();

    if (selected === "online") {
      try {
        const createOrderRes = await fetch(razorPayCreateOrderApi, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        });

        const orderData = await createOrderRes.json();

        const options = {
          key: "rzp_live_9dQQZTZXMKwBMJ",
          amount: orderData.amount,
          currency: "INR",
          name: "BTJ Admirer",
          description: "Order Payment",
          order_id: orderData.order_id,
          handler: async function (response: any) {
            try {
              setLoading(true);
              const verifyRes = await fetch(razorPayStoreApi, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${authToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (verifyRes.ok) {
                const payload = {
                  orderID: order_number,
                  paymentType: "prepaid",
                  amount: totalAmount,
                  city: shippingData?.city || "",
                  firstName: shippingData?.first_name || "",
                  lastName: shippingData?.last_name || "",
                  flat: shippingData?.flat || "",
                  locality: shippingData?.locality || "",
                  state: shippingData?.state || "",
                  street: shippingData?.street || "",
                  pincode: shippingData?.zip_code || "",
                };
                const nimbusRes = await fetch(nimbusDelievery_API, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });

                if (nimbusRes.status === 200) {
                  setOrderId(order_number);
                  setShowSuccessModal(true);
                  setLoading(false);
                } else {
                  alert("Order placed but failed to notify delivery service.");
                  setLoading(false);
                }
              } else {
                alert("Payment verification failed.");
              }
            } catch (err) {
              console.error("❌ Error verifying payment:", err);
              alert("Error verifying payment. Please try again.");
            }
          },
          prefill: {
            name: `${shippingData?.first_name || ""} ${
              shippingData?.last_name || ""
            }`,
            email: shippingData?.email || "",
            contact: shippingData?.phone || "",
          },
          theme: { color: "#7B48A5" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("❌ Error during payment:", err);
        alert("Something went wrong while processing online payment.");
      }
    } else {
      try {
        const payload = {
          orderID: order_number,
          paymentType: "cod",
          amount: totalAmount,
          city: shippingData?.city || "",
          firstName: shippingData?.first_name || "",
          lastName: shippingData?.last_name || "",
          flat: shippingData?.flat || "",
          locality: shippingData?.locality || "",
          state: shippingData?.state || "",
          street: shippingData?.street || "",
          pincode: shippingData?.zip_code || "",
        };
        console.log("payload is ", payload);
        const response = await fetch(nimbusDelievery_API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 200) {
          setOrderId(order_number);
          setShowSuccessModal(true);
        } else {
          alert("Failed to place COD order.");
        }
      } catch (err) {
        console.error("❌ Error placing COD order:", err);
        alert("Something went wrong while placing your order.");
      }
    }
    setLoading(false);
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
      <OrderSuccessModal
        open={showSuccessModal}
        orderId={orderId}
        onClose={() => setShowSuccessModal(false)}
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

        <div className="border mb-5 rounded-lg">
          <div
            onClick={() => setSelected("online")}
            className={`flex items-center p-3 border-b rounded-t-lg  cursor-pointer ${
              selected === "online" ? "bg-purple-100" : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selected === "online"}
              onChange={() => setSelected("online")}
              className="form-radio hidden text-purple-700 mr-3"
            />
            <img src="/icons/online.svg" className="w-6 h-6 mr-2" alt="" />
            <label className="text-[14px] select-none  cursor-pointer">
              Online
            </label>
          </div>

          <div
            onClick={() => setSelected("cod")}
            className={`flex items-center p-3 rounded-b-lg   cursor-pointer  ${
              selected === "cod" ? "bg-purple-100" : "bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selected === "cod"}
              onChange={() => setSelected("cod")}
              className="form-radio hidden text-purple-700 mr-3"
            />
            <img src="/icons/cash-icon.svg" className="w-6 h-6 mr-2" alt="" />
            <label className="text-[14px] select-none cursor-pointer">
              Cash On Delivery
            </label>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full border rounded h-[44px] py-2 text-sm font-semibold text-white ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "hover:bg-purple-700 bg-purple-600"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center text-sm text-white">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Confirming your order...
            </div>
          ) : (
            "PLACE ORDER"
          )}
        </button>

        {showAddressError && (
          <div className="mt-3 bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded text-sm">
            Please select or enter a delivery address before placing the order.
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
