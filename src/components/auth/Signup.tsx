import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signUp_API } from "../api/api-end-points";

interface FormProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data: FormProps) => {
    const user = {
      firstname: data.firstName,
      lastname: data.lastName,
      mobile: data.phoneNumber,
      email: data.email,
    };
    fetch(signUp_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center px-4">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute left-4 top-5 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close signup form"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Logo and Welcome Text */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo/iconn.png"
              alt="Admirer Logo"
              className="h-16 w-auto mb-2"
            />
            <h1 className="text-xl font-medium text-gray-900">
              Welcome to Admirer
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="First Name"
                  className="w-full h-[50px] bg-transparent border  border-gray-300 rounded-[4px] mt-[0px] mb-0 px-5 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-[var(--clr-common-text)] text-base"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Last Name"
                  className="w-full h-[50px] bg-transparent border  border-gray-300  rounded-[4px] mt-[0px] mb-0 px-5 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-[var(--clr-common-text)] text-base"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number (10-15 digits)",
                  },
                })}
                placeholder="Phone Number"
                className="w-full h-[50px] bg-transparent border  border-gray-300 rounded-[4px] mt-[0px] mb-0 px-5 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-[var(--clr-common-text)] text-base"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                className="w-full h-[50px] bg-transparent border  border-gray-300 rounded-[4px] mt-[0px] mb-0 px-5 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-[var(--clr-common-text)] text-base"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-[50px] flex justify-center items-center rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-base font-medium"
              >
                Register
              </button>
            </div>
          </form>

          {/* New line with "Already registered?" + Login button */}
          <div className="text-center mt-4 text-md">
            <span>Already registered? </span>
            <button
              className="text-purple-700 font-bold hover:underline align-bottom"
              onClick={() => navigate("/LogIn")}
            >
              Login
            </button>
          </div>
          <p className="text-center text-[13px] mt-6">
            By continuing, I agree to the{" "}
            <a href="/terms.php" className="text-purple-700 font-bold">
              Terms of Use
            </a>{" "}
            &{" "}
            <a href="/privacy.php" className="text-purple-700 font-bold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
