import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [imageMap, setImageMap] = useState({});
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🔥 Fetch base64 images
  useEffect(() => {
    const fetchImages = async () => {
      for (const item of cartItems) {
        if (item.image && !imageMap[item.image]) {
          try {
            const res = await axios.get(`http://13.60.49.86:5000/api/image-base64/${item.image}`);
            setImageMap((prev) => ({ ...prev, [item.image]: res.data.image }));
          } catch (err) {
            console.error("Failed to load image", err);
          }
        }
      }
    };

    fetchImages();
  }, [cartItems, imageMap]);

  const handlePlaceOrder = () => {
    const orderData = {
      orderId: "WA" + Date.now(),
      orderDate: new Date().toLocaleDateString(),
      transactionId: "TXN" + Math.floor(Math.random() * 100000),
      trackingId: "TRK" + Math.floor(Math.random() * 100000),
      customer: {
        name: "Swarlin B",
        email: "swarlin@example.com",
        phone: "9876543210",
      },
      address: {
        line1: "No 5, Main Street",
        city: "Chennai",
        pincode: "600001",
      },
      items: cartItems,
      total: totalPrice,
      paymentMethod: "UPI",
      deliveryEstimate: "June 18 - June 20",
      status: "Paid",
    };

    navigate("/order", { state: orderData });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-pink-50 to-cyan-50 font-poppins">
      <h1 className="text-center text-4xl font-cursive text-pink-900 mb-8">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty 😢</p>
          <Link
            to="/"
            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium py-2 px-5 rounded-lg"
          >
            🛍️ Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row bg-pink-50 shadow-md rounded-xl p-4 gap-4 hover:shadow-lg transition"
              >
                <img
                  src={
                    imageMap[item.image] ||
                    "https://via.placeholder.com/120x160?text=Loading..."
                  }
                  alt={item.title || item.name}
                  className="w-[120px] h-[160px] object-cover rounded-lg shadow"
                />
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title || item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {item.author || item.brand || item.type}
                  </p>
                  <p className="text-base font-medium text-gray-700">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="bg-cyan-100 hover:bg-cyan-200 px-3 py-1 rounded text-lg font-bold"
                    >
                      ➖
                    </button>
                    <span className="min-w-[20px] text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-cyan-100 hover:bg-cyan-200 px-3 py-1 rounded text-lg font-bold"
                    >
                      ➕
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 inline-flex items-center gap-2 text-red-600 bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition text-sm"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-blue-50 p-6 rounded-xl shadow text-right">
            <h2 className="text-2xl font-bold text-pink-700 mb-4">
              Total: ₹{totalPrice}
            </h2>
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Link
                to="/"
                className="bg-sky-100 hover:bg-sky-200 text-gray-800 font-medium px-5 py-2 rounded-lg"
              >
                🔁 Continue Shopping
              </Link>
              <button
                onClick={handlePlaceOrder}
                className="bg-pink-300 hover:bg-pink-400 text-white font-bold px-6 py-2 rounded-lg"
              >
                ✅ Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
