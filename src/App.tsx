import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";
import Complete_cart_checkout from "./pages/order-cycle";
import OrderPage from "./components/dashboard-orders";
import Dashboard_Profile from "./components/dashboard-profile";
import OrderDetails from "./components/dashboard-orders/OrderDetails";
import Dashboard from "./pages/Dashboard";
import ProductItem from "./components/product-listing/product-item";
import LeftSideBar from "./components/product-listing/left-side-bar";
import ProductListing from "./pages/product-listing";
import ProductDetails from "./pages/ProductDetail";

function App() {
  const [currentRoute, setCurrentRoute] = useState("/");
  function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
      setCurrentRoute(location.pathname);
    }, [location]);

    return null;
  }

  return (
    <>
      <BrowserRouter>
        <Layout>
          <RouteTracker />
          {currentRoute !== "/SignUp" && currentRoute !== "/LogIn" && (
            <Header />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/test" element={<ProductDetails/>} />
            <Route path="/dashboard_profile" element={<Dashboard_Profile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/cart" element={<Complete_cart_checkout />} />
            <Route path="/test3" element={<ProductListing />} />
            <Route path="/left" element={<LeftSideBar />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          {currentRoute !== "/SignUp" && currentRoute !== "/LogIn" && (
            <Footer />
          )}
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
