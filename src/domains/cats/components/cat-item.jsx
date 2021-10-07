import React from 'react';

import { THIRD_PARTY_API } from '../../../appConstants';

export const CatItem = ({ data }) => {
  const { createdAt, id, tags } = data;

  return (
    <div className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col text-left overflow-hidden">
        <img src={`${THIRD_PARTY_API}/cat/${id}`} alt={tags.join(',')} className="rounded-t-lg" />

        <div className="p-2 my-3">{tags.map((singleTag) => singleTag)}</div>
      </div>
    </div>
  );
};
