import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import BookCard from "../../components/books/BookCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function TrendingBooks() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return (
    <div className="mt-[100px] mx-auto container px-4 sm:px-6 lg:px-0">
      {/* TITLE */}
      <h1 className="text-primary text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-center dark:text-darkprimary">
        {i18n.language === "km" ? "សៀវភៅពេញនិយមបំផុត" : "TOP TRENDING BOOKS"}
      </h1>

      {/* VIEW ALL BUTTON */}
      <div className="flex justify-end mt-4">
        <div
          onClick={() => {
            navigate("/library/all-books");
          }}
          className="cursor-pointer hover:scale-105 transition-[100] flex items-center gap-3 sm:gap-5 bg-primary px-4 sm:px-[18px] py-2 sm:py-[8px] rounded-[8px]"
        >
          <p className="text-white font-semibold text-[16px] sm:text-[20px]">
            {i18n.language === "km" ? "មើលទាំងអស់" : "View all"}
          </p>

          <FaArrowRightLong className="text-white text-[18px] sm:text-[24px]" />
        </div>
      </div>

      {/* BOOKS CONTAINER */}
      <div className="mt-[40px] flex justify-center flex-wrap gap-10 ">
        <BookCard
          bookcover="https://s3proxy.cdn-zlib.sk/covers150/collections/genesis/8a687844b66d4c7f0c1bf6dfc189575b325b47c82258da2c818ca9a00447e6da.gif"
          title="The Great Physicists"
          author="George Gamow"
        />
        <BookCard
          bookcover="https://m.media-amazon.com/images/I/71cFuacb2KL._UF1000,1000_QL80_.jpg"
          title="Physical Chemistry"
          author="R. L. Madan"
        />
        <BookCard
          bookcover="https://s3proxy.cdn-zlib.sk/covers150/collections/userbooks/d72ba330468aed92d7dd0ea0d460f6e6e6af2b60e374fae66d28b883a84a567c.jpg"
          title="Analog Circuit Design"
          author="Bob Dobkin"
        />
        <BookCard
          bookcover="https://s3proxy.cdn-zlib.sk/covers150/collections/userbooks/4bf4f56511e355dcd743cc30bdeed9da2c4bba22c6044038e3f791706e5a7e04.jpg"
          title="Mechanics of Materials"
          author="G.R. Liu"
        />
        <BookCard
          bookcover="https://s3proxy.cdn-zlib.sk/covers150/collections/genesis/75f7f76250e46b4d4377f16e3959459fb2c0d6c93a70248bda79a2a453d19a0d.jpg"
          title="The Math Book"
          author="DK"
        />
      </div>
    </div>
  );
}
