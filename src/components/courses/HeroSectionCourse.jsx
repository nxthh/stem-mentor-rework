import React from "react";
import { Translation, useTranslation } from "react-i18next";

export default function HeroSectionCourse() {
  const { t } = useTranslation();
  return (
    <div className="w-screen relative flex items-start pt-10 ">
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-center opacity-50
             bg-[url('/assets/gridpaper.jpg')]
             dark:bg-[url('https://static.vecteezy.com/system/resources/previews/000/536/559/original/grid-paper-pattern-background-vector-illustration.jpg')]"
      ></div>

      <div className="absolute inset-0 bg-white opacity-55 dark:bg-darksecbg"></div>

      <div className="sm:text-2xl xl:text-4xl relative z-10 flex items-center justify-center w-full container mx-auto px-4">
        <div className="lg:mb-30 ml-6 md:ml-12 -mt-4">
          <h1 className="xl:text-[72px] font-bold text-[#253C95] dark:text-darkprimary leading-tight">
            <span className="text-[#FFA500]">{t("courses")}</span> <br />
            {t("For Learners")} <br /> {t("and Users")}
          </h1>
          <p className="text-sm lg:text-[22px] lg:leading-loose dark:text-darktext  text-[#6A6A6A] mt-4">
            {t("This STEM course provides interactive exercises,")} <br />{" "}
            {t(
              "step-by-step problem-solving guides, and real-time assignments to help students practice and master core STEM concepts."
            )}
          </p>
        </div>

        <div>
          <img
            src="/assets/courseherosectiongirl.png"
            alt="Hero"
            className="object-contain w-auto h-auto"
          />
        </div>
      </div>
    </div>
  );
}
