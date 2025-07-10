import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useCart();
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://192.168.117.93:5000/api/books/${id}`);
        setBook(res.data);
        setLoading(false);

        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const alreadyWishlisted = storedWishlist.some(item => item.id === res.data.id);
        setWishlist(alreadyWishlisted);
      } catch (err) {
        console.error('Error fetching book:', err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'inc' && quantity < book.stock) setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    const exists = cartItems.find(item => item.id === book.id);
    if (exists) {
      const updated = cartItems.map(item =>
        item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...book, quantity }]);
    }
    alert('✅ Added to Cart!');
  };

  const handleOrderNow = () => {
    navigate('/order', {
      state: { cartItems: [{ ...book, quantity }] },
    });
  };

  const toggleWishlist = () => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist) {
      const filtered = stored.filter(item => item.id !== book.id);
      localStorage.setItem('wishlist', JSON.stringify(filtered));
      setWishlist(false);
    } else {
      localStorage.setItem('wishlist', JSON.stringify([...stored, book]));
      setWishlist(true);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading book details...</p>;
  }

  if (!book) {
    return (
      <div className="text-center mt-16 text-gray-600">
        <img src="/images/empty-search.png" alt="not found" className="w-48 mx-auto" />
        <p className="mt-4 italic">No book found</p>
        <button
          className="mt-6 px-6 py-2 bg-pink-200 text-pink-800 rounded-lg font-semibold"
          onClick={() => navigate('/books')}
        >
          ← Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-cyan-50 p-6 md:p-10 font-poppins">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-pink-700 hover:underline text-lg font-medium"
      >
        ← Back to Books
      </button>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden transition">
        <div className="md:w-1/2 p-8 bg-pink-50 flex justify-center items-center">
          <img
            src={`/images/${book.image}`}
            alt={book.title}
            className="w-[250px] h-[360px] object-contain rounded-xl shadow-md"
          />
        </div>

        <div className="md:w-1/2 p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl text-pink-700 font-bold">{book.title}</h2>
            <button onClick={toggleWishlist} className="text-3xl">
              {wishlist ? '💖' : '🤍'}
            </button>
          </div>

          <p className="text-lg mb-1"><strong>Author:</strong> {book.author}</p>
          <p className="text-lg mb-1"><strong>Genre:</strong> {book.genre}</p>
          <p className="text-lg mb-1"><strong>Price:</strong> ₹{parseFloat(book.price).toFixed(2)}</p>
          <p className="text-lg mb-4">
            <strong>Stock:</strong>{' '}
            {book.stock > 0 ? `${book.stock} Available` : <span className="text-red-500">Out of Stock</span>}
          </p>

          {book.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => handleQuantity('dec')}
                className="px-3 py-1 rounded-lg text-lg bg-pink-100 hover:bg-pink-200"
              >
                ➖
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantity('inc')}
                className="px-3 py-1 rounded-lg text-lg bg-pink-100 hover:bg-pink-200"
              >
                ➕
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={book.stock === 0}
              className={`px-6 py-3 w-full sm:w-auto rounded-xl font-semibold shadow-md transition ${
                book.stock === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-pink-400 hover:bg-pink-500 text-white'
              }`}
            >
              {book.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              onClick={handleOrderNow}
              className="px-6 py-3 w-full sm:w-auto rounded-xl bg-teal-400 hover:bg-teal-500 text-white font-semibold shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
