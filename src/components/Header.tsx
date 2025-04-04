import { useState } from "react";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import React from "react";

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
  const handleClick = () => {
    setShow(!show);
  };

  const [cartShow, setCartShow] = useState(false);
  const handleCart = () => {
    setCartShow(!cartShow);
  };
  return (
    <>
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
        className={`categories fixed z-[1000] bg-white h-[100vh] w-[310px] px-[30px] py-[40px] flex-col 
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
  ${cartShow ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
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
                  <p className="top-bar-text fw-5 text-[#7925bf]">
                    Summer sale discount off 70%
                  </p>
                </div>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf]">
                    Time to refresh your wardrobe.
                  </p>
                </div>
                <div className="swiper-slide">
                  <p className="top-bar-text fw-5 text-[#7925bf]">
                    cvyuijnhbg tbijh
                  </p>
                </div>
              </Slider>
            </nav>
          </div>
        </div>

        <div>
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
              <Search className="relative top-[20px] transform -translate-y-1/2 text-[#7B48A5] " />
            </div>

            <div className="relative w-[270px] max-md:hidden ">
              <Search className="absolute left-2  top-6 transform -translate-y-1/2 text-[#7B48A5]" />
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-md pl-10 pr-2 w-full h-[45px] border-[#7B48A5] focus:outline-none focus:ring-2 focus:ring-[#d3b6e9] text-black"
              />
            </div>
            <Link to="/">
              <img
                src="/logo/admirer_logo.png"
                className="w-[110px] h-[72px] cover mr-[60px] max-md:mr-[0px] max-md:ml-[40px]"
                alt=""
              />
            </Link>
            <div className="flex gap-4 mt-1 max-md:mt-3">
              <Link to="/LogIn">
                <div
                  className="text-center flex mt-1 flex-col items-center"
                >
                  <FaRegUser className="w-6 h-6 leading-2 text-[#7B48A5] max-md:mb-1" />
                  <p className="text-lg max-md:hidden tracking-wide text-black">
                    Login
                  </p>
                </div>
              </Link>
              <Link to="/SignUp">
                <div className="text-center mt-1 flex flex-col items-center"
                 >
                  <FaRegHeart className="w-6 h-6 text-[#7B48A5]" />
                  <p className="text-lg max-md:hidden tracking-wide text-black">
                    Wishlist
                  </p>
                </div>
              </Link>
              <div
                className="text-center flex flex-col items-center"
                onClick={handleCart}
              >
                <MdOutlineShoppingBag className="w-7 h-7 text-[#7B48A5]" />
                <p className="text-lg max-md:hidden tracking-wide text-black">
                  Cart
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-[97%] m-auto mt-3 mb-1 hidden  max-md:flex ">
          <Search className="absolute left-2  top-6 transform -translate-y-1/2 text-[#7B48A5]" />
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md pl-10 pr-2 w-full h-[45px] border-[#7B48A5] focus:outline-none focus:ring-2 focus:ring-[#d3b6e9] text-black"
          />
        </div>
      </main>
    </>
  );
}
export default Header;
