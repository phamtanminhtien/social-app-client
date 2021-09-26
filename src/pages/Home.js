import React from "react";
import BoxUpStatus from "../parts/home/BoxUpStatus";

function Home() {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto grid grid-cols-4 gap-4 py-3 ">
        <div>1</div>
        <div className="col-span-2">
          <BoxUpStatus />
        </div>
        <div>9</div>
      </div>
    </div>
  );
}

export default Home;
