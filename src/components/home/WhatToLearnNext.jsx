import React, { useRef, useState, useEffect } from "react";
import CourseCard from "../courses/CourseCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { data, Link } from "react-router-dom";
import { useGetAllCoursesQuery } from "../../features/courses/courseSlice";
import { useGetAllCategoriesQuery } from "../../features/data/categorySlice";
import { useTranslation } from "react-i18next";

export default function WhatToLearnNext() {
  const { data: coursesData = [], isLoading } = useGetAllCoursesQuery();
  console.log(coursesData);
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };
  const [teachers, setTeachers] = useState({});

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) scroller.addEventListener("scroll", handleScroll);
    return () =>
      scroller && scroller.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    async function fetchTeachers() {
      const teacherData = {};
      await Promise.all(
        coursesData.map(async (course) => {
          if (!teacherData[course.teacher_id]) {
            try {
              const res = await fetch(
                `https://stem-api.anajak-khmer.site/users/teachers/${course.teacher_id}`
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
        })
      );
      setTeachers(teacherData);
    }

    if (coursesData.length > 0) fetchTeachers();
  }, [coursesData]);
  console.log(teachers);
  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();
  const { t, i18n } = useTranslation();
  return (
    <div className="mt-20">
      <h2 className="text-[40px] font-semibold text-[#253C95] dark:text-darkprimary">
        {i18n.language === "km" ? (
          <>
            ចាប់ផ្តើម <span className="text-[#FFA500]">រៀន</span> ថ្ងៃនេះ
          </>
        ) : (
          <>
            Start <span className="text-[#FFA500]">Learning</span> Today
          </>
        )}
      </h2>

      <p className="text-[#6A6A6A] mt-1 dark:text-darktext">
        {i18n.language === "km"
          ? "មុខវិជ្ជាល្អៗជាច្រើនដែលអ្នកអាចជ្រើសរើសបាន"
          : "Many great courses for you to choose from"}
      </p>

      <div className="flex items-center justify-end mt-4 ">
        {/* Progress bar */}
        <div className="relative w-50 h-2 bg-[#253C95] rounded-full mr-4">
          <div
            className="absolute h-2 bg-[#FFA500] rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 hover:bg-primary hover:text-white text-primary rounded-full bg-gray-200 flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full hover:bg-primary hover:text-white text-primary  bg-gray-200 flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 mt-6 pb-4 scroll-smooth no-scrollbar px-4 pt-2 "
      >
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, idx) => <CourseCard key={idx} loading />)
          : [...coursesData]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 7)
              .map((course) => {
                const teacher = teachers[course.teacher_id];

                return (
                  <Link key={course.id} to={`/courses/${course.id}`}>
                    <div className=" w-[304px] lg:w-auto">
                      <CourseCard
                        img={course.thumbnail}
                        title={course.title}
                        instructor_profile={teacher?.profile_url || ""}
                        instructor_name={teacher?.full_name || "Unknown"}
                        enrolled={course.enrolled}
                        likes={course.likes}
                        category={
                          categoriesData.find(
                            (cat) => cat.id === course.category_id
                          )?.name || "Uncategorized"
                        }
                      />
                    </div>
                  </Link>
                );
              })}
      </div>
    </div>
  );
}
