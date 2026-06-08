import React, { useState, useMemo } from "react";
import BlogCard from "../../components/blog/BlogCard";
import { FaPlus } from "react-icons/fa6";
import Searchbar from "../../components/courses/Searchbar";
import { useNavigate } from "react-router-dom";
import {
  useGetTeacherInfoQuery,
  useGetUserInfoQuery,
} from "../../features/users/userSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetAllBlogQuery } from "../../features/blog/blogSlice";

function BlogCardWithUser({ blog }) {
  const navigate = useNavigate();
  const { data: teacherData } = useGetTeacherInfoQuery(blog.author_id);
  const { data: studentData } = useGetUserInfoQuery(blog.author_id, {
    skip: !!teacherData,
  });
  const userData = teacherData || studentData;

  const username = userData ? `${userData.full_name}` : "Loading...";
  const userProfile = userData?.profile_url || "/src/assets/teacher3d.png";

  const handleClick = () => {
    navigate("/blog-details", {
      state: {
        ...blog,
        description: blog.content,
        thumbnail: blog.thumbnail_url,
        username,
        userProfile,
        like: 0,
        comment: 0,
        tags: blog.tags?.map((tag) => tag.name) || [],
      },
    });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <BlogCard
        user_profile={userProfile}
        username={username}
        elapsed_time={blog.created_at}
        title={blog.title}
        description={blog.content}
        thumbnail={blog.thumbnail_url}
        like={0}
        comment={0}
        subject={blog.tags?.map((tag) => tag.name) || []}
      />
    </div>
  );
}

export default function BlogList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 5;

  const { data, isLoading } = useGetAllBlogQuery();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  const handleCreateBlog = () => {
    if (user?.id) navigate("/create-blog");
    else {
      toast.info(t("Please log in to create a blog."));
      navigate("/login");
    }
  };

  const sortedBlogs = useMemo(() => {
    if (!data?.blogs) return [];

    const q = searchQuery.toLowerCase();

    const filtered = data.blogs.filter((blog) => {
      const titleMatch = blog.title?.toLowerCase().includes(q);
      const contentMatch = blog.content?.toLowerCase().includes(q);
      const tagMatch = blog.tags?.some((tag) =>
        tag.name.toLowerCase().includes(q)
      );
      const authorMatch = blog.author_name
        ? blog.author_name.toLowerCase().includes(q)
        : false;

      return titleMatch || contentMatch || tagMatch || authorMatch;
    });

    return filtered.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [data?.blogs, searchQuery]);

  const totalPages = Math.ceil(sortedBlogs.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPageBlogs = sortedBlogs.slice(startIndex, endIndex);

  return (
    <div>
      {/* Header */}
      <div className="bg-primary text-center py-6 sm:py-8 md:py-10 px-4">
        <h1 className="text-[#ebebeb] text-[30px] sm:text-[36px] md:text-[42px] font-bold">
          {i18n.language === "km"
            ? "ការយល់ដឹង និងច្នៃប្រឌិត STEM"
            : "STEM Insights & Innovations"}
        </h1>
        <h2 className="text-white text-[18px] sm:text-[20px] md:text-[24px] font-medium mt-2">
          {i18n.language === "km"
            ? "ស្វែងរកការចាប់ផ្តើមថ្មីៗ មេរៀន និងភាពដឹកនាំគំនិតក្នុងវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា"
            : "Explore the latest discoveries, tutorials, and thought leadership in science, technology"}
          <br className="hidden sm:block" />
          {i18n.language === "km"
            ? "វិស្វកម្ម និងគណិតវិទ្យា។"
            : "engineering, and mathematics."}
        </h2>

        <div className="mt-10">
          <Searchbar query={searchQuery} onSearch={setSearchQuery} />
        </div>
      </div>

      <h2 className="text-center my-6 sm:my-8 md:my-5 text-[#848383] dark:text-gray-100 text-[16px] sm:text-[18px] md:text-[20px] px-4">
        {t("Stay updated with the most recent developments")} <br />
        {t("and insights in STEM fields")}
      </h2>

      <div className="mx-auto container">
        <div className="bg-white dark:bg-darksecbg my-[30px] sm:my-[40px] md:my-[30px] rounded-md p-4 sm:p-8 md:p-[50px] sm:mx-8">
          <button
            onClick={handleCreateBlog}
            className="cursor-pointer dark:bg-darkbg w-auto hover:scale-105 transition duration-200 dark:text-white mb-[50px] flex items-center gap-[4px] px-[16px] py-[10px] rounded-md text-primary text-[16px] ring-1 ring-primary h-[44px] justify-center"
          >
            <FaPlus />
            <p>{t("Post Your Blog")}</p>
          </button>

          <div className="container space-y-[50px]">
            {isLoading ? (
              <p className="text-center text-gray-500 text-lg">
                {t("Loading...")}
              </p>
            ) : currentPageBlogs.length > 0 ? (
              currentPageBlogs.map((blog) => (
                <BlogCardWithUser key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">
                {t("No blogs found.")}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10 flex-wrap">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {t("Previous")}
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-4 py-2 rounded transition ${
                    page === idx + 1
                      ? "bg-secondary text-white scale-105"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {t("Next")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
