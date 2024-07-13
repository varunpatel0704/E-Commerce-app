import apiSlice from "../../app/api/apiSlice.js";

const baseUrl = "/products";
export const productApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `${baseUrl}/categories`,
    }),

    getAllProducts: builder.query({
      query: ()=>`${baseUrl}/all`
    }),

    getProducts: builder.query({
      query: (category) => `${baseUrl}/categories/${category}`,
    }),

    getProduct: builder.query({
      query: (productId) => `${baseUrl}/${productId}`,
    }),

    updateProduct: builder.mutation({
      query: ({formData, id}) => ({
        url: `${baseUrl}/${id}`,
        method: "PATCH",
        body: formData,      
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${baseUrl}/${productId}`,
        method: "DELETE",
        body: productId,
      }),
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: `${baseUrl}/new`,
        method: "POST",
        body: product,
      }),
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
} = productApiSlice;
