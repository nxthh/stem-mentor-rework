import React, { useState } from "react";
import {
  useAddLessonsMutation,
  useUploadFileMutation,
} from "../../features/courses/courseSlice";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  contentType: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.payload.field]: action.payload.value };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const createStore = (reducer, initialState) => {
  let state = initialState;
  const listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  };
  return { getState, dispatch, subscribe };
};

const store = createStore(reducer, initialState);

const useReduxState = (store) => {
  const [state, setState] = useState(store.getState());
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return unsubscribe;
  }, [store]);
  return state;
};

const AddLessonPage = () => {
  const { title, description, contentType } = useReduxState(store);
  const [addLesson] = useAddLessonsMutation();
  const [uploadFile] = useUploadFileMutation();
  const [uploading, setUploading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [uploadingAttachments, setUploadingAttachments] = useState(false);
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const token = localStorage.getItem("token");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await uploadFile(formData).unwrap();
      store.dispatch({
        type: "UPDATE_FIELD",
        payload: { field: "contentType", value: response.url },
      });
      toast.success("✅ Video uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload video!");
    } finally {
      setUploading(false);
    }
  };
  const handleAttachmentChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingAttachments(true);

    try {
      const uploadedFiles = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await uploadFile(formData).unwrap();
        const ext = file.name.split(".").pop().toLowerCase();
        let type = "file";
        if (["pdf"].includes(ext)) type = "pdf";
        else if (["jpg", "jpeg", "png"].includes(ext)) type = "image";
        else if (["mp4", "mov", "avi"].includes(ext)) type = "video";

        uploadedFiles.push({
          title: file.name,
          attachment_type: type,
          attachment_url: response.url,
        });
      }

      setAttachments((prev) => [...prev, ...uploadedFiles]);
      toast.success("✅ Attachment(s) uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload attachments!");
    } finally {
      setUploadingAttachments(false);
    }
  };

  const handleAddToCourse = async () => {
    if (!title || !description || !contentType) {
      toast.error("Please fill out all fields or upload a video");
      return;
    }

    try {
      const lessonResponse = await addLesson({
        courseId: parseInt(courseId, 10),
        lessons: [{ title, description, video_url: contentType }],
      }).unwrap();

      let createdLesson;
      if (lessonResponse?.lessons?.length > 0) {
        createdLesson =
          lessonResponse.lessons[lessonResponse.lessons.length - 1];
      } else {
        createdLesson = lessonResponse;
      }

      if (!createdLesson?.id) {
        toast.error("❌ Could not get the lesson ID");
        return;
      }

      toast.success("✅ Lesson added successfully!");

      if (attachments.length > 0) {
        try {
          const attachmentPayload = attachments.map((file) => ({
            title: file.title,
            attachment_type: file.attachment_type,
            attachment_url: file.attachment_url,
          }));

          const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/lessons/${
              createdLesson.id
            }/attachments`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(attachmentPayload),
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Attachments error:", errorData);
            toast.error("❌ Failed to upload attachments!");
          } else {
            toast.success("✅ Attachments added successfully!");
          }
        } catch (err) {
          console.error(err);
          toast.error("❌ Failed to upload attachments!");
        }
      }

      store.dispatch({ type: "RESET_FORM" });
      setAttachments([]);
      navigate(`/edit-course/${courseId}`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add lesson!");
    }
  };

  const handleDeleteAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    toast.info("🗑️ Attachment removed");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-3 text-[15px] font-semibold">
          <p className="text-primary cursor-pointer">Dashboard</p>
          <LiaAngleRightSolid className="text-primary" />
          <Link
            to={`/edit-course/${courseId}`}
            className="text-primary cursor-pointer"
          >
            Edit Course
          </Link>
          <LiaAngleRightSolid className="text-primary" />
          <p className="text-secondary cursor-pointer">Add Lesson</p>
        </div>

        <div className="bg-white p-8 rounded-3xl">
          <div>
            <label className="block text-primary font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter Title"
              value={title}
              onChange={(e) =>
                store.dispatch({
                  type: "UPDATE_FIELD",
                  payload: { field: "title", value: e.target.value },
                })
              }
            />
          </div>

          <div className="mt-6">
            <label className="block text-primary font-semibold mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter Description"
              value={description}
              onChange={(e) =>
                store.dispatch({
                  type: "UPDATE_FIELD",
                  payload: { field: "description", value: e.target.value },
                })
              }
            />
          </div>

          <div className="mt-6">
            <label className="block text-primary font-semibold mb-2">
              Video (YouTube URL or Upload)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter Youtube URL"
              value={contentType}
              onChange={(e) =>
                store.dispatch({
                  type: "UPDATE_FIELD",
                  payload: { field: "contentType", value: e.target.value },
                })
              }
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
            {uploading && <p className="text-gray-500 mt-1">Uploading...</p>}
            {contentType && !uploading && (
              <video
                src={contentType}
                controls
                className="mt-3 w-full rounded-md"
              />
            )}
          </div>

          <div className="mt-8">
            <label className="block text-primary font-semibold mb-2">
              Attachments (PDF, Image, etc.)
            </label>
            <input
              type="file"
              multiple
              onChange={handleAttachmentChange}
              className="w-full text-gray-700"
            />
            {uploadingAttachments && (
              <p className="text-gray-500 mt-1">Uploading...</p>
            )}

            {attachments.length > 0 && (
              <ul className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                  >
                    <span className="truncate w-3/4 text-sm text-gray-700">
                      {file.title}
                    </span>
                    <div className="flex items-center space-x-3">
                      <a
                        href={file.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDeleteAttachment(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleAddToCourse}
              className="px-8 py-4 text-white font-semibold bg-primary hover:bg-primary rounded-full transition duration-200 ease-in-out"
            >
              Add To Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLessonPage;
