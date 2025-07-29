import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [imageMap, setImageMap] = useState({}); // 🔥 map to store base64 images

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(items);

    const fetchImages = async () => {
      for (const item of items) {
        if (item.image && !imageMap[item.image]) {
          try {
            const res = await axios.get(`http://13.60.49.86:5000/api/image-base64/${item.image}`);
            setImageMap((prev) => ({ ...prev, [item.image]: res.data.image }));
          } catch (err) {
            console.error(`Failed to load image: ${item.image}`, err);
          }
        }
      }
    };

    fetchImages();
  }, [imageMap]);

  const handleRemove = (index) => {
    const updated = [...wishlistItems];
    updated.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e0f7fa] to-[#fef6fb] py-12 px-4 font-poppins">
      <h2 className="text-center text-3xl text-[#7a1f47] font-vibes mb-8">
        ❤️ My Wishlist
      </h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-600 text-center">No items in your wishlist.</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div
              key={index}
              className="w-[260px] bg-[#ffe9f4] rounded-2xl p-4 text-center shadow-lg flex flex-col justify-between transition-transform hover:-translate-y-1"
            >
              <img
                src={
                  imageMap[item.image] ||
                  "https://via.placeholder.com/160x180?text=Loading..."
                }
                alt={item.title || item.name}
                className="w-full h-[180px] object-contain rounded-xl mb-4"
              />
              <h3 className="text-base font-semibold text-[#4b2042]">
                {item.title || item.name}
              </h3>
              <p className="text-sm font-semibold text-gray-700 my-2">
                ₹{parseFloat(item.price).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(index)}
                className="mt-2 bg-[#f7c9d4] hover:bg-[#f49bbb] text-white py-2 px-4 rounded-lg font-medium"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        className="block mx-auto mt-12 bg-[#cde9db] hover:bg-[#b2dfc4] text-[#333] py-3 px-6 rounded-xl text-lg font-semibold"
      >
        🏠 Back to Home
      </button>
    </div>
  );
};

export default Wishlist;
