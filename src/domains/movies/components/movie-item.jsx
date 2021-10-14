import React from 'react';

export const MovieItem = ({ data }) => {
  const { backdropUrl, title, releaseDate, overview, posterUrl } = data;

  return (
    <div className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="flex-1 flex flex-col text-left overflow-hidden">
        <img src={backdropUrl} alt={title} className="rounded-t-lg" />

        <div className="p-2 my-3">
          <h3 className="text-gray-900 text-sm font-medium">{title}</h3>
          <dl>
            <dt className="line-clamp overflow-hidden">{overview}</dt>
          </dl>
        </div>
      </div>
    </div>
  );
};
