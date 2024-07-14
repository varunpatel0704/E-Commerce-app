import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loggedIn, loggedOut } from "../../features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API}`,

  credentials: "include",

  prepareHeaders(headers, { getState }) {
    const accessToken = getState().auth.accessToken;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    headers;
  },
});

const baseQueryWithReAuth = async function (args, api, extraOptions) {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("original request result: ", result);
  if(args.url === '/users/refresh-accessToken' || args.url === '/users/login'){
    console.log('no need for re-auth');
    return result;
  }

  // received a status for unauthorized request, attempt re-auth
  if (result.error?.status === 401 || result.error?.status === 500) {

    console.log("attempting re-auth... with refresh token");
    const res = await baseQuery("/users/refresh-accessToken", api, extraOptions);
    // console.log("re-auth request result: ", res);

    if (res.data) {
      const {accessToken, email, fullName, role} = res.data.data;
      // console.log(accessToken);

      // const {fullName, user, role } = api.getState().auth;
      api.dispatch(loggedIn(fullName, email, role, accessToken));
      // console.log(api.getState().auth);

      // re-attempt the original request.
      const response = await baseQuery(args, api, extraOptions);
      result = response;
    } 
    
    else {
      console.log('re-auth failed, logging out');
      await baseQuery({ url: "/users/logout", method: "POST" }, api, extraOptions);
      api.dispatch(loggedOut());
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithReAuth,

  endpoints: (builder) => ({}),
});

export default apiSlice;
