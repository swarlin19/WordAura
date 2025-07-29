import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";

const OrderDetails = () => {
  const location = useLocation();
  const {
    orderId,
    transactionId,
    trackingId,
    paymentMethod,
    shipping,
    cart,
    total,
  } = location.state || {};

  const [imageMap, setImageMap] = useState({});
  const estimatedDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const fetchImages = async () => {
      for (const item of cart || []) {
        if (item.image && !imageMap[item.image]) {
          try {
            const res = await axios.get(
              `http://13.60.49.86/api/image-base64/${item.image}`
            );
            setImageMap((prev) => ({
              ...prev,
              [item.image]: res.data.image,
            }));
          } catch (err) {
            console.error(`Error loading image ${item.image}`, err);
          }
        }
      }
    };

    fetchImages();
  }, [cart, imageMap]);

  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("WordAura - Invoice", 20, 20);
    doc.setFontSize(12);
    doc.setTextColor(80);

    doc.text(`Order ID: ${orderId}`, 20, 40);
    doc.text(`Transaction ID: ${transactionId}`, 20, 50);
    doc.text(`Tracking ID: ${trackingId}`, 20, 60);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 70);

    doc.text("Shipping Details", 20, 90);
    doc.text(`Name: ${shipping?.fullName}`, 20, 100);
    doc.text(`Email: ${shipping?.email}`, 20, 110);
    doc.text(`Phone: ${shipping?.phone}`, 20, 120);
    doc.text(
      `Address: ${shipping?.address}, ${shipping?.city} - ${shipping?.zip}`,
      20,
      130
    );

    doc.text("Order Summary", 20, 150);
    let y = 160;
    cart?.forEach((item) => {
      doc.text(
        `${item.title || item.name} x ${item.quantity} - ₹${
          item.price * item.quantity
        }`,
        20,
        y
      );
      y += 10;
    });

    doc.setFont(undefined, "bold");
    doc.text(`Total: ₹${total}`, 20, y + 10);
    doc.setFont(undefined, "normal");
    doc.text(`Estimated Delivery: ${estimatedDate.toDateString()}`, 20, y + 20);

    doc.save("WordAura_Invoice.pdf");
  };

  if (!orderId) {
    return (
      <p className="text-center py-12 text-gray-500">Order not found</p>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10 font-poppins">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-pink-700 border-b pb-2 mb-6">
          🧾 Order Details
        </h2>

        {/* Order Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-2">
            Order Information
          </h3>
          <p>
            <span className="font-medium">Order ID:</span> {orderId}
          </p>
          <p>
            <span className="font-medium">Transaction ID:</span>{" "}
            {transactionId}
          </p>
          <p>
            <span className="font-medium">Tracking ID:</span> {trackingId}
          </p>
          <p>
            <span className="font-medium">Payment Method:</span>{" "}
            {paymentMethod}
          </p>
        </div>

        {/* Shipping Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-2">
            Shipping Details
          </h3>
          <p>
            <span className="font-medium">Full Name:</span>{" "}
            {shipping?.fullName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {shipping?.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {shipping?.phone}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {shipping?.address}, {shipping?.city} - {shipping?.zip}
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-pink-600 mb-3">
            Order Summary
          </h3>
          {cart?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    imageMap[item.image] ||
                    "https://via.placeholder.com/60x80?text=Loading..."
                  }
                  alt={item.title || item.name}
                  className="w-14 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">
                    {item.title || item.name} × {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <p className="text-gray-700 mt-2">
            <span className="font-medium">Estimated Delivery:</span>{" "}
            {estimatedDate.toDateString()}
          </p>
        </div>

        {/* Download Button */}
        <div className="text-center sm:text-right">
          <button
            onClick={downloadInvoice}
            className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition shadow-md"
          >
            📥 Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
