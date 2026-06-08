import { Calendar, Notebook } from "lucide-react";
import React from "react";
import { FaFileInvoice } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

export default function HomeCard1({ head, description, icon, iconBg }) {
  const iconsMap = {
    people: <IoIosPeople className="w-[32px] h-[32px] text-white" />,
    calendar: <Calendar className="w-[32px] h-[32px] text-white" />,
    note: <FaFileInvoice className="w-[32px] h-[32px] text-white" />,
  };
  return (
    <div className="relative bg-white dark:text-darktext  dark:bg-darksecbg dark:border-none w-auto rounded-2xl p-10 flex flex-col items-center">
      <div
        className={`absolute -top-8 rounded-full w-[60px] h-[60px]  flex items-center justify-center`}
        style={{ backgroundColor: iconBg }}
      >
        {iconsMap[icon]}
      </div>

      <h3 className="text-[#253C95] dark:text-darktext  text-lg lg:text-2xl text-center font-medium ">
        {head}
      </h3>
      <p className="text-[#6A6A6A] dark:text-darktext   text-center text-sm lg:text-base leading-5 lg:leading-7 mt-4">
        {description}
      </p>
    </div>
  );
}
