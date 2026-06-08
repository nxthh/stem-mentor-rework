import React, { useState, useEffect, useRef } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";
import { Editor } from "primereact/editor";
import {
  useCreateBlogsMutation,
  useGetAllBlogQuery,
  useUpdateBlogsMutation,
} from "../../features/blog/blogSlice";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUploadFileMutation } from "../../features/courses/courseSlice";

// --- Colors ---
const PRIMARY_COLOR = "#253C95";
const SECONDARY_COLOR = "#FFA500";
const BUTTON_BG = "#2e7d32";
const BUTTON_HOVER = "#1e5e22";

export default function CreateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [uploadFile] = useUploadFileMutation();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { data: blogsData } = useGetAllBlogQuery();
  const editBlog = id
    ? blogsData?.blogs.find((b) => b.id === parseInt(id))
    : null;

  const [createBlog, { isLoading }] = useCreateBlogsMutation();
  const [updateBlog] = useUpdateBlogsMutation();

  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title);
      setText(editBlog.content);
      setThumbnailUrl(editBlog.thumbnail_url);
      setTags(editBlog.tags?.map((t) => t.name) || []);
    }
  }, [editBlog]);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim()))
        setTags([...tags, inputValue.trim()]);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      title,
      thumbnail_url: thumbnailUrl,
      content: text,
      tags,
    };

    try {
      if (editBlog) {
        await updateBlog({ blogId: editBlog.id, ...blogData }).unwrap();
        toast.success("✅ Blog updated successfully!");
      } else {
        await createBlog(blogData).unwrap();
        toast.success("✅ Blog created successfully!");
      }
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save blog");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-darkbg">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-3 text-sm font-semibold dark:text-darkprimary text-primary">
          <Link to={"/teacher-dashboard"}>Dashboard</Link>
          <LiaAngleRightSolid />
          <Link to={"/blogs"}>All Blog</Link>
          <LiaAngleRightSolid />
          <p style={{ color: SECONDARY_COLOR }}>
            {editBlog ? "Edit Blog" : "Create Blog"}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 dark:bg-darksecbg dark:border-0">
          <h1 className="text-2xl font-bold mb-8 dark:text-white text-primary">
            {editBlog ? "Edit Blog" : "Create Blog"}
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-darktext text-primary ">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full dark:text-darktext text-primary px-4 py-3 border border-gray-300 rounded-lg focus:outline-0 focus:ring-1 transition duration-200"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-darktext text-primary ">
                Description
              </label>
              <Editor
                value={text}
                onTextChange={(e) => setText(e.htmlValue)}
                onImageUpload={async (e) => {
                  const file = e.files[0];
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await uploadFile(formData).unwrap();
                    const url = res.url;
                    e.editor.execCommand("insertImage", false, url);
                  } catch (err) {
                    toast.error("Upload failed");
                  }
                }}
                style={{
                  height: "320px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                }}
              />
            </div>

            {/* Thumbnail */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-darktext text-primary">
                Thumbnail
              </label>
              <div
                className="mt-1 h-[150px] border-2 border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer flex items-center justify-center relative"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                    Click or drag file to this area to upload
                  </div>
                )}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const previewUrl = URL.createObjectURL(file);
                    setThumbnailUrl(previewUrl);
                    const formData = new FormData();
                    formData.append("file", file);
                    try {
                      const res = await uploadFile(formData).unwrap();
                      setThumbnailUrl(res.url);
                    } catch (err) {
                      alert("❌ Upload failed");
                    }
                  }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 dark:text-darktext text-primary">
                Tags
              </label>
              <div className="flex flex-wrap  items-center gap-2 mt-2 border border-gray-300 rounded-lg p-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="text-green-700 hover:text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type and press Enter"
                  className="flex-grow border-none outline-none px-2 py-1 text-sm   dark:text-darktext text-primary"
                />
              </div>
            </div>

            <div className="flex justify-end mt-10 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white font-semibold px-8 py-3 rounded-lg transition duration-200"
                style={{ backgroundColor: BUTTON_BG }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = BUTTON_HOVER)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = BUTTON_BG)
                }
              >
                {editBlog
                  ? "Update Article"
                  : isLoading
                  ? "Publishing..."
                  : "Publish Article"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
