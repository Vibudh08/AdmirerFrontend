import React from "react";
import WishlistCard from "../components/WishlistCard";

const Wishlist = () => {
  return (
    <div className="bg-white py-5">
      <div className="p-5 max-md:p-2 w-[90%] max-md:w-full m-auto">
        <h1 className="mb-6 max-md:mb-4 font-semibold text-lg tracking-wide">My Wishlist <span className="font-normal">(12 items)</span></h1>
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-10 max-md:gap-2">
          <WishlistCard
            name={"Ring"}
            price={"999"}
            description={"Beautiful Ring"}
            originalPrice={"1,599"}
            discount={"30"}
          />
          <WishlistCard
            name={"Ring"}
            price={"999"}
            description={"Beautiful Ring"}
            originalPrice={"1,599"}
            discount={"30"}
          />
          <WishlistCard
            name={"Ring"}
            price={"999"}
            description={"Beautiful Ring"}
            originalPrice={"1,599"}
            discount={"30"}
          />
          <WishlistCard
            name={"Ring"}
            price={"999"}
            description={"Beautiful Ring"}
            originalPrice={"1,599"}
            discount={"30"}
          />
          <WishlistCard
            name={"Ring"}
            price={"999"}
            description={"Beautiful Ring"}
            originalPrice={"1,599"}
            discount={"30"}
          />
          <WishlistCard
            name={"Ring"}
            price={"999"}
            description={"Beautiful Ring"}
            originalPrice={"1,599"}
            discount={"30"}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
