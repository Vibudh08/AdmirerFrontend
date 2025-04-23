import React, { useState } from "react";
import { Modal } from "antd";
import AddressBar from "./address";
import {
  HomeOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

interface DeliveryInfoProps {
  name: string;
  flat: string;
  locality: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  name,
  city,
  flat,
  locality,
  street,
  state,
  pincode,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressData, setAddressData] = useState({
    address1: "",
    city: "",
    state: "",
  });

  const handleAddressChange = (newAddress: any) => {
    setAddressData(newAddress);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: "16px 0",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          border: "1px solid #e8e8e8",
          position: "relative",
          minHeight: "150px",
        }}
      >
        {/* Delivery Information */}
        <div style={{ width: "100%", paddingRight: "120px" }}>
          <div
            style={{
              fontWeight: "600",
              marginBottom: "12px",
              fontSize: "18px",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <EnvironmentOutlined style={{ color: "#722ed1" }} />
            Deliver to {name}
          </div>

          <div
            style={{
              marginBottom: "8px",
              color: "#555",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              lineHeight: "1.5",
            }}
          >
            <HomeOutlined style={{ color: "#722ed1", marginTop: "3px" }} />
            <div>
              <div style={{ fontWeight: "500" }}>
                {flat}, {street}, {locality}
              </div>
              <div>
                {city}, {state}
              </div>
            </div>
          </div>

          <div
            style={{
              color: "#666",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            <PushpinOutlined style={{ color: "#722ed1" }} />
            {pincode}
          </div>
        </div>

        {/* Change Button positioned at bottom right */}
        <div
          style={{
            position: "absolute",
            right: "20px",
            bottom: "20px",
          }}
        >
          <button
            style={{
              width: "100px",
              border: "none",
              borderRadius: "6px",
              height: "40px",
              fontSize: "14px",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "white",
              backgroundColor: "#722ed1",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(114, 46, 209, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#5a1db1";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(114, 46, 209, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#722ed1";
              e.currentTarget.style.boxShadow =
                "0 2px 4px rgba(114, 46, 209, 0.3)";
            }}
            onClick={() => setIsModalVisible(true)}
          >
            Change
          </button>
        </div>
      </div>

      {/* Address Modal */}
      <Modal
        title={
          <span style={{ color: "#722ed1" }}>Update Delivery Address</span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
        centered
        bodyStyle={{ padding: "24px" }}
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
