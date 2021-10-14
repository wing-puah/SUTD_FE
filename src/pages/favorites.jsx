import { useFavorites, CatListItems } from 'domains/cats';

import * as React from 'react';

export const Favorites = () => {
  const { favorites, toggleFavorites, allFavoriteId } = useFavorites();

  return (
    <div className="p-4 bg-gray-50 lg:flex">
      <CatListItems
        isLoading={false}
        data={favorites}
        onToggleLike={toggleFavorites}
        favorites={allFavoriteId}
      />
    </div>
  );
};
