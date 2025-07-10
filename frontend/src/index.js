import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext'; // ✅ import your provider
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider> {/* ✅ Wrap App inside the provider */}
    <App />
  </CartProvider>
);
