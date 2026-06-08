import { apiSlice } from "../api/apiSlice";

export const courseEnrollmentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getEnrollment: build.query({
      query: () => "/courses/enrollments",
      providesTags: (result = [], error, userId) => [
        { type: "Enrollment", id: userId || "LIST" }, // cache per user
      ],
    }),
    enrollCourse: build.mutation({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Enrollment", id: "LIST" }],
    }),
    completeLesson: build.mutation({
      query: (lessonId) => ({
        url: `/lessons/${lessonId}/complete`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Enrollment", id: courseId },
      ],
    }),
    getCompletedLessons: build.query({
      query: (enrolled_Id) => `/lessons/${enrolled_Id}/progress`,
      providesTags: (result, error, enrollmentId) => [
        { type: "Enrollment", id: enrollmentId },
      ],
    }),
    addAttachment: build.mutation({
      query: ({ lessonId }) => ({
        url: `/lessons/${lessonId}/attachments`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetEnrollmentQuery,
  useEnrollCourseMutation,
  useCompleteLessonMutation,
  useGetCompletedLessonsQuery,
} = courseEnrollmentApi;
