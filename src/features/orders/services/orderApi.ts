import { baseApi } from '../../../services/baseApi';
import { Order, OrderStatus } from '../types/order.types';
import { mockOrders } from '../mock/orders.mock';

let orderListStore: Order[] = [...mockOrders];

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersList: builder.query<Order[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: orderListStore };
      },
      providesTags: ['Orders'],
    }),

    getOrderById: builder.query<Order, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 200));
        const found = orderListStore.find((o) => o.id === id);
        if (!found) return { error: { status: 404, data: 'Order not found' } };
        return { data: found };
      },
      providesTags: ['Orders'],
    }),

    updateOrderStatus: builder.mutation<Order, { id: string; status: OrderStatus }>({
      queryFn: async ({ id, status }) => {
        await new Promise((res) => setTimeout(res, 300));
        orderListStore = orderListStore.map((o) => (o.id === id ? { ...o, orderStatus: status } : o));
        const updated = orderListStore.find((o) => o.id === id)!;
        return { data: updated };
      },
      invalidatesTags: ['Orders'],
    }),

    cancelOrderById: builder.mutation<{ success: boolean; id: string }, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        orderListStore = orderListStore.map((o) =>
          o.id === id ? { ...o, orderStatus: 'Cancelled' } : o
        );
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Orders'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersListQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderByIdMutation,
} = orderApi;
