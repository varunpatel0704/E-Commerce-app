import apiSlice from "../../app/api/apiSlice.js";

const baseUrl = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${baseUrl}/all`,
    }),

    getUser: builder.query({
      query: (id) => `${baseUrl}/${id}`,
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: `${baseUrl}/create`,
        method: "POST",
        body: user,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ details, email }) => ({
        url: `${baseUrl}/${email}`,
        method: "PATCH",
        body: details,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),

    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `${baseUrl}/delete/${id}`,
        method: "DELETE",
        body: id,
      })
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
