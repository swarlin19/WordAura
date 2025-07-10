import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-emerald-50 px-4 py-12 font-poppins">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-vibes text-pink-600 text-center mb-3">💌 Contact WordAura</h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Have a question, feedback, or just want to say hi? We’d love to hear from you!
          </p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-md transition duration-300"
              >
                ✉️ Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
