import React from "react";
import { MdThumbUpAlt } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";

export default function CourseCard({
  img,
  title,
  description,
  instructor_profile,
  instructor_name,
  enrolled,
  likes,
  category,
}) {
  return (
    <div className="bg-white dark:bg-darksecbg max-w-[304px] rounded-[12px] cursor-pointer hover:scale-102 duration-300">
      {/* Thumbnail */}
      <img
        src={img}
        className="rounded-t-[12px] w-[304px] h-[182px] object-cover"
      />

      {/* Title */}
      <div className="px-3 pt-3 pb-4">
        <div className="h-[57px] flex items-center">
          <h1 className="text-[#303030] dark:text-gray-200 text-[19px] font-medium line-clamp-2">
            {title}
          </h1>
        </div>

        <hr className="text-[#CDCDCD] dark:text-gray-800 mx-[10px] mt-[21px] mb-[16px]" />

        {/* Instructor */}
        <div className="flex gap-3 items-center">
          <img
            src={instructor_profile}
            className="w-[32px] h-[32px] rounded-full object-cover object-center "
          />

          <h2 className="text-[#565656] dark:text-darktext text-[16px] font-medium line-clamp-1 ">
            {instructor_name}
          </h2>
        </div>

        {/* Enrolled, Like & Category */}
        <div className="mt-4 flex gap-[12px]">
          <div className="flex items-center gap-1">
            <MdPeopleAlt className="scale-x-[-1] text-[#434343] dark:text-gray-300" />
            <p className="text-primary text-[14px] font-medium ">{enrolled}</p>
          </div>

          <div className="flex items-center gap-1  py-[2px]">
            <MdThumbUpAlt className="text-[#434343] dark:text-gray-300" />
            <p className="text-secondary text-[14px] font-medium">{likes}%</p>
          </div>

          <div>
            <p className="bg-[#F3F4F6] dark:bg-gray-800 h-[25px] text-[#374151] dark:text-gray-200 rounded-full text-[14px] font-medium px-[10px] py-[2px]">
              {category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
