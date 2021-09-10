import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAuth } from 'domains/auth';
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
  const query = useQuery(['movieDetails', id], () => getMovieDetail({ id }));

  return { ...query };
};

export const useMovieComments = (id) => {
  const query = useQuery(['movieComments', id], () => getMovieComment({ id }));
  return { ...query };
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation((data) => addComment({ data, token: accessToken }), {
    onSuccess: () => queryClient.invalidateQueries('movieComments'),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation((id) => deleteComment({ id, token: accessToken }), {
    onSuccess: () => queryClient.invalidateQueries('movieComments'),
  });
};
