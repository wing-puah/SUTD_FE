import { TextField } from 'components/text-field';
import { Button } from 'components/button';
import { Rating } from './rating';

export const Comments = ({ data, isLoading, status, formik, user }) => {
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
    </div>
  );
};
