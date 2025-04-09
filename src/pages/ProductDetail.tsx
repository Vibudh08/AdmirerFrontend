import React, { useState } from "react";

import {
  FaUndo,
  FaShieldAlt,
  FaCertificate,
  FaGem,
} from "react-icons/fa";
import ProductActions from "../components/product-detail/ShareWishlist";
import PincodeChecker from "../components/product-detail/pincodeChecker";
import OfferBanner from "../components/product-detail/OfferBanner";
import ProductAccordion from "../components/product-detail/ProductDescription";

const ProductDetails = () => {
  const initialMainImage =
    "https://admirer.in/asset/image/product/17396130470.jpg";
  const initialThumbnails = [
    "https://admirer.in/asset/image/product/17440063940.jpg",
    "https://admirer.in/asset/image/product/17387818850.jpg",
    "https://admirer.in/asset/image/product/174417491000.jpg",
    "https://admirer.in/asset/image/product/17435831110.jpg",
  ];

  const [mainImage, setMainImage] = useState<string>(initialMainImage);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>(initialThumbnails);
  const [lensStyle, setLensStyle] = useState({});
  const [zoomStyle, setZoomStyle] = useState({});

  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const lensRef = React.useRef<HTMLDivElement>(null);

  const handleImageClick = (clickedImg: string, index: number) => {
    const newThumbs = [...thumbnails];
    newThumbs[index] = mainImage;
    setMainImage(clickedImg);
    setThumbnails(newThumbs);
    setHoverImage(null);
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

    const clampedX = Math.max(halfLens, Math.min(offsetX, container.offsetWidth - halfLens));
    const clampedY = Math.max(halfLens, Math.min(offsetY, container.offsetHeight - halfLens));

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

  return (
    <div className="bg-white py-3">
      <div className="w-[75%] max-md:w-full mx-auto bg-white p-6 max-md:p-3 rounded-2xl ">
        <div className="flex flex-col max-md:block lg:flex-row gap-8">
          {/* Left Section */}
          <div className="lg:w-1/2 max-md:mb-5">
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
              <div
                style={lensStyle}
                ref={lensRef}
              />
            </div>

            <div className="flex mt-4 flex-wrap">
              {thumbnails.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => handleImageClick(src, idx)}
                  onMouseEnter={() => setHoverImage(src)}
                  onMouseLeave={() => setHoverImage(null)}
                  className="w-20 h-20 rounded border p-1 border-gray-300 object-cover cursor-pointer hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2">
            <div className="flex justify-between gap-2">
              <div className="gap-1">
                <div className="text-xl text-gray-700 mb-2 font-medium">
                  Silver Gleaming Bridal
                </div>
                <div className="text-3xl items-center text-gray-800 mb-1">
                  ₹36,899{" "}
                  <span className="text-gray-400 line-through text-lg">
                    ₹57,999
                  </span>
                </div>
              </div>
              <ProductActions />
            </div>
            <div className="text-sm text-gray-500 mb-1">Incl. of all taxes</div>

            <div className="w-full bg-gradient-to-r tracking-wide from-purple-200 to-white text-md mt-3 text-purple-800 p-3 rounded-md">
              Get it for{" "}
              <span className="font-semibold tracking-wide">₹29,519</span> with coupon{" "}
              <span className="font-semibold text-pink-600 tracking-wider">ADMIRER100</span>
            </div>

            <div className="mt-4 mb-1 space-x-1 text-[16px] text-gray-600">
              Hurry Up! Only <span className="text-purple-600 font-semibold">3 Item(s)</span> left in stock
            </div>

            <div><PincodeChecker /></div>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-5">
              <div className="flex items-center gap-3 text-[15px]">
                <FaUndo className="text-purple-500 " />
                Exchange
              </div>
              <div className="flex items-center gap-3 text-[15px]">
                <FaShieldAlt className="text-purple-500" />
                Secured Transaction
              </div>
              <div className="flex items-center gap-3 text-[15px]">
                <FaCertificate className="text-purple-500" />
                Free Delivery
              </div>
              <div className="flex items-center gap-3 text-[15px]">
                <FaGem className="text-purple-500" />
                Signature Gift Box
              </div>
            </div>

            <div className="mt-5 flex gap-3 w-full ">
              <button className="bg-purple-600 text-white py-2 px-6 rounded-md h-[50px] w-1/2 hover:bg-purple-700 transition font-semibold">
                Buy Now
              </button>
              <button className="border border-purple-700 text-purple-700 py-2 px-6 rounded-md h-[50px] w-1/2 hover:bg-purple-50 transition font-semibold">
                Add To Cart
              </button>
            </div>

            <div><OfferBanner percentageDiscount={60} /></div>
          </div>
        </div>
        <div>
            <ProductAccordion description={"data"}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;