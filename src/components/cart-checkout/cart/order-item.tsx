// ✅ Only change: adding `onQuantityChange` prop and updating quantity via dropdown

import React from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addToWishlist_API } from "../../api/api-end-points";
import { response } from "express";

interface ItemProps {
  id: number;
  brandName: string;
  description: string;
  price: string;
  quantity: string;
  brandId: string;
  discount: string;
  return_day: string;
  finalPrice: string;
  totalQuantity: string;
  image: string;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, newQty: number) => void; // ✅ Added this
}

const Item: React.FC<ItemProps> = ({
  id,
  brandName,
  description,
  price,
  quantity,
  image,
  brandId,
  discount,
  return_day,
  finalPrice,
  totalQuantity,
  onRemove,
  onQuantityChange,
}) => {
  let qty = parseInt(quantity);
  const totalQty = parseInt(totalQuantity);

  if (qty > totalQty) {
    qty = totalQty;
  }

  const quantityOptions = Array.from({ length: totalQty }, (_, i) => i + 1);
  const handleAddToWishlist = () => {
    fetch(addToWishlist_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify({
        id: { id },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("the id we are getting is ", id);
      });
    //onRemove(id);
  };

  return (
    <div className="bg-white relative mt-1 mb-2">
      <div className="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={() => {
              onRemove(id);
            }}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Remove item"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="w-[40%] relative ">
          <Link to={`/product/${id}`}>
            <img className="w-full h-full" src={image} alt={brandName} />
          </Link>
        </div>

        <div className="w-[60%] p-3 flex flex-col h-fit">
          <div className="hidden">{id}</div>
          <Link to={`/product/${id}`}>
            <h2 className="text-[17px] font-[500] text-gray-900 mb-1 w-[95%]">
              {brandName}
            </h2>
          </Link>

          <p className="text-gray-700 font-medium text-[13px] line-clamp-2 mb-4 leading-snug">
            {description}
          </p>

          <div className="flex items-center mb-3 mt-2">
            <span className="font-semibold text-sm mr-2  text-gray-700">
              Qty:
            </span>
            <select
              className="border border-gray-300 cursor-pointer rounded px-2 py-1 text-sm font-medium bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 w-16"
              value={qty}
              onChange={(e) => onQuantityChange(id, parseInt(e.target.value))} // ✅ Trigger on change
            >
              {quantityOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-black font-semibold">
              ₹{(parseFloat(discount) * qty).toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-xs">
              ₹{(parseFloat(price) * qty).toFixed(2)}
            </span>
            <span className="text-red-600 text-xs font-bold bg-red-50 px-1 py-0.5 rounded">
              {Math.round(
                ((parseFloat(price) - parseFloat(discount)) /
                  parseFloat(price)) *
                  100
              )}
              % off
            </span>
          </div>
          {/* Add to Wishlist Button */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddToWishlist}
              className="flex items-center gap-1 bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
            >
              <FaHeart className="text-purple-600" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
