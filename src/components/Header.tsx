import { useState } from "react";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import React from "react";
import { User, Heart, ShoppingBag } from "lucide-react";
import SearchBarWithPopup from "./SearchBar";

function Header() {
  var offerBanner = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000,
    arrows: false,
  };
  const [show, setShow] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  const token = localStorage.getItem("auth_token")
  const isLoggedIn = !token;

  const [cartShow, setCartShow] = useState(false);
  const handleCart = () => {
    setCartShow(!cartShow);
  };
  return (
    <>
      <div className="md:hidden">
        {searchPopup && (
          <div className="fixed inset-0 z-[1000] bg-white p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-lg font-semibold text-[#7B48A5]">Search</p>
              <IoClose
                className="text-2xl cursor-pointer text-[#7B48A5]"
                onClick={() => setSearchPopup(false)}
              />
            </div>
            <SearchBarWithPopup />
          </div>
        )}
      </div>

      {(show || cartShow) && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[900]"
          onClick={() => {
            setShow(false);
            setCartShow(false);
          }}
        ></div>
      )}

      <div
        className={`categories fixed z-[1000] bg-white h-[100%] w-[310px] px-[30px] py-[40px] flex-col 
        transition-all duration-500 ease-in-out transform border border-white ${
          show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <IoClose
          className="text-2xl absolute right-3 top-5"
          onClick={() => setShow(false)}
        />
        <div className="flex justify-center mb-5">
          <img
            src="/logo/admirer_logo.png"
            className="w-[110px] h-[72px] cover"
            alt=""
          />
        </div>
        <div>huij</div>
      </div>

      <div
        className={`cart fixed z-[1000] bg-white h-[100vh] w-[340px] px-[30px] py-[40px] flex-col 
        transition-all duration-500 ease-in-out transform right-0 border border-white
        ${
          cartShow ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <IoClose
          className="text-2xl absolute right-3 top-5 cursor-pointer"
          onClick={() => setCartShow(false)}
        />
        <div>Cart Page</div>
      </div>

      <main className=" w-full relative top-0 left-0 z-50 pb-[1px] bg-white shadow-md ">
        <div className="tf-top-bar bg_white line">
          <div className="px_15 lg-px_40">
            <nav className="box-navigation text-center p-2 bg-[#e5d6eb]">
              <Slider {...offerBanner}>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf] text-[14px]">
                    Summer sale discount off 70%
                  </p>
                </div>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf] text-[14px]">
                    Time to refresh your wardrobe.
                  </p>
                </div>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf] text-[14px]">
                    cvyuijnhbg tbijh
                  </p>
                </div>
              </Slider>
            </nav>
          </div>
        </div>

        <div className=" m-auto max-md:w-full ">
          <div className="flex justify-between items-center mb-1 mt-1 w-[94%] m-auto max-md:w-full px-2">
            <div className=" gap-[12px]  hidden max-md:flex">
              <div
                className="w-5 h-[14px] mt-3 flex flex-col justify-between overflow-hidden   cursor-pointer"
                onClick={handleClick}
              >
                <span className="w-full h-[2px] bg-black block"></span>
                <span
                  className={`w-full h-[2px] bg-black block ${
                    show ? "" : "ml-[-9px]"
                  }`}
                ></span>
                <span className="w-full h-[2px] bg-black block"></span>
              </div>
              <Search
                className="relative top-[20px] transform -translate-y-1/2 text-[#7B48A5] cursor-pointer"
                onClick={() => setSearchPopup(true)}
              />
            </div>

            {/* <div className="flex gap-6 text-center align-center items-center"> */}
            <Link to="/">
              <img
                src="/logo/admirer_logo.png"
                className="w-[90px] h-[60px] cover ml-5"
                alt=""
              />
            </Link>

            {/* Search  */}
            <div className="hidden md:block">
              <SearchBarWithPopup />
            </div>

            {/* </div> */}

            {/* right side user icons */}
            <div className="flex gap-4 mt-1 items-center max-md:mt-3">
              <Link to={isLoggedIn ? "/dashboard" : "/LogIn-SignUp"}>
                <div className="flex items-center gap-2">
                  <FaRegUser className="w-5 h-5 mb-[2px] text-[#7B48A5]" />
                  <p className="text-md max-md:hidden tracking-wider text-gray-800">
                    {isLoggedIn ? "Account" : "Login / SignUp"}
                  </p>
                </div>
              </Link>

              {/* Divider */}
              <div className="max-md:hidden h-5 w-[1px] bg-black" />

              <Link to="/wishlist">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#7B48A5]" />
                  <p className="text-md max-md:hidden tracking-wider text-gray-800">
                    Wishlist
                  </p>
                </div>
              </Link>

              {/* Divider */}
              <div className="max-md:hidden h-5 w-[1px] bg-black" />

              <Link to="/cart">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#7B48A5]" />
                  <p className="text-md max-md:hidden tracking-wider text-gray-800">
                    Cart
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="relative w-[97%] m-auto mt-3 mb-1 hidden  max-md:flex ">
          <Search className="absolute left-2  top-6 transform -translate-y-1/2 text-[#7B48A5]" />
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md pl-10 pr-2 w-full h-[45px] border-[#7B48A5] focus:outline-none focus:ring-2 focus:ring-[#d3b6e9] text-black"
          />
        </div> */}
      </main>
    </>
  );
}
export default Header;
