import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { order_detail_API, getAddress_API } from "../api/api-end-points";

const OrderDetails: React.FC = () => {
  const { id } = useParams();

  interface OrderDetail {
    price: string;
    order_id: string;
    quantity: string;
    payment_type: string;
    date: string;
    time: string;
    product_name: string;
    description: string;
    image: string;
  }

  const [orderData, setOrderData] = useState<OrderDetail[]>([]);
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [productNames, setProductNames] = useState<string[]>([]);
  const [payment_type, setPayment_type] = useState();

  useEffect(() => {
    fetch(order_detail_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "Order detail data: ",
          data?.data,
          "status = ",
          data?.tracking_status
        );
        setOrderData(data?.data);
        setStatus(data?.tracking_status);
        setPayment_type(data.data[0].payment_type);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, []);
  //Address handling
  interface Address {
    first_name: string;
    last_name: string;
    flat: string;
    street: string;
    locality: string;
    city: string;
    zip_code: string;
    country_name: string;
    state: string;
    addr_type: string;
  }
  const [address, setAddress] = useState<Address>();
  useEffect(() => {
    fetch(getAddress_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.data);
      });
  }, []);
  useEffect(() => {
    if (orderData && Array.isArray(orderData)) {
      const names: string[] = [];
      let total = 0;

      orderData.forEach((item) => {
        if (item.product_name) names.push(item.product_name);
        if (item.price)
          total += parseFloat(item.price) * parseFloat(item.quantity);
      });

      setProductNames(names);
      setTotalPrice(total);
    }
  }, [orderData]);

  if (!orderData) {
    return (
      <div className="text-center mt-10 text-red-600">Order not found</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Order Items */}
        <div className="flex-1 space-y-4">
          {orderData.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded shadow-sm p-6 pb-8"
            >
              <div className="flex gap-6">
                {order.image && (
                  <div className="w-[30%] h-full flex items-center justify-center">
                    <img
                      src={
                        "https://admirer.in/asset/image/product/" + order.image
                      }
                      alt={order.product_name}
                      className="w-full h-full object-contain"
                      style={{ maxHeight: "100%" }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 text-[15px] leading-snug">
                    {order.product_name}
                  </h2>
                  {/* <p className="text-xs text-gray-500 mt-0.5">
                    Seller: LogicDevices
                  </p> */}
                  <p className="text-lg font-semibold text-gray-800 mt-2">
                    ₹{order.price}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5 font-semibold">
                    Quantity: {order.quantity}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-col gap-3 text-gray-800">
                  <div className="relative pl-4 ml-1 border-l-2 border-green-600 space-y-4">
                    <div className="ml-[-25px] gap-[15px] flex flex-col">
                      <div className="flex items-center gap-2 mt-[-2px]">
                        <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center z-10">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="text-[13px]">Order Confirmed</span>
                      </div>

                      <div className="flex items-center gap-2 mb-[-2px]">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center z-10">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="text-[13px] font-medium">
                          {status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t mt-6 pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-10 h-10 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.783.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.048 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.285-3.967z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section - Order Summary */}
        <div className="md:w-80 space-y-4">
          <div className="flex justify-between text-sm font-medium bg-white border rounded shadow-sm p-4 cursor-pointer">
            <div className="flex gap-3">
              <FaFileInvoice className="h-5 w-5" />
              <span className="text-[16px] font-medium">Invoice download</span>
            </div>
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          <div className="bg-white border rounded shadow-sm p-5">
            <h4 className="text-sm font-semibold mb-1">Shipping details</h4>
            <p className="text-xs text-gray-700 leading-5">
              <strong>
                {address?.first_name} {address?.last_name}
              </strong>
              ,&nbsp;
              {address?.flat},&nbsp;
              {address?.street},&nbsp;
              {address?.locality},&nbsp;
              {address?.city},&nbsp;
              {address?.state} - {address?.zip_code},&nbsp;
              {address?.addr_type}
              <br />
              <strong>Phone number:</strong> 8736977153
            </p>
          </div>

          <div className="bg-white border rounded shadow-sm p-5">
            <h4 className="text-sm font-semibold mb-2">Price Details</h4>
            <div className="text-xs text-gray-700 space-y-2">
              {/* <div className="flex justify-between">
                <span>List price</span>
                <span className="line-through text-gray-500">₹54,990</span>
              </div> */}
              <div className="flex justify-between">
                <span>Selling price</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span className="font-semibold text-black">Total Amount</span>
                <span className="font-semibold text-black">₹{totalPrice}</span>
              </div>
              <div className="pt-1">
                <span className="text-gray-700">• </span> {payment_type}: ₹
                {totalPrice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
