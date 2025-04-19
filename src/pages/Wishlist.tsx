import React, { useEffect, useState } from "react";
import WishlistCard from "../components/WishlistCard";
import { get_wishlist_data } from "../components/api/api-end-points";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(get_wishlist_data, {
        headers: {
          Authorization: "Bearer 18|K8jXBSF34paKtxbmNrNT2PlEecIO4Rt6762VN9Uy657a7794", // Replace with dynamic token
        },
      });

      const result = await response.json();
      console.log("Wishlist API response:", result);

      if (response.ok) {
        setWishlistItems(result.data);
      } else if (response.status === 401) {
        alert("Unauthorized user. Please log in.");
      } else {
        console.error("Error fetching wishlist:", result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToCart = async (product_id: number) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/wishlist/movecart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 18|K8jXBSF34paKtxbmNrNT2PlEecIO4Rt6762VN9Uy657a7794",
        },
        body: JSON.stringify({ product_id }),
      });
  
      const data = await res.json();
      console.log("Moved to cart:", data);
  
      if (res.ok) {
        // Optionally show a toast or message here
        setWishlistItems((prev) =>
          prev.filter((item) => item.product_id !== product_id)
        );
      } else {
        alert("Failed to move to cart");
      }
    } catch (error) {
      console.error("Error moving to cart:", error);
    }
  };
  

  const handleRemove = async (wishlist_id: number) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/wishlist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 8|Ub7JerRH88jSZ7ggbnRBxu1CrrfqJMJGNmVfMbtb9c2811f8",
        },
        body: JSON.stringify({ wishlist_id }),
      });
  
      const data = await res.json();
      console.log("Removed:", data);
  
      // After removing, re-fetch or update list
      setWishlistItems((prev) =>
        prev.filter((item) => item.wishlist_id !== wishlist_id)
      );
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };
  

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="bg-white py-5">
      <div className="p-5 max-md:p-2 w-[90%] max-md:w-full m-auto">
        <h1 className="mb-6 max-md:mb-4 font-semibold text-lg tracking-wide">
          My Wishlist <span className="font-normal">({wishlistItems.length} items)</span>
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : wishlistItems.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-10 max-md:gap-2">
            {wishlistItems && wishlistItems.map((item) => (
              <WishlistCard
                key={item.id}
                wishlist_id={item.wishlist_id}
                name={item.product_name}
                price={item.discount}
                description={item.description}
                originalPrice={item.price}
                discount={item.discount_percent}
                imageUrl={item.image_url}
                id={item.id}
                onRemove={handleRemove}
                onMoveToCart={handleMoveToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
