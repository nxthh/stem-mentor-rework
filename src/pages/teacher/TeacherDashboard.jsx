import { useState } from "react";
import HeroDashboard from "../../components/teacher/HeroDashboard";
import MyArticle from "../../components/teacher/MyArticle";
import MyBooks from "../../components/teacher/MyBooks";
import TopCourses from "../../components/teacher/TopCourses";

export default function TeacherDashboard() {
  const [activeSection, setActiveSection] = useState("courses"); // all, courses, articles, books

  return (
    <div>
      <HeroDashboard />

      <div className="  px-5 sm:px-0">
        <div className="container mx-auto mt-5 flex gap-3 justify-start sm:w-250 ">
          <button
            onClick={() => setActiveSection("courses")}
            className={`text-gray-500 rounded-md h-[60px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
              activeSection === "courses"
                ? "bg-primary text-white"
                : "bg-white dark:bg-darksecbg text-gray-700 dark:text-darktext"
            }`}
          >
            Top Courses
          </button>
          <button
            onClick={() => setActiveSection("articles")}
            className={`text-gray-500 rounded-md h-[60px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
              activeSection === "articles"
                ? "bg-primary text-white"
                : "bg-white dark:bg-darksecbg text-gray-700 dark:text-darktext"
            }`}
          >
            My Articles
          </button>
          <button
            onClick={() => setActiveSection("books")}
            className={`text-gray-500 rounded-md h-[60px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
              activeSection === "books"
                ? "bg-primary text-white"
                : "bg-white dark:bg-darksecbg text-gray-700 dark:text-darktext"
            }`}
          >
            My Books
          </button>
        </div>
      </div>

      <div className="container mx-auto mt-5">
        {activeSection === "courses" && <TopCourses />}
        {activeSection === "articles" && <MyArticle />}
        {activeSection === "books" && <MyBooks />}
      </div>
    </div>
  );
}
