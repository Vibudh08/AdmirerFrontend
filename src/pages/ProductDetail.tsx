// ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // or any other HTTP library
import { useNavigate } from "react-router-dom";
import { FaUndo, FaShieldAlt, FaCertificate, FaGem } from "react-icons/fa";
import ProductActions from "../components/product-detail/ShareWishlist";
import PincodeChecker from "../components/product-detail/pincodeChecker";
import OfferBanner from "../components/product-detail/OfferBanner";
import ProductAccordion from "../components/product-detail/ProductDescription";
import { FaHeart } from "react-icons/fa";
import { wishlist_add_remove } from "../components/api/api-end-points";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Arrows
const CustomPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute left-[-25px] top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white max-md:left-0.5"
    onClick={onClick}
  >
    <IoIosArrowBack className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

const CustomNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute right-[-25px] top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-black transition hover:text-white max-md:right-0.5"
    onClick={onClick}
  >
    <IoIosArrowForward className="text-3xl max-md:text-xl text-gray-700 hover:text-white" />
  </button>
);

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [product, setProduct] = useState<any>(null); // State for product details
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [lensStyle, setLensStyle] = useState({});
  const [zoomStyle, setZoomStyle] = useState({});
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const lensRef = React.useRef<HTMLDivElement>(null);

  const relatedProductsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={() => {}} />,
    nextArrow: <CustomNextArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 768, // for screens <768px (typical mobile)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleBuyNow = () => {
    const token = "Bearer 7|P6gdNwdWbYxXLygVRTwSHAN1qnhK7kH5kdC9A6Zad16cbca7"; // Adjust key if different
    if (token) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const toggleWishlist = async (prodId?: string) => {
    const productIdToToggle = prodId || id;

    try {
      const response = await fetch(wishlist_add_remove, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({
          product_id: productIdToToggle,
          wishlist: isWishlisted ? 0 : 1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsWishlisted(!isWishlisted);
        console.log(result.message || "Wishlist updated");
      } else if (response.status === 401) {
        alert("Unauthorized user. Please log in.");
      } else {
        alert("Something went wrong.");
        console.error(result);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = "Bearer 7|P6gdNwdWbYxXLygVRTwSHAN1qnhK7kH5kdC9A6Zad16cbca7";

      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-to-cart",
        {
          product_id: product.id,
          cart: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
      console.log(response);
      if (response.data && response.data.status === "success") {
        alert("✅ Product added to cart successfully!");
        setIsInCart(true);
      } else {
        alert("⚠️ Could not add product to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("❌ Something went wrong while adding to cart.");
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/product-details/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        })
        .then((response) => {
          const data = response.data.data;
          const relatedData = response.data.related_products;

          // console.log("Fetched product data:", response.data.data);
          console.log(
            "Fetched related product data:",
            response.data.related_products
          );

          const imageArray = data.images.map((img: any) => img.image);
          setProduct(data);
          setRelatedProducts(relatedData); // Store the related products
          setThumbnails(imageArray);
          setMainImage(imageArray[0]);

          // Set inCart status from API
          if (data.in_cart === 1) {
            setIsInCart(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  // Re-fetch if the ID changes (in case of page navigation)

  const handleImageClick = (clickedImg: string) => {
    setMainImage(clickedImg); // Set clicked image as the main image
  };

  const handleZoom = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const lensSize = 50;
    const halfLens = lensSize / 2;

    const clampedX = Math.max(
      halfLens,
      Math.min(offsetX, container.offsetWidth - halfLens)
    );
    const clampedY = Math.max(
      halfLens,
      Math.min(offsetY, container.offsetHeight - halfLens)
    );

    const bgX = (clampedX / container.offsetWidth) * 100;
    const bgY = (clampedY / container.offsetHeight) * 100;

    setLensStyle({
      display: "block",
      position: "absolute",
      top: clampedY - halfLens,
      left: clampedX - halfLens,
      width: `${lensSize}px`,
      height: `${lensSize}px`,
      border: "2px solid #a855f7",
      backgroundColor: "rgba(168, 85, 247, 0.15)",
      pointerEvents: "none",
      zIndex: 20,
      borderRadius: "4px",
      cursor: "none",
    });

    setZoomStyle({
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "200% 200%",
      backgroundPosition: `${bgX}% ${bgY}%`,
      borderRadius: "inherit",
      zIndex: 10,
      pointerEvents: "none",
    });
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading if product data is not fetched yet
  }

  return (
    <div className="bg-white py-3">
      <div className="w-[75%] max-md:w-full mx-auto bg-white p-6 max-md:p-3 rounded-2xl ">
        <div className="flex flex-col max-md:block lg:flex-row gap-8">
          {/* Left Section */}
          <div className="lg:w-1/2 max-md:mb-5">
            {/* Main Image Display */}
            <div
              className="relative w-full overflow-hidden rounded border group"
              onMouseMove={handleZoom}
              onMouseLeave={() => {
                setZoomStyle({ display: "none" });
                setLensStyle({ display: "none" });
              }}
              ref={containerRef}
            >
              <img
                src={hoverImage || mainImage}
                alt="Main Product"
                className="w-full object-cover"
                ref={imageRef}
                style={{ cursor: "none" }}
              />
              <div
                style={{
                  ...zoomStyle,
                  backgroundImage: `url(${hoverImage || mainImage})`,
                }}
                className="absolute pointer-events-none"
              />
              <div style={lensStyle} ref={lensRef} />
            </div>

            {/* Thumbnails Section */}
            <div className="flex mt-4 flex-wrap">
              {thumbnails && thumbnails.length > 0 ? (
                thumbnails.map((src, idx) => (
                  <img
                    key={idx}
                    src={product.images.image}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => handleImageClick(src)} // Click to update main image
                    onMouseEnter={() => setHoverImage(src)} // Hover to show image in main container
                    onMouseLeave={() => setHoverImage(null)} // Remove hover effect when mouse leaves
                    className="w-20 h-20 rounded border p-1 border-gray-300 object-cover cursor-pointer hover:scale-105 transition-transform"
                  />
                ))
              ) : (
                <div>No thumbnails available</div> // Optional fallback message
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2">
            <div className="flex justify-between gap-2">
              <div className="gap-1">
                <div className="text-xl text-gray-700 mb-2 font-medium">
                  {product.product_name}
                </div>
              </div>
              <ProductActions
                productId={product.id}
                wishlist={product.wishlist}
              />
            </div>
            <div className="text-3xl items-center gap-2 text-gray-800 mb-1">
              ₹{product.discount}{" "}
              <span className="text-gray-400 line-through text-lg mr-1">
                ₹{product.price}
              </span>
              <span className="bg-red-50 text-red-700 font-bold px-2  py-1  rounded text-xs">
                {product.discount_percent}% OFF
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-1">Incl. of all taxes</div>

            {/* <div className="w-full bg-gradient-to-r tracking-wide from-purple-200 to-white text-md mt-3 text-purple-800 p-3 rounded-md">
              Get it for{" "}
              <span className="font-semibold tracking-wide">
                ₹{product.discounted_price}
              </span>{" "}
              with coupon{" "}
              <span className="font-semibold text-pink-600 tracking-wider">
                ADMIRER100
              </span>
            </div> */}

            <div className="mt-4 mb-1 space-x-1 text-[16px] text-gray-600">
              Hurry Up! Only{" "}
              <span className="text-purple-600 font-semibold">
                {product.in_stock} Item(s)
              </span>{" "}
              left in stock
            </div>

            {/* <div>
              <PincodeChecker />
            </div> */}

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-5">
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <FaUndo className="text-purple-700" /> Return & Exchange
              </div>
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <FaShieldAlt className="text-purple-700" /> 100% Original
              </div>
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <FaCertificate className="text-purple-700" /> Warranty
              </div>
              <div className="flex items-center gap-3 text-[15px] font-medium">
                <FaGem className="text-purple-700" /> Quality
              </div>
            </div>
            <div className="mt-5 flex gap-3 w-full ">
              <button
                onClick={handleBuyNow}
                className="bg-purple-600 text-white py-2 px-6 rounded-md h-[50px] w-1/2 hover:bg-purple-700 transition font-semibold"
              >
                Buy Now
              </button>
              <button
                onClick={isInCart ? () => navigate("/cart") : handleAddToCart}
                className={`${
                  isInCart
                    ? "border border-purple-700 bg-purple-600 text-white hover:bg-purple-700"
                    : "border border-purple-700 bg-purple-600 text-white hover:bg-purple-700"
                } py-2 px-6 rounded-md h-[50px] w-1/2 transition font-semibold`}
              >
                {isInCart ? "View Cart" : "Add To Cart"}
              </button>
            </div>
            <OfferBanner percentageDiscount={60} />
          </div>
        </div>

        <ProductAccordion description={product.description} />
      </div>
      <div className="mt-10">
        <h2 className="text-3xl max-md:text-2xl font-semibold mb-6   text-center">
          Related Products
        </h2>

        <div className="grid grid-cols-1 w-[85%] max-md:w-[98%] m-auto !gap-4 ">
          <Slider {...relatedProductsSlider}>
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="px-2 max-md:px-1" // Add horizontal spacing here
              >
                <div className="w-full font-sans bg-white rounded-xl p-3 max-md:p-1.5 flex flex-col gap-2 max-md:gap-1 border border-gray-200">
                  <div className="relative group">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => toggleWishlist(item.id)}
                    >
                      <div
                        className={`p-2 rounded-full border shadow-md ${
                          isWishlisted
                            ? "bg-red-100 border-red-400 text-red-600"
                            : "bg-white border-red-300 text-red-400 hover:text-red-500"
                        }`}
                      >
                        <FaHeart size={20} />
                      </div>
                    </button>
                  </div>

                  <div className="font-medium text-lg max-md:text-[16px] truncate">
                    {item.title}
                  </div>

                  <div className="flex items-center gap-2 max-md:gap-1.5 text-lg">
                    <span className="font-semibold text-black max-md:text-[16px]">
                      ₹{item.discount}
                    </span>
                    <span className="line-through text-md text-gray-400 max-md:text-[15px]">
                      ₹{item.price}
                    </span>
                    <span className="bg-red-50 text-red-700 font-bold px-1 py-0.5 rounded text-xs max-md:text-[12px]">
                      {item.discount_percent}% OFF
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
