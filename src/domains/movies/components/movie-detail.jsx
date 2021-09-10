import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'domains/auth';
import { TextField } from 'components/text-field';
import { Button } from 'components/button';
import { useMovieDetail, useMovieComments } from '../hooks/use-movies';

const Comments = ({ data, isLoading, status, formik }) => {
  if (isLoading) {
    return (
      <div className="py-5">
        <h2 className="text-xl">Comments</h2> <p> Loading comments ...</p>
      </div>
    );
  }

  return (
    <div className="py-5">
      <h2 className="text-xl">Comments</h2>
      {!data || (data && data.length === 0) ? (
        <p>No comments</p>
      ) : (
        data.map((singleComment) => (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">{singleComment}</div>
        ))
      )}

      {status === 'authenticated' && (
        <form onSubmit={formik.handleSubmit} className="mt-5">
          <TextField
            label="Add comment"
            type="text"
            className="w-full"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="comment"
            id="comment"
            placeholder="Your comment ..."
          />
          {formik.touched.comment && formik.errors.comment && (
            <div className="block text-xs text-red-500">{formik.errors.comment}</div>
          )}
          <Button type="submit" variant="primary" className="mt-3">
            ADD
          </Button>
        </form>
      )}
    </div>
  );
};

export const MovieDetail = ({ movieId }) => {
  const { data: movieDetail, isLoading: isLoadingDetail } = useMovieDetail(movieId);
  const { data: comments, isLoading: isLoadingComments } = useMovieComments(movieId);

  const { status } = useAuth();

  const formik = useFormik({
    initialValues: { comment: null },
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  if (!movieDetail && isLoadingDetail) {
    return <div className="p-3">Loading ...</div>;
  }

  if (!movieDetail) {
    return <div className="p-3">Issue with retrieving data</div>;
  }

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

      <Comments data={comments} isLoading={isLoadingComments} status={status} formik={formik} />
    </div>
  );
};
