import React, { useState, useEffect } from "react";
import CourseCard from "../../components/courses/CourseCard";
import HeroSectionCourse from "../../components/courses/HeroSectionCourse";
import Searchbar from "../../components/courses/Searchbar";
import { Link } from "react-router-dom";
import NoData from "../../components/other/NoData";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useGetAllCoursesQuery } from "../../features/courses/courseSlice";
import { useGetAllCategoriesQuery } from "../../features/data/categorySlice";
import { useTranslation } from "react-i18next";

export default function Courses() {
  const { data: coursesData = [], isLoading: coursesLoading } =
    useGetAllCoursesQuery();
  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();

  const [teachers, setTeachers] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchTeachers() {
      const teacherData = {};
      await Promise.all(
        coursesData.map(async (course) => {
          if (!teacherData[course.teacher_id]) {
            try {
              const res = await fetch(
                `https://stem-api.anajak-khmer.site/users/teachers/${course.teacher_id}`,
              );
              if (res.ok) {
                const data = await res.json();
                teacherData[course.teacher_id] = data;
              } else {
                teacherData[course.teacher_id] = null;
              }
            } catch {
              teacherData[course.teacher_id] = null;
            }
          }
        }),
      );
      setTeachers(teacherData);
    }

    if (coursesData.length > 0) fetchTeachers();
  }, [coursesData]);

  const filteredCourses = coursesData.filter((course) => {
    const categoryName =
      categoriesData.find((cat) => cat.id === course.category_id)?.name || "";

    const matchCategory =
      selectedCategory === "All" || categoryName === selectedCategory;

    const matchSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      (course.tags?.some((tag) =>
        tag.name.toLowerCase().includes(search.toLowerCase()),
      ) ??
        false);

    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );

  const SKELETON_CARDS = 8;

  if (coursesLoading || categoriesLoading)
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(SKELETON_CARDS)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="w-4/5 h-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="w-3/5 h-5 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
                  <div className="w-3/4 h-2.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
                <div className="w-2/5 h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="">
      <HeroSectionCourse />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-10">
        <Searchbar
          query={search}
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex gap-4 flex-wrap justify-center my-10  ">
        <button
          onClick={() => {
            setSelectedCategory("All");
            setCurrentPage(1);
          }}
          className={`px-4 rounded-[8px]  ${
            selectedCategory === "All"
              ? "bg-primary text-white"
              : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-primary hover:text-white"
          }`}
        >
          {t("all")}
        </button>
        {categoriesData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.name);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-[8px] ${
              selectedCategory === cat.name
                ? "bg-primary text-white"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-primary hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {currentCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center px-4 container mx-auto ">
          {currentCourses.map((course) => {
            const teacher = teachers[course.teacher_id];
            return (
              <div
                key={course.id}
                className="space-y-2 items-center justify-center flex "
              >
                <Link to={`/courses/${course.id}`}>
                  <CourseCard
                    img={course.thumbnail}
                    title={course.title}
                    description={course.description}
                    instructor_name={teacher?.full_name || "Unknown"}
                    instructor_profile={teacher?.profile_url || ""}
                    category={
                      categoriesData.find(
                        (cat) => cat.id === course.category_id,
                      )?.name || "Uncategorized"
                    }
                  />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <NoData onClear={() => setSearch("")} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded bg-white hover:bg-secondary hover:text-white flex items-center gap-1"
          >
            <MdOutlineKeyboardArrowLeft />
            Back
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNumber
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 rounded bg-white hover:bg-secondary hover:text-white flex items-center gap-1"
          >
            Next
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
