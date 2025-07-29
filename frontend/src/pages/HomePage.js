// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const genreImages = [
  { genre: "romance", label: "Romance", img: "romance.png" },
  { genre: "horror", label: "Horror", img: "horror.png" },
  { genre: "thriller", label: "Thriller", img: "thriller.png" },
  { genre: "comedy", label: "Comedy", img: "comedy.png" },
  { genre: "motivation", label: "Motivation", img: "motivation.png" },
];

const stationeryImages = [
  { type: "Pens", label: "Pens", img: "pens.jpg" },
  { type: "Notebook", label: "Notebook", img: "journals.jpg" },
  { type: "Sticky Notes", label: "Sticky Notes", img: "notes.jpeg" },
  { type: "Highlighters", label: "Highlighters", img: "highlighters.jpg" },
];

const HomePage = () => {
  const [genreImgs, setGenreImgs] = useState({});
  const [stationeryImgs, setStationeryImgs] = useState({});

  const fetchImage = async (filename) => {
    const res = await axios.get(`http://13.60.49.86:5000/api/image-base64/${filename}`);
    return res.data.image;
  };

  useEffect(() => {
    const loadImages = async () => {
      const genreObj = {};
      const stationeryObj = {};

      for (let item of genreImages) {
        genreObj[item.img] = await fetchImage(item.img);
      }

      for (let item of stationeryImages) {
        stationeryObj[item.img] = await fetchImage(item.img);
      }

      setGenreImgs(genreObj);
      setStationeryImgs(stationeryObj);
    };

    loadImages();
  }, []);

  return (
    <div className="bg-[#d9f2e6] font-poppins min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center pt-24 pb-16 px-4 bg-[#fef8fb]">
        <h1 className="text-4xl sm:text-5xl font-vibes text-[#744c58] mb-4 leading-snug">
          Discover Magic in Every Page & <span className="text-[#b76e79]">Pen</span>
        </h1>
        <p className="text-lg text-[#666] max-w-xl mx-auto mb-8">
          Your cozy corner for books and creative essentials.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/books">
            <button className="bg-[#f7c9d4] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              📚 Explore Books
            </button>
          </Link>
          <Link to="/stationery">
            <button className="bg-[#cde9db] text-[#333] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              ✏️ Browse Stationery
            </button>
          </Link>
        </div>
      </section>

      {/* Book Genres */}
      <section className="px-4">
        <h2 className="text-center font-vibes text-3xl mt-12 text-[#744c58] mb-6">
          Explore by Book Genre
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center max-w-6xl mx-auto">
          {genreImages.map(({ genre, label, img }) => (
            <Link key={genre} to={`/books/${genre}`} className="text-center">
              <img
                src={genreImgs[img]}
                alt={label}
                className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-xl object-cover shadow hover:scale-105 transition mx-auto"
              />
              <p className="mt-2 font-medium text-[#555]">{label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stationery Preview */}
      <section className="px-4">
        <h2 className="text-center font-vibes text-3xl mt-12 text-[#744c58] mb-6">
          Stationery Preview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center max-w-6xl mx-auto">
          {stationeryImages.map(({ type, label, img }) => (
            <Link key={type} to={`/stationery/${type}`} className="text-center">
              <img
                src={stationeryImgs[img]}
                alt={label}
                className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-xl object-cover shadow hover:scale-105 transition mx-auto"
              />
              <p className="mt-2 font-medium text-[#555]">{label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 mt-12 bg-white text-sm text-[#444]">
        © 2025 <span className="font-vibes text-[#b76e79] text-lg">WordAura</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
