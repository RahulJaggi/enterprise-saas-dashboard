import { useGetCustomersListQuery } from '../services/customerApi';

export function useCustomers() {
  const { data: customers = [], isLoading, isError, refetch } = useGetCustomersListQuery();

  return {
    customers,
    isLoading,
    isError,
    refetch,
  };
}
