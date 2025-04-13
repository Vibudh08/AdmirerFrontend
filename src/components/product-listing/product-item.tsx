import React from "react";
import { FaHeart } from "react-icons/fa";
import productItemProps from "./product-item-interface";

const ProductItem: React.FC<productItemProps> = ({
  name,
  price,
  description,
  originalPrice,
  discount,
  imageUrl = "http://ww1.prweb.com/prfiles/2012/10/31/10079702/emily_qtrbnd_5.jpg",
  compactView = false,
}) => {
  return (
    <div
      className={`w-full font-sans bg-white rounded-xl p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2.5 border border-gray-200 ${
        compactView ? "text-xs" : "text-sm"
      }`}
    >
      {/* Product Image with Hover Button */}
      <div className="relative group aspect-square">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Heart Button at Top Right (Hidden initially, shows on hover) */}
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white p-1 sm:p-2 rounded-full border border-red-300 text-red-400 hover:text-red-500 shadow-md">
            <FaHeart size={compactView ? 16 : 20} />
          </div>
        </button>
      </div>

      {/* Product Name */}
      <div
        className={`font-bold text-black ${
          compactView ? "text-sm line-clamp-1" : "text-lg line-clamp-2"
        }`}
      >
        {name}
      </div>

      {/* Product Description */}
      <div
        className={`text-gray-500 ${
          compactView ? "line-clamp-1" : "line-clamp-2"
        }`}
      >
        {description}
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
        <span className="font-bold text-black">Rs {price}</span>
        <span className="line-through text-gray-400 text-xs">
          Rs {originalPrice}
        </span>
        <span className="bg-red-50 text-red-700 font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
          {discount}% OFF
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
