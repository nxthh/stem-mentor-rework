import React from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllBlogQuery } from "../../features/blog/blogSlice";
import { useSelector } from "react-redux";

export default function MyArticle() {
  const navigate = useNavigate();
  const { data: blogsData, isLoading, isError } = useGetAllBlogQuery();
  const { user } = useSelector((state) => state.auth);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return (
      <p className="text-red-500 text-center mt-5">Failed to load blogs</p>
    );

  const blogs =
    blogsData?.blogs?.filter(
      (b) => b.userId === user?.id || b.author_id === user?.id
    ) || [];

  return (
    <div className="gap-5 sm:w-250 mx-auto">
      <div className="bg-white dark:bg-darksecbg p-5 sm:col-span-8 rounded-md">
        <h3 className="font-bold text-primary dark:text-darktext text-4xl mb-5">
          My <span className="text-secondary">Articles</span>
        </h3>

        <div className="p-5 pt-0 rounded-md w-full">
          <hr className="border-gray-200 border-1 my-5" />

          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No blogs found.
              </p>
            ) : (
              blogs
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 2)
                .map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center gap-3 hover:scale-105 duration-150 hover:bg-primary hover:text-white p-2 rounded-[12px]"
                  >
                    <img
                      src={blog.thumbnail_url || "/pdf-icon.png"}
                      alt={blog.title}
                      className="w-[118px] h-[118px] rounded-[12px] object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-[15px] dark:text-white">
                        {blog.title}
                      </h4>
                      <p className="text-sm line-clamp-1 hover:text-white dark:text-darktext">
                        {blog.content.replace(/<[^>]+>/g, "").slice(0, 60)}...
                      </p>
                    </div>
                  </div>
                ))
            )}
          </div>

          <div className="flex justify-between mt-5">
            <Link
              to="/all-blogs"
              className="flex items-center gap-2 font-semibold underline text-primary dark:text-darktext cursor-pointer"
            >
              See All Blogs <FaArrowRight />
            </Link>

            <div className="flex justify-center items-center hover:scale-105 duration-200">
              <button
                onClick={() => navigate("/create-blog")}
                className="flex-col bg-secondary p-2 w-[100%] sm:max-w-sm rounded-md text-white h-20 flex justify-center items-center gap-2"
              >
                <FaPlus className="text-secondary bg-white text-[22px] p-1 rounded-full" />
                Upload Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
