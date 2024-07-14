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
      query: (id) => ({
        url: `${baseUrl}/${id}`,
        method: "PATCH",
        body: id,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${baseUrl}/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
