import React, { useState } from "react";
import UserProfileCard from "../components/cards/UserProfileCard";
import UserInfoCard from "../components/cards/UserInfoCard";
import ChangePassword from "../components/cards/ChangePassword";
import { useSelector } from "react-redux";
import {
  useGetUserInfoQuery,
  useGetTeacherInfoQuery,
} from "../features/users/userSlice";
import {
  useGetAllBlogQuery,
  useDeleteBlogsMutation,
} from "../features/blog/blogSlice";
import BlogCard from "../components/blog/BlogCard";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const navigate = useNavigate();
  const [view, setView] = useState("about-me");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { t } = useTranslation();
  const userState = useSelector((state) => state.auth.user);
  const userId = userState?.id;
  const role = userState?.role;

  // --- Ensure userId exists before running hooks ---
  const {
    data: teacherData,
    isLoading: teacherLoading,
    isError: teacherError,
  } = useGetTeacherInfoQuery(userId ?? "", {
    skip: role !== "teacher" || !userId,
  });
  const {
    data: studentData,
    isLoading: studentLoading,
    isError: studentError,
  } = useGetUserInfoQuery(userId ?? "", {
    skip: role !== "student" || !userId,
  });

  const user = role === "teacher" ? teacherData : studentData;
  const isLoading = role === "teacher" ? teacherLoading : studentLoading;
  const isError = role === "teacher" ? teacherError : studentError;

  // Blogs
  const { data: blogsData, isLoading: blogLoading } = useGetAllBlogQuery();
  const [deleteBlog] = useDeleteBlogsMutation();

  const userBlogs = blogsData?.blogs?.filter(
    (blog) => blog.author_id === userId
  );

  // Popup
  const openPopup = (blog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
    setSelectedBlog(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBlog) return;
    try {
      await deleteBlog(selectedBlog.id).unwrap();
      toast.success(`Blog "${selectedBlog.title}" deleted successfully!`);
      closePopup();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting blog.");
    }
  };

  if (!userId) return <p className="text-center mt-20">Loading user...</p>;
  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (isError)
    return <p className="text-center mt-20">Failed to load user info</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-40">
      {/* Profile Card */}
      <div className="mt-6">
        <UserProfileCard
          avatar={user.profile_url}
          full_name={user.full_name}
          bio={user.bio}
        />
      </div>

      {/* View Switch */}
      <div className="flex gap-2 mt-5">
        <button
          onClick={() => setView("about-me")}
          className={`text-gray-500 rounded-md h-[40px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
            view === "about-me"
              ? "bg-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:text-darktext dark:bg-darkbg"
          }`}
        >
          {t("about me")}
        </button>
        <button
          onClick={() => setView("my-blog")}
          className={`text-gray-500 rounded-md h-[40px] sm:h-[61px] px-4 py-2 text-sm sm:text-base transition duration-300 ${
            view === "my-blog"
              ? "bg-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:text-darktext dark:bg-darkbg"
          }`}
        >
          {t("my blogs")}
        </button>
      </div>

      {view === "about-me" ? (
        <>
          <div className="mt-6 transition-opacity duration-500 animate-fadeIn">
            <UserInfoCard
              full_name={user.full_name}
              date_of_birth={user.date_of_birth || "N/A"}
              gender={user.gender || "N/A"}
              email={user.email || "N/A"}
              address={user.address || "N/A"}
              phone_number={user.phone_number || "N/A"}
              userId={user.id}
              bio={user.bio}
              profile_url={user.profile_url}
            />
          </div>
          <div className="mt-6 transition-opacity duration-500 animate-fadeIn delay-200">
            <ChangePassword />
          </div>
        </>
      ) : (
        <div className="mt-5 transition-all duration-500 bg-white p-5 dark:bg-darksecbg rounded-md space-y-8 animate-fadeIn">
          <button
            onClick={() => navigate("/create-blog")}
            className="cursor-pointer mb-[50px] flex items-center dark:bg-darkbg dark:hover:scale-102 dark:hover:bg-darksecbg gap-[4px] px-[16px] py-[10px] rounded-[12px] text-primary text-[16px] ring-1 ring-primary w-[118px] h-[44px] justify-center"
          >
            <FaPlus />
            <p>Create</p>
          </button>

          {blogLoading ? (
            <p>Loading blogs...</p>
          ) : userBlogs && userBlogs.length > 0 ? (
            [...userBlogs]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((blog) => (
                <div
                  key={blog.id}
                  className="relative group rounded-lg dark:border p-5 transition-all duration-300 ease-out hover:border-primary"
                >
                  <div className="absolute top-7 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
                    <button
                      onClick={() => navigate(`/edit-blog/${blog.id}`)}
                      className="hover:text-blue-500 cursor-pointer text-blue-200 text-sm px-3 py-1 rounded-md"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => openPopup(blog)}
                      className="hover:text-red-500 cursor-pointer text-red-200 text-sm px-3 py-1 rounded-md"
                    >
                      <Trash />
                    </button>
                  </div>

                  <BlogCard
                    thumbnail={blog.thumbnail_url}
                    title={blog.title}
                    description={blog.content}
                    user_profile={user.profile_url}
                    username={user.full_name}
                    elapsed_time={blog.created_at}
                    like={0}
                    comment={0}
                    subject={blog.tags?.map((tag) => tag.name) || []}
                  />
                </div>
              ))
          ) : (
            <p className="text-gray-500 mt-5 text-center">
              You haven’t posted any blogs yet.
            </p>
          )}
        </div>
      )}

      <Popup open={isOpen} closeOnDocumentClick onClose={closePopup}>
        <div className="p-6 bg-white rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Confirm Delete
          </h3>
          {selectedBlog && (
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {selectedBlog.title}
              </span>
              ?
            </p>
          )}
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={closePopup}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
