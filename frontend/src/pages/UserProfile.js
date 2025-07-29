import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
      await axios.delete("http://13.60.49.86:5000/api/delete-user", {
        data: { email: user.email },
      });
      alert("Account deleted successfully.");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 py-12 px-4 font-poppins">
      <div className="bg-gradient-to-br from-pink-200 to-cyan-100 p-6 rounded-2xl text-center shadow mb-10">
        <h1 className="text-pink-800 text-3xl font-vibes">🌸 Welcome back to WordAura 🌸</h1>
      </div>

      <div className="bg-white/80 backdrop-blur-md max-w-3xl mx-auto p-8 rounded-3xl shadow-lg animate-fadeIn">
        <div className="w-24 h-24 bg-pink-200 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-md -mt-20 mb-4">
          {user?.fullName?.[0]?.toUpperCase() || "U"}
        </div>
        <h2 className="text-center text-2xl text-pink-800 font-semibold mb-6 font-vibes">My Profile</h2>

        <div className="text-center text-gray-700 space-y-2">
          <p><strong className="text-pink-700">Name:</strong> {user.fullName}</p>
          <p><strong className="text-pink-700">Email:</strong> {user.email}</p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mt-6">
          <button
            onClick={handleLogout}
            className="bg-pink-300 hover:bg-pink-400 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            🚪 Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            🗑️ Delete Account
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-green-200 hover:bg-green-300 text-gray-800 px-5 py-2 rounded-lg font-semibold shadow"
          >
            🏠 Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
