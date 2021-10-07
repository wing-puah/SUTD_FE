import * as React from 'react';
import user from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';

import { Comments } from './comments';

const comments = [
  {
    _id: '6152e32a58db34001ed060ce',
    rating: 4,
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    cat: '6152df9c58db34001ed05bc7',
    userId: '6152e2f858db34001ed060b9',
    userName: 'user1',
    createdAt: '2021-09-28T09:40:58.924Z',
    updatedAt: '2021-09-28T09:40:58.924Z',
    __v: 0,
  },
  {
    _id: '6152e31c58db34001ed060c8',
    rating: 3,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    cat: '6152df9c58db34001ed05bc7',
    userId: '6152e2f858db34001ed12345',
    userName: 'user2',
    createdAt: '2021-09-28T09:40:44.866Z',
    updatedAt: '2021-09-28T09:40:44.866Z',
    __v: 0,
  },
];

const TestBed = ({ data = comments, isLoading = false, status = null, user = null } = {}) => {
  const [testData, setTestData] = React.useState(data);
  const onDelete = (id) => {
    setTestData((prevData) => prevData.filter((el) => el._id !== id));
  };

  return (
    <Comments
      data={testData}
      isLoading={isLoading}
      status={status}
      user={user}
      onDelete={onDelete}
    />
  );
};

describe('<Comments>', () => {
  test('should show loading when loading', () => {
    render(<TestBed isLoading={true} />);
    expect(screen.getByText('Loading comments ...')).toBeTruthy();
  });

  test('should allow user to delete their comments', () => {
    const userId = '6152e2f858db34001ed12345';
    render(<TestBed user={userId} />);
    const commentIndex = comments.findIndex((el) => el.userId === userId);
    const userComment = within(screen.getAllByTestId('single-comment')[commentIndex]);

    expect(userComment.queryByText(comments[commentIndex].content)).toBeTruthy();
    expect(userComment.getByTestId('delete')).toBeTruthy();
    user.click(userComment.getByTestId('delete'));
    expect(screen.getAllByTestId('single-comment')).toHaveLength(1);
  });

  test('should not show comment form if the user is not authenticated', () => {
    render(<TestBed />);
    expect(screen.queryByLabelText('Add comment')).toBeNull();
  });
});
