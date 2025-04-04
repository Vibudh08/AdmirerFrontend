import React from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center">
        <img
          src="../public/logo/iconn.png"
          alt="Admirer Logo"
          className="h-16 w-auto"
        />
      </div>
      <div className="text-center w-full text-xl">Welcome to Admirer</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First Name"
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 flex px-[20px] py-[10px] focus:outline-none text-[var(--clr-common-text)] text-[16px]"
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <input
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 flex px-[20px] py-[10px] focus:outline-none text-[var(--clr-common-text)] text-[16px]"
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
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
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 flex px-[20px] py-[10px] focus:outline-none text-[var(--clr-common-text)] text-[16px]"
              />
              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">
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
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 flex px-[20px] py-[10px] focus:outline-none text-[var(--clr-common-text)] text-[16px]"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Create New Password"
                className="w-full h-[50px] bg-transparent border border-[var(--clr-common-border)] rounded-[4px] mt-[15px] mb-0 flex px-[20px] py-[10px] focus:outline-none text-[var(--clr-common-text)] text-[16px]"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
