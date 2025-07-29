import React, { useEffect, useState } from "react";
import Item from "./order-item";
import DeliveryInfo from "./current-address";
import axios from "axios";
import {
  addToCart,
  cartProductData,
  cartRemove,
  getShippingAndBillingAddress,
  updateCartQuantity,
} from "../../api/api-end-points";
import LoaderCode from "../../Loader";

interface CartProps {
  setTotalMRP: (value: number) => void;
  setDiscountAmount: (value: number) => void;
  setTotalAmount: (value: number) => void;
  setItemCount: (value: number) => void;
  setShippingData: (value: any) => void;
  openAddressModal?: boolean;
}

interface ItemProps {
  id: number;
  subcat_id: number;
  brandName: string;
  brandId: string;
  size?: string;
  description: string;
  qty: string;
  price: string;
  discount: string;
  return_days: string;
  image: string;
  totalQuantity: string;
  displayPrice: string;
}

const Loader = () => <LoaderCode />;

const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center !border h-[100vh] py-20 bg-white w-full text-center">
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

interface RawCartItem {
  id: number;
  product_name?: string;
  quantity: string;
  price: string;
  description?: string;
  discount: string;
  image: string;
  in_stock: number;
  subcat_id: number;
}

interface GuestCartItem {
  images: any;
  subcat_id: number;
  id: number;
  product_name?: string;
  name?: string;
  description?: string;
  qty?: string;
  price?: string;
  discount?: string;
  return_days?: string;
  image: string;
  in_stock: number;
}

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

