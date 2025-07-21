import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('email', res.data.user.email);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 to-teal-100 font-poppins">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-pink-800 mb-6">🔐 Login to WordAura</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-200 text-pink-900 font-semibold py-2 rounded-xl hover:bg-pink-300 transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Signup
            </span>
          </p>

          <p className="text-sm text-center mt-1">
            Forgot password?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Reset here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
