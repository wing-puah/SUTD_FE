import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'domains/auth';
import { TextField } from 'components/text-field';
import { Button } from 'components/button';
import {
  useMovieDetail,
  useMovieComments,
  useCreateComment,
  useDeleteComment,
} from '../hooks/use-movies';
import { Comments } from './comments';

export const MovieDetail = ({ movieId }) => {
  const { data: movieDetail, isLoading: isLoadingDetail } = useMovieDetail(movieId);
  const { data: comments, isLoading: isLoadingComments } = useMovieComments(movieId);
  const addComment = useCreateComment();
  const deleteComment = useDeleteComment();

  const { status, accessToken } = useAuth();

  const formik = useFormik({
    initialValues: { rating: null, content: '' },
    onSubmit: (values) => {
      console.log({ values, movieId });
      addComment.mutate({ ...values, movieId });
    },
  });

  if (!movieDetail && isLoadingDetail) {
    return <div className="p-3">Loading ...</div>;
  }

  if (!movieDetail) {
    return <div className="p-3">Issue with retrieving data</div>;
  }

  const _deleteComment = (id) => deleteComment.mutate(id);

  const { posterUrl, releaseDate, title, overview, adult } = movieDetail;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex movie__detail">
        <div>
          <img src={posterUrl} alt={title} />
        </div>
        <div className="mt-10 lg:mt-0 pl-4 lg:self-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex">
            {releaseDate}{' '}
            {adult && (
              <div className="bg-purple-600 bg-opacity-75 text-white px-5 ml-2 rounded-full">
                18+
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-3">
        <h2 className="text-xl">Overview</h2>
        {overview}
      </div>

      <Comments
        data={comments}
        isLoading={isLoadingComments}
        status={status}
        formik={formik}
        user={accessToken}
        onDelete={_deleteComment}
      />
    </div>
  );
};
