import React, { useEffect, useState } from "react";
import {
  productPriceCategoryInfo_API,
  productCategoy_API,
} from "../api/api-end-points";

const LeftSideBar = () => {
  // category data definition
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    price: true,
    categories: true,
  });

  // price data declaration
  const [sliderMinValue, setSliderMinValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(1000);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1000);
  const [minInput, setMinInput] = useState(0);
  const [maxInput, setMaxInput] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);
  const minGap = 50; // Minimum gap between sliders

  useEffect(() => {
    // Fetch price ranges
    fetch(productPriceCategoryInfo_API, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setSliderMinValue(data.minPrice);
        setSliderMaxValue(data.maxPrice);
        setMinVal(data.minPrice);
        setMaxVal(data.maxPrice);
        setMinInput(data.minPrice);
        setMaxInput(data.maxPrice);
      })
      .catch((error) => {
        console.error("Error fetching price ranges:", error);
      });

    // Fetch categories
    fetch(productCategoy_API, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);

        // Set initial category selection
        const firstCategory = Object.keys(data)[0];
        if (firstCategory) {
          if (data[firstCategory].length > 0) {
            // If subcategories exist, select first subcategory
            setSelectedCategory(data[firstCategory][0]);
            console.log("Default selected category:", {
              category: firstCategory,
              subcategory: data[firstCategory][0],
            });
          } else {
            // If no subcategories, select the category itself
            setSelectedCategory(firstCategory);

            console.log("Default selected category:", {
              category: firstCategory,
              subcategory: null,
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  // functions related for price range
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
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // Find if this is a main category or subcategory
    let isMainCategory = false;
    let parentCategory = "";

    for (const [cat, subcats] of Object.entries(categories)) {
      if (cat === category) {
        isMainCategory = true;
        break;
      }
      if (subcats.includes(category)) {
        parentCategory = cat;
        break;
      }
    }

    if (isMainCategory) {
      console.log("Selected category:", {
        category: category,
        subcategory: null,
      });
    } else {
      console.log("Selected category:", {
        category: parentCategory,
        subcategory: category,
      });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className=" m-6 p-6  bg-white shadow-md ">
      {/* Price Range Section */}
      <div className="bg-white rounded-lg p-5 w-full max-w-md mx-auto shadow-sm">
        {/* Input boxes */}
        <div className="flex justify-between mb-8">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={minInput}
                onChange={handleMinInput}
                onKeyDown={(e) => handleInputKeyDown(e, "min")}
                className="w-full pl-7 py-2 border border-gray-300 rounded-md text-center"
                min={sliderMinValue}
                max={maxVal - minGap}
              />
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={maxInput}
                onChange={handleMaxInput}
                onKeyDown={(e) => handleInputKeyDown(e, "max")}
                className="w-full pl-7 py-2 border border-gray-300 rounded-md text-center"
                min={minVal + minGap}
                max={sliderMaxValue}
              />
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative h-1 bg-gray-300 rounded-full my-8">
          <div
            className="absolute h-full bg-indigo-600 rounded-full"
            style={trackStyle}
          ></div>

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
            className="absolute w-full h-1 -top-1 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          />

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
            className="absolute w-full h-1 -top-1 appearance-none pointer-events-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          />

          {/* Tooltips */}
          {isDragging && (
            <>
              <div
                className="absolute -top-8 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm whitespace-nowrap"
                style={{ left: trackStyle.left, transform: "translateX(-50%)" }}
              >
                ${minVal}
              </div>
              <div
                className="absolute -top-8 text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm whitespace-nowrap"
                style={{
                  right: trackStyle.right,
                  transform: "translateX(50%)",
                }}
              >
                ${maxVal}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Categories Section */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="text-lg font-bold text-purple-800">Categories</h3>
          <span className="text-purple-800">
            {expandedSections.categories ? "−" : "+"}
          </span>
        </div>
        {expandedSections.categories && (
          <div className="mt-3">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div key={category} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`cat-${category}`}
                    name="allCategories"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor={`cat-${category}`}
                    className={`ml-2 font-semibold ${
                      selectedCategory === category
                        ? "text-purple-800"
                        : "text-purple-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(category);
                    }}
                  >
                    {category}
                  </label>
                  {subcategories.length > 0 && (
                    <span
                      className="ml-2 text-purple-800 cursor-pointer"
                      onClick={() => toggleSection(category)}
                    >
                      {expandedSections[category] ? "−" : "+"}
                    </span>
                  )}
                </div>
                {expandedSections[category] && subcategories.length > 0 && (
                  <div className="ml-6 space-y-2 mt-2">
                    {subcategories.map((subcategory, idx) => (
                      <div
                        key={`${category}-${idx}`}
                        className="flex items-center"
                      >
                        <input
                          type="radio"
                          id={`${category}-${idx}`}
                          name="allCategories"
                          value={subcategory}
                          checked={selectedCategory === subcategory}
                          onChange={() => handleCategoryChange(subcategory)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                        />
                        <label
                          htmlFor={`${category}-${idx}`}
                          className={`ml-2 font-medium ${
                            selectedCategory === subcategory
                              ? "text-purple-800 font-semibold"
                              : "text-purple-600"
                          }`}
                        >
                          {subcategory}
                        </label>
                      </div>
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
