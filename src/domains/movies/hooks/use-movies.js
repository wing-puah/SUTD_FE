import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { getMoviesList } from '../movies.service';

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
