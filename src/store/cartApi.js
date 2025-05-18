import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_NESTJS_BACKEND_URL}` }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: (userId) => `/cart/user/${userId}`,
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: '/cart',
        method: 'POST',
        body: cartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation({
      query: ({ id, ...cartItem }) => ({
        url: `/cart/${id}`,
        method: 'PUT',
        body: cartItem,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/cart/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi; 