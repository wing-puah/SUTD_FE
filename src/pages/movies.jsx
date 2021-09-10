import React from 'react';
import { Link } from 'react-router-dom';

import { useMoviesListings, MovieItem } from 'domains/movies';

export const MoviesPage = () => {
  const { data, isLoading } = useMoviesListings();

  if (isLoading && !data) {
    return <div className="p-3">Loading ...</div>;
  }

  return (
    <div className="p-3">
      {data.length === 0 ? (
        <>There is no movies</>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((singleData) => (
            <Link to={`/movie/${singleData._id}`} key={singleData._id}>
              <MovieItem data={singleData} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
