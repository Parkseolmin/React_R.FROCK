import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  removeFromCart,
  addOrUpdateToCart,
  allRemoveFromCart,
} from 'api/firebase';
import { useAuthContext } from 'context/AuthContext';

export function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  const removeAllItems = useMutation({
    mutationFn: () => allRemoveFromCart(uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem, removeAllItems };
}
