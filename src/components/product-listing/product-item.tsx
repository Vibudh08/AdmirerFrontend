import React from "react";

interface productItemProps {
  name: string;
  price: string;
  description: string;
  originalPrice: string;
  discount: string;
  imageUrl?: string;
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
        backgroundColor: "#fff",
        border: "3px solid black", // Thick border
        borderTopWidth: "8px", // Thick at the top
        borderRadius: "12px",
        padding: "16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "10px", // Gap between each item
        marginTop: "40px",
        marginBottom: "40px",
        marginRight: "40px",
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
        }}
      />

      {/* Product Name */}
      <div
        style={{
          fontWeight: "bold",
          color: "black",
          fontSize: "20px",
        }}
      >
        {name}
      </div>

      {/* Product Description */}
      <div
        style={{
          color: "#666",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {description}
      </div>

      {/* Price Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* Current Price */}
        <span
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: "18px",
          }}
        >
          Rs {price}
        </span>

        {/* Original Price (strikethrough) */}
        <span
          style={{
            textDecoration: "line-through",
            color: "#999",
            fontSize: "16px",
          }}
        >
          Rs {originalPrice}
        </span>

        {/* Discount Badge */}
        <span
          style={{
            backgroundColor: "#ffebee",
            color: "#d32f2f",
            fontWeight: "bold",
            fontSize: "14px",
            padding: "4px 8px",
            borderRadius: "6px",
          }}
        >
          {discount} OFF
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
