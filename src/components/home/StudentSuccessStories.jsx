import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const stories = [
  {
    mainStatement:
      "uQualio is the help link in Applied Information's life-saving traffic hardware and software platform.",
    testimonial:
      "It's very simple, really... uQualio was the only real video-based platform that came on our radar when we were looking.",
    name: "Taing Sengkim",
    title: "Civil Engineer at Applied Information",
    image: "/assets/members/taingsengkim.jpg",
  },
  {
    mainStatement:
      "Another great story about a successful student and their career.",
    testimonial:
      "This platform changed my life and helped me land my dream job. Highly recommend it!",
    name: "Bean SovannRanuth",
    title: "Software Developer at TechCorp",
    image: "/assets/members/beansovannranuth.jpg",
  },
  {
    mainStatement: "A third success story from a different industry.",
    testimonial:
      "The courses are well-structured and the support is excellent. I learned so much.",
    name: "Hun Kimlong",
    title: "Data Scientist at Innovate LLC",
    image: "/assets/members/hunkimlong.jpg",
  },
];

// NOTE: To use the 'animate-slideIn' class, you need to add this to your tailwind.config.js:
// extend: {
//   keyframes: {
//     slideIn: {
//       '0%': { transform: 'translateX(20px)', opacity: '0' },
//       '100%': { transform: 'translateX(0)', opacity: '1' },
//     },
//   },
//   animation: {
//     slideIn: 'slideIn 0.6s ease-out',
//   },
// },

export default function StudentSuccessStories() {
  const { i18n } = useTranslation();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNext = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentStoryIndex(index);
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="mt-16 sm:mt-10  container flex flex-col mx-auto  w-full max-w-full lg:max-w-6xl xl:max-w-7xl p-4 sm:p-6 lg:p-10 rounded-[28px] items-center">
      <h2 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl dark:text-white text-primary py-5 pb-5">
        {i18n.language === "km" ? (
          <>
            រឿងជោគជ័យ <span className="text-secondary">សិស្ស</span>
          </>
        ) : (
          <>
            Students <span className="text-secondary">Success</span> Stories
          </>
        )}
      </h2>

      <p className="text-gray-500 text-start mb-5 text-lg lg:text-xl dark:text-darktext">
        {i18n.language === "km"
          ? "សូមស្ដាប់ពីសិស្សដែលទទួលបានជោគជ័យដោយផ្ទាល់។"
          : "Hear directly from our successful students."}
      </p>

      <div className="flex items-center w-full justify-center">
        <button
          onClick={handlePrev}
          className="hidden lg:block dark:text-white text-primary  mr-8 text-3xl p-3 rounded-full  bg-white/10 hover:bg-white/20 transition-all shrink-0 focus:outline-none focus:ring-4 focus:ring-secondary/50"
          aria-label="Previous story"
        >
          <FaChevronLeft />
        </button>

        <div
          key={currentStoryIndex}
          className="bg-white dark:bg-gray-800 text-primary dark:text-gray-100 w-full max-w-lg md:max-w-4xl lg:max-w-4xl min-h-[500px] md:min-h-[400px] rounded-3xl flex flex-col lg:flex-row items-center shadow-2xl overflow-hidden
                    animate-slideIn // Custom slide-in effect
                    "
        >
          <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[400px] overflow-hidden">
            <img
              src={currentStory.image}
              alt={currentStory.name}
              className="absolute inset-0 object-cover object-top w-full h-full transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 text-white">
              <blockquote className="text-lg italic font-light leading-snug">
                &ldquo;{currentStory.testimonial}&rdquo;
              </blockquote>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-8 lg:p-10 space-y-6 w-full">
            <div className="space-y-2 border-l-4 border-secondary pl-4">
              <h4 className="text-xl md:text-2xl font-bold dark:text-secondary">
                The Impact:
              </h4>
              <p className="text-base md:text-lg dark:text-gray-300 text-gray-700 font-medium">
                {currentStory.mainStatement}
              </p>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <p className="text-lg md:text-xl font-extrabold text-primary dark:text-gray-100">
                {currentStory.name}
              </p>
              <p className="text-sm md:text-base dark:text-gray-400 text-gray-500">
                {currentStory.title}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="hidden lg:block dark:text-white text-primary ml-8 text-3xl p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all shrink-0 focus:outline-none focus:ring-4 focus:ring-secondary/50"
          aria-label="Next story"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-8 w-full space-x-4">
        <button
          onClick={handlePrev}
          className="text-white lg:hidden text-xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous story"
        >
          <FaChevronLeft />
        </button>

        <div className="flex space-x-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStoryIndex
                  ? "bg-secondary scale-125"
                  : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-white lg:hidden text-xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next story"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
