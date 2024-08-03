import apiSlice from '../../app/api/apiSlice.js';

const baseUrl = '/dashboard';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder=>({
    getInsights: builder.query({
      query: ()=>`${baseUrl}/insights`,
      providesTags: ['Insights']
    }),

    addCoupon: builder.mutation({
      query: (coupon)=>({
        url: '/coupons/new',
        method: 'POST',
        body: coupon
      })
    }),

    getCoupon: builder.mutation({
      query: (couponCode)=>({
        url: `/coupons/${couponCode}`,
        method: 'GET',
      })
    })

  })
});

export const {useGetInsightsQuery, useAddCouponMutation, useGetCouponMutation} = dashboardApiSlice;