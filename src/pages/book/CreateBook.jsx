import React, { useState, useRef, useEffect } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetAllBooksQuery,
} from "../../features/books/booksAPI";
import { toast } from "react-toastify";
import { useGetAllCategoriesQuery } from "../../features/data/categorySlice";
import { useUploadFileMutation } from "../../features/courses/courseSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

// ---------- FormField Component ----------
const FormField = ({ label, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {children}
  </div>
);

// ---------- Custom Dropdown Component ----------
const CustomDropdown = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption =
    options.find((option) => option.value === value) || null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg bg-white flex items-center justify-between"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
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

// ---------- Upload Icon ----------
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-primary"
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

// ---------- DragAndDropArea ----------
const DragAndDropArea = ({ label, file, onFileSelect, accept }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (accept === "pdf" && selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!");
      return;
    }
    if (accept === "image" && !selectedFile.type.startsWith("image/")) {
      toast.error("Only image files are allowed!");
      return;
    }

    onFileSelect(selectedFile);
  };

  return (
    <FormField label={label}>
      <div
        onClick={() => inputRef.current.click()}
        className={`h-[160px] rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed transition-all duration-300
          ${
            file
              ? "border-green-500 bg-green-50 hover:bg-green-100 shadow-md scale-[1.02]"
              : "border-gray-300 hover:border-primary hover:bg-gray-50"
          }`}
      >
        <div className="text-center space-y-2">
          {file ? (
            <>
              <FaCheckCircle className="text-green-600 text-3xl mx-auto animate-bounce" />
              <p className="text-green-700 text-sm font-semibold">
                File uploaded successfully!
              </p>
              <p className="text-gray-700 text-xs truncate max-w-[200px] mx-auto">
                {file.name || file.url?.split("/").pop()}
              </p>
            </>
          ) : (
            <UploadIcon className="text-primary text-3xl mx-auto" />
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          accept={accept === "pdf" ? "application/pdf" : "image/*"}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </FormField>
  );
};

// ---------- CreateBook Component ----------
export default function CreateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [createBook, { isLoading }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const { data: categoriesData, isLoading: catLoading } =
    useGetAllCategoriesQuery();
  const { data: booksData } = useGetAllBooksQuery();
  const [uploadFile] = useUploadFileMutation();

  const categories =
    categoriesData?.map((c) => ({ value: c.id, label: c.name })) || [];
  const bookToEdit = booksData?.books?.find((b) => b.id === Number(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fileBook, setFileBook] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [status, setStatus] = useState("draft");

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ];

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setDescription(bookToEdit.description);
      setCategory(bookToEdit.category_ids?.[0] || "");
      setStatus(bookToEdit.status || "draft");
      setFileBook({
        name: bookToEdit.file_url?.split("/").pop(),
        url: bookToEdit.file_url,
      });
      setThumbnailFile({
        name: bookToEdit.thumbnail?.split("/").pop(),
        url: bookToEdit.thumbnail,
      });
    }
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !fileBook || !thumbnailFile) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      let uploadedFileUrl = bookToEdit?.file_url || "";
      let uploadedThumbnail = bookToEdit?.thumbnail || "";

      // Upload PDF
      if (fileBook && fileBook instanceof File) {
        const formData = new FormData();
        formData.append("file", fileBook);
        const uploadResponse = await uploadFile(formData).unwrap();
        uploadedFileUrl = uploadResponse?.url || uploadedFileUrl;
      }

      // Upload Thumbnail
      if (thumbnailFile && thumbnailFile instanceof File) {
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        const uploadResponse = await uploadFile(formData).unwrap();
        uploadedThumbnail = uploadResponse?.url || uploadedThumbnail;
      }

      const data = {
        title,
        description,
        category_ids: [category],
        file_url: uploadedFileUrl,
        thumbnail: uploadedThumbnail,
        status,
      };

      if (id) {
        await updateBook({ id, ...data }).unwrap();
        toast.success("Book updated successfully!");
      } else {
        await createBook(data).unwrap();
        toast.success("Book created successfully!");
      }

      navigate("/all-books");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save book!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold">
          <Link
            to={"/teacher-dashboard"}
            className="text-primary cursor-pointer"
          >
            Dashboard
          </Link>
          <LiaAngleRightSolid className="text-primary" />
          <Link to={"/all-books"} className="text-primary cursor-pointer">
            All Books
          </Link>
          <LiaAngleRightSolid className="text-primary" />
          <p className="text-secondary">{id ? "Edit Book" : "Add Book"}</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow border border-gray-100">
          <h1 className="text-2xl font-bold text-primary mb-8">
            {id ? "Edit Book" : "Add New Book"}
          </h1>

          <form onSubmit={handleSubmit}>
            <FormField label="Title">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </FormField>

            <FormField label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </FormField>

            <FormField label="Category">
              <CustomDropdown
                options={categories}
                placeholder={catLoading ? "Loading..." : "Select Category"}
                value={category}
                onChange={setCategory}
              />
            </FormField>

            <DragAndDropArea
              label="Thumbnail Image"
              file={thumbnailFile}
              onFileSelect={setThumbnailFile}
              accept="image"
            />

            <DragAndDropArea
              label="Book Content (PDF)"
              file={fileBook}
              onFileSelect={setFileBook}
              accept="pdf"
            />

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <div className="w-48">
                <FormField label="Status">
                  <CustomDropdown
                    options={statusOptions}
                    placeholder="Select Status"
                    value={status}
                    onChange={setStatus}
                  />
                </FormField>
              </div>

              <button
                type="submit"
                disabled={isLoading || isUpdating}
                className={`px-8 py-3 text-white font-semibold rounded-lg bg-[#2e7d32] hover:opacity-90 transition ${
                  isLoading || isUpdating ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {id
                  ? isUpdating
                    ? "Updating..."
                    : "Update Book"
                  : isLoading
                  ? "Publishing..."
                  : "Publish Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
