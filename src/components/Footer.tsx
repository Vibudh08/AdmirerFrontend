import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t  border-[#7B48A5] text-black  pt-[50px] ">
      <div className="max-w-7xl mx-auto px-3 py-3 w-[90%] mb-[50px] m-auto max-sm:w-full max-sm:mb-[20px] mt-[60px] max-sm:mt-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section */}
          <div>
            <h3 className="font-semibold mb-3 tracking-wide">
              ONLINE SHOPPING
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 space-y-2 max-md:space-y-1 text-gray-600 max-sm:text-sm">
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="">Jewellery</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="">Ring Corner</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="">Couple Rings</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="">Luxe Jewelry</Link>
              </li>
            </ul>
          </div>

          {/* Center Section */}
          <div>
            <h3 className="font-semibold mb-3 tracking-wide">
              CUSTOMER POLICIES
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 space-y-2 max-md:space-y-1 text-gray-600 max-sm:text-sm">
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/exchange">Exchange Policy</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/about">About Us</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/help_faq">Help & FAQs</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/return">Return & Refund Policy</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/shipping">Shipping Policy</Link>
              </li>
              <li className="hover:text-[#7b48a5] hover:font-semibold">
                <Link to="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="font-semibold mb-3 tracking-wide">
              EXPERIENCE ADMIRER ON MOBILE
            </h3>
            <Link to="">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                className="w-40"
              />
            </Link>

            <h3 className="font-semibold mt-6">KEEP IN TOUCH</h3>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61573035780558"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-[#1877F2] w-6 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
              <a
                href="https://www.x.com/BTJAdmirer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX className="text-black w-6 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
              <a
                href="https://www.instagram.com/official.admirer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-[#E1306C] w-6 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
              <a
                href="https://www.youtube.com/@AdmirerOfficial-t4e"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-[#FF0000] w-7 h-6 cursor-pointer transform transition-transform duration-200 hover:scale-110" />
              </a>
            </div>
          </div>
          <div>
            {/* Guarantee and Exchange Info */}
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex gap-3 mb-4">
                <img src="/icons/original.png" className="w-10 h-10 mt-1" />
                <p className="text-[17px] leading-snug mb-0 max-sm:text-md">
                  <span className="font-bold">100% ORIGINAL</span> guarantee for
                  all products at admirer.in
                </p>
              </div>

              <div className="flex gap-3 mb-4">
                <img src="/icons/seven-days.png" className="w-10 h-10 mt-1" />
                <p className="text-[17px] leading-snug max-sm:text-md">
                  <span className="font-bold mt-2">Exchange within 7 days</span>{" "}
                  of receiving your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[90%] m-auto" />

      <div className="w-[90%] max-sm:w-full px-3 py-3 mb-8 m-auto max-sm:block flex justify-between mt-[40px] max-sm:mt-[20px]">
        <div className="max-sm:mb-3 text-gray-600">
          <h3 className="font-semibold mb-3 text-black">
            REGISTERED OFFICE ADDRESS
          </h3>
          <p className="!mb-1">B-26, Sector-2, Noida</p>
          <p className="!mb-1">Gautam Buddha Nagar</p>
          <p className="!mb-1">Uttar Pradesh, 201301</p>
          <p className="!mb-1">India</p>
        </div>
        <div className="mt-8 max-sm:mt-2 space-y-2 text-gray-600">
          <p className="!mb-1"><strong>BTJ Alpha Technology Private Limited company</strong></p>
          <p className="!mb-1"><strong>CIN:</strong> U62099UP2025PTC215855</p>
          <p className="!mb-1"><strong>GSTIN:</strong> 09AANCB2020R1ZB</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className=" text-center pb-1 text-gray-600">
        © 2025 Admirer | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
