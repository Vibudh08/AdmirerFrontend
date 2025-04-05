import React, { useState, useCallback } from "react";
import { Form, Input, Button, Spin, Alert } from "antd";
import { CompassOutlined } from "@ant-design/icons";

interface AddressData {
  address1: string;
  city: string;
  state: string;
}

interface AddressBarProps {
  onAddressChange: (address: AddressData) => void;
}

const AddressBar = ({ onAddressChange }: AddressBarProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const handleInputChange = useCallback(
  //   (changedValues: Partial<AddressData>) => {
  //     const newAddress = form.getFieldsValue();
  //     onAddressChange(newAddress);
  //   },
  //   [form, onAddressChange]
  // );

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
          address1: data.address.road || data.address.highway || "",
          city:
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "",
          state: data.address.state || "",
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

  return (
    <Form
      form={form}
      layout="vertical"
      className="max-w-2xl mx-auto"
      // onValuesChange={handleInputChange}
    >
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

      <Form.Item>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
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
          <Button
            type="primary"
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
