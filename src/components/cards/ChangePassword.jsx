import React from "react";
import { useTranslation } from "react-i18next";

const InfoField = ({ label, value }) => {
  return (
    <div className="h-full">
      <fieldset className="border border-primary rounded-md p-2 h-[54px]">
        <legend className="text-sm text-gray-500  px-1">{label}</legend>
        <p className="font-medium text-gray-800 mt-[-5px]">{value}</p>
      </fieldset>
    </div>
  );
};

export default function ChangePassword({
  oldPassword,
  newPassword,
  confirmPassword,
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-md dark:bg-darksecbg">
      <h2 className="text-primary text-[24px] dark:text-white font-medium py-3 px-8">
        {t("change password")}
      </h2>

      <hr className="text-primary border-t-[2px] border-primary" />

      <div className=" p-8 gap-4">
        <div className="grid grid-cols-1 gap-[17.8px]  ">
          <InfoField label="Old Password" value={oldPassword} />
          <InfoField label="New Password" value={newPassword} />
          <InfoField label="Confirm Password" value={confirmPassword} />
        </div>
      </div>
    </div>
  );
}