const Cart: React.FC<CartProps> = ({
  setTotalMRP,
  setDiscountAmount,
  setTotalAmount,
  setItemCount,
  setShippingData,
  openAddressModal,
}) => {
  const [totalItem, setTotalItem] = useState<ItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [addressForNimbus, setAddressForNimbus] = useState<Address | null>(
    null
  );

  const syncCartCountToHeader = (count: number) => {
    localStorage.setItem("itemCount", count.toString());
    window.dispatchEvent(new Event("itemCountUpdated"));
  };

  const recalculateTotals = (items: ItemProps[]) => {
  let original = 0;
  let discounted = 0;

  const comboUnitPrice = 349;
  const comboPack = 3;

  const comboItems = items.filter((item) => Number(item.subcat_id) === 10);
  const otherItems = items.filter((item) => Number(item.subcat_id) !== 10);

  let remainingCommonComboQty = 0;

  const updatedItems: ItemProps[] = [];

  comboItems.forEach((item) => {
    const qty = parseInt(item.qty || "1");

    // Apne hi qty se pack ban raha hai kya?
    const selfComboSets = Math.floor(qty / comboPack);
    const selfComboQty = selfComboSets * comboPack;

    const leftoverQty = qty - selfComboQty;

    // Bachahua common pool mein jaye
    remainingCommonComboQty += leftoverQty;

    const comboPrice = selfComboQty * comboUnitPrice;
    const normalPrice = leftoverQty * parseFloat(item.discount || item.price);

    original += qty * parseFloat(item.price || "0");
    discounted += comboPrice + normalPrice;

    let finalDisplayPrice = 0;
    if (qty === selfComboQty) {
      finalDisplayPrice = comboUnitPrice;
    } else if (qty === leftoverQty) {
      finalDisplayPrice = parseFloat(item.discount || item.price);
    } else {
      // Mixed combo + normal
      finalDisplayPrice = ((comboPrice + normalPrice) / qty);
    }

    updatedItems.push({
      ...item,
      displayPrice: finalDisplayPrice.toFixed(2),
    });
  });

  // Ab bacha hua leftover sab comboItems mein equally combo mein daalo:
  if (remainingCommonComboQty > 0) {
    const commonComboSets = Math.floor(remainingCommonComboQty / comboPack);
    let comboQtyLeft = commonComboSets * comboPack;

    if (comboQtyLeft > 0) {
      updatedItems.forEach((item) => {
        if (Number(item.subcat_id) === 10) {
          const qty = parseInt(item.qty || "1");
          const existingDisplay = parseFloat(item.displayPrice || "0");

          // Us item ka original qty
          const originalQty = qty;

          // Pehle se kitna combo lag chuka
          const selfComboSets = Math.floor(qty / comboPack);
          const selfComboQty = selfComboSets * comboPack;

          const leftover = qty - selfComboQty;

          if (leftover > 0 && comboQtyLeft > 0) {
            const takeCombo = Math.min(leftover, comboQtyLeft);
            const newComboPrice = takeCombo * comboUnitPrice;
            const newNormalPrice = (leftover - takeCombo) * parseFloat(item.discount || item.price);

            comboQtyLeft -= takeCombo;

            const newTotal = (selfComboQty * comboUnitPrice) + newComboPrice + newNormalPrice;
            const newDisplay = newTotal / originalQty;

            discounted -= existingDisplay * originalQty; // Remove old
            discounted += newTotal; // Add new

            item.displayPrice = newDisplay.toFixed(2);
          }
        }
      });
    }
  }

  otherItems.forEach((item) => {
    const qty = parseInt(item.qty || "1");
    const basePrice = parseFloat(item.displayPrice || item.price || "0");

    original += parseFloat(item.price || "0") * qty;
    discounted += basePrice * qty;

    updatedItems.push({
      ...item,
      displayPrice: basePrice.toFixed(2),
    });
  });

  setTotalMRP(original);
  setDiscountAmount(original - discounted);
  setTotalAmount(discounted);
  setTotalItem(updatedItems);

  console.log("✅ FINAL Items:", updatedItems);
};


  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  });

  // console.log("Cart Items:", cartItems);
  // console.log("Subcat IDs:", cartItems.map((item: { subcat_id: any; }) => item.subcat_id));
  // const isComboApplied =
  //   cartItems.length === 3 &&
  //   cartItems.every(
  //     (item: { subcat_id: string }) => parseInt(item.subcat_id) === 10
  //   );

  // ✅ 1. Cart Items as STATE

  // ✅ 2. When localStorage changes, update state too (example)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(stored);
  }, [totalItem]); // agar tum cart localStorage update karte ho to isko trigger karo

  // useEffect(() => {
  //   if (isComboApplied) {
  //     cartItems.forEach((item: { qty: string; id: number }) => {
  //       if (parseInt(item.qty) !== 1) {
  //         handleQuantityChange(item.id, 1);
  //       }
  //     });
  //   }
  // }, [cartItems, isComboApplied]);

  const handleQuantityChange = async (id: number, newQty: number) => {
    // if (isComboApplied) {
    //   console.log("Combo detected, forcing quantity to 1");
    //   newQty = 1;
    // }

    const updatedItems = cartItems.map((item: { id: number }) =>
      item.id === id ? { ...item, qty: newQty.toString() } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    setTotalItem(updatedItems); // agar totalItem bhi use ho raha hai
    recalculateTotals(updatedItems);

    try {
      console.log("Sending quantity to backend:", newQty);
      await axios.post(
        updateCartQuantity,
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

  // const handleQuantityChange = async (id: number, newQty: number) => {
  // if (isComboApplied) {
  //   console.log("Combo detected, forcing quantity to 1");
  //   newQty = 1;
  // }

  // const updatedItems = cartItems.map((item: { id: number }) =>
  //   item.id === id ? { ...item, qty: newQty.toString() } : item
  // );

  // setCartItems(updatedItems);
  // localStorage.setItem("cartItems", JSON.stringify(updatedItems));

  // setTotalItem(updatedItems); // agar totalItem bhi use ho raha hai
  // recalculateTotals(updatedItems);

  //   try {
  //     console.log("Sending quantity to backend:", 1);
  //     await axios.post(
  //       updateCartQuantity,
  //       { productId: id, quantity: 1 },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("auth_token"),
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Failed to update cart quantity:", error);
  //   }
  // };
  const handleDelete = async (id: number) => {
    const updatedItems = totalItem.filter((item) => item.id !== id);

    // 1️⃣ React state update
    setTotalItem(updatedItems);
    setItemCount(updatedItems.length);

    // 2️⃣ LocalStorage update ✅
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    // 3️⃣ Sync other stuff
    syncCartCountToHeader(updatedItems.length);
    recalculateTotals(updatedItems);

    // 4️⃣ Backend call
    try {
      await axios.post(
        cartRemove,
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

  const fetchCartData = async () => {
    setIsLoading(true);

    const authToken = localStorage.getItem("auth_token");
    let apiCart: RawCartItem[] = [];
    const guestCart: GuestCartItem[] = JSON.parse(
      localStorage.getItem("guest_cart") || "[]"
    );

    if (authToken && guestCart.length > 0) {
      try {
        await Promise.all(
          guestCart.map((item) =>
            axios.post(
              addToCart,
              { product_id: item.id, cart: 1 },
              { headers: { Authorization: `Bearer ${authToken}` } }
            )
          )
        );
        localStorage.removeItem("guest_cart");
        console.log("✅ Guest cart synced to backend and cleared.");
      } catch (error) {
        console.error("Error syncing guest cart to backend:", error);
      }
    }

    if (authToken) {
      try {
        const response = await axios.get(cartProductData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        apiCart = response.data.data.products || [];
        console.log("cartdata", apiCart);
      } catch (error) {
        console.error("Failed to fetch cart data from API:", error);
      }
    }

    const transformedApiCart: ItemProps[] = apiCart.map((item) => ({
      id: item.id,
      subcat_id: item.subcat_id,
      brandName: item.product_name || "Unknown",
      brandId: item.id.toString(),
      description: item.description || "No description available",
      qty: item.quantity,
      price: item.price,
      discount: item.discount || item.price,
      displayPrice: item.discount || item.price,
      return_days: "7",
      image: item.image,
      totalQuantity: item.in_stock < 3 ? item.in_stock.toString() : "3",
    }));

    const transformedGuestCart: ItemProps[] = guestCart.map((item) => ({
      id: item.id,
      subcat_id: item.subcat_id,
      brandName: item.product_name || "Unknown",
      brandId: item.id.toString(),
      description: item.description || "No description available",
      qty: item.qty || "1",
      price: item.price || "0",
      discount: item.discount || "0",
      displayPrice: item.price || "0",
      return_days: item.return_days || "7",
      image: `https://admirer.in/asset/image/product/${item.images[0]?.image}`,
      totalQuantity: item.in_stock < 3 ? item.in_stock.toString() : "3",
    }));

    const mergedCart: ItemProps[] = [...transformedApiCart];
    transformedGuestCart.forEach((guestItem) => {
      const exists = transformedApiCart.some(
        (apiItem) => apiItem.id === guestItem.id
      );
      if (!exists) mergedCart.push(guestItem);
    });

    setItemCount(mergedCart.length);
    syncCartCountToHeader(mergedCart.length);

    // ✅ FINAL: Ab bas recalculateTotals hi last me `setTotalItem` karega
    recalculateTotals(mergedCart);

    localStorage.setItem("cartItems", JSON.stringify(mergedCart));
    console.log("API CART:", apiCart);
    console.log("GUEST CART:", guestCart);
    console.log("Transformed API:", transformedApiCart);
    console.log("Transformed Guest:", transformedGuestCart);
    console.log("MergedCart before recalculate:", mergedCart);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    console.log("the address for nimbus is = ", addressForNimbus);
    setShippingData(addressForNimbus);
  }, [addressForNimbus]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(getShippingAndBillingAddress, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });
      const data = await response.json();
      setAddressData({
        billingAddress: data.billing_address[0],
        shippingAddresses: data.shipping_address,
      });
      setShippingData(data.shipping_address[0]);
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  if (isLoading) return <Loader />;
  if (totalItem.length === 0) return <EmptyCart />;
  // console.log("total item" ,totalItem.length)

  return (
    <div className="flex flex-col w-[65%] max-md:w-[100%] bg-white px-4 max-md:px-2 py-2">
      {addressData && (
        <DeliveryInfo
          billingAddress={addressData.billingAddress}
          shippingAddresses={addressData.shippingAddresses}
          onAddressSelect={setAddressForNimbus}
          onAddressSaved={fetchAddresses}
          externalTriggerOpen={openAddressModal}
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
              discount={item.displayPrice}
              return_day={item.return_days}
              onRemove={handleDelete}
              finalPrice={(
                parseFloat(item.displayPrice || "0") * parseInt(item.qty || "1")
              ).toFixed(2)}
              totalQuantity={item.totalQuantity}
              onQuantityChange={handleQuantityChange}
              totalItem={totalItem.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
