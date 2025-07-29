import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

const OrderNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedCartItems = location.state?.cartItems || null;
  const { cartItems: globalCartItems } = useCart();
  const cartItems = passedCartItems || globalCartItems;

  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [upiState, setUpiState] = useState({ show: false, qrData: "", link: "", showQR: false });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSelectSavedAddress = (addr) => {
    setShipping({
      fullName: addr.fullName,
      email: addr.user_email,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      zip: addr.zip,
    });
    setSelectedAddressId(addr.id);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`http://13.60.49.86/api/saved-addresses/${email}`);
        setSavedAddresses(res.data);
        const recent = JSON.parse(localStorage.getItem("selected_address"));
        if (recent) {
          const match = res.data.find(
            (addr) => addr.fullName === recent.fullName && addr.phone === recent.phone &&
                      addr.address === recent.address && addr.city === recent.city && addr.zip === recent.zip
          );
          if (match) {
            handleSelectSavedAddress(match);
            localStorage.removeItem("selected_address");
          } else if (res.data.length > 0) {
            handleSelectSavedAddress(res.data[0]);
          }
        } else if (res.data.length > 0) {
          handleSelectSavedAddress(res.data[0]);
        }
      } catch (err) {
        console.log("No saved addresses found.");
      }
    };
    fetchAddresses();
  }, []);

  const handleGenerateUPI = async () => {
    try {
      const res = await axios.post("http://13.60.49.86/api/generate-upi-link", {
        amount: totalPrice,
        orderId: `order_${Date.now()}`,
      });
      setUpiState({ show: true, qrData: res.data.qrData, link: res.data.upiLink, showQR: true });
    } catch (err) {
      alert("Failed to generate UPI link.");
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const orderResponse = await axios.post("http://13.60.49.86/api/create-order", {
        amount: totalPrice,
        receipt: `order_${Date.now()}`
      });

      const options = {
        key: "rzp_test_EH1UEwLILEPXCj",
        amount: orderResponse.data.order.amount,
        currency: orderResponse.data.order.currency,
        order_id: orderResponse.data.order.id,
        name: "WordAura",
        description: "Book Purchase",
        handler: async function (response) {
          await handlePlaceOrder(response.razorpay_payment_id);
        },
        prefill: {
          name: shipping.fullName,
          email: shipping.email,
          contact: shipping.phone,
        },
        theme: {
          color: "#f190b4"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Failed to initiate Razorpay. Try again.");
      console.error(error);
    }
  };

  const handlePlaceOrder = async (transactionId = null) => {
    const fields = Object.values(shipping);
    if (fields.some((f) => !f)) return alert("Please fill all shipping details.");
    if (paymentMethod === "UPI" && !upiState.show) return alert("Please generate UPI payment QR first.");

    const orderId = `ORD${Date.now()}`;
    const fallbackTransactionId = `TXN${Math.floor(Math.random() * 1000000000)}`;
    const trackingId = `TRK${Math.floor(Math.random() * 1000000)}`;

    try {
      

      navigate("/order-placed", {
        state: {
          shipping,
          paymentMethod,
          cartItems,
          totalAmount: totalPrice,
          upiQR: upiState.qrData,
          orderId,
          transactionId: transactionId || fallbackTransactionId,
          trackingId,
        },
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-cyan-50 min-h-screen p-4 sm:p-6 font-poppins">
  <div className="w-full max-w-5xl mx-auto bg-pink-50 rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl">

    {/* Address Section */}
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-pink-900 mb-4">📍 Deliver To Address</h2>
      {savedAddresses.map((addr) => (
        <label
          key={addr.id}
          className="block bg-pink-50 border border-pink-200 rounded-xl p-4 mb-3 cursor-pointer hover:bg-pink-100 text-sm sm:text-base"
        >
          <input
            type="radio"
            name="savedAddress"
            checked={selectedAddressId === addr.id}
            onChange={() => handleSelectSavedAddress(addr)}
            className="mr-2"
          />
          <span>
            <strong>{addr.fullName}</strong> ({addr.user_email})<br />
            📞 {addr.phone} <br /> 📦 {addr.address}, {addr.city} - {addr.zip}
          </span>
        </label>
      ))}
      <Link
        to="/add-address"
        className="text-sm text-emerald-800 font-medium underline mt-2 inline-block"
      >
        ➕ Use a different address
      </Link>
    </div>

    {/* Payment Section */}
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-pink-900 mb-4">💳 Payment Method</h2>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 text-sm sm:text-base"
      >
        <option>Cash On Delivery</option>
        <option>Credit/Debit Card</option>
        <option>UPI</option>
        <option>Net Banking</option>
        <option value="razorpay">Razorpay</option>
      </select>

      {paymentMethod === "UPI" && (
        <>
          <button
            onClick={handleGenerateUPI}
            className="mt-4 bg-pink-200 hover:bg-pink-300 text-pink-900 font-semibold py-2 px-6 rounded-lg text-sm sm:text-base"
          >
            Generate UPI QR
          </button>
          {upiState.showQR && (
            <div className="flex flex-col items-center mt-4">
              <QRCodeSVG value={upiState.qrData} size={160} />
              <p className="text-sm text-gray-600 mt-2">Scan to Pay</p>
            </div>
          )}
        </>
      )}
    </div>

    {/* Order Summary Section */}
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow mb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-pink-900 mb-4">🛍️ Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between py-2 text-gray-800 text-sm sm:text-base">
          <span>{item.title || item.name} × {item.quantity}</span>
          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <h3 className="text-right font-bold text-lg mt-4">Total: ₹{totalPrice.toFixed(2)}</h3>
    </div>

    {/* Place Order Button */}
    <div className="flex justify-end">
      <button
        onClick={() => {
          if (paymentMethod === "razorpay") {
            handleRazorpayPayment();
          } else if (paymentMethod === "UPI" && upiState.show) {
            handlePlaceOrder();
          } else if (paymentMethod !== "UPI") {
            handlePlaceOrder();
          }
        }}
        disabled={paymentMethod === "UPI" && !upiState.show}
        className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold shadow-md text-white text-sm sm:text-base transition ${
          paymentMethod === "UPI" && !upiState.show
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-pink-400 hover:bg-pink-500"
        }`}
      >
        {paymentMethod === "UPI"
          ? "Complete UPI Payment"
          : paymentMethod === "razorpay"
          ? "Pay with Razorpay"
          : "Place Order"}
      </button>
    </div>

  </div>
</div>

  );
};

export default OrderNow;