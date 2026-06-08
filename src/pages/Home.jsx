import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import HomeCard1 from "../components/home/HomeCard1";
import WhatToLearnNext from "../components/home/WhatToLearnNext";
import InstructedCourses from "../components/home/InstructedCourses";
import Achivement from "../components/home/Achivement";
import WhatCanWeDo from "../components/home/WhatCanWeDo";
import StudentSuccessStories from "../components/home/StudentSuccessStories";
import StudentFeedBack from "../components/home/StudentFeedBack";
import FAQs from "../components/home/FAQs";

export default function Home() {
  const { t, i18n } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#faq") {
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="container mx-auto max-w-7xl px-4 overflow-x-hidden">
      <div className="flex justify-center py-5">
        <img src="/assets/homebanner.png" className="container" alt="banner" />
      </div>

      <div>
        <h2 className="text-center text-xl lg:text-3xl font-semibold text-[#253C95] dark:text-darkprimary">
          All–In–One <span className="text-[#FFA500]">STEM</span> Tutoring
          Platform
        </h2>
        <p className="text-base lg:text-lg text-[#6A6A6A] dark:text-darktext text-center mt-4 lg:px-32">
          {t(
            "STEMMentor is a powerful online learning suite that combines all the tools students need to excel in Science, Technology, Engineering, and Mathematics."
          )}
        </p>
      </div>

      <div className="flex justify-center mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-6 lg:8">
          <HomeCard1
            icon={"people"}
            head={
              i18n.language === "km"
                ? "ការបង្រៀន STEM ផ្ទាល់ខ្លួន"
                : "Personalized STEM Tutoring"
            }
            description={
              i18n.language === "km"
                ? "ទទួលបានវគ្គសិក្សាប្រចាំមួយនាក់ឬក្រុមជាមួយគ្រូបង្រៀនអ្នកជំនាញ ត្រូវតាមល្បឿន និងរបៀបសិក្សារបស់និស្សិតនីមួយៗ សម្រាប់ការសិក្សាដែលមានប្រសិទ្ធភាព។"
                : "Get one-on-one or group sessions with expert tutors, tailored to each student’s pace and style for better learning."
            }
            iconBg={"#29B9E7"}
          />
          <HomeCard1
            icon={"calendar"}
            head={
              i18n.language === "km"
                ? "ដំណោះស្រាយបញ្ហាជាលំដាប់ជំហាន"
                : "Step-by-Step Problem-Solving"
            }
            description={
              i18n.language === "km"
                ? "អនុវត្តក្បួន STEM ជាមួយការពន្យល់មើលទៅលម្អិត។ ចាប់ពីសមីការទៅកាន់បញ្ហា សិស្ស​-និស្សិតរៀនដោយបំបែកបញ្ហាទៅជាជំហានច្បាស់លាស់។"
                : "Practice STEM concepts with guided explanations. From equations to challenges, students learn by breaking down problems into clear steps."
            }
            iconBg={"#00CBB8"}
          />
          <HomeCard1
            icon={"note"}
            head={
              i18n.language === "km"
                ? "លំហាត់ STEM អន្តរកម្ម"
                : "Interactive STEM Exercises"
            }
            description={
              i18n.language === "km"
                ? "បង្កើនការរៀនជាមួយសកម្មភាពដៃ, សំនួរ, និងប្រើប្រាស់ការសាកល្បងវីដេអូ។ ឧបករណ៍អន្តរកម្មធ្វើឱ្យ STEM មានភាពសប្បាយនិងមានប្រសិទ្ធភាព។"
                : "Boost learning with hands-on activities, quizzes, and virtual experiments. Interactive tools make STEM fun and effective."
            }
            iconBg={"#5B72EE"}
          />
        </div>
      </div>

      <WhatToLearnNext />
      {/* <InstructedCourses /> */}
      <Achivement />
      <WhatCanWeDo />
      <StudentSuccessStories />
      <StudentFeedBack />
      <div id="faq">
        <FAQs />
      </div>
    </div>
  );
}
