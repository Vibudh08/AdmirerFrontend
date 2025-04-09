import React, { useEffect, useState } from "react";
import {
  productPriceCategoryInfo_API,
  productCategoy_API,
} from "../api/api-end-points";
import { response } from "express";

const LeftSideBar = () => {
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<string>("");

  useEffect(() => {
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
    fetch(productCategoy_API, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {});
  }, []);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return (
    <div className="w-[30%] p-4 rounded-lg bg-purple-100 shadow-sm border border-black">
      <h3 className="text-lg font-bold text-white-800 mb-4">Price Range</h3>
      <div className="flex flex-col space-y-3">
        {priceRanges.map((range, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`range-${index}`}
              name="priceRange"
              value={range}
              checked={selectedRange === range}
              onChange={() => handleRangeChange(range)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor={`range-${index}`}
              className="ml-3 font-bold text-white bg-purple-400 px-3 py-1 rounded-full text-sm"
            >
              {range}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
