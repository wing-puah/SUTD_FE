import { useState, useMemo } from 'react';

export const FAVORITES = 'favorites';
const allFavourites = localStorage.getItem(FAVORITES);

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() =>
    allFavourites ? JSON.parse(allFavourites) : []
  );

  const allFavoriteId = useMemo(() => favorites.map((el) => el.id), [favorites]);

  const reinitFavorites = async () => {
    setFavorites(() => []);
    const _retrievedFavorites = await localStorage.getItem(FAVORITES);

    setFavorites(() => {
      return _retrievedFavorites ? JSON.parse(_retrievedFavorites) : [];
    });
  };

  const addFavorites = (data) =>
    setFavorites((prevData) => {
      const newData = [...prevData, data];
      localStorage.setItem(FAVORITES, JSON.stringify(newData));
      return newData;
    });

  const removeFavorites = (data) =>
    setFavorites((prevData) => {
      const newData = prevData.filter((cat) => cat.id !== data.id);
      localStorage.setItem(FAVORITES, JSON.stringify(newData));
      return newData;
    });

  const toggleFavorites = (type, data) => {
    if (type === 'like') {
      addFavorites(data);
      return;
    }
    removeFavorites(data);
  };

  return {
    reinitFavorites,
    favorites,
    addFavorites,
    removeFavorites,
    toggleFavorites,
    allFavoriteId,
  };
};
