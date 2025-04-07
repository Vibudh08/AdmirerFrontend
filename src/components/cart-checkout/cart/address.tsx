import React, { useState, useCallback } from "react";
import { Form, Input, Button, Spin, Alert } from "antd";
import {
  CompassOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

interface AddressData {
  name: string;
  address1: string;
  city: string;
  state: string;
  pincode: string;
}

interface AddressBarProps {
  setIsModalVisible: (visible: boolean) => void;
  onAddressChange: (address: AddressData) => void;
}

const AddressBar = ({
  setIsModalVisible,
  onAddressChange,
}: AddressBarProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeolocationSuccess = useCallback(
    async (position: GeolocationPosition) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );

        if (!response.ok) throw new Error("Address lookup failed");

        const data = await response.json();
        const newAddress = {
          name: "", // Name isn't available from geolocation
          address1: data.address.road || data.address.highway || "",
          city:
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "",
          state: data.address.state || "",
          pincode: data.address.postcode || "", // Added pincode from geolocation data
        };

        form.setFieldsValue(newAddress);
        onAddressChange(newAddress);
      } catch (err) {
        setError("Failed to fetch address details");
      } finally {
        setIsLoading(false);
      }
    },
    [form, onAddressChange]
  );

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      handleGeolocationSuccess,
      (error) => {
        setError("Unable to retrieve your location");
        setIsLoading(false);
      }
    );
  }, [handleGeolocationSuccess]);

  const handleSubmit = () => {
    setIsModalVisible(false);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="max-w-2xl mx-auto "
    >
      {/* Name Field - Added at the top */}
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input
          placeholder="John Doe"
          allowClear
          prefix={<UserOutlined className="text-gray-400" />}
        />
      </Form.Item>

      <Form.Item
        label="Street Address"
        name="address1"
        rules={[
          { required: true, message: "Please input your street address!" },
        ]}
      >
        <Input
          placeholder="123 Main Street"
          allowClear
          prefix={<CompassOutlined className="text-gray-400" />}
        />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input placeholder="New York" allowClear />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please input your state!" }]}
        >
          <Input placeholder="New York" allowClear />
        </Form.Item>
      </div>

      {/* Pincode Field - Added after state */}
      <Form.Item
        label="Pincode/Zip Code"
        name="pincode"
        rules={[
          { required: true, message: "Please input your pincode!" },
          { pattern: /^[0-9]+$/, message: "Pincode must contain only numbers" },
        ]}
      >
        <Input
          placeholder="123456"
          allowClear
          prefix={<EnvironmentOutlined className="text-gray-400" />}
        />
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            className="w-[180px] border rounded h-[40px] py-2 hover:!border-none text-sm  text-white hover:!bg-purple-700 hover:!text-white bg-purple-600"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              getCurrentLocation();
            }}
            loading={isLoading}
            icon={<CompassOutlined />}
            htmlType="button"
          >
            {isLoading ? "Detecting Location..." : "Use Current Location"}
          </Button>
          <Button className="w-[100px] border rounded hover:!border-none h-[40px] py-2 text-sm  text-white hover:!bg-purple-700 hover:!text-white bg-purple-600"
            
            htmlType="submit"
            style={{ marginLeft: "auto" }}
          >
            Submit
          </Button>
        </div>
      </Form.Item>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      )}
    </Form>
  );
};

export default AddressBar;
