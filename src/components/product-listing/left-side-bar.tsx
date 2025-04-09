import React, { useEffect, useState } from "react";
import {
  productPriceCategoryInfo_API,
  productCategoy_API,
} from "../api/api-end-points";

const LeftSideBar = () => {
  const [priceRanges, setPriceRanges] = useState<number[][]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 0]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [maxSliderValue, setMaxSliderValue] = useState<number>(10000);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    price: true,
    categories: true,
  });

  useEffect(() => {
    // Fetch price ranges
    fetch(productPriceCategoryInfo_API, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: number[][]) => {
        setPriceRanges(data);

        // Set initial max slider value based on highest price range
        const highestRange = getHighestPriceRange(data);
        setMaxSliderValue(highestRange);

        // Set initial price range to first range from API
        if (data.length > 0) {
          const firstRange = data[0];
          const rangeToSet =
            firstRange.length === 1
              ? [firstRange[0], firstRange[0]]
              : [firstRange[0], firstRange[1]];

          setSelectedPriceRange(rangeToSet as [number, number]);
          setSliderValue(firstRange[0]);
          console.log("Default selected price range:", rangeToSet);
        }
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

  // Parse price ranges to get the highest value
  const getHighestPriceRange = (ranges: number[][]): number => {
    if (!ranges || ranges.length === 0) return 10000;
    const lastRange = ranges[ranges.length - 1];
    return lastRange.length === 1 ? lastRange[0] * 1 : Math.max(...lastRange);
  };

  const getPriceRangeFromValue = (value: number): [number, number] => {
    if (priceRanges.length === 0 || value === 0) return [0, 0];

    for (const range of priceRanges) {
      if (range.length === 1 && value >= range[0]) {
        return [range[0], maxSliderValue];
      } else if (range.length >= 2 && value >= range[0] && value <= range[1]) {
        return [range[0], range[1]];
      }
    }
    return [0, 0];
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);
    const newRange = getPriceRangeFromValue(value);
    setSelectedPriceRange(newRange);
    console.log("Selected price range:", newRange);
  };

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
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-lg font-bold text-purple-800">Price Range</h3>
          <span className="text-purple-800">
            {expandedSections.price ? "−" : "+"}
          </span>
        </div>
        {expandedSections.price && (
          <div className="flex flex-col space-y-6 mt-4">
            <div className="px-2 relative">
              <input
                type="range"
                min="0"
                max={maxSliderValue}
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div
                className="absolute -top-8 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm whitespace-nowrap"
                style={{ left: `${(sliderValue / maxSliderValue) * 100}%` }}
              >
                ₹{sliderValue}
              </div>
            </div>
            {selectedPriceRange[0] > 0 && (
              <div className="bg-purple-100 p-3 rounded-lg">
                <p className="text-purple-800 text-sm font-medium">
                  Range: ₹{selectedPriceRange[0]} -
                  {selectedPriceRange[1] === maxSliderValue
                    ? " and above"
                    : ` ₹${selectedPriceRange[1]}`}
                </p>
              </div>
            )}
          </div>
        )}
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
