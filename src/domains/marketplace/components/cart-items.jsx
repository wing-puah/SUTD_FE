import { Button } from 'components/button';
import { useCartItems, useDeleteCartItemsMutation } from '../hooks/use-cart-items';

const EmptyCart = () => (
  <div className="px-4 sm:px-6 pb-12">
    <div className="pt-6 pb-5">
      <div id="no-cart-item-message">
        <div className="p-4 text-center">
          <svg
            className="inline-block w-12 h-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
        <p className="text-center text-gray-500">There is no item in your shopping cart.</p>
      </div>
    </div>
  </div>
);

const SingleItem = ({ item }) => (
  <img
    src={item.listing.imageUrl}
    alt=""
    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
  />
);

export const CartItems = () => {
  const { data, loadData, ...rest } = useCartItems();
  const deleteItemMutation = useDeleteCartItemsMutation();

  console.log({ rest, data });

  const subtotal = data
    ? data.reduce((total, item) => total + item.listing.price * item.quantity, 0)
    : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 px-4 bg-pink-700 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Your shopping cart</h2>
        </div>
        <div className="mt-1">
          <p className="text-sm text-pink-300">Listing added into your shopping cart</p>
        </div>
      </div>

      <div>
        <ul class="divide-y divide-gray-200"></ul>
      </div>

      {!data || (data && data.length === 0) ? (
        <EmptyCart />
      ) : (
        data.map((item) => <SingleItem key={item._id} item={item} />)
      )}
    </div>
  );
};
