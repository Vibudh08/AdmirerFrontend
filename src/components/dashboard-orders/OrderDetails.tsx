import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import {
  order_detail_API,
  getAddress_API,
  productDetails,
  cancelOrder,
  exchangeStatus,
  exchange,
} from "../api/api-end-points";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosReturnLeft,
} from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import Slider from "react-slick";
import SingleProductCard from "../product-detail/SingleProductCard ";
import axios from "axios";
import { toast } from "react-toastify";
import Invoice from "../Invoice";
import ExchangePopupModal from "./ExchangePopupModal";
import { Modal } from "antd";
import { useAwb } from "../../contexts/AwbContext";

// Loader component
const Loader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7b48a5] mb-4"></div>
      <p className="text-lg font-bold text-gray-800">
        Loading your experience, please wait...
      </p>
    </div>
  </div>
);

const OrderDetails: React.FC = () => {
  const { id } = useParams();

  const { orderId } = useParams();
  const location = useLocation();
  const productIds: string[] = location.state?.productIds || [];
  // console.log(productIds.length)
  // console.log("Order ID:", orderId);
  // console.log("All product IDs:", productIds);

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
  // console.log(orderData);
  // console.log(productIds);
  const [status, setStatus] = useState("");
  const [exchangeStatusMap, setExchangeStatusMap] = useState<{
    [key: string]: number;
  }>({});

  const [totalPrice, setTotalPrice] = useState(0);
  const [productNames, setProductNames] = useState<string[]>([]);
  const [payment_type, setPayment_type] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<{ [productId: string]: number }>({});
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [reviewVisible, setReviewVisible] = useState<{
    [productId: string]: boolean;
  }>({});
  const [review, setReview] = useState<string>();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const cleanedTotal = Number(totalPrice);
  const gstAmount = Math.ceil(Number((cleanedTotal * 0.05).toFixed(2)));
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [cancelLoader, setCancelLoader] = useState(false);
  const navigate = useNavigate();
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isWindowClosed, setIsWindowClosed] = useState(false);
  const [cutoffDateStr, setCutoffDateStr] = useState("");
  const { awbNumber } = useAwb();
  let totalWithGST;

  if (productIds.length === 3) {
    totalWithGST = 999;
  } else if (productIds.length === 2) {
    totalWithGST = 699;
  } else {
    totalWithGST = Number((cleanedTotal + gstAmount).toFixed(2));
  }

  // Arrows
  const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
    <button
      className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white max-md:left-0.5"
      onClick={onClick}
    >
      <IoIosArrowBack className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
    </button>
  );

  const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
    <button
      className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white max-md:right-0.5"
      onClick={onClick}
    >
      <IoIosArrowForward className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
    </button>
  );
  // Address interface and state
  interface Address {
    first_name: string;
    last_name: string;
    flat: string;
    street: string;
    locality: string;
    city: string;
    zipcode: string;
    country_name: string;
    state: string;
    addr_type: string;
    mobile: string;
    email: string;
  }
  const [address, setAddress] = useState<Address>();

  const relatedProductsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768, // for screens <768px (typical mobile)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (orderData && orderData.length > 0 && orderData[0].date) {
      const deliveryDate = new Date(orderData[0].date);
      const cutoffDate = new Date(deliveryDate);
      cutoffDate.setDate(deliveryDate.getDate() + 7); // add 7 days

      const today = new Date();
      setIsWindowClosed(today > cutoffDate);
      setCutoffDateStr(
        cutoffDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }
  }, [orderData]);

  const handleCancelConfirm = async () => {
    // console.log("Cancel product:", selectedProductId, "Order:", id);
    setCancelLoader(true);
    try {
      await axios.post(
        cancelOrder,
        {
          awb: awbNumber,
          orderid: id,
          productid: selectedProductId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
      toast.success("Order Cancelled Successfully");
      navigate("/dashboard?section=orders");
      // console.log(data.data.status)
    } catch (err) {
      console.log(err);
    } finally {
      setIsCancelModalVisible(false);
      setCancelLoader(false);
    }
  };

  const handleExchangeSubmit = async () => {
    // try {
    //   await axios.post(exchange, {
    //     orderid: id,
    //     productid: productIds,
    //   });
    //   setModalVisible(false);
    //   // ✅ Re-fetch status immediately
    //   const res = await axios.post(exchangeStatus, {
    //     orderid: id,
    //     productid: selectedProductId,
    //   });
    //   setExchangeStatusNum(res.data.status);
    //   toast.success("Exchange request submitted.");
    // } catch (err) {
    //   console.error("Exchange failed", err);
    // }
  };

  const handleExchangeSuccess = () => {
    if (selectedProductId) {
      fetchStatus(selectedProductId);
    }
  };

  const fetchStatus = async (productId: string) => {
    try {
      const res = await axios.post(exchangeStatus, {
        orderid: id,
        productid: productId, // <- Pass only one productId
      });

      setExchangeStatusMap((prev) => ({
        ...prev,
        [productId]: res.data.status,
      }));
    } catch (err) {
      console.error("Error fetching status:", err);
    }
  };

  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const statusMap: { [key: string]: number } = {};

        for (const pid of productIds) {
          const res = await axios.post(exchangeStatus, {
            orderid: id,
            productid: pid,
          });

          statusMap[pid] = res.data.status;
        }

        setExchangeStatusMap(statusMap);
      } catch (err) {
        console.error("Error fetching initial status:", err);
      }
    };

    fetchInitialStatus();
  }, []);

  useEffect(() => {
    if (orderData.length && address) {
      const items = orderData.map((item) => ({
        name: item.product_name,
        price: `Rs. ${Number(item.price).toFixed(2)}`,
        qty: Number(item.quantity),
        total: `Rs. ${(Number(item.price) * Number(item.quantity)).toFixed(2)}`,
        gst: `Rs. ${Math.ceil(
          Number(item.price) * Number(item.quantity) * 0.05
        ).toFixed(2)}`,
      }));

      const totalPrice = `${items
        .reduce((acc, item) => acc + Number(item.total.replace("Rs. ", "")), 0)
        .toFixed(2)}`;

      const gst = Math.ceil(Number(totalPrice) * 0.05).toFixed(2);

      const totalAmount = (Number(totalPrice) + Number(gst)).toFixed(2);

      const invoice = {
        invoiceNo: `#${Math.floor(Math.random() * 90000) + 10000}`,
        orderDate: new Date(orderData[0].date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        paymentType: orderData[0].payment_type,
        orderId: orderData[0].order_id,
        customer: {
          name: `${address.first_name} ${address.last_name}`,
          phone: `${address.mobile}`,
          email: `${address.email}`,
          address: `${address.flat}, ${address.street}, ${address.locality}, ${address.city}, ${address.state}, ${address.country_name} - ${address.zipcode}`,
        },
        items: items,
        total: `Rs. ${totalPrice}`,
        gst: `Rs. ${gst}`,
        totalAmount: `Rs. ${totalAmount}`,
      };

      setInvoiceData(invoice);
    }
  }, [orderData, address]);

  useEffect(() => {
    let orderFetched = false;
    let addressFetched = false;

    const checkIfDone = () => {
      if (orderFetched && addressFetched) setLoading(false);
    };

    fetch(order_detail_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("id", id);
        console.log("cwecdcfw", data);
        setOrderData(data?.data);
        setStatus(data?.tracking_status);
        setPayment_type(data?.data?.[0]?.payment_type);
        orderFetched = true;
        checkIfDone();
      })
      .catch((err) => {
        console.error("Order fetch error", err);
        orderFetched = true;
        checkIfDone();
      });

    fetch(getAddress_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAddress(data.data);
        addressFetched = true;
        checkIfDone();
      })
      .catch((err) => {
        console.error("Address fetch error", err);
        addressFetched = true;
        checkIfDone();
      });
  }, [id]);

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

  useEffect(() => {
    if (id) {
      axios
        .get(`${productDetails}/${productIds}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        })
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          const relatedData = response.data.related_products;

          // Construct full image URLs
          const imageArray = data.images.map(
            (img: any) => `https://admirer.in/asset/image/product/${img.image}`
          );

          setRelatedProducts(relatedData);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  const handleRating = (productId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [productId]: value + 1 }));
    setReviewVisible((prev) => ({ ...prev, [productId]: true }));

    // console.log(ratings);
    // console.log(value);

    setTimeout(() => {
      const textarea = document.getElementById(
        `review-textarea-${productId}`
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.focus();
      }
    }, 0);

    toast.info("Thanks for rating!");
  };

  const handleReviewSubmit = (productId: string) => {
    // console.log(review);
    toast.success("Your review has been submitted!");
    setReviewVisible((prev) => ({ ...prev, [productId]: false }));
    setReview("");
  };

  // Show loader while data is loading
  if (loading) return <Loader />;

  if (!orderData || orderData.length === 0) {
    return (
      <div className="text-center mt-10 text-red-600">Order not found</div>
    );
  }

  // (Your full JSX below remains unchanged)
  return (
    <>
      <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Section - Order Items */}
          <div className="flex-1 space-y-4 ">
            {orderData.map((order, index) => (
              <div
                key={index}
                className="bg-white border rounded shadow-sm p-6 max-md:px-3 pb-2 "
              >
                <div className=" gap-6 ">
                  <div className="text-center">
                    {/* {order.image && ( */}

                    <Link to={`/product/${productIds[index]}`}>
                      <div className="flex items-center justify-center w-full">
                        <img
                          src={
                            "https://admirer.in/asset/image/product/" +
                            order.image
                          }
                          alt={order.product_name}
                          className="w-36 mb-4 object-contain"
                        />
                      </div>
                    </Link>
                    {/* )} */}
                    <div className="flex-1">
                      <h2 className="font-semibold text-gray-800 text-[16px] leading-snug">
                        {order.product_name}
                      </h2>
                      {/* <p className="text-xs text-gray-500 mt-0.5">
                    Seller: LogicDevices
                  </p> */}
                      <p className="text-lg font-semibold text-gray-800 mt-2">
                        Price: ₹{order.price}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5 font-semibold">
                        Quantity: {order.quantity}
                      </p>
                    </div>
                    <div className="flex  items-start text-white bg-[#7b48a5] p-3  gap-2 mt-3">
                      <img
                        src="https://myntraweb.blob.core.windows.net/mymyntra/assets/img/box.svg"
                        alt=""
                        className="w-5"
                      />
                      <div className="flex flex-col gap-1 ml-1">
                        <span className="text-[13px] font-bold text-start">
                          Order Confirmed
                        </span>
                        <span className="text-[13px] font-semibold text-gray-200">
                          On{" "}
                          {new Date(order.date).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    {/* <div className="flex  items-start bg-white  border p-4  gap-2 mt-3"> */}
                    <div className="grid border shadow-sm mt-3 grid-cols-1 text-sm">
                      <div
                        onClick={() => {
                          setSelectedProductId(productIds[index]);
                          setModalVisible(true);
                        }}
                        className="p-3 pl-3 hover:bg-purple-100 cursor-pointer flex flex-row gap-3 justify-start items-start text-start" // top alignment
                      >
                        {/* Icon container with fixed size to push it down slightly */}
                        <div className="pt-0.5">
                          <CgArrowsExchangeAlt className="border rounded-full border-black text-base" />
                        </div>

                        {/* Text container with more content and line spacing */}
                        <div className="flex flex-col text-start justify-start items-start ">
                          <span className="text-[15px] font-semibold ">
                            {Number(exchangeStatusMap[productIds[index]]) > 0
                              ? "View exchange status"
                              : "Exchange"}
                          </span>
                          {Number(exchangeStatusMap[productIds[index]]) > 0 ? (
                            ""
                          ) : (
                            <p className="text-xs text-gray-600 pt-1 leading-snug">
                              {isWindowClosed ? (
                                <>Exchange window closed on {cutoffDateStr}</>
                              ) : (
                                <>
                                  Exchange window available till {cutoffDateStr}
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* </div> */}
                  </div>
                </div>

                <div className="border p-3 mb-3 pt-4 flex mt-4 flex-col flex-wrap justify-between gap-3">
                  <span className="font-semibold">Rate this product</span>
                  <div className="flex gap-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        onClick={() => handleRating(productIds[index], i)}
                        className={`w-9 h-9 cursor-pointer ${
                          i < (ratings[productIds[index]] || 0)
                            ? "text-[#7b48a5]"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.783.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.048 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.285-3.967z" />
                      </svg>
                    ))}
                  </div>
                  {reviewVisible[productIds[index]] && (
                    <>
                      <div className="flex flex-col gap-4 mt-1 ">
                        <span className="font-semibold mt-1">
                          Write a Review
                        </span>
                        <textarea
                          onChange={(e) => setReview(e.target.value)}
                          value={review}
                          name=""
                          id={`review-textarea-${productIds[index]}`}
                          className="border p-2 h-[100px] "
                        ></textarea>
                        <button
                          className="bg-[#7b48a5] w-[120px] px-4 py-3 self-end rounded-sm hover:bg-purple-700 text-white"
                          onClick={() => handleReviewSubmit(productIds[index])}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Order Summary */}
          <div className="max-md:w-full w-80 space-y-3 sticky top-3 self-start">
            <div className="flex justify-between text-sm font-medium bg-white border rounded shadow-sm p-5 cursor-pointer">
              {/* <div className="flex gap-3">
                <FaFileInvoice className="h-5 w-5" /> */}
              <Invoice order={invoiceData} />
              {/* </div> */}
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
              <h4 className="text-xs mb-3 font-semibold text-gray-600 ">
                Shipping details
              </h4>
              <hr />
              <p className="mt-2 text-gray-700  leading-5">
                <strong className="text-md mb-1 capitalize block">
                  {address?.first_name} {address?.last_name}
                </strong>
                <div className="text-sm">
                  {address?.flat}, {address?.street}, {address?.locality}
                </div>
                <div className="text-sm">
                  {address?.city}, {address?.state}
                  {/* {address?.zip_code},{" "} */}
                  {/* {address?.addr_type} */}
                </div>
                {/* <div >
                     <strong>Phone number:</strong> 8736977153
                </div> */}
              </p>
            </div>

            <div className="bg-white border rounded shadow-sm p-5">
              <h4 className="text-xs mb-3 font-semibold text-gray-600">
                Price Details
              </h4>
              <hr />
              <div className="text-xs mt-3 text-gray-700 space-y-2">
                {/* <div className="flex justify-between">
                <span>List price</span>
                <span className="line-through text-gray-500">₹54,990</span>
              </div> */}
                <div className="flex justify-between ">
                  <span className="!text-[14px]  capitalize ">
                    Selling price
                  </span>
                  <span className="text-[14px]  capitalize ">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span className="!text-[14px]  capitalize ">GST</span>
                  <span className="text-[14px]  capitalize ">₹{gstAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="!text-[14px] capitalize ">
                    Delivery Charge
                  </span>
                  <span className="text-[14px] text-green-600 font-medium">
                    Free
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span className="font-semibold mt-1 text-[14px] text-black">
                    Total Amount
                  </span>
                  <span className="font-semibold mt-1 text-[14px] text-black">
                    ₹{totalWithGST}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex  text-sm font-medium bg-white border rounded shadow-sm p-5 py-4 cursor-pointer">
              Payment Method :
              <span className="text-gray-700 ml-1 uppercase">
                {payment_type}
              </span>
            </div>
            <div
              className="flex  text-sm font-medium bg-white border gap-2 rounded shadow-sm p-5 py-4 pb-3 cursor-pointer"
              onClick={() => {
                setSelectedProductId(selectedProductId);
                setIsCancelModalVisible(true);
              }}
            >
              <IoClose className="border rounded-full border-red-700 text-red-700 mb-1 text-xl" />
              <span className="font-semibold text-red-700 hover:font-bold">
                Cancel Order
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 py-10 bg-white">
        <h2 className="text-3xl max-md:text-2xl font-semibold mb-6   text-center">
          Items that go well with this item
        </h2>

        <div className="grid grid-cols-1 w-[85%]  max-md:w-[98%] m-auto !gap-4 ">
          <Slider {...relatedProductsSlider}>
            {relatedProducts.map((item) => (
              <SingleProductCard key={item.id} item={item} />
            ))}
          </Slider>
        </div>
      </div>
      {isModalVisible && selectedProductId && (
        <ExchangePopupModal
          visible={isModalVisible}
          onClose={() => {
            setModalVisible(false);
            setSelectedProductId(null);
          }}
          onSubmit={handleExchangeSubmit}
          productId={selectedProductId}
          orderId={id}
          onSuccess={handleExchangeSuccess}
        />
      )}
      {/* Antd Modal for Cancel Confirmation */}
      <Modal
        // title="Are you sure you want to cancel the order?"
        open={isCancelModalVisible}
        onCancel={() => setIsCancelModalVisible(false)}
        footer={null}
      >
        <p className="text-base font-semibold max-md:pt-3 pb-1 max-md:pb-2">
          Are you sure you want to cancel the order?
        </p>
        <p>This action cannot be undone.</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleCancelConfirm}
            type="button"
            disabled={cancelLoader}
            style={{
              backgroundColor: "#7b48a5",
              color: "white",
              padding: "8px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: cancelLoader ? "not-allowed" : "pointer",
              opacity: cancelLoader ? 0.6 : 1,
              pointerEvents: cancelLoader ? "none" : "auto",
            }}
          >
            {cancelLoader ? (
              <span className="flex items-center justify-center text-sm text-white">
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
                Cancelling...
              </span>
            ) : (
              "Yes, Cancel"
            )}
          </button>
          <button
            onClick={() => setIsCancelModalVisible(false)}
            style={{
              backgroundColor: "#e0e0e0",
              color: "#333",
              padding: "8px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default OrderDetails;
