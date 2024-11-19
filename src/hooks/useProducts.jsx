import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllProducts as fetchProducts,
  deleteProduct as removeProduct,
  addNewProduct,
} from '../api/firebase';

export function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (productId) => removeProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return { productsQuery, addProduct, deleteProduct };
}
