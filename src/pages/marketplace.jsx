import { ListingItem, useListings } from 'domains/marketplace';

import * as React from 'react';

export const Marketplace = () => {
  const { data: listings, page, setPage } = useListings();

  return (
    <div>
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <button type="button" onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
          {listings &&
            listings.map((item) => (
              <ListingItem
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                price={item.price}
                availableStock={item.numOfStock}
                onlyOne={item.availability === 'single-item'}
                listingId={item._id}
                key={item._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
