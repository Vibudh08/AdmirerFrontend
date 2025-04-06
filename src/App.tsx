import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";
import Index from "./components/cart-checkout/checkout/Index";
import Coupons_screen from "./components/coupons/Coupons_screen";

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
            <Route path="/cart" element={<Index/>} />
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
