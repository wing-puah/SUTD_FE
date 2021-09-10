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
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
        <p className="text-center text-gray-500">There is no item in your shopping cart.</p>
      </div>
    </div>
  </div>
);

const DeleteIcon = () => (
  <svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    ></path>
  </svg>
);

const SingleItem = ({ item, onDelete }) => (
  <li className="flex px-4 sm:px-6 py-4">
    <img src={item.listing.imageUrl} alt="" className="h-10 w-10 rounded-full" />
    <div className="flex-1 flex justify-between items-center ml-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{item.listing.title}</p>
        <p className="text-sm text-gray-500">
          ${item.listing.price.toLocaleString()} x {item.quantity}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <div>$ {(Number(item.listing.price) * Number(item.quantity)).toLocaleString()}</div>
      <button
        type="button"
        onClick={() => onDelete(item.listing._id)}
        className="text-red-400 p-1 rounded-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:ring focus:ring-pink-500 focus:ring-opacity-30 transition duration-150 ease-in-out"
      >
        <DeleteIcon />
      </button>
    </div>
  </li>
);

export const CartItems = () => {
  const { data, isLoading } = useCartItems();
  const deleteItemMutation = useDeleteCartItemsMutation();

  const deleteSingleItem = (id) => deleteItemMutation.mutate(id);

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
        !isLoading ? (
          <EmptyCart />
        ) : (
          'Loading ...'
        )
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {data.map((item) => (
              <SingleItem key={item._id} item={item} onDelete={deleteSingleItem} />
            ))}
          </ul>
          <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200">
            <span>
              Total <span className="text-3xl">${subtotal.toLocaleString()}</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
};
