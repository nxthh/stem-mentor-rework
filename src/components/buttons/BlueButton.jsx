import React from "react";

export default function BlueButton({ text }) {
  return (
    <button className=" bg-[#429EFF]/25 text-primary active:ring-2 ring-primary text-[16px] p-[12px] rounded-[12px] font-medium cursor-pointer hover:bg-[#429EFF]/35">
      {text}
    </button>
  );
} 
