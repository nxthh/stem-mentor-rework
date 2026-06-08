import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosArrowBack, IoIosMore } from "react-icons/io";
import { timeAgo } from "../../components/other/timeAgo";
import { useTranslation } from "react-i18next";
import { Share, Share2Icon } from "lucide-react";

export default function BlogDetails() {
  const { state } = useLocation();
  if (!state) return <p>Blog not found</p>;
  const { t } = useTranslation();
  const {
    thumbnail,
    title,
    description,
    userProfile,
    username,
    created_at,
    like,
    comment,
    tags = [],
  } = state;
  console.log(tags);
  const handleShare = async () => {
    const shareData = {
      title,
      text: `Check out this blog: ${title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Blog shared successfully");
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // fallback if browser doesn't support share
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  return (
    <div className="rounded-md max-w-5xl mx-auto mt-5">
      <Link
        to="/blogs"
        className="flex items-center text-primary  gap-3 mb-6 text-sm sm:text-base font-semibold underline-offset-2"
      >
        <IoIosArrowBack /> <span className="underline">Back</span>
      </Link>
      <div className="bg-white dark:bg-darksecbg rounded-md max-w-5xl mx-auto  p-8 shadow-md">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white">
          {title}
        </h1>

        {/* Author Info & Stats */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <img
              src={userProfile}
              alt={username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {username}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {timeAgo(created_at, t)}
              </p>
            </div>
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* <div className="flex items-center gap-1">
              <FaRegHeart />
              <span className="text-gray-600 dark:text-gray-300">{like}</span>
            </div>
            <div className="flex items-center gap-1">
              <BiComment />
              <span className="text-gray-600 dark:text-gray-300">
                {comment}
              </span>
            </div> 
            <div className="flex items-center gap-1">
              <BiComment />
              <span className="text-gray-600 dark:text-gray-300">
                {comment}
              </span>
            </div>

            <MdOutlineBookmarkAdd className="text-gray-600 dark:text-gray-300" />
            <IoIosMore className="text-gray-600 dark:text-gray-300" />
            */}
            <div
              onClick={() => handleShare()}
              className="p-2 hover:bg-primary rounded-full text-gray-600   dark:text-gray-300 hover:text-white cursor-pointer transition-[200s]"
            >
              <Share2Icon />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full rounded-md my-6 object-cover max-h-[400px]"
        />

        {/* Blog Content */}
        <div
          className="prose dark:prose-invert max-w-full mb-4 dark:text-white"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        {/* Tags */}
        {/* {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      )} */}
      </div>
    </div>
  );
}
