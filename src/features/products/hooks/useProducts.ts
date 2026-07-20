import {
  useGetProductsListQuery,
  useCreateNewProductMutation,
  useUpdateExistingProductMutation,
  useDeleteProductByIdMutation,
} from '../services/productApi';

export function useProducts() {
  const { data: products = [], isLoading, isError, refetch } = useGetProductsListQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateNewProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateExistingProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductByIdMutation();

  return {
    products,
    isLoading,
    isError,
    refetch,
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
    deleteProduct,
    isDeleting,
  };
}
