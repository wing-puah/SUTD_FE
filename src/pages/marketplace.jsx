import { ListingItem, useListings, useAddCartItemsMutation } from 'domains/marketplace';
import { CartItems } from 'domains/marketplace';
import { useAuth } from 'domains/auth';

import * as React from 'react';

export const Marketplace = () => {
  const { data: listings, page, setPage } = useListings();
  const createCartMutation = useAddCartItemsMutation();
  const { status } = useAuth();

  return (
    <div className="bg-gray-50 lg:flex">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Marketplace</h1>
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
              listings.map((item) => {
                let _onAddToCart = null;

                if (status === 'authenticated') {
                  _onAddToCart = () => createCartMutation.mutate(item._id);
                }

                return (
                  <ListingItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    availableStock={item.numOfStock}
                    onlyOne={item.availability === 'single-item'}
                    listingId={item._id}
                    key={item._id}
                    onAddToCart={_onAddToCart}
                  />
                );
              })}
          </div>
        </div>
      </div>

      {status === 'authenticated' && (
        <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100 ">
          <CartItems />
        </div>
      )}
    </div>
  );
};
