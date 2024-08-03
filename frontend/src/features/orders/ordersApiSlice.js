import apiSlice from "../../app/api/apiSlice.js";

const baseURL = "/orders";

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
      invalidatesTags: (result, error, args) => [
        { type: "Order", id: "ALL" },
        { type: "Order", id: "USER" },
        { type: "Error" },
        {type: 'Insights'}
      ],
    }),

    getOrder: builder.query({
      query: (orderId) => `${baseURL}/${orderId}`,
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: "Order", id: arg }];
        } else return ["Error"];
      },
    }),

    getOrders: builder.query({
      query: (userId) => `${baseURL}/all/${userId}`,
      providesTags: (result, error, args) => {
        if (result) {
          return [
            ...result.data.map((order) => ({ type: "Order", id: order._id })),
            { type: "Order", id: "USER" },
          ];
        } else return ["Error"];
      },
    }),

    getAllOrders: builder.query({
      query: () => `${baseURL}/all`,
      providesTags: (result, error, args) => {
        if (result) {
          return [
            ...result?.data.map((order) => ({ type: "Order", id: order._id })),
            { type: "Order", id: "ALL" },
          ];
        } else return ["Error"];
      },
    }),

    processOrder: builder.mutation({
      query: (orderId) => ({
        url: `${baseURL}/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: arg },
        { type: "Error" },
      ],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useNewOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useProcessOrderMutation,
} = ordersApiSlice;
