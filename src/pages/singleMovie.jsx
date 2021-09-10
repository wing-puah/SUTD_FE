import React from 'react';
import { useParams } from 'react-router-dom';

import { MovieDetail } from 'domains/movies';

export const SingleMoviePage = () => {
  const params = useParams();

  return <MovieDetail movieId={params.movieId} />;
};
