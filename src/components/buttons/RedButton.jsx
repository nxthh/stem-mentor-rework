import React from "react";

export default function RedButton({ text }) {
  return (
    <button className=" bg-[#F65858]/80 hover:bg-[#F65858] active:ring-2 ring-red-800 text-red-950 text-[16px] p-[12px] rounded-[12px] font-medium cursor-pointer ">
      {text}
    </button>
  );
}
