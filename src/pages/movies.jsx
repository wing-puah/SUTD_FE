import React from 'react';
import { Link } from 'react-router-dom';

import { useMoviesListings, MovieItem } from 'domains/movies';
import { Button } from 'components/button';

export const MoviesPage = () => {
  const { data, isLoading, setPage, page } = useMoviesListings();

  if (isLoading && !data) {
    return <div className="p-3">Loading ...</div>;
  }

  const _onPrevClick = () => setPage((_page) => _page - 1);
  const _onNextClick = () => setPage((_page) => _page + 1);

  return (
    <div className="p-3">
      {data.length === 0 ? (
        <>There is no movies</>
      ) : (
        <div>
          <div className="py-3">
            <Button
              className="text-sm px-4 py-1 mr-3 text-pink-500"
              onClick={_onPrevClick}
              disabled={page === 1}
            >
              Prev
            </Button>
            <Button className="text-sm px-4 py-1 text-pink-500" onClick={_onNextClick}>
              Next
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((singleData) => (
              <Link to={`/movie/${singleData._id}`} key={singleData._id}>
                <MovieItem data={singleData} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
