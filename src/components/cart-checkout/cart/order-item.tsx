import React from "react";
import { FaTimes } from "react-icons/fa";

interface ItemProps {
  brandName: string;
  description: string;
  price: string;
  quantity: string;
  brandId: string;
  discount: string;
  return_day: string;
  finalPrice: string;
  checked: boolean;
  totalQuantity: string;
}

const Item: React.FC<ItemProps> = ({
  brandName,
  description,
  price,
  quantity,
  brandId,
  discount,
  return_day,
  finalPrice,
  checked,
  totalQuantity,
}) => {
  let qty = parseInt(quantity);
  const totalQty = parseInt(totalQuantity);

  // If quantity > totalQuantity, set quantity = totalQuantity
  if (qty > totalQty) {
    qty = totalQty;
  }

  // Range should always be from 1 to totalQty
  const quantityOptions = Array.from({ length: totalQty }, (_, i) => i + 1);
  return (
    <div className="w-[50%] h-[20%] relative mt-[50px] mb-[50px]">
      <div className="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Checkbox on the left */}
        <div className="absolute left-2 top-2 z-10">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {}}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

        {/* Cancel button on the right */}
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={() => {}}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Remove item"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Image container - takes 40% width */}
        <div className="w-[40%] relative">
          <img
            className="w-full h-full object-cover min-h-[180px]"
            src="https://images.pexels.com/photos/54334/running-shoe-shoe-brooks-highly-functional-54334.jpeg?cs=srgb&dl=shoe-sneakers-footwear-54334.jpg&fm=jpg"
            alt={brandName}
          />
        </div>

        {/* Content container - takes 60% width */}
        <div className="w-[60%] p-3 flex flex-col">
          {/* Brand name */}
          <h2 className="text-lg font-bold text-gray-900 mb-0.5">
            {brandName}
          </h2>

          {/* Description */}
          <p className="text-gray-700 font-medium text-sm line-clamp-2 mb-4 leading-tight">
            {description}
          </p>

          {/* Quantity with dropdown */}
          <div className="flex items-center mb-4">
            <span className="font-semibold text-sm mr-2 text-gray-700">
              Qty:
            </span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm font-medium bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 w-16"
              defaultValue={quantity}
            >
              {quantityOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Price section */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-gray-400 line-through text-xs">₹{price}</span>
            <span className="text-red-600 text-xs font-bold bg-red-50 px-1 py-0.5 rounded">
              {discount}% off
            </span>
            <span className="text-black font-bold text-base">
              ₹{finalPrice}
            </span>
          </div>

          {/* Return policy */}
          <div className="text-xs text-gray-500 flex items-center mt-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {return_day} days return available
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
