import React from "react";
import { Link } from "react-router-dom";
import { getLinkMedia, getLinkUser } from "../services/server";
import Avatar from "../uis/Avatar";
import getFullName from "../utils/getFullName";

function UserBoxNF({
  user,
  btnAction,
  btnTitle,
  extraBtnAction,
  extraBtnTitle,
}) {
  return (
    <div className="flex bg-white my-2 py-2 px-4 rounded border border-gray-100 shadow-lg">
      <div className="flex justify-center flex-col mr-3">
        <Avatar
          _id={user._id}
          name={user.firstName}
          src={getLinkMedia(user?.avatar?.meta?.filename)}
        />
      </div>

      <div className="flex-1">
        <Link to={getLinkUser(user._id)}>
          <p className="font-medium">
            {getFullName(user.firstName, user.lastName)}
          </p>
        </Link>
        <div className="flex gap-1">
          <button
            onClick={() => {
              btnAction(user._id);
            }}
            className="w-full py-1 duration-150 text-white bg-blue-600 hover:bg-blue-700"
          >
            {btnTitle}
          </button>
          {extraBtnAction && (
            <button
              onClick={() => {
                extraBtnAction(user._id);
              }}
              className="w-full py-1 duration-150 text-white bg-blue-600 hover:bg-blue-700"
            >
              {extraBtnTitle}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserBoxNF;
