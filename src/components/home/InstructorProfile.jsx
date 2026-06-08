import React from "react";

export default function InstructorProfile({ profile, name, role, courses }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={profile}
        className="w-[128px] h-auto lg:w-[172px] lg:h-[172px] rounded-full mb-5"
      />
      <p className="italic font-semibold dark:text-darktext ">{name}</p>
      <p className="font-semibold text-primary dark:text-darkprimary">{role}</p>
      <p className="font-semibold text-secondary underline">{courses}</p>
    </div>
  );
}
