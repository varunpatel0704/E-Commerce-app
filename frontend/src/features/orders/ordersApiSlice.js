import apiSlice from "../../app/api/apiSlice.js";

const baseURL = '/orders';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `${baseURL}/create-paymentIntent`,
        method: "POST",
        body: amount,
      }),
    }),

    newOrder: builder.mutation({
      query: (orderDetails) => ({
        url: `${baseURL}/new`,
        method: "POST",
        body: orderDetails,
      }),
    }),

    getOrder: builder.query({
      query: (orderId)=>`${baseURL}/${orderId}`
    }),

    getOrders: builder.query({
      query: (userId)=>`${baseURL}/all/${userId}`
    }),

    getAllOrders: builder.query({
      query: ()=>`${baseURL}/all`
    })
  }),
});

export const { useCreatePaymentIntentMutation, useNewOrderMutation, useGetOrderQuery, useGetOrdersQuery, useGetAllOrdersQuery } =
  ordersApiSlice;
