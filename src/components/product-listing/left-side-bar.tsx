import React, { useEffect, useState } from "react";
import {
  productPriceCategoryInfo_API,
  productCategoy_API,
} from "../api/api-end-points";

const LeftSideBar = () => {
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
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
      .then((data) => {
        setPriceRanges(data);
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

  const handleRangeChange = (range: string) => {
    setSelectedRanges((prev) => {
      if (prev.includes(range)) {
        return prev.filter((r) => r !== range);
      } else {
        return [...prev, range];
      }
    });
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
          <div className="flex flex-col space-y-3 mt-3">
            {priceRanges.map((range, index) => (
              <div key={`price-${index}`} className="flex items-center">
                <input
                  type="checkbox"
                  id={`range-${index}`}
                  name="priceRange"
                  value={range}
                  checked={selectedRanges.includes(range)}
                  onChange={() => handleRangeChange(range)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor={`range-${index}`}
                  className={`ml-3 font-bold px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    selectedRanges.includes(range)
                      ? "bg-purple-600 text-white"
                      : "bg-purple-400 text-white hover:bg-purple-500"
                  }`}
                >
                  {range}
                </label>
              </div>
            ))}
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
