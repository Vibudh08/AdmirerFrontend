import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface FormProps {
  phoneNumber: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log(data); // Form submission data
  };
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className=" left-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close signup form"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <div className="text-center mb-6">
          <img src="logo/iconn.png" alt="Logo" className="w-16 mx-auto mb-2" />
          <h1 className="text-xl font-semibold">Welcome to Admirer</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile Number */}
          <div className="mb-4">
            <input
              id="mobileNumber"
              type="tel"
              {...register("phoneNumber", {
                required: "Mobile number is required",
              })}
              placeholder="Mobile number"
              className="mt-1 block w-full border h-[50px] border-gray-300 rounded-md shadow-sm py-2 px-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phoneNumber.message}
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
                placeholder="Enter Password"
                className="flex-1 h-[50px] bg-transparent border border-gray-300 rounded-md mt-[0px] mb-0 px-5 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-[var(--clr-common-text)] text-base"
              />
              <button
                type="button"
                className="ml-2 h-[50px] w-[50px] flex items-center justify-center border border-gray-300 text-gray-500 hover:text-gray-700 focus:outline-none mt-[0px] rounded-md hover:border-sky-400"
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

          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded py-3 mt-6  hover:bg-purple-700  transition"
          >
            Login
          </button>
          <div className="text-center mt-4 text-md">
            Don't have an account?
            <button
              type="button"
              className="text-purple-700 font-bold ml-1 hover:underline align-bottom"
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              Register
            </button>
          </div>
          <div className="text-center mt-1">
            <a
              href="/forget-password.php"
              className="text-purple-700 font-semibold hover:underline align-bottom"
            >
              Forgot password?
            </a>
          </div>
        </form>

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
  );
};

export default Login;
