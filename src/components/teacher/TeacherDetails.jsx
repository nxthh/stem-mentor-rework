import React from "react";
import { IoMailUnread } from "react-icons/io5";
import CourseCard from "../courses/CourseCard";

export default function TeacherDetails() {
  return (
    <div className="p-6 sm:p-8 lg:p-[50px] mx-auto">
      {/* Teacher Info */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[50px] flex-wrap">
        <img
          src="/src/assets/Taing Sengkim.jpg"
          className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[293px] lg:h-[293px] rounded-[28px] object-cover object-top mx-auto lg:mx-0"
        />
        <div className="text-center lg:text-left">
          <h1 className="text-primary text-[28px] sm:text-[36px] lg:text-[42px] font-bold">
            Teacher Name
          </h1>
          <div className="text-gray-700 text-[18px] sm:text-[20px] lg:text-[24px] font-medium flex flex-col gap-4 lg:gap-[26px] mt-4 lg:mt-0">
            <h2>Bio</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5">
              <IoMailUnread className="text-primary w-6 h-6" />
              <h2 className="break-all">taingsengkim@gmail.com</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-[32px] justify-center lg:justify-start">
              <h2>
                Total Courses: <span className="text-secondary">15</span>
              </h2>
              <h2>
                Total Learners: <span className="text-secondary">25000</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="my-10 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-10 justify-center lg:justify-start ">
        <p className="bg-primary rounded-[20px] text-white py-[14px] sm:py-[17px] px-10 sm:px-[69px] text-[16px] sm:text-[18px] font-medium text-center cursor-pointer">
          Course
        </p>
        <p className="bg-white text-[#858585] rounded-[20px] py-[14px] sm:py-[17px] px-10 sm:px-[84px] text-[16px] sm:text-[18px] font-medium text-center cursor-pointer">
          Book
        </p>
        <p className="bg-white text-[#858585] rounded-[20px] py-[14px] sm:py-[17px] px-10 sm:pl-[87px] sm:pr-[86px] text-[16px] sm:text-[18px] font-medium text-center cursor-pointer">
          Blog
        </p>
      </div>

      {/* Label */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-baseline justify-center lg:justify-start text-center sm:text-left">
        <h1 className="text-primary text-[28px] sm:text-[32px] lg:text-[36px] font-medium underline underline-offset-2">
          My Courses
        </h1>
        <span className="text-secondary text-[28px] sm:text-[32px] lg:text-[36px] font-medium">
          (15)
        </span>
      </div>

      {/* Contents */}
      <div className="mt-[50px] flex flex-wrap justify-center md:justify-between gap-7">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}
