import React from "react";
import { useNavigate } from "react-router-dom";

export default function CourseProgressCard({
  enrollmentId,
  courseId,
  title,
  thumbnail,
  progress,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/enrolled-courses/${courseId}/${enrollmentId}`);
  };

  const isComplete = progress === 100;
  const progressColor = isComplete ? "bg-emerald-500" : "bg-indigo-600";

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 dark:border-gray-700 w-full max-w-sm 
                 flex flex-col rounded-xl overflow-hidden 
                 shadow-lg hover:shadow-xl transition-all duration-300 
                 border border-gray-100 cursor-pointer 
                 hover:ring-2 hover:ring-primary"
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {isComplete && (
          <div className="absolute top-2 right-2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
            Completed 🎉
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="mt-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            {" "}
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressColor}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-base font-medium dark:text-gray-400 text-gray-600">
              Progress
            </p>
            <p
              className={`text-base font-bold ${
                isComplete ? "text-emerald-500" : "text-indigo-600"
              }`}
            >
              {progress}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
