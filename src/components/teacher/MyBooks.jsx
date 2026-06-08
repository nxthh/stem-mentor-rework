import React from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetAllBooksQuery } from "../../features/books/booksAPI";
import { useNavigate, Link } from "react-router-dom";

export default function MyBooks() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllBooksQuery({ userId: user?.id });
  console.log("user", user);
  const myBooks =
    data?.books?.filter((book) => book.author_id === user?.id) || [];

  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="gap-5 sm:w-250 mx-auto mt-5">
      <div className="bg-white dark:bg-darksecbg p-5 sm:col-span-8 rounded-md">
        <h3 className="font-bold text-primary dark:text-darktext text-4xl mb-5">
          My <span className="text-red-500">Books</span>
        </h3>

        <div className="p-5 pt-0 rounded-md w-full">
          <hr className="border-gray-200 border-1 my-5" />

          <div className="space-y-4">
            {myBooks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No books found.
              </p>
            ) : (
              myBooks.slice(0, 4).map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-3 hover:scale-105 duration-150 hover:bg-primary hover:text-white p-2 rounded-[12px]"
                >
                  <img
                    src={book.thumbnail || book.image}
                    alt={book.title}
                    className="w-[118px] h-[118px] rounded-[12px] object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[15px] dark:text-white">
                      {book.title}
                    </h4>
                    <p className="text-sm line-clamp-1 hover:text-white dark:text-darktext">
                      {book.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between mt-5">
            <Link
              to="/all-books"
              className="flex items-center gap-2 font-semibold underline text-primary dark:text-darktext cursor-pointer"
            >
              See All Books <FaArrowRight />
            </Link>
            <div className="flex justify-center items-center hover:scale-105 duration-200">
              <button
                onClick={() => navigate("/add-book")}
                className="flex-col bg-red-500 p-2 w-[100%] sm:max-w-sm rounded-md text-white h-20 flex justify-center items-center gap-2"
              >
                <FaPlus className="text-red-500 bg-white text-[22px] p-1 rounded-full" />
                New Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
