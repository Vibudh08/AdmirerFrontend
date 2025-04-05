import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Cart from "./components/cart-checkout/cart";

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
        <RouteTracker />
        {currentRoute !== "/SignUp" && currentRoute !== "/LogIn" && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/test" element={<Cart />} />
        </Routes>
        {currentRoute !== "/SignUp" && currentRoute !== "/LogIn" && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
