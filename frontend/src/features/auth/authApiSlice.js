import apiSlice from "../../app/api/apiSlice.js";

const baseURL = "/users";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (details) => ({
        url: `${baseURL}/signUp`,
        method: "POST",
        body: details,
      }),
    }),
    persistentLogin: builder.mutation({
      query: () => ({
        url: `${baseURL}/refresh-accessToken`,
        method: "GET",
      }),
    }),
    // persistentLogin: builder.query({
    //   query: () => `${baseURL}/refresh-accessToken`
    // }),

    login: builder.mutation({
      query: (credentials) => ({
        url: `${baseURL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${baseURL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  usePersistentLoginMutation,
  usePersistentLoginQuery
} = authApiSlice;
