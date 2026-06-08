import React from "react";

export default function LightRedButton({ text }) {
  return (
    <button className=" bg-[#FF4245]/25 hover:bg-[#FF4245]/50 active:ring-2 ring-red-500 text-[#952527] text-[16px] p-[12px] rounded-[12px] font-medium cursor-pointer">
      {text}
    </button>
  );
}
