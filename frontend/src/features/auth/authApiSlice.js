import apiSlice from "../../app/api/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder=>({
    login: builder.mutation({
      query: (credentials)=>({
        url: '/users/login',
        method: 'POST',
        body: credentials
      })
    }),

    logout: builder.mutation({
      query: ()=>({
        url: '/users/logout',
        method: 'POST'
      })
    })
  })
})

export const {useLoginMutation, useLogoutMutation} = authApiSlice;