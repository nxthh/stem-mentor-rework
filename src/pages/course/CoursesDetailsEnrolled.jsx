import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import QuizModal from "./QuizModal";
import { useGetAllCoursesQuery } from "../../features/courses/courseSlice";
import {
  useCompleteLessonMutation,
  useGetEnrollmentQuery,
  useGetCompletedLessonsQuery,
} from "../../features/enroll/courseEnrollment";
import { toast } from "react-toastify";
import { useGetTeacherInfoQuery } from "../../features/users/userSlice";
import { useTranslation } from "react-i18next";

export default function CoursesDetailsEnrolled() {
  const { courseId, enrollmentId } = useParams();
  const { t } = useTranslation();
  const { data: courses = [], isLoading: coursesLoading } =
    useGetAllCoursesQuery();

  const { data: enrollmentProgress, isLoading: progressLoading } =
    useGetCompletedLessonsQuery(enrollmentId, {
      skip: !enrollmentId,
    });

  const course = courses.find((c) => String(c.id) === courseId);
  const { data: teacher, isLoading: teacherLoading } = useGetTeacherInfoQuery(
    course?.teacher_id,
    { skip: !course?.teacher_id }
  );
  console.log(teacher);
  const [view, setView] = useState("overview");
  const [openLessonIndex, setOpenLessonIndex] = useState(0);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [completeLesson] = useCompleteLessonMutation();

  const [localCompleted, setLocalCompleted] = useState(new Set());

  useEffect(() => {
    if (enrollmentProgress?.completed_lessons) {
      const completedIds = new Set(
        enrollmentProgress.completed_lessons.map((lesson) => lesson.id)
      );
      setLocalCompleted(completedIds);
    }
  }, [enrollmentProgress]);

  // Set first lesson open
  useEffect(() => {
    if (course?.lessons?.length > 0) setOpenLessonIndex(0);
  }, [course]);

  if (coursesLoading || progressLoading)
    return <p className="text-center mt-20">Loading...</p>;

  if (!course) return <p className="text-center mt-20">Course not found</p>;

  if (!enrollmentProgress)
    return (
      <p className="text-center mt-20">You are not enrolled in this course.</p>
    );

  const selectedLesson = course.lessons?.[openLessonIndex];

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regex = /(?:youtu\.be\/|v=)([\w-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const openQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setIsQuizOpen(true);
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
    setIsQuizOpen(false);
  };

  const handleCompleteLesson = async (lesson) => {
    if (localCompleted.has(lesson.id)) {
      return;
    }

    try {
      await completeLesson(lesson.id).unwrap();

      setLocalCompleted((prev) => new Set([...prev, lesson.id]));
      toast.success(`Lesson "${lesson.title}" marked as completed!`);
    } catch (err) {
      console.error(err);
    }
  };

  const isLessonIncomplete = (lessonId) => {
    return enrollmentProgress?.incomplete_lessons?.some(
      (lesson) => lesson.id === lessonId
    );
  };

  return (
    <div className="p-4 sm:p-6 container mx-auto">
      <QuizModal
        course={course}
        lesson={selectedLesson}
        isOpen={isQuizOpen}
        onClose={closeQuiz}
        quiz={selectedQuiz}
      />

      <h1 className="text-xl sm:text-3xl font-bold text-primary dark:text-white">
        {course.title}
      </h1>

      <Link
        to="/my-learning"
        className="flex items-center text-primary gap-3 mt-2 text-sm sm:text-base dark:text-white"
      >
        <IoIosArrowBack /> <span className="underline">{t("back")}</span>
      </Link>

      {/* Video */}
      {selectedLesson && (
        <div className="mt-4 sm:mt-6 rounded-md">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-md dark:text-white"
              src={getEmbedUrl(selectedLesson.video_url)}
              title={selectedLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mt-4">
        {/* Main Content */}
        <div className="bg-white dark:bg-darksecbg rounded-md lg:col-span-3">
          <div className="p-4 sm:p-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView("overview")}
                className={`text-gray-500 rounded-md h-[40px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
                  view === "overview"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("overview")}
              </button>
              <button
                onClick={() => setView("lesson")}
                className={`text-gray-500 rounded-md h-[40px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
                  view === "lesson"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("lessons")}
              </button>
            </div>
            <hr className="border-gray-200 mt-2" />
          </div>

          {view === "overview" ? (
            <div className="px-4 sm:px-6 pb-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-start">
                <img
                  src={teacher?.profile_url || "https://via.placeholder.com/45"}
                  alt=""
                  className="rounded-full w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] mt-4"
                />
                <h2 className="text-lg sm:text-xl font-semibold mt-4 dark:text-white">
                  {teacher?.full_name || "Unknown Instructor"}
                </h2>
              </div>
              <div className="mt-4">
                <h3 className="text-[#464646] font-bold text-xl sm:text-2xl flex py-5 dark:text-white">
                  {t("about this courses")}
                </h3>
                <p className="text-[#000000] text-sm sm:text-[16px] dark:text-darktext">
                  {course.description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 dark:text-white">
                  {t("your progress")}
                </h4>
                <div className="w-full bg-gray-200  rounded-full h-4">
                  <div
                    className="bg-secondary h-4 rounded-full transition-all duration-300  "
                    style={{
                      width: `${enrollmentProgress.progress_percentage}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 dark:text-darktext">
                  {enrollmentProgress.completed_lessons?.length || 0} of{" "}
                  {enrollmentProgress.total_lessons} {t("lessons completed")} (
                  {Math.round(enrollmentProgress.progress_percentage)}%)
                </p>
              </div>
            </div>
          ) : (
            <div className="px-4 sm:px-6 pb-6">
              {selectedLesson && (
                <div>
                  <h3 className="text-[#464646] font-bold text-xl sm:text-2xl flex py-5 dark:text-white">
                    {t("lessons")} {openLessonIndex + 1}: {selectedLesson.title}
                  </h3>
                  <p className="text-gray-700 dark:text-darktext">
                    {selectedLesson.description}
                  </p>
                  <div className="text-[#000000] text-sm sm:text-[16px] dark:text-darktext">
                    <p className="text-2xl font-bold py-5 text-gray-600 dark:text-darktext ">
                      Attachments:
                    </p>
                    {selectedLesson.attachments &&
                    selectedLesson.attachments.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {selectedLesson.attachments.map((file, index) => (
                          <li key={index}>
                            <a
                              href={file.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {file.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No attachments</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lessons Sidebar */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-darksecbg text-primary rounded-md p-4 sm:p-6 order-first lg:order-none">
          <h2 className="text-xl sm:text-2xl mb-3 font-semibold  dark:text-white">
            {t("all lessons")}
          </h2>
          <ul className="space-y-3">
            {course.lessons?.map((lesson, index) => {
              const isCompleted = localCompleted.has(lesson.id);
              const isIncomplete = isLessonIncomplete(lesson.id);

              return (
                <li
                  key={lesson.id}
                  className={`cursor-pointer   dark:border-0 border p-3 rounded-[12px] bg-gray-100 dark:bg-darkbg transition duration-300 ${
                    openLessonIndex === index
                      ? "border-secondary ring-2 ring-secondary text-primary"
                      : "border-gray-200 hover:border-primary"
                  }`}
                >
                  <button
                    onClick={() => setOpenLessonIndex(index)}
                    className="text-left w-full font-semibold flex items-center text-sm sm:text-lg"
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      disabled={isCompleted}
                      onChange={() => handleCompleteLesson(lesson)}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening lesson when clicking checkbox
                        if (!isCompleted && isIncomplete) {
                          handleCompleteLesson(lesson);
                        }
                      }}
                      className={` dark:text-white mr-3 h-5 w-5 appearance-none rounded-md border-2   border-primary checked:bg-secondary checked:border-secondary flex-shrink-0 
                        ${
                          isIncomplete
                            ? "cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                        }
                        ${isCompleted ? "cursor-not-allowed" : ""}
                      `}
                      title={
                        isCompleted
                          ? "Lesson completed"
                          : isIncomplete
                          ? "Click to mark as complete"
                          : "Complete previous lessons first"
                      }
                    />
                    <span className="dark:text-darktext">
                      {index + 1}. {lesson.title}
                    </span>
                    {isCompleted && (
                      <span className="ml-2 text-xs text-green-500">
                        ✓ Completed
                      </span>
                    )}
                  </button>

                  {lesson.quiz && (
                    <button
                      onClick={() => openQuiz(lesson.quiz)}
                      className="mt-2 ml-8 text-xs sm:text-sm px-3 py-1 border rounded-lg bg-white text-secondary underline hover:bg-secondary hover:text-white transition"
                    >
                      Quizzes
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
