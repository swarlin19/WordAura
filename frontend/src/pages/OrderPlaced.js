// src/pages/OrderPlaced.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const OrderPlaced = () => {
  const [orderId, setOrderId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const location = useLocation();
  const { shipping, paymentMethod, cartItems, totalAmount } = location.state || {};

  useEffect(() => {
    const now = Date.now();
    setOrderId("ORD" + now);
    setTransactionId("TXN" + Math.floor(Math.random() * 900000 + 100000));
    setTrackingId("TRK" + Math.floor(Math.random() * 900000 + 100000));
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10 font-poppins flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 sm:p-10 text-center">
        <div className="text-5xl text-green-500 mb-4">✅</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#744c58] mb-2">Order Successful!</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4">Thank you for your purchase.</p>

        <div className="text-sm sm:text-base text-gray-700 space-y-1 mb-6">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Transaction ID:</strong> {transactionId}</p>
          <p><strong>Tracking ID:</strong> {trackingId}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-[#c1dcdc] hover:bg-[#aacccc] text-gray-800 px-5 py-2 rounded-xl font-semibold text-sm sm:text-base transition"
          >
            🛍️ Continue Shopping
          </Link>
          <Link
            to="/order-details"
            state={{
              orderId,
              transactionId,
              trackingId,
              shipping,
              paymentMethod,
              cart: cartItems,
              total: totalAmount
            }}
            className="bg-[#7a1f47] hover:bg-[#5e1635] text-white px-5 py-2 rounded-xl font-semibold text-sm sm:text-base transition"
          >
            📦 View Order Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
