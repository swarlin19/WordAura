import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-emerald-50 px-4 py-10 font-poppins">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-4xl font-vibes text-pink-600 mb-4">✨ About WordAura</h2>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Welcome to <span className="text-pink-500 font-semibold">WordAura</span> – your cozy corner for all things 
            <span className="text-emerald-500"> books </span>and 
            <span className="text-emerald-500"> stationery</span>!
          </p>

          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Our mission is to spread the joy of reading and writing through a carefully curated collection that 
            sparks creativity and productivity.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a bookworm 📚 or a stationery lover ✏️, <strong className="text-pink-500">WordAura</strong> 
            is here to inspire, organize, and uplift your everyday life.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
