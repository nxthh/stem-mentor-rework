import React from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetMyCoursesQuery } from "../../features/courses/courseSlice";
import { useNavigate, Link } from "react-router-dom";

export default function TopCourses() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyCoursesQuery();

  const myCourses =
    data?.filter((course) => course.teacher_id === user?.id) || [];

  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="gap-5 sm:w-250 mx-auto mt-5">
      <div className="bg-white dark:bg-darksecbg p-5 sm:col-span-8 rounded-md">
        <h3 className="font-bold text-primary dark:text-darktext text-4xl mb-5">
          Top <span className="text-secondary">Courses</span>
        </h3>

        <div className="p-5 pt-0 rounded-md w-full">
          <hr className="border-gray-200 border-1 my-5" />

          <div className="space-y-4">
            {myCourses.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No courses found.
              </p>
            ) : (
              myCourses.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-3 hover:scale-105 duration-150 hover:bg-primary hover:text-white p-2 rounded-[12px]"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-[118px] h-[118px] rounded-[12px] object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[15px] dark:text-white">
                      {course.title}
                    </h4>
                    <p className="text-sm line-clamp-1 hover:text-white dark:text-darktext">
                      {course.description}
                    </p>
                  </div>
                  <div className="font-medium text-center w-20">
                    {course.students}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between mt-5">
            <Link
              to="/all-courses"
              className="flex items-center gap-2 font-semibold underline text-primary dark:text-darktext cursor-pointer"
            >
              See All Courses <FaArrowRight />
            </Link>

            <div className="flex justify-center items-center hover:scale-105 duration-200">
              <button
                onClick={() => navigate("/create-courses")}
                className="flex-col bg-primary p-2 w-[100%] sm:max-w-sm rounded-md text-white h-20 flex justify-center items-center gap-2"
              >
                <FaPlus className="text-primary bg-white text-[22px] p-1 rounded-full" />
                Upload Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
