import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { otp_send_API, verifyLogin_API } from "../api/api-end-points";
interface FormProps {
  phoneNumber: string;
  otp: string;
}

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    getValues,
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

  const handleSendOtp = async () => {
    const phoneNumber = getValues("phoneNumber");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(otp_send_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpSent(true);
      setTimer(60); // Start 60-second timer
      toast.success("OTP sent successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(verifyLogin_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: data.phoneNumber,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed");
      }

      // Store token and user data
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Login successful!");
      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute left-4 top-5 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close signup form"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <div className="text-center mb-5">
          <img src="logo/iconn.png" alt="Logo" className="w-16 mx-auto " />
          <h1 className="text-xl font-normal">Welcome to Admirer</h1>
        </div>
        <div className="text-xl mb-4">Login</div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

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
              disabled={otpSent || isLoading}
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
                disabled={isLoading}
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
                className="flex-1 bg-purple-600 text-white rounded py-3 hover:bg-purple-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white rounded py-3 hover:bg-purple-700 transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="flex-1 bg-gray-200 text-gray-700 rounded py-3 hover:bg-gray-300 transition disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}
          </div>

          {/* <div className="text-center mt-4 text-md">
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
          </div> */}
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
