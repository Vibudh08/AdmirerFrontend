import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd"; // Added Modal import
import AddressBar from "./address";
import { Color } from "antd/es/color-picker";
interface DeliveryInfoProps {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  name,
  address,
  city,
  state,
  pincode,
}) => {
  // State for controlling modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for storing address data
  const [addressData, setAddressData] = useState({
    address1: "",
    city: "",
    state: "",
  });

  const handleAddressChange = (newAddress: any) => {
    setAddressData(newAddress);
    //setIsModalVisible(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "16px 0",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "white",
        }}
      >
        {/* Delivery Information (70% width) */}
        <div style={{ width: "70%", paddingRight: "16px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
            Deliver to {name}
          </div>
          <div style={{ marginBottom: "8px", color: "#666" }}>
            {address},{city},{state},
          </div>

          <div style={{ color: "#666" }}>{pincode}</div>
        </div>

        {/* Change Button (30% width) */}
        <div
          style={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="w-[100px] border rounded h-[40px] py-2 text-sm  text-white hover:bg-purple-700 bg-purple-600"
            onClick={() => setIsModalVisible(true)}
          >
            Change
          </button>
        </div>
      </div>

      {/* Address Modal */}
      <Modal
  title="Update Delivery Address"
  open={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={null}
  width={700}
  centered
>
  <AddressBar
    setIsModalVisible={setIsModalVisible}
    onAddressChange={handleAddressChange}
  />
</Modal>

    </>
  );
};

export default DeliveryInfo;
