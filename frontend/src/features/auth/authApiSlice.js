import apiSlice from "../../app/api/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder=>({
    signUp: builder.mutation({
      query: (details)=>({
        url: '/users/signUp',
        method: 'POST',
        body: details
      })
    }),
    
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

export const {useSignUpMutation, useLoginMutation, useLogoutMutation} = authApiSlice;