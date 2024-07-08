import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const publicApiSlice = createApi({
  reducerPath: "pubicApi",

  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_PUBLIC_API}` }),

  endpoints: (builder) => ({}),
});

export default publicApiSlice;
