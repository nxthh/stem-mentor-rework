import React from "react";

export default function LightGreenButton({ text }) {
  return (
    <button className=" bg-[#00FF00]/24 hover:bg-[#00FF00]/50 active:ring-2 ring-green-500 text-[#0C742B] text-[16px] p-[12px] rounded-[12px] font-medium cursor-pointer">
      {text}
    </button>
  );
}
