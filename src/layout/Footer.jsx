import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white dark:bg-darkbg dark:border   dark:border-t-darkborder py-3 px-4 mt-10">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 py-8 text-center lg:text-left">
        <img
          src="/assets/STEM168.png"
          alt="Logo"
          className="w-auto h-[100px] sm:h-[120px] lg:h-[142px] mx-auto lg:mx-0"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full sm:w-[80%] lg:w-[70%] text-sm lg:text-base cursor-default">
          <div className="flex flex-col gap-2 text-[#253C95] dark:text-darktext ">
            <h3 className="font-bold dark:text-darktext  ">Company</h3>
            <Link to={"/about"}>About Us</Link>
            <a href="https://github.com/tskimm3110" target="_blank" className="cursor-pointer">
              Github
            </a>
          </div>
          <div className="flex flex-col gap-2 text-[#253C95] dark:text-darktext ">
            <h3 className="font-bold dark:text-darktext  ">Technologies</h3>
            <a href="https://tailwindcss.com/" target="_blank" className="cursor-pointer">
              Tailwind CSS
            </a>
            <a href="https://react.dev/" target="_blank" className="cursor-pointer">
              React JS
            </a>
          </div>
          <div className="flex flex-col gap-2 text-[#253C95] dark:text-darktext ">
            <h3 className="font-bold dark:text-darktext  ">Learn</h3>
            <p>Resources</p>
            <a href="/#faq" className="cursor-pointer">FAQs</a>
          </div>
          <div className="flex flex-col gap-2 text-[#253C95] break-words">
            <h3 className="font-bold dark:text-darktext ">Contact</h3>
            <p className="flex items-center justify-center lg:justify-start gap-2 dark:text-darktext cursor-pointer">
              <FaPhoneVolume /> <a href="tel:0966931349">0966931349</a>
            </p>
            <a
              href="mailto:stemmentor@gmail.com"
              className="whitespace-normal break-all dark:text-darktext "
              target="_blank"
            >
              stemmentor@gmail.com
            </a>
          </div>
        </div>
      </div>
      <hr className="text-[#253C95] dark:text-darksecbg" />
      <div>
        <p className="text-center text-[#253C95]  dark:text-darktext  pt-3 text-sm sm:text-base cursor-default">
          © 2025 STEMMentor | All Right Reserved
        </p>
      </div>
    </div>
  );
}
