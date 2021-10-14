import { useState } from 'react';
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
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [tags, setTags] = useState(null);

  const query = useQuery(['cats', skip, limit, tags], () => getCatsList({ skip, limit, tags }), {
    staleTime: Infinity,
  });

  return {
    ...query,
    skip,
    setSkip,
    limit,
    setLimit,
    setTags,
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
