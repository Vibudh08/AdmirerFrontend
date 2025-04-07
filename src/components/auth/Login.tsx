import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface FormProps {
  phoneNumber: string;
  otp: string;
}

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = () => {
    // Here you would typically call your OTP sending API
    console.log("OTP sent to phone number");
    setOtpSent(true);
    setTimer(60); // Start 60-second timer
  };

  const onSubmit = (data: FormProps) => {
    console.log(data); // Form submission data with OTP
    // Here you would verify the OTP with your backend
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#efe6f3]  p-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute left-4 top-5 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close signup form"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <div className="text-center mb-6">
          <img src="logo/iconn.png" alt="Logo" className="w-16 mx-auto mb-2" />
          <h1 className="text-xl font-normal">Welcome to Admirer</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile Number */}
          <div className="mb-4">
            <input
              id="mobileNumber"
              type="tel"
              {...register("phoneNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
              placeholder="Mobile number"
              className="mt-1 block w-full border h-[50px] border-gray-300 rounded-md shadow-sm py-2 px-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={otpSent}
            />
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* OTP Input - Only shown after OTP is sent */}
          {otpSent && (
            <div className="mb-4">
              <input
                id="otp"
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                placeholder="Enter OTP"
                className="mt-1 block w-full border h-[50px] border-gray-300 rounded-md shadow-sm py-2 px-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.otp && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.otp.message}
                </p>
              )}
              {timer > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Resend OTP in {timer} seconds
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="flex-1 bg-purple-600 text-white rounded py-3 hover:bg-purple-700 transition"
              >
                Send OTP
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white rounded py-3 hover:bg-purple-700 transition"
                >
                  Verify
                </button>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="flex-1 bg-gray-200 text-gray-700 rounded py-3 hover:bg-gray-300 transition"
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}
          </div>

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
