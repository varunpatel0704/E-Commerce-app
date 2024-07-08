import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loggedIn, loggedOut } from "../../features/auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API}`,

  credentials: 'include',

  prepareHeaders(headers, {getState}){
    const accessToken = getState().auth.accessToken;
    if(accessToken) 
      headers.set('Authorization', `Bearer ${accessToken}`);
    headers;
  }
})

const baseQueryWithReAuth = async function(args, api, extraOptions){
  let result;
  try {    
    result = await baseQuery(args, api, extraOptions);
    // console.log('original request result: ', result);
    
    // received a status for unauthorized request, attempt re-auth
    if(result.error?.status === 401){
      console.log('attempting re-auth... with refresh token');
      const res = await baseQuery('/users/refresh-accessToken', api, extraOptions);
      // console.log('re-auth request result: ', res);
      
      if(res?.data){
        const accessToken = res.data.data;
        // console.log(accessToken);
        
        const {user,role} = api.getState().auth;
        api.dispatch(loggedIn(user, role, accessToken));
        // console.log(api.getState().auth);
        
        // re-attempt the original request.
        const response = await baseQuery(args, api, extraOptions);
        result = response;
      }
      else{
        api.dispatch(loggedOut());
      }
    } 
  } catch (error) {
    // console.log('re-auth request error: ', error);
    api.dispatch(loggedOut());
    result = error;
  }

  return result;
}

const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithReAuth,

  endpoints: (builder) => ({}),
});

export default apiSlice;
