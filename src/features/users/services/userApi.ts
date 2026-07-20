import { baseApi } from '../../../services/baseApi';
import { User, CreateUserInput, UpdateUserInput, UserStatus } from '../types/user.types';
import { mockUsers } from '../mock/users.mock';

let userListStore: User[] = [...mockUsers];

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManagedUsersList: builder.query<User[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: userListStore };
      },
      providesTags: ['Users'],
    }),

    getUserById: builder.query<User, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 200));
        const found = userListStore.find((u) => u.id === id);
        if (!found) return { error: { status: 404, data: 'User not found' } };
        return { data: found };
      },
      providesTags: ['Users'],
    }),

    createNewUser: builder.mutation<User, CreateUserInput>({
      queryFn: async (input) => {
        await new Promise((res) => setTimeout(res, 400));
        const newUser: User = {
          ...input,
          id: `usr-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
        };
        userListStore = [newUser, ...userListStore];
        return { data: newUser };
      },
      invalidatesTags: ['Users'],
    }),

    updateExistingUser: builder.mutation<User, UpdateUserInput>({
      queryFn: async (input) => {
        await new Promise((res) => setTimeout(res, 350));
        userListStore = userListStore.map((u) => (u.id === input.id ? { ...u, ...input } : u));
        const updated = userListStore.find((u) => u.id === input.id)!;
        return { data: updated };
      },
      invalidatesTags: ['Users'],
    }),

    toggleStatus: builder.mutation<User, { id: string; status: UserStatus }>({
      queryFn: async ({ id, status }) => {
        await new Promise((res) => setTimeout(res, 300));
        userListStore = userListStore.map((u) => (u.id === id ? { ...u, status } : u));
        const updated = userListStore.find((u) => u.id === id)!;
        return { data: updated };
      },
      invalidatesTags: ['Users'],
    }),

    deleteUserById: builder.mutation<{ success: boolean; id: string }, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        userListStore = userListStore.filter((u) => u.id !== id);
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Users'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetManagedUsersListQuery,
  useGetUserByIdQuery,
  useCreateNewUserMutation,
  useUpdateExistingUserMutation,
  useToggleStatusMutation,
  useDeleteUserByIdMutation,
} = userApi;
