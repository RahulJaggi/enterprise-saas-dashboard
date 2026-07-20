import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ManagedUser,
  Customer,
  Product,
  Order,
  AuditLog,
  DashboardMetrics,
  RevenueMetric,
  TrafficSource,
} from '../types';
import {
  initialDashboardMetrics,
  initialRevenueMetrics,
  initialTrafficSources,
  initialManagedUsers,
  initialCustomers,
  initialProducts,
  initialOrders,
  initialAuditLogs,
} from './mockData';

// Mutable in-memory stores for mock server simulations
let usersData = [...initialManagedUsers];
let customersData = [...initialCustomers];
let productsData = [...initialProducts];
let ordersData = [...initialOrders];
let auditLogsData = [...initialAuditLogs];

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users', 'Customers', 'Products', 'Orders', 'Metrics', 'AuditLogs', 'Settings'],
  endpoints: (builder) => ({
    // Metrics & Analytics
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: initialDashboardMetrics };
      },
      providesTags: ['Metrics'],
    }),

    getRevenueMetrics: builder.query<RevenueMetric[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: initialRevenueMetrics };
      },
      providesTags: ['Metrics'],
    }),

    getTrafficSources: builder.query<TrafficSource[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 200));
        return { data: initialTrafficSources };
      },
      providesTags: ['Metrics'],
    }),

    // Managed Users CRUD
    getUsers: builder.query<ManagedUser[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 400));
        return { data: usersData };
      },
      providesTags: ['Users'],
    }),

    addUser: builder.mutation<ManagedUser, Omit<ManagedUser, 'id' | 'createdAt' | 'lastLogin'>>({
      queryFn: async (newUser) => {
        await new Promise((res) => setTimeout(res, 400));
        const created: ManagedUser = {
          ...newUser,
          id: `usr-${Date.now()}`,
          lastLogin: 'Never',
          createdAt: new Date().toISOString().split('T')[0],
        };
        usersData = [created, ...usersData];
        return { data: created };
      },
      invalidatesTags: ['Users'],
    }),

    updateUserStatus: builder.mutation<ManagedUser, { id: string; status: ManagedUser['status'] }>({
      queryFn: async ({ id, status }) => {
        await new Promise((res) => setTimeout(res, 300));
        usersData = usersData.map((u) => (u.id === id ? { ...u, status } : u));
        const updated = usersData.find((u) => u.id === id)!;
        return { data: updated };
      },
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        usersData = usersData.filter((u) => u.id !== id);
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Users'],
    }),

    // Customers
    getCustomers: builder.query<Customer[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 350));
        return { data: customersData };
      },
      providesTags: ['Customers'],
    }),

    // Products CRUD
    getProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 400));
        return { data: productsData };
      },
      providesTags: ['Products'],
    }),

    addProduct: builder.mutation<Product, Omit<Product, 'id' | 'createdAt' | 'salesCount' | 'rating'>>({
      queryFn: async (newProd) => {
        await new Promise((res) => setTimeout(res, 400));
        const created: Product = {
          ...newProd,
          id: `prod-${Date.now()}`,
          rating: 5.0,
          salesCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        productsData = [created, ...productsData];
        return { data: created };
      },
      invalidatesTags: ['Products'],
    }),

    // Orders
    getOrders: builder.query<Order[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 400));
        return { data: ordersData };
      },
      providesTags: ['Orders'],
    }),

    updateOrderStatus: builder.mutation<Order, { id: string; status: Order['status'] }>({
      queryFn: async ({ id, status }) => {
        await new Promise((res) => setTimeout(res, 300));
        ordersData = ordersData.map((o) => (o.id === id ? { ...o, status } : o));
        const updated = ordersData.find((o) => o.id === id)!;
        return { data: updated };
      },
      invalidatesTags: ['Orders'],
    }),

    // Audit Logs
    getAuditLogs: builder.query<AuditLog[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: auditLogsData };
      },
      providesTags: ['AuditLogs'],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetRevenueMetricsQuery,
  useGetTrafficSourcesQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useGetCustomersQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAuditLogsQuery,
} = baseApi;
