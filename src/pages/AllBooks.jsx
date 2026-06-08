import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { LiaAngleRightSolid } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";

import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../features/books/booksAPI";
import FilterButton from "../components/buttons/filterButton";
import RedButton from "../components/buttons/RedButton";
import YellowButton from "../components/buttons/YellowButton";
import BlueButton from "../components/buttons/BlueButton";
import { useSelector } from "react-redux";

export default function AllBooks() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllBooksQuery(); // fetch all books
  const [deleteBook] = useDeleteBookMutation();

  const [filterText, setFilterText] = useState("");
  const filterOptions = ["Newest", "Oldest"];
  const [selected, setSelected] = useState(filterOptions[0]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = (book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedBook(null);
    setIsOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;
    try {
      await deleteBook(selectedBook.id).unwrap();
      toast.success(`Book "${selectedBook.title}" deleted successfully!`);
      closePopup();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting book.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  const myBooks =
    data?.books?.filter((book) => book.author_id === user?.id) || [];
  console.log(myBooks);
  console.log("user id", user?.id);
  const columns = useMemo(
    () => [
      {
        name: "Thumbnail",
        selector: (row) => row.thumbnail,
        cell: (row) => (
          <img
            src={row.thumbnail || row.file_url}
            alt="thumbnail"
            className="w-[128px] h-[77px] rounded-[10px] object-cover"
          />
        ),
      },
      {
        name: "Book Title",
        selector: (row) => row.title,
        sortable: true,
        minWidth: "250px",
        cell: (row) => (
          <span className="line-clamp-2 text-[#292929] text-[15px] font-semibold">
            {row.title}
          </span>
        ),
      },
      {
        name: "Description",
        selector: (row) => row.description,
        sortable: true,
        minWidth: "250px",
        cell: (row) => (
          <span className="line-clamp-2 text-[#595959] text-[15px] font-medium">
            {row.description}
          </span>
        ),
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="flex gap-2 justify-center scale-90">
            <div className="ring-1 ring-primary rounded-xl">
              <BlueButton text={<MdOutlineRemoveRedEye />} />
            </div>
            <div
              onClick={() => handleEdit(row.id)}
              className="ring-1 ring-yellow-600 rounded-xl"
            >
              <YellowButton text={<FiEdit />} />
            </div>
            <div
              onClick={() => openPopup(row)}
              className="ring-1 ring-red-900 rounded-xl cursor-pointer"
            >
              <RedButton text={<FaRegTrashAlt />} />
            </div>
          </div>
        ),
        center: true,
      },
    ],
    []
  );

  const filteredItems = myBooks.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="mx-auto container">
      {/* Breadcrumb & New Upload */}
      <div className="my-8 flex justify-between">
        <div className=" flex items-center gap-3 text-[15px] font-semibold">
          <Link
            to={"/teacher-dashboard"}
            className="text-primary cursor-pointer dark:text-white"
          >
            Dashboard
          </Link>
          <LiaAngleRightSolid className="text-primary" />
          <Link to={"/all-books"} className="text-secondary cursor-pointer">
            All Books
          </Link>
        </div>
        <div className="bg-primary rounded-2xl px-10 py-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-900">
          <div>
            <FaPlus className="bg-white rounded-full text-primary" />
          </div>
          <button
            onClick={() => navigate("/add-book")}
            className="text-white font-medium cursor-pointer"
          >
            New Upload
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 pb-8 bg-white rounded-3xl">
        <div className="mb-6 flex justify-between px-8 pt-6">
          <h2 className="text-[24px] py-3 font-medium text-primary">
            All Books
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search"
                className="pl-4 pr-10 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ring-offset-2"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <LuSearch className="text-[#8C8C8C]" />
              </span>
            </div>
            <div className="relative">
              <FilterButton
                label="Sort By"
                options={filterOptions}
                selectedValue={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
        </div>

        {/* DataTable */}
        <DataTable
          className="px-8"
          columns={columns}
          data={filteredItems ?? []}
          pagination
          highlightOnHover
          noHeader
          noDataComponent={
            <p className="py-6 text-gray-500">No books found.</p>
          }
        />
      </div>

      {/* Delete Popup */}
      <Popup open={isOpen} closeOnDocumentClick onClose={closePopup}>
        <div className="p-6 bg-white rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Confirm Delete
          </h3>
          {selectedBook && (
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {selectedBook.title}
              </span>
              ?
            </p>
          )}
          <div className="flex justify-center space-x-3">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={closePopup}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
