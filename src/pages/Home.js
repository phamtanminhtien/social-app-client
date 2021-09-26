import React from "react";
import BoxUpStatus from "../parts/home/BoxUpStatus";
import ListPost from "../parts/home/ListPost";

function Home() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto grid grid-cols-12 gap-4 py-3 ">
        <div className="col-span-3"></div>
        <div className="col-span-6">
          <BoxUpStatus />
          <ListPost />
        </div>
        <div className="col-span-3">9</div>
      </div>
    </div>
  );
}

export default Home;
