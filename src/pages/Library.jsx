import React from "react";
import Hero from "./book/Hero";
import FavouriteReads from "./book/FavoriteBooks";
import TrendingBooks from "./book/TrendingBooks";
import ExploreBooks from "./book/ExploreBooks";
import Recommendation from "./book/Recommendation";

export default function () {
  return (
    <div>
      <Hero />
      <div className=" mx-auto">
        {/* <FavouriteReads /> */}
        {/* <TrendingBooks /> */}
        <div className="mt-20">
          <ExploreBooks />
        </div>
        <Recommendation />
      </div>
    </div>
  );
}
