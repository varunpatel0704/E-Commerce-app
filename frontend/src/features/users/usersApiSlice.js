import apiSlice from "../../app/api/apiSlice.js";

const baseUrl = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${baseUrl}/all`,
      providesTags: (result)=>[...result.data.map(user=>({type: 'User', id: user.email})), {type: 'User', id: 'ALL'}]
    }),

    getUser: builder.query({
      query: (email) => `${baseUrl}/${email}`,
      providesTags: (result, error, email)=>[{type: 'User', id: email}]
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: [{type: 'User', id: 'ALL'}]
    }),

    updateUser: builder.mutation({
      query: ({ details, email }) => ({
        url: `${baseUrl}/${email}`,
        method: "PATCH",
        body: details,
      }),
      invalidatesTags: (result, error, arg)=>[{type: 'User', id: arg.email}]
    }),

    deleteUser: builder.mutation({
      query: (email) => ({
        url: `${baseUrl}/${email}`,
        method: "DELETE",
        body: email,
      }),
      invalidatesTags: (result, error, email)=>[{type: 'User', id: email}, {type: 'User', id: 'ALL'}]
    }),

    deleteAccount: builder.mutation({
      query: (email) => ({
        url: `${baseUrl}/delete/${email}`,
        method: "DELETE",
        body: email,
      }),
      invalidatesTags: (result, error, email)=>[{type: 'User', id: email}]
    })
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteAccountMutation,
} = usersApiSlice;
