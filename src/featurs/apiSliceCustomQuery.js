import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const fetchData = async (url, method, payload) => {
  if (method === "get") {
    return axios
      .get(url)
      .then((response) => response)
      .catch((error) => error.message);
  }
  if (method === "post") {
    return axios
      .post(url, payload)
      .then((response) => response)
      .catch((error) => error.message);
  }
  if (method === "patch") {
    return axios
      .patch(url, payload)
      .then((response) => response)
      .catch((error) => error.message);
  }
  if (method === "delete") {
    return axios
      .delete(url)
      .then((response) => response)
      .catch((error) => error.message);
  }
};

export const customApi = createApi({
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getCustomQueryTasks: builder.query({
      queryFn: async () => {
        const response = await fetchData(`http://localhost:3000/tasks`, "get");
        return response;
      },
      transformResponse: (tasks) => tasks.reverse(), // to modify the api response
      providesTags: ["Tasks"], // do auto fetch after mutation
    }),
    addCustomQueryTask: builder.mutation({
      queryFn: async (task) => {
        const response = await fetchData(
          `http://localhost:3000/tasks`,
          "post",
          task
        );
        return response;
      },
      invalidatesTags: ["Tasks"],
    }),
    updateCustomQueryTask: builder.mutation({
      queryFn: async ({ id, ...payload }) => {
        const response = await fetchData(
          `http://localhost:3000/tasks/${id}`,
          "patch",
          payload
        );
        return response;
      },
      invalidatesTags: ["Tasks"],
    }),
    deleteCustomQueryTask: builder.mutation({
      queryFn: async (id) => {
        const response = await fetchData(
          `http://localhost:3000/tasks/${id}`,
          "delete"
        );
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
