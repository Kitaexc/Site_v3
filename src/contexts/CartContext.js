import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (car) => {
    const item = cartItems.find(item => item.id === car.id);
    if (item) {
      setCartItems(cartItems.map(item =>
        item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...car, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item.quantity > 1) {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
