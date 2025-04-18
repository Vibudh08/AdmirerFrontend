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
import Dashboard_Profile from "./components/dashboard-profile";
import OrderDetails from "./components/dashboard-orders/OrderDetails";
import Dashboard from "./pages/Dashboard";
import ProductListing from "./pages/product-listing";
import ProductDetails from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ReturnRefund from "./pages/ReturnRefund";
import ExchangePolicy from "./pages/ExchangePolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import HelpContact from "./pages/Help_Faqs";
import BlogPage from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import AboutPage from "./pages/About";


function App() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [categoryId, setCategoryId] = useState("");
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
            <Route path="/" element={<Home setCategoryId={setCategoryId} />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard_profile" element={<Dashboard_Profile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/cart" element={<Complete_cart_checkout />} />
            <Route path="/listing" element={<ProductListing category={categoryId} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/return" element={<ReturnRefund />} />
            <Route path="/exchange" element={<ExchangePolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/help_faq" element={<HelpContact />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />
            <Route path="/about" element={<AboutPage />} />
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
