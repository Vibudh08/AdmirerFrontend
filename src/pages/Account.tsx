import React, { useState } from "react";
import { Link } from "react-router-dom";


const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLoginSubmit = () => {
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/logo/admirer_logo.png" alt="Logo" className="w-28 mx-auto mb-2" />
          <h1 className="text-xl font-light">Welcome to Admirer</h1>
        </div>

        {/* {
          isLogin ? ( */}
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
                className="w-full bg-purple-700 text-white rounded py-3 mt-6 hover:bg-white 
                hover:text-purple-700 border border-purple-700 transition"
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
                <Link to="" className="text-purple-700 font-semibold">
                  Forgot password?
                </Link>
              </div>
            </form>
          {/* ) : (
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
                className="w-full bg-purple-700 text-white rounded py-3 mt-6 hover:bg-white 
                hover:text-purple-700 border border-purple-700 transition"
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
          
        )} */}

        <p className="text-center text-sm mt-6">
          By continuing, I agree to the
          <Link to="" className="text-purple-700 font-bold mx-1">
             Terms of Use 
          </Link>
          &
          <Link to="" className="text-purple-700 font-bold mx-1">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Account;
