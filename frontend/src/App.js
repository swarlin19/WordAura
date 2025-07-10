import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import BooksPage from './pages/BooksPage';
import BookDetails from "./pages/BookDetails";
import CartPage from './pages/CartPage';
import StationeryPage from "./pages/StationeryPage";
import StationeryDetails from './pages/StationeryDetails';
import OrderNow from './pages/OrderNow';
import OrderPlaced from './pages/OrderPlaced';
import OrderDetails from './pages/OrderDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';
import AddAddress from "./pages/AddAddress";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:genre" element={<BooksPage />} />
          <Route path="/books/details/:id" element={<BookDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/stationery" element={<StationeryPage />} />
          <Route path="/stationery/:type" element={<StationeryPage />} />
          <Route path="/stationery/details/:id" element={<StationeryDetails />} />
          <Route path="/order" element={<OrderNow />} />
          <Route path="/order-placed" element={<OrderPlaced />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-address" element={<AddAddress />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;