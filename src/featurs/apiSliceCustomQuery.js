import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchData } from "./Api";

export const customApi = createApi({
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getCustomQueryTasks: builder.query({
      queryFn: async () => {
        const response = await fetchData(`/tasks`, "get");
        return response;
      },
      transformResponse: (tasks) => tasks.reverse(), // to modify the api response
      providesTags: ["Tasks"], // do auto fetch after mutation
    }),
    addCustomQueryTask: builder.mutation({
      queryFn: async (task) => {
        const response = await fetchData(`/tasks`, "post", task);
        return response;
      },
      invalidatesTags: ["Tasks"],
    }),
    updateCustomQueryTask: builder.mutation({
      queryFn: async ({ id, ...payload }) => {
        const response = await fetchData(`/tasks/${id}`, "patch", payload);
        return response;
      },
      invalidatesTags: ["Tasks"],
    }),
    deleteCustomQueryTask: builder.mutation({
      queryFn: async (id) => {
        const response = await fetchData(`/tasks/${id}`, "delete");
        return response;
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useAddCustomQueryTaskMutation,
  useDeleteCustomQueryTaskMutation,
  useUpdateCustomQueryTaskMutation,
  useGetCustomQueryTasksQuery,
} = customApi;
