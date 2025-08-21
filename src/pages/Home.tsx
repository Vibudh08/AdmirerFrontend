import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useState } from "react";
import TestimonialsSection from "../components/testimonial/Testimonial";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { homePageData } from "../components/api/api-end-points";
import LoaderCode from "../components/Loader";
import AOS from "aos";
import "aos/dist/aos.css";

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

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [category, setCategory] = useState<CategoryItem[]>([]);
  const [advertisement, setAdvertisement] = useState<AdvertisementItem[]>([]);
  const [offers, setOffers] = useState<OffersItem[]>([]);
  const [bottombanner, setBottombanner] = useState<BottomBanner>({
    mobile_banner: { image: "", url: "" },
    desktop_banner: { image: "", url: "" },
  });
  const [isDesktop, setIsDesktop] = useState(true);
  const [videoErrors, setVideoErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
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
      img: "/home/safe_delivery.png",
      title: "Safe & Secure Delivery",
    },
    {
      img: "/home/shipping.png",
      title: "Free Shipping",
    },
    {
      img: "/home/exchange.png",
      title: "7 Days Exchange",
    },
    {
      img: "/home/secure.png",
      title: "Secure Payment",
    },
  ];

  // const handleClick = (url: string) => {
  //   const catIdMatch = url.match(/cat-([a-zA-Z0-9]+)/);
  //   const subcatIdMatch = url.match(/subcat-([a-zA-Z0-9]+)/);

  //   const categoryId = catIdMatch ? catIdMatch[1] : "";
  //   const subcategoryId = subcatIdMatch ? subcatIdMatch[1] : "";

  //   setCategoryId(categoryId);
  //   console.log("category id", categoryId);
  //   setSubcategoryId(subcategoryId);
  //   console.log("subcategory id", subcategoryId);
  //   navigate("/listing");
  // };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      offset: 100,
      mirror: false,
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleClick = (url: string) => {
    const catIdMatch = url.match(/cat-([a-zA-Z0-9]+)/);
    const subcatIdMatch = url.match(/subcat-([a-zA-Z0-9]+)/);
    console.log("url", url);
    // console.log(subcatIdMatch);
    const categoryId = catIdMatch ? catIdMatch[1] : "";
    const subcategoryId = subcatIdMatch ? subcatIdMatch[1] : "";

    sessionStorage.setItem("categoryId", categoryId);
    sessionStorage.setItem("activeSubcategory", subcategoryId);

    // setCategoryId(categoryId);
    // setSubcategoryId(subcategoryId);

    // ✅ Navigate with params in URL
    navigate(`/listing?cat=26&subcat=${subcategoryId}`);
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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Content starts here after loading is complete */}

      <main>
        {/* Hero Slider */}
        <section
          {...(isDesktop && { "data-aos": "fade-up", "data-aos-delay": "100" })}
          className="mt-[-55px]"
        >
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

        {/* Scrolling Text */}
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

        {/* Hero Content */}
        <div
          className="bg-white flex items-center justify-center pt-10 max-md:pt-4 flex-col"
          {...(isDesktop && { "data-aos": "fade-up", "data-aos-delay": "300" })}
        >
          <div className="flex justify-center items-center ml-20 max-md:ml-6">
            <img src="/home/1.jpeg" className="w-[900px] max-md:mt-2" alt="" />
          </div>
          <img
            src="/home/offer-banner.jpg"
            className="w-[90%] block  mt-5 max-md:mt-4 h-full cursor-pointer"
            alt=""
            onClick={() => handleClick("subcat-15")}
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "400",
            })}
          />
        </div>

        {/* Categories */}
        <section>
          <div
            className="text-center py-6 pt-8 bg-white max-md:pb-4"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "500",
            })}
          >
            <div className="flex justify-center items-center mt-3">
              <img
                src="/home/2.jpeg"
                className="w-[700px] max-md:mt-2 "
                alt=""
              />
            </div>

            <div className="mt-8 max-md:mt-4 w-[100%] max-md:w-full max-md:p-2 grid grid-cols-5 max-md:grid-cols-2  max-md:gap-2 m-auto">
              {category.map((cat, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(cat.url)}
                  className="cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "zoom-in-up",
                    "data-aos-delay": `${100 + index * 100}`,
                  })}
                >
                  <div className="max-md:rounded-2xl overflow-hidden mb-4 max-md:mb-1.5">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://admirer.in/asset/image/combo-offer-image.jpg";
                      }}
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

        {/* Advertisement */}
        <section>
          <div className="bg-white flex flex-col items-center p-8 max-md:p-4 max-md:pt-0">
            <div
              className="flex justify-center items-center mt-3"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/3.png"
                className="w-[700px] max-md:mt-2 "
                alt=""
              />
            </div>

            {advertisement.length >= 3 && (
              <div className="mt-10 max-md:mt-6 grid grid-cols-2 max-md:grid-cols-1 gap-2 w-[97%] m-auto">
                <div
                  {...(isDesktop && {
                    "data-aos": "fade-right",
                    "data-aos-delay": "300",
                  })}
                >
                  <img
                    onClick={() => handleClick(advertisement[0].url)}
                    src={advertisement[0].image}
                    alt="Main collection"
                    className="w-full h-auto rounded-2xl shadow-md cursor-pointer"
                  />
                </div>

                <div className="grid gap-2 max-md:gap-4">
                  <img
                    onClick={() => handleClick(advertisement[1].url)}
                    src={advertisement[1].image}
                    alt="advertisement 1"
                    className="w-full h-auto rounded-2xl shadow-md cursor-pointer"
                    {...(isDesktop && {
                      "data-aos": "fade-down",
                      "data-aos-delay": "400",
                    })}
                  />

                  <img
                    onClick={() => handleClick(advertisement[2].url)}
                    src={advertisement[2].image}
                    alt="advertisement 2"
                    className="w-full h-auto rounded-2xl shadow-md cursor-pointer"
                    {...(isDesktop && {
                      "data-aos": "fade-up",
                      "data-aos-delay": "400",
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Offers */}
        <section>
          <div className="bg-white flex flex-col items-center p-6 pb-16 max-md:p-4">
            <div
              className="flex justify-center items-center mt-3"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/4.jpeg"
                className="w-[400px] max-md:mt-2 "
                alt=""
              />
            </div>

            {/* Desktop */}
            <div className="mt-8 hidden md:grid grid-cols-3 gap-4 w-[90%] m-auto">
              {offers.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(item.url)}
                  className="cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": `${200 + idx * 250}`,
                  })}
                >
                  <img
                    src={item.image}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                    alt={`Curated ${idx}`}
                  />
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="mt-4 w-full md:hidden overflow-hidden">
              <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4">
                {offers.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleClick(item.url)}
                    className="flex-shrink-0 w-[72vw] snap-center"
                  >
                    <img
                      src={item.image}
                      className="w-full h-auto object-cover rounded-xl shadow-md"
                      alt={`Curated ${idx}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shorts */}
        <section>
          <div className="bg-white flex flex-col pt-0 items-center pb-16 max-md:p-1">
            <div
              className="flex justify-center items-center mt-3"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/5.jpeg"
                className="w-[400px] max-md:mt-2 "
                alt=""
              />
            </div>
            <div className="grid grid-cols-1 mt-6 max-md:mt-3 overflow-auto max-md:pb-7">
              <Slider {...shortsSetting}>
                {shorts.map((item, index) => (
                  <div
                    key={index}
                    className="p-1 max-md:p-0.5"
                    {...(isDesktop && {
                      "data-aos": "zoom-in",
                      "data-aos-delay": `${200 + index * 100}`,
                    })}
                  >
                    <Link to={`product/${item.url}`}>
                      {!videoErrors[index] ? (
                        <video
                          autoPlay
                          muted
                          loop
                          preload="auto"
                          onError={() =>
                            setVideoErrors((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                        >
                          <source src={item.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src="/home/video/fallback_image.png"
                          alt="Fallback"
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        <section>
          <div
            className="relative bg-[url('/home/background.jpg')] bg-cover bg-center h-screen 
             max-md:bg-[linear-gradient(to_bottom,white_0%,#F7D6E0_30%,#FAD4C0_70%,white_100%)] 
           max-md:h-[660px]"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": 200,
            })}
          >
            {/* Keep your heading image here for mobile */}
            <img
              src="/home/background_mobile.png"
              alt="Shop by Budget"
              className="max-md:block w-60 max-md:mb-6 hidden mx-auto pt-6"
            />
            {/* Desktop Layout */}
            <div className="relative hidden md:block">
              <Link to="/listing?cat=26&subcat=10">
                <img
                  src="/home/1st.png"
                  className="w-[250px] absolute top-80 left-44 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                  alt=""
                />
              </Link>
              <Link to="/listing?cat=26&subcat=15">
                <img
                  src="/home/2nd.png"
                  className="w-[350px] absolute top-40 left-1/3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay="800"
                  alt=""
                />
              </Link>
              <Link to="/listing?cat=26&subcat=12">
                <img
                  src="/home/3rd.png"
                  className="w-[450px] absolute top-8 right-9 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay="1200"
                  alt=""
                />
              </Link>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col items-center gap-0">
              {/* Top row */}
              <div className="flex justify-center gap-0 w-full">
                <Link to="/listing?cat=26&subcat=10">
                  <div className="flex-shrink-0">
                    <img
                      src="/home/1st.png"
                      className="w-[135px] md:hidden hover:scale-105 mt-[-25px] transition-transform duration-300 ease-in-out cursor-pointer"
                      alt=""
                    />
                  </div>
                </Link>
                <Link to="/listing?cat=26&subcat=15">
                  <div className="flex-shrink-0">
                    <img
                      src="/home/2nd.png"
                      className="w-[200px] md:hidden hover:scale-105 ml-[-10px] transition-transform duration-300 ease-in-out cursor-pointer"
                      alt=""
                    />
                  </div>
                </Link>
              </div>

              {/* Bottom row */}
              <Link to="/listing?cat=26&subcat=12">
                <div className="flex justify-center w-full">
                  <img
                    src="/home/3rd.png"
                    className="w-[320px] md:hidden mt-[-13px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-white flex flex-col items-center p-8 max-md:p-3 max-md:pt-0">
            <div
              className="flex justify-center items-center mt-3"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              <img
                src="/home/3.png"
                className="w-[700px] max-md:mt-2 "
                alt=""
              />
            </div>

            <div className="mt-10 max-md:mt-6 grid grid-cols-2 max-md:grid-cols-2 gap-2 max-md:gap-3 w-[90%] max-md:w-full m-auto">
              <div className=" flex flex-col gap-2 max-md:gap-3">
                <img
                  onClick={() => handleClick("subcat-12")}
                  src={isDesktop ? "/home/four_part/1.jpg" : "/home/four_part/1mobile.jpg"}
                  alt="advertisement 1"
                  className="w-full rounded-2xl shadow-md h-full cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": "400",
                  })}
                />

                <img
                  onClick={() => handleClick(advertisement[2].url)}
                  src={isDesktop ? "/home/four_part/3.jpg" : "/home/four_part/3mobile.jpg"}
                  alt="advertisement 2"
                  className="w-full h-full rounded-2xl shadow-md cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-down",
                    "data-aos-delay": "400",
                  })}
                />
              </div>

              <div className="flex flex-col gap-2 max-md:gap-3">
                <img
                  onClick={() => handleClick(advertisement[1].url)}
                  src={isDesktop ? "/home/four_part/2.jpg" : "/home/four_part/2mobile.jpg"}
                  alt="advertisement 1"
                  className="w-full h-full rounded-2xl shadow-md cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-down",
                    "data-aos-delay": "400",
                  })}
                />

                <img
                  onClick={() => handleClick(advertisement[2].url)}
                  src={isDesktop ? "/home/four_part/4.jpg" : "/home/four_part/4mobile.jpg"}
                  alt="advertisement 2"
                  className="w-full h-full rounded-2xl shadow-md cursor-pointer"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": "400",
                  })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="!pb-20 bg-white relative h-[630px] max-md:h-[400px]">
          <div
            className=" py-12 bg-white"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "200",
            })}
          >
            <img
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw08083f53/homepage/new-arrivals/new-arrivals-background.jpg"
              alt=""
              className=""
            />
          </div>
          <div
            className="flex py-12 max-md:py-20 gap-4 max-md:gap-3 justify-center max-md:justify-start absolute max-md:w-full max-md:px-3 top-[45%] max-md:top-[16%] overflow-x-auto scrollbar-hide"
            {...(isDesktop && {
              "data-aos": "fade-up",
              "data-aos-delay": "400",
            })}
          >
            <img
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw05fd8a0f/homepage/new-arrivals/mangalsutra.jpg"
              alt=""
              className="p-3 rounded-xl w-[42%] max-md:w-full bg-white"
            />
            <img
              src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1586e759/homepage/new-arrivals/pendants.jpg"
              alt=""
              className="p-3 rounded-xl w-[42%] max-md:w-full bg-white"
            />
          </div>
        </section> */}

        {/* Bottom Banner */}
        {bottombanner.desktop_banner.image &&
          bottombanner.mobile_banner.image && (
            <section className="bg-white flex flex-col items-center pb-8 pt-16 max-md:p-1">
              <div
                className="flex justify-center items-center"
                {...(isDesktop && {
                  "data-aos": "fade-up",
                  "data-aos-delay": "100",
                })}
              >
                <img
                  src="/home/6.jpeg"
                  className="w-[400px] max-md:mt-2 mb-6 "
                  alt=""
                />
              </div>
              <div
                className="w-[90%] m-auto max-md:w-[95%]"
                {...(isDesktop && {
                  "data-aos": "fade-up",
                  "data-aos-delay": "200",
                })}
              >
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

        {/* Features */}
        <section className="bg-white pb-10 max-md:pt-10">
          <div className="bg-[linear-gradient(to_bottom,white_0%,#F7D6E0_30%,#FAD4C0_70%,white_100%)]">
            <div
              className="grid grid-cols-4 max-md:grid-cols-2 items-center justify-center py-12 w-[85%] max-md:w-full text-center m-auto gap-4"
              {...(isDesktop && {
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              })}
            >
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-5"
                  {...(isDesktop && {
                    "data-aos": "fade-up",
                    "data-aos-delay": `${100 + index * 100}`,
                  })}
                >
                  <img
                    src={item.img}
                    alt=""
                    className={`mx-auto ${index == 1 ? "w-20 " : "w-16"}`}
                  />
                  <p
                    className={`font-semibold ${
                      index == 1 ? "mt-[-16px] " : ""
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          {...(isDesktop && { "data-aos": "fade-up", "data-aos-delay": "100" })}
        >
          <TestimonialsSection />
        </section>
      </main>
    </>
  );
};

export default Home;
