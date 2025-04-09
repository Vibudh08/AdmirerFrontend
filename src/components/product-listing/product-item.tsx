import React from "react";
import { FaHeart } from "react-icons/fa";

interface productItemProps {
  name: string;
  price: string;
  description: string;
  originalPrice: string;
  discount: string;
  imageUrl?: string;
}

const ProductItem: React.FC<productItemProps> = ({
  name,
  price,
  description,
  originalPrice,
  discount,
  imageUrl = "http://ww1.prweb.com/prfiles/2012/10/31/10079702/emily_qtrbnd_5.jpg",
}) => {
  return (
    <div className="max-w-[300px] font-sans mx-10 my-10 bg-white rounded-xl p-4 flex flex-col gap-2.5 border border-gray-300">
      {/* Product Image with Hover Button */}
      <div className="relative group">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-auto rounded-lg"
        />

        {/* Heart Button at Top Right (Hidden initially, shows on hover) */}
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white p-2 rounded-full border border-red-300 text-red-400 hover:text-red-500 shadow-md">
            <FaHeart size={20} />
          </div>
        </button>
      </div>

      {/* Product Name */}
      <div className="font-bold text-black text-xl truncate overflow-hidden whitespace-nowrap">
        {name}
      </div>

      {/* Product Description */}
      <div className="text-gray-400 text-xs leading-relaxed font-bold truncate overflow-hidden whitespace-nowrap">
        {description}
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="font-bold text-black text-lg">Rs {price}</span>
        <span className="line-through text-gray-400 text-xs">
          Rs {originalPrice}
        </span>
        <span className="bg-red-50 text-red-700 font-bold text-sm px-2 py-1 rounded text-xs">
          {discount}% OFF
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
