import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-50 to-blue-50 font-poppins px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-gray-700 text-lg">Thank you for your order. We hope you enjoy your products!</p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/billing"
          className="bg-cyan-100 hover:bg-cyan-200 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          📄 Billing Details
        </Link>
        <Link
          to="/"
          className="bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium py-2 px-6 rounded-lg shadow-sm transition duration-200"
        >
          🛍️ Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
