import React, { useState } from 'react';
import { useQuery } from 'react-query';

import {
  getMoviesList,
  getMovieDetail,
  getMovieComment,
  addComment,
  deleteComment,
} from '../movies.service';

export const useMoviesListings = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const query = useQuery(['movies', page, limit], () => getMoviesList({ page, limit }), {
    staleTime: Infinity,
  });

  return {
    ...query,
    page,
    setPage,
    limit,
    setLimit,
  };
};

export const useMovieDetail = (id) => {
  const query = useQuery(['movieDetails', id], () => getMoviesList({ id }));

  return { ...query };
};

export const useMovieComments = (id) => {
  const query = useQuery(['movieComments', id], () => getMovieComment({ id }));
  return { ...query };
};
