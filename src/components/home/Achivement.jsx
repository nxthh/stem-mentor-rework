import React from "react";
import { useTranslation } from "react-i18next";
import { IoVideocamOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiGraduationCapLight, PiStudent } from "react-icons/pi";

export default function Achivement() {
  const { t, i18n } = useTranslation();

  return (
    <div className="my-15">
      <h2 className="text-3xl font-bold dark:text-darkprimary text-[#253C95] relative inline-block">
        {i18n.language === "km" ? "សមិទ្ធផលរបស់ពួកយើង" : "Our Achievements"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -2 200 20"
          className="absolute left-15 bottom-[-10px] w-full h-5"
        >
          <path
            d="M5 12 C 60 5, 140 5, 195 18"
            stroke="#FFA500"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>
      </h2>
      <p className="text-gray-500 mt-3 dark:text-darktext ">
        {i18n.language === "km"
          ? "កំណែផ្សេងៗបានអភិវឌ្ឍន៍ជាច្រើនឆ្នាំមកហើយ មួយចំនួនកើតឡើងដោយចៃដន្យ"
          : "Various versions have evolved over the years, sometimes by accident,"}
      </p>
      <div className="flex justify-around lg:justify-between py-6 container mx-auto mt-8">
        <div className="grid grid-cols-2 gap-x-10 lg:ml-10 gap-8">
          <div className="flex gap-5 text-lg sm:text-xl lg:text-2xl items-center">
            <PiGraduationCapLight className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#1A906B] p-5 bg-[#E9F8F3] rounded-[8px]" />
            <div className="flex flex-col font-semibold text-[#253C95] dark:text-darkprimary">
              300{" "}
              <span className="text-gray-500 font-normal dark:text-darktext  ">
                {i18n.language === "km" ? "គ្រូបង្រៀន" : "Instructors"}
              </span>
            </div>
          </div>
          <div className="flex gap-5 text-lg sm:text-xl lg:text-2xl items-center">
            <IoVideocamOutline className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#FFC27A] p-5 bg-[#FFFAF5] rounded-[8px]" />
            <div className="flex flex-col font-semibold text-[#253C95] dark:text-darkprimary">
              100+{" "}
              <span className="text-gray-500 font-normal dark:text-darktext ">
                {i18n.language === "km" ? "វីដេអូ" : "Videos"}
              </span>
            </div>
          </div>
          <div className="flex gap-5 text-lg sm:text-xl lg:text-2xl items-center">
            <PiStudent className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#ED4459] p-5 bg-[#FFEEF0] rounded-[8px]" />
            <div className="flex flex-col font-semibold text-[#253C95] dark:text-darkprimary">
              2,100+{" "}
              <span className="text-gray-500 font-normal dark:text-darktext ">
                {i18n.language === "km" ? "សិស្ស" : "Students"}
              </span>
            </div>
          </div>
          <div className="flex gap-5 text-lg sm:text-xl lg:text-2xl items-center">
            <LiaChalkboardTeacherSolid className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#0075FD] p-5 bg-[#F0F7FF] rounded-[8px]" />
            <div className="flex flex-col font-semibold text-[#253C95] dark:text-darkprimary">
              10+{" "}
              <span className="text-gray-500 font-normal dark:text-darktext ">
                {i18n.language === "km" ? "វក្គសិក្សា" : "Courses"}
              </span>
            </div>
          </div>
        </div>
        <img
          src="/assets/achivegirl.png"
          className="w-auto h-130 object-contain hidden lg:block"
        />
      </div>
    </div>
  );
}
