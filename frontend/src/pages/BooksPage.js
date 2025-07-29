import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageMap, setImageMap] = useState({}); // 🔥 Store base64 images

  const { genre: genreParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Move this inside to avoid ESLint warning
    const fetchBase64Image = async (filename) => {
      if (!filename || imageMap[filename]) return;

      try {
        const res = await axios.get(`http://13.60.49.86:5000/api/image-base64/${filename}`);
        setImageMap((prev) => ({ ...prev, [filename]: res.data.image }));
      } catch (err) {
        console.error(`Failed to load image ${filename}`, err);
      }
    };

    const fetchBooks = async () => {
      try {
        const endpoint = genreParam ? `/api/books/genre/${genreParam}` : '/api/books';
        const res = await axios.get(`http://13.60.49.86:5000${endpoint}`);
        setBooks(res.data);
        setGenre(genreParam || 'all');

        // 🔥 Load base64 images
        res.data.forEach((book) => {
          fetchBase64Image(book.image);
        });
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [genreParam, imageMap]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-10 py-8 bg-[#fff9f0] min-h-screen font-poppins">
        <h2 className="text-center text-3xl font-bold mb-8 text-pink-800">
          📚 Explore Our Book Collection
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <label htmlFor="genre-select" className="text-gray-700 font-medium">Genre:</label>
            <select
              id="genre-select"
              value={genre}
              onChange={(e) => {
                const selectedGenre = e.target.value;
                navigate(selectedGenre === 'all' ? '/books' : `/books/${selectedGenre}`);
              }}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 outline-none w-[180px]"
            >
              <option value="all">All</option>
              <option value="romance">Romance</option>
              <option value="horror">Horror</option>
              <option value="comedy">Comedy</option>
              <option value="thriller">Thriller</option>
              <option value="motivation">Motivation</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 outline-none w-[180px]"
          />
        </div>

        {filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <img
              src="/images/empty-search.png"
              alt="No books"
              className="w-52 h-52 object-contain"
            />
            <p className="text-gray-500 italic mt-4">No books found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/books/details/${book.id}`)}
                className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between max-w-xs w-full mx-auto h-[440px]"
              >
                <div className="h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={
                      imageMap[book.image] ||
                      "https://via.placeholder.com/160x200?text=Loading..."
                    }
                    alt={book.title}
                    className="h-full object-contain"
                  />
                </div>

                <div className="mt-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-700">{book.title}</h3>
                  <p className="text-sm text-gray-500 italic">by {book.author}</p>
                  <p className="text-pink-600 font-medium mt-1">
                    ₹ {parseFloat(book.price).toFixed(2)}
                  </p>
                  <p className={`text-sm mt-1 ${book.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/books/details/${book.id}`);
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

export default BooksPage;
