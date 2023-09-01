import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { storeQueryTags } from '../../constants';

export const productQuery = createApi({
  reducerPath: 'productQuery',
  tagTypes: [storeQueryTags.PRODUCT_TAG],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DB_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ token }) => ({
        url: 'products/products',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: () => [storeQueryTags.PRODUCT_TAG],
    }),
    createProductsBulk: builder.mutation({
      query: ({ data, token }) => ({
        url: 'products/products/bulk_create/',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [storeQueryTags.PRODUCT_TAG],
    }),
  }),
});

export const { useCreateProductsBulkMutation, useGetProductsQuery } =  productQuery;