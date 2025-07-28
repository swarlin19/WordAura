import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const StationeryPage = () => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageMap, setImageMap] = useState({}); // 🔥 Store base64 images

  const { type: typeParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 Fetch image inside to avoid ESLint warning
    const fetchBase64Image = async (filename) => {
      if (!filename || imageMap[filename]) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/image-base64/${filename}`);
        setImageMap((prev) => ({ ...prev, [filename]: res.data.image }));
      } catch (err) {
        console.error(`Failed to load image ${filename}`, err);
      }
    };

    const fetchItems = async () => {
      try {
        const endpoint = typeParam ? `/api/stationery/type/${typeParam}` : '/api/stationery';
        const res = await axios.get(`http://localhost:5000${endpoint}`);
        setItems(res.data);
        setType(typeParam || 'all');

        // 🔥 Load base64 images
        res.data.forEach((item) => {
          fetchBase64Image(item.image);
        });
      } catch (error) {
        console.error('Error fetching stationery:', error);
      }
    };

    fetchItems();
  }, [typeParam, imageMap]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-10 py-8 bg-[#fff9f0] min-h-screen font-poppins">
        <h2 className="text-center text-3xl font-bold mb-8 text-pink-800">✍️ Explore Stationery</h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <label htmlFor="type-select" className="text-gray-700 font-medium">Type:</label>
            <select
              id="type-select"
              value={type}
              onChange={(e) => {
                const selectedType = e.target.value;
                navigate(selectedType === 'all' ? '/stationery' : `/stationery/${selectedType}`);
              }}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 outline-none w-[180px]"
            >
              <option value="all">All</option>
              <option value="notebook">Notebook</option>
              <option value="pens">Pens</option>
              <option value="stickynotes">Sticky Notes</option>
              <option value="highlighter">Highlighter</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 outline-none w-[180px]"
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <img
              src="/images/empty-search.png"
              alt="No items"
              className="w-52 h-52 object-contain"
            />
            <p className="text-gray-500 italic mt-4">No stationery items found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/stationery/details/${item.id}`)}
                className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between max-w-xs w-full mx-auto h-[440px]"
              >
                <div className="h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={
                      imageMap[item.image] ||
                      "https://via.placeholder.com/160x200?text=Loading..."
                    }
                    alt={item.name}
                    className="h-full object-contain"
                  />
                </div>

                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-500 italic">{item.brand || "Standard Brand"}</p>
                  <p className="text-pink-600 font-medium mt-1">₹ {parseFloat(item.price).toFixed(2)}</p>
                  <p className={`text-sm mt-1 ${item.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/stationery/details/${item.id}`);
                  }}
                  className="mt-3 py-2 bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-full text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StationeryPage;
