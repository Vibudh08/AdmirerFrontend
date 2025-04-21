import React, { useState, useEffect } from "react";
import ProductItem from "../components/product-listing/product-item";
import LeftSideBar from "../components/product-listing/left-side-bar";
import { FiFilter, FiX } from "react-icons/fi";
import {
  product_listing_API,
  productPriceCategoryInfo_API,
  getSubCatName_API,
} from "../components/api/api-end-points";

interface ProductLsitingProps {
  category?: Number;
  subcategory?: Number;
}

const ProductListing: React.FC<ProductLsitingProps> = ({
  category,
  subcategory,
}) => {
  const [cat, setCat] = useState<Number | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryReady, setCategoryReady] = useState(false);

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

  interface productItemApiProps {
    product_name: string;
    discount: string;
    price: string;
    cat_id: string;
    sub_cat_name: string;
    description: string;
    id: number;
  }

  const [productDataArray, setProductDataArray] = useState<
    productItemApiProps[]
  >([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [dynamicMinVal, setDynamicMinVal] = useState(0);
  const [dynamicMaxVal, setDynamicMaxVal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    if (subcategory) {
      fetch(getSubCatName_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subcatId: Number(subcategory),
        }),
      })
        .then((response) => response.json())
        .then((value) => {
          console.log("Subcat API response:", value);
          setSubCategory(value?.subcatName || "");
          setCat(value?.catId || null);
          setCategoryReady(true);
        });
    } else if (category) {
      setCat(category);
      setCategoryReady(true);
    }
  }, [subcategory, category]);

  useEffect(() => {
    fetch(productPriceCategoryInfo_API, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMinVal(Number(data.minPrice));
        setMaxVal(Number(data.maxPrice));
        setDynamicMinVal(Number(data.minPrice));
        setDynamicMaxVal(Number(data.maxPrice));
      });
  }, []);

  useEffect(() => {
    if (!categoryReady || !cat) return;

    setLoading(true);
    fetch(product_listing_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maxPrice: maxVal,
        minPrice: minVal,
        category: Number(cat),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProductDataArray(data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [minVal, maxVal, cat, categoryReady]);

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 relative">
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

      <div className="flex flex-col lg:flex-row w-full h-full gap-4 sm:gap-8">
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
          <div className="min-h-[200px] flex justify-center items-center">
            {loading ? (
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {productDataArray
                  .filter((item) => {
                    const discountedPrice = Number(item.discount);
                    return (
                      discountedPrice >= dynamicMinVal &&
                      discountedPrice <= dynamicMaxVal &&
                      (subCategory === item.sub_cat_name || subCategory === "")
                    );
                  })
                  .map((item, index) => (
                    <ProductItem
                      key={index}
                      id={item.id}
                      name={item.product_name}
                      price={item.discount}
                      description={item.description}
                      originalPrice={item.price}
                      discount={`${Math.round(
                        ((Number(item.price) - Number(item.discount)) /
                          Number(item.price)) *
                          100
                      )}%`}
                      compactView={isMobile}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
