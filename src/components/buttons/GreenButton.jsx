import React from "react";

export default function GreenButton({ text }) {
  return (
    <button className=" bg-[#4EFF6F]/75 hover:bg-[#2bff00] active:ring-2 ring-lime-500 text-[#006503] text-[16px] p-[12px] rounded-[12px] font-medium cursor-pointer">
      {text}
    </button>
  );
}
