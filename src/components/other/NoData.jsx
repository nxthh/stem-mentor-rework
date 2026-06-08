import React from "react";
import { LuSearchX } from "react-icons/lu";

export default function NoData({ onClear }) {
  return (
    <div className="flex items-center justify-center  p-4">
      <div className="flex flex-col items-center p-8 text-center bg-white dark:bg-darksecbg rounded-2xl shadow-xl max-w-lg w-full">
        <div className="p-4 bg-indigo-100 text-primary rounded-full mb-6">
          <LuSearchX size={64} strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl dark:text-white sm:text-4xl font-bold text-gray-800 mb-2">
          No Results Found
        </h1>

        <p className="text-lg text-gray-500  dark:text-darktext  mb-8 max-w-sm">
          Sorry, we couldn't find any courses matching your search criteria.
          Please try a different query.
        </p>
        <button
          onClick={onClear}
          className="px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          Clear Search
        </button>
      </div>
    </div>
  );
}
