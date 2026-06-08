import { apiSlice } from "../api/apiSlice";

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: ({ page = 1, limit = 50, userId } = {}) => ({
        url: `/books/`,
        params: { page, limit, userId }, // add userId to filter by teacher
      }),
      providesTags: (result) =>
        result?.books
          ? [
              ...result.books.map(({ id }) => ({ type: "Book", id })),
              { type: "Book", id: "LIST" },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),
    createBook: build.mutation({
      query: (formData) => ({
        url: "/books/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Book", id: "LIST" }],
    }),
    updateBook: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
    }),
    deleteBook: build.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, bookId) => [
        { type: "Book", id: bookId },
      ],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
