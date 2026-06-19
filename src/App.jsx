

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Recommendation from "./components/Recommendation";
import Features from "./components/Features";
import Products from "./components/Products";
import Benefits from "./components/Benefits";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";


function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.substring(1)
      );

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      }
    }
  }, [location]);

  return null;
}


function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Recommendation />
      <Features />
      <Products />
      <Benefits />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToHash />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </>
  );
}