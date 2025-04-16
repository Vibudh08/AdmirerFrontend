import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React from "react";
import TestimonialsSection from "../components/testimonial/Testimonial";

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

// Banners
const bannerImages = [
  {
    desktop: "/home/banner.jpg",
    mobile: "/home/bannermobile.png",
  },
  {
    desktop: "/home/banner2.jpg",
    mobile: "/home/bannermobile1.jpg",
  },
  {
    desktop: "/home/banner3.jpg",
    mobile: "/home/bannermobile2.jpg",
  },
];

// Categories
const categories = [
  {
    title: "EARRINGS",
    image:
      "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/194/1737539642_bdac2baf411a5259c0b3.jpg",
  },
  {
    title: "MANGALSUTRA",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2024/1/379075426/DP/OM/VC/60528717/artificial-jewellery-necklace-set.jpg",
  },
  {
    title: "PENDANTS",
    image:
      "https://ratnalayajewels.com/wp-content/uploads/sites/449/2022/04/PHOTO-2022-04-11-15-14-09_3.jpg",
  },
  {
    title: "MANGALSUTRA",
    image: "https://m.media-amazon.com/images/I/914Hiv6tAzL._AC_UY1100_.jpg",
  },
  {
    title: "MANGALSUTRA",
    image:
      "https://rubans.in/cdn/shop/products/rubans-gold-plated-red-green-stone-studded-temple-jewellery-set-necklace-set-33613007782062.png?v=1678797822",
  },
  {
    title: "FINGER RINGS",
    image: "https://www.candere.com/media/jewellery/images/KCGR030__1.jpeg",
  },
];

// Collections
const collections = [
  {
    image:
      "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw622645f4/homepage/tanishq-collections/soulmate-desktop.jpg",
  },
  {
    image:
      "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dweeb09ff3/homepage/tanishq-collections/string-it.jpg",
  },
  {
    image:
      "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3cd1adf0/homepage/tanishq-collections/kids-jewellery.jpg",
  },
];

// Curated
const curated = [
  {
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw811805ad/homepage/ShopByGender/sbg-women.jpg",
  },
  {
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe6fec18e/homepage/ShopByGender/sbg-men.jpg",
  },
  {
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1e976d94/homepage/ShopByGender/sbg-kids.jpg",
  },
];
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["First", "Second", "Third"];
  const chunkSize = Math.ceil(curated.length / 3);
  const chunks = [
    curated.slice(0, chunkSize),
    curated.slice(chunkSize, chunkSize * 2),
    curated.slice(chunkSize * 2),
  ];
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

  return (
    <>
      {/* Hero Banner */}
      <section>
        <div className="relative">
          <Slider {...sliderSettings}>
            {bannerImages.map((banner, index) => (
              <div key={index}>
                <img className="w-full desktop-banner" src={banner.desktop} />
                <img className="w-full mobile-banner" src={banner.mobile} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

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
            {categories.map((cat, index) => (
              <div key={index}>
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

      {/* Collections */}
      <section>
        <div className="bg-white flex flex-col items-center p-6">
          <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
            Admirer Collections
          </h2>
          <p className="text-xl max-md:text-lg text-gray-600 tracking-wider">
            Explore our newly launched collection
          </p>
          <div className="mt-8 grid grid-cols-2 max-md:grid-cols-1 gap-2 max-md:gap-0 w-[90%] max-md:w-[97%] m-auto">
            <div>
              <img
                src={collections[0].image}
                alt="Main collection"
                className="w-full h-auto rounded-xl max-md:h-[97%]"
              />
            </div>
            <div className="grid gap-1.5 max-md:gap-3">
              {collections.slice(1).map((item, idx) => (
                <div key={idx}>
                  <img
                    src={item.image}
                    alt={`Collection ${idx}`}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curated */}
      <section>
      <div className="bg-white flex flex-col items-center p-6">
        <h2 className="text-4xl max-md:text-2xl font-semibold text-gray-800 mb-1">
          Curated For You
        </h2>

        {/* Mobile Toggle Buttons */}
        <div className="mt-4 flex max-md:flex justify-center space-x-2 md:hidden">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-1 rounded-full border ${
                activeTab === index
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              } text-sm transition`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Desktop View */}
        <div className="mt-8 grid grid-cols-3 max-md:hidden gap-2 w-[90%] m-auto h-[450px]">
          {curated.map((item, idx) => (
            <div key={idx}>
              <img
                src={item.image}
                className="w-full h-[90%] object-cover rounded-xl"
                alt={`Curated ${idx}`}
              />
            </div>
          ))}
        </div>

        {/* Mobile Slide View */}
        <div className="mt-8 md:hidden overflow-hidden w-[97%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-3"
            >
              {chunks[activeTab].map((item, idx) => (
                <div key={idx}>
                  <img
                    src={item.image}
                    className="w-full object-cover rounded-xl"
                    alt={`Curated ${idx}`}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>

      {/* Banner */}
      <section className="bg-white py-6">
        <div className="w-[87%] m-auto">
          <img
            src="https://admirer.in/assets/images/gifbanner.gif"
            className="w-full rounded-lg desktop-banner"
            alt=""
          />
          <img
            src="https://admirer.in/assets/img/banner/maingif.gif"
            className="w-full rounded-lg mobile-banner"
            alt=""
          />
        </div>
      </section>

      <section className="">
        <TestimonialsSection/>
      </section>

    </>
  );
};

export default Home;
