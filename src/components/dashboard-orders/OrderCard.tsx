import React from 'react';
import { useNavigate } from 'react-router-dom';
import { orders, Order } from './ordersData';

const statusConfig = {
  delivered: {
    text: 'Order Delivered',
    textClass: 'text-green-600',
    bulletClass: 'bg-green-500',
  },
  cancelled: {
    text: 'Order Cancelled',
    textClass: 'text-red-600',
    bulletClass: 'bg-red-500',
  },
  exchanged: {
    text: 'Exchange Completed',
    textClass: 'text-orange-500',
    bulletClass: 'bg-orange-500',
  },
};

const OrderCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto mt-6">
      {orders.map((order: Order) => {
        const status = statusConfig[order.status];
        return (
          <div
            key={order.id}
            className="border rounded-md p-4 bg-white flex flex-col gap-4 cursor-pointer hover:shadow transition"
            onClick={() => navigate(`/order/${order.id}`)}
          >
            <div className="flex gap-4 items-center">
              <img
                src={order.productImage}
                alt="product"
                className="w-28 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between max-sm:block max-sm:mb-1 items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">
                      {order.productName}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{order.price}
                  </span>
                </div>
                <div className="flex justify-between max-md:block  items-center">
                  <div className={`flex items-center gap-1 text-sm max-md:mb-1 font-medium ${status.textClass}`}>
                    <span className={`w-2 h-2 rounded-full  ${status.bulletClass}`}></span>
                    {status.text}
                  </div>
                  <p className="text-xs text-gray-500 ">{order.reason}</p>
                </div>
                <div className="mt-1">
                  <button className="text-blue-600 text-sm font-medium hover:underline">
                    ★ Rate & Review Product
                  </button>
                </div>
              </div>
            </div>
            <div className="border rounded-md bg-gray-50 p-4 pb-0 text-sm text-gray-700">
              <p className={`font-medium mb-1 ${status.textClass}`}>
                {status.text}
                <span className="text-gray-600 font-normal text-xs ml-1">
                  (Order ID: {order.orderId})
                </span>
              </p>
              <ul className="list-disc mt-2 list-inside">
                <li>{order.note}</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
