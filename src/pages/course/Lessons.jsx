import React, { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteLessonsMutation } from "../../features/courses/courseSlice";
import { id } from "zod/v4/locales";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
export default function Lessons({ lessons, courseId }) {
  const [deleteLesson] = useDeleteLessonsMutation();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = (lesson) => {
    setSelectedLesson(lesson);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedLesson(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLesson) return;

    try {
      await deleteLesson({
        courseId,
        lessonId: selectedLesson.id,
      }).unwrap();
      toast.success(`Lesson "${selectedLesson.title}" deleted successfully!`);
      closePopup();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting lesson.");
    }
  };

  const LessonItem = ({ number, title, description, quizzes, lesson, id }) => (
    <div className="bg-white p-4 rounded-xl border dark:bg-darkbg border-gray-200 hover:border-primary transition-colors duration-200 flex items-start space-x-4 mb-4">
      <div className=" p-2 rounded-lg">
        <FileIcon />
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800 dark:text-white">{`Lesson ${number} : ${title}`}</h4>
        <p className="text-sm text-gray-500 mt-1 dark:text-darktext">
          {description}
        </p>
        {quizzes && (
          <div className="mt-3">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Include Quizzes
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <button type="button" className="cursor-pointer">
          <EditIcon />
        </button>
        <button
          onClick={() => {
            openPopup(lesson);
          }}
          className="cursor-pointer"
          type="button"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
  const EditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500 hover:text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );

  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500 hover:text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  const FileIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
  const navigate = useNavigate();
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 dark:bg-darksecbg dark:border-0  mb-8">
      <h2 className="text-2xl font-bold text-primary mb-8 dark:text-white">
        Course Content :
      </h2>
      <div className="space-y-4  ">
        {lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            id={lesson.id}
            number={index + 1}
            title={lesson.title}
            description={lesson.description}
            quizzes={lesson.quizzes}
            lesson={lesson}
          />
        ))}
        <button
          onClick={() => navigate(`/courses/${courseId}/add-lesson`)}
          type="button"
          className="w-[100%]"
        >
          <div className="dark:bg-darkbg w-[100%] dark:hover:bg-gray-800 mt-6 border-2 border-dashed border-gray-300 rounded-lg py-4 text-center text-primary font-semibold hover:bg-blue-50 hover:border-primary transition duration-200">
            + Add Lesson
          </div>
        </button>
      </div>

      <Popup open={isOpen} closeOnDocumentClick onClose={closePopup}>
        <div className="p-6 bg-white rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Confirm Delete
          </h3>
          {selectedLesson && (
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {selectedLesson.title}
              </span>
              ?
            </p>
          )}
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={closePopup}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
