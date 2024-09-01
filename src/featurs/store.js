import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apiSlice";
import { customApi } from "./apiSliceCustomQuery";

export const store = configureStore({
  reducer: {
    // [api.reducerPath]: api.reducer,
    [customApi.reducerPath]: customApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // api.middleware,
    customApi.middleware,
  ],
});
