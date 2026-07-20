import {
  useGetManagedUsersListQuery,
  useCreateNewUserMutation,
  useUpdateExistingUserMutation,
  useToggleStatusMutation,
  useDeleteUserByIdMutation,
} from '../services/userApi';

export function useUsers() {
  const { data: users = [], isLoading, isError, refetch } = useGetManagedUsersListQuery();
  const [createUser, { isLoading: isCreating }] = useCreateNewUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateExistingUserMutation();
  const [toggleStatus, { isLoading: isToggling }] = useToggleStatusMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserByIdMutation();

  return {
    users,
    isLoading,
    isError,
    refetch,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
    toggleStatus,
    isToggling,
    deleteUser,
    isDeleting,
  };
}
