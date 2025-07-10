// src/AllRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import Stationery from "./pages/Stationery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import BookDetails from "./pages/BookDetails";
import StationeryDetails from "./pages/StationeryDetails";
import OrderNow from "./pages/OrderNow";
import OrderPlaced from "./pages/OrderPlaced";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";

const AllRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/stationery" element={<Stationery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/stationery/:id" element={<StationeryDetails />} />
        <Route path="/order-now" element={<OrderNow />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default AllRoutes;