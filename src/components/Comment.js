import React from "react";
import { getLinkMedia } from "../services/server";
import Avatar from "../uis/Avatar";

function Comment({ data }) {
  return (
    <div className="flex my-1 ml-5">
      <div className="mr-2">
        <Avatar
          name={data.userId.firstName}
          src={getLinkMedia(data.userId.avatar?.meta.filename)}
        />
      </div>
      <div className="flex-1 bg-gray-200 rounded-xl px-4 py-2">
        <span className="block font-medium leading-none text-gray-800">
          {data.userId.firstName + " " + data.userId.lastName}
        </span>
        <span className="leading-none text-gray-700 text-sm">
          {" "}
          {data.content}
        </span>
      </div>
    </div>
  );
}

export default Comment;
