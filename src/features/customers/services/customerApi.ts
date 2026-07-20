import { baseApi } from '../../../services/baseApi';
import { Customer } from '../types/customer.types';
import { mockCustomers } from '../mock/customers.mock';

let customerListStore: Customer[] = [...mockCustomers];

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomersList: builder.query<Customer[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: customerListStore };
      },
      providesTags: ['Customers'],
    }),

    getCustomerById: builder.query<Customer, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 200));
        const found = customerListStore.find((c) => c.id === id);
        if (!found) return { error: { status: 404, data: 'Customer not found' } };
        return { data: found };
      },
      providesTags: ['Customers'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCustomersListQuery, useGetCustomerByIdQuery } = customerApi;
