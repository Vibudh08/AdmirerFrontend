import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import { order_status_API } from '../api/api-end-points';

const Loader = () => (
  <div className="max-md:mt-5 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <div className=" border-t-2 border-b-2 w-12 h-12 rounded-full animate-spin border-[#7b48a5] mb-4"></div>
    </div>
  </div>
);

const OrderPage = () => {
  const [orderedData, setOrderedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(order_status_API, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ordered data is = ", data);
        setOrderedData(data?.orders || {});
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loader />;

  const hasOrders = Object.keys(orderedData).length > 0;

  return (
    <div className='border bg-white m-auto shadow-md p-8 max-sm:p-4 max-sm:mt-3'>
      <h1 className='text-xl font-semibold mb-6 border-b pb-2'>All Orders</h1>
      
      {hasOrders ? (
        <OrderCard orderedData={orderedData} />
      ) : (
        <p className="text-center text-gray-500 py-8">No orders found.</p>
      )}
    </div>
  );
};

export default OrderPage;
