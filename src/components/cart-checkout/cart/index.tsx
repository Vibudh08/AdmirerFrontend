import React, { useEffect, useState } from "react";
import Item from "./order-item";
import DeliveryInfo from "./current-address";
import axios from "axios";
import { getShippingAndBillingAddress } from "../../api/api-end-points";

interface CartProps {
  setTotalMRP: (value: number) => void;
  setDiscountAmount: (value: number) => void;
  setTotalAmount: (value: number) => void;
  setItemCount: (value: number) => void;
  setShippingData: (value: any) => void;
}

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

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center !border h-full py-20 bg-white w-full text-center">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
      alt="Empty cart"
      className="w-28 h-28 mb-6"
    />
    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
      Your cart is empty
    </h2>
    <p className="text-gray-500">
      Looks like you haven't added anything to your cart yet.
    </p>
  </div>
);

const Cart: React.FC<CartProps> = ({
  setTotalMRP,
  setDiscountAmount,
  setTotalAmount,
  setItemCount,
  setShippingData,
}) => {
  const [totalItem, setTotalItem] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuantityChange = async (id: number, newQty: number) => {
    // Update the local state first
    const updatedItems = totalItem.map((item) =>
      item.id === id ? { ...item, qty: newQty.toString() } : item
    );
    setTotalItem(updatedItems);
    recalculateTotals(updatedItems);

    // Make the API call to update the cart quantity in the backend
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/update-cart-quantity",
        { productId: id, quantity: newQty },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
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
      await axios.post(
        "http://127.0.0.1:8000/api/cart-remove",
        { pid: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        }
      );
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
        const data = response.data.data.products || [];

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);
  interface Address {
    first_name?: string;
    firstname?: string;
    last_name?: string;
    lastname?: string;
    flat: string;
    street: string;
    locality: string;
    city: string;
    state: string;
    zip_code?: string;
    zipcode?: string;
    addr_type: string;
    email?: string | null;
  }

  interface AddressData {
    billingAddress: Address;
    shippingAddresses: Address[];
  }
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [addressForNimbus, setAddressForNimbus] = useState<Address | null>(
    null
  );
  useEffect(() => {
    setShippingData(addressForNimbus);
    console.log("addressForNimbus", addressForNimbus);
  }, [addressForNimbus]);
  useEffect(() => {
    fetch(getShippingAndBillingAddress, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("the shipping and billing addresses are provided ", data);
        // Assuming data has billing_address and shipping_address properties
        setAddressData({
          billingAddress: data.billing_address[0],
          shippingAddresses: data.shipping_address,
        });
        const shipping = addressData;
        setShippingData(shipping);
        console.log(shipping)
      });
  }, []);

  if (isLoading) return <Loader />;
  if (totalItem.length === 0) return <EmptyCart />;

  return (
    <div className="flex flex-col w-[65%] max-md:w-[100%] bg-white px-4 py-2">
      {addressData && (
        <DeliveryInfo
          billingAddress={addressData.billingAddress}
          shippingAddresses={addressData.shippingAddresses}
          onAddressSelect={setAddressForNimbus}
        />
      )}
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
              onQuantityChange={handleQuantityChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
