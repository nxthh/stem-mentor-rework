import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbQuoteFilled } from "react-icons/tb";

const stories = [
  {
    mainStatement:
      "The platform offers a solid structure for tracking course progress, but better project management tools, like task assignment and deadlines, would be useful for collaborative learning.",
    name: "Taing Sengkim",
    title: "Project Manager",
    profile: "/assets/members/taingsengkim.jpg",
  },
  {
    mainStatement:
      "The site's performance is decent, but optimizing load times and ensuring cross-browser compatibility would improve the experience. I’d also recommend adding more customization options for users.",
    name: "Bean SovannRanuth",
    title: "Web Developer",
    profile: "/assets/members/beansovannranuth.jpg",
  },
  {
    mainStatement:
      "The overall design is intuitive, but some elements like navigation and buttons could be more consistent. A more visually appealing color palette and smoother transitions would enhance the user experience.",
    name: "Sam Sreynich",
    title: "UX/UI Designer",
    profile: "/assets/members/samsreynich.jpg",
  },
  {
    mainStatement:
      "The data analytics features are useful, but I’d love to see more advanced filtering options and the ability to export reports. Data visualization could be improved to better interpret learning metrics.",
    name: "Chham Kaknika",
    title: "Data Scientist",
    profile: "/assets/members/chhamkaknika.jpg",
  },
  {
    mainStatement:
      "The content is valuable, but the website could use more engaging marketing strategies like personalized recommendations or targeted content based on user behavior to boost engagement.",
    name: "Hun Kimlong",
    title: "Marketing Specialist",
    profile: "/assets/members/hunkimlong.jpg",
  },
];

export default function StudentFeedBack() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const { i18n } = useTranslation();
  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePrev = () => {
    setCurrentStoryIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
    );
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handleDotClick = (index) => {
    setCurrentStoryIndex(index);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const story1 = stories[currentStoryIndex];
  const story2 = stories[(currentStoryIndex + 1) % stories.length];

  const dotIndex = currentStoryIndex;

  const renderCard = (story, isSecondCard) => (
    <div
      key={story.name + animationKey + (isSecondCard ? "2" : "1")} // Unique key for animation
      className={`bg-white dark:bg-darksecbg p-6 sm:p-8 rounded-[28px] h-[300px] sm:h-[284px] relative border border-gray-100 dark:border-none transform transition-all duration-500 flex-1 min-w-0 shadow-lg ${
        isSecondCard ? "hidden md:flex" : ""
      } animate-slideIn`}
    >
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={story.profile}
            alt={story.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top border-2 border-[#253C95] dark:border-darkprimary"
          />
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-[#253C95] dark:text-darkprimary">
              {story.name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-darktext">
              {story.title}
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-darktext text-sm sm:text-lg italic leading-relaxed line-clamp-6">
          {story.mainStatement}
        </p>
      </div>
      <div className="text-right text-4xl sm:text-5xl text-[#253C95] dark:text-darkprimary">
        <span className="absolute top-3 sm:top-5 right-5 sm:right-10 opacity-20">
          <TbQuoteFilled />{" "}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mt-10 p-4 sm:p-10 text-start">
        <h2 className="text-3xl font-semibold relative inline-block">
          <span className="text-black dark:text-white">
            {i18n.language === "km" ? "មតិយោបល់របស់សិស្ស" : "Student"}
          </span>
          <span className="text-[#253C95] dark:text-darkprimary">
            {" "}
            {i18n.language === "km" ? "" : "Feedback"}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 20"
            className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-full h-5"
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
      </div>

      <div className="flex items-center justify-center w-full px-4 sm:px-10">
        <button
          onClick={handlePrev}
          className="text-gray-700 hover:text-[#253C95] dark:text-gray-300 dark:hover:text-darkprimary text-4xl p-2 rounded-full transition-colors shrink-0 hidden sm:block"
          aria-label="Previous feedback"
        >
          <FaChevronLeft />
        </button>

        {/* Story Cards Container */}
        <div className="mx-auto flex justify-center gap-4 w-full max-w-lg md:max-w-6xl">
          {renderCard(story1, false)}
          {renderCard(story2, true)}
        </div>

        <button
          onClick={handleNext}
          className="text-gray-700 hover:text-[#253C95] dark:text-gray-300 dark:hover:text-darkprimary text-4xl p-2 rounded-full transition-colors shrink-0 hidden sm:block"
          aria-label="Next feedback"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-8 w-full space-x-4">
        <button
          onClick={handlePrev}
          className="text-gray-700 hover:text-[#253C95] dark:text-gray-300 dark:hover:text-darkprimary text-xl p-2 rounded-full transition-colors md:hidden"
          aria-label="Previous feedback"
        >
          <FaChevronLeft />
        </button>

        <div className="flex space-x-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === dotIndex
                  ? "bg-[#253C95] dark:bg-darkprimary scale-110"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-[#253C95]/50 dark:hover:bg-darkprimary/50"
              }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-gray-700 hover:text-[#253C95] dark:text-gray-300 dark:hover:text-darkprimary text-xl p-2 rounded-full transition-colors md:hidden"
          aria-label="Next feedback"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
