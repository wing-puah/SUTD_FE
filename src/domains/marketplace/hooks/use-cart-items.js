import { useQuery, useMutation, useQueryClient } from 'react-query';

import { useAuth } from 'domains/auth';
import { deleteCartItem, getCartItems, addToCart } from '../marketplace.service';

export const useCartItems = () => {
  const { accessToken } = useAuth();

  const query = useQuery(['cartItems', accessToken], () => {
    console.log({ accessToken });
    const abortController = new AbortController();
    const request = getCartItems({ token: accessToken, signal: abortController.signal });
    request.cancel = () => abortController.abort();
    return request;
  });

  return { ...query };
};

export const useAddCartItemsMutation = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation((listingId) => addToCart(listingId, accessToken), {
    onSuccess: () => queryClient.invalidateQueries('cartItems'),
  });
};

export const useDeleteCartItemsMutation = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation((listingId) => deleteCartItem(listingId, { token: accessToken }), {
    onSuccess: () => queryClient.invalidateQueries('cartItems'),
  });
};
