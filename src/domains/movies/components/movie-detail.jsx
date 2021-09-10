import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from 'domains/auth';
import { TextInput } from 'components/text-input';
import { useMovieDetail, useMovieComments } from '../hooks/use-movies';

export const MovieDetail = ({ movieId }) => {
  const { data: movieDetail, isLoading: isLoadingDetail } = useMovieDetail(movieId);
  const { data: comments, isLoading: isLoadingComments } = useMovieComments(movieId);

  const { status } = useAuth();

  const formik = useFormik({
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  if (!movieDetail && isLoadingDetail) {
    return <div className="p-3">Loading ...</div>;
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
          <p> {releaseDate}</p>
        </div>
      </div>

      <div className="py-3">
        <h2 className="text-xl">Overview</h2>
        {overview}
      </div>

      <div className="py-5">
        <h2 className="text-xl">Comments</h2>
        {isLoadingComments && <p> Loading comments ...</p>}

        {!isLoadingComments && (!comments || (comments && comments.length === 0)) ? (
          <p>No comments</p>
        ) : (
          comments.map((singleComment) => (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">{singleComment}</div>
          ))
        )}

        {status === 'authenticated' && (
          <div>
            <form onSubmit={formik.handleSubmit} className="p-3">
              <label className="block text-sm" htmlFor="comment">
                Add comment
              </label>
              <input
                type="text"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="comment"
                id="comment"
                placeholder="Add comment"
              />
              {formik.touched.comment && formik.errors.comment && (
                <div className="block text-xs text-red-500">{formik.errors.comment}</div>
              )}
              <div>
                <button type="submit">ADD</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// disabled={createJobMutation.isLoading}
