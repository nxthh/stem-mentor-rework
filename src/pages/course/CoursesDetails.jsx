import React, { useEffect, useState, useMemo } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuizModal from "./QuizModal";
import { useGetAllCoursesQuery } from "../../features/courses/courseSlice";
import {
  useEnrollCourseMutation,
  useGetEnrollmentQuery,
} from "../../features/enroll/courseEnrollment";
import { useGetTeacherInfoQuery } from "../../features/users/userSlice";
import { useGetAllCategoriesQuery } from "../../features/data/categorySlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CourseDetailsSkeleton from "../../components/courses/CourseDetailsSkeleton";

export default function CoursesDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: courses = [], isLoading: coursesLoading } =
    useGetAllCoursesQuery();
  const { data: enrollments = [] } = useGetEnrollmentQuery();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(id));

  // Get teacher info only if course exists
  const { data: teacher, isLoading: teacherLoading } = useGetTeacherInfoQuery(
    course?.teacher_id,
    {
      skip: !course?.teacher_id,
    }
  );

  const [view, setView] = useState("overview");
  const [openLessonIndex, setOpenLessonIndex] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [enrollCourse, { isLoading: isEnrolling }] = useEnrollCourseMutation();

  // Set first lesson open when course loads
  useEffect(() => {
    if (course?.lessons?.length > 0) {
      setOpenLessonIndex(0);
    }
  }, [course]);

  // Memoized category name
  const courseCategory = useMemo(() => {
    return (
      categories.find((c) => c.id === course?.category_id)?.name || "General"
    );
  }, [categories, course]);

  const selectedLesson = course?.lessons?.[openLessonIndex];

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please log in to enroll in this course!");
      navigate("/login");
      return;
    }
    try {
      await enrollCourse({ courseId: course.id }).unwrap();
      toast.success("🎉 Enrollment successful!");
      navigate("/my-learning");
    } catch (err) {
      if (err?.data?.detail?.includes("Already enroll")) {
        toast.info("✅ You are already enrolled in this course!");
        navigate("/my-learning");
      } else {
        toast.error("❌ Enrollment failed. Please try again.");
      }
    }
  };

  const openQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsQuizOpen(true);
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
    setIsQuizOpen(false);
  };

  if (coursesLoading || categoriesLoading) return <CourseDetailsSkeleton />;
  if (!course)
    return (
      <div className="w-full flex justify-center items-center  flex-col gap-6 mt-10">
        <h1 className="font-bold text-primary dark:text-white text-3xl">
          Courses Not Found!
        </h1>
        <img
          className="h-[60vh] "
          src="https://www.chelsford.com/assets/images/not_found.png "
          alt="course not found"
        />
      </div>
    );

  return (
    <div className="p-4 sm:p-6 container mx-auto">
      <QuizModal
        course={course}
        lesson={selectedLesson}
        isOpen={isQuizOpen}
        onClose={closeQuiz}
        quiz={selectedQuiz}
      />

      <Link
        to="/courses"
        className="flex items-center text-primary dark:text-darktext gap-3 mb-6 text-sm sm:text-base font-semibold underline-offset-2"
      >
        <IoIosArrowBack /> <span className="underline">{t("back")}</span>
      </Link>

      {/* Course Header */}
      <div className="bg-white dark:bg-darksecbg rounded-md flex flex-wrap justify-between md:flex-2 gap-15 p-4 sm:p-6 md:p-6 items-center">
        <div className="max-w-sm">
          <h1 className="text-xl sm:text-3xl font-bold text-primary dark:text-secondary">
            {course.title}
          </h1>

          <div className="flex flex-wrap flex-col items-start gap-x-4 gap-y-2 justify-start mt-2">
            {/* Instructor Info */}
            <div className="flex items-center gap-5 dark:text-white">
              <img
                src={teacher?.profile_url || "https://via.placeholder.com/45"}
                alt={teacher?.full_name || "Instructor"}
                className="rounded-full w-[40px] h-[40px] object-cover sm:w-[45px] sm:h-[45px] mt-4"
              />
              <h2 className="text-lg sm:text-xl font-semibold mt-4">
                {teacher?.full_name || "Unknown Instructor"}
              </h2>
            </div>

            {/* Tags */}
            <div className="flex justify-start items-start flex-wrap flex-col gap-2 sm:gap-4  mt-3 ml-0">
              <span className=" px-2 h-[22px] text-xs sm:text-sm  font-medium flex items-center justify-center rounded-md">
                <span className="pr-4 dark:text-darktext"> Category :</span>{" "}
                <span className=" bg-[#EEF2FF] px-2 h-[22px] text-xs sm:text-sm text-[#4F46E5] font-medium flex items-center justify-center rounded-md">
                  {courseCategory}
                </span>
              </span>
              <span className=" px-2 h-[22px] text-xs sm:text-sm  font-medium flex items-center justify-center rounded-md">
                <span className="pr-4 text-start dark:text-darktext">
                  {" "}
                  Tags :
                </span>{" "}
                <div className="flex flex-wrap gap-2">
                  {course.tags && course.tags.length > 0 ? (
                    course.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-[#fefbf2] px-2 h-[22px] text-xs sm:text-sm text-secondary font-medium flex items-center justify-center rounded-md"
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span className="bg-[#fefbf2] px-2 h-[22px] text-xs sm:text-sm text-secondary font-medium flex items-center justify-center rounded-md">
                      No Tags
                    </span>
                  )}
                </div>
              </span>
            </div>

            {/* Enroll Button */}
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="mt-5  sm:flex gap-2 bg-gradient-to-r from-[#253C95] to-[#0055CD] font-semibold font-mono text-white p-2 px-4 rounded-md items-center hover:opacity-90 transition focus:ring-offset-2 focus:ring-2 ring-primary"
            >
              {isEnrolling ? "Enrolling..." : `${t("enroll now")}`}
            </button>
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="">
          <img
            className="w-full lg:w-md lg:h-[full] h-60 object-cover rounded-md"
            src={course.thumbnail}
            alt={course.title}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mt-4">
        <div className="bg-white rounded-md lg:col-span-3 dark:bg-darksecbg">
          <div className="p-4 sm:p-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView("overview")}
                className={`text-gray-500 rounded-md h-[40px] sm:h-[61px] px-4 py-2 text-sm font-medium sm:text-base transition duration-300 ${
                  view === "overview"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {t("overview")}
              </button>
              <button
                onClick={() => setView("lesson")}
                className={`text-gray-500 rounded-md h-[40px] sm:h-[61px] px-4 py-2 text-sm font-medium sm:text-base transition duration-300 ${
                  view === "lesson"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {t("lessons")}
              </button>
            </div>
            <hr className="border-gray-200 mt-5" />
          </div>

          {/* Overview / Lessons */}
          {view === "overview" ? (
            <div className="px-4 sm:px-6 pb-6">
              <div>
                <div className="items-center flex flex-wrap">
                  <h3 className="text-[#464646] dark:text-white font-bold text-xl sm:text-2xl flex">
                    {t("about this courses")}
                  </h3>
                  {/* <div className="flex gap-4 items-center ml-0 sm:ml-5 mt-2 sm:mt-0">
                    <span className="bg-green-500 text-sm sm:text-base px-3 sm:px-5 py-1 gap-2 h-auto text-white font-semibold flex items-center justify-center rounded-md">
                      <AiFillLike className="text-lg" /> {course.likes || 0}
                    </span>
                    <span className="bg-red-500 text-sm sm:text-base gap-2 px-3 sm:px-5 py-1 h-auto text-white font-semibold flex items-center justify-center rounded-md">
                      <AiFillDislike className="text-lg" />{" "}
                      {course.dislikes || 0}
                    </span>
                  </div> */}
                </div>
                <p className="text-[#000000] dark:text-darktext text-sm sm:text-[16px] mt-4">
                  {course.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="px-4 sm:px-6 pb-6">
              {selectedLesson && (
                <div>
                  <h3 className="text-[#464646] dark:text-white font-bold text-xl sm:text-2xl flex">
                    {t("lessons")} {openLessonIndex + 1}: {selectedLesson.title}
                  </h3>
                  <p className="text-gray-700 mt-4  dark:text-darktext">
                    {selectedLesson.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lessons Sidebar */}
        <div className="col-span-1 lg:col-span-2 dark:bg-darksecbg bg-white text-primary rounded-md p-4 sm:p-6 order-first lg:order-none">
          <h2 className="text-xl sm:text-2xl mb-3 font-semibold">
            {t("all lessons")}
          </h2>
          <ul className="space-y-3">
            {course.lessons?.map((lesson, index) => (
              <li
                key={lesson.id}
                className={`cursor-pointer border p-3 rounded-md bg-gray-100 dark:bg-darksecbg dark:text-darktext transition duration-300 ${
                  openLessonIndex === index
                    ? "border-secondary ring-2 ring-secondary text-primary"
                    : "border-gray-200 hover:border-primary"
                }`}
              >
                <button
                  onClick={() => {
                    setOpenLessonIndex(index);
                    setView("lesson");
                  }}
                  className="text-left font-semibold w-full flex items-center text-sm sm:text-lg"
                >
                  {index + 1}. {lesson.title}
                </button>
                {lesson.quiz && (
                  <button
                    onClick={() => openQuiz(lesson.quiz)}
                    className="mt-2 ml-8 text-xs sm:text-sm px-3 py-1 border rounded-md bg-white text-secondary underline hover:bg-secondary hover:text-white transition"
                  >
                    Quizzes
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
