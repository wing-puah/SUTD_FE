import React from 'react';
import { Link } from 'react-router-dom';

import { useCatsListings, CatItem } from 'domains/cats';

export const CatsPage = () => {
  const { data, isLoading } = useCatsListings();

  if (isLoading && !data) {
    return <div className="p-3">Loading ...</div>;
  }

  return (
    <div className="p-3">
      {(data && data.length === 0) || !data ? (
        <>There is no cats</>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((singleData) => (
            <Link to={`/cats/${singleData.id}`} key={singleData.id}>
              <CatItem data={singleData} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
