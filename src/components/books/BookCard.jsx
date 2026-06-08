import React from "react";

export default function BookCard({ bookcover, title, description, author }) {
  return (
    <div className="flex flex-col w-[210px] items-center  hover:scale-105 duration-300 cursor-pointer">
      <img
        src={bookcover}
        alt=""
        className="w-[210px] h-[313px] object-cover rounded-[8px]"
      />

      <h2 className="w-[210px] my-[12px] text-gray-700 dark:text-gray-100 text-[21px]  line-clamp-1 break-all font-medium  leading-snug ">
        {title}
      </h2>

      {/* <h3 className="text-[#9D9EA8] dark:text-gray-400 text-[18px] font-medium leading-none">
        {author}
      </h3> */}
      {/* <h3 className="text-[#9D9EA8] dark:text-neutral-400 text-[18px] font-medium leading-none">
        {author}
      </h3> */}
    </div>
  );
}
