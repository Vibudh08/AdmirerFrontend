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
      {/* Product Image */}
      <img src={imageUrl} alt="product" className="w-full h-auto rounded-lg" />

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
        {/* Current Price */}
        <span className="font-bold text-black text-lg">Rs {price}</span>

        {/* Original Price (strikethrough) */}
        <span className="line-through text-gray-400 text-xs">
          Rs {originalPrice}
        </span>

        {/* Discount Badge */}
        <span className="bg-red-50 text-red-700 font-bold text-sm px-2 py-1 rounded text-xs">
          {discount}% OFF
        </span>
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-2.5">
        <button className="relative group bg-transparent text-red-400 hover:text-red-500 p-3 rounded-full cursor-pointer border border-red-200">
          <FaHeart size={20} />
          <span className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-black text-white text-xs rounded-lg px-2 py-1 transition-transform">
            Wishlist
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
