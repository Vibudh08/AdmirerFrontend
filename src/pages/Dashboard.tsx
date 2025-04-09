import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Dashboard_Profile from "../components/dashboard-profile";
import OrderPage from "../components/dashboard-orders";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile"); // default is profile

  return (
    <div className="p-6 max-sm:p-0 w-[85%] mt-1 max-sm:mt-5 max-md:w-[100%] m-auto flex max-sm:block gap-5">
      <div className="w-[35%] max-sm:w-[100%] max-sm:m-auto flex flex-col gap-5">
        {/* Top Greeting Section */}
        <div className="bg-white p-4 flex gap-5 shadow-md items-center">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            alt=""
          />
          <span className="font-semibold text-lg text-[#212121]">Hello</span>
        </div>

        {/* Sidebar Navigation */}
        <div className="bg-white p-4 flex flex-col shadow-md items-start">
          <div className="gap-3 font-semibold text-[#212121] items-center mb-3 p-2 text-[16px] flex w-full">
            <FaUserAlt className="w-5 h-5 mr-1 text-[#7B48A5]" />
            <span className="mt-1 select-none">ACCOUNT DETAILS</span>
          </div>

          {/* Sidebar Items */}
          <div
            onClick={() => setActiveSection("profile")}
            className={`p-3 pl-12 w-full  cursor-pointer select-none ${
              activeSection === "profile"
                ? "bg-purple-200 text-purple-700 font-semibold"
                : "hover:bg-purple-200 hover:text-purple-700"
            }`}
          >
            Profile
          </div>
          <div
            onClick={() => setActiveSection("orders")}
            className={`p-3 pl-12 w-full  cursor-pointer select-none ${
              activeSection === "orders"
                ? "bg-purple-200 text-purple-700 font-semibold"
                : "hover:bg-purple-200 hover:text-purple-700"
            }`}
          >
            My Orders
          </div>
          <div className="p-3 pl-12 w-full hover:bg-purple-200 select-none hover:text-purple-700 cursor-pointer">
            Logout
          </div>
        </div>
      </div>

      {/* Right Side Section */}
      <div className="w-[65%] max-sm:w-[100%] m-auto">
        {activeSection === "profile" && <Dashboard_Profile />}
        {activeSection === "orders" && <OrderPage />}
      </div>
    </div>
  );
};

export default Dashboard;
