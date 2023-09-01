import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { storeQueryTags } from '../../constants';

export const usersQuery = createApi({
  reducerPath: 'usersQuery',
  tagTypes: [storeQueryTags.USERS_TAG],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DB_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ token }) => ({
        url: 'accounts/users/',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: () => [storeQueryTags.USERS_TAG],
    }),
    createRole: builder.mutation({
      query: ({ data, token }) => ({
        url: 'accounts/roles/',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [storeQueryTags.USERS_TAG],
    }),
    createUser: builder.mutation({
      query: ({ data, token }) => ({
        url: 'accounts/users/',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [storeQueryTags.USERS_TAG],
    }),
  }),
});

export const { 
  useCreateRoleMutation, 
  useCreateUserMutation,
  useGetUsersQuery, 
} =  usersQuery;