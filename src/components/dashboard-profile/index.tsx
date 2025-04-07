import React, { useState } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const Dashboard_Profile = () => {
  const [gender, setGender] = useState("male");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [error, setError] = useState("");

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setNewNumber("");
    setError("");
  };

  const handleInputChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;

    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    setNewNumber(value);

    // Validate
    if (value.length > 0 && value[0] === "0") {
      setError("Number cannot start with 0");
    } else if (value.length > 10) {
      setError("Number cannot exceed 10 digits");
    } else if (value.length === 10) {
      setError(""); // valid
    } else {
      setError("Enter a valid 10-digit number");
    }
  };

  const isValid = newNumber.length === 10 && error === "";

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-12 max-sm:p-3 rounded-md mt-10">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">Edit Details</h2>

      {/* Mobile Number */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Mobile Number*</label>
        <div className="flex items-center border rounded px-3 py-2 mt-1">
          <span className="text-green-600 font-medium">9971900418</span>
          <div className="ml-auto">
            <button
              className="text-sm border rounded px-6 py-2 hover:bg-gray-100"
              onClick={showModal}
            >
              CHANGE
            </button>
          </div>
        </div>
      </div>

      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border rounded px-4 py-2 mb-4 text-sm"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded px-4 py-2 mb-4 text-sm"
      />

      {/* Gender */}
      <div className="flex border rounded mb-4 overflow-hidden">
        <button
          onClick={() => setGender("male")}
          className={`w-1/2 py-2 text-sm ${
            gender === "male"
              ? "text-purple-600 border-r bg-purple-50"
              : "bg-white text-gray-600"
          }`}
        >
          {gender === "male" ? "✔ " : ""}Male
        </button>
        <button
          onClick={() => setGender("female")}
          className={`w-1/2 py-2 text-sm ${
            gender === "female"
              ? "text-pink-600 bg-pink-50"
              : "bg-white text-gray-600"
          }`}
        >
          {gender === "female" ? "✔ " : ""}Female
        </button>
      </div>

      {/* Birthday */}
      <input
        type="text"
        placeholder="Birthday (dd/mm/yyyy)"
        className="w-full border rounded px-4 py-2 mb-4 text-sm"
      />

      {/* Alternate Mobile Details */}
      <div className="mb-2 text-sm font-medium text-gray-700">
        Alternate mobile details
      </div>
      <div className="flex mb-5">
        <span className="flex items-center px-3 border border-r-0 rounded-l text-sm text-gray-600">
          +91
        </span>
        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full border rounded-r px-4 py-2 text-sm"
        />
      </div>

      {/* Save Button */}
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded">
        SAVE DETAILS
      </button>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined />}
        centered
        className="!w-[420px]"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Change Mobile Number
        </h2>

        {/* Previous Number (read-only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Mobile Number
          </label>
          <input
            type="text"
            value="9971900418"
            readOnly
            className="w-full border px-4 py-2 rounded bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* New Number Input */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Mobile Number
          </label>
          <input
            type="tel"
            value={newNumber}
            onChange={handleInputChange}
            placeholder="Enter new mobile number"
            maxLength={10}
            className="w-full border px-4 py-2 rounded text-sm"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Submit Button */}
        <Button
          type="primary"
          block
          disabled={!isValid}
          className="!bg-[#9333ea] !border-[#9333ea] !text-white !font-medium mt-2"
        >
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default Dashboard_Profile;
