import React, { useState, useEffect } from "react";
import ProductItem from "../components/product-listing/product-item";
import LeftSideBar from "../components/product-listing/left-side-bar";
import { FiFilter, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  product_listing_API,
  productPriceCategoryInfo_API,
  getSubCatName_API,
} from "../components/api/api-end-points";
import LoaderCode from "../components/Loader";

const Loader = () => <LoaderCode />;

interface ProductLsitingProps {
  category?: Number;
  subcategory?: Number;
}

const ProductListing: React.FC<ProductLsitingProps> = ({
  category,
  subcategory,
}) => {
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

  useEffect(() => {
    const savedY = sessionStorage.getItem("listingScrollY");

    if (savedY && productDataLoaded) {
      // Delay scroll slightly to ensure render is complete
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedY));
        sessionStorage.removeItem("listingScrollY");
      }, 0);
    }
  }, [productDataLoaded]);

  // useEffect(() => {
  //   if (subCategory && sessionStorage.getItem("activeSubcategory")) {
  //     sessionStorage.removeItem("activeSubcategory");
  //   }
  // }, [subCategory]);

  useEffect(() => {
    if (!category && !subcategory) navigate("/");
  }, [category, subcategory, navigate]);

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

  useEffect(() => {
    const sessionSubcatId = sessionStorage.getItem("subcategoryId");
    const finalSubcatId = subcategory || sessionSubcatId;

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
          setCategoryReady(true);
        });
    } else if (category) {
      setLoading(true);
      setCat(category);
      fetch(product_listing_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maxPrice: maxVal,
          minPrice: minVal,
          category: Number(category),
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
  }, [subcategory, category, maxVal, minVal]);

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
        console.log(data)
        setProductDataArray(data);
        setProductDataLoaded(true); // data fetch complete
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setProductDataLoaded(true); // prevent stuck state
      })
      .finally(() => setLoading(false));
  }, [minVal, maxVal, cat, categoryReady]);

  if (loading) return <Loader />;
  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 relative">
      {loading && <Loader />}

      <button
        aria-label="Open filters"
        className={`lg:hidden fixed bottom-6 right-6 z-20 bg-purple-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
          showMobileFilters ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setShowMobileFilters(true)}
      >
        <FiFilter size={20} />
        <span className="sr-only">Open Filters</span>
      </button>

      <div className="flex flex-col lg:flex-row w-full h-full gap-4 sm:gap-6">
        <div
          className={`fixed lg:sticky top-0 lg:top-4 lg:h-[calc(100vh-2rem)] inset-y-0 left-0 z-[1000] w-[85%] sm:w-3/4 lg:w-[22%] xl:w-[20%] lg:min-w-[280px] bg-white rounded-r-xl lg:rounded-xl shadow-xl border border-gray-200 transform ${
            showMobileFilters ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto max-h-screen`}
        >
          <button
            aria-label="Close filters"
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
            onClick={() => setShowMobileFilters(false)}
          >
            <FiX size={24} />
          </button>

          <LeftSideBar
            minimum={minVal}
            maximum={maxVal}
            setDynamicMin={setDynamicMinVal}
            setDynamicMax={setDynamicMaxVal}
            category={Number(cat)}
            setSubCategory={setSubCategory}
            activeSubCategory={subCategory}
          />
        </div>

        {showMobileFilters && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[999] lg:hidden transition-opacity duration-300"
            onClick={() => setShowMobileFilters(false)}
            role="presentation"
          />
        )}

        <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {!loading && productDataLoaded && filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 font-medium text-lg py-10">
                No products found.
              </div>
            ) : (
              filteredProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item.id}
                  name={item.product_name}
                  price={item.discount}
                  description={item.description}
                  originalPrice={item.price}
                  imageUrl={item.image}
                  discount={`${Math.round(
                    ((Number(item.price) - Number(item.discount)) /
                      Number(item.price)) *
                      100
                  )}%`}
                  compactView={isMobile}
                  subcategory={subcategory}
                  wishlist={item.wishlist}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
