import React, { useState, useEffect } from "react";
import BookCard from "../../components/books/BookCard";
import Searchbar from "../../components/courses/Searchbar";
import { useGetAllBooksQuery } from "../../features/books/booksAPI";
import { useGetAllCategoriesQuery } from "../../features/data/categorySlice";
import { Link } from "react-router-dom";

export default function ExploreBooks() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [teachersMap, setTeachersMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dataBooks, isLoading, error } = useGetAllBooksQuery();
  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (!dataBooks?.books) return;

    dataBooks.books.forEach((book) => {
      const authorId = book.author_id;
      if (!teachersMap[authorId]) {
        fetch(`https://stem-api.anajak-khmer.site/users/teachers/${authorId}`)
          .then((res) => res.json())
          .then((data) => {
            setTeachersMap((prev) => ({ ...prev, [authorId]: data }));
          })
          .catch(() => {
            setTeachersMap((prev) => ({ ...prev, [authorId]: null }));
          });
      }
    });
  }, [dataBooks]);

  if (isLoading || categoriesLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error || categoriesError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load data.</p>
    );

  const categories = ["All", ...categoriesData.map((cat) => cat.name)];

  const filteredBooks =
    selectedCategory === "All"
      ? dataBooks?.books || []
      : dataBooks?.books?.filter((book) =>
          book.categories?.some(
            (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
          )
        );

  const searchedBooks = filteredBooks.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = (teachersMap[book.author_id]?.full_name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch = book.categories?.some((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return titleMatch || authorMatch || categoryMatch;
  });

  const getAuthorName = (authorId) =>
    teachersMap[authorId]?.full_name || "Unknown Author";

  return (
    <div className="mt-[30px] mx-auto container text-center">
      <h2 className="text-primary text-[28px] md:text-[48px] font-bold relative inline-block dark:text-darkprimary">
        Explore All Books Here
      </h2>

      {/* Search */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-5">
        <Searchbar
          query={searchQuery}
          onSearch={(value) => setSearchQuery(value)}
          placeholder="Search by title, author, or category..."
        />
      </div>

      {/* Category Filter */}
      <div className="mt-[30px] md:mt-[60px] flex flex-wrap justify-center gap-2 md:gap-[42px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-[8px] transition duration-200 ${
              selectedCategory === cat
                ? "bg-primary text-white"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-primary hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Books */}
      <div className="mt-[70px] flex flex-wrap justify-center gap-[50px]">
        {searchedBooks?.length > 0 ? (
          searchedBooks.map((book) => (
            <Link key={book.id} to={`/book-details/${book.id}`}>
              <BookCard
                bookcover={book.thumbnail}
                title={book.title}
                author={getAuthorName(book.author_id)}
                description={book.description}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 mt-5">
            No books found for this category or search query.
          </p>
        )}
      </div>
    </div>
  );
}
