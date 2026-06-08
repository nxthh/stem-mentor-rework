import React, { useState } from "react";
import { useUpdateUserInfoMutation } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";
import { useTranslation } from "react-i18next";

const InfoField = ({ label, value, onChange, readOnly, type }) => {
  const isAddress = type === "address";
  const isGender = type === "gender";
  const isDate = type === "date";

  // Format date safely for input[type=date]
  const formattedDate =
    isDate && value
      ? value instanceof Date
        ? value.toISOString().split("T")[0]
        : value.slice(0, 10) // assumes value is a string like "YYYY-MM-DDTHH:mm:ss..."
      : "";

  return (
    <div className="w-full">
      <fieldset
        className={`border border-primary dark:bg-darkbg rounded-md p-2 w-full ${
          readOnly
            ? "bg-white dark:text-white"
            : "bg-white hover:cursor-pointer hover:scale-102 transition-[0.3s] dark:text-white"
        }`}
      >
        <legend className="text-sm text-gray-500 px-1 dark:text-white">
          {label}
        </legend>

        {isAddress ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            className="w-full mt-1 dark:text-white text-gray-800 font-medium focus:outline-none resize-none h-24 p-1"
          />
        ) : isGender ? (
          readOnly ? (
            <p className="mt-1 dark:text-white text-gray-800 font-medium">
              {value || "Unknown"}
            </p>
          ) : (
            <select
              value={value || "UNKNOWN"}
              onChange={(e) => onChange(e.target.value)}
              className="w-full dark:text-white mt-1 text-gray-800 font-medium focus:outline-none p-1"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          )
        ) : isDate ? (
          <input
            type="date"
            value={formattedDate}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            className="w-full mt-1 dark:text-white text-gray-800 font-medium focus:outline-none"
          />
        ) : (
          <input
            type={type || "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            readOnly={readOnly}
            className="w-full mt-1 dark:text-white text-gray-800 font-medium focus:outline-none"
          />
        )}
      </fieldset>
    </div>
  );
};

export default function UserInfoCard({
  full_name,
  date_of_birth,
  gender,
  bio,
  email,
  address,
  phone_number,
  userId,
  profile_url,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    full_name: full_name || "",
    date_of_birth: date_of_birth || "",
    gender: gender || "",
    bio: bio || "",
    email: email || "",
    address: address || "",
    phone_number: phone_number || "",
    profile_url: profile_url,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updateInfo, { isLoading }] = useUpdateUserInfoMutation();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateInfo({ id: userId, ...formData }).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="bg-white rounded-md w-full dark:bg-darksecbg">
      <div className="flex justify-between items-center py-3 px-4 sm:px-8">
        <h2 className="text-primary text-md font-medium dark:text-white">
          {t("Personal Information")}
        </h2>
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary cursor-pointer hover:scale-105 px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            <Edit />
          </button>
        )}
      </div>

      <hr className="border-t-2 border-primary" />

      <div className="grid grid-cols-1 md:grid-cols-2 p-4 sm:p-8 gap-4">
        {/* Left Column */}
        <div className="grid grid-cols-1 gap-4">
          <InfoField
            label={t("name")}
            value={formData.full_name}
            onChange={(val) => handleChange("full_name", val)}
            readOnly={!isEditing}
          />
          <InfoField
            label={t("date of birth")}
            value={formData.date_of_birth}
            type="date"
            onChange={(val) => handleChange("date_of_birth", val)}
            readOnly={!isEditing}
          />
          <InfoField
            label={t("gender")}
            value={formData.gender}
            type="gender"
            onChange={(val) => handleChange("gender", val)}
            readOnly={!isEditing}
          />
          <InfoField
            label={t("email")}
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            readOnly={true}
          />
        </div>

        {/* Right Column */}
        <div className="grid grid-cols-1 gap-4">
          <InfoField
            label={t("address")}
            value={formData.address}
            type="address"
            onChange={(val) => handleChange("address", val)}
            readOnly={!isEditing}
          />
          <InfoField
            label={t("phone")}
            value={formData.phone_number} // use phone_number here
            onChange={(val) => handleChange("phone_number", val)} // fix field name
            readOnly={!isEditing}
          />

          <InfoField
            label="Bio"
            value={formData.bio}
            onChange={(val) => handleChange("bio", val)}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
