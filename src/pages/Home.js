import React, { useState } from "react";
import BoxUpStatus from "../parts/home/BoxUpStatus";
import Friend from "../parts/home/Friend";
import FriendList from "../parts/home/FriendList";
import ListPost from "../parts/home/ListPost";
import UserInfo from "../parts/home/UserInfo";
import Title from "../uis/Title";

function Home() {
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const reloadPost = () => {
    setTriggerUpdate(!triggerUpdate);
  };

  return (
    <div className="bg-gray-100  min-h-full">
      <div className="container mx-auto grid grid-cols-12 gap-4 py-3  min-h-full">
        <div className="col-span-3"></div>
        <div className="col-span-6 z-10 min-h-full">
          <BoxUpStatus reload={reloadPost} />
          <ListPost reload={triggerUpdate} />
        </div>
        <div className="col-span-3"></div>
      </div>

      <div className="container mx-auto grid grid-cols-12 gap-4 py-3 fixed top-0 left-0 right-0 bottom-0">
        <div className="col-span-3 overflow-y-auto overflow-x-hidden">
          <UserInfo />
          <Title text="Friends" />
          <Friend />
        </div>
        <div className="col-span-6 z-0"></div>
        <div className="col-span-3 overflow-y-auto overflow-x-hidden">
          <FriendList />
        </div>
      </div>
    </div>
  );
}

export default Home;
