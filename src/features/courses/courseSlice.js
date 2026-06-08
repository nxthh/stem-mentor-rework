import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCourses: build.query({
      query: () => "/courses/?skip=0&limit=50",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Course", id })),
              { type: "Course", id: "LIST" },
            ]
          : [{ type: "Course", id: "LIST" }],
    }),
    getMyCourses: build.query({
      query: () => "/courses/get-own-course",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Course", id })),
              { type: "Course", id: "LIST" },
            ]
          : [{ type: "Course", id: "LIST" }],
      onError: (error) => {
        console.log("Error getting own course : ", error);
      },
    }),
    uploadFile: build.mutation({
      query: (formData) => ({
        url: "/files/upload",
        method: "POST",
        body: formData,
      }),
    }),
    createCourse: build.mutation({
      query: (formData) => ({
        url: "/courses/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Course", id: "LIST" }],
    }),
    updateCourse: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
    }),
    addLessons: build.mutation({
      query: ({ courseId, lessons }) => ({
        url: `/courses/${courseId}/lessons`,
        method: "POST",
        body: lessons,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),
    deleteLessons: build.mutation({
      query: ({ courseId, lessonId }) => ({
        url: `/courses/${courseId}/lessons/${lessonId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),
    deleteCourses: build.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetMyCoursesQuery,
  useUploadFileMutation,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useAddLessonsMutation,
  useDeleteLessonsMutation,
  useDeleteCoursesMutation,
} = courseApi;
