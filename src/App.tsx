import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";
import Cart from "./components/cart-checkout/cart";
import Complete_cart_checkout from "./components/order-cycle/";
import ProductItem from "./components/product-listing/product-item";

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
            <Route path="/test" element={<Cart />} />
            <Route path="/cart" element={<Complete_cart_checkout />} />
            <Route
              path="/test2"
              element={
                <ProductItem
                  name="Jwellery"
                  price="120000"
                  description="very costly but value of money"
                  originalPrice="240000"
                  discount="50"
                />
              }
            />
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
