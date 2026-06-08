import CourseProgressCard from "../../components/courses/CourseProgressCard";

import { useGetEnrollmentQuery } from "../../features/enroll/courseEnrollment";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  const {
    data: myEnrollment = [],
    isLoading,
    error,
    refetch,
  } = useGetEnrollmentQuery(user?.id, {
    skip: !user?.id, // don't fetch if no user
    refetchOnMountOrArgChange: true,
  });
  if (isLoading)
    return (
      <div className="container mx-auto py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg h-[200px]"
          ></div>
        ))}
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load enrolled courses.
      </div>
    );

  const totalEnrollments = myEnrollment.length;

  const completedCourses = myEnrollment.filter(
    (course) => course.is_completed || course.process_percentage === 100
  );
  const inProgressCourses = myEnrollment.filter(
    (course) => !(course.is_completed || course.process_percentage === 100)
  );

  return (
    <div>
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/StudentDashboardBanner.jpg"
          alt="Student Dashboard Banner"
          className="absolute inset-0 w-full h-full object-cover brightness-70 dark:opacity-50"
        />
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative text-center text-white px-4 dark:text-darktext">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg dark:text-white">
            My Learning
          </h1>
          <p className="text-lg md:text-xl mt-3 font-medium text-gray-200">
            Continue your journey and track your course progress.
          </p>
          <p className="text-lg md:text-xl mt-3 font-medium text-gray-200">
            Total Course Enrollments: {totalEnrollments}
          </p>
        </div>
      </div>

      {/* ===== In Progress Courses ===== */}
      <div className="mt-[30px] px-20 mx-auto container">
        <h2 className="text-primary dark:text-darktext text-[42px] font-bold">
          In Progress <span className="text-secondary">Courses</span>
        </h2>
        <h3 className="text-primary dark:text-darktext text-[24px] font-medium">
          Total: {inProgressCourses.length}
        </h3>

        {inProgressCourses.length > 0 ? (
          <div className="container mt-[30px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center md:justify-items-start">
            {inProgressCourses.map((course) => (
              <CourseProgressCard
                key={course.enrollment_id}
                enrollmentId={course.enrollment_id}
                courseId={course.course_id}
                title={course.title}
                thumbnail={course.thumbnail}
                progress={course.process_percentage}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-5 dark:text-darktext">
            No courses in progress yet.
          </p>
        )}
      </div>

      {/* ===== Completed Courses ===== */}
      <div className="mt-[60px] px-20 mx-auto container">
        <h2 className="text-primary dark:text-darktext text-[42px] font-bold">
          Completed <span className="text-secondary">Courses</span>
        </h2>
        <h3 className="text-primary dark:text-darktext text-[24px] font-medium">
          Total: {completedCourses.length}
        </h3>

        {completedCourses.length > 0 ? (
          <div className="container mt-[30px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center md:justify-items-start">
            {completedCourses.map((course) => (
              <CourseProgressCard
                key={course.enrollment_id}
                enrollmentId={course.enrollment_id}
                courseId={course.course_id}
                title={course.title}
                thumbnail={course.thumbnail}
                progress={course.process_percentage}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-darktext mt-5">
            No completed courses yet.
          </p>
        )}
      </div>

      {/* <div className="flex justify-center gap-3 my-10">
        <button className="px-3 py-2 bg-white rounded hover:bg-secondary hover:text-white flex items-center gap-2">
          <MdOutlineKeyboardArrowLeft /> Back
        </button>
        <button className="px-3 py-2 bg-white rounded hover:bg-secondary hover:text-white flex items-center gap-2">
          Next <MdOutlineKeyboardArrowRight />
        </button>
      </div> */}
    </div>
  );
}
