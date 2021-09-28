import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TextField } from 'components/text-field';
import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { Rating } from './rating';

const validationSchema = Yup.object({
  rating: Yup.number().required('Rating is required').min(1, 'Rating is required'),
  content: Yup.string().required('Comment is required'),
});

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export const Comments = ({ data, isLoading, status, onSubmit, onDelete, user }) => {
  const formik = useFormik({
    initialValues: { rating: 0, content: '' },
    validationSchema,
    onSubmit: (values) => onSubmit({ values, formik }),
  });

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

      {status === 'authenticated' && (
        <form onSubmit={formik.handleSubmit} className="mt-5">
          <Rating
            maxValue={5}
            value={formik.values.rating}
            name="rating"
            onChange={formik.handleChange}
          />
          {formik.touched.rating && formik.errors.rating && (
            <div className="block text-xs text-red-500">{formik.errors.rating}</div>
          )}
          <TextField
            label="Add comment"
            type="text"
            className="w-full"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="content"
            id="content"
            placeholder="Your comment ..."
          />
          {formik.touched.content && formik.errors.content && (
            <div className="block text-xs text-red-500">{formik.errors.content}</div>
          )}
          <Button type="submit" variant="primary" className="mt-3">
            ADD
          </Button>
        </form>
      )}

      <div className="mt-10 py-5" data-testid="comments">
        {!data || (data && data.length === 0) ? (
          <p>No comments</p>
        ) : (
          data.map((singleComment) => (
            <div
              data-testid="single-comment"
              className="bg-white shadow overflow-hidden sm:rounded-md p-2 d-flex"
              key={singleComment._id}
            >
              <div>
                <Rating maxValue={5} value={singleComment.rating} />
                {singleComment.content}
              </div>

              {user === singleComment.userId && (
                <IconButton onClick={() => onDelete(singleComment._id)} data-testid="delete">
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
