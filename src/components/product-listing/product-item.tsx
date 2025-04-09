import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

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
    <div className="max-w-[300px] font-sans mx-10 my-10 bg-white rounded-xl p-4 flex flex-col gap-2.5">
      {/* Product Image */}
      <img src={imageUrl} alt="product" className="w-full h-auto rounded-lg" />

      {/* Product Name */}
      <div className="font-bold text-black text-xl">{name}</div>

      {/* Product Description */}
      <div className="text-gray-400 text-xs leading-relaxed font-bold">
        {description}
      </div>

      {/* Price Section */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Current Price */}
        <span className="font-bold text-black text-lg">Rs {price}</span>

        {/* Original Price (strikethrough) */}
        <span className="line-through text-gray-400 text-base">
          Rs {originalPrice}
        </span>

        {/* Discount Badge */}
        <span className="bg-red-50 text-red-700 font-bold text-sm px-2 py-1 rounded">
          {discount}% OFF
        </span>
      </div>

      {/* Button Section */}
      <div className="flex justify-between gap-2.5 mt-2.5">
        {/* Add to Cart Button */}
        <button className="bg-yellow-300 text-black px-4 py-2.5 rounded-lg font-bold cursor-pointer flex items-center gap-1.5 flex-1 justify-center border-none outline-none">
          <FaShoppingCart />
          Add to cart
        </button>

        {/* Buy Now Button */}
        <button className="bg-green-500 text-white px-4 py-2.5 rounded-lg font-bold cursor-pointer flex items-center gap-1.5 flex-1 justify-center border-none outline-none">
          <FiShoppingBag />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
