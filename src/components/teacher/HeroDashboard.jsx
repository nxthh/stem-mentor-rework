import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { TbBooks } from "react-icons/tb";
import { IoNewspaper } from "react-icons/io5"; // <- fix here
import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../../features/books/booksAPI";
import { useGetAllBlogQuery } from "../../features/blog/blogSlice";
import { useGetMyCoursesQuery } from "../../features/courses/courseSlice";

export default function HeroDashboard() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  console.log(userId);
  // Fetch teacher's books
  const { data: booksData, isLoading: booksLoading } = useGetAllBooksQuery({
    userId,
    page: 1,
    limit: 100,
  });

  // Fetch teacher's courses
  const { data: coursesData, isLoading: coursesLoading } =
    useGetMyCoursesQuery();

  // Fetch blogs (all blogs, assuming teacher can only post some blogs)
  const { data: blogData, isLoading: blogLoading } = useGetAllBlogQuery();

  const totalBooks =
    booksData?.books?.filter((book) => book.author_id === userId)?.length || 0;
  const totalCourses =
    coursesData?.filter((course) => course.teacher_id === userId)?.length || 0;
  console.log("coursesData", coursesData);
  const totalBlogs =
    blogData?.blogs?.filter((blog) => blog.author_id === userId)?.length || 0;

  return (
    <div className="bg-white p-5 rounded-md container mx-auto sm:w-250 mt-5 flex flex-col flex-wrap dark:bg-darksecbg">
      <h2 className="text-2xl text-primary font-semibold dark:text-white">
        Welcome {user?.full_name || "Teacher"}
      </h2>
      <p className="text-gray-500 my-3 dark:text-gray-300">Dashboard</p>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 mx-auto container">
        <div className="bg-[#e2e8ff] p-4 rounded-md dark:bg-darkbg dark:text-white">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-full">
              <FaLaptopCode className="text-white w-[20px] h-[20px]" />
            </div>
            <span className="font-bold">
              {coursesLoading ? "..." : totalCourses}
            </span>
          </div>
          <p className="text-gray-500 mt-3">Total Courses</p>
        </div>

        <div className="bg-[#fafcdc] p-4 rounded-md dark:bg-darkbg dark:text-white">
          <div className="flex items-center gap-3">
            <div className="bg-secondary p-2 rounded-full">
              <IoNewspaper className="text-white" />
            </div>
            <span className="font-bold">
              {blogLoading ? "..." : totalBlogs}
            </span>
          </div>
          <p className="text-gray-500 mt-3">Total Blog</p>
        </div>

        <div className="bg-[#ffe8e8] p-4 rounded-md dark:bg-darkbg dark:text-white">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-full">
              <TbBooks className="text-white" />
            </div>
            <span className="font-bold">
              {booksLoading ? "..." : totalBooks}
            </span>
          </div>
          <p className="text-gray-500 mt-3">Total Books</p>
        </div>
      </div>
    </div>
  );
}
