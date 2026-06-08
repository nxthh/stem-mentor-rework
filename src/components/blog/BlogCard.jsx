import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { timeAgo } from "../other/timeAgo";
import { useTranslation } from "react-i18next";

export default function BlogCard({
  thumbnail,
  title,
  description,
  user_profile,
  username,
  elapsed_time,
  like,
  comment,
  subject = [],
}) {
  const { t } = useTranslation();
  const cleanDescription = description.replace(/<img[^>]*>/g, "");

  return (
    <div className="cursor-pointer border-1 border-gray-200 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 p-4 sm:p-6 rounded-lg transition-colors duration-200">
      {/* Profile & Elapsed Time */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <img
          src={user_profile}
          alt={username}
          className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full object-cover object-center"
        />
        <p className="text-[16px] sm:text-[20px] font-normal dark:text-gray-100">
          {username}
        </p>
        <p className="hidden sm:block dark:text-gray-100">·</p>
        <p className="text-[#757575] dark:text-gray-300 text-[14px] sm:text-[18px] font-light">
          {timeAgo(elapsed_time, t)}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-[50px] mt-4">
        {/* Left Text Section */}
        <div className="flex flex-col justify-between flex-1 order-1">
          <div className="space-y-4 sm:space-y-[20px]">
            <h2 className="text-[#191919] dark:text-gray-100 text-[18px] sm:text-[22px] line-clamp-2 font-semibold">
              {title}
            </h2>
            <div
              className="text-[#292929] dark:text-neutral-300 text-[14px] sm:text-[16px] font-light line-clamp-2 md:line-clamp-3 lg:line-clamp-5"
              dangerouslySetInnerHTML={{
                __html: description.replace(/<img[^>]*>/g, ""),
              }}
            ></div>
          </div>

          <div className="hidden sm:flex justify-between items-center flex-wrap gap-2 mt-3 sm:mt-0">
            <div className="flex items-center flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1 dark:text-gray-200">
                <FaRegHeart />
                <p className="text-secondary text-[14px] sm:text-[16px]">
                  {like}
                </p>
              </div>

              <div className="flex items-center gap-1 dark:text-gray-200">
                <BiComment />
                <p className="text-secondary text-[14px] sm:text-[16px]">
                  {comment}
                </p>
              </div>

              {subject.length > 0 && <p className="hidden sm:block">·</p>}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {subject.map((tag, index) => (
                  <p
                    key={index}
                    className="bg-[#F3F4F6] dark:bg-gray-700 rounded-full text-[#374151] dark:text-gray-100 px-[8px] py-[2px] text-[11px] sm:text-[12px] font-medium"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:gap-7">
              <MdOutlineBookmarkAdd className="scale-125 sm:scale-150 text-[#292929] dark:text-gray-200" />
              <IoIosMore className="scale-125 sm:scale-150 text-[#292929] dark:text-gray-200" />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="order-2">
          <img
            src={thumbnail}
            alt={title}
            className="w-full sm:w-[268px] h-[200px] sm:h-[268px] object-cover rounded-md "
          />
        </div>

        <div className="sm:hidden order-3 w-full mt-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaRegHeart />
              <p className="text-secondary text-[14px] dark:text-gray-200">
                {like}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <BiComment />
              <p className="text-secondary text-[14px] dark:text-gray-200">
                {comment}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <MdOutlineBookmarkAdd className="scale-125 text-[#292929] dark:text-gray-200" />
            </div>

            <div className="flex items-center gap-1">
              <IoIosMore className="scale-125 text-[#292929] dark:text-gray-200" />
            </div>

            {subject.length > 0 && (
              <div className="ml-2 flex flex-wrap gap-2">
                {subject.map((tag, index) => (
                  <p
                    key={index}
                    className="bg-[#F3F4F6] dark:bg-gray-700 rounded-full text-[#374151] dark:text-gray-100 px-[8px] py-[2px] text-[11px] font-medium"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="mt-6 sm:mt-[50px] text-[#E6E6E6] dark:text-gray-700" />
    </div>
  );
}
