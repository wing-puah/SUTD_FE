import React from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../components/badge';
import { THIRD_PARTY_API } from '../../../appConstants';

export const CatItem = ({ data, onClick }) => {
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
            <Badge className="m-1 cursor-pointer" onClick={() => onClick(singleTag)}>
              {singleTag}
            </Badge>
          ))}
        </div>
        <div className="p-3">
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
