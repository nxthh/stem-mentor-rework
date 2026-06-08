import { Link } from "react-router-dom";

export default function SectionHeader({ title, buttonText, link }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {buttonText && (
        <Link
          to={link}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
