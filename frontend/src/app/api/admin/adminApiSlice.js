import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApiSlice = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_ADMIN_API}` }),
  
  endpoints: (builder) => ({}),
});

export default adminApiSlice;
