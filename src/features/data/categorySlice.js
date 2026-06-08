import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query({
      query: () => "/categories/",
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
