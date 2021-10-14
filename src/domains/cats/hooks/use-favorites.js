import { useState, useMemo } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const allFavoriteId = useMemo(() => favorites.map((el) => el.id), [favorites]);

  const addFavorites = (data) =>
    setFavorites((prevData) => {
      const newData = [...prevData, data];
      return newData;
    });

  const removeFavorites = (data) =>
    setFavorites((prevData) => {
      const newData = prevData.filter((cat) => cat.id !== data.id);
      return newData;
    });

  return { favorites, addFavorites, removeFavorites, allFavoriteId };
};
