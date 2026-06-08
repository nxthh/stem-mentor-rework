import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useGetAllBooksQuery } from "../../features/books/booksAPI";
import BookDetailsPdf from "./BookDetailsPdf";
import BookCard from "../../components/books/BookCard";
import {
  useGetTeacherInfoQuery,
  useGetUserInfoQuery,
} from "../../features/users/userSlice";
import { ImSpinner2 } from "react-icons/im";

export default function BookDetails() {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading: bookDataLoading,
    error,
  } = useGetAllBooksQuery();
  const book = bookData?.books?.find((b) => String(b.id) === String(id));
  const {
    data: authorData,
    isLoading: authorDataLoading,
    error: authorError,
  } = useGetTeacherInfoQuery(book?.author_id, {
    skip: !book?.author_id,
  });
  console.log("author  data", authorData);
  const authorName = authorData?.full_name || "Unknown Author";
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    if (book && Array.isArray(book.categories) && bookData?.books) {
      const currentCategories = book.categories.map((c) => c.id);
      const filtered = bookData.books.filter(
        (b) =>
          b.id !== book.id &&
          Array.isArray(b.categories) &&
          b.categories.some((c) => currentCategories.includes(c.id))
      );
      setRelatedBooks(filtered);
    } else {
      setRelatedBooks([]);
    }
  }, [book, bookData]);

  if (bookDataLoading || authorDataLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <ImSpinner2 className="animate-spin text-5xl text-blue-500" />
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load books. Please try again.
      </p>
    );

  if (!book)
    return (
      <p className="text-center mt-10 text-gray-500">
        Book not found or still loading.
      </p>
    );

  return (
    <div className="bg-gray-100 dark:bg-darkbg min-h-screen py-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-3 text-[15px] font-semibold">
          <Link to="/library" className="text-primary  dark:text-white">
            Library
          </Link>
          <LiaAngleRightSolid className="text-primary dark:text-white" />
          <Link
            to="/library/all-books"
            className="text-primary dark:text-white"
          >
            All Books
          </Link>
          <LiaAngleRightSolid className="text-primary dark:text-white" />
          <p className="text-secondary">{book.title}</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left section */}
          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-darksecbg rounded-lg p-8">
            <div className="flex flex-col md:flex-row justify-start gap-6">
              <div className="w-full md:w-[287px]">
                <img
                  src={book.thumbnail}
                  alt="Book Cover"
                  className="w-full rounded-md object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-[36px] md:text-[50px] font-bold text-primary dark:text-white">
                    {book.title}
                  </h1>
                  <p className=" mt-1 font-medium text-gray-400">
                    Uploaded by :
                    <br />
                    <div className="flex items-center gap-2 mt-2 text-gray-700 dark:text-white">
                      <img
                        src={authorData.profile_url}
                        className="w-[32px] h-[32px] border-2 border-secondary rounded-full object-cover object-center  "
                      />
                      {authorName || "Unknown"}
                    </div>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-primary dark:text-white">
                Description
              </h2>
              <p className="mt-3 text-xl text-gray-600 leading-relaxed text-justify dark:text-darktext">
                {book.description || "No description available."}
              </p>
            </div>

            {/* PDF Viewer */}
            <div className="mt-8">
              <BookDetailsPdf fileUrl={book.file_url} />
            </div>
          </div>

          {/* Related books */}
          <aside className="col-span-12 lg:col-span-4">
            <h2 className="text-[42px] font-semibold text-primary mb-4 dark:text-white">
              Related Books
            </h2>
            {relatedBooks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {relatedBooks.map((b) => (
                  <Link
                    key={b.id}
                    to={`/library/book/${b.id}`}
                    className="rounded p-4 transition"
                  >
                    <BookCard
                      key={b.id}
                      bookcover={b.thumbnail}
                      title={b.title}
                      author={"Unknown"}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related books found.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
