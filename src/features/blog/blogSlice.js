import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBlog: build.query({
      query: ({ page = 1, limit = 50, search = "", tag = "" } = {}) =>
        `/blogs/?page=${page}&limit=${limit}&search=${search}&tag=${tag}`,
      providesTags: (result) =>
        result
          ? [
              ...result.blogs.map((blog) => ({ type: "Blog", id: blog.id })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),

    createBlogs: build.mutation({
      query: (blogData) => ({ url: "/blogs/", method: "POST", body: blogData }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
    deleteBlogs: build.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
    updateBlogs: build.mutation({
      query: ({ blogId, ...blogData }) => ({
        url: `/blogs/${blogId}`,
        method: "PATCH",
        body: blogData,
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useCreateBlogsMutation,
  useDeleteBlogsMutation,
  useUpdateBlogsMutation,
} = blogApi;
