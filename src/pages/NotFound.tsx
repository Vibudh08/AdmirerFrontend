import React from "react";
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 py-10">
      <FaRegSadTear className="text-blue-500 text-6xl mb-4" />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        We couldn’t find the page you were looking for.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
