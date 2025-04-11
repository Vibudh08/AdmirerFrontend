import React from "react";
import { IoClose } from "react-icons/io5";

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
    <div className="max-w-[300px] font-sans bg-white rounded-[5px] p-4 max-md:p-2 pb-2 flex flex-col gap-1 max-md:gap-1 border  border-gray-300">
      {/* Product Image with Hover Button */}
      <div className="relative group">
        <img
          src={imageUrl}
          alt="product"
          className="w-full h-auto rounded-lg"
        />

        {/* Heart Button at Top Right (Hidden initially, shows on hover) */}
        <button className="absolute top-0 right-0 transition-opacity">
          <div className=" p-1 max-md:p-0 rounded-full border bg-gray-50 border-gray-100 text-gray-500 hover:text-black ">
            <IoClose className="text-xl max-md:text-lg" />
          </div>
        </button>
      </div>

      {/* Product Name */}
      <div className="font-bold text-black text-xl max-md:text-[18px] truncate overflow-hidden whitespace-nowrap">
        {name}
      </div>

      {/* Product Description */}
      <div className="text-gray-400 text-xs leading-relaxed font-bold truncate overflow-hidden whitespace-nowrap">
        {description}
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-2.5 max-md:gap-1.5 mb-2 max-md:mb-1 flex-wrap">
        <span className="font-bold text-black text-lg max-md:text-[14px]">Rs {price}</span>
        <span className="line-through text-gray-400 text-xs">
          Rs {originalPrice}
        </span>
        <span className="bg-red-50 text-red-700 font-bold  px-2 max-md:px-1 py-0.5 rounded text-xs">
          {discount}% OFF
        </span>
      </div>
      <hr className="p-0 w-full" />
      <div className="p-1 text-center font-semibold text-purple-700 text-md max-md:text-sm leading-6 tracking-tight">MOVE TO CART</div>
    </div>
  );
};

export default ProductItem;
