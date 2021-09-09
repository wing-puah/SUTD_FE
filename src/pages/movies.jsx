import React from 'react';

import { useMoviesListings, MovieItem } from 'domains/movies';

export const MoviesPage = () => {
  const { data, isLoading } = useMoviesListings();

  if (isLoading && !data) {
    return 'Loading ...';
  }

  return (
    <div>
      {data.length === 0 ? (
        <>There is no movies</>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3">
          {data.map((singleData) => (
            <MovieItem data={singleData} key={singleData._id} />
          ))}
        </div>
      )}
    </div>
  );
};
