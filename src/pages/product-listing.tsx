import React, { useState, useEffect } from "react";
import ProductItem from "../components/product-listing/product-item";
import LeftSideBar from "../components/product-listing/left-side-bar";
import { FiFilter, FiX } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { Empty, Select } from "antd";

import {
  product_listing_API,
  productPriceCategoryInfo_API,
  getSubCatName_API,
} from "../components/api/api-end-points";
import LoaderCode from "../components/Loader";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";

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
    className="absolute right-5 max-md:right-1 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

const ProductListing: React.FC = () => {
  const navigate = useNavigate();
  const [cat, setCat] = useState<Number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryReady, setCategoryReady] = useState(false);
  const [productDataArray, setProductDataArray] = useState<any[]>([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [dynamicMinVal, setDynamicMinVal] = useState(0);
  const [dynamicMaxVal, setDynamicMaxVal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [productDataLoaded, setProductDataLoaded] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("relevance");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCategoryId = searchParams.get("cat");
  const urlSubcategoryId = searchParams.get("subcat");

  const finalCategoryId = urlCategoryId || sessionStorage.getItem("categoryId");
  const finalSubcategoryId =
    urlSubcategoryId || sessionStorage.getItem("subcategoryId");
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const savedY = sessionStorage.getItem("listingScrollY");
    if (savedY) {
      setSavedScrollY(parseInt(savedY));
    }
  }, []);

  useEffect(() => {
    if (savedScrollY !== null && productDataLoaded) {
      setTimeout(() => {
        window.scrollTo(0, savedScrollY);
        sessionStorage.removeItem("listingScrollY");
      }, 0);
    }
  }, [savedScrollY, productDataLoaded]);

  useEffect(() => {
    if (!finalCategoryId && !finalSubcategoryId) {
      navigate("/");
    }
  }, [finalCategoryId, finalSubcategoryId, navigate]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setShowMobileFilters(false);
    }
  }, [isMobile]);

  const filteredProducts = productDataArray.filter((item) => {
    const discountedPrice = Number(item.discount);
    return (
      discountedPrice >= dynamicMinVal &&
      discountedPrice <= dynamicMaxVal &&
      (subCategory === item.sub_cat_name || subCategory === "")
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.discount) || 0; // fallback to 0
    const priceB = Number(b.discount) || 0;

    if (sortOption === "lowToHigh") {
      return priceA - priceB;
    }
    if (sortOption === "highToLow") {
      return priceB - priceA;
    }
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  useEffect(() => {
    // STEP 1: Get from URL or Session
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    const urlCategoryId = searchParams.get("cat");
    const urlSubcategoryId = searchParams.get("subcat");

    const finalCategoryId =
      urlCategoryId || sessionStorage.getItem("categoryId");
    const finalSubcatId =
      urlSubcategoryId || sessionStorage.getItem("subcategoryId");

    if (finalSubcatId) {
      setLoading(true);

      fetch(getSubCatName_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subcatId: Number(finalSubcatId) }),
      })
        .then((res) => res.json())
        .then((value) => {
          setSubCategory(value?.subcatName || "");
          setCat(value?.catId || null);
          // Also update session if needed:
          if (value?.catId) {
            sessionStorage.setItem("categoryId", value?.catId);
          }
          setCategoryReady(true);
        });
    } else if (finalCategoryId) {
      setLoading(true);
      setCat(Number(finalCategoryId));
      sessionStorage.setItem("categoryId", finalCategoryId);
      fetch(product_listing_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maxPrice: maxVal,
          minPrice: minVal,
          category: Number(finalCategoryId),
        }),
      })
        .then((res) => res.json())
        .then((data) => setProductDataArray(data))
        .catch((err) => console.error("Failed to fetch products:", err))
        .finally(() => {
          setLoading(false);
          setCategoryReady(true);
        });
    }
  }, [maxVal, minVal]);

  useEffect(() => {
    fetch(productPriceCategoryInfo_API)
      .then((res) => res.json())
      .then((data) => {
        setMinVal(Number(data.minPrice));
        setMaxVal(Number(data.maxPrice));
        setDynamicMinVal(Number(data.minPrice));
        setDynamicMaxVal(Number(data.maxPrice));
      });
  }, []);

  useEffect(() => {
    if (!categoryReady || !cat) return;
    const start = performance.now(); // ⏱ start timing
    setLoading(true);
    setLoading(true);
    setProductDataLoaded(false); // reset when fetching starts
    fetch(product_listing_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        maxPrice: maxVal,
        minPrice: minVal,
        category: Number(cat),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now(); // ⏱ end timing
        console.log(`⏱ Product API took ${(end - start).toFixed(2)} ms`);
        console.log(data);
        setProductDataArray(data);
        setProductDataLoaded(true); // data fetch complete
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setProductDataLoaded(true); // prevent stuck state
      })
      .finally(() => setLoading(false));
  }, [minVal, maxVal, cat, categoryReady]);

  console.log("new", filteredProducts);
  if (loading) return <Loader />;
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-2 sm:p-4 relative">
        {loading && <Loader />}

        {/* <button
        aria-label="Open filters"
        className={`lg:hidden fixed bottom-6 right-5 max-md:right-4 z-10 bg-[#7b48a5] text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
          showMobileFilters ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setShowMobileFilters(true)}
      >
        <FiFilter size={16} />
        <span className="sr-only">Open Filters</span>
      </button> */}

        <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4 mb-4 max-md:mb-2">
          <div className="relative">
            <Slider {...sliderSettings}>
              <div>
                <img
                  className="w-full desktop-banner hidden md:block"
                  src="/listing/sale.jpg"
                  alt="Desktop Banner"
                />
                <img
                  className="w-full mobile-banner block md:hidden"
                  src="/listing/sale_mobile.jpg"
                  alt="Mobile Banner"
                />
              </div>
              {/* <div>
              <img
                className="w-full desktop-banner hidden md:block"
                src="/listing/raksha_bandhan2.gif"
                alt="Desktop Banner"
              />
              <img
                className="w-full mobile-banner block md:hidden"
                src="/listing/mobile_view2.gif"
                alt="Mobile Banner"
              />
            </div> */}
            </Slider>
          </div>
        </div>

        <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-200 p-3 px-5 max-md:px-3  sm:p-3 lg:p-4 mb-4 max-md:mb-2">
          {/* Title + Results */}
          <div className="flex justify-between items-center mb-1 max-md:mb-0">
            <h2 className="text-2xl max-md:text-xl px-3 max-md:px-0 font-semibold text-gray-800 max-md:mb-0">
              {subCategory ? subCategory : "Jewellery"}{" "}
              <span className="text-gray-500 text-base max-md:text-sm">
                ({filteredProducts.length} results)
              </span>
            </h2>
          </div>

          {/* Filter + Sort Row */}
          <div className="flex justify-between items-center max-md:gap-2 px-3 max-md:px-0 max-md:hidden">
            {/* Left: Filter button */}
            <button
              aria-label="Open filters"
              className="flex items-center gap-2 px-4 max-md:px-4 py-[10px]  border border-gray-300 rounded-full max-md:rounded-md max-md:w-1/2 text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setShowMobileFilters(true)}
            >
              <FiFilter size={18} />
              <span className="text-sm font-medium">Filter</span>
            </button>

            {/* Right: Sort */}
            <div className="flex items-center gap-0 px-2 pl-4 py-2 max-md:py-1 border border-gray-300 rounded-full max-md:rounded-md max-md:w-1/2 text-gray-700">
              <span className="text-sm max-md:hidden">Sort By:</span>
              <Select
                defaultValue="relevance"
                bordered={false}
                style={{ minWidth: 150 }}
                onChange={(value) => setSortOption(value)}
                options={[
                  { value: "relevance", label: "Best Matches" },
                  { value: "lowToHigh", label: "Price: Low to High" },
                  { value: "highToLow", label: "Price: High to Low" },
                  { value: "newest", label: "Newest First" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full h-full max-md:mb-3 gap-4 sm:gap-5">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-[85%] sm:w-3/4 md:w-[50%] max-w-sm z-[1001] bg-white shadow-lg transform ${
              showMobileFilters ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out overflow-y-auto`}
          >
            {/* Cross Button */}
            <button
              aria-label="Close filters"
              className="absolute top-6 right-4 p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full z-[1002]"
              onClick={() => setShowMobileFilters(false)}
            >
              <FiX size={24} />
            </button>

            <LeftSideBar
              minimum={minVal}
              maximum={maxVal}
              setDynamicMin={setDynamicMinVal}
              setDynamicMax={setDynamicMaxVal}
              setSubCategory={(val) => {
                setSubCategory(val);
                setShowMobileFilters(false); // ✅ close on option click
              }}
              activeSubCategory={subCategory}
            />
          </div>

          {/* Overlay */}
          {showMobileFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 z-[1000] transition-opacity duration-300"
              onClick={() => setShowMobileFilters(false)}
              role="presentation"
            />
          )}

          <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {!loading &&
              productDataLoaded &&
              filteredProducts.length === 0 ? (
                <div className="col-span-full h-100vh flex items-center text-center justify-center ">
                  <Empty />
                </div>
              ) : (
                sortedProducts.map((item, index) => (
                  <ProductItem
                    key={index}
                    id={item.id}
                    name={item.product_name}
                    price={item.discount}
                    originalPrice={item.price}
                    imageUrl={item.image}
                    discount={`${Math.round(
                      ((Number(item.price) - Number(item.discount)) /
                        Number(item.price)) *
                        100
                    )}%`}
                    compactView={isMobile}
                    wishlist={item.wishlist}
                    description={""}
                    subcategory={undefined}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow hidden max-md:block bg-purple-300 sticky bottom-0 shadow-sm border border-gray-200 p-1 px-5 max-md:px-3  sm:p-3 lg:p-4 mb-4 max-md:mb-2">
        {/* Filter + Sort Row */}
        <div className="flex justify-center  items-center text-center text-white max-md:gap-0 px-3 max-md:px-0">
          {/* Left: Filter button */}
          <button
            aria-label="Open filters"
            className="flex items-center text-center justify-center gap-1 px-4 max-md:px-4 py-2   border-r-2  w-1/2 text-gray-700 hover:bg-gray-50 transition"
            onClick={() => setShowMobileFilters(true)}
          >
            <FiFilter size={18} className="text-white" />
            <span className="text-lg font-bold text-white">Filter</span>
          </button>

          {/* Right: Sort */}
          <div className=" w-1/2 ">
            <Select
              value="sort"
              bordered={false}
              style={{ minWidth: 120 }}
              className="custom-select"
              dropdownClassName="custom-select-dropdown"
              onChange={(value) => setSortOption(value)}
              options={[
                { value: "relevance", label: "Best Matches" },
                { value: "lowToHigh", label: "Price: Low to High" },
                { value: "highToLow", label: "Price: High to Low" },
                { value: "newest", label: "Newest First" },
              ]}
              labelRender={() => <span className="font-medium">Sort</span>}
              suffixIcon={
                <span style={{ fontSize: 14, color: "white" }}>▼</span>
              }
              dropdownStyle={{
                minWidth: 220,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
