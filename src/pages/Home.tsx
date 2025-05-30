import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState } from "react";
import TestimonialsSection from "../components/testimonial/Testimonial";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { homePageData } from "../components/api/api-end-points";
import LoaderCode from "../components/Loader";

// ✅ Move this outside the component
interface HomePageProps {
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  setSubcategoryId: React.Dispatch<React.SetStateAction<string>>;
}

const Loader = () => <LoaderCode />;

// Arrows
const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-3xl max-md:text-2xl text-gray-700 hover:text-white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-2xl text-gray-700 hover:text-white" />
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
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
  };

  const companies = [
    "sdfghjgfdsaSDFGHFDS",
    "4543234565431345",
    "CVXCZZCVBNVCX",
    "Facebook",
    "Netflix",
    "Adobe",
    "Airbnb",
    "Spotify",
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

      <div className="relative overflow-hidden bg-white py-4">
        <div className="scroll-wrapper flex w-max animate-scroll">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="mx-8 whitespace-nowrap text-lg font-semibold text-gray-700"
            >
              {company}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white flex items-center justify-center pt-8 flex-col">
        <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
          Shop the best jewellery online
        </h2>
        <p className="w-[75%] mt-3 max-md:w-full text-center text-base max-md:text-xs text-gray-600 tracking-wide">Fashion and trends keep changing on a regular basis, but what remains constant is the love for jewellery that individuals have. The jewellery exclusively from Admirer's collection lends an irresistible charm to the wearer that beautifully blends elegance and sophistication.</p>
        <img src="/home/offer_banner.jpeg" className="w-[90%] max-md:hidden max-md:w-[95%] max-md:object-fill mt-5 h-full" alt="" />
        <img src="/home/offer_banner_mobile.jpeg" className="w-[90%] max-md:block hidden max-md:w-[95%] max-md:object-fill mt-5 h-full" />
      </div>

      {/* Categories */}
      <section>
        <div className="text-center py-6 pt-12 bg-white">
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
        <div className="bg-white flex flex-col items-center p-6">
          <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
            Admirer Collections
          </h2>
          <p className="text-xl max-md:text-lg text-gray-600 tracking-wider">
            Explore our newly launched collection
          </p>
          {advertisement.length >= 3 && (
            <div className="mt-8 grid grid-cols-2 max-md:grid-cols-1 gap-2 max-md:gap-0 w-[90%] max-md:w-[97%] m-auto">
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
          <div className="mt-8 hidden md:grid grid-cols-3 gap-2 w-[90%] m-auto h-[450px]">
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
          <div className="mt-8 w-full md:hidden overflow-hidden">
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

      {/* Bottom Banner */}
      {bottombanner.desktop_banner.image &&
        bottombanner.mobile_banner.image && (
          <section className="bg-white py-6 pb-12">
            <div className="w-[87%] m-auto">
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

      {/* Testimonials */}
      <section>
        <TestimonialsSection />
      </section>
    </>
  );
};

export default Home;
