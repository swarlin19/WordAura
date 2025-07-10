import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const CartContext = createContext();

// Create the provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Get cart from localStorage on first load
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Update quantity of an item
  const updateQuantity = (id, newQty) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => useContext(CartContext);
