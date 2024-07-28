import apiSlice from '../../app/api/apiSlice.js';

const baseUrl = '/dashboard';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder=>({
    getInsights: builder.query({
      query: ()=>`${baseUrl}/insights`
    })
  })
});

export const {useGetInsightsQuery} = dashboardApiSlice;