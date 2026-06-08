import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";

export default function Searchbar({ query, onSearch }) {
  const { t } = useTranslation();
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-[835px] mx-auto  px-4 sm:px-0"
    >
      <div className="relative  rounded-3xl h-[50px] flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={`${t("search")} `}
          className="bg-white dark:bg-gray-800 dark:text-white w-full max-w-[825px] h-[48px] pl-6 pr-20 rounded-3xl outline-none mx-auto"
        />
        <IoIosSearch className="absolute right-4 sm:right-10 text-gray-400 dark:text-gray-200 text-xl cursor-pointer" />
      </div>
    </form>
  );
}
