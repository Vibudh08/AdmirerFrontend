import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import productItemProps from "./product-item-interface";
import { wishlist_add_remove } from "../api/api-end-points";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ProductItem: React.FC<productItemProps> = ({
  name,
  id,
  price,
  description,
  originalPrice,
  discount,
  imageUrl,
  compactView = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  const toggleWishlist = async () => {
    try {
      const response = await fetch(wishlist_add_remove, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"), // Replace with dynamic token in real app
        },
        body: JSON.stringify({
          product_id: id,
          wishlist: isWishlisted ? 0 : 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsWishlisted(!isWishlisted);
        const message = isWishlisted
          ? "Removed from wishlist"
          : "Added to wishlist";
        toast.success(message);
        console.log(result.message || "Wishlist updated");
      } else if (response.status === 401) {
        toast.error("Please log in to add items to your wishlist.");
        // navigate("/")
      } else {
        alert("Something went wrong.");
        console.error(result);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  return (
    <div
      className={`w-full font-sans bg-white rounded-xl p-2 sm:p-3 cursor-pointer flex flex-col gap-1.5 sm:gap-2.5 border border-gray-200 ${
        compactView ? "text-xs" : "text-sm"
      }`}
      onClick={handleClick}
    >
      {/* Product Image with Wishlist Button */}
      <div className="relative group aspect-square">
        <img
          src={"https://admirer.in/asset/image/product/" + imageUrl}
          alt="product"
          className="w-full h-full object-cover rounded-lg"
        />
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the click from reaching parent div
            toggleWishlist();
          }}
        >
          <div
            className={`p-1 sm:p-2 rounded-full border shadow-md ${
              isWishlisted
                ? "bg-red-100 border-red-500 text-red-500"
                : "bg-white border-red-500 text-red-500 "
            }`}
          >
            {isWishlisted ? (
              <FaHeart size={compactView ? 16 : 20} />
            ) : (
              <FaRegHeart size={compactView ? 16 : 20} />
            )}
          </div>
        </button>
      </div>

      <div className="hidden">{id}</div>

      <div
        className={`font-semibold text-black ${
          compactView ? "text-sm line-clamp-1" : "text-lg line-clamp-1"
        }`}
      >
        {name}
      </div>

      <div
        className={`text-gray-500 ${
          compactView ? "line-clamp-1" : "line-clamp-2"
        }`}
      >
        {description}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
        <span className="font-semibold text-black text-lg">Rs {price}</span>
        <span className="line-through text-gray-400 text-sm">
          Rs {originalPrice}
        </span>
        <span className="bg-red-50 text-red-700 font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">
          {discount} OFF
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
