import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import publicApiSlice from "./api/public/publicApiSlice.js";
import adminApiSlice from "./api/admin/adminApiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [publicApiSlice.reducerPath]: publicApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      publicApiSlice.middleware,
      adminApiSlice.middleware
    ),
  devTools: true
});

export default store;
