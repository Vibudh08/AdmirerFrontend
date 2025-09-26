import React, { useEffect, useRef, useState } from "react";
import { productCategoy_API, catSubcat_API } from "../api/api-end-points";
import { Loader } from "lucide-react";
import { FiX } from "react-icons/fi";
interface LeftSideBarProps {
  minimum: number;
  maximum: number;
  setDynamicMin: (val: number) => void;
  setDynamicMax: (val: number) => void;
  category?: number; // ✅ optional karo
  setSubCategory: (val: string) => void;
  activeSubCategory?: string;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({
  minimum,
  maximum,
  setDynamicMin,
  setDynamicMax,
  category,
  setSubCategory,
  activeSubCategory,
}) => {
  // category data definition
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeSubCategory || ""
  );
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    price: true,
    categories: true,
  });
  const [loading, setLoading] = useState(false);
  const hasRestored = useRef(false);

  useEffect(() => {
    if (!hasRestored.current && activeSubCategory) {
      setSelectedCategory(activeSubCategory);
      hasRestored.current = true;
    }
  }, [activeSubCategory]);

  useEffect(() => {
    console.log("I am inside leftside bar and category is = ", category);
  }, [category]);
  // price data declaration
  const [sliderMinValue, setSliderMinValue] = useState(minimum);
  const [sliderMaxValue, setSliderMaxValue] = useState(maximum);
  const [minVal, setMinVal] = useState(minimum);
  const [maxVal, setMaxVal] = useState(maximum);
  const [minInput, setMinInput] = useState(minimum);
  const [maxInput, setMaxInput] = useState(maximum);
  const [isDragging, setIsDragging] = useState(false);
  const minGap = 50; // Minimum gap between sliders

  // useEffect(() => {
  //   fetch(catSubcat_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       category: { category },
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("The category of the left-side-bar is = ", data);
  //     });
  // }, []);
  useEffect(() => {
    const rawCat = sessionStorage.getItem("categoryId");
    const rawSubcat = sessionStorage.getItem("subcategoryId");

    // Agar tumko catId bhi URL se mil rha hai to woh bhi parse kar sakte ho:
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get("cat");
    const urlSubcat = urlParams.get("subcat");

    const finalCat = urlCat || rawCat || null;
    const finalSubcat = urlSubcat || rawSubcat || null;

    console.log("👉 FINAL CAT:", finalCat);
    console.log("👉 FINAL SUBCAT:", finalSubcat);

    if (!finalCat) {
      console.log("❌ No valid category id, skipping fetch");
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" }); // extra add to move top instead of that same product
    setLoading(true);

    fetch(catSubcat_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: finalCat }),
    })
      .then((response) => response.json())
      .then((data: Record<string, string[]>) => {
        console.log("✅ API DATA:", data);

        setCategories(data);

        const initialExpanded: Record<string, boolean> = {
          price: true,
          categories: true,
        };
        Object.keys(data).forEach((cat) => {
          initialExpanded[cat] = true; // har category expand
        });
        setExpandedSections(initialExpanded);

        const allSubs = Object.values(data).flat();

        if (finalSubcat && allSubs.includes(finalSubcat)) {
          sessionStorage.setItem("activeSubcategory", finalSubcat);
          setSelectedCategory(finalSubcat);
          setSubCategory(finalSubcat);
        } else {
          const savedSub = sessionStorage.getItem("activeSubcategory");
          if (savedSub && allSubs.includes(savedSub)) {
            setSelectedCategory(savedSub);
            setSubCategory(savedSub);
          } else {
            const firstCategory = Object.keys(data)[0];
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // functions related for price range
  useEffect(() => {
    // Log current min and max values
    console.log("Current price range:", { min: minVal, max: maxVal });
    // Execute your custom function here
    setDynamicMax(maxVal);
    setDynamicMin(minVal);
  }, [minVal, maxVal]);
  useEffect(() => {
    setSliderMinValue(minimum);
    setSliderMaxValue(maximum);
    setMinVal(minimum);
    setMaxVal(maximum);
    setMinInput(minimum);
    setMaxInput(maximum);
  }, [minimum, maximum]);
  const slideMin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
    }
  };

  const slideMax = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
    }
  };

  const setSliderTrack = (): { left: string; right: string } => {
    const minPercent: number =
      ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
    const maxPercent: number =
      ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

    return {
      left: `${minPercent}%`,
      right: `${100 - maxPercent}%`,
    };
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= sliderMinValue && value <= maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (!isNaN(value) && value <= sliderMaxValue && value >= minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "min" | "max"
  ): void => {
    if (e.key === "Enter") {
      const value: number = parseInt((e.target as HTMLInputElement).value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value <= maxVal - minGap
      ) {
        setMinVal(value);
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value >= minVal + minGap
      ) {
        setMaxVal(value);
      }
    }
  };

  const startDrag = (): void => setIsDragging(true);
  const stopDrag = (): void => setIsDragging(false);

  const trackStyle = setSliderTrack();

  // functions related to category
  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);

  //   // Find if this is a main category or subcategory
  //   let isMainCategory = false;
  //   let parentCategory = "";

  //   for (const [cat, subcats] of Object.entries(categories)) {
  //     if (cat === category) {
  //       isMainCategory = true;
  //       break;
  //     }
  //     if (subcats.includes(category)) {
  //       parentCategory = cat;
  //       break;
  //     }
  //   }

  //   if (isMainCategory) {
  //     console.log("Selected category:", {
  //       category: category,
  //       subcategory: null,
  //     });
  //     setSubCategory("");
  //   } else {
  //     console.log("Selected category:", {
  //       category: parentCategory,
  //       subcategory: category,
  //     });
  //     setSubCategory(category);
  //   }
  // };

  const handleCategoryChange = (clicked: string) => {
    // Check if it's a **main category**
    const isMainCategory = Object.keys(categories).includes(clicked);

    if (isMainCategory) {
      // Agar main category pe click hua → subcategory ko empty karo
      setSelectedCategory(clicked);
      setSubCategory(""); //  empty subcat means show all
      sessionStorage.setItem("activeSubcategory", "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Subcategory pe click
      setSelectedCategory(clicked);
      setSubCategory(clicked);
      sessionStorage.setItem("activeSubcategory", clicked);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setExpandedSections((prev) => ({
      ...prev,
      [clicked]: true, // force expand main category
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-white h-full shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
        {/* <button
          onClick={() => {
            if (typeof (window as any).closeSidebar === "function") {
              (window as any).closeSidebar();
            }
          }}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          <FiX size={22} />
        </button> */}
      </div>

      {/* Price Section */}
      <div>
        <h3
          className="flex justify-between items-center text-xl font-semibold text-gray-900 cursor-pointer mb-5"
          onClick={() => toggleSection("price")}
        >
          Price
          <span className="text-gray-600 text-xl">
            {expandedSections.price ? "−" : "+"}
          </span>
        </h3>

        {expandedSections.price && (
          <div className="space-y-5 animate-fadeIn">
            {/* Slider */}
            <div className="relative h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-purple-500 rounded-full transition-all"
                style={trackStyle}
              ></div>

              {/* Min slider */}
              <input
                type="range"
                min={sliderMinValue}
                max={sliderMaxValue}
                value={minVal}
                onChange={slideMin}
                onMouseDown={startDrag}
                onMouseUp={stopDrag}
                onTouchStart={startDrag}
                onTouchEnd={stopDrag}
                className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
              />

              {/* Max slider */}
              <input
                type="range"
                min={sliderMinValue}
                max={sliderMaxValue}
                value={maxVal}
                onChange={slideMax}
                onMouseDown={startDrag}
                onMouseUp={stopDrag}
                onTouchStart={startDrag}
                onTouchEnd={stopDrag}
                className="absolute w-full h-2 top-1/2 -translate-y-1/2 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            {/* Inputs */}
            <div className="flex items-center gap-3">
              <div className="flex-1 mt-2">
                <div className="relative w-full">
                  {/* ₹ Label inside input */}
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-700 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    readOnly
                    value={minInput}
                    onChange={handleMinInput}
                    onKeyDown={(e) => handleInputKeyDown(e, "min")}
                    className="w-full border border-gray-300 pl-7 pr-2 py-3 text-base text-right  bg-[#eeeeee] "
                  />
                </div>
              </div>
              <span className="text-gray-700 mt-3 font-semibold">To</span>
              <div className="flex-1 mt-2">
                <div className="relative w-full">
                  {/* ₹ Label inside input */}
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-700 font-semibold">
                    ₹
                  </span>

                  <input
                    type="number"
                    readOnly
                    value={maxInput}
                    onChange={handleMaxInput}
                    onKeyDown={(e) => handleInputKeyDown(e, "max")}
                    className="w-full border border-gray-300  pl-7 pr-2 py-3 text-base text-right bg-[#eeeeee] "
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div>
        {/* Category Header */}
        <h3
          className="flex justify-between items-center text-xl font-semibold text-gray-900 cursor-pointer mb-3"
          onClick={() => toggleSection("categories")}
        >
          Category
          <span className="text-gray-600 text-xl">
            {expandedSections.categories ? "−" : "+"}
          </span>
        </h3>

        {expandedSections.categories && (
          <div className="space-y-5 ml-1 animate-fadeIn">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div key={category} className="space-y-3">
                {/* Main Category */}
                <label className="flex items-center gap-2 text-lg ml-1 font-medium text-gray-800 cursor-pointer">
                  <input
                    type="radio"
                    id={`cat-${category}`}
                    name="allCategories"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 accent-purple-600 hidden"
                  />
                  {category}
                </label>

                {/* Subcategories */}
                {expandedSections[category] && subcategories.length > 0 && (
                  <div className="ml-3 space-y-2">
                    {subcategories.map((subcategory, idx) => (
                      <label
                        key={`${category}-${idx}`}
                        className="flex items-center gap-2 text-base text-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`${category}-${idx}`}
                          name="subcategory"
                          value={subcategory}
                          checked={selectedCategory === subcategory}
                          onChange={() => handleCategoryChange(subcategory)}
                          className="w-4 h-4 accent-purple-600 rounded-sm"
                        />
                        {subcategory}{" "}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
