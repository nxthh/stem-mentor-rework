import React from "react";

export default function YellowButton({ text }) {
  return (
    <div className="cursor-pointer bg-[#FFE942]/25 text-secondary text-[16px] p-[12px] rounded-xl font-medium cursor-default">
      {text}
    </div>
  );
}
