import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { user_profile_API } from "../api/api-end-points";

const indianStates = [
  "ANDAMAN AND NICOBAR ISLANDS",
  "ANDHRA PRADESH",
  "ARUNACHAL PRADESH",
  "ASSAM",
  "BIHAR",
  "CHANDIGARH",
  "CHHATTISGARH",
  "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
  "DELHI",
  "GOA",
  "GUJARAT",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JAMMU AND KASHMIR",
  "JHARKHAND",
  "KARNATAKA",
  "KERALA",
  "LADAKH",
  "LAKSHADWEEP",
  "MADHYA PRADESH",
  "MAHARASHTRA",
  "MANIPUR",
  "MEGHALAYA",
  "MIZORAM",
  "NAGALAND",
  "ODISHA",
  "PUDUCHERRY",
  "PUNJAB",
  "RAJASTHAN",
  "SIKKIM",
  "TAMIL NADU",
  "TELANGANA",
  "TRIPURA",
  "UTTAR PRADESH",
  "UTTARAKHAND",
  "WEST BENGAL",
];

const Dashboard_Profile = () => {
  interface profileDataProps {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    flat: string;
    street: string;
    locality: string;
    city: string;
    zipcode: string;
    state: string;
    country: string;
    address_type: string;
    status: string;
  }

  const UPDATE_PROFILE_API = "http://127.0.0.1:8000/api/updateProfile";
  const AUTH_TOKEN =
    "Bearer 12|3FP2XTCqlTH9cGQT8gwkaqP9Y5ZXAIt8sBJZI8P80064fd41";

  const [profileData, setProfileData] = useState<profileDataProps>();
  const [gender, setGender] = useState("male");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [editedMobile, setEditedMobile] = useState("");
  const [mainMobileError, setMainMobileError] = useState("");
  const [modalMobileError, setModalMobileError] = useState("");
  const [altNumber, setAltNumber] = useState("");
  const [altError, setAltError] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    flat: "",
    street: "",
    locality: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    addressType: "",
  });

  // New address fields
  const [flat, setFlat] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [addressType, setAddressType] = useState("");

  useEffect(() => {
    fetch(user_profile_API, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setEditedMobile(data.mobile || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setGender(data.gender || "male");

        // Set new address fields
        setFlat(data.flat || "");
        setStreet(data.street || "");
        setLocality(data.locality || "");
        setCity(data.city || "");
        setZipcode(data.zipcode || "");
        setState(data.state || "");
        setCountry(data.country || "");
        setAddressType(data.address_type || "");
      });
  }, []);

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "firstName":
        return value.trim() ? "" : "First name is required";
      case "lastName":
        return value.trim() ? "" : "Last name is required";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Enter a valid email address";
      case "flat":
        return value.trim() ? "" : "Flat/House number is required";
      case "street":
        return value.trim() ? "" : "Street is required";
      case "locality":
        return value.trim() ? "" : "Locality is required";
      case "city":
        return value.trim() ? "" : "City is required";
      case "zipcode":
        if (!value) return "Zipcode is required";
        if (!/^\d{6}$/.test(value)) return "Enter a valid 6-digit zipcode";
        return "";
      case "state":
        return value.trim() ? "" : "State is required";
      case "country":
        return value.trim() ? "" : "Country is required";
      case "addressType":
        return value.trim() ? "" : "Address type is required";
      default:
        return "";
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    setEditedMobile(value);

    if (value.length > 0 && value[0] === "0") {
      setMainMobileError("Number cannot start with 0");
    } else if (value.length > 10) {
      setMainMobileError("Number cannot exceed 10 digits");
    } else if (value.length === 10) {
      setMainMobileError("");
    } else {
      setMainMobileError("Enter a valid 10-digit number");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const value = e.target.value;

    if (field === "firstName") {
      setFirstName(value);
      setFormErrors((prev) => ({
        ...prev,
        firstName: validateField(field, value),
      }));
    } else if (field === "lastName") {
      setLastName(value);
      setFormErrors((prev) => ({
        ...prev,
        lastName: validateField(field, value),
      }));
    } else if (field === "email") {
      setEmail(value);
      setFormErrors((prev) => ({
        ...prev,
        email: validateField(field, value),
      }));
    } else if (field === "flat") {
      setFlat(value);
      setFormErrors((prev) => ({
        ...prev,
        flat: validateField(field, value),
      }));
    } else if (field === "street") {
      setStreet(value);
      setFormErrors((prev) => ({
        ...prev,
        street: validateField(field, value),
      }));
    } else if (field === "locality") {
      setLocality(value);
      setFormErrors((prev) => ({
        ...prev,
        locality: validateField(field, value),
      }));
    } else if (field === "city") {
      setCity(value);
      setFormErrors((prev) => ({
        ...prev,
        city: validateField(field, value),
      }));
    } else if (field === "zipcode") {
      // Allow only digits and limit to 6 characters
      if (/^\d{0,6}$/.test(value)) {
        setZipcode(value);
        setFormErrors((prev) => ({
          ...prev,
          zipcode: validateField(field, value),
        }));
      }
    } else if (field === "state") {
      setState(value);
      setFormErrors((prev) => ({
        ...prev,
        state: validateField(field, value),
      }));
    } else if (field === "country") {
      setCountry(value);
      setFormErrors((prev) => ({
        ...prev,
        country: validateField(field, value),
      }));
    } else if (field === "addressType") {
      setAddressType(value);
      setFormErrors((prev) => ({
        ...prev,
        addressType: validateField(field, value),
      }));
    }
  };

  const isValid =
    editedMobile.length === 10 &&
    mainMobileError === "" &&
    altError === "" &&
    Object.values(formErrors).every((val) => !val);

  const updateProfileAPI = (mobile?: string) => {
    const payload = {
      firstName,
      lastName,
      email,
      gender,
      mobile: mobile ?? profileData?.mobile ?? "",
      flat,
      street,
      locality,
      city,
      zipcode,
      state,
      country,
      address_type: addressType,
    };

    console.log("🔄 Sending update payload:", payload);

    fetch(UPDATE_PROFILE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Update response from server:", data);

        // 🔁 After update, fetch the latest full profile
        fetch(user_profile_API, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("auth_token"),
          },
        })
          .then((res) => res.json())
          .then((freshData) => {
            setProfileData(freshData);
            setEditedMobile(freshData.mobile || "");
            setFirstName(freshData.first_name || "");
            setLastName(freshData.last_name || "");
            setEmail(freshData.email || "");
            setGender(freshData.gender || "male");
            setFlat(freshData.flat || "");
            setStreet(freshData.street || "");
            setLocality(freshData.locality || "");
            setCity(freshData.city || "");
            setZipcode(freshData.zipcode || "");
            setState(freshData.state || "");
            setCountry(freshData.country || "");
            setAddressType(freshData.address_type || "");
            setIsEditable(false);
          });
      })
      .catch((err) => {
        console.error("❌ Update Failed:", err);
      });
  };

  const toggleEdit = () => {
    if (isEditable) {
      // Validate all fields before saving
      const newErrors = {
        firstName: validateField("firstName", firstName),
        lastName: validateField("lastName", lastName),
        email: validateField("email", email),
        flat: validateField("flat", flat),
        street: validateField("street", street),
        locality: validateField("locality", locality),
        city: validateField("city", city),
        zipcode: validateField("zipcode", zipcode),
        state: validateField("state", state),
        country: validateField("country", country),
        addressType: validateField("addressType", addressType),
      };

      setFormErrors(newErrors);

      if (!isValid || Object.values(newErrors).some((error) => error)) {
        console.log("Form has errors or is incomplete.");
        return;
      }

      if (editedMobile !== profileData?.mobile) {
        setNewNumber(editedMobile);
        setIsModalOpen(true);
      } else {
        updateProfileAPI();
      }
    } else {
      setEditedMobile(profileData?.mobile || "");
    }

    setIsEditable((prev) => !prev);
  };

  return (
    <div className="m-auto bg-white shadow-md p-8 max-sm:p-4 max-sm:mt-5 w-full">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">Edit Profile</h2>

      {/* Mobile Number */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Mobile Number*
        </label>
        <input
          type="tel"
          placeholder="Mobile Number"
          value={isEditable ? editedMobile : profileData?.mobile || ""}
          onChange={handleMobileChange}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {mainMobileError && (
          <p className="text-red-500 text-sm">{mainMobileError}</p>
        )}
      </div>

      {/* First & Last Name */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            First Name
          </label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleInputChange(e, "firstName")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm">{formErrors.firstName}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm">{formErrors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleInputChange(e, "email")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Flat/House No.*
          </label>
          <input
            type="text"
            placeholder="Flat/House No."
            value={flat}
            onChange={(e) => handleInputChange(e, "flat")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.flat && (
            <p className="text-red-500 text-sm">{formErrors.flat}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Street*
          </label>
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => handleInputChange(e, "street")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.street && (
            <p className="text-red-500 text-sm">{formErrors.street}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Locality*
        </label>
        <input
          type="text"
          placeholder="Locality"
          value={locality}
          onChange={(e) => handleInputChange(e, "locality")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.locality && (
          <p className="text-red-500 text-sm">{formErrors.locality}</p>
        )}
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            City*
          </label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => handleInputChange(e, "city")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
          />
          {formErrors.city && (
            <p className="text-red-500 text-sm">{formErrors.city}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Zipcode*
          </label>
          <input
            type="text"
            placeholder="Zipcode"
            value={zipcode}
            onChange={(e) => handleInputChange(e, "zipcode")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isEditable}
            maxLength={6}
          />
          {formErrors.zipcode && (
            <p className="text-red-500 text-sm">{formErrors.zipcode}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            State*
          </label>
          <select
            value={state}
            onChange={(e) => handleInputChange(e, "state")}
            className={`w-full border rounded px-4 py-3 text-sm appearance-none ${
              isEditable
                ? "text-black"
                : "text-gray-400 cursor-not-allowed bg-gray-100"
            }`}
            disabled={!isEditable}
          >
            <option value="">Select a state</option>
            {indianStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {formErrors.state && (
            <p className="text-red-500 text-sm">{formErrors.state}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Country*
          </label>
          <input
            type="text"
            placeholder="Country"
            value="INDIA"
            onChange={(e) => handleInputChange(e, "country")}
            className={`w-full border rounded px-4 py-3 text-sm ${
              isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
            }`}
            disabled
          />
          {formErrors.country && (
            <p className="text-red-500 text-sm">{formErrors.country}</p>
          )}
        </div>
      </div>

      {/* <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Address Type*
        </label>
        <input
          type="text"
          placeholder="Address Type (e.g., Home, Office)"
          value={addressType}
          onChange={(e) => handleInputChange(e, "addressType")}
          className={`w-full border rounded px-4 py-3 text-sm ${
            isEditable ? "text-black" : "text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditable}
        />
        {formErrors.addressType && (
          <p className="text-red-500 text-sm">{formErrors.addressType}</p>
        )}
      </div> */}

      {/* Save / Edit Button */}
      <button
        className={`w-full mt-2 py-3 rounded text-white ${
          isEditable
            ? isValid
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
        onClick={toggleEdit}
        disabled={isEditable && !isValid}
      >
        {isEditable ? "SAVE DETAILS" : "EDIT DETAILS"}
      </button>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setNewNumber("");
          setModalMobileError("");
        }}
        closeIcon={<CloseOutlined />}
        centered
        className="!w-[420px]"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Change Mobile Number
        </h2>

        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Mobile Number
          </label>
          <input
            type="text"
            value={profileData?.mobile}
            readOnly
            className="w-full border px-4 py-3 rounded bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Mobile Number
          </label>
          <input
            type="tel"
            value={newNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (!/^\d*$/.test(value)) return;
              setNewNumber(value);

              if (value.length > 0 && value[0] === "0") {
                setModalMobileError("Number cannot start with 0");
              } else if (value.length > 10) {
                setModalMobileError("Number cannot exceed 10 digits");
              } else if (value.length === 10) {
                setModalMobileError("");
              } else {
                setModalMobileError("Enter a valid 10-digit number");
              }
            }}
            className="w-full border rounded px-4 py-3 text-sm"
          />
          {modalMobileError && (
            <p className="text-red-500 text-sm">{modalMobileError}</p>
          )}
        </div>

        <Button
          className={`w-full !bg-purple-600 hover:!bg-purple-700 h-[45px] mt-2 !text-white !border-none`}
          onClick={() => {
            if (newNumber.length === 10 && modalMobileError === "") {
              updateProfileAPI(newNumber);
              setIsModalOpen(false);
              setNewNumber("");
            }
          }}
        >
          SEND OTP
        </Button>
      </Modal>
    </div>
  );
};

export default Dashboard_Profile;
