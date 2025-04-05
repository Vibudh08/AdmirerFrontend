import React, { useEffect, useState } from "react";
import Item from "./order-item";
import shoeProducts from "./cartData";

const Cart = () => {
  interface ItemProps {
    brandName: string;
    brandId: string;
    size: string;
    description: string;
    qty: string;
    price: string;
    discount: string;
    return_days: string;
  }

  const [totalItem, setTotalItem] = useState<ItemProps[]>([]);
  const [itemSize, setItemSize] = useState(0);
  useEffect(() => {
    setTotalItem(shoeProducts);
  });
  useEffect(() => {
    setItemSize(totalItem.length);
  }, [totalItem]);

  return (
    <>
      {totalItem.map((item, index) => (
        <>
          <div>
            <Item
              brandName={item.brandName}
              description={item.description}
              price={item.price}
              quantity={item.qty}
              brandId={item.brandId}
              discount={item.discount}
              return_day={item.return_days}
              finalPrice={(
                parseFloat(item.price || "0") -
                (parseFloat(item.price || "0") *
                  parseFloat(item.discount || "0")) /
                  100
              ).toFixed(2)}
              checked={false}
              totalQuantity="10"
            />
          </div>
        </>
      ))}
    </>
  );
};

export default Cart;
