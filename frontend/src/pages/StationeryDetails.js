import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const StationeryDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    const fetchStationery = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stationery/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Error fetching stationery item:", err);
      }
    };
    fetchStationery();
  }, [id]);

  useEffect(() => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const found = wishlistItems.find((w) => w.id === parseInt(id));
    setWishlist(!!found);
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < item.stock) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const exists = cartItems.find((cartItem) => cartItem.id === item.id);
    if (exists) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
    alert(`Added ${quantity} to cart!`);
  };

  const handleOrderNow = () => {
    navigate("/order", {
      state: {
        cartItems: [{ ...item, quantity }],
      },
    });
  };

  const toggleWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlistItems.find((w) => w.id === item.id);
    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlistItems.filter((w) => w.id !== item.id);
      setWishlist(false);
      alert("Removed from Wishlist");
    } else {
      updatedWishlist = [...wishlistItems, item];
      setWishlist(true);
      alert("Added to Wishlist");
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (!item) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-pink-50 to-emerald-50 min-h-screen px-4 py-6 font-poppins">
      <button
        onClick={() => navigate(-1)}
        className="text-pink-600 hover:underline mb-6 text-lg"
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Image */}
        <div className="md:w-1/2 bg-pink-50 flex items-center justify-center p-6">
          <img
            src={`/images/${item.image}`}
            alt={item.name}
            className="w-[250px] h-[350px] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Right Details */}
        <div className="md:w-1/2 p-6 md:p-10">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-pink-700">{item.name}</h2>
            <button onClick={toggleWishlist} className="text-2xl">
              {wishlist ? <FaHeart className="text-pink-500" /> : <FaRegHeart className="text-gray-400" />}
            </button>
          </div>

          <p className="text-gray-700 text-lg mb-1"><strong>Type:</strong> {item.type}</p>
          <p className="text-gray-700 text-lg mb-1"><strong>Brand:</strong> {item.brand}</p>
          <p className="text-pink-600 text-xl font-semibold mt-1">₹{parseFloat(item.price).toFixed(2)}</p>
          <p className={`text-sm mt-1 ${item.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {item.stock > 0 ? `Stock: ${item.stock}` : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          {item.stock > 0 && (
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="bg-pink-200 px-3 py-1 rounded-lg hover:bg-pink-300"
              >
                ➖
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="bg-pink-200 px-3 py-1 rounded-lg hover:bg-pink-300"
              >
                ➕
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              disabled={item.stock === 0}
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                item.stock === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-pink-400 hover:bg-pink-500 text-white"
              }`}
            >
              {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              onClick={handleOrderNow}
              className="w-full py-3 rounded-xl bg-emerald-300 hover:bg-emerald-400 text-emerald-900 font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationeryDetails;
