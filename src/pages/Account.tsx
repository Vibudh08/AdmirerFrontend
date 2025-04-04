import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";

type OtpInput = string[];

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState<OtpInput>(Array(6).fill(""));
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login:", { mobileNumber, password });
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Register:", { firstName, lastName, mobileNumber, email, registerPassword });
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("OTP entered:", otp.join(""));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/assets/img/admirer favicon.png" alt="Logo" className="w-28 mx-auto mb-2" />
          <h1 className="text-xl font-light">Welcome to Admirer</h1>
        </div>

        {!isOtp ? (
          isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <input
                type="tel"
                placeholder="Mobile number"
                maxLength={10}
                pattern="[0-9]{10}"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white rounded py-3 mt-6 hover:bg-white hover:text-purple-700 border border-purple-700 transition"
              >
                Login
              </button>
              <div className="text-center mt-4 text-sm">
                Don't have an account?
                <button
                  type="button"
                  className="text-purple-700 font-bold ml-1"
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </button>
              </div>
              <div className="text-center mt-2">
                <a href="/forget-password.php" className="text-purple-700 font-semibold">
                  Forgot password?
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Mobile"
                maxLength={10}
                pattern="[0-9]{10}"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Create New Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full border rounded px-4 py-3 mt-4 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white rounded py-3 mt-6 hover:bg-white hover:text-purple-700 border border-purple-700 transition"
              >
                Register
              </button>
              <div className="text-center mt-4 text-sm">
                Already registered?
                <button
                  type="button"
                  className="text-purple-700 font-bold ml-1"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </div>
            </form>
          )
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-center text-lg font-semibold mb-2">Validate OTP</h2>
            <p className="text-center text-sm mb-4">OTP has been sent to your Mobile</p>
            <label className="block text-sm font-medium mb-2">Verify Your Number *</label>
            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  className="w-10 h-10 text-center border rounded focus:outline-none"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white rounded py-3 hover:bg-white hover:text-purple-700 border border-purple-700 transition"
            >
              Verify
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-6">
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

export default AuthForm;
