import React, { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import AddressBar from "./address";
import {
  HomeOutlined,
  EnvironmentOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

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

interface DeliveryInfoProps {
  billingAddress: Address;
  shippingAddresses: Address[];
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  billingAddress,
  shippingAddresses,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressData, setAddressData] = useState({
    address1: "",
    city: "",
    state: "",
  });
  const [selectedAddress, setSelectedAddress] =
    useState<Address>(billingAddress);
  const [allAddresses, setAllAddresses] = useState<Address[]>([]);

  useEffect(() => {
    // Combine billing and shipping addresses, putting billing first
    const combined = [billingAddress, ...shippingAddresses];
    setAllAddresses(combined);
    setSelectedAddress(billingAddress);
  }, [billingAddress, shippingAddresses]);

  const handleAddressChange = (newAddress: any) => {
    setAddressData(newAddress);
  };

  const handleAddressSelect = (index: number) => {
    setSelectedAddress(allAddresses[index]);
  };

  const getName = (address: Address) => {
    return address.first_name || address.firstname || "";
  };

  const getLastName = (address: Address) => {
    return address.last_name || address.lastname || "";
  };

  const getZipCode = (address: Address) => {
    return address.zip_code || address.zipcode || "";
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
            Deliver to {getName(selectedAddress)} {getLastName(selectedAddress)}
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
                {selectedAddress.flat}, {selectedAddress.street},{" "}
                {selectedAddress.locality}
              </div>
              <div>
                {selectedAddress.city}, {selectedAddress.state}
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
            {getZipCode(selectedAddress)}
          </div>

          {/* Address Selector Dropdown */}
          <div style={{ marginTop: "16px" }}>
            <Select
              style={{ width: "100%" }}
              value={allAddresses.indexOf(selectedAddress)}
              onChange={handleAddressSelect}
              options={allAddresses.map((address, index) => ({
                value: index,
                label: `${address.addr_type}: ${getName(address)} ${getLastName(
                  address
                )}, ${address.flat}, ${address.city}`,
              }))}
            />
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
