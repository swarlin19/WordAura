// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const count = JSON.parse(localStorage.getItem('wishlist'))?.length || 0;
    setWishlistCount(count);
  }, [location]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Books", path: "/books" },
    { label: "Stationery", path: "/stationery" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#eaf6f0] sticky top-0 z-50 shadow-md px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between font-poppins">
      
      {/* Logo */}
      <Link to="/" className="font-vibes text-3xl text-[#d45c9c] border-2 border-[#d45c9c] px-4 py-1 rounded-lg">
        WordAura
      </Link>

      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} className="stroke-[#d45c9c]" /> : <Menu size={26} className="stroke-[#d45c9c]" />}
        </button>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-6 text-[#d45c9c] font-medium">
        {navLinks.map(({ label, path }) => (
          <Link key={label} to={path} className="relative group">
            {label}
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#d45c9c] group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>

      {/* Right Icons */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative cursor-pointer" onClick={() => navigate('/wishlist')}>
          <Heart size={22} className="stroke-[#d45c9c]" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#d45c9c] text-white text-xs rounded-full px-[6px]">
              {wishlistCount}
            </span>
          )}
        </div>

        <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
          <ShoppingCart size={22} className="stroke-[#d45c9c]" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#d45c9c] text-white text-xs rounded-full px-[6px]">
              {totalItems}
            </span>
          )}
        </div>

        <div className="cursor-pointer" onClick={() => navigate('/profile')}>
          <User size={22} className="stroke-[#d45c9c]" />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-[#fef8fb] shadow-md py-4 px-6 z-50 text-[#d45c9c] text-center font-medium space-y-4 transition-all">
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)} className="block">
              {label}
            </Link>
          ))}
          <div className="flex justify-center gap-6 mt-4">
            <Heart onClick={() => { navigate('/wishlist'); setMenuOpen(false); }} className="stroke-[#d45c9c]" />
            <ShoppingCart onClick={() => { navigate('/cart'); setMenuOpen(false); }} className="stroke-[#d45c9c]" />
            <User onClick={() => { navigate('/profile'); setMenuOpen(false); }} className="stroke-[#d45c9c]" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
