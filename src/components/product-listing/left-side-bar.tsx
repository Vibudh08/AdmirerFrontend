import React, { useEffect, useState } from "react";
import {
  productPriceCategoryInfo_API,
  productCategoy_API,
} from "../api/api-end-points";

const LeftSideBar = () => {
  // Updated type to match new API response format
  const [priceRanges, setPriceRanges] = useState<number[][]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 0]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [maxSliderValue, setMaxSliderValue] = useState<number>(10000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

        // Set initial price range to [0, 0]
        setSelectedPriceRange([0, 0]);
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
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Parse price ranges to get the highest value
  const getHighestPriceRange = (ranges: number[][]): number => {
    if (!ranges || ranges.length === 0) return 10000;

    // Handle single-value range like [10000]
    const lastRange = ranges[ranges.length - 1];
    if (lastRange.length === 1) {
      // Add a buffer for the maximum
      return lastRange[0] * 1.5;
    }

    // Get the highest value from all ranges
    let highestValue = 0;
    ranges.forEach((range) => {
      const maxInRange = Math.max(...range);
      if (maxInRange > highestValue) {
        highestValue = maxInRange;
      }
    });

    return highestValue;
  };

  // Get price range array [min, max] based on slider value
  const getPriceRangeFromValue = (value: number): [number, number] => {
    // If no ranges yet or value is 0, return [0, 0]
    if (priceRanges.length === 0 || value === 0) {
      return [0, 0];
    }

    // Find the appropriate range based on slider value
    let selectedRange: [number, number] = [0, 0];

    for (const range of priceRanges) {
      if (range.length === 1) {
        // Handle single-value range like [10000]
        if (value >= range[0]) {
          selectedRange = [range[0], maxSliderValue];
        }
      } else if (range.length >= 2) {
        // Standard range [min, max]
        if (value >= range[0] && value <= range[1]) {
          selectedRange = [range[0], range[1]];
          break;
        }
      }
    }

    console.log("Selected price range:", selectedRange);
    return selectedRange;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);
    const newRange = getPriceRangeFromValue(value);
    setSelectedPriceRange(newRange);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Generate price slider tick marks
  const generateSliderMarks = () => {
    // Create a mark for each 1000 increment
    const step = 1000;
    const marks = [];
    const numMarks = Math.ceil(maxSliderValue / step);

    for (let i = 0; i <= numMarks; i++) {
      const value = i * step;
      if (value <= maxSliderValue) {
        marks.push(
          <div
            key={`mark-${i}`}
            className="absolute h-3 w-0.5 bg-purple-300 -mt-0.5"
            style={{ left: `${(value / maxSliderValue) * 100}%` }}
          >
            {i % 5 === 0 && (
              <div className="mt-4 text-xs text-purple-700 -ml-4">
                {value >= 1000 ? `${value / 1000}k` : value}
              </div>
            )}
          </div>
        );
      }
    }

    return marks;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `${price / 1000}k`;
    }
    return price;
  };

  return (
    <div className="w-[30%] m-6 p-6 rounded-2xl bg-white shadow-md border border-black">
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
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={maxSliderValue}
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer relative z-10"
                />
                <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 h-0.5">
                  {generateSliderMarks()}
                </div>
              </div>

              {/* Current slider value tooltip */}
              <div
                className="absolute -top-8 transform -translate-x-1/2 bg-purple-700 text-white px-2 py-1 rounded text-sm whitespace-nowrap"
                style={{ left: `${(sliderValue / maxSliderValue) * 100}%` }}
              >
                ₹{sliderValue}
              </div>
            </div>

            {/* Selected range display */}
            {selectedPriceRange[0] > 0 && (
              <div className="bg-purple-100 p-3 rounded-lg">
                <p className="text-purple-800 text-sm font-medium">
                  Selected range: ₹{selectedPriceRange[0]} -
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
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSection(category)}
                >
                  <input
                    type="checkbox"
                    id={`cat-${category}`}
                    name="categories"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor={`cat-${category}`}
                    className={`ml-2 font-semibold ${
                      selectedCategories.includes(category)
                        ? "text-purple-800"
                        : "text-purple-700"
                    }`}
                  >
                    {category}
                  </label>
                  {subcategories.length > 0 && (
                    <span className="ml-2 text-purple-800">
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
                          type="checkbox"
                          id={`${category}-${idx}`}
                          name="subcategories"
                          value={subcategory}
                          checked={selectedCategories.includes(subcategory)}
                          onChange={() => handleCategoryChange(subcategory)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                        />
                        <label
                          htmlFor={`${category}-${idx}`}
                          className={`ml-2 font-medium ${
                            selectedCategories.includes(subcategory)
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
