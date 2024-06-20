import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToFavorites = (car) => {
    if (!favoriteItems.some(item => item.id === car.id)) {
      setFavoriteItems([...favoriteItems, car]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavoriteItems(favoriteItems.filter(item => item.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
