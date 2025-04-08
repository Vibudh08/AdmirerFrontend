import React from "react";

interface productItemProps {
  name: string;
  price: string;
  description: string;
  originalPrice: string;
  discount: string;
  imageUrl?: string; // Added optional image URL prop
}

const ProductItem: React.FC<productItemProps> = ({
  name,
  price,
  description,
  originalPrice,
  discount,
  imageUrl = "http://ww1.prweb.com/prfiles/2012/10/31/10079702/emily_qtrbnd_5.jpg", // Default image
}) => {
  return (
    <div
      style={{
        maxWidth: "300px",
        fontFamily: "Arial, sans-serif",
        marginLeft: "40px",
      }}
    >
      {/* Product Image */}
      <img
        src={imageUrl}
        alt="product"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      />

      {/* Product Name */}
      <div
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "18px",
          marginBottom: "4px",
        }}
      >
        {name}
      </div>

      {/* Product Description */}
      <div
        style={{
          color: "#666",
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        {description}
      </div>

      {/* Price Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Current Price */}
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "16px",
          }}
        >
          Rs {price}
        </span>

        {/* Original Price (strikethrough) */}
        <span
          style={{
            textDecoration: "line-through",
            color: "#999",
            fontSize: "14px",
          }}
        >
          Rs {originalPrice}
        </span>

        {/* Discount Badge */}
        <span
          style={{
            backgroundColor: "#ffebee",
            color: "#f44336",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          ({discount}% OFF)
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
