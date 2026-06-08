import React from "react";
import { useTranslation } from "react-i18next";

const FavouriteReads = () => {
  const { i18n } = useTranslation();
  return (
    <section className="mt-[100px]">
      <div className="flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-0  container mx-auto">
        <div className="flex justify-center">
          <img
            src="/assets/book-cover/image 81 (2).png"
            alt="book cover"
            className="w-[250px] sm:w-[350px] md:w-[450px] lg:max-w-md object-cover"
          />
        </div>

        <div className="px-4 sm:px-6 md:px-10 lg:px-0 lg:w-[575px] text-center lg:text-left">
          <div className="text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-tight">
            <p className="text-primary dark:text-darkprimary">
              {i18n.language === "km"
                ? "សៀវភៅដែលអ្នកចូលចិត្ត"
                : "Your Favorite "}
              <span className="text-secondary">
                {i18n.language === "km" ? "អាន" : "Reads"}
              </span>
            </p>
            <p className="text-secondary">
              {i18n.language === "km" ? "មាននៅទីនេះ!" : "Are Here!"}
            </p>
          </div>

          <p className="mt-4 text-[#696984] dark:text-gray-200 font-medium text-[14px] sm:text-[15px] md:text-[16px] text-justify lg:text-left">
            {i18n.language === "km"
              ? "អានសៀវភៅដែលអ្នកចូលចិត្ត ឬទាញយកសៀវភៅវិទ្យាសាស្ត្រ, បច្ចេកវិទ្យា, វិស្វកម្ម និងគណិតវិទ្យាបានដោយឥតគិតថ្លៃ ដែលជារួមមានសៀវភៅសិក្សា, សម្ភារៈស្រាវជ្រាវ និងស្នាដៃចាស់ៗ។"
              : "Read your favorite or download science, technology, engineering, and math books at no cost, often including textbooks, research materials, and classic works."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-around gap-6 sm:gap-10 dark:text-darkprimary text-primary text-lg sm:text-xl">
            <div className="text-center lg:text-left">
              <p className="  text-[32px] sm:text-[36px] md:text-[40px] font-bold">
                10+
              </p>
              <p className="  font-bold text-[14px] sm:text-[16px]">
                Book Listing
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="  text-[32px] sm:text-[36px] md:text-[40px] font-bold">
                1 K+
              </p>
              <p className="  font-bold text-[14px] sm:text-[16px]">
                Registered Members
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="  text-[32px] sm:text-[36px] md:text-[40px] font-bold">
                50+
              </p>
              <p className="  font-bold text-[14px] sm:text-[16px]">
                Branch Count
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavouriteReads;
