import apiSlice from "../../app/api/apiSlice.js";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    createPaymentIntent: builder.mutation({
      query: (amount)=>({
        url: '/orders/create-paymentIntent',
        method: 'POST',
        body: amount
      }),
    })
  })
})

export const {useCreatePaymentIntentMutation} = ordersApiSlice;
