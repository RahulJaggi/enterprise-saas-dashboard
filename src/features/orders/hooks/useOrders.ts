import {
  useGetOrdersListQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderByIdMutation,
} from '../services/orderApi';

export function useOrders() {
  const { data: orders = [], isLoading, isError, refetch } = useGetOrdersListQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderByIdMutation();

  return {
    orders,
    isLoading,
    isError,
    refetch,
    updateOrderStatus,
    isUpdating,
    cancelOrder,
    isCancelling,
  };
}
