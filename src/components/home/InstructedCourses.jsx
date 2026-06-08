import React from "react";
import InstructorProfile from "./InstructorProfile";
import { useTranslation } from "react-i18next";

export default function InstructedCourses() {
  const { i18n } = useTranslation();
  return (
    <div className="mt-10">
      <div>
        <h2 className="text-primary dark:text-darkprimary text-3xl lg:text-4xl font-semibold">
          {i18n.language === "km" ? "អ្នកដែលបង្រៀន" : "Instructed"}{" "}
          <span className="text-secondary">
            {i18n.language === "km" ? "" : "Courses"}
          </span>
        </h2>
        <p className="text-[#6A6A6A] dark:text-darktext mt-2 my-6 text-sm lg:text-base">
          {i18n.language === "km"
            ? "ត្រូវការគ្រូណាម្នាក់ណែនាំអ្នក? មិនបាច់បារម្ភទេ។ នៅទីនេះ យើងណែនាំអ្នកឧបត្ថម្ភ ៃSTEM online Tutors ដើម្បីជួយ និងណែនាំអ្នកក្នុងផ្លូវវិជ្ជាជីវៈរបស់អ្នក។"
            : "Want someone to instruct you? No worries, here we introduce our CourseMania’s online Tutors to assist & guide you in your professional Path."}
        </p>
      </div>
      <div className="space-y-6">
        <h2 className="text-primary dark:text-darkprimary text-lg lg:text-2xl font-semibold">
          {i18n.language === "km"
            ? "សូមស្គាល់គ្រូពេញនិយមរបស់យើង"
            : "Meet Our Popular Tutors"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 place-items-center">
          <InstructorProfile
            profile={"/assets/turtos1.jpg"}
            name={"Eung Lyzhia"}
            role={"Web Developer"}
            courses={"3 Courses"}
          />
          <InstructorProfile
            profile={"/assets/turtos2.jpg"}
            name={"Kay Keo"}
            role={"DevOps Engineer"}
            courses={"5 Courses"}
          />
          <InstructorProfile
            profile={
              "https://fewchur.com/wp-content/uploads/2023/08/Mosh-2.png"
            }
            name={"Code With Mosh"}
            role={"Software Engineer"}
            courses={"10 Courses"}
          />
          <InstructorProfile
            profile={
              "https://tse4.mm.bing.net/th/id/OIP.temnZWAs0NUkYj5TWmPh3AAAAA?pid=Api&h=220&P=0"
            }
            name={"Bro Code"}
            role={"Software Engineer"}
            courses={"15 Courses"}
          />
        </div>
      </div>
    </div>
  );
}
