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
  useDeleteBlogsMutation,
  useGetAllBlogQuery,
} from "../../features/blog/blogSlice";
import { useSelector } from "react-redux";
import BlueButton from "../../components/buttons/BlueButton";
import YellowButton from "../../components/buttons/YellowButton";
import RedButton from "../../components/buttons/RedButton";
import FilterButton from "../../components/buttons/filterButton";

export default function MyBlogs() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetAllBlogQuery();
  const [deleteBlog] = useDeleteBlogsMutation();

  const [filterText, setFilterText] = useState("");
  const filterOptions = ["Newest", "Oldest"];
  const [selected, setSelected] = useState(filterOptions[0]);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = (blog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  const closePopup = () => {
    setSelectedBlog(null);
    setIsOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBlog) return;
    try {
      await deleteBlog(selectedBlog.id).unwrap();
      toast.success(`Blog "${selectedBlog.title}" deleted successfully!`);
      closePopup();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting blog.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  // ✅ Filter blogs to show only the user's own posts
  const userBlogs = data?.blogs?.filter((b) => b.author_id === user?.id) || [];

  // ✅ Filter search
  const filteredItems = userBlogs.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = useMemo(
    () => [
      {
        name: "Thumbnail",
        selector: (row) => row.thumbnail_url,
        cell: (row) => (
          <img
            src={row.thumbnail_url || "/pdf-icon.png"}
            alt="thumbnail"
            className="w-[128px] h-[77px] rounded-[10px] object-cover"
          />
        ),
      },
      {
        name: "Title",
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
        name: "Content",
        selector: (row) => row.content,
        sortable: true,
        minWidth: "250px",
        cell: (row) => (
          <span className="line-clamp-2 text-[#595959] text-[15px] font-medium">
            {row.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
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

  if (isLoading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-darkbg z-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (isError) return <p>Error loading blogs</p>;

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
          <span className="text-secondary">My Blogs</span>
        </div>
        <div className="bg-primary rounded-2xl px-10 py-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-blue-900">
          <div>
            <FaPlus className="bg-white rounded-full text-primary" />
          </div>
          <button
            onClick={() => navigate("/create-blog")}
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
            My Blogs
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

        <DataTable
          className="px-8"
          columns={columns}
          data={filteredItems ?? []}
          pagination
          highlightOnHover
          noHeader
          noDataComponent={
            <p className="py-6 text-gray-500">No blogs found.</p>
          }
        />
      </div>

      {/* Delete Popup */}
      <Popup open={isOpen} closeOnDocumentClick onClose={closePopup}>
        <div className="p-6 bg-white rounded-xl shadow-md w-80 text-center">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Confirm Delete
          </h3>
          {selectedBlog && (
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {selectedBlog.title}
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
