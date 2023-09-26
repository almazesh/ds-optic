import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { storeQueryTags } from '../../constants';

export const storesQuery = createApi({
  reducerPath: 'storesQuery',
  tagTypes: [storeQueryTags.STORE_TAG],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DB_URL,
  }),
  endpoints: (builder) => ({
    getStores: builder.query({
      query: ({ token }) => ({
        url: 'branches/branches/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: () => [storeQueryTags.STORE_TAG],
    }),
    createStore: builder.mutation({
      query: ({ data, token }) => ({
        url: 'branches/branches/',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [storeQueryTags.STORE_TAG],
    }),
    connectUserToStore: builder.mutation({
      query: ({ data, token }) => ({
        url: 'branches/branches/add_user_to_branches/',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [storeQueryTags.STORE_TAG],
    }),
  }),
});

export const { useGetStoresQuery, useCreateStoreMutation, useConnectUserToStoreMutation } =  storesQuery;