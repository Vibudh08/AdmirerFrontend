import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React from "react";

const CustomPrevArrow = (props: { onClick: any; }) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
      onClick={onClick}
    >
      <IoIosArrowBack className="text-3xl text-gray-700 hover:text-white" />
    </button>
  );
};

const CustomNextArrow = (props: { onClick: any; }) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black  transition hover:text-white"
      onClick={onClick}
    >
      <IoIosArrowForward className="text-3xl text-gray-700 hover:text-white" />
    </button>
  );
};

const Home = () => {
  var mainHeroBanner = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={undefined} />,
    nextArrow: <CustomNextArrow onClick={undefined} />,
  };

  return (
    <section>
      <div className="relative">
        <Slider {...mainHeroBanner}>
          <div>
            <img className="w-full desktop-banner" src="/home/banner.jpg" />
            <img className="w-full mobile-banner" src="/home/bannermobile.png" />

          </div>
          <div>
            <img className="w-full desktop-banner" src="/home/banner2.jpg" />
            <img className="w-full mobile-banner" src="/home/bannermobile1.jpg" />
          </div>
          <div>
            <img className="w-full desktop-banner" src="/home/banner3.jpg" />
            <img className="w-full mobile-banner" src="/home/bannermobile2.jpg" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Home;
