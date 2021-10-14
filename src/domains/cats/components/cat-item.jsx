import React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../components/badge';
import { THIRD_PARTY_API } from '../../../appConstants';
import { Button } from 'components/button';

export const CatItem = ({ data, onClick, onToggleLike, liked }) => {
  const { created_at, id, tags } = data;

  return (
    <div
      key={id}
      className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="flex-1 flex flex-col text-left overflow-hidden">
        <Link to={`/cats/${id}`}>
          <img src={`${THIRD_PARTY_API}/cat/${id}`} alt={tags.join(',')} className="rounded-t-lg" />
        </Link>

        <div className="p-2 my-3">
          {tags.map((singleTag) => (
            <Badge
              key={singleTag}
              className="m-1 cursor-pointer"
              onClick={onClick ? () => onClick(singleTag) : null}
            >
              {singleTag}
            </Badge>
          ))}
        </div>
        <div className="p-3">
          {onToggleLike && (
            <div>
              <Button onClick={() => onToggleLike(liked ? 'unlike' : 'like', data)}>
                {liked ? 'Unlike' : 'Like'}
              </Button>
            </div>
          )}
          {new Date(created_at).toLocaleDateString('en', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};
