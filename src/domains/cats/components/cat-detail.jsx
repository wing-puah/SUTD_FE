import React from 'react';

import { useAuth } from 'domains/auth';
import { TextField } from 'components/text-field';
import { Button } from 'components/button';
import {
  useCatDetail,
  useCatComments,
  useCreateComment,
  useDeleteComment,
} from '../hooks/use-cats';
import { Comments } from './comments';

export const CatDetail = ({ catId }) => {
  const { data: catDetail, isLoading: isLoadingDetail } = useCatDetail(catId);
  const { data: comments, isLoading: isLoadingComments } = useCatComments(catId);
  const addComment = useCreateComment();
  const deleteComment = useDeleteComment();

  const { status, user } = useAuth();

  const onSubmit = ({ values, formik }) => {
    addComment.mutate(
      { ...values, catId },
      {
        onSuccess: () => {
          formik.resetForm();
        },
      }
    );
  };
  console.log({ comments: JSON.stringify(comments) });
  if (!catDetail && isLoadingDetail) {
    return <div className="p-3">Loading ...</div>;
  }

  if (!catDetail) {
    return <div className="p-3">Issue with retrieving data</div>;
  }

  const _deleteComment = (id) => deleteComment.mutate(id);

  const { posterUrl, releaseDate, title, overview, adult } = catDetail;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex cat__detail">
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
        user={user}
        onSubmit={onSubmit}
        onDelete={_deleteComment}
      />
    </div>
  );
};
