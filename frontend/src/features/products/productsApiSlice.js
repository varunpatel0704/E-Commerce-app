import apiSlice from "../../app/api/apiSlice.js";

const baseUrl = "/products";
export const productsApiSlice = apiSlice.injectEndpoints({
  // implement cach invalidation;

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `${baseUrl}/categories`,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            ...result.data.map((category) => ({
              type: "Category",
              id: category._id,
            })),
            { type: "Category", id: "ALL" },
          ];
        } else return ["Error"];
      },
    }),

    getAllProducts: builder.query({
      query: () => `${baseUrl}/all`,
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            ...result.data.map((product) => ({
              type: "Product",
              id: product._id,
            })),
            { type: "Product", id: "ALL" },
          ];
        } else return ["Error"];
      },
    }),

    getProducts: builder.query({
      query: (category) => `${baseUrl}/categories/${category}`,
      providesTags: (result, error, cateogry) => {
        if (result) {
          return [
            ...result.data.map((product) => ({
              type: "Product",
              id: product._id,
            })),
            { type: "Product", id: cateogry },
          ];
        } else return ["Error"];
      },
    }),

    getProduct: builder.query({
      query: (productId) => `${baseUrl}/${productId}`,
      providesTags: (result, error, productId) =>
        result ? [{ type: "Product", id: productId }] : ["Error"],
    }),

    updateProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `${baseUrl}/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
        { type: "Category", id: "ALL" },
        { type: "Error" },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${baseUrl}/${productId}`,
        method: "DELETE",
        body: productId,
      }),
      invalidatesTags: (result, error, productId) => [
        { type: "Product", id: productId },
        { type: "Category", id: "ALL" },
        {type: 'Insights'}
      ],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: `${baseUrl}/new`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [
        { type: "Product", id: "ALL" },
        { type: "Category", id: "ALL" },
        { type: "Error" },
        {type: 'Insights'}

      ],
    }),
  }),
});

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} = productsApiSlice;
