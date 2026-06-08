import React from "react";
import { Link } from "react-router-dom";
// Assuming 'bg-brand-primary' and 'text-brand-secondary' are Tailwind classes
// configured in your tailwind.config.js for your primary brand colors.

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 ">
      <h1 className="text-8xl sm:text-9xl font-black text-primary mb-4 animate-bounce-slow">
        ERROR
      </h1>

      <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6">
        404 🚫
      </h2>

      <p className="mb-10 text-lg text-gray-700 max-w-lg mx-auto border-l-4 border-primary pl-4">
        We can't seem to find the resource you're looking for. It might have
        been moved or doesn't exist.
      </p>

      <Link
        to="/"
        className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-xl hover:bg-[#1e307a] transition duration-300 ease-in-out tracking-wide uppercase"
      >
        Let's Get Back on Track
      </Link>
    </div>
  );
}
