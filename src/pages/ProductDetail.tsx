// ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUndo, FaShieldAlt, FaCertificate, FaGem } from "react-icons/fa";
import ProductActions from "../components/product-detail/ShareWishlist";
import PincodeChecker from "../components/product-detail/pincodeChecker";
import OfferBanner from "../components/product-detail/OfferBanner";
import ProductAccordion from "../components/product-detail/ProductDescription";
import { FaHeart } from "react-icons/fa";
import { addToCart, productDetails, wishlist_add_remove } from "../components/api/api-end-points";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { toast } from 'react-toastify'; 

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

const Loader = () => (
  <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-lg font-bold text-gray-800">
        Loading your experience, please wait...
      </p>
    </div>
  </div>
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
  const [isLoading, setIsLoading] = useState(true);
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
    const authToken = localStorage.getItem("auth_token");
  
    if (authToken) {
      handleAddToCart(); // API-based
      navigate("/cart");
    } else {
      // Guest cart logic
      const cartItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      const isAlreadyAdded = cartItems.find((item: any) => item.id === product.id);
      if (!isAlreadyAdded) {
        cartItems.push(product);
        localStorage.setItem("guest_cart", JSON.stringify(cartItems));
      }
      navigate("/cart"); // Still go to cart for guest users
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
        const action = isWishlisted ? "Removed from" : "Added to";
        setIsWishlisted(!isWishlisted);
        toast.success(`${action} wishlist`);
        console.log(result.message || "Wishlist updated");
      } else if (response.status === 401) {
        toast.error("Please log in to add items to your wishlist.");
      } else {
        console.error(result);
        toast.error("Something went wrong while updating wishlist.");
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };
  

  const handleAddToCart = async () => {
    const authToken = localStorage.getItem("auth_token");
  
    if (!authToken) {
      // User not logged in - Store product locally
      const cartItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      const isAlreadyAdded = cartItems.find((item: any) => item.id === product.id);
      if (!isAlreadyAdded) {
        cartItems.push(product);
        localStorage.setItem("guest_cart", JSON.stringify(cartItems));
        toast.success("Product added to cart");
      } else {
        toast.success("Product already to cart");
      }
      return;
    }
  
    // User is logged in - Proceed with API call
    try {
      const response = await axios.post( 
        addToCart,
        {
          product_id: product.id,
          cart: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      );
  
      if (response.data && response.data.status === "success") {
        toast.success("Product added to cart");
        setIsInCart(true);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };
  

  useEffect(() => {
    if (id) {
      axios
        .get(`${productDetails}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log(data)
          const relatedData = response.data.related_products;

          // Construct full image URLs
          const imageArray = data.images.map(
            (img: any) => `https://admirer.in/asset/image/product/${img.image}`
          );

          setProduct(data);
          setRelatedProducts(relatedData); // Store the related products
          setThumbnails(imageArray);
          setMainImage(imageArray[0]);
          setIsLoading(false);

          // Set wishlist status from API
          setIsWishlisted(data.wishlist === 1);

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

  if (isLoading) return <Loader />;

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
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => handleImageClick(src)} // Click to update main image
                    onMouseEnter={() => setHoverImage(src)} // Hover to show image in main container
                    onMouseLeave={() => setHoverImage(null)} // Remove hover effect when mouse leaves
                    className="w-20 h-20 rounded border p-2 border-gray-300 object-cover cursor-pointer hover:scale-105 transition-transform"
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

            {product.in_stock < 5 && (
              <div className="mt-4 mb-1 space-x-1 text-[16px] text-gray-600">
                Hurry Up! Only{" "}
                <span className="text-purple-600 font-semibold">
                  {product.in_stock} Item(s)
                </span>{" "}
                left in stock
              </div>
            )}

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
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={
                          `https://admirer.in/asset/image/product/${item.image}` ||
                          "https://via.placeholder.com/100"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>
                    <button
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        // e.stopPropagation(); // Prevents the click from reaching parent div
                        toggleWishlist(item.id);
                      }}
                    >
                      <div
                        className={`p-2 sm:p-1 rounded-full border shadow-md ${
                          item.wishlist === 1
                            ? "bg-red-900 border-red-500 text-red-500"
                            : "bg-white border-red-500 text-red-500 "
                        }`}
                      >
                        {item.wishlist === 1 ? (
                          <FaHeart size={16} />
                        ) : (
                          <FaRegHeart size={16} />
                        )}
                      </div>
                    </button>
                  </div>
                  <Link to={`/product/${item.id}`}>
                    <div className="font-medium text-[16px] max-md:text-[16px] truncate">
                      {item.title}
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 max-md:gap-1.5 text-lg">
                    <span className="font-semibold text-black max-md:text-[16px]">
                      ₹{item.discount}
                    </span>
                    <span className="line-through text-sm text-gray-400 max-md:text-[15px]">
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
