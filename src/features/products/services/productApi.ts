import { baseApi } from '../../../services/baseApi';
import { Product, CreateProductInput, UpdateProductInput } from '../types/product.types';
import { mockProducts } from '../mock/products.mock';

let productListStore: Product[] = [...mockProducts];

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsList: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise((res) => setTimeout(res, 300));
        return { data: productListStore };
      },
      providesTags: ['Products'],
    }),

    getProductById: builder.query<Product, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 200));
        const found = productListStore.find((p) => p.id === id);
        if (!found) return { error: { status: 404, data: 'Product not found' } };
        return { data: found };
      },
      providesTags: ['Products'],
    }),

    createNewProduct: builder.mutation<Product, CreateProductInput>({
      queryFn: async (input) => {
        await new Promise((res) => setTimeout(res, 400));
        const newProd: Product = {
          ...input,
          id: `prod-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
        };
        productListStore = [newProd, ...productListStore];
        return { data: newProd };
      },
      invalidatesTags: ['Products'],
    }),

    updateExistingProduct: builder.mutation<Product, UpdateProductInput>({
      queryFn: async (input) => {
        await new Promise((res) => setTimeout(res, 350));
        productListStore = productListStore.map((p) => (p.id === input.id ? { ...p, ...input } : p));
        const updated = productListStore.find((p) => p.id === input.id)!;
        return { data: updated };
      },
      invalidatesTags: ['Products'],
    }),

    deleteProductById: builder.mutation<{ success: boolean; id: string }, string>({
      queryFn: async (id) => {
        await new Promise((res) => setTimeout(res, 300));
        productListStore = productListStore.filter((p) => p.id !== id);
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Products'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsListQuery,
  useGetProductByIdQuery,
  useCreateNewProductMutation,
  useUpdateExistingProductMutation,
  useDeleteProductByIdMutation,
} = productApi;
