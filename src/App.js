import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import FavoritesPage from './components/FavoritesPage';
import CatalogPage from './components/CatalogPage';
import Header from './components/Header';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;

