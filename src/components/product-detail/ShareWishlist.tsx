import React, { useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { wishlist_add_remove } from "../api/api-end-points";
import {
  FaHeart,
  FaRegHeart,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";

interface ProductActionsProps {
  productId: number;
  wishlist: number; // 0 or 1
}

const ProductActions: React.FC<ProductActionsProps> = ({ productId, wishlist }) => {
  const [inWishlist, setInWishlist] = useState(wishlist === 1);
  const [shareOpen, setShareOpen] = useState(false);

  const toggleWishlist = async () => {
    try {
      const response = await fetch(wishlist_add_remove, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 7|P6gdNwdWbYxXLygVRTwSHAN1qnhK7kH5kdC9A6Zad16cbca7",
        },
        body: JSON.stringify({
          product_id: productId,
          wishlist: inWishlist ? 0 : 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setInWishlist(!inWishlist);
        console.log(result.message || "Wishlist updated");
      } else if (response.status === 401) {
        alert("Unauthorized user. Please log in.");
      } else {
        alert("Something went wrong.");
        console.error(result);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const toggleSharePopup = () => {
    setShareOpen(!shareOpen);
  };

  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={toggleWishlist}
        className="text-xl text-purple-500 hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      <button
        onClick={toggleSharePopup}
        className="hover:scale-105 transition-transform"
        aria-label="Share"
      >
        {/* <IoShareSocialOutline className="text-2xl text-purple-500 hover:scale-110 transition-transform" /> */}
      </button>

      {shareOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleSharePopup}
        />
      )}
    </div>
  );
};

export default ProductActions;
