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
  onAddressSelect: (address: Address) => void;
  onAddressSaved: () => void; // ✅ added prop
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
  billingAddress,
  shippingAddresses,
  onAddressSelect,
  onAddressSaved, // ✅ extract it
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [allAddresses, setAllAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const combined = [billingAddress, ...shippingAddresses].filter(
      (addr) => addr && addr.flat
    );
    setAllAddresses(combined);
    if (combined.length > 0) {
      setSelectedAddress(combined[0]);
      onAddressSelect(combined[0]);
    } else {
      setSelectedAddress(null);
    }
  }, [billingAddress, shippingAddresses]);

  const handleAddressSelect = (index: number) => {
    const selected = allAddresses[index];
    setSelectedAddress(selected);
    onAddressSelect(selected);
  };

  const getName = (address: Address) => address.first_name || address.firstname || "";
  const getLastName = (address: Address) => address.last_name || address.lastname || "";
  const getZipCode = (address: Address) => address.zip_code || address.zipcode || "";

  return (
    <>
      {allAddresses.length === 0 ? (
        <div className="flex items-center justify-center mb-2">
          <div
            className="justify-between"
            style={{
              width: "100%",
              padding: "24px",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e8e8e8",
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p
              className="font-semibold"
              style={{ color: "#555", marginBottom: "16px", fontSize: "17px" }}
            >
              There are no saved addresses.
            </p>
            <button
              style={{
                border: "none",
                borderRadius: "6px",
                height: "40px",
                padding: "0 20px",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "white",
                backgroundColor: "#722ed1",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(114, 46, 209, 0.3)",
              }}
              onClick={() => setIsModalVisible(true)}
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "16px 0",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "white",
            border: "1px solid #e8e8e8",
            position: "relative",
            minHeight: "150px",
          }}
        >
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
              Deliver to {getName(selectedAddress!)} {getLastName(selectedAddress!)}
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
                  {selectedAddress?.flat}, {selectedAddress?.street},{" "}
                  {selectedAddress?.locality}
                </div>
                <div>
                  {selectedAddress?.city}, {selectedAddress?.state}
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
              {getZipCode(selectedAddress!)}
            </div>

            <div style={{ marginTop: "16px" }}>
              <Select
                style={{ width: "100%" }}
                value={allAddresses.indexOf(selectedAddress!)}
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
                boxShadow: "0 2px 4px rgba(114, 46, 209, 0.3)",
              }}
              onClick={() => setIsModalVisible(true)}
            >
              Change
            </button>
          </div>
        </div>
      )}

      <Modal
        title={<span style={{ color: "#722ed1" }}>Update Delivery Address</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
        centered
        bodyStyle={{ padding: "24px" }}
      >
        <AddressBar
          setIsModalVisible={setIsModalVisible}
          onAddressChange={onAddressSaved} // ✅ call fetchAddresses after save
        />
      </Modal>
    </>
  );
};

export default DeliveryInfo;
