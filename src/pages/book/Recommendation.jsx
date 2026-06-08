import React from "react";
import { useTranslation } from "react-i18next";

const Recommendation = () => {
  const { i18n } = useTranslation();
  return (
    <div className="container mt-[100px] mx-auto text-center leading-none ">
      <h2 className="md:text-[48px] sm:text-[28px] text-[38px] text-primary font-semibold dark:text-darkprimary">
        {i18n.language === "km" ? (
          <>
            ណែនាំសៀវភៅ <span className="text-secondary">ល្អបំផុត</span>
          </>
        ) : (
          <>
            Best <span className="text-secondary">Recommendation</span> Book
          </>
        )}
      </h2>

      <h3 className="text-[22px] md:text-[32px] text-primary mt-[24px] font-semibold leading-normal dark:text-darkprimary">
        A Brief History of Time (1988) is a groundbreaking popular science book
        that explores the origins, structure, and fate of the universe.
      </h3>
      <div className="w-full justify-center lg:justify-end items-end flex mt-10">
        <p className="  w-[350px]   leading-normal  text-[20px] text-gray-700 dark:text-gray-300 font-medium block">
          Stephen Hawking explains complex topics like the Big Bang, black
          holes, time, and the search for a “theory of everything” in clear,
          accessible language. It’s known for inspiring millions of readers to
          think deeply about space and time.
        </p>
      </div>

      <div className=" inline-block mt-[80px]">
        <img
          src="/assets/book-cover/Frame 153.png"
          alt="Rich Dad Poor Dad"
          className="mx-auto"
        />
      </div>

      {/* About the author */}
      <div className=" flex flex-col lg:items-start items-center  ">
        <div className="w-[350px]">
          <h3 className="text-[32px] font-semibold text-[#0F0F0F] dark:text-gray-50">
            About the Author
          </h3>
          <p className="mt-5 leading-normal text-[20px] text-gray-700 dark:text-gray-300 font-medium">
            Stephen Hawking (1942–2018) was a British theoretical physicist,
            cosmologist, and author. He made major contributions to black hole
            physics, particularly Hawking radiation, which showed that black
            holes can emit energy. Despite being diagnosed with ALS at 21, he
            became one of the most famous scientists of his time, known for his
            brilliance, wit, and ability to communicate science to the public.
          </p>
        </div>
      </div>
      <div className="w-[50px] h-[50px] rounded-[50%] bg-[#ffa500] mt-[100px] mb-5">
        <p className="text-primary text-[1.8rem] font-[600] ml-[1rem] pt-[0.7rem] dark:text-darkprimary">
          New
        </p>
      </div>
      <div className="flex flex-wrap w-full lg:flex-nowrap gap-5  text-start">
        <div className="flex items-center justify-center">
          <div className="flex p-5 bg-white dark:bg-gray-800 w-[95%] rounded-2xl ">
            <div className=" dark:bg-gray-800">
              <p className=" items-start flex dark:text-gray-50 font-medium">
                The Books You Need to Read in 2025
              </p>
              <div className="h-[2px] w-[50px] bg-[#ffa500] mt-[1rem] "></div>
              <span className="mt-5 items-start leading-[25px] dark:text-gray-300">
                This is the blog we know you've all been waiting for. We present
                the top 10 titles for compelling subject matter and page-turning
                thrills...
              </span>
            </div>
            <img src="https://s3proxy.cdn-zlib.sk//covers299/collections/userbooks/de6134b7f5c7e06b098675c5722eae4c35e9b6ec35225b5787c69ff3c979f28c.jpg" alt="New" className="w-[123px] h-[156px]" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex p-5 bg-white dark:bg-gray-800 w-[95%] rounded-2xl">
            <div className="">
              <p className=" items-start flex dark:text-gray-50 font-medium">
                The Books You Need to Read in 2023
              </p>
              <div className="h-[2px] w-[50px] bg-[#ffa500] mt-[1rem] "></div>
              <span className="mt-5 items-start leading-[25px] dark:text-gray-300">
                This is the blog we know you've all been waiting for. We present
                the top 10 titles for compelling subject matter and page-turning
                thrills...
              </span>
            </div>
            <img src="https://s3proxy.cdn-zlib.sk//covers299/collections/userbooks/2a9e980323f5583bac87040db182b9de49d82d740a2cfffa6a3a5fc2596f76de.png" alt="New" className="w-[123px] h-[156px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
