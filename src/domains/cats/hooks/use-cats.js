import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAuth } from 'domains/auth';
import {
  getCatsList,
  getCatDetail,
  getCatComment,
  addComment,
  deleteComment,
} from '../cats.service';

export const useCatsListings = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const query = useQuery(['cats', page, limit], () => getCatsList({ page, limit }), {
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

export const useCatDetail = (id) => {
  const query = useQuery(['catDetails', id], () => getCatDetail({ id }));

  return { ...query };
};

export const useCatComments = (id) => {
  const query = useQuery(['catComments', id], () => getCatComment({ id }));
  return { ...query };
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation((data) => addComment({ data, token: accessToken }), {
    onSuccess: () => queryClient.invalidateQueries('catComments'),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation((id) => deleteComment({ id, token: accessToken }), {
    onSuccess: () => queryClient.invalidateQueries('catComments'),
  });
};
