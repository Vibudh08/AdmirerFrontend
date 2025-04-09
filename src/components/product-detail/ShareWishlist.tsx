import React, { useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";

import {
  FaHeart,
  FaRegHeart,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
const ProductActions = () => {
  const [inWishlist, setInWishlist] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
    // You can add API call logic here
    console.log(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const toggleSharePopup = () => {
    setShareOpen(!shareOpen);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* Wishlist Icon */}
      <button
        onClick={toggleWishlist}
        className="text-xl text-purple-500 hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Share Button */}
      <button
        onClick={toggleSharePopup}
        className="hover:scale-105 transition-transform"
        aria-label="Share"
      >
        <IoShareSocialOutline className="text-2xl text-purple-500 hover:scale-110 transition-transform" />
      </button>

      {/* Overlay */}
      {shareOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleSharePopup}
        />
      )}

      {/* Share Popup */}
      {/* {shareOpen && (
        <div className="absolute z-40 top-10 left-0 bg-white p-4 rounded-lg shadow-lg w-64">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-sm font-semibold">Share This Product</h5>
            <button onClick={toggleSharePopup} className="text-lg font-bold">
              &times;
            </button>
          </div>
          <div className="flex justify-between items-center text-white text-lg gap-2">
            <a
              href="#"
              className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-blue-400 p-2 rounded-full hover:bg-blue-500"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-green-500 p-2 rounded-full hover:bg-green-600"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-800"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductActions;
