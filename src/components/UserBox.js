import React from "react";
import { Link } from "react-router-dom";
import { getLinkMedia, getLinkUser } from "../services/server";
import getFullName from "../utils/getFullName";

function UserBox({ user }) {
  return (
    <Link to={getLinkUser(user._id)}>
      <div
        className="w-full relative bg-center bg-contain rounded-xl overflow-hidden"
        style={{
          paddingTop: "100%",
          backgroundImage:
            "url(" + getLinkMedia(user?.avatar?.meta?.filename) + ")",
        }}
      >
        {!user.avatar && (
          <div className="top-0 left-0 right-0 bottom-0 absolute flex justify-center items-center bg-pink-500">
            <span className="text-white text-8xl">
              {user.firstName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div
          className="top-0 left-0 right-0 bottom-0 absolute overflow-hidden flex justify-end flex-col p-2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.43461134453781514) 79%, rgba(0,0,0,1) 100%)",
          }}
        >
          <div className="">
            <span className="text-white text-base font-light">
              {getFullName(user.firstName, user.lastName)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserBox;
