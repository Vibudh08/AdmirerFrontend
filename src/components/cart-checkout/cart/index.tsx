import React, { useEffect, useState } from "react";
import Item from "./order-item";
import DeliveryInfo from "./current-address";
import axios from "axios";

interface CartProps {
  setTotalMRP: (value: number) => void;
  setDiscountAmount: (value: number) => void;
  setTotalAmount: (value: number) => void;
  setItemCount: (value: number) => void;
}

const Cart: React.FC<CartProps> = ({
  setTotalMRP,
  setDiscountAmount,
  setTotalAmount,
  setItemCount,
}) => {
  interface ItemProps {
    id: number;
    brandName: string;
    brandId: string;
    size: string;
    description: string;
    qty: string;
    price: string;
    discount: string;
    return_days: string;
    image: string;
  }

  const [totalItem, setTotalItem] = useState<ItemProps[]>([]);

  const handleQuantityChange = (id: number, newQty: number) => {
    const updatedItems = totalItem.map((item) =>
      item.id === id ? { ...item, qty: newQty.toString() } : item
    );

    setTotalItem(updatedItems);
    recalculateTotals(updatedItems);
  };

  const recalculateTotals = (items: ItemProps[]) => {
    let original = 0;
    let discounted = 0;

    items.forEach((item) => {
      const price = parseFloat(item.price || "0");
      const discountPercent = parseFloat(item.discount || "0");
      const quantity = parseInt(item.qty || "1");

      const discountedPrice = price - discountPercent;

      original += price * quantity;
      discounted += discountedPrice * quantity;
    });

    setTotalMRP(original);
    setDiscountAmount(discounted);
    setTotalAmount(original - discounted);
  };

  const handleDelete = async (id: number) => {
    const updatedItems = totalItem.filter((item) => item.id !== id);
    setTotalItem(updatedItems);
    setItemCount(updatedItems.length);
    recalculateTotals(updatedItems);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart-remove",
        { pid: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
      console.log("Item removed from backend:", response);
    } catch (error) {
      console.error("Backend error on delete:", error);
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/cart-products",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth_token"),
            },
          }
        );
        const data = response.data.data.products;
        console.log(data);

        const transformedData = data.map((item: any) => ({
          id: item.id,
          brandName: item.product_name,
          brandId: item.id.toString(),
          description: "No description available",
          qty: item.quantity,
          price: item.price,
          discount: item.discount,
          return_days: "7",
          image: item.image,
          totalQuantity: item.in_stock.toString(),
        }));

        setTotalItem(transformedData);
        setItemCount(transformedData.length);
        recalculateTotals(transformedData);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <>
      <div className="flex flex-col w-[65%] max-md:w-[100%] bg-white px-4 py-2">
        <DeliveryInfo
          name="yash"
          pincode="110059"
          address="UGF-9"
          city="NEW DELHI"
          state="DELHI"
        />

        <div className="flex flex-col">
          {totalItem.map((item, index) => (
            <div key={index}>
              <Item
                id={item.id}
                image={item.image}
                brandName={item.brandName}
                description={item.description}
                price={item.price}
                quantity={item.qty}
                brandId={item.brandId}
                discount={item.discount}
                return_day={item.return_days}
                onRemove={handleDelete}
                finalPrice={(
                  (parseFloat(item.price || "0") -
                    (parseFloat(item.price || "0") *
                      parseFloat(item.discount || "0")) /
                      100) *
                  parseInt(item.qty || "1")
                ).toFixed(2)}
                totalQuantity="3"
                onQuantityChange={handleQuantityChange} // ✅ Pass this
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
