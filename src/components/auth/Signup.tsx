import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    console.log(data);
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close signup form"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Logo and Welcome Text */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo/iconn.png" // Changed path (public folder is root)
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
              {/* First Name */}
              <div>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="First Name"
                  className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 px-5 focus:outline-none text-[var(--clr-common-text)] text-base"
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
                  className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 px-5 focus:outline-none text-[var(--clr-common-text)] text-base"
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
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 px-5 focus:outline-none text-[var(--clr-common-text)] text-base"
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
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 px-5 focus:outline-none text-[var(--clr-common-text)] text-base"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="relative">
              <div className="flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Create New Password"
                  className="flex-1 h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 px-5 focus:outline-none text-[var(--clr-common-text)] text-base"
                />
                <button
                  type="button"
                  className="ml-2 h-[50px] w-[50px] flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none mt-[15px] border border-[var(--clr-common-border)] rounded-[4px]"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-[50px] flex justify-center items-center rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none text-base font-medium"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
