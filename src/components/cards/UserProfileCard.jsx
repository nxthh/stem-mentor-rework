import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateUserInfoMutation } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { useUploadFileMutation } from "../../features/courses/courseSlice";
import { Camera } from "lucide-react";

export default function UserProfileCard({ avatar, full_name, bio }) {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = useSelector((state) => state.auth.user.id);

  const [uploadFile] = useUploadFileMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setNewAvatar(previewUrl);
    setSelectedFile(file);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await uploadFile(formData).unwrap();
      const newProfileUrl = uploadResponse.url;

      await updateUserInfo({
        id: userId,
        profile_url: newProfileUrl,
      }).unwrap();

      toast.success("Profile picture updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile picture");
    }
  };

  const handleCancel = () => {
    setNewAvatar(avatar);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-md mx-auto  dark:bg-darksecbg ">
      <div className="flex flex-col items-center py-8 px-4 space-y-4">
        <div
          className="relative group"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={newAvatar}
            alt="Profile"
            className="w-[140px] h-[140px] object-cover rounded-full cursor-pointer transition-all duration-300 group-hover:opacity-75"
          />

          <div className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-300">
            <Camera className="text-white w-8 h-8" />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <p className="text-primary text-3xl font-bold dark:text-white">
          {full_name}
        </p>
        <p className="text-gray-600 text-center dark:text-darktext">{bio}</p>

        {isEditing && (
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSave}
              className="bg-primary text-white px-4 py-2 rounded-lg dark:bg-darkbg"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
