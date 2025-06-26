import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState } from "react";
import TestimonialsSection from "../components/testimonial/Testimonial";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { homePageData } from "../components/api/api-end-points";
import LoaderCode from "../components/Loader";

interface HomePageProps {
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setSubcategoryId: React.Dispatch<React.SetStateAction<string>>;
}

const Loader = () => <LoaderCode />;

// Arrows
const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-5 max-md:left-1 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-5 max-md:right-1 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

// Interfaces
interface BannerItem {
  image: string;
  mobile_img: string;
  url: string;
}
interface CategoryItem {
  image: string;
  title: string;
  url: string;
}
interface AdvertisementItem {
  image: string;
  url: string;
}
interface OffersItem {
  image: string;
  url: string;
}
interface BannerData {
  image: string;
  url: string;
}
interface BottomBanner {
  mobile_banner: BannerData;
  desktop_banner: BannerData;
}

const Home: React.FC<HomePageProps> = ({ setCategoryId, setSubcategoryId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [advertisement, setAdvertisement] = useState<AdvertisementItem[]>([]);
  const [offers, setOffers] = useState<OffersItem[]>([]);
  const [bottombanner, setBottombanner] = useState<BottomBanner>({
    mobile_banner: { image: "", url: "" },
    desktop_banner: { image: "", url: "" },
  });

  const navigate = useNavigate();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
  };

  const shortsSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768, // for screens <= 768px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false, // optional: hide arrows on small screens
          dots: true,
        },
      },
    ],
  };

  const companies = [
    "Cash On Delivery",
    "Fast Shipping",
    "7 Day Exchange",
    "100% Original",
    "Best Quality",
    "UPI and Cards acceptable",
    "No Hidden Charges",
    "Secure Payment Gateway",
  ];

  const shorts = [
    {
      videoUrl: "/home/video/letter_ring.mp4",
      url: "87",
    },
    // {
    //   videoUrl: "/home/video/necklace.mp4",
    //   url: "158",
    // },
    {
      videoUrl: "/home/video/hand_ring.mp4",
      url: "167",
    },
    {
      videoUrl: "/home/video/box_ring.mp4",
      url: "108",
    },
    {
      videoUrl: "/home/video/coupleRing.mp4",
      url: "152",
    },
    {
      videoUrl: "/home/video/stone_ring.mp4",
      url: "24",
    },
  ];

  const features = [
    {
      img: "https://www.josalukkasmedia.com/Media/CMS/Home/Section9/safe.svg",
      title: "Safe & Secure Delivery",
    },
    {
      img: "https://www.josalukkasmedia.com/Media/CMS/Home/Section9/shipping.svg",
      title: "Free Shipping",
    },
    {
      img: "https://www.josalukkasmedia.com/Media/CMS/Home/Section9/diamond.svg",
      title: "7 Days Exchange",
    },
    // {
    //   img: "https://ornatejewels.com/cdn/shop/files/BIS_925_hallmarkedSilverjewellery_3d1eb272-436d-4902-b56d-77628ee130b2.jpg?v=1715071167&width=150",
    //   title: "Signature Gift Box",
    // },
  ];

  const handleClick = (url: string) => {
    const catIdMatch = url.match(/cat-([a-zA-Z0-9]+)/);
    const subcatIdMatch = url.match(/subcat-([a-zA-Z0-9]+)/);

    const categoryId = catIdMatch ? catIdMatch[1] : "";
    const subcategoryId = subcatIdMatch ? subcatIdMatch[1] : "";

    setCategoryId(categoryId);
    console.log("category id", categoryId);
    setSubcategoryId(subcategoryId);
    console.log("subcategory id", subcategoryId);
    navigate("/listing");
  };

  useEffect(() => {
    axios
      .get(homePageData)
      .then((response) => {
        const data = response.data.data;
        setBanners(data.banners);
        setCategory(data.category_subcategory);
        setAdvertisement(data.advertisement);
        setOffers(data.offers_slider);
        setBottombanner(data.bottom_banner);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching homepage data:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Content starts here after loading is complete */}

      {/* Hero Slider */}
      <section>
        <div className="relative">
          <Slider {...sliderSettings}>
            {banners.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.url)}
                className="cursor-pointer"
              >
                <img
                  className="w-full desktop-banner hidden md:block"
                  src={item.image}
                  alt={`Banner ${index}`}
                />
                <img
                  className="w-full mobile-banner block md:hidden"
                  src={item.mobile_img}
                  alt={`Mobile Banner ${index}`}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <div className="relative overflow-hidden bg-purple-200 py-3 max-md:py-2">
        <div className="scroll-wrapper flex w-max animate-scroll">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="mx-8 whitespace-nowrap text-lg max-md:text-base font-semibold text-gray-800"
            >
              {company}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white flex items-center justify-center pt-10 max-md:pt-4 flex-col">
        <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
          Shop the best jewellery online
        </h2>
        <p className="w-[75%] mt-3 max-md:w-full text-center text-lg max-md:text-xs text-gray-600 tracking-wide">
          Fashion trends may change, but the love for jewellery remains
          timeless. Admirer's collection adds irresistible charm with a perfect
          blend of elegance and sophistication.
        </p>
        <img
          src="/home/offer_banner.jpeg"
          className="w-[90%] max-md:hidden max-md:w-[95%] max-md:object-fill mt-5 h-full"
          alt=""
        />
        <img
          src="/home/offer_banner_mobile.jpeg"
          className="w-[90%] max-md:block hidden max-md:w-[95%] max-md:object-fill mt-5 h-full"
        />
      </div>

      {/* Categories */}
      <section>
        <div className="text-center py-6 pt-12 bg-white max-md:pb-4">
          <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
            Find Your Perfect Match
          </h2>
          <p className="text-xl max-md:text-lg text-gray-600 tracking-wider">
            Shop by Categories
          </p>
          <div className="mt-8 max-md:mt-4 w-[85%] max-md:w-full max-md:p-3 grid grid-cols-4 max-md:grid-cols-2 gap-4 max-md:gap-3 m-auto">
            {category.map((cat, index) => (
              <div
                key={index}
                onClick={() => handleClick(cat.url)}
                className="cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden mb-4">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {cat.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertisement Section */}
      <section>
        <div className="bg-white flex flex-col items-center p-6 max-md:p-2 max-md:pt-0">
          <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
            Admirer Collections
          </h2>
          <p className="text-xl max-md:text-lg text-gray-600 tracking-wider">
            Explore our newly launched collection
          </p>
          {advertisement.length >= 3 && (
            <div className="mt-8 max-md:mt-5 grid grid-cols-2 max-md:grid-cols-1 gap-2 max-md:gap-0 w-[90%] max-md:w-[97%] m-auto">
              <div>
                <img
                  onClick={() => handleClick(advertisement[0].url)}
                  src={advertisement[0].image}
                  alt="Main collection"
                  className="w-full h-auto rounded-xl max-md:h-[97%] cursor-pointer"
                />
              </div>
              <div className="grid gap-1.5 max-md:gap-3">
                <img
                  onClick={() => handleClick(advertisement[1].url)}
                  src={advertisement[1].image}
                  alt="advertisement 1"
                  className="w-full h-auto rounded-xl cursor-pointer"
                />
                <img
                  onClick={() => handleClick(advertisement[2].url)}
                  src={advertisement[2].image}
                  alt="advertisement 2"
                  className="w-full h-auto rounded-xl cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Offers Section */}
      <section className="">
        <div className="bg-white flex flex-col items-center p-6 pb-16 max-md:p-4">
          <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
            Curated For You
          </h2>

          {/* Desktop View */}
          <div className="mt-8 hidden md:grid grid-cols-3 gap-2 w-[90%] m-auto ">
            {offers.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleClick(item.url)}
                className="cursor-pointer"
              >
                <img
                  src={item.image}
                  className="w-full h-full object-cover rounded-xl"
                  alt={`Curated ${idx}`}
                />
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="mt-3 w-full md:hidden overflow-hidden">
            <div className="flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4">
              {offers.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(item.url)}
                  className="flex-shrink-0 w-[72vw] snap-center"
                >
                  <img
                    src={item.image}
                    className="w-full h-[auto] object-cover rounded-xl"
                    alt={`Curated ${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shorts Section */}
      <section>
        <div className="bg-white flex flex-col pt-0 items-center pb-16 max-md:p-1">
          <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
            Watch and Buy
          </h2>
          <div className="grid grid-cols-1 mt-6 max-md:mt-3 overflow-auto max-md:pb-7">
            <Slider {...shortsSetting}>
              {shorts.map((item, index) => (
                <div key={index} className="p-1 max-md:p-0.5">
                  <Link to={`product/${item.url}`}>
                    <video autoPlay muted loop className="">
                      <source src={item.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      {bottombanner.desktop_banner.image &&
        bottombanner.mobile_banner.image && (
          <section className="bg-white flex flex-col  items-center pb-8  max-md:p-1">
            <h2 className="text-4xl max-md:text-2xl font-semibold mb-8 max-md:mb-6 max-md:mt-4 text-gray-800 ">
              Design Led Jewellery
            </h2>
            <div className="w-[90%] m-auto max-md:w-[95%]">
              <img
                onClick={() => handleClick(bottombanner.desktop_banner.url)}
                src={bottombanner.desktop_banner.image}
                className="w-full rounded-lg desktop-banner cursor-pointer"
                alt="Desktop Bottom Banner"
              />
              <img
                onClick={() => handleClick(bottombanner.mobile_banner.url)}
                src={bottombanner.mobile_banner.image}
                className="w-full rounded-lg mobile-banner cursor-pointer"
                alt="Mobile Bottom Banner"
              />
            </div>
          </section>
        )}

      <section className="bg-white pb-10 max-md:pt-10">
        <div className=" bg-purple-200">
        <div className="grid grid-cols-3 max-md:grid-cols-3 items-center justify-center py-12 w-[85%] max-md:w-full text-center m-auto gap-4">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-5">
              <img src={item.img} alt="" className="mx-auto text-xl" />
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <TestimonialsSection />
      </section>
    </>
  );
};

export default Home;
