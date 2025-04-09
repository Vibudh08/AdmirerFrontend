import React from "react";
import ProductItem from "../components/product-listing/product-item";
import LeftSideBar from "../components/product-listing/left-side-bar";

const ProductListing = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex w-full h-full gap-8">
        {/* Left Sidebar - Fixed width with margins */}
        <div className="w-[20%] min-w-[300px] p-1 bg-white rounded-xl shadow-md border border-gray-200">
          <LeftSideBar />
        </div>

        {/* Right Content Area - Flex-grow to take remaining space */}
        <div className="flex-grow p-2 bg-white rounded-xl shadow-md border border-gray-200">
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Product Items - Repeat as needed */}
            <ProductItem
              name="Jwellery"
              price="120000"
              description="Very costly but value of money"
              originalPrice="240000"
              discount="50"
            />
            <ProductItem
              name="Diamond Ring"
              price="85000"
              description="Elegant diamond ring for special occasions"
              originalPrice="120000"
              discount="30"
            />
            <ProductItem
              name="Gold Chain"
              price="45000"
              description="24k pure gold chain with premium finish"
              originalPrice="60000"
              discount="25"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
