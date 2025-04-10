import React from "react";
import ProductItem from "../components/product-listing/product-item";
import LeftSideBar from "../components/product-listing/left-side-bar";

const ProductListing = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row w-full h-full gap-4 sm:gap-8">
        {/* Left Sidebar - Collapsible on mobile */}
        <div className="w-full lg:w-[20%] lg:min-w-[250px] bg-white rounded-xl shadow-md border border-gray-200">
          <LeftSideBar />
        </div>

        {/* Right Content Area */}
        <div className="flex-grow bg-white rounded-xl shadow-md border border-gray-200 p-2 sm:p-4">
          {/* Product Grid - Responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
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
            {/* Add more products as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
