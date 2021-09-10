import { TextField } from 'components/text-field';
import { Button } from 'components/button';

export const Comments = ({ data, isLoading, status, formik, user }) => {
  console.log({ user });
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
