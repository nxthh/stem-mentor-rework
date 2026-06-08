import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function WhatCanWeDo() {
  const [activeRole, setActiveRole] = useState("student");

  const handleRoleClick = (role) => {
    setActiveRole(role);
  };
  const { i18n } = useTranslation();
  const Students = [
    {
      image:
        "https://www.everylearnereverywhere.org/wp-content/uploads/optimizing-digital-learning-scaled.jpg",
      title: i18n.language === "km" ? "រៀនគ្រប់កន្លែង" : "Learn Everywhere",
      description:
        i18n.language === "km"
          ? "សិក្សាគ្រប់កន្លែងណាមួយ ពេលណាក៏បាន ហើយបន្តរៀនដោយគ្មានដែនកំណត់។"
          : "Study anytime, anywhere, and keep learning without limits.",
    },
    {
      image:
        "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/k-26-t-5774-supportb_1.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=bf764218e16da7526916d9fbb8a0b0e4",
      title: i18n.language === "km" ? "ចាប់ផ្តើមហាត់ប្រាណ" : "Start Practice",
      description:
        i18n.language === "km"
          ? "បង្កើនជំនាញរបស់អ្នកតាមរយៈការប្រើប្រាស់អនុវត្តន៍បែបអន្តរកម្ម ហើយតាមដានការកែលម្អរបស់អ្នកជាលក្ខណៈរៀងរាល់ពេល។"
          : "Sharpen your skills through interactive practice and track your improvement over time.",
    },
    {
      image:
        "https://img.freepik.com/premium-photo/modern-online-education-accessible-digital-learning-materials-students_38013-38357.jpg",
      title: i18n.language === "km" ? "ទទួលបានសម្ភារៈរៀន" : "Getting Materials",
      description:
        i18n.language === "km"
          ? "ទទួលបានសម្ភារៈរៀនគ្រប់មុខវិជ្ជា និងរៀបចំសម្រាប់ងាយក្នុងការចូលប្រើ។"
          : "Getting all your course materials in each lessons, organized and easy to access.",
    },
  ];

  const Instructors = [
    {
      image:
        "https://tse3.mm.bing.net/th/id/OIP.m872Hah84J--Sumlbm1LHQHaDx?pid=Api&P=0&h=220",
      title: i18n.language === "km" ? "បង្កើតមុខវិជ្ជា" : "Create Courses",
      description:
        i18n.language === "km"
          ? "បង្កើតមុខវិជ្ជា ហើយចែកចាយជារាយការណ៍ខ្លះ ឯកជន ឬសាធារណៈ ដើម្បីឲ្យសមនឹងតម្រូវការនៃសិស្សរបស់អ្នក។"
          : "Create courses and share them as drafts, private, or public to fit your students’ needs.",
    },
    {
      image: "/assets/teaches.png",
      title: i18n.language === "km" ? "បង្រៀន" : "Teaches",
      description:
        i18n.language === "km"
          ? "ចែករំលែកចំណេះដឹងរបស់អ្នកណែនាំសិស្ស និងលើកកម្ពស់ការលូតលាស់តាមមេរៀនរបស់អ្នក។"
          : "Share your knowledge, guide learners, and inspire growth through your lessons.",
    },
    {
      image: "/assets/createcourse.png",
      title: i18n.language === "km" ? "ចែករំលែកអត្ថបទ" : "Share Articles",
      description:
        i18n.language === "km"
          ? "សរសេរ និងផ្សាយអត្ថបទ ដើម្បីអប់រំ បំភ្លឺ និងចាប់អារម្មណ៍អ្នកទស្សនា។"
          : "Write and publish articles to educate, inspire, and engage your audience.",
    },
  ];
  return (
    <div>
      <div className="text-center text-[36px] font-semibold text-white bg-primary p-10 rounded-[28px] my-20">
        <h3>
          {i18n.language === "km"
            ? "តើយើងអាចធ្វើអ្វីបានជាមួយ"
            : "What Can We Do With"}{" "}
          <span className="text-secondary">STEMMentor?</span>
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between gap-12">
        <div className="mt-10 relative w-[50%] flex flex-col items-center lg:items-start gap-4">
          <span className="absolute -left-3 top-[-10px] w-15 h-15 bg-[#33EFA0] rounded-full -z-10"></span>
          <span className="hidden lg:block absolute -left-[-550px] top-[160px] w-10 h-10 bg-[#33EFA0] rounded-full -z-10"></span>

          <p className="max-w-dvw lg:text-left text-[24px] xl:text-[36px] font-semibold dark:text-darkprimary text-primary w-130 leading-8 lg:leading-12 relative px-4 lg:px-0">
            {i18n.language === "km"
              ? "អ្វីៗដែលអ្នកអាចធ្វើបាននៅក្នុងថ្នាក់រៀនពិត,"
              : "Everything you can do in a physical classroom,"}{" "}
            <span className="text-secondary">
              {i18n.language === "km"
                ? "អ្នកអាចធ្វើបានជាមួយ STEMMentor"
                : "you can do with STEMMentor"}
            </span>
          </p>
          <p className="text-center lg:text-left text-sm xl:text-[24px] dark:text-darktext text-[#6A6A6A] w-80 leading-6 lg:leading-8">
            {i18n.language === "km"
              ? "វេទិកាបង្រៀន STEM របស់យើងផ្តល់ការរៀនផ្ទាល់ខ្លួនជាមួយគ្រូបង្រៀនវីរុស ការដោះស្រាយបញ្ហាជាកម្រិត ដោយដំណាក់កាល និងលំហាត់អន្តរកម្មទាំងអស់ក្នុងប្រព័ន្ធ cloud ដែលមានសុវត្ថិភាព។"
              : "Our STEM tutoring platform offers personalized learning with virtual tutors, step-by-step problem solving, and interactive exercises—all in one secure cloud system."}
          </p>
        </div>

        <div className="h-[50%] lg:h-[320px] xl:h-full flex justify-center">
          <img src="/assets/classroom.png" alt="classroom" className="h-full" />
        </div>
      </div>
      <div className="flex justify-center gap-10 my-5 sm:my-20">
        <button
          onClick={() => setActiveRole("instructor")}
          className={`w-40 cursor-pointer flex flex-col items-center p-4 rounded-2xl transition`}
        >
          <img
            src="/assets/teacher3d.png"
            alt="Instructor"
            className="w-20 h-20 object-contain"
          />
          <p className="mt-2 font-medium text-lg dark:text-darktext">
            {i18n.language === "km" ? "គ្រូបង្រៀន" : "Instructor"}
          </p>

          {activeRole === "instructor" ? (
            <div className="w-40 mt-4 h-[3px]  bg-primary rounded "></div>
          ) : (
            <div className="w-40 mt-4 h-[3px]  rounded "></div>
          )}
        </button>
        <button
          onClick={() => setActiveRole("student")}
          className={`w-40 cursor-pointer flex flex-col items-center p-4 rounded-2xl transition `}
        >
          <img
            src="/assets/student3d.png"
            alt="Instructor"
            className="w-20 h-20 object-contain"
          />
          <p className="mt-2 font-medium text-lg dark:text-darktext">
            {i18n.language === "km" ? "សិស្ស" : "Student"}
          </p>
          {activeRole === "student" ? (
            <div className="w-40 mt-4 h-[3px]  bg-primary rounded "></div>
          ) : (
            <div className="w-40 mt-4 h-[3px]  rounded "></div>
          )}{" "}
        </button>
      </div>
      {activeRole && (
        <div>
          {activeRole === "instructor" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
              {Instructors.map(({ image, title, description }, index) => (
                <div
                  key={index}
                  className="bg-white p-2 dark:bg-darksecbg rounded-md lg:p-4 inline-block mx-auto"
                >
                  <div className="rounded-sm overflow-hidden aspect-video mx-auto">
                    <img src={image} alt={title} />
                  </div>
                  <p className="dark:text-white text-sm md:text-base lg:text-lg xl:text-xl text-start font-semibold text-black mt-2 h-10">
                    {title}
                  </p>
                  {/* <div className="h-[2px] bg-primary rounded my-2"></div> */}
                  <p className="text-gray-700 dark:text-darktext  text-xs md:text-sm lg:text-base xl:text-lg text-start">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Students.map(({ image, title, description }, index) => (
                <div
                  key={index}
                  className="bg-white p-2 dark:bg-darksecbg rounded-md lg:p-4 inline-block"
                >
                  <div className="rounded-sm overflow-hidden aspect-video">
                    <img src={image} alt={title} />
                  </div>
                  <p className="dark:text-white text-sm md:text-base lg:text-lg xl:text-xl text-start font-semibold text-black mt-2 h-10">
                    {title}{" "}
                  </p>
                  {/* <div className="  h-[3px]  bg-primary rounded my-2"></div> */}
                  <p className="text-gray-700 dark:text-darktext  text-xs md:text-sm lg:text-base xl:text-lg text-start">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
