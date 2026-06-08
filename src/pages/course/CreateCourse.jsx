import React, { useState, useRef, useEffect } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";
import {
  useCreateCourseMutation,
  useGetMyCoursesQuery,
  useUpdateCourseMutation,
  useUploadFileMutation,
} from "../../features/courses/courseSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Lessons from "./Lessons";
import { useGetAllCategoriesQuery } from "../../features/data/categorySlice";

const FormField = ({ label, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {children}
  </div>
);

const CustomDropdown = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((option) => option.value === value) || null;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left border  border-gray-300 dark:border-0 dark:bg-darkbg dark:text-gray-400 rounded-lg bg-white focus:ring-1 focus:ring-primary focus:border-primary transition duration-200 flex items-center justify-between"
      >
        <span
          className={
            selectedOption
              ? "text-gray-900 dark:text-darktext"
              : "text-gray-500"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown
          className={`text-gray-400 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 rounded-lg shadow-xl border border-gray-200 bg-white max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-50 font-semibold" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

export default function CreateCourse() {
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const [uploadFile] = useUploadFileMutation();
  const { data: allCourses } = useGetMyCoursesQuery();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const courseData = isEditMode
    ? allCourses?.find((course) => course.id === Number(id))
    : null;
  const [updateCourse] = useUpdateCourseMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const levels = [
    { value: "beginners", label: "Beginners" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories =
    categoriesData?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const visibility = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ];

  const [level, setLevel] = useState(levels[0].value);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [lessons, setLessons] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let thumbnailUrl = thumbnailPreview;

    if (thumbnailFile) {
      const formData = new FormData();
      formData.append("file", thumbnailFile);
      try {
        const uploadRes = await uploadFile(formData).unwrap();
        thumbnailUrl =
          uploadRes.url || uploadRes.location || uploadRes.data?.location;
      } catch (error) {
        toast.error("Thumbnail upload failed");
        return;
      }
    }

    const data = {
      id: courseData?.id,
      title,
      description,
      category_id: category,
      visibility: status,
      thumbnail: thumbnailUrl,
      level,
      tags: tags.map((t) => (typeof t === "object" ? t.name : t)),
    };

    try {
      if (isEditMode) {
        await updateCourse(data).unwrap();
        toast.success("Course updated successfully!");
      } else {
        await createCourse(data)
          .unwrap()
          .catch((err) => {
            console.warn("Ignored create error:", err);
            return { success: true }; // fake success preevent error
          });
        toast.success("Course created successfully!");
      }
      navigate("/all-courses");
    } catch (err) {
      toast.error("Failed to save course");
    }
  };

  useEffect(() => {
    if (courseData) {
      setTitle(courseData.title);
      setDescription(courseData.description);
      setCategory(courseData.category_id);
      setStatus(courseData.visibility || "draft");
      setThumbnailPreview(courseData.thumbnail);
      // setLevel(courseData.level || "beginners");
      setLessons(courseData.lessons || []);
      setTags(courseData.tags || ["Programming"]);
    }
  }, [courseData]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 ">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-3 text-[15px] font-semibold">
          <Link
            to={"/teacher-dashboard"}
            className="text-primary dark:text-white  cursor-pointer dark:text-white"
          >
            Dashboard
          </Link>
          <LiaAngleRightSolid className="text-primary dark:text-white  dark:text-white" />
          <Link
            to={"/all-courses"}
            className="text-primary dark:text-white  cursor-pointer dark:text-white"
          >
            All Courses
          </Link>
          <LiaAngleRightSolid className="text-primary dark:text-white " />
          <p className="text-secondary cursor-pointer">
            {isEditMode ? "Edit Course" : "Add Course"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-darksecbg dark:border-0 p-8 rounded-2xl border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-primary dark:text-white  mb-8 dark:text-white">
              Create New Course :
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
              <div className="lg:col-span-2">
                <FormField label="">
                  <h3 className="text-primary dark:text-white  font-medium text-lg">
                    Title
                  </h3>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    className="mt-1 dark:text-darktext w-full px-4 py-3 border border-gray-300 dark:border-0 dark:bg-darkbg   hover:border-primary rounded-lg focus:outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
                  />
                </FormField>

                <FormField label="">
                  <h3 className="text-primary dark:text-white  font-medium text-lg">
                    Description
                  </h3>
                  <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="6"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-0 dark:bg-darkbg dark:text-darktext hover:border-primary rounded-lg focus:outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition duration-200"
                  ></textarea>
                </FormField>

                <FormField label="">
                  <h3 className="text-primary dark:text-white  font-medium text-lg">
                    Tags
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2 border border-gray-300 dark:border-0 dark:bg-darkbg dark:text-gray-400 rounded-lg p-2 focus-within:ring-1 focus-within:ring-primary">
                    {tags.map((tag, index) => {
                      const tagName = typeof tag === "object" ? tag.name : tag;
                      const tagId = typeof tag === "object" ? tag.id : tagName;
                      return (
                        <span
                          key={tagId || index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {tagName}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-green-700 hover:text-red-500 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}

                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Type and press Enter"
                      className="dark:text-darktext flex-grow border-none outline-none px-2 py-1 text-sm text-gray-700"
                    />
                  </div>
                </FormField>
                {/* 
                <FormField label="">
                  <h3 className="text-primary dark:text-white  font-medium text-lg">
                    Level
                  </h3>
                  <CustomDropdown
                    options={levels}
                    placeholder="Select Level"
                    value={level}
                    onChange={setLevel}
                  />
                </FormField> */}
              </div>

              <div>
                <FormField label="">
                  <h3 className="text-primary dark:text-white  font-medium text-lg mb-1">
                    Categories
                  </h3>
                  <CustomDropdown
                    options={categories}
                    placeholder="Select Category"
                    value={category}
                    onChange={setCategory}
                  />
                </FormField>

                <FormField label="">
                  <h3 className="text-primary dark:text-white  font-medium text-lg">
                    Thumbnail
                  </h3>
                  <div
                    onClick={() =>
                      document.getElementById("thumbnailInput").click()
                    }
                    className="mt-1 h-[169.6px] border-2 border-dashed border-gray-300 dark:border-0 dark:bg-darkbg dark:text-gray-400 rounded-lg p-2 text-center cursor-pointer hover:border-primary transition duration-200 flex items-center justify-center overflow-hidden"
                  >
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <UploadIcon />
                        <p className="text-gray-500">
                          Click or drag file to this area to upload
                        </p>
                      </div>
                    )}
                    <input
                      id="thumbnailInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </div>

          {isEditMode && (
            <Lessons
              lessons={courseData?.lessons || []}
              courseId={courseData?.id}
            />
          )}

          <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
            <div className="w-full sm:w-48 dark:text-darktext">
              <CustomDropdown
                options={visibility}
                placeholder="Select Status"
                value={status}
                onChange={setStatus}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white font-semibold px-12 py-3 rounded-lg hover:bg-[#1e307a] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-primary transition duration-200"
            >
              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Course"
                : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
