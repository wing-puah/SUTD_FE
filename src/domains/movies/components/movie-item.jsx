import React from 'react';

export const MovieItem = ({ data }) => {
  const { key, backdropUrl, title, releaseDate, overview, posterUrl } = data;

  return (
    <div
      key={key}
      className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="flex-1 flex flex-col text-left">
        <img src={backdropUrl} alt={title} />
        <div className="p-2 mt-3">
          <h3 className="text-gray-900 text-sm font-medium">{title}</h3>
          <dl>
            <dt className="line-clamp overflow-hidden">{overview}</dt>
          </dl>
        </div>
      </div>
    </div>
  );
};
